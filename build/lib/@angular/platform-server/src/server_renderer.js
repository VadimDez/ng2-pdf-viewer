/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, Inject, Injectable, NgZone, ViewEncapsulation } from '@angular/core';
import { AnimationDriver, DOCUMENT } from '@angular/platform-browser';
import { isBlank, isPresent, stringify } from './facade/lang';
import { NAMESPACE_URIS, SharedStylesHost, flattenStyles, getDOM, isNamespaced, shimContentAttribute, shimHostAttribute, splitNamespace } from './private_import_platform-browser';
var /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
var /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/;
export var ServerRootRenderer = (function () {
    /**
     * @param {?} document
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     * @param {?} _zone
     */
    function ServerRootRenderer(document, sharedStylesHost, animationDriver, appId, _zone) {
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.animationDriver = animationDriver;
        this.appId = appId;
        this._zone = _zone;
        this.registeredComponents = new Map();
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    ServerRootRenderer.prototype.renderComponent = function (componentProto) {
        var /** @type {?} */ renderer = this.registeredComponents.get(componentProto.id);
        if (!renderer) {
            renderer = new ServerRenderer(this, componentProto, this.animationDriver, this.appId + "-" + componentProto.id, this._zone);
            this.registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    };
    ServerRootRenderer.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ServerRootRenderer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: SharedStylesHost, },
        { type: AnimationDriver, },
        { type: undefined, decorators: [{ type: Inject, args: [APP_ID,] },] },
        { type: NgZone, },
    ]; };
    return ServerRootRenderer;
}());
function ServerRootRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerRootRenderer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerRootRenderer.ctorParameters;
    /** @type {?} */
    ServerRootRenderer.prototype.registeredComponents;
    /** @type {?} */
    ServerRootRenderer.prototype.document;
    /** @type {?} */
    ServerRootRenderer.prototype.sharedStylesHost;
    /** @type {?} */
    ServerRootRenderer.prototype.animationDriver;
    /** @type {?} */
    ServerRootRenderer.prototype.appId;
    /** @type {?} */
    ServerRootRenderer.prototype._zone;
}
export var ServerRenderer = (function () {
    /**
     * @param {?} _rootRenderer
     * @param {?} componentProto
     * @param {?} _animationDriver
     * @param {?} styleShimId
     * @param {?} _zone
     */
    function ServerRenderer(_rootRenderer, componentProto, _animationDriver, styleShimId, _zone) {
        this._rootRenderer = _rootRenderer;
        this.componentProto = componentProto;
        this._animationDriver = _animationDriver;
        this._zone = _zone;
        this._styles = flattenStyles(styleShimId, componentProto.styles, []);
        if (componentProto.encapsulation === ViewEncapsulation.Native) {
            throw new Error('Native encapsulation is not supported on the server!');
        }
        if (this.componentProto.encapsulation === ViewEncapsulation.Emulated) {
            this._contentAttr = shimContentAttribute(styleShimId);
            this._hostAttr = shimHostAttribute(styleShimId);
        }
        else {
            this._contentAttr = null;
            this._hostAttr = null;
        }
    }
    /**
     * @param {?} selectorOrNode
     * @param {?} debugInfo
     * @return {?}
     */
    ServerRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var /** @type {?} */ el;
        if (typeof selectorOrNode === 'string') {
            el = getDOM().querySelector(this._rootRenderer.document, selectorOrNode);
            if (isBlank(el)) {
                throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
            }
        }
        else {
            el = selectorOrNode;
        }
        getDOM().clearNodes(el);
        return el;
    };
    /**
     * @param {?} parent
     * @param {?} name
     * @param {?} debugInfo
     * @return {?}
     */
    ServerRenderer.prototype.createElement = function (parent, name, debugInfo) {
        var /** @type {?} */ el;
        if (isNamespaced(name)) {
            var /** @type {?} */ nsAndName = splitNamespace(name);
            el = getDOM().createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]);
        }
        else {
            el = getDOM().createElement(name);
        }
        if (isPresent(this._contentAttr)) {
            getDOM().setAttribute(el, this._contentAttr, '');
        }
        if (isPresent(parent)) {
            getDOM().appendChild(parent, el);
        }
        return el;
    };
    /**
     * @param {?} hostElement
     * @return {?}
     */
    ServerRenderer.prototype.createViewRoot = function (hostElement) {
        var /** @type {?} */ nodesParent;
        if (isPresent(this._hostAttr)) {
            getDOM().setAttribute(hostElement, this._hostAttr, '');
        }
        nodesParent = hostElement;
        return nodesParent;
    };
    /**
     * @param {?} parentElement
     * @param {?} debugInfo
     * @return {?}
     */
    ServerRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var /** @type {?} */ comment = getDOM().createComment(TEMPLATE_COMMENT_TEXT);
        if (isPresent(parentElement)) {
            getDOM().appendChild(parentElement, comment);
        }
        return comment;
    };
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?} debugInfo
     * @return {?}
     */
    ServerRenderer.prototype.createText = function (parentElement, value, debugInfo) {
        var /** @type {?} */ node = getDOM().createTextNode(value);
        if (isPresent(parentElement)) {
            getDOM().appendChild(parentElement, node);
        }
        return node;
    };
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    ServerRenderer.prototype.projectNodes = function (parentElement, nodes) {
        if (isBlank(parentElement))
            return;
        appendNodes(parentElement, nodes);
    };
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    ServerRenderer.prototype.attachViewAfter = function (node, viewRootNodes) { moveNodesAfterSibling(node, viewRootNodes); };
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    ServerRenderer.prototype.detachView = function (viewRootNodes) {
        for (var /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
            getDOM().remove(viewRootNodes[i]);
        }
    };
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    ServerRenderer.prototype.destroyView = function (hostElement, viewAllNodes) { };
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    ServerRenderer.prototype.listen = function (renderElement, name, callback) {
        var _this = this;
        // Note: We are not using the EventsPlugin here as this is not needed
        // to run our tests.
        var /** @type {?} */ outsideHandler = function (event) { return _this._zone.runGuarded(function () { return callback(event); }); };
        return this._zone.runOutsideAngular(function () { return getDOM().onAndCancel(renderElement, name, outsideHandler); });
    };
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    ServerRenderer.prototype.listenGlobal = function (target, name, callback) {
        var /** @type {?} */ renderElement = getDOM().getGlobalEventTarget(target);
        return this.listen(renderElement, name, callback);
    };
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    ServerRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        getDOM().setProperty(renderElement, propertyName, propertyValue);
    };
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    ServerRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        var /** @type {?} */ attrNs;
        var /** @type {?} */ attrNameWithoutNs = attributeName;
        if (isNamespaced(attributeName)) {
            var /** @type {?} */ nsAndName = splitNamespace(attributeName);
            attrNameWithoutNs = nsAndName[1];
            attributeName = nsAndName[0] + ':' + nsAndName[1];
            attrNs = NAMESPACE_URIS[nsAndName[0]];
        }
        if (isPresent(attributeValue)) {
            if (isPresent(attrNs)) {
                getDOM().setAttributeNS(renderElement, attrNs, attributeName, attributeValue);
            }
            else {
                getDOM().setAttribute(renderElement, attributeName, attributeValue);
            }
        }
        else {
            if (isPresent(attrNs)) {
                getDOM().removeAttributeNS(renderElement, attrNs, attrNameWithoutNs);
            }
            else {
                getDOM().removeAttribute(renderElement, attributeName);
            }
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    ServerRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        if (getDOM().isCommentNode(renderElement)) {
            var /** @type {?} */ existingBindings = getDOM().getText(renderElement).replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
            var /** @type {?} */ parsedBindings = JSON.parse(existingBindings[1]);
            ((parsedBindings) /** TODO #9100 */)[propertyName] = propertyValue;
            getDOM().setText(renderElement, TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(parsedBindings, null, 2)));
        }
        else {
            this.setElementAttribute(renderElement, propertyName, propertyValue);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    ServerRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        if (isAdd) {
            getDOM().addClass(renderElement, className);
        }
        else {
            getDOM().removeClass(renderElement, className);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    ServerRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        if (isPresent(styleValue)) {
            getDOM().setStyle(renderElement, styleName, stringify(styleValue));
        }
        else {
            getDOM().removeStyle(renderElement, styleName);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    ServerRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        getDOM().invoke(renderElement, methodName, args);
    };
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    ServerRenderer.prototype.setText = function (renderNode, text) { getDOM().setText(renderNode, text); };
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    ServerRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        return this._animationDriver.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
    };
    return ServerRenderer;
}());
function ServerRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerRenderer.prototype._contentAttr;
    /** @type {?} */
    ServerRenderer.prototype._hostAttr;
    /** @type {?} */
    ServerRenderer.prototype._styles;
    /** @type {?} */
    ServerRenderer.prototype._rootRenderer;
    /** @type {?} */
    ServerRenderer.prototype.componentProto;
    /** @type {?} */
    ServerRenderer.prototype._animationDriver;
    /** @type {?} */
    ServerRenderer.prototype._zone;
}
/**
 * @param {?} sibling
 * @param {?} nodes
 * @return {?}
 */
function moveNodesAfterSibling(sibling /** TODO #9100 */, nodes /** TODO #9100 */) {
    var /** @type {?} */ parent = getDOM().parentElement(sibling);
    if (nodes.length > 0 && isPresent(parent)) {
        var /** @type {?} */ nextSibling = getDOM().nextSibling(sibling);
        if (isPresent(nextSibling)) {
            for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                getDOM().insertBefore(nextSibling, nodes[i]);
            }
        }
        else {
            for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                getDOM().appendChild(parent, nodes[i]);
            }
        }
    }
}
/**
 * @param {?} parent
 * @param {?} nodes
 * @return {?}
 */
function appendNodes(parent /** TODO #9100 */, nodes /** TODO #9100 */) {
    for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
        getDOM().appendChild(parent, nodes[i]);
    }
}
/**
 * @param {?} eventHandler
 * @return {?}
 */
function decoratePreventDefault(eventHandler) {
    return function (event /** TODO #9100 */) {
        var /** @type {?} */ allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            getDOM().preventDefault(event);
        }
    };
}
//# sourceMappingURL=server_renderer.js.map