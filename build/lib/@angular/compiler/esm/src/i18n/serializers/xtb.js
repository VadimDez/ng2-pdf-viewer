/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ml from '../../ml_parser/ast';
import { XmlParser } from '../../ml_parser/xml_parser';
import { I18nError } from '../parse_util';
const _TRANSLATIONS_TAG = 'translationbundle';
const _TRANSLATION_TAG = 'translation';
const _PLACEHOLDER_TAG = 'ph';
export class Xtb {
    constructor(_htmlParser, _interpolationConfig) {
        this._htmlParser = _htmlParser;
        this._interpolationConfig = _interpolationConfig;
    }
    write(messageMap) { throw new Error('Unsupported'); }
    load(content, url, placeholders) {
        // Parse the xtb file into xml nodes
        const result = new XmlParser().parse(content, url);
        if (result.errors.length) {
            throw new Error(`xtb parse errors:\n${result.errors.join('\n')}`);
        }
        // Replace the placeholders, messages are now string
        const { messages, errors } = new _Serializer().parse(result.rootNodes, placeholders);
        if (errors.length) {
            throw new Error(`xtb parse errors:\n${errors.join('\n')}`);
        }
        // Convert the string messages to html ast
        // TODO(vicb): map error message back to the original message in xtb
        let messageMap = {};
        let parseErrors = [];
        Object.keys(messages).forEach((id) => {
            const res = this._htmlParser.parse(messages[id], url, true, this._interpolationConfig);
            parseErrors.push(...res.errors);
            messageMap[id] = res.rootNodes;
        });
        if (parseErrors.length) {
            throw new Error(`xtb parse errors:\n${parseErrors.join('\n')}`);
        }
        return messageMap;
    }
}
class _Serializer {
    parse(nodes, _placeholders) {
        this._messages = {};
        this._bundleDepth = 0;
        this._translationDepth = 0;
        this._errors = [];
        this._placeholders = _placeholders;
        ml.visitAll(this, nodes, null);
        return { messages: this._messages, errors: this._errors };
    }
    visitElement(element, context) {
        switch (element.name) {
            case _TRANSLATIONS_TAG:
                this._bundleDepth++;
                if (this._bundleDepth > 1) {
                    this._addError(element, `<${_TRANSLATIONS_TAG}> elements can not be nested`);
                }
                ml.visitAll(this, element.children, null);
                this._bundleDepth--;
                break;
            case _TRANSLATION_TAG:
                this._translationDepth++;
                if (this._translationDepth > 1) {
                    this._addError(element, `<${_TRANSLATION_TAG}> elements can not be nested`);
                }
                const idAttr = element.attrs.find((attr) => attr.name === 'id');
                if (!idAttr) {
                    this._addError(element, `<${_TRANSLATION_TAG}> misses the "id" attribute`);
                }
                else {
                    this._currentPlaceholders = this._placeholders[idAttr.value] || {};
                    this._messages[idAttr.value] = ml.visitAll(this, element.children).join('');
                }
                this._translationDepth--;
                break;
            case _PLACEHOLDER_TAG:
                const nameAttr = element.attrs.find((attr) => attr.name === 'name');
                if (!nameAttr) {
                    this._addError(element, `<${_PLACEHOLDER_TAG}> misses the "name" attribute`);
                }
                else {
                    if (this._currentPlaceholders.hasOwnProperty(nameAttr.value)) {
                        return this._currentPlaceholders[nameAttr.value];
                    }
                    this._addError(element, `The placeholder "${nameAttr.value}" does not exists in the source message`);
                }
                break;
            default:
                this._addError(element, 'Unexpected tag');
        }
    }
    visitAttribute(attribute, context) {
        throw new Error('unreachable code');
    }
    visitText(text, context) { return text.value; }
    visitComment(comment, context) { return ''; }
    visitExpansion(expansion, context) {
        const strCases = expansion.cases.map(c => c.visit(this, null));
        return `{${expansion.switchValue}, ${expansion.type}, strCases.join(' ')}`;
    }
    visitExpansionCase(expansionCase, context) {
        return `${expansionCase.value} {${ml.visitAll(this, expansionCase.expression, null)}}`;
    }
    _addError(node, message) {
        this._errors.push(new I18nError(node.sourceSpan, message));
    }
}
//# sourceMappingURL=xtb.js.map