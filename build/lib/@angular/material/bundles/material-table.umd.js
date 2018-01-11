/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/table'), require('@angular/common'), require('@angular/material/core'), require('rxjs/BehaviorSubject'), require('rxjs/operators/combineLatest'), require('rxjs/operators/map'), require('rxjs/operators/startWith'), require('rxjs/observable/empty')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/table', '@angular/common', '@angular/material/core', 'rxjs/BehaviorSubject', 'rxjs/operators/combineLatest', 'rxjs/operators/map', 'rxjs/operators/startWith', 'rxjs/observable/empty'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.table = global.ng.material.table || {}),global.ng.core,global.ng.cdk.table,global.ng.common,global.ng.material.core,global.Rx,global.Rx.operators,global.Rx.operators,global.Rx.operators,global.Rx.Observable));
}(this, (function (exports,_angular_core,_angular_cdk_table,_angular_common,_angular_material_core,rxjs_BehaviorSubject,rxjs_operators_combineLatest,rxjs_operators_map,rxjs_operators_startWith,rxjs_observable_empty) { 'use strict';

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
 * Wrapper for the CdkTable with Material design styles.
 */
var MatTable = /** @class */ (function (_super) {
    __extends(MatTable, _super);
    function MatTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatTable.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-table',
                    exportAs: 'matTable',
                    template: _angular_cdk_table.CDK_TABLE_TEMPLATE,
                    styles: [".mat-table{display:block}.mat-header-row,.mat-row{display:flex;border-bottom-width:1px;border-bottom-style:solid;align-items:center;min-height:48px;padding:0 24px}.mat-cell,.mat-header-cell{flex:1;overflow:hidden;word-wrap:break-word}"],
                    host: {
                        'class': 'mat-table',
                    },
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatTable.ctorParameters = function () { return []; };
    return MatTable;
}(_angular_cdk_table.CdkTable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var MatCellDef = /** @class */ (function (_super) {
    __extends(MatCellDef, _super);
    function MatCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatCellDef.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matCellDef]',
                    providers: [{ provide: _angular_cdk_table.CdkCellDef, useExisting: MatCellDef }]
                },] },
    ];
    /** @nocollapse */
    MatCellDef.ctorParameters = function () { return []; };
    return MatCellDef;
}(_angular_cdk_table.CdkCellDef));
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var MatHeaderCellDef = /** @class */ (function (_super) {
    __extends(MatHeaderCellDef, _super);
    function MatHeaderCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderCellDef.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matHeaderCellDef]',
                    providers: [{ provide: _angular_cdk_table.CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
                },] },
    ];
    /** @nocollapse */
    MatHeaderCellDef.ctorParameters = function () { return []; };
    return MatHeaderCellDef;
}(_angular_cdk_table.CdkHeaderCellDef));
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
var MatColumnDef = /** @class */ (function (_super) {
    __extends(MatColumnDef, _super);
    function MatColumnDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatColumnDef.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matColumnDef]',
                    providers: [{ provide: _angular_cdk_table.CdkColumnDef, useExisting: MatColumnDef }],
                },] },
    ];
    /** @nocollapse */
    MatColumnDef.ctorParameters = function () { return []; };
    MatColumnDef.propDecorators = {
        "name": [{ type: _angular_core.Input, args: ['matColumnDef',] },],
    };
    return MatColumnDef;
}(_angular_cdk_table.CdkColumnDef));
/**
 * Header cell template container that adds the right classes and role.
 */
var MatHeaderCell = /** @class */ (function (_super) {
    __extends(MatHeaderCell, _super);
    function MatHeaderCell(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    MatHeaderCell.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'mat-header-cell',
                    host: {
                        'class': 'mat-header-cell',
                        'role': 'columnheader',
                    },
                },] },
    ];
    /** @nocollapse */
    MatHeaderCell.ctorParameters = function () { return [
        { type: _angular_cdk_table.CdkColumnDef, },
        { type: _angular_core.ElementRef, },
    ]; };
    return MatHeaderCell;
}(_angular_cdk_table.CdkHeaderCell));
/**
 * Cell template container that adds the right classes and role.
 */
var MatCell = /** @class */ (function (_super) {
    __extends(MatCell, _super);
    function MatCell(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    MatCell.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'mat-cell',
                    host: {
                        'class': 'mat-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    MatCell.ctorParameters = function () { return [
        { type: _angular_cdk_table.CdkColumnDef, },
        { type: _angular_core.ElementRef, },
    ]; };
    return MatCell;
}(_angular_cdk_table.CdkCell));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var MatHeaderRowDef = /** @class */ (function (_super) {
    __extends(MatHeaderRowDef, _super);
    function MatHeaderRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderRowDef.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matHeaderRowDef]',
                    providers: [{ provide: _angular_cdk_table.CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                    inputs: ['columns: matHeaderRowDef'],
                },] },
    ];
    /** @nocollapse */
    MatHeaderRowDef.ctorParameters = function () { return []; };
    return MatHeaderRowDef;
}(_angular_cdk_table.CdkHeaderRowDef));
/**
 * Data row definition for the mat-table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
var MatRowDef = /** @class */ (function (_super) {
    __extends(MatRowDef, _super);
    function MatRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatRowDef.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matRowDef]',
                    providers: [{ provide: _angular_cdk_table.CdkRowDef, useExisting: MatRowDef }],
                    inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                },] },
    ];
    /** @nocollapse */
    MatRowDef.ctorParameters = function () { return []; };
    return MatRowDef;
}(_angular_cdk_table.CdkRowDef));
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
var MatHeaderRow = /** @class */ (function (_super) {
    __extends(MatHeaderRow, _super);
    function MatHeaderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderRow.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-header-row',
                    template: _angular_cdk_table.CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-header-row',
                        'role': 'row',
                    },
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    exportAs: 'matHeaderRow',
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatHeaderRow.ctorParameters = function () { return []; };
    return MatHeaderRow;
}(_angular_cdk_table.CdkHeaderRow));
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
var MatRow = /** @class */ (function (_super) {
    __extends(MatRow, _super);
    function MatRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatRow.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-row',
                    template: _angular_cdk_table.CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-row',
                        'role': 'row',
                    },
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    exportAs: 'matRow',
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatRow.ctorParameters = function () { return []; };
    return MatRow;
}(_angular_cdk_table.CdkRow));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatTableModule = /** @class */ (function () {
    function MatTableModule() {
    }
    MatTableModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_cdk_table.CdkTableModule, _angular_common.CommonModule, _angular_material_core.MatCommonModule],
                    exports: [MatTable, MatCellDef, MatHeaderCellDef, MatColumnDef,
                        MatHeaderCell, MatCell, MatHeaderRow, MatRow,
                        MatHeaderRowDef, MatRowDef],
                    declarations: [MatTable, MatCellDef, MatHeaderCellDef, MatColumnDef,
                        MatHeaderCell, MatCell, MatHeaderRow, MatRow,
                        MatHeaderRowDef, MatRowDef],
                },] },
    ];
    /** @nocollapse */
    MatTableModule.ctorParameters = function () { return []; };
    return MatTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using MatSort), and pagination (using MatPaginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 */
var MatTableDataSource = /** @class */ (function () {
    function MatTableDataSource(initialData) {
        if (initialData === void 0) { initialData = []; }
        /**
         * Stream emitting render data to the table (depends on ordered data changes).
         */
        this._renderData = new rxjs_BehaviorSubject.BehaviorSubject([]);
        /**
         * Stream that emits when a new filter string is set on the data source.
         */
        this._filter = new rxjs_BehaviorSubject.BehaviorSubject('');
        /**
         * Data accessor function that is used for accessing data properties for sorting.
         * This default function assumes that the sort header IDs (which defaults to the column name)
         * matches the data's properties (e.g. column Xyz represents data['Xyz']).
         * May be set to a custom function for different behavior.
         * @param data Data object that is being accessed.
         * @param sortHeaderId The name of the column that represents the data.
         */
        this.sortingDataAccessor = function (data, sortHeaderId) {
            var /** @type {?} */ value = data[sortHeaderId];
            // If the value is a string and only whitespace, return the value.
            // Otherwise +value will convert it to 0.
            if (typeof value === 'string' && !value.trim()) {
                return value;
            }
            return isNaN(+value) ? value : +value;
        };
        /**
         * Checks if a data object matches the data source's filter string. By default, each data object
         * is converted to a string of its properties and returns true if the filter has
         * at least one occurrence in that string. By default, the filter string has its whitespace
         * trimmed and the match is case-insensitive. May be overriden for a custom implementation of
         * filter matching.
         * @param data Data object used to check against the filter.
         * @param filter Filter string that has been set on the data source.
         * @return Whether the filter matches against the data
         */
        this.filterPredicate = function (data, filter) {
            // Transform the data into a lowercase string of all property values.
            var /** @type {?} */ accumulator = function (currentTerm, key) { return currentTerm + data[key]; };
            var /** @type {?} */ dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            var /** @type {?} */ transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) != -1;
        };
        this._data = new rxjs_BehaviorSubject.BehaviorSubject(initialData);
        this._updateChangeSubscription();
    }
    Object.defineProperty(MatTableDataSource.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () { return this._data.value; },
        /** Array of data that should be rendered by the table, where each object represents one row. */
        set: /**
         * Array of data that should be rendered by the table, where each object represents one row.
         * @param {?} data
         * @return {?}
         */
        function (data) { this._data.next(data); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTableDataSource.prototype, "filter", {
        get: /**
         * @return {?}
         */
        function () { return this._filter.value; },
        /**
         * Filter term that should be used to filter out objects from the data array. To override how
         * data objects match to this filter string, provide a custom function for filterPredicate.
         */
        set: /**
         * Filter term that should be used to filter out objects from the data array. To override how
         * data objects match to this filter string, provide a custom function for filterPredicate.
         * @param {?} filter
         * @return {?}
         */
        function (filter) { this._filter.next(filter); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTableDataSource.prototype, "sort", {
        get: /**
         * @return {?}
         */
        function () { return this._sort; },
        /**
         * Instance of the MatSort directive used by the table to control its sorting. Sort changes
         * emitted by the MatSort will trigger an update to the table's rendered data.
         */
        set: /**
         * Instance of the MatSort directive used by the table to control its sorting. Sort changes
         * emitted by the MatSort will trigger an update to the table's rendered data.
         * @param {?} sort
         * @return {?}
         */
        function (sort) {
            this._sort = sort;
            this._updateChangeSubscription();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTableDataSource.prototype, "paginator", {
        get: /**
         * @return {?}
         */
        function () { return this._paginator; },
        /**
         * Instance of the MatPaginator component used by the table to control what page of the data is
         * displayed. Page changes emitted by the MatPaginator will trigger an update to the
         * table's rendered data.
         *
         * Note that the data source uses the paginator's properties to calculate which page of data
         * should be displayed. If the paginator receives its properties as template inputs,
         * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
         * initialized before assigning it to this data source.
         */
        set: /**
         * Instance of the MatPaginator component used by the table to control what page of the data is
         * displayed. Page changes emitted by the MatPaginator will trigger an update to the
         * table's rendered data.
         *
         * Note that the data source uses the paginator's properties to calculate which page of data
         * should be displayed. If the paginator receives its properties as template inputs,
         * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
         * initialized before assigning it to this data source.
         * @param {?} paginator
         * @return {?}
         */
        function (paginator) {
            this._paginator = paginator;
            this._updateChangeSubscription();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows. When the
     * changes occur, process the current state of the filter, sort, and pagination along with
     * the provided base data and send it to the table for rendering.
     */
    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows. When the
     * changes occur, process the current state of the filter, sort, and pagination along with
     * the provided base data and send it to the table for rendering.
     * @return {?}
     */
    MatTableDataSource.prototype._updateChangeSubscription = /**
     * Subscribe to changes that should trigger an update to the table's rendered rows. When the
     * changes occur, process the current state of the filter, sort, and pagination along with
     * the provided base data and send it to the table for rendering.
     * @return {?}
     */
    function () {
        var _this = this;
        // Sorting and/or pagination should be watched if MatSort and/or MatPaginator are provided.
        // Otherwise, use an empty observable stream to take their place.
        var /** @type {?} */ sortChange = this._sort ? this._sort.sortChange : rxjs_observable_empty.empty();
        var /** @type {?} */ pageChange = this._paginator ? this._paginator.page : rxjs_observable_empty.empty();
        if (this._renderChangesSubscription) {
            this._renderChangesSubscription.unsubscribe();
        }
        // Watch for base data or filter changes to provide a filtered set of data.
        this._renderChangesSubscription = this._data.pipe(rxjs_operators_combineLatest.combineLatest(this._filter), rxjs_operators_map.map(function (_a) {
            var data = _a[0];
            return _this._filterData(data);
        }), 
        // Watch for filtered data or sort changes to provide an ordered set of data.
        rxjs_operators_combineLatest.combineLatest(sortChange.pipe(rxjs_operators_startWith.startWith(/** @type {?} */ ((null))))), rxjs_operators_map.map(function (_a) {
            var data = _a[0];
            return _this._orderData(data);
        }), 
        // Watch for ordered data or page changes to provide a paged set of data.
        rxjs_operators_combineLatest.combineLatest(pageChange.pipe(rxjs_operators_startWith.startWith(/** @type {?} */ ((null))))), rxjs_operators_map.map(function (_a) {
            var data = _a[0];
            return _this._pageData(data);
        }))
            .subscribe(function (data) { return _this._renderData.next(data); });
    };
    /**
     * Returns a filtered data array where each filter object contains the filter string within
     * the result of the filterTermAccessor function. If no filter is set, returns the data array
     * as provided.
     */
    /**
     * Returns a filtered data array where each filter object contains the filter string within
     * the result of the filterTermAccessor function. If no filter is set, returns the data array
     * as provided.
     * @param {?} data
     * @return {?}
     */
    MatTableDataSource.prototype._filterData = /**
     * Returns a filtered data array where each filter object contains the filter string within
     * the result of the filterTermAccessor function. If no filter is set, returns the data array
     * as provided.
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        // If there is a filter string, filter out data that does not contain it.
        // Each data object is converted to a string using the function defined by filterTermAccessor.
        // May be overriden for customization.
        this.filteredData =
            !this.filter ? data : data.filter(function (obj) { return _this.filterPredicate(obj, _this.filter); });
        if (this.paginator) {
            this._updatePaginator(this.filteredData.length);
        }
        return this.filteredData;
    };
    /**
     * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
     * data array as provided. Uses the default data accessor for data lookup, unless a
     * sortDataAccessor function is defined.
     */
    /**
     * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
     * data array as provided. Uses the default data accessor for data lookup, unless a
     * sortDataAccessor function is defined.
     * @param {?} data
     * @return {?}
     */
    MatTableDataSource.prototype._orderData = /**
     * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
     * data array as provided. Uses the default data accessor for data lookup, unless a
     * sortDataAccessor function is defined.
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        // If there is no active sort or direction, return the data without trying to sort.
        if (!this.sort || !this.sort.active || this.sort.direction == '') {
            return data;
        }
        var /** @type {?} */ active = this.sort.active;
        var /** @type {?} */ direction = this.sort.direction;
        return data.slice().sort(function (a, b) {
            var /** @type {?} */ valueA = _this.sortingDataAccessor(a, active);
            var /** @type {?} */ valueB = _this.sortingDataAccessor(b, active);
            return (valueA < valueB ? -1 : 1) * (direction == 'asc' ? 1 : -1);
        });
    };
    /**
     * Returns a paged splice of the provided data array according to the provided MatPaginator's page
     * index and length. If there is no paginator provided, returns the data array as provided.
     */
    /**
     * Returns a paged splice of the provided data array according to the provided MatPaginator's page
     * index and length. If there is no paginator provided, returns the data array as provided.
     * @param {?} data
     * @return {?}
     */
    MatTableDataSource.prototype._pageData = /**
     * Returns a paged splice of the provided data array according to the provided MatPaginator's page
     * index and length. If there is no paginator provided, returns the data array as provided.
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (!this.paginator) {
            return data;
        }
        var /** @type {?} */ startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.slice().splice(startIndex, this.paginator.pageSize);
    };
    /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to
     * guard against making property changes within a round of change detection.
     */
    /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to
     * guard against making property changes within a round of change detection.
     * @param {?} filteredDataLength
     * @return {?}
     */
    MatTableDataSource.prototype._updatePaginator = /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to
     * guard against making property changes within a round of change detection.
     * @param {?} filteredDataLength
     * @return {?}
     */
    function (filteredDataLength) {
        var _this = this;
        Promise.resolve().then(function () {
            if (!_this.paginator) {
                return;
            }
            _this.paginator.length = filteredDataLength;
            // If the page index is set beyond the page, reduce it to the last page.
            if (_this.paginator.pageIndex > 0) {
                var /** @type {?} */ lastPageIndex = Math.ceil(_this.paginator.length / _this.paginator.pageSize) - 1 || 0;
                _this.paginator.pageIndex = Math.min(_this.paginator.pageIndex, lastPageIndex);
            }
        });
    };
    /**
     * Used by the MatTable. Called when it connects to the data source.
     * @docs-private
     */
    /**
     * Used by the MatTable. Called when it connects to the data source.
     * \@docs-private
     * @return {?}
     */
    MatTableDataSource.prototype.connect = /**
     * Used by the MatTable. Called when it connects to the data source.
     * \@docs-private
     * @return {?}
     */
    function () { return this._renderData; };
    /**
     * Used by the MatTable. Called when it is destroyed. No-op.
     * @docs-private
     */
    /**
     * Used by the MatTable. Called when it is destroyed. No-op.
     * \@docs-private
     * @return {?}
     */
    MatTableDataSource.prototype.disconnect = /**
     * Used by the MatTable. Called when it is destroyed. No-op.
     * \@docs-private
     * @return {?}
     */
    function () { };
    return MatTableDataSource;
}());

exports.MatTableModule = MatTableModule;
exports.MatCellDef = MatCellDef;
exports.MatHeaderCellDef = MatHeaderCellDef;
exports.MatColumnDef = MatColumnDef;
exports.MatHeaderCell = MatHeaderCell;
exports.MatCell = MatCell;
exports.MatTable = MatTable;
exports.MatHeaderRowDef = MatHeaderRowDef;
exports.MatRowDef = MatRowDef;
exports.MatHeaderRow = MatHeaderRow;
exports.MatRow = MatRow;
exports.MatTableDataSource = MatTableDataSource;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-table.umd.js.map
