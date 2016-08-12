/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var digest_1 = require('./digest');
var extractor_merger_1 = require('./extractor_merger');
/**
 * A container for message extracted from the templates.
 */
var MessageBundle = (function () {
    function MessageBundle(_htmlParser, _implicitTags, _implicitAttrs) {
        this._htmlParser = _htmlParser;
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
        this._messageMap = {};
    }
    MessageBundle.prototype.updateFromTemplate = function (html, url, interpolationConfig) {
        var _this = this;
        var htmlParserResult = this._htmlParser.parse(html, url, true, interpolationConfig);
        if (htmlParserResult.errors.length) {
            return htmlParserResult.errors;
        }
        var i18nParserResult = extractor_merger_1.extractMessages(htmlParserResult.rootNodes, interpolationConfig, this._implicitTags, this._implicitAttrs);
        if (i18nParserResult.errors.length) {
            return i18nParserResult.errors;
        }
        i18nParserResult.messages.forEach(function (message) { _this._messageMap[digest_1.digestMessage(message)] = message; });
    };
    MessageBundle.prototype.write = function (serializer) { return serializer.write(this._messageMap); };
    return MessageBundle;
}());
exports.MessageBundle = MessageBundle;
//# sourceMappingURL=message_bundle.js.map