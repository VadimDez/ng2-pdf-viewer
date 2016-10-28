/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SecurityContext } from '@angular/core';
import { isPresent } from '../facade/lang';
import { Identifiers, resolveIdentifier } from '../identifiers';
import * as o from '../output/output_ast';
import { EMPTY_STATE as EMPTY_ANIMATION_STATE, isDefaultChangeDetectionStrategy } from '../private_import_core';
import { PropertyBindingType } from '../template_parser/template_ast';
import { CompileBinding } from './compile_binding';
import { DetectChangesVars, ViewProperties } from './constants';
import { convertCdExpressionToIr, temporaryDeclaration } from './expression_converter';
function createBindFieldExpr(exprIndex) {
    return o.THIS_EXPR.prop("_expr_" + exprIndex);
}
function createCurrValueExpr(exprIndex) {
    return o.variable("currVal_" + exprIndex); // fix syntax highlighting: `
}
var EvalResult = (function () {
    function EvalResult(forceUpdate) {
        this.forceUpdate = forceUpdate;
    }
    return EvalResult;
}());
function evalCdAst(view, currValExpr, parsedExpression, context, method, bindingIndex) {
    var checkExpression = convertCdExpressionToIr(view, context, parsedExpression, DetectChangesVars.valUnwrapper, bindingIndex);
    if (!checkExpression.expression) {
        // e.g. an empty expression was given
        return null;
    }
    if (checkExpression.temporaryCount) {
        for (var i = 0; i < checkExpression.temporaryCount; i++) {
            method.addStmt(temporaryDeclaration(bindingIndex, i));
        }
    }
    if (checkExpression.needsValueUnwrapper) {
        var initValueUnwrapperStmt = DetectChangesVars.valUnwrapper.callMethod('reset', []).toStmt();
        method.addStmt(initValueUnwrapperStmt);
    }
    method.addStmt(currValExpr.set(checkExpression.expression).toDeclStmt(null, [o.StmtModifier.Final]));
    if (checkExpression.needsValueUnwrapper) {
        return new EvalResult(DetectChangesVars.valUnwrapper.prop('hasWrappedValue'));
    }
    else {
        return new EvalResult(null);
    }
}
function bind(view, currValExpr, fieldExpr, parsedExpression, context, actions, method, bindingIndex) {
    var evalResult = evalCdAst(view, currValExpr, parsedExpression, context, method, bindingIndex);
    if (!evalResult) {
        return;
    }
    // private is fine here as no child view will reference the cached value...
    view.fields.push(new o.ClassField(fieldExpr.name, null, [o.StmtModifier.Private]));
    view.createMethod.addStmt(o.THIS_EXPR.prop(fieldExpr.name)
        .set(o.importExpr(resolveIdentifier(Identifiers.UNINITIALIZED)))
        .toStmt());
    var condition = o.importExpr(resolveIdentifier(Identifiers.checkBinding)).callFn([
        DetectChangesVars.throwOnChange, fieldExpr, currValExpr
    ]);
    if (evalResult.forceUpdate) {
        condition = evalResult.forceUpdate.or(condition);
    }
    method.addStmt(new o.IfStmt(condition, actions.concat([o.THIS_EXPR.prop(fieldExpr.name).set(currValExpr).toStmt()])));
}
export function bindRenderText(boundText, compileNode, view) {
    var bindingIndex = view.bindings.length;
    view.bindings.push(new CompileBinding(compileNode, boundText));
    var currValExpr = createCurrValueExpr(bindingIndex);
    var valueField = createBindFieldExpr(bindingIndex);
    view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileNode.nodeIndex, boundText);
    bind(view, currValExpr, valueField, boundText.value, view.componentContext, [o.THIS_EXPR.prop('renderer')
            .callMethod('setText', [compileNode.renderNode, currValExpr])
            .toStmt()], view.detectChangesRenderPropertiesMethod, bindingIndex);
}
function bindAndWriteToRenderer(boundProps, context, compileElement, isHostProp, eventListeners) {
    var view = compileElement.view;
    var renderNode = compileElement.renderNode;
    boundProps.forEach(function (boundProp) {
        var bindingIndex = view.bindings.length;
        view.bindings.push(new CompileBinding(compileElement, boundProp));
        view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileElement.nodeIndex, boundProp);
        var fieldExpr = createBindFieldExpr(bindingIndex);
        var currValExpr = createCurrValueExpr(bindingIndex);
        var oldRenderValue = sanitizedValue(boundProp, fieldExpr);
        var renderValue = sanitizedValue(boundProp, currValExpr);
        var updateStmts = [];
        var compileMethod = view.detectChangesRenderPropertiesMethod;
        switch (boundProp.type) {
            case PropertyBindingType.Property:
                if (view.genConfig.logBindingUpdate) {
                    updateStmts.push(logBindingUpdateStmt(renderNode, boundProp.name, renderValue));
                }
                updateStmts.push(o.THIS_EXPR.prop('renderer')
                    .callMethod('setElementProperty', [renderNode, o.literal(boundProp.name), renderValue])
                    .toStmt());
                break;
            case PropertyBindingType.Attribute:
                renderValue =
                    renderValue.isBlank().conditional(o.NULL_EXPR, renderValue.callMethod('toString', []));
                updateStmts.push(o.THIS_EXPR.prop('renderer')
                    .callMethod('setElementAttribute', [renderNode, o.literal(boundProp.name), renderValue])
                    .toStmt());
                break;
            case PropertyBindingType.Class:
                updateStmts.push(o.THIS_EXPR.prop('renderer')
                    .callMethod('setElementClass', [renderNode, o.literal(boundProp.name), renderValue])
                    .toStmt());
                break;
            case PropertyBindingType.Style:
                var strValue = renderValue.callMethod('toString', []);
                if (isPresent(boundProp.unit)) {
                    strValue = strValue.plus(o.literal(boundProp.unit));
                }
                renderValue = renderValue.isBlank().conditional(o.NULL_EXPR, strValue);
                updateStmts.push(o.THIS_EXPR.prop('renderer')
                    .callMethod('setElementStyle', [renderNode, o.literal(boundProp.name), renderValue])
                    .toStmt());
                break;
            case PropertyBindingType.Animation:
                compileMethod = view.animationBindingsMethod;
                var detachStmts_1 = [];
                var animationName_1 = boundProp.name;
                var targetViewExpr = isHostProp ? compileElement.appElement.prop('componentView') : o.THIS_EXPR;
                var animationFnExpr = targetViewExpr.prop('componentType').prop('animations').key(o.literal(animationName_1));
                // it's important to normalize the void value as `void` explicitly
                // so that the styles data can be obtained from the stringmap
                var emptyStateValue = o.literal(EMPTY_ANIMATION_STATE);
                var unitializedValue = o.importExpr(resolveIdentifier(Identifiers.UNINITIALIZED));
                var animationTransitionVar_1 = o.variable('animationTransition_' + animationName_1);
                updateStmts.push(animationTransitionVar_1
                    .set(animationFnExpr.callFn([
                    o.THIS_EXPR, renderNode, oldRenderValue.equals(unitializedValue)
                        .conditional(emptyStateValue, oldRenderValue),
                    renderValue.equals(unitializedValue).conditional(emptyStateValue, renderValue)
                ]))
                    .toDeclStmt());
                detachStmts_1.push(animationTransitionVar_1
                    .set(animationFnExpr.callFn([o.THIS_EXPR, renderNode, oldRenderValue, emptyStateValue]))
                    .toDeclStmt());
                eventListeners.forEach(function (listener) {
                    if (listener.isAnimation && listener.eventName === animationName_1) {
                        var animationStmt = listener.listenToAnimation(animationTransitionVar_1);
                        updateStmts.push(animationStmt);
                        detachStmts_1.push(animationStmt);
                    }
                });
                view.detachMethod.addStmts(detachStmts_1);
                break;
        }
        bind(view, currValExpr, fieldExpr, boundProp.value, context, updateStmts, compileMethod, view.bindings.length);
    });
}
function sanitizedValue(boundProp, renderValue) {
    var enumValue;
    switch (boundProp.securityContext) {
        case SecurityContext.NONE:
            return renderValue; // No sanitization needed.
        case SecurityContext.HTML:
            enumValue = 'HTML';
            break;
        case SecurityContext.STYLE:
            enumValue = 'STYLE';
            break;
        case SecurityContext.SCRIPT:
            enumValue = 'SCRIPT';
            break;
        case SecurityContext.URL:
            enumValue = 'URL';
            break;
        case SecurityContext.RESOURCE_URL:
            enumValue = 'RESOURCE_URL';
            break;
        default:
            throw new Error("internal error, unexpected SecurityContext " + boundProp.securityContext + ".");
    }
    var ctx = ViewProperties.viewUtils.prop('sanitizer');
    var args = [o.importExpr(resolveIdentifier(Identifiers.SecurityContext)).prop(enumValue), renderValue];
    return ctx.callMethod('sanitize', args);
}
export function bindRenderInputs(boundProps, compileElement, eventListeners) {
    bindAndWriteToRenderer(boundProps, compileElement.view.componentContext, compileElement, false, eventListeners);
}
export function bindDirectiveHostProps(directiveAst, directiveInstance, compileElement, eventListeners) {
    bindAndWriteToRenderer(directiveAst.hostProperties, directiveInstance, compileElement, true, eventListeners);
}
export function bindDirectiveInputs(directiveAst, directiveWrapperInstance, compileElement) {
    var view = compileElement.view;
    var detectChangesInInputsMethod = view.detectChangesInInputsMethod;
    detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
    directiveAst.inputs.forEach(function (input) {
        var bindingIndex = view.bindings.length;
        view.bindings.push(new CompileBinding(compileElement, input));
        detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, input);
        var currValExpr = createCurrValueExpr(bindingIndex);
        var evalResult = evalCdAst(view, currValExpr, input.value, view.componentContext, detectChangesInInputsMethod, bindingIndex);
        if (!evalResult) {
            return;
        }
        detectChangesInInputsMethod.addStmt(directiveWrapperInstance
            .callMethod("check_" + input.directiveName, [
            currValExpr, DetectChangesVars.throwOnChange,
            evalResult.forceUpdate || o.literal(false)
        ])
            .toStmt());
    });
    var isOnPushComp = directiveAst.directive.isComponent &&
        !isDefaultChangeDetectionStrategy(directiveAst.directive.changeDetection);
    var directiveDetectChangesExpr = directiveWrapperInstance.callMethod('detectChangesInternal', [o.THIS_EXPR, compileElement.renderNode, DetectChangesVars.throwOnChange]);
    var directiveDetectChangesStmt = isOnPushComp ?
        new o.IfStmt(directiveDetectChangesExpr, [compileElement.appElement.prop('componentView')
                .callMethod('markAsCheckOnce', [])
                .toStmt()]) :
        directiveDetectChangesExpr.toStmt();
    detectChangesInInputsMethod.addStmt(directiveDetectChangesStmt);
}
function logBindingUpdateStmt(renderNode, propName, value) {
    return o.importExpr(resolveIdentifier(Identifiers.setBindingDebugInfo))
        .callFn([o.THIS_EXPR.prop('renderer'), renderNode, o.literal(propName), value])
        .toStmt();
}
//# sourceMappingURL=property_binder.js.map