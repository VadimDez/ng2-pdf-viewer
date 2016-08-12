import { AnimationPlayer } from './animation_player';
export declare class AnimationGroupPlayer implements AnimationPlayer {
    private _players;
    private _subscriptions;
    private _finished;
    private _started;
    parentPlayer: AnimationPlayer;
    constructor(_players: AnimationPlayer[]);
    private _onFinish();
    init(): void;
    onDone(fn: Function): void;
    hasStarted(): boolean;
    play(): void;
    pause(): void;
    restart(): void;
    finish(): void;
    destroy(): void;
    reset(): void;
    setPosition(p: any): void;
    getPosition(): number;
}
