/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { CompilerConfig } from './config';
import { Identifiers, resolveIdentifier } from './identifiers';
import * as o from './output/output_ast';
import { LifecycleHooks } from './private_import_core';
export var DirectiveWrapperCompileResult = (function () {
    function DirectiveWrapperCompileResult(statements, dirWrapperClassVar) {
        this.statements = statements;
        this.dirWrapperClassVar = dirWrapperClassVar;
    }
    return DirectiveWrapperCompileResult;
}());
var CONTEXT_FIELD_NAME = 'context';
var CHANGES_FIELD_NAME = 'changes';
var CHANGED_FIELD_NAME = 'changed';
var CURR_VALUE_VAR = o.variable('currValue');
var THROW_ON_CHANGE_VAR = o.variable('throwOnChange');
var FORCE_UPDATE_VAR = o.variable('forceUpdate');
var VIEW_VAR = o.variable('view');
var RENDER_EL_VAR = o.variable('el');
var RESET_CHANGES_STMT = o.THIS_EXPR.prop(CHANGES_FIELD_NAME).set(o.literalMap([])).toStmt();
/**
 * We generate directive wrappers to prevent code bloat when a directive is used.
 * A directive wrapper encapsulates
 * the dirty checking for `@Input`, the handling of `@HostListener` / `@HostBinding`
 * and calling the lifecyclehooks `ngOnInit`, `ngOnChanges`, `ngDoCheck`.
 *
 * So far, only `@Input` and the lifecycle hooks have been implemented.
 */
export var DirectiveWrapperCompiler = (function () {
    function DirectiveWrapperCompiler(compilerConfig) {
        this.compilerConfig = compilerConfig;
    }
    DirectiveWrapperCompiler.dirWrapperClassName = function (id) { return "Wrapper_" + id.name; };
    DirectiveWrapperCompiler.prototype.compile = function (dirMeta) {
        var dirDepParamNames = [];
        for (var i = 0; i < dirMeta.type.diDeps.length; i++) {
            dirDepParamNames.push("p" + i);
        }
        var dirLifecycleHooks = dirMeta.type.lifecycleHooks;
        var lifecycleHooks = {
            genChanges: dirLifecycleHooks.indexOf(LifecycleHooks.OnChanges) !== -1 ||
                this.compilerConfig.logBindingUpdate,
            ngOnChanges: dirLifecycleHooks.indexOf(LifecycleHooks.OnChanges) !== -1,
            ngOnInit: dirLifecycleHooks.indexOf(LifecycleHooks.OnInit) !== -1,
            ngDoCheck: dirLifecycleHooks.indexOf(LifecycleHooks.DoCheck) !== -1
        };
        var fields = [
            new o.ClassField(CONTEXT_FIELD_NAME, o.importType(dirMeta.type)),
            new o.ClassField(CHANGED_FIELD_NAME, o.BOOL_TYPE),
        ];
        var ctorStmts = [o.THIS_EXPR.prop(CHANGED_FIELD_NAME).set(o.literal(false)).toStmt()];
        if (lifecycleHooks.genChanges) {
            fields.push(new o.ClassField(CHANGES_FIELD_NAME, new o.MapType(o.DYNAMIC_TYPE)));
            ctorStmts.push(RESET_CHANGES_STMT);
        }
        var methods = [];
        Object.keys(dirMeta.inputs).forEach(function (inputFieldName, idx) {
            var fieldName = "_" + inputFieldName;
            // private is fine here as no child view will reference the cached value...
            fields.push(new o.ClassField(fieldName, null, [o.StmtModifier.Private]));
            ctorStmts.push(o.THIS_EXPR.prop(fieldName)
                .set(o.importExpr(resolveIdentifier(Identifiers.UNINITIALIZED)))
                .toStmt());
            methods.push(checkInputMethod(inputFieldName, o.THIS_EXPR.prop(fieldName), lifecycleHooks));
        });
        methods.push(detectChangesInternalMethod(lifecycleHooks, this.compilerConfig.genDebugInfo));
        ctorStmts.push(o.THIS_EXPR.prop(CONTEXT_FIELD_NAME)
            .set(o.importExpr(dirMeta.type)
            .instantiate(dirDepParamNames.map(function (paramName) { return o.variable(paramName); })))
            .toStmt());
        var ctor = new o.ClassMethod(null, dirDepParamNames.map(function (paramName) { return new o.FnParam(paramName, o.DYNAMIC_TYPE); }), ctorStmts);
        var wrapperClassName = DirectiveWrapperCompiler.dirWrapperClassName(dirMeta.type);
        var classStmt = new o.ClassStmt(wrapperClassName, null, fields, [], ctor, methods);
        return new DirectiveWrapperCompileResult([classStmt], wrapperClassName);
    };
    DirectiveWrapperCompiler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DirectiveWrapperCompiler.ctorParameters = [
        { type: CompilerConfig, },
    ];
    return DirectiveWrapperCompiler;
}());
function detectChangesInternalMethod(lifecycleHooks, logBindingUpdate) {
    var changedVar = o.variable('changed');
    var stmts = [
        changedVar.set(o.THIS_EXPR.prop(CHANGED_FIELD_NAME)).toDeclStmt(),
        o.THIS_EXPR.prop(CHANGED_FIELD_NAME).set(o.literal(false)).toStmt(),
    ];
    var lifecycleStmts = [];
    if (lifecycleHooks.genChanges) {
        var onChangesStmts = [];
        if (lifecycleHooks.ngOnChanges) {
            onChangesStmts.push(o.THIS_EXPR.prop(CONTEXT_FIELD_NAME)
                .callMethod('ngOnChanges', [o.THIS_EXPR.prop(CHANGES_FIELD_NAME)])
                .toStmt());
        }
        if (logBindingUpdate) {
            onChangesStmts.push(o.importExpr(resolveIdentifier(Identifiers.setBindingDebugInfoForChanges))
                .callFn([VIEW_VAR.prop('renderer'), RENDER_EL_VAR, o.THIS_EXPR.prop(CHANGES_FIELD_NAME)])
                .toStmt());
        }
        onChangesStmts.push(RESET_CHANGES_STMT);
        lifecycleStmts.push(new o.IfStmt(changedVar, onChangesStmts));
    }
    if (lifecycleHooks.ngOnInit) {
        lifecycleStmts.push(new o.IfStmt(VIEW_VAR.prop('numberOfChecks').identical(new o.LiteralExpr(0)), [o.THIS_EXPR.prop(CONTEXT_FIELD_NAME).callMethod('ngOnInit', []).toStmt()]));
    }
    if (lifecycleHooks.ngDoCheck) {
        lifecycleStmts.push(o.THIS_EXPR.prop(CONTEXT_FIELD_NAME).callMethod('ngDoCheck', []).toStmt());
    }
    if (lifecycleStmts.length > 0) {
        stmts.push(new o.IfStmt(o.not(THROW_ON_CHANGE_VAR), lifecycleStmts));
    }
    stmts.push(new o.ReturnStatement(changedVar));
    return new o.ClassMethod('detectChangesInternal', [
        new o.FnParam(VIEW_VAR.name, o.importType(resolveIdentifier(Identifiers.AppView), [o.DYNAMIC_TYPE])),
        new o.FnParam(RENDER_EL_VAR.name, o.DYNAMIC_TYPE),
        new o.FnParam(THROW_ON_CHANGE_VAR.name, o.BOOL_TYPE),
    ], stmts, o.BOOL_TYPE);
}
function checkInputMethod(input, fieldExpr, lifecycleHooks) {
    var onChangeStatements = [
        o.THIS_EXPR.prop(CHANGED_FIELD_NAME).set(o.literal(true)).toStmt(),
        o.THIS_EXPR.prop(CONTEXT_FIELD_NAME).prop(input).set(CURR_VALUE_VAR).toStmt(),
    ];
    if (lifecycleHooks.genChanges) {
        onChangeStatements.push(o.THIS_EXPR.prop(CHANGES_FIELD_NAME)
            .key(o.literal(input))
            .set(o.importExpr(resolveIdentifier(Identifiers.SimpleChange))
            .instantiate([fieldExpr, CURR_VALUE_VAR]))
            .toStmt());
    }
    onChangeStatements.push(fieldExpr.set(CURR_VALUE_VAR).toStmt());
    var methodBody = [
        new o.IfStmt(FORCE_UPDATE_VAR.or(o.importExpr(resolveIdentifier(Identifiers.checkBinding))
            .callFn([THROW_ON_CHANGE_VAR, fieldExpr, CURR_VALUE_VAR])), onChangeStatements),
    ];
    return new o.ClassMethod("check_" + input, [
        new o.FnParam(CURR_VALUE_VAR.name, o.DYNAMIC_TYPE),
        new o.FnParam(THROW_ON_CHANGE_VAR.name, o.BOOL_TYPE),
        new o.FnParam(FORCE_UPDATE_VAR.name, o.BOOL_TYPE),
    ], methodBody);
}
//# sourceMappingURL=directive_wrapper_compiler.js.map