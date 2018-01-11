/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('@angular/animations'), require('@angular/cdk/table'), require('rxjs/observable/merge'), require('@angular/material/core'), require('rxjs/Subject'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/coercion', '@angular/animations', '@angular/cdk/table', 'rxjs/observable/merge', '@angular/material/core', 'rxjs/Subject', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.sort = global.ng.material.sort || {}),global.ng.core,global.ng.cdk.coercion,global.ng.animations,global.ng.cdk.table,global.Rx.Observable,global.ng.material.core,global.Rx,global.ng.common));
}(this, (function (exports,_angular_core,_angular_cdk_coercion,_angular_animations,_angular_cdk_table,rxjs_observable_merge,_angular_material_core,rxjs_Subject,_angular_common) { 'use strict';

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
 * \@docs-private
 * @param {?} id
 * @return {?}
 */
function getSortDuplicateSortableIdError(id) {
    return Error("Cannot have two MatSortables with the same id (" + id + ").");
}
/**
 * \@docs-private
 * @return {?}
 */
function getSortHeaderNotContainedWithinSortError() {
    return Error("MatSortHeader must be placed within a parent element with the MatSort directive.");
}
/**
 * \@docs-private
 * @return {?}
 */
function getSortHeaderMissingIdError() {
    return Error("MatSortHeader must be provided with a unique id.");
}
/**
 * \@docs-private
 * @param {?} direction
 * @return {?}
 */
function getSortInvalidDirectionError(direction) {
    return Error(direction + " is not a valid sort direction ('asc' or 'desc').");
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Interface for a directive that holds sorting state consumed by `MatSortHeader`.
 * @record
 */

/**
 * The current sort state.
 * @record
 */

/**
 * \@docs-private
 */
var MatSortBase = /** @class */ (function () {
    function MatSortBase() {
    }
    return MatSortBase;
}());
var _MatSortMixinBase = _angular_material_core.mixinDisabled(MatSortBase);
/**
 * Container for MatSortables to manage the sort state and provide default sort parameters.
 */
var MatSort = /** @class */ (function (_super) {
    __extends(MatSort, _super);
    function MatSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Collection of all registered sortables that this directive manages.
         */
        _this.sortables = new Map();
        /**
         * Used to notify any child components listening to state changes.
         */
        _this._stateChanges = new rxjs_Subject.Subject();
        /**
         * The direction to set when an MatSortable is initially sorted.
         * May be overriden by the MatSortable's sort start.
         */
        _this.start = 'asc';
        _this._direction = '';
        /**
         * Event emitted when the user changes either the active sort or sort direction.
         */
        _this.sortChange = new _angular_core.EventEmitter();
        return _this;
    }
    Object.defineProperty(MatSort.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () { return this._direction; },
        set: /**
         * The sort direction of the currently active MatSortable.
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            if (_angular_core.isDevMode() && direction && direction !== 'asc' && direction !== 'desc') {
                throw getSortInvalidDirectionError(direction);
            }
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSort.prototype, "disableClear", {
        get: /**
         * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
         * May be overriden by the MatSortable's disable clear input.
         * @return {?}
         */
        function () { return this._disableClear; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) { this._disableClear = _angular_cdk_coercion.coerceBooleanProperty(v); },
        enumerable: true,
        configurable: true
    });
    /**
     * Register function to be used by the contained MatSortables. Adds the MatSortable to the
     * collection of MatSortables.
     */
    /**
     * Register function to be used by the contained MatSortables. Adds the MatSortable to the
     * collection of MatSortables.
     * @param {?} sortable
     * @return {?}
     */
    MatSort.prototype.register = /**
     * Register function to be used by the contained MatSortables. Adds the MatSortable to the
     * collection of MatSortables.
     * @param {?} sortable
     * @return {?}
     */
    function (sortable) {
        if (!sortable.id) {
            throw getSortHeaderMissingIdError();
        }
        if (this.sortables.has(sortable.id)) {
            throw getSortDuplicateSortableIdError(sortable.id);
        }
        this.sortables.set(sortable.id, sortable);
    };
    /**
     * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
     * collection of contained MatSortables.
     */
    /**
     * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
     * collection of contained MatSortables.
     * @param {?} sortable
     * @return {?}
     */
    MatSort.prototype.deregister = /**
     * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
     * collection of contained MatSortables.
     * @param {?} sortable
     * @return {?}
     */
    function (sortable) {
        this.sortables.delete(sortable.id);
    };
    /** Sets the active sort id and determines the new sort direction. */
    /**
     * Sets the active sort id and determines the new sort direction.
     * @param {?} sortable
     * @return {?}
     */
    MatSort.prototype.sort = /**
     * Sets the active sort id and determines the new sort direction.
     * @param {?} sortable
     * @return {?}
     */
    function (sortable) {
        if (this.active != sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        }
        else {
            this.direction = this.getNextSortDirection(sortable);
        }
        this.sortChange.next({ active: this.active, direction: this.direction });
    };
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    /**
     * Returns the next sort direction of the active sortable, checking for potential overrides.
     * @param {?} sortable
     * @return {?}
     */
    MatSort.prototype.getNextSortDirection = /**
     * Returns the next sort direction of the active sortable, checking for potential overrides.
     * @param {?} sortable
     * @return {?}
     */
    function (sortable) {
        if (!sortable) {
            return '';
        }
        // Get the sort direction cycle with the potential sortable overrides.
        var /** @type {?} */ disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
        var /** @type {?} */ sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);
        // Get and return the next direction in the cycle
        var /** @type {?} */ nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    };
    /**
     * @return {?}
     */
    MatSort.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this._stateChanges.next();
    };
    /**
     * @return {?}
     */
    MatSort.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._stateChanges.complete();
    };
    MatSort.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matSort]',
                    exportAs: 'matSort',
                    inputs: ['disabled: matSortDisabled']
                },] },
    ];
    /** @nocollapse */
    MatSort.ctorParameters = function () { return []; };
    MatSort.propDecorators = {
        "active": [{ type: _angular_core.Input, args: ['matSortActive',] },],
        "start": [{ type: _angular_core.Input, args: ['matSortStart',] },],
        "direction": [{ type: _angular_core.Input, args: ['matSortDirection',] },],
        "disableClear": [{ type: _angular_core.Input, args: ['matSortDisableClear',] },],
        "sortChange": [{ type: _angular_core.Output, args: ['matSortChange',] },],
    };
    return MatSort;
}(_MatSortMixinBase));
/**
 * Returns the sort direction cycle to use given the provided parameters of order and clear.
 * @param {?} start
 * @param {?} disableClear
 * @return {?}
 */
function getSortDirectionCycle(start, disableClear) {
    var /** @type {?} */ sortOrder = ['asc', 'desc'];
    if (start == 'desc') {
        sortOrder.reverse();
    }
    if (!disableClear) {
        sortOrder.push('');
    }
    return sortOrder;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * To modify the labels and text displayed, create a new instance of MatSortHeaderIntl and
 * include it in a custom provider.
 */
var MatSortHeaderIntl = /** @class */ (function () {
    function MatSortHeaderIntl() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new rxjs_Subject.Subject();
        /**
         * ARIA label for the sorting button.
         */
        this.sortButtonLabel = function (id) {
            return "Change sorting for " + id;
        };
        /**
         * A label to describe the current sort (visible only to screenreaders).
         */
        this.sortDescriptionLabel = function (id, direction) {
            return "Sorted by " + id + " " + (direction == 'asc' ? 'ascending' : 'descending');
        };
    }
    MatSortHeaderIntl.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    MatSortHeaderIntl.ctorParameters = function () { return []; };
    return MatSortHeaderIntl;
}());
/**
 * \@docs-private
 * @param {?} parentIntl
 * @return {?}
 */
function MAT_SORT_HEADER_INTL_PROVIDER_FACTORY(parentIntl) {
    return parentIntl || new MatSortHeaderIntl();
}
/**
 * \@docs-private
 */
var MAT_SORT_HEADER_INTL_PROVIDER = {
    // If there is already an MatSortHeaderIntl available, use that. Otherwise, provide a new one.
    provide: MatSortHeaderIntl,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), MatSortHeaderIntl]],
    useFactory: MAT_SORT_HEADER_INTL_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var SORT_ANIMATION_TRANSITION = _angular_material_core.AnimationDurations.ENTERING + ' ' + _angular_material_core.AnimationCurves.STANDARD_CURVE;
/**
 * \@docs-private
 */
var MatSortHeaderBase = /** @class */ (function () {
    function MatSortHeaderBase() {
    }
    return MatSortHeaderBase;
}());
var _MatSortHeaderMixinBase = _angular_material_core.mixinDisabled(MatSortHeaderBase);
/**
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent MatSort directive.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 */
var MatSortHeader = /** @class */ (function (_super) {
    __extends(MatSortHeader, _super);
    function MatSortHeader(_intl, changeDetectorRef, _sort, _cdkColumnDef) {
        var _this = _super.call(this) || this;
        _this._intl = _intl;
        _this._sort = _sort;
        _this._cdkColumnDef = _cdkColumnDef;
        /**
         * Sets the position of the arrow that displays when sorted.
         */
        _this.arrowPosition = 'after';
        if (!_sort) {
            throw getSortHeaderNotContainedWithinSortError();
        }
        _this._rerenderSubscription = rxjs_observable_merge.merge(_sort.sortChange, _sort._stateChanges, _intl.changes)
            .subscribe(function () { return changeDetectorRef.markForCheck(); });
        return _this;
    }
    Object.defineProperty(MatSortHeader.prototype, "disableClear", {
        get: /**
         * Overrides the disable clear value of the containing MatSort for this MatSortable.
         * @return {?}
         */
        function () { return this._disableClear; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) { this._disableClear = _angular_cdk_coercion.coerceBooleanProperty(v); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatSortHeader.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.id && this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
        this._sort.register(this);
    };
    /**
     * @return {?}
     */
    MatSortHeader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._sort.deregister(this);
        this._rerenderSubscription.unsubscribe();
    };
    /** Handles click events on the header. */
    /**
     * Handles click events on the header.
     * @return {?}
     */
    MatSortHeader.prototype._handleClick = /**
     * Handles click events on the header.
     * @return {?}
     */
    function () {
        if (!this._isDisabled()) {
            this._sort.sort(this);
        }
    };
    /** Whether this MatSortHeader is currently sorted in either ascending or descending order. */
    /**
     * Whether this MatSortHeader is currently sorted in either ascending or descending order.
     * @return {?}
     */
    MatSortHeader.prototype._isSorted = /**
     * Whether this MatSortHeader is currently sorted in either ascending or descending order.
     * @return {?}
     */
    function () {
        return this._sort.active == this.id &&
            (this._sort.direction === 'asc' || this._sort.direction === 'desc');
    };
    /**
     * @return {?}
     */
    MatSortHeader.prototype._isDisabled = /**
     * @return {?}
     */
    function () {
        return this._sort.disabled || this.disabled;
    };
    MatSortHeader.decorators = [
        { type: _angular_core.Component, args: [{selector: '[mat-sort-header]',
                    exportAs: 'matSortHeader',
                    template: "<div class=\"mat-sort-header-container\" [class.mat-sort-header-position-before]=\"arrowPosition == 'before'\"><button class=\"mat-sort-header-button\" type=\"button\" [attr.aria-label]=\"_intl.sortButtonLabel(id)\" [attr.disabled]=\"_isDisabled() || null\"><ng-content></ng-content></button><div *ngIf=\"_isSorted()\" class=\"mat-sort-header-arrow\" [@indicatorToggle]=\"_sort.direction\"><div class=\"mat-sort-header-stem\"></div><div class=\"mat-sort-header-indicator\" [@indicator]=\"_sort.direction\"><div class=\"mat-sort-header-pointer-left\" [@leftPointer]=\"_sort.direction\"></div><div class=\"mat-sort-header-pointer-right\" [@rightPointer]=\"_sort.direction\"></div><div class=\"mat-sort-header-pointer-middle\"></div></div></div></div><span class=\"cdk-visually-hidden\" *ngIf=\"_isSorted()\">&nbsp;{{_intl.sortDescriptionLabel(id, _sort.direction)}}</span>",
                    styles: [".mat-sort-header-container{display:flex;cursor:pointer}.mat-sort-header-disabled .mat-sort-header-container{cursor:default}.mat-sort-header-position-before{flex-direction:row-reverse}.mat-sort-header-button{border:none;background:0 0;display:flex;align-items:center;padding:0;cursor:inherit;outline:0;font:inherit;color:currentColor}.mat-sort-header-arrow{height:12px;width:12px;min-width:12px;margin:0 0 0 6px;position:relative;display:flex}.mat-sort-header-position-before .mat-sort-header-arrow{margin:0 6px 0 0}.mat-sort-header-stem{background:currentColor;height:10px;width:2px;margin:auto;display:flex;align-items:center}.mat-sort-header-indicator{width:100%;height:2px;display:flex;align-items:center;position:absolute;top:0;left:0;transition:225ms cubic-bezier(.4,0,.2,1)}.mat-sort-header-pointer-middle{margin:auto;height:2px;width:2px;background:currentColor;transform:rotate(45deg)}.mat-sort-header-pointer-left,.mat-sort-header-pointer-right{background:currentColor;width:6px;height:2px;transition:225ms cubic-bezier(.4,0,.2,1);position:absolute;top:0}.mat-sort-header-pointer-left{transform-origin:right;left:0}.mat-sort-header-pointer-right{transform-origin:left;right:0}"],
                    host: {
                        '(click)': '_handleClick()',
                        '[class.mat-sort-header-sorted]': '_isSorted()',
                        '[class.mat-sort-header-disabled]': '_isDisabled()',
                    },
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled'],
                    animations: [
                        _angular_animations.trigger('indicator', [
                            _angular_animations.state('asc', _angular_animations.style({ transform: 'translateY(0px)' })),
                            // 10px is the height of the sort indicator, minus the width of the pointers
                            _angular_animations.state('desc', _angular_animations.style({ transform: 'translateY(10px)' })),
                            _angular_animations.transition('asc <=> desc', _angular_animations.animate(SORT_ANIMATION_TRANSITION))
                        ]),
                        _angular_animations.trigger('leftPointer', [
                            _angular_animations.state('asc', _angular_animations.style({ transform: 'rotate(-45deg)' })),
                            _angular_animations.state('desc', _angular_animations.style({ transform: 'rotate(45deg)' })),
                            _angular_animations.transition('asc <=> desc', _angular_animations.animate(SORT_ANIMATION_TRANSITION))
                        ]),
                        _angular_animations.trigger('rightPointer', [
                            _angular_animations.state('asc', _angular_animations.style({ transform: 'rotate(45deg)' })),
                            _angular_animations.state('desc', _angular_animations.style({ transform: 'rotate(-45deg)' })),
                            _angular_animations.transition('asc <=> desc', _angular_animations.animate(SORT_ANIMATION_TRANSITION))
                        ]),
                        _angular_animations.trigger('indicatorToggle', [
                            _angular_animations.transition('void => asc', _angular_animations.animate(SORT_ANIMATION_TRANSITION, _angular_animations.keyframes([
                                _angular_animations.style({ transform: 'translateY(25%)', opacity: 0 }),
                                _angular_animations.style({ transform: 'none', opacity: 1 })
                            ]))),
                            _angular_animations.transition('asc => void', _angular_animations.animate(SORT_ANIMATION_TRANSITION, _angular_animations.keyframes([
                                _angular_animations.style({ transform: 'none', opacity: 1 }),
                                _angular_animations.style({ transform: 'translateY(-25%)', opacity: 0 })
                            ]))),
                            _angular_animations.transition('void => desc', _angular_animations.animate(SORT_ANIMATION_TRANSITION, _angular_animations.keyframes([
                                _angular_animations.style({ transform: 'translateY(-25%)', opacity: 0 }),
                                _angular_animations.style({ transform: 'none', opacity: 1 })
                            ]))),
                            _angular_animations.transition('desc => void', _angular_animations.animate(SORT_ANIMATION_TRANSITION, _angular_animations.keyframes([
                                _angular_animations.style({ transform: 'none', opacity: 1 }),
                                _angular_animations.style({ transform: 'translateY(25%)', opacity: 0 })
                            ]))),
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    MatSortHeader.ctorParameters = function () { return [
        { type: MatSortHeaderIntl, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: MatSort, decorators: [{ type: _angular_core.Optional },] },
        { type: _angular_cdk_table.CdkColumnDef, decorators: [{ type: _angular_core.Optional },] },
    ]; };
    MatSortHeader.propDecorators = {
        "id": [{ type: _angular_core.Input, args: ['mat-sort-header',] },],
        "arrowPosition": [{ type: _angular_core.Input },],
        "start": [{ type: _angular_core.Input, args: ['start',] },],
        "disableClear": [{ type: _angular_core.Input },],
    };
    return MatSortHeader;
}(_MatSortHeaderMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatSortModule = /** @class */ (function () {
    function MatSortModule() {
    }
    MatSortModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule],
                    exports: [MatSort, MatSortHeader],
                    declarations: [MatSort, MatSortHeader],
                    providers: [MAT_SORT_HEADER_INTL_PROVIDER]
                },] },
    ];
    /** @nocollapse */
    MatSortModule.ctorParameters = function () { return []; };
    return MatSortModule;
}());

exports.MatSortModule = MatSortModule;
exports.MatSortHeaderBase = MatSortHeaderBase;
exports._MatSortHeaderMixinBase = _MatSortHeaderMixinBase;
exports.MatSortHeader = MatSortHeader;
exports.MatSortHeaderIntl = MatSortHeaderIntl;
exports.MAT_SORT_HEADER_INTL_PROVIDER_FACTORY = MAT_SORT_HEADER_INTL_PROVIDER_FACTORY;
exports.MAT_SORT_HEADER_INTL_PROVIDER = MAT_SORT_HEADER_INTL_PROVIDER;
exports.MatSortBase = MatSortBase;
exports._MatSortMixinBase = _MatSortMixinBase;
exports.MatSort = MatSort;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-sort.umd.js.map
