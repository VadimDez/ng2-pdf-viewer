/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PipeTransform } from '@angular/core';
import { NgLocalization } from '../localization';
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
export declare class I18nPluralPipe implements PipeTransform {
    private _localization;
    constructor(_localization: NgLocalization);
    transform(value: number, pluralMap: {
        [count: string]: string;
    }): string;
}
