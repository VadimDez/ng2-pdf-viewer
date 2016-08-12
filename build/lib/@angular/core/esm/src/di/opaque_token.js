/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from './decorators';
export class OpaqueToken {
    constructor(_desc) {
        this._desc = _desc;
    }
    toString() { return `Token ${this._desc}`; }
}
/** @nocollapse */
OpaqueToken.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OpaqueToken.ctorParameters = [
    null,
];
//# sourceMappingURL=opaque_token.js.map