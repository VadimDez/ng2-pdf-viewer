/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NoOpAnimationPlayer } from '../../core_private';
class _NoOpAnimationDriver {
    animate(element, startingStyles, keyframes, duration, delay, easing) {
        return new NoOpAnimationPlayer();
    }
}
/**
 * @experimental
 */
export class AnimationDriver {
}
AnimationDriver.NOOP = new _NoOpAnimationDriver();
//# sourceMappingURL=animation_driver.js.map