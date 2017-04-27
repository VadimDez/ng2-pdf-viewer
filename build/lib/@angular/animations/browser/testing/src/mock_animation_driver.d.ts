/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationPlayer, NoopAnimationPlayer } from '@angular/animations';
import { AnimationDriver } from '../../src/render/animation_driver';
/**
 * @experimental Animation support is experimental.
 */
export declare class MockAnimationDriver implements AnimationDriver {
    static log: AnimationPlayer[];
    animate(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers?: any[]): MockAnimationPlayer;
}
/**
 * @experimental Animation support is experimental.
 */
export declare class MockAnimationPlayer extends NoopAnimationPlayer {
    element: any;
    keyframes: {
        [key: string]: string | number;
    }[];
    duration: number;
    delay: number;
    easing: string;
    previousPlayers: any[];
    private __finished;
    previousStyles: {
        [key: string]: string | number;
    };
    private _onInitFns;
    constructor(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers: any[]);
    finish(): void;
    destroy(): void;
    private _captureStyles();
}
