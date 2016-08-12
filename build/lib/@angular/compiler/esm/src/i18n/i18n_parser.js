/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Lexer as ExpressionLexer } from '../expression_parser/lexer';
import { Parser as ExpressionParser } from '../expression_parser/parser';
import * as html from '../ml_parser/ast';
import { getHtmlTagDefinition } from '../ml_parser/html_tags';
import * as i18n from './i18n_ast';
import { PlaceholderRegistry } from './serializers/placeholder';
const _expParser = new ExpressionParser(new ExpressionLexer());
/**
 * Returns a function converting html Messages to i18n Messages given an interpolationConfig
 */
export function createI18nMessageFactory(interpolationConfig) {
    const visitor = new _I18nVisitor(_expParser, interpolationConfig);
    return (nodes, meaning, description) => visitor.toI18nMessage(nodes, meaning, description);
}
class _I18nVisitor {
    constructor(_expressionParser, _interpolationConfig) {
        this._expressionParser = _expressionParser;
        this._interpolationConfig = _interpolationConfig;
    }
    toI18nMessage(nodes, meaning, description) {
        this._isIcu = nodes.length == 1 && nodes[0] instanceof html.Expansion;
        this._icuDepth = 0;
        this._placeholderRegistry = new PlaceholderRegistry();
        this._placeholderToContent = {};
        const i18nodes = html.visitAll(this, nodes, {});
        return new i18n.Message(i18nodes, this._placeholderToContent, meaning, description);
    }
    visitElement(el, context) {
        const children = html.visitAll(this, el.children);
        const attrs = {};
        el.attrs.forEach(attr => {
            // Do not visit the attributes, translatable ones are top-level ASTs
            attrs[attr.name] = attr.value;
        });
        const isVoid = getHtmlTagDefinition(el.name).isVoid;
        const startPhName = this._placeholderRegistry.getStartTagPlaceholderName(el.name, attrs, isVoid);
        this._placeholderToContent[startPhName] = el.sourceSpan.toString();
        let closePhName = '';
        if (!isVoid) {
            closePhName = this._placeholderRegistry.getCloseTagPlaceholderName(el.name);
            this._placeholderToContent[closePhName] = `</${el.name}>`;
        }
        return new i18n.TagPlaceholder(el.name, attrs, startPhName, closePhName, children, isVoid, el.sourceSpan);
    }
    visitAttribute(attribute, context) {
        return this._visitTextWithInterpolation(attribute.value, attribute.sourceSpan);
    }
    visitText(text, context) {
        return this._visitTextWithInterpolation(text.value, text.sourceSpan);
    }
    visitComment(comment, context) { return null; }
    visitExpansion(icu, context) {
        this._icuDepth++;
        const i18nIcuCases = {};
        const i18nIcu = new i18n.Icu(icu.switchValue, icu.type, i18nIcuCases, icu.sourceSpan);
        icu.cases.forEach((caze) => {
            i18nIcuCases[caze.value] = new i18n.Container(caze.expression.map((node) => node.visit(this, {})), caze.expSourceSpan);
        });
        this._icuDepth--;
        if (this._isIcu || this._icuDepth > 0) {
            // If the message (vs a part of the message) is an ICU message returns it
            return i18nIcu;
        }
        // else returns a placeholder
        const phName = this._placeholderRegistry.getPlaceholderName('ICU', icu.sourceSpan.toString());
        this._placeholderToContent[phName] = icu.sourceSpan.toString();
        return new i18n.IcuPlaceholder(i18nIcu, phName, icu.sourceSpan);
    }
    visitExpansionCase(icuCase, context) {
        throw new Error('Unreachable code');
    }
    _visitTextWithInterpolation(text, sourceSpan) {
        const splitInterpolation = this._expressionParser.splitInterpolation(text, sourceSpan.start.toString(), this._interpolationConfig);
        if (!splitInterpolation) {
            // No expression, return a single text
            return new i18n.Text(text, sourceSpan);
        }
        // Return a group of text + expressions
        const nodes = [];
        const container = new i18n.Container(nodes, sourceSpan);
        const { start: sDelimiter, end: eDelimiter } = this._interpolationConfig;
        for (let i = 0; i < splitInterpolation.strings.length - 1; i++) {
            const expression = splitInterpolation.expressions[i];
            const baseName = _extractPlaceholderName(expression) || 'INTERPOLATION';
            const phName = this._placeholderRegistry.getPlaceholderName(baseName, expression);
            if (splitInterpolation.strings[i].length) {
                // No need to add empty strings
                nodes.push(new i18n.Text(splitInterpolation.strings[i], sourceSpan));
            }
            nodes.push(new i18n.Placeholder(expression, phName, sourceSpan));
            this._placeholderToContent[phName] = sDelimiter + expression + eDelimiter;
        }
        // The last index contains no expression
        const lastStringIdx = splitInterpolation.strings.length - 1;
        if (splitInterpolation.strings[lastStringIdx].length) {
            nodes.push(new i18n.Text(splitInterpolation.strings[lastStringIdx], sourceSpan));
        }
        return container;
    }
}
const _CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*"([\s\S]*?)"[\s\S]*\)/g;
function _extractPlaceholderName(input) {
    return input.split(_CUSTOM_PH_EXP)[1];
}
//# sourceMappingURL=i18n_parser.js.map