/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanDisable, CanDisableRipple, HasTabIndex, MatLine } from '@angular/material/core';
/** @docs-private */
export declare class MatSelectionListBase {
}
export declare const _MatSelectionListMixinBase: (new (...args: any[]) => HasTabIndex) & (new (...args: any[]) => CanDisableRipple) & (new (...args: any[]) => CanDisable) & typeof MatSelectionListBase;
/** @docs-private */
export declare class MatListOptionBase {
}
export declare const _MatListOptionMixinBase: (new (...args: any[]) => CanDisableRipple) & typeof MatListOptionBase;
/** @docs-private */
export declare const MAT_SELECTION_LIST_VALUE_ACCESSOR: any;
/**
 * Change event object emitted by MatListOption whenever the selected state changes.
 * @deprecated Use the `MatSelectionListChange` event on the selection list instead.
 */
export declare class MatListOptionChange {
    /** Reference to the list option that changed. */
    source: MatListOption;
    /** The new selected state of the option. */
    selected: boolean;
    constructor(
        /** Reference to the list option that changed. */
        source: MatListOption, 
        /** The new selected state of the option. */
        selected: boolean);
}
/** Change event that is being fired whenever the selected state of an option changes. */
export declare class MatSelectionListChange {
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList;
    /** Reference to the option that has been changed. */
    option: MatListOption;
    constructor(
        /** Reference to the selection list that emitted the event. */
        source: MatSelectionList, 
        /** Reference to the option that has been changed. */
        option: MatListOption);
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export declare class MatListOption extends _MatListOptionMixinBase implements AfterContentInit, OnDestroy, OnInit, FocusableOption, CanDisableRipple {
    private _element;
    private _changeDetector;
    selectionList: MatSelectionList;
    private _lineSetter;
    private _selected;
    private _disabled;
    /** Whether the option has focus. */
    _hasFocus: boolean;
    _lines: QueryList<MatLine>;
    /** DOM element containing the item's text. */
    _text: ElementRef;
    /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
    checkboxPosition: 'before' | 'after';
    /** Value of the option */
    value: any;
    /** Whether the option is disabled. */
    disabled: any;
    /** Whether the option is selected. */
    selected: boolean;
    /**
     * Emits a change event whenever the selected state of an option changes.
     * @deprecated Use the `selectionChange` event on the `<mat-selection-list>` instead.
     */
    selectionChange: EventEmitter<MatListOptionChange>;
    constructor(_element: ElementRef, _changeDetector: ChangeDetectorRef, selectionList: MatSelectionList);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Toggles the selection state of the option. */
    toggle(): void;
    /** Allows for programmatic focusing of the option. */
    focus(): void;
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    getLabel(): any;
    /** Whether this list item should show a ripple effect when clicked.  */
    _isRippleDisabled(): any;
    _handleClick(): void;
    _handleFocus(): void;
    _handleBlur(): void;
    /** Retrieves the DOM element of the component host. */
    _getHostElement(): HTMLElement;
    /** Sets the selected state of the option. */
    _setSelected(selected: boolean): void;
    /** Emits a selectionChange event for this option. */
    _emitDeprecatedChangeEvent(): void;
}
/**
 * Material Design list component where each item is a selectable option. Behaves as a listbox.
 */
export declare class MatSelectionList extends _MatSelectionListMixinBase implements FocusableOption, CanDisable, CanDisableRipple, HasTabIndex, AfterContentInit, ControlValueAccessor {
    private _element;
    /** The FocusKeyManager which handles focus. */
    _keyManager: FocusKeyManager<MatListOption>;
    /** The option components contained within this selection-list. */
    options: QueryList<MatListOption>;
    /** Emits a change event whenever the selected state of an option changes. */
    selectionChange: EventEmitter<MatSelectionListChange>;
    /** The currently selected options. */
    selectedOptions: SelectionModel<MatListOption>;
    /** View to model callback that should be called whenever the selected options change. */
    private _onChange;
    /** Used for storing the values that were assigned before the options were initialized. */
    private _tempValues;
    /** View to model callback that should be called if the list or its options lost focus. */
    onTouched: () => void;
    constructor(_element: ElementRef, tabIndex: string);
    ngAfterContentInit(): void;
    /** Focus the selection-list. */
    focus(): void;
    /** Selects all of the options. */
    selectAll(): void;
    /** Deselects all of the options. */
    deselectAll(): void;
    /** Sets the focused option of the selection-list. */
    _setFocusedOption(option: MatListOption): void;
    /** Removes an option from the selection list and updates the active item. */
    _removeOptionFromList(option: MatListOption): void;
    /** Passes relevant key presses to our key manager. */
    _keydown(event: KeyboardEvent): void;
    /** Reports a value change to the ControlValueAccessor */
    _reportValueChange(): void;
    /** Emits a change event if the selected state of an option changed. */
    _emitChangeEvent(option: MatListOption): void;
    /** Implemented as part of ControlValueAccessor. */
    writeValue(values: string[]): void;
    /** Implemented as a part of ControlValueAccessor. */
    setDisabledState(isDisabled: boolean): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: (value: any) => void): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: () => void): void;
    /** Returns the option with the specified value. */
    private _getOptionByValue(value);
    /** Sets the selected options based on the specified values. */
    private _setOptionsFromValues(values);
    /** Returns the values of the selected options. */
    private _getSelectedOptionValues();
    /** Toggles the selected state of the currently focused option. */
    private _toggleSelectOnFocusedOption();
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    private _isValidIndex(index);
    /** Returns the index of the specified list option. */
    private _getOptionIndex(option);
}
