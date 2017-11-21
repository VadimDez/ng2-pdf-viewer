/**
 * @license Angular v5.0.2
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations')) :
	typeof define === 'function' && define.amd ? define('@angular/animations/browser/testing', ['exports', '@angular/animations'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.animations = global.ng.animations || {}, global.ng.animations.browser = global.ng.animations.browser || {}, global.ng.animations.browser.testing = {}),global.ng.animations));
}(this, (function (exports,_angular_animations) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @license Angular v5.0.2
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} players
 * @return {?}
 */

/**
 * @param {?} driver
 * @param {?} normalizer
 * @param {?} element
 * @param {?} keyframes
 * @param {?=} preStyles
 * @param {?=} postStyles
 * @return {?}
 */

/**
 * @param {?} player
 * @param {?} eventName
 * @param {?} event
 * @param {?} callback
 * @return {?}
 */

/**
 * @param {?} e
 * @param {?=} phaseName
 * @param {?=} totalTime
 * @return {?}
 */

/**
 * @param {?} element
 * @param {?} triggerName
 * @param {?} fromState
 * @param {?} toState
 * @param {?=} phaseName
 * @param {?=} totalTime
 * @return {?}
 */

/**
 * @param {?} map
 * @param {?} key
 * @param {?} defaultValue
 * @return {?}
 */

/**
 * @param {?} command
 * @return {?}
 */

var _contains = function (elm1, elm2) { return false; };
var _matches = function (element, selector) {
    return false;
};
var _query = function (element, selector, multi) {
    return [];
};
if (typeof Element != 'undefined') {
    // this is well supported in all browsers
    _contains = function (elm1, elm2) { return /** @type {?} */ (elm1.contains(elm2)); };
    if (Element.prototype.matches) {
        _matches = function (element, selector) { return element.matches(selector); };
    }
    else {
        var /** @type {?} */ proto = /** @type {?} */ (Element.prototype);
        var /** @type {?} */ fn_1 = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector ||
            proto.oMatchesSelector || proto.webkitMatchesSelector;
        if (fn_1) {
            _matches = function (element, selector) { return fn_1.apply(element, [selector]); };
        }
    }
    _query = function (element, selector, multi) {
        var /** @type {?} */ results = [];
        if (multi) {
            results.push.apply(results, element.querySelectorAll(selector));
        }
        else {
            var /** @type {?} */ elm = element.querySelector(selector);
            if (elm) {
                results.push(elm);
            }
        }
        return results;
    };
}
var _CACHED_BODY = null;
/**
 * @param {?} prop
 * @return {?}
 */
function validateStyleProperty(prop) {
    if (!_CACHED_BODY) {
        _CACHED_BODY = getBodyNode() || {};
    }
    return /** @type {?} */ ((_CACHED_BODY)).style ? prop in /** @type {?} */ ((_CACHED_BODY)).style : true;
}
/**
 * @return {?}
 */
function getBodyNode() {
    if (typeof document != 'undefined') {
        return document.body;
    }
    return null;
}
var matchesElement = _matches;
var containsElement = _contains;
var invokeQuery = _query;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */











/**
 * @param {?} value
 * @return {?}
 */

/**
 * @param {?} timings
 * @param {?} errors
 * @param {?=} allowNegativeValues
 * @return {?}
 */

/**
 * @param {?} obj
 * @param {?=} destination
 * @return {?}
 */

/**
 * @param {?} styles
 * @return {?}
 */

/**
 * @param {?} styles
 * @param {?} readPrototype
 * @param {?=} destination
 * @return {?}
 */

/**
 * @param {?} element
 * @param {?} styles
 * @return {?}
 */

/**
 * @param {?} element
 * @param {?} styles
 * @return {?}
 */

/**
 * @param {?} steps
 * @return {?}
 */

/**
 * @param {?} value
 * @param {?} options
 * @param {?} errors
 * @return {?}
 */

/**
 * @param {?} value
 * @return {?}
 */

/**
 * @param {?} value
 * @param {?} params
 * @param {?} errors
 * @return {?}
 */

/**
 * @param {?} iterator
 * @return {?}
 */

/**
 * @param {?} source
 * @param {?} destination
 * @return {?}
 */

/**
 * @param {?} input
 * @return {?}
 */

/**
 * @param {?} duration
 * @param {?} delay
 * @return {?}
 */
function allowPreviousPlayerStylesMerge(duration, delay) {
    return duration === 0 || delay === 0;
}
/**
 * @param {?} visitor
 * @param {?} node
 * @param {?} context
 * @return {?}
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@experimental Animation support is experimental.
 */
var MockAnimationDriver = (function () {
    function MockAnimationDriver() {
    }
    /**
     * @param {?} prop
     * @return {?}
     */
    MockAnimationDriver.prototype.validateStyleProperty = /**
     * @param {?} prop
     * @return {?}
     */
    function (prop) { return validateStyleProperty(prop); };
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    MockAnimationDriver.prototype.matchesElement = /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    function (element, selector) {
        return matchesElement(element, selector);
    };
    /**
     * @param {?} elm1
     * @param {?} elm2
     * @return {?}
     */
    MockAnimationDriver.prototype.containsElement = /**
     * @param {?} elm1
     * @param {?} elm2
     * @return {?}
     */
    function (elm1, elm2) { return containsElement(elm1, elm2); };
    /**
     * @param {?} element
     * @param {?} selector
     * @param {?} multi
     * @return {?}
     */
    MockAnimationDriver.prototype.query = /**
     * @param {?} element
     * @param {?} selector
     * @param {?} multi
     * @return {?}
     */
    function (element, selector, multi) {
        return invokeQuery(element, selector, multi);
    };
    /**
     * @param {?} element
     * @param {?} prop
     * @param {?=} defaultValue
     * @return {?}
     */
    MockAnimationDriver.prototype.computeStyle = /**
     * @param {?} element
     * @param {?} prop
     * @param {?=} defaultValue
     * @return {?}
     */
    function (element, prop, defaultValue) {
        return defaultValue || '';
    };
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    MockAnimationDriver.prototype.animate = /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    function (element, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        var /** @type {?} */ player = new MockAnimationPlayer(element, keyframes, duration, delay, easing, previousPlayers);
        MockAnimationDriver.log.push(/** @type {?} */ (player));
        return player;
    };
    MockAnimationDriver.log = [];
    return MockAnimationDriver;
}());
/**
 * \@experimental Animation support is experimental.
 */
var MockAnimationPlayer = (function (_super) {
    __extends(MockAnimationPlayer, _super);
    function MockAnimationPlayer(element, keyframes, duration, delay, easing, previousPlayers) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.keyframes = keyframes;
        _this.duration = duration;
        _this.delay = delay;
        _this.easing = easing;
        _this.previousPlayers = previousPlayers;
        _this.__finished = false;
        _this.__started = false;
        _this.previousStyles = {};
        _this._onInitFns = [];
        _this.currentSnapshot = {};
        if (allowPreviousPlayerStylesMerge(duration, delay)) {
            previousPlayers.forEach(function (player) {
                if (player instanceof MockAnimationPlayer) {
                    var /** @type {?} */ styles_1 = player.currentSnapshot;
                    Object.keys(styles_1).forEach(function (prop) { return _this.previousStyles[prop] = styles_1[prop]; });
                }
            });
        }
        _this.totalTime = delay + duration;
        return _this;
    }
    /* @internal */
    /**
     * @param {?} fn
     * @return {?}
     */
    MockAnimationPlayer.prototype.onInit = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onInitFns.push(fn); };
    /* @internal */
    /**
     * @return {?}
     */
    MockAnimationPlayer.prototype.init = /**
     * @return {?}
     */
    function () {
        _super.prototype.init.call(this);
        this._onInitFns.forEach(function (fn) { return fn(); });
        this._onInitFns = [];
    };
    /**
     * @return {?}
     */
    MockAnimationPlayer.prototype.finish = /**
     * @return {?}
     */
    function () {
        _super.prototype.finish.call(this);
        this.__finished = true;
    };
    /**
     * @return {?}
     */
    MockAnimationPlayer.prototype.destroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.destroy.call(this);
        this.__finished = true;
    };
    /* @internal */
    /**
     * @return {?}
     */
    MockAnimationPlayer.prototype.triggerMicrotask = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    MockAnimationPlayer.prototype.play = /**
     * @return {?}
     */
    function () {
        _super.prototype.play.call(this);
        this.__started = true;
    };
    /**
     * @return {?}
     */
    MockAnimationPlayer.prototype.hasStarted = /**
     * @return {?}
     */
    function () { return this.__started; };
    /**
     * @return {?}
     */
    MockAnimationPlayer.prototype.beforeDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ captures = {};
        Object.keys(this.previousStyles).forEach(function (prop) {
            captures[prop] = _this.previousStyles[prop];
        });
        if (this.hasStarted()) {
            // when assembling the captured styles, it's important that
            // we build the keyframe styles in the following order:
            // {other styles within keyframes, ... previousStyles }
            this.keyframes.forEach(function (kf) {
                Object.keys(kf).forEach(function (prop) {
                    if (prop != 'offset') {
                        captures[prop] = _this.__finished ? kf[prop] : _angular_animations.AUTO_STYLE;
                    }
                });
            });
        }
        this.currentSnapshot = captures;
    };
    return MockAnimationPlayer;
}(_angular_animations.NoopAnimationPlayer));

exports.MockAnimationDriver = MockAnimationDriver;
exports.MockAnimationPlayer = MockAnimationPlayer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=animations-browser-testing.umd.js.map
