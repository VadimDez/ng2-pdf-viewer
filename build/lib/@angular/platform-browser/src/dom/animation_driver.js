/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_private_1 = require('../../core_private');
var _NoOpAnimationDriver = (function () {
    function _NoOpAnimationDriver() {
    }
    _NoOpAnimationDriver.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
        return new core_private_1.NoOpAnimationPlayer();
    };
    return _NoOpAnimationDriver;
}());
/**
 * @experimental
 */
var AnimationDriver = (function () {
    function AnimationDriver() {
    }
    AnimationDriver.NOOP = new _NoOpAnimationDriver();
    return AnimationDriver;
}());
exports.AnimationDriver = AnimationDriver;
//# sourceMappingURL=animation_driver.js.map