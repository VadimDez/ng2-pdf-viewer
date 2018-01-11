/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/observers'), require('@angular/cdk/portal'), require('@angular/cdk/scrolling'), require('@angular/common'), require('@angular/core'), require('@angular/material/core'), require('rxjs/Subject'), require('@angular/animations'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('rxjs/Subscription'), require('rxjs/observable/merge'), require('@angular/cdk/keycodes'), require('rxjs/observable/of'), require('@angular/cdk/platform'), require('rxjs/operators/takeUntil')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/observers', '@angular/cdk/portal', '@angular/cdk/scrolling', '@angular/common', '@angular/core', '@angular/material/core', 'rxjs/Subject', '@angular/animations', '@angular/cdk/bidi', '@angular/cdk/coercion', 'rxjs/Subscription', 'rxjs/observable/merge', '@angular/cdk/keycodes', 'rxjs/observable/of', '@angular/cdk/platform', 'rxjs/operators/takeUntil'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.tabs = global.ng.material.tabs || {}),global.ng.cdk.observers,global.ng.cdk.portal,global.ng.cdk.scrolling,global.ng.common,global.ng.core,global.ng.material.core,global.Rx,global.ng.animations,global.ng.cdk.bidi,global.ng.cdk.coercion,global.Rx,global.Rx.Observable,global.ng.cdk.keycodes,global.Rx.Observable,global.ng.cdk.platform,global.Rx.operators));
}(this, (function (exports,_angular_cdk_observers,_angular_cdk_portal,_angular_cdk_scrolling,_angular_common,_angular_core,_angular_material_core,rxjs_Subject,_angular_animations,_angular_cdk_bidi,_angular_cdk_coercion,rxjs_Subscription,rxjs_observable_merge,_angular_cdk_keycodes,rxjs_observable_of,_angular_cdk_platform,rxjs_operators_takeUntil) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The ink-bar is used to display and animate the line underneath the current active tab label.
 * \@docs-private
 */
var MatInkBar = /** @class */ (function () {
    function MatInkBar(_elementRef, _ngZone) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
    }
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param element
     */
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param {?} element
     * @return {?}
     */
    MatInkBar.prototype.alignToElement = /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        this.show();
        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular(function () {
                requestAnimationFrame(function () { return _this._setStyles(element); });
            });
        }
        else {
            this._setStyles(element);
        }
    };
    /** Shows the ink bar. */
    /**
     * Shows the ink bar.
     * @return {?}
     */
    MatInkBar.prototype.show = /**
     * Shows the ink bar.
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.style.visibility = 'visible';
    };
    /** Hides the ink bar. */
    /**
     * Hides the ink bar.
     * @return {?}
     */
    MatInkBar.prototype.hide = /**
     * Hides the ink bar.
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.style.visibility = 'hidden';
    };
    /**
     * Sets the proper styles to the ink bar element.
     * @param {?} element
     * @return {?}
     */
    MatInkBar.prototype._setStyles = /**
     * Sets the proper styles to the ink bar element.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ inkBar = this._elementRef.nativeElement;
        inkBar.style.left = element ? (element.offsetLeft || 0) + 'px' : '0';
        inkBar.style.width = element ? (element.offsetWidth || 0) + 'px' : '0';
    };
    MatInkBar.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'mat-ink-bar',
                    host: {
                        'class': 'mat-ink-bar',
                    },
                },] },
    ];
    /** @nocollapse */
    MatInkBar.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.NgZone, },
    ]; };
    return MatInkBar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Used to flag tab labels for use with the portal directive
 */
var MatTabLabel = /** @class */ (function (_super) {
    __extends(MatTabLabel, _super);
    function MatTabLabel(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    MatTabLabel.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[mat-tab-label], [matTabLabel]',
                },] },
    ];
    /** @nocollapse */
    MatTabLabel.ctorParameters = function () { return [
        { type: _angular_core.TemplateRef, },
        { type: _angular_core.ViewContainerRef, },
    ]; };
    return MatTabLabel;
}(_angular_cdk_portal.CdkPortal));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
var MatTabBase = /** @class */ (function () {
    function MatTabBase() {
    }
    return MatTabBase;
}());
var _MatTabMixinBase = _angular_material_core.mixinDisabled(MatTabBase);
var MatTab = /** @class */ (function (_super) {
    __extends(MatTab, _super);
    function MatTab(_viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._viewContainerRef = _viewContainerRef;
        /**
         * The plain text label for the tab, used when there is no template label.
         */
        _this.textLabel = '';
        /**
         * The portal that will be the hosted content of the tab
         */
        _this._contentPortal = null;
        /**
         * Emits whenever the label changes.
         */
        _this._labelChange = new rxjs_Subject.Subject();
        /**
         * Emits whenever the disable changes
         */
        _this._disableChange = new rxjs_Subject.Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        _this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        _this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        _this.isActive = false;
        return _this;
    }
    Object.defineProperty(MatTab.prototype, "content", {
        /** @docs-private */
        get: /**
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    MatTab.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty('textLabel')) {
            this._labelChange.next();
        }
        if (changes.hasOwnProperty('disabled')) {
            this._disableChange.next();
        }
    };
    /**
     * @return {?}
     */
    MatTab.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._disableChange.complete();
        this._labelChange.complete();
    };
    /**
     * @return {?}
     */
    MatTab.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._contentPortal = new _angular_cdk_portal.TemplatePortal(this._content, this._viewContainerRef);
    };
    MatTab.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-tab',
                    template: "<ng-template><ng-content></ng-content></ng-template>",
                    inputs: ['disabled'],
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    exportAs: 'matTab',
                },] },
    ];
    /** @nocollapse */
    MatTab.ctorParameters = function () { return [
        { type: _angular_core.ViewContainerRef, },
    ]; };
    MatTab.propDecorators = {
        "templateLabel": [{ type: _angular_core.ContentChild, args: [MatTabLabel,] },],
        "_content": [{ type: _angular_core.ViewChild, args: [_angular_core.TemplateRef,] },],
        "textLabel": [{ type: _angular_core.Input, args: ['label',] },],
    };
    return MatTab;
}(_MatTabMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
var MatTabBodyPortal = /** @class */ (function (_super) {
    __extends(MatTabBodyPortal, _super);
    function MatTabBodyPortal(_componentFactoryResolver, _viewContainerRef, _host) {
        var _this = _super.call(this, _componentFactoryResolver, _viewContainerRef) || this;
        _this._host = _host;
        return _this;
    }
    /** Set initial visibility or set up subscription for changing visibility. */
    /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    MatTabBodyPortal.prototype.ngOnInit = /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._host._isCenterPosition(this._host._position)) {
            this.attach(this._host._content);
        }
        this._centeringSub = this._host._beforeCentering.subscribe(function (isCentering) {
            if (isCentering) {
                if (!_this.hasAttached()) {
                    _this.attach(_this._host._content);
                }
            }
        });
        this._leavingSub = this._host._afterLeavingCenter.subscribe(function () {
            _this.detach();
        });
    };
    /** Clean up centering subscription. */
    /**
     * Clean up centering subscription.
     * @return {?}
     */
    MatTabBodyPortal.prototype.ngOnDestroy = /**
     * Clean up centering subscription.
     * @return {?}
     */
    function () {
        if (this._centeringSub && !this._centeringSub.closed) {
            this._centeringSub.unsubscribe();
        }
        if (this._leavingSub && !this._leavingSub.closed) {
            this._leavingSub.unsubscribe();
        }
    };
    MatTabBodyPortal.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matTabBodyHost]'
                },] },
    ];
    /** @nocollapse */
    MatTabBodyPortal.ctorParameters = function () { return [
        { type: _angular_core.ComponentFactoryResolver, },
        { type: _angular_core.ViewContainerRef, },
        { type: MatTabBody, decorators: [{ type: _angular_core.Inject, args: [_angular_core.forwardRef(function () { return MatTabBody; }),] },] },
    ]; };
    return MatTabBodyPortal;
}(_angular_cdk_portal.CdkPortalOutlet));
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
var MatTabBody = /** @class */ (function () {
    function MatTabBody(_elementRef, _dir) {
        this._elementRef = _elementRef;
        this._dir = _dir;
        /**
         * Event emitted when the tab begins to animate towards the center as the active tab.
         */
        this._onCentering = new _angular_core.EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this._beforeCentering = new _angular_core.EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this._afterLeavingCenter = new _angular_core.EventEmitter();
        /**
         * Event emitted when the tab completes its animation towards the center.
         */
        this._onCentered = new _angular_core.EventEmitter(true);
    }
    Object.defineProperty(MatTabBody.prototype, "position", {
        set: /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            if (position < 0) {
                this._position = this._getLayoutDirection() == 'ltr' ? 'left' : 'right';
            }
            else if (position > 0) {
                this._position = this._getLayoutDirection() == 'ltr' ? 'right' : 'left';
            }
            else {
                this._position = 'center';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabBody.prototype, "origin", {
        set: /**
         * The origin position from which this tab should appear when it is centered into view.
         * @param {?} origin
         * @return {?}
         */
        function (origin) {
            if (origin == null) {
                return;
            }
            var /** @type {?} */ dir = this._getLayoutDirection();
            if ((dir == 'ltr' && origin <= 0) || (dir == 'rtl' && origin > 0)) {
                this._origin = 'left';
            }
            else {
                this._origin = 'right';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    MatTabBody.prototype.ngOnInit = /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    function () {
        if (this._position == 'center' && this._origin) {
            this._position = this._origin == 'left' ? 'left-origin-center' : 'right-origin-center';
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MatTabBody.prototype._onTranslateTabStarted = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ isCentering = this._isCenterPosition(e.toState);
        this._beforeCentering.emit(isCentering);
        if (isCentering) {
            this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MatTabBody.prototype._onTranslateTabComplete = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        // If the transition to the center is complete, emit an event.
        if (this._isCenterPosition(e.toState) && this._isCenterPosition(this._position)) {
            this._onCentered.emit();
        }
        if (this._isCenterPosition(e.fromState) && !this._isCenterPosition(this._position)) {
            this._afterLeavingCenter.emit();
        }
    };
    /** The text direction of the containing app. */
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    MatTabBody.prototype._getLayoutDirection = /**
     * The text direction of the containing app.
     * @return {?}
     */
    function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Whether the provided position state is considered center, regardless of origin. */
    /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    MatTabBody.prototype._isCenterPosition = /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    function (position) {
        return position == 'center' ||
            position == 'left-origin-center' ||
            position == 'right-origin-center';
    };
    MatTabBody.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-tab-body',
                    template: "<div class=\"mat-tab-body-content\" #content [@translateTab]=\"_position\" (@translateTab.start)=\"_onTranslateTabStarted($event)\" (@translateTab.done)=\"_onTranslateTabComplete($event)\"><ng-template matTabBodyHost></ng-template></div>",
                    styles: [".mat-tab-body-content{-webkit-backface-visibility:hidden;backface-visibility:hidden;height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}"],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'mat-tab-body',
                    },
                    animations: [
                        _angular_animations.trigger('translateTab', [
                            // Note: transitions to `none` instead of 0, because some browsers might blur the content.
                            _angular_animations.state('center, void, left-origin-center, right-origin-center', _angular_animations.style({ transform: 'none' })),
                            _angular_animations.state('left', _angular_animations.style({ transform: 'translate3d(-100%, 0, 0)' })),
                            _angular_animations.state('right', _angular_animations.style({ transform: 'translate3d(100%, 0, 0)' })),
                            _angular_animations.transition('* => left, * => right, left => center, right => center', _angular_animations.animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
                            _angular_animations.transition('void => left-origin-center', [
                                _angular_animations.style({ transform: 'translate3d(-100%, 0, 0)' }),
                                _angular_animations.animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
                            ]),
                            _angular_animations.transition('void => right-origin-center', [
                                _angular_animations.style({ transform: 'translate3d(100%, 0, 0)' }),
                                _angular_animations.animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    MatTabBody.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_cdk_bidi.Directionality, decorators: [{ type: _angular_core.Optional },] },
    ]; };
    MatTabBody.propDecorators = {
        "_onCentering": [{ type: _angular_core.Output },],
        "_beforeCentering": [{ type: _angular_core.Output },],
        "_afterLeavingCenter": [{ type: _angular_core.Output },],
        "_onCentered": [{ type: _angular_core.Output },],
        "_content": [{ type: _angular_core.Input, args: ['content',] },],
        "position": [{ type: _angular_core.Input, args: ['position',] },],
        "origin": [{ type: _angular_core.Input, args: ['origin',] },],
    };
    return MatTabBody;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Used to generate unique ID's for each tab component
 */
var nextId = 0;
/**
 * A simple change event emitted on focus or selection changes.
 */
var MatTabChangeEvent = /** @class */ (function () {
    function MatTabChangeEvent() {
    }
    return MatTabChangeEvent;
}());
/**
 * \@docs-private
 */
var MatTabGroupBase = /** @class */ (function () {
    function MatTabGroupBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatTabGroupBase;
}());
var _MatTabGroupMixinBase = _angular_material_core.mixinColor(_angular_material_core.mixinDisableRipple(MatTabGroupBase), 'primary');
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
var MatTabGroup = /** @class */ (function (_super) {
    __extends(MatTabGroup, _super);
    function MatTabGroup(elementRef, _changeDetectorRef) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        /**
         * The tab index that should be selected after the content has been checked.
         */
        _this._indexToSelect = 0;
        /**
         * Snapshot of the height of the tab body wrapper before another tab is activated.
         */
        _this._tabBodyWrapperHeight = 0;
        /**
         * Subscription to tabs being added/removed.
         */
        _this._tabsSubscription = rxjs_Subscription.Subscription.EMPTY;
        /**
         * Subscription to changes in the tab labels.
         */
        _this._tabLabelSubscription = rxjs_Subscription.Subscription.EMPTY;
        _this._dynamicHeight = false;
        _this._selectedIndex = null;
        /**
         * Position of the tab header.
         */
        _this.headerPosition = 'above';
        /**
         * Output to enable support for two-way binding on `[(selectedIndex)]`
         */
        _this.selectedIndexChange = new _angular_core.EventEmitter();
        /**
         * Event emitted when focus has changed within a tab group.
         */
        _this.focusChange = new _angular_core.EventEmitter();
        /**
         * Event emitted when the tab selection has changed.
         */
        _this.selectedTabChange = new _angular_core.EventEmitter(true);
        /**
         * Event emitted when the tab selection has changed.
         * @deprecated Use `selectedTabChange` instead.
         */
        _this.selectChange = _this.selectedTabChange;
        _this._groupId = nextId++;
        return _this;
    }
    Object.defineProperty(MatTabGroup.prototype, "dynamicHeight", {
        get: /**
         * Whether the tab group should grow to the size of the active tab.
         * @return {?}
         */
        function () { return this._dynamicHeight; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._dynamicHeight = _angular_cdk_coercion.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabGroup.prototype, "_dynamicHeightDeprecated", {
        get: /**
         * @deprecated
         * @return {?}
         */
        function () { return this._dynamicHeight; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._dynamicHeight = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabGroup.prototype, "selectedIndex", {
        get: /**
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * The index of the active tab.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._indexToSelect = _angular_cdk_coercion.coerceNumberProperty(value, null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabGroup.prototype, "backgroundColor", {
        get: /**
         * Background color of the tab group.
         * @return {?}
         */
        function () { return this._backgroundColor; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ nativeElement = this._elementRef.nativeElement;
            nativeElement.classList.remove("mat-background-" + this.backgroundColor);
            if (value) {
                nativeElement.classList.add("mat-background-" + value);
            }
            this._backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    MatTabGroup.prototype.ngAfterContentChecked = /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    function () {
        var _this = this;
        // Clamp the next selected index to the boundsof 0 and the tabs length.
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Math.max(NaN, 0) === NaN).
        var /** @type {?} */ indexToSelect = this._indexToSelect =
            Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex != indexToSelect && this._selectedIndex != null) {
            var /** @type {?} */ tabChangeEvent = this._createChangeEvent(indexToSelect);
            this.selectedTabChange.emit(tabChangeEvent);
            // Emitting this value after change detection has run
            // since the checked content may contain this variable'
            Promise.resolve().then(function () { return _this.selectedIndexChange.emit(indexToSelect); });
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this._tabs.forEach(function (tab, index) {
            tab.position = index - indexToSelect;
            tab.isActive = index === indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (_this._selectedIndex != null && tab.position == 0 && !tab.origin) {
                tab.origin = indexToSelect - _this._selectedIndex;
            }
        });
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    MatTabGroup.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this._tabsSubscription = this._tabs.changes.subscribe(function () {
            _this._subscribeToTabLabels();
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * @return {?}
     */
    MatTabGroup.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._tabsSubscription.unsubscribe();
        this._tabLabelSubscription.unsubscribe();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MatTabGroup.prototype._focusChanged = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.focusChange.emit(this._createChangeEvent(index));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MatTabGroup.prototype._createChangeEvent = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ event = new MatTabChangeEvent;
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    };
    /**
     * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
     * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     * @return {?}
     */
    MatTabGroup.prototype._subscribeToTabLabels = /**
     * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
     * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._tabLabelSubscription) {
            this._tabLabelSubscription.unsubscribe();
        }
        this._tabLabelSubscription = rxjs_observable_merge.merge.apply(void 0, this._tabs.map(function (tab) { return tab._disableChange; }).concat(this._tabs.map(function (tab) { return tab._labelChange; }))).subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
    };
    /** Returns a unique id for each tab label element */
    /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    MatTabGroup.prototype._getTabLabelId = /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "mat-tab-label-" + this._groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    MatTabGroup.prototype._getTabContentId = /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "mat-tab-content-" + this._groupId + "-" + i;
    };
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    MatTabGroup.prototype._setTabBodyWrapperHeight = /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    function (tabHeight) {
        if (!this._dynamicHeight || !this._tabBodyWrapperHeight) {
            return;
        }
        var /** @type {?} */ wrapper = this._tabBodyWrapper.nativeElement;
        wrapper.style.height = this._tabBodyWrapperHeight + 'px';
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this._tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = tabHeight + 'px';
        }
    };
    /** Removes the height of the tab body wrapper. */
    /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    MatTabGroup.prototype._removeTabBodyWrapperHeight = /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    function () {
        this._tabBodyWrapperHeight = this._tabBodyWrapper.nativeElement.clientHeight;
        this._tabBodyWrapper.nativeElement.style.height = '';
    };
    /** Handle click events, setting new selected index if appropriate. */
    /**
     * Handle click events, setting new selected index if appropriate.
     * @param {?} tab
     * @param {?} tabHeader
     * @param {?} idx
     * @return {?}
     */
    MatTabGroup.prototype._handleClick = /**
     * Handle click events, setting new selected index if appropriate.
     * @param {?} tab
     * @param {?} tabHeader
     * @param {?} idx
     * @return {?}
     */
    function (tab, tabHeader, idx) {
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = idx;
        }
    };
    /** Retrieves the tabindex for the tab. */
    /**
     * Retrieves the tabindex for the tab.
     * @param {?} tab
     * @param {?} idx
     * @return {?}
     */
    MatTabGroup.prototype._getTabIndex = /**
     * Retrieves the tabindex for the tab.
     * @param {?} tab
     * @param {?} idx
     * @return {?}
     */
    function (tab, idx) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === idx ? 0 : -1;
    };
    MatTabGroup.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-tab-group',
                    exportAs: 'matTabGroup',
                    template: "<mat-tab-header #tabHeader [selectedIndex]=\"selectedIndex\" [disableRipple]=\"disableRipple\" (indexFocused)=\"_focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"><div class=\"mat-tab-label\" role=\"tab\" matTabLabelWrapper mat-ripple *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [attr.tabIndex]=\"_getTabIndex(tab, i)\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.mat-tab-label-active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" [matRippleDisabled]=\"tab.disabled || disableRipple\" (click)=\"_handleClick(tab, tabHeader, i)\"><ng-template [ngIf]=\"tab.templateLabel\"><ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template></ng-template><ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template></div></mat-tab-header><div class=\"mat-tab-body-wrapper\" #tabBodyWrapper><mat-tab-body role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [attr.aria-labelledby]=\"_getTabLabelId(i)\" [class.mat-tab-body-active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" (_onCentered)=\"_removeTabBodyWrapperHeight()\" (_onCentering)=\"_setTabBodyWrapperHeight($event)\"></mat-tab-body></div>",
                    styles: [".mat-tab-group{display:flex;flex-direction:column}.mat-tab-group.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0;opacity:1}.mat-tab-label.mat-tab-disabled{cursor:default}@media (max-width:600px){.mat-tab-label{padding:0 12px}}@media (max-width:960px){.mat-tab-label{padding:0 12px}}.mat-tab-group[mat-stretch-tabs] .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}.mat-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-tab-group.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}"],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    inputs: ['color', 'disableRipple'],
                    host: {
                        'class': 'mat-tab-group',
                        '[class.mat-tab-group-dynamic-height]': 'dynamicHeight',
                        '[class.mat-tab-group-inverted-header]': 'headerPosition === "below"',
                    },
                },] },
    ];
    /** @nocollapse */
    MatTabGroup.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    MatTabGroup.propDecorators = {
        "_tabs": [{ type: _angular_core.ContentChildren, args: [MatTab,] },],
        "_tabBodyWrapper": [{ type: _angular_core.ViewChild, args: ['tabBodyWrapper',] },],
        "dynamicHeight": [{ type: _angular_core.Input },],
        "_dynamicHeightDeprecated": [{ type: _angular_core.Input, args: ['mat-dynamic-height',] },],
        "selectedIndex": [{ type: _angular_core.Input },],
        "headerPosition": [{ type: _angular_core.Input },],
        "backgroundColor": [{ type: _angular_core.Input },],
        "selectedIndexChange": [{ type: _angular_core.Output },],
        "focusChange": [{ type: _angular_core.Output },],
        "selectedTabChange": [{ type: _angular_core.Output },],
        "selectChange": [{ type: _angular_core.Output },],
    };
    return MatTabGroup;
}(_MatTabGroupMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
var MatTabLabelWrapperBase = /** @class */ (function () {
    function MatTabLabelWrapperBase() {
    }
    return MatTabLabelWrapperBase;
}());
var _MatTabLabelWrapperMixinBase = _angular_material_core.mixinDisabled(MatTabLabelWrapperBase);
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * \@docs-private
 */
var MatTabLabelWrapper = /** @class */ (function (_super) {
    __extends(MatTabLabelWrapper, _super);
    function MatTabLabelWrapper(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** Sets focus on the wrapper element */
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    MatTabLabelWrapper.prototype.focus = /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MatTabLabelWrapper.prototype.getOffsetLeft = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    /**
     * @return {?}
     */
    MatTabLabelWrapper.prototype.getOffsetWidth = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    MatTabLabelWrapper.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mat-tab-disabled]': 'disabled'
                    }
                },] },
    ];
    /** @nocollapse */
    MatTabLabelWrapper.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
    ]; };
    return MatTabLabelWrapper;
}(_MatTabLabelWrapperMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
var EXAGGERATED_OVERSCROLL = 60;
/**
 * \@docs-private
 */
var MatTabHeaderBase = /** @class */ (function () {
    function MatTabHeaderBase() {
    }
    return MatTabHeaderBase;
}());
var _MatTabHeaderMixinBase = _angular_material_core.mixinDisableRipple(MatTabHeaderBase);
/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * \@docs-private
 */
var MatTabHeader = /** @class */ (function (_super) {
    __extends(MatTabHeader, _super);
    function MatTabHeader(_elementRef, _changeDetectorRef, _viewportRuler, _dir) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._viewportRuler = _viewportRuler;
        _this._dir = _dir;
        /**
         * The tab index that is focused.
         */
        _this._focusIndex = 0;
        /**
         * The distance in pixels that the tab labels should be translated to the left.
         */
        _this._scrollDistance = 0;
        /**
         * Whether the header should scroll to the selected index after the view has been checked.
         */
        _this._selectedIndexChanged = false;
        /**
         * Combines listeners that will re-align the ink bar whenever they're invoked.
         */
        _this._realignInkBar = rxjs_Subscription.Subscription.EMPTY;
        /**
         * Whether the controls for pagination should be displayed
         */
        _this._showPaginationControls = false;
        /**
         * Whether the tab list can be scrolled more towards the end of the tab label list.
         */
        _this._disableScrollAfter = true;
        /**
         * Whether the tab list can be scrolled more towards the beginning of the tab label list.
         */
        _this._disableScrollBefore = true;
        _this._selectedIndex = 0;
        /**
         * Event emitted when the option is selected.
         */
        _this.selectFocusedIndex = new _angular_core.EventEmitter();
        /**
         * Event emitted when a label is focused.
         */
        _this.indexFocused = new _angular_core.EventEmitter();
        return _this;
    }
    Object.defineProperty(MatTabHeader.prototype, "selectedIndex", {
        get: /**
         * The index of the active tab.
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = _angular_cdk_coercion.coerceNumberProperty(value);
            this._selectedIndexChanged = this._selectedIndex != value;
            this._selectedIndex = value;
            this._focusIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatTabHeader.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this._tabLabelCount != this._labelWrappers.length) {
            this._updatePagination();
            this._tabLabelCount = this._labelWrappers.length;
            this._changeDetectorRef.markForCheck();
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this._selectedIndexChanged) {
            this._scrollToLabel(this._selectedIndex);
            this._checkScrollingControls();
            this._alignInkBarToSelectedTab();
            this._selectedIndexChanged = false;
            this._changeDetectorRef.markForCheck();
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this._scrollDistanceChanged) {
            this._updateTabScrollPosition();
            this._scrollDistanceChanged = false;
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatTabHeader.prototype._handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case _angular_cdk_keycodes.RIGHT_ARROW:
                this._focusNextTab();
                break;
            case _angular_cdk_keycodes.LEFT_ARROW:
                this._focusPreviousTab();
                break;
            case _angular_cdk_keycodes.ENTER:
            case _angular_cdk_keycodes.SPACE:
                this.selectFocusedIndex.emit(this.focusIndex);
                event.preventDefault();
                break;
        }
    };
    /**
     * Aligns the ink bar to the selected tab on load.
     */
    /**
     * Aligns the ink bar to the selected tab on load.
     * @return {?}
     */
    MatTabHeader.prototype.ngAfterContentInit = /**
     * Aligns the ink bar to the selected tab on load.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ dirChange = this._dir ? this._dir.change : rxjs_observable_of.of(null);
        var /** @type {?} */ resize = this._viewportRuler.change(150);
        var /** @type {?} */ realign = function () {
            _this._updatePagination();
            _this._alignInkBarToSelectedTab();
        };
        // Defer the first call in order to allow for slower browsers to lay out the elements.
        // This helps in cases where the user lands directly on a page with paginated tabs.
        typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame(realign) : realign();
        this._realignInkBar = rxjs_observable_merge.merge(dirChange, resize).subscribe(realign);
    };
    /**
     * @return {?}
     */
    MatTabHeader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._realignInkBar.unsubscribe();
    };
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    MatTabHeader.prototype._onContentChanges = /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    function () {
        this._updatePagination();
        this._alignInkBarToSelectedTab();
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Updating the view whether pagination should be enabled or not
     */
    /**
     * Updating the view whether pagination should be enabled or not
     * @return {?}
     */
    MatTabHeader.prototype._updatePagination = /**
     * Updating the view whether pagination should be enabled or not
     * @return {?}
     */
    function () {
        this._checkPaginationEnabled();
        this._checkScrollingControls();
        this._updateTabScrollPosition();
    };
    Object.defineProperty(MatTabHeader.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: /**
         * Tracks which element has focus; used for keyboard navigation
         * @return {?}
         */
        function () { return this._focusIndex; },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: /**
         * When the focus index is set, we must manually send focus to the correct label
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._isValidIndex(value) || this._focusIndex == value) {
                return;
            }
            this._focusIndex = value;
            this.indexFocused.emit(value);
            this._setTabFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    MatTabHeader.prototype._isValidIndex = /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (!this._labelWrappers) {
            return true;
        }
        var /** @type {?} */ tab = this._labelWrappers ? this._labelWrappers.toArray()[index] : null;
        return !!tab && !tab.disabled;
    };
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    MatTabHeader.prototype._setTabFocus = /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    function (tabIndex) {
        if (this._showPaginationControls) {
            this._scrollToLabel(tabIndex);
        }
        if (this._labelWrappers && this._labelWrappers.length) {
            this._labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            var /** @type {?} */ containerEl = this._tabListContainer.nativeElement;
            var /** @type {?} */ dir = this._getLayoutDirection();
            if (dir == 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    };
    /**
     * Moves the focus towards the beginning or the end of the list depending on the offset provided.
     * Valid offsets are 1 and -1.
     */
    /**
     * Moves the focus towards the beginning or the end of the list depending on the offset provided.
     * Valid offsets are 1 and -1.
     * @param {?} offset
     * @return {?}
     */
    MatTabHeader.prototype._moveFocus = /**
     * Moves the focus towards the beginning or the end of the list depending on the offset provided.
     * Valid offsets are 1 and -1.
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        if (this._labelWrappers) {
            var /** @type {?} */ tabs = this._labelWrappers.toArray();
            for (var /** @type {?} */ i = this.focusIndex + offset; i < tabs.length && i >= 0; i += offset) {
                if (this._isValidIndex(i)) {
                    this.focusIndex = i;
                    return;
                }
            }
        }
    };
    /** Increment the focus index by 1 until a valid tab is found. */
    /**
     * Increment the focus index by 1 until a valid tab is found.
     * @return {?}
     */
    MatTabHeader.prototype._focusNextTab = /**
     * Increment the focus index by 1 until a valid tab is found.
     * @return {?}
     */
    function () {
        this._moveFocus(this._getLayoutDirection() == 'ltr' ? 1 : -1);
    };
    /** Decrement the focus index by 1 until a valid tab is found. */
    /**
     * Decrement the focus index by 1 until a valid tab is found.
     * @return {?}
     */
    MatTabHeader.prototype._focusPreviousTab = /**
     * Decrement the focus index by 1 until a valid tab is found.
     * @return {?}
     */
    function () {
        this._moveFocus(this._getLayoutDirection() == 'ltr' ? -1 : 1);
    };
    /** The layout direction of the containing app. */
    /**
     * The layout direction of the containing app.
     * @return {?}
     */
    MatTabHeader.prototype._getLayoutDirection = /**
     * The layout direction of the containing app.
     * @return {?}
     */
    function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    MatTabHeader.prototype._updateTabScrollPosition = /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    function () {
        var /** @type {?} */ scrollDistance = this.scrollDistance;
        var /** @type {?} */ translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
        this._tabList.nativeElement.style.transform = "translate3d(" + translateX + "px, 0, 0)";
    };
    Object.defineProperty(MatTabHeader.prototype, "scrollDistance", {
        get: /**
         * @return {?}
         */
        function () { return this._scrollDistance; },
        /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        set: /**
         * Sets the distance in pixels that the tab header should be transformed in the X-axis.
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), v));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this._scrollDistanceChanged = true;
            this._checkScrollingControls();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} scrollDir
     * @return {?}
     */
    MatTabHeader.prototype._scrollHeader = /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} scrollDir
     * @return {?}
     */
    function (scrollDir) {
        var /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance += (scrollDir == 'before' ? -1 : 1) * viewLength / 3;
    };
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    MatTabHeader.prototype._scrollToLabel = /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    function (labelIndex) {
        var /** @type {?} */ selectedLabel = this._labelWrappers ? this._labelWrappers.toArray()[labelIndex] : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        var /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        var /** @type {?} */ labelBeforePos, /** @type {?} */ labelAfterPos;
        if (this._getLayoutDirection() == 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos = this._tabList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        var /** @type {?} */ beforeVisiblePos = this.scrollDistance;
        var /** @type {?} */ afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    };
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    MatTabHeader.prototype._checkPaginationEnabled = /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        var /** @type {?} */ isEnabled = this._tabList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
        if (!isEnabled) {
            this.scrollDistance = 0;
        }
        if (isEnabled !== this._showPaginationControls) {
            this._changeDetectorRef.markForCheck();
        }
        this._showPaginationControls = isEnabled;
    };
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    MatTabHeader.prototype._checkScrollingControls = /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        // Check if the pagination arrows should be activated.
        this._disableScrollBefore = this.scrollDistance == 0;
        this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    MatTabHeader.prototype._getMaxScrollDistance = /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        var /** @type {?} */ lengthOfTabList = this._tabList.nativeElement.scrollWidth;
        var /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        return (lengthOfTabList - viewLength) || 0;
    };
    /**
     * Tells the ink-bar to align itself to the current label wrapper
     * @return {?}
     */
    MatTabHeader.prototype._alignInkBarToSelectedTab = /**
     * Tells the ink-bar to align itself to the current label wrapper
     * @return {?}
     */
    function () {
        var /** @type {?} */ selectedLabelWrapper = this._labelWrappers && this._labelWrappers.length ?
            this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement :
            null;
        this._inkBar.alignToElement(selectedLabelWrapper);
    };
    MatTabHeader.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-tab-header',
                    template: "<div class=\"mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4\" aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollBefore\" (click)=\"_scrollHeader('before')\"><div class=\"mat-tab-header-pagination-chevron\"></div></div><div class=\"mat-tab-label-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\"><div class=\"mat-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"_onContentChanges()\"><div class=\"mat-tab-labels\"><ng-content></ng-content></div><mat-ink-bar></mat-ink-bar></div></div><div class=\"mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4\" aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollAfter\" (click)=\"_scrollHeader('after')\"><div class=\"mat-tab-header-pagination-chevron\"></div></div>",
                    styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0;opacity:1}.mat-tab-label.mat-tab-disabled{cursor:default}@media (max-width:600px){.mat-tab-label{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}.mat-tab-header-pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-labels{display:flex}"],
                    inputs: ['disableRipple'],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'mat-tab-header',
                        '[class.mat-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                        '[class.mat-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                    },
                },] },
    ];
    /** @nocollapse */
    MatTabHeader.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: _angular_cdk_scrolling.ViewportRuler, },
        { type: _angular_cdk_bidi.Directionality, decorators: [{ type: _angular_core.Optional },] },
    ]; };
    MatTabHeader.propDecorators = {
        "_labelWrappers": [{ type: _angular_core.ContentChildren, args: [MatTabLabelWrapper,] },],
        "_inkBar": [{ type: _angular_core.ViewChild, args: [MatInkBar,] },],
        "_tabListContainer": [{ type: _angular_core.ViewChild, args: ['tabListContainer',] },],
        "_tabList": [{ type: _angular_core.ViewChild, args: ['tabList',] },],
        "selectedIndex": [{ type: _angular_core.Input },],
        "selectFocusedIndex": [{ type: _angular_core.Output },],
        "indexFocused": [{ type: _angular_core.Output },],
    };
    return MatTabHeader;
}(_MatTabHeaderMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@docs-private
 */
var MatTabNavBase = /** @class */ (function () {
    function MatTabNavBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatTabNavBase;
}());
var _MatTabNavMixinBase = _angular_material_core.mixinDisableRipple(_angular_material_core.mixinColor(MatTabNavBase, 'primary'));
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
var MatTabNav = /** @class */ (function (_super) {
    __extends(MatTabNav, _super);
    function MatTabNav(elementRef, _dir, _ngZone, _changeDetectorRef, _viewportRuler) {
        var _this = _super.call(this, elementRef) || this;
        _this._dir = _dir;
        _this._ngZone = _ngZone;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._viewportRuler = _viewportRuler;
        /**
         * Subject that emits when the component has been destroyed.
         */
        _this._onDestroy = new rxjs_Subject.Subject();
        _this._disableRipple = false;
        return _this;
    }
    Object.defineProperty(MatTabNav.prototype, "backgroundColor", {
        get: /**
         * Background color of the tab nav.
         * @return {?}
         */
        function () { return this._backgroundColor; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ nativeElement = this._elementRef.nativeElement;
            nativeElement.classList.remove("mat-background-" + this.backgroundColor);
            if (value) {
                nativeElement.classList.add("mat-background-" + value);
            }
            this._backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabNav.prototype, "disableRipple", {
        /** Whether ripples should be disabled for all links or not. */
        get: /**
         * Whether ripples should be disabled for all links or not.
         * @return {?}
         */
        function () { return this._disableRipple; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disableRipple = _angular_cdk_coercion.coerceBooleanProperty(value);
            this._setLinkDisableRipple();
        },
        enumerable: true,
        configurable: true
    });
    /** Notifies the component that the active link has been changed. */
    /**
     * Notifies the component that the active link has been changed.
     * @param {?} element
     * @return {?}
     */
    MatTabNav.prototype.updateActiveLink = /**
     * Notifies the component that the active link has been changed.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        this._activeLinkChanged = this._activeLinkElement != element;
        this._activeLinkElement = element;
        if (this._activeLinkChanged) {
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    MatTabNav.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            var /** @type {?} */ dirChange = _this._dir ? _this._dir.change : rxjs_observable_of.of(null);
            return rxjs_observable_merge.merge(dirChange, _this._viewportRuler.change(10)).pipe(rxjs_operators_takeUntil.takeUntil(_this._onDestroy))
                .subscribe(function () { return _this._alignInkBar(); });
        });
        this._setLinkDisableRipple();
    };
    /** Checks if the active link has been changed and, if so, will update the ink bar. */
    /**
     * Checks if the active link has been changed and, if so, will update the ink bar.
     * @return {?}
     */
    MatTabNav.prototype.ngAfterContentChecked = /**
     * Checks if the active link has been changed and, if so, will update the ink bar.
     * @return {?}
     */
    function () {
        if (this._activeLinkChanged) {
            this._alignInkBar();
            this._activeLinkChanged = false;
        }
    };
    /**
     * @return {?}
     */
    MatTabNav.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Aligns the ink bar to the active link. */
    /**
     * Aligns the ink bar to the active link.
     * @return {?}
     */
    MatTabNav.prototype._alignInkBar = /**
     * Aligns the ink bar to the active link.
     * @return {?}
     */
    function () {
        if (this._activeLinkElement) {
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
        }
    };
    /**
     * Sets the `disableRipple` property on each link of the navigation bar.
     * @return {?}
     */
    MatTabNav.prototype._setLinkDisableRipple = /**
     * Sets the `disableRipple` property on each link of the navigation bar.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._tabLinks) {
            this._tabLinks.forEach(function (link) { return link.disableRipple = _this.disableRipple; });
        }
    };
    MatTabNav.decorators = [
        { type: _angular_core.Component, args: [{selector: '[mat-tab-nav-bar]',
                    exportAs: 'matTabNavBar, matTabNav',
                    inputs: ['color', 'disableRipple'],
                    template: "<div class=\"mat-tab-links\" (cdkObserveContent)=\"_alignInkBar()\"><ng-content></ng-content><mat-ink-bar></mat-ink-bar></div>",
                    styles: [".mat-tab-nav-bar{overflow:hidden;position:relative;flex-shrink:0}.mat-tab-links{position:relative}.mat-tab-link{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;vertical-align:top;text-decoration:none;position:relative;overflow:hidden}.mat-tab-link:focus{outline:0;opacity:1}.mat-tab-link.mat-tab-disabled{cursor:default}@media (max-width:600px){.mat-tab-link{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}"],
                    host: { 'class': 'mat-tab-nav-bar' },
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatTabNav.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_cdk_bidi.Directionality, decorators: [{ type: _angular_core.Optional },] },
        { type: _angular_core.NgZone, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: _angular_cdk_scrolling.ViewportRuler, },
    ]; };
    MatTabNav.propDecorators = {
        "_inkBar": [{ type: _angular_core.ViewChild, args: [MatInkBar,] },],
        "_tabLinks": [{ type: _angular_core.ContentChildren, args: [_angular_core.forwardRef(function () { return MatTabLink; }), { descendants: true },] },],
        "backgroundColor": [{ type: _angular_core.Input },],
    };
    return MatTabNav;
}(_MatTabNavMixinBase));
var MatTabLinkBase = /** @class */ (function () {
    function MatTabLinkBase() {
    }
    return MatTabLinkBase;
}());
var _MatTabLinkMixinBase = _angular_material_core.mixinTabIndex(_angular_material_core.mixinDisableRipple(_angular_material_core.mixinDisabled(MatTabLinkBase)));
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
var MatTabLink = /** @class */ (function (_super) {
    __extends(MatTabLink, _super);
    function MatTabLink(_tabNavBar, _elementRef, ngZone, platform, globalOptions, tabIndex) {
        var _this = _super.call(this) || this;
        _this._tabNavBar = _tabNavBar;
        _this._elementRef = _elementRef;
        /**
         * Whether the tab link is active or not.
         */
        _this._isActive = false;
        /**
         * Ripple configuration for ripples that are launched on pointer down.
         * \@docs-private
         */
        _this.rippleConfig = {};
        _this._tabLinkRipple = new _angular_material_core.RippleRenderer(_this, ngZone, _elementRef, platform);
        _this._tabLinkRipple.setupTriggerEvents(_elementRef.nativeElement);
        _this.tabIndex = parseInt(tabIndex) || 0;
        if (globalOptions) {
            _this.rippleConfig = { speedFactor: globalOptions.baseSpeedFactor };
        }
        return _this;
    }
    Object.defineProperty(MatTabLink.prototype, "active", {
        get: /**
         * Whether the link is active.
         * @return {?}
         */
        function () { return this._isActive; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isActive = value;
            if (value) {
                this._tabNavBar.updateActiveLink(this._elementRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabLink.prototype, "rippleDisabled", {
        /**
         * Whether ripples are disabled on interaction
         * @docs-private
         */
        get: /**
         * Whether ripples are disabled on interaction
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.disabled || this.disableRipple;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatTabLink.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._tabLinkRipple._removeTriggerEvents();
    };
    MatTabLink.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[mat-tab-link], [matTabLink]',
                    exportAs: 'matTabLink',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    host: {
                        'class': 'mat-tab-link',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.tabIndex]': 'tabIndex',
                        '[class.mat-tab-disabled]': 'disabled',
                        '[class.mat-tab-label-active]': 'active',
                    }
                },] },
    ];
    /** @nocollapse */
    MatTabLink.ctorParameters = function () { return [
        { type: MatTabNav, },
        { type: _angular_core.ElementRef, },
        { type: _angular_core.NgZone, },
        { type: _angular_cdk_platform.Platform, },
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [_angular_material_core.MAT_RIPPLE_GLOBAL_OPTIONS,] },] },
        { type: undefined, decorators: [{ type: _angular_core.Attribute, args: ['tabindex',] },] },
    ]; };
    MatTabLink.propDecorators = {
        "active": [{ type: _angular_core.Input },],
    };
    return MatTabLink;
}(_MatTabLinkMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatTabsModule = /** @class */ (function () {
    function MatTabsModule() {
    }
    MatTabsModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule,
                        _angular_material_core.MatCommonModule,
                        _angular_cdk_portal.PortalModule,
                        _angular_material_core.MatRippleModule,
                        _angular_cdk_observers.ObserversModule,
                        _angular_cdk_scrolling.ScrollDispatchModule,
                    ],
                    // Don't export all components because some are only to be used internally.
                    exports: [
                        _angular_material_core.MatCommonModule,
                        MatTabGroup,
                        MatTabLabel,
                        MatTab,
                        MatTabNav,
                        MatTabLink,
                    ],
                    declarations: [
                        MatTabGroup,
                        MatTabLabel,
                        MatTab,
                        MatInkBar,
                        MatTabLabelWrapper,
                        MatTabNav,
                        MatTabLink,
                        MatTabBody,
                        MatTabBodyPortal,
                        MatTabHeader
                    ],
                    providers: [_angular_cdk_scrolling.VIEWPORT_RULER_PROVIDER],
                },] },
    ];
    /** @nocollapse */
    MatTabsModule.ctorParameters = function () { return []; };
    return MatTabsModule;
}());

exports.MatInkBar = MatInkBar;
exports.MatTabBody = MatTabBody;
exports.MatTabBodyPortal = MatTabBodyPortal;
exports.MatTabHeader = MatTabHeader;
exports.MatTabLabelWrapper = MatTabLabelWrapper;
exports.MatTab = MatTab;
exports.MatTabLabel = MatTabLabel;
exports.MatTabNav = MatTabNav;
exports.MatTabLink = MatTabLink;
exports.MatTabsModule = MatTabsModule;
exports.MatTabChangeEvent = MatTabChangeEvent;
exports.MatTabGroupBase = MatTabGroupBase;
exports._MatTabGroupMixinBase = _MatTabGroupMixinBase;
exports.MatTabGroup = MatTabGroup;
exports.ɵe22 = MatTabBase;
exports.ɵf22 = _MatTabMixinBase;
exports.ɵa22 = MatTabHeaderBase;
exports.ɵb22 = _MatTabHeaderMixinBase;
exports.ɵc22 = MatTabLabelWrapperBase;
exports.ɵd22 = _MatTabLabelWrapperMixinBase;
exports.ɵi22 = MatTabLinkBase;
exports.ɵg22 = MatTabNavBase;
exports.ɵj22 = _MatTabLinkMixinBase;
exports.ɵh22 = _MatTabNavMixinBase;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-tabs.umd.js.map
