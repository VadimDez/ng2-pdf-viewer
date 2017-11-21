/**
 * @license Angular v5.0.2
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define('@angular/platform-browser/testing', ['exports', '@angular/core', '@angular/platform-browser'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.platformBrowser = global.ng.platformBrowser || {}, global.ng.platformBrowser.testing = {}),global.ng.core,global.ng.platformBrowser));
}(this, (function (exports,_angular_core,_angular_platformBrowser) { 'use strict';

/**
 * @license Angular v5.0.2
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
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
var browserDetection;
var BrowserDetection = (function () {
    function BrowserDetection(ua) {
        this._overrideUa = ua;
    }
    Object.defineProperty(BrowserDetection.prototype, "_ua", {
        get: /**
         * @return {?}
         */
        function () {
            if (typeof this._overrideUa === 'string') {
                return this._overrideUa;
            }
            return _angular_platformBrowser.ɵgetDOM() ? _angular_platformBrowser.ɵgetDOM().getUserAgent() : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BrowserDetection.setup = /**
     * @return {?}
     */
    function () { browserDetection = new BrowserDetection(null); };
    Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
        get: /**
         * @return {?}
         */
        function () { return this._ua.indexOf('Firefox') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
                this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isEdge", {
        get: /**
         * @return {?}
         */
        function () { return this._ua.indexOf('Edge') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIE", {
        get: /**
         * @return {?}
         */
        function () { return this._ua.indexOf('Trident') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
        get: /**
         * @return {?}
         */
        function () {
            return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isSlow", {
        get: /**
         * @return {?}
         */
        function () { return this.isAndroid || this.isIE || this.isIOS7; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsNativeIntlApi", {
        // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
        // This detector is needed in tests to make the difference between:
        // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
        // 2) IE9/IE10: they use the polyfill, and so no discrepancies
        get: /**
         * @return {?}
         */
        function () {
            return !!(/** @type {?} */ (_angular_core.ɵglobal)).Intl && (/** @type {?} */ (_angular_core.ɵglobal)).Intl !== (/** @type {?} */ (_angular_core.ɵglobal)).IntlPolyfill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isChromeDesktop", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
                this._ua.indexOf('Edge') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isOldChrome", {
        // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
        // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).
        get: /**
         * @return {?}
         */
        function () {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
                this._ua.indexOf('Edge') == -1;
        },
        enumerable: true,
        configurable: true
    });
    return BrowserDetection;
}());
BrowserDetection.setup();
/**
 * @param {?} element
 * @param {?} eventType
 * @return {?}
 */

/**
 * @param {?} html
 * @return {?}
 */

/**
 * @param {?} css
 * @return {?}
 */

/**
 * @param {?} el
 * @return {?}
 */

/**
 * @return {?}
 */
function createNgZone() {
    return new _angular_core.NgZone({ enableLongStackTrace: true });
}

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
 * @return {?}
 */
function initBrowserTests() {
    _angular_platformBrowser.ɵBrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
}
var _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: _angular_core.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
/**
 * Platform for testing
 *
 * \@stable
 */
var platformBrowserTesting = _angular_core.createPlatformFactory(_angular_core.platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
var ɵ0 = createNgZone;
/**
 * NgModule for testing.
 *
 * \@stable
 */
var BrowserTestingModule = (function () {
    function BrowserTestingModule() {
    }
    BrowserTestingModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    exports: [_angular_platformBrowser.BrowserModule],
                    providers: [
                        { provide: _angular_core.APP_ID, useValue: 'a' },
                        _angular_platformBrowser.ɵELEMENT_PROBE_PROVIDERS,
                        { provide: _angular_core.NgZone, useFactory: ɵ0 },
                    ]
                },] },
    ];
    /** @nocollapse */
    BrowserTestingModule.ctorParameters = function () { return []; };
    return BrowserTestingModule;
}());

exports.platformBrowserTesting = platformBrowserTesting;
exports.BrowserTestingModule = BrowserTestingModule;
exports.ɵa = createNgZone;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-browser-testing.umd.js.map
