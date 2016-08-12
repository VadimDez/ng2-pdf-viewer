/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var browser_1 = require('../src/browser');
var browser_adapter_1 = require('../src/browser/browser_adapter');
var animation_driver_1 = require('../src/dom/animation_driver');
var ng_probe_1 = require('../src/dom/debug/ng_probe');
var browser_util_1 = require('./browser_util');
function initBrowserTests() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    browser_util_1.BrowserDetection.setup();
}
function createNgZone() {
    return new core_1.NgZone({ enableLongStackTrace: true });
}
var _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: core_1.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
/**
 * Providers for the browser test platform
 *
 * @deprecated Use `platformBrowserTesting()` or create a custom platform factory via
 * `createPlatformFactory(platformBrowserTesting, ...)`
 */
exports.TEST_BROWSER_PLATFORM_PROVIDERS = [core_1.PLATFORM_COMMON_PROVIDERS, _TEST_BROWSER_PLATFORM_PROVIDERS];
/**
 * @deprecated Use initTestEnvironment with BrowserTestModule instead. This is empty for backwards
 * compatibility,
 * as all of our bootstrap methods add a module implicitly, i.e. keeping this filled would add the
 * providers 2x.
 */
exports.TEST_BROWSER_APPLICATION_PROVIDERS = [];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.platformBrowserTesting = core_1.createPlatformFactory(core_1.platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformBrowserTesting} instead
 */
exports.browserTestingPlatform = exports.platformBrowserTesting;
var BrowserTestingModule = (function () {
    function BrowserTestingModule() {
    }
    /** @nocollapse */
    BrowserTestingModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [browser_1.BrowserModule],
                    providers: [
                        { provide: core_1.APP_ID, useValue: 'a' }, ng_probe_1.ELEMENT_PROBE_PROVIDERS,
                        { provide: core_1.NgZone, useFactory: createNgZone },
                        { provide: animation_driver_1.AnimationDriver, useValue: animation_driver_1.AnimationDriver.NOOP }
                    ]
                },] },
    ];
    return BrowserTestingModule;
}());
exports.BrowserTestingModule = BrowserTestingModule;
//# sourceMappingURL=browser.js.map