"use strict";
var $__ComprehensionTransformer_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__;
var ComprehensionTransformer = ($__ComprehensionTransformer_46_js__ = require("./ComprehensionTransformer.js"), $__ComprehensionTransformer_46_js__ && $__ComprehensionTransformer_46_js__.__esModule && $__ComprehensionTransformer_46_js__ || {default: $__ComprehensionTransformer_46_js__}).ComprehensionTransformer;
var createIdentifierExpression = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}).createIdentifierExpression;
var parseStatement = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseStatement;
var ArrayComprehensionTransformer = function($__super) {
  function ArrayComprehensionTransformer() {
    $traceurRuntime.superConstructor(ArrayComprehensionTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ArrayComprehensionTransformer, {transformArrayComprehension: function(tree) {
      this.pushTempScope();
      var expression = this.transformAny(tree.expression);
      var index = createIdentifierExpression(this.getTempIdentifier());
      var result = createIdentifierExpression(this.getTempIdentifier());
      var tempVarsStatatement = parseStatement($traceurRuntime.getTemplateObject(["var ", " = 0, ", " = [];"]), index, result);
      var statement = parseStatement($traceurRuntime.getTemplateObject(["", "[", "++] = ", ";"]), result, index, expression);
      var returnStatement = parseStatement($traceurRuntime.getTemplateObject(["return ", ";"]), result);
      var functionKind = null;
      result = this.transformComprehension(tree, statement, functionKind, tempVarsStatatement, returnStatement);
      this.popTempScope();
      return result;
    }}, {}, $__super);
}(ComprehensionTransformer);
Object.defineProperties(module.exports, {
  ArrayComprehensionTransformer: {get: function() {
      return ArrayComprehensionTransformer;
    }},
  __esModule: {value: true}
});
