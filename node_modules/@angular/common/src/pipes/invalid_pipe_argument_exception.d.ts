import { BaseException } from '../facade/exceptions';
import { Type } from '../facade/lang';
export declare class InvalidPipeArgumentException extends BaseException {
    constructor(type: Type, value: Object);
}
