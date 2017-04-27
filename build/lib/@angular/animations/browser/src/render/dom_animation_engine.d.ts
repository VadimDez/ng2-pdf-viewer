/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEvent, AnimationPlayer, AnimationTriggerMetadata } from '@angular/animations';
import { AnimationTimelineInstruction } from '../dsl/animation_timeline_instruction';
import { AnimationTransitionInstruction } from '../dsl/animation_transition_instruction';
import { AnimationStyleNormalizer } from '../dsl/style_normalization/animation_style_normalizer';
import { AnimationDriver } from './animation_driver';
export interface QueuedAnimationTransitionTuple {
    element: any;
    player: AnimationPlayer;
    triggerName: string;
    event: AnimationEvent;
}
export interface TriggerListenerTuple {
    triggerName: string;
    phase: string;
    callback: (event: any) => any;
}
export declare class DomAnimationEngine {
    private _driver;
    private _normalizer;
    private _flaggedInserts;
    private _queuedRemovals;
    private _queuedTransitionAnimations;
    private _activeTransitionAnimations;
    private _activeElementAnimations;
    private _elementTriggerStates;
    private _triggers;
    private _triggerListeners;
    private _pendingListenerRemovals;
    constructor(_driver: AnimationDriver, _normalizer: AnimationStyleNormalizer);
    readonly queuedPlayers: AnimationPlayer[];
    readonly activePlayers: AnimationPlayer[];
    registerTrigger(trigger: AnimationTriggerMetadata, name?: string): void;
    onInsert(element: any, domFn: () => any): void;
    onRemove(element: any, domFn: () => any): void;
    setProperty(element: any, property: string, value: any): void;
    listen(element: any, eventName: string, eventPhase: string, callback: (event: any) => any): () => void;
    private _clearPendingListenerRemovals();
    private _onRemovalTransition(element);
    animateTransition(element: any, instruction: AnimationTransitionInstruction): AnimationPlayer;
    animateTimeline(element: any, instructions: AnimationTimelineInstruction[], previousPlayers?: AnimationPlayer[]): AnimationPlayer;
    private _buildPlayer(element, instruction, previousPlayers, index?);
    private _normalizeKeyframes(keyframes);
    private _markPlayerAsActive(element, player);
    private _queuePlayer(element, triggerName, player, event);
    private _flushQueuedAnimations();
    flush(): void;
}
