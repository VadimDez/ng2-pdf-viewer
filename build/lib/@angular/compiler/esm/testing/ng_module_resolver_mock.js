/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler, Injectable, Injector } from '@angular/core';
import { NgModuleResolver } from '../index';
import { Map } from '../src/facade/collection';
export class MockNgModuleResolver extends NgModuleResolver {
    constructor(_injector) {
        super();
        this._injector = _injector;
        this._ngModules = new Map();
    }
    get _compiler() { return this._injector.get(Compiler); }
    _clearCacheFor(component) { this._compiler.clearCacheFor(component); }
    /**
     * Overrides the {@link NgModuleMetadata} for a module.
     */
    setNgModule(type, metadata) {
        this._ngModules.set(type, metadata);
        this._clearCacheFor(type);
    }
    /**
     * Returns the {@link NgModuleMetadata} for a module:
     * - Set the {@link NgModuleMetadata} to the overridden view when it exists or fallback to the
     * default
     * `NgModuleResolver`, see `setNgModule`.
     */
    resolve(type, throwIfNotFound = true) {
        var metadata = this._ngModules.get(type);
        if (!metadata) {
            metadata = super.resolve(type, throwIfNotFound);
        }
        return metadata;
    }
}
/** @nocollapse */
MockNgModuleResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MockNgModuleResolver.ctorParameters = [
    { type: Injector, },
];
//# sourceMappingURL=ng_module_resolver_mock.js.map