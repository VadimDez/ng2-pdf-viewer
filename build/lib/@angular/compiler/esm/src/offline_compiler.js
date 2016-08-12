/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createHostComponentMeta } from './compile_metadata';
import { ListWrapper } from './facade/collection';
import { BaseException } from './facade/exceptions';
import { Identifiers } from './identifiers';
import * as o from './output/output_ast';
import { ComponentFactoryDependency, ViewFactoryDependency } from './view_compiler/view_compiler';
export class SourceModule {
    constructor(moduleUrl, source) {
        this.moduleUrl = moduleUrl;
        this.source = source;
    }
}
export class NgModulesSummary {
    constructor(ngModuleByComponent) {
        this.ngModuleByComponent = ngModuleByComponent;
    }
}
export class OfflineCompiler {
    constructor(_metadataResolver, _directiveNormalizer, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _outputEmitter) {
        this._metadataResolver = _metadataResolver;
        this._directiveNormalizer = _directiveNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._outputEmitter = _outputEmitter;
    }
    analyzeModules(ngModules) {
        const ngModuleByComponent = new Map();
        ngModules.forEach((ngModule) => {
            const ngModuleMeta = this._metadataResolver.getNgModuleMetadata(ngModule);
            ngModuleMeta.declaredDirectives.forEach((dirMeta) => {
                if (dirMeta.isComponent) {
                    ngModuleByComponent.set(dirMeta.type.runtime, ngModuleMeta);
                }
            });
        });
        return new NgModulesSummary(ngModuleByComponent);
    }
    clearCache() {
        this._directiveNormalizer.clearCache();
        this._metadataResolver.clearCache();
    }
    compile(moduleUrl, ngModulesSummary, components, ngModules) {
        let fileSuffix = _splitLastSuffix(moduleUrl)[1];
        let statements = [];
        let exportedVars = [];
        let outputSourceModules = [];
        // compile all ng modules
        exportedVars.push(...ngModules.map((ngModuleType) => this._compileModule(ngModuleType, statements)));
        // compile components
        return Promise
            .all(components.map((compType) => {
            const compMeta = this._metadataResolver.getDirectiveMetadata(compType);
            const ngModule = ngModulesSummary.ngModuleByComponent.get(compType);
            if (!ngModule) {
                throw new BaseException(`Cannot determine the module for component ${compMeta.type.name}!`);
            }
            return Promise
                .all([compMeta, ...ngModule.transitiveModule.directives].map(dirMeta => this._directiveNormalizer.normalizeDirective(dirMeta).asyncResult))
                .then((normalizedCompWithDirectives) => {
                const compMeta = normalizedCompWithDirectives[0];
                const dirMetas = normalizedCompWithDirectives.slice(1);
                _assertComponent(compMeta);
                // compile styles
                const stylesCompileResults = this._styleCompiler.compileComponent(compMeta);
                stylesCompileResults.externalStylesheets.forEach((compiledStyleSheet) => {
                    outputSourceModules.push(this._codgenStyles(compiledStyleSheet, fileSuffix));
                });
                // compile components
                exportedVars.push(this._compileComponentFactory(compMeta, fileSuffix, statements));
                exportedVars.push(this._compileComponent(compMeta, dirMetas, ngModule.transitiveModule.pipes, ngModule.schemas, stylesCompileResults.componentStylesheet, fileSuffix, statements));
            });
        }))
            .then(() => {
            if (statements.length > 0) {
                outputSourceModules.unshift(this._codegenSourceModule(_ngfactoryModuleUrl(moduleUrl), statements, exportedVars));
            }
            return outputSourceModules;
        });
    }
    _compileModule(ngModuleType, targetStatements) {
        const ngModule = this._metadataResolver.getNgModuleMetadata(ngModuleType);
        let appCompileResult = this._ngModuleCompiler.compile(ngModule, []);
        appCompileResult.dependencies.forEach((dep) => {
            dep.placeholder.name = _componentFactoryName(dep.comp);
            dep.placeholder.moduleUrl = _ngfactoryModuleUrl(dep.comp.moduleUrl);
        });
        targetStatements.push(...appCompileResult.statements);
        return appCompileResult.ngModuleFactoryVar;
    }
    _compileComponentFactory(compMeta, fileSuffix, targetStatements) {
        var hostMeta = createHostComponentMeta(compMeta);
        var hostViewFactoryVar = this._compileComponent(hostMeta, [compMeta], [], [], null, fileSuffix, targetStatements);
        var compFactoryVar = _componentFactoryName(compMeta.type);
        targetStatements.push(o.variable(compFactoryVar)
            .set(o.importExpr(Identifiers.ComponentFactory, [o.importType(compMeta.type)])
            .instantiate([
            o.literal(compMeta.selector), o.variable(hostViewFactoryVar),
            o.importExpr(compMeta.type)
        ], o.importType(Identifiers.ComponentFactory, [o.importType(compMeta.type)], [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]));
        return compFactoryVar;
    }
    _compileComponent(compMeta, directives, pipes, schemas, componentStyles, fileSuffix, targetStatements) {
        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, schemas, compMeta.type.name);
        var stylesExpr = componentStyles ? o.variable(componentStyles.stylesVar) : o.literalArr([]);
        var viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, stylesExpr, pipes);
        if (componentStyles) {
            ListWrapper.addAll(targetStatements, _resolveStyleStatements(componentStyles, fileSuffix));
        }
        ListWrapper.addAll(targetStatements, _resolveViewStatements(viewResult));
        return viewResult.viewFactoryVar;
    }
    _codgenStyles(stylesCompileResult, fileSuffix) {
        _resolveStyleStatements(stylesCompileResult, fileSuffix);
        return this._codegenSourceModule(_stylesModuleUrl(stylesCompileResult.meta.moduleUrl, stylesCompileResult.isShimmed, fileSuffix), stylesCompileResult.statements, [stylesCompileResult.stylesVar]);
    }
    _codegenSourceModule(moduleUrl, statements, exportedVars) {
        return new SourceModule(moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
    }
}
function _resolveViewStatements(compileResult) {
    compileResult.dependencies.forEach((dep) => {
        if (dep instanceof ViewFactoryDependency) {
            let vfd = dep;
            vfd.placeholder.moduleUrl = _ngfactoryModuleUrl(vfd.comp.moduleUrl);
        }
        else if (dep instanceof ComponentFactoryDependency) {
            let cfd = dep;
            cfd.placeholder.name = _componentFactoryName(cfd.comp);
            cfd.placeholder.moduleUrl = _ngfactoryModuleUrl(cfd.comp.moduleUrl);
        }
    });
    return compileResult.statements;
}
function _resolveStyleStatements(compileResult, fileSuffix) {
    compileResult.dependencies.forEach((dep) => {
        dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.moduleUrl, dep.isShimmed, fileSuffix);
    });
    return compileResult.statements;
}
function _ngfactoryModuleUrl(compUrl) {
    var urlWithSuffix = _splitLastSuffix(compUrl);
    return `${urlWithSuffix[0]}.ngfactory${urlWithSuffix[1]}`;
}
function _componentFactoryName(comp) {
    return `${comp.name}NgFactory`;
}
function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
    return shim ? `${stylesheetUrl}.shim${suffix}` : `${stylesheetUrl}${suffix}`;
}
function _assertComponent(meta) {
    if (!meta.isComponent) {
        throw new BaseException(`Could not compile '${meta.type.name}' because it is not a component.`);
    }
}
function _splitLastSuffix(path) {
    let lastDot = path.lastIndexOf('.');
    if (lastDot !== -1) {
        return [path.substring(0, lastDot), path.substring(lastDot)];
    }
    else {
        return [path, ''];
    }
}
//# sourceMappingURL=offline_compiler.js.map