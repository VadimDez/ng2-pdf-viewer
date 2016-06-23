"use strict";
var $__ComprehensionTransformer_46_js__,
    $__PlaceholderParser_46_js__;
var ComprehensionTransformer = ($__ComprehensionTransformer_46_js__ = require("./ComprehensionTransformer.js"), $__ComprehensionTransformer_46_js__ && $__ComprehensionTransformer_46_js__.__esModule && $__ComprehensionTransformer_46_js__ || {default: $__ComprehensionTransformer_46_js__}).ComprehensionTransformer;
var parseStatement = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseStatement;
var GeneratorComprehensionTransformer = function($__super) {
  function GeneratorComprehensionTransformer() {
    $traceurRuntime.superConstructor(GeneratorComprehensionTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(GeneratorComprehensionTransformer, {transformGeneratorComprehension: function(tree) {
      var expression = this.transformAny(tree.expression);
      var statement = parseStatement($traceurRuntime.getTemplateObject(["yield ", ""]), expression);
      var isGenerator = true;
      return this.transformComprehension(tree, statement, isGenerator);
    }}, {}, $__super);
}(ComprehensionTransformer);
Object.defineProperties(module.exports, {
  GeneratorComprehensionTransformer: {get: function() {
      return GeneratorComprehensionTransformer;
    }},
  __esModule: {value: true}
});
