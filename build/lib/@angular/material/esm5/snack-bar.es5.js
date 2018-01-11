/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Injectable, InjectionToken, Injector, NgModule, NgZone, Optional, SkipSelf, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, PortalInjector, PortalModule } from '@angular/cdk/portal';
import { LIVE_ANNOUNCER_PROVIDER, LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { AnimationCurves, AnimationDurations, MatCommonModule } from '@angular/material/core';
import { __assign, __extends } from 'tslib';
import * as tslib_1 from 'tslib';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs/Subject';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
var MatSnackBarRef = /** @class */ (function () {
    function MatSnackBarRef(containerInstance, _overlayRef) {
        var _this = this;
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the snack bar has closed.
         */
        this._afterClosed = new Subject();
        /**
         * Subject for notifying the user that the snack bar has opened and appeared.
         */
        this._afterOpened = new Subject();
        /**
         * Subject for notifying the user that the snack bar action was called.
         */
        this._onAction = new Subject();
        this.containerInstance = containerInstance;
        // Dismiss snackbar on action.
        this.onAction().subscribe(function () { return _this.dismiss(); });
        containerInstance._onExit.subscribe(function () { return _this._finishDismiss(); });
    }
    /** Dismisses the snack bar. */
    /**
     * Dismisses the snack bar.
     * @return {?}
     */
    MatSnackBarRef.prototype.dismiss = /**
     * Dismisses the snack bar.
     * @return {?}
     */
    function () {
        if (!this._afterClosed.closed) {
            this.containerInstance.exit();
        }
        clearTimeout(this._durationTimeoutId);
    };
    /** Marks the snackbar action clicked. */
    /**
     * Marks the snackbar action clicked.
     * @return {?}
     */
    MatSnackBarRef.prototype.closeWithAction = /**
     * Marks the snackbar action clicked.
     * @return {?}
     */
    function () {
        if (!this._onAction.closed) {
            this._onAction.next();
            this._onAction.complete();
        }
    };
    /** Dismisses the snack bar after some duration */
    /**
     * Dismisses the snack bar after some duration
     * @param {?} duration
     * @return {?}
     */
    MatSnackBarRef.prototype._dismissAfter = /**
     * Dismisses the snack bar after some duration
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
        var _this = this;
        this._durationTimeoutId = setTimeout(function () { return _this.dismiss(); }, duration);
    };
    /** Marks the snackbar as opened */
    /**
     * Marks the snackbar as opened
     * @return {?}
     */
    MatSnackBarRef.prototype._open = /**
     * Marks the snackbar as opened
     * @return {?}
     */
    function () {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    };
    /**
     * Cleans up the DOM after closing.
     * @return {?}
     */
    MatSnackBarRef.prototype._finishDismiss = /**
     * Cleans up the DOM after closing.
     * @return {?}
     */
    function () {
        this._overlayRef.dispose();
        if (!this._onAction.closed) {
            this._onAction.complete();
        }
        this._afterClosed.next();
        this._afterClosed.complete();
    };
    /** Gets an observable that is notified when the snack bar is finished closing. */
    /**
     * Gets an observable that is notified when the snack bar is finished closing.
     * @return {?}
     */
    MatSnackBarRef.prototype.afterDismissed = /**
     * Gets an observable that is notified when the snack bar is finished closing.
     * @return {?}
     */
    function () {
        return this._afterClosed.asObservable();
    };
    /** Gets an observable that is notified when the snack bar has opened and appeared. */
    /**
     * Gets an observable that is notified when the snack bar has opened and appeared.
     * @return {?}
     */
    MatSnackBarRef.prototype.afterOpened = /**
     * Gets an observable that is notified when the snack bar has opened and appeared.
     * @return {?}
     */
    function () {
        return this.containerInstance._onEnter;
    };
    /** Gets an observable that is notified when the snack bar action is called. */
    /**
     * Gets an observable that is notified when the snack bar action is called.
     * @return {?}
     */
    MatSnackBarRef.prototype.onAction = /**
     * Gets an observable that is notified when the snack bar action is called.
     * @return {?}
     */
    function () {
        return this._onAction.asObservable();
    };
    return MatSnackBarRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MAT_SNACK_BAR_DATA = new InjectionToken('MatSnackBarData');
/**
 * Configuration used when opening a snack-bar.
 */
var MatSnackBarConfig = /** @class */ (function () {
    function MatSnackBarConfig() {
        /**
         * The politeness level for the MatAriaLiveAnnouncer announcement.
         */
        this.politeness = 'assertive';
        /**
         * Message to be announced by the MatAriaLiveAnnouncer
         */
        this.announcementMessage = '';
        /**
         * The length of time in milliseconds to wait before automatically dismissing the snack bar.
         */
        this.duration = 0;
        /**
         * Text layout direction for the snack bar.
         */
        this.direction = 'ltr';
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        /**
         * The horizontal position to place the snack bar.
         */
        this.horizontalPosition = 'center';
        /**
         * The vertical position to place the snack bar.
         */
        this.verticalPosition = 'bottom';
    }
    return MatSnackBarConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
var SimpleSnackBar = /** @class */ (function () {
    function SimpleSnackBar(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    /** Performs the action on the snack bar. */
    /**
     * Performs the action on the snack bar.
     * @return {?}
     */
    SimpleSnackBar.prototype.action = /**
     * Performs the action on the snack bar.
     * @return {?}
     */
    function () {
        this.snackBarRef.closeWithAction();
    };
    Object.defineProperty(SimpleSnackBar.prototype, "hasAction", {
        /** If the action button should be shown. */
        get: /**
         * If the action button should be shown.
         * @return {?}
         */
        function () {
            return !!this.data.action;
        },
        enumerable: true,
        configurable: true
    });
    SimpleSnackBar.decorators = [
        { type: Component, args: [{selector: 'simple-snack-bar',
                    template: "{{data.message}} <button class=\"mat-simple-snackbar-action\" *ngIf=\"hasAction\" (click)=\"action()\">{{data.action}}</button>",
                    styles: [".mat-simple-snackbar{display:flex;justify-content:space-between;line-height:20px;opacity:1}.mat-simple-snackbar-action{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;background:0 0;flex-shrink:0;margin-left:48px}[dir=rtl] .mat-simple-snackbar-action{margin-right:48px;margin-left:0}"],
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('contentFade', [
                            transition(':enter', [
                                style({ opacity: '0' }),
                                animate(AnimationDurations.COMPLEX + " " + AnimationCurves.STANDARD_CURVE)
                            ])
                        ])
                    ],
                    host: {
                        '[@contentFade]': '',
                        'class': 'mat-simple-snackbar',
                    }
                },] },
    ];
    /** @nocollapse */
    SimpleSnackBar.ctorParameters = function () { return [
        { type: MatSnackBarRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_SNACK_BAR_DATA,] },] },
    ]; };
    return SimpleSnackBar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var SHOW_ANIMATION = AnimationDurations.ENTERING + " " + AnimationCurves.DECELERATION_CURVE;
var HIDE_ANIMATION = AnimationDurations.EXITING + " " + AnimationCurves.ACCELERATION_CURVE;
/**
 * Internal component that wraps user-provided snack bar content.
 * \@docs-private
 */
var MatSnackBarContainer = /** @class */ (function (_super) {
    __extends(MatSnackBarContainer, _super);
    function MatSnackBarContainer(_ngZone, _elementRef, _changeDetectorRef) {
        var _this = _super.call(this) || this;
        _this._ngZone = _ngZone;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        /**
         * Whether the component has been destroyed.
         */
        _this._destroyed = false;
        /**
         * Subject for notifying that the snack bar has exited from view.
         */
        _this._onExit = new Subject();
        /**
         * Subject for notifying that the snack bar has finished entering the view.
         */
        _this._onEnter = new Subject();
        /**
         * The state of the snack bar animations.
         */
        _this._animationState = 'void';
        return _this;
    }
    /** Attach a component portal as content to this snack bar container. */
    /**
     * Attach a component portal as content to this snack bar container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    MatSnackBarContainer.prototype.attachComponentPortal = /**
     * Attach a component portal as content to this snack bar container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        if (this._portalOutlet.hasAttached()) {
            throw Error('Attempting to attach snack bar content after content is already attached');
        }
        var /** @type {?} */ element = this._elementRef.nativeElement;
        if (this.snackBarConfig.panelClass || this.snackBarConfig.extraClasses) {
            this._setCssClasses(this.snackBarConfig.panelClass);
            this._setCssClasses(this.snackBarConfig.extraClasses);
        }
        if (this.snackBarConfig.horizontalPosition === 'center') {
            element.classList.add('mat-snack-bar-center');
        }
        if (this.snackBarConfig.verticalPosition === 'top') {
            element.classList.add('mat-snack-bar-top');
        }
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this snack bar container. */
    /**
     * Attach a template portal as content to this snack bar container.
     * @return {?}
     */
    MatSnackBarContainer.prototype.attachTemplatePortal = /**
     * Attach a template portal as content to this snack bar container.
     * @return {?}
     */
    function () {
        throw Error('Not yet implemented');
    };
    /** Handle end of animations, updating the state of the snackbar. */
    /**
     * Handle end of animations, updating the state of the snackbar.
     * @param {?} event
     * @return {?}
     */
    MatSnackBarContainer.prototype.onAnimationEnd = /**
     * Handle end of animations, updating the state of the snackbar.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var fromState = event.fromState, toState = event.toState;
        if ((toState === 'void' && fromState !== 'void') || toState.startsWith('hidden')) {
            this._completeExit();
        }
        if (toState.startsWith('visible')) {
            // Note: we shouldn't use `this` inside the zone callback,
            // because it can cause a memory leak.
            var /** @type {?} */ onEnter_1 = this._onEnter;
            this._ngZone.run(function () {
                onEnter_1.next();
                onEnter_1.complete();
            });
        }
    };
    /** Begin animation of snack bar entrance into view. */
    /**
     * Begin animation of snack bar entrance into view.
     * @return {?}
     */
    MatSnackBarContainer.prototype.enter = /**
     * Begin animation of snack bar entrance into view.
     * @return {?}
     */
    function () {
        if (!this._destroyed) {
            this._animationState = "visible-" + this.snackBarConfig.verticalPosition;
            this._changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the snack bar exiting from view. */
    /**
     * Begin animation of the snack bar exiting from view.
     * @return {?}
     */
    MatSnackBarContainer.prototype.exit = /**
     * Begin animation of the snack bar exiting from view.
     * @return {?}
     */
    function () {
        this._animationState = "hidden-" + this.snackBarConfig.verticalPosition;
        return this._onExit;
    };
    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    /**
     * Makes sure the exit callbacks have been invoked when the element is destroyed.
     * @return {?}
     */
    MatSnackBarContainer.prototype.ngOnDestroy = /**
     * Makes sure the exit callbacks have been invoked when the element is destroyed.
     * @return {?}
     */
    function () {
        this._destroyed = true;
        this._completeExit();
    };
    /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     * @return {?}
     */
    MatSnackBarContainer.prototype._completeExit = /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(function () {
            _this._onExit.next();
            _this._onExit.complete();
        });
    };
    /**
     * Applies the user-specified list of CSS classes to the element.
     * @param {?} classList
     * @return {?}
     */
    MatSnackBarContainer.prototype._setCssClasses = /**
     * Applies the user-specified list of CSS classes to the element.
     * @param {?} classList
     * @return {?}
     */
    function (classList) {
        if (!classList) {
            return;
        }
        var /** @type {?} */ element = this._elementRef.nativeElement;
        if (Array.isArray(classList)) {
            // Note that we can't use a spread here, because IE doesn't support multiple arguments.
            classList.forEach(function (cssClass) { return element.classList.add(cssClass); });
        }
        else {
            element.classList.add(classList);
        }
    };
    MatSnackBarContainer.decorators = [
        { type: Component, args: [{selector: 'snack-bar-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: [".mat-snack-bar-container{border-radius:2px;box-sizing:border-box;display:block;margin:24px;max-width:568px;min-width:288px;padding:14px 24px;transform:translateY(100%) translateY(24px)}.mat-snack-bar-container.mat-snack-bar-center{margin:0;transform:translateY(100%)}.mat-snack-bar-container.mat-snack-bar-top{transform:translateY(-100%) translateY(-24px)}.mat-snack-bar-container.mat-snack-bar-top.mat-snack-bar-center{transform:translateY(-100%)}@media screen and (-ms-high-contrast:active){.mat-snack-bar-container{border:solid 1px}}.mat-snack-bar-handset{width:100%}.mat-snack-bar-handset .mat-snack-bar-container{margin:0;max-width:inherit;width:100%}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    host: {
                        'role': 'alert',
                        'class': 'mat-snack-bar-container',
                        '[@state]': '_animationState',
                        '(@state.done)': 'onAnimationEnd($event)'
                    },
                    animations: [
                        trigger('state', [
                            state('visible-top, visible-bottom', style({ transform: 'translateY(0%)' })),
                            transition('visible-top => hidden-top, visible-bottom => hidden-bottom', animate(HIDE_ANIMATION)),
                            transition('void => visible-top, void => visible-bottom', animate(SHOW_ANIMATION)),
                        ])
                    ],
                },] },
    ];
    /** @nocollapse */
    MatSnackBarContainer.ctorParameters = function () { return [
        { type: NgZone, },
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
    ]; };
    MatSnackBarContainer.propDecorators = {
        "_portalOutlet": [{ type: ViewChild, args: [CdkPortalOutlet,] },],
    };
    return MatSnackBarContainer;
}(BasePortalOutlet));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Service to dispatch Material Design snack bar messages.
 */
var MatSnackBar = /** @class */ (function () {
    function MatSnackBar(_overlay, _live, _injector, _breakpointObserver, _parentSnackBar) {
        this._overlay = _overlay;
        this._live = _live;
        this._injector = _injector;
        this._breakpointObserver = _breakpointObserver;
        this._parentSnackBar = _parentSnackBar;
        /**
         * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
         * If there is a parent snack-bar service, all operations should delegate to that parent
         * via `_openedSnackBarRef`.
         */
        this._snackBarRefAtThisLevel = null;
    }
    Object.defineProperty(MatSnackBar.prototype, "_openedSnackBarRef", {
        /** Reference to the currently opened snackbar at *any* level. */
        get: /**
         * Reference to the currently opened snackbar at *any* level.
         * @return {?}
         */
        function () {
            var /** @type {?} */ parent = this._parentSnackBar;
            return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._parentSnackBar) {
                this._parentSnackBar._openedSnackBarRef = value;
            }
            else {
                this._snackBarRefAtThisLevel = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @param component Component to be instantiated.
     * @param config Extra configuration for the snack bar.
     */
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @template T
     * @param {?} component Component to be instantiated.
     * @param {?=} config Extra configuration for the snack bar.
     * @return {?}
     */
    MatSnackBar.prototype.openFromComponent = /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @template T
     * @param {?} component Component to be instantiated.
     * @param {?=} config Extra configuration for the snack bar.
     * @return {?}
     */
    function (component, config) {
        var _this = this;
        var /** @type {?} */ _config = _applyConfigDefaults(config);
        var /** @type {?} */ snackBarRef = this._attach(component, _config);
        // When the snackbar is dismissed, clear the reference to it.
        snackBarRef.afterDismissed().subscribe(function () {
            // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
            if (_this._openedSnackBarRef == snackBarRef) {
                _this._openedSnackBarRef = null;
            }
        });
        if (this._openedSnackBarRef) {
            // If a snack bar is already in view, dismiss it and enter the
            // new snack bar after exit animation is complete.
            this._openedSnackBarRef.afterDismissed().subscribe(function () {
                snackBarRef.containerInstance.enter();
            });
            this._openedSnackBarRef.dismiss();
        }
        else {
            // If no snack bar is in view, enter the new snack bar.
            snackBarRef.containerInstance.enter();
        }
        // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
        if (_config.duration && _config.duration > 0) {
            snackBarRef.afterOpened().subscribe(function () { return snackBarRef._dismissAfter(/** @type {?} */ ((/** @type {?} */ ((_config)).duration))); });
        }
        if (_config.announcementMessage) {
            this._live.announce(_config.announcementMessage, _config.politeness);
        }
        this._openedSnackBarRef = snackBarRef;
        return this._openedSnackBarRef;
    };
    /**
     * Opens a snackbar with a message and an optional action.
     * @param message The message to show in the snackbar.
     * @param action The label for the snackbar action.
     * @param config Additional configuration options for the snackbar.
     */
    /**
     * Opens a snackbar with a message and an optional action.
     * @param {?} message The message to show in the snackbar.
     * @param {?=} action The label for the snackbar action.
     * @param {?=} config Additional configuration options for the snackbar.
     * @return {?}
     */
    MatSnackBar.prototype.open = /**
     * Opens a snackbar with a message and an optional action.
     * @param {?} message The message to show in the snackbar.
     * @param {?=} action The label for the snackbar action.
     * @param {?=} config Additional configuration options for the snackbar.
     * @return {?}
     */
    function (message, action, config) {
        if (action === void 0) { action = ''; }
        var /** @type {?} */ _config = _applyConfigDefaults(config);
        // Since the user doesn't have access to the component, we can
        // override the data to pass in our own message and action.
        _config.data = { message: message, action: action };
        _config.announcementMessage = message;
        return this.openFromComponent(SimpleSnackBar, _config);
    };
    /**
     * Dismisses the currently-visible snack bar.
     */
    /**
     * Dismisses the currently-visible snack bar.
     * @return {?}
     */
    MatSnackBar.prototype.dismiss = /**
     * Dismisses the currently-visible snack bar.
     * @return {?}
     */
    function () {
        if (this._openedSnackBarRef) {
            this._openedSnackBarRef.dismiss();
        }
    };
    /**
     * Attaches the snack bar container component to the overlay.
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    MatSnackBar.prototype._attachSnackBarContainer = /**
     * Attaches the snack bar container component to the overlay.
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (overlayRef, config) {
        var /** @type {?} */ containerPortal = new ComponentPortal(MatSnackBarContainer, config.viewContainerRef);
        var /** @type {?} */ containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.snackBarConfig = config;
        return containerRef.instance;
    };
    /**
     * Places a new component as the content of the snack bar container.
     * @template T
     * @param {?} component
     * @param {?} config
     * @return {?}
     */
    MatSnackBar.prototype._attach = /**
     * Places a new component as the content of the snack bar container.
     * @template T
     * @param {?} component
     * @param {?} config
     * @return {?}
     */
    function (component, config) {
        var /** @type {?} */ overlayRef = this._createOverlay(config);
        var /** @type {?} */ container = this._attachSnackBarContainer(overlayRef, config);
        var /** @type {?} */ snackBarRef = new MatSnackBarRef(container, overlayRef);
        var /** @type {?} */ injector = this._createInjector(config, snackBarRef);
        var /** @type {?} */ portal = new ComponentPortal(component, undefined, injector);
        var /** @type {?} */ contentRef = container.attachComponentPortal(portal);
        // We can't pass this via the injector, because the injector is created earlier.
        snackBarRef.instance = contentRef.instance;
        // Subscribe to the breakpoint observer and attach the mat-snack-bar-handset class as
        // appropriate. This class is applied to the overlay element because the overlay must expand to
        // fill the width of the screen for full width snackbars.
        this._breakpointObserver.observe(Breakpoints.Handset).pipe(takeUntil(overlayRef.detachments().pipe(take(1)))).subscribe(function (state$$1) {
            if (state$$1.matches) {
                overlayRef.overlayElement.classList.add('mat-snack-bar-handset');
            }
            else {
                overlayRef.overlayElement.classList.remove('mat-snack-bar-handset');
            }
        });
        return snackBarRef;
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param {?} config The user-specified snack bar config.
     * @return {?}
     */
    MatSnackBar.prototype._createOverlay = /**
     * Creates a new overlay and places it in the correct location.
     * @param {?} config The user-specified snack bar config.
     * @return {?}
     */
    function (config) {
        var /** @type {?} */ overlayConfig = new OverlayConfig();
        overlayConfig.direction = config.direction;
        var /** @type {?} */ positionStrategy = this._overlay.position().global();
        // Set horizontal position.
        var /** @type {?} */ isRtl = config.direction === 'rtl';
        var /** @type {?} */ isLeft = (config.horizontalPosition === 'left' ||
            (config.horizontalPosition === 'start' && !isRtl) ||
            (config.horizontalPosition === 'end' && isRtl));
        var /** @type {?} */ isRight = !isLeft && config.horizontalPosition !== 'center';
        if (isLeft) {
            positionStrategy.left('0');
        }
        else if (isRight) {
            positionStrategy.right('0');
        }
        else {
            positionStrategy.centerHorizontally();
        }
        // Set horizontal position.
        if (config.verticalPosition === 'top') {
            positionStrategy.top('0');
        }
        else {
            positionStrategy.bottom('0');
        }
        overlayConfig.positionStrategy = positionStrategy;
        return this._overlay.create(overlayConfig);
    };
    /**
     * Creates an injector to be used inside of a snack bar component.
     * @template T
     * @param {?} config Config that was used to create the snack bar.
     * @param {?} snackBarRef Reference to the snack bar.
     * @return {?}
     */
    MatSnackBar.prototype._createInjector = /**
     * Creates an injector to be used inside of a snack bar component.
     * @template T
     * @param {?} config Config that was used to create the snack bar.
     * @param {?} snackBarRef Reference to the snack bar.
     * @return {?}
     */
    function (config, snackBarRef) {
        var /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var /** @type {?} */ injectionTokens = new WeakMap();
        injectionTokens.set(MatSnackBarRef, snackBarRef);
        injectionTokens.set(MAT_SNACK_BAR_DATA, config.data);
        return new PortalInjector(userInjector || this._injector, injectionTokens);
    };
    MatSnackBar.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MatSnackBar.ctorParameters = function () { return [
        { type: Overlay, },
        { type: LiveAnnouncer, },
        { type: Injector, },
        { type: BreakpointObserver, },
        { type: MatSnackBar, decorators: [{ type: Optional }, { type: SkipSelf },] },
    ]; };
    return MatSnackBar;
}());
/**
 * Applies default options to the snackbar config.
 * @param {?=} config The configuration to which the defaults will be applied.
 * @return {?} The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config) {
    return __assign({}, new MatSnackBarConfig(), config);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatSnackBarModule = /** @class */ (function () {
    function MatSnackBarModule() {
    }
    MatSnackBarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        OverlayModule,
                        PortalModule,
                        CommonModule,
                        MatCommonModule,
                        LayoutModule,
                    ],
                    exports: [MatSnackBarContainer, MatCommonModule],
                    declarations: [MatSnackBarContainer, SimpleSnackBar],
                    entryComponents: [MatSnackBarContainer, SimpleSnackBar],
                    providers: [MatSnackBar, LIVE_ANNOUNCER_PROVIDER]
                },] },
    ];
    /** @nocollapse */
    MatSnackBarModule.ctorParameters = function () { return []; };
    return MatSnackBarModule;
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

export { MatSnackBarModule, MatSnackBar, SHOW_ANIMATION, HIDE_ANIMATION, MatSnackBarContainer, MAT_SNACK_BAR_DATA, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar };
//# sourceMappingURL=snack-bar.es5.js.map
