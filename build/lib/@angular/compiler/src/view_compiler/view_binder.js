/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var identifiers_1 = require('../identifiers');
var template_ast_1 = require('../template_parser/template_ast');
var event_binder_1 = require('./event_binder');
var lifecycle_binder_1 = require('./lifecycle_binder');
var property_binder_1 = require('./property_binder');
function bindView(view, parsedTemplate) {
    var visitor = new ViewBinderVisitor(view);
    template_ast_1.templateVisitAll(visitor, parsedTemplate);
    view.pipes.forEach(function (pipe) { lifecycle_binder_1.bindPipeDestroyLifecycleCallbacks(pipe.meta, pipe.instance, pipe.view); });
}
exports.bindView = bindView;
var ViewBinderVisitor = (function () {
    function ViewBinderVisitor(view) {
        this.view = view;
        this._nodeIndex = 0;
    }
    ViewBinderVisitor.prototype.visitBoundText = function (ast, parent) {
        var node = this.view.nodes[this._nodeIndex++];
        property_binder_1.bindRenderText(ast, node, this.view);
        return null;
    };
    ViewBinderVisitor.prototype.visitText = function (ast, parent) {
        this._nodeIndex++;
        return null;
    };
    ViewBinderVisitor.prototype.visitNgContent = function (ast, parent) { return null; };
    ViewBinderVisitor.prototype.visitElement = function (ast, parent) {
        var compileElement = this.view.nodes[this._nodeIndex++];
        var eventListeners = event_binder_1.collectEventListeners(ast.outputs, ast.directives, compileElement);
        property_binder_1.bindRenderInputs(ast.inputs, compileElement);
        event_binder_1.bindRenderOutputs(eventListeners);
        ast.directives.forEach(function (directiveAst) {
            var directiveInstance = compileElement.instances.get(identifiers_1.identifierToken(directiveAst.directive.type));
            property_binder_1.bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            property_binder_1.bindDirectiveHostProps(directiveAst, directiveInstance, compileElement);
            event_binder_1.bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
        });
        template_ast_1.templateVisitAll(this, ast.children, compileElement);
        // afterContent and afterView lifecycles need to be called bottom up
        // so that children are notified before parents
        ast.directives.forEach(function (directiveAst) {
            var directiveInstance = compileElement.instances.get(identifiers_1.identifierToken(directiveAst.directive.type));
            lifecycle_binder_1.bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        ast.providers.forEach(function (providerAst) {
            var providerInstance = compileElement.instances.get(providerAst.token);
            lifecycle_binder_1.bindInjectableDestroyLifecycleCallbacks(providerAst, providerInstance, compileElement);
        });
        return null;
    };
    ViewBinderVisitor.prototype.visitEmbeddedTemplate = function (ast, parent) {
        var compileElement = this.view.nodes[this._nodeIndex++];
        var eventListeners = event_binder_1.collectEventListeners(ast.outputs, ast.directives, compileElement);
        ast.directives.forEach(function (directiveAst) {
            var directiveInstance = compileElement.instances.get(identifiers_1.identifierToken(directiveAst.directive.type));
            property_binder_1.bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            event_binder_1.bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
            lifecycle_binder_1.bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        ast.providers.forEach(function (providerAst) {
            var providerInstance = compileElement.instances.get(providerAst.token);
            lifecycle_binder_1.bindInjectableDestroyLifecycleCallbacks(providerAst, providerInstance, compileElement);
        });
        bindView(compileElement.embeddedView, ast.children);
        return null;
    };
    ViewBinderVisitor.prototype.visitAttr = function (ast, ctx) { return null; };
    ViewBinderVisitor.prototype.visitDirective = function (ast, ctx) { return null; };
    ViewBinderVisitor.prototype.visitEvent = function (ast, eventTargetAndNames) {
        return null;
    };
    ViewBinderVisitor.prototype.visitReference = function (ast, ctx) { return null; };
    ViewBinderVisitor.prototype.visitVariable = function (ast, ctx) { return null; };
    ViewBinderVisitor.prototype.visitDirectiveProperty = function (ast, context) { return null; };
    ViewBinderVisitor.prototype.visitElementProperty = function (ast, context) { return null; };
    return ViewBinderVisitor;
}());
//# sourceMappingURL=view_binder.js.map