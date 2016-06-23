"use strict";
var $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_LiteralToken_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var LiteralExpression = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}).LiteralExpression;
var LiteralToken = ($___46__46__47_syntax_47_LiteralToken_46_js__ = require("../syntax/LiteralToken.js"), $___46__46__47_syntax_47_LiteralToken_46_js__ && $___46__46__47_syntax_47_LiteralToken_46_js__.__esModule && $___46__46__47_syntax_47_LiteralToken_46_js__ || {default: $___46__46__47_syntax_47_LiteralToken_46_js__}).LiteralToken;
var STRING = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).STRING;
var re = /(\\*)\\u{([0-9a-fA-F]+)}/g;
function zeroPad(value) {
  return '0000'.slice(value.length) + value;
}
function needsTransform(token) {
  return token.type === STRING && re.test(token.value);
}
function transformToken(token) {
  return token.value.replace(re, function(match, backslashes, hexDigits) {
    var backslashIsEscaped = backslashes.length % 2 === 1;
    if (backslashIsEscaped) {
      return match;
    }
    var codePoint = parseInt(hexDigits, 16);
    var value;
    if (codePoint <= 0xFFFF) {
      value = '\\u' + zeroPad(codePoint.toString(16).toUpperCase());
    } else {
      var high = Math.floor((codePoint - 0x10000) / 0x400) + 0xD800;
      var low = (codePoint - 0x10000) % 0x400 + 0xDC00;
      value = '\\u' + high.toString(16).toUpperCase() + '\\u' + low.toString(16).toUpperCase();
    }
    return backslashes + value;
  });
}
var UnicodeEscapeSequenceTransformer = function($__super) {
  function UnicodeEscapeSequenceTransformer() {
    $traceurRuntime.superConstructor(UnicodeEscapeSequenceTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(UnicodeEscapeSequenceTransformer, {transformLiteralExpression: function(tree) {
      var token = tree.literalToken;
      if (needsTransform(token)) {
        var value = transformToken(token);
        return new LiteralExpression(tree.location, new LiteralToken(STRING, value, token.location));
      }
      return tree;
    }}, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  UnicodeEscapeSequenceTransformer: {get: function() {
      return UnicodeEscapeSequenceTransformer;
    }},
  __esModule: {value: true}
});
