/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('./facade/lang');
function _isNgModuleMetadata(obj) {
    return obj instanceof core_1.NgModuleMetadata;
}
var NgModuleResolver = (function () {
    function NgModuleResolver(_reflector) {
        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
        this._reflector = _reflector;
    }
    NgModuleResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var ngModuleMeta = this._reflector.annotations(type).find(_isNgModuleMetadata);
        if (lang_1.isPresent(ngModuleMeta)) {
            return ngModuleMeta;
        }
        else {
            if (throwIfNotFound) {
                throw new exceptions_1.BaseException("No NgModule metadata found for '" + lang_1.stringify(type) + "'.");
            }
            return null;
        }
    };
    /** @nocollapse */
    NgModuleResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NgModuleResolver.ctorParameters = [
        { type: core_private_1.ReflectorReader, },
    ];
    return NgModuleResolver;
}());
exports.NgModuleResolver = NgModuleResolver;
//# sourceMappingURL=ng_module_resolver.js.map