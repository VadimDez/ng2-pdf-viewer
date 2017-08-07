/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationAnimateMetadata, AnimationGroupMetadata, AnimationKeyframesSequenceMetadata, AnimationMetadata, AnimationSequenceMetadata, AnimationStateMetadata, AnimationStyleMetadata, AnimationTransitionMetadata } from '@angular/animations';
export interface AnimationDslVisitor {
    visitState(ast: AnimationStateMetadata, context: any): any;
    visitTransition(ast: AnimationTransitionMetadata, context: any): any;
    visitSequence(ast: AnimationSequenceMetadata, context: any): any;
    visitGroup(ast: AnimationGroupMetadata, context: any): any;
    visitAnimate(ast: AnimationAnimateMetadata, context: any): any;
    visitStyle(ast: AnimationStyleMetadata, context: any): any;
    visitKeyframeSequence(ast: AnimationKeyframesSequenceMetadata, context: any): any;
}
export declare function visitAnimationNode(visitor: AnimationDslVisitor, node: AnimationMetadata, context: any): any;
