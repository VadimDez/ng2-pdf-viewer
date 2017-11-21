/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * Config object passed to initialize the platform.
 *
 * @experimental
 */
export interface PlatformConfig {
    document?: string;
    url?: string;
}
/**
 * The DI token for setting the initial config for the platform.
 *
 * @experimental
 */
export declare const INITIAL_CONFIG: InjectionToken<PlatformConfig>;
/**
 * A function that will be executed when calling `renderModuleFactory` or `renderModule` just
 * before current platform state is rendered to string.
 *
 * @experimental
 */
export declare const BEFORE_APP_SERIALIZED: InjectionToken<(() => void)[]>;
