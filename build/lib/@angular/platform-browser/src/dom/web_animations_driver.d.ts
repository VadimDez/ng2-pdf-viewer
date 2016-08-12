import { AnimationKeyframe, AnimationStyles } from '../../core_private';
import { AnimationDriver } from './animation_driver';
import { WebAnimationsPlayer } from './web_animations_player';
export declare class WebAnimationsDriver implements AnimationDriver {
    animate(element: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string): WebAnimationsPlayer;
}
