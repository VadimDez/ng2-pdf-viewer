/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var decorators_1 = require('./decorators'); // so that metadata is gathered for this class
var OpaqueToken = (function () {
    function OpaqueToken(_desc) {
        this._desc = _desc;
    }
    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
    /** @nocollapse */
    OpaqueToken.decorators = [
        { type: decorators_1.Injectable },
    ];
    /** @nocollapse */
    OpaqueToken.ctorParameters = [
        null,
    ];
    return OpaqueToken;
}());
exports.OpaqueToken = OpaqueToken;
//# sourceMappingURL=opaque_token.js.map