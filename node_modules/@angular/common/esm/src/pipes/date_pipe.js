import { Injectable, Pipe } from '@angular/core';
import { isDate, isNumber, isString, DateWrapper, isBlank } from '../facade/lang';
import { DateFormatter } from '../facade/intl';
import { StringMapWrapper } from '../facade/collection';
import { InvalidPipeArgumentException } from './invalid_pipe_argument_exception';
// TODO: move to a global configurable location along with other i18n components.
var defaultLocale = 'en-US';
export class DatePipe {
    transform(value, pattern = 'mediumDate') {
        if (isBlank(value))
            return null;
        if (!this.supports(value)) {
            throw new InvalidPipeArgumentException(DatePipe, value);
        }
        if (isNumber(value)) {
            value = DateWrapper.fromMillis(value);
        }
        else if (isString(value)) {
            value = DateWrapper.fromISOString(value);
        }
        if (StringMapWrapper.contains(DatePipe._ALIASES, pattern)) {
            pattern = StringMapWrapper.get(DatePipe._ALIASES, pattern);
        }
        return DateFormatter.format(value, defaultLocale, pattern);
    }
    supports(obj) {
        if (isDate(obj) || isNumber(obj)) {
            return true;
        }
        if (isString(obj) && isDate(DateWrapper.fromISOString(obj))) {
            return true;
        }
        return false;
    }
}
/** @internal */
DatePipe._ALIASES = {
    'medium': 'yMMMdjms',
    'short': 'yMdjm',
    'fullDate': 'yMMMMEEEEd',
    'longDate': 'yMMMMd',
    'mediumDate': 'yMMMd',
    'shortDate': 'yMd',
    'mediumTime': 'jms',
    'shortTime': 'jm'
};
/** @nocollapse */
DatePipe.decorators = [
    { type: Pipe, args: [{ name: 'date', pure: true },] },
    { type: Injectable },
];
//# sourceMappingURL=date_pipe.js.map