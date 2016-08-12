/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var validators_1 = require('../../validators');
var abstract_form_group_directive_1 = require('../abstract_form_group_directive');
var control_container_1 = require('../control_container');
var reactive_errors_1 = require('../reactive_errors');
var shared_1 = require('../shared');
var form_group_directive_1 = require('./form_group_directive');
exports.formGroupNameProvider = {
    provide: control_container_1.ControlContainer,
    useExisting: core_1.forwardRef(function () { return FormGroupName; })
};
var FormGroupName = (function (_super) {
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
            reactive_errors_1.ReactiveErrors.groupParentException();
        }
    };
    /** @nocollapse */
    FormGroupName.decorators = [
        { type: core_1.Directive, args: [{ selector: '[formGroupName]', providers: [exports.formGroupNameProvider] },] },
    ];
    /** @nocollapse */
    FormGroupName.ctorParameters = [
        { type: control_container_1.ControlContainer, decorators: [{ type: core_1.Optional }, { type: core_1.Host }, { type: core_1.SkipSelf },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
    ];
    /** @nocollapse */
    FormGroupName.propDecorators = {
        'name': [{ type: core_1.Input, args: ['formGroupName',] },],
    };
    return FormGroupName;
}(abstract_form_group_directive_1.AbstractFormGroupDirective));
exports.FormGroupName = FormGroupName;
exports.formArrayNameProvider = {
    provide: control_container_1.ControlContainer,
    useExisting: core_1.forwardRef(function () { return FormArrayName; })
};
var FormArrayName = (function (_super) {
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
    FormArrayName.prototype.ngOnDestroy = function () { this.formDirective.removeFormArray(this); };
    Object.defineProperty(FormArrayName.prototype, "control", {
        get: function () { return this.formDirective.getFormArray(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "formDirective", {
        get: function () { return this._parent.formDirective; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "path", {
        get: function () { return shared_1.controlPath(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "validator", {
        get: function () { return shared_1.composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
        get: function () { return shared_1.composeAsyncValidators(this._asyncValidators); },
        enumerable: true,
        configurable: true
    });
    FormArrayName.prototype._checkParentType = function () {
        if (_hasInvalidParent(this._parent)) {
            reactive_errors_1.ReactiveErrors.arrayParentException();
        }
    };
    /** @nocollapse */
    FormArrayName.decorators = [
        { type: core_1.Directive, args: [{ selector: '[formArrayName]', providers: [exports.formArrayNameProvider] },] },
    ];
    /** @nocollapse */
    FormArrayName.ctorParameters = [
        { type: control_container_1.ControlContainer, decorators: [{ type: core_1.Optional }, { type: core_1.Host }, { type: core_1.SkipSelf },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
    ];
    /** @nocollapse */
    FormArrayName.propDecorators = {
        'name': [{ type: core_1.Input, args: ['formArrayName',] },],
    };
    return FormArrayName;
}(control_container_1.ControlContainer));
exports.FormArrayName = FormArrayName;
function _hasInvalidParent(parent) {
    return !(parent instanceof FormGroupName) && !(parent instanceof form_group_directive_1.FormGroupDirective) &&
        !(parent instanceof FormArrayName);
}
//# sourceMappingURL=form_group_name.js.map