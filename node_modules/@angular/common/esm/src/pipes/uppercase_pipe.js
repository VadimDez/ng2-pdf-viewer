import { Pipe } from '@angular/core';
import { isBlank, isString } from '../facade/lang';
import { InvalidPipeArgumentException } from './invalid_pipe_argument_exception';
export class UpperCasePipe {
    transform(value) {
        if (isBlank(value))
            return value;
        if (!isString(value)) {
            throw new InvalidPipeArgumentException(UpperCasePipe, value);
        }
        return value.toUpperCase();
    }
}
/** @nocollapse */
UpperCasePipe.decorators = [
    { type: Pipe, args: [{ name: 'uppercase' },] },
];
//# sourceMappingURL=uppercase_pipe.js.map