"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('./facade/collection');
var lang_1 = require('./facade/lang');
var html_tags_1 = require('./html_tags');
var parse_util_1 = require('./parse_util');
(function (HtmlTokenType) {
    HtmlTokenType[HtmlTokenType["TAG_OPEN_START"] = 0] = "TAG_OPEN_START";
    HtmlTokenType[HtmlTokenType["TAG_OPEN_END"] = 1] = "TAG_OPEN_END";
    HtmlTokenType[HtmlTokenType["TAG_OPEN_END_VOID"] = 2] = "TAG_OPEN_END_VOID";
    HtmlTokenType[HtmlTokenType["TAG_CLOSE"] = 3] = "TAG_CLOSE";
    HtmlTokenType[HtmlTokenType["TEXT"] = 4] = "TEXT";
    HtmlTokenType[HtmlTokenType["ESCAPABLE_RAW_TEXT"] = 5] = "ESCAPABLE_RAW_TEXT";
    HtmlTokenType[HtmlTokenType["RAW_TEXT"] = 6] = "RAW_TEXT";
    HtmlTokenType[HtmlTokenType["COMMENT_START"] = 7] = "COMMENT_START";
    HtmlTokenType[HtmlTokenType["COMMENT_END"] = 8] = "COMMENT_END";
    HtmlTokenType[HtmlTokenType["CDATA_START"] = 9] = "CDATA_START";
    HtmlTokenType[HtmlTokenType["CDATA_END"] = 10] = "CDATA_END";
    HtmlTokenType[HtmlTokenType["ATTR_NAME"] = 11] = "ATTR_NAME";
    HtmlTokenType[HtmlTokenType["ATTR_VALUE"] = 12] = "ATTR_VALUE";
    HtmlTokenType[HtmlTokenType["DOC_TYPE"] = 13] = "DOC_TYPE";
    HtmlTokenType[HtmlTokenType["EXPANSION_FORM_START"] = 14] = "EXPANSION_FORM_START";
    HtmlTokenType[HtmlTokenType["EXPANSION_CASE_VALUE"] = 15] = "EXPANSION_CASE_VALUE";
    HtmlTokenType[HtmlTokenType["EXPANSION_CASE_EXP_START"] = 16] = "EXPANSION_CASE_EXP_START";
    HtmlTokenType[HtmlTokenType["EXPANSION_CASE_EXP_END"] = 17] = "EXPANSION_CASE_EXP_END";
    HtmlTokenType[HtmlTokenType["EXPANSION_FORM_END"] = 18] = "EXPANSION_FORM_END";
    HtmlTokenType[HtmlTokenType["EOF"] = 19] = "EOF";
})(exports.HtmlTokenType || (exports.HtmlTokenType = {}));
var HtmlTokenType = exports.HtmlTokenType;
var HtmlToken = (function () {
    function HtmlToken(type, parts, sourceSpan) {
        this.type = type;
        this.parts = parts;
        this.sourceSpan = sourceSpan;
    }
    return HtmlToken;
}());
exports.HtmlToken = HtmlToken;
var HtmlTokenError = (function (_super) {
    __extends(HtmlTokenError, _super);
    function HtmlTokenError(errorMsg, tokenType, span) {
        _super.call(this, span, errorMsg);
        this.tokenType = tokenType;
    }
    return HtmlTokenError;
}(parse_util_1.ParseError));
exports.HtmlTokenError = HtmlTokenError;
var HtmlTokenizeResult = (function () {
    function HtmlTokenizeResult(tokens, errors) {
        this.tokens = tokens;
        this.errors = errors;
    }
    return HtmlTokenizeResult;
}());
exports.HtmlTokenizeResult = HtmlTokenizeResult;
function tokenizeHtml(sourceContent, sourceUrl, tokenizeExpansionForms) {
    if (tokenizeExpansionForms === void 0) { tokenizeExpansionForms = false; }
    return new _HtmlTokenizer(new parse_util_1.ParseSourceFile(sourceContent, sourceUrl), tokenizeExpansionForms)
        .tokenize();
}
exports.tokenizeHtml = tokenizeHtml;
var $EOF = 0;
var $TAB = 9;
var $LF = 10;
var $FF = 12;
var $CR = 13;
var $SPACE = 32;
var $BANG = 33;
var $DQ = 34;
var $HASH = 35;
var $$ = 36;
var $AMPERSAND = 38;
var $SQ = 39;
var $MINUS = 45;
var $SLASH = 47;
var $0 = 48;
var $SEMICOLON = 59;
var $9 = 57;
var $COLON = 58;
var $LT = 60;
var $EQ = 61;
var $GT = 62;
var $QUESTION = 63;
var $LBRACKET = 91;
var $RBRACKET = 93;
var $LBRACE = 123;
var $RBRACE = 125;
var $COMMA = 44;
var $A = 65;
var $F = 70;
var $X = 88;
var $Z = 90;
var $a = 97;
var $f = 102;
var $z = 122;
var $x = 120;
var $NBSP = 160;
var CR_OR_CRLF_REGEXP = /\r\n?/g;
function unexpectedCharacterErrorMsg(charCode) {
    var char = charCode === $EOF ? 'EOF' : lang_1.StringWrapper.fromCharCode(charCode);
    return "Unexpected character \"" + char + "\"";
}
function unknownEntityErrorMsg(entitySrc) {
    return "Unknown entity \"" + entitySrc + "\" - use the \"&#<decimal>;\" or  \"&#x<hex>;\" syntax";
}
var ControlFlowError = (function () {
    function ControlFlowError(error) {
        this.error = error;
    }
    return ControlFlowError;
}());
// See http://www.w3.org/TR/html51/syntax.html#writing
var _HtmlTokenizer = (function () {
    function _HtmlTokenizer(file, tokenizeExpansionForms) {
        this.file = file;
        this.tokenizeExpansionForms = tokenizeExpansionForms;
        // Note: this is always lowercase!
        this._peek = -1;
        this._nextPeek = -1;
        this._index = -1;
        this._line = 0;
        this._column = -1;
        this._expansionCaseStack = [];
        this.tokens = [];
        this.errors = [];
        this._input = file.content;
        this._length = file.content.length;
        this._advance();
    }
    _HtmlTokenizer.prototype._processCarriageReturns = function (content) {
        // http://www.w3.org/TR/html5/syntax.html#preprocessing-the-input-stream
        // In order to keep the original position in the source, we can not
        // pre-process it.
        // Instead CRs are processed right before instantiating the tokens.
        return lang_1.StringWrapper.replaceAll(content, CR_OR_CRLF_REGEXP, '\n');
    };
    _HtmlTokenizer.prototype.tokenize = function () {
        while (this._peek !== $EOF) {
            var start = this._getLocation();
            try {
                if (this._attemptCharCode($LT)) {
                    if (this._attemptCharCode($BANG)) {
                        if (this._attemptCharCode($LBRACKET)) {
                            this._consumeCdata(start);
                        }
                        else if (this._attemptCharCode($MINUS)) {
                            this._consumeComment(start);
                        }
                        else {
                            this._consumeDocType(start);
                        }
                    }
                    else if (this._attemptCharCode($SLASH)) {
                        this._consumeTagClose(start);
                    }
                    else {
                        this._consumeTagOpen(start);
                    }
                }
                else if (isExpansionFormStart(this._peek, this._nextPeek) && this.tokenizeExpansionForms) {
                    this._consumeExpansionFormStart();
                }
                else if (isExpansionCaseStart(this._peek) && this._isInExpansionForm() &&
                    this.tokenizeExpansionForms) {
                    this._consumeExpansionCaseStart();
                }
                else if (this._peek === $RBRACE && this._isInExpansionCase() && this.tokenizeExpansionForms) {
                    this._consumeExpansionCaseEnd();
                }
                else if (this._peek === $RBRACE && this._isInExpansionForm() && this.tokenizeExpansionForms) {
                    this._consumeExpansionFormEnd();
                }
                else {
                    this._consumeText();
                }
            }
            catch (e) {
                if (e instanceof ControlFlowError) {
                    this.errors.push(e.error);
                }
                else {
                    throw e;
                }
            }
        }
        this._beginToken(HtmlTokenType.EOF);
        this._endToken([]);
        return new HtmlTokenizeResult(mergeTextTokens(this.tokens), this.errors);
    };
    _HtmlTokenizer.prototype._getLocation = function () {
        return new parse_util_1.ParseLocation(this.file, this._index, this._line, this._column);
    };
    _HtmlTokenizer.prototype._getSpan = function (start, end) {
        if (lang_1.isBlank(start)) {
            start = this._getLocation();
        }
        if (lang_1.isBlank(end)) {
            end = this._getLocation();
        }
        return new parse_util_1.ParseSourceSpan(start, end);
    };
    _HtmlTokenizer.prototype._beginToken = function (type, start) {
        if (start === void 0) { start = null; }
        if (lang_1.isBlank(start)) {
            start = this._getLocation();
        }
        this._currentTokenStart = start;
        this._currentTokenType = type;
    };
    _HtmlTokenizer.prototype._endToken = function (parts, end) {
        if (end === void 0) { end = null; }
        if (lang_1.isBlank(end)) {
            end = this._getLocation();
        }
        var token = new HtmlToken(this._currentTokenType, parts, new parse_util_1.ParseSourceSpan(this._currentTokenStart, end));
        this.tokens.push(token);
        this._currentTokenStart = null;
        this._currentTokenType = null;
        return token;
    };
    _HtmlTokenizer.prototype._createError = function (msg, span) {
        var error = new HtmlTokenError(msg, this._currentTokenType, span);
        this._currentTokenStart = null;
        this._currentTokenType = null;
        return new ControlFlowError(error);
    };
    _HtmlTokenizer.prototype._advance = function () {
        if (this._index >= this._length) {
            throw this._createError(unexpectedCharacterErrorMsg($EOF), this._getSpan());
        }
        if (this._peek === $LF) {
            this._line++;
            this._column = 0;
        }
        else if (this._peek !== $LF && this._peek !== $CR) {
            this._column++;
        }
        this._index++;
        this._peek =
            this._index >= this._length ? $EOF : lang_1.StringWrapper.charCodeAt(this._input, this._index);
        this._nextPeek = this._index + 1 >= this._length ?
            $EOF :
            lang_1.StringWrapper.charCodeAt(this._input, this._index + 1);
    };
    _HtmlTokenizer.prototype._attemptCharCode = function (charCode) {
        if (this._peek === charCode) {
            this._advance();
            return true;
        }
        return false;
    };
    _HtmlTokenizer.prototype._attemptCharCodeCaseInsensitive = function (charCode) {
        if (compareCharCodeCaseInsensitive(this._peek, charCode)) {
            this._advance();
            return true;
        }
        return false;
    };
    _HtmlTokenizer.prototype._requireCharCode = function (charCode) {
        var location = this._getLocation();
        if (!this._attemptCharCode(charCode)) {
            throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan(location, location));
        }
    };
    _HtmlTokenizer.prototype._attemptStr = function (chars) {
        var indexBeforeAttempt = this._index;
        var columnBeforeAttempt = this._column;
        var lineBeforeAttempt = this._line;
        for (var i = 0; i < chars.length; i++) {
            if (!this._attemptCharCode(lang_1.StringWrapper.charCodeAt(chars, i))) {
                // If attempting to parse the string fails, we want to reset the parser
                // to where it was before the attempt
                this._index = indexBeforeAttempt;
                this._column = columnBeforeAttempt;
                this._line = lineBeforeAttempt;
                return false;
            }
        }
        return true;
    };
    _HtmlTokenizer.prototype._attemptStrCaseInsensitive = function (chars) {
        for (var i = 0; i < chars.length; i++) {
            if (!this._attemptCharCodeCaseInsensitive(lang_1.StringWrapper.charCodeAt(chars, i))) {
                return false;
            }
        }
        return true;
    };
    _HtmlTokenizer.prototype._requireStr = function (chars) {
        var location = this._getLocation();
        if (!this._attemptStr(chars)) {
            throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan(location));
        }
    };
    _HtmlTokenizer.prototype._attemptCharCodeUntilFn = function (predicate) {
        while (!predicate(this._peek)) {
            this._advance();
        }
    };
    _HtmlTokenizer.prototype._requireCharCodeUntilFn = function (predicate, len) {
        var start = this._getLocation();
        this._attemptCharCodeUntilFn(predicate);
        if (this._index - start.offset < len) {
            throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan(start, start));
        }
    };
    _HtmlTokenizer.prototype._attemptUntilChar = function (char) {
        while (this._peek !== char) {
            this._advance();
        }
    };
    _HtmlTokenizer.prototype._readChar = function (decodeEntities) {
        if (decodeEntities && this._peek === $AMPERSAND) {
            return this._decodeEntity();
        }
        else {
            var index = this._index;
            this._advance();
            return this._input[index];
        }
    };
    _HtmlTokenizer.prototype._decodeEntity = function () {
        var start = this._getLocation();
        this._advance();
        if (this._attemptCharCode($HASH)) {
            var isHex = this._attemptCharCode($x) || this._attemptCharCode($X);
            var numberStart = this._getLocation().offset;
            this._attemptCharCodeUntilFn(isDigitEntityEnd);
            if (this._peek != $SEMICOLON) {
                throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan());
            }
            this._advance();
            var strNum = this._input.substring(numberStart, this._index - 1);
            try {
                var charCode = lang_1.NumberWrapper.parseInt(strNum, isHex ? 16 : 10);
                return lang_1.StringWrapper.fromCharCode(charCode);
            }
            catch (e) {
                var entity = this._input.substring(start.offset + 1, this._index - 1);
                throw this._createError(unknownEntityErrorMsg(entity), this._getSpan(start));
            }
        }
        else {
            var startPosition = this._savePosition();
            this._attemptCharCodeUntilFn(isNamedEntityEnd);
            if (this._peek != $SEMICOLON) {
                this._restorePosition(startPosition);
                return '&';
            }
            this._advance();
            var name_1 = this._input.substring(start.offset + 1, this._index - 1);
            var char = html_tags_1.NAMED_ENTITIES[name_1];
            if (lang_1.isBlank(char)) {
                throw this._createError(unknownEntityErrorMsg(name_1), this._getSpan(start));
            }
            return char;
        }
    };
    _HtmlTokenizer.prototype._consumeRawText = function (decodeEntities, firstCharOfEnd, attemptEndRest) {
        var tagCloseStart;
        var textStart = this._getLocation();
        this._beginToken(decodeEntities ? HtmlTokenType.ESCAPABLE_RAW_TEXT : HtmlTokenType.RAW_TEXT, textStart);
        var parts = [];
        while (true) {
            tagCloseStart = this._getLocation();
            if (this._attemptCharCode(firstCharOfEnd) && attemptEndRest()) {
                break;
            }
            if (this._index > tagCloseStart.offset) {
                parts.push(this._input.substring(tagCloseStart.offset, this._index));
            }
            while (this._peek !== firstCharOfEnd) {
                parts.push(this._readChar(decodeEntities));
            }
        }
        return this._endToken([this._processCarriageReturns(parts.join(''))], tagCloseStart);
    };
    _HtmlTokenizer.prototype._consumeComment = function (start) {
        var _this = this;
        this._beginToken(HtmlTokenType.COMMENT_START, start);
        this._requireCharCode($MINUS);
        this._endToken([]);
        var textToken = this._consumeRawText(false, $MINUS, function () { return _this._attemptStr('->'); });
        this._beginToken(HtmlTokenType.COMMENT_END, textToken.sourceSpan.end);
        this._endToken([]);
    };
    _HtmlTokenizer.prototype._consumeCdata = function (start) {
        var _this = this;
        this._beginToken(HtmlTokenType.CDATA_START, start);
        this._requireStr('CDATA[');
        this._endToken([]);
        var textToken = this._consumeRawText(false, $RBRACKET, function () { return _this._attemptStr(']>'); });
        this._beginToken(HtmlTokenType.CDATA_END, textToken.sourceSpan.end);
        this._endToken([]);
    };
    _HtmlTokenizer.prototype._consumeDocType = function (start) {
        this._beginToken(HtmlTokenType.DOC_TYPE, start);
        this._attemptUntilChar($GT);
        this._advance();
        this._endToken([this._input.substring(start.offset + 2, this._index - 1)]);
    };
    _HtmlTokenizer.prototype._consumePrefixAndName = function () {
        var nameOrPrefixStart = this._index;
        var prefix = null;
        while (this._peek !== $COLON && !isPrefixEnd(this._peek)) {
            this._advance();
        }
        var nameStart;
        if (this._peek === $COLON) {
            this._advance();
            prefix = this._input.substring(nameOrPrefixStart, this._index - 1);
            nameStart = this._index;
        }
        else {
            nameStart = nameOrPrefixStart;
        }
        this._requireCharCodeUntilFn(isNameEnd, this._index === nameStart ? 1 : 0);
        var name = this._input.substring(nameStart, this._index);
        return [prefix, name];
    };
    _HtmlTokenizer.prototype._consumeTagOpen = function (start) {
        var savedPos = this._savePosition();
        var lowercaseTagName;
        try {
            if (!isAsciiLetter(this._peek)) {
                throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan());
            }
            var nameStart = this._index;
            this._consumeTagOpenStart(start);
            lowercaseTagName = this._input.substring(nameStart, this._index).toLowerCase();
            this._attemptCharCodeUntilFn(isNotWhitespace);
            while (this._peek !== $SLASH && this._peek !== $GT) {
                this._consumeAttributeName();
                this._attemptCharCodeUntilFn(isNotWhitespace);
                if (this._attemptCharCode($EQ)) {
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this._consumeAttributeValue();
                }
                this._attemptCharCodeUntilFn(isNotWhitespace);
            }
            this._consumeTagOpenEnd();
        }
        catch (e) {
            if (e instanceof ControlFlowError) {
                // When the start tag is invalid, assume we want a "<"
                this._restorePosition(savedPos);
                // Back to back text tokens are merged at the end
                this._beginToken(HtmlTokenType.TEXT, start);
                this._endToken(['<']);
                return;
            }
            throw e;
        }
        var contentTokenType = html_tags_1.getHtmlTagDefinition(lowercaseTagName).contentType;
        if (contentTokenType === html_tags_1.HtmlTagContentType.RAW_TEXT) {
            this._consumeRawTextWithTagClose(lowercaseTagName, false);
        }
        else if (contentTokenType === html_tags_1.HtmlTagContentType.ESCAPABLE_RAW_TEXT) {
            this._consumeRawTextWithTagClose(lowercaseTagName, true);
        }
    };
    _HtmlTokenizer.prototype._consumeRawTextWithTagClose = function (lowercaseTagName, decodeEntities) {
        var _this = this;
        var textToken = this._consumeRawText(decodeEntities, $LT, function () {
            if (!_this._attemptCharCode($SLASH))
                return false;
            _this._attemptCharCodeUntilFn(isNotWhitespace);
            if (!_this._attemptStrCaseInsensitive(lowercaseTagName))
                return false;
            _this._attemptCharCodeUntilFn(isNotWhitespace);
            if (!_this._attemptCharCode($GT))
                return false;
            return true;
        });
        this._beginToken(HtmlTokenType.TAG_CLOSE, textToken.sourceSpan.end);
        this._endToken([null, lowercaseTagName]);
    };
    _HtmlTokenizer.prototype._consumeTagOpenStart = function (start) {
        this._beginToken(HtmlTokenType.TAG_OPEN_START, start);
        var parts = this._consumePrefixAndName();
        this._endToken(parts);
    };
    _HtmlTokenizer.prototype._consumeAttributeName = function () {
        this._beginToken(HtmlTokenType.ATTR_NAME);
        var prefixAndName = this._consumePrefixAndName();
        this._endToken(prefixAndName);
    };
    _HtmlTokenizer.prototype._consumeAttributeValue = function () {
        this._beginToken(HtmlTokenType.ATTR_VALUE);
        var value;
        if (this._peek === $SQ || this._peek === $DQ) {
            var quoteChar = this._peek;
            this._advance();
            var parts = [];
            while (this._peek !== quoteChar) {
                parts.push(this._readChar(true));
            }
            value = parts.join('');
            this._advance();
        }
        else {
            var valueStart = this._index;
            this._requireCharCodeUntilFn(isNameEnd, 1);
            value = this._input.substring(valueStart, this._index);
        }
        this._endToken([this._processCarriageReturns(value)]);
    };
    _HtmlTokenizer.prototype._consumeTagOpenEnd = function () {
        var tokenType = this._attemptCharCode($SLASH) ? HtmlTokenType.TAG_OPEN_END_VOID :
            HtmlTokenType.TAG_OPEN_END;
        this._beginToken(tokenType);
        this._requireCharCode($GT);
        this._endToken([]);
    };
    _HtmlTokenizer.prototype._consumeTagClose = function (start) {
        this._beginToken(HtmlTokenType.TAG_CLOSE, start);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        var prefixAndName = this._consumePrefixAndName();
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._requireCharCode($GT);
        this._endToken(prefixAndName);
    };
    _HtmlTokenizer.prototype._consumeExpansionFormStart = function () {
        this._beginToken(HtmlTokenType.EXPANSION_FORM_START, this._getLocation());
        this._requireCharCode($LBRACE);
        this._endToken([]);
        this._beginToken(HtmlTokenType.RAW_TEXT, this._getLocation());
        var condition = this._readUntil($COMMA);
        this._endToken([condition], this._getLocation());
        this._requireCharCode($COMMA);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._beginToken(HtmlTokenType.RAW_TEXT, this._getLocation());
        var type = this._readUntil($COMMA);
        this._endToken([type], this._getLocation());
        this._requireCharCode($COMMA);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._expansionCaseStack.push(HtmlTokenType.EXPANSION_FORM_START);
    };
    _HtmlTokenizer.prototype._consumeExpansionCaseStart = function () {
        this._beginToken(HtmlTokenType.EXPANSION_CASE_VALUE, this._getLocation());
        var value = this._readUntil($LBRACE).trim();
        this._endToken([value], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._beginToken(HtmlTokenType.EXPANSION_CASE_EXP_START, this._getLocation());
        this._requireCharCode($LBRACE);
        this._endToken([], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._expansionCaseStack.push(HtmlTokenType.EXPANSION_CASE_EXP_START);
    };
    _HtmlTokenizer.prototype._consumeExpansionCaseEnd = function () {
        this._beginToken(HtmlTokenType.EXPANSION_CASE_EXP_END, this._getLocation());
        this._requireCharCode($RBRACE);
        this._endToken([], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._expansionCaseStack.pop();
    };
    _HtmlTokenizer.prototype._consumeExpansionFormEnd = function () {
        this._beginToken(HtmlTokenType.EXPANSION_FORM_END, this._getLocation());
        this._requireCharCode($RBRACE);
        this._endToken([]);
        this._expansionCaseStack.pop();
    };
    _HtmlTokenizer.prototype._consumeText = function () {
        var start = this._getLocation();
        this._beginToken(HtmlTokenType.TEXT, start);
        var parts = [];
        var interpolation = false;
        if (this._peek === $LBRACE && this._nextPeek === $LBRACE) {
            parts.push(this._readChar(true));
            parts.push(this._readChar(true));
            interpolation = true;
        }
        else {
            parts.push(this._readChar(true));
        }
        while (!this._isTextEnd(interpolation)) {
            if (this._peek === $LBRACE && this._nextPeek === $LBRACE) {
                parts.push(this._readChar(true));
                parts.push(this._readChar(true));
                interpolation = true;
            }
            else if (this._peek === $RBRACE && this._nextPeek === $RBRACE && interpolation) {
                parts.push(this._readChar(true));
                parts.push(this._readChar(true));
                interpolation = false;
            }
            else {
                parts.push(this._readChar(true));
            }
        }
        this._endToken([this._processCarriageReturns(parts.join(''))]);
    };
    _HtmlTokenizer.prototype._isTextEnd = function (interpolation) {
        if (this._peek === $LT || this._peek === $EOF)
            return true;
        if (this.tokenizeExpansionForms) {
            if (isExpansionFormStart(this._peek, this._nextPeek))
                return true;
            if (this._peek === $RBRACE && !interpolation &&
                (this._isInExpansionCase() || this._isInExpansionForm()))
                return true;
        }
        return false;
    };
    _HtmlTokenizer.prototype._savePosition = function () {
        return [this._peek, this._index, this._column, this._line, this.tokens.length];
    };
    _HtmlTokenizer.prototype._readUntil = function (char) {
        var start = this._index;
        this._attemptUntilChar(char);
        return this._input.substring(start, this._index);
    };
    _HtmlTokenizer.prototype._restorePosition = function (position) {
        this._peek = position[0];
        this._index = position[1];
        this._column = position[2];
        this._line = position[3];
        var nbTokens = position[4];
        if (nbTokens < this.tokens.length) {
            // remove any extra tokens
            this.tokens = collection_1.ListWrapper.slice(this.tokens, 0, nbTokens);
        }
    };
    _HtmlTokenizer.prototype._isInExpansionCase = function () {
        return this._expansionCaseStack.length > 0 &&
            this._expansionCaseStack[this._expansionCaseStack.length - 1] ===
                HtmlTokenType.EXPANSION_CASE_EXP_START;
    };
    _HtmlTokenizer.prototype._isInExpansionForm = function () {
        return this._expansionCaseStack.length > 0 &&
            this._expansionCaseStack[this._expansionCaseStack.length - 1] ===
                HtmlTokenType.EXPANSION_FORM_START;
    };
    return _HtmlTokenizer;
}());
function isNotWhitespace(code) {
    return !isWhitespace(code) || code === $EOF;
}
function isWhitespace(code) {
    return (code >= $TAB && code <= $SPACE) || (code === $NBSP);
}
function isNameEnd(code) {
    return isWhitespace(code) || code === $GT || code === $SLASH || code === $SQ || code === $DQ ||
        code === $EQ;
}
function isPrefixEnd(code) {
    return (code < $a || $z < code) && (code < $A || $Z < code) && (code < $0 || code > $9);
}
function isDigitEntityEnd(code) {
    return code == $SEMICOLON || code == $EOF || !isAsciiHexDigit(code);
}
function isNamedEntityEnd(code) {
    return code == $SEMICOLON || code == $EOF || !isAsciiLetter(code);
}
function isExpansionFormStart(peek, nextPeek) {
    return peek === $LBRACE && nextPeek != $LBRACE;
}
function isExpansionCaseStart(peek) {
    return peek === $EQ || isAsciiLetter(peek);
}
function isAsciiLetter(code) {
    return code >= $a && code <= $z || code >= $A && code <= $Z;
}
function isAsciiHexDigit(code) {
    return code >= $a && code <= $f || code >= $A && code <= $F || code >= $0 && code <= $9;
}
function compareCharCodeCaseInsensitive(code1, code2) {
    return toUpperCaseCharCode(code1) == toUpperCaseCharCode(code2);
}
function toUpperCaseCharCode(code) {
    return code >= $a && code <= $z ? code - $a + $A : code;
}
function mergeTextTokens(srcTokens) {
    var dstTokens = [];
    var lastDstToken;
    for (var i = 0; i < srcTokens.length; i++) {
        var token = srcTokens[i];
        if (lang_1.isPresent(lastDstToken) && lastDstToken.type == HtmlTokenType.TEXT &&
            token.type == HtmlTokenType.TEXT) {
            lastDstToken.parts[0] += token.parts[0];
            lastDstToken.sourceSpan.end = token.sourceSpan.end;
        }
        else {
            lastDstToken = token;
            dstTokens.push(lastDstToken);
        }
    }
    return dstTokens;
}
//# sourceMappingURL=html_lexer.js.map