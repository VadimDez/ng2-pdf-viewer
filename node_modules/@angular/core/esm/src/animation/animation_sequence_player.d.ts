import { AnimationPlayer } from './animation_player';
export declare class AnimationSequencePlayer implements AnimationPlayer {
    private _players;
    private _currentIndex;
    private _activePlayer;
    private _subscriptions;
    private _finished;
    parentPlayer: AnimationPlayer;
    constructor(_players: AnimationPlayer[]);
    private _onNext(start);
    private _onFinish();
    onDone(fn: Function): void;
    play(): void;
    pause(): void;
    restart(): void;
    reset(): void;
    finish(): void;
    destroy(): void;
    setPosition(p: any): void;
    getPosition(): number;
}
