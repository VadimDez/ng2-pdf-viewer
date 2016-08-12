/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler, ComponentFactory, ComponentResolver, ComponentStillLoadingError, Injectable, Injector, ModuleWithComponentFactories, OptionalMetadata, Provider, SkipSelfMetadata } from '@angular/core';
import { Console } from '../core_private';
import { createHostComponentMeta } from './compile_metadata';
import { CompilerConfig } from './config';
import { DirectiveNormalizer } from './directive_normalizer';
import { BaseException } from './facade/exceptions';
import { isBlank, isString, stringify } from './facade/lang';
import { CompileMetadataResolver } from './metadata_resolver';
import { NgModuleCompiler } from './ng_module_compiler';
import * as ir from './output/output_ast';
import { interpretStatements } from './output/output_interpreter';
import { jitStatements } from './output/output_jit';
import { StyleCompiler } from './style_compiler';
import { TemplateParser } from './template_parser/template_parser';
import { SyncAsyncResult } from './util';
import { ComponentFactoryDependency, ViewCompiler, ViewFactoryDependency } from './view_compiler/view_compiler';
export class RuntimeCompiler {
    constructor(_injector, _metadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _compilerConfig, _console) {
        this._injector = _injector;
        this._metadataResolver = _metadataResolver;
        this._templateNormalizer = _templateNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._compilerConfig = _compilerConfig;
        this._console = _console;
        this._compiledTemplateCache = new Map();
        this._compiledHostTemplateCache = new Map();
        this._compiledNgModuleCache = new Map();
    }
    get injector() { return this._injector; }
    compileModuleSync(moduleType) {
        return this._compileModuleAndComponents(moduleType, true).syncResult;
    }
    compileModuleAsync(moduleType) {
        return this._compileModuleAndComponents(moduleType, false).asyncResult;
    }
    compileModuleAndAllComponentsSync(moduleType) {
        return this._compileModuleAndAllComponents(moduleType, true).syncResult;
    }
    compileModuleAndAllComponentsAsync(moduleType) {
        return this._compileModuleAndAllComponents(moduleType, false).asyncResult;
    }
    compileComponentAsync(compType, ngModule = null) {
        if (!ngModule) {
            throw new BaseException(`Calling compileComponentAsync on the root compiler without a module is not allowed! (Compiling component ${stringify(compType)})`);
        }
        return this._compileComponentInModule(compType, false, ngModule).asyncResult;
    }
    compileComponentSync(compType, ngModule = null) {
        if (!ngModule) {
            throw new BaseException(`Calling compileComponentSync on the root compiler without a module is not allowed! (Compiling component ${stringify(compType)})`);
        }
        return this._compileComponentInModule(compType, true, ngModule).syncResult;
    }
    _compileModuleAndComponents(moduleType, isSync) {
        const componentPromise = this._compileComponents(moduleType, isSync);
        const ngModuleFactory = this._compileModule(moduleType);
        return new SyncAsyncResult(ngModuleFactory, componentPromise.then(() => ngModuleFactory));
    }
    _compileModuleAndAllComponents(moduleType, isSync) {
        const componentPromise = this._compileComponents(moduleType, isSync);
        const ngModuleFactory = this._compileModule(moduleType);
        const moduleMeta = this._metadataResolver.getNgModuleMetadata(moduleType);
        const componentFactories = [];
        const templates = new Set();
        moduleMeta.transitiveModule.modules.forEach((moduleMeta) => {
            moduleMeta.declaredDirectives.forEach((dirMeta) => {
                if (dirMeta.isComponent) {
                    const template = this._createCompiledHostTemplate(dirMeta.type.runtime);
                    templates.add(template);
                    componentFactories.push(template.proxyComponentFactory);
                }
            });
        });
        const syncResult = new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
        // Note: host components themselves can always be compiled synchronously as they have an
        // inline template. However, we still need to wait for the components that they
        // reference to be loaded / compiled.
        const compile = () => {
            templates.forEach((template) => { this._compileTemplate(template); });
            return syncResult;
        };
        const asyncResult = isSync ? Promise.resolve(compile()) : componentPromise.then(compile);
        return new SyncAsyncResult(syncResult, asyncResult);
    }
    _compileModule(moduleType) {
        let ngModuleFactory = this._compiledNgModuleCache.get(moduleType);
        if (!ngModuleFactory) {
            const moduleMeta = this._metadataResolver.getNgModuleMetadata(moduleType);
            const transitiveModuleMeta = moduleMeta.transitiveModule;
            let boundCompilerFactory = (parentResolver) => new ModuleBoundCompiler(this, moduleMeta.type.runtime, parentResolver, this._console);
            // Always provide a bound Compiler and ComponentResolver
            const extraProviders = [
                this._metadataResolver.getProviderMetadata(new Provider(Compiler, {
                    useFactory: boundCompilerFactory,
                    deps: [[new OptionalMetadata(), new SkipSelfMetadata(), ComponentResolver]]
                })),
                this._metadataResolver.getProviderMetadata(new Provider(ComponentResolver, { useExisting: Compiler }))
            ];
            var compileResult = this._ngModuleCompiler.compile(moduleMeta, extraProviders);
            compileResult.dependencies.forEach((dep) => {
                dep.placeholder.runtime =
                    this._assertComponentKnown(dep.comp.runtime, true).proxyComponentFactory;
                dep.placeholder.name = `compFactory_${dep.comp.name}`;
            });
            if (!this._compilerConfig.useJit) {
                ngModuleFactory =
                    interpretStatements(compileResult.statements, compileResult.ngModuleFactoryVar);
            }
            else {
                ngModuleFactory = jitStatements(`${moduleMeta.type.name}.ngfactory.js`, compileResult.statements, compileResult.ngModuleFactoryVar);
            }
            this._compiledNgModuleCache.set(moduleMeta.type.runtime, ngModuleFactory);
        }
        return ngModuleFactory;
    }
    _compileComponentInModule(compType, isSync, moduleType) {
        this._metadataResolver.addComponentToModule(moduleType, compType);
        const componentPromise = this._compileComponents(moduleType, isSync);
        const componentFactory = this._assertComponentKnown(compType, true).proxyComponentFactory;
        return new SyncAsyncResult(componentFactory, componentPromise.then(() => componentFactory));
    }
    /**
     * @internal
     */
    _compileComponents(mainModule, isSync) {
        const templates = new Set();
        var loadingPromises = [];
        const ngModule = this._metadataResolver.getNgModuleMetadata(mainModule);
        ngModule.transitiveModule.modules.forEach((localModuleMeta) => {
            localModuleMeta.declaredDirectives.forEach((dirMeta) => {
                if (dirMeta.isComponent) {
                    templates.add(this._createCompiledTemplate(dirMeta, localModuleMeta));
                    dirMeta.entryComponents.forEach((entryComponentType) => {
                        templates.add(this._createCompiledHostTemplate(entryComponentType.runtime));
                    });
                }
            });
            localModuleMeta.entryComponents.forEach((entryComponentType) => {
                templates.add(this._createCompiledHostTemplate(entryComponentType.runtime));
            });
        });
        templates.forEach((template) => {
            if (template.loading) {
                if (isSync) {
                    throw new ComponentStillLoadingError(template.compType.runtime);
                }
                else {
                    loadingPromises.push(template.loading);
                }
            }
        });
        const compile = () => { templates.forEach((template) => { this._compileTemplate(template); }); };
        if (isSync) {
            compile();
            return Promise.resolve(null);
        }
        else {
            return Promise.all(loadingPromises).then(compile);
        }
    }
    clearCacheFor(type) {
        this._compiledNgModuleCache.delete(type);
        this._metadataResolver.clearCacheFor(type);
        this._compiledHostTemplateCache.delete(type);
        var compiledTemplate = this._compiledTemplateCache.get(type);
        if (compiledTemplate) {
            this._templateNormalizer.clearCacheFor(compiledTemplate.normalizedCompMeta);
            this._compiledTemplateCache.delete(type);
        }
    }
    clearCache() {
        this._metadataResolver.clearCache();
        this._compiledTemplateCache.clear();
        this._compiledHostTemplateCache.clear();
        this._templateNormalizer.clearCache();
        this._compiledNgModuleCache.clear();
    }
    _createCompiledHostTemplate(compType) {
        var compiledTemplate = this._compiledHostTemplateCache.get(compType);
        if (isBlank(compiledTemplate)) {
            var compMeta = this._metadataResolver.getDirectiveMetadata(compType);
            assertComponent(compMeta);
            var hostMeta = createHostComponentMeta(compMeta);
            compiledTemplate = new CompiledTemplate(true, compMeta.selector, compMeta.type, [compMeta], [], [], this._templateNormalizer.normalizeDirective(hostMeta));
            this._compiledHostTemplateCache.set(compType, compiledTemplate);
        }
        return compiledTemplate;
    }
    _createCompiledTemplate(compMeta, ngModule) {
        var compiledTemplate = this._compiledTemplateCache.get(compMeta.type.runtime);
        if (isBlank(compiledTemplate)) {
            assertComponent(compMeta);
            compiledTemplate = new CompiledTemplate(false, compMeta.selector, compMeta.type, ngModule.transitiveModule.directives, ngModule.transitiveModule.pipes, ngModule.schemas, this._templateNormalizer.normalizeDirective(compMeta));
            this._compiledTemplateCache.set(compMeta.type.runtime, compiledTemplate);
        }
        return compiledTemplate;
    }
    _assertComponentKnown(compType, isHost) {
        const compiledTemplate = isHost ? this._compiledHostTemplateCache.get(compType) :
            this._compiledTemplateCache.get(compType);
        if (!compiledTemplate) {
            throw new BaseException(`Illegal state: CompiledTemplate for ${stringify(compType)} (isHost: ${isHost}) does not exist!`);
        }
        return compiledTemplate;
    }
    _assertComponentLoaded(compType, isHost) {
        const compiledTemplate = this._assertComponentKnown(compType, isHost);
        if (compiledTemplate.loading) {
            throw new BaseException(`Illegal state: CompiledTemplate for ${stringify(compType)} (isHost: ${isHost}) is still loading!`);
        }
        return compiledTemplate;
    }
    _compileTemplate(template) {
        if (template.isCompiled) {
            return;
        }
        const compMeta = template.normalizedCompMeta;
        const externalStylesheetsByModuleUrl = new Map();
        const stylesCompileResult = this._styleCompiler.compileComponent(compMeta);
        stylesCompileResult.externalStylesheets.forEach((r) => { externalStylesheetsByModuleUrl.set(r.meta.moduleUrl, r); });
        this._resolveStylesCompileResult(stylesCompileResult.componentStylesheet, externalStylesheetsByModuleUrl);
        const viewCompMetas = template.viewComponentTypes.map((compType) => this._assertComponentLoaded(compType, false).normalizedCompMeta);
        const parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, template.viewDirectives.concat(viewCompMetas), template.viewPipes, template.schemas, compMeta.type.name);
        const compileResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, ir.variable(stylesCompileResult.componentStylesheet.stylesVar), template.viewPipes);
        compileResult.dependencies.forEach((dep) => {
            let depTemplate;
            if (dep instanceof ViewFactoryDependency) {
                let vfd = dep;
                depTemplate = this._assertComponentLoaded(vfd.comp.runtime, false);
                vfd.placeholder.runtime = depTemplate.proxyViewFactory;
                vfd.placeholder.name = `viewFactory_${vfd.comp.name}`;
            }
            else if (dep instanceof ComponentFactoryDependency) {
                let cfd = dep;
                depTemplate = this._assertComponentLoaded(cfd.comp.runtime, true);
                cfd.placeholder.runtime = depTemplate.proxyComponentFactory;
                cfd.placeholder.name = `compFactory_${cfd.comp.name}`;
            }
        });
        const statements = stylesCompileResult.componentStylesheet.statements.concat(compileResult.statements);
        let factory;
        if (!this._compilerConfig.useJit) {
            factory = interpretStatements(statements, compileResult.viewFactoryVar);
        }
        else {
            factory = jitStatements(`${template.compType.name}.ngfactory.js`, statements, compileResult.viewFactoryVar);
        }
        template.compiled(factory);
    }
    _resolveStylesCompileResult(result, externalStylesheetsByModuleUrl) {
        result.dependencies.forEach((dep, i) => {
            var nestedCompileResult = externalStylesheetsByModuleUrl.get(dep.moduleUrl);
            var nestedStylesArr = this._resolveAndEvalStylesCompileResult(nestedCompileResult, externalStylesheetsByModuleUrl);
            dep.valuePlaceholder.runtime = nestedStylesArr;
            dep.valuePlaceholder.name = `importedStyles${i}`;
        });
    }
    _resolveAndEvalStylesCompileResult(result, externalStylesheetsByModuleUrl) {
        this._resolveStylesCompileResult(result, externalStylesheetsByModuleUrl);
        if (!this._compilerConfig.useJit) {
            return interpretStatements(result.statements, result.stylesVar);
        }
        else {
            return jitStatements(`${result.meta.moduleUrl}.css.js`, result.statements, result.stylesVar);
        }
    }
}
/** @nocollapse */
RuntimeCompiler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RuntimeCompiler.ctorParameters = [
    { type: Injector, },
    { type: CompileMetadataResolver, },
    { type: DirectiveNormalizer, },
    { type: TemplateParser, },
    { type: StyleCompiler, },
    { type: ViewCompiler, },
    { type: NgModuleCompiler, },
    { type: CompilerConfig, },
    { type: Console, },
];
class CompiledTemplate {
    constructor(isHost, selector, compType, viewDirectivesAndComponents, viewPipes, schemas, _normalizeResult) {
        this.isHost = isHost;
        this.compType = compType;
        this.viewPipes = viewPipes;
        this.schemas = schemas;
        this._viewFactory = null;
        this.loading = null;
        this._normalizedCompMeta = null;
        this.isCompiled = false;
        this.isCompiledWithDeps = false;
        this.viewComponentTypes = [];
        this.viewDirectives = [];
        viewDirectivesAndComponents.forEach((dirMeta) => {
            if (dirMeta.isComponent) {
                this.viewComponentTypes.push(dirMeta.type.runtime);
            }
            else {
                this.viewDirectives.push(dirMeta);
            }
        });
        this.proxyViewFactory = (...args) => {
            if (!this._viewFactory) {
                throw new BaseException(`Illegal state: CompiledTemplate for ${stringify(this.compType)} is not compiled yet!`);
            }
            return this._viewFactory.apply(null, args);
        };
        this.proxyComponentFactory = isHost ?
            new ComponentFactory(selector, this.proxyViewFactory, compType.runtime) :
            null;
        if (_normalizeResult.syncResult) {
            this._normalizedCompMeta = _normalizeResult.syncResult;
        }
        else {
            this.loading = _normalizeResult.asyncResult.then((normalizedCompMeta) => {
                this._normalizedCompMeta = normalizedCompMeta;
                this.loading = null;
            });
        }
    }
    get normalizedCompMeta() {
        if (this.loading) {
            throw new BaseException(`Template is still loading for ${this.compType.name}!`);
        }
        return this._normalizedCompMeta;
    }
    compiled(viewFactory) {
        this._viewFactory = viewFactory;
        this.isCompiled = true;
    }
    depsCompiled() { this.isCompiledWithDeps = true; }
}
function assertComponent(meta) {
    if (!meta.isComponent) {
        throw new BaseException(`Could not compile '${meta.type.name}' because it is not a component.`);
    }
}
/**
 * Implements `Compiler` and `ComponentResolver` by delegating
 * to the RuntimeCompiler using a known module.
 */
class ModuleBoundCompiler {
    constructor(_delegate, _ngModule, _parentComponentResolver, _console) {
        this._delegate = _delegate;
        this._ngModule = _ngModule;
        this._parentComponentResolver = _parentComponentResolver;
        this._console = _console;
        this._warnOnComponentResolver = true;
    }
    get _injector() { return this._delegate.injector; }
    resolveComponent(component) {
        if (isString(component)) {
            if (this._parentComponentResolver) {
                return this._parentComponentResolver.resolveComponent(component);
            }
            else {
                return Promise.reject(new BaseException(`Cannot resolve component using '${component}'.`));
            }
        }
        if (this._warnOnComponentResolver) {
            this._console.warn(ComponentResolver.DynamicCompilationDeprecationMsg);
            this._warnOnComponentResolver = false;
        }
        return this.compileComponentAsync(component);
    }
    compileComponentAsync(compType, ngModule = null) {
        return this._delegate.compileComponentAsync(compType, ngModule ? ngModule : this._ngModule);
    }
    compileComponentSync(compType, ngModule = null) {
        return this._delegate.compileComponentSync(compType, ngModule ? ngModule : this._ngModule);
    }
    compileModuleSync(moduleType) {
        return this._delegate.compileModuleSync(moduleType);
    }
    compileModuleAsync(moduleType) {
        return this._delegate.compileModuleAsync(moduleType);
    }
    compileModuleAndAllComponentsSync(moduleType) {
        return this._delegate.compileModuleAndAllComponentsSync(moduleType);
    }
    compileModuleAndAllComponentsAsync(moduleType) {
        return this._delegate.compileModuleAndAllComponentsAsync(moduleType);
    }
    /**
     * Clears all caches
     */
    clearCache() {
        this._delegate.clearCache();
        if (this._parentComponentResolver) {
            this._parentComponentResolver.clearCache();
        }
    }
    /**
     * Clears the cache for the given component/ngModule.
     */
    clearCacheFor(type) { this._delegate.clearCacheFor(type); }
}
//# sourceMappingURL=runtime_compiler.js.map