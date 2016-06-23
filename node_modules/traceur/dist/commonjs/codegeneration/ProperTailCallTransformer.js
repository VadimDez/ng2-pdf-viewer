"use strict";
var $__TempVarTransformer_46_js__,
    $__RewriteTailCallsTransformer_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var RewriteTailCallsTransformer = ($__RewriteTailCallsTransformer_46_js__ = require("./RewriteTailCallsTransformer.js"), $__RewriteTailCallsTransformer_46_js__ && $__RewriteTailCallsTransformer_46_js__.__esModule && $__RewriteTailCallsTransformer_46_js__ || {default: $__RewriteTailCallsTransformer_46_js__}).RewriteTailCallsTransformer;
var $__2 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createFunctionBody = $__2.createFunctionBody,
    createFunctionExpression = $__2.createFunctionExpression,
    id = $__2.createIdentifierExpression;
var $__3 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseExpression = $__3.parseExpression,
    parseStatement = $__3.parseStatement,
    parseStatements = $__3.parseStatements;
var $__4 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__4.AnonBlock,
    FunctionDeclaration = $__4.FunctionDeclaration,
    FunctionExpression = $__4.FunctionExpression;
var ProperTailCallTransformer = function($__super) {
  function ProperTailCallTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(ProperTailCallTransformer).call(this, identifierGenerator, reporter, options);
    this.inBlock_ = false;
  }
  return ($traceurRuntime.createClass)(ProperTailCallTransformer, {
    transformFunctionDeclaration: function(tree) {
      tree = $traceurRuntime.superGet(this, ProperTailCallTransformer.prototype, "transformFunctionDeclaration").call(this, tree);
      if (tree.functionKind !== null) {
        return tree;
      }
      var nameIdExpression = id(tree.name.identifierToken);
      var setupFlagExpression = parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.initTailRecursiveFunction(", ")"]), nameIdExpression);
      var funcDecl = this.transformFunction_(tree, FunctionDeclaration);
      if (funcDecl === tree) {
        return tree;
      }
      var tmpVar = id(this.inBlock_ ? this.getTempIdentifier() : this.addTempVar(setupFlagExpression));
      if (!this.inBlock_) {
        return funcDecl;
      }
      return new AnonBlock(null, [funcDecl, parseStatement($traceurRuntime.getTemplateObject(["var ", " = ", ";"]), tmpVar, setupFlagExpression)]);
    },
    transformFunctionExpression: function(tree) {
      tree = $traceurRuntime.superGet(this, ProperTailCallTransformer.prototype, "transformFunctionExpression").call(this, tree);
      if (tree.functionKind) {
        return tree;
      }
      var functionExpression = this.transformFunction_(tree, FunctionExpression);
      if (functionExpression === tree) {
        return tree;
      }
      return parseExpression($traceurRuntime.getTemplateObject(["\n        $traceurRuntime.initTailRecursiveFunction(", ")"]), functionExpression);
    },
    transformFunction_: function(tree, constructor) {
      var body = RewriteTailCallsTransformer.transform(this, tree.body);
      if (body === tree.body) {
        return tree;
      }
      var func = id(this.getTempIdentifier());
      var innerFunction = createFunctionExpression(tree.parameterList, body);
      var outerBody = createFunctionBody(parseStatements($traceurRuntime.getTemplateObject(["\n        return $traceurRuntime.call(", ", this, arguments);"]), innerFunction));
      return new constructor(tree.location, tree.name, tree.functionKind, tree.parameterList, tree.typeAnnotation, tree.annotations, outerBody);
    },
    transformBlock: function(tree) {
      var inBlock = this.inBlock_;
      this.inBlock_ = true;
      var rv = $traceurRuntime.superGet(this, ProperTailCallTransformer.prototype, "transformBlock").call(this, tree);
      this.inBlock_ = inBlock;
      return rv;
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  ProperTailCallTransformer: {get: function() {
      return ProperTailCallTransformer;
    }},
  __esModule: {value: true}
});
