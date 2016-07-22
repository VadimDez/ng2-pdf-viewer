/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation, UrlChangeListener } from '@angular/common';
/**
 * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 *
 * @stable
 */
export declare class BrowserPlatformLocation extends PlatformLocation {
    private _location;
    private _history;
    constructor();
    getBaseHrefFromDOM(): string;
    onPopState(fn: UrlChangeListener): void;
    onHashChange(fn: UrlChangeListener): void;
    pathname: string;
    readonly search: string;
    readonly hash: string;
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
}
