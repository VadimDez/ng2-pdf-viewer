/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimateTimings, AnimationAnimateMetadata, AnimationGroupMetadata, AnimationKeyframesSequenceMetadata, AnimationMetadata, AnimationSequenceMetadata, AnimationStateMetadata, AnimationStyleMetadata, AnimationTransitionMetadata } from '@angular/animations';
import { AnimationDslVisitor } from './animation_dsl_visitor';
export declare type StyleTimeTuple = {
    startTime: number;
    endTime: number;
};
export declare function validateAnimationSequence(ast: AnimationMetadata): string[];
export declare class AnimationValidatorVisitor implements AnimationDslVisitor {
    validate(ast: AnimationMetadata): string[];
    visitState(ast: AnimationStateMetadata, context: any): any;
    visitTransition(ast: AnimationTransitionMetadata, context: any): any;
    visitSequence(ast: AnimationSequenceMetadata, context: AnimationValidatorContext): any;
    visitGroup(ast: AnimationGroupMetadata, context: AnimationValidatorContext): any;
    visitAnimate(ast: AnimationAnimateMetadata, context: AnimationValidatorContext): any;
    visitStyle(ast: AnimationStyleMetadata, context: AnimationValidatorContext): any;
    visitKeyframeSequence(ast: AnimationKeyframesSequenceMetadata, context: AnimationValidatorContext): any;
}
export declare class AnimationValidatorContext {
    errors: string[];
    currentTime: number;
    currentAnimateTimings: AnimateTimings | null;
    collectedStyles: {
        [propName: string]: StyleTimeTuple;
    };
}
