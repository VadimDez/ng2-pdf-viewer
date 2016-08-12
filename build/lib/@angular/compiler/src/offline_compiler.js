/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compile_metadata_1 = require('./compile_metadata');
var collection_1 = require('./facade/collection');
var exceptions_1 = require('./facade/exceptions');
var identifiers_1 = require('./identifiers');
var o = require('./output/output_ast');
var view_compiler_1 = require('./view_compiler/view_compiler');
var SourceModule = (function () {
    function SourceModule(moduleUrl, source) {
        this.moduleUrl = moduleUrl;
        this.source = source;
    }
    return SourceModule;
}());
exports.SourceModule = SourceModule;
var NgModulesSummary = (function () {
    function NgModulesSummary(ngModuleByComponent) {
        this.ngModuleByComponent = ngModuleByComponent;
    }
    return NgModulesSummary;
}());
exports.NgModulesSummary = NgModulesSummary;
var OfflineCompiler = (function () {
    function OfflineCompiler(_metadataResolver, _directiveNormalizer, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _outputEmitter) {
        this._metadataResolver = _metadataResolver;
        this._directiveNormalizer = _directiveNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._outputEmitter = _outputEmitter;
    }
    OfflineCompiler.prototype.analyzeModules = function (ngModules) {
        var _this = this;
        var ngModuleByComponent = new Map();
        ngModules.forEach(function (ngModule) {
            var ngModuleMeta = _this._metadataResolver.getNgModuleMetadata(ngModule);
            ngModuleMeta.declaredDirectives.forEach(function (dirMeta) {
                if (dirMeta.isComponent) {
                    ngModuleByComponent.set(dirMeta.type.runtime, ngModuleMeta);
                }
            });
        });
        return new NgModulesSummary(ngModuleByComponent);
    };
    OfflineCompiler.prototype.clearCache = function () {
        this._directiveNormalizer.clearCache();
        this._metadataResolver.clearCache();
    };
    OfflineCompiler.prototype.compile = function (moduleUrl, ngModulesSummary, components, ngModules) {
        var _this = this;
        var fileSuffix = _splitLastSuffix(moduleUrl)[1];
        var statements = [];
        var exportedVars = [];
        var outputSourceModules = [];
        // compile all ng modules
        exportedVars.push.apply(exportedVars, ngModules.map(function (ngModuleType) { return _this._compileModule(ngModuleType, statements); }));
        // compile components
        return Promise
            .all(components.map(function (compType) {
            var compMeta = _this._metadataResolver.getDirectiveMetadata(compType);
            var ngModule = ngModulesSummary.ngModuleByComponent.get(compType);
            if (!ngModule) {
                throw new exceptions_1.BaseException("Cannot determine the module for component " + compMeta.type.name + "!");
            }
            return Promise
                .all([compMeta].concat(ngModule.transitiveModule.directives).map(function (dirMeta) { return _this._directiveNormalizer.normalizeDirective(dirMeta).asyncResult; }))
                .then(function (normalizedCompWithDirectives) {
                var compMeta = normalizedCompWithDirectives[0];
                var dirMetas = normalizedCompWithDirectives.slice(1);
                _assertComponent(compMeta);
                // compile styles
                var stylesCompileResults = _this._styleCompiler.compileComponent(compMeta);
                stylesCompileResults.externalStylesheets.forEach(function (compiledStyleSheet) {
                    outputSourceModules.push(_this._codgenStyles(compiledStyleSheet, fileSuffix));
                });
                // compile components
                exportedVars.push(_this._compileComponentFactory(compMeta, fileSuffix, statements));
                exportedVars.push(_this._compileComponent(compMeta, dirMetas, ngModule.transitiveModule.pipes, ngModule.schemas, stylesCompileResults.componentStylesheet, fileSuffix, statements));
            });
        }))
            .then(function () {
            if (statements.length > 0) {
                outputSourceModules.unshift(_this._codegenSourceModule(_ngfactoryModuleUrl(moduleUrl), statements, exportedVars));
            }
            return outputSourceModules;
        });
    };
    OfflineCompiler.prototype._compileModule = function (ngModuleType, targetStatements) {
        var ngModule = this._metadataResolver.getNgModuleMetadata(ngModuleType);
        var appCompileResult = this._ngModuleCompiler.compile(ngModule, []);
        appCompileResult.dependencies.forEach(function (dep) {
            dep.placeholder.name = _componentFactoryName(dep.comp);
            dep.placeholder.moduleUrl = _ngfactoryModuleUrl(dep.comp.moduleUrl);
        });
        targetStatements.push.apply(targetStatements, appCompileResult.statements);
        return appCompileResult.ngModuleFactoryVar;
    };
    OfflineCompiler.prototype._compileComponentFactory = function (compMeta, fileSuffix, targetStatements) {
        var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta);
        var hostViewFactoryVar = this._compileComponent(hostMeta, [compMeta], [], [], null, fileSuffix, targetStatements);
        var compFactoryVar = _componentFactoryName(compMeta.type);
        targetStatements.push(o.variable(compFactoryVar)
            .set(o.importExpr(identifiers_1.Identifiers.ComponentFactory, [o.importType(compMeta.type)])
            .instantiate([
            o.literal(compMeta.selector), o.variable(hostViewFactoryVar),
            o.importExpr(compMeta.type)
        ], o.importType(identifiers_1.Identifiers.ComponentFactory, [o.importType(compMeta.type)], [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]));
        return compFactoryVar;
    };
    OfflineCompiler.prototype._compileComponent = function (compMeta, directives, pipes, schemas, componentStyles, fileSuffix, targetStatements) {
        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, schemas, compMeta.type.name);
        var stylesExpr = componentStyles ? o.variable(componentStyles.stylesVar) : o.literalArr([]);
        var viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, stylesExpr, pipes);
        if (componentStyles) {
            collection_1.ListWrapper.addAll(targetStatements, _resolveStyleStatements(componentStyles, fileSuffix));
        }
        collection_1.ListWrapper.addAll(targetStatements, _resolveViewStatements(viewResult));
        return viewResult.viewFactoryVar;
    };
    OfflineCompiler.prototype._codgenStyles = function (stylesCompileResult, fileSuffix) {
        _resolveStyleStatements(stylesCompileResult, fileSuffix);
        return this._codegenSourceModule(_stylesModuleUrl(stylesCompileResult.meta.moduleUrl, stylesCompileResult.isShimmed, fileSuffix), stylesCompileResult.statements, [stylesCompileResult.stylesVar]);
    };
    OfflineCompiler.prototype._codegenSourceModule = function (moduleUrl, statements, exportedVars) {
        return new SourceModule(moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
    };
    return OfflineCompiler;
}());
exports.OfflineCompiler = OfflineCompiler;
function _resolveViewStatements(compileResult) {
    compileResult.dependencies.forEach(function (dep) {
        if (dep instanceof view_compiler_1.ViewFactoryDependency) {
            var vfd = dep;
            vfd.placeholder.moduleUrl = _ngfactoryModuleUrl(vfd.comp.moduleUrl);
        }
        else if (dep instanceof view_compiler_1.ComponentFactoryDependency) {
            var cfd = dep;
            cfd.placeholder.name = _componentFactoryName(cfd.comp);
            cfd.placeholder.moduleUrl = _ngfactoryModuleUrl(cfd.comp.moduleUrl);
        }
    });
    return compileResult.statements;
}
function _resolveStyleStatements(compileResult, fileSuffix) {
    compileResult.dependencies.forEach(function (dep) {
        dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.moduleUrl, dep.isShimmed, fileSuffix);
    });
    return compileResult.statements;
}
function _ngfactoryModuleUrl(compUrl) {
    var urlWithSuffix = _splitLastSuffix(compUrl);
    return urlWithSuffix[0] + ".ngfactory" + urlWithSuffix[1];
}
function _componentFactoryName(comp) {
    return comp.name + "NgFactory";
}
function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
    return shim ? stylesheetUrl + ".shim" + suffix : "" + stylesheetUrl + suffix;
}
function _assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
    }
}
function _splitLastSuffix(path) {
    var lastDot = path.lastIndexOf('.');
    if (lastDot !== -1) {
        return [path.substring(0, lastDot), path.substring(lastDot)];
    }
    else {
        return [path, ''];
    }
}
//# sourceMappingURL=offline_compiler.js.map