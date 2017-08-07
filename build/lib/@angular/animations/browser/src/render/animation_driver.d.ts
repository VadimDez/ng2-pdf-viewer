/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationPlayer } from '@angular/animations';
/**
 * @experimental
 */
export declare class NoopAnimationDriver implements AnimationDriver {
    animate(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers?: any[]): AnimationPlayer;
}
/**
 * @experimental
 */
export declare abstract class AnimationDriver {
    static NOOP: AnimationDriver;
    abstract animate(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing?: string | null, previousPlayers?: any[]): any;
}
