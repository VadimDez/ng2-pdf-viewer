/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModuleFactory, Provider, Type } from '@angular/core';
export interface PlatformOptions {
    document?: string;
    url?: string;
    extraProviders?: Provider[];
}
/**
 * Renders a Module to string.
 *
 * Do not use this in a production server environment. Use pre-compiled {@link NgModuleFactory} with
 * {link renderModuleFactory} instead.
 *
 * @experimental
 */
export declare function renderModule<T>(module: Type<T>, options: PlatformOptions): Promise<string>;
/**
 * Renders a {@link NgModuleFactory} to string.
 *
 * @experimental
 */
export declare function renderModuleFactory<T>(moduleFactory: NgModuleFactory<T>, options: PlatformOptions): Promise<string>;
