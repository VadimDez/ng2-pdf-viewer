/**
 * `AnimationStyles` consists of a collection of key/value maps containing CSS-based style data
 * that can either be used as initial styling data or apart of a series of keyframes within an
 * animation.
 * This class is mostly internal, and it is designed to be used alongside
 * {@link AnimationKeyframe `AnimationKeyframe`} and {@link Renderer#animate-anchor
 * `Renderer.animate`}.
 *
 * @experimental Animation support is experimental
 */
export declare class AnimationStyles {
    styles: {
        [key: string]: string | number;
    }[];
    constructor(styles: {
        [key: string]: string | number;
    }[]);
}
