/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var di_1 = require('../di');
var lang_1 = require('../facade/lang');
var compiler_1 = require('./compiler');
var _SEPARATOR = '#';
var FACTORY_MODULE_SUFFIX = '.ngfactory';
var FACTORY_CLASS_SUFFIX = 'NgFactory';
var SystemJsNgModuleLoader = (function () {
    function SystemJsNgModuleLoader(_compiler) {
        this._compiler = _compiler;
    }
    SystemJsNgModuleLoader.prototype.load = function (path) {
        var offlineMode = this._compiler instanceof compiler_1.Compiler;
        return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
    };
    SystemJsNgModuleLoader.prototype.loadAndCompile = function (path) {
        var _this = this;
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        if (exportName === undefined)
            exportName = 'default';
        return lang_1.global
            .System.import(module)
            .then(function (module) { return module[exportName]; })
            .then(function (type) { return checkNotEmpty(type, module, exportName); })
            .then(function (type) { return _this._compiler.compileModuleAsync(type); });
    };
    SystemJsNgModuleLoader.prototype.loadFactory = function (path) {
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        if (exportName === undefined)
            exportName = 'default';
        return lang_1.global
            .System.import(module + FACTORY_MODULE_SUFFIX)
            .then(function (module) { return module[exportName + FACTORY_CLASS_SUFFIX]; })
            .then(function (factory) { return checkNotEmpty(factory, module, exportName); });
    };
    /** @nocollapse */
    SystemJsNgModuleLoader.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    SystemJsNgModuleLoader.ctorParameters = [
        { type: compiler_1.Compiler, },
    ];
    return SystemJsNgModuleLoader;
}());
exports.SystemJsNgModuleLoader = SystemJsNgModuleLoader;
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) {
        throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
    }
    return value;
}
//# sourceMappingURL=system_js_ng_module_factory_loader.js.map