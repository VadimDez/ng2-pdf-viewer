import * as tslib_1 from "tslib";
/**
 * @license Angular v4.4.6
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
var parse5 = require('parse5');
/**
 * Representation of the current platform state.
 *
 * \@experimental
 */
var PlatformState = (function () {
    /**
     * @param {?} _doc
     */
    function PlatformState(_doc) {
        this._doc = _doc;
    }
    /**
     * Renders the current state of the platform to string.
     * @return {?}
     */
    PlatformState.prototype.renderToString = function () { return ɵgetDOM().getInnerHTML(this._doc); };
    /**
     * Returns the current DOM state.
     * @return {?}
     */
    PlatformState.prototype.getDocument = function () { return this._doc; };
    return PlatformState;
}());
PlatformState.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
PlatformState.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var xhr2 = require('xhr2');
var isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
/**
 * @param {?} url
 * @return {?}
 */
function validateRequestUrl(url$$1) {
    if (!isAbsoluteUrl.test(url$$1)) {
        throw new Error("URLs requested via Http on the server must be absolute. URL: " + url$$1);
    }
}
var ServerXhr = (function () {
    function ServerXhr() {
    }
    /**
     * @return {?}
     */
    ServerXhr.prototype.build = function () { return new xhr2.XMLHttpRequest(); };
    return ServerXhr;
}());
ServerXhr.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerXhr.ctorParameters = function () { return []; };
var ServerXsrfStrategy = (function () {
    function ServerXsrfStrategy() {
    }
    /**
     * @param {?} req
     * @return {?}
     */
    ServerXsrfStrategy.prototype.configureRequest = function (req) { };
    return ServerXsrfStrategy;
}());
ServerXsrfStrategy.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerXsrfStrategy.ctorParameters = function () { return []; };
/**
 * @abstract
 */
var ZoneMacroTaskWrapper = (function () {
    function ZoneMacroTaskWrapper() {
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskWrapper.prototype.wrap = function (request) {
        var _this = this;
        return new Observable(function (observer) {
            var /** @type {?} */ task = ((null));
            var /** @type {?} */ scheduled = false;
            var /** @type {?} */ sub = null;
            var /** @type {?} */ savedResult = null;
            var /** @type {?} */ savedError = null;
            var /** @type {?} */ scheduleTask = function (_task) {
                task = _task;
                scheduled = true;
                var /** @type {?} */ delegate = _this.delegate(request);
                sub = delegate.subscribe(function (res) { return savedResult = res; }, function (err) {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, function () {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            var /** @type {?} */ cancelTask = function (_task) {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            var /** @type {?} */ onComplete = function () {
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
            var /** @type {?} */ _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, function () { return null; }, cancelTask);
            scheduleTask(_task);
            return function () {
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
    };
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskWrapper.prototype.delegate = function (request) { };
    return ZoneMacroTaskWrapper;
}());
var ZoneMacroTaskConnection = (function (_super) {
    tslib_1.__extends(ZoneMacroTaskConnection, _super);
    /**
     * @param {?} request
     * @param {?} backend
     */
    function ZoneMacroTaskConnection(request, backend) {
        var _this = _super.call(this) || this;
        _this.request = request;
        _this.backend = backend;
        validateRequestUrl(request.url);
        _this.response = _this.wrap(request);
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskConnection.prototype.delegate = function (request) {
        this.lastConnection = this.backend.createConnection(request);
        return (this.lastConnection.response);
    };
    Object.defineProperty(ZoneMacroTaskConnection.prototype, "readyState", {
        /**
         * @return {?}
         */
        get: function () {
            return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
        },
        enumerable: true,
        configurable: true
    });
    return ZoneMacroTaskConnection;
}(ZoneMacroTaskWrapper));
var ZoneMacroTaskBackend = (function () {
    /**
     * @param {?} backend
     */
    function ZoneMacroTaskBackend(backend) {
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskBackend.prototype.createConnection = function (request) {
        return new ZoneMacroTaskConnection(request, this.backend);
    };
    return ZoneMacroTaskBackend;
}());
var ZoneClientBackend = (function (_super) {
    tslib_1.__extends(ZoneClientBackend, _super);
    /**
     * @param {?} backend
     */
    function ZoneClientBackend(backend) {
        var _this = _super.call(this) || this;
        _this.backend = backend;
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneClientBackend.prototype.handle = function (request) { return this.wrap(request); };
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneClientBackend.prototype.delegate = function (request) {
        return this.backend.handle(request);
    };
    return ZoneClientBackend;
}(ZoneMacroTaskWrapper));
/**
 * @param {?} xhrBackend
 * @param {?} options
 * @return {?}
 */
function httpFactory(xhrBackend, options) {
    var /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
/**
 * @param {?} backend
 * @param {?} interceptors
 * @return {?}
 */
function zoneWrappedInterceptingHandler(backend, interceptors) {
    var /** @type {?} */ realBackend = ɵinterceptingHandler(backend, interceptors);
    return new ZoneClientBackend(realBackend);
}
var SERVER_HTTP_PROVIDERS = [
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
var INITIAL_CONFIG = new InjectionToken('Server.INITIAL_CONFIG');
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
    var /** @type {?} */ parsedUrl = parse(urlStr);
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
var ServerPlatformLocation = (function () {
    /**
     * @param {?} _doc
     * @param {?} _config
     */
    function ServerPlatformLocation(_doc, _config) {
        this._doc = _doc;
        this._path = '/';
        this._search = '';
        this._hash = '';
        this._hashUpdate = new Subject();
        var config = _config;
        if (!!config && !!config.url) {
            var parsedUrl = parseUrl(config.url);
            this._path = parsedUrl.pathname;
            this._search = parsedUrl.search;
            this._hash = parsedUrl.hash;
        }
    }
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.getBaseHrefFromDOM = function () { return ((ɵgetDOM().getBaseHref(this._doc))); };
    /**
     * @param {?} fn
     * @return {?}
     */
    ServerPlatformLocation.prototype.onPopState = function (fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ServerPlatformLocation.prototype.onHashChange = function (fn) { this._hashUpdate.subscribe(fn); };
    Object.defineProperty(ServerPlatformLocation.prototype, "pathname", {
        /**
         * @return {?}
         */
        get: function () { return this._path; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "search", {
        /**
         * @return {?}
         */
        get: function () { return this._search; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "hash", {
        /**
         * @return {?}
         */
        get: function () { return this._hash; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "url", {
        /**
         * @return {?}
         */
        get: function () { return "" + this.pathname + this.search + this.hash; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.setHash = function (value, oldUrl) {
        var _this = this;
        if (this._hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        this._hash = value;
        var /** @type {?} */ newUrl = this.url;
        scheduleMicroTask(function () { return _this._hashUpdate.next(/** @type {?} */ ({ type: 'hashchange', oldUrl: oldUrl, newUrl: newUrl })); });
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.replaceState = function (state, title, newUrl) {
        var /** @type {?} */ oldUrl = this.url;
        var /** @type {?} */ parsedUrl = parseUrl(newUrl);
        this._path = parsedUrl.pathname;
        this._search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.pushState = function (state, title, newUrl) {
        this.replaceState(state, title, newUrl);
    };
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.forward = function () { throw new Error('Not implemented'); };
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.back = function () { throw new Error('Not implemented'); };
    return ServerPlatformLocation;
}());
ServerPlatformLocation.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerPlatformLocation.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] },] },
]; };
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
var parse5$1 = require('parse5');
var treeAdapter;
var _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
};
var mapProps = ['attribs', 'x-attribsNamespace', 'x-attribsPrefix'];
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
    for (var /** @type {?} */ i = 0; i < el.childNodes.length; i++) {
        var /** @type {?} */ node = el.childNodes[i];
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
    var /** @type {?} */ doc = parse5$1.parse(html, { treeAdapter: parse5$1.treeAdapters.htmlparser2 });
    var /** @type {?} */ docElement = _getElement(doc, 'html');
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
var Parse5DomAdapter = (function (_super) {
    tslib_1.__extends(Parse5DomAdapter, _super);
    function Parse5DomAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    Parse5DomAdapter.makeCurrent = function () {
        treeAdapter = parse5$1.treeAdapters.htmlparser2;
        ɵsetRootDomAdapter(new Parse5DomAdapter());
    };
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    Parse5DomAdapter.prototype.contains = function (nodeA, nodeB) {
        var /** @type {?} */ inner = nodeB;
        while (inner) {
            if (inner === nodeA)
                return true;
            inner = inner.parent;
        }
        return false;
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
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    Parse5DomAdapter.prototype.getProperty = function (el, name) {
        return el.properties ? el.properties[name] : undefined;
    };
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
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    Parse5DomAdapter.prototype.querySelector = function (el, selector) {
        return this.querySelectorAll(el, selector)[0] || null;
    };
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
                for (var /** @type {?} */ attrName in node.attribs) {
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
        return function () { remove(/** @type {?} */ ((el._eventListenersMap[evt])), listener); };
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
    Parse5DomAdapter.prototype.isPrevented = function (event) { return event.returnValue != null && !event.returnValue; };
    /**
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getInnerHTML = function (el) {
        return parse5$1.serialize(this.templateAwareRoot(el), { treeAdapter: treeAdapter });
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
        return parse5$1.serialize(fragment, { treeAdapter: treeAdapter });
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
     * @param {?} parent
     * @param {?} ref
     * @param {?} newNode
     * @return {?}
     */
    Parse5DomAdapter.prototype.insertBefore = function (parent, ref, newNode) {
        this.remove(newNode);
        if (ref) {
            treeAdapter.insertBefore(parent, newNode, ref);
        }
        else {
            this.appendChild(parent, newNode);
        }
    };
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */
    Parse5DomAdapter.prototype.insertAllBefore = function (parent, ref, nodes) {
        var _this = this;
        nodes.forEach(function (n) { return _this.insertBefore(parent, ref, n); });
    };
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    Parse5DomAdapter.prototype.insertAfter = function (parent, ref, node) {
        if (ref.nextSibling) {
            this.insertBefore(parent, ref.nextSibling, node);
        }
        else {
            this.appendChild(parent, node);
        }
    };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    Parse5DomAdapter.prototype.setInnerHTML = function (el, value) {
        this.clearNodes(el);
        var /** @type {?} */ content = parse5$1.parseFragment(value, { treeAdapter: treeAdapter });
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
        var /** @type {?} */ content = parse5$1.parseFragment(html, { treeAdapter: treeAdapter });
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
            for (var /** @type {?} */ prop in node) {
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
                if (node[mapName] != null) {
                    nodeClone[mapName] = {};
                    for (var /** @type {?} */ prop in node[mapName]) {
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
        return this.querySelectorAll(element, name);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Parse5DomAdapter.prototype.classList = function (element) {
        var /** @type {?} */ classAttrValue = null;
        var /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes['class'] != null) {
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
        if (attributes && attributes['style'] != null) {
            var /** @type {?} */ styleAttrValue = attributes['style'];
            var /** @type {?} */ styleList = styleAttrValue.split(/;+/g);
            for (var /** @type {?} */ i = 0; i < styleList.length; i++) {
                if (styleList[i].length > 0) {
                    var /** @type {?} */ style = (styleList[i]);
                    var /** @type {?} */ colon = style.indexOf(':');
                    if (colon === -1) {
                        throw new Error("Invalid CSS style: " + style);
                    }
                    ((styleMap))[style.substr(0, colon).trim()] = style.substr(colon + 1).trim();
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
        for (var /** @type {?} */ key in styleMap) {
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
     * @param {?=} styleValue
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
        return element.attribs && element.attribs[attribute] != null;
    };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    Parse5DomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) {
        return this.hasAttribute(element, attribute);
    };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    Parse5DomAdapter.prototype.getAttribute = function (element, attribute) {
        return this.hasAttribute(element, attribute) ? element.attribs[attribute] : null;
    };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    Parse5DomAdapter.prototype.getAttributeNS = function (element, ns, attribute) {
        return this.getAttribute(element, attribute);
    };
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
        this.setAttribute(element, attribute, value);
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
        newDoc.title = 'fakeTitle';
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
     * @param {?} el
     * @return {?}
     */
    Parse5DomAdapter.prototype.getBoundingClientRect = function (el) { return { left: 0, top: 0, width: 0, height: 0 }; };
    /**
     * @param {?} doc
     * @return {?}
     */
    Parse5DomAdapter.prototype.getTitle = function (doc) { return this.getText(this.getTitleNode(doc)) || ''; };
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    Parse5DomAdapter.prototype.setTitle = function (doc, newTitle) {
        this.setText(this.getTitleNode(doc), newTitle || '');
    };
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
    Parse5DomAdapter.prototype.hasShadowRoot = function (node) { return node.shadowRoot != null; };
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
    Parse5DomAdapter.prototype.getHref = function (el) { return this.getAttribute(el, 'href'); };
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
                if (parsedRule.declarations == null) {
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
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    Parse5DomAdapter.prototype.getGlobalEventTarget = function (doc, target) {
        if (target == 'window') {
            return ((doc))._window;
        }
        else if (target == 'document') {
            return doc;
        }
        else if (target == 'body') {
            return doc.body;
        }
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    Parse5DomAdapter.prototype.getBaseHref = function (doc) {
        var /** @type {?} */ base = this.querySelector(doc, 'base');
        var /** @type {?} */ href = '';
        if (base) {
            href = this.getHref(base);
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href == null ? null : href;
    };
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
    /**
     * @param {?} doc
     * @return {?}
     */
    Parse5DomAdapter.prototype.getTitleNode = function (doc) {
        var /** @type {?} */ title = this.querySelector(doc, 'title');
        if (!title) {
            title = (this.createElement('title'));
            this.appendChild(this.querySelector(doc, 'head'), title);
        }
        return title;
    };
    return Parse5DomAdapter;
}(ɵDomAdapter));
// TODO: build a proper list, this one is all the keys of a HTMLInputElement
var _HTMLElementPropertyList = [
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
    var /** @type {?} */ index = list.indexOf(el);
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
var EMPTY_ARRAY = [];
var ServerRendererFactory2 = (function () {
    /**
     * @param {?} ngZone
     * @param {?} document
     * @param {?} sharedStylesHost
     */
    function ServerRendererFactory2(ngZone, document, sharedStylesHost) {
        this.ngZone = ngZone;
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.schema = new DomElementSchemaRegistry();
        this.defaultRenderer = new DefaultServerRenderer2(document, ngZone, this.schema);
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    ServerRendererFactory2.prototype.createRenderer = function (element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Native:
            case ViewEncapsulation.Emulated: {
                var /** @type {?} */ renderer = this.rendererByCompId.get(type.id);
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
                    var /** @type {?} */ styles = ɵflattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    };
    /**
     * @return {?}
     */
    ServerRendererFactory2.prototype.begin = function () { };
    /**
     * @return {?}
     */
    ServerRendererFactory2.prototype.end = function () { };
    return ServerRendererFactory2;
}());
ServerRendererFactory2.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerRendererFactory2.ctorParameters = function () { return [
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: ɵSharedStylesHost, },
]; };
var DefaultServerRenderer2 = (function () {
    /**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} schema
     */
    function DefaultServerRenderer2(document, ngZone, schema) {
        this.document = document;
        this.ngZone = ngZone;
        this.schema = schema;
        this.data = Object.create(null);
    }
    /**
     * @return {?}
     */
    DefaultServerRenderer2.prototype.destroy = function () { };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @param {?=} debugInfo
     * @return {?}
     */
    DefaultServerRenderer2.prototype.createElement = function (name, namespace, debugInfo) {
        if (namespace) {
            return ɵgetDOM().createElementNS(ɵNAMESPACE_URIS[namespace], name);
        }
        return ɵgetDOM().createElement(name);
    };
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    DefaultServerRenderer2.prototype.createComment = function (value, debugInfo) { return ɵgetDOM().createComment(value); };
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    DefaultServerRenderer2.prototype.createText = function (value, debugInfo) { return ɵgetDOM().createTextNode(value); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    DefaultServerRenderer2.prototype.appendChild = function (parent, newChild) { ɵgetDOM().appendChild(parent, newChild); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    DefaultServerRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
        if (parent) {
            ɵgetDOM().insertBefore(parent, refChild, newChild);
        }
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    DefaultServerRenderer2.prototype.removeChild = function (parent, oldChild) {
        if (parent) {
            ɵgetDOM().removeChild(parent, oldChild);
        }
    };
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    DefaultServerRenderer2.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var /** @type {?} */ el;
        if (typeof selectorOrNode === 'string') {
            el = ɵgetDOM().querySelector(this.document, selectorOrNode);
            if (!el) {
                throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
            }
        }
        else {
            el = selectorOrNode;
        }
        ɵgetDOM().clearNodes(el);
        return el;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    DefaultServerRenderer2.prototype.parentNode = function (node) { return ɵgetDOM().parentElement(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    DefaultServerRenderer2.prototype.nextSibling = function (node) { return ɵgetDOM().nextSibling(node); };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    DefaultServerRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
        if (namespace) {
            ɵgetDOM().setAttributeNS(el, ɵNAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            ɵgetDOM().setAttribute(el, name, value);
        }
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    DefaultServerRenderer2.prototype.removeAttribute = function (el, name, namespace) {
        if (namespace) {
            ɵgetDOM().removeAttributeNS(el, ɵNAMESPACE_URIS[namespace], name);
        }
        else {
            ɵgetDOM().removeAttribute(el, name);
        }
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DefaultServerRenderer2.prototype.addClass = function (el, name) { ɵgetDOM().addClass(el, name); };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DefaultServerRenderer2.prototype.removeClass = function (el, name) { ɵgetDOM().removeClass(el, name); };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    DefaultServerRenderer2.prototype.setStyle = function (el, style, value, flags) {
        ɵgetDOM().setStyle(el, style, value);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    DefaultServerRenderer2.prototype.removeStyle = function (el, style, flags) {
        ɵgetDOM().removeStyle(el, style);
    };
    /**
     * @param {?} tagName
     * @param {?} propertyName
     * @return {?}
     */
    DefaultServerRenderer2.prototype._isSafeToReflectProperty = function (tagName, propertyName) {
        return this.schema.securityContext(tagName, propertyName, true) ===
            this.schema.securityContext(tagName, propertyName, false);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DefaultServerRenderer2.prototype.setProperty = function (el, name, value) {
        checkNoSyntheticProp(name, 'property');
        ɵgetDOM().setProperty(el, name, value);
        // Mirror property values for known HTML element properties in the attributes.
        var /** @type {?} */ tagName = ((el.tagName)).toLowerCase();
        if (value != null && (typeof value === 'number' || typeof value == 'string') &&
            this.schema.hasElement(tagName, EMPTY_ARRAY) &&
            this.schema.hasProperty(tagName, name, EMPTY_ARRAY) &&
            this._isSafeToReflectProperty(tagName, name)) {
            this.setAttribute(el, name, value.toString());
        }
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    DefaultServerRenderer2.prototype.setValue = function (node, value) { ɵgetDOM().setText(node, value); };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    DefaultServerRenderer2.prototype.listen = function (target, eventName, callback) {
        var _this = this;
        // Note: We are not using the EventsPlugin here as this is not needed
        // to run our tests.
        checkNoSyntheticProp(eventName, 'listener');
        var /** @type {?} */ el = typeof target === 'string' ? ɵgetDOM().getGlobalEventTarget(this.document, target) : target;
        var /** @type {?} */ outsideHandler = function (event) { return _this.ngZone.runGuarded(function () { return callback(event); }); };
        return this.ngZone.runOutsideAngular(function () { return ɵgetDOM().onAndCancel(el, eventName, outsideHandler); });
    };
    return DefaultServerRenderer2;
}());
var AT_CHARCODE = '@'.charCodeAt(0);
/**
 * @param {?} name
 * @param {?} nameKind
 * @return {?}
 */
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error("Found the synthetic " + nameKind + " " + name + ". Please include either \"BrowserAnimationsModule\" or \"NoopAnimationsModule\" in your application.");
    }
}
var EmulatedEncapsulationServerRenderer2 = (function (_super) {
    tslib_1.__extends(EmulatedEncapsulationServerRenderer2, _super);
    /**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} sharedStylesHost
     * @param {?} schema
     * @param {?} component
     */
    function EmulatedEncapsulationServerRenderer2(document, ngZone, sharedStylesHost, schema, component) {
        var _this = _super.call(this, document, ngZone, schema) || this;
        _this.component = component;
        var styles = ɵflattenStyles(component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        _this.contentAttr = ɵshimContentAttribute(component.id);
        _this.hostAttr = ɵshimHostAttribute(component.id);
        return _this;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    EmulatedEncapsulationServerRenderer2.prototype.applyToHost = function (element) { _super.prototype.setAttribute.call(this, element, this.hostAttr, ''); };
    /**
     * @param {?} parent
     * @param {?} name
     * @return {?}
     */
    EmulatedEncapsulationServerRenderer2.prototype.createElement = function (parent, name) {
        var /** @type {?} */ el = _super.prototype.createElement.call(this, parent, name);
        _super.prototype.setAttribute.call(this, el, this.contentAttr, '');
        return el;
    };
    return EmulatedEncapsulationServerRenderer2;
}(DefaultServerRenderer2));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ServerStylesHost = (function (_super) {
    tslib_1.__extends(ServerStylesHost, _super);
    /**
     * @param {?} doc
     * @param {?} transitionId
     */
    function ServerStylesHost(doc, transitionId) {
        var _this = _super.call(this) || this;
        _this.doc = doc;
        _this.transitionId = transitionId;
        _this.head = null;
        _this.head = ɵgetDOM().getElementsByTagName(doc, 'head')[0];
        return _this;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    ServerStylesHost.prototype._addStyle = function (style) {
        var /** @type {?} */ adapter = (ɵgetDOM());
        var /** @type {?} */ el = adapter.createElement('style');
        adapter.setText(el, style);
        if (!!this.transitionId) {
            adapter.setAttribute(el, 'ng-transition', this.transitionId);
        }
        adapter.appendChild(this.head, el);
    };
    /**
     * @param {?} additions
     * @return {?}
     */
    ServerStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        additions.forEach(function (style) { return _this._addStyle(style); });
    };
    return ServerStylesHost;
}(ɵSharedStylesHost));
ServerStylesHost.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ServerStylesHost.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ɵTRANSITION_ID,] },] },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var INTERNAL_SERVER_PLATFORM_PROVIDERS = [
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
    return function () { Parse5DomAdapter.makeCurrent(); };
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
var SERVER_RENDER_PROVIDERS = [
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
var ServerModule = (function () {
    function ServerModule() {
    }
    return ServerModule;
}());
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
ServerModule.ctorParameters = function () { return []; };
/**
 * @param {?} injector
 * @return {?}
 */
function _document(injector) {
    var /** @type {?} */ config = injector.get(INITIAL_CONFIG, null);
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
var platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * \@experimental
 */
var platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var parse5$2 = require('parse5');
/**
 * @param {?} platformFactory
 * @param {?} options
 * @return {?}
 */
function _getPlatform(platformFactory, options) {
    var /** @type {?} */ extraProviders = options.extraProviders ? options.extraProviders : [];
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
    return moduleRefPromise.then(function (moduleRef) {
        var /** @type {?} */ transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error("renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure\nthe server-rendered app can be properly bootstrapped into a client app.");
        }
        var /** @type {?} */ applicationRef = moduleRef.injector.get(ApplicationRef);
        return toPromise
            .call(first.call(filter.call(applicationRef.isStable, function (isStable) { return isStable; })))
            .then(function () {
            var /** @type {?} */ output = platform.injector.get(PlatformState).renderToString();
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
    var /** @type {?} */ platform = _getPlatform(platformDynamicServer, options);
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
    var /** @type {?} */ platform = _getPlatform(platformServer, options);
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
var VERSION = new Version('4.4.6');
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
//# sourceMappingURL=platform-server.es5.js.map
