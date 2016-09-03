import { templateVisitAll } from '../template_parser/template_ast';
import { CompileElementAnimationOutput, bindAnimationOutputs, bindDirectiveOutputs, bindRenderOutputs, collectEventListeners } from './event_binder';
import { bindDirectiveAfterContentLifecycleCallbacks, bindDirectiveAfterViewLifecycleCallbacks, bindDirectiveDetectChangesLifecycleCallbacks, bindInjectableDestroyLifecycleCallbacks, bindPipeDestroyLifecycleCallbacks } from './lifecycle_binder';
import { bindDirectiveHostProps, bindDirectiveInputs, bindRenderInputs, bindRenderText } from './property_binder';
export function bindView(view, parsedTemplate, animationOutputs) {
    var visitor = new ViewBinderVisitor(view, animationOutputs);
    templateVisitAll(visitor, parsedTemplate);
    view.pipes.forEach(function (pipe) { bindPipeDestroyLifecycleCallbacks(pipe.meta, pipe.instance, pipe.view); });
}
var ViewBinderVisitor = (function () {
    function ViewBinderVisitor(view, animationOutputs) {
        var _this = this;
        this.view = view;
        this.animationOutputs = animationOutputs;
        this._nodeIndex = 0;
        this._animationOutputsMap = {};
        animationOutputs.forEach(function (entry) { _this._animationOutputsMap[entry.fullPropertyName] = entry; });
    }
    ViewBinderVisitor.prototype.visitBoundText = function (ast, parent) {
        var node = this.view.nodes[this._nodeIndex++];
        bindRenderText(ast, node, this.view);
        return null;
    };
    ViewBinderVisitor.prototype.visitText = function (ast, parent) {
        this._nodeIndex++;
        return null;
    };
    ViewBinderVisitor.prototype.visitNgContent = function (ast, parent) { return null; };
    ViewBinderVisitor.prototype.visitElement = function (ast, parent) {
        var _this = this;
        var compileElement = this.view.nodes[this._nodeIndex++];
        var eventListeners = [];
        var animationEventListeners = [];
        collectEventListeners(ast.outputs, ast.directives, compileElement).forEach(function (entry) {
            // TODO: figure out how to abstract this `if` statement elsewhere
            if (entry.eventName[0] == '@') {
                var animationOutputName = entry.eventName.substr(1);
                var output = _this._animationOutputsMap[animationOutputName];
                // no need to report an error here since the parser will
                // have caught the missing animation trigger definition
                if (output) {
                    animationEventListeners.push(new CompileElementAnimationOutput(entry, output));
                }
            }
            else {
                eventListeners.push(entry);
            }
        });
        bindAnimationOutputs(animationEventListeners);
        bindRenderInputs(ast.inputs, compileElement);
        bindRenderOutputs(eventListeners);
        ast.directives.forEach(function (directiveAst) {
            var directiveInstance = compileElement.instances.get(directiveAst.directive.type.reference);
            bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            bindDirectiveHostProps(directiveAst, directiveInstance, compileElement);
            bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
        });
        templateVisitAll(this, ast.children, compileElement);
        // afterContent and afterView lifecycles need to be called bottom up
        // so that children are notified before parents
        ast.directives.forEach(function (directiveAst) {
            var directiveInstance = compileElement.instances.get(directiveAst.directive.type.reference);
            bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        ast.providers.forEach(function (providerAst) {
            var providerInstance = compileElement.instances.get(providerAst.token.reference);
            bindInjectableDestroyLifecycleCallbacks(providerAst, providerInstance, compileElement);
        });
        return null;
    };
    ViewBinderVisitor.prototype.visitEmbeddedTemplate = function (ast, parent) {
        var compileElement = this.view.nodes[this._nodeIndex++];
        var eventListeners = collectEventListeners(ast.outputs, ast.directives, compileElement);
        ast.directives.forEach(function (directiveAst) {
            var directiveInstance = compileElement.instances.get(directiveAst.directive.type.reference);
            bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
            bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        ast.providers.forEach(function (providerAst) {
            var providerInstance = compileElement.instances.get(providerAst.token.reference);
            bindInjectableDestroyLifecycleCallbacks(providerAst, providerInstance, compileElement);
        });
        bindView(compileElement.embeddedView, ast.children, this.animationOutputs);
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