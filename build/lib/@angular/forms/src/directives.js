/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var checkbox_value_accessor_1 = require('./directives/checkbox_value_accessor');
var default_value_accessor_1 = require('./directives/default_value_accessor');
var ng_control_status_1 = require('./directives/ng_control_status');
var ng_form_1 = require('./directives/ng_form');
var ng_model_1 = require('./directives/ng_model');
var ng_model_group_1 = require('./directives/ng_model_group');
var number_value_accessor_1 = require('./directives/number_value_accessor');
var radio_control_value_accessor_1 = require('./directives/radio_control_value_accessor');
var form_control_directive_1 = require('./directives/reactive_directives/form_control_directive');
var form_control_name_1 = require('./directives/reactive_directives/form_control_name');
var form_group_directive_1 = require('./directives/reactive_directives/form_group_directive');
var form_group_name_1 = require('./directives/reactive_directives/form_group_name');
var select_control_value_accessor_1 = require('./directives/select_control_value_accessor');
var select_multiple_control_value_accessor_1 = require('./directives/select_multiple_control_value_accessor');
var validators_1 = require('./directives/validators');
var checkbox_value_accessor_2 = require('./directives/checkbox_value_accessor');
exports.CheckboxControlValueAccessor = checkbox_value_accessor_2.CheckboxControlValueAccessor;
var default_value_accessor_2 = require('./directives/default_value_accessor');
exports.DefaultValueAccessor = default_value_accessor_2.DefaultValueAccessor;
var ng_control_1 = require('./directives/ng_control');
exports.NgControl = ng_control_1.NgControl;
var ng_control_status_2 = require('./directives/ng_control_status');
exports.NgControlStatus = ng_control_status_2.NgControlStatus;
var ng_form_2 = require('./directives/ng_form');
exports.NgForm = ng_form_2.NgForm;
var ng_model_2 = require('./directives/ng_model');
exports.NgModel = ng_model_2.NgModel;
var ng_model_group_2 = require('./directives/ng_model_group');
exports.NgModelGroup = ng_model_group_2.NgModelGroup;
var number_value_accessor_2 = require('./directives/number_value_accessor');
exports.NumberValueAccessor = number_value_accessor_2.NumberValueAccessor;
var radio_control_value_accessor_2 = require('./directives/radio_control_value_accessor');
exports.RadioControlValueAccessor = radio_control_value_accessor_2.RadioControlValueAccessor;
var form_control_directive_2 = require('./directives/reactive_directives/form_control_directive');
exports.FormControlDirective = form_control_directive_2.FormControlDirective;
var form_control_name_2 = require('./directives/reactive_directives/form_control_name');
exports.FormControlName = form_control_name_2.FormControlName;
var form_group_directive_2 = require('./directives/reactive_directives/form_group_directive');
exports.FormGroupDirective = form_group_directive_2.FormGroupDirective;
var form_group_name_2 = require('./directives/reactive_directives/form_group_name');
exports.FormArrayName = form_group_name_2.FormArrayName;
exports.FormGroupName = form_group_name_2.FormGroupName;
var select_control_value_accessor_2 = require('./directives/select_control_value_accessor');
exports.NgSelectOption = select_control_value_accessor_2.NgSelectOption;
exports.SelectControlValueAccessor = select_control_value_accessor_2.SelectControlValueAccessor;
var select_multiple_control_value_accessor_2 = require('./directives/select_multiple_control_value_accessor');
exports.NgSelectMultipleOption = select_multiple_control_value_accessor_2.NgSelectMultipleOption;
exports.SelectMultipleControlValueAccessor = select_multiple_control_value_accessor_2.SelectMultipleControlValueAccessor;
var validators_2 = require('./directives/validators');
exports.MaxLengthValidator = validators_2.MaxLengthValidator;
exports.MinLengthValidator = validators_2.MinLengthValidator;
exports.PatternValidator = validators_2.PatternValidator;
exports.RequiredValidator = validators_2.RequiredValidator;
exports.SHARED_FORM_DIRECTIVES = [
    select_control_value_accessor_1.NgSelectOption, select_multiple_control_value_accessor_1.NgSelectMultipleOption, default_value_accessor_1.DefaultValueAccessor, number_value_accessor_1.NumberValueAccessor,
    checkbox_value_accessor_1.CheckboxControlValueAccessor, select_control_value_accessor_1.SelectControlValueAccessor, select_multiple_control_value_accessor_1.SelectMultipleControlValueAccessor,
    radio_control_value_accessor_1.RadioControlValueAccessor, ng_control_status_1.NgControlStatus, validators_1.RequiredValidator, validators_1.MinLengthValidator,
    validators_1.MaxLengthValidator, validators_1.PatternValidator
];
exports.TEMPLATE_DRIVEN_DIRECTIVES = [ng_model_1.NgModel, ng_model_group_1.NgModelGroup, ng_form_1.NgForm];
exports.REACTIVE_DRIVEN_DIRECTIVES = [form_control_directive_1.FormControlDirective, form_group_directive_1.FormGroupDirective, form_control_name_1.FormControlName, form_group_name_1.FormGroupName, form_group_name_1.FormArrayName];
/**
 *
 * A list of all the form directives used as part of a `@Component` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   directives: [FORM_DIRECTIVES]
 * })
 * class MyApp {}
 * ```
 * @experimental
 */
exports.FORM_DIRECTIVES = [exports.TEMPLATE_DRIVEN_DIRECTIVES, exports.SHARED_FORM_DIRECTIVES];
/**
 * @experimental
 */
exports.REACTIVE_FORM_DIRECTIVES = [exports.REACTIVE_DRIVEN_DIRECTIVES, exports.SHARED_FORM_DIRECTIVES];
var InternalFormsSharedModule = (function () {
    function InternalFormsSharedModule() {
    }
    /** @nocollapse */
    InternalFormsSharedModule.decorators = [
        { type: core_1.NgModule, args: [{ declarations: exports.SHARED_FORM_DIRECTIVES, exports: exports.SHARED_FORM_DIRECTIVES },] },
    ];
    return InternalFormsSharedModule;
}());
exports.InternalFormsSharedModule = InternalFormsSharedModule;
//# sourceMappingURL=directives.js.map