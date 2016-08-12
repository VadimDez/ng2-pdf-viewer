/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from './di/decorators';
import { print, warn } from './facade/lang';
export class Console {
    log(message) { print(message); }
    // Note: for reporting errors use `DOM.logError()` as it is platform specific
    warn(message) { warn(message); }
}
/** @nocollapse */
Console.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=console.js.map