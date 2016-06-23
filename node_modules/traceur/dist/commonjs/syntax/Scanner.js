"use strict";
var $__IdentifierToken_46_js__,
    $__JsxIdentifierToken_46_js__,
    $__KeywordToken_46_js__,
    $__LiteralToken_46_js__,
    $___46__46__47_util_47_SourceRange_46_js__,
    $__Token_46_js__,
    $__Keywords_46_js__,
    $__unicode_45_tables_46_js__,
    $__TokenType_46_js__;
var IdentifierToken = ($__IdentifierToken_46_js__ = require("./IdentifierToken.js"), $__IdentifierToken_46_js__ && $__IdentifierToken_46_js__.__esModule && $__IdentifierToken_46_js__ || {default: $__IdentifierToken_46_js__}).IdentifierToken;
var JsxIdentifierToken = ($__JsxIdentifierToken_46_js__ = require("./JsxIdentifierToken.js"), $__JsxIdentifierToken_46_js__ && $__JsxIdentifierToken_46_js__.__esModule && $__JsxIdentifierToken_46_js__ || {default: $__JsxIdentifierToken_46_js__}).JsxIdentifierToken;
var KeywordToken = ($__KeywordToken_46_js__ = require("./KeywordToken.js"), $__KeywordToken_46_js__ && $__KeywordToken_46_js__.__esModule && $__KeywordToken_46_js__ || {default: $__KeywordToken_46_js__}).KeywordToken;
var LiteralToken = ($__LiteralToken_46_js__ = require("./LiteralToken.js"), $__LiteralToken_46_js__ && $__LiteralToken_46_js__.__esModule && $__LiteralToken_46_js__ || {default: $__LiteralToken_46_js__}).LiteralToken;
var SourceRange = ($___46__46__47_util_47_SourceRange_46_js__ = require("../util/SourceRange.js"), $___46__46__47_util_47_SourceRange_46_js__ && $___46__46__47_util_47_SourceRange_46_js__.__esModule && $___46__46__47_util_47_SourceRange_46_js__ || {default: $___46__46__47_util_47_SourceRange_46_js__}).SourceRange;
var Token = ($__Token_46_js__ = require("./Token.js"), $__Token_46_js__ && $__Token_46_js__.__esModule && $__Token_46_js__ || {default: $__Token_46_js__}).Token;
var getKeywordType = ($__Keywords_46_js__ = require("./Keywords.js"), $__Keywords_46_js__ && $__Keywords_46_js__.__esModule && $__Keywords_46_js__ || {default: $__Keywords_46_js__}).getKeywordType;
var $__7 = ($__unicode_45_tables_46_js__ = require("./unicode-tables.js"), $__unicode_45_tables_46_js__ && $__unicode_45_tables_46_js__.__esModule && $__unicode_45_tables_46_js__ || {default: $__unicode_45_tables_46_js__}),
    idContinueTable = $__7.idContinueTable,
    idStartTable = $__7.idStartTable;
var $__8 = ($__TokenType_46_js__ = require("./TokenType.js"), $__TokenType_46_js__ && $__TokenType_46_js__.__esModule && $__TokenType_46_js__ || {default: $__TokenType_46_js__}),
    AMPERSAND = $__8.AMPERSAND,
    AMPERSAND_EQUAL = $__8.AMPERSAND_EQUAL,
    AND = $__8.AND,
    ARROW = $__8.ARROW,
    AT = $__8.AT,
    BANG = $__8.BANG,
    BAR = $__8.BAR,
    BAR_EQUAL = $__8.BAR_EQUAL,
    CARET = $__8.CARET,
    CARET_EQUAL = $__8.CARET_EQUAL,
    CLOSE_ANGLE = $__8.CLOSE_ANGLE,
    CLOSE_CURLY = $__8.CLOSE_CURLY,
    CLOSE_PAREN = $__8.CLOSE_PAREN,
    CLOSE_SQUARE = $__8.CLOSE_SQUARE,
    COLON = $__8.COLON,
    COMMA = $__8.COMMA,
    DOT_DOT_DOT = $__8.DOT_DOT_DOT,
    END_OF_FILE = $__8.END_OF_FILE,
    EQUAL = $__8.EQUAL,
    EQUAL_EQUAL = $__8.EQUAL_EQUAL,
    EQUAL_EQUAL_EQUAL = $__8.EQUAL_EQUAL_EQUAL,
    ERROR = $__8.ERROR,
    GREATER_EQUAL = $__8.GREATER_EQUAL,
    LEFT_SHIFT = $__8.LEFT_SHIFT,
    LEFT_SHIFT_EQUAL = $__8.LEFT_SHIFT_EQUAL,
    LESS_EQUAL = $__8.LESS_EQUAL,
    MINUS = $__8.MINUS,
    MINUS_EQUAL = $__8.MINUS_EQUAL,
    MINUS_MINUS = $__8.MINUS_MINUS,
    NO_SUBSTITUTION_TEMPLATE = $__8.NO_SUBSTITUTION_TEMPLATE,
    NOT_EQUAL = $__8.NOT_EQUAL,
    NOT_EQUAL_EQUAL = $__8.NOT_EQUAL_EQUAL,
    NUMBER = $__8.NUMBER,
    OPEN_ANGLE = $__8.OPEN_ANGLE,
    OPEN_CURLY = $__8.OPEN_CURLY,
    OPEN_PAREN = $__8.OPEN_PAREN,
    OPEN_SQUARE = $__8.OPEN_SQUARE,
    OR = $__8.OR,
    PERCENT = $__8.PERCENT,
    PERCENT_EQUAL = $__8.PERCENT_EQUAL,
    PERIOD = $__8.PERIOD,
    PLUS = $__8.PLUS,
    PLUS_EQUAL = $__8.PLUS_EQUAL,
    PLUS_PLUS = $__8.PLUS_PLUS,
    QUESTION = $__8.QUESTION,
    REGULAR_EXPRESSION = $__8.REGULAR_EXPRESSION,
    RIGHT_SHIFT = $__8.RIGHT_SHIFT,
    RIGHT_SHIFT_EQUAL = $__8.RIGHT_SHIFT_EQUAL,
    SEMI_COLON = $__8.SEMI_COLON,
    SLASH = $__8.SLASH,
    SLASH_EQUAL = $__8.SLASH_EQUAL,
    STAR = $__8.STAR,
    STAR_EQUAL = $__8.STAR_EQUAL,
    STAR_STAR = $__8.STAR_STAR,
    STAR_STAR_EQUAL = $__8.STAR_STAR_EQUAL,
    STRING = $__8.STRING,
    TEMPLATE_HEAD = $__8.TEMPLATE_HEAD,
    TEMPLATE_MIDDLE = $__8.TEMPLATE_MIDDLE,
    TEMPLATE_TAIL = $__8.TEMPLATE_TAIL,
    TILDE = $__8.TILDE,
    UNSIGNED_RIGHT_SHIFT = $__8.UNSIGNED_RIGHT_SHIFT,
    UNSIGNED_RIGHT_SHIFT_EQUAL = $__8.UNSIGNED_RIGHT_SHIFT_EQUAL;
var isWhitespaceArray = [];
for (var i = 0; i < 128; i++) {
  isWhitespaceArray[i] = i >= 9 && i <= 13 || i === 0x20;
}
function isWhitespace(code) {
  if (code < 128)
    return isWhitespaceArray[code];
  switch (code) {
    case 0xA0:
    case 0xFEFF:
    case 0x2028:
    case 0x2029:
      return true;
  }
  return false;
}
function isLineTerminator(code) {
  switch (code) {
    case 10:
    case 13:
    case 0x2028:
    case 0x2029:
      return true;
  }
  return false;
}
function isDecimalDigit(code) {
  return code >= 48 && code <= 57;
}
var isHexDigitArray = [];
for (var i$__11 = 0; i$__11 < 128; i$__11++) {
  isHexDigitArray[i$__11] = i$__11 >= 48 && i$__11 <= 57 || i$__11 >= 65 && i$__11 <= 70 || i$__11 >= 97 && i$__11 <= 102;
}
function isHexDigit(code) {
  return code < 128 && isHexDigitArray[code];
}
function isBinaryDigit(code) {
  return code === 48 || code === 49;
}
function isOctalDigit(code) {
  return code >= 48 && code <= 55;
}
var isIdentifierStartArray = [];
for (var i$__12 = 0; i$__12 < 128; i$__12++) {
  isIdentifierStartArray[i$__12] = i$__12 === 36 || i$__12 >= 65 && i$__12 <= 90 || i$__12 === 95 || i$__12 >= 97 && i$__12 <= 122;
}
function isIdentifierStart(code) {
  return code < 128 ? isIdentifierStartArray[code] : inTable(idStartTable, code);
}
var isIdentifierPartArray = [];
for (var i$__13 = 0; i$__13 < 128; i$__13++) {
  isIdentifierPartArray[i$__13] = isIdentifierStart(i$__13) || isDecimalDigit(i$__13);
}
function isIdentifierPart(code) {
  return code < 128 ? isIdentifierPartArray[code] : inTable(idStartTable, code) || inTable(idContinueTable, code) || code === 8204 || code === 8205;
}
function inTable(table, code) {
  for (var i = 0; i < table.length; ) {
    if (code < table[i++])
      return false;
    if (code <= table[i++])
      return true;
  }
  return false;
}
function isRegularExpressionChar(code) {
  switch (code) {
    case 47:
      return false;
    case 91:
    case 92:
      return true;
  }
  return !isLineTerminator(code);
}
function isRegularExpressionFirstChar(code) {
  return isRegularExpressionChar(code) && code !== 42;
}
var index,
    input,
    length,
    token,
    lastToken,
    lookaheadToken,
    currentCharCode,
    lineNumberTable,
    errorReporter,
    currentParser,
    options;
function init(reporter, file, parser, traceurOptions) {
  errorReporter = reporter;
  lineNumberTable = file.lineNumberTable;
  input = file.contents;
  length = file.contents.length;
  setIndex(0);
  currentParser = parser;
  options = traceurOptions;
}
function getLastToken() {
  return lastToken;
}
function nextRegularExpressionLiteralToken() {
  lastToken = nextRegularExpressionLiteralToken2();
  token = scanToken();
  return lastToken;
}
function nextTemplateLiteralToken() {
  var t = nextTemplateLiteralToken2();
  token = scanToken();
  return t;
}
function setIndex(i) {
  index = i;
  lastToken = null;
  token = null;
  lookaheadToken = null;
  updateCurrentCharCode();
}
function getPosition() {
  return getPositionByOffset(getOffset());
}
function getPositionByOffset(offset) {
  return lineNumberTable.getSourcePosition(offset);
}
function nextCloseAngle() {
  switch (token.type) {
    case GREATER_EQUAL:
    case RIGHT_SHIFT:
    case RIGHT_SHIFT_EQUAL:
    case UNSIGNED_RIGHT_SHIFT:
    case UNSIGNED_RIGHT_SHIFT_EQUAL:
      setIndex(index - token.type.length + 1);
      lastToken = createToken(CLOSE_ANGLE, index);
      token = scanToken();
      return lastToken;
  }
  return nextToken();
}
function getTokenRange(startOffset) {
  return lineNumberTable.getSourceRange(startOffset, index);
}
function getOffset() {
  return token ? token.location.start.offset : index;
}
function nextRegularExpressionLiteralToken2() {
  var beginIndex = index - token.toString().length;
  if (token.type === SLASH_EQUAL) {
    skipRegularExpressionBodyContinuation();
  } else {
    skipRegularExpressionBody(beginIndex);
  }
  if (currentCharCode !== 47) {
    reportError('Expected \'/\' in regular expression literal', beginIndex);
    return new LiteralToken(REGULAR_EXPRESSION, getTokenString(beginIndex), getTokenRange(beginIndex));
  }
  next();
  while (isIdentifierPart(currentCharCode)) {
    next();
  }
  return new LiteralToken(REGULAR_EXPRESSION, getTokenString(beginIndex), getTokenRange(beginIndex));
}
function skipRegularExpressionBody(beginIndex) {
  if (!isRegularExpressionFirstChar(currentCharCode)) {
    reportError('Expected regular expression first char', beginIndex);
    return;
  }
  skipRegularExpressionBodyContinuation();
}
function skipRegularExpressionBodyContinuation() {
  while (!isAtEnd() && isRegularExpressionChar(currentCharCode)) {
    if (!skipRegularExpressionChar()) {
      return;
    }
  }
}
function skipRegularExpressionChar() {
  switch (currentCharCode) {
    case 92:
      return skipRegularExpressionBackslashSequence();
    case 91:
      return skipRegularExpressionClass();
    default:
      next();
      return true;
  }
}
function skipRegularExpressionBackslashSequence() {
  var beginIndex = index;
  next();
  if (isLineTerminator(currentCharCode) || isAtEnd()) {
    reportError('New line not allowed in regular expression literal', beginIndex, index);
    return false;
  }
  next();
  return true;
}
function skipRegularExpressionClass() {
  var beginIndex = index;
  next();
  while (!isAtEnd() && peekRegularExpressionClassChar()) {
    if (!skipRegularExpressionClassChar()) {
      return false;
    }
  }
  if (currentCharCode !== 93) {
    reportError('\']\' expected', beginIndex, index);
    return false;
  }
  next();
  return true;
}
function peekRegularExpressionClassChar() {
  return currentCharCode !== 93 && !isLineTerminator(currentCharCode);
}
function skipRegularExpressionClassChar() {
  if (currentCharCode === 92) {
    return skipRegularExpressionBackslashSequence();
  }
  next();
  return true;
}
function skipTemplateCharacter() {
  while (!isAtEnd()) {
    switch (currentCharCode) {
      case 96:
        return;
      case 92:
        skipStringLiteralEscapeSequence();
        break;
      case 36:
        {
          var code = input.charCodeAt(index + 1);
          if (code === 123)
            return;
          next();
          break;
        }
      default:
        next();
    }
  }
}
function scanTemplateStart(beginIndex) {
  if (isAtEnd()) {
    reportError('Unterminated template literal', beginIndex, index);
    return lastToken = createToken(END_OF_FILE, beginIndex);
  }
  return nextTemplateLiteralTokenShared(NO_SUBSTITUTION_TEMPLATE, TEMPLATE_HEAD);
}
function nextTemplateLiteralToken2() {
  if (isAtEnd()) {
    reportError('Expected \'}\' after expression in template literal', index, index);
    return createToken(END_OF_FILE, index);
  }
  if (token.type !== CLOSE_CURLY) {
    reportError('Expected \'}\' after expression in template literal', index, index);
    return createToken(ERROR, index);
  }
  return nextTemplateLiteralTokenShared(TEMPLATE_TAIL, TEMPLATE_MIDDLE);
}
function nextTemplateLiteralTokenShared(endType, middleType) {
  var beginIndex = index;
  skipTemplateCharacter();
  if (isAtEnd()) {
    reportError('Unterminated template literal');
    return createToken(ERROR, beginIndex);
  }
  var value = getTokenString(beginIndex);
  switch (currentCharCode) {
    case 96:
      next();
      return lastToken = new LiteralToken(endType, value, getTokenRange(beginIndex - 1));
    case 36:
      next();
      next();
      return lastToken = new LiteralToken(middleType, value, getTokenRange(beginIndex - 1));
  }
}
function peekJsxToken() {
  return token || (token = scanJsxToken());
}
function nextJsxToken() {
  lastToken = peekJsxToken();
  token = null;
  return lastToken;
}
function scanJsxToken() {
  skipComments();
  var beginIndex = index;
  switch (currentCharCode) {
    case 34:
    case 39:
      return scanJsxStringLiteral(beginIndex, currentCharCode);
    case 62:
      next();
      return createToken(CLOSE_ANGLE, beginIndex);
  }
  if (!isIdentifierStart(currentCharCode)) {
    return scanToken();
  }
  next();
  while (isIdentifierPart(currentCharCode) || currentCharCode === 45) {
    next();
  }
  var value = input.slice(beginIndex, index);
  return new JsxIdentifierToken(getTokenRange(beginIndex), value);
}
function scanJsxStringLiteral(beginIndex, terminator) {
  next();
  while (!isAtEnd() && currentCharCode !== terminator) {
    next();
  }
  if (currentCharCode !== terminator) {
    reportError('Unterminated String Literal', beginIndex);
  } else {
    next();
  }
  return new LiteralToken(STRING, getTokenString(beginIndex), getTokenRange(beginIndex));
}
function nextJsxTextToken() {
  lastToken = token || scanJsxTextToken();
  token = null;
  return lastToken;
}
function skipJsxText() {
  while (!isAtEnd() && peekJsxText()) {
    next();
  }
}
function isJsxTextChar(code) {
  switch (code) {
    case 60:
    case 123:
      return false;
  }
  return true;
}
function skipJsxText() {
  while (!isAtEnd() && isJsxTextChar(currentCharCode)) {
    next();
  }
}
function scanJsxTextToken() {
  var beginIndex = index;
  if (isAtEnd()) {
    return createToken(END_OF_FILE, beginIndex);
  }
  skipJsxText();
  if (beginIndex === index) {
    switch (currentCharCode) {
      case 60:
        next();
        return createToken(OPEN_ANGLE, beginIndex);
      case 123:
        next();
        return createToken(OPEN_CURLY, beginIndex);
    }
  }
  return new LiteralToken(STRING, getTokenString(beginIndex), getTokenRange(beginIndex));
}
function nextToken() {
  var t = peekToken();
  token = lookaheadToken || scanToken();
  lookaheadToken = null;
  lastToken = t;
  return t;
}
function peekTokenNoLineTerminator() {
  var t = peekToken();
  var start = lastToken.location.end.offset;
  var end = t.location.start.offset;
  for (var i = start; i < end; i++) {
    if (isLineTerminator(input.charCodeAt(i))) {
      return null;
    }
  }
  return t;
}
function peek(expectedType) {
  return peekToken().type === expectedType;
}
function peekLookahead(expectedType) {
  return peekTokenLookahead().type === expectedType;
}
function peekToken() {
  return token || (token = scanToken());
}
function peekType() {
  return peekToken().type;
}
function peekLocation() {
  return peekToken().location;
}
function peekTokenLookahead() {
  if (!token)
    token = scanToken();
  if (!lookaheadToken)
    lookaheadToken = scanToken();
  return lookaheadToken;
}
function skipWhitespace() {
  while (!isAtEnd() && peekWhitespace()) {
    next();
  }
}
function peekWhitespace() {
  return isWhitespace(currentCharCode);
}
function skipComments() {
  while (skipComment()) {}
}
function skipComment() {
  skipWhitespace();
  var code = currentCharCode;
  if (code === 47) {
    code = input.charCodeAt(index + 1);
    switch (code) {
      case 47:
        skipSingleLineComment();
        return true;
      case 42:
        skipMultiLineComment();
        return true;
    }
  }
  return false;
}
function commentCallback(start, index) {
  if (options.commentCallback)
    currentParser.handleComment(lineNumberTable.getSourceRange(start, index));
}
function skipSingleLineComment() {
  var start = index;
  index += 2;
  while (!isAtEnd() && !isLineTerminator(input.charCodeAt(index++))) {}
  updateCurrentCharCode();
  commentCallback(start, index);
}
function skipMultiLineComment() {
  var start = index;
  var i = input.indexOf('*/', index + 2);
  if (i !== -1)
    index = i + 2;
  else
    index = length;
  updateCurrentCharCode();
  commentCallback(start, index);
}
function scanToken() {
  skipComments();
  var beginIndex = index;
  if (isAtEnd())
    return createToken(END_OF_FILE, beginIndex);
  var code = currentCharCode;
  next();
  switch (code) {
    case 123:
      return createToken(OPEN_CURLY, beginIndex);
    case 125:
      return createToken(CLOSE_CURLY, beginIndex);
    case 40:
      return createToken(OPEN_PAREN, beginIndex);
    case 41:
      return createToken(CLOSE_PAREN, beginIndex);
    case 91:
      return createToken(OPEN_SQUARE, beginIndex);
    case 93:
      return createToken(CLOSE_SQUARE, beginIndex);
    case 46:
      switch (currentCharCode) {
        case 46:
          if (input.charCodeAt(index + 1) === 46) {
            next();
            next();
            return createToken(DOT_DOT_DOT, beginIndex);
          }
          break;
        default:
          if (isDecimalDigit(currentCharCode))
            return scanNumberPostPeriod(beginIndex);
      }
      return createToken(PERIOD, beginIndex);
    case 59:
      return createToken(SEMI_COLON, beginIndex);
    case 44:
      return createToken(COMMA, beginIndex);
    case 126:
      return createToken(TILDE, beginIndex);
    case 63:
      return createToken(QUESTION, beginIndex);
    case 58:
      return createToken(COLON, beginIndex);
    case 60:
      switch (currentCharCode) {
        case 60:
          next();
          if (currentCharCode === 61) {
            next();
            return createToken(LEFT_SHIFT_EQUAL, beginIndex);
          }
          return createToken(LEFT_SHIFT, beginIndex);
        case 61:
          next();
          return createToken(LESS_EQUAL, beginIndex);
        default:
          return createToken(OPEN_ANGLE, beginIndex);
      }
    case 62:
      switch (currentCharCode) {
        case 62:
          next();
          switch (currentCharCode) {
            case 61:
              next();
              return createToken(RIGHT_SHIFT_EQUAL, beginIndex);
            case 62:
              next();
              if (currentCharCode === 61) {
                next();
                return createToken(UNSIGNED_RIGHT_SHIFT_EQUAL, beginIndex);
              }
              return createToken(UNSIGNED_RIGHT_SHIFT, beginIndex);
            default:
              return createToken(RIGHT_SHIFT, beginIndex);
          }
        case 61:
          next();
          return createToken(GREATER_EQUAL, beginIndex);
        default:
          return createToken(CLOSE_ANGLE, beginIndex);
      }
    case 61:
      if (currentCharCode === 61) {
        next();
        if (currentCharCode === 61) {
          next();
          return createToken(EQUAL_EQUAL_EQUAL, beginIndex);
        }
        return createToken(EQUAL_EQUAL, beginIndex);
      }
      if (currentCharCode === 62 && options.arrowFunctions) {
        next();
        return createToken(ARROW, beginIndex);
      }
      return createToken(EQUAL, beginIndex);
    case 33:
      if (currentCharCode === 61) {
        next();
        if (currentCharCode === 61) {
          next();
          return createToken(NOT_EQUAL_EQUAL, beginIndex);
        }
        return createToken(NOT_EQUAL, beginIndex);
      }
      return createToken(BANG, beginIndex);
    case 42:
      if (currentCharCode === 61) {
        next();
        return createToken(STAR_EQUAL, beginIndex);
      }
      if (currentCharCode === 42 && options.exponentiation) {
        next();
        if (currentCharCode === 61) {
          next();
          return createToken(STAR_STAR_EQUAL, beginIndex);
        }
        return createToken(STAR_STAR, beginIndex);
      }
      return createToken(STAR, beginIndex);
    case 37:
      if (currentCharCode === 61) {
        next();
        return createToken(PERCENT_EQUAL, beginIndex);
      }
      return createToken(PERCENT, beginIndex);
    case 94:
      if (currentCharCode === 61) {
        next();
        return createToken(CARET_EQUAL, beginIndex);
      }
      return createToken(CARET, beginIndex);
    case 47:
      if (currentCharCode === 61) {
        next();
        return createToken(SLASH_EQUAL, beginIndex);
      }
      return createToken(SLASH, beginIndex);
    case 43:
      switch (currentCharCode) {
        case 43:
          next();
          return createToken(PLUS_PLUS, beginIndex);
        case 61:
          next();
          return createToken(PLUS_EQUAL, beginIndex);
        default:
          return createToken(PLUS, beginIndex);
      }
    case 45:
      switch (currentCharCode) {
        case 45:
          next();
          return createToken(MINUS_MINUS, beginIndex);
        case 61:
          next();
          return createToken(MINUS_EQUAL, beginIndex);
        default:
          return createToken(MINUS, beginIndex);
      }
    case 38:
      switch (currentCharCode) {
        case 38:
          next();
          return createToken(AND, beginIndex);
        case 61:
          next();
          return createToken(AMPERSAND_EQUAL, beginIndex);
        default:
          return createToken(AMPERSAND, beginIndex);
      }
    case 124:
      switch (currentCharCode) {
        case 124:
          next();
          return createToken(OR, beginIndex);
        case 61:
          next();
          return createToken(BAR_EQUAL, beginIndex);
        default:
          return createToken(BAR, beginIndex);
      }
    case 96:
      return scanTemplateStart(beginIndex);
    case 64:
      return createToken(AT, beginIndex);
    case 48:
      return scanPostZero(beginIndex);
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return scanPostDigit(beginIndex);
    case 34:
    case 39:
      return scanStringLiteral(beginIndex, code);
    default:
      return scanIdentifierOrKeyword(beginIndex, code);
  }
}
function scanNumberPostPeriod(beginIndex) {
  skipDecimalDigits();
  return scanExponentOfNumericLiteral(beginIndex);
}
function scanPostDigit(beginIndex) {
  skipDecimalDigits();
  return scanFractionalNumericLiteral(beginIndex);
}
function scanPostZero(beginIndex) {
  switch (currentCharCode) {
    case 46:
      return scanFractionalNumericLiteral(beginIndex);
    case 88:
    case 120:
      next();
      if (!isHexDigit(currentCharCode)) {
        reportError('Hex Integer Literal must contain at least one digit', beginIndex);
      }
      skipHexDigits();
      return new LiteralToken(NUMBER, getTokenString(beginIndex), getTokenRange(beginIndex));
    case 66:
    case 98:
      if (!options.numericLiterals)
        break;
      next();
      if (!isBinaryDigit(currentCharCode)) {
        reportError('Binary Integer Literal must contain at least one digit', beginIndex);
      }
      skipBinaryDigits();
      return new LiteralToken(NUMBER, getTokenString(beginIndex), getTokenRange(beginIndex));
    case 79:
    case 111:
      if (!options.numericLiterals)
        break;
      next();
      if (!isOctalDigit(currentCharCode)) {
        reportError('Octal Integer Literal must contain at least one digit', beginIndex);
      }
      skipOctalDigits();
      return new LiteralToken(NUMBER, getTokenString(beginIndex), getTokenRange(beginIndex));
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return scanPostDigit(beginIndex);
  }
  return new LiteralToken(NUMBER, getTokenString(beginIndex), getTokenRange(beginIndex));
}
function createToken(type, beginIndex) {
  return new Token(type, getTokenRange(beginIndex));
}
function readUnicodeEscapeSequence() {
  var beginIndex = index;
  if (currentCharCode === 117) {
    next();
    if (skipHexDigit() && skipHexDigit() && skipHexDigit() && skipHexDigit()) {
      return parseInt(getTokenString(beginIndex + 1), 16);
    }
  }
  reportError('Invalid unicode escape sequence in identifier', beginIndex - 1);
  return 0;
}
function scanIdentifierOrKeyword(beginIndex, code) {
  var escapedCharCodes;
  if (code === 92) {
    code = readUnicodeEscapeSequence();
    escapedCharCodes = [code];
  }
  if (!isIdentifierStart(code)) {
    reportError(("Character code '" + code + "' is not a valid identifier start char"), beginIndex);
    return createToken(ERROR, beginIndex);
  }
  for (; ; ) {
    code = currentCharCode;
    if (isIdentifierPart(code)) {
      next();
    } else if (code === 92) {
      next();
      code = readUnicodeEscapeSequence();
      if (!escapedCharCodes)
        escapedCharCodes = [];
      escapedCharCodes.push(code);
      if (!isIdentifierPart(code))
        return createToken(ERROR, beginIndex);
    } else {
      break;
    }
  }
  var value = input.slice(beginIndex, index);
  var keywordType = getKeywordType(value);
  if (keywordType)
    return new KeywordToken(value, keywordType, getTokenRange(beginIndex));
  if (escapedCharCodes) {
    var i = 0;
    value = value.replace(/\\u..../g, function(s) {
      return String.fromCharCode(escapedCharCodes[i++]);
    });
  }
  return new IdentifierToken(getTokenRange(beginIndex), value);
}
function scanStringLiteral(beginIndex, terminator) {
  while (peekStringLiteralChar(terminator)) {
    if (!skipStringLiteralChar()) {
      return new LiteralToken(STRING, getTokenString(beginIndex), getTokenRange(beginIndex));
    }
  }
  if (currentCharCode !== terminator) {
    reportError('Unterminated String Literal', beginIndex);
  } else {
    next();
  }
  return new LiteralToken(STRING, getTokenString(beginIndex), getTokenRange(beginIndex));
}
function getTokenString(beginIndex) {
  return input.substring(beginIndex, index);
}
function peekStringLiteralChar(terminator) {
  return !isAtEnd() && currentCharCode !== terminator && !isLineTerminator(currentCharCode);
}
function skipStringLiteralChar() {
  if (currentCharCode === 92) {
    return skipStringLiteralEscapeSequence();
  }
  next();
  return true;
}
function skipStringLiteralEscapeSequence() {
  next();
  if (isAtEnd()) {
    reportError('Unterminated string literal escape sequence');
    return false;
  }
  if (isLineTerminator(currentCharCode)) {
    skipLineTerminator();
    return true;
  }
  var code = currentCharCode;
  next();
  switch (code) {
    case 39:
    case 34:
    case 92:
    case 98:
    case 102:
    case 110:
    case 114:
    case 116:
    case 118:
    case 48:
      return true;
    case 120:
      return skipHexDigit() && skipHexDigit();
    case 117:
      return skipUnicodeEscapeSequence();
    default:
      return true;
  }
}
function skipUnicodeEscapeSequence() {
  if (currentCharCode === 123 && options.unicodeEscapeSequences) {
    next();
    var beginIndex = index;
    if (!isHexDigit(currentCharCode)) {
      reportError('Hex digit expected', beginIndex);
      return false;
    }
    skipHexDigits();
    if (currentCharCode !== 125) {
      reportError('Hex digit expected', beginIndex);
      return false;
    }
    var codePoint = getTokenString(beginIndex, index);
    if (parseInt(codePoint, 16) > 0x10FFFF) {
      reportError('The code point in a Unicode escape sequence cannot exceed 10FFFF', beginIndex);
      return false;
    }
    next();
    return true;
  }
  return skipHexDigit() && skipHexDigit() && skipHexDigit() && skipHexDigit();
}
function skipHexDigit() {
  if (!isHexDigit(currentCharCode)) {
    reportError('Hex digit expected');
    return false;
  }
  next();
  return true;
}
function skipLineTerminator() {
  var first = currentCharCode;
  next();
  if (first === 13 && currentCharCode === 10) {
    next();
  }
}
function scanFractionalNumericLiteral(beginIndex) {
  if (currentCharCode === 46) {
    next();
    skipDecimalDigits();
  }
  return scanExponentOfNumericLiteral(beginIndex);
}
function scanExponentOfNumericLiteral(beginIndex) {
  switch (currentCharCode) {
    case 101:
    case 69:
      next();
      switch (currentCharCode) {
        case 43:
        case 45:
          next();
          break;
      }
      if (!isDecimalDigit(currentCharCode)) {
        reportError('Exponent part must contain at least one digit', beginIndex);
      }
      skipDecimalDigits();
      break;
    default:
      break;
  }
  return new LiteralToken(NUMBER, getTokenString(beginIndex), getTokenRange(beginIndex));
}
function skipDecimalDigits() {
  while (isDecimalDigit(currentCharCode)) {
    next();
  }
}
function skipHexDigits() {
  while (isHexDigit(currentCharCode)) {
    next();
  }
}
function skipBinaryDigits() {
  while (isBinaryDigit(currentCharCode)) {
    next();
  }
}
function skipOctalDigits() {
  while (isOctalDigit(currentCharCode)) {
    next();
  }
}
function isAtEnd() {
  return index === length;
}
function next() {
  index++;
  updateCurrentCharCode();
}
function updateCurrentCharCode() {
  currentCharCode = input.charCodeAt(index);
}
function reportError(message) {
  var startIndex = arguments[1] !== (void 0) ? arguments[1] : index;
  var endIndex = arguments[2] !== (void 0) ? arguments[2] : index;
  var start = getPositionByOffset(startIndex);
  var end = getPositionByOffset(endIndex);
  var location = new SourceRange(start, end);
  errorReporter.reportError(location, message);
}
Object.defineProperties(module.exports, {
  isWhitespace: {get: function() {
      return isWhitespace;
    }},
  isLineTerminator: {get: function() {
      return isLineTerminator;
    }},
  isIdentifierPart: {get: function() {
      return isIdentifierPart;
    }},
  init: {get: function() {
      return init;
    }},
  getLastToken: {get: function() {
      return getLastToken;
    }},
  nextRegularExpressionLiteralToken: {get: function() {
      return nextRegularExpressionLiteralToken;
    }},
  nextTemplateLiteralToken: {get: function() {
      return nextTemplateLiteralToken;
    }},
  setIndex: {get: function() {
      return setIndex;
    }},
  getPosition: {get: function() {
      return getPosition;
    }},
  nextCloseAngle: {get: function() {
      return nextCloseAngle;
    }},
  peekJsxToken: {get: function() {
      return peekJsxToken;
    }},
  nextJsxToken: {get: function() {
      return nextJsxToken;
    }},
  nextJsxTextToken: {get: function() {
      return nextJsxTextToken;
    }},
  nextToken: {get: function() {
      return nextToken;
    }},
  peekTokenNoLineTerminator: {get: function() {
      return peekTokenNoLineTerminator;
    }},
  peek: {get: function() {
      return peek;
    }},
  peekLookahead: {get: function() {
      return peekLookahead;
    }},
  peekToken: {get: function() {
      return peekToken;
    }},
  peekType: {get: function() {
      return peekType;
    }},
  peekLocation: {get: function() {
      return peekLocation;
    }},
  peekTokenLookahead: {get: function() {
      return peekTokenLookahead;
    }},
  isAtEnd: {get: function() {
      return isAtEnd;
    }},
  __esModule: {value: true}
});
