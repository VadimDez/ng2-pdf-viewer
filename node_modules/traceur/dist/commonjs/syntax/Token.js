"use strict";
var $__TokenType_46_js__;
var $__0 = ($__TokenType_46_js__ = require("./TokenType.js"), $__TokenType_46_js__ && $__TokenType_46_js__.__esModule && $__TokenType_46_js__ || {default: $__TokenType_46_js__}),
    AMPERSAND_EQUAL = $__0.AMPERSAND_EQUAL,
    BAR_EQUAL = $__0.BAR_EQUAL,
    CARET_EQUAL = $__0.CARET_EQUAL,
    EQUAL = $__0.EQUAL,
    LEFT_SHIFT_EQUAL = $__0.LEFT_SHIFT_EQUAL,
    MINUS_EQUAL = $__0.MINUS_EQUAL,
    PERCENT_EQUAL = $__0.PERCENT_EQUAL,
    PLUS_EQUAL = $__0.PLUS_EQUAL,
    RIGHT_SHIFT_EQUAL = $__0.RIGHT_SHIFT_EQUAL,
    SLASH_EQUAL = $__0.SLASH_EQUAL,
    STAR_EQUAL = $__0.STAR_EQUAL,
    STAR_STAR_EQUAL = $__0.STAR_STAR_EQUAL,
    UNSIGNED_RIGHT_SHIFT_EQUAL = $__0.UNSIGNED_RIGHT_SHIFT_EQUAL;
var Token = function() {
  function Token(type, location) {
    this.type = type;
    this.location = location;
  }
  return ($traceurRuntime.createClass)(Token, {
    toString: function() {
      return this.type;
    },
    isAssignmentOperator: function() {
      return isAssignmentOperator(this.type);
    },
    isKeyword: function() {
      return false;
    },
    isStrictKeyword: function() {
      return false;
    }
  }, {});
}();
function isAssignmentOperator(type) {
  switch (type) {
    case AMPERSAND_EQUAL:
    case BAR_EQUAL:
    case CARET_EQUAL:
    case EQUAL:
    case LEFT_SHIFT_EQUAL:
    case MINUS_EQUAL:
    case PERCENT_EQUAL:
    case PLUS_EQUAL:
    case RIGHT_SHIFT_EQUAL:
    case SLASH_EQUAL:
    case STAR_EQUAL:
    case STAR_STAR_EQUAL:
    case UNSIGNED_RIGHT_SHIFT_EQUAL:
      return true;
  }
  return false;
}
Object.defineProperties(module.exports, {
  Token: {get: function() {
      return Token;
    }},
  isAssignmentOperator: {get: function() {
      return isAssignmentOperator;
    }},
  __esModule: {value: true}
});
