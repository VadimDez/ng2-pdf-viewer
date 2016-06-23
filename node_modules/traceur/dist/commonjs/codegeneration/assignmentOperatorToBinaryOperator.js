"use strict";
var $___46__46__47_syntax_47_TokenType_46_js__;
var $__0 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    AMPERSAND = $__0.AMPERSAND,
    AMPERSAND_EQUAL = $__0.AMPERSAND_EQUAL,
    BAR = $__0.BAR,
    BAR_EQUAL = $__0.BAR_EQUAL,
    CARET = $__0.CARET,
    CARET_EQUAL = $__0.CARET_EQUAL,
    LEFT_SHIFT = $__0.LEFT_SHIFT,
    LEFT_SHIFT_EQUAL = $__0.LEFT_SHIFT_EQUAL,
    MINUS = $__0.MINUS,
    MINUS_EQUAL = $__0.MINUS_EQUAL,
    PERCENT = $__0.PERCENT,
    PERCENT_EQUAL = $__0.PERCENT_EQUAL,
    PLUS = $__0.PLUS,
    PLUS_EQUAL = $__0.PLUS_EQUAL,
    RIGHT_SHIFT = $__0.RIGHT_SHIFT,
    RIGHT_SHIFT_EQUAL = $__0.RIGHT_SHIFT_EQUAL,
    SLASH = $__0.SLASH,
    SLASH_EQUAL = $__0.SLASH_EQUAL,
    STAR = $__0.STAR,
    STAR_EQUAL = $__0.STAR_EQUAL,
    STAR_STAR = $__0.STAR_STAR,
    STAR_STAR_EQUAL = $__0.STAR_STAR_EQUAL,
    UNSIGNED_RIGHT_SHIFT = $__0.UNSIGNED_RIGHT_SHIFT,
    UNSIGNED_RIGHT_SHIFT_EQUAL = $__0.UNSIGNED_RIGHT_SHIFT_EQUAL;
function assignmentOperatorToBinaryOperator(type) {
  switch (type) {
    case STAR_EQUAL:
      return STAR;
    case STAR_STAR_EQUAL:
      return STAR_STAR;
    case SLASH_EQUAL:
      return SLASH;
    case PERCENT_EQUAL:
      return PERCENT;
    case PLUS_EQUAL:
      return PLUS;
    case MINUS_EQUAL:
      return MINUS;
    case LEFT_SHIFT_EQUAL:
      return LEFT_SHIFT;
    case RIGHT_SHIFT_EQUAL:
      return RIGHT_SHIFT;
    case UNSIGNED_RIGHT_SHIFT_EQUAL:
      return UNSIGNED_RIGHT_SHIFT;
    case AMPERSAND_EQUAL:
      return AMPERSAND;
    case CARET_EQUAL:
      return CARET;
    case BAR_EQUAL:
      return BAR;
    default:
      throw Error('unreachable');
  }
}
var $__default = assignmentOperatorToBinaryOperator;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
