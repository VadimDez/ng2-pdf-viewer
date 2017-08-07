/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationPlayer, AnimationTriggerMetadata } from '@angular/animations';
import { AnimationEngine } from '../animation_engine';
export declare class NoopAnimationEngine extends AnimationEngine {
    private _listeners;
    private _changes;
    private _flaggedRemovals;
    private _onDoneFns;
    private _triggerStyles;
    registerTrigger(trigger: AnimationTriggerMetadata, name?: string): void;
    onInsert(element: any, domFn: () => any): void;
    onRemove(element: any, domFn: () => any): void;
    setProperty(element: any, property: string, value: any): void;
    listen(element: any, eventName: string, eventPhase: string, callback: (event: any) => any): () => any;
    flush(): void;
    readonly activePlayers: AnimationPlayer[];
    readonly queuedPlayers: AnimationPlayer[];
}
