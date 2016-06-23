import { PlatformRef } from '@angular/core';
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link platform}.
 */
export declare const BROWSER_PLATFORM_PROVIDERS: Array<any>;
export declare const BROWSER_SANITIZATION_PROVIDERS: Array<any>;
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
 */
export declare const BROWSER_APP_PROVIDERS: Array<any>;
export declare function browserPlatform(): PlatformRef;
