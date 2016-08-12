/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var directives_1 = require('./directives');
var radio_control_value_accessor_1 = require('./directives/radio_control_value_accessor');
var form_builder_1 = require('./form_builder');
/**
 * Shorthand set of providers used for building Angular forms.
 * @experimental
 */
exports.FORM_PROVIDERS = [radio_control_value_accessor_1.RadioControlRegistry];
/**
 * Shorthand set of providers used for building reactive Angular forms.
 * @experimental
 */
exports.REACTIVE_FORM_PROVIDERS = [form_builder_1.FormBuilder, radio_control_value_accessor_1.RadioControlRegistry];
var FormsModule = (function () {
    function FormsModule() {
    }
    /** @nocollapse */
    FormsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: directives_1.TEMPLATE_DRIVEN_DIRECTIVES,
                    providers: [exports.FORM_PROVIDERS],
                    exports: [directives_1.InternalFormsSharedModule, directives_1.TEMPLATE_DRIVEN_DIRECTIVES]
                },] },
    ];
    return FormsModule;
}());
exports.FormsModule = FormsModule;
var ReactiveFormsModule = (function () {
    function ReactiveFormsModule() {
    }
    /** @nocollapse */
    ReactiveFormsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [directives_1.REACTIVE_DRIVEN_DIRECTIVES],
                    providers: [exports.REACTIVE_FORM_PROVIDERS],
                    exports: [directives_1.InternalFormsSharedModule, directives_1.REACTIVE_DRIVEN_DIRECTIVES]
                },] },
    ];
    return ReactiveFormsModule;
}());
exports.ReactiveFormsModule = ReactiveFormsModule;
/**
 * @deprecated
 */
function disableDeprecatedForms() {
    return [];
}
exports.disableDeprecatedForms = disableDeprecatedForms;
/**
 * @deprecated
 */
function provideForms() {
    return [
        { provide: core_1.PLATFORM_DIRECTIVES, useValue: directives_1.FORM_DIRECTIVES, multi: true }, exports.REACTIVE_FORM_PROVIDERS
    ];
}
exports.provideForms = provideForms;
//# sourceMappingURL=form_providers.js.map