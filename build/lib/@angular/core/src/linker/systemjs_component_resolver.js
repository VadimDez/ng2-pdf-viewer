/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var console_1 = require('../console');
var di_1 = require('../di');
var lang_1 = require('../facade/lang');
var component_resolver_1 = require('./component_resolver');
var _SEPARATOR = '#';
var SystemJsComponentResolver = (function () {
    function SystemJsComponentResolver(_resolver, _console) {
        this._resolver = _resolver;
        this._console = _console;
    }
    SystemJsComponentResolver.prototype.resolveComponent = function (componentType) {
        var _this = this;
        if (lang_1.isString(componentType)) {
            this._console.warn(component_resolver_1.ComponentResolver.LazyLoadingDeprecationMsg);
            var _a = componentType.split(_SEPARATOR), module = _a[0], component_1 = _a[1];
            if (component_1 === void (0)) {
                // Use the default export when no component is specified
                component_1 = 'default';
            }
            return lang_1.global
                .System.import(module)
                .then(function (module) { return _this._resolver.resolveComponent(module[component_1]); });
        }
        return this._resolver.resolveComponent(componentType);
    };
    SystemJsComponentResolver.prototype.clearCache = function () { };
    /** @nocollapse */
    SystemJsComponentResolver.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    SystemJsComponentResolver.ctorParameters = [
        { type: component_resolver_1.ComponentResolver, },
        { type: console_1.Console, },
    ];
    return SystemJsComponentResolver;
}());
exports.SystemJsComponentResolver = SystemJsComponentResolver;
var FACTORY_MODULE_SUFFIX = '.ngfactory';
var FACTORY_CLASS_SUFFIX = 'NgFactory';
var SystemJsCmpFactoryResolver = (function () {
    function SystemJsCmpFactoryResolver(_console) {
        this._console = _console;
    }
    SystemJsCmpFactoryResolver.prototype.resolveComponent = function (componentType) {
        if (lang_1.isString(componentType)) {
            this._console.warn(component_resolver_1.ComponentResolver.LazyLoadingDeprecationMsg);
            var _a = componentType.split(_SEPARATOR), module = _a[0], factory_1 = _a[1];
            return lang_1.global
                .System.import(module + FACTORY_MODULE_SUFFIX)
                .then(function (module) { return module[factory_1 + FACTORY_CLASS_SUFFIX]; });
        }
        return Promise.resolve(null);
    };
    SystemJsCmpFactoryResolver.prototype.clearCache = function () { };
    /** @nocollapse */
    SystemJsCmpFactoryResolver.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    SystemJsCmpFactoryResolver.ctorParameters = [
        { type: console_1.Console, },
    ];
    return SystemJsCmpFactoryResolver;
}());
exports.SystemJsCmpFactoryResolver = SystemJsCmpFactoryResolver;
//# sourceMappingURL=systemjs_component_resolver.js.map