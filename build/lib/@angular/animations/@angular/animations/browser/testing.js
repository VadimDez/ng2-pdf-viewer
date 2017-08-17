/**
 * @license Angular v4.1.0
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { AUTO_STYLE, NoopAnimationPlayer } from '@angular/animations';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental Animation support is experimental.
 */
class MockAnimationDriver {
    animate(element, keyframes, duration, delay, easing, previousPlayers = []) {
        const player = new MockAnimationPlayer(element, keyframes, duration, delay, easing, previousPlayers);
        MockAnimationDriver.log.push(player);
        return player;
    }
}
MockAnimationDriver.log = [];
/**
 * @experimental Animation support is experimental.
 */
class MockAnimationPlayer extends NoopAnimationPlayer {
    constructor(element, keyframes, duration, delay, easing, previousPlayers) {
        super();
        this.element = element;
        this.keyframes = keyframes;
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
        this.previousPlayers = previousPlayers;
        this.__finished = false;
        this.previousStyles = {};
        this._onInitFns = [];
        previousPlayers.forEach(player => {
            if (player instanceof MockAnimationPlayer) {
                const styles = player._captureStyles();
                Object.keys(styles).forEach(prop => { this.previousStyles[prop] = styles[prop]; });
            }
        });
    }
    /* @internal */
    onInit(fn) { this._onInitFns.push(fn); }
    /* @internal */
    init() {
        super.init();
        this._onInitFns.forEach(fn => fn());
        this._onInitFns = [];
    }
    finish() {
        super.finish();
        this.__finished = true;
    }
    destroy() {
        super.destroy();
        this.__finished = true;
    }
    _captureStyles() {
        const captures = {};
        Object.keys(this.previousStyles).forEach(prop => {
            captures[prop] = this.previousStyles[prop];
        });
        if (this.hasStarted()) {
            // when assembling the captured styles, it's important that
            // we build the keyframe styles in the following order:
            // {other styles within keyframes, ... previousStyles }
            this.keyframes.forEach(kf => {
                Object.keys(kf).forEach(prop => {
                    if (prop != 'offset') {
                        captures[prop] = this.__finished ? kf[prop] : AUTO_STYLE;
                    }
                });
            });
        }
        return captures;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-browser/animations/testing package.
 */

export { MockAnimationDriver, MockAnimationPlayer };
//# sourceMappingURL=testing.js.map
