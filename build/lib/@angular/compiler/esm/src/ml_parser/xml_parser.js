/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Parser } from './parser';
import { getXmlTagDefinition } from './xml_tags';
export { ParseTreeResult, TreeError } from './parser';
export class XmlParser extends Parser {
    constructor() {
        super(getXmlTagDefinition);
    }
    parse(source, url, parseExpansionForms = false) {
        return super.parse(source, url, parseExpansionForms, null);
    }
}
//# sourceMappingURL=xml_parser.js.map