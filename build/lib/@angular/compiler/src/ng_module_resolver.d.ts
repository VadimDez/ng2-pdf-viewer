/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModuleMetadata, Type } from '@angular/core';
import { ReflectorReader } from './private_import_core';
/**
 * Resolves types to {@link NgModuleMetadata}.
 */
export declare class NgModuleResolver {
    private _reflector;
    constructor(_reflector?: ReflectorReader);
    resolve(type: Type<any>, throwIfNotFound?: boolean): NgModuleMetadata;
}
