/**
 * @experimental Animation support is experimental.
 */
export declare abstract class AnimationPlayer {
    abstract onDone(fn: () => void): void;
    abstract onStart(fn: () => void): void;
    abstract onDestroy(fn: () => void): void;
    abstract init(): void;
    abstract hasStarted(): boolean;
    abstract play(): void;
    abstract pause(): void;
    abstract restart(): void;
    abstract finish(): void;
    abstract destroy(): void;
    abstract reset(): void;
    abstract setPosition(p: any): void;
    abstract getPosition(): number;
    parentPlayer: AnimationPlayer | null;
}
/**
 * @experimental Animation support is experimental.
 */
export declare class NoopAnimationPlayer implements AnimationPlayer {
    private _onDoneFns;
    private _onStartFns;
    private _onDestroyFns;
    private _started;
    private _destroyed;
    private _finished;
    parentPlayer: AnimationPlayer | null;
    constructor();
    private _onFinish();
    onStart(fn: () => void): void;
    onDone(fn: () => void): void;
    onDestroy(fn: () => void): void;
    hasStarted(): boolean;
    init(): void;
    play(): void;
    private _onStart();
    pause(): void;
    restart(): void;
    finish(): void;
    destroy(): void;
    reset(): void;
    setPosition(p: number): void;
    getPosition(): number;
}
