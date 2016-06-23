"use strict";
var $__alphaRenameThisAndArguments_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__,
    $__TempVarTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__SkipFunctionsTransformerTrait_46_js__,
    $___46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__;
var alphaRenameThisAndArguments = ($__alphaRenameThisAndArguments_46_js__ = require("./alphaRenameThisAndArguments.js"), $__alphaRenameThisAndArguments_46_js__ && $__alphaRenameThisAndArguments_46_js__.__esModule && $__alphaRenameThisAndArguments_46_js__ || {default: $__alphaRenameThisAndArguments_46_js__}).default;
var $__1 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createArgumentList = $__1.createArgumentList,
    createBlock = $__1.createBlock,
    createFunctionBody = $__1.createFunctionBody,
    id = $__1.createIdentifierExpression,
    createMemberExpression = $__1.createMemberExpression,
    createThisExpression = $__1.createThisExpression,
    createVariableDeclaration = $__1.createVariableDeclaration,
    createVariableDeclarationList = $__1.createVariableDeclarationList,
    createVariableStatement = $__1.createVariableStatement;
var parseStatement = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseStatement;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var $__4 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AwaitExpression = $__4.AwaitExpression,
    Block = $__4.Block,
    CallExpression = $__4.CallExpression,
    Catch = $__4.Catch;
var SkipFunctionsTransformerTrait = ($__SkipFunctionsTransformerTrait_46_js__ = require("./SkipFunctionsTransformerTrait.js"), $__SkipFunctionsTransformerTrait_46_js__ && $__SkipFunctionsTransformerTrait_46_js__.__esModule && $__SkipFunctionsTransformerTrait_46_js__ || {default: $__SkipFunctionsTransformerTrait_46_js__}).default;
var ARGUMENTS = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}).ARGUMENTS;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var AsyncGeneratorTransformer = function($__super) {
  function AsyncGeneratorTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(AsyncGeneratorTransformer).call(this, identifierGenerator, reporter, options);
    this.variableDeclarations_ = [];
    this.ctx_ = id(this.getTempIdentifier());
  }
  return ($traceurRuntime.createClass)(AsyncGeneratorTransformer, {
    transformYieldExpression: function(tree) {
      var argList = createArgumentList([tree.expression]);
      if (tree.isYieldFor) {
        return new AwaitExpression(tree.location, new CallExpression(null, createMemberExpression(this.ctx_, 'yieldFor'), argList));
      }
      return new CallExpression(tree.location, createMemberExpression(this.ctx_, 'yield'), argList);
    },
    transformCatch: function(tree) {
      var body = tree.catchBody;
      body = new Block(body.location, $traceurRuntime.spread([parseStatement($traceurRuntime.getTemplateObject(["\n        if (", ".inReturn) {\n          throw undefined;\n        }"]), this.ctx_)], body.statements));
      return new Catch(tree.location, tree.binding, body);
    },
    transformAsyncGeneratorBody_: function(tree, name) {
      tree = this.transformAny(tree);
      tree = alphaRenameThisAndArguments(this, tree);
      var statements = [];
      if (this.variableDeclarations_.length > 0) {
        statements.push(createVariableStatement(createVariableDeclarationList(VAR, this.variableDeclarations_)));
      }
      var body = createBlock(tree.statements);
      statements.push(parseStatement($traceurRuntime.getTemplateObject(["\n        return $traceurRuntime.createAsyncGeneratorInstance(\n            async function (", ") {\n                ", "\n            }, ", ");"]), this.ctx_, body, name));
      return createFunctionBody(statements);
    },
    addTempVarForArguments: function() {
      var tmpVarName = this.getTempIdentifier();
      this.variableDeclarations_.push(createVariableDeclaration(tmpVarName, id(ARGUMENTS)));
      return tmpVarName;
    },
    addTempVarForThis: function() {
      var tmpVarName = this.getTempIdentifier();
      this.variableDeclarations_.push(createVariableDeclaration(tmpVarName, createThisExpression()));
      return tmpVarName;
    }
  }, {transformAsyncGeneratorBody: function(identifierGenerator, reporter, options, body, name) {
      return new AsyncGeneratorTransformer(identifierGenerator, reporter, options).transformAsyncGeneratorBody_(body, name);
    }}, $__super);
}(SkipFunctionsTransformerTrait(TempVarTransformer));
Object.defineProperties(module.exports, {
  AsyncGeneratorTransformer: {get: function() {
      return AsyncGeneratorTransformer;
    }},
  __esModule: {value: true}
});
