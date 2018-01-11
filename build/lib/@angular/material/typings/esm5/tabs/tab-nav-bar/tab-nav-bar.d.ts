/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { AfterContentInit, ChangeDetectorRef, ElementRef, NgZone, OnDestroy, QueryList } from '@angular/core';
import { CanColor, CanDisable, CanDisableRipple, HasTabIndex, RippleConfig, RippleGlobalOptions, RippleTarget, ThemePalette } from '@angular/material/core';
import { MatInkBar } from '../ink-bar';
/** @docs-private */
export declare class MatTabNavBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _MatTabNavMixinBase: (new (...args: any[]) => CanDisableRipple) & (new (...args: any[]) => CanColor) & typeof MatTabNavBase;
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export declare class MatTabNav extends _MatTabNavMixinBase implements AfterContentInit, CanColor, CanDisableRipple, OnDestroy {
    private _dir;
    private _ngZone;
    private _changeDetectorRef;
    private _viewportRuler;
    /** Subject that emits when the component has been destroyed. */
    private _onDestroy;
    _activeLinkChanged: boolean;
    _activeLinkElement: ElementRef;
    _inkBar: MatInkBar;
    /** Query list of all tab links of the tab navigation. */
    _tabLinks: QueryList<MatTabLink>;
    /** Background color of the tab nav. */
    backgroundColor: ThemePalette;
    private _backgroundColor;
    /** Whether ripples should be disabled for all links or not. */
    disableRipple: boolean;
    private _disableRipple;
    constructor(elementRef: ElementRef, _dir: Directionality, _ngZone: NgZone, _changeDetectorRef: ChangeDetectorRef, _viewportRuler: ViewportRuler);
    /** Notifies the component that the active link has been changed. */
    updateActiveLink(element: ElementRef): void;
    ngAfterContentInit(): void;
    /** Checks if the active link has been changed and, if so, will update the ink bar. */
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /** Aligns the ink bar to the active link. */
    _alignInkBar(): void;
    /** Sets the `disableRipple` property on each link of the navigation bar. */
    private _setLinkDisableRipple();
}
export declare class MatTabLinkBase {
}
export declare const _MatTabLinkMixinBase: (new (...args: any[]) => HasTabIndex) & (new (...args: any[]) => CanDisableRipple) & (new (...args: any[]) => CanDisable) & typeof MatTabLinkBase;
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
export declare class MatTabLink extends _MatTabLinkMixinBase implements OnDestroy, CanDisable, CanDisableRipple, HasTabIndex, RippleTarget {
    private _tabNavBar;
    private _elementRef;
    /** Whether the tab link is active or not. */
    private _isActive;
    /** Reference to the RippleRenderer for the tab-link. */
    private _tabLinkRipple;
    /** Whether the link is active. */
    active: boolean;
    /**
     * Ripple configuration for ripples that are launched on pointer down.
     * @docs-private
     */
    rippleConfig: RippleConfig;
    /**
     * Whether ripples are disabled on interaction
     * @docs-private
     */
    readonly rippleDisabled: boolean;
    constructor(_tabNavBar: MatTabNav, _elementRef: ElementRef, ngZone: NgZone, platform: Platform, globalOptions: RippleGlobalOptions, tabIndex: string);
    ngOnDestroy(): void;
}
