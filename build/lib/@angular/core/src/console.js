/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var decorators_1 = require('./di/decorators');
var lang_1 = require('./facade/lang');
var Console = (function () {
    function Console() {
    }
    Console.prototype.log = function (message) { lang_1.print(message); };
    // Note: for reporting errors use `DOM.logError()` as it is platform specific
    Console.prototype.warn = function (message) { lang_1.warn(message); };
    /** @nocollapse */
    Console.decorators = [
        { type: decorators_1.Injectable },
    ];
    return Console;
}());
exports.Console = Console;
//# sourceMappingURL=console.js.map