/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimateTimings, ɵStyleData } from '@angular/animations';
export declare const ONE_SECOND = 1000;
export declare function parseTimeExpression(exp: string | number, errors: string[]): AnimateTimings;
export declare function normalizeStyles(styles: ɵStyleData | ɵStyleData[]): ɵStyleData;
export declare function copyStyles(styles: ɵStyleData, readPrototype: boolean, destination?: ɵStyleData): ɵStyleData;
export declare function setStyles(element: any, styles: ɵStyleData): void;
export declare function eraseStyles(element: any, styles: ɵStyleData): void;
