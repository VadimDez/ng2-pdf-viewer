/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationMetadata, AnimationTransitionMetadata, ɵStyleData } from '@angular/animations';
import { AnimationTransitionFactory } from './animation_transition_factory';
import { AnimationTransitionInstruction } from './animation_transition_instruction';
/**
 * @experimental Animation support is experimental.
 */
export declare function buildTrigger(name: string, definitions: AnimationMetadata[]): AnimationTrigger;
/**
* @experimental Animation support is experimental.
*/
export declare class AnimationTrigger {
    name: string;
    private _transitionAsts;
    transitionFactories: AnimationTransitionFactory[];
    states: {
        [stateName: string]: ɵStyleData;
    };
    constructor(name: string, states: {
        [stateName: string]: ɵStyleData;
    }, _transitionAsts: AnimationTransitionMetadata[]);
    createFallbackInstruction(currentState: any, nextState: any): AnimationTransitionInstruction;
    matchTransition(currentState: any, nextState: any): AnimationTransitionInstruction | null;
}
