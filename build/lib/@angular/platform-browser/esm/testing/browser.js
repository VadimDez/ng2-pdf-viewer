/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, NgModule, NgZone, PLATFORM_COMMON_PROVIDERS, PLATFORM_INITIALIZER, createPlatformFactory, platformCore } from '@angular/core';
import { BrowserModule } from '../src/browser';
import { BrowserDomAdapter } from '../src/browser/browser_adapter';
import { AnimationDriver } from '../src/dom/animation_driver';
import { ELEMENT_PROBE_PROVIDERS } from '../src/dom/debug/ng_probe';
import { BrowserDetection } from './browser_util';
function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
}
function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}
const _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
/**
 * Providers for the browser test platform
 *
 * @deprecated Use `platformBrowserTesting()` or create a custom platform factory via
 * `createPlatformFactory(platformBrowserTesting, ...)`
 */
export const TEST_BROWSER_PLATFORM_PROVIDERS = [PLATFORM_COMMON_PROVIDERS, _TEST_BROWSER_PLATFORM_PROVIDERS];
/**
 * @deprecated Use initTestEnvironment with BrowserTestModule instead. This is empty for backwards
 * compatibility,
 * as all of our bootstrap methods add a module implicitly, i.e. keeping this filled would add the
 * providers 2x.
 */
export const TEST_BROWSER_APPLICATION_PROVIDERS = [];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export const platformBrowserTesting = createPlatformFactory(platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformBrowserTesting} instead
 */
export const browserTestingPlatform = platformBrowserTesting;
export class BrowserTestingModule {
}
/** @nocollapse */
BrowserTestingModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                providers: [
                    { provide: APP_ID, useValue: 'a' }, ELEMENT_PROBE_PROVIDERS,
                    { provide: NgZone, useFactory: createNgZone },
                    { provide: AnimationDriver, useValue: AnimationDriver.NOOP }
                ]
            },] },
];
//# sourceMappingURL=browser.js.map