/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { composeAsyncValidators, composeValidators } from './directives/shared';
import { EventEmitter } from './facade/async';
import { ListWrapper, StringMapWrapper } from './facade/collection';
import { BaseException } from './facade/exceptions';
import { isBlank, isPresent, isPromise, normalizeBool } from './facade/lang';
/**
 * Indicates that a FormControl is valid, i.e. that no errors exist in the input value.
 */
export const VALID = 'VALID';
/**
 * Indicates that a FormControl is invalid, i.e. that an error exists in the input value.
 */
export const INVALID = 'INVALID';
/**
 * Indicates that a FormControl is pending, i.e. that async validation is occurring and
 * errors are not yet available for the input value.
 */
export const PENDING = 'PENDING';
export function isControl(control) {
    return control instanceof AbstractControl;
}
function _find(control, path, delimiter) {
    if (isBlank(path))
        return null;
    if (!(path instanceof Array)) {
        path = path.split(delimiter);
    }
    if (path instanceof Array && ListWrapper.isEmpty(path))
        return null;
    return path.reduce((v, name) => {
        if (v instanceof FormGroup) {
            return isPresent(v.controls[name]) ? v.controls[name] : null;
        }
        else if (v instanceof FormArray) {
            var index = name;
            return isPresent(v.at(index)) ? v.at(index) : null;
        }
        else {
            return null;
        }
    }, control);
}
function toObservable(r) {
    return isPromise(r) ? PromiseObservable.create(r) : r;
}
function coerceToValidator(validator) {
    return Array.isArray(validator) ? composeValidators(validator) : validator;
}
function coerceToAsyncValidator(asyncValidator) {
    return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator;
}
/**
 * @experimental
 */
export class AbstractControl {
    constructor(validator, asyncValidator) {
        this.validator = validator;
        this.asyncValidator = asyncValidator;
        this._pristine = true;
        this._touched = false;
    }
    get value() { return this._value; }
    get status() { return this._status; }
    get valid() { return this._status === VALID; }
    get invalid() { return this._status === INVALID; }
    /**
     * Returns the errors of this control.
     */
    get errors() { return this._errors; }
    get pristine() { return this._pristine; }
    get dirty() { return !this.pristine; }
    get touched() { return this._touched; }
    get untouched() { return !this._touched; }
    get valueChanges() { return this._valueChanges; }
    get statusChanges() { return this._statusChanges; }
    get pending() { return this._status == PENDING; }
    setAsyncValidators(newValidator) {
        this.asyncValidator = coerceToAsyncValidator(newValidator);
    }
    clearAsyncValidators() { this.asyncValidator = null; }
    setValidators(newValidator) {
        this.validator = coerceToValidator(newValidator);
    }
    clearValidators() { this.validator = null; }
    markAsTouched({ onlySelf } = {}) {
        onlySelf = normalizeBool(onlySelf);
        this._touched = true;
        if (isPresent(this._parent) && !onlySelf) {
            this._parent.markAsTouched({ onlySelf: onlySelf });
        }
    }
    markAsDirty({ onlySelf } = {}) {
        onlySelf = normalizeBool(onlySelf);
        this._pristine = false;
        if (isPresent(this._parent) && !onlySelf) {
            this._parent.markAsDirty({ onlySelf: onlySelf });
        }
    }
    markAsPristine({ onlySelf } = {}) {
        this._pristine = true;
        this._forEachChild((control) => { control.markAsPristine({ onlySelf: true }); });
        if (isPresent(this._parent) && !onlySelf) {
            this._parent._updatePristine({ onlySelf: onlySelf });
        }
    }
    markAsUntouched({ onlySelf } = {}) {
        this._touched = false;
        this._forEachChild((control) => { control.markAsUntouched({ onlySelf: true }); });
        if (isPresent(this._parent) && !onlySelf) {
            this._parent._updateTouched({ onlySelf: onlySelf });
        }
    }
    markAsPending({ onlySelf } = {}) {
        onlySelf = normalizeBool(onlySelf);
        this._status = PENDING;
        if (isPresent(this._parent) && !onlySelf) {
            this._parent.markAsPending({ onlySelf: onlySelf });
        }
    }
    setParent(parent) { this._parent = parent; }
    updateValueAndValidity({ onlySelf, emitEvent } = {}) {
        onlySelf = normalizeBool(onlySelf);
        emitEvent = isPresent(emitEvent) ? emitEvent : true;
        this._updateValue();
        this._errors = this._runValidator();
        this._status = this._calculateStatus();
        if (this._status == VALID || this._status == PENDING) {
            this._runAsyncValidator(emitEvent);
        }
        if (emitEvent) {
            this._valueChanges.emit(this._value);
            this._statusChanges.emit(this._status);
        }
        if (isPresent(this._parent) && !onlySelf) {
            this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
        }
    }
    _runValidator() {
        return isPresent(this.validator) ? this.validator(this) : null;
    }
    _runAsyncValidator(emitEvent) {
        if (isPresent(this.asyncValidator)) {
            this._status = PENDING;
            this._cancelExistingSubscription();
            var obs = toObservable(this.asyncValidator(this));
            this._asyncValidationSubscription = obs.subscribe({ next: (res) => this.setErrors(res, { emitEvent: emitEvent }) });
        }
    }
    _cancelExistingSubscription() {
        if (isPresent(this._asyncValidationSubscription)) {
            this._asyncValidationSubscription.unsubscribe();
        }
    }
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
    setErrors(errors, { emitEvent } = {}) {
        emitEvent = isPresent(emitEvent) ? emitEvent : true;
        this._errors = errors;
        this._updateControlsErrors(emitEvent);
    }
    /**
     * @deprecated - use get() instead
     */
    find(path) { return _find(this, path, '/'); }
    get(path) { return _find(this, path, '.'); }
    getError(errorCode, path = null) {
        var control = isPresent(path) && !ListWrapper.isEmpty(path) ? this.find(path) : this;
        if (isPresent(control) && isPresent(control._errors)) {
            return StringMapWrapper.get(control._errors, errorCode);
        }
        else {
            return null;
        }
    }
    hasError(errorCode, path = null) {
        return isPresent(this.getError(errorCode, path));
    }
    get root() {
        let x = this;
        while (isPresent(x._parent)) {
            x = x._parent;
        }
        return x;
    }
    /** @internal */
    _updateControlsErrors(emitEvent) {
        this._status = this._calculateStatus();
        if (emitEvent) {
            this._statusChanges.emit(this._status);
        }
        if (isPresent(this._parent)) {
            this._parent._updateControlsErrors(emitEvent);
        }
    }
    /** @internal */
    _initObservables() {
        this._valueChanges = new EventEmitter();
        this._statusChanges = new EventEmitter();
    }
    _calculateStatus() {
        if (isPresent(this._errors))
            return INVALID;
        if (this._anyControlsHaveStatus(PENDING))
            return PENDING;
        if (this._anyControlsHaveStatus(INVALID))
            return INVALID;
        return VALID;
    }
    /** @internal */
    _anyControlsHaveStatus(status) {
        return this._anyControls((control) => control.status == status);
    }
    /** @internal */
    _anyControlsDirty() {
        return this._anyControls((control) => control.dirty);
    }
    /** @internal */
    _anyControlsTouched() {
        return this._anyControls((control) => control.touched);
    }
    /** @internal */
    _updatePristine({ onlySelf } = {}) {
        this._pristine = !this._anyControlsDirty();
        if (isPresent(this._parent) && !onlySelf) {
            this._parent._updatePristine({ onlySelf: onlySelf });
        }
    }
    /** @internal */
    _updateTouched({ onlySelf } = {}) {
        this._touched = this._anyControlsTouched();
        if (isPresent(this._parent) && !onlySelf) {
            this._parent._updateTouched({ onlySelf: onlySelf });
        }
    }
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
 * @experimental
 */
export class FormControl extends AbstractControl {
    constructor(value = null, validator = null, asyncValidator = null) {
        super(coerceToValidator(validator), coerceToAsyncValidator(asyncValidator));
        /** @internal */
        this._onChange = [];
        this._value = value;
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this._initObservables();
    }
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
    setValue(value, { onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange } = {}) {
        emitModelToViewChange = isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
        emitViewToModelChange = isPresent(emitViewToModelChange) ? emitViewToModelChange : true;
        this._value = value;
        if (this._onChange.length && emitModelToViewChange) {
            this._onChange.forEach((changeFn) => changeFn(this._value, emitViewToModelChange));
        }
        this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
    }
    /**
     * This function is functionally the same as updateValue() at this level.  It exists for
     * symmetry with patchValue() on FormGroups and FormArrays, where it does behave differently.
     */
    patchValue(value, options = {}) {
        this.setValue(value, options);
    }
    /**
     * @deprecated Please use setValue() instead.
     */
    updateValue(value, options = {}) {
        this.setValue(value, options);
    }
    reset(value = null, { onlySelf } = {}) {
        this.markAsPristine({ onlySelf: onlySelf });
        this.markAsUntouched({ onlySelf: onlySelf });
        this.setValue(value, { onlySelf: onlySelf });
    }
    /**
     * @internal
     */
    _updateValue() { }
    /**
     * @internal
     */
    _anyControls(condition) { return false; }
    /**
     * Register a listener for change events.
     */
    registerOnChange(fn) { this._onChange.push(fn); }
    /**
     * @internal
     */
    _forEachChild(cb) { }
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
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 *
 * @experimental
 */
export class FormGroup extends AbstractControl {
    constructor(controls, optionals = null, validator = null, asyncValidator = null) {
        super(validator, asyncValidator);
        this.controls = controls;
        this._optionals = isPresent(optionals) ? optionals : {};
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     * Register a control with the group's list of controls.
     */
    registerControl(name, control) {
        if (this.controls[name])
            return this.controls[name];
        this.controls[name] = control;
        control.setParent(this);
        return control;
    }
    /**
     * Add a control to this group.
     */
    addControl(name, control) {
        this.registerControl(name, control);
        this.updateValueAndValidity();
    }
    /**
     * Remove a control from this group.
     */
    removeControl(name) {
        StringMapWrapper.delete(this.controls, name);
        this.updateValueAndValidity();
    }
    /**
     * Mark the named control as non-optional.
     */
    include(controlName) {
        StringMapWrapper.set(this._optionals, controlName, true);
        this.updateValueAndValidity();
    }
    /**
     * Mark the named control as optional.
     */
    exclude(controlName) {
        StringMapWrapper.set(this._optionals, controlName, false);
        this.updateValueAndValidity();
    }
    /**
     * Check whether there is a control with the given name in the group.
     */
    contains(controlName) {
        var c = StringMapWrapper.contains(this.controls, controlName);
        return c && this._included(controlName);
    }
    setValue(value, { onlySelf } = {}) {
        this._checkAllValuesPresent(value);
        StringMapWrapper.forEach(value, (newValue, name) => {
            this._throwIfControlMissing(name);
            this.controls[name].setValue(newValue, { onlySelf: true });
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
    }
    patchValue(value, { onlySelf } = {}) {
        StringMapWrapper.forEach(value, (newValue, name) => {
            if (this.controls[name]) {
                this.controls[name].patchValue(newValue, { onlySelf: true });
            }
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
    }
    reset(value = {}, { onlySelf } = {}) {
        this._forEachChild((control, name) => {
            control.reset(value[name], { onlySelf: true });
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
        this._updatePristine({ onlySelf: onlySelf });
        this._updateTouched({ onlySelf: onlySelf });
    }
    /** @internal */
    _throwIfControlMissing(name) {
        if (!Object.keys(this.controls).length) {
            throw new BaseException(`
        There are no form controls registered with this group yet.  If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `);
        }
        if (!this.controls[name]) {
            throw new BaseException(`Cannot find form control with name: ${name}.`);
        }
    }
    /** @internal */
    _forEachChild(cb) {
        StringMapWrapper.forEach(this.controls, cb);
    }
    /** @internal */
    _setParentForControls() {
        this._forEachChild((control, name) => { control.setParent(this); });
    }
    /** @internal */
    _updateValue() { this._value = this._reduceValue(); }
    /** @internal */
    _anyControls(condition) {
        var res = false;
        this._forEachChild((control, name) => {
            res = res || (this.contains(name) && condition(control));
        });
        return res;
    }
    /** @internal */
    _reduceValue() {
        return this._reduceChildren({}, (acc, control, name) => {
            acc[name] = control.value;
            return acc;
        });
    }
    /** @internal */
    _reduceChildren(initValue, fn) {
        var res = initValue;
        this._forEachChild((control, name) => {
            if (this._included(name)) {
                res = fn(res, control, name);
            }
        });
        return res;
    }
    /** @internal */
    _included(controlName) {
        var isOptional = StringMapWrapper.contains(this._optionals, controlName);
        return !isOptional || StringMapWrapper.get(this._optionals, controlName);
    }
    /** @internal */
    _checkAllValuesPresent(value) {
        this._forEachChild((control, name) => {
            if (value[name] === undefined) {
                throw new BaseException(`Must supply a value for form control with name: '${name}'.`);
            }
        });
    }
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
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 *
 * @experimental
 */
export class FormArray extends AbstractControl {
    constructor(controls, validator = null, asyncValidator = null) {
        super(validator, asyncValidator);
        this.controls = controls;
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     * Get the {@link AbstractControl} at the given `index` in the array.
     */
    at(index) { return this.controls[index]; }
    /**
     * Insert a new {@link AbstractControl} at the end of the array.
     */
    push(control) {
        this.controls.push(control);
        control.setParent(this);
        this.updateValueAndValidity();
    }
    /**
     * Insert a new {@link AbstractControl} at the given `index` in the array.
     */
    insert(index, control) {
        ListWrapper.insert(this.controls, index, control);
        control.setParent(this);
        this.updateValueAndValidity();
    }
    /**
     * Remove the control at the given `index` in the array.
     */
    removeAt(index) {
        ListWrapper.removeAt(this.controls, index);
        this.updateValueAndValidity();
    }
    /**
     * Length of the control array.
     */
    get length() { return this.controls.length; }
    setValue(value, { onlySelf } = {}) {
        this._checkAllValuesPresent(value);
        value.forEach((newValue, index) => {
            this._throwIfControlMissing(index);
            this.at(index).setValue(newValue, { onlySelf: true });
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
    }
    patchValue(value, { onlySelf } = {}) {
        value.forEach((newValue, index) => {
            if (this.at(index)) {
                this.at(index).patchValue(newValue, { onlySelf: true });
            }
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
    }
    reset(value = [], { onlySelf } = {}) {
        this._forEachChild((control, index) => {
            control.reset(value[index], { onlySelf: true });
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
        this._updatePristine({ onlySelf: onlySelf });
        this._updateTouched({ onlySelf: onlySelf });
    }
    /** @internal */
    _throwIfControlMissing(index) {
        if (!this.controls.length) {
            throw new BaseException(`
        There are no form controls registered with this array yet.  If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `);
        }
        if (!this.at(index)) {
            throw new BaseException(`Cannot find form control at index ${index}`);
        }
    }
    /** @internal */
    _forEachChild(cb) {
        this.controls.forEach((control, index) => { cb(control, index); });
    }
    /** @internal */
    _updateValue() { this._value = this.controls.map((control) => control.value); }
    /** @internal */
    _anyControls(condition) {
        return this.controls.some((control) => condition(control));
    }
    /** @internal */
    _setParentForControls() {
        this._forEachChild((control) => { control.setParent(this); });
    }
    /** @internal */
    _checkAllValuesPresent(value) {
        this._forEachChild((control, i) => {
            if (value[i] === undefined) {
                throw new BaseException(`Must supply a value for form control at index: ${i}.`);
            }
        });
    }
}
//# sourceMappingURL=model.js.map