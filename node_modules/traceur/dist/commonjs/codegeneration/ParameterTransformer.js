"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__TempVarTransformer_46_js__,
    $__PrependStatements_46_js__;
var FunctionBody = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}).FunctionBody;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var prependStatements = ($__PrependStatements_46_js__ = require("./PrependStatements.js"), $__PrependStatements_46_js__ && $__PrependStatements_46_js__.__esModule && $__PrependStatements_46_js__ || {default: $__PrependStatements_46_js__}).prependStatements;
var stack = [];
var ParameterTransformer = function($__super) {
  function ParameterTransformer() {
    $traceurRuntime.superConstructor(ParameterTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ParameterTransformer, {
    transformArrowFunction: function(tree) {
      stack.push([]);
      return $traceurRuntime.superGet(this, ParameterTransformer.prototype, "transformArrowFunction").call(this, tree);
    },
    transformFunctionDeclaration: function(tree) {
      stack.push([]);
      return $traceurRuntime.superGet(this, ParameterTransformer.prototype, "transformFunctionDeclaration").call(this, tree);
    },
    transformFunctionExpression: function(tree) {
      stack.push([]);
      return $traceurRuntime.superGet(this, ParameterTransformer.prototype, "transformFunctionExpression").call(this, tree);
    },
    transformGetAccessor: function(tree) {
      stack.push([]);
      return $traceurRuntime.superGet(this, ParameterTransformer.prototype, "transformGetAccessor").call(this, tree);
    },
    transformSetAccessor: function(tree) {
      stack.push([]);
      return $traceurRuntime.superGet(this, ParameterTransformer.prototype, "transformSetAccessor").call(this, tree);
    },
    transformMethod: function(tree) {
      stack.push([]);
      return $traceurRuntime.superGet(this, ParameterTransformer.prototype, "transformMethod").call(this, tree);
    },
    transformFunctionBody: function(tree) {
      var transformedTree = $traceurRuntime.superGet(this, ParameterTransformer.prototype, "transformFunctionBody").call(this, tree);
      var statements = stack.pop();
      if (!statements.length)
        return transformedTree;
      statements = prependStatements.apply((void 0), $traceurRuntime.spread([transformedTree.statements], statements));
      return new FunctionBody(transformedTree.location, statements);
    },
    get parameterStatements() {
      return stack[stack.length - 1];
    },
    transformConstructorType: function(tree) {
      return tree;
    },
    transformFunctionType: function(tree) {
      return tree;
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  ParameterTransformer: {get: function() {
      return ParameterTransformer;
    }},
  __esModule: {value: true}
});
