/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var common_directives_1 = require('./src/common_directives');
var pipes_1 = require('./src/pipes');
__export(require('./src/pipes'));
__export(require('./src/directives'));
__export(require('./src/forms-deprecated'));
__export(require('./src/common_directives'));
__export(require('./src/location'));
var localization_1 = require('./src/localization');
exports.NgLocalization = localization_1.NgLocalization;
var CommonModule = (function () {
    function CommonModule() {
    }
    /** @nocollapse */
    CommonModule.decorators = [
        { type: core_1.NgModule, args: [{ declarations: [common_directives_1.COMMON_DIRECTIVES, pipes_1.COMMON_PIPES], exports: [common_directives_1.COMMON_DIRECTIVES, pipes_1.COMMON_PIPES] },] },
    ];
    return CommonModule;
}());
exports.CommonModule = CommonModule;
//# sourceMappingURL=index.js.map