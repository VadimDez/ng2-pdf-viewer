/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { A11yModule, FocusMonitor, FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgModule, NgZone, Optional, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { __extends } from 'tslib';
import * as tslib_1 from 'tslib';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import { merge } from 'rxjs/observable/merge';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import { startWith } from 'rxjs/operators/startWith';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Observable';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Throws an exception when two MatDrawer are matching the same position.
 * @param {?} position
 * @return {?}
 */
function throwMatDuplicatedDrawerError(position) {
    throw Error("A drawer was already declared for 'position=\"" + position + "\"'");
}
/**
 * Drawer toggle promise result.
 * @deprecated
 */
var MatDrawerToggleResult = /** @class */ (function () {
    function MatDrawerToggleResult(type, animationFinished) {
        this.type = type;
        this.animationFinished = animationFinished;
    }
    return MatDrawerToggleResult;
}());
/**
 * Configures whether drawers should use auto sizing by default.
 */
var MAT_DRAWER_DEFAULT_AUTOSIZE = new InjectionToken('MAT_DRAWER_DEFAULT_AUTOSIZE');
var MatDrawerContent = /** @class */ (function () {
    function MatDrawerContent(_changeDetectorRef, _container) {
        this._changeDetectorRef = _changeDetectorRef;
        this._container = _container;
        /**
         * Margins to be applied to the content. These are used to push / shrink the drawer content when a
         * drawer is open. We use margin rather than transform even for push mode because transform breaks
         * fixed position elements inside of the transformed element.
         */
        this._margins = { left: null, right: null };
    }
    /**
     * @return {?}
     */
    MatDrawerContent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._container._contentMargins.subscribe(function (margins) {
            _this._margins = margins;
            _this._changeDetectorRef.markForCheck();
        });
    };
    MatDrawerContent.decorators = [
        { type: Component, args: [{selector: 'mat-drawer-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-drawer-content',
                        '[style.margin-left.px]': '_margins.left',
                        '[style.margin-right.px]': '_margins.right',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatDrawerContent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: MatDrawerContainer, decorators: [{ type: Inject, args: [forwardRef(function () { return MatDrawerContainer; }),] },] },
    ]; };
    return MatDrawerContent;
}());
/**
 * This component corresponds to a drawer that can be opened on the drawer container.
 */
var MatDrawer = /** @class */ (function () {
    function MatDrawer(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _doc) {
        var _this = this;
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._focusMonitor = _focusMonitor;
        this._platform = _platform;
        this._doc = _doc;
        this._elementFocusedBeforeDrawerWasOpened = null;
        /**
         * Whether the drawer is initialized. Used for disabling the initial animation.
         */
        this._enableAnimations = false;
        this._position = 'start';
        this._mode = 'over';
        this._disableClose = false;
        /**
         * Whether the drawer is opened.
         */
        this._opened = false;
        /**
         * Emits whenever the drawer has started animating.
         */
        this._animationStarted = new EventEmitter();
        /**
         * Current state of the sidenav animation.
         */
        this._animationState = 'void';
        /**
         * Event emitted when the drawer open state is changed.
         */
        this.openedChange = 
        // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
        new EventEmitter(/* isAsync */ /* isAsync */ true);
        /**
         * Event emitted when the drawer is fully opened.
         * @deprecated Use `opened` instead.
         */
        this.onOpen = this._openedStream;
        /**
         * Event emitted when the drawer is fully closed.
         * @deprecated Use `closed` instead.
         */
        this.onClose = this._closedStream;
        /**
         * Event emitted when the drawer's position changes.
         */
        this.onPositionChanged = new EventEmitter();
        /**
         * @deprecated
         */
        this.onAlignChanged = new EventEmitter();
        /**
         * An observable that emits when the drawer mode changes. This is used by the drawer container to
         * to know when to when the mode changes so it can adapt the margins on the content.
         */
        this._modeChanged = new Subject();
        this.openedChange.subscribe(function (opened) {
            if (opened) {
                if (_this._doc) {
                    _this._elementFocusedBeforeDrawerWasOpened = /** @type {?} */ (_this._doc.activeElement);
                }
                if (_this._isFocusTrapEnabled && _this._focusTrap) {
                    _this._trapFocus();
                }
            }
            else {
                _this._restoreFocus();
            }
        });
    }
    Object.defineProperty(MatDrawer.prototype, "position", {
        get: /**
         * The side that the drawer is attached to.
         * @return {?}
         */
        function () { return this._position; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // Make sure we have a valid value.
            value = value === 'end' ? 'end' : 'start';
            if (value != this._position) {
                this._position = value;
                this.onAlignChanged.emit();
                this.onPositionChanged.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "align", {
        get: /**
         * @deprecated
         * @return {?}
         */
        function () { return this.position; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.position = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "mode", {
        get: /**
         * Mode of the drawer; one of 'over', 'push' or 'side'.
         * @return {?}
         */
        function () { return this._mode; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mode = value;
            this._modeChanged.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "disableClose", {
        get: /**
         * Whether the drawer can be closed with the escape key or by clicking on the backdrop.
         * @return {?}
         */
        function () { return this._disableClose; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disableClose = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_openedStream", {
        get: /**
         * Event emitted when the drawer has been opened.
         * @return {?}
         */
        function () {
            return this.openedChange.pipe(filter(function (o) { return o; }), map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "openedStart", {
        get: /**
         * Event emitted when the drawer has started opening.
         * @return {?}
         */
        function () {
            return this._animationStarted.pipe(filter(function (e) { return e.fromState !== e.toState && e.toState.indexOf('open') === 0; }), map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_closedStream", {
        get: /**
         * Event emitted when the drawer has been closed.
         * @return {?}
         */
        function () {
            return this.openedChange.pipe(filter(function (o) { return !o; }), map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "closedStart", {
        get: /**
         * Event emitted when the drawer has started closing.
         * @return {?}
         */
        function () {
            return this._animationStarted.pipe(filter(function (e) { return e.fromState !== e.toState && e.toState === 'void'; }), map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_isFocusTrapEnabled", {
        get: /**
         * @return {?}
         */
        function () {
            // The focus trap is only enabled when the drawer is open in any mode other than side.
            return this.opened && this.mode !== 'side';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Traps focus inside the drawer.
     * @return {?}
     */
    MatDrawer.prototype._trapFocus = /**
     * Traps focus inside the drawer.
     * @return {?}
     */
    function () {
        var _this = this;
        this._focusTrap.focusInitialElementWhenReady().then(function (hasMovedFocus) {
            // If there were no focusable elements, focus the sidenav itself so the keyboard navigation
            // still works. We need to check that `focus` is a function due to Universal.
            if (!hasMovedFocus && typeof _this._elementRef.nativeElement.focus === 'function') {
                _this._elementRef.nativeElement.focus();
            }
        });
    };
    /**
     * If focus is currently inside the drawer, restores it to where it was before the drawer
     * opened.
     * @return {?}
     */
    MatDrawer.prototype._restoreFocus = /**
     * If focus is currently inside the drawer, restores it to where it was before the drawer
     * opened.
     * @return {?}
     */
    function () {
        var /** @type {?} */ activeEl = this._doc && this._doc.activeElement;
        if (activeEl && this._elementRef.nativeElement.contains(activeEl)) {
            if (this._elementFocusedBeforeDrawerWasOpened instanceof HTMLElement) {
                this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia);
            }
            else {
                this._elementRef.nativeElement.blur();
            }
        }
        this._elementFocusedBeforeDrawerWasOpened = null;
        this._openedVia = null;
    };
    /**
     * @return {?}
     */
    MatDrawer.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        this._focusTrap.enabled = this._isFocusTrapEnabled;
    };
    /**
     * @return {?}
     */
    MatDrawer.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // Enable the animations after the lifecycle hooks have run, in order to avoid animating
        // drawers that are open by default. When we're on the server, we shouldn't enable the
        // animations, because we don't want the drawer to animate the first time the user sees
        // the page.
        if (this._platform.isBrowser) {
            this._enableAnimations = true;
        }
    };
    /**
     * @return {?}
     */
    MatDrawer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    };
    Object.defineProperty(MatDrawer.prototype, "opened", {
        get: /**
         * Whether the drawer is opened. We overload this because we trigger an event when it
         * starts or end.
         * @return {?}
         */
        function () { return this._opened; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.toggle(coerceBooleanProperty(v));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Open the drawer.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    /**
     * Open the drawer.
     * @param {?=} openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     * @return {?}
     */
    MatDrawer.prototype.open = /**
     * Open the drawer.
     * @param {?=} openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     * @return {?}
     */
    function (openedVia) {
        return this.toggle(true, openedVia);
    };
    /** Close the drawer. */
    /**
     * Close the drawer.
     * @return {?}
     */
    MatDrawer.prototype.close = /**
     * Close the drawer.
     * @return {?}
     */
    function () {
        return this.toggle(false);
    };
    /**
     * Toggle this drawer.
     * @param isOpen Whether the drawer should be open.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    /**
     * Toggle this drawer.
     * @param {?=} isOpen Whether the drawer should be open.
     * @param {?=} openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     * @return {?}
     */
    MatDrawer.prototype.toggle = /**
     * Toggle this drawer.
     * @param {?=} isOpen Whether the drawer should be open.
     * @param {?=} openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     * @return {?}
     */
    function (isOpen, openedVia) {
        var _this = this;
        if (isOpen === void 0) { isOpen = !this.opened; }
        if (openedVia === void 0) { openedVia = 'program'; }
        this._opened = isOpen;
        if (isOpen) {
            this._animationState = this._enableAnimations ? 'open' : 'open-instant';
            this._openedVia = openedVia;
        }
        else {
            this._animationState = 'void';
            this._restoreFocus();
        }
        if (this._focusTrap) {
            this._focusTrap.enabled = this._isFocusTrapEnabled;
        }
        // TODO(crisbeto): This promise is here for backwards-compatibility.
        // It should be removed next time we do breaking changes in the drawer.
        return new Promise(function (resolve) {
            _this.openedChange.pipe(take(1)).subscribe(function (open) {
                resolve(new MatDrawerToggleResult(open ? 'open' : 'close', true));
            });
        });
    };
    /**
     * Handles the keyboard events.
     * @docs-private
     */
    /**
     * Handles the keyboard events.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    MatDrawer.prototype.handleKeydown = /**
     * Handles the keyboard events.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === ESCAPE && !this.disableClose) {
            this.close();
            event.stopPropagation();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDrawer.prototype._onAnimationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._animationStarted.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDrawer.prototype._onAnimationEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var fromState = event.fromState, toState = event.toState;
        if ((toState.indexOf('open') === 0 && fromState === 'void') ||
            (toState === 'void' && fromState.indexOf('open') === 0)) {
            this.openedChange.emit(this._opened);
        }
    };
    Object.defineProperty(MatDrawer.prototype, "_width", {
        get: /**
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement ? (this._elementRef.nativeElement.offsetWidth || 0) : 0;
        },
        enumerable: true,
        configurable: true
    });
    MatDrawer.decorators = [
        { type: Component, args: [{selector: 'mat-drawer',
                    exportAs: 'matDrawer',
                    template: '<ng-content></ng-content>',
                    animations: [
                        trigger('transform', [
                            state('open, open-instant', style({
                                transform: 'translate3d(0, 0, 0)',
                                visibility: 'visible',
                            })),
                            state('void', style({
                                visibility: 'hidden',
                            })),
                            transition('void => open-instant', animate('0ms')),
                            transition('void <=> open, open-instant => void', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
                        ])
                    ],
                    host: {
                        'class': 'mat-drawer',
                        '[@transform]': '_animationState',
                        '(@transform.start)': '_onAnimationStart($event)',
                        '(@transform.done)': '_onAnimationEnd($event)',
                        '(keydown)': 'handleKeydown($event)',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.mat-drawer-end]': 'position === "end"',
                        '[class.mat-drawer-over]': 'mode === "over"',
                        '[class.mat-drawer-push]': 'mode === "push"',
                        '[class.mat-drawer-side]': 'mode === "side"',
                        'tabIndex': '-1',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatDrawer.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FocusTrapFactory, },
        { type: FocusMonitor, },
        { type: Platform, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    ]; };
    MatDrawer.propDecorators = {
        "position": [{ type: Input },],
        "align": [{ type: Input },],
        "mode": [{ type: Input },],
        "disableClose": [{ type: Input },],
        "openedChange": [{ type: Output },],
        "_openedStream": [{ type: Output, args: ['opened',] },],
        "openedStart": [{ type: Output },],
        "_closedStream": [{ type: Output, args: ['closed',] },],
        "closedStart": [{ type: Output },],
        "onOpen": [{ type: Output, args: ['open',] },],
        "onClose": [{ type: Output, args: ['close',] },],
        "onPositionChanged": [{ type: Output, args: ['positionChanged',] },],
        "onAlignChanged": [{ type: Output, args: ['align-changed',] },],
        "opened": [{ type: Input },],
    };
    return MatDrawer;
}());
/**
 * <mat-drawer-container> component.
 *
 * This is the parent component to one or two <mat-drawer>s that validates the state internally
 * and coordinates the backdrop and content styling.
 */
var MatDrawerContainer = /** @class */ (function () {
    function MatDrawerContainer(_dir, _element, _ngZone, _changeDetectorRef, defaultAutosize) {
        if (defaultAutosize === void 0) { defaultAutosize = false; }
        var _this = this;
        this._dir = _dir;
        this._element = _element;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Event emitted when the drawer backdrop is clicked.
         */
        this.backdropClick = new EventEmitter();
        /**
         * Emits when the component is destroyed.
         */
        this._destroyed = new Subject();
        /**
         * Emits on every ngDoCheck. Used for debouncing reflows.
         */
        this._doCheckSubject = new Subject();
        this._contentMargins = new Subject();
        // If a `Dir` directive exists up the tree, listen direction changes
        // and update the left/right properties to point to the proper start/end.
        if (_dir) {
            _dir.change.pipe(takeUntil(this._destroyed)).subscribe(function () {
                _this._validateDrawers();
                _this._updateContentMargins();
            });
        }
        this._autosize = defaultAutosize;
    }
    Object.defineProperty(MatDrawerContainer.prototype, "start", {
        /** The drawer child with the `start` position. */
        get: /**
         * The drawer child with the `start` position.
         * @return {?}
         */
        function () { return this._start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "end", {
        /** The drawer child with the `end` position. */
        get: /**
         * The drawer child with the `end` position.
         * @return {?}
         */
        function () { return this._end; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "autosize", {
        get: /**
         * Whether to automatically resize the container whenever
         * the size of any of its drawers changes.
         *
         * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
         * the drawers on every change detection cycle. Can be configured globally via the
         * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
         * @return {?}
         */
        function () { return this._autosize; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._autosize = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._drawers.changes.pipe(startWith(null)).subscribe(function () {
            _this._validateDrawers();
            _this._drawers.forEach(function (drawer) {
                _this._watchDrawerToggle(drawer);
                _this._watchDrawerPosition(drawer);
                _this._watchDrawerMode(drawer);
            });
            if (!_this._drawers.length ||
                _this._isDrawerOpen(_this._start) ||
                _this._isDrawerOpen(_this._end)) {
                _this._updateContentMargins();
            }
            _this._changeDetectorRef.markForCheck();
        });
        this._doCheckSubject.pipe(debounceTime(10), // Arbitrary debounce time, less than a frame at 60fps
        // Arbitrary debounce time, less than a frame at 60fps
        takeUntil(this._destroyed)).subscribe(function () { return _this._updateContentMargins(); });
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._doCheckSubject.complete();
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Calls `open` of both start and end drawers */
    /**
     * Calls `open` of both start and end drawers
     * @return {?}
     */
    MatDrawerContainer.prototype.open = /**
     * Calls `open` of both start and end drawers
     * @return {?}
     */
    function () {
        this._drawers.forEach(function (drawer) { return drawer.open(); });
    };
    /** Calls `close` of both start and end drawers */
    /**
     * Calls `close` of both start and end drawers
     * @return {?}
     */
    MatDrawerContainer.prototype.close = /**
     * Calls `close` of both start and end drawers
     * @return {?}
     */
    function () {
        this._drawers.forEach(function (drawer) { return drawer.close(); });
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // If users opted into autosizing, do a check every change detection cycle.
        if (this._autosize && this._isPushed()) {
            // Run outside the NgZone, otherwise the debouncer will throw us into an infinite loop.
            this._ngZone.runOutsideAngular(function () { return _this._doCheckSubject.next(); });
        }
    };
    /**
     * Subscribes to drawer events in order to set a class on the main container element when the
     * drawer is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._watchDrawerToggle = /**
     * Subscribes to drawer events in order to set a class on the main container element when the
     * drawer is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        var _this = this;
        drawer._animationStarted.pipe(takeUntil(this._drawers.changes), filter(function (event) { return event.fromState !== event.toState; }))
            .subscribe(function (event) {
            // Set the transition class on the container so that the animations occur. This should not
            // be set initially because animations should only be triggered via a change in state.
            if (event.toState !== 'open-instant') {
                _this._element.nativeElement.classList.add('mat-drawer-transition');
            }
            _this._updateContentMargins();
            _this._changeDetectorRef.markForCheck();
        });
        if (drawer.mode !== 'side') {
            drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(function () {
                return _this._setContainerClass(drawer.opened);
            });
        }
    };
    /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._watchDrawerPosition = /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        var _this = this;
        if (!drawer) {
            return;
        }
        // NOTE: We need to wait for the microtask queue to be empty before validating,
        // since both drawers may be swapping positions at the same time.
        drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(function () {
            _this._ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(function () {
                _this._validateDrawers();
            });
        });
    };
    /**
     * Subscribes to changes in drawer mode so we can run change detection.
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._watchDrawerMode = /**
     * Subscribes to changes in drawer mode so we can run change detection.
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        var _this = this;
        if (drawer) {
            drawer._modeChanged.pipe(takeUntil(merge(this._drawers.changes, this._destroyed)))
                .subscribe(function () {
                _this._updateContentMargins();
                _this._changeDetectorRef.markForCheck();
            });
        }
    };
    /**
     * Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element.
     * @param {?} isAdd
     * @return {?}
     */
    MatDrawerContainer.prototype._setContainerClass = /**
     * Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element.
     * @param {?} isAdd
     * @return {?}
     */
    function (isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add('mat-drawer-opened');
        }
        else {
            this._element.nativeElement.classList.remove('mat-drawer-opened');
        }
    };
    /**
     * Validate the state of the drawer children components.
     * @return {?}
     */
    MatDrawerContainer.prototype._validateDrawers = /**
     * Validate the state of the drawer children components.
     * @return {?}
     */
    function () {
        var _this = this;
        this._start = this._end = null;
        // Ensure that we have at most one start and one end drawer.
        this._drawers.forEach(function (drawer) {
            if (drawer.position == 'end') {
                if (_this._end != null) {
                    throwMatDuplicatedDrawerError('end');
                }
                _this._end = drawer;
            }
            else {
                if (_this._start != null) {
                    throwMatDuplicatedDrawerError('start');
                }
                _this._start = drawer;
            }
        });
        this._right = this._left = null;
        // Detect if we're LTR or RTL.
        if (!this._dir || this._dir.value == 'ltr') {
            this._left = this._start;
            this._right = this._end;
        }
        else {
            this._left = this._end;
            this._right = this._start;
        }
    };
    /**
     * Whether the container is being pushed to the side by one of the drawers.
     * @return {?}
     */
    MatDrawerContainer.prototype._isPushed = /**
     * Whether the container is being pushed to the side by one of the drawers.
     * @return {?}
     */
    function () {
        return (this._isDrawerOpen(this._start) && /** @type {?} */ ((this._start)).mode != 'over') ||
            (this._isDrawerOpen(this._end) && /** @type {?} */ ((this._end)).mode != 'over');
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype._onBackdropClicked = /**
     * @return {?}
     */
    function () {
        this.backdropClick.emit();
        this._closeModalDrawer();
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype._closeModalDrawer = /**
     * @return {?}
     */
    function () {
        // Close all open drawers where closing is not disabled and the mode is not `side`.
        [this._start, this._end]
            .filter(function (drawer) { return drawer && !drawer.disableClose && drawer.mode !== 'side'; })
            .forEach(function (drawer) { return ((drawer)).close(); });
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype._isShowingBackdrop = /**
     * @return {?}
     */
    function () {
        return (this._isDrawerOpen(this._start) && /** @type {?} */ ((this._start)).mode != 'side')
            || (this._isDrawerOpen(this._end) && /** @type {?} */ ((this._end)).mode != 'side');
    };
    /**
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._isDrawerOpen = /**
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        return drawer != null && drawer.opened;
    };
    /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     * @return {?}
     */
    MatDrawerContainer.prototype._updateContentMargins = /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     * @return {?}
     */
    function () {
        var _this = this;
        // 1. For drawers in `over` mode, they don't affect the content.
        // 2. For drawers in `side` mode they should shrink the content. We do this by adding to the
        //    left margin (for left drawer) or right margin (for right the drawer).
        // 3. For drawers in `push` mode the should shift the content without resizing it. We do this by
        //    adding to the left or right margin and simultaneously subtracting the same amount of
        //    margin from the other side.
        var /** @type {?} */ left = 0;
        var /** @type {?} */ right = 0;
        if (this._left && this._left.opened) {
            if (this._left.mode == 'side') {
                left += this._left._width;
            }
            else if (this._left.mode == 'push') {
                var /** @type {?} */ width = this._left._width;
                left += width;
                right -= width;
            }
        }
        if (this._right && this._right.opened) {
            if (this._right.mode == 'side') {
                right += this._right._width;
            }
            else if (this._right.mode == 'push') {
                var /** @type {?} */ width = this._right._width;
                right += width;
                left -= width;
            }
        }
        // Pull back into the NgZone since in some cases we could be outside.
        this._ngZone.run(function () { return _this._contentMargins.next({ left: left, right: right }); });
    };
    MatDrawerContainer.decorators = [
        { type: Component, args: [{selector: 'mat-drawer-container',
                    exportAs: 'matDrawerContainer',
                    template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div><ng-content select=\"mat-drawer\"></ng-content><ng-content select=\"mat-drawer-content\"></ng-content><mat-drawer-content *ngIf=\"!_content\" cdkScrollable><ng-content></ng-content></mat-drawer-content>",
                    styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media screen and (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{-webkit-backface-visibility:hidden;backface-visibility:hidden;position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer:not(.mat-drawer-side){box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-sidenav-fixed{position:fixed}"],
                    host: {
                        'class': 'mat-drawer-container',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatDrawerContainer.ctorParameters = function () { return [
        { type: Directionality, decorators: [{ type: Optional },] },
        { type: ElementRef, },
        { type: NgZone, },
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DRAWER_DEFAULT_AUTOSIZE,] },] },
    ]; };
    MatDrawerContainer.propDecorators = {
        "_drawers": [{ type: ContentChildren, args: [MatDrawer,] },],
        "_content": [{ type: ContentChild, args: [MatDrawerContent,] },],
        "autosize": [{ type: Input },],
        "backdropClick": [{ type: Output },],
    };
    return MatDrawerContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatSidenavContent = /** @class */ (function (_super) {
    __extends(MatSidenavContent, _super);
    function MatSidenavContent(changeDetectorRef, container) {
        return _super.call(this, changeDetectorRef, container) || this;
    }
    MatSidenavContent.decorators = [
        { type: Component, args: [{selector: 'mat-sidenav-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-drawer-content mat-sidenav-content',
                        '[style.margin-left.px]': '_margins.left',
                        '[style.margin-right.px]': '_margins.right',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatSidenavContent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: MatSidenavContainer, decorators: [{ type: Inject, args: [forwardRef(function () { return MatSidenavContainer; }),] },] },
    ]; };
    return MatSidenavContent;
}(MatDrawerContent));
var MatSidenav = /** @class */ (function (_super) {
    __extends(MatSidenav, _super);
    function MatSidenav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fixedInViewport = false;
        _this._fixedTopGap = 0;
        _this._fixedBottomGap = 0;
        return _this;
    }
    Object.defineProperty(MatSidenav.prototype, "fixedInViewport", {
        get: /**
         * Whether the sidenav is fixed in the viewport.
         * @return {?}
         */
        function () { return this._fixedInViewport; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._fixedInViewport = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSidenav.prototype, "fixedTopGap", {
        get: /**
         * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
         * mode.
         * @return {?}
         */
        function () { return this._fixedTopGap; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._fixedTopGap = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSidenav.prototype, "fixedBottomGap", {
        get: /**
         * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
         * fixed mode.
         * @return {?}
         */
        function () { return this._fixedBottomGap; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._fixedBottomGap = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    MatSidenav.decorators = [
        { type: Component, args: [{selector: 'mat-sidenav',
                    exportAs: 'matSidenav',
                    template: '<ng-content></ng-content>',
                    animations: [
                        trigger('transform', [
                            state('open, open-instant', style({
                                transform: 'translate3d(0, 0, 0)',
                                visibility: 'visible',
                            })),
                            state('void', style({
                                visibility: 'hidden',
                            })),
                            transition('void => open-instant', animate('0ms')),
                            transition('void <=> open, open-instant => void', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
                        ])
                    ],
                    host: {
                        'class': 'mat-drawer mat-sidenav',
                        'tabIndex': '-1',
                        '[@transform]': '_animationState',
                        '(@transform.start)': '_onAnimationStart($event)',
                        '(@transform.done)': '_onAnimationEnd($event)',
                        '(keydown)': 'handleKeydown($event)',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.mat-drawer-end]': 'position === "end"',
                        '[class.mat-drawer-over]': 'mode === "over"',
                        '[class.mat-drawer-push]': 'mode === "push"',
                        '[class.mat-drawer-side]': 'mode === "side"',
                        '[class.mat-sidenav-fixed]': 'fixedInViewport',
                        '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
                        '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatSidenav.ctorParameters = function () { return []; };
    MatSidenav.propDecorators = {
        "fixedInViewport": [{ type: Input },],
        "fixedTopGap": [{ type: Input },],
        "fixedBottomGap": [{ type: Input },],
    };
    return MatSidenav;
}(MatDrawer));
var MatSidenavContainer = /** @class */ (function (_super) {
    __extends(MatSidenavContainer, _super);
    function MatSidenavContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatSidenavContainer.decorators = [
        { type: Component, args: [{selector: 'mat-sidenav-container',
                    exportAs: 'matSidenavContainer',
                    template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div><ng-content select=\"mat-sidenav\"></ng-content><ng-content select=\"mat-sidenav-content\"></ng-content><mat-sidenav-content *ngIf=\"!_content\" cdkScrollable><ng-content></ng-content></mat-sidenav-content>",
                    styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media screen and (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{-webkit-backface-visibility:hidden;backface-visibility:hidden;position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer:not(.mat-drawer-side){box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-sidenav-fixed{position:fixed}"],
                    host: {
                        'class': 'mat-drawer-container mat-sidenav-container',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatSidenavContainer.ctorParameters = function () { return []; };
    MatSidenavContainer.propDecorators = {
        "_drawers": [{ type: ContentChildren, args: [MatSidenav,] },],
        "_content": [{ type: ContentChild, args: [MatSidenavContent,] },],
    };
    return MatSidenavContainer;
}(MatDrawerContainer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatSidenavModule = /** @class */ (function () {
    function MatSidenavModule() {
    }
    MatSidenavModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatCommonModule,
                        A11yModule,
                        OverlayModule,
                        ScrollDispatchModule,
                        PlatformModule,
                    ],
                    exports: [
                        MatCommonModule,
                        MatDrawer,
                        MatDrawerContainer,
                        MatDrawerContent,
                        MatSidenav,
                        MatSidenavContainer,
                        MatSidenavContent,
                    ],
                    declarations: [
                        MatDrawer,
                        MatDrawerContainer,
                        MatDrawerContent,
                        MatSidenav,
                        MatSidenavContainer,
                        MatSidenavContent,
                    ],
                    providers: [
                        { provide: MAT_DRAWER_DEFAULT_AUTOSIZE, useValue: false }
                    ]
                },] },
    ];
    /** @nocollapse */
    MatSidenavModule.ctorParameters = function () { return []; };
    return MatSidenavModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { MatSidenavModule, throwMatDuplicatedDrawerError, MatDrawerToggleResult, MAT_DRAWER_DEFAULT_AUTOSIZE, MatDrawerContent, MatDrawer, MatDrawerContainer, MatSidenavContent, MatSidenav, MatSidenavContainer };
//# sourceMappingURL=sidenav.es5.js.map
