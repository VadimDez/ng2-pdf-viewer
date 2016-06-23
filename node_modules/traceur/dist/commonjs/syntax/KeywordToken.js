"use strict";
var $__Keywords_46_js__,
    $__Token_46_js__;
var STRICT_KEYWORD = ($__Keywords_46_js__ = require("./Keywords.js"), $__Keywords_46_js__ && $__Keywords_46_js__.__esModule && $__Keywords_46_js__ || {default: $__Keywords_46_js__}).STRICT_KEYWORD;
var Token = ($__Token_46_js__ = require("./Token.js"), $__Token_46_js__ && $__Token_46_js__.__esModule && $__Token_46_js__ || {default: $__Token_46_js__}).Token;
var KeywordToken = function($__super) {
  function KeywordToken(type, keywordType, location) {
    $traceurRuntime.superConstructor(KeywordToken).call(this, type, location);
    this.isStrictKeyword_ = keywordType === STRICT_KEYWORD;
  }
  return ($traceurRuntime.createClass)(KeywordToken, {
    isKeyword: function() {
      return true;
    },
    isStrictKeyword: function() {
      return this.isStrictKeyword_;
    }
  }, {}, $__super);
}(Token);
Object.defineProperties(module.exports, {
  KeywordToken: {get: function() {
      return KeywordToken;
    }},
  __esModule: {value: true}
});
