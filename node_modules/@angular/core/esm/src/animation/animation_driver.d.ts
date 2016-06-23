import { AnimationKeyframe } from './animation_keyframe';
import { AnimationPlayer } from './animation_player';
import { AnimationStyles } from './animation_styles';
export declare abstract class AnimationDriver {
    abstract animate(element: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string): AnimationPlayer;
}
export declare class NoOpAnimationDriver extends AnimationDriver {
    animate(element: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string): AnimationPlayer;
}
