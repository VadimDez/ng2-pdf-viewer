/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Inject, Input, Optional, Output, Self, forwardRef } from '@angular/core';
import { EventEmitter } from '../../facade/async';
import { ListWrapper, StringMapWrapper } from '../../facade/collection';
import { isBlank } from '../../facade/lang';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, Validators } from '../../validators';
import { ControlContainer } from '../control_container';
import { ReactiveErrors } from '../reactive_errors';
import { composeAsyncValidators, composeValidators, setUpControl, setUpFormContainer } from '../shared';
export const formDirectiveProvider = {
    provide: ControlContainer,
    useExisting: forwardRef(() => FormGroupDirective)
};
export class FormGroupDirective extends ControlContainer {
    constructor(_validators, _asyncValidators) {
        super();
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this._submitted = false;
        this.directives = [];
        this.form = null;
        this.ngSubmit = new EventEmitter();
    }
    ngOnChanges(changes) {
        this._checkFormPresent();
        if (StringMapWrapper.contains(changes, 'form')) {
            var sync = composeValidators(this._validators);
            this.form.validator = Validators.compose([this.form.validator, sync]);
            var async = composeAsyncValidators(this._asyncValidators);
            this.form.asyncValidator = Validators.composeAsync([this.form.asyncValidator, async]);
            this.form.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
        this._updateDomValue();
    }
    get submitted() { return this._submitted; }
    get formDirective() { return this; }
    get control() { return this.form; }
    get path() { return []; }
    addControl(dir) {
        const ctrl = this.form.get(dir.path);
        setUpControl(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
        this.directives.push(dir);
    }
    getControl(dir) { return this.form.get(dir.path); }
    removeControl(dir) { ListWrapper.remove(this.directives, dir); }
    addFormGroup(dir) {
        var ctrl = this.form.get(dir.path);
        setUpFormContainer(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
    }
    removeFormGroup(dir) { }
    getFormGroup(dir) { return this.form.get(dir.path); }
    addFormArray(dir) {
        var ctrl = this.form.get(dir.path);
        setUpFormContainer(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
    }
    removeFormArray(dir) { }
    getFormArray(dir) { return this.form.get(dir.path); }
    updateModel(dir, value) {
        var ctrl = this.form.get(dir.path);
        ctrl.setValue(value);
    }
    onSubmit() {
        this._submitted = true;
        this.ngSubmit.emit(null);
        return false;
    }
    onReset() { this.form.reset(); }
    /** @internal */
    _updateDomValue() {
        this.directives.forEach(dir => {
            var ctrl = this.form.get(dir.path);
            dir.valueAccessor.writeValue(ctrl.value);
        });
    }
    _checkFormPresent() {
        if (isBlank(this.form)) {
            ReactiveErrors.missingFormException();
        }
    }
}
/** @nocollapse */
FormGroupDirective.decorators = [
    { type: Directive, args: [{
                selector: '[formGroup]',
                providers: [formDirectiveProvider],
                host: { '(submit)': 'onSubmit()', '(reset)': 'onReset()' },
                exportAs: 'ngForm'
            },] },
];
/** @nocollapse */
FormGroupDirective.ctorParameters = [
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] },] },
];
/** @nocollapse */
FormGroupDirective.propDecorators = {
    'form': [{ type: Input, args: ['formGroup',] },],
    'ngSubmit': [{ type: Output },],
};
//# sourceMappingURL=form_group_directive.js.map