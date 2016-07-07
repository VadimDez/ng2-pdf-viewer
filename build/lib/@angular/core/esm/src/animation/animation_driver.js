import { NoOpAnimationPlayer } from './animation_player';
export class AnimationDriver {
}
export class NoOpAnimationDriver extends AnimationDriver {
    animate(element, startingStyles, keyframes, duration, delay, easing) {
        return new NoOpAnimationPlayer();
    }
}
//# sourceMappingURL=animation_driver.js.map