/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone } from '@angular/core';
import { EventEmitter } from '../../facade/async';
import { MessageBus, MessageBusSink, MessageBusSource } from './message_bus';
export interface PostMessageTarget {
    postMessage: (message: any, transfer?: [ArrayBuffer]) => void;
}
export declare class PostMessageBusSink implements MessageBusSink {
    private _postMessageTarget;
    private _zone;
    private _channels;
    private _messageBuffer;
    constructor(_postMessageTarget: PostMessageTarget);
    attachToZone(zone: NgZone): void;
    initChannel(channel: string, runInZone?: boolean): void;
    to(channel: string): EventEmitter<any>;
    private _handleOnEventDone();
    private _sendMessages(messages);
}
export declare class PostMessageBusSource implements MessageBusSource {
    private _zone;
    private _channels;
    constructor(eventTarget?: EventTarget);
    attachToZone(zone: NgZone): void;
    initChannel(channel: string, runInZone?: boolean): void;
    from(channel: string): EventEmitter<any>;
    private _handleMessages(ev);
    private _handleMessage(data);
}
/**
 * A TypeScript implementation of {@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */
export declare class PostMessageBus implements MessageBus {
    sink: PostMessageBusSink;
    source: PostMessageBusSource;
    constructor(sink: PostMessageBusSink, source: PostMessageBusSource);
    attachToZone(zone: NgZone): void;
    initChannel(channel: string, runInZone?: boolean): void;
    from(channel: string): EventEmitter<any>;
    to(channel: string): EventEmitter<any>;
}
