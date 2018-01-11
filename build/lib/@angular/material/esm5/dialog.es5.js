/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, Injectable, InjectionToken, Injector, Input, NgModule, Optional, SkipSelf, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { Overlay, OverlayConfig, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, PortalInjector, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { A11yModule, FocusTrapFactory } from '@angular/cdk/a11y';
import { MatCommonModule } from '@angular/material/core';
import { __assign, __extends } from 'tslib';
import * as tslib_1 from 'tslib';
import { Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { filter } from 'rxjs/operators/filter';
import { startWith } from 'rxjs/operators/startWith';
import { Subject } from 'rxjs/Subject';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { take } from 'rxjs/operators/take';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Possible overrides for a dialog's position.
 * @record
 */

/**
 * Configuration for opening a modal dialog with the MatDialog service.
 */
var MatDialogConfig = /** @class */ (function () {
    function MatDialogConfig() {
        /**
         * The ARIA role of the dialog element.
         */
        this.role = 'dialog';
        /**
         * Custom class for the overlay pane.
         */
        this.panelClass = '';
        /**
         * Whether the dialog has a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * Custom class for the backdrop,
         */
        this.backdropClass = '';
        /**
         * Whether the user can use escape or clicking outside to close a modal.
         */
        this.disableClose = false;
        /**
         * Width of the dialog.
         */
        this.width = '';
        /**
         * Height of the dialog.
         */
        this.height = '';
        /**
         * Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw
         */
        this.maxWidth = '80vw';
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        /**
         * Layout direction for the dialog's content.
         */
        this.direction = 'ltr';
        /**
         * ID of the element that describes the dialog.
         */
        this.ariaDescribedBy = null;
        /**
         * Aria label to assign to the dialog element
         */
        this.ariaLabel = null;
        /**
         * Whether the dialog should focus the first focusable element on open.
         */
        this.autoFocus = true;
    }
    return MatDialogConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Throws an exception for the case when a ComponentPortal is
 * attached to a DomPortalOutlet without an origin.
 * \@docs-private
 * @return {?}
 */
function throwMatDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
/**
 * Internal component that wraps user-provided dialog content.
 * Animation is based on https://material.io/guidelines/motion/choreography.html.
 * \@docs-private
 */
var MatDialogContainer = /** @class */ (function (_super) {
    __extends(MatDialogContainer, _super);
    function MatDialogContainer(_elementRef, _focusTrapFactory, _changeDetectorRef, _document) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._document = _document;
        /**
         * Element that was focused before the dialog was opened. Save this to restore upon close.
         */
        _this._elementFocusedBeforeDialogWasOpened = null;
        /**
         * State of the dialog animation.
         */
        _this._state = 'enter';
        /**
         * Emits when an animation state changes.
         */
        _this._animationStateChanged = new EventEmitter();
        /**
         * ID of the element that should be considered as the dialog's label.
         */
        _this._ariaLabelledBy = null;
        return _this;
    }
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    MatDialogContainer.prototype.attachComponentPortal = /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    function (portal) {
        if (this._portalOutlet.hasAttached()) {
            throwMatDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @template C
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    MatDialogContainer.prototype.attachTemplatePortal = /**
     * Attach a TemplatePortal as content to this dialog container.
     * @template C
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    function (portal) {
        if (this._portalOutlet.hasAttached()) {
            throwMatDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachTemplatePortal(portal);
    };
    /**
     * Moves the focus inside the focus trap.
     * @return {?}
     */
    MatDialogContainer.prototype._trapFocus = /**
     * Moves the focus inside the focus trap.
     * @return {?}
     */
    function () {
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this._config.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady();
        }
    };
    /**
     * Restores focus to the element that was focused before the dialog opened.
     * @return {?}
     */
    MatDialogContainer.prototype._restoreFocus = /**
     * Restores focus to the element that was focused before the dialog opened.
     * @return {?}
     */
    function () {
        var /** @type {?} */ toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    };
    /**
     * Saves a reference to the element that was focused before the dialog was opened.
     * @return {?}
     */
    MatDialogContainer.prototype._savePreviouslyFocusedElement = /**
     * Saves a reference to the element that was focused before the dialog was opened.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = /** @type {?} */ (this._document.activeElement);
            // Move focus onto the dialog immediately in order to prevent the user from accidentally
            // opening multiple dialogs at the same time. Needs to be async, because the element
            // may not be focusable immediately.
            Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
        }
    };
    /** Callback, invoked whenever an animation on the host completes. */
    /**
     * Callback, invoked whenever an animation on the host completes.
     * @param {?} event
     * @return {?}
     */
    MatDialogContainer.prototype._onAnimationDone = /**
     * Callback, invoked whenever an animation on the host completes.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'enter') {
            this._trapFocus();
        }
        else if (event.toState === 'exit') {
            this._restoreFocus();
        }
        this._animationStateChanged.emit(event);
    };
    /** Callback, invoked when an animation on the host starts. */
    /**
     * Callback, invoked when an animation on the host starts.
     * @param {?} event
     * @return {?}
     */
    MatDialogContainer.prototype._onAnimationStart = /**
     * Callback, invoked when an animation on the host starts.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._animationStateChanged.emit(event);
    };
    /** Starts the dialog exit animation. */
    /**
     * Starts the dialog exit animation.
     * @return {?}
     */
    MatDialogContainer.prototype._startExitAnimation = /**
     * Starts the dialog exit animation.
     * @return {?}
     */
    function () {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    };
    MatDialogContainer.decorators = [
        { type: Component, args: [{selector: 'mat-dialog-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: [".mat-dialog-container{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:block;padding:24px;border-radius:2px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%}@media screen and (-ms-high-contrast:active){.mat-dialog-container{outline:solid 1px}}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch;-webkit-backface-visibility:hidden;backface-visibility:hidden}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:12px 0;display:flex;flex-wrap:wrap}.mat-dialog-actions:last-child{margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button+.mat-button,.mat-dialog-actions .mat-button+.mat-raised-button,.mat-dialog-actions .mat-raised-button+.mat-button,.mat-dialog-actions .mat-raised-button+.mat-raised-button{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button+.mat-button,[dir=rtl] .mat-dialog-actions .mat-button+.mat-raised-button,[dir=rtl] .mat-dialog-actions .mat-raised-button+.mat-button,[dir=rtl] .mat-dialog-actions .mat-raised-button+.mat-raised-button{margin-left:0;margin-right:8px}"],
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    animations: [
                        trigger('slideDialog', [
                            // Note: The `enter` animation doesn't transition to something like `translate3d(0, 0, 0)
                            // scale(1)`, because for some reason specifying the transform explicitly, causes IE both
                            // to blur the dialog content and decimate the animation performance. Leaving it as `none`
                            // solves both issues.
                            state('enter', style({ transform: 'none', opacity: 1 })),
                            state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
                            state('exit', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
                            transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
                        ])
                    ],
                    host: {
                        'class': 'mat-dialog-container',
                        'tabindex': '-1',
                        '[attr.role]': '_config?.role',
                        '[attr.aria-labelledby]': '_config?.ariaLabel ? null : _ariaLabelledBy',
                        '[attr.aria-label]': '_config?.ariaLabel',
                        '[attr.aria-describedby]': '_config?.ariaDescribedBy || null',
                        '[@slideDialog]': '_state',
                        '(@slideDialog.start)': '_onAnimationStart($event)',
                        '(@slideDialog.done)': '_onAnimationDone($event)',
                    },
                },] },
    ];
    /** @nocollapse */
    MatDialogContainer.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FocusTrapFactory, },
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    ]; };
    MatDialogContainer.propDecorators = {
        "_portalOutlet": [{ type: ViewChild, args: [CdkPortalOutlet,] },],
    };
    return MatDialogContainer;
}(BasePortalOutlet));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

// TODO(jelbourn): resizing
// Counter for unique dialog ids.
var uniqueId = 0;
/**
 * Reference to a dialog opened via the MatDialog service.
 */
var MatDialogRef = /** @class */ (function () {
    function MatDialogRef(_overlayRef, _containerInstance, id) {
        if (id === void 0) { id = "mat-dialog-" + uniqueId++; }
        var _this = this;
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        /**
         * Whether the user is allowed to close the dialog.
         */
        this.disableClose = this._containerInstance._config.disableClose;
        /**
         * Subject for notifying the user that the dialog has finished opening.
         */
        this._afterOpen = new Subject();
        /**
         * Subject for notifying the user that the dialog has finished closing.
         */
        this._afterClosed = new Subject();
        /**
         * Subject for notifying the user that the dialog has started closing.
         */
        this._beforeClose = new Subject();
        // Emit when opening animation completes
        _containerInstance._animationStateChanged.pipe(filter(function (event) { return event.phaseName === 'done' && event.toState === 'enter'; }), take(1))
            .subscribe(function () {
            _this._afterOpen.next();
            _this._afterOpen.complete();
        });
        // Dispose overlay when closing animation is complete
        _containerInstance._animationStateChanged.pipe(filter(function (event) { return event.phaseName === 'done' && event.toState === 'exit'; }), take(1))
            .subscribe(function () {
            _this._overlayRef.dispose();
            _this._afterClosed.next(_this._result);
            _this._afterClosed.complete();
            _this.componentInstance = /** @type {?} */ ((null));
        });
    }
    /**
     * Close the dialog.
     * @param dialogResult Optional result to return to the dialog opener.
     */
    /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    MatDialogRef.prototype.close = /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    function (dialogResult) {
        var _this = this;
        this._result = dialogResult;
        // Transition the backdrop in parallel to the dialog.
        this._containerInstance._animationStateChanged.pipe(filter(function (event) { return event.phaseName === 'start'; }), take(1))
            .subscribe(function () {
            _this._beforeClose.next(dialogResult);
            _this._beforeClose.complete();
            _this._overlayRef.detachBackdrop();
        });
        this._containerInstance._startExitAnimation();
    };
    /**
     * Gets an observable that is notified when the dialog is finished opening.
     */
    /**
     * Gets an observable that is notified when the dialog is finished opening.
     * @return {?}
     */
    MatDialogRef.prototype.afterOpen = /**
     * Gets an observable that is notified when the dialog is finished opening.
     * @return {?}
     */
    function () {
        return this._afterOpen.asObservable();
    };
    /**
     * Gets an observable that is notified when the dialog is finished closing.
     */
    /**
     * Gets an observable that is notified when the dialog is finished closing.
     * @return {?}
     */
    MatDialogRef.prototype.afterClosed = /**
     * Gets an observable that is notified when the dialog is finished closing.
     * @return {?}
     */
    function () {
        return this._afterClosed.asObservable();
    };
    /**
     * Gets an observable that is notified when the dialog has started closing.
     */
    /**
     * Gets an observable that is notified when the dialog has started closing.
     * @return {?}
     */
    MatDialogRef.prototype.beforeClose = /**
     * Gets an observable that is notified when the dialog has started closing.
     * @return {?}
     */
    function () {
        return this._beforeClose.asObservable();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    MatDialogRef.prototype.backdropClick = /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    MatDialogRef.prototype.keydownEvents = /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    function () {
        return this._overlayRef.keydownEvents();
    };
    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    /**
     * Updates the dialog's position.
     * @param {?=} position New dialog position.
     * @return {?}
     */
    MatDialogRef.prototype.updatePosition = /**
     * Updates the dialog's position.
     * @param {?=} position New dialog position.
     * @return {?}
     */
    function (position) {
        var /** @type {?} */ strategy = this._getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        this._overlayRef.updatePosition();
        return this;
    };
    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    /**
     * Updates the dialog's width and height.
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {?}
     */
    MatDialogRef.prototype.updateSize = /**
     * Updates the dialog's width and height.
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {?}
     */
    function (width, height) {
        if (width === void 0) { width = 'auto'; }
        if (height === void 0) { height = 'auto'; }
        this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    };
    /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    MatDialogRef.prototype._getPositionStrategy = /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    function () {
        return /** @type {?} */ (this._overlayRef.getConfig().positionStrategy);
    };
    return MatDialogRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MAT_DIALOG_DATA = new InjectionToken('MatDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 */
var MAT_DIALOG_SCROLL_STRATEGY = new InjectionToken('mat-dialog-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.block(); };
}
/**
 * \@docs-private
 */
var MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: MAT_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/**
 * Service to open Material Design modal dialogs.
 */
var MatDialog = /** @class */ (function () {
    function MatDialog(_overlay, _injector, location, _scrollStrategy, _parentDialog, _overlayContainer) {
        var _this = this;
        this._overlay = _overlay;
        this._injector = _injector;
        this._scrollStrategy = _scrollStrategy;
        this._parentDialog = _parentDialog;
        this._overlayContainer = _overlayContainer;
        this._openDialogsAtThisLevel = [];
        this._afterAllClosedAtThisLevel = new Subject();
        this._afterOpenAtThisLevel = new Subject();
        this._ariaHiddenElements = new Map();
        /**
         * Stream that emits when all open dialog have finished closing.
         * Will emit on subscribe if there are no open dialogs to begin with.
         */
        this.afterAllClosed = defer(function () {
            return _this.openDialogs.length ?
                _this._afterAllClosed :
                _this._afterAllClosed.pipe(startWith(undefined));
        });
        // Close all of the dialogs when the user goes forwards/backwards in history or when the
        // location hash changes. Note that this usually doesn't include clicking on links (unless
        // the user is using the `HashLocationStrategy`).
        if (!_parentDialog && location) {
            location.subscribe(function () { return _this.closeAll(); });
        }
    }
    Object.defineProperty(MatDialog.prototype, "openDialogs", {
        /** Keeps track of the currently-open dialogs. */
        get: /**
         * Keeps track of the currently-open dialogs.
         * @return {?}
         */
        function () {
            return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDialog.prototype, "afterOpen", {
        /** Stream that emits when a dialog has been opened. */
        get: /**
         * Stream that emits when a dialog has been opened.
         * @return {?}
         */
        function () {
            return this._parentDialog ? this._parentDialog.afterOpen : this._afterOpenAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDialog.prototype, "_afterAllClosed", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ parent = this._parentDialog;
            return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens a modal dialog containing the given component.
     * @param componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    /**
     * Opens a modal dialog containing the given component.
     * @template T, D
     * @param {?} componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param {?=} config Extra configuration options.
     * @return {?} Reference to the newly-opened dialog.
     */
    MatDialog.prototype.open = /**
     * Opens a modal dialog containing the given component.
     * @template T, D
     * @param {?} componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param {?=} config Extra configuration options.
     * @return {?} Reference to the newly-opened dialog.
     */
    function (componentOrTemplateRef, config) {
        var _this = this;
        config = _applyConfigDefaults(config);
        if (config.id && this.getDialogById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        var /** @type {?} */ overlayRef = this._createOverlay(config);
        var /** @type {?} */ dialogContainer = this._attachDialogContainer(overlayRef, config);
        var /** @type {?} */ dialogRef = this._attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        // If this is the first dialog that we're opening, hide all the non-overlay content.
        if (!this.openDialogs.length) {
            this._hideNonDialogContentFromAssistiveTechnology();
        }
        this.openDialogs.push(dialogRef);
        dialogRef.afterClosed().subscribe(function () { return _this._removeOpenDialog(dialogRef); });
        this.afterOpen.next(dialogRef);
        return dialogRef;
    };
    /**
     * Closes all of the currently-open dialogs.
     */
    /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    MatDialog.prototype.closeAll = /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    function () {
        var /** @type {?} */ i = this.openDialogs.length;
        while (i--) {
            // The `_openDialogs` property isn't updated after close until the rxjs subscription
            // runs on the next microtask, in addition to modifying the array as we're going
            // through it. We loop through all of them and call close without assuming that
            // they'll be removed from the list instantaneously.
            this.openDialogs[i].close();
        }
    };
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    MatDialog.prototype.getDialogById = /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    function (id) {
        return this.openDialogs.find(function (dialog) { return dialog.id === id; });
    };
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the OverlayRef for the created overlay.
     */
    MatDialog.prototype._createOverlay = /**
     * Creates the overlay into which the dialog will be loaded.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the OverlayRef for the created overlay.
     */
    function (config) {
        var /** @type {?} */ overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    };
    /**
     * Creates an overlay config from a dialog config.
     * @param {?} dialogConfig The dialog configuration.
     * @return {?} The overlay configuration.
     */
    MatDialog.prototype._getOverlayConfig = /**
     * Creates an overlay config from a dialog config.
     * @param {?} dialogConfig The dialog configuration.
     * @return {?} The overlay configuration.
     */
    function (dialogConfig) {
        var /** @type {?} */ state$$1 = new OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: this._scrollStrategy(),
            panelClass: dialogConfig.panelClass,
            hasBackdrop: dialogConfig.hasBackdrop,
            direction: dialogConfig.direction,
            minWidth: dialogConfig.minWidth,
            minHeight: dialogConfig.minHeight,
            maxWidth: dialogConfig.maxWidth,
            maxHeight: dialogConfig.maxHeight
        });
        if (dialogConfig.backdropClass) {
            state$$1.backdropClass = dialogConfig.backdropClass;
        }
        return state$$1;
    };
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @param {?} overlay Reference to the dialog's underlying overlay.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to a ComponentRef for the attached container.
     */
    MatDialog.prototype._attachDialogContainer = /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @param {?} overlay Reference to the dialog's underlying overlay.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to a ComponentRef for the attached container.
     */
    function (overlay, config) {
        var /** @type {?} */ containerPortal = new ComponentPortal(MatDialogContainer, config.viewContainerRef);
        var /** @type {?} */ containerRef = overlay.attach(containerPortal);
        containerRef.instance._config = config;
        return containerRef.instance;
    };
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MatDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MatDialogRef that should be returned to the user.
     */
    MatDialog.prototype._attachDialogContent = /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MatDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MatDialogRef that should be returned to the user.
     */
    function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        var /** @type {?} */ dialogRef = new MatDialogRef(overlayRef, dialogContainer, config.id);
        // When the dialog backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(function () {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            });
        }
        // Close when escape keydown event occurs
        overlayRef.keydownEvents().pipe(filter(function (event) { return event.keyCode === ESCAPE && !dialogRef.disableClose; })).subscribe(function () { return dialogRef.close(); });
        if (componentOrTemplateRef instanceof TemplateRef) {
            dialogContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, /** @type {?} */ ((null)), /** @type {?} */ ({ $implicit: config.data, dialogRef: dialogRef })));
        }
        else {
            var /** @type {?} */ injector = this._createInjector(config, dialogRef, dialogContainer);
            var /** @type {?} */ contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    };
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @template T
     * @param {?} config Config object that is used to construct the dialog.
     * @param {?} dialogRef Reference to the dialog.
     * @param {?} dialogContainer
     * @return {?} The custom injector that can be used inside the dialog.
     */
    MatDialog.prototype._createInjector = /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @template T
     * @param {?} config Config object that is used to construct the dialog.
     * @param {?} dialogRef Reference to the dialog.
     * @param {?} dialogContainer
     * @return {?} The custom injector that can be used inside the dialog.
     */
    function (config, dialogRef, dialogContainer) {
        var /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var /** @type {?} */ injectionTokens = new WeakMap();
        injectionTokens.set(MatDialogRef, dialogRef);
        // The MatDialogContainer is injected in the portal as the MatDialogContainer and the dialog's
        // content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes.  To allow the hierarchy that is expected, the MatDialogContainer is explicitly
        // added to the injection tokens.
        injectionTokens.set(MatDialogContainer, dialogContainer);
        injectionTokens.set(MAT_DIALOG_DATA, config.data);
        injectionTokens.set(Directionality, {
            value: config.direction,
            change: of()
        });
        return new PortalInjector(userInjector || this._injector, injectionTokens);
    };
    /**
     * Removes a dialog from the array of open dialogs.
     * @param {?} dialogRef Dialog to be removed.
     * @return {?}
     */
    MatDialog.prototype._removeOpenDialog = /**
     * Removes a dialog from the array of open dialogs.
     * @param {?} dialogRef Dialog to be removed.
     * @return {?}
     */
    function (dialogRef) {
        var /** @type {?} */ index = this.openDialogs.indexOf(dialogRef);
        if (index > -1) {
            this.openDialogs.splice(index, 1);
            // If all the dialogs were closed, remove/restore the `aria-hidden`
            // to a the siblings and emit to the `afterAllClosed` stream.
            if (!this.openDialogs.length) {
                this._ariaHiddenElements.forEach(function (previousValue, element) {
                    if (previousValue) {
                        element.setAttribute('aria-hidden', previousValue);
                    }
                    else {
                        element.removeAttribute('aria-hidden');
                    }
                });
                this._ariaHiddenElements.clear();
                this._afterAllClosed.next();
            }
        }
    };
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @return {?}
     */
    MatDialog.prototype._hideNonDialogContentFromAssistiveTechnology = /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @return {?}
     */
    function () {
        var /** @type {?} */ overlayContainer = this._overlayContainer.getContainerElement();
        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            var /** @type {?} */ siblings = overlayContainer.parentElement.children;
            for (var /** @type {?} */ i = siblings.length - 1; i > -1; i--) {
                var /** @type {?} */ sibling = siblings[i];
                if (sibling !== overlayContainer &&
                    sibling.nodeName !== 'SCRIPT' &&
                    sibling.nodeName !== 'STYLE' &&
                    !sibling.hasAttribute('aria-live')) {
                    this._ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }
        }
    };
    MatDialog.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MatDialog.ctorParameters = function () { return [
        { type: Overlay, },
        { type: Injector, },
        { type: Location, decorators: [{ type: Optional },] },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_SCROLL_STRATEGY,] },] },
        { type: MatDialog, decorators: [{ type: Optional }, { type: SkipSelf },] },
        { type: OverlayContainer, },
    ]; };
    return MatDialog;
}());
/**
 * Applies default options to the dialog config.
 * @param {?=} config Config to be modified.
 * @return {?} The new configuration object.
 */
function _applyConfigDefaults(config) {
    return __assign({}, new MatDialogConfig(), config);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Counter used to generate unique IDs for dialog elements.
 */
var dialogElementUid = 0;
/**
 * Button that will close the current dialog.
 */
var MatDialogClose = /** @class */ (function () {
    function MatDialogClose(dialogRef) {
        this.dialogRef = dialogRef;
        /**
         * Screenreader label for the button.
         */
        this.ariaLabel = 'Close dialog';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MatDialogClose.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var /** @type {?} */ proxiedChange = changes["_matDialogClose"] || changes["_matDialogCloseResult"];
        if (proxiedChange) {
            this.dialogResult = proxiedChange.currentValue;
        }
    };
    MatDialogClose.decorators = [
        { type: Directive, args: [{
                    selector: "button[mat-dialog-close], button[matDialogClose]",
                    exportAs: 'matDialogClose',
                    host: {
                        '(click)': 'dialogRef.close(dialogResult)',
                        '[attr.aria-label]': 'ariaLabel',
                        'type': 'button',
                    }
                },] },
    ];
    /** @nocollapse */
    MatDialogClose.ctorParameters = function () { return [
        { type: MatDialogRef, },
    ]; };
    MatDialogClose.propDecorators = {
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "dialogResult": [{ type: Input, args: ['mat-dialog-close',] },],
        "_matDialogClose": [{ type: Input, args: ['matDialogClose',] },],
    };
    return MatDialogClose;
}());
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
var MatDialogTitle = /** @class */ (function () {
    function MatDialogTitle(_container) {
        this._container = _container;
        this.id = "mat-dialog-title-" + dialogElementUid++;
    }
    /**
     * @return {?}
     */
    MatDialogTitle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._container && !this._container._ariaLabelledBy) {
            Promise.resolve().then(function () { return _this._container._ariaLabelledBy = _this.id; });
        }
    };
    MatDialogTitle.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-dialog-title], [matDialogTitle]',
                    exportAs: 'matDialogTitle',
                    host: {
                        'class': 'mat-dialog-title',
                        '[id]': 'id',
                    },
                },] },
    ];
    /** @nocollapse */
    MatDialogTitle.ctorParameters = function () { return [
        { type: MatDialogContainer, decorators: [{ type: Optional },] },
    ]; };
    MatDialogTitle.propDecorators = {
        "id": [{ type: Input },],
    };
    return MatDialogTitle;
}());
/**
 * Scrollable content container of a dialog.
 */
var MatDialogContent = /** @class */ (function () {
    function MatDialogContent() {
    }
    MatDialogContent.decorators = [
        { type: Directive, args: [{
                    selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]",
                    host: { 'class': 'mat-dialog-content' }
                },] },
    ];
    /** @nocollapse */
    MatDialogContent.ctorParameters = function () { return []; };
    return MatDialogContent;
}());
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
var MatDialogActions = /** @class */ (function () {
    function MatDialogActions() {
    }
    MatDialogActions.decorators = [
        { type: Directive, args: [{
                    selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]",
                    host: { 'class': 'mat-dialog-actions' }
                },] },
    ];
    /** @nocollapse */
    MatDialogActions.ctorParameters = function () { return []; };
    return MatDialogActions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatDialogModule = /** @class */ (function () {
    function MatDialogModule() {
    }
    MatDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        PortalModule,
                        A11yModule,
                        MatCommonModule,
                    ],
                    exports: [
                        MatDialogContainer,
                        MatDialogClose,
                        MatDialogTitle,
                        MatDialogContent,
                        MatDialogActions,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatDialogContainer,
                        MatDialogClose,
                        MatDialogTitle,
                        MatDialogActions,
                        MatDialogContent,
                    ],
                    providers: [
                        MatDialog,
                        MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
                    ],
                    entryComponents: [MatDialogContainer],
                },] },
    ];
    /** @nocollapse */
    MatDialogModule.ctorParameters = function () { return []; };
    return MatDialogModule;
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

export { MatDialogModule, MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER, MatDialog, throwMatDialogContentAlreadyAttachedError, MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogConfig, MatDialogRef };
//# sourceMappingURL=dialog.es5.js.map
