/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEvent } from '@angular/animations';
import { Direction } from '@angular/cdk/bidi';
import { AfterContentInit, ElementRef, EventEmitter, InjectionToken, OnDestroy, QueryList, TemplateRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatMenuItem } from './menu-item';
import { MatMenuPanel } from './menu-panel';
import { MenuPositionX, MenuPositionY } from './menu-positions';
/** Default `mat-menu` options that can be overridden. */
export interface MatMenuDefaultOptions {
    /** The x-axis position of the menu. */
    xPosition: MenuPositionX;
    /** The y-axis position of the menu. */
    yPosition: MenuPositionY;
    /** Whether the menu should overlap the menu trigger. */
    overlapTrigger: boolean;
}
/** Injection token to be used to override the default options for `mat-menu`. */
export declare const MAT_MENU_DEFAULT_OPTIONS: InjectionToken<MatMenuDefaultOptions>;
export declare class MatMenu implements AfterContentInit, MatMenuPanel, OnDestroy {
    private _elementRef;
    private _ngZone;
    private _defaultOptions;
    private _keyManager;
    private _xPosition;
    private _yPosition;
    private _previousElevation;
    /** Subscription to tab events on the menu panel */
    private _tabSubscription;
    /** Config object to be passed into the menu's ngClass */
    _classList: {
        [key: string]: boolean;
    };
    /** Current state of the panel animation. */
    _panelAnimationState: 'void' | 'enter-start' | 'enter';
    /** Parent menu of the current menu panel. */
    parentMenu: MatMenuPanel | undefined;
    /** Layout direction of the menu. */
    direction: Direction;
    /** Position of the menu in the X axis. */
    xPosition: MenuPositionX;
    /** Position of the menu in the Y axis. */
    yPosition: MenuPositionY;
    /** @docs-private */
    templateRef: TemplateRef<any>;
    /** List of the items inside of a menu. */
    items: QueryList<MatMenuItem>;
    /** Whether the menu should overlap its trigger. */
    overlapTrigger: boolean;
    private _overlapTrigger;
    /**
     * This method takes classes set on the host mat-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @param classes list of class names
     */
    panelClass: string;
    /**
     * This method takes classes set on the host mat-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @deprecated Use `panelClass` instead.
     */
    classList: string;
    /** Event emitted when the menu is closed. */
    closed: EventEmitter<void | "click" | "keydown">;
    /**
     * Event emitted when the menu is closed.
     * @deprecated Switch to `closed` instead
     */
    close: EventEmitter<void | "click" | "keydown">;
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _defaultOptions: MatMenuDefaultOptions);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Stream that emits whenever the hovered menu item changes. */
    _hovered(): Observable<MatMenuItem>;
    /** Handle a keyboard event from the menu, delegating to the appropriate action. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * Focus the first item in the menu. This method is used by the menu trigger
     * to focus the first item when the menu is opened by the ENTER key.
     */
    focusFirstItem(): void;
    /**
     * Resets the active item in the menu. This is used when the menu is opened by mouse,
     * allowing the user to start from the first option when pressing the down arrow.
     */
    resetActiveItem(): void;
    /**
     * It's necessary to set position-based classes to ensure the menu panel animation
     * folds out from the correct direction.
     */
    setPositionClasses(posX?: MenuPositionX, posY?: MenuPositionY): void;
    /**
     * Sets the menu panel elevation.
     * @param depth Number of parent menus that come before the menu.
     */
    setElevation(depth: number): void;
    /** Starts the enter animation. */
    _startAnimation(): void;
    /** Resets the panel animation to its initial state. */
    _resetAnimation(): void;
    /** Callback that is invoked when the panel animation completes. */
    _onAnimationDone(event: AnimationEvent): void;
}
