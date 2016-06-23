"use strict";
var $___46__46__47_PlaceholderParser_46_js__;
var parseStatement = ($___46__46__47_PlaceholderParser_46_js__ = require("../PlaceholderParser.js"), $___46__46__47_PlaceholderParser_46_js__ && $___46__46__47_PlaceholderParser_46_js__.__esModule && $___46__46__47_PlaceholderParser_46_js__ || {default: $___46__46__47_PlaceholderParser_46_js__}).parseStatement;
function createModuleEvaluationStatement(normalizedName) {
  return parseStatement($traceurRuntime.getTemplateObject(["$traceurRuntime.getModule(", " +'')"]), normalizedName);
}
Object.defineProperties(module.exports, {
  createModuleEvaluationStatement: {get: function() {
      return createModuleEvaluationStatement;
    }},
  __esModule: {value: true}
});
