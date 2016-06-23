"use strict";
var $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47__46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_TempVarTransformer_46_js__,
    $___46__46__47__46__46__47_syntax_47_TokenType_46_js__,
    $___46__46__47_ParseTreeFactory_46_js__;
var $__0 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../../syntax/trees/ParseTreeType.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    BLOCK = $__0.BLOCK,
    VARIABLE_DECLARATION_LIST = $__0.VARIABLE_DECLARATION_LIST,
    IDENTIFIER_EXPRESSION = $__0.IDENTIFIER_EXPRESSION;
var $__1 = ($___46__46__47__46__46__47_syntax_47_PredefinedName_46_js__ = require("../../syntax/PredefinedName.js"), $___46__46__47__46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47__46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_PredefinedName_46_js__}),
    LENGTH = $__1.LENGTH,
    PUSH = $__1.PUSH;
var TempVarTransformer = ($___46__46__47_TempVarTransformer_46_js__ = require("../TempVarTransformer.js"), $___46__46__47_TempVarTransformer_46_js__ && $___46__46__47_TempVarTransformer_46_js__.__esModule && $___46__46__47_TempVarTransformer_46_js__ || {default: $___46__46__47_TempVarTransformer_46_js__}).TempVarTransformer;
var $__3 = ($___46__46__47__46__46__47_syntax_47_TokenType_46_js__ = require("../../syntax/TokenType.js"), $___46__46__47__46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47__46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_TokenType_46_js__}),
    BANG = $__3.BANG,
    IN = $__3.IN,
    OPEN_ANGLE = $__3.OPEN_ANGLE,
    PLUS_PLUS = $__3.PLUS_PLUS,
    VAR = $__3.VAR;
var $__4 = ($___46__46__47_ParseTreeFactory_46_js__ = require("../ParseTreeFactory.js"), $___46__46__47_ParseTreeFactory_46_js__ && $___46__46__47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_ParseTreeFactory_46_js__ || {default: $___46__46__47_ParseTreeFactory_46_js__}),
    createArgumentList = $__4.createArgumentList,
    createAssignmentStatement = $__4.createAssignmentStatement,
    createBinaryExpression = $__4.createBinaryExpression,
    createBlock = $__4.createBlock,
    createCallStatement = $__4.createCallStatement,
    createContinueStatement = $__4.createContinueStatement,
    createEmptyArrayLiteral = $__4.createEmptyArrayLiteral,
    createForInStatement = $__4.createForInStatement,
    createForStatement = $__4.createForStatement,
    createIdentifierExpression = $__4.createIdentifierExpression,
    createIfStatement = $__4.createIfStatement,
    createMemberExpression = $__4.createMemberExpression,
    createMemberLookupExpression = $__4.createMemberLookupExpression,
    createNumberLiteral = $__4.createNumberLiteral,
    createOperatorToken = $__4.createOperatorToken,
    createParenExpression = $__4.createParenExpression,
    createPostfixExpression = $__4.createPostfixExpression,
    createUnaryExpression = $__4.createUnaryExpression,
    createVariableDeclarationList = $__4.createVariableDeclarationList,
    createVariableStatement = $__4.createVariableStatement;
var ForInTransformPass = function($__super) {
  function ForInTransformPass() {
    $traceurRuntime.superConstructor(ForInTransformPass).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ForInTransformPass, {transformForInStatement: function(tree) {
      var $__8,
          $__9;
      var bodyStatements = [];
      var body = this.transformAny(tree.body);
      if (body.type === BLOCK) {
        ($__8 = bodyStatements).push.apply($__8, $traceurRuntime.spread(body.statements));
      } else {
        bodyStatements.push(body);
      }
      var elements = [];
      var keys = this.getTempIdentifier();
      elements.push(createVariableStatement(VAR, keys, createEmptyArrayLiteral()));
      var collection = this.getTempIdentifier();
      elements.push(createVariableStatement(VAR, collection, tree.collection));
      var p = this.getTempIdentifier();
      elements.push(createForInStatement(createVariableDeclarationList(VAR, p, null), createIdentifierExpression(collection), createCallStatement(createMemberExpression(keys, PUSH), createArgumentList([createIdentifierExpression(p)]))));
      var i = this.getTempIdentifier();
      var lookup = createMemberLookupExpression(createIdentifierExpression(keys), createIdentifierExpression(i));
      var originalKey,
          assignOriginalKey;
      if (tree.initializer.type === VARIABLE_DECLARATION_LIST) {
        var decList = tree.initializer;
        originalKey = createIdentifierExpression(decList.declarations[0].lvalue);
        assignOriginalKey = createVariableStatement(decList.declarationType, originalKey.identifierToken, lookup);
      } else if (tree.initializer.type === IDENTIFIER_EXPRESSION) {
        originalKey = tree.initializer;
        assignOriginalKey = createAssignmentStatement(tree.initializer, lookup);
      } else {
        throw new Error('Invalid left hand side of for in loop');
      }
      var innerBlock = [];
      innerBlock.push(assignOriginalKey);
      innerBlock.push(createIfStatement(createUnaryExpression(createOperatorToken(BANG), createParenExpression(createBinaryExpression(originalKey, createOperatorToken(IN), createIdentifierExpression(collection)))), createContinueStatement(), null));
      ($__9 = innerBlock).push.apply($__9, $traceurRuntime.spread(bodyStatements));
      elements.push(createForStatement(createVariableDeclarationList(VAR, i, createNumberLiteral(0)), createBinaryExpression(createIdentifierExpression(i), createOperatorToken(OPEN_ANGLE), createMemberExpression(keys, LENGTH)), createPostfixExpression(createIdentifierExpression(i), createOperatorToken(PLUS_PLUS)), createBlock(innerBlock)));
      return createBlock(elements);
    }}, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  ForInTransformPass: {get: function() {
      return ForInTransformPass;
    }},
  __esModule: {value: true}
});
