/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimateTimings, AnimationAnimateMetadata, AnimationGroupMetadata, AnimationKeyframesSequenceMetadata, AnimationMetadata, AnimationSequenceMetadata, AnimationStateMetadata, AnimationStyleMetadata, AnimationTransitionMetadata, ɵStyleData } from '@angular/animations';
import { AnimationDslVisitor } from './animation_dsl_visitor';
import { AnimationTimelineInstruction } from './animation_timeline_instruction';
export declare function buildAnimationKeyframes(ast: AnimationMetadata | AnimationMetadata[], startingStyles?: ɵStyleData, finalStyles?: ɵStyleData): AnimationTimelineInstruction[];
export declare type StyleAtTime = {
    time: number;
    value: string | number;
};
export declare class AnimationTimelineContext {
    errors: any[];
    timelines: TimelineBuilder[];
    currentTimeline: TimelineBuilder;
    currentAnimateTimings: AnimateTimings | null;
    previousNode: AnimationMetadata;
    subContextCount: number;
    constructor(errors: any[], timelines: TimelineBuilder[], initialTimeline?: TimelineBuilder);
    createSubContext(): AnimationTimelineContext;
    transformIntoNewTimeline(newTime?: number): TimelineBuilder;
    incrementTime(time: number): void;
}
export declare class AnimationTimelineVisitor implements AnimationDslVisitor {
    buildKeyframes(ast: AnimationMetadata, startingStyles: ɵStyleData, finalStyles: ɵStyleData): AnimationTimelineInstruction[];
    visitState(ast: AnimationStateMetadata, context: any): any;
    visitTransition(ast: AnimationTransitionMetadata, context: any): any;
    visitSequence(ast: AnimationSequenceMetadata, context: AnimationTimelineContext): void;
    visitGroup(ast: AnimationGroupMetadata, context: AnimationTimelineContext): void;
    visitAnimate(ast: AnimationAnimateMetadata, context: AnimationTimelineContext): void;
    visitStyle(ast: AnimationStyleMetadata, context: AnimationTimelineContext): void;
    private _applyStyles(styles, easing, treatAsEmptyStep, context);
    visitKeyframeSequence(ast: AnimationKeyframesSequenceMetadata, context: AnimationTimelineContext): void;
}
export declare class TimelineBuilder {
    startTime: number;
    duration: number;
    easing: string | null;
    private _previousKeyframe;
    private _currentKeyframe;
    private _keyframes;
    private _styleSummary;
    private _localTimelineStyles;
    private _backFill;
    private _currentEmptyStepKeyframe;
    private _globalTimelineStyles;
    constructor(startTime: number, globalTimelineStyles?: ɵStyleData);
    hasStyling(): boolean;
    readonly currentTime: number;
    fork(currentTime?: number): TimelineBuilder;
    private _loadKeyframe();
    forwardFrame(): void;
    forwardTime(time: number): void;
    private _updateStyle(prop, value);
    allowOnlyTimelineStyles(): boolean;
    setStyles(styles: ɵStyleData, easing?: string | null, treatAsEmptyStep?: boolean): void;
    snapshotCurrentStyles(): void;
    getFinalKeyframe(): ɵStyleData;
    readonly properties: string[];
    mergeTimelineCollectedStyles(timeline: TimelineBuilder): void;
    buildKeyframes(): AnimationTimelineInstruction;
}
