/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LocationChangeListener, PlatformLocation } from '@angular/common';
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
export declare class ServerPlatformLocation implements PlatformLocation {
    private _doc;
    private _path;
    private _search;
    private _hash;
    private _hashUpdate;
    constructor(_doc: any, _config: any);
    getBaseHrefFromDOM(): string;
    onPopState(fn: LocationChangeListener): void;
    onHashChange(fn: LocationChangeListener): void;
    readonly pathname: string;
    readonly search: string;
    readonly hash: string;
    readonly url: string;
    private setHash(value, oldUrl);
    replaceState(state: any, title: string, newUrl: string): void;
    pushState(state: any, title: string, newUrl: string): void;
    forward(): void;
    back(): void;
}
export declare function scheduleMicroTask(fn: Function): void;
