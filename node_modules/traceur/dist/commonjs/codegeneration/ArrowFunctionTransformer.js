"use strict";
var $___46__46__47_syntax_47_PredefinedName_46_js__,
    $__AlphaRenamer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__TempVarTransformer_46_js__,
    $__ParenTrait_46_js__,
    $__alphaRenameThisAndArguments_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__FindThisOrArguments_46_js__,
    $__ParseTreeFactory_46_js__;
var $__0 = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}),
    ARGUMENTS = $__0.ARGUMENTS,
    CONSTRUCTOR = $__0.CONSTRUCTOR,
    THIS = $__0.THIS;
var AlphaRenamer = ($__AlphaRenamer_46_js__ = require("./AlphaRenamer.js"), $__AlphaRenamer_46_js__ && $__AlphaRenamer_46_js__.__esModule && $__AlphaRenamer_46_js__ || {default: $__AlphaRenamer_46_js__}).AlphaRenamer;
var FunctionExpression = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}).FunctionExpression;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var ParenTrait = ($__ParenTrait_46_js__ = require("./ParenTrait.js"), $__ParenTrait_46_js__ && $__ParenTrait_46_js__.__esModule && $__ParenTrait_46_js__ || {default: $__ParenTrait_46_js__}).ParenTrait;
var alphaRenameThisAndArguments = ($__alphaRenameThisAndArguments_46_js__ = require("./alphaRenameThisAndArguments.js"), $__alphaRenameThisAndArguments_46_js__ && $__alphaRenameThisAndArguments_46_js__.__esModule && $__alphaRenameThisAndArguments_46_js__ || {default: $__alphaRenameThisAndArguments_46_js__}).default;
var $__6 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    FUNCTION_BODY = $__6.FUNCTION_BODY,
    LITERAL_PROPERTY_NAME = $__6.LITERAL_PROPERTY_NAME;
var FindThisOrArguments = ($__FindThisOrArguments_46_js__ = require("./FindThisOrArguments.js"), $__FindThisOrArguments_46_js__ && $__FindThisOrArguments_46_js__.__esModule && $__FindThisOrArguments_46_js__ || {default: $__FindThisOrArguments_46_js__}).FindThisOrArguments;
var $__8 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createAssignmentExpression = $__8.createAssignmentExpression,
    createCommaExpression = $__8.createCommaExpression,
    createFunctionBody = $__8.createFunctionBody,
    createIdentifierExpression = $__8.createIdentifierExpression,
    createReturnStatement = $__8.createReturnStatement,
    createThisExpression = $__8.createThisExpression;
function convertConciseBody(tree) {
  if (tree.type !== FUNCTION_BODY)
    return createFunctionBody([createReturnStatement(tree)]);
  return tree;
}
var ArrowFunctionTransformer = function($__super) {
  function ArrowFunctionTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(ArrowFunctionTransformer).call(this, identifierGenerator, reporter, options);
    this.inDerivedClass_ = false;
    this.inConstructor_ = false;
  }
  return ($traceurRuntime.createClass)(ArrowFunctionTransformer, {
    transformArrowFunction: function(tree) {
      if (this.inDerivedClass_ && this.inConstructor_) {
        return this.transformUsingCommaExpression_(tree);
      }
      return this.transformUsingTempVar_(tree);
    },
    transformUsingCommaExpression_: function(tree) {
      var finder = new FindThisOrArguments();
      var argumentsTempName,
          thisTempName;
      finder.visitAny(tree);
      if (finder.foundArguments) {
        argumentsTempName = this.addTempVar();
        tree = AlphaRenamer.rename(tree, ARGUMENTS, argumentsTempName);
      }
      if (finder.foundThis) {
        thisTempName = this.addTempVar();
        tree = AlphaRenamer.rename(tree, THIS, thisTempName);
      }
      var parameterList = this.transformAny(tree.parameterList);
      var body = this.transformAny(tree.body);
      body = convertConciseBody(body);
      var functionExpression = new FunctionExpression(tree.location, null, tree.functionKind, parameterList, null, [], body);
      var expressions = [];
      if (argumentsTempName) {
        expressions.push(createAssignmentExpression(createIdentifierExpression(argumentsTempName), createIdentifierExpression(ARGUMENTS)));
      }
      if (thisTempName) {
        expressions.push(createAssignmentExpression(createIdentifierExpression(thisTempName), createThisExpression()));
      }
      if (expressions.length === 0) {
        return functionExpression;
      }
      expressions.push(functionExpression);
      return createCommaExpression(expressions);
    },
    transformUsingTempVar_: function(tree) {
      var alphaRenamed = alphaRenameThisAndArguments(this, tree);
      var parameterList = this.transformAny(alphaRenamed.parameterList);
      var body = this.transformAny(alphaRenamed.body);
      body = convertConciseBody(body);
      var functionExpression = new FunctionExpression(tree.location, null, tree.functionKind, parameterList, null, [], body);
      return functionExpression;
    },
    transformClassExpression: function(tree) {
      var inDerivedClass = this.inDerivedClass_;
      this.inDerivedClass_ = tree.superClass !== null;
      var result = $traceurRuntime.superGet(this, ArrowFunctionTransformer.prototype, "transformClassExpression").call(this, tree);
      this.inDerivedClass_ = inDerivedClass;
      return result;
    },
    transformClassDeclaration: function(tree) {
      var inDerivedClass = this.inDerivedClass_;
      this.inDerivedClass_ = tree.superClass !== null;
      var result = $traceurRuntime.superGet(this, ArrowFunctionTransformer.prototype, "transformClassDeclaration").call(this, tree);
      this.inDerivedClass_ = inDerivedClass;
      return result;
    },
    transformMethod: function(tree) {
      var inConstructor = this.inConstructor_;
      this.inConstructor_ = !tree.isStatic && tree.functionKind === null && tree.name.type === LITERAL_PROPERTY_NAME && tree.name.literalToken.value === CONSTRUCTOR;
      var result = $traceurRuntime.superGet(this, ArrowFunctionTransformer.prototype, "transformMethod").call(this, tree);
      this.inConstructor_ = inConstructor;
      return result;
    }
  }, {transform: function(tempVarTransformer, tree) {
      tree = alphaRenameThisAndArguments(tempVarTransformer, tree);
      var body = convertConciseBody(tree.body);
      return new FunctionExpression(tree.location, null, tree.functionKind, tree.parameterList, null, [], body);
    }}, $__super);
}(ParenTrait(TempVarTransformer));
Object.defineProperties(module.exports, {
  ArrowFunctionTransformer: {get: function() {
      return ArrowFunctionTransformer;
    }},
  __esModule: {value: true}
});
