/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ElementRef, InjectionToken, NgZone, OnDestroy, OnInit } from '@angular/core';
import { RippleRef } from './ripple-ref';
import { RippleConfig, RippleTarget } from './ripple-renderer';
/** Configurable options for `matRipple`. */
export interface RippleGlobalOptions {
    /**
     * Whether ripples should be disabled. Ripples can be still launched manually by using
     * the `launch()` method. Therefore focus indicators will still show up.
     */
    disabled?: boolean;
    /**
     * If set, the default duration of the fade-in animation is divided by this value. For example,
     * setting it to 0.5 will cause the ripple fade-in animation to take twice as long.
     * A changed speedFactor will not affect the fade-out duration of the ripples.
     */
    baseSpeedFactor?: number;
}
/** Injection token that can be used to specify the global ripple options. */
export declare const MAT_RIPPLE_GLOBAL_OPTIONS: InjectionToken<RippleGlobalOptions>;
export declare class MatRipple implements OnInit, OnDestroy, RippleTarget {
    private _elementRef;
    /** Custom color for all ripples. */
    color: string;
    /** Whether the ripples should be visible outside the component's bounds. */
    unbounded: boolean;
    /**
     * Whether the ripple always originates from the center of the host element's bounds, rather
     * than originating from the location of the click event.
     */
    centered: boolean;
    /**
     * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
     * will be the distance from the center of the ripple to the furthest corner of the host element's
     * bounding rectangle.
     */
    radius: number;
    /**
     * If set, the normal duration of ripple animations is divided by this value. For example,
     * setting it to 0.5 will cause the animations to take twice as long.
     * A changed speedFactor will not modify the fade-out duration of the ripples.
     */
    speedFactor: number;
    /**
     * Whether click events will not trigger the ripple. Ripples can be still launched manually
     * by using the `launch()` method.
     */
    disabled: boolean;
    private _disabled;
    /**
     * The element that triggers the ripple when click events are received.
     * Defaults to the directive's host element.
     */
    trigger: HTMLElement;
    private _trigger;
    /** Renderer for the ripple DOM manipulations. */
    private _rippleRenderer;
    /** Options that are set globally for all ripples. */
    private _globalOptions;
    /** Whether ripple directive is initialized and the input bindings are set. */
    private _isInitialized;
    constructor(_elementRef: ElementRef, ngZone: NgZone, platform: Platform, globalOptions: RippleGlobalOptions);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Launches a manual ripple at the specified position. */
    launch(x: number, y: number, config?: RippleConfig): RippleRef;
    /** Fades out all currently showing ripple elements. */
    fadeOutAll(): void;
    /** Ripple configuration from the directive's input values. */
    readonly rippleConfig: RippleConfig;
    /** Whether ripples on pointer-down are  disabled or not. */
    readonly rippleDisabled: boolean;
    /** Sets up the the trigger event listeners if ripples are enabled. */
    private _setupTriggerEventsIfEnabled();
}
