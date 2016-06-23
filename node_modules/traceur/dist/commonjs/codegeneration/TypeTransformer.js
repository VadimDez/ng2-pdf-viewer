"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__ParseTreeTransformer_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__0.AnonBlock,
    FormalParameter = $__0.FormalParameter,
    FunctionDeclaration = $__0.FunctionDeclaration,
    FunctionExpression = $__0.FunctionExpression,
    GetAccessor = $__0.GetAccessor,
    Method = $__0.Method,
    VariableDeclaration = $__0.VariableDeclaration;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    IMPORT_TYPE_CLAUSE = $__1.IMPORT_TYPE_CLAUSE,
    TYPE_ALIAS_DECLARATION = $__1.TYPE_ALIAS_DECLARATION;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var TypeTransformer = function($__super) {
  function TypeTransformer() {
    $traceurRuntime.superConstructor(TypeTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(TypeTransformer, {
    transformVariableDeclaration: function(tree) {
      if (tree.typeAnnotation) {
        tree = new VariableDeclaration(tree.location, tree.lvalue, null, tree.initializer);
      }
      return $traceurRuntime.superGet(this, TypeTransformer.prototype, "transformVariableDeclaration").call(this, tree);
    },
    transformFormalParameter: function(tree) {
      if (tree.typeAnnotation !== null)
        return new FormalParameter(tree.location, tree.parameter, null, []);
      return tree;
    },
    transformFunctionDeclaration: function(tree) {
      if (tree.typeAnnotation) {
        tree = new FunctionDeclaration(tree.location, tree.name, tree.functionKind, tree.parameterList, null, tree.annotations, tree.body);
      }
      return $traceurRuntime.superGet(this, TypeTransformer.prototype, "transformFunctionDeclaration").call(this, tree);
    },
    transformFunctionExpression: function(tree) {
      if (tree.typeAnnotation) {
        tree = new FunctionExpression(tree.location, tree.name, tree.functionKind, tree.parameterList, null, tree.annotations, tree.body);
      }
      return $traceurRuntime.superGet(this, TypeTransformer.prototype, "transformFunctionExpression").call(this, tree);
    },
    transformMethod: function(tree) {
      if (tree.typeAnnotation) {
        tree = new Method(tree.location, tree.isStatic, tree.functionKind, tree.name, tree.parameterList, null, tree.annotations, tree.body, tree.debugName);
      }
      return $traceurRuntime.superGet(this, TypeTransformer.prototype, "transformMethod").call(this, tree);
    },
    transformGetAccessor: function(tree) {
      if (tree.typeAnnotation) {
        tree = new GetAccessor(tree.location, tree.isStatic, tree.name, null, tree.annotations, tree.body);
      }
      return $traceurRuntime.superGet(this, TypeTransformer.prototype, "transformGetAccessor").call(this, tree);
    },
    transformInterfaceDeclaration: function(tree) {
      return new AnonBlock(null, []);
    },
    transformExportDeclaration: function(tree) {
      if (tree.declaration.type === TYPE_ALIAS_DECLARATION) {
        return new AnonBlock(null, []);
      }
      return $traceurRuntime.superGet(this, TypeTransformer.prototype, "transformExportDeclaration").call(this, tree);
    },
    transformTypeAliasDeclaration: function(tree) {
      return new AnonBlock(null, []);
    },
    transformImportDeclaration: function(tree) {
      if (!tree.importClause || tree.importClause.type === IMPORT_TYPE_CLAUSE) {
        return new AnonBlock(null, []);
      }
      return $traceurRuntime.superGet(this, TypeTransformer.prototype, "transformImportDeclaration").call(this, tree);
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  TypeTransformer: {get: function() {
      return TypeTransformer;
    }},
  __esModule: {value: true}
});
