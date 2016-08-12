/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var collection_1 = require('../src/facade/collection');
var assertions_1 = require('./assertions');
var cpl = require('./compile_metadata');
var config_1 = require('./config');
var directive_resolver_1 = require('./directive_resolver');
var exceptions_1 = require('./facade/exceptions');
var lang_1 = require('./facade/lang');
var identifiers_1 = require('./identifiers');
var lifecycle_reflector_1 = require('./lifecycle_reflector');
var ng_module_resolver_1 = require('./ng_module_resolver');
var pipe_resolver_1 = require('./pipe_resolver');
var element_schema_registry_1 = require('./schema/element_schema_registry');
var url_resolver_1 = require('./url_resolver');
var util_1 = require('./util');
var CompileMetadataResolver = (function () {
    function CompileMetadataResolver(_ngModuleResolver, _directiveResolver, _pipeResolver, _config, _console, _schemaRegistry, _reflector) {
        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
        this._ngModuleResolver = _ngModuleResolver;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._config = _config;
        this._console = _console;
        this._schemaRegistry = _schemaRegistry;
        this._reflector = _reflector;
        this._directiveCache = new Map();
        this._pipeCache = new Map();
        this._ngModuleCache = new Map();
        this._ngModuleOfTypes = new Map();
        this._anonymousTypes = new Map();
        this._anonymousTypeIndex = 0;
    }
    CompileMetadataResolver.prototype.sanitizeTokenName = function (token) {
        var identifier = lang_1.stringify(token);
        if (identifier.indexOf('(') >= 0) {
            // case: anonymous functions!
            var found = this._anonymousTypes.get(token);
            if (lang_1.isBlank(found)) {
                this._anonymousTypes.set(token, this._anonymousTypeIndex++);
                found = this._anonymousTypes.get(token);
            }
            identifier = "anonymous_token_" + found + "_";
        }
        return util_1.sanitizeIdentifier(identifier);
    };
    CompileMetadataResolver.prototype.clearCacheFor = function (type) {
        this._directiveCache.delete(type);
        this._pipeCache.delete(type);
        this._ngModuleOfTypes.delete(type);
        // Clear all of the NgModuleMetadata as they contain transitive information!
        this._ngModuleCache.clear();
    };
    CompileMetadataResolver.prototype.clearCache = function () {
        this._directiveCache.clear();
        this._pipeCache.clear();
        this._ngModuleCache.clear();
        this._ngModuleOfTypes.clear();
    };
    CompileMetadataResolver.prototype.getAnimationEntryMetadata = function (entry) {
        var _this = this;
        var defs = entry.definitions.map(function (def) { return _this.getAnimationStateMetadata(def); });
        return new cpl.CompileAnimationEntryMetadata(entry.name, defs);
    };
    CompileMetadataResolver.prototype.getAnimationStateMetadata = function (value) {
        if (value instanceof core_1.AnimationStateDeclarationMetadata) {
            var styles = this.getAnimationStyleMetadata(value.styles);
            return new cpl.CompileAnimationStateDeclarationMetadata(value.stateNameExpr, styles);
        }
        else if (value instanceof core_1.AnimationStateTransitionMetadata) {
            return new cpl.CompileAnimationStateTransitionMetadata(value.stateChangeExpr, this.getAnimationMetadata(value.steps));
        }
        return null;
    };
    CompileMetadataResolver.prototype.getAnimationStyleMetadata = function (value) {
        return new cpl.CompileAnimationStyleMetadata(value.offset, value.styles);
    };
    CompileMetadataResolver.prototype.getAnimationMetadata = function (value) {
        var _this = this;
        if (value instanceof core_1.AnimationStyleMetadata) {
            return this.getAnimationStyleMetadata(value);
        }
        else if (value instanceof core_1.AnimationKeyframesSequenceMetadata) {
            return new cpl.CompileAnimationKeyframesSequenceMetadata(value.steps.map(function (entry) { return _this.getAnimationStyleMetadata(entry); }));
        }
        else if (value instanceof core_1.AnimationAnimateMetadata) {
            var animateData = this
                .getAnimationMetadata(value.styles);
            return new cpl.CompileAnimationAnimateMetadata(value.timings, animateData);
        }
        else if (value instanceof core_1.AnimationWithStepsMetadata) {
            var steps = value.steps.map(function (step) { return _this.getAnimationMetadata(step); });
            if (value instanceof core_1.AnimationGroupMetadata) {
                return new cpl.CompileAnimationGroupMetadata(steps);
            }
            else {
                return new cpl.CompileAnimationSequenceMetadata(steps);
            }
        }
        return null;
    };
    CompileMetadataResolver.prototype.getDirectiveMetadata = function (directiveType, throwIfNotFound) {
        var _this = this;
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        directiveType = core_1.resolveForwardRef(directiveType);
        var meta = this._directiveCache.get(directiveType);
        if (lang_1.isBlank(meta)) {
            var dirMeta = this._directiveResolver.resolve(directiveType, throwIfNotFound);
            if (!dirMeta) {
                return null;
            }
            var templateMeta = null;
            var changeDetectionStrategy = null;
            var viewProviders = [];
            var moduleUrl = staticTypeModuleUrl(directiveType);
            var viewDirectiveTypes = [];
            var viewPipeTypes = [];
            var entryComponentTypes = [];
            var selector = dirMeta.selector;
            if (dirMeta instanceof core_1.ComponentMetadata) {
                var cmpMeta = dirMeta;
                assertions_1.assertArrayOfStrings('styles', cmpMeta.styles);
                assertions_1.assertInterpolationSymbols('interpolation', cmpMeta.interpolation);
                var animations = lang_1.isPresent(cmpMeta.animations) ?
                    cmpMeta.animations.map(function (e) { return _this.getAnimationEntryMetadata(e); }) :
                    null;
                assertions_1.assertArrayOfStrings('styles', cmpMeta.styles);
                assertions_1.assertArrayOfStrings('styleUrls', cmpMeta.styleUrls);
                templateMeta = new cpl.CompileTemplateMetadata({
                    encapsulation: cmpMeta.encapsulation,
                    template: cmpMeta.template,
                    templateUrl: cmpMeta.templateUrl,
                    styles: cmpMeta.styles,
                    styleUrls: cmpMeta.styleUrls,
                    animations: animations,
                    interpolation: cmpMeta.interpolation
                });
                changeDetectionStrategy = cmpMeta.changeDetection;
                if (lang_1.isPresent(dirMeta.viewProviders)) {
                    viewProviders = this.getProvidersMetadata(verifyNonBlankProviders(directiveType, dirMeta.viewProviders, 'viewProviders'), []);
                }
                moduleUrl = componentModuleUrl(this._reflector, directiveType, cmpMeta);
                if (cmpMeta.entryComponents) {
                    entryComponentTypes =
                        flattenArray(cmpMeta.entryComponents)
                            .map(function (type) { return _this.getTypeMetadata(type, staticTypeModuleUrl(type)); });
                }
                if (cmpMeta.directives) {
                    viewDirectiveTypes = flattenArray(cmpMeta.directives).map(function (type) {
                        if (!type) {
                            throw new exceptions_1.BaseException("Unexpected directive value '" + type + "' on the View of component '" + lang_1.stringify(directiveType) + "'");
                        }
                        return _this.getTypeMetadata(type, staticTypeModuleUrl(type));
                    });
                }
                if (cmpMeta.pipes) {
                    viewPipeTypes = flattenArray(cmpMeta.pipes).map(function (type) {
                        if (!type) {
                            throw new exceptions_1.BaseException("Unexpected pipe value '" + type + "' on the View of component '" + lang_1.stringify(directiveType) + "'");
                        }
                        return _this.getTypeMetadata(type, staticTypeModuleUrl(type));
                    });
                }
                if (!selector) {
                    selector = this._schemaRegistry.getDefaultComponentElementName();
                }
            }
            else {
                if (!selector) {
                    throw new exceptions_1.BaseException("Directive " + lang_1.stringify(directiveType) + " has no selector, please add it!");
                }
            }
            var providers = [];
            if (lang_1.isPresent(dirMeta.providers)) {
                providers = this.getProvidersMetadata(verifyNonBlankProviders(directiveType, dirMeta.providers, 'providers'), entryComponentTypes);
            }
            var queries = [];
            var viewQueries = [];
            if (lang_1.isPresent(dirMeta.queries)) {
                queries = this.getQueriesMetadata(dirMeta.queries, false, directiveType);
                viewQueries = this.getQueriesMetadata(dirMeta.queries, true, directiveType);
            }
            meta = cpl.CompileDirectiveMetadata.create({
                selector: selector,
                exportAs: dirMeta.exportAs,
                isComponent: lang_1.isPresent(templateMeta),
                type: this.getTypeMetadata(directiveType, moduleUrl),
                template: templateMeta,
                changeDetection: changeDetectionStrategy,
                inputs: dirMeta.inputs,
                outputs: dirMeta.outputs,
                host: dirMeta.host,
                providers: providers,
                viewProviders: viewProviders,
                queries: queries,
                viewQueries: viewQueries,
                viewDirectives: viewDirectiveTypes,
                viewPipes: viewPipeTypes,
                entryComponents: entryComponentTypes
            });
            this._directiveCache.set(directiveType, meta);
        }
        return meta;
    };
    CompileMetadataResolver.prototype.getNgModuleMetadata = function (moduleType, throwIfNotFound) {
        var _this = this;
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        moduleType = core_1.resolveForwardRef(moduleType);
        var compileMeta = this._ngModuleCache.get(moduleType);
        if (!compileMeta) {
            var meta = this._ngModuleResolver.resolve(moduleType, throwIfNotFound);
            if (!meta) {
                return null;
            }
            var declaredDirectives_1 = [];
            var exportedDirectives_1 = [];
            var declaredPipes_1 = [];
            var exportedPipes_1 = [];
            var importedModules_1 = [];
            var exportedModules_1 = [];
            var providers_1 = [];
            var entryComponents_1 = [];
            var bootstrapComponents = [];
            var schemas = [];
            if (meta.imports) {
                flattenArray(meta.imports).forEach(function (importedType) {
                    var importedModuleType;
                    if (isValidType(importedType)) {
                        importedModuleType = importedType;
                    }
                    else if (importedType && importedType.ngModule) {
                        var moduleWithProviders = importedType;
                        importedModuleType = moduleWithProviders.ngModule;
                        if (moduleWithProviders.providers) {
                            providers_1.push.apply(providers_1, _this.getProvidersMetadata(moduleWithProviders.providers, entryComponents_1));
                        }
                    }
                    if (importedModuleType) {
                        importedModules_1.push(_this.getNgModuleMetadata(importedModuleType, false));
                    }
                    else {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(importedType) + "' imported by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                });
            }
            if (meta.exports) {
                flattenArray(meta.exports).forEach(function (exportedType) {
                    if (!isValidType(exportedType)) {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(exportedType) + "' exported by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                    var exportedDirMeta;
                    var exportedPipeMeta;
                    var exportedModuleMeta;
                    if (exportedDirMeta = _this.getDirectiveMetadata(exportedType, false)) {
                        exportedDirectives_1.push(exportedDirMeta);
                    }
                    else if (exportedPipeMeta = _this.getPipeMetadata(exportedType, false)) {
                        exportedPipes_1.push(exportedPipeMeta);
                    }
                    else if (exportedModuleMeta = _this.getNgModuleMetadata(exportedType, false)) {
                        exportedModules_1.push(exportedModuleMeta);
                    }
                    else {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(exportedType) + "' exported by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                });
            }
            // Note: This will be modified later, so we rely on
            // getting a new instance every time!
            var transitiveModule_1 = this._getTransitiveNgModuleMetadata(importedModules_1, exportedModules_1);
            if (meta.declarations) {
                flattenArray(meta.declarations).forEach(function (declaredType) {
                    if (!isValidType(declaredType)) {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(declaredType) + "' declared by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                    var declaredDirMeta;
                    var declaredPipeMeta;
                    if (declaredDirMeta = _this.getDirectiveMetadata(declaredType, false)) {
                        _this._addDirectiveToModule(declaredDirMeta, moduleType, transitiveModule_1, declaredDirectives_1, true);
                    }
                    else if (declaredPipeMeta = _this.getPipeMetadata(declaredType, false)) {
                        _this._addPipeToModule(declaredPipeMeta, moduleType, transitiveModule_1, declaredPipes_1, true);
                    }
                    else {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(declaredType) + "' declared by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                });
            }
            // The providers of the module have to go last
            // so that they overwrite any other provider we already added.
            if (meta.providers) {
                providers_1.push.apply(providers_1, this.getProvidersMetadata(meta.providers, entryComponents_1));
            }
            if (meta.entryComponents) {
                entryComponents_1.push.apply(entryComponents_1, flattenArray(meta.entryComponents)
                    .map(function (type) { return _this.getTypeMetadata(type, staticTypeModuleUrl(type)); }));
            }
            if (meta.bootstrap) {
                bootstrapComponents.push.apply(bootstrapComponents, flattenArray(meta.bootstrap)
                    .map(function (type) { return _this.getTypeMetadata(type, staticTypeModuleUrl(type)); }));
            }
            entryComponents_1.push.apply(entryComponents_1, bootstrapComponents);
            if (meta.schemas) {
                schemas.push.apply(schemas, flattenArray(meta.schemas));
            }
            (_a = transitiveModule_1.entryComponents).push.apply(_a, entryComponents_1);
            (_b = transitiveModule_1.providers).push.apply(_b, providers_1);
            compileMeta = new cpl.CompileNgModuleMetadata({
                type: this.getTypeMetadata(moduleType, staticTypeModuleUrl(moduleType)),
                providers: providers_1,
                entryComponents: entryComponents_1,
                bootstrapComponents: bootstrapComponents,
                schemas: schemas,
                declaredDirectives: declaredDirectives_1,
                exportedDirectives: exportedDirectives_1,
                declaredPipes: declaredPipes_1,
                exportedPipes: exportedPipes_1,
                importedModules: importedModules_1,
                exportedModules: exportedModules_1,
                transitiveModule: transitiveModule_1
            });
            transitiveModule_1.modules.push(compileMeta);
            this._verifyModule(compileMeta);
            this._ngModuleCache.set(moduleType, compileMeta);
        }
        return compileMeta;
        var _a, _b;
    };
    CompileMetadataResolver.prototype.addComponentToModule = function (moduleType, compType) {
        var moduleMeta = this.getNgModuleMetadata(moduleType);
        // Collect @Component.directives/pipes/entryComponents into our declared directives/pipes.
        var compMeta = this.getDirectiveMetadata(compType, false);
        this._addDirectiveToModule(compMeta, moduleMeta.type.runtime, moduleMeta.transitiveModule, moduleMeta.declaredDirectives);
        moduleMeta.transitiveModule.entryComponents.push(compMeta.type);
        moduleMeta.entryComponents.push(compMeta.type);
        this._verifyModule(moduleMeta);
    };
    CompileMetadataResolver.prototype._verifyModule = function (moduleMeta) {
        var _this = this;
        moduleMeta.exportedDirectives.forEach(function (dirMeta) {
            if (!moduleMeta.transitiveModule.directivesSet.has(dirMeta.type.runtime)) {
                throw new exceptions_1.BaseException("Can't export directive " + lang_1.stringify(dirMeta.type.runtime) + " from " + lang_1.stringify(moduleMeta.type.runtime) + " as it was neither declared nor imported!");
            }
        });
        moduleMeta.exportedPipes.forEach(function (pipeMeta) {
            if (!moduleMeta.transitiveModule.pipesSet.has(pipeMeta.type.runtime)) {
                throw new exceptions_1.BaseException("Can't export pipe " + lang_1.stringify(pipeMeta.type.runtime) + " from " + lang_1.stringify(moduleMeta.type.runtime) + " as it was neither declared nor imported!");
            }
        });
        moduleMeta.entryComponents.forEach(function (entryComponentType) {
            if (!moduleMeta.transitiveModule.directivesSet.has(entryComponentType.runtime)) {
                _this._addDirectiveToModule(_this.getDirectiveMetadata(entryComponentType.runtime), moduleMeta.type.runtime, moduleMeta.transitiveModule, moduleMeta.declaredDirectives);
                _this._console.warn("NgModule " + lang_1.stringify(moduleMeta.type.runtime) + " uses " + lang_1.stringify(entryComponentType.runtime) + " via \"entryComponents\" but it was neither declared nor imported! This warning will become an error after final.");
            }
        });
        // Collect @Component.directives/pipes/entryComponents into our declared
        // directives/pipes. Do this last so that directives added by previous steps
        // are considered as well!
        moduleMeta.declaredDirectives.forEach(function (dirMeta) { _this._getTransitiveViewDirectivesAndPipes(dirMeta, moduleMeta); });
    };
    CompileMetadataResolver.prototype._addTypeToModule = function (type, moduleType) {
        var oldModule = this._ngModuleOfTypes.get(type);
        if (oldModule && oldModule !== moduleType) {
            throw new exceptions_1.BaseException("Type " + lang_1.stringify(type) + " is part of the declarations of 2 modules: " + lang_1.stringify(oldModule) + " and " + lang_1.stringify(moduleType) + "!");
        }
        this._ngModuleOfTypes.set(type, moduleType);
    };
    CompileMetadataResolver.prototype._getTransitiveViewDirectivesAndPipes = function (compMeta, moduleMeta) {
        var _this = this;
        if (!compMeta.isComponent) {
            return;
        }
        var addPipe = function (pipeType) {
            var pipeMeta = _this.getPipeMetadata(pipeType);
            _this._addPipeToModule(pipeMeta, moduleMeta.type.runtime, moduleMeta.transitiveModule, moduleMeta.declaredPipes);
        };
        var addDirective = function (dirType) {
            var dirMeta = _this.getDirectiveMetadata(dirType);
            if (_this._addDirectiveToModule(dirMeta, moduleMeta.type.runtime, moduleMeta.transitiveModule, moduleMeta.declaredDirectives)) {
                _this._getTransitiveViewDirectivesAndPipes(dirMeta, moduleMeta);
            }
        };
        if (compMeta.viewPipes) {
            compMeta.viewPipes.forEach(function (cplType) { return addPipe(cplType.runtime); });
        }
        if (compMeta.viewDirectives) {
            compMeta.viewDirectives.forEach(function (cplType) { return addDirective(cplType.runtime); });
        }
        compMeta.entryComponents.forEach(function (entryComponentType) {
            if (!moduleMeta.transitiveModule.directivesSet.has(entryComponentType.runtime)) {
                _this._console.warn("Component " + lang_1.stringify(compMeta.type.runtime) + " in NgModule " + lang_1.stringify(moduleMeta.type.runtime) + " uses " + lang_1.stringify(entryComponentType.runtime) + " via \"entryComponents\" but it was neither declared nor imported into the module! This warning will become an error after final.");
                addDirective(entryComponentType.runtime);
            }
        });
    };
    CompileMetadataResolver.prototype._getTransitiveNgModuleMetadata = function (importedModules, exportedModules) {
        // collect `providers` / `entryComponents` from all imported and all exported modules
        var transitiveModules = getTransitiveModules(importedModules.concat(exportedModules), true);
        var providers = flattenArray(transitiveModules.map(function (ngModule) { return ngModule.providers; }));
        var entryComponents = flattenArray(transitiveModules.map(function (ngModule) { return ngModule.entryComponents; }));
        var transitiveExportedModules = getTransitiveModules(importedModules, false);
        var directives = flattenArray(transitiveExportedModules.map(function (ngModule) { return ngModule.exportedDirectives; }));
        var pipes = flattenArray(transitiveExportedModules.map(function (ngModule) { return ngModule.exportedPipes; }));
        return new cpl.TransitiveCompileNgModuleMetadata(transitiveModules, providers, entryComponents, directives, pipes);
    };
    CompileMetadataResolver.prototype._addDirectiveToModule = function (dirMeta, moduleType, transitiveModule, declaredDirectives, force) {
        if (force === void 0) { force = false; }
        if (force || !transitiveModule.directivesSet.has(dirMeta.type.runtime)) {
            transitiveModule.directivesSet.add(dirMeta.type.runtime);
            transitiveModule.directives.push(dirMeta);
            declaredDirectives.push(dirMeta);
            this._addTypeToModule(dirMeta.type.runtime, moduleType);
            return true;
        }
        return false;
    };
    CompileMetadataResolver.prototype._addPipeToModule = function (pipeMeta, moduleType, transitiveModule, declaredPipes, force) {
        if (force === void 0) { force = false; }
        if (force || !transitiveModule.pipesSet.has(pipeMeta.type.runtime)) {
            transitiveModule.pipesSet.add(pipeMeta.type.runtime);
            transitiveModule.pipes.push(pipeMeta);
            declaredPipes.push(pipeMeta);
            this._addTypeToModule(pipeMeta.type.runtime, moduleType);
            return true;
        }
        return false;
    };
    CompileMetadataResolver.prototype.getTypeMetadata = function (type, moduleUrl, dependencies) {
        if (dependencies === void 0) { dependencies = null; }
        type = core_1.resolveForwardRef(type);
        return new cpl.CompileTypeMetadata({
            name: this.sanitizeTokenName(type),
            moduleUrl: moduleUrl,
            runtime: type,
            diDeps: this.getDependenciesMetadata(type, dependencies),
            lifecycleHooks: core_private_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return lifecycle_reflector_1.hasLifecycleHook(hook, type); }),
        });
    };
    CompileMetadataResolver.prototype.getFactoryMetadata = function (factory, moduleUrl, dependencies) {
        if (dependencies === void 0) { dependencies = null; }
        factory = core_1.resolveForwardRef(factory);
        return new cpl.CompileFactoryMetadata({
            name: this.sanitizeTokenName(factory),
            moduleUrl: moduleUrl,
            runtime: factory,
            diDeps: this.getDependenciesMetadata(factory, dependencies)
        });
    };
    CompileMetadataResolver.prototype.getPipeMetadata = function (pipeType, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        pipeType = core_1.resolveForwardRef(pipeType);
        var meta = this._pipeCache.get(pipeType);
        if (lang_1.isBlank(meta)) {
            var pipeMeta = this._pipeResolver.resolve(pipeType, throwIfNotFound);
            if (!pipeMeta) {
                return null;
            }
            meta = new cpl.CompilePipeMetadata({
                type: this.getTypeMetadata(pipeType, staticTypeModuleUrl(pipeType)),
                name: pipeMeta.name,
                pure: pipeMeta.pure
            });
            this._pipeCache.set(pipeType, meta);
        }
        return meta;
    };
    CompileMetadataResolver.prototype.getDependenciesMetadata = function (typeOrFunc, dependencies) {
        var _this = this;
        var hasUnknownDeps = false;
        var params = lang_1.isPresent(dependencies) ? dependencies : this._reflector.parameters(typeOrFunc);
        if (lang_1.isBlank(params)) {
            params = [];
        }
        var dependenciesMetadata = params.map(function (param) {
            var isAttribute = false;
            var isHost = false;
            var isSelf = false;
            var isSkipSelf = false;
            var isOptional = false;
            var query = null;
            var viewQuery = null;
            var token = null;
            if (lang_1.isArray(param)) {
                param.forEach(function (paramEntry) {
                    if (paramEntry instanceof core_1.HostMetadata) {
                        isHost = true;
                    }
                    else if (paramEntry instanceof core_1.SelfMetadata) {
                        isSelf = true;
                    }
                    else if (paramEntry instanceof core_1.SkipSelfMetadata) {
                        isSkipSelf = true;
                    }
                    else if (paramEntry instanceof core_1.OptionalMetadata) {
                        isOptional = true;
                    }
                    else if (paramEntry instanceof core_1.AttributeMetadata) {
                        isAttribute = true;
                        token = paramEntry.attributeName;
                    }
                    else if (paramEntry instanceof core_1.QueryMetadata) {
                        if (paramEntry.isViewQuery) {
                            viewQuery = paramEntry;
                        }
                        else {
                            query = paramEntry;
                        }
                    }
                    else if (paramEntry instanceof core_1.InjectMetadata) {
                        token = paramEntry.token;
                    }
                    else if (isValidType(paramEntry) && lang_1.isBlank(token)) {
                        token = paramEntry;
                    }
                });
            }
            else {
                token = param;
            }
            if (lang_1.isBlank(token)) {
                hasUnknownDeps = true;
                return null;
            }
            return new cpl.CompileDiDependencyMetadata({
                isAttribute: isAttribute,
                isHost: isHost,
                isSelf: isSelf,
                isSkipSelf: isSkipSelf,
                isOptional: isOptional,
                query: lang_1.isPresent(query) ? _this.getQueryMetadata(query, null, typeOrFunc) : null,
                viewQuery: lang_1.isPresent(viewQuery) ? _this.getQueryMetadata(viewQuery, null, typeOrFunc) : null,
                token: _this.getTokenMetadata(token)
            });
        });
        if (hasUnknownDeps) {
            var depsTokens = dependenciesMetadata.map(function (dep) { return dep ? lang_1.stringify(dep.token) : '?'; })
                .join(', ');
            throw new exceptions_1.BaseException("Can't resolve all parameters for " + lang_1.stringify(typeOrFunc) + ": (" + depsTokens + ").");
        }
        return dependenciesMetadata;
    };
    CompileMetadataResolver.prototype.getTokenMetadata = function (token) {
        token = core_1.resolveForwardRef(token);
        var compileToken;
        if (lang_1.isString(token)) {
            compileToken = new cpl.CompileTokenMetadata({ value: token });
        }
        else {
            compileToken = new cpl.CompileTokenMetadata({
                identifier: new cpl.CompileIdentifierMetadata({
                    runtime: token,
                    name: this.sanitizeTokenName(token),
                    moduleUrl: staticTypeModuleUrl(token)
                })
            });
        }
        return compileToken;
    };
    CompileMetadataResolver.prototype.getProvidersMetadata = function (providers, targetEntryComponents) {
        var _this = this;
        var compileProviders = [];
        providers.forEach(function (provider) {
            provider = core_1.resolveForwardRef(provider);
            if (core_private_1.isProviderLiteral(provider)) {
                provider = core_private_1.createProvider(provider);
            }
            var compileProvider;
            if (lang_1.isArray(provider)) {
                compileProvider = _this.getProvidersMetadata(provider, targetEntryComponents);
            }
            else if (provider instanceof core_1.Provider) {
                var tokenMeta = _this.getTokenMetadata(provider.token);
                if (tokenMeta.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ANALYZE_FOR_ENTRY_COMPONENTS))) {
                    targetEntryComponents.push.apply(targetEntryComponents, _this._getEntryComponentsFromProvider(provider));
                }
                else {
                    compileProvider = _this.getProviderMetadata(provider);
                }
            }
            else if (isValidType(provider)) {
                compileProvider = _this.getTypeMetadata(provider, staticTypeModuleUrl(provider));
            }
            else {
                throw new exceptions_1.BaseException("Invalid provider - only instances of Provider and Type are allowed, got: " + lang_1.stringify(provider));
            }
            if (compileProvider) {
                compileProviders.push(compileProvider);
            }
        });
        return compileProviders;
    };
    CompileMetadataResolver.prototype._getEntryComponentsFromProvider = function (provider) {
        var _this = this;
        var components = [];
        var collectedIdentifiers = [];
        if (provider.useFactory || provider.useExisting || provider.useClass) {
            throw new exceptions_1.BaseException("The ANALYZE_FOR_ENTRY_COMPONENTS token only supports useValue!");
        }
        if (!provider.multi) {
            throw new exceptions_1.BaseException("The ANALYZE_FOR_ENTRY_COMPONENTS token only supports 'multi = true'!");
        }
        convertToCompileValue(provider.useValue, collectedIdentifiers);
        collectedIdentifiers.forEach(function (identifier) {
            var dirMeta = _this.getDirectiveMetadata(identifier.runtime, false);
            if (dirMeta) {
                components.push(dirMeta.type);
            }
        });
        return components;
    };
    CompileMetadataResolver.prototype.getProviderMetadata = function (provider) {
        var compileDeps;
        var compileTypeMetadata = null;
        var compileFactoryMetadata = null;
        if (lang_1.isPresent(provider.useClass)) {
            compileTypeMetadata = this.getTypeMetadata(provider.useClass, staticTypeModuleUrl(provider.useClass), provider.dependencies);
            compileDeps = compileTypeMetadata.diDeps;
        }
        else if (lang_1.isPresent(provider.useFactory)) {
            compileFactoryMetadata = this.getFactoryMetadata(provider.useFactory, staticTypeModuleUrl(provider.useFactory), provider.dependencies);
            compileDeps = compileFactoryMetadata.diDeps;
        }
        return new cpl.CompileProviderMetadata({
            token: this.getTokenMetadata(provider.token),
            useClass: compileTypeMetadata,
            useValue: convertToCompileValue(provider.useValue, []),
            useFactory: compileFactoryMetadata,
            useExisting: lang_1.isPresent(provider.useExisting) ? this.getTokenMetadata(provider.useExisting) :
                null,
            deps: compileDeps,
            multi: provider.multi
        });
    };
    CompileMetadataResolver.prototype.getQueriesMetadata = function (queries, isViewQuery, directiveType) {
        var _this = this;
        var res = [];
        collection_1.StringMapWrapper.forEach(queries, function (query, propertyName) {
            if (query.isViewQuery === isViewQuery) {
                res.push(_this.getQueryMetadata(query, propertyName, directiveType));
            }
        });
        return res;
    };
    CompileMetadataResolver.prototype.getQueryMetadata = function (q, propertyName, typeOrFunc) {
        var _this = this;
        var selectors;
        if (q.isVarBindingQuery) {
            selectors = q.varBindings.map(function (varName) { return _this.getTokenMetadata(varName); });
        }
        else {
            if (!lang_1.isPresent(q.selector)) {
                throw new exceptions_1.BaseException("Can't construct a query for the property \"" + propertyName + "\" of \"" + lang_1.stringify(typeOrFunc) + "\" since the query selector wasn't defined.");
            }
            selectors = [this.getTokenMetadata(q.selector)];
        }
        return new cpl.CompileQueryMetadata({
            selectors: selectors,
            first: q.first,
            descendants: q.descendants,
            propertyName: propertyName,
            read: lang_1.isPresent(q.read) ? this.getTokenMetadata(q.read) : null
        });
    };
    /** @nocollapse */
    CompileMetadataResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CompileMetadataResolver.ctorParameters = [
        { type: ng_module_resolver_1.NgModuleResolver, },
        { type: directive_resolver_1.DirectiveResolver, },
        { type: pipe_resolver_1.PipeResolver, },
        { type: config_1.CompilerConfig, },
        { type: core_private_1.Console, },
        { type: element_schema_registry_1.ElementSchemaRegistry, },
        { type: core_private_1.ReflectorReader, },
    ];
    return CompileMetadataResolver;
}());
exports.CompileMetadataResolver = CompileMetadataResolver;
function getTransitiveModules(modules, includeImports, targetModules, visitedModules) {
    if (targetModules === void 0) { targetModules = []; }
    if (visitedModules === void 0) { visitedModules = new Set(); }
    modules.forEach(function (ngModule) {
        if (!visitedModules.has(ngModule.type.runtime)) {
            visitedModules.add(ngModule.type.runtime);
            var nestedModules = includeImports ?
                ngModule.importedModules.concat(ngModule.exportedModules) :
                ngModule.exportedModules;
            getTransitiveModules(nestedModules, includeImports, targetModules, visitedModules);
            // Add after recursing so imported/exported modules are before the module itself.
            // This is important for overwriting providers of imported modules!
            targetModules.push(ngModule);
        }
    });
    return targetModules;
}
function flattenArray(tree, out) {
    if (out === void 0) { out = []; }
    if (tree) {
        for (var i = 0; i < tree.length; i++) {
            var item = core_1.resolveForwardRef(tree[i]);
            if (lang_1.isArray(item)) {
                flattenArray(item, out);
            }
            else {
                out.push(item);
            }
        }
    }
    return out;
}
function verifyNonBlankProviders(directiveType, providersTree, providersType) {
    var flat = [];
    var errMsg;
    flattenArray(providersTree, flat);
    for (var i = 0; i < flat.length; i++) {
        if (lang_1.isBlank(flat[i])) {
            errMsg = flat.map(function (provider) { return lang_1.isBlank(provider) ? '?' : lang_1.stringify(provider); }).join(', ');
            throw new exceptions_1.BaseException("One or more of " + providersType + " for \"" + lang_1.stringify(directiveType) + "\" were not defined: [" + errMsg + "].");
        }
    }
    return providersTree;
}
function isValidType(value) {
    return cpl.isStaticSymbol(value) || (value instanceof lang_1.Type);
}
function staticTypeModuleUrl(value) {
    return cpl.isStaticSymbol(value) ? value.filePath : null;
}
function componentModuleUrl(reflector, type, cmpMetadata) {
    if (cpl.isStaticSymbol(type)) {
        return staticTypeModuleUrl(type);
    }
    if (lang_1.isPresent(cmpMetadata.moduleId)) {
        var moduleId = cmpMetadata.moduleId;
        var scheme = url_resolver_1.getUrlScheme(moduleId);
        return lang_1.isPresent(scheme) && scheme.length > 0 ? moduleId :
            "package:" + moduleId + util_1.MODULE_SUFFIX;
    }
    return reflector.importUri(type);
}
function convertToCompileValue(value, targetIdentifiers) {
    return util_1.visitValue(value, new _CompileValueConverter(), targetIdentifiers);
}
var _CompileValueConverter = (function (_super) {
    __extends(_CompileValueConverter, _super);
    function _CompileValueConverter() {
        _super.apply(this, arguments);
    }
    _CompileValueConverter.prototype.visitOther = function (value, targetIdentifiers) {
        var identifier;
        if (cpl.isStaticSymbol(value)) {
            identifier = new cpl.CompileIdentifierMetadata({ name: value.name, moduleUrl: value.filePath, runtime: value });
        }
        else {
            identifier = new cpl.CompileIdentifierMetadata({ runtime: value });
        }
        targetIdentifiers.push(identifier);
        return identifier;
    };
    return _CompileValueConverter;
}(util_1.ValueTransformer));
//# sourceMappingURL=metadata_resolver.js.map