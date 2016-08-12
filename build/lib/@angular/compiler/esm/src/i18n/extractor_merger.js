/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as html from '../ml_parser/ast';
import { digestMessage } from './digest';
import * as i18n from './i18n_ast';
import { createI18nMessageFactory } from './i18n_parser';
import { I18nError } from './parse_util';
const _I18N_ATTR = 'i18n';
const _I18N_ATTR_PREFIX = 'i18n-';
const _I18N_COMMENT_PREFIX_REGEXP = /^i18n:?/;
/**
 * Extract translatable messages from an html AST
 */
export function extractMessages(nodes, interpolationConfig, implicitTags, implicitAttrs) {
    const visitor = new _Visitor(implicitTags, implicitAttrs);
    return visitor.extract(nodes, interpolationConfig);
}
export function mergeTranslations(nodes, translations, interpolationConfig, implicitTags, implicitAttrs) {
    const visitor = new _Visitor(implicitTags, implicitAttrs);
    return visitor.merge(nodes, translations, interpolationConfig);
}
export class ExtractionResult {
    constructor(messages, errors) {
        this.messages = messages;
        this.errors = errors;
    }
}
var _VisitorMode;
(function (_VisitorMode) {
    _VisitorMode[_VisitorMode["Extract"] = 0] = "Extract";
    _VisitorMode[_VisitorMode["Merge"] = 1] = "Merge";
})(_VisitorMode || (_VisitorMode = {}));
/**
 * This Visitor is used:
 * 1. to extract all the translatable strings from an html AST (see `extract()`),
 * 2. to replace the translatable strings with the actual translations (see `merge()`)
 *
 * @internal
 */
class _Visitor {
    constructor(_implicitTags, _implicitAttrs) {
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
        // <el i18n>...</el>
        this._inI18nNode = false;
        this._depth = 0;
        // {<icu message>}
        this._inIcu = false;
    }
    /**
     * Extracts the messages from the tree
     */
    extract(nodes, interpolationConfig) {
        this._init(_VisitorMode.Extract, interpolationConfig);
        nodes.forEach(node => node.visit(this, null));
        if (this._inI18nBlock) {
            this._reportError(nodes[nodes.length - 1], 'Unclosed block');
        }
        return new ExtractionResult(this._messages, this._errors);
    }
    /**
     * Returns a tree where all translatable nodes are translated
     */
    merge(nodes, translations, interpolationConfig) {
        this._init(_VisitorMode.Merge, interpolationConfig);
        this._translations = translations;
        // Construct a single fake root element
        const wrapper = new html.Element('wrapper', [], nodes, null, null, null);
        const translatedNode = wrapper.visit(this, null);
        if (this._inI18nBlock) {
            this._reportError(nodes[nodes.length - 1], 'Unclosed block');
        }
        return translatedNode.children;
    }
    visitExpansionCase(icuCase, context) {
        // Parse cases for translatable html attributes
        const expression = html.visitAll(this, icuCase.expression, context);
        if (this._mode === _VisitorMode.Merge) {
            return new html.ExpansionCase(icuCase.value, expression, icuCase.sourceSpan, icuCase.valueSourceSpan, icuCase.expSourceSpan);
        }
    }
    visitExpansion(icu, context) {
        this._mayBeAddBlockChildren(icu);
        const wasInIcu = this._inIcu;
        if (!this._inIcu) {
            // nested ICU messages should not be extracted but top-level translated as a whole
            if (this._isInTranslatableSection) {
                this._addMessage([icu]);
            }
            this._inIcu = true;
        }
        const cases = html.visitAll(this, icu.cases, context);
        if (this._mode === _VisitorMode.Merge) {
            icu = new html.Expansion(icu.switchValue, icu.type, cases, icu.sourceSpan, icu.switchValueSourceSpan);
        }
        this._inIcu = wasInIcu;
        return icu;
    }
    visitComment(comment, context) {
        const isOpening = _isOpeningComment(comment);
        if (isOpening && this._isInTranslatableSection) {
            this._reportError(comment, 'Could not start a block inside a translatable section');
            return;
        }
        const isClosing = _isClosingComment(comment);
        if (isClosing && !this._inI18nBlock) {
            this._reportError(comment, 'Trying to close an unopened block');
            return;
        }
        if (!this._inI18nNode && !this._inIcu) {
            if (!this._inI18nBlock) {
                if (isOpening) {
                    this._inI18nBlock = true;
                    this._blockStartDepth = this._depth;
                    this._blockChildren = [];
                    this._blockMeaningAndDesc = comment.value.replace(_I18N_COMMENT_PREFIX_REGEXP, '').trim();
                    this._openTranslatableSection(comment);
                }
            }
            else {
                if (isClosing) {
                    if (this._depth == this._blockStartDepth) {
                        this._closeTranslatableSection(comment, this._blockChildren);
                        this._inI18nBlock = false;
                        const message = this._addMessage(this._blockChildren, this._blockMeaningAndDesc);
                        return this._translateMessage(comment, message);
                    }
                    else {
                        this._reportError(comment, 'I18N blocks should not cross element boundaries');
                        return;
                    }
                }
            }
        }
    }
    visitText(text, context) {
        if (this._isInTranslatableSection) {
            this._mayBeAddBlockChildren(text);
        }
        return text;
    }
    visitElement(el, context) {
        this._mayBeAddBlockChildren(el);
        this._depth++;
        const wasInI18nNode = this._inI18nNode;
        let childNodes;
        // Extract only top level nodes with the (implicit) "i18n" attribute if not in a block or an ICU
        // message
        const i18nAttr = _getI18nAttr(el);
        const isImplicitI18n = this._implicitTags.some((tag) => el.name === tag);
        if (!this._isInTranslatableSection && !this._inIcu) {
            if (i18nAttr) {
                // explicit translation
                this._inI18nNode = true;
                const message = this._addMessage(el.children, i18nAttr.value);
                childNodes = this._translateMessage(el, message);
            }
            else if (isImplicitI18n) {
                // implicit translation
                this._inI18nNode = true;
                const message = this._addMessage(el.children);
                childNodes = this._translateMessage(el, message);
            }
            if (this._mode == _VisitorMode.Extract) {
                const isTranslatable = i18nAttr || isImplicitI18n;
                if (isTranslatable) {
                    this._openTranslatableSection(el);
                }
                html.visitAll(this, el.children);
                if (isTranslatable) {
                    this._closeTranslatableSection(el, el.children);
                }
            }
            if (this._mode === _VisitorMode.Merge && !i18nAttr && !isImplicitI18n) {
                childNodes = [];
                el.children.forEach(child => {
                    const visited = child.visit(this, context);
                    if (visited && !this._isInTranslatableSection) {
                        // Do not add the children from translatable sections (= i18n blocks here)
                        // They will be added when the section is close (i.e. on `<!-- /i18n -->`)
                        childNodes = childNodes.concat(visited);
                    }
                });
            }
        }
        else {
            if (i18nAttr || isImplicitI18n) {
                // TODO(vicb): we should probably allow nested implicit element (ie <div>)
                this._reportError(el, 'Could not mark an element as translatable inside a translatable section');
            }
            if (this._mode == _VisitorMode.Extract) {
                // Descend into child nodes for extraction
                html.visitAll(this, el.children);
            }
            if (this._mode == _VisitorMode.Merge) {
                // Translate attributes in ICU messages
                childNodes = [];
                el.children.forEach(child => {
                    const visited = child.visit(this, context);
                    if (visited && !this._isInTranslatableSection) {
                        // Do not add the children from translatable sections (= i18n blocks here)
                        // They will be added when the section is close (i.e. on `<!-- /i18n -->`)
                        childNodes = childNodes.concat(visited);
                    }
                });
            }
        }
        this._visitAttributesOf(el);
        this._depth--;
        this._inI18nNode = wasInI18nNode;
        if (this._mode === _VisitorMode.Merge) {
            // There are no childNodes in translatable sections - those nodes will be replace anyway
            const translatedAttrs = this._translateAttributes(el);
            return new html.Element(el.name, translatedAttrs, childNodes, el.sourceSpan, el.startSourceSpan, el.endSourceSpan);
        }
    }
    visitAttribute(attribute, context) {
        throw new Error('unreachable code');
    }
    _init(mode, interpolationConfig) {
        this._mode = mode;
        this._inI18nBlock = false;
        this._inI18nNode = false;
        this._depth = 0;
        this._inIcu = false;
        this._msgCountAtSectionStart = void 0;
        this._errors = [];
        this._messages = [];
        this._createI18nMessage = createI18nMessageFactory(interpolationConfig);
    }
    // looks for translatable attributes
    _visitAttributesOf(el) {
        const explicitAttrNameToValue = {};
        const implicitAttrNames = this._implicitAttrs[el.name] || [];
        el.attrs.filter(attr => attr.name.startsWith(_I18N_ATTR_PREFIX))
            .forEach(attr => explicitAttrNameToValue[attr.name.slice(_I18N_ATTR_PREFIX.length)] =
            attr.value);
        el.attrs.forEach(attr => {
            if (attr.name in explicitAttrNameToValue) {
                this._addMessage([attr], explicitAttrNameToValue[attr.name]);
            }
            else if (implicitAttrNames.some(name => attr.name === name)) {
                this._addMessage([attr]);
            }
        });
    }
    // add a translatable message
    _addMessage(ast, meaningAndDesc) {
        if (ast.length == 0 ||
            ast.length == 1 && ast[0] instanceof html.Attribute && !ast[0].value) {
            // Do not create empty messages
            return;
        }
        const [meaning, description] = _splitMeaningAndDesc(meaningAndDesc);
        const message = this._createI18nMessage(ast, meaning, description);
        this._messages.push(message);
        return message;
    }
    // translate the given message given the `TranslationBundle`
    _translateMessage(el, message) {
        if (message && this._mode === _VisitorMode.Merge) {
            const id = digestMessage(message);
            const nodes = this._translations.get(id);
            if (nodes) {
                return nodes;
            }
            this._reportError(el, `Translation unavailable for message id="${id}"`);
        }
        return [];
    }
    // translate the attributes of an element and remove i18n specific attributes
    _translateAttributes(el) {
        const attributes = el.attrs;
        const i18nAttributeMeanings = {};
        attributes.forEach(attr => {
            if (attr.name.startsWith(_I18N_ATTR_PREFIX)) {
                i18nAttributeMeanings[attr.name.slice(_I18N_ATTR_PREFIX.length)] =
                    _splitMeaningAndDesc(attr.value)[0];
            }
        });
        const translatedAttributes = [];
        attributes.forEach((attr) => {
            if (attr.name === _I18N_ATTR || attr.name.startsWith(_I18N_ATTR_PREFIX)) {
                // strip i18n specific attributes
                return;
            }
            if (i18nAttributeMeanings.hasOwnProperty(attr.name)) {
                const meaning = i18nAttributeMeanings[attr.name];
                const message = this._createI18nMessage([attr], meaning, '');
                const id = digestMessage(message);
                const nodes = this._translations.get(id);
                if (nodes) {
                    if (nodes[0] instanceof html.Text) {
                        const value = nodes[0].value;
                        translatedAttributes.push(new html.Attribute(attr.name, value, attr.sourceSpan));
                    }
                    else {
                        this._reportError(el, `Unexpected translation for attribute "${attr.name}" (id="${id}")`);
                    }
                }
                else {
                    this._reportError(el, `Translation unavailable for attribute "${attr.name}" (id="${id}")`);
                }
            }
            else {
                translatedAttributes.push(attr);
            }
        });
        return translatedAttributes;
    }
    /**
     * Add the node as a child of the block when:
     * - we are in a block,
     * - we are not inside a ICU message (those are handled separately),
     * - the node is a "direct child" of the block
     */
    _mayBeAddBlockChildren(node) {
        if (this._inI18nBlock && !this._inIcu && this._depth == this._blockStartDepth) {
            this._blockChildren.push(node);
        }
    }
    /**
     * Marks the start of a section, see `_endSection`
     */
    _openTranslatableSection(node) {
        if (this._isInTranslatableSection) {
            this._reportError(node, 'Unexpected section start');
        }
        else {
            this._msgCountAtSectionStart = this._messages.length;
        }
    }
    /**
     * A translatable section could be:
     * - a translatable element,
     * - nodes between `<!-- i18n -->` and `<!-- /i18n -->` comments
     */
    get _isInTranslatableSection() {
        return this._msgCountAtSectionStart !== void 0;
    }
    /**
     * Terminates a section.
     *
     * If a section has only one significant children (comments not significant) then we should not
     * keep the message from this children:
     *
     * `<p i18n="meaning|description">{ICU message}</p>` would produce two messages:
     * - one for the <p> content with meaning and description,
     * - another one for the ICU message.
     *
     * In this case the last message is discarded as it contains less information (the AST is
     * otherwise identical).
     *
     * Note that we should still keep messages extracted from attributes inside the section (ie in the
     * ICU message here)
     */
    _closeTranslatableSection(node, directChildren) {
        if (!this._isInTranslatableSection) {
            this._reportError(node, 'Unexpected section end');
            return;
        }
        const startIndex = this._msgCountAtSectionStart;
        const significantChildren = directChildren.reduce((count, node) => count + (node instanceof html.Comment ? 0 : 1), 0);
        if (significantChildren == 1) {
            for (let i = this._messages.length - 1; i >= startIndex; i--) {
                const ast = this._messages[i].nodes;
                if (!(ast.length == 1 && ast[0] instanceof i18n.Text)) {
                    this._messages.splice(i, 1);
                    break;
                }
            }
        }
        this._msgCountAtSectionStart = void 0;
    }
    _reportError(node, msg) {
        this._errors.push(new I18nError(node.sourceSpan, msg));
    }
}
function _isOpeningComment(n) {
    return n instanceof html.Comment && n.value && n.value.startsWith('i18n');
}
function _isClosingComment(n) {
    return n instanceof html.Comment && n.value && n.value === '/i18n';
}
function _getI18nAttr(p) {
    return p.attrs.find(attr => attr.name === _I18N_ATTR) || null;
}
function _splitMeaningAndDesc(i18n) {
    if (!i18n)
        return ['', ''];
    const pipeIndex = i18n.indexOf('|');
    return pipeIndex == -1 ? ['', i18n] : [i18n.slice(0, pipeIndex), i18n.slice(pipeIndex + 1)];
}
//# sourceMappingURL=extractor_merger.js.map