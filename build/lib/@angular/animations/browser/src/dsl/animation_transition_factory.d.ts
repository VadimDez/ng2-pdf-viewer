/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationTransitionMetadata, ɵStyleData } from '@angular/animations';
import { TransitionMatcherFn } from './animation_transition_expr';
import { AnimationTransitionInstruction } from './animation_transition_instruction';
export declare class AnimationTransitionFactory {
    private _triggerName;
    private matchFns;
    private _stateStyles;
    private _animationAst;
    constructor(_triggerName: string, ast: AnimationTransitionMetadata, matchFns: TransitionMatcherFn[], _stateStyles: {
        [stateName: string]: ɵStyleData;
    });
    match(currentState: any, nextState: any): AnimationTransitionInstruction | undefined;
}
