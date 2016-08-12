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
var index_1 = require('../index');
var collection_1 = require('../src/facade/collection');
var MockNgModuleResolver = (function (_super) {
    __extends(MockNgModuleResolver, _super);
    function MockNgModuleResolver(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._ngModules = new collection_1.Map();
    }
    Object.defineProperty(MockNgModuleResolver.prototype, "_compiler", {
        get: function () { return this._injector.get(core_1.Compiler); },
        enumerable: true,
        configurable: true
    });
    MockNgModuleResolver.prototype._clearCacheFor = function (component) { this._compiler.clearCacheFor(component); };
    /**
     * Overrides the {@link NgModuleMetadata} for a module.
     */
    MockNgModuleResolver.prototype.setNgModule = function (type, metadata) {
        this._ngModules.set(type, metadata);
        this._clearCacheFor(type);
    };
    /**
     * Returns the {@link NgModuleMetadata} for a module:
     * - Set the {@link NgModuleMetadata} to the overridden view when it exists or fallback to the
     * default
     * `NgModuleResolver`, see `setNgModule`.
     */
    MockNgModuleResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var metadata = this._ngModules.get(type);
        if (!metadata) {
            metadata = _super.prototype.resolve.call(this, type, throwIfNotFound);
        }
        return metadata;
    };
    /** @nocollapse */
    MockNgModuleResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MockNgModuleResolver.ctorParameters = [
        { type: core_1.Injector, },
    ];
    return MockNgModuleResolver;
}(index_1.NgModuleResolver));
exports.MockNgModuleResolver = MockNgModuleResolver;
//# sourceMappingURL=ng_module_resolver_mock.js.map