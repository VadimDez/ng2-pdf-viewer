/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Stores error information; delivered via [NgZone.onError] stream.
 * @deprecated
 */
export declare class NgZoneError {
    error: any;
    stackTrace: any;
    constructor(error: any, stackTrace: any);
}
export declare class NgZoneImpl {
    static isInAngularZone(): boolean;
    private onEnter;
    private onLeave;
    private setMicrotask;
    private setMacrotask;
    private onError;
    constructor({trace, onEnter, onLeave, setMicrotask, setMacrotask, onError}: {
        trace: boolean;
        onEnter: () => void;
        onLeave: () => void;
        setMicrotask: (hasMicrotasks: boolean) => void;
        setMacrotask: (hasMacrotasks: boolean) => void;
        onError: (error: NgZoneError) => void;
    });
    runInner(fn: () => any): any;
    runInnerGuarded(fn: () => any): any;
    runOuter(fn: () => any): any;
}
