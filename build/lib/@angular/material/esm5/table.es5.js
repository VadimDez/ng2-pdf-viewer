/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { __extends } from 'tslib';
import * as tslib_1 from 'tslib';
import { CDK_ROW_TEMPLATE, CDK_TABLE_TEMPLATE, CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CdkTable, CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { empty } from 'rxjs/observable/empty';

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
        { type: Component, args: [{selector: 'mat-table',
                    exportAs: 'matTable',
                    template: CDK_TABLE_TEMPLATE,
                    styles: [".mat-table{display:block}.mat-header-row,.mat-row{display:flex;border-bottom-width:1px;border-bottom-style:solid;align-items:center;min-height:48px;padding:0 24px}.mat-cell,.mat-header-cell{flex:1;overflow:hidden;word-wrap:break-word}"],
                    host: {
                        'class': 'mat-table',
                    },
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatTable.ctorParameters = function () { return []; };
    return MatTable;
}(CdkTable));

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
        { type: Directive, args: [{
                    selector: '[matCellDef]',
                    providers: [{ provide: CdkCellDef, useExisting: MatCellDef }]
                },] },
    ];
    /** @nocollapse */
    MatCellDef.ctorParameters = function () { return []; };
    return MatCellDef;
}(CdkCellDef));
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
        { type: Directive, args: [{
                    selector: '[matHeaderCellDef]',
                    providers: [{ provide: CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
                },] },
    ];
    /** @nocollapse */
    MatHeaderCellDef.ctorParameters = function () { return []; };
    return MatHeaderCellDef;
}(CdkHeaderCellDef));
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
        { type: Directive, args: [{
                    selector: '[matColumnDef]',
                    providers: [{ provide: CdkColumnDef, useExisting: MatColumnDef }],
                },] },
    ];
    /** @nocollapse */
    MatColumnDef.ctorParameters = function () { return []; };
    MatColumnDef.propDecorators = {
        "name": [{ type: Input, args: ['matColumnDef',] },],
    };
    return MatColumnDef;
}(CdkColumnDef));
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
        { type: Directive, args: [{
                    selector: 'mat-header-cell',
                    host: {
                        'class': 'mat-header-cell',
                        'role': 'columnheader',
                    },
                },] },
    ];
    /** @nocollapse */
    MatHeaderCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return MatHeaderCell;
}(CdkHeaderCell));
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
        { type: Directive, args: [{
                    selector: 'mat-cell',
                    host: {
                        'class': 'mat-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    MatCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return MatCell;
}(CdkCell));

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
        { type: Directive, args: [{
                    selector: '[matHeaderRowDef]',
                    providers: [{ provide: CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                    inputs: ['columns: matHeaderRowDef'],
                },] },
    ];
    /** @nocollapse */
    MatHeaderRowDef.ctorParameters = function () { return []; };
    return MatHeaderRowDef;
}(CdkHeaderRowDef));
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
        { type: Directive, args: [{
                    selector: '[matRowDef]',
                    providers: [{ provide: CdkRowDef, useExisting: MatRowDef }],
                    inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                },] },
    ];
    /** @nocollapse */
    MatRowDef.ctorParameters = function () { return []; };
    return MatRowDef;
}(CdkRowDef));
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
var MatHeaderRow = /** @class */ (function (_super) {
    __extends(MatHeaderRow, _super);
    function MatHeaderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderRow.decorators = [
        { type: Component, args: [{selector: 'mat-header-row',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-header-row',
                        'role': 'row',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matHeaderRow',
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatHeaderRow.ctorParameters = function () { return []; };
    return MatHeaderRow;
}(CdkHeaderRow));
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
var MatRow = /** @class */ (function (_super) {
    __extends(MatRow, _super);
    function MatRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatRow.decorators = [
        { type: Component, args: [{selector: 'mat-row',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-row',
                        'role': 'row',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matRow',
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    MatRow.ctorParameters = function () { return []; };
    return MatRow;
}(CdkRow));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatTableModule = /** @class */ (function () {
    function MatTableModule() {
    }
    MatTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CdkTableModule, CommonModule, MatCommonModule],
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
        this._renderData = new BehaviorSubject([]);
        /**
         * Stream that emits when a new filter string is set on the data source.
         */
        this._filter = new BehaviorSubject('');
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
        this._data = new BehaviorSubject(initialData);
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
        var /** @type {?} */ sortChange = this._sort ? this._sort.sortChange : empty();
        var /** @type {?} */ pageChange = this._paginator ? this._paginator.page : empty();
        if (this._renderChangesSubscription) {
            this._renderChangesSubscription.unsubscribe();
        }
        // Watch for base data or filter changes to provide a filtered set of data.
        this._renderChangesSubscription = this._data.pipe(combineLatest(this._filter), map(function (_a) {
            var data = _a[0];
            return _this._filterData(data);
        }), 
        // Watch for filtered data or sort changes to provide an ordered set of data.
        combineLatest(sortChange.pipe(startWith(/** @type {?} */ ((null))))), map(function (_a) {
            var data = _a[0];
            return _this._orderData(data);
        }), 
        // Watch for ordered data or page changes to provide a paged set of data.
        combineLatest(pageChange.pipe(startWith(/** @type {?} */ ((null))))), map(function (_a) {
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

export { MatTableModule, MatCellDef, MatHeaderCellDef, MatColumnDef, MatHeaderCell, MatCell, MatTable, MatHeaderRowDef, MatRowDef, MatHeaderRow, MatRow, MatTableDataSource };
//# sourceMappingURL=table.es5.js.map
