/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BaseException } from '../facade/exceptions';
import { Type } from '../facade/lang';
export declare class InvalidPipeArgumentException extends BaseException {
    constructor(type: Type, value: Object);
}
