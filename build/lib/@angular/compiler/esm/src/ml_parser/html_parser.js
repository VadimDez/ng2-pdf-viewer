/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { getHtmlTagDefinition } from './html_tags';
import { DEFAULT_INTERPOLATION_CONFIG } from './interpolation_config';
import { Parser } from './parser';
export { ParseTreeResult, TreeError } from './parser';
export class HtmlParser extends Parser {
    constructor() {
        super(getHtmlTagDefinition);
    }
    parse(source, url, parseExpansionForms = false, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
        return super.parse(source, url, parseExpansionForms, interpolationConfig);
    }
}
/** @nocollapse */
HtmlParser.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HtmlParser.ctorParameters = [];
//# sourceMappingURL=html_parser.js.map