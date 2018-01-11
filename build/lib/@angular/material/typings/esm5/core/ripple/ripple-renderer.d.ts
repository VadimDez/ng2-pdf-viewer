/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, NgZone } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { RippleRef } from './ripple-ref';
/** Fade-in duration for the ripples. Can be modified with the speedFactor option. */
export declare const RIPPLE_FADE_IN_DURATION = 450;
/** Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor. */
export declare const RIPPLE_FADE_OUT_DURATION = 400;
export declare type RippleConfig = {
    color?: string;
    centered?: boolean;
    radius?: number;
    speedFactor?: number;
    persistent?: boolean;
};
/**
 * Interface that describes the target for launching ripples.
 * It defines the ripple configuration and disabled state for interaction ripples.
 * @docs-private
 */
export interface RippleTarget {
    /** Configuration for ripples that are launched on pointer down. */
    rippleConfig: RippleConfig;
    /** Whether ripples on pointer down should be disabled. */
    rippleDisabled: boolean;
}
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
export declare class RippleRenderer {
    private _target;
    private _ngZone;
    /** Element where the ripples are being added to. */
    private _containerElement;
    /** Element which triggers the ripple elements on mouse events. */
    private _triggerElement;
    /** Whether the pointer is currently down or not. */
    private _isPointerDown;
    /** Events to be registered on the trigger element. */
    private _triggerEvents;
    /** Set of currently active ripple references. */
    private _activeRipples;
    /** Time in milliseconds when the last touchstart event happened. */
    private _lastTouchStartEvent;
    /** Options that apply to all the event listeners that are bound by the renderer. */
    private _eventOptions;
    /** Ripple config for all ripples created by events. */
    rippleConfig: RippleConfig;
    constructor(_target: RippleTarget, _ngZone: NgZone, elementRef: ElementRef, platform: Platform);
    /**
     * Fades in a ripple at the given coordinates.
     * @param x Coordinate within the element, along the X axis at which to start the ripple.
     * @param y Coordinate within the element, along the Y axis at which to start the ripple.
     * @param config Extra ripple options.
     */
    fadeInRipple(x: number, y: number, config?: RippleConfig): RippleRef;
    /** Fades out a ripple reference. */
    fadeOutRipple(rippleRef: RippleRef): void;
    /** Fades out all currently active ripples. */
    fadeOutAll(): void;
    /** Sets up the trigger event listeners */
    setupTriggerEvents(element: HTMLElement): void;
    /** Function being called whenever the trigger is being pressed using mouse. */
    private onMousedown;
    /** Function being called whenever the trigger is being pressed using touch. */
    private onTouchStart;
    /** Function being called whenever the trigger is being released. */
    private onPointerUp;
    /** Runs a timeout outside of the Angular zone to avoid triggering the change detection. */
    private runTimeoutOutsideZone(fn, delay?);
    /** Removes previously registered event listeners from the trigger element. */
    _removeTriggerEvents(): void;
}
