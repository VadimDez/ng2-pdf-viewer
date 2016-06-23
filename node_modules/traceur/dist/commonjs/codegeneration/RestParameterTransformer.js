"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__ParameterTransformer_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__;
var FormalParameterList = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}).FormalParameterList;
var ParameterTransformer = ($__ParameterTransformer_46_js__ = require("./ParameterTransformer.js"), $__ParameterTransformer_46_js__ && $__ParameterTransformer_46_js__.__esModule && $__ParameterTransformer_46_js__ || {default: $__ParameterTransformer_46_js__}).ParameterTransformer;
var createIdentifierToken = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}).createIdentifierToken;
var parseStatement = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseStatement;
function hasRestParameter(parameterList) {
  var parameters = parameterList.parameters;
  return parameters.length > 0 && parameters[parameters.length - 1].isRestParameter();
}
function getRestParameterLiteralToken(parameterList) {
  var parameters = parameterList.parameters;
  return parameters[parameters.length - 1].parameter.identifier.identifierToken;
}
var RestParameterTransformer = function($__super) {
  function RestParameterTransformer() {
    $traceurRuntime.superConstructor(RestParameterTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(RestParameterTransformer, {transformFormalParameterList: function(tree) {
      var transformed = $traceurRuntime.superGet(this, RestParameterTransformer.prototype, "transformFormalParameterList").call(this, tree);
      if (hasRestParameter(transformed)) {
        var parametersWithoutRestParam = new FormalParameterList(transformed.location, transformed.parameters.slice(0, -1));
        var startIndex = transformed.parameters.length - 1;
        var i = createIdentifierToken(this.getTempIdentifier());
        var name = getRestParameterLiteralToken(transformed);
        var loop;
        if (startIndex) {
          loop = parseStatement($traceurRuntime.getTemplateObject(["\n            for (var ", " = [], ", " = ", ";\n                 ", " < arguments.length; ", "++)\n              ", "[", " - ", "] = arguments[", "];"]), name, i, startIndex, i, i, name, i, startIndex, i);
        } else {
          loop = parseStatement($traceurRuntime.getTemplateObject(["\n            for (var ", " = [], ", " = 0;\n                 ", " < arguments.length; ", "++)\n              ", "[", "] = arguments[", "];"]), name, i, i, i, name, i, i);
        }
        this.parameterStatements.push(loop);
        return parametersWithoutRestParam;
      }
      return transformed;
    }}, {}, $__super);
}(ParameterTransformer);
Object.defineProperties(module.exports, {
  RestParameterTransformer: {get: function() {
      return RestParameterTransformer;
    }},
  __esModule: {value: true}
});
