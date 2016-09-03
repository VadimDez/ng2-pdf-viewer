/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Pipe } from '@angular/core';
import { StringWrapper, isBlank, isStringMap } from '../facade/lang';
import { NgLocalization, getPluralCategory } from '../localization';
import { InvalidPipeArgumentError } from './invalid_pipe_argument_error';
var _INTERPOLATION_REGEXP = /#/g;
/**
 *  Maps a value to a string that pluralizes the value properly.
 *
 *  ## Usage
 *
 *  expression | i18nPlural:mapping
 *
 *  where `expression` is a number and `mapping` is an object that mimics the ICU format,
 *  see http://userguide.icu-project.org/formatparse/messages
 *
 *  ## Example
 *
 *  ```
 *  @Component({
 *    selector: 'app',
 *    template: `
 *      <div>
 *        {{ messages.length | i18nPlural: messageMapping }}
 *      </div>
 *    `,
 *    // best practice is to define the locale at the application level
 *    providers: [{provide: LOCALE_ID, useValue: 'en_US'}]
 *  })
 *
 *  class MyApp {
 *    messages: any[];
 *    messageMapping: {[k:string]: string} = {
 *      '=0': 'No messages.',
 *      '=1': 'One message.',
 *      'other': '# messages.'
 *    }
 *    ...
 *  }
 *  ```
 *
 * @experimental
 */
export var I18nPluralPipe = (function () {
    function I18nPluralPipe(_localization) {
        this._localization = _localization;
    }
    I18nPluralPipe.prototype.transform = function (value, pluralMap) {
        if (isBlank(value))
            return '';
        if (!isStringMap(pluralMap)) {
            throw new InvalidPipeArgumentError(I18nPluralPipe, pluralMap);
        }
        var key = getPluralCategory(value, Object.keys(pluralMap), this._localization);
        return StringWrapper.replaceAll(pluralMap[key], _INTERPOLATION_REGEXP, value.toString());
    };
    I18nPluralPipe.decorators = [
        { type: Pipe, args: [{ name: 'i18nPlural', pure: true },] },
    ];
    /** @nocollapse */
    I18nPluralPipe.ctorParameters = [
        { type: NgLocalization, },
    ];
    return I18nPluralPipe;
}());
//# sourceMappingURL=i18n_plural_pipe.js.map