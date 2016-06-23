"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__ParseTreeTransformer_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    IdentifierExpression = $__0.IdentifierExpression,
    LiteralPropertyName = $__0.LiteralPropertyName,
    PropertyNameAssignment = $__0.PropertyNameAssignment;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var PropertyNameShorthandTransformer = function($__super) {
  function PropertyNameShorthandTransformer() {
    $traceurRuntime.superConstructor(PropertyNameShorthandTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(PropertyNameShorthandTransformer, {transformPropertyNameShorthand: function(tree) {
      return new PropertyNameAssignment(tree.location, new LiteralPropertyName(tree.location, tree.name), new IdentifierExpression(tree.location, tree.name));
    }}, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  PropertyNameShorthandTransformer: {get: function() {
      return PropertyNameShorthandTransformer;
    }},
  __esModule: {value: true}
});
