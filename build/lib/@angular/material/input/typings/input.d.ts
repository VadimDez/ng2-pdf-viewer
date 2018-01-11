import { Platform } from '@angular/cdk/platform';
import { DoCheck, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, CanUpdateErrorState } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs/Subject';
/** @docs-private */
export declare class MatInputBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
export declare const _MatInputMixinBase: (new (...args: any[]) => CanUpdateErrorState) & typeof MatInputBase;
/** Directive that allows a native input to work inside a `MatFormField`. */
export declare class MatInput extends _MatInputMixinBase implements MatFormFieldControl<any>, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState {
    protected _elementRef: ElementRef;
    protected _platform: Platform;
    ngControl: NgControl;
    /** Variables used as cache for getters and setters. */
    protected _type: string;
    protected _disabled: boolean;
    protected _required: boolean;
    protected _id: string;
    protected _uid: string;
    protected _previousNativeValue: any;
    private _readonly;
    private _inputValueAccessor;
    /** Whether the input is focused. */
    focused: boolean;
    /** The aria-describedby attribute on the input for improved a11y. */
    _ariaDescribedby: string;
    /** Whether the component is being rendered on the server. */
    _isServer: boolean;
    /**
     * Stream that emits whenever the state of the input changes such that the wrapping `MatFormField`
     * needs to run change detection.
     */
    stateChanges: Subject<void>;
    /** A name for this control that can be used by `mat-form-field`. */
    controlType: string;
    /** Whether the element is disabled. */
    disabled: any;
    /** Unique id of the element. */
    id: string;
    /** Placeholder attribute of the element. */
    placeholder: string;
    /** Whether the element is required. */
    required: any;
    /** Input type of the element. */
    type: string;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /** The input element's value. */
    value: any;
    /** Whether the element is readonly. */
    readonly: any;
    protected _neverEmptyInputTypes: string[];
    constructor(_elementRef: ElementRef, _platform: Platform, ngControl: NgControl, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, _defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    focus(): void;
    /** Callback for the cases where the focused state of the input changes. */
    _focusChanged(isFocused: boolean): void;
    _onInput(): void;
    /** Does some manual dirty checking on the native input `value` property. */
    protected _dirtyCheckNativeValue(): void;
    /** Make sure the input is a supported type. */
    protected _validateType(): void;
    /** Checks whether the input type is one of the types that are never empty. */
    protected _isNeverEmpty(): boolean;
    /** Checks whether the input is invalid based on the native validation. */
    protected _isBadInput(): boolean;
    /** Determines if the component host is a textarea. If not recognizable it returns false. */
    protected _isTextarea(): boolean;
    readonly empty: boolean;
    readonly shouldLabelFloat: boolean;
    setDescribedByIds(ids: string[]): void;
    onContainerClick(): void;
}
