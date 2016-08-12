/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Host, Inject, Input, Optional, Self, SkipSelf, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../../validators';
import { AbstractFormGroupDirective } from '../abstract_form_group_directive';
import { ControlContainer } from '../control_container';
import { ReactiveErrors } from '../reactive_errors';
import { composeAsyncValidators, composeValidators, controlPath } from '../shared';
import { FormGroupDirective } from './form_group_directive';
export const formGroupNameProvider = {
    provide: ControlContainer,
    useExisting: forwardRef(() => FormGroupName)
};
export class FormGroupName extends AbstractFormGroupDirective {
    constructor(parent, validators, asyncValidators) {
        super();
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
    }
    /** @internal */
    _checkParentType() {
        if (_hasInvalidParent(this._parent)) {
            ReactiveErrors.groupParentException();
        }
    }
}
/** @nocollapse */
FormGroupName.decorators = [
    { type: Directive, args: [{ selector: '[formGroupName]', providers: [formGroupNameProvider] },] },
];
/** @nocollapse */
FormGroupName.ctorParameters = [
    { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] },] },
];
/** @nocollapse */
FormGroupName.propDecorators = {
    'name': [{ type: Input, args: ['formGroupName',] },],
};
export const formArrayNameProvider = {
    provide: ControlContainer,
    useExisting: forwardRef(() => FormArrayName)
};
export class FormArrayName extends ControlContainer {
    constructor(parent, validators, asyncValidators) {
        super();
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
    }
    ngOnInit() {
        this._checkParentType();
        this.formDirective.addFormArray(this);
    }
    ngOnDestroy() { this.formDirective.removeFormArray(this); }
    get control() { return this.formDirective.getFormArray(this); }
    get formDirective() { return this._parent.formDirective; }
    get path() { return controlPath(this.name, this._parent); }
    get validator() { return composeValidators(this._validators); }
    get asyncValidator() { return composeAsyncValidators(this._asyncValidators); }
    _checkParentType() {
        if (_hasInvalidParent(this._parent)) {
            ReactiveErrors.arrayParentException();
        }
    }
}
/** @nocollapse */
FormArrayName.decorators = [
    { type: Directive, args: [{ selector: '[formArrayName]', providers: [formArrayNameProvider] },] },
];
/** @nocollapse */
FormArrayName.ctorParameters = [
    { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] },] },
];
/** @nocollapse */
FormArrayName.propDecorators = {
    'name': [{ type: Input, args: ['formArrayName',] },],
};
function _hasInvalidParent(parent) {
    return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) &&
        !(parent instanceof FormArrayName);
}
//# sourceMappingURL=form_group_name.js.map