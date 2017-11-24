/**
 * @license Angular v5.0.2
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { EventEmitter, Injectable } from '@angular/core';
import { __extends } from 'tslib';
import { LocationStrategy } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * A spy for {\@link Location} that allows tests to fire simulated location events.
 *
 * \@experimental
 */
var SpyLocation = (function () {
    function SpyLocation() {
        this.urlChanges = [];
        this._history = [new LocationState('', '')];
        this._historyIndex = 0;
        /**
         * \@internal
         */
        this._subject = new EventEmitter();
        /**
         * \@internal
         */
        this._baseHref = '';
        /**
         * \@internal
         */
        this._platformStrategy = /** @type {?} */ ((null));
    }
    /**
     * @param {?} url
     * @return {?}
     */
    SpyLocation.prototype.setInitialPath = /**
     * @param {?} url
     * @return {?}
     */
    function (url) { this._history[this._historyIndex].path = url; };
    /**
     * @param {?} url
     * @return {?}
     */
    SpyLocation.prototype.setBaseHref = /**
     * @param {?} url
     * @return {?}
     */
    function (url) { this._baseHref = url; };
    /**
     * @return {?}
     */
    SpyLocation.prototype.path = /**
     * @return {?}
     */
    function () { return this._history[this._historyIndex].path; };
    /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    SpyLocation.prototype.isCurrentPathEqualTo = /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    function (path, query) {
        if (query === void 0) { query = ''; }
        var /** @type {?} */ givenPath = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
        var /** @type {?} */ currPath = this.path().endsWith('/') ? this.path().substring(0, this.path().length - 1) : this.path();
        return currPath == givenPath + (query.length > 0 ? ('?' + query) : '');
    };
    /**
     * @param {?} pathname
     * @return {?}
     */
    SpyLocation.prototype.simulateUrlPop = /**
     * @param {?} pathname
     * @return {?}
     */
    function (pathname) { this._subject.emit({ 'url': pathname, 'pop': true }); };
    /**
     * @param {?} pathname
     * @return {?}
     */
    SpyLocation.prototype.simulateHashChange = /**
     * @param {?} pathname
     * @return {?}
     */
    function (pathname) {
        // Because we don't prevent the native event, the browser will independently update the path
        this.setInitialPath(pathname);
        this.urlChanges.push('hash: ' + pathname);
        this._subject.emit({ 'url': pathname, 'pop': true, 'type': 'hashchange' });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    SpyLocation.prototype.prepareExternalUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this._baseHref + url;
    };
    /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    SpyLocation.prototype.go = /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    function (path, query) {
        if (query === void 0) { query = ''; }
        path = this.prepareExternalUrl(path);
        if (this._historyIndex > 0) {
            this._history.splice(this._historyIndex + 1);
        }
        this._history.push(new LocationState(path, query));
        this._historyIndex = this._history.length - 1;
        var /** @type {?} */ locationState = this._history[this._historyIndex - 1];
        if (locationState.path == path && locationState.query == query) {
            return;
        }
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push(url);
        this._subject.emit({ 'url': url, 'pop': false });
    };
    /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    SpyLocation.prototype.replaceState = /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    function (path, query) {
        if (query === void 0) { query = ''; }
        path = this.prepareExternalUrl(path);
        var /** @type {?} */ history = this._history[this._historyIndex];
        if (history.path == path && history.query == query) {
            return;
        }
        history.path = path;
        history.query = query;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push('replace: ' + url);
    };
    /**
     * @return {?}
     */
    SpyLocation.prototype.forward = /**
     * @return {?}
     */
    function () {
        if (this._historyIndex < (this._history.length - 1)) {
            this._historyIndex++;
            this._subject.emit({ 'url': this.path(), 'pop': true });
        }
    };
    /**
     * @return {?}
     */
    SpyLocation.prototype.back = /**
     * @return {?}
     */
    function () {
        if (this._historyIndex > 0) {
            this._historyIndex--;
            this._subject.emit({ 'url': this.path(), 'pop': true });
        }
    };
    /**
     * @param {?} onNext
     * @param {?=} onThrow
     * @param {?=} onReturn
     * @return {?}
     */
    SpyLocation.prototype.subscribe = /**
     * @param {?} onNext
     * @param {?=} onThrow
     * @param {?=} onReturn
     * @return {?}
     */
    function (onNext, onThrow, onReturn) {
        return this._subject.subscribe({ next: onNext, error: onThrow, complete: onReturn });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    SpyLocation.prototype.normalize = /**
     * @param {?} url
     * @return {?}
     */
    function (url) { return /** @type {?} */ ((null)); };
    SpyLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SpyLocation.ctorParameters = function () { return []; };
    return SpyLocation;
}());
var LocationState = (function () {
    function LocationState(path, query) {
        this.path = path;
        this.query = query;
    }
    return LocationState;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A mock implementation of {\@link LocationStrategy} that allows tests to fire simulated
 * location events.
 *
 * \@stable
 */
var MockLocationStrategy = (function (_super) {
    __extends(MockLocationStrategy, _super);
    function MockLocationStrategy() {
        var _this = _super.call(this) || this;
        _this.internalBaseHref = '/';
        _this.internalPath = '/';
        _this.internalTitle = '';
        _this.urlChanges = [];
        /**
         * \@internal
         */
        _this._subject = new EventEmitter();
        return _this;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    MockLocationStrategy.prototype.simulatePopState = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        this.internalPath = url;
        this._subject.emit(new _MockPopStateEvent(this.path()));
    };
    /**
     * @param {?=} includeHash
     * @return {?}
     */
    MockLocationStrategy.prototype.path = /**
     * @param {?=} includeHash
     * @return {?}
     */
    function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        return this.internalPath;
    };
    /**
     * @param {?} internal
     * @return {?}
     */
    MockLocationStrategy.prototype.prepareExternalUrl = /**
     * @param {?} internal
     * @return {?}
     */
    function (internal) {
        if (internal.startsWith('/') && this.internalBaseHref.endsWith('/')) {
            return this.internalBaseHref + internal.substring(1);
        }
        return this.internalBaseHref + internal;
    };
    /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    MockLocationStrategy.prototype.pushState = /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    function (ctx, title, path, query) {
        this.internalTitle = title;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push(externalUrl);
    };
    /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    MockLocationStrategy.prototype.replaceState = /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    function (ctx, title, path, query) {
        this.internalTitle = title;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push('replace: ' + externalUrl);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MockLocationStrategy.prototype.onPopState = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._subject.subscribe({ next: fn }); };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.getBaseHref = /**
     * @return {?}
     */
    function () { return this.internalBaseHref; };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.back = /**
     * @return {?}
     */
    function () {
        if (this.urlChanges.length > 0) {
            this.urlChanges.pop();
            var /** @type {?} */ nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
            this.simulatePopState(nextUrl);
        }
    };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.forward = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    MockLocationStrategy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MockLocationStrategy.ctorParameters = function () { return []; };
    return MockLocationStrategy;
}(LocationStrategy));
var _MockPopStateEvent = (function () {
    function _MockPopStateEvent(newUrl) {
        this.newUrl = newUrl;
        this.pop = true;
        this.type = 'popstate';
    }
    return _MockPopStateEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * Entry point for all public APIs of the common/testing package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * Entry point for all public APIs of this package.
 */

// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { SpyLocation, MockLocationStrategy };
//# sourceMappingURL=testing.js.map
