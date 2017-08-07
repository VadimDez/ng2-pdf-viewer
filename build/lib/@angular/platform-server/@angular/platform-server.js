/**
 * @license Angular v4.3.3
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { ApplicationRef, Inject, Injectable, InjectionToken, Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, Version, ViewEncapsulation, createPlatformFactory, platformCore, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { BrowserModule, DOCUMENT, ɵDomAdapter, ɵNAMESPACE_URIS, ɵSharedStylesHost, ɵTRANSITION_ID, ɵflattenStyles, ɵgetDOM, ɵsetRootDomAdapter, ɵshimContentAttribute, ɵshimHostAttribute } from '@angular/platform-browser';
import { ɵAnimationEngine } from '@angular/animations/browser';
import { PlatformLocation, ɵPLATFORM_SERVER_ID } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpHandler, XhrFactory, ɵinterceptingHandler } from '@angular/common/http';
import { CssSelector, DomElementSchemaRegistry, SelectorMatcher, platformCoreDynamic } from '@angular/compiler';
import { BrowserXhr, Http, HttpModule, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { parse } from 'url';
import * as url from 'url';
import { filter } from 'rxjs/operator/filter';
import { first } from 'rxjs/operator/first';
import { toPromise } from 'rxjs/operator/toPromise';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const parse5 = require('parse5');
/**
 * Representation of the current platform state.
 *
 * \@experimental
 */
class PlatformState {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * Renders the current state of the platform to string.
     * @return {?}
     */
    renderToString() { return ɵgetDOM().getInnerHTML(this._doc); }
    /**
     * Returns the current DOM state.
     * @return {?}
     */
    getDocument() { return this._doc; }
}
PlatformState.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
PlatformState.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const xhr2 = require('xhr2');
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
/**
 * @param {?} url
 * @return {?}
 */
function validateRequestUrl(url$$1) {
    if (!isAbsoluteUrl.test(url$$1)) {
        throw new Error(`URLs requested via Http on the server must be absolute. URL: ${url$$1}`);
    }
}
class ServerXhr {
    /**
     * @return {?}
     */
    build() { return new xhr2.XMLHttpRequest(); }
}
ServerXhr.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerXhr.ctorParameters = () => [];
class ServerXsrfStrategy {
    /**
     * @param {?} req
     * @return {?}
     */
    configureRequest(req) { }
}
ServerXsrfStrategy.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerXsrfStrategy.ctorParameters = () => [];
/**
 * @abstract
 */
class ZoneMacroTaskWrapper {
    /**
     * @param {?} request
     * @return {?}
     */
    wrap(request) {
        return new Observable((observer) => {
            let /** @type {?} */ task = ((null));
            let /** @type {?} */ scheduled = false;
            let /** @type {?} */ sub = null;
            let /** @type {?} */ savedResult = null;
            let /** @type {?} */ savedError = null;
            const /** @type {?} */ scheduleTask = (_task) => {
                task = _task;
                scheduled = true;
                const /** @type {?} */ delegate = this.delegate(request);
                sub = delegate.subscribe(res => savedResult = res, err => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, () => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            const /** @type {?} */ cancelTask = (_task) => {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            const /** @type {?} */ onComplete = () => {
                if (savedError !== null) {
                    observer.error(savedError);
                }
                else {
                    observer.next(savedResult);
                    observer.complete();
                }
            };
            // MockBackend for Http is synchronous, which means that if scheduleTask is by
            // scheduleMacroTask, the request will hit MockBackend and the response will be
            // sent, causing task.invoke() to be called.
            const /** @type {?} */ _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, () => null, cancelTask);
            scheduleTask(_task);
            return () => {
                if (scheduled && task) {
                    task.zone.cancelTask(task);
                    scheduled = false;
                }
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
        });
    }
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    delegate(request) { }
}
class ZoneMacroTaskConnection extends ZoneMacroTaskWrapper {
    /**
     * @param {?} request
     * @param {?} backend
     */
    constructor(request, backend) {
        super();
        this.request = request;
        this.backend = backend;
        validateRequestUrl(request.url);
        this.response = this.wrap(request);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    delegate(request) {
        this.lastConnection = this.backend.createConnection(request);
        return (this.lastConnection.response);
    }
    /**
     * @return {?}
     */
    get readyState() {
        return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
    }
}
class ZoneMacroTaskBackend {
    /**
     * @param {?} backend
     */
    constructor(backend) {
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    createConnection(request) {
        return new ZoneMacroTaskConnection(request, this.backend);
    }
}
class ZoneClientBackend extends ZoneMacroTaskWrapper {
    /**
     * @param {?} backend
     */
    constructor(backend) {
        super();
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    handle(request) { return this.wrap(request); }
    /**
     * @param {?} request
     * @return {?}
     */
    delegate(request) {
        return this.backend.handle(request);
    }
}
/**
 * @param {?} xhrBackend
 * @param {?} options
 * @return {?}
 */
function httpFactory(xhrBackend, options) {
    const /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
/**
 * @param {?} backend
 * @param {?} interceptors
 * @return {?}
 */
function zoneWrappedInterceptingHandler(backend, interceptors) {
    const /** @type {?} */ realBackend = ɵinterceptingHandler(backend, interceptors);
    return new ZoneClientBackend(realBackend);
}
const SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, [new Optional(), HTTP_INTERCEPTORS]]
    }
];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The DI token for setting the initial config for the platform.
 *
 * \@experimental
 */
const INITIAL_CONFIG = new InjectionToken('Server.INITIAL_CONFIG');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} urlStr
 * @return {?}
 */
function parseUrl(urlStr) {
    const /** @type {?} */ parsedUrl = parse(urlStr);
    return {
        pathname: parsedUrl.pathname || '',
        search: parsedUrl.search || '',
        hash: parsedUrl.hash || '',
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
class ServerPlatformLocation {
    /**
     * @param {?} _doc
     * @param {?} _config
     */
    constructor(_doc, _config) {
        this._doc = _doc;
        this._path = '/';
        this._search = '';
        this._hash = '';
        this._hashUpdate = new Subject();
        const config = _config;
        if (!!config && !!config.url) {
            const parsedUrl = parseUrl(config.url);
            this._path = parsedUrl.pathname;
            this._search = parsedUrl.search;
            this._hash = parsedUrl.hash;
        }
    }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() { return ((ɵgetDOM().getBaseHref(this._doc))); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) { this._hashUpdate.subscribe(fn); }
    /**
     * @return {?}
     */
    get pathname() { return this._path; }
    /**
     * @return {?}
     */
    get search() { return this._search; }
    /**
     * @return {?}
     */
    get hash() { return this._hash; }
    /**
     * @return {?}
     */
    get url() { return `${this.pathname}${this.search}${this.hash}`; }
    /**
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */
    setHash(value, oldUrl) {
        if (this._hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        this._hash = value;
        const /** @type {?} */ newUrl = this.url;
        scheduleMicroTask(() => this._hashUpdate.next(/** @type {?} */ ({ type: 'hashchange', oldUrl, newUrl })));
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    replaceState(state, title, newUrl) {
        const /** @type {?} */ oldUrl = this.url;
        const /** @type {?} */ parsedUrl = parseUrl(newUrl);
        this._path = parsedUrl.pathname;
        this._search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    pushState(state, title, newUrl) {
        this.replaceState(state, title, newUrl);
    }
    /**
     * @return {?}
     */
    forward() { throw new Error('Not implemented'); }
    /**
     * @return {?}
     */
    back() { throw new Error('Not implemented'); }
}
ServerPlatformLocation.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerPlatformLocation.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] },] },
];
/**
 * @param {?} fn
 * @return {?}
 */
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const parse5$1 = require('parse5');
let treeAdapter;
const _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
};
const mapProps = ['attribs', 'x-attribsNamespace', 'x-attribsPrefix'];
/**
 * @param {?} methodName
 * @return {?}
 */
function _notImplemented(methodName) {
    return new Error('This method is not implemented in Parse5DomAdapter: ' + methodName);
}
/**
 * @param {?} el
 * @param {?} name
 * @return {?}
 */
function _getElement(el, name) {
    for (let /** @type {?} */ i = 0; i < el.childNodes.length; i++) {
        let /** @type {?} */ node = el.childNodes[i];
        if (node.name === name) {
            return node;
        }
    }
    return null;
}
/**
 * Parses a document string to a Document object.
 * @param {?} html
 * @return {?}
 */
function parseDocument(html) {
    let /** @type {?} */ doc = parse5$1.parse(html, { treeAdapter: parse5$1.treeAdapters.htmlparser2 });
    let /** @type {?} */ docElement = _getElement(doc, 'html');
    doc['head'] = _getElement(docElement, 'head');
    doc['body'] = _getElement(docElement, 'body');
    doc['_window'] = {};
    return doc;
}
/**
 * A `DomAdapter` powered by the `parse5` NodeJS module.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
class Parse5DomAdapter extends ɵDomAdapter {
    /**
     * @return {?}
     */
    static makeCurrent() {
        treeAdapter = parse5$1.treeAdapters.htmlparser2;
        ɵsetRootDomAdapter(new Parse5DomAdapter());
    }
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    contains(nodeA, nodeB) {
        let /** @type {?} */ inner = nodeB;
        while (inner) {
            if (inner === nodeA)
                return true;
            inner = inner.parent;
        }
        return false;
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) {
        return _HTMLElementPropertyList.indexOf(name) > -1;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        if (name === 'innerHTML') {
            this.setInnerHTML(el, value);
        }
        else if (name === 'innerText') {
            this.setText(el, value);
        }
        else if (name === 'className') {
            el.attribs['class'] = el.className = value;
        }
        else {
            // Store the property in a separate property bag so that it doesn't clobber
            // actual parse5 properties on the Element.
            el.properties = el.properties || {};
            el.properties[name] = value;
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) {
        return el.properties ? el.properties[name] : undefined;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) { console.error(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) { console.log(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) { console.error(error); }
    /**
     * @return {?}
     */
    logGroupEnd() { }
    /**
     * @return {?}
     */
    get attrToPropMap() { return _attrToPropMap; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) {
        return this.querySelectorAll(el, selector)[0] || null;
    }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) {
        const /** @type {?} */ res = [];
        const /** @type {?} */ _recursive = (result, node, selector, matcher) => {
            const /** @type {?} */ cNodes = node.childNodes;
            if (cNodes && cNodes.length > 0) {
                for (let /** @type {?} */ i = 0; i < cNodes.length; i++) {
                    const /** @type {?} */ childNode = cNodes[i];
                    if (this.elementMatches(childNode, selector, matcher)) {
                        result.push(childNode);
                    }
                    _recursive(result, childNode, selector, matcher);
                }
            }
        };
        const /** @type {?} */ matcher = new SelectorMatcher();
        matcher.addSelectables(CssSelector.parse(selector));
        _recursive(res, el, selector, matcher);
        return res;
    }
    /**
     * @param {?} node
     * @param {?} selector
     * @param {?=} matcher
     * @return {?}
     */
    elementMatches(node, selector, matcher = null) {
        if (this.isElementNode(node) && selector === '*') {
            return true;
        }
        let /** @type {?} */ result = false;
        if (selector && selector.charAt(0) == '#') {
            result = this.getAttribute(node, 'id') == selector.substring(1);
        }
        else if (selector) {
            if (!matcher) {
                matcher = new SelectorMatcher();
                matcher.addSelectables(CssSelector.parse(selector));
            }
            const /** @type {?} */ cssSelector = new CssSelector();
            cssSelector.setElement(this.tagName(node));
            if (node.attribs) {
                for (const /** @type {?} */ attrName in node.attribs) {
                    cssSelector.addAttribute(attrName, node.attribs[attrName]);
                }
            }
            const /** @type {?} */ classList = this.classList(node);
            for (let /** @type {?} */ i = 0; i < classList.length; i++) {
                cssSelector.addClassName(classList[i]);
            }
            matcher.match(cssSelector, function (selector, cb) { result = true; });
        }
        return result;
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) {
        let /** @type {?} */ listenersMap = el._eventListenersMap;
        if (!listenersMap) {
            listenersMap = {};
            el._eventListenersMap = listenersMap;
        }
        const /** @type {?} */ listeners = listenersMap[evt] || [];
        listenersMap[evt] = [...listeners, listener];
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        this.on(el, evt, listener);
        return () => { remove(/** @type {?} */ ((el._eventListenersMap[evt])), listener); };
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) {
        if (!evt.target) {
            evt.target = el;
        }
        if (el._eventListenersMap) {
            const /** @type {?} */ listeners = el._eventListenersMap[evt.type];
            if (listeners) {
                for (let /** @type {?} */ i = 0; i < listeners.length; i++) {
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
    }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) { return this.createEvent(eventType); }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) {
        const /** @type {?} */ event = ({
            type: eventType,
            defaultPrevented: false,
            preventDefault: () => { ((event)).defaultPrevented = true; }
        });
        return event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    preventDefault(event) { event.returnValue = false; }
    /**
     * @param {?} event
     * @return {?}
     */
    isPrevented(event) { return event.returnValue != null && !event.returnValue; }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) {
        return parse5$1.serialize(this.templateAwareRoot(el), { treeAdapter });
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) { return null; }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) {
        const /** @type {?} */ fragment = treeAdapter.createDocumentFragment();
        this.appendChild(fragment, el);
        return parse5$1.serialize(fragment, { treeAdapter });
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { return node.tagName; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { return node.nodeValue; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { throw _notImplemented('type'); }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node) { return node.childNodes[0]; }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { return el.firstChild; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { return el.nextSibling; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { return el.parent; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { return el.childNodes; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) {
        const /** @type {?} */ childNodes = el.childNodes;
        const /** @type {?} */ res = new Array(childNodes.length);
        for (let /** @type {?} */ i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) {
        while (el.childNodes.length > 0) {
            this.remove(el.childNodes[0]);
        }
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) {
        this.remove(node);
        treeAdapter.appendChild(this.templateAwareRoot(el), node);
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) {
        if (el.childNodes.indexOf(node) > -1) {
            this.remove(node);
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    remove(el) {
        const /** @type {?} */ parent = el.parent;
        if (parent) {
            const /** @type {?} */ index = parent.childNodes.indexOf(el);
            parent.childNodes.splice(index, 1);
        }
        const /** @type {?} */ prev = el.previousSibling;
        const /** @type {?} */ next = el.nextSibling;
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
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} newNode
     * @return {?}
     */
    insertBefore(parent, ref, newNode) {
        this.remove(newNode);
        if (ref) {
            treeAdapter.insertBefore(parent, newNode, ref);
        }
        else {
            this.appendChild(parent, newNode);
        }
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(parent, ref, nodes) {
        nodes.forEach((n) => this.insertBefore(parent, ref, n));
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    insertAfter(parent, ref, node) {
        if (ref.nextSibling) {
            this.insertBefore(parent, ref.nextSibling, node);
        }
        else {
            this.appendChild(parent, node);
        }
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) {
        this.clearNodes(el);
        const /** @type {?} */ content = parse5$1.parseFragment(value, { treeAdapter });
        for (let /** @type {?} */ i = 0; i < content.childNodes.length; i++) {
            treeAdapter.appendChild(el, content.childNodes[i]);
        }
    }
    /**
     * @param {?} el
     * @param {?=} isRecursive
     * @return {?}
     */
    getText(el, isRecursive) {
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
        let /** @type {?} */ textContent = '';
        for (let /** @type {?} */ i = 0; i < el.childNodes.length; i++) {
            textContent += this.getText(el.childNodes[i], true);
        }
        return textContent;
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) {
        if (this.isTextNode(el) || this.isCommentNode(el)) {
            el.data = value;
        }
        else {
            this.clearNodes(el);
            if (value !== '')
                treeAdapter.insertText(el, value);
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { return el.value; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { el.value = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { return el.checked; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { el.checked = value; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { return treeAdapter.createCommentNode(text); }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) {
        const /** @type {?} */ template = treeAdapter.createElement('template', 'http://www.w3.org/1999/xhtml', []);
        const /** @type {?} */ content = parse5$1.parseFragment(html, { treeAdapter });
        treeAdapter.setTemplateContent(template, content);
        return template;
    }
    /**
     * @param {?} tagName
     * @return {?}
     */
    createElement(tagName) {
        return treeAdapter.createElement(tagName, 'http://www.w3.org/1999/xhtml', []);
    }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @return {?}
     */
    createElementNS(ns, tagName) {
        return treeAdapter.createElement(tagName, ns, []);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    createTextNode(text) {
        const /** @type {?} */ t = (this.createComment(text));
        t.type = 'text';
        return t;
    }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @return {?}
     */
    createScriptTag(attrName, attrValue) {
        return treeAdapter.createElement('script', 'http://www.w3.org/1999/xhtml', [{ name: attrName, value: attrValue }]);
    }
    /**
     * @param {?} css
     * @return {?}
     */
    createStyleElement(css) {
        const /** @type {?} */ style = this.createElement('style');
        this.setText(style, css);
        return (style);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) {
        el.shadowRoot = treeAdapter.createDocumentFragment();
        el.shadowRoot.parent = el;
        return el.shadowRoot;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { return el.shadowRoot; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { return el.host; }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { throw _notImplemented('getDistributedNodes'); }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) {
        const /** @type {?} */ _recursive = (node) => {
            const /** @type {?} */ nodeClone = Object.create(Object.getPrototypeOf(node));
            for (const /** @type {?} */ prop in node) {
                const /** @type {?} */ desc = Object.getOwnPropertyDescriptor(node, prop);
                if (desc && 'value' in desc && typeof desc.value !== 'object') {
                    nodeClone[prop] = node[prop];
                }
            }
            nodeClone.parent = null;
            nodeClone.prev = null;
            nodeClone.next = null;
            nodeClone.children = null;
            mapProps.forEach(mapName => {
                if (node[mapName] != null) {
                    nodeClone[mapName] = {};
                    for (const /** @type {?} */ prop in node[mapName]) {
                        nodeClone[mapName][prop] = node[mapName][prop];
                    }
                }
            });
            const /** @type {?} */ cNodes = node.children;
            if (cNodes) {
                const /** @type {?} */ cNodesClone = new Array(cNodes.length);
                for (let /** @type {?} */ i = 0; i < cNodes.length; i++) {
                    const /** @type {?} */ childNode = cNodes[i];
                    const /** @type {?} */ childNodeClone = _recursive(childNode);
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
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) {
        return this.querySelectorAll(element, '.' + name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) {
        return this.querySelectorAll(element, name);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) {
        let /** @type {?} */ classAttrValue = null;
        const /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes['class'] != null) {
            classAttrValue = attributes['class'];
        }
        return classAttrValue ? classAttrValue.trim().split(/\s+/g) : [];
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) {
        const /** @type {?} */ classList = this.classList(element);
        const /** @type {?} */ index = classList.indexOf(className);
        if (index == -1) {
            classList.push(className);
            element.attribs['class'] = element.className = classList.join(' ');
        }
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) {
        const /** @type {?} */ classList = this.classList(element);
        const /** @type {?} */ index = classList.indexOf(className);
        if (index > -1) {
            classList.splice(index, 1);
            element.attribs['class'] = element.className = classList.join(' ');
        }
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) {
        return this.classList(element).indexOf(className) > -1;
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) {
        const /** @type {?} */ value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * \@internal
     * @param {?} element
     * @return {?}
     */
    _readStyleAttribute(element) {
        const /** @type {?} */ styleMap = {};
        const /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes['style'] != null) {
            const /** @type {?} */ styleAttrValue = attributes['style'];
            const /** @type {?} */ styleList = styleAttrValue.split(/;+/g);
            for (let /** @type {?} */ i = 0; i < styleList.length; i++) {
                if (styleList[i].length > 0) {
                    const /** @type {?} */ style = (styleList[i]);
                    const /** @type {?} */ colon = style.indexOf(':');
                    if (colon === -1) {
                        throw new Error(`Invalid CSS style: ${style}`);
                    }
                    ((styleMap))[style.substr(0, colon).trim()] = style.substr(colon + 1).trim();
                }
            }
        }
        return styleMap;
    }
    /**
     * \@internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */
    _writeStyleAttribute(element, styleMap) {
        let /** @type {?} */ styleAttrValue = '';
        for (const /** @type {?} */ key in styleMap) {
            const /** @type {?} */ newValue = styleMap[key];
            if (newValue) {
                styleAttrValue += key + ':' + styleMap[key] + ';';
            }
        }
        element.attribs['style'] = styleAttrValue;
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) {
        const /** @type {?} */ styleMap = this._readStyleAttribute(element);
        ((styleMap))[styleName] = styleValue;
        this._writeStyleAttribute(element, styleMap);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element, styleName) { this.setStyle(element, styleName, null); }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element, styleName) {
        const /** @type {?} */ styleMap = this._readStyleAttribute(element);
        return styleMap.hasOwnProperty(styleName) ? ((styleMap))[styleName] : '';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    tagName(element) { return element.tagName == 'style' ? 'STYLE' : element.tagName; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) {
        const /** @type {?} */ res = new Map();
        const /** @type {?} */ elAttrs = treeAdapter.getAttrList(element);
        for (let /** @type {?} */ i = 0; i < elAttrs.length; i++) {
            const /** @type {?} */ attrib = elAttrs[i];
            res.set(attrib.name, attrib.value);
        }
        return res;
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) {
        return element.attribs && element.attribs[attribute] != null;
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) {
        return this.hasAttribute(element, attribute);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) {
        return this.hasAttribute(element, attribute) ? element.attribs[attribute] : null;
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    getAttributeNS(element, ns, attribute) {
        return this.getAttribute(element, attribute);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, attribute, value) {
        if (attribute) {
            element.attribs[attribute] = value;
            if (attribute === 'class') {
                element.className = value;
            }
        }
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, attribute, value) {
        this.setAttribute(element, attribute, value);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) {
        if (attribute) {
            delete element.attribs[attribute];
        }
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    removeAttributeNS(element, ns, name) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) {
        return this.isTemplateElement(el) ? treeAdapter.getTemplateContent(el) : el;
    }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        const /** @type {?} */ newDoc = treeAdapter.createDocument();
        newDoc.title = 'fakeTitle';
        const /** @type {?} */ head = treeAdapter.createElement('head', null, []);
        const /** @type {?} */ body = treeAdapter.createElement('body', 'http://www.w3.org/1999/xhtml', []);
        this.appendChild(newDoc, head);
        this.appendChild(newDoc, body);
        newDoc['head'] = head;
        newDoc['body'] = body;
        newDoc['_window'] = {};
        return newDoc;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) { return { left: 0, top: 0, width: 0, height: 0 }; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { return this.getText(this.getTitleNode(doc)) || ''; }
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) {
        this.setText(this.getTitleNode(doc), newTitle || '');
    }
    /**
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) {
        return this.isElementNode(el) && this.tagName(el) === 'template';
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { return treeAdapter.isTextNode(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { return treeAdapter.isCommentNode(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { return node ? treeAdapter.isElementNode(node) : false; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { return node.shadowRoot != null; }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return this.getShadowRoot(node) == node; }
    /**
     * @param {?} node
     * @return {?}
     */
    importIntoDoc(node) { return this.clone(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    adoptNode(node) { return node; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHref(el) { return this.getAttribute(el, 'href'); }
    /**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(el, baseUrl, href) {
        if (href == null) {
            el.href = baseUrl;
        }
        else {
            el.href = baseUrl + '/../' + href;
        }
    }
    /**
     * \@internal
     * @param {?} parsedRules
     * @param {?=} css
     * @return {?}
     */
    _buildRules(parsedRules, css) {
        const /** @type {?} */ rules = [];
        for (let /** @type {?} */ i = 0; i < parsedRules.length; i++) {
            const /** @type {?} */ parsedRule = parsedRules[i];
            const /** @type {?} */ rule = {};
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
                if (parsedRule.declarations == null) {
                    continue;
                }
                for (let /** @type {?} */ j = 0; j < parsedRule.declarations.length; j++) {
                    const /** @type {?} */ declaration = parsedRule.declarations[j];
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
    }
    /**
     * @return {?}
     */
    supportsDOMEvents() { return false; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() { return false; }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) {
        if (target == 'window') {
            return ((doc))._window;
        }
        else if (target == 'document') {
            return doc;
        }
        else if (target == 'body') {
            return doc.body;
        }
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) {
        const /** @type {?} */ base = this.querySelector(doc, 'base');
        let /** @type {?} */ href = '';
        if (base) {
            href = this.getHref(base);
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href == null ? null : href;
    }
    /**
     * @return {?}
     */
    resetBaseElement() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getHistory() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getLocation() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getUserAgent() { return 'Fake user agent'; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getData(el, name) { return this.getAttribute(el, 'data-' + name); }
    /**
     * @param {?} el
     * @return {?}
     */
    getComputedStyle(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(el, name, value) { this.setAttribute(el, 'data-' + name, value); }
    /**
     * @return {?}
     */
    supportsWebAnimation() { return false; }
    /**
     * @return {?}
     */
    performanceNow() { return Date.now(); }
    /**
     * @return {?}
     */
    getAnimationPrefix() { return ''; }
    /**
     * @return {?}
     */
    getTransitionEnd() { return 'transitionend'; }
    /**
     * @return {?}
     */
    supportsAnimation() { return true; }
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    replaceChild(el, newNode, oldNode) { throw new Error('not implemented'); }
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw new Error('not implemented'); }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { throw new Error('not implemented'); }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) { throw new Error('not implemented'); }
    /**
     * @return {?}
     */
    supportsCookies() { return false; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { throw new Error('not implemented'); }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) { throw new Error('not implemented'); }
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */
    animate(element, keyframes, options) { throw new Error('not implemented'); }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTitleNode(doc) {
        let /** @type {?} */ title = this.querySelector(doc, 'title');
        if (!title) {
            title = (this.createElement('title'));
            this.appendChild(this.querySelector(doc, 'head'), title);
        }
        return title;
    }
}
// TODO: build a proper list, this one is all the keys of a HTMLInputElement
const _HTMLElementPropertyList = [
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
/**
 * @template T
 * @param {?} list
 * @param {?} el
 * @return {?}
 */
function remove(list, el) {
    const /** @type {?} */ index = list.indexOf(el);
    if (index > -1) {
        list.splice(index, 1);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const EMPTY_ARRAY = [];
class ServerRendererFactory2 {
    /**
     * @param {?} ngZone
     * @param {?} document
     * @param {?} sharedStylesHost
     */
    constructor(ngZone, document, sharedStylesHost) {
        this.ngZone = ngZone;
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.schema = new DomElementSchemaRegistry();
        this.defaultRenderer = new DefaultServerRenderer2(document, ngZone, this.schema);
    }
    ;
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Native:
            case ViewEncapsulation.Emulated: {
                let /** @type {?} */ renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer = new EmulatedEncapsulationServerRenderer2(this.document, this.ngZone, this.sharedStylesHost, this.schema, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                ((renderer)).applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
                throw new Error('Native encapsulation is not supported on the server!');
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    const /** @type {?} */ styles = ɵflattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    }
    /**
     * @return {?}
     */
    begin() { }
    /**
     * @return {?}
     */
    end() { }
}
ServerRendererFactory2.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerRendererFactory2.ctorParameters = () => [
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: ɵSharedStylesHost, },
];
class DefaultServerRenderer2 {
    /**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} schema
     */
    constructor(document, ngZone, schema) {
        this.document = document;
        this.ngZone = ngZone;
        this.schema = schema;
        this.data = Object.create(null);
    }
    /**
     * @return {?}
     */
    destroy() { }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @param {?=} debugInfo
     * @return {?}
     */
    createElement(name, namespace, debugInfo) {
        if (namespace) {
            return ɵgetDOM().createElementNS(ɵNAMESPACE_URIS[namespace], name);
        }
        return ɵgetDOM().createElement(name);
    }
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    createComment(value, debugInfo) { return ɵgetDOM().createComment(value); }
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    createText(value, debugInfo) { return ɵgetDOM().createTextNode(value); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) { ɵgetDOM().appendChild(parent, newChild); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            ɵgetDOM().insertBefore(parent, refChild, newChild);
        }
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        if (parent) {
            ɵgetDOM().removeChild(parent, oldChild);
        }
    }
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        let /** @type {?} */ el;
        if (typeof selectorOrNode === 'string') {
            el = ɵgetDOM().querySelector(this.document, selectorOrNode);
            if (!el) {
                throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
            }
        }
        else {
            el = selectorOrNode;
        }
        ɵgetDOM().clearNodes(el);
        return el;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) { return ɵgetDOM().parentElement(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { return ɵgetDOM().nextSibling(node); }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            ɵgetDOM().setAttributeNS(el, ɵNAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            ɵgetDOM().setAttribute(el, name, value);
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        if (namespace) {
            ɵgetDOM().removeAttributeNS(el, ɵNAMESPACE_URIS[namespace], name);
        }
        else {
            ɵgetDOM().removeAttribute(el, name);
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) { ɵgetDOM().addClass(el, name); }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) { ɵgetDOM().removeClass(el, name); }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    setStyle(el, style, value, flags) {
        ɵgetDOM().setStyle(el, style, value);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    removeStyle(el, style, flags) {
        ɵgetDOM().removeStyle(el, style);
    }
    /**
     * @param {?} tagName
     * @param {?} propertyName
     * @return {?}
     */
    _isSafeToReflectProperty(tagName, propertyName) {
        return this.schema.securityContext(tagName, propertyName, true) ===
            this.schema.securityContext(tagName, propertyName, false);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        checkNoSyntheticProp(name, 'property');
        ɵgetDOM().setProperty(el, name, value);
        // Mirror property values for known HTML element properties in the attributes.
        const /** @type {?} */ tagName = ((el.tagName)).toLowerCase();
        if (value != null && (typeof value === 'number' || typeof value == 'string') &&
            this.schema.hasElement(tagName, EMPTY_ARRAY) &&
            this.schema.hasProperty(tagName, name, EMPTY_ARRAY) &&
            this._isSafeToReflectProperty(tagName, name)) {
            this.setAttribute(el, name, value.toString());
        }
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { ɵgetDOM().setText(node, value); }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(target, eventName, callback) {
        // Note: We are not using the EventsPlugin here as this is not needed
        // to run our tests.
        checkNoSyntheticProp(eventName, 'listener');
        const /** @type {?} */ el = typeof target === 'string' ? ɵgetDOM().getGlobalEventTarget(this.document, target) : target;
        const /** @type {?} */ outsideHandler = (event) => this.ngZone.runGuarded(() => callback(event));
        return this.ngZone.runOutsideAngular(() => ɵgetDOM().onAndCancel(el, eventName, outsideHandler));
    }
}
const AT_CHARCODE = '@'.charCodeAt(0);
/**
 * @param {?} name
 * @param {?} nameKind
 * @return {?}
 */
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error(`Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`);
    }
}
class EmulatedEncapsulationServerRenderer2 extends DefaultServerRenderer2 {
    /**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} sharedStylesHost
     * @param {?} schema
     * @param {?} component
     */
    constructor(document, ngZone, sharedStylesHost, schema, component) {
        super(document, ngZone, schema);
        this.component = component;
        const styles = ɵflattenStyles(component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = ɵshimContentAttribute(component.id);
        this.hostAttr = ɵshimHostAttribute(component.id);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    applyToHost(element) { super.setAttribute(element, this.hostAttr, ''); }
    /**
     * @param {?} parent
     * @param {?} name
     * @return {?}
     */
    createElement(parent, name) {
        const /** @type {?} */ el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class ServerStylesHost extends ɵSharedStylesHost {
    /**
     * @param {?} doc
     * @param {?} transitionId
     */
    constructor(doc, transitionId) {
        super();
        this.doc = doc;
        this.transitionId = transitionId;
        this.head = null;
        this.head = ɵgetDOM().getElementsByTagName(doc, 'head')[0];
    }
    /**
     * @param {?} style
     * @return {?}
     */
    _addStyle(style) {
        let /** @type {?} */ adapter = (ɵgetDOM());
        const /** @type {?} */ el = adapter.createElement('style');
        adapter.setText(el, style);
        if (!!this.transitionId) {
            adapter.setAttribute(el, 'ng-transition', this.transitionId);
        }
        adapter.appendChild(this.head, el);
    }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) { additions.forEach(style => this._addStyle(style)); }
}
ServerStylesHost.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerStylesHost.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ɵTRANSITION_ID,] },] },
];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: ɵPLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initParse5Adapter, multi: true, deps: [Injector] },
    { provide: PlatformLocation, useClass: ServerPlatformLocation }, PlatformState,
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ɵALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
/**
 * @param {?} injector
 * @return {?}
 */
function initParse5Adapter(injector) {
    return () => { Parse5DomAdapter.makeCurrent(); };
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
function instantiateServerRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
const SERVER_RENDER_PROVIDERS = [
    ServerRendererFactory2,
    {
        provide: RendererFactory2,
        useFactory: instantiateServerRendererFactory,
        deps: [ServerRendererFactory2, ɵAnimationEngine, NgZone]
    },
    ServerStylesHost,
    { provide: ɵSharedStylesHost, useExisting: ServerStylesHost },
];
/**
 * The ng module for the server.
 *
 * \@experimental
 */
class ServerModule {
}
ServerModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                imports: [HttpModule, HttpClientModule, NoopAnimationsModule],
                providers: [
                    SERVER_RENDER_PROVIDERS,
                    SERVER_HTTP_PROVIDERS,
                    { provide: Testability, useValue: null },
                ],
            },] },
];
/**
 * @nocollapse
 */
ServerModule.ctorParameters = () => [];
/**
 * @param {?} injector
 * @return {?}
 */
function _document(injector) {
    let /** @type {?} */ config = injector.get(INITIAL_CONFIG, null);
    if (config && config.document) {
        return parseDocument(config.document);
    }
    else {
        return ɵgetDOM().createHtmlDocument();
    }
}
/**
 * \@experimental
 */
const platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * \@experimental
 */
const platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const parse5$2 = require('parse5');
/**
 * @param {?} platformFactory
 * @param {?} options
 * @return {?}
 */
function _getPlatform(platformFactory, options) {
    const /** @type {?} */ extraProviders = options.extraProviders ? options.extraProviders : [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
/**
 * @template T
 * @param {?} platform
 * @param {?} moduleRefPromise
 * @return {?}
 */
function _render(platform, moduleRefPromise) {
    return moduleRefPromise.then((moduleRef) => {
        const /** @type {?} */ transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error(`renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure
the server-rendered app can be properly bootstrapped into a client app.`);
        }
        const /** @type {?} */ applicationRef = moduleRef.injector.get(ApplicationRef);
        return toPromise
            .call(first.call(filter.call(applicationRef.isStable, (isStable) => isStable)))
            .then(() => {
            const /** @type {?} */ output = platform.injector.get(PlatformState).renderToString();
            platform.destroy();
            return output;
        });
    });
}
/**
 * Renders a Module to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * Do not use this in a production server environment. Use pre-compiled {\@link NgModuleFactory} with
 * {\@link renderModuleFactory} instead.
 *
 * \@experimental
 * @template T
 * @param {?} module
 * @param {?} options
 * @return {?}
 */
function renderModule(module, options) {
    const /** @type {?} */ platform = _getPlatform(platformDynamicServer, options);
    return _render(platform, platform.bootstrapModule(module));
}
/**
 * Renders a {\@link NgModuleFactory} to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * \@experimental
 * @template T
 * @param {?} moduleFactory
 * @param {?} options
 * @return {?}
 */
function renderModuleFactory(moduleFactory, options) {
    const /** @type {?} */ platform = _getPlatform(platformServer, options);
    return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
/**
 * \@stable
 */
const VERSION = new Version('4.3.3');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-server package.
 */

// This file only reexports content of the `src` folder. Keep it that way.

/**
 * Generated bundle index. Do not edit.
 */

export { PlatformState, ServerModule, platformDynamicServer, platformServer, INITIAL_CONFIG, renderModule, renderModuleFactory, VERSION, INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS, ServerRendererFactory2 as ɵServerRendererFactory2, SERVER_HTTP_PROVIDERS as ɵg, ServerXhr as ɵc, ServerXsrfStrategy as ɵd, httpFactory as ɵe, zoneWrappedInterceptingHandler as ɵf, instantiateServerRendererFactory as ɵa, ServerStylesHost as ɵb };
//# sourceMappingURL=platform-server.js.map
