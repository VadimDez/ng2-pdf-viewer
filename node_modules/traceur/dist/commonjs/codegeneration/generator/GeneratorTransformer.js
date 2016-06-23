"use strict";
var $__CPSTransformer_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_FindInFunctionScope_46_js__,
    $__ReturnState_46_js__,
    $__YieldState_46_js__,
    $___46__46__47_ParseTreeFactory_46_js__,
    $___46__46__47_PlaceholderParser_46_js__;
var CPSTransformer = ($__CPSTransformer_46_js__ = require("./CPSTransformer.js"), $__CPSTransformer_46_js__ && $__CPSTransformer_46_js__.__esModule && $__CPSTransformer_46_js__ || {default: $__CPSTransformer_46_js__}).CPSTransformer;
var $__1 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../../syntax/trees/ParseTreeType.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    BINARY_EXPRESSION = $__1.BINARY_EXPRESSION,
    YIELD_EXPRESSION = $__1.YIELD_EXPRESSION;
var $__2 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../../syntax/trees/ParseTrees.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    BinaryExpression = $__2.BinaryExpression,
    ExpressionStatement = $__2.ExpressionStatement;
var FindInFunctionScope = ($___46__46__47_FindInFunctionScope_46_js__ = require("../FindInFunctionScope.js"), $___46__46__47_FindInFunctionScope_46_js__ && $___46__46__47_FindInFunctionScope_46_js__.__esModule && $___46__46__47_FindInFunctionScope_46_js__ || {default: $___46__46__47_FindInFunctionScope_46_js__}).FindInFunctionScope;
var ReturnState = ($__ReturnState_46_js__ = require("./ReturnState.js"), $__ReturnState_46_js__ && $__ReturnState_46_js__.__esModule && $__ReturnState_46_js__ || {default: $__ReturnState_46_js__}).ReturnState;
var YieldState = ($__YieldState_46_js__ = require("./YieldState.js"), $__YieldState_46_js__ && $__YieldState_46_js__.__esModule && $__YieldState_46_js__ || {default: $__YieldState_46_js__}).YieldState;
var $__6 = ($___46__46__47_ParseTreeFactory_46_js__ = require("../ParseTreeFactory.js"), $___46__46__47_ParseTreeFactory_46_js__ && $___46__46__47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_ParseTreeFactory_46_js__ || {default: $___46__46__47_ParseTreeFactory_46_js__}),
    id = $__6.createIdentifierExpression,
    createMemberExpression = $__6.createMemberExpression,
    createUndefinedExpression = $__6.createUndefinedExpression;
var $__7 = ($___46__46__47_PlaceholderParser_46_js__ = require("../PlaceholderParser.js"), $___46__46__47_PlaceholderParser_46_js__ && $___46__46__47_PlaceholderParser_46_js__.__esModule && $___46__46__47_PlaceholderParser_46_js__ || {default: $___46__46__47_PlaceholderParser_46_js__}),
    parseExpression = $__7.parseExpression,
    parseStatement = $__7.parseStatement,
    parseStatements = $__7.parseStatements;
function isYieldAssign(tree) {
  return tree.type === BINARY_EXPRESSION && tree.operator.isAssignmentOperator() && tree.right.type === YIELD_EXPRESSION && tree.left.isLeftHandSideExpression();
}
var YieldFinder = function($__super) {
  function YieldFinder() {
    $traceurRuntime.superConstructor(YieldFinder).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(YieldFinder, {visitYieldExpression: function(tree) {
      this.found = true;
    }}, {}, $__super);
}(FindInFunctionScope);
function scopeContainsYield(tree) {
  var finder = new YieldFinder();
  finder.visitAny(tree);
  return finder.found;
}
var GeneratorTransformer = function($__super) {
  function GeneratorTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(GeneratorTransformer).call(this, identifierGenerator, reporter, options);
    this.shouldAppendThrowCloseState_ = true;
  }
  return ($traceurRuntime.createClass)(GeneratorTransformer, {
    expressionNeedsStateMachine: function(tree) {
      if (tree === null)
        return false;
      return scopeContainsYield(tree);
    },
    transformYieldExpression_: function(tree) {
      var $__12;
      var expression,
          machine;
      if (this.expressionNeedsStateMachine(tree.expression)) {
        (($__12 = this.expressionToStateMachine(tree.expression), expression = $__12.expression, machine = $__12.machine, $__12));
      } else {
        expression = this.transformAny(tree.expression);
      }
      if (tree.isYieldFor)
        return this.transformYieldForExpression_(expression, machine);
      var startState = this.allocateState();
      var fallThroughState = this.allocateState();
      var yieldMachine = this.stateToStateMachine_(new YieldState(startState, fallThroughState, expression), fallThroughState);
      if (machine)
        yieldMachine = machine.append(yieldMachine);
      if (this.shouldAppendThrowCloseState_)
        yieldMachine = yieldMachine.append(this.createThrowCloseState_());
      return yieldMachine;
    },
    transformYieldForExpression_: function(expression) {
      var machine = arguments[1];
      var gName = this.getTempIdentifier();
      this.addMachineVariable(gName);
      var g = id(gName);
      var nextName = this.getTempIdentifier();
      this.addMachineVariable(nextName);
      var next = id(nextName);
      var statements = parseStatements($traceurRuntime.getTemplateObject(["\n        ", " = $ctx.wrapYieldStar(", "[Symbol.iterator]());\n        // received = void 0;\n        $ctx.sent = void 0;\n        // send = true; // roughly equivalent\n        $ctx.action = 'next';\n\n        for (;;) {\n          ", " = ", "[$ctx.action]($ctx.sentIgnoreThrow);\n          if (", ".done) {\n            $ctx.sent = ", ".value;\n            break;\n          }\n          yield ", ".value;\n        }"]), g, expression, next, g, next, next, next);
      var shouldAppendThrowCloseState = this.shouldAppendThrowCloseState_;
      this.shouldAppendThrowCloseState_ = false;
      statements = this.transformList(statements);
      var yieldMachine = this.transformStatementList_(statements);
      this.shouldAppendThrowCloseState_ = shouldAppendThrowCloseState;
      if (machine)
        yieldMachine = machine.append(yieldMachine);
      return yieldMachine;
    },
    transformYieldExpression: function(tree) {
      this.reporter.reportError(tree.location, 'Only \'a = yield b\' and \'var a = yield b\' currently supported.');
      return tree;
    },
    transformYieldAssign_: function(tree) {
      var shouldAppendThrowCloseState = this.shouldAppendThrowCloseState_;
      this.shouldAppendThrowCloseState_ = false;
      var machine = this.transformYieldExpression_(tree.right);
      var left = this.transformAny(tree.left);
      var sentExpression = tree.right.isYieldFor ? parseExpression($traceurRuntime.getTemplateObject(["$ctx.sentIgnoreThrow"])) : parseExpression($traceurRuntime.getTemplateObject(["$ctx.sent"]));
      var statement = new ExpressionStatement(tree.location, new BinaryExpression(tree.location, left, tree.operator, sentExpression));
      var assignMachine = this.statementToStateMachine_(statement);
      this.shouldAppendThrowCloseState_ = shouldAppendThrowCloseState;
      return machine.append(assignMachine);
    },
    createThrowCloseState_: function() {
      return this.statementToStateMachine_(parseStatement($traceurRuntime.getTemplateObject(["$ctx.maybeThrow()"])));
    },
    transformExpressionStatement: function(tree) {
      var expression = tree.expression;
      if (expression.type === YIELD_EXPRESSION)
        return this.transformYieldExpression_(expression);
      if (isYieldAssign(expression))
        return this.transformYieldAssign_(expression);
      if (this.expressionNeedsStateMachine(expression)) {
        return this.expressionToStateMachine(expression).machine;
      }
      return $traceurRuntime.superGet(this, GeneratorTransformer.prototype, "transformExpressionStatement").call(this, tree);
    },
    transformAwaitStatement: function(tree) {
      this.reporter.reportError(tree.location, 'Generator function may not have an await statement.');
      return tree;
    },
    transformReturnStatement: function(tree) {
      var $__12;
      var expression,
          machine;
      if (this.expressionNeedsStateMachine(tree.expression))
        (($__12 = this.expressionToStateMachine(tree.expression), expression = $__12.expression, machine = $__12.machine, $__12));
      else
        expression = tree.expression;
      var startState = this.allocateState();
      var fallThroughState = this.allocateState();
      var returnMachine = this.stateToStateMachine_(new ReturnState(startState, fallThroughState, this.transformAny(expression)), fallThroughState);
      if (machine)
        return machine.append(returnMachine);
      return returnMachine;
    },
    transformGeneratorBody: function(tree, name) {
      var runtimeFunction = parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.createGeneratorInstance"]));
      return this.transformCpsFunctionBody(tree, runtimeFunction, name);
    }
  }, {transformGeneratorBody: function(identifierGenerator, reporter, options, body, name) {
      return new GeneratorTransformer(identifierGenerator, reporter, options).transformGeneratorBody(body, name);
    }}, $__super);
}(CPSTransformer);
;
Object.defineProperties(module.exports, {
  GeneratorTransformer: {get: function() {
      return GeneratorTransformer;
    }},
  __esModule: {value: true}
});
