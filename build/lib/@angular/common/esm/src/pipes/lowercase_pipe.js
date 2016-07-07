import { Pipe } from '@angular/core';
import { isBlank, isString } from '../facade/lang';
import { InvalidPipeArgumentException } from './invalid_pipe_argument_exception';
export class LowerCasePipe {
    transform(value) {
        if (isBlank(value))
            return value;
        if (!isString(value)) {
            throw new InvalidPipeArgumentException(LowerCasePipe, value);
        }
        return value.toLowerCase();
    }
}
/** @nocollapse */
LowerCasePipe.decorators = [
    { type: Pipe, args: [{ name: 'lowercase' },] },
];
//# sourceMappingURL=lowercase_pipe.js.map