"use strict";
var $__Token_46_js__,
    $__TokenType_46_js__;
var Token = ($__Token_46_js__ = require("./Token.js"), $__Token_46_js__ && $__Token_46_js__.__esModule && $__Token_46_js__ || {default: $__Token_46_js__}).Token;
var IDENTIFIER = ($__TokenType_46_js__ = require("./TokenType.js"), $__TokenType_46_js__ && $__TokenType_46_js__.__esModule && $__TokenType_46_js__ || {default: $__TokenType_46_js__}).IDENTIFIER;
var IdentifierToken = function($__super) {
  function IdentifierToken(location, value) {
    $traceurRuntime.superConstructor(IdentifierToken).call(this, IDENTIFIER, location);
    this.value = value;
  }
  return ($traceurRuntime.createClass)(IdentifierToken, {toString: function() {
      return this.value;
    }}, {}, $__super);
}(Token);
Object.defineProperties(module.exports, {
  IdentifierToken: {get: function() {
      return IdentifierToken;
    }},
  __esModule: {value: true}
});
