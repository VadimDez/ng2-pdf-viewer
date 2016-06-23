"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__,
    $__ParseTreeTransformer_46_js__;
var SPREAD_EXPRESSION = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}).SPREAD_EXPRESSION;
var $__1 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createObjectLiteral = $__1.createObjectLiteral,
    createArgumentList = $__1.createArgumentList;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
function hasSpread(trees) {
  return trees.some(function(tree) {
    return tree && tree.type === SPREAD_EXPRESSION;
  });
}
var SpreadPropertiesTransformer = function($__super) {
  function SpreadPropertiesTransformer() {
    $traceurRuntime.superConstructor(SpreadPropertiesTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(SpreadPropertiesTransformer, {transformObjectLiteral: function(tree) {
      if (!hasSpread(tree.propertyNameAndValues)) {
        return $traceurRuntime.superGet(this, SpreadPropertiesTransformer.prototype, "transformObjectLiteral").call(this, tree);
      }
      var properties = this.transformList(tree.propertyNameAndValues);
      return spreadProperties(properties);
    }}, {}, $__super);
}(ParseTreeTransformer);
function spreadProperties(properties) {
  var args = [];
  var accummulatedProps = null;
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (property.type === SPREAD_EXPRESSION) {
      if (accummulatedProps) {
        args.push(createObjectLiteral(accummulatedProps));
        accummulatedProps = null;
      }
      args.push(property.expression);
    } else {
      if (!accummulatedProps) {
        accummulatedProps = [];
      }
      accummulatedProps.push(property);
    }
  }
  if (accummulatedProps) {
    args.push(createObjectLiteral(accummulatedProps));
  }
  return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.spreadProperties(", ")"]), createArgumentList(args));
}
Object.defineProperties(module.exports, {
  SpreadPropertiesTransformer: {get: function() {
      return SpreadPropertiesTransformer;
    }},
  spreadProperties: {get: function() {
      return spreadProperties;
    }},
  __esModule: {value: true}
});
