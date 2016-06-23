"use strict";
var $__ParseTreeTransformer_46_js__,
    $__RewriteTailExpressionsTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__SkipFunctionsTransformerTrait_46_js__;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var RewriteTailExpressionsTransformer = ($__RewriteTailExpressionsTransformer_46_js__ = require("./RewriteTailExpressionsTransformer.js"), $__RewriteTailExpressionsTransformer_46_js__ && $__RewriteTailExpressionsTransformer_46_js__.__esModule && $__RewriteTailExpressionsTransformer_46_js__ || {default: $__RewriteTailExpressionsTransformer_46_js__}).RewriteTailExpressionsTransformer;
var $__2 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    ReturnStatement = $__2.ReturnStatement,
    TryStatement = $__2.TryStatement;
var SkipFunctionsTransformerTrait = ($__SkipFunctionsTransformerTrait_46_js__ = require("./SkipFunctionsTransformerTrait.js"), $__SkipFunctionsTransformerTrait_46_js__ && $__SkipFunctionsTransformerTrait_46_js__.__esModule && $__SkipFunctionsTransformerTrait_46_js__ || {default: $__SkipFunctionsTransformerTrait_46_js__}).default;
var RewriteTailCallsTransformer = function($__super) {
  function RewriteTailCallsTransformer(bodyTransformer) {
    $traceurRuntime.superConstructor(RewriteTailCallsTransformer).call(this);
    this.bodyTransformer_ = bodyTransformer;
  }
  return ($traceurRuntime.createClass)(RewriteTailCallsTransformer, {
    transformReturnStatement: function(tree) {
      var expression = tree.expression;
      if (expression !== null) {
        expression = RewriteTailExpressionsTransformer.transform(this.bodyTransformer_, expression);
        if (expression !== tree.expression) {
          return new ReturnStatement(tree.location, expression);
        }
      }
      return tree;
    },
    transformTryStatement: function(tree) {
      var block;
      if (tree.finallyBlock !== null) {
        block = this.transformAny(tree.finallyBlock);
        if (block !== tree.finallyBlock) {
          return new TryStatement(tree.location, tree.body, tree.catchBlock, block);
        }
      } else {
        block = this.transformAny(tree.catchBlock);
        if (block !== tree.catchBlock) {
          return new TryStatement(tree.location, tree.body, block, tree.finallyBlock);
        }
      }
      return tree;
    },
    transformForInStatement: function(tree) {
      return tree;
    },
    transformForOfStatement: function(tree) {
      return tree;
    },
    transformForOnStatement: function(tree) {
      return tree;
    },
    transformClassDeclaration: function(tree) {
      return tree;
    },
    transformClassExpression: function(tree) {
      return tree;
    },
    transformExpressionStatement: function(tree) {
      return tree;
    },
    transformComprehensionFor: function(tree) {
      return tree;
    },
    transformVariableStatement: function(tree) {
      return tree;
    }
  }, {transform: function(bodyTransformer, tree) {
      return new RewriteTailCallsTransformer(bodyTransformer).transformAny(tree);
    }}, $__super);
}(SkipFunctionsTransformerTrait(ParseTreeTransformer));
Object.defineProperties(module.exports, {
  RewriteTailCallsTransformer: {get: function() {
      return RewriteTailCallsTransformer;
    }},
  __esModule: {value: true}
});
