/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BaseWrappedException } from './base_wrapped_exception';
export { ExceptionHandler } from './exception_handler';
/**
 * @stable
 */
export declare class BaseException extends Error {
    message: string;
    stack: any;
    constructor(message?: string);
    toString(): string;
}
/**
 * Wraps an exception and provides additional context or information.
 * @stable
 */
export declare class WrappedException extends BaseWrappedException {
    private _wrapperMessage;
    private _originalException;
    private _originalStack;
    private _context;
    private _wrapperStack;
    constructor(_wrapperMessage: string, _originalException: any, _originalStack?: any, _context?: any);
    readonly wrapperMessage: string;
    readonly wrapperStack: any;
    readonly originalException: any;
    readonly originalStack: any;
    readonly context: any;
    readonly message: string;
    toString(): string;
}
export declare function makeTypeError(message?: string): Error;
export declare function unimplemented(): any;
