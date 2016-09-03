import { AsyncValidatorFn, ValidatorFn } from './directives/validators';
import { Observable } from './facade/async';
/**
 * Indicates that a FormControl is valid, i.e. that no errors exist in the input value.
 */
export declare const VALID: string;
/**
 * Indicates that a FormControl is invalid, i.e. that an error exists in the input value.
 */
export declare const INVALID: string;
/**
 * Indicates that a FormControl is pending, i.e. that async validation is occurring and
 * errors are not yet available for the input value.
 */
export declare const PENDING: string;
/**
 * Indicates that a FormControl is disabled, i.e. that the control is exempt from ancestor
 * calculations of validity or value.
 */
export declare const DISABLED: string;
export declare function isControl(control: Object): boolean;
/**
 * @stable
 */
export declare abstract class AbstractControl {
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    private _valueChanges;
    private _statusChanges;
    private _status;
    private _errors;
    private _pristine;
    private _touched;
    private _parent;
    private _asyncValidationSubscription;
    constructor(validator: ValidatorFn, asyncValidator: AsyncValidatorFn);
    value: any;
    status: string;
    valid: boolean;
    invalid: boolean;
    /**
     * Returns the errors of this control.
     */
    errors: {
        [key: string]: any;
    };
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    valueChanges: Observable<any>;
    statusChanges: Observable<any>;
    pending: boolean;
    disabled: boolean;
    enabled: boolean;
    setAsyncValidators(newValidator: AsyncValidatorFn | AsyncValidatorFn[]): void;
    clearAsyncValidators(): void;
    setValidators(newValidator: ValidatorFn | ValidatorFn[]): void;
    clearValidators(): void;
    markAsTouched({onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    markAsDirty({onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    markAsPristine({onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    markAsUntouched({onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    markAsPending({onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    disable({onlySelf, emitEvent}?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    enable({onlySelf, emitEvent}?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    private _updateAncestors(onlySelf);
    setParent(parent: FormGroup | FormArray): void;
    abstract setValue(value: any, options?: Object): void;
    abstract patchValue(value: any, options?: Object): void;
    abstract reset(value?: any, options?: Object): void;
    updateValueAndValidity({onlySelf, emitEvent}?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    private _runValidator();
    private _runAsyncValidator(emitEvent);
    private _cancelExistingSubscription();
    private _disabledChanged(originalStatus);
    /**
     * Sets errors on a form control.
     *
     * This is used when validations are run not automatically, but manually by the user.
     *
     * Calling `setErrors` will also update the validity of the parent control.
     *
     * ## Usage
     *
     * ```
     * var login = new FormControl("someLogin");
     * login.setErrors({
     *   "notUnique": true
     * });
     *
     * expect(login.valid).toEqual(false);
     * expect(login.errors).toEqual({"notUnique": true});
     *
     * login.updateValue("someOtherLogin");
     *
     * expect(login.valid).toEqual(true);
     * ```
     */
    setErrors(errors: {
        [key: string]: any;
    }, {emitEvent}?: {
        emitEvent?: boolean;
    }): void;
    get(path: Array<string | number> | string): AbstractControl;
    getError(errorCode: string, path?: string[]): any;
    hasError(errorCode: string, path?: string[]): boolean;
    root: AbstractControl;
    private _calculateStatus();
}
/**
 * Defines a part of a form that cannot be divided into other controls. `FormControl`s have values
 * and
 * validation state, which is determined by an optional validation function.
 *
 * `FormControl` is one of the three fundamental building blocks used to define forms in Angular,
 * along
 * with {@link FormGroup} and {@link FormArray}.
 *
 * ## Usage
 *
 * By default, a `FormControl` is created for every `<input>` or other form component.
 * With {@link FormControlDirective} or {@link FormGroupDirective} an existing {@link FormControl}
 * can be bound to a DOM element instead. This `FormControl` can be configured with a custom
 * validation function.
 *
 * @stable
 */
export declare class FormControl extends AbstractControl {
    constructor(formState?: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]);
    /**
     * Set the value of the form control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `FormControl`
     * and not its parent component. If `emitEvent` is `true`, this change will cause a
     * `valueChanges` event on the `FormControl` to be emitted. Both of these options default to
     * `false`.
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     *
     * If `emitViewToModelChange` is `true`, an ngModelChange event will be fired to update the
     * model.  This is the default behavior if `emitViewToModelChange` is not specified.
     */
    setValue(value: any, {onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange}?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;
    /**
     * This function is functionally the same as updateValue() at this level.  It exists for
     * symmetry with patchValue() on FormGroups and FormArrays, where it does behave differently.
     */
    patchValue(value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;
    reset(formState?: any, {onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    /**
     * Register a listener for change events.
     */
    registerOnChange(fn: Function): void;
    /**
     * Register a listener for disabled events.
     */
    registerOnDisabledChange(fn: (isDisabled: boolean) => void): void;
    private _applyFormState(formState);
}
/**
 * Defines a part of a form, of fixed length, that can contain other controls.
 *
 * A `FormGroup` aggregates the values of each {@link FormControl} in the group.
 * The status of a `FormGroup` depends on the status of its children.
 * If one of the controls in a group is invalid, the entire group is invalid.
 * Similarly, if a control changes its value, the entire group changes as well.
 *
 * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link FormControl} and {@link FormArray}. {@link FormArray} can also contain other
 * controls, but is of variable length.
 *
 *
 * @stable
 */
export declare class FormGroup extends AbstractControl {
    controls: {
        [key: string]: AbstractControl;
    };
    constructor(controls: {
        [key: string]: AbstractControl;
    }, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn);
    /**
     * Register a control with the group's list of controls.
     */
    registerControl(name: string, control: AbstractControl): AbstractControl;
    /**
     * Add a control to this group.
     */
    addControl(name: string, control: AbstractControl): void;
    /**
     * Remove a control from this group.
     */
    removeControl(name: string): void;
    /**
     * Check whether there is a control with the given name in the group.
     */
    contains(controlName: string): boolean;
    setValue(value: {
        [key: string]: any;
    }, {onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    patchValue(value: {
        [key: string]: any;
    }, {onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    reset(value?: any, {onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    getRawValue(): Object;
}
/**
 * Defines a part of a form, of variable length, that can contain other controls.
 *
 * A `FormArray` aggregates the values of each {@link FormControl} in the group.
 * The status of a `FormArray` depends on the status of its children.
 * If one of the controls in a group is invalid, the entire array is invalid.
 * Similarly, if a control changes its value, the entire array changes as well.
 *
 * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link FormControl} and {@link FormGroup}. {@link FormGroup} can also contain
 * other controls, but is of fixed length.
 *
 * ## Adding or removing controls
 *
 * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
 * in `FormArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `FormArray` directly, as that will result in strange and unexpected behavior such
 * as broken change detection.
 *
 *
 * @stable
 */
export declare class FormArray extends AbstractControl {
    controls: AbstractControl[];
    constructor(controls: AbstractControl[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn);
    /**
     * Get the {@link AbstractControl} at the given `index` in the array.
     */
    at(index: number): AbstractControl;
    /**
     * Insert a new {@link AbstractControl} at the end of the array.
     */
    push(control: AbstractControl): void;
    /**
     * Insert a new {@link AbstractControl} at the given `index` in the array.
     */
    insert(index: number, control: AbstractControl): void;
    /**
     * Remove the control at the given `index` in the array.
     */
    removeAt(index: number): void;
    /**
     * Length of the control array.
     */
    length: number;
    setValue(value: any[], {onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    patchValue(value: any[], {onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    reset(value?: any, {onlySelf}?: {
        onlySelf?: boolean;
    }): void;
    getRawValue(): any[];
}
