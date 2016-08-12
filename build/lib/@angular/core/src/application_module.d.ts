/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '../src/facade/lang';
import { IterableDiffers, KeyValueDiffers } from './change_detection/change_detection';
export declare function _iterableDiffersFactory(): IterableDiffers;
export declare function _keyValueDiffersFactory(): KeyValueDiffers;
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 *
 * @deprecated Include `ApplicationModule` instead.
 */
export declare const APPLICATION_COMMON_PROVIDERS: Array<Type | {
    [k: string]: any;
} | any[]>;
/**
 * This module includes the providers of @angular/core that are needed
 * to bootstrap components via `ApplicationRef`.
 *
 * @experimental
 */
export declare class ApplicationModule {
}
