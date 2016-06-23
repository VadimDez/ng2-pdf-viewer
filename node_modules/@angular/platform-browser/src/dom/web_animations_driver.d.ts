import { AnimationDriver, AnimationKeyframe, AnimationPlayer, AnimationStyles } from '../../core_private';
export declare class WebAnimationsDriver implements AnimationDriver {
    animate(element: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string): AnimationPlayer;
}
