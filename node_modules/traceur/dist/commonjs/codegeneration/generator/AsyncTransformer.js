"use strict";
var $__AwaitState_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__CPSTransformer_46_js__,
    $__EndState_46_js__,
    $__FallThroughState_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_PlaceholderParser_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__,
    $___46__46__47_FindInFunctionScope_46_js__,
    $___46__46__47_ParseTreeFactory_46_js__;
var AwaitState = ($__AwaitState_46_js__ = require("./AwaitState.js"), $__AwaitState_46_js__ && $__AwaitState_46_js__.__esModule && $__AwaitState_46_js__ || {default: $__AwaitState_46_js__}).AwaitState;
var $__1 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../../syntax/trees/ParseTrees.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    BinaryExpression = $__1.BinaryExpression,
    ExpressionStatement = $__1.ExpressionStatement;
var CPSTransformer = ($__CPSTransformer_46_js__ = require("./CPSTransformer.js"), $__CPSTransformer_46_js__ && $__CPSTransformer_46_js__.__esModule && $__CPSTransformer_46_js__ || {default: $__CPSTransformer_46_js__}).CPSTransformer;
var EndState = ($__EndState_46_js__ = require("./EndState.js"), $__EndState_46_js__ && $__EndState_46_js__.__esModule && $__EndState_46_js__ || {default: $__EndState_46_js__}).EndState;
var FallThroughState = ($__FallThroughState_46_js__ = require("./FallThroughState.js"), $__FallThroughState_46_js__ && $__FallThroughState_46_js__.__esModule && $__FallThroughState_46_js__ || {default: $__FallThroughState_46_js__}).FallThroughState;
var $__5 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../../syntax/trees/ParseTreeType.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    AWAIT_EXPRESSION = $__5.AWAIT_EXPRESSION,
    BINARY_EXPRESSION = $__5.BINARY_EXPRESSION,
    STATE_MACHINE = $__5.STATE_MACHINE;
var $__6 = ($___46__46__47_PlaceholderParser_46_js__ = require("../PlaceholderParser.js"), $___46__46__47_PlaceholderParser_46_js__ && $___46__46__47_PlaceholderParser_46_js__.__esModule && $___46__46__47_PlaceholderParser_46_js__ || {default: $___46__46__47_PlaceholderParser_46_js__}),
    parseExpression = $__6.parseExpression,
    parseStatement = $__6.parseStatement,
    parseStatements = $__6.parseStatements;
var StateMachine = ($___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ = require("../../syntax/trees/StateMachine.js"), $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__}).StateMachine;
var FindInFunctionScope = ($___46__46__47_FindInFunctionScope_46_js__ = require("../FindInFunctionScope.js"), $___46__46__47_FindInFunctionScope_46_js__ && $___46__46__47_FindInFunctionScope_46_js__.__esModule && $___46__46__47_FindInFunctionScope_46_js__ || {default: $___46__46__47_FindInFunctionScope_46_js__}).FindInFunctionScope;
var createUndefinedExpression = ($___46__46__47_ParseTreeFactory_46_js__ = require("../ParseTreeFactory.js"), $___46__46__47_ParseTreeFactory_46_js__ && $___46__46__47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_ParseTreeFactory_46_js__ || {default: $___46__46__47_ParseTreeFactory_46_js__}).createUndefinedExpression;
function isAwaitAssign(tree) {
  return tree.type === BINARY_EXPRESSION && tree.operator.isAssignmentOperator() && tree.right.type === AWAIT_EXPRESSION && tree.left.isLeftHandSideExpression();
}
var AwaitFinder = function($__super) {
  function AwaitFinder() {
    $traceurRuntime.superConstructor(AwaitFinder).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(AwaitFinder, {visitAwaitExpression: function(tree) {
      this.found = true;
    }}, {}, $__super);
}(FindInFunctionScope);
function scopeContainsAwait(tree) {
  var visitor = new AwaitFinder();
  visitor.visitAny(tree);
  return visitor.found;
}
var AsyncTransformer = function($__super) {
  function AsyncTransformer() {
    $traceurRuntime.superConstructor(AsyncTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(AsyncTransformer, {
    expressionNeedsStateMachine: function(tree) {
      if (tree === null)
        return false;
      return scopeContainsAwait(tree);
    },
    transformExpressionStatement: function(tree) {
      var expression = tree.expression;
      if (expression.type === AWAIT_EXPRESSION)
        return this.transformAwaitExpression_(expression);
      if (isAwaitAssign(expression))
        return this.transformAwaitAssign_(expression);
      if (this.expressionNeedsStateMachine(expression)) {
        return this.expressionToStateMachine(expression).machine;
      }
      return $traceurRuntime.superGet(this, AsyncTransformer.prototype, "transformExpressionStatement").call(this, tree);
    },
    transformAwaitExpression: function(tree) {
      throw new Error('Internal error');
    },
    transformAwaitExpression_: function(tree) {
      return this.transformAwait_(tree, tree.expression, null, null);
    },
    transformAwaitAssign_: function(tree) {
      return this.transformAwait_(tree, tree.right.expression, tree.left, tree.operator);
    },
    transformAwait_: function(tree, inExpression, left, operator) {
      var $__14;
      var expression,
          machine;
      if (this.expressionNeedsStateMachine(inExpression)) {
        (($__14 = this.expressionToStateMachine(inExpression), expression = $__14.expression, machine = $__14.machine, $__14));
      } else {
        expression = this.transformAny(inExpression);
      }
      var createTaskState = this.allocateState();
      var fallThroughState = this.allocateState();
      var callbackState = left ? this.allocateState() : fallThroughState;
      var states = [];
      states.push(new AwaitState(createTaskState, callbackState, expression));
      if (left) {
        var statement = new ExpressionStatement(tree.location, new BinaryExpression(tree.location, left, operator, parseExpression($traceurRuntime.getTemplateObject(["$ctx.value"]))));
        states.push(new FallThroughState(callbackState, fallThroughState, [statement]));
      }
      var awaitMachine = new StateMachine(createTaskState, fallThroughState, states, []);
      if (machine) {
        awaitMachine = machine.append(awaitMachine);
      }
      return awaitMachine;
    },
    transformFinally: function(tree) {
      var result = $traceurRuntime.superGet(this, AsyncTransformer.prototype, "transformFinally").call(this, tree);
      if (result.block.type !== STATE_MACHINE) {
        return result;
      }
      this.reporter.reportError(tree.location, 'await not permitted within a finally block.');
      return result;
    },
    transformReturnStatement: function(tree) {
      var $__14;
      var expression,
          machine;
      if (this.expressionNeedsStateMachine(tree.expression)) {
        (($__14 = this.expressionToStateMachine(tree.expression), expression = $__14.expression, machine = $__14.machine, $__14));
      } else {
        expression = tree.expression || createUndefinedExpression();
      }
      var startState = this.allocateState();
      var endState = this.allocateState();
      var completeState = new FallThroughState(startState, endState, parseStatements($traceurRuntime.getTemplateObject(["$ctx.returnValue = ", ""]), expression));
      var end = new EndState(endState);
      var returnMachine = new StateMachine(startState, this.allocateState(), [completeState, end], []);
      if (machine)
        returnMachine = machine.append(returnMachine);
      return returnMachine;
    },
    createCompleteTask_: function(result) {
      return parseStatement($traceurRuntime.getTemplateObject(["$ctx.resolve(", ")"]), result);
    },
    transformAsyncBody: function(tree) {
      var runtimeFunction = parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.asyncWrap"]));
      return this.transformCpsFunctionBody(tree, runtimeFunction);
    }
  }, {transformAsyncBody: function(identifierGenerator, reporter, options, body) {
      return new AsyncTransformer(identifierGenerator, reporter, options).transformAsyncBody(body);
    }}, $__super);
}(CPSTransformer);
;
Object.defineProperties(module.exports, {
  AsyncTransformer: {get: function() {
      return AsyncTransformer;
    }},
  __esModule: {value: true}
});
