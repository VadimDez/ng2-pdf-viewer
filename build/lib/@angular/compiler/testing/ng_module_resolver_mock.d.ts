/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModuleResolver } from '@angular/compiler';
import { Injector, NgModuleMetadata, Type } from '@angular/core';
export declare class MockNgModuleResolver extends NgModuleResolver {
    private _injector;
    private _ngModules;
    constructor(_injector: Injector);
    private _compiler;
    private _clearCacheFor(component);
    /**
     * Overrides the {@link NgModuleMetadata} for a module.
     */
    setNgModule(type: Type<any>, metadata: NgModuleMetadata): void;
    /**
     * Returns the {@link NgModuleMetadata} for a module:
     * - Set the {@link NgModuleMetadata} to the overridden view when it exists or fallback to the
     * default
     * `NgModuleResolver`, see `setNgModule`.
     */
    resolve(type: Type<any>, throwIfNotFound?: boolean): NgModuleMetadata;
}
