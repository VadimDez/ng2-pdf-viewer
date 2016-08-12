/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { COMMON_DIRECTIVES } from './src/common_directives';
import { COMMON_PIPES } from './src/pipes';
export * from './src/pipes';
export * from './src/directives';
export * from './src/forms-deprecated';
export * from './src/common_directives';
export * from './src/location';
export { NgLocalization } from './src/localization';
export class CommonModule {
}
/** @nocollapse */
CommonModule.decorators = [
    { type: NgModule, args: [{ declarations: [COMMON_DIRECTIVES, COMMON_PIPES], exports: [COMMON_DIRECTIVES, COMMON_PIPES] },] },
];
//# sourceMappingURL=index.js.map