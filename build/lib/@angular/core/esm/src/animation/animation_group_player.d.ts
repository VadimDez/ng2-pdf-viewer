import { AnimationPlayer } from './animation_player';
export declare class AnimationGroupPlayer implements AnimationPlayer {
    private _players;
    private _subscriptions;
    private _finished;
    parentPlayer: AnimationPlayer;
    constructor(_players: AnimationPlayer[]);
    private _onFinish();
    onDone(fn: Function): void;
    play(): void;
    pause(): void;
    restart(): void;
    finish(): void;
    destroy(): void;
    reset(): void;
    setPosition(p: any): void;
    getPosition(): number;
}
