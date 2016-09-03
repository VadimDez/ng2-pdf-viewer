/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, Host, Inject, Input, Optional, Self, SkipSelf, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../../validators';
import { AbstractFormGroupDirective } from '../abstract_form_group_directive';
import { ControlContainer } from '../control_container';
import { ReactiveErrors } from '../reactive_errors';
import { composeAsyncValidators, composeValidators, controlPath } from '../shared';
import { FormGroupDirective } from './form_group_directive';
export var formGroupNameProvider = {
    provide: ControlContainer,
    useExisting: forwardRef(function () { return FormGroupName; })
};
/**
 * Syncs an existing form group to a DOM element.
 *
 * This directive can only be used as a child of {@link FormGroupDirective}.  It also requires
 * importing the {@link ReactiveFormsModule}.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Angular FormGroup Example</h2>
 *       <form [formGroup]="myForm">
 *         <div formGroupName="name">
 *           <h3>Enter your name:</h3>
 *           <p>First: <input formControlName="first"></p>
 *           <p>Middle: <input formControlName="middle"></p>
 *           <p>Last: <input formControlName="last"></p>
 *         </div>
 *         <h3>Name value:</h3>
 *         <pre>{{ myForm.get('name') | json }}</pre>
 *         <p>Name is {{myForm.get('name')?.valid ? "valid" : "invalid"}}</p>
 *         <h3>What's your favorite food?</h3>
 *         <p><input formControlName="food"></p>
 *         <h3>Form value</h3>
 *         <pre> {{ myForm | json }} </pre>
 *       </form>
 *     </div>
 *   `
 * })
 * export class App {
 *   myForm = new FormGroup({
 *     name: new FormGroup({
 *       first: new FormControl('', Validators.required),
 *       middle: new FormControl(''),
 *       last: new FormControl('', Validators.required)
 *     }),
 *     food: new FormControl()
 *   });
 * }
 * ```
 *
 * This example syncs the form group for the user's name. The value and validation state of
 * this group can be accessed separately from the overall form.
 *
 * @stable
 */
export var FormGroupName = (function (_super) {
    __extends(FormGroupName, _super);
    function FormGroupName(parent, validators, asyncValidators) {
        _super.call(this);
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
    }
    /** @internal */
    FormGroupName.prototype._checkParentType = function () {
        if (_hasInvalidParent(this._parent)) {
            ReactiveErrors.groupParentException();
        }
    };
    FormGroupName.decorators = [
        { type: Directive, args: [{ selector: '[formGroupName]', providers: [formGroupNameProvider] },] },
    ];
    /** @nocollapse */
    FormGroupName.ctorParameters = [
        { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf },] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] },] },
    ];
    FormGroupName.propDecorators = {
        'name': [{ type: Input, args: ['formGroupName',] },],
    };
    return FormGroupName;
}(AbstractFormGroupDirective));
export var formArrayNameProvider = {
    provide: ControlContainer,
    useExisting: forwardRef(function () { return FormArrayName; })
};
/**
 * Syncs an existing form array to a DOM element.
 *
 * This directive can only be used as a child of {@link FormGroupDirective}.  It also requires
 * importing the {@link ReactiveFormsModule}.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Angular FormArray Example</h2>
 *       <form [formGroup]="myForm">
 *         <div formArrayName="cities">
 *           <div *ngFor="let city of cityArray.controls; let i=index">
 *             <input [formControlName]="i">
 *           </div>
 *         </div>
 *       </form>
 *       {{ myForm.value | json }}     // {cities: ['SF', 'NY']}
 *     </div>
 *   `
 * })
 * export class App {
 *   cityArray = new FormArray([
 *     new FormControl('SF'),
 *     new FormControl('NY')
 *   ]);
 *   myForm = new FormGroup({
 *     cities: this.cityArray
 *   });
 * }
 * ```
 *
 * @stable
 */
export var FormArrayName = (function (_super) {
    __extends(FormArrayName, _super);
    function FormArrayName(parent, validators, asyncValidators) {
        _super.call(this);
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
    }
    FormArrayName.prototype.ngOnInit = function () {
        this._checkParentType();
        this.formDirective.addFormArray(this);
    };
    FormArrayName.prototype.ngOnDestroy = function () {
        if (this.formDirective) {
            this.formDirective.removeFormArray(this);
        }
    };
    Object.defineProperty(FormArrayName.prototype, "control", {
        get: function () { return this.formDirective.getFormArray(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "formDirective", {
        get: function () {
            return this._parent ? this._parent.formDirective : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "path", {
        get: function () { return controlPath(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "validator", {
        get: function () { return composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
        get: function () { return composeAsyncValidators(this._asyncValidators); },
        enumerable: true,
        configurable: true
    });
    FormArrayName.prototype._checkParentType = function () {
        if (_hasInvalidParent(this._parent)) {
            ReactiveErrors.arrayParentException();
        }
    };
    FormArrayName.decorators = [
        { type: Directive, args: [{ selector: '[formArrayName]', providers: [formArrayNameProvider] },] },
    ];
    /** @nocollapse */
    FormArrayName.ctorParameters = [
        { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf },] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] },] },
    ];
    FormArrayName.propDecorators = {
        'name': [{ type: Input, args: ['formArrayName',] },],
    };
    return FormArrayName;
}(ControlContainer));
function _hasInvalidParent(parent) {
    return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) &&
        !(parent instanceof FormArrayName);
}
//# sourceMappingURL=form_group_name.js.map