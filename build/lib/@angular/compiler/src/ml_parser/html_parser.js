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
var core_1 = require('@angular/core');
var html_tags_1 = require('./html_tags');
var interpolation_config_1 = require('./interpolation_config');
var parser_1 = require('./parser');
var parser_2 = require('./parser');
exports.ParseTreeResult = parser_2.ParseTreeResult;
exports.TreeError = parser_2.TreeError;
var HtmlParser = (function (_super) {
    __extends(HtmlParser, _super);
    function HtmlParser() {
        _super.call(this, html_tags_1.getHtmlTagDefinition);
    }
    HtmlParser.prototype.parse = function (source, url, parseExpansionForms, interpolationConfig) {
        if (parseExpansionForms === void 0) { parseExpansionForms = false; }
        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
        return _super.prototype.parse.call(this, source, url, parseExpansionForms, interpolationConfig);
    };
    /** @nocollapse */
    HtmlParser.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    HtmlParser.ctorParameters = [];
    return HtmlParser;
}(parser_1.Parser));
exports.HtmlParser = HtmlParser;
//# sourceMappingURL=html_parser.js.map