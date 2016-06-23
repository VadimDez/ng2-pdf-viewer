"use strict";
var $__ExplodeExpressionTransformer_46_js__,
    $__TempVarTransformer_46_js__,
    $__ParenTrait_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__PlaceholderParser_46_js__;
var ExplodeExpressionTransformer = ($__ExplodeExpressionTransformer_46_js__ = require("./ExplodeExpressionTransformer.js"), $__ExplodeExpressionTransformer_46_js__ && $__ExplodeExpressionTransformer_46_js__.__esModule && $__ExplodeExpressionTransformer_46_js__ || {default: $__ExplodeExpressionTransformer_46_js__}).ExplodeExpressionTransformer;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var ParenTrait = ($__ParenTrait_46_js__ = require("./ParenTrait.js"), $__ParenTrait_46_js__ && $__ParenTrait_46_js__.__esModule && $__ParenTrait_46_js__ || {default: $__ParenTrait_46_js__}).ParenTrait;
var $__3 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    STAR_STAR = $__3.STAR_STAR,
    STAR_STAR_EQUAL = $__3.STAR_STAR_EQUAL;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
var ExponentiationTransformer = function($__super) {
  function ExponentiationTransformer() {
    $traceurRuntime.superConstructor(ExponentiationTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ExponentiationTransformer, {transformBinaryExpression: function(tree) {
      switch (tree.operator.type) {
        case STAR_STAR:
          {
            var left = this.transformAny(tree.left);
            var right = this.transformAny(tree.right);
            return parseExpression($traceurRuntime.getTemplateObject(["Math.pow(", ", ", ")"]), left, right);
          }
        case STAR_STAR_EQUAL:
          {
            var exploded = new ExplodeExpressionTransformer(this).transformAny(tree);
            return this.transformAny(exploded);
          }
      }
      return $traceurRuntime.superGet(this, ExponentiationTransformer.prototype, "transformBinaryExpression").call(this, tree);
    }}, {}, $__super);
}(ParenTrait(TempVarTransformer));
Object.defineProperties(module.exports, {
  ExponentiationTransformer: {get: function() {
      return ExponentiationTransformer;
    }},
  __esModule: {value: true}
});
