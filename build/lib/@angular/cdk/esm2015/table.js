/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, Input, IterableDiffers, NgModule, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, isDevMode } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The row template that can be used by the mat-table. Should not be used outside of the
 * material library.
 */
const CDK_ROW_TEMPLATE = `<ng-container cdkCellOutlet></ng-container>`;
/**
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
class BaseRowDef {
    /**
     * @param {?} template
     * @param {?} _differs
     */
    constructor(template, _differs) {
        this.template = template;
        this._differs = _differs;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // Create a new columns differ if one does not yet exist. Initialize it based on initial value
        // of the columns property or an empty array if none is provided.
        const /** @type {?} */ columns = changes['columns'].currentValue || [];
        if (!this._columnsDiffer) {
            this._columnsDiffer = this._differs.find(columns).create();
            this._columnsDiffer.diff(columns);
        }
    }
    /**
     * Returns the difference between the current columns and the columns from the last diff, or null
     * if there is no difference.
     * @return {?}
     */
    getColumnsDiff() {
        return this._columnsDiffer.diff(this.columns);
    }
}
/**
 * Header row definition for the CDK table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
class CdkHeaderRowDef extends BaseRowDef {
    /**
     * @param {?} template
     * @param {?} _differs
     */
    constructor(template, _differs) {
        super(template, _differs);
    }
}
CdkHeaderRowDef.decorators = [
    { type: Directive, args: [{
                selector: '[cdkHeaderRowDef]',
                inputs: ['columns: cdkHeaderRowDef'],
            },] },
];
/** @nocollapse */
CdkHeaderRowDef.ctorParameters = () => [
    { type: TemplateRef, },
    { type: IterableDiffers, },
];
/**
 * Data row definition for the CDK table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
class CdkRowDef extends BaseRowDef {
    /**
     * @param {?} template
     * @param {?} _differs
     */
    constructor(template, _differs) {
        super(template, _differs);
    }
}
CdkRowDef.decorators = [
    { type: Directive, args: [{
                selector: '[cdkRowDef]',
                inputs: ['columns: cdkRowDefColumns', 'when: cdkRowDefWhen'],
            },] },
];
/** @nocollapse */
CdkRowDef.ctorParameters = () => [
    { type: TemplateRef, },
    { type: IterableDiffers, },
];
/**
 * Context provided to the row cells
 * @record
 */

/**
 * Outlet for rendering cells inside of a row or header row.
 * \@docs-private
 */
class CdkCellOutlet {
    /**
     * @param {?} _viewContainer
     */
    constructor(_viewContainer) {
        this._viewContainer = _viewContainer;
        CdkCellOutlet.mostRecentCellOutlet = this;
    }
}
/**
 * Static property containing the latest constructed instance of this class.
 * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
 * createEmbeddedView. After one of these components are created, this property will provide
 * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
 * construct the cells with the provided context.
 */
CdkCellOutlet.mostRecentCellOutlet = null;
CdkCellOutlet.decorators = [
    { type: Directive, args: [{ selector: '[cdkCellOutlet]' },] },
];
/** @nocollapse */
CdkCellOutlet.ctorParameters = () => [
    { type: ViewContainerRef, },
];
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
class CdkHeaderRow {
}
CdkHeaderRow.decorators = [
    { type: Component, args: [{selector: 'cdk-header-row',
                template: CDK_ROW_TEMPLATE,
                host: {
                    'class': 'cdk-header-row',
                    'role': 'row',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
CdkHeaderRow.ctorParameters = () => [];
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
class CdkRow {
}
CdkRow.decorators = [
    { type: Component, args: [{selector: 'cdk-row',
                template: CDK_ROW_TEMPLATE,
                host: {
                    'class': 'cdk-row',
                    'role': 'row',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
CdkRow.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
class CdkCellDef {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
CdkCellDef.decorators = [
    { type: Directive, args: [{ selector: '[cdkCellDef]' },] },
];
/** @nocollapse */
CdkCellDef.ctorParameters = () => [
    { type: TemplateRef, },
];
/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
class CdkHeaderCellDef {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
CdkHeaderCellDef.decorators = [
    { type: Directive, args: [{ selector: '[cdkHeaderCellDef]' },] },
];
/** @nocollapse */
CdkHeaderCellDef.ctorParameters = () => [
    { type: TemplateRef, },
];
/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
class CdkColumnDef {
    /**
     * Unique name for this column.
     * @return {?}
     */
    get name() { return this._name; }
    /**
     * @param {?} name
     * @return {?}
     */
    set name(name) {
        this._name = name;
        this.cssClassFriendlyName = name.replace(/[^a-z0-9_-]/ig, '-');
    }
}
CdkColumnDef.decorators = [
    { type: Directive, args: [{ selector: '[cdkColumnDef]' },] },
];
/** @nocollapse */
CdkColumnDef.ctorParameters = () => [];
CdkColumnDef.propDecorators = {
    "name": [{ type: Input, args: ['cdkColumnDef',] },],
    "cell": [{ type: ContentChild, args: [CdkCellDef,] },],
    "headerCell": [{ type: ContentChild, args: [CdkHeaderCellDef,] },],
};
/**
 * Header cell template container that adds the right classes and role.
 */
class CdkHeaderCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     */
    constructor(columnDef, elementRef) {
        elementRef.nativeElement.classList.add(`cdk-column-${columnDef.cssClassFriendlyName}`);
    }
}
CdkHeaderCell.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-header-cell',
                host: {
                    'class': 'cdk-header-cell',
                    'role': 'columnheader',
                },
            },] },
];
/** @nocollapse */
CdkHeaderCell.ctorParameters = () => [
    { type: CdkColumnDef, },
    { type: ElementRef, },
];
/**
 * Cell template container that adds the right classes and role.
 */
class CdkCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     */
    constructor(columnDef, elementRef) {
        elementRef.nativeElement.classList.add(`cdk-column-${columnDef.cssClassFriendlyName}`);
    }
}
CdkCell.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-cell',
                host: {
                    'class': 'cdk-cell',
                    'role': 'gridcell',
                },
            },] },
];
/** @nocollapse */
CdkCell.ctorParameters = () => [
    { type: CdkColumnDef, },
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Returns an error to be thrown when attempting to find an unexisting column.
 * \@docs-private
 * @param {?} id Id whose lookup failed.
 * @return {?}
 */
function getTableUnknownColumnError(id) {
    return Error(`Could not find column with id "${id}".`);
}
/**
 * Returns an error to be thrown when two column definitions have the same name.
 * \@docs-private
 * @param {?} name
 * @return {?}
 */
function getTableDuplicateColumnNameError(name) {
    return Error(`Duplicate column definition name provided: "${name}".`);
}
/**
 * Returns an error to be thrown when there are multiple rows that are missing a when function.
 * \@docs-private
 * @return {?}
 */
function getTableMultipleDefaultRowDefsError() {
    return Error(`There can only be one default row without a when predicate function.`);
}
/**
 * Returns an error to be thrown when there are no matching row defs for a particular set of data.
 * \@docs-private
 * @return {?}
 */
function getTableMissingMatchingRowDefError() {
    return Error(`Could not find a matching row definition for the provided row data.`);
}
/**
 * Returns an error to be thrown when there is no row definitions present in the content.
 * \@docs-private
 * @return {?}
 */
function getTableMissingRowDefsError() {
    return Error('Missing definitions for header and row, ' +
        'cannot determine which columns should be rendered.');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * \@docs-private
 */
class RowPlaceholder {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
RowPlaceholder.decorators = [
    { type: Directive, args: [{ selector: '[rowPlaceholder]' },] },
];
/** @nocollapse */
RowPlaceholder.ctorParameters = () => [
    { type: ViewContainerRef, },
];
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * \@docs-private
 */
class HeaderRowPlaceholder {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
HeaderRowPlaceholder.decorators = [
    { type: Directive, args: [{ selector: '[headerRowPlaceholder]' },] },
];
/** @nocollapse */
HeaderRowPlaceholder.ctorParameters = () => [
    { type: ViewContainerRef, },
];
/**
 * The table template that can be used by the mat-table. Should not be used outside of the
 * material library.
 */
const CDK_TABLE_TEMPLATE = `
  <ng-container headerRowPlaceholder></ng-container>
  <ng-container rowPlaceholder></ng-container>`;
/**
 * A data table that connects with a data source to retrieve data of type `T` and renders
 * a header row and data rows. Updates the rows when new data is provided by the data source.
 */
class CdkTable {
    /**
     * @param {?} _differs
     * @param {?} _changeDetectorRef
     * @param {?} elementRef
     * @param {?} role
     */
    constructor(_differs, _changeDetectorRef, elementRef, role) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._onDestroy = new Subject();
        /**
         * Latest data provided by the data source through the connect interface.
         */
        this._data = [];
        /**
         * Map of all the user's defined columns (header and data cell template) identified by name.
         */
        this._columnDefsByName = new Map();
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        if (!role) {
            elementRef.nativeElement.setAttribute('role', 'grid');
        }
    }
    /**
     * Tracking function that will be used to check the differences in data changes. Used similarly
     * to `ngFor` `trackBy` function. Optimize row operations by identifying a row based on its data
     * relative to the function to know if a row should be added/removed/moved.
     * Accepts a function that takes two parameters, `index` and `item`.
     * @return {?}
     */
    get trackBy() { return this._trackByFn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    set trackBy(fn) {
        if (isDevMode() &&
            fn != null && typeof fn !== 'function' && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
            console.warn(`trackBy must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._trackByFn = fn;
    }
    /**
     * Provides a stream containing the latest data array to render. Influenced by the table's
     * stream of view window (what rows are currently on screen).
     * @return {?}
     */
    get dataSource() { return this._dataSource; }
    /**
     * @param {?} dataSource
     * @return {?}
     */
    set dataSource(dataSource) {
        if (this._dataSource !== dataSource) {
            this._switchDataSource(dataSource);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // TODO(andrewseguin): Setup a listener for scrolling, emit the calculated view to viewChange
        this._dataDiffer = this._differs.find([]).create(this._trackByFn);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this._headerDef && !this._rowDefs.length) {
            throw getTableMissingRowDefsError();
        }
        this._cacheColumnDefsByName();
        this._columnDefs.changes.subscribe(() => this._cacheColumnDefsByName());
        this._renderHeaderRow();
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this._renderUpdatedColumns();
        const /** @type {?} */ defaultRowDefs = this._rowDefs.filter(def => !def.when);
        if (defaultRowDefs.length > 1) {
            throw getTableMultipleDefaultRowDefsError();
        }
        this._defaultRowDef = defaultRowDefs[0];
        if (this.dataSource && !this._renderChangeSubscription) {
            this._observeRenderChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._rowPlaceholder.viewContainer.clear();
        this._headerRowPlaceholder.viewContainer.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this.dataSource) {
            this.dataSource.disconnect(this);
        }
    }
    /**
     * Update the map containing the content's column definitions.
     * @return {?}
     */
    _cacheColumnDefsByName() {
        this._columnDefsByName.clear();
        this._columnDefs.forEach(columnDef => {
            if (this._columnDefsByName.has(columnDef.name)) {
                throw getTableDuplicateColumnNameError(columnDef.name);
            }
            this._columnDefsByName.set(columnDef.name, columnDef);
        });
    }
    /**
     * Check if the header or rows have changed what columns they want to display. If there is a diff,
     * then re-render that section.
     * @return {?}
     */
    _renderUpdatedColumns() {
        // Re-render the rows when the row definition columns change.
        this._rowDefs.forEach(def => {
            if (!!def.getColumnsDiff()) {
                // Reset the data to an empty array so that renderRowChanges will re-render all new rows.
                this._dataDiffer.diff([]);
                this._rowPlaceholder.viewContainer.clear();
                this._renderRowChanges();
            }
        });
        // Re-render the header row if there is a difference in its columns.
        if (this._headerDef.getColumnsDiff()) {
            this._headerRowPlaceholder.viewContainer.clear();
            this._renderHeaderRow();
        }
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row placeholder. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    _switchDataSource(dataSource) {
        this._data = [];
        if (this.dataSource) {
            this.dataSource.disconnect(this);
        }
        // Stop listening for data from the previous data source.
        if (this._renderChangeSubscription) {
            this._renderChangeSubscription.unsubscribe();
            this._renderChangeSubscription = null;
        }
        // Remove the table's rows if there is now no data source
        if (!dataSource) {
            this._rowPlaceholder.viewContainer.clear();
        }
        this._dataSource = dataSource;
    }
    /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    _observeRenderChanges() {
        this._renderChangeSubscription = this.dataSource.connect(this).pipe(takeUntil(this._onDestroy))
            .subscribe(data => {
            this._data = data;
            this._renderRowChanges();
        });
    }
    /**
     * Create the embedded view for the header template and place it in the header row view container.
     * @return {?}
     */
    _renderHeaderRow() {
        const /** @type {?} */ cells = this._getHeaderCellTemplatesForRow(this._headerDef);
        if (!cells.length) {
            return;
        }
        // TODO(andrewseguin): add some code to enforce that exactly
        //   one CdkCellOutlet was instantiated as a result
        //   of `createEmbeddedView`.
        this._headerRowPlaceholder.viewContainer
            .createEmbeddedView(this._headerDef.template, { cells });
        cells.forEach(cell => {
            if (CdkCellOutlet.mostRecentCellOutlet) {
                CdkCellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(cell.template, {});
            }
        });
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Check for changes made in the data and render each change (row added/removed/moved) and update
     * row contexts.
     * @return {?}
     */
    _renderRowChanges() {
        const /** @type {?} */ changes = this._dataDiffer.diff(this._data);
        if (!changes) {
            return;
        }
        const /** @type {?} */ viewContainer = this._rowPlaceholder.viewContainer;
        changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
            if (record.previousIndex == null) {
                this._insertRow(record.item, currentIndex);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                const /** @type {?} */ view = /** @type {?} */ (viewContainer.get(adjustedPreviousIndex));
                viewContainer.move(/** @type {?} */ ((view)), currentIndex);
            }
        });
        // Update the meta context of a row's context data (index, count, first, last, ...)
        this._updateRowIndexContext();
        // Update rows that did not get added/removed/moved but may have had their identity changed,
        // e.g. if trackBy matched data on some property but the actual data reference changed.
        changes.forEachIdentityChange((record) => {
            const /** @type {?} */ rowView = /** @type {?} */ (viewContainer.get(/** @type {?} */ ((record.currentIndex))));
            rowView.context.$implicit = record.item;
        });
    }
    /**
     * Finds the matching row definition that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definition that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    _getRowDef(data, i) {
        if (this._rowDefs.length == 1) {
            return this._rowDefs.first;
        }
        let /** @type {?} */ rowDef = this._rowDefs.find(def => def.when && def.when(i, data)) || this._defaultRowDef;
        if (!rowDef) {
            throw getTableMissingMatchingRowDefError();
        }
        return rowDef;
    }
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} rowData
     * @param {?} index
     * @return {?}
     */
    _insertRow(rowData, index) {
        const /** @type {?} */ row = this._getRowDef(rowData, index);
        // Row context that will be provided to both the created embedded row view and its cells.
        const /** @type {?} */ context = { $implicit: rowData };
        // TODO(andrewseguin): add some code to enforce that exactly one
        //   CdkCellOutlet was instantiated as a result  of `createEmbeddedView`.
        this._rowPlaceholder.viewContainer.createEmbeddedView(row.template, context, index);
        this._getCellTemplatesForRow(row).forEach(cell => {
            if (CdkCellOutlet.mostRecentCellOutlet) {
                CdkCellOutlet.mostRecentCellOutlet._viewContainer
                    .createEmbeddedView(cell.template, context);
            }
        });
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Updates the index-related context for each row to reflect any changes in the index of the rows,
     * e.g. first/last/even/odd.
     * @return {?}
     */
    _updateRowIndexContext() {
        const /** @type {?} */ viewContainer = this._rowPlaceholder.viewContainer;
        for (let /** @type {?} */ index = 0, /** @type {?} */ count = viewContainer.length; index < count; index++) {
            const /** @type {?} */ viewRef = /** @type {?} */ (viewContainer.get(index));
            viewRef.context.index = index;
            viewRef.context.count = count;
            viewRef.context.first = index === 0;
            viewRef.context.last = index === count - 1;
            viewRef.context.even = index % 2 === 0;
            viewRef.context.odd = !viewRef.context.even;
        }
    }
    /**
     * Returns the cell template definitions to insert into the header
     * as defined by its list of columns to display.
     * @param {?} headerDef
     * @return {?}
     */
    _getHeaderCellTemplatesForRow(headerDef) {
        if (!headerDef.columns) {
            return [];
        }
        return headerDef.columns.map(columnId => {
            const /** @type {?} */ column = this._columnDefsByName.get(columnId);
            if (!column) {
                throw getTableUnknownColumnError(columnId);
            }
            return column.headerCell;
        });
    }
    /**
     * Returns the cell template definitions to insert in the provided row
     * as defined by its list of columns to display.
     * @param {?} rowDef
     * @return {?}
     */
    _getCellTemplatesForRow(rowDef) {
        if (!rowDef.columns) {
            return [];
        }
        return rowDef.columns.map(columnId => {
            const /** @type {?} */ column = this._columnDefsByName.get(columnId);
            if (!column) {
                throw getTableUnknownColumnError(columnId);
            }
            return column.cell;
        });
    }
}
CdkTable.decorators = [
    { type: Component, args: [{selector: 'cdk-table',
                exportAs: 'cdkTable',
                template: CDK_TABLE_TEMPLATE,
                host: {
                    'class': 'cdk-table',
                },
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
CdkTable.ctorParameters = () => [
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Attribute, args: ['role',] },] },
];
CdkTable.propDecorators = {
    "trackBy": [{ type: Input },],
    "dataSource": [{ type: Input },],
    "_rowPlaceholder": [{ type: ViewChild, args: [RowPlaceholder,] },],
    "_headerRowPlaceholder": [{ type: ViewChild, args: [HeaderRowPlaceholder,] },],
    "_columnDefs": [{ type: ContentChildren, args: [CdkColumnDef,] },],
    "_headerDef": [{ type: ContentChild, args: [CdkHeaderRowDef,] },],
    "_rowDefs": [{ type: ContentChildren, args: [CdkRowDef,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

const EXPORTED_DECLARATIONS = [
    CdkTable,
    CdkRowDef,
    CdkCellDef,
    CdkCellOutlet,
    CdkHeaderCellDef,
    CdkColumnDef,
    CdkCell,
    CdkRow,
    CdkHeaderCell,
    CdkHeaderRow,
    CdkHeaderRowDef,
    RowPlaceholder,
    HeaderRowPlaceholder,
];
class CdkTableModule {
}
CdkTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [EXPORTED_DECLARATIONS],
                declarations: [EXPORTED_DECLARATIONS]
            },] },
];
/** @nocollapse */
CdkTableModule.ctorParameters = () => [];

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

export { DataSource, RowPlaceholder, HeaderRowPlaceholder, CDK_TABLE_TEMPLATE, CdkTable, CdkCellDef, CdkHeaderCellDef, CdkColumnDef, CdkHeaderCell, CdkCell, CDK_ROW_TEMPLATE, BaseRowDef, CdkHeaderRowDef, CdkRowDef, CdkCellOutlet, CdkHeaderRow, CdkRow, CdkTableModule };
//# sourceMappingURL=table.js.map
