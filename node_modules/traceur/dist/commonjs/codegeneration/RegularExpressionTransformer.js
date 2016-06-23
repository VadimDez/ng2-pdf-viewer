"use strict";
var $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_LiteralToken_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $___46__46__47_outputgeneration_47_regexpuRewritePattern_46_js__;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var LiteralExpression = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}).LiteralExpression;
var LiteralToken = ($___46__46__47_syntax_47_LiteralToken_46_js__ = require("../syntax/LiteralToken.js"), $___46__46__47_syntax_47_LiteralToken_46_js__ && $___46__46__47_syntax_47_LiteralToken_46_js__.__esModule && $___46__46__47_syntax_47_LiteralToken_46_js__ || {default: $___46__46__47_syntax_47_LiteralToken_46_js__}).LiteralToken;
var REGULAR_EXPRESSION = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).REGULAR_EXPRESSION;
var regexpuRewritePattern = ($___46__46__47_outputgeneration_47_regexpuRewritePattern_46_js__ = require("../outputgeneration/regexpuRewritePattern.js"), $___46__46__47_outputgeneration_47_regexpuRewritePattern_46_js__ && $___46__46__47_outputgeneration_47_regexpuRewritePattern_46_js__.__esModule && $___46__46__47_outputgeneration_47_regexpuRewritePattern_46_js__ || {default: $___46__46__47_outputgeneration_47_regexpuRewritePattern_46_js__}).regexpuRewritePattern;
var RegularExpressionTransformer = function($__super) {
  function RegularExpressionTransformer() {
    $traceurRuntime.superConstructor(RegularExpressionTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(RegularExpressionTransformer, {transformLiteralExpression: function(tree) {
      var token = tree.literalToken;
      if (token.type === REGULAR_EXPRESSION) {
        var value = token.value;
        var lastIndex = value.lastIndexOf('/');
        var pattern = value.slice(1, lastIndex);
        var flags = value.slice(lastIndex + 1);
        if (flags.indexOf('u') !== -1) {
          var result = '/' + regexpuRewritePattern(pattern, flags) + '/' + flags.replace('u', '');
          return new LiteralExpression(tree.location, new LiteralToken(REGULAR_EXPRESSION, result, token.location));
        }
      }
      return tree;
    }}, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  RegularExpressionTransformer: {get: function() {
      return RegularExpressionTransformer;
    }},
  __esModule: {value: true}
});
