/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter } from '../../facade/async';
import { Serializer } from '../shared/serializer';
export declare class EventDispatcher {
    private _sink;
    private _serializer;
    constructor(_sink: EventEmitter<any>, _serializer: Serializer);
    dispatchRenderEvent(element: any, eventTarget: string, eventName: string, event: any): boolean;
}
