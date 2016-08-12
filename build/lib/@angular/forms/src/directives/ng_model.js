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
var async_1 = require('../facade/async');
var model_1 = require('../model');
var validators_1 = require('../validators');
var abstract_form_group_directive_1 = require('./abstract_form_group_directive');
var control_container_1 = require('./control_container');
var control_value_accessor_1 = require('./control_value_accessor');
var ng_control_1 = require('./ng_control');
var ng_form_1 = require('./ng_form');
var ng_model_group_1 = require('./ng_model_group');
var shared_1 = require('./shared');
var template_driven_errors_1 = require('./template_driven_errors');
exports.formControlBinding = {
    provide: ng_control_1.NgControl,
    useExisting: core_1.forwardRef(function () { return NgModel; })
};
var resolvedPromise = Promise.resolve(null);
var NgModel = (function (_super) {
    __extends(NgModel, _super);
    function NgModel(_parent, _validators, _asyncValidators, valueAccessors) {
        _super.call(this);
        this._parent = _parent;
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        /** @internal */
        this._control = new model_1.FormControl();
        /** @internal */
        this._registered = false;
        this.update = new async_1.EventEmitter();
        this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    NgModel.prototype.ngOnChanges = function (changes) {
        this._checkForErrors();
        if (!this._registered)
            this._setUpControl();
        if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
            this._updateValue(this.model);
            this.viewModel = this.model;
        }
    };
    NgModel.prototype.ngOnDestroy = function () { this.formDirective && this.formDirective.removeControl(this); };
    Object.defineProperty(NgModel.prototype, "control", {
        get: function () { return this._control; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "path", {
        get: function () {
            return this._parent ? shared_1.controlPath(this.name, this._parent) : [this.name];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "formDirective", {
        get: function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "validator", {
        get: function () { return shared_1.composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "asyncValidator", {
        get: function () {
            return shared_1.composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    NgModel.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    NgModel.prototype._setUpControl = function () {
        this._isStandalone() ? this._setUpStandalone() :
            this.formDirective.addControl(this);
        this._registered = true;
    };
    NgModel.prototype._isStandalone = function () {
        return !this._parent || (this.options && this.options.standalone);
    };
    NgModel.prototype._setUpStandalone = function () {
        shared_1.setUpControl(this._control, this);
        this._control.updateValueAndValidity({ emitEvent: false });
    };
    NgModel.prototype._checkForErrors = function () {
        if (!this._isStandalone()) {
            this._checkParentType();
        }
        this._checkName();
    };
    NgModel.prototype._checkParentType = function () {
        if (!(this._parent instanceof ng_model_group_1.NgModelGroup) &&
            this._parent instanceof abstract_form_group_directive_1.AbstractFormGroupDirective) {
            template_driven_errors_1.TemplateDrivenErrors.formGroupNameException();
        }
        else if (!(this._parent instanceof ng_model_group_1.NgModelGroup) && !(this._parent instanceof ng_form_1.NgForm)) {
            template_driven_errors_1.TemplateDrivenErrors.modelParentException();
        }
    };
    NgModel.prototype._checkName = function () {
        if (this.options && this.options.name)
            this.name = this.options.name;
        if (!this._isStandalone() && !this.name) {
            template_driven_errors_1.TemplateDrivenErrors.missingNameException();
        }
    };
    NgModel.prototype._updateValue = function (value) {
        var _this = this;
        resolvedPromise.then(function () { _this.control.setValue(value, { emitViewToModelChange: false }); });
    };
    /** @nocollapse */
    NgModel.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ngModel]:not([formControlName]):not([formControl])',
                    providers: [exports.formControlBinding],
                    exportAs: 'ngModel'
                },] },
    ];
    /** @nocollapse */
    NgModel.ctorParameters = [
        { type: control_container_1.ControlContainer, decorators: [{ type: core_1.Optional }, { type: core_1.Host },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [control_value_accessor_1.NG_VALUE_ACCESSOR,] },] },
    ];
    /** @nocollapse */
    NgModel.propDecorators = {
        'model': [{ type: core_1.Input, args: ['ngModel',] },],
        'name': [{ type: core_1.Input },],
        'options': [{ type: core_1.Input, args: ['ngModelOptions',] },],
        'update': [{ type: core_1.Output, args: ['ngModelChange',] },],
    };
    return NgModel;
}(ng_control_1.NgControl));
exports.NgModel = NgModel;
//# sourceMappingURL=ng_model.js.map