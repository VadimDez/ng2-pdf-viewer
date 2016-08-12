/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Inject, Optional, Self, forwardRef } from '@angular/core';
import { EventEmitter } from '../facade/async';
import { ListWrapper } from '../facade/collection';
import { isPresent } from '../facade/lang';
import { FormGroup } from '../model';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../validators';
import { ControlContainer } from './control_container';
import { composeAsyncValidators, composeValidators, setUpControl, setUpFormContainer } from './shared';
export const formDirectiveProvider = {
    provide: ControlContainer,
    useExisting: forwardRef(() => NgForm)
};
const resolvedPromise = Promise.resolve(null);
export class NgForm extends ControlContainer {
    constructor(validators, asyncValidators) {
        super();
        this._submitted = false;
        this.ngSubmit = new EventEmitter();
        this.form = new FormGroup({}, null, composeValidators(validators), composeAsyncValidators(asyncValidators));
    }
    get submitted() { return this._submitted; }
    get formDirective() { return this; }
    get control() { return this.form; }
    get path() { return []; }
    get controls() { return this.form.controls; }
    addControl(dir) {
        resolvedPromise.then(() => {
            const container = this._findContainer(dir.path);
            dir._control = container.registerControl(dir.name, dir.control);
            setUpControl(dir.control, dir);
            dir.control.updateValueAndValidity({ emitEvent: false });
        });
    }
    getControl(dir) { return this.form.get(dir.path); }
    removeControl(dir) {
        resolvedPromise.then(() => {
            var container = this._findContainer(dir.path);
            if (isPresent(container)) {
                container.removeControl(dir.name);
            }
        });
    }
    addFormGroup(dir) {
        resolvedPromise.then(() => {
            var container = this._findContainer(dir.path);
            var group = new FormGroup({});
            setUpFormContainer(group, dir);
            container.registerControl(dir.name, group);
            group.updateValueAndValidity({ emitEvent: false });
        });
    }
    removeFormGroup(dir) {
        resolvedPromise.then(() => {
            var container = this._findContainer(dir.path);
            if (isPresent(container)) {
                container.removeControl(dir.name);
            }
        });
    }
    getFormGroup(dir) { return this.form.get(dir.path); }
    updateModel(dir, value) {
        resolvedPromise.then(() => {
            var ctrl = this.form.get(dir.path);
            ctrl.setValue(value);
        });
    }
    setValue(value) { this.control.setValue(value); }
    onSubmit() {
        this._submitted = true;
        this.ngSubmit.emit(null);
        return false;
    }
    onReset() { this.form.reset(); }
    /** @internal */
    _findContainer(path) {
        path.pop();
        return ListWrapper.isEmpty(path) ? this.form : this.form.get(path);
    }
}
/** @nocollapse */
NgForm.decorators = [
    { type: Directive, args: [{
                selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]',
                providers: [formDirectiveProvider],
                host: { '(submit)': 'onSubmit()', '(reset)': 'onReset()' },
                outputs: ['ngSubmit'],
                exportAs: 'ngForm'
            },] },
];
/** @nocollapse */
NgForm.ctorParameters = [
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] },] },
];
//# sourceMappingURL=ng_form.js.map