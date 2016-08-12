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
var di_1 = require('../di');
var lang_1 = require('../facade/lang');
var compiler_1 = require('./compiler');
/**
 * Use ComponentFactoryResolver and ViewContainerRef directly.
 *
 * @deprecated
 */
var DynamicComponentLoader = (function () {
    function DynamicComponentLoader() {
    }
    return DynamicComponentLoader;
}());
exports.DynamicComponentLoader = DynamicComponentLoader;
var DynamicComponentLoader_ = (function (_super) {
    __extends(DynamicComponentLoader_, _super);
    function DynamicComponentLoader_(_compiler) {
        _super.call(this);
        this._compiler = _compiler;
    }
    DynamicComponentLoader_.prototype.loadAsRoot = function (type, overrideSelectorOrNode, injector, onDispose, projectableNodes) {
        return this._compiler.compileComponentAsync(type).then(function (componentFactory) {
            var componentRef = componentFactory.create(injector, projectableNodes, lang_1.isPresent(overrideSelectorOrNode) ? overrideSelectorOrNode : componentFactory.selector);
            if (lang_1.isPresent(onDispose)) {
                componentRef.onDestroy(onDispose);
            }
            return componentRef;
        });
    };
    DynamicComponentLoader_.prototype.loadNextToLocation = function (type, location, providers, projectableNodes) {
        if (providers === void 0) { providers = null; }
        if (projectableNodes === void 0) { projectableNodes = null; }
        return this._compiler.compileComponentAsync(type).then(function (componentFactory) {
            var contextInjector = location.parentInjector;
            var childInjector = lang_1.isPresent(providers) && providers.length > 0 ?
                di_1.ReflectiveInjector.fromResolvedProviders(providers, contextInjector) :
                contextInjector;
            return location.createComponent(componentFactory, location.length, childInjector, projectableNodes);
        });
    };
    /** @nocollapse */
    DynamicComponentLoader_.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    DynamicComponentLoader_.ctorParameters = [
        { type: compiler_1.Compiler, },
    ];
    return DynamicComponentLoader_;
}(DynamicComponentLoader));
exports.DynamicComponentLoader_ = DynamicComponentLoader_;
//# sourceMappingURL=dynamic_component_loader.js.map