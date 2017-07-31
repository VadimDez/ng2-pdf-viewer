/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HtmlParser } from '../ml_parser/html_parser';
import { I18nError } from './parse_util';
/**
 * A container for translated messages
 */
export var TranslationBundle = (function () {
    /**
     * @param {?=} _i18nNodesByMsgId
     * @param {?} digest
     * @param {?=} mapperFactory
     */
    function TranslationBundle(_i18nNodesByMsgId, digest, mapperFactory) {
        if (_i18nNodesByMsgId === void 0) { _i18nNodesByMsgId = {}; }
        this._i18nNodesByMsgId = _i18nNodesByMsgId;
        this.digest = digest;
        this.mapperFactory = mapperFactory;
        this._i18nToHtml = new I18nToHtmlVisitor(_i18nNodesByMsgId, digest, mapperFactory);
    }
    /**
     * @param {?} content
     * @param {?} url
     * @param {?} serializer
     * @return {?}
     */
    TranslationBundle.load = function (content, url, serializer) {
        var /** @type {?} */ i18nNodesByMsgId = serializer.load(content, url);
        var /** @type {?} */ digestFn = function (m) { return serializer.digest(m); };
        var /** @type {?} */ mapperFactory = function (m) { return serializer.createNameMapper(m); };
        return new TranslationBundle(i18nNodesByMsgId, digestFn, mapperFactory);
    };
    /**
     * @param {?} srcMsg
     * @return {?}
     */
    TranslationBundle.prototype.get = function (srcMsg) {
        var /** @type {?} */ html = this._i18nToHtml.convert(srcMsg);
        if (html.errors.length) {
            throw new Error(html.errors.join('\n'));
        }
        return html.nodes;
    };
    /**
     * @param {?} srcMsg
     * @return {?}
     */
    TranslationBundle.prototype.has = function (srcMsg) { return this.digest(srcMsg) in this._i18nNodesByMsgId; };
    return TranslationBundle;
}());
function TranslationBundle_tsickle_Closure_declarations() {
    /** @type {?} */
    TranslationBundle.prototype._i18nToHtml;
    /** @type {?} */
    TranslationBundle.prototype._i18nNodesByMsgId;
    /** @type {?} */
    TranslationBundle.prototype.digest;
    /** @type {?} */
    TranslationBundle.prototype.mapperFactory;
}
var I18nToHtmlVisitor = (function () {
    /**
     * @param {?=} _i18nNodesByMsgId
     * @param {?} _digest
     * @param {?} _mapperFactory
     */
    function I18nToHtmlVisitor(_i18nNodesByMsgId, _digest, _mapperFactory) {
        if (_i18nNodesByMsgId === void 0) { _i18nNodesByMsgId = {}; }
        this._i18nNodesByMsgId = _i18nNodesByMsgId;
        this._digest = _digest;
        this._mapperFactory = _mapperFactory;
        this._contextStack = [];
        this._errors = [];
    }
    /**
     * @param {?} srcMsg
     * @return {?}
     */
    I18nToHtmlVisitor.prototype.convert = function (srcMsg) {
        this._contextStack.length = 0;
        this._errors.length = 0;
        // i18n to text
        var /** @type {?} */ text = this._convertToText(srcMsg);
        // text to html
        var /** @type {?} */ url = srcMsg.nodes[0].sourceSpan.start.file.url;
        var /** @type {?} */ html = new HtmlParser().parse(text, url, true);
        return {
            nodes: html.rootNodes,
            errors: this._errors.concat(html.errors),
        };
    };
    /**
     * @param {?} text
     * @param {?=} context
     * @return {?}
     */
    I18nToHtmlVisitor.prototype.visitText = function (text, context) { return text.value; };
    /**
     * @param {?} container
     * @param {?=} context
     * @return {?}
     */
    I18nToHtmlVisitor.prototype.visitContainer = function (container, context) {
        var _this = this;
        return container.children.map(function (n) { return n.visit(_this); }).join('');
    };
    /**
     * @param {?} icu
     * @param {?=} context
     * @return {?}
     */
    I18nToHtmlVisitor.prototype.visitIcu = function (icu, context) {
        var _this = this;
        var /** @type {?} */ cases = Object.keys(icu.cases).map(function (k) { return (k + " {" + icu.cases[k].visit(_this) + "}"); });
        // TODO(vicb): Once all format switch to using expression placeholders
        // we should throw when the placeholder is not in the source message
        var /** @type {?} */ exp = this._srcMsg.placeholders.hasOwnProperty(icu.expression) ?
            this._srcMsg.placeholders[icu.expression] :
            icu.expression;
        return "{" + exp + ", " + icu.type + ", " + cases.join(' ') + "}";
    };
    /**
     * @param {?} ph
     * @param {?=} context
     * @return {?}
     */
    I18nToHtmlVisitor.prototype.visitPlaceholder = function (ph, context) {
        var /** @type {?} */ phName = this._mapper(ph.name);
        if (this._srcMsg.placeholders.hasOwnProperty(phName)) {
            return this._srcMsg.placeholders[phName];
        }
        if (this._srcMsg.placeholderToMessage.hasOwnProperty(phName)) {
            return this._convertToText(this._srcMsg.placeholderToMessage[phName]);
        }
        this._addError(ph, "Unknown placeholder");
        return '';
    };
    /**
     * @param {?} ph
     * @param {?=} context
     * @return {?}
     */
    I18nToHtmlVisitor.prototype.visitTagPlaceholder = function (ph, context) { throw 'unreachable code'; };
    /**
     * @param {?} ph
     * @param {?=} context
     * @return {?}
     */
    I18nToHtmlVisitor.prototype.visitIcuPlaceholder = function (ph, context) { throw 'unreachable code'; };
    /**
     * Convert a source message to a translated text string:
     * - text nodes are replaced with their translation,
     * - placeholders are replaced with their content,
     * - ICU nodes are converted to ICU expressions.
     * @param {?} srcMsg
     * @return {?}
     */
    I18nToHtmlVisitor.prototype._convertToText = function (srcMsg) {
        var _this = this;
        var /** @type {?} */ digest = this._digest(srcMsg);
        var /** @type {?} */ mapper = this._mapperFactory ? this._mapperFactory(srcMsg) : null;
        if (this._i18nNodesByMsgId.hasOwnProperty(digest)) {
            this._contextStack.push({ msg: this._srcMsg, mapper: this._mapper });
            this._srcMsg = srcMsg;
            this._mapper = function (name) { return mapper ? mapper.toInternalName(name) : name; };
            var /** @type {?} */ nodes = this._i18nNodesByMsgId[digest];
            var /** @type {?} */ text = nodes.map(function (node) { return node.visit(_this); }).join('');
            var /** @type {?} */ context = this._contextStack.pop();
            this._srcMsg = context.msg;
            this._mapper = context.mapper;
            return text;
        }
        this._addError(srcMsg.nodes[0], "Missing translation for message " + digest);
        return '';
    };
    /**
     * @param {?} el
     * @param {?} msg
     * @return {?}
     */
    I18nToHtmlVisitor.prototype._addError = function (el, msg) {
        this._errors.push(new I18nError(el.sourceSpan, msg));
    };
    return I18nToHtmlVisitor;
}());
function I18nToHtmlVisitor_tsickle_Closure_declarations() {
    /** @type {?} */
    I18nToHtmlVisitor.prototype._srcMsg;
    /** @type {?} */
    I18nToHtmlVisitor.prototype._contextStack;
    /** @type {?} */
    I18nToHtmlVisitor.prototype._errors;
    /** @type {?} */
    I18nToHtmlVisitor.prototype._mapper;
    /** @type {?} */
    I18nToHtmlVisitor.prototype._i18nNodesByMsgId;
    /** @type {?} */
    I18nToHtmlVisitor.prototype._digest;
    /** @type {?} */
    I18nToHtmlVisitor.prototype._mapperFactory;
}
//# sourceMappingURL=translation_bundle.js.map