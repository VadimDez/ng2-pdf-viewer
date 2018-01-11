/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, ElementRef, QueryList } from '@angular/core';
import { CanColor } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
/** @docs-private */
export declare class MatToolbarBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _MatToolbarMixinBase: (new (...args: any[]) => CanColor) & typeof MatToolbarBase;
export declare class MatToolbarRow {
}
export declare class MatToolbar extends _MatToolbarMixinBase implements CanColor, AfterViewInit {
    private _platform;
    /** Reference to all toolbar row elements that have been projected. */
    _toolbarRows: QueryList<MatToolbarRow>;
    constructor(elementRef: ElementRef, _platform: Platform);
    ngAfterViewInit(): void;
    /**
     * Throws an exception when developers are attempting to combine the different toolbar row modes.
     */
    private _checkToolbarMixedModes();
}
/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
export declare function throwToolbarMixedModesError(): void;
