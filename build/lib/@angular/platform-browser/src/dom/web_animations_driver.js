/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPresent } from '../facade/lang';
import { WebAnimationsPlayer } from './web_animations_player';
export var WebAnimationsDriver = (function () {
    function WebAnimationsDriver() {
    }
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    WebAnimationsDriver.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        var /** @type {?} */ formattedSteps = [];
        var /** @type {?} */ startingStyleLookup = {};
        if (isPresent(startingStyles)) {
            startingStyleLookup = _populateStyles(startingStyles, {});
        }
        keyframes.forEach(function (keyframe) {
            var /** @type {?} */ data = _populateStyles(keyframe.styles, startingStyleLookup);
            data['offset'] = Math.max(0, Math.min(1, keyframe.offset));
            formattedSteps.push(data);
        });
        // Styling passed into element.animate() must always be balanced.
        // The special cases below can occur if only style() calls exist
        // within an animation or when a style() calls are used prior
        // to a group() animation being issued or if the renderer is
        // invoked by the user directly.
        if (formattedSteps.length == 0) {
            formattedSteps = [startingStyleLookup, startingStyleLookup];
        }
        else if (formattedSteps.length == 1) {
            var /** @type {?} */ start = startingStyleLookup;
            var /** @type {?} */ end = formattedSteps[0];
            end['offset'] = null;
            formattedSteps = [start, end];
        }
        var /** @type {?} */ playerOptions = {
            'duration': duration,
            'delay': delay,
            'fill': 'both' // we use `both` because it allows for styling at 0% to work with `delay`
        };
        // we check for this to avoid having a null|undefined value be present
        // for the easing (which results in an error for certain browsers #9752)
        if (easing) {
            playerOptions['easing'] = easing;
        }
        // there may be a chance a NoOp player is returned depending
        // on when the previous animation was cancelled
        previousPlayers = previousPlayers.filter(filterWebAnimationPlayerFn);
        return new WebAnimationsPlayer(element, formattedSteps, playerOptions, /** @type {?} */ (previousPlayers));
    };
    return WebAnimationsDriver;
}());
/**
 * @param {?} styles
 * @param {?} defaultStyles
 * @return {?}
 */
function _populateStyles(styles, defaultStyles) {
    var /** @type {?} */ data = {};
    styles.styles.forEach(function (entry) { Object.keys(entry).forEach(function (prop) { data[prop] = entry[prop]; }); });
    Object.keys(defaultStyles).forEach(function (prop) {
        if (!isPresent(data[prop])) {
            data[prop] = defaultStyles[prop];
        }
    });
    return data;
}
/**
 * @param {?} player
 * @return {?}
 */
function filterWebAnimationPlayerFn(player) {
    return player instanceof WebAnimationsPlayer;
}
//# sourceMappingURL=web_animations_driver.js.map