/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EventEmitter, Observable } from '../facade/async';
/**
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted.
 * When a new value is emitted, the `async` pipe marks the component to be checked for changes.
 * When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 * ## Usage
 *
 *     object | async
 *
 * where `object` is of type `Observable` or of type `Promise`.
 *
 * ## Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. Every 500ms, the `time` Observable updates the view with the current time.
 *
 * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipeObservable'}
 *
 * @stable
 */
export declare class AsyncPipe implements OnDestroy {
    private _strategy;
    constructor(_ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    transform(obj: Observable<any> | Promise<any> | EventEmitter<any>): any;
}
