import { PlatformRef } from '@angular/core';
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link platform}.
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const BROWSER_PLATFORM_PROVIDERS: Array<any>;
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @experimental
 */
export declare const BROWSER_SANITIZATION_PROVIDERS: Array<any>;
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const BROWSER_APP_PROVIDERS: Array<any>;
/**
 * @experimental API related to bootstrapping are still under review.
 */
export declare function browserPlatform(): PlatformRef;
