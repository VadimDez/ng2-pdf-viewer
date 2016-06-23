"use strict";
var $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_LiteralToken_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    LiteralExpression = $__1.LiteralExpression,
    LiteralPropertyName = $__1.LiteralPropertyName;
var LiteralToken = ($___46__46__47_syntax_47_LiteralToken_46_js__ = require("../syntax/LiteralToken.js"), $___46__46__47_syntax_47_LiteralToken_46_js__ && $___46__46__47_syntax_47_LiteralToken_46_js__.__esModule && $___46__46__47_syntax_47_LiteralToken_46_js__ || {default: $___46__46__47_syntax_47_LiteralToken_46_js__}).LiteralToken;
var NUMBER = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).NUMBER;
function needsTransform(token) {
  return token.type === NUMBER && /^0[bBoO]/.test(token.value);
}
function transformToken(token) {
  return new LiteralToken(NUMBER, String(token.processedValue), token.location);
}
var NumericLiteralTransformer = function($__super) {
  function NumericLiteralTransformer() {
    $traceurRuntime.superConstructor(NumericLiteralTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(NumericLiteralTransformer, {
    transformLiteralExpression: function(tree) {
      var token = tree.literalToken;
      if (needsTransform(token))
        return new LiteralExpression(tree.location, transformToken(token));
      return tree;
    },
    transformLiteralPropertyName: function(tree) {
      var token = tree.literalToken;
      if (needsTransform(token))
        return new LiteralPropertyName(tree.location, transformToken(token));
      return tree;
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  NumericLiteralTransformer: {get: function() {
      return NumericLiteralTransformer;
    }},
  __esModule: {value: true}
});
