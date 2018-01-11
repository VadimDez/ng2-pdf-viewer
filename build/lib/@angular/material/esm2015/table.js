/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, NgModule, ViewEncapsulation } from '@angular/core';
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
class MatTable extends CdkTable {
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
MatTable.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
class MatCellDef extends CdkCellDef {
}
MatCellDef.decorators = [
    { type: Directive, args: [{
                selector: '[matCellDef]',
                providers: [{ provide: CdkCellDef, useExisting: MatCellDef }]
            },] },
];
/** @nocollapse */
MatCellDef.ctorParameters = () => [];
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
class MatHeaderCellDef extends CdkHeaderCellDef {
}
MatHeaderCellDef.decorators = [
    { type: Directive, args: [{
                selector: '[matHeaderCellDef]',
                providers: [{ provide: CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
            },] },
];
/** @nocollapse */
MatHeaderCellDef.ctorParameters = () => [];
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
class MatColumnDef extends CdkColumnDef {
}
MatColumnDef.decorators = [
    { type: Directive, args: [{
                selector: '[matColumnDef]',
                providers: [{ provide: CdkColumnDef, useExisting: MatColumnDef }],
            },] },
];
/** @nocollapse */
MatColumnDef.ctorParameters = () => [];
MatColumnDef.propDecorators = {
    "name": [{ type: Input, args: ['matColumnDef',] },],
};
/**
 * Header cell template container that adds the right classes and role.
 */
class MatHeaderCell extends CdkHeaderCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     */
    constructor(columnDef, elementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`mat-column-${columnDef.cssClassFriendlyName}`);
    }
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
MatHeaderCell.ctorParameters = () => [
    { type: CdkColumnDef, },
    { type: ElementRef, },
];
/**
 * Cell template container that adds the right classes and role.
 */
class MatCell extends CdkCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     */
    constructor(columnDef, elementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`mat-column-${columnDef.cssClassFriendlyName}`);
    }
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
MatCell.ctorParameters = () => [
    { type: CdkColumnDef, },
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
class MatHeaderRowDef extends CdkHeaderRowDef {
}
MatHeaderRowDef.decorators = [
    { type: Directive, args: [{
                selector: '[matHeaderRowDef]',
                providers: [{ provide: CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                inputs: ['columns: matHeaderRowDef'],
            },] },
];
/** @nocollapse */
MatHeaderRowDef.ctorParameters = () => [];
/**
 * Data row definition for the mat-table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
class MatRowDef extends CdkRowDef {
}
MatRowDef.decorators = [
    { type: Directive, args: [{
                selector: '[matRowDef]',
                providers: [{ provide: CdkRowDef, useExisting: MatRowDef }],
                inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
            },] },
];
/** @nocollapse */
MatRowDef.ctorParameters = () => [];
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
class MatHeaderRow extends CdkHeaderRow {
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
MatHeaderRow.ctorParameters = () => [];
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
class MatRow extends CdkRow {
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
MatRow.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class MatTableModule {
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
MatTableModule.ctorParameters = () => [];

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
class MatTableDataSource {
    /**
     * @param {?=} initialData
     */
    constructor(initialData = []) {
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
        this.sortingDataAccessor = (data, sortHeaderId) => {
            const /** @type {?} */ value = data[sortHeaderId];
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
        this.filterPredicate = (data, filter) => {
            // Transform the data into a lowercase string of all property values.
            const /** @type {?} */ accumulator = (currentTerm, key) => currentTerm + data[key];
            const /** @type {?} */ dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            const /** @type {?} */ transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) != -1;
        };
        this._data = new BehaviorSubject(initialData);
        this._updateChangeSubscription();
    }
    /**
     * Array of data that should be rendered by the table, where each object represents one row.
     * @param {?} data
     * @return {?}
     */
    set data(data) { this._data.next(data); }
    /**
     * @return {?}
     */
    get data() { return this._data.value; }
    /**
     * Filter term that should be used to filter out objects from the data array. To override how
     * data objects match to this filter string, provide a custom function for filterPredicate.
     * @param {?} filter
     * @return {?}
     */
    set filter(filter) { this._filter.next(filter); }
    /**
     * @return {?}
     */
    get filter() { return this._filter.value; }
    /**
     * Instance of the MatSort directive used by the table to control its sorting. Sort changes
     * emitted by the MatSort will trigger an update to the table's rendered data.
     * @param {?} sort
     * @return {?}
     */
    set sort(sort) {
        this._sort = sort;
        this._updateChangeSubscription();
    }
    /**
     * @return {?}
     */
    get sort() { return this._sort; }
    /**
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
    set paginator(paginator) {
        this._paginator = paginator;
        this._updateChangeSubscription();
    }
    /**
     * @return {?}
     */
    get paginator() { return this._paginator; }
    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows. When the
     * changes occur, process the current state of the filter, sort, and pagination along with
     * the provided base data and send it to the table for rendering.
     * @return {?}
     */
    _updateChangeSubscription() {
        // Sorting and/or pagination should be watched if MatSort and/or MatPaginator are provided.
        // Otherwise, use an empty observable stream to take their place.
        const /** @type {?} */ sortChange = this._sort ? this._sort.sortChange : empty();
        const /** @type {?} */ pageChange = this._paginator ? this._paginator.page : empty();
        if (this._renderChangesSubscription) {
            this._renderChangesSubscription.unsubscribe();
        }
        // Watch for base data or filter changes to provide a filtered set of data.
        this._renderChangesSubscription = this._data.pipe(combineLatest(this._filter), map(([data]) => this._filterData(data)), 
        // Watch for filtered data or sort changes to provide an ordered set of data.
        combineLatest(sortChange.pipe(startWith(/** @type {?} */ ((null))))), map(([data]) => this._orderData(data)), 
        // Watch for ordered data or page changes to provide a paged set of data.
        combineLatest(pageChange.pipe(startWith(/** @type {?} */ ((null))))), map(([data]) => this._pageData(data)))
            .subscribe(data => this._renderData.next(data));
    }
    /**
     * Returns a filtered data array where each filter object contains the filter string within
     * the result of the filterTermAccessor function. If no filter is set, returns the data array
     * as provided.
     * @param {?} data
     * @return {?}
     */
    _filterData(data) {
        // If there is a filter string, filter out data that does not contain it.
        // Each data object is converted to a string using the function defined by filterTermAccessor.
        // May be overriden for customization.
        this.filteredData =
            !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));
        if (this.paginator) {
            this._updatePaginator(this.filteredData.length);
        }
        return this.filteredData;
    }
    /**
     * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
     * data array as provided. Uses the default data accessor for data lookup, unless a
     * sortDataAccessor function is defined.
     * @param {?} data
     * @return {?}
     */
    _orderData(data) {
        // If there is no active sort or direction, return the data without trying to sort.
        if (!this.sort || !this.sort.active || this.sort.direction == '') {
            return data;
        }
        const /** @type {?} */ active = this.sort.active;
        const /** @type {?} */ direction = this.sort.direction;
        return data.slice().sort((a, b) => {
            let /** @type {?} */ valueA = this.sortingDataAccessor(a, active);
            let /** @type {?} */ valueB = this.sortingDataAccessor(b, active);
            return (valueA < valueB ? -1 : 1) * (direction == 'asc' ? 1 : -1);
        });
    }
    /**
     * Returns a paged splice of the provided data array according to the provided MatPaginator's page
     * index and length. If there is no paginator provided, returns the data array as provided.
     * @param {?} data
     * @return {?}
     */
    _pageData(data) {
        if (!this.paginator) {
            return data;
        }
        const /** @type {?} */ startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.slice().splice(startIndex, this.paginator.pageSize);
    }
    /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to
     * guard against making property changes within a round of change detection.
     * @param {?} filteredDataLength
     * @return {?}
     */
    _updatePaginator(filteredDataLength) {
        Promise.resolve().then(() => {
            if (!this.paginator) {
                return;
            }
            this.paginator.length = filteredDataLength;
            // If the page index is set beyond the page, reduce it to the last page.
            if (this.paginator.pageIndex > 0) {
                const /** @type {?} */ lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
                this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
            }
        });
    }
    /**
     * Used by the MatTable. Called when it connects to the data source.
     * \@docs-private
     * @return {?}
     */
    connect() { return this._renderData; }
    /**
     * Used by the MatTable. Called when it is destroyed. No-op.
     * \@docs-private
     * @return {?}
     */
    disconnect() { }
}

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
//# sourceMappingURL=table.js.map
