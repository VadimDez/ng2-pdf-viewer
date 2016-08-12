/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierToken } from '../identifiers';
import { templateVisitAll } from '../template_parser/template_ast';
import { bindDirectiveOutputs, bindRenderOutputs, collectEventListeners } from './event_binder';
import { bindDirectiveAfterContentLifecycleCallbacks, bindDirectiveAfterViewLifecycleCallbacks, bindDirectiveDetectChangesLifecycleCallbacks, bindInjectableDestroyLifecycleCallbacks, bindPipeDestroyLifecycleCallbacks } from './lifecycle_binder';
import { bindDirectiveHostProps, bindDirectiveInputs, bindRenderInputs, bindRenderText } from './property_binder';
export function bindView(view, parsedTemplate) {
    var visitor = new ViewBinderVisitor(view);
    templateVisitAll(visitor, parsedTemplate);
    view.pipes.forEach((pipe) => { bindPipeDestroyLifecycleCallbacks(pipe.meta, pipe.instance, pipe.view); });
}
class ViewBinderVisitor {
    constructor(view) {
        this.view = view;
        this._nodeIndex = 0;
    }
    visitBoundText(ast, parent) {
        var node = this.view.nodes[this._nodeIndex++];
        bindRenderText(ast, node, this.view);
        return null;
    }
    visitText(ast, parent) {
        this._nodeIndex++;
        return null;
    }
    visitNgContent(ast, parent) { return null; }
    visitElement(ast, parent) {
        var compileElement = this.view.nodes[this._nodeIndex++];
        var eventListeners = collectEventListeners(ast.outputs, ast.directives, compileElement);
        bindRenderInputs(ast.inputs, compileElement);
        bindRenderOutputs(eventListeners);
        ast.directives.forEach((directiveAst) => {
            var directiveInstance = compileElement.instances.get(identifierToken(directiveAst.directive.type));
            bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            bindDirectiveHostProps(directiveAst, directiveInstance, compileElement);
            bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
        });
        templateVisitAll(this, ast.children, compileElement);
        // afterContent and afterView lifecycles need to be called bottom up
        // so that children are notified before parents
        ast.directives.forEach((directiveAst) => {
            var directiveInstance = compileElement.instances.get(identifierToken(directiveAst.directive.type));
            bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        ast.providers.forEach((providerAst) => {
            var providerInstance = compileElement.instances.get(providerAst.token);
            bindInjectableDestroyLifecycleCallbacks(providerAst, providerInstance, compileElement);
        });
        return null;
    }
    visitEmbeddedTemplate(ast, parent) {
        var compileElement = this.view.nodes[this._nodeIndex++];
        var eventListeners = collectEventListeners(ast.outputs, ast.directives, compileElement);
        ast.directives.forEach((directiveAst) => {
            var directiveInstance = compileElement.instances.get(identifierToken(directiveAst.directive.type));
            bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
            bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        ast.providers.forEach((providerAst) => {
            var providerInstance = compileElement.instances.get(providerAst.token);
            bindInjectableDestroyLifecycleCallbacks(providerAst, providerInstance, compileElement);
        });
        bindView(compileElement.embeddedView, ast.children);
        return null;
    }
    visitAttr(ast, ctx) { return null; }
    visitDirective(ast, ctx) { return null; }
    visitEvent(ast, eventTargetAndNames) {
        return null;
    }
    visitReference(ast, ctx) { return null; }
    visitVariable(ast, ctx) { return null; }
    visitDirectiveProperty(ast, context) { return null; }
    visitElementProperty(ast, context) { return null; }
}
//# sourceMappingURL=view_binder.js.map