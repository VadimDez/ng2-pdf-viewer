"use strict";
var $__AsyncGeneratorTransformer_46_js__,
    $__TempVarTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__;
var AsyncGeneratorTransformer = ($__AsyncGeneratorTransformer_46_js__ = require("./AsyncGeneratorTransformer.js"), $__AsyncGeneratorTransformer_46_js__ && $__AsyncGeneratorTransformer_46_js__.__esModule && $__AsyncGeneratorTransformer_46_js__ || {default: $__AsyncGeneratorTransformer_46_js__}).AsyncGeneratorTransformer;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var $__2 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__2.AnonBlock,
    FunctionDeclaration = $__2.FunctionDeclaration,
    FunctionExpression = $__2.FunctionExpression;
var $__3 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createBindingIdentifier = $__3.createBindingIdentifier,
    id = $__3.createIdentifierExpression,
    createIdentifierToken = $__3.createIdentifierToken;
var $__4 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseExpression = $__4.parseExpression,
    parseStatement = $__4.parseStatement;
var AsyncGeneratorTransformPass = function($__super) {
  function AsyncGeneratorTransformPass(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(AsyncGeneratorTransformPass).call(this, identifierGenerator, reporter, options);
    this.transformOptions_ = options.transformOptions;
    this.inBlock_ = false;
  }
  return ($traceurRuntime.createClass)(AsyncGeneratorTransformPass, {
    needsTransform_: function(tree) {
      return this.transformOptions_.asyncGenerators && tree.isAsyncGenerator();
    },
    transformFunctionDeclaration: function(tree) {
      if (!this.needsTransform_(tree))
        return $traceurRuntime.superGet(this, AsyncGeneratorTransformPass.prototype, "transformFunctionDeclaration").call(this, tree);
      var nameIdExpression = id(tree.name.identifierToken);
      var setupPrototypeExpression = parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.initAsyncGeneratorFunction(", ")"]), nameIdExpression);
      var tmpVar = id(this.inBlock_ ? this.getTempIdentifier() : this.addTempVar(setupPrototypeExpression));
      var funcDecl = this.transformFunction_(tree, FunctionDeclaration, tmpVar);
      if (!this.inBlock_)
        return funcDecl;
      return new AnonBlock(null, [funcDecl, parseStatement($traceurRuntime.getTemplateObject(["var ", " = ", ""]), tmpVar, setupPrototypeExpression)]);
    },
    transformFunctionExpression: function(tree) {
      if (!this.needsTransform_(tree)) {
        return $traceurRuntime.superGet(this, AsyncGeneratorTransformPass.prototype, "transformFunctionExpression").call(this, tree);
      }
      var name;
      if (!tree.name) {
        name = createIdentifierToken(this.getTempIdentifier());
        tree = new FunctionExpression(tree.location, createBindingIdentifier(name), tree.functionKind, tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body);
      } else {
        name = tree.name.identifierToken;
      }
      var functionExpression = this.transformFunction_(tree, FunctionExpression, id(name));
      return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.initAsyncGeneratorFunction(", ")"]), functionExpression);
    },
    transformFunction_: function(tree, constructor, nameExpression) {
      var body = $traceurRuntime.superGet(this, AsyncGeneratorTransformPass.prototype, "transformAny").call(this, tree.body);
      body = AsyncGeneratorTransformer.transformAsyncGeneratorBody(this.identifierGenerator, this.reporter, this.options, body, nameExpression);
      var functionKind = null;
      return new constructor(tree.location, tree.name, functionKind, tree.parameterList, tree.typeAnnotation || null, tree.annotations || null, body);
    },
    transformBlock: function(tree) {
      var inBlock = this.inBlock_;
      this.inBlock_ = true;
      var rv = $traceurRuntime.superGet(this, AsyncGeneratorTransformPass.prototype, "transformBlock").call(this, tree);
      this.inBlock_ = inBlock;
      return rv;
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  AsyncGeneratorTransformPass: {get: function() {
      return AsyncGeneratorTransformPass;
    }},
  __esModule: {value: true}
});
