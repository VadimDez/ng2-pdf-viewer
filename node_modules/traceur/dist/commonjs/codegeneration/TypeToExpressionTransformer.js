"use strict";
var $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__PlaceholderParser_46_js__;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    ArgumentList = $__1.ArgumentList,
    IdentifierExpression = $__1.IdentifierExpression,
    MemberExpression = $__1.MemberExpression;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
var TypeToExpressionTransformer = function($__super) {
  function TypeToExpressionTransformer() {
    $traceurRuntime.superConstructor(TypeToExpressionTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(TypeToExpressionTransformer, {
    transformTypeName: function(tree) {
      if (tree.moduleName) {
        var operand = this.transformAny(tree.moduleName);
        return new MemberExpression(tree.location, operand, tree.name);
      }
      return new IdentifierExpression(tree.location, tree.name);
    },
    transformPredefinedType: function(tree) {
      return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.type.", ")"]), tree.typeToken);
    },
    transformTypeReference: function(tree) {
      var typeName = this.transformAny(tree.typeName);
      var args = this.transformAny(tree.args);
      var argumentList = new ArgumentList(tree.location, $traceurRuntime.spread([typeName], args));
      return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.genericType(", ")"]), argumentList);
    },
    transformTypeArguments: function(tree) {
      return this.transformList(tree.args);
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  TypeToExpressionTransformer: {get: function() {
      return TypeToExpressionTransformer;
    }},
  __esModule: {value: true}
});
