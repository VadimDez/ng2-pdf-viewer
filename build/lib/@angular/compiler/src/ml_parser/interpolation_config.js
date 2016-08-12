/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var assertions_1 = require('../assertions');
var InterpolationConfig = (function () {
    function InterpolationConfig(start, end) {
        this.start = start;
        this.end = end;
    }
    InterpolationConfig.fromArray = function (markers) {
        if (!markers) {
            return exports.DEFAULT_INTERPOLATION_CONFIG;
        }
        assertions_1.assertInterpolationSymbols('interpolation', markers);
        return new InterpolationConfig(markers[0], markers[1]);
    };
    ;
    return InterpolationConfig;
}());
exports.InterpolationConfig = InterpolationConfig;
exports.DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig('{{', '}}');
//# sourceMappingURL=interpolation_config.js.map