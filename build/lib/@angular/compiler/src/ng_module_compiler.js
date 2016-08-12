/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var compile_metadata_1 = require('./compile_metadata');
var lang_1 = require('./facade/lang');
var identifiers_1 = require('./identifiers');
var o = require('./output/output_ast');
var value_util_1 = require('./output/value_util');
var parse_util_1 = require('./parse_util');
var provider_analyzer_1 = require('./provider_analyzer');
var util_1 = require('./util');
var ComponentFactoryDependency = (function () {
    function ComponentFactoryDependency(comp, placeholder) {
        this.comp = comp;
        this.placeholder = placeholder;
    }
    return ComponentFactoryDependency;
}());
exports.ComponentFactoryDependency = ComponentFactoryDependency;
var NgModuleCompileResult = (function () {
    function NgModuleCompileResult(statements, ngModuleFactoryVar, dependencies) {
        this.statements = statements;
        this.ngModuleFactoryVar = ngModuleFactoryVar;
        this.dependencies = dependencies;
    }
    return NgModuleCompileResult;
}());
exports.NgModuleCompileResult = NgModuleCompileResult;
var NgModuleCompiler = (function () {
    function NgModuleCompiler() {
    }
    NgModuleCompiler.prototype.compile = function (ngModuleMeta, extraProviders) {
        var sourceFileName = lang_1.isPresent(ngModuleMeta.type.moduleUrl) ?
            "in NgModule " + ngModuleMeta.type.name + " in " + ngModuleMeta.type.moduleUrl :
            "in NgModule " + ngModuleMeta.type.name;
        var sourceFile = new parse_util_1.ParseSourceFile('', sourceFileName);
        var sourceSpan = new parse_util_1.ParseSourceSpan(new parse_util_1.ParseLocation(sourceFile, null, null, null), new parse_util_1.ParseLocation(sourceFile, null, null, null));
        var deps = [];
        var bootstrapComponentFactories = [];
        var entryComponentFactories = ngModuleMeta.transitiveModule.entryComponents.map(function (entryComponent) {
            var id = new compile_metadata_1.CompileIdentifierMetadata({ name: entryComponent.name });
            if (ngModuleMeta.bootstrapComponents.indexOf(entryComponent) > -1) {
                bootstrapComponentFactories.push(id);
            }
            deps.push(new ComponentFactoryDependency(entryComponent, id));
            return id;
        });
        var builder = new _InjectorBuilder(ngModuleMeta, entryComponentFactories, bootstrapComponentFactories, sourceSpan);
        var providerParser = new provider_analyzer_1.NgModuleProviderAnalyzer(ngModuleMeta, extraProviders, sourceSpan);
        providerParser.parse().forEach(function (provider) { return builder.addProvider(provider); });
        var injectorClass = builder.build();
        var ngModuleFactoryVar = ngModuleMeta.type.name + "NgFactory";
        var ngModuleFactoryStmt = o.variable(ngModuleFactoryVar)
            .set(o.importExpr(identifiers_1.Identifiers.NgModuleFactory)
            .instantiate([o.variable(injectorClass.name), o.importExpr(ngModuleMeta.type)], o.importType(identifiers_1.Identifiers.NgModuleFactory, [o.importType(ngModuleMeta.type)], [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]);
        return new NgModuleCompileResult([injectorClass, ngModuleFactoryStmt], ngModuleFactoryVar, deps);
    };
    /** @nocollapse */
    NgModuleCompiler.decorators = [
        { type: core_1.Injectable },
    ];
    return NgModuleCompiler;
}());
exports.NgModuleCompiler = NgModuleCompiler;
var _InjectorBuilder = (function () {
    function _InjectorBuilder(_ngModuleMeta, _entryComponentFactories, _bootstrapComponentFactories, _sourceSpan) {
        this._ngModuleMeta = _ngModuleMeta;
        this._entryComponentFactories = _entryComponentFactories;
        this._bootstrapComponentFactories = _bootstrapComponentFactories;
        this._sourceSpan = _sourceSpan;
        this._instances = new compile_metadata_1.CompileIdentifierMap();
        this._fields = [];
        this._createStmts = [];
        this._destroyStmts = [];
        this._getters = [];
    }
    _InjectorBuilder.prototype.addProvider = function (resolvedProvider) {
        var _this = this;
        var providerValueExpressions = resolvedProvider.providers.map(function (provider) { return _this._getProviderValue(provider); });
        var propName = "_" + resolvedProvider.token.name + "_" + this._instances.size;
        var instance = this._createProviderProperty(propName, resolvedProvider, providerValueExpressions, resolvedProvider.multiProvider, resolvedProvider.eager);
        if (resolvedProvider.lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnDestroy) !== -1) {
            this._destroyStmts.push(instance.callMethod('ngOnDestroy', []).toStmt());
        }
        this._instances.add(resolvedProvider.token, instance);
    };
    _InjectorBuilder.prototype.build = function () {
        var _this = this;
        var getMethodStmts = this._instances.keys().map(function (token) {
            var providerExpr = _this._instances.get(token);
            return new o.IfStmt(InjectMethodVars.token.identical(util_1.createDiTokenExpression(token)), [new o.ReturnStatement(providerExpr)]);
        });
        var methods = [
            new o.ClassMethod('createInternal', [], this._createStmts.concat(new o.ReturnStatement(this._instances.get(identifiers_1.identifierToken(this._ngModuleMeta.type)))), o.importType(this._ngModuleMeta.type)),
            new o.ClassMethod('getInternal', [
                new o.FnParam(InjectMethodVars.token.name, o.DYNAMIC_TYPE),
                new o.FnParam(InjectMethodVars.notFoundResult.name, o.DYNAMIC_TYPE)
            ], getMethodStmts.concat([new o.ReturnStatement(InjectMethodVars.notFoundResult)]), o.DYNAMIC_TYPE),
            new o.ClassMethod('destroyInternal', [], this._destroyStmts),
        ];
        var ctor = new o.ClassMethod(null, [new o.FnParam(InjectorProps.parent.name, o.importType(identifiers_1.Identifiers.Injector))], [o.SUPER_EXPR
                .callFn([
                o.variable(InjectorProps.parent.name),
                o.literalArr(this._entryComponentFactories.map(function (componentFactory) { return o.importExpr(componentFactory); })),
                o.literalArr(this._bootstrapComponentFactories.map(function (componentFactory) { return o.importExpr(componentFactory); }))
            ])
                .toStmt()]);
        var injClassName = this._ngModuleMeta.type.name + "Injector";
        return new o.ClassStmt(injClassName, o.importExpr(identifiers_1.Identifiers.NgModuleInjector, [o.importType(this._ngModuleMeta.type)]), this._fields, this._getters, ctor, methods);
    };
    _InjectorBuilder.prototype._getProviderValue = function (provider) {
        var _this = this;
        var result;
        if (lang_1.isPresent(provider.useExisting)) {
            result = this._getDependency(new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }));
        }
        else if (lang_1.isPresent(provider.useFactory)) {
            var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
            var depsExpr = deps.map(function (dep) { return _this._getDependency(dep); });
            result = o.importExpr(provider.useFactory).callFn(depsExpr);
        }
        else if (lang_1.isPresent(provider.useClass)) {
            var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
            var depsExpr = deps.map(function (dep) { return _this._getDependency(dep); });
            result =
                o.importExpr(provider.useClass).instantiate(depsExpr, o.importType(provider.useClass));
        }
        else {
            result = value_util_1.convertValueToOutputAst(provider.useValue);
        }
        return result;
    };
    _InjectorBuilder.prototype._createProviderProperty = function (propName, provider, providerValueExpressions, isMulti, isEager) {
        var resolvedProviderValueExpr;
        var type;
        if (isMulti) {
            resolvedProviderValueExpr = o.literalArr(providerValueExpressions);
            type = new o.ArrayType(o.DYNAMIC_TYPE);
        }
        else {
            resolvedProviderValueExpr = providerValueExpressions[0];
            type = providerValueExpressions[0].type;
        }
        if (lang_1.isBlank(type)) {
            type = o.DYNAMIC_TYPE;
        }
        if (isEager) {
            this._fields.push(new o.ClassField(propName, type));
            this._createStmts.push(o.THIS_EXPR.prop(propName).set(resolvedProviderValueExpr).toStmt());
        }
        else {
            var internalField = "_" + propName;
            this._fields.push(new o.ClassField(internalField, type));
            // Note: Equals is important for JS so that it also checks the undefined case!
            var getterStmts = [
                new o.IfStmt(o.THIS_EXPR.prop(internalField).isBlank(), [o.THIS_EXPR.prop(internalField).set(resolvedProviderValueExpr).toStmt()]),
                new o.ReturnStatement(o.THIS_EXPR.prop(internalField))
            ];
            this._getters.push(new o.ClassGetter(propName, getterStmts, type));
        }
        return o.THIS_EXPR.prop(propName);
    };
    _InjectorBuilder.prototype._getDependency = function (dep) {
        var result = null;
        if (dep.isValue) {
            result = o.literal(dep.value);
        }
        if (!dep.isSkipSelf) {
            if (dep.token &&
                (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector)) ||
                    dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ComponentFactoryResolver)))) {
                result = o.THIS_EXPR;
            }
            if (lang_1.isBlank(result)) {
                result = this._instances.get(dep.token);
            }
        }
        if (lang_1.isBlank(result)) {
            var args = [util_1.createDiTokenExpression(dep.token)];
            if (dep.isOptional) {
                args.push(o.NULL_EXPR);
            }
            result = InjectorProps.parent.callMethod('get', args);
        }
        return result;
    };
    return _InjectorBuilder;
}());
var InjectorProps = (function () {
    function InjectorProps() {
    }
    InjectorProps.parent = o.THIS_EXPR.prop('parent');
    return InjectorProps;
}());
var InjectMethodVars = (function () {
    function InjectMethodVars() {
    }
    InjectMethodVars.token = o.variable('token');
    InjectMethodVars.notFoundResult = o.variable('notFoundResult');
    return InjectMethodVars;
}());
//# sourceMappingURL=ng_module_compiler.js.map