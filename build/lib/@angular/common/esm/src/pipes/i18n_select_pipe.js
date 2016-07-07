import { Pipe } from '@angular/core';
import { StringMapWrapper } from '../facade/collection';
import { isStringMap } from '../facade/lang';
import { InvalidPipeArgumentException } from './invalid_pipe_argument_exception';
export class I18nSelectPipe {
    transform(value, mapping) {
        if (!isStringMap(mapping)) {
            throw new InvalidPipeArgumentException(I18nSelectPipe, mapping);
        }
        return StringMapWrapper.contains(mapping, value) ? mapping[value] : mapping['other'];
    }
}
/** @nocollapse */
I18nSelectPipe.decorators = [
    { type: Pipe, args: [{ name: 'i18nSelect', pure: true },] },
];
//# sourceMappingURL=i18n_select_pipe.js.map