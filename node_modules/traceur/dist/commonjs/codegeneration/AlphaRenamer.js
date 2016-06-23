"use strict";
var $__ScopeTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_PredefinedName_46_js__,
    $__ParseTreeFactory_46_js__;
var ScopeTransformer = ($__ScopeTransformer_46_js__ = require("./ScopeTransformer.js"), $__ScopeTransformer_46_js__ && $__ScopeTransformer_46_js__.__esModule && $__ScopeTransformer_46_js__ || {default: $__ScopeTransformer_46_js__}).ScopeTransformer;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    FunctionDeclaration = $__1.FunctionDeclaration,
    FunctionExpression = $__1.FunctionExpression;
var THIS = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}).THIS;
var createIdentifierExpression = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}).createIdentifierExpression;
var AlphaRenamer = function($__super) {
  function AlphaRenamer(varName, newName) {
    $traceurRuntime.superConstructor(AlphaRenamer).call(this, varName);
    this.newName_ = newName;
  }
  return ($traceurRuntime.createClass)(AlphaRenamer, {
    transformIdentifierExpression: function(tree) {
      if (this.varName_ === tree.identifierToken.value) {
        return createIdentifierExpression(this.newName_);
      } else {
        return tree;
      }
    },
    transformThisExpression: function(tree) {
      if (this.varName_ !== THIS)
        return tree;
      return createIdentifierExpression(this.newName_);
    },
    transformFunctionDeclaration: function(tree) {
      if (this.varName_ === tree.name) {
        tree = new FunctionDeclaration(tree.location, this.newName_, tree.functionKind, tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body);
      }
      return $traceurRuntime.superGet(this, AlphaRenamer.prototype, "transformFunctionDeclaration").call(this, tree);
    },
    transformFunctionExpression: function(tree) {
      if (this.varName_ === tree.name) {
        tree = new FunctionExpression(tree.location, this.newName_, tree.functionKind, tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body);
      }
      return $traceurRuntime.superGet(this, AlphaRenamer.prototype, "transformFunctionExpression").call(this, tree);
    }
  }, {rename: function(tree, varName, newName) {
      return new AlphaRenamer(varName, newName).transformAny(tree);
    }}, $__super);
}(ScopeTransformer);
Object.defineProperties(module.exports, {
  AlphaRenamer: {get: function() {
      return AlphaRenamer;
    }},
  __esModule: {value: true}
});
