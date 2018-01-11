/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone } from '@angular/core';
import { ScrollStrategy } from './scroll-strategy';
import { OverlayRef } from '../overlay-ref';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
export declare class CloseScrollStrategy implements ScrollStrategy {
    private _scrollDispatcher;
    private _ngZone;
    private _scrollSubscription;
    private _overlayRef;
    constructor(_scrollDispatcher: ScrollDispatcher, _ngZone: NgZone);
    /** Attaches this scroll strategy to an overlay. */
    attach(overlayRef: OverlayRef): void;
    /** Enables the closing of the attached on scroll. */
    enable(): void;
    /** Disables the closing the attached overlay on scroll. */
    disable(): void;
}
