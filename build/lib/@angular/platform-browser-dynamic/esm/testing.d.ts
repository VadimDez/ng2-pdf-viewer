import { PlatformRef } from '@angular/core';
export * from './private_export_testing';
/**
 * @experimental API related to bootstrapping are still under review.
 */
export declare const platformBrowserDynamicTesting: (extraProviders?: any[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @stable
 */
export declare class BrowserDynamicTestingModule {
}
/**
 * @deprecated Use initTestEnvironment with platformBrowserDynamicTesting instead.
 */
export declare const TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS: Array<any>;
/**
 * @deprecated Use initTestEnvironment with BrowserDynamicTestingModule instead.
 */
export declare const TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS: Array<any>;
