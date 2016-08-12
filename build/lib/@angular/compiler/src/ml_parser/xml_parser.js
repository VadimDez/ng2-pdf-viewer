/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parser_1 = require('./parser');
var xml_tags_1 = require('./xml_tags');
var parser_2 = require('./parser');
exports.ParseTreeResult = parser_2.ParseTreeResult;
exports.TreeError = parser_2.TreeError;
var XmlParser = (function (_super) {
    __extends(XmlParser, _super);
    function XmlParser() {
        _super.call(this, xml_tags_1.getXmlTagDefinition);
    }
    XmlParser.prototype.parse = function (source, url, parseExpansionForms) {
        if (parseExpansionForms === void 0) { parseExpansionForms = false; }
        return _super.prototype.parse.call(this, source, url, parseExpansionForms, null);
    };
    return XmlParser;
}(parser_1.Parser));
exports.XmlParser = XmlParser;
//# sourceMappingURL=xml_parser.js.map