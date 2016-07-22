/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationPlayer } from '../../core_private';
import { DomAnimatePlayer } from './dom_animate_player';
export declare class WebAnimationsPlayer implements AnimationPlayer {
    private _player;
    totalTime: number;
    private _subscriptions;
    private _finished;
    parentPlayer: AnimationPlayer;
    constructor(_player: DomAnimatePlayer, totalTime: number);
    private _onFinish();
    onDone(fn: Function): void;
    play(): void;
    pause(): void;
    finish(): void;
    reset(): void;
    restart(): void;
    destroy(): void;
    setPosition(p: any): void;
    getPosition(): number;
}
