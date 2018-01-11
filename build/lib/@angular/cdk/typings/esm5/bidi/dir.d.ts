/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { Direction, Directionality } from './directionality';
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Provides itself as Directionality such that descendant directives only need to ever inject
 * Directionality to get the closest direction.
 */
export declare class Dir implements Directionality, AfterContentInit, OnDestroy {
    _dir: Direction;
    /** Whether the `value` has been set to its initial value. */
    private _isInitialized;
    /** Event emitted when the direction changes. */
    change: EventEmitter<Direction>;
    /** @docs-private */
    dir: Direction;
    /** Current layout direction of the element. */
    readonly value: Direction;
    /** Initialize once default value has been set. */
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
