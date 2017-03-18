/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from './metadata';
export var OpaqueToken = (function () {
    /**
     * @param {?} _desc
     */
    function OpaqueToken(_desc) {
        this._desc = _desc;
    }
    /**
     * @return {?}
     */
    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
    OpaqueToken.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    OpaqueToken.ctorParameters = function () { return [
        null,
    ]; };
    return OpaqueToken;
}());
function OpaqueToken_tsickle_Closure_declarations() {
    /** @type {?} */
    OpaqueToken.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    OpaqueToken.ctorParameters;
    /** @type {?} */
    OpaqueToken.prototype._desc;
}
//# sourceMappingURL=opaque_token.js.map