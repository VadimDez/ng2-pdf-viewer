"use strict";
var $__Token_46_js__,
    $__TokenType_46_js__;
var Token = ($__Token_46_js__ = require("./Token.js"), $__Token_46_js__ && $__Token_46_js__.__esModule && $__Token_46_js__ || {default: $__Token_46_js__}).Token;
var JSX_IDENTIFIER = ($__TokenType_46_js__ = require("./TokenType.js"), $__TokenType_46_js__ && $__TokenType_46_js__.__esModule && $__TokenType_46_js__ || {default: $__TokenType_46_js__}).JSX_IDENTIFIER;
var JsxIdentifierToken = function($__super) {
  function JsxIdentifierToken(location, value) {
    $traceurRuntime.superConstructor(JsxIdentifierToken).call(this, JSX_IDENTIFIER, location);
    this.value = value;
  }
  return ($traceurRuntime.createClass)(JsxIdentifierToken, {toString: function() {
      return this.value;
    }}, {}, $__super);
}(Token);
Object.defineProperties(module.exports, {
  JsxIdentifierToken: {get: function() {
      return JsxIdentifierToken;
    }},
  __esModule: {value: true}
});
