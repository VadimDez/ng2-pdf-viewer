/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ParseError } from '../parse_util';
/**
 * An i18n error.
 */
export class I18nError extends ParseError {
    constructor(span, msg) {
        super(span, msg);
    }
}
//# sourceMappingURL=parse_util.js.map