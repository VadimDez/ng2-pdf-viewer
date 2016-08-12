/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationPlayer } from '@angular/core';
import { AnimationKeyframe, AnimationStyles } from '../../core_private';
/**
 * @experimental
 */
export declare abstract class AnimationDriver {
    static NOOP: AnimationDriver;
    abstract animate(element: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string): AnimationPlayer;
}
