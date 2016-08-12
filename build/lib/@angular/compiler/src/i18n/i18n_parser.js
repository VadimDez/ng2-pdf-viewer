/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lexer_1 = require('../expression_parser/lexer');
var parser_1 = require('../expression_parser/parser');
var html = require('../ml_parser/ast');
var html_tags_1 = require('../ml_parser/html_tags');
var i18n = require('./i18n_ast');
var placeholder_1 = require('./serializers/placeholder');
var _expParser = new parser_1.Parser(new lexer_1.Lexer());
/**
 * Returns a function converting html Messages to i18n Messages given an interpolationConfig
 */
function createI18nMessageFactory(interpolationConfig) {
    var visitor = new _I18nVisitor(_expParser, interpolationConfig);
    return function (nodes, meaning, description) {
        return visitor.toI18nMessage(nodes, meaning, description);
    };
}
exports.createI18nMessageFactory = createI18nMessageFactory;
var _I18nVisitor = (function () {
    function _I18nVisitor(_expressionParser, _interpolationConfig) {
        this._expressionParser = _expressionParser;
        this._interpolationConfig = _interpolationConfig;
    }
    _I18nVisitor.prototype.toI18nMessage = function (nodes, meaning, description) {
        this._isIcu = nodes.length == 1 && nodes[0] instanceof html.Expansion;
        this._icuDepth = 0;
        this._placeholderRegistry = new placeholder_1.PlaceholderRegistry();
        this._placeholderToContent = {};
        var i18nodes = html.visitAll(this, nodes, {});
        return new i18n.Message(i18nodes, this._placeholderToContent, meaning, description);
    };
    _I18nVisitor.prototype.visitElement = function (el, context) {
        var children = html.visitAll(this, el.children);
        var attrs = {};
        el.attrs.forEach(function (attr) {
            // Do not visit the attributes, translatable ones are top-level ASTs
            attrs[attr.name] = attr.value;
        });
        var isVoid = html_tags_1.getHtmlTagDefinition(el.name).isVoid;
        var startPhName = this._placeholderRegistry.getStartTagPlaceholderName(el.name, attrs, isVoid);
        this._placeholderToContent[startPhName] = el.sourceSpan.toString();
        var closePhName = '';
        if (!isVoid) {
            closePhName = this._placeholderRegistry.getCloseTagPlaceholderName(el.name);
            this._placeholderToContent[closePhName] = "</" + el.name + ">";
        }
        return new i18n.TagPlaceholder(el.name, attrs, startPhName, closePhName, children, isVoid, el.sourceSpan);
    };
    _I18nVisitor.prototype.visitAttribute = function (attribute, context) {
        return this._visitTextWithInterpolation(attribute.value, attribute.sourceSpan);
    };
    _I18nVisitor.prototype.visitText = function (text, context) {
        return this._visitTextWithInterpolation(text.value, text.sourceSpan);
    };
    _I18nVisitor.prototype.visitComment = function (comment, context) { return null; };
    _I18nVisitor.prototype.visitExpansion = function (icu, context) {
        var _this = this;
        this._icuDepth++;
        var i18nIcuCases = {};
        var i18nIcu = new i18n.Icu(icu.switchValue, icu.type, i18nIcuCases, icu.sourceSpan);
        icu.cases.forEach(function (caze) {
            i18nIcuCases[caze.value] = new i18n.Container(caze.expression.map(function (node) { return node.visit(_this, {}); }), caze.expSourceSpan);
        });
        this._icuDepth--;
        if (this._isIcu || this._icuDepth > 0) {
            // If the message (vs a part of the message) is an ICU message returns it
            return i18nIcu;
        }
        // else returns a placeholder
        var phName = this._placeholderRegistry.getPlaceholderName('ICU', icu.sourceSpan.toString());
        this._placeholderToContent[phName] = icu.sourceSpan.toString();
        return new i18n.IcuPlaceholder(i18nIcu, phName, icu.sourceSpan);
    };
    _I18nVisitor.prototype.visitExpansionCase = function (icuCase, context) {
        throw new Error('Unreachable code');
    };
    _I18nVisitor.prototype._visitTextWithInterpolation = function (text, sourceSpan) {
        var splitInterpolation = this._expressionParser.splitInterpolation(text, sourceSpan.start.toString(), this._interpolationConfig);
        if (!splitInterpolation) {
            // No expression, return a single text
            return new i18n.Text(text, sourceSpan);
        }
        // Return a group of text + expressions
        var nodes = [];
        var container = new i18n.Container(nodes, sourceSpan);
        var _a = this._interpolationConfig, sDelimiter = _a.start, eDelimiter = _a.end;
        for (var i = 0; i < splitInterpolation.strings.length - 1; i++) {
            var expression = splitInterpolation.expressions[i];
            var baseName = _extractPlaceholderName(expression) || 'INTERPOLATION';
            var phName = this._placeholderRegistry.getPlaceholderName(baseName, expression);
            if (splitInterpolation.strings[i].length) {
                // No need to add empty strings
                nodes.push(new i18n.Text(splitInterpolation.strings[i], sourceSpan));
            }
            nodes.push(new i18n.Placeholder(expression, phName, sourceSpan));
            this._placeholderToContent[phName] = sDelimiter + expression + eDelimiter;
        }
        // The last index contains no expression
        var lastStringIdx = splitInterpolation.strings.length - 1;
        if (splitInterpolation.strings[lastStringIdx].length) {
            nodes.push(new i18n.Text(splitInterpolation.strings[lastStringIdx], sourceSpan));
        }
        return container;
    };
    return _I18nVisitor;
}());
var _CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*"([\s\S]*?)"[\s\S]*\)/g;
function _extractPlaceholderName(input) {
    return input.split(_CUSTOM_PH_EXP)[1];
}
//# sourceMappingURL=i18n_parser.js.map