"use strict";
var $___46__46__47_ParseTreeFactory_46_js__,
    $___46__46__47_PlaceholderParser_46_js__;
var $__0 = ($___46__46__47_ParseTreeFactory_46_js__ = require("../ParseTreeFactory.js"), $___46__46__47_ParseTreeFactory_46_js__ && $___46__46__47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_ParseTreeFactory_46_js__ || {default: $___46__46__47_ParseTreeFactory_46_js__}),
    createAssignStateStatement = $__0.createAssignStateStatement,
    createBreakStatement = $__0.createBreakStatement,
    createCaseClause = $__0.createCaseClause,
    createNumberLiteral = $__0.createNumberLiteral;
var parseStatement = ($___46__46__47_PlaceholderParser_46_js__ = require("../PlaceholderParser.js"), $___46__46__47_PlaceholderParser_46_js__ && $___46__46__47_PlaceholderParser_46_js__.__esModule && $___46__46__47_PlaceholderParser_46_js__ || {default: $___46__46__47_PlaceholderParser_46_js__}).parseStatement;
var State = function() {
  function State(id) {
    this.id = id;
  }
  return ($traceurRuntime.createClass)(State, {
    transformMachineState: function(enclosingFinally, machineEndState, reporter) {
      return createCaseClause(createNumberLiteral(this.id), this.transform(enclosingFinally, machineEndState, reporter));
    },
    transformBreak: function(labelSet, breakState) {
      return this;
    },
    transformBreakOrContinue: function(labelSet) {
      var breakState = arguments[1];
      var continueState = arguments[2];
      return this;
    }
  }, {});
}();
State.START_STATE = 0;
State.INVALID_STATE = -1;
State.END_STATE = -2;
State.RETHROW_STATE = -3;
State.generateJump = function(enclosingFinally, fallThroughState) {
  return $traceurRuntime.spread(State.generateAssignState(enclosingFinally, fallThroughState), [createBreakStatement()]);
};
State.generateAssignState = function(enclosingFinally, fallThroughState) {
  var assignState;
  if (State.isFinallyExit(enclosingFinally, fallThroughState)) {
    assignState = generateAssignStateOutOfFinally(enclosingFinally, fallThroughState);
  } else {
    assignState = [createAssignStateStatement(fallThroughState)];
  }
  return assignState;
};
State.isFinallyExit = function(enclosingFinally, destination) {
  return !!enclosingFinally && enclosingFinally.tryStates.indexOf(destination) < 0;
};
function generateAssignStateOutOfFinally(enclosingFinally, destination) {
  var finallyState = enclosingFinally.finallyState;
  return [createAssignStateStatement(finallyState), parseStatement($traceurRuntime.getTemplateObject(["$ctx.finallyFallThrough = ", ""]), destination)];
}
State.replaceStateList = function(oldStates, oldState, newState) {
  var states = [];
  for (var i = 0; i < oldStates.length; i++) {
    states.push(State.replaceStateId(oldStates[i], oldState, newState));
  }
  return states;
};
State.replaceStateId = function(current, oldState, newState) {
  return current === oldState ? newState : current;
};
State.replaceAllStates = function(exceptionBlocks, oldState, newState) {
  var result = [];
  for (var i = 0; i < exceptionBlocks.length; i++) {
    result.push(exceptionBlocks[i].replaceState(oldState, newState));
  }
  return result;
};
Object.defineProperties(module.exports, {
  State: {get: function() {
      return State;
    }},
  __esModule: {value: true}
});
