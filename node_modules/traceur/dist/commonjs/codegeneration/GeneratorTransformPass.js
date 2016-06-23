"use strict";
var $__ArrowFunctionTransformer_46_js__,
    $__generator_47_AsyncTransformer_46_js__,
    $__generator_47_ForInTransformPass_46_js__,
    $__generator_47_GeneratorTransformer_46_js__,
    $__PlaceholderParser_46_js__,
    $__TempVarTransformer_46_js__,
    $__FindInFunctionScope_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__ParseTreeFactory_46_js__;
var ArrowFunctionTransformer = ($__ArrowFunctionTransformer_46_js__ = require("./ArrowFunctionTransformer.js"), $__ArrowFunctionTransformer_46_js__ && $__ArrowFunctionTransformer_46_js__.__esModule && $__ArrowFunctionTransformer_46_js__ || {default: $__ArrowFunctionTransformer_46_js__}).ArrowFunctionTransformer;
var AsyncTransformer = ($__generator_47_AsyncTransformer_46_js__ = require("./generator/AsyncTransformer.js"), $__generator_47_AsyncTransformer_46_js__ && $__generator_47_AsyncTransformer_46_js__.__esModule && $__generator_47_AsyncTransformer_46_js__ || {default: $__generator_47_AsyncTransformer_46_js__}).AsyncTransformer;
var ForInTransformPass = ($__generator_47_ForInTransformPass_46_js__ = require("./generator/ForInTransformPass.js"), $__generator_47_ForInTransformPass_46_js__ && $__generator_47_ForInTransformPass_46_js__.__esModule && $__generator_47_ForInTransformPass_46_js__ || {default: $__generator_47_ForInTransformPass_46_js__}).ForInTransformPass;
var GeneratorTransformer = ($__generator_47_GeneratorTransformer_46_js__ = require("./generator/GeneratorTransformer.js"), $__generator_47_GeneratorTransformer_46_js__ && $__generator_47_GeneratorTransformer_46_js__.__esModule && $__generator_47_GeneratorTransformer_46_js__ || {default: $__generator_47_GeneratorTransformer_46_js__}).GeneratorTransformer;
var $__4 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseExpression = $__4.parseExpression,
    parseStatement = $__4.parseStatement;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var FindInFunctionScope = ($__FindInFunctionScope_46_js__ = require("./FindInFunctionScope.js"), $__FindInFunctionScope_46_js__ && $__FindInFunctionScope_46_js__.__esModule && $__FindInFunctionScope_46_js__ || {default: $__FindInFunctionScope_46_js__}).FindInFunctionScope;
var $__7 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__7.AnonBlock,
    FunctionDeclaration = $__7.FunctionDeclaration,
    FunctionExpression = $__7.FunctionExpression;
var $__8 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createBindingIdentifier = $__8.createBindingIdentifier,
    id = $__8.createIdentifierExpression,
    createIdentifierToken = $__8.createIdentifierToken;
var ForInFinder = function($__super) {
  function ForInFinder() {
    $traceurRuntime.superConstructor(ForInFinder).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ForInFinder, {visitForInStatement: function(tree) {
      this.found = true;
    }}, {}, $__super);
}(FindInFunctionScope);
function needsTransform(tree, transformOptions) {
  return transformOptions.generators && tree.isGenerator() || transformOptions.asyncFunctions && tree.isAsyncFunction();
}
var GeneratorTransformPass = function($__super) {
  function GeneratorTransformPass(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(GeneratorTransformPass).call(this, identifierGenerator, reporter, options);
    this.tranformOptions_ = options.transformOptions;
    this.inBlock_ = false;
  }
  return ($traceurRuntime.createClass)(GeneratorTransformPass, {
    transformFunctionDeclaration: function(tree) {
      if (!needsTransform(tree, this.tranformOptions_))
        return $traceurRuntime.superGet(this, GeneratorTransformPass.prototype, "transformFunctionDeclaration").call(this, tree);
      if (tree.isGenerator())
        return this.transformGeneratorDeclaration_(tree);
      return this.transformFunction_(tree, FunctionDeclaration, null);
    },
    transformGeneratorDeclaration_: function(tree) {
      var nameIdExpression = id(tree.name.identifierToken);
      var setupPrototypeExpression = parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.initGeneratorFunction(", ")"]), nameIdExpression);
      var tmpVar = id(this.inBlock_ ? this.getTempIdentifier() : this.addTempVar(setupPrototypeExpression));
      var funcDecl = this.transformFunction_(tree, FunctionDeclaration, tmpVar);
      if (!this.inBlock_)
        return funcDecl;
      return new AnonBlock(null, [funcDecl, parseStatement($traceurRuntime.getTemplateObject(["var ", " = ", ""]), tmpVar, setupPrototypeExpression)]);
    },
    transformFunctionExpression: function(tree) {
      if (!needsTransform(tree, this.tranformOptions_))
        return $traceurRuntime.superGet(this, GeneratorTransformPass.prototype, "transformFunctionExpression").call(this, tree);
      if (tree.isGenerator())
        return this.transformGeneratorExpression_(tree);
      return this.transformFunction_(tree, FunctionExpression, null);
    },
    transformGeneratorExpression_: function(tree) {
      var name;
      if (!tree.name) {
        name = createIdentifierToken(this.getTempIdentifier());
        tree = new FunctionExpression(tree.location, createBindingIdentifier(name), tree.functionKind, tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body);
      } else {
        name = tree.name.identifierToken;
      }
      var functionExpression = this.transformFunction_(tree, FunctionExpression, id(name));
      return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.initGeneratorFunction(", ")"]), functionExpression);
    },
    transformFunction_: function(tree, constructor, nameExpression) {
      var body = $traceurRuntime.superGet(this, GeneratorTransformPass.prototype, "transformAny").call(this, tree.body);
      var finder = new ForInFinder();
      finder.visitAny(body);
      if (finder.found) {
        body = new ForInTransformPass(this.identifierGenerator, this.reporter, this.options).transformAny(body);
      }
      if (this.tranformOptions_.generators && tree.isGenerator()) {
        body = GeneratorTransformer.transformGeneratorBody(this.identifierGenerator, this.reporter, this.options, body, nameExpression);
      } else if (this.tranformOptions_.asyncFunctions && tree.isAsyncFunction()) {
        body = AsyncTransformer.transformAsyncBody(this.identifierGenerator, this.reporter, this.options, body);
      }
      var functionKind = null;
      return new constructor(tree.location, tree.name, functionKind, tree.parameterList, tree.typeAnnotation || null, tree.annotations || null, body);
    },
    transformArrowFunction: function(tree) {
      if (!tree.isAsyncFunction())
        return $traceurRuntime.superGet(this, GeneratorTransformPass.prototype, "transformArrowFunction").call(this, tree);
      return this.transformAny(ArrowFunctionTransformer.transform(this, tree));
    },
    transformBlock: function(tree) {
      var inBlock = this.inBlock_;
      this.inBlock_ = true;
      var rv = $traceurRuntime.superGet(this, GeneratorTransformPass.prototype, "transformBlock").call(this, tree);
      this.inBlock_ = inBlock;
      return rv;
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  GeneratorTransformPass: {get: function() {
      return GeneratorTransformPass;
    }},
  __esModule: {value: true}
});
