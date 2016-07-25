/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewMetadata } from '@angular/core';
import { ReflectorReader } from '../core_private';
import { Type } from '../src/facade/lang';
/**
 * Resolves types to {@link ViewMetadata}.
 */
export declare class ViewResolver {
    private _reflector;
    constructor(_reflector?: ReflectorReader);
    resolve(component: Type): ViewMetadata;
}
