/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { digestMessage } from './digest';
import { extractMessages } from './extractor_merger';
/**
 * A container for message extracted from the templates.
 */
export class MessageBundle {
    constructor(_htmlParser, _implicitTags, _implicitAttrs) {
        this._htmlParser = _htmlParser;
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
        this._messageMap = {};
    }
    updateFromTemplate(html, url, interpolationConfig) {
        const htmlParserResult = this._htmlParser.parse(html, url, true, interpolationConfig);
        if (htmlParserResult.errors.length) {
            return htmlParserResult.errors;
        }
        const i18nParserResult = extractMessages(htmlParserResult.rootNodes, interpolationConfig, this._implicitTags, this._implicitAttrs);
        if (i18nParserResult.errors.length) {
            return i18nParserResult.errors;
        }
        i18nParserResult.messages.forEach((message) => { this._messageMap[digestMessage(message)] = message; });
    }
    write(serializer) { return serializer.write(this._messageMap); }
}
//# sourceMappingURL=message_bundle.js.map