import { AnimationPlayer } from './animation_player';
export declare class AnimationGroupPlayer implements AnimationPlayer {
    private _players;
    private _onDoneFns;
    private _onStartFns;
    private _finished;
    private _started;
    private _destroyed;
    private _onDestroyFns;
    parentPlayer: AnimationPlayer | null;
    constructor(_players: AnimationPlayer[]);
    private _onFinish();
    init(): void;
    onStart(fn: () => void): void;
    onDone(fn: () => void): void;
    onDestroy(fn: () => void): void;
    hasStarted(): boolean;
    play(): void;
    pause(): void;
    restart(): void;
    finish(): void;
    destroy(): void;
    reset(): void;
    setPosition(p: number): void;
    getPosition(): number;
    readonly players: AnimationPlayer[];
}
