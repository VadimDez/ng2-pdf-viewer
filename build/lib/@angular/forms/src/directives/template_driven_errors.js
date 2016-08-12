/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var exceptions_1 = require('../facade/exceptions');
var error_examples_1 = require('./error_examples');
var TemplateDrivenErrors = (function () {
    function TemplateDrivenErrors() {
    }
    TemplateDrivenErrors.modelParentException = function () {
        throw new exceptions_1.BaseException("\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive \"formControlName\" instead.  Example:\n\n      " + error_examples_1.FormErrorExamples.formControlName + "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      " + error_examples_1.FormErrorExamples.ngModelWithFormGroup);
    };
    TemplateDrivenErrors.formGroupNameException = function () {
        throw new exceptions_1.BaseException("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      " + error_examples_1.FormErrorExamples.formGroupName + "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      " + error_examples_1.FormErrorExamples.ngModelGroup);
    };
    TemplateDrivenErrors.missingNameException = function () {
        throw new exceptions_1.BaseException("If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as 'standalone' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]=\"person.firstName\" name=\"first\">\n      Example 2: <input [(ngModel)]=\"person.firstName\" [ngModelOptions]=\"{standalone: true}\">");
    };
    TemplateDrivenErrors.modelGroupParentException = function () {
        throw new exceptions_1.BaseException("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      " + error_examples_1.FormErrorExamples.formGroupName + "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      " + error_examples_1.FormErrorExamples.ngModelGroup);
    };
    return TemplateDrivenErrors;
}());
exports.TemplateDrivenErrors = TemplateDrivenErrors;
//# sourceMappingURL=template_driven_errors.js.map