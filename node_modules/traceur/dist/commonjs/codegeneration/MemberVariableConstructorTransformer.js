"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__ParseTreeTransformer_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PrependStatements_46_js__;
var Method = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}).Method;
var SUPER_EXPRESSION = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}).SUPER_EXPRESSION;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var $__3 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createCommaExpression = $__3.createCommaExpression,
    createExpressionStatement = $__3.createExpressionStatement,
    createFunctionBody = $__3.createFunctionBody,
    createParenExpression = $__3.createParenExpression,
    createThisExpression = $__3.createThisExpression;
var prependStatements = ($__PrependStatements_46_js__ = require("./PrependStatements.js"), $__PrependStatements_46_js__ && $__PrependStatements_46_js__.__esModule && $__PrependStatements_46_js__ || {default: $__PrependStatements_46_js__}).prependStatements;
function transformConstructor(constructor, initExpression, superClass) {
  if (superClass) {
    var transformer = new SuperCallTransformer(initExpression);
    return transformer.transformAny(constructor);
  }
  var statements = constructor.body.statements;
  var initStatement = createExpressionStatement(initExpression);
  statements = prependStatements(statements, initStatement);
  return new Method(constructor.location, false, constructor.functionKind, constructor.name, constructor.parameterList, constructor.typeAnnotation, constructor.annotations, createFunctionBody(statements), constructor.debugName);
}
var SuperCallTransformer = function($__super) {
  function SuperCallTransformer(expression) {
    $traceurRuntime.superConstructor(SuperCallTransformer).call(this);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(SuperCallTransformer, {
    transformCallExpression: function(tree) {
      if (tree.operand.type === SUPER_EXPRESSION) {
        var thisExpression = createThisExpression();
        return createParenExpression(createCommaExpression([tree, this.expression, thisExpression]));
      }
      return $traceurRuntime.superGet(this, SuperCallTransformer.prototype, "transformCallExpression").call(this, tree);
    },
    transformClassDeclaration: function(tree) {
      return tree;
    },
    transformClassExpression: function(tree) {
      return tree;
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  transformConstructor: {get: function() {
      return transformConstructor;
    }},
  __esModule: {value: true}
});
