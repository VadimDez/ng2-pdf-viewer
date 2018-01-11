/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from 'tslib';
import * as tslib_1 from 'tslib';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EmbeddedViewRef, Input, IterableDiffers, NgModule, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, isDevMode } from '@angular/core';
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
var CDK_ROW_TEMPLATE = "<ng-container cdkCellOutlet></ng-container>";
/**
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
var BaseRowDef = /** @class */ (function () {
    function BaseRowDef(template, _differs) {
        this.template = template;
        this._differs = _differs;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseRowDef.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Create a new columns differ if one does not yet exist. Initialize it based on initial value
        // of the columns property or an empty array if none is provided.
        var /** @type {?} */ columns = changes['columns'].currentValue || [];
        if (!this._columnsDiffer) {
            this._columnsDiffer = this._differs.find(columns).create();
            this._columnsDiffer.diff(columns);
        }
    };
    /**
     * Returns the difference between the current columns and the columns from the last diff, or null
     * if there is no difference.
     */
    /**
     * Returns the difference between the current columns and the columns from the last diff, or null
     * if there is no difference.
     * @return {?}
     */
    BaseRowDef.prototype.getColumnsDiff = /**
     * Returns the difference between the current columns and the columns from the last diff, or null
     * if there is no difference.
     * @return {?}
     */
    function () {
        return this._columnsDiffer.diff(this.columns);
    };
    return BaseRowDef;
}());
/**
 * Header row definition for the CDK table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var CdkHeaderRowDef = /** @class */ (function (_super) {
    __extends(CdkHeaderRowDef, _super);
    function CdkHeaderRowDef(template, _differs) {
        return _super.call(this, template, _differs) || this;
    }
    CdkHeaderRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkHeaderRowDef]',
                    inputs: ['columns: cdkHeaderRowDef'],
                },] },
    ];
    /** @nocollapse */
    CdkHeaderRowDef.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: IterableDiffers, },
    ]; };
    return CdkHeaderRowDef;
}(BaseRowDef));
/**
 * Data row definition for the CDK table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
var CdkRowDef = /** @class */ (function (_super) {
    __extends(CdkRowDef, _super);
    // TODO(andrewseguin): Add an input for providing a switch function to determine
    //   if this template should be used.
    function CdkRowDef(template, _differs) {
        return _super.call(this, template, _differs) || this;
    }
    CdkRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkRowDef]',
                    inputs: ['columns: cdkRowDefColumns', 'when: cdkRowDefWhen'],
                },] },
    ];
    /** @nocollapse */
    CdkRowDef.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: IterableDiffers, },
    ]; };
    return CdkRowDef;
}(BaseRowDef));
/**
 * Context provided to the row cells
 * @record
 */

/**
 * Outlet for rendering cells inside of a row or header row.
 * \@docs-private
 */
var CdkCellOutlet = /** @class */ (function () {
    function CdkCellOutlet(_viewContainer) {
        this._viewContainer = _viewContainer;
        CdkCellOutlet.mostRecentCellOutlet = this;
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
    CdkCellOutlet.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return CdkCellOutlet;
}());
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
var CdkHeaderRow = /** @class */ (function () {
    function CdkHeaderRow() {
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
    CdkHeaderRow.ctorParameters = function () { return []; };
    return CdkHeaderRow;
}());
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
var CdkRow = /** @class */ (function () {
    function CdkRow() {
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
    CdkRow.ctorParameters = function () { return []; };
    return CdkRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var CdkCellDef = /** @class */ (function () {
    function CdkCellDef(template) {
        this.template = template;
    }
    CdkCellDef.decorators = [
        { type: Directive, args: [{ selector: '[cdkCellDef]' },] },
    ];
    /** @nocollapse */
    CdkCellDef.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return CdkCellDef;
}());
/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var CdkHeaderCellDef = /** @class */ (function () {
    function CdkHeaderCellDef(template) {
        this.template = template;
    }
    CdkHeaderCellDef.decorators = [
        { type: Directive, args: [{ selector: '[cdkHeaderCellDef]' },] },
    ];
    /** @nocollapse */
    CdkHeaderCellDef.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return CdkHeaderCellDef;
}());
/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
var CdkColumnDef = /** @class */ (function () {
    function CdkColumnDef() {
    }
    Object.defineProperty(CdkColumnDef.prototype, "name", {
        get: /**
         * Unique name for this column.
         * @return {?}
         */
        function () { return this._name; },
        set: /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            this._name = name;
            this.cssClassFriendlyName = name.replace(/[^a-z0-9_-]/ig, '-');
        },
        enumerable: true,
        configurable: true
    });
    CdkColumnDef.decorators = [
        { type: Directive, args: [{ selector: '[cdkColumnDef]' },] },
    ];
    /** @nocollapse */
    CdkColumnDef.ctorParameters = function () { return []; };
    CdkColumnDef.propDecorators = {
        "name": [{ type: Input, args: ['cdkColumnDef',] },],
        "cell": [{ type: ContentChild, args: [CdkCellDef,] },],
        "headerCell": [{ type: ContentChild, args: [CdkHeaderCellDef,] },],
    };
    return CdkColumnDef;
}());
/**
 * Header cell template container that adds the right classes and role.
 */
var CdkHeaderCell = /** @class */ (function () {
    function CdkHeaderCell(columnDef, elementRef) {
        elementRef.nativeElement.classList.add("cdk-column-" + columnDef.cssClassFriendlyName);
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
    CdkHeaderCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return CdkHeaderCell;
}());
/**
 * Cell template container that adds the right classes and role.
 */
var CdkCell = /** @class */ (function () {
    function CdkCell(columnDef, elementRef) {
        elementRef.nativeElement.classList.add("cdk-column-" + columnDef.cssClassFriendlyName);
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
    CdkCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return CdkCell;
}());

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
    return Error("Could not find column with id \"" + id + "\".");
}
/**
 * Returns an error to be thrown when two column definitions have the same name.
 * \@docs-private
 * @param {?} name
 * @return {?}
 */
function getTableDuplicateColumnNameError(name) {
    return Error("Duplicate column definition name provided: \"" + name + "\".");
}
/**
 * Returns an error to be thrown when there are multiple rows that are missing a when function.
 * \@docs-private
 * @return {?}
 */
function getTableMultipleDefaultRowDefsError() {
    return Error("There can only be one default row without a when predicate function.");
}
/**
 * Returns an error to be thrown when there are no matching row defs for a particular set of data.
 * \@docs-private
 * @return {?}
 */
function getTableMissingMatchingRowDefError() {
    return Error("Could not find a matching row definition for the provided row data.");
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
var RowPlaceholder = /** @class */ (function () {
    function RowPlaceholder(viewContainer) {
        this.viewContainer = viewContainer;
    }
    RowPlaceholder.decorators = [
        { type: Directive, args: [{ selector: '[rowPlaceholder]' },] },
    ];
    /** @nocollapse */
    RowPlaceholder.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return RowPlaceholder;
}());
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * \@docs-private
 */
var HeaderRowPlaceholder = /** @class */ (function () {
    function HeaderRowPlaceholder(viewContainer) {
        this.viewContainer = viewContainer;
    }
    HeaderRowPlaceholder.decorators = [
        { type: Directive, args: [{ selector: '[headerRowPlaceholder]' },] },
    ];
    /** @nocollapse */
    HeaderRowPlaceholder.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return HeaderRowPlaceholder;
}());
/**
 * The table template that can be used by the mat-table. Should not be used outside of the
 * material library.
 */
var CDK_TABLE_TEMPLATE = "\n  <ng-container headerRowPlaceholder></ng-container>\n  <ng-container rowPlaceholder></ng-container>";
/**
 * Class used to conveniently type the embedded view ref for rows with a context.
 * \@docs-private
 * @abstract
 */
var RowViewRef = /** @class */ (function (_super) {
    __extends(RowViewRef, _super);
    function RowViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowViewRef;
}(EmbeddedViewRef));
/**
 * A data table that connects with a data source to retrieve data of type `T` and renders
 * a header row and data rows. Updates the rows when new data is provided by the data source.
 */
var CdkTable = /** @class */ (function () {
    function CdkTable(_differs, _changeDetectorRef, elementRef, role) {
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
    Object.defineProperty(CdkTable.prototype, "trackBy", {
        get: /**
         * Tracking function that will be used to check the differences in data changes. Used similarly
         * to `ngFor` `trackBy` function. Optimize row operations by identifying a row based on its data
         * relative to the function to know if a row should be added/removed/moved.
         * Accepts a function that takes two parameters, `index` and `item`.
         * @return {?}
         */
        function () { return this._trackByFn; },
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            if (isDevMode() &&
                fn != null && typeof fn !== 'function' && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
                console.warn("trackBy must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._trackByFn = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTable.prototype, "dataSource", {
        get: /**
         * Provides a stream containing the latest data array to render. Influenced by the table's
         * stream of view window (what rows are currently on screen).
         * @return {?}
         */
        function () { return this._dataSource; },
        set: /**
         * @param {?} dataSource
         * @return {?}
         */
        function (dataSource) {
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkTable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // TODO(andrewseguin): Setup a listener for scrolling, emit the calculated view to viewChange
        this._dataDiffer = this._differs.find([]).create(this._trackByFn);
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._headerDef && !this._rowDefs.length) {
            throw getTableMissingRowDefsError();
        }
        this._cacheColumnDefsByName();
        this._columnDefs.changes.subscribe(function () { return _this._cacheColumnDefsByName(); });
        this._renderHeaderRow();
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this._renderUpdatedColumns();
        var /** @type {?} */ defaultRowDefs = this._rowDefs.filter(function (def) { return !def.when; });
        if (defaultRowDefs.length > 1) {
            throw getTableMultipleDefaultRowDefsError();
        }
        this._defaultRowDef = defaultRowDefs[0];
        if (this.dataSource && !this._renderChangeSubscription) {
            this._observeRenderChanges();
        }
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._rowPlaceholder.viewContainer.clear();
        this._headerRowPlaceholder.viewContainer.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this.dataSource) {
            this.dataSource.disconnect(this);
        }
    };
    /**
     * Update the map containing the content's column definitions.
     * @return {?}
     */
    CdkTable.prototype._cacheColumnDefsByName = /**
     * Update the map containing the content's column definitions.
     * @return {?}
     */
    function () {
        var _this = this;
        this._columnDefsByName.clear();
        this._columnDefs.forEach(function (columnDef) {
            if (_this._columnDefsByName.has(columnDef.name)) {
                throw getTableDuplicateColumnNameError(columnDef.name);
            }
            _this._columnDefsByName.set(columnDef.name, columnDef);
        });
    };
    /**
     * Check if the header or rows have changed what columns they want to display. If there is a diff,
     * then re-render that section.
     * @return {?}
     */
    CdkTable.prototype._renderUpdatedColumns = /**
     * Check if the header or rows have changed what columns they want to display. If there is a diff,
     * then re-render that section.
     * @return {?}
     */
    function () {
        var _this = this;
        // Re-render the rows when the row definition columns change.
        this._rowDefs.forEach(function (def) {
            if (!!def.getColumnsDiff()) {
                // Reset the data to an empty array so that renderRowChanges will re-render all new rows.
                // Reset the data to an empty array so that renderRowChanges will re-render all new rows.
                _this._dataDiffer.diff([]);
                _this._rowPlaceholder.viewContainer.clear();
                _this._renderRowChanges();
            }
        });
        // Re-render the header row if there is a difference in its columns.
        if (this._headerDef.getColumnsDiff()) {
            this._headerRowPlaceholder.viewContainer.clear();
            this._renderHeaderRow();
        }
    };
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row placeholder. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    CdkTable.prototype._switchDataSource = /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row placeholder. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    function (dataSource) {
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
    };
    /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    CdkTable.prototype._observeRenderChanges = /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    function () {
        var _this = this;
        this._renderChangeSubscription = this.dataSource.connect(this).pipe(takeUntil(this._onDestroy))
            .subscribe(function (data) {
            _this._data = data;
            _this._renderRowChanges();
        });
    };
    /**
     * Create the embedded view for the header template and place it in the header row view container.
     * @return {?}
     */
    CdkTable.prototype._renderHeaderRow = /**
     * Create the embedded view for the header template and place it in the header row view container.
     * @return {?}
     */
    function () {
        var /** @type {?} */ cells = this._getHeaderCellTemplatesForRow(this._headerDef);
        if (!cells.length) {
            return;
        }
        // TODO(andrewseguin): add some code to enforce that exactly
        //   one CdkCellOutlet was instantiated as a result
        //   of `createEmbeddedView`.
        this._headerRowPlaceholder.viewContainer
            .createEmbeddedView(this._headerDef.template, { cells: cells });
        cells.forEach(function (cell) {
            if (CdkCellOutlet.mostRecentCellOutlet) {
                CdkCellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(cell.template, {});
            }
        });
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Check for changes made in the data and render each change (row added/removed/moved) and update
     * row contexts.
     * @return {?}
     */
    CdkTable.prototype._renderRowChanges = /**
     * Check for changes made in the data and render each change (row added/removed/moved) and update
     * row contexts.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ changes = this._dataDiffer.diff(this._data);
        if (!changes) {
            return;
        }
        var /** @type {?} */ viewContainer = this._rowPlaceholder.viewContainer;
        changes.forEachOperation(function (record, adjustedPreviousIndex, currentIndex) {
            if (record.previousIndex == null) {
                _this._insertRow(record.item, currentIndex);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                var /** @type {?} */ view = /** @type {?} */ (viewContainer.get(adjustedPreviousIndex));
                viewContainer.move(/** @type {?} */ ((view)), currentIndex);
            }
        });
        // Update the meta context of a row's context data (index, count, first, last, ...)
        this._updateRowIndexContext();
        // Update rows that did not get added/removed/moved but may have had their identity changed,
        // e.g. if trackBy matched data on some property but the actual data reference changed.
        changes.forEachIdentityChange(function (record) {
            var /** @type {?} */ rowView = /** @type {?} */ (viewContainer.get(/** @type {?} */ ((record.currentIndex))));
            rowView.context.$implicit = record.item;
        });
    };
    /**
     * Finds the matching row definition that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definition that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     */
    /**
     * Finds the matching row definition that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definition that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    CdkTable.prototype._getRowDef = /**
     * Finds the matching row definition that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definition that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    function (data, i) {
        if (this._rowDefs.length == 1) {
            return this._rowDefs.first;
        }
        var /** @type {?} */ rowDef = this._rowDefs.find(function (def) { return def.when && def.when(i, data); }) || this._defaultRowDef;
        if (!rowDef) {
            throw getTableMissingMatchingRowDefError();
        }
        return rowDef;
    };
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} rowData
     * @param {?} index
     * @return {?}
     */
    CdkTable.prototype._insertRow = /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} rowData
     * @param {?} index
     * @return {?}
     */
    function (rowData, index) {
        var /** @type {?} */ row = this._getRowDef(rowData, index);
        // Row context that will be provided to both the created embedded row view and its cells.
        var /** @type {?} */ context = { $implicit: rowData };
        // TODO(andrewseguin): add some code to enforce that exactly one
        //   CdkCellOutlet was instantiated as a result  of `createEmbeddedView`.
        this._rowPlaceholder.viewContainer.createEmbeddedView(row.template, context, index);
        this._getCellTemplatesForRow(row).forEach(function (cell) {
            if (CdkCellOutlet.mostRecentCellOutlet) {
                CdkCellOutlet.mostRecentCellOutlet._viewContainer
                    .createEmbeddedView(cell.template, context);
            }
        });
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Updates the index-related context for each row to reflect any changes in the index of the rows,
     * e.g. first/last/even/odd.
     * @return {?}
     */
    CdkTable.prototype._updateRowIndexContext = /**
     * Updates the index-related context for each row to reflect any changes in the index of the rows,
     * e.g. first/last/even/odd.
     * @return {?}
     */
    function () {
        var /** @type {?} */ viewContainer = this._rowPlaceholder.viewContainer;
        for (var /** @type {?} */ index = 0, /** @type {?} */ count = viewContainer.length; index < count; index++) {
            var /** @type {?} */ viewRef = /** @type {?} */ (viewContainer.get(index));
            viewRef.context.index = index;
            viewRef.context.count = count;
            viewRef.context.first = index === 0;
            viewRef.context.last = index === count - 1;
            viewRef.context.even = index % 2 === 0;
            viewRef.context.odd = !viewRef.context.even;
        }
    };
    /**
     * Returns the cell template definitions to insert into the header
     * as defined by its list of columns to display.
     * @param {?} headerDef
     * @return {?}
     */
    CdkTable.prototype._getHeaderCellTemplatesForRow = /**
     * Returns the cell template definitions to insert into the header
     * as defined by its list of columns to display.
     * @param {?} headerDef
     * @return {?}
     */
    function (headerDef) {
        var _this = this;
        if (!headerDef.columns) {
            return [];
        }
        return headerDef.columns.map(function (columnId) {
            var /** @type {?} */ column = _this._columnDefsByName.get(columnId);
            if (!column) {
                throw getTableUnknownColumnError(columnId);
            }
            return column.headerCell;
        });
    };
    /**
     * Returns the cell template definitions to insert in the provided row
     * as defined by its list of columns to display.
     * @param {?} rowDef
     * @return {?}
     */
    CdkTable.prototype._getCellTemplatesForRow = /**
     * Returns the cell template definitions to insert in the provided row
     * as defined by its list of columns to display.
     * @param {?} rowDef
     * @return {?}
     */
    function (rowDef) {
        var _this = this;
        if (!rowDef.columns) {
            return [];
        }
        return rowDef.columns.map(function (columnId) {
            var /** @type {?} */ column = _this._columnDefsByName.get(columnId);
            if (!column) {
                throw getTableUnknownColumnError(columnId);
            }
            return column.cell;
        });
    };
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
    CdkTable.ctorParameters = function () { return [
        { type: IterableDiffers, },
        { type: ChangeDetectorRef, },
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Attribute, args: ['role',] },] },
    ]; };
    CdkTable.propDecorators = {
        "trackBy": [{ type: Input },],
        "dataSource": [{ type: Input },],
        "_rowPlaceholder": [{ type: ViewChild, args: [RowPlaceholder,] },],
        "_headerRowPlaceholder": [{ type: ViewChild, args: [HeaderRowPlaceholder,] },],
        "_columnDefs": [{ type: ContentChildren, args: [CdkColumnDef,] },],
        "_headerDef": [{ type: ContentChild, args: [CdkHeaderRowDef,] },],
        "_rowDefs": [{ type: ContentChildren, args: [CdkRowDef,] },],
    };
    return CdkTable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var EXPORTED_DECLARATIONS = [
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
var CdkTableModule = /** @class */ (function () {
    function CdkTableModule() {
    }
    CdkTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [EXPORTED_DECLARATIONS],
                    declarations: [EXPORTED_DECLARATIONS]
                },] },
    ];
    /** @nocollapse */
    CdkTableModule.ctorParameters = function () { return []; };
    return CdkTableModule;
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

export { DataSource, RowPlaceholder, HeaderRowPlaceholder, CDK_TABLE_TEMPLATE, CdkTable, CdkCellDef, CdkHeaderCellDef, CdkColumnDef, CdkHeaderCell, CdkCell, CDK_ROW_TEMPLATE, BaseRowDef, CdkHeaderRowDef, CdkRowDef, CdkCellOutlet, CdkHeaderRow, CdkRow, CdkTableModule };
//# sourceMappingURL=table.es5.js.map
