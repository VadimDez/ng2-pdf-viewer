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
var injector_1 = require('../di/injector');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var component_factory_resolver_1 = require('./component_factory_resolver');
/**
 * Represents an instance of an NgModule created via a {@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 *
 * @experimental
 */
var NgModuleRef = (function () {
    function NgModuleRef() {
    }
    Object.defineProperty(NgModuleRef.prototype, "injector", {
        /**
         * The injector that contains all of the providers of the NgModule.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef.prototype, "componentFactoryResolver", {
        /**
         * The ComponentFactoryResolver to get hold of the ComponentFactories
         * delcared in the `entryComponents` property of the module.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef.prototype, "instance", {
        /**
         * The NgModule instance.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return NgModuleRef;
}());
exports.NgModuleRef = NgModuleRef;
/**
 * @experimental
 */
var NgModuleFactory = (function () {
    function NgModuleFactory(_injectorClass, _moduleype) {
        this._injectorClass = _injectorClass;
        this._moduleype = _moduleype;
    }
    Object.defineProperty(NgModuleFactory.prototype, "moduleType", {
        get: function () { return this._moduleype; },
        enumerable: true,
        configurable: true
    });
    NgModuleFactory.prototype.create = function (parentInjector) {
        if (!parentInjector) {
            parentInjector = injector_1.Injector.NULL;
        }
        var instance = new this._injectorClass(parentInjector);
        instance.create();
        return instance;
    };
    return NgModuleFactory;
}());
exports.NgModuleFactory = NgModuleFactory;
var _UNDEFINED = new Object();
var NgModuleInjector = (function (_super) {
    __extends(NgModuleInjector, _super);
    function NgModuleInjector(parent, factories, bootstrapFactories) {
        _super.call(this, factories, parent.get(component_factory_resolver_1.ComponentFactoryResolver, component_factory_resolver_1.ComponentFactoryResolver.NULL));
        this.parent = parent;
        this.bootstrapFactories = bootstrapFactories;
        this._destroyListeners = [];
        this._destroyed = false;
    }
    NgModuleInjector.prototype.create = function () { this.instance = this.createInternal(); };
    NgModuleInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = injector_1.THROW_IF_NOT_FOUND; }
        if (token === injector_1.Injector || token === component_factory_resolver_1.ComponentFactoryResolver) {
            return this;
        }
        var result = this.getInternal(token, _UNDEFINED);
        return result === _UNDEFINED ? this.parent.get(token, notFoundValue) : result;
    };
    Object.defineProperty(NgModuleInjector.prototype, "injector", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleInjector.prototype, "componentFactoryResolver", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    NgModuleInjector.prototype.destroy = function () {
        if (this._destroyed) {
            throw new exceptions_1.BaseException("The ng module " + lang_1.stringify(this.instance.constructor) + " has already been destroyed.");
        }
        this._destroyed = true;
        this.destroyInternal();
        this._destroyListeners.forEach(function (listener) { return listener(); });
    };
    NgModuleInjector.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    return NgModuleInjector;
}(component_factory_resolver_1.CodegenComponentFactoryResolver));
exports.NgModuleInjector = NgModuleInjector;
//# sourceMappingURL=ng_module_factory.js.map