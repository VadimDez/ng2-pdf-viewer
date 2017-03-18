/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var /** @type {?} */ parse5 = require('parse5');
import { ListWrapper } from '../src/facade/collection';
import { DomAdapter, setRootDomAdapter } from './private_import_platform-browser';
import { isPresent, isBlank, global, setValueOnPath } from '../src/facade/lang';
import { SelectorMatcher, CssSelector } from '@angular/compiler';
var /** @type {?} */ treeAdapter;
var /** @type {?} */ _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
};
var /** @type {?} */ defDoc = null;
var /** @type {?} */ mapProps = ['attribs', 'x-attribsNamespace', 'x-attribsPrefix'];
/**
 * @param {?} methodName
 * @return {?}
 */
function _notImplemented(methodName) {
    return new Error('This method is not implemented in Parse5DomAdapter: ' + methodName);
}
/**
 * A `DomAdapter` powered by the `parse5` NodeJS module.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
export var Parse5DomAdapter = (function (_super) {
    __extends(Parse5DomAdapter, _super);
    function Parse5DomAdapter() {
        _super.apply(this, arguments);
    }
    /**
     * @return {?}
     */
    Parse5DomAdapter.makeCurrent = function () {
        treeAdapter = parse5.treeAdapters.htmlparser2;
        setRootDomAdapter(new Parse5DomAdapter());
    };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    Parse5DomAdapter.prototype.hasProperty = function (element, name) {
        return _HTMLElementPropertyList.indexOf(name) > -1;
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setProperty = function (el, name, value) {
        if (name === 'innerHTML') {
            this.setInnerHTML(el, value);
        }
        else if (name === 'className') {
            el.attribs['class'] = el.className = value;
        }
        else {
            el[name] = value;
        }
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    Parse5DomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
    /**
     * @param {?} error
     * @return {?}
     */
    Parse5DomAdapter.prototype.logError = function (error) { console.error(error); };
    /**
     * @param {?} error
     * @return {?}
     */
    Parse5DomAdapter.prototype.log = function (error) { console.log(error); };
    /**
     * @param {?} error
     * @return {?}
     */
    Parse5DomAdapter.prototype.logGroup = function (error) { console.error(error); };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.logGroupEnd = function () { };
    Object.defineProperty(Parse5DomAdapter.prototype, "attrToPropMap", {
        /**
         * @return {?}
         */
        get: function () { return _attrToPropMap; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} selector
     * @return {?}
     */
    Parse5DomAdapter.prototype.query = function (selector) { throw _notImplemented('query'); };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    Parse5DomAdapter.prototype.querySelector = function (el, selector) { return this.querySelectorAll(el, selector)[0]; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    Parse5DomAdapter.prototype.querySelectorAll = function (el, selector) {
        var _this = this;
        var /** @type {?} */ res = [];
        var /** @type {?} */ _recursive = function (result, node, selector, matcher) {
            var /** @type {?} */ cNodes = node.childNodes;
            if (cNodes && cNodes.length > 0) {
                for (var /** @type {?} */ i = 0; i < cNodes.length; i++) {
                    var /** @type {?} */ childNode = cNodes[i];
                    if (_this.elementMatches(childNode, selector, matcher)) {
                        result.push(childNode);
                    }
                    _recursive(result, childNode, selector, matcher);
                }
            }
        };
        var /** @type {?} */ matcher = new SelectorMatcher();
        matcher.addSelectables(CssSelector.parse(selector));
        _recursive(res, el, selector, matcher);
        return res;
    };
    /**
     * @param {?} node
     * @param {?} selector
     * @param {?=} matcher
     * @return {?}
     */
    Parse5DomAdapter.prototype.elementMatches = function (node, selector, matcher) {
        if (matcher === void 0) { matcher = null; }
        if (this.isElementNode(node) && selector === '*') {
            return true;
        }
        var /** @type {?} */ result = false;
        if (selector && selector.charAt(0) == '#') {
            result = this.getAttribute(node, 'id') == selector.substring(1);
        }
        else if (selector) {
            if (!matcher) {
                matcher = new SelectorMatcher();
                matcher.addSelectables(CssSelector.parse(selector));
            }
            var /** @type {?} */ cssSelector = new CssSelector();
            cssSelector.setElement(this.tagName(node));
            if (node.attribs) {
                for (var attrName in node.attribs) {
                    cssSelector.addAttribute(attrName, node.attribs[attrName]);
                }
            }
            var /** @type {?} */ classList = this.classList(node);
            for (var /** @type {?} */ i = 0; i < classList.length; i++) {
                cssSelector.addClassName(classList[i]);
            }
            matcher.match(cssSelector, function (selector, cb) { result = true; });
        }
        return result;
    };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    Parse5DomAdapter.prototype.on = function (el, evt, listener) {
        var /** @type {?} */ listenersMap = el._eventListenersMap;
        if (!listenersMap) {
            listenersMap = {};
            el._eventListenersMap = listenersMap;
        }
        var /** @type {?} */ listeners = listenersMap[evt] || [];
        listenersMap[evt] = listeners.concat([listener]);
    };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    Parse5DomAdapter.prototype.onAndCancel = function (el, evt, listener) {
        this.on(el, evt, listener);
        return function () { ListWrapper.remove(/** @type {?} */ ((el._eventListenersMap[evt])), listener); };
    };
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    Parse5DomAdapter.prototype.dispatchEvent = function (el, evt) {
        if (!evt.target) {
            evt.target = el;
        }
        if (el._eventListenersMap) {
            var /** @type {?} */ listeners = el._eventListenersMap[evt.type];
            if (listeners) {
                for (var /** @type {?} */ i = 0; i < listeners.length; i++) {
                    listeners[i](evt);
                }
            }
        }
        if (el.parent) {
            this.dispatchEvent(el.parent, evt);
        }
        if (el._window) {
            this.dispatchEvent(el._window, evt);
        }
    };
    /**
     * @param {?} eventType
     * @return {?}
     */
    Parse5DomAdapter.prototype.createMouseEvent = function (eventType) { return this.createEvent(eventType); };
    /**
     * @param {?} eventType
     * @return {?}
     */
    Parse5DomAdapter.prototype.createEvent = function (eventType) {
        var /** @type {?} */ event = ({
            type: eventType,
            defaultPrevented: false,
            preventDefault: function () { ((event)).defaultPrevented = true; }
        });
        return event;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Parse5DomAdapter.prototype.preventDefault = function (event) { event.returnValue = false; };
    /**
     * @param {?} event
     * @return {?}
     */
    Parse5DomAdapter.prototype.isPrevented = function (event) { return isPresent(event.returnValue) && !event.returnValue; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getInnerHTML = function (el) {
        return parse5.serialize(this.templateAwareRoot(el), { treeAdapter: treeAdapter });
    };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getTemplateContent = function (el) { return null; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getOuterHTML = function (el) {
        var /** @type {?} */ fragment = treeAdapter.createDocumentFragment();
        this.appendChild(fragment, el);
        return parse5.serialize(fragment, { treeAdapter: treeAdapter });
    };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.nodeName = function (node) { return node.tagName; };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.type = function (node) { throw _notImplemented('type'); };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.content = function (node) { return node.childNodes[0]; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.firstChild = function (el) { return el.firstChild; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.parentElement = function (el) { return el.parent; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.childNodes = function (el) { return el.childNodes; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.childNodesAsList = function (el) {
        var /** @type {?} */ childNodes = el.childNodes;
        var /** @type {?} */ res = new Array(childNodes.length);
        for (var /** @type {?} */ i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.clearNodes = function (el) {
        while (el.childNodes.length > 0) {
            this.remove(el.childNodes[0]);
        }
    };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.appendChild = function (el, node) {
        this.remove(node);
        treeAdapter.appendChild(this.templateAwareRoot(el), node);
    };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.removeChild = function (el, node) {
        if (el.childNodes.indexOf(node) > -1) {
            this.remove(node);
        }
    };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.remove = function (el) {
        var /** @type {?} */ parent = el.parent;
        if (parent) {
            var /** @type {?} */ index = parent.childNodes.indexOf(el);
            parent.childNodes.splice(index, 1);
        }
        var /** @type {?} */ prev = el.previousSibling;
        var /** @type {?} */ next = el.nextSibling;
        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
        el.prev = null;
        el.next = null;
        el.parent = null;
        return el;
    };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.insertBefore = function (el, node) {
        this.remove(node);
        treeAdapter.insertBefore(el.parent, node, el);
    };
    /**
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    Parse5DomAdapter.prototype.insertAllBefore = function (el, nodes) {
        var _this = this;
        nodes.forEach(function (n) { return _this.insertBefore(el, n); });
    };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.insertAfter = function (el, node) {
        if (el.nextSibling) {
            this.insertBefore(el.nextSibling, node);
        }
        else {
            this.appendChild(el.parent, node);
        }
    };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setInnerHTML = function (el, value) {
        this.clearNodes(el);
        var /** @type {?} */ content = parse5.parseFragment(value, { treeAdapter: treeAdapter });
        for (var /** @type {?} */ i = 0; i < content.childNodes.length; i++) {
            treeAdapter.appendChild(el, content.childNodes[i]);
        }
    };
    /**
     * @param {?} el
     * @param {?=} isRecursive
     * @return {?}
     */
    Parse5DomAdapter.prototype.getText = function (el, isRecursive) {
        if (this.isTextNode(el)) {
            return el.data;
        }
        if (this.isCommentNode(el)) {
            // In the DOM, comments within an element return an empty string for textContent
            // However, comment node instances return the comment content for textContent getter
            return isRecursive ? '' : el.data;
        }
        if (!el.childNodes || el.childNodes.length == 0) {
            return '';
        }
        var /** @type {?} */ textContent = '';
        for (var /** @type {?} */ i = 0; i < el.childNodes.length; i++) {
            textContent += this.getText(el.childNodes[i], true);
        }
        return textContent;
    };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setText = function (el, value) {
        if (this.isTextNode(el) || this.isCommentNode(el)) {
            el.data = value;
        }
        else {
            this.clearNodes(el);
            if (value !== '')
                treeAdapter.insertText(el, value);
        }
    };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getValue = function (el) { return el.value; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setValue = function (el, value) { el.value = value; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getChecked = function (el) { return el.checked; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setChecked = function (el, value) { el.checked = value; };
    /**
     * @param {?} text
     * @return {?}
     */
    Parse5DomAdapter.prototype.createComment = function (text) { return treeAdapter.createCommentNode(text); };
    /**
     * @param {?} html
     * @return {?}
     */
    Parse5DomAdapter.prototype.createTemplate = function (html) {
        var /** @type {?} */ template = treeAdapter.createElement('template', 'http://www.w3.org/1999/xhtml', []);
        var /** @type {?} */ content = parse5.parseFragment(html, { treeAdapter: treeAdapter });
        treeAdapter.setTemplateContent(template, content);
        return template;
    };
    /**
     * @param {?} tagName
     * @return {?}
     */
    Parse5DomAdapter.prototype.createElement = function (tagName) {
        return treeAdapter.createElement(tagName, 'http://www.w3.org/1999/xhtml', []);
    };
    /**
     * @param {?} ns
     * @param {?} tagName
     * @return {?}
     */
    Parse5DomAdapter.prototype.createElementNS = function (ns, tagName) {
        return treeAdapter.createElement(tagName, ns, []);
    };
    /**
     * @param {?} text
     * @return {?}
     */
    Parse5DomAdapter.prototype.createTextNode = function (text) {
        var /** @type {?} */ t = (this.createComment(text));
        t.type = 'text';
        return t;
    };
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @return {?}
     */
    Parse5DomAdapter.prototype.createScriptTag = function (attrName, attrValue) {
        return treeAdapter.createElement('script', 'http://www.w3.org/1999/xhtml', [{ name: attrName, value: attrValue }]);
    };
    /**
     * @param {?} css
     * @return {?}
     */
    Parse5DomAdapter.prototype.createStyleElement = function (css) {
        var /** @type {?} */ style = this.createElement('style');
        this.setText(style, css);
        return (style);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.createShadowRoot = function (el) {
        el.shadowRoot = treeAdapter.createDocumentFragment();
        el.shadowRoot.parent = el;
        return el.shadowRoot;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getHost = function (el) { return el.host; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getDistributedNodes = function (el) { throw _notImplemented('getDistributedNodes'); };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.clone = function (node) {
        var /** @type {?} */ _recursive = function (node) {
            var /** @type {?} */ nodeClone = Object.create(Object.getPrototypeOf(node));
            for (var prop in node) {
                var /** @type {?} */ desc = Object.getOwnPropertyDescriptor(node, prop);
                if (desc && 'value' in desc && typeof desc.value !== 'object') {
                    nodeClone[prop] = node[prop];
                }
            }
            nodeClone.parent = null;
            nodeClone.prev = null;
            nodeClone.next = null;
            nodeClone.children = null;
            mapProps.forEach(function (mapName) {
                if (isPresent(node[mapName])) {
                    nodeClone[mapName] = {};
                    for (var prop in node[mapName]) {
                        nodeClone[mapName][prop] = node[mapName][prop];
                    }
                }
            });
            var /** @type {?} */ cNodes = node.children;
            if (cNodes) {
                var /** @type {?} */ cNodesClone = new Array(cNodes.length);
                for (var /** @type {?} */ i = 0; i < cNodes.length; i++) {
                    var /** @type {?} */ childNode = cNodes[i];
                    var /** @type {?} */ childNodeClone = _recursive(childNode);
                    cNodesClone[i] = childNodeClone;
                    if (i > 0) {
                        childNodeClone.prev = cNodesClone[i - 1];
                        cNodesClone[i - 1].next = childNodeClone;
                    }
                    childNodeClone.parent = nodeClone;
                }
                nodeClone.children = cNodesClone;
            }
            return nodeClone;
        };
        return _recursive(node);
    };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    Parse5DomAdapter.prototype.getElementsByClassName = function (element, name) {
        return this.querySelectorAll(element, '.' + name);
    };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    Parse5DomAdapter.prototype.getElementsByTagName = function (element, name) {
        throw _notImplemented('getElementsByTagName');
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Parse5DomAdapter.prototype.classList = function (element) {
        var /** @type {?} */ classAttrValue = null;
        var /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes.hasOwnProperty('class')) {
            classAttrValue = attributes['class'];
        }
        return classAttrValue ? classAttrValue.trim().split(/\s+/g) : [];
    };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    Parse5DomAdapter.prototype.addClass = function (element, className) {
        var /** @type {?} */ classList = this.classList(element);
        var /** @type {?} */ index = classList.indexOf(className);
        if (index == -1) {
            classList.push(className);
            element.attribs['class'] = element.className = classList.join(' ');
        }
    };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    Parse5DomAdapter.prototype.removeClass = function (element, className) {
        var /** @type {?} */ classList = this.classList(element);
        var /** @type {?} */ index = classList.indexOf(className);
        if (index > -1) {
            classList.splice(index, 1);
            element.attribs['class'] = element.className = classList.join(' ');
        }
    };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    Parse5DomAdapter.prototype.hasClass = function (element, className) {
        return this.classList(element).indexOf(className) > -1;
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    Parse5DomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
        if (styleValue === void 0) { styleValue = null; }
        var /** @type {?} */ value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    };
    /**
     * \@internal
     * @param {?} element
     * @return {?}
     */
    Parse5DomAdapter.prototype._readStyleAttribute = function (element) {
        var /** @type {?} */ styleMap = {};
        var /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes.hasOwnProperty('style')) {
            var /** @type {?} */ styleAttrValue = attributes['style'];
            var /** @type {?} */ styleList = styleAttrValue.split(/;+/g);
            for (var /** @type {?} */ i = 0; i < styleList.length; i++) {
                if (styleList[i].length > 0) {
                    var /** @type {?} */ elems = styleList[i].split(/:+/g);
                    ((styleMap))[elems[0].trim()] = elems[1].trim();
                }
            }
        }
        return styleMap;
    };
    /**
     * \@internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */
    Parse5DomAdapter.prototype._writeStyleAttribute = function (element, styleMap) {
        var /** @type {?} */ styleAttrValue = '';
        for (var key in styleMap) {
            var /** @type {?} */ newValue = styleMap[key];
            if (newValue) {
                styleAttrValue += key + ':' + styleMap[key] + ';';
            }
        }
        element.attribs['style'] = styleAttrValue;
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    Parse5DomAdapter.prototype.setStyle = function (element, styleName, styleValue) {
        var /** @type {?} */ styleMap = this._readStyleAttribute(element);
        ((styleMap))[styleName] = styleValue;
        this._writeStyleAttribute(element, styleMap);
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    Parse5DomAdapter.prototype.removeStyle = function (element, styleName) { this.setStyle(element, styleName, null); };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    Parse5DomAdapter.prototype.getStyle = function (element, styleName) {
        var /** @type {?} */ styleMap = this._readStyleAttribute(element);
        return styleMap.hasOwnProperty(styleName) ? ((styleMap))[styleName] : '';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Parse5DomAdapter.prototype.tagName = function (element) { return element.tagName == 'style' ? 'STYLE' : element.tagName; };
    /**
     * @param {?} element
     * @return {?}
     */
    Parse5DomAdapter.prototype.attributeMap = function (element) {
        var /** @type {?} */ res = new Map();
        var /** @type {?} */ elAttrs = treeAdapter.getAttrList(element);
        for (var /** @type {?} */ i = 0; i < elAttrs.length; i++) {
            var /** @type {?} */ attrib = elAttrs[i];
            res.set(attrib.name, attrib.value);
        }
        return res;
    };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    Parse5DomAdapter.prototype.hasAttribute = function (element, attribute) {
        return element.attribs && element.attribs.hasOwnProperty(attribute);
    };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    Parse5DomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    Parse5DomAdapter.prototype.getAttribute = function (element, attribute) {
        return element.attribs && element.attribs.hasOwnProperty(attribute) ?
            element.attribs[attribute] :
            null;
    };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    Parse5DomAdapter.prototype.getAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setAttribute = function (element, attribute, value) {
        if (attribute) {
            element.attribs[attribute] = value;
            if (attribute === 'class') {
                element.className = value;
            }
        }
    };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setAttributeNS = function (element, ns, attribute, value) {
        throw 'not implemented';
    };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    Parse5DomAdapter.prototype.removeAttribute = function (element, attribute) {
        if (attribute) {
            delete element.attribs[attribute];
        }
    };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    Parse5DomAdapter.prototype.removeAttributeNS = function (element, ns, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.templateAwareRoot = function (el) {
        return this.isTemplateElement(el) ? treeAdapter.getTemplateContent(el) : el;
    };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.createHtmlDocument = function () {
        var /** @type {?} */ newDoc = treeAdapter.createDocument();
        newDoc.title = 'fake title';
        var /** @type {?} */ head = treeAdapter.createElement('head', null, []);
        var /** @type {?} */ body = treeAdapter.createElement('body', 'http://www.w3.org/1999/xhtml', []);
        this.appendChild(newDoc, head);
        this.appendChild(newDoc, body);
        newDoc['head'] = head;
        newDoc['body'] = body;
        newDoc['_window'] = {};
        return newDoc;
    };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.defaultDoc = function () { return defDoc = defDoc || this.createHtmlDocument(); };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getBoundingClientRect = function (el) { return { left: 0, top: 0, width: 0, height: 0 }; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.getTitle = function () { return this.defaultDoc().title || ''; };
    /**
     * @param {?} newTitle
     * @return {?}
     */
    Parse5DomAdapter.prototype.setTitle = function (newTitle) { this.defaultDoc().title = newTitle; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.isTemplateElement = function (el) {
        return this.isElementNode(el) && this.tagName(el) === 'template';
    };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.isTextNode = function (node) { return treeAdapter.isTextNode(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.isCommentNode = function (node) { return treeAdapter.isCommentNode(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.isElementNode = function (node) { return node ? treeAdapter.isElementNode(node) : false; };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.hasShadowRoot = function (node) { return isPresent(node.shadowRoot); };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.isShadowRoot = function (node) { return this.getShadowRoot(node) == node; };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.importIntoDoc = function (node) { return this.clone(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.adoptNode = function (node) { return node; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getHref = function (el) { return el.href; };
    /**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    Parse5DomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
        if (href == null) {
            el.href = baseUrl;
        }
        else {
            el.href = baseUrl + '/../' + href;
        }
    };
    /**
     * \@internal
     * @param {?} parsedRules
     * @param {?=} css
     * @return {?}
     */
    Parse5DomAdapter.prototype._buildRules = function (parsedRules, css) {
        var /** @type {?} */ rules = [];
        for (var /** @type {?} */ i = 0; i < parsedRules.length; i++) {
            var /** @type {?} */ parsedRule = parsedRules[i];
            var /** @type {?} */ rule = {};
            rule['cssText'] = css;
            rule['style'] = { content: '', cssText: '' };
            if (parsedRule.type == 'rule') {
                rule['type'] = 1;
                rule['selectorText'] =
                    parsedRule.selectors.join(', '.replace(/\s{2,}/g, ' ')
                        .replace(/\s*~\s*/g, ' ~ ')
                        .replace(/\s*\+\s*/g, ' + ')
                        .replace(/\s*>\s*/g, ' > ')
                        .replace(/\[(\w+)=(\w+)\]/g, '[$1="$2"]'));
                if (isBlank(parsedRule.declarations)) {
                    continue;
                }
                for (var /** @type {?} */ j = 0; j < parsedRule.declarations.length; j++) {
                    var /** @type {?} */ declaration = parsedRule.declarations[j];
                    rule['style'] = declaration.property[declaration.value];
                    rule['style'].cssText += declaration.property + ': ' + declaration.value + ';';
                }
            }
            else if (parsedRule.type == 'media') {
                rule['type'] = 4;
                rule['media'] = { mediaText: parsedRule.media };
                if (parsedRule.rules) {
                    rule['cssRules'] = this._buildRules(parsedRule.rules);
                }
            }
            rules.push(rule);
        }
        return rules;
    };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.supportsDOMEvents = function () { return false; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.supportsNativeShadowDOM = function () { return false; };
    /**
     * @param {?} target
     * @return {?}
     */
    Parse5DomAdapter.prototype.getGlobalEventTarget = function (target) {
        if (target == 'window') {
            return ((this.defaultDoc()))._window;
        }
        else if (target == 'document') {
            return this.defaultDoc();
        }
        else if (target == 'body') {
            return this.defaultDoc().body;
        }
    };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.getBaseHref = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.getUserAgent = function () { return 'Fake user agent'; };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    Parse5DomAdapter.prototype.getData = function (el, name) { return this.getAttribute(el, 'data-' + name); };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getComputedStyle = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setData = function (el, name, value) { this.setAttribute(el, 'data-' + name, value); };
    /**
     * @param {?} path
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setGlobalVar = function (path, value) { setValueOnPath(global, path, value); };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.supportsWebAnimation = function () { return false; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.performanceNow = function () { return Date.now(); };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.getAnimationPrefix = function () { return ''; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.getTransitionEnd = function () { return 'transitionend'; };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.supportsAnimation = function () { return true; };
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    Parse5DomAdapter.prototype.replaceChild = function (el, newNode, oldNode) { throw new Error('not implemented'); };
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    Parse5DomAdapter.prototype.parse = function (templateHtml) { throw new Error('not implemented'); };
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    Parse5DomAdapter.prototype.invoke = function (el, methodName, args) { throw new Error('not implemented'); };
    /**
     * @param {?} event
     * @return {?}
     */
    Parse5DomAdapter.prototype.getEventKey = function (event) { throw new Error('not implemented'); };
    /**
     * @return {?}
     */
    Parse5DomAdapter.prototype.supportsCookies = function () { return false; };
    /**
     * @param {?} name
     * @return {?}
     */
    Parse5DomAdapter.prototype.getCookie = function (name) { throw new Error('not implemented'); };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setCookie = function (name, value) { throw new Error('not implemented'); };
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */
    Parse5DomAdapter.prototype.animate = function (element, keyframes, options) { throw new Error('not implemented'); };
    return Parse5DomAdapter;
}(DomAdapter));
// TODO: build a proper list, this one is all the keys of a HTMLInputElement
var /** @type {?} */ _HTMLElementPropertyList = [
    'webkitEntries',
    'incremental',
    'webkitdirectory',
    'selectionDirection',
    'selectionEnd',
    'selectionStart',
    'labels',
    'validationMessage',
    'validity',
    'willValidate',
    'width',
    'valueAsNumber',
    'valueAsDate',
    'value',
    'useMap',
    'defaultValue',
    'type',
    'step',
    'src',
    'size',
    'required',
    'readOnly',
    'placeholder',
    'pattern',
    'name',
    'multiple',
    'min',
    'minLength',
    'maxLength',
    'max',
    'list',
    'indeterminate',
    'height',
    'formTarget',
    'formNoValidate',
    'formMethod',
    'formEnctype',
    'formAction',
    'files',
    'form',
    'disabled',
    'dirName',
    'checked',
    'defaultChecked',
    'autofocus',
    'autocomplete',
    'alt',
    'align',
    'accept',
    'onautocompleteerror',
    'onautocomplete',
    'onwaiting',
    'onvolumechange',
    'ontoggle',
    'ontimeupdate',
    'onsuspend',
    'onsubmit',
    'onstalled',
    'onshow',
    'onselect',
    'onseeking',
    'onseeked',
    'onscroll',
    'onresize',
    'onreset',
    'onratechange',
    'onprogress',
    'onplaying',
    'onplay',
    'onpause',
    'onmousewheel',
    'onmouseup',
    'onmouseover',
    'onmouseout',
    'onmousemove',
    'onmouseleave',
    'onmouseenter',
    'onmousedown',
    'onloadstart',
    'onloadedmetadata',
    'onloadeddata',
    'onload',
    'onkeyup',
    'onkeypress',
    'onkeydown',
    'oninvalid',
    'oninput',
    'onfocus',
    'onerror',
    'onended',
    'onemptied',
    'ondurationchange',
    'ondrop',
    'ondragstart',
    'ondragover',
    'ondragleave',
    'ondragenter',
    'ondragend',
    'ondrag',
    'ondblclick',
    'oncuechange',
    'oncontextmenu',
    'onclose',
    'onclick',
    'onchange',
    'oncanplaythrough',
    'oncanplay',
    'oncancel',
    'onblur',
    'onabort',
    'spellcheck',
    'isContentEditable',
    'contentEditable',
    'outerText',
    'innerText',
    'accessKey',
    'hidden',
    'webkitdropzone',
    'draggable',
    'tabIndex',
    'dir',
    'translate',
    'lang',
    'title',
    'childElementCount',
    'lastElementChild',
    'firstElementChild',
    'children',
    'onwebkitfullscreenerror',
    'onwebkitfullscreenchange',
    'nextElementSibling',
    'previousElementSibling',
    'onwheel',
    'onselectstart',
    'onsearch',
    'onpaste',
    'oncut',
    'oncopy',
    'onbeforepaste',
    'onbeforecut',
    'onbeforecopy',
    'shadowRoot',
    'dataset',
    'classList',
    'className',
    'outerHTML',
    'innerHTML',
    'scrollHeight',
    'scrollWidth',
    'scrollTop',
    'scrollLeft',
    'clientHeight',
    'clientWidth',
    'clientTop',
    'clientLeft',
    'offsetParent',
    'offsetHeight',
    'offsetWidth',
    'offsetTop',
    'offsetLeft',
    'localName',
    'prefix',
    'namespaceURI',
    'id',
    'style',
    'attributes',
    'tagName',
    'parentElement',
    'textContent',
    'baseURI',
    'ownerDocument',
    'nextSibling',
    'previousSibling',
    'lastChild',
    'firstChild',
    'childNodes',
    'parentNode',
    'nodeType',
    'nodeValue',
    'nodeName',
    'closure_lm_714617',
    '__jsaction',
];
//# sourceMappingURL=parse5_adapter.js.map