/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Coerces a data-bound value (typically a string) to a number. */
export declare function coerceNumberProperty(value: any): number;
export declare function coerceNumberProperty<D>(value: any, fallback: D): number | D;
