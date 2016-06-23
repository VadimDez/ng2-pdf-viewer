"use strict";
var $__ParseTree_46_js__,
    $__ParseTreeType_46_js__,
    $___46__46__47__46__46__47_codegeneration_47_generator_47_State_46_js__,
    $___46__46__47__46__46__47_codegeneration_47_generator_47_TryState_46_js__;
var ParseTree = ($__ParseTree_46_js__ = require("./ParseTree.js"), $__ParseTree_46_js__ && $__ParseTree_46_js__.__esModule && $__ParseTree_46_js__ || {default: $__ParseTree_46_js__}).ParseTree;
var STATE_MACHINE = ($__ParseTreeType_46_js__ = require("./ParseTreeType.js"), $__ParseTreeType_46_js__ && $__ParseTreeType_46_js__.__esModule && $__ParseTreeType_46_js__ || {default: $__ParseTreeType_46_js__}).STATE_MACHINE;
var State = ($___46__46__47__46__46__47_codegeneration_47_generator_47_State_46_js__ = require("../../codegeneration/generator/State.js"), $___46__46__47__46__46__47_codegeneration_47_generator_47_State_46_js__ && $___46__46__47__46__46__47_codegeneration_47_generator_47_State_46_js__.__esModule && $___46__46__47__46__46__47_codegeneration_47_generator_47_State_46_js__ || {default: $___46__46__47__46__46__47_codegeneration_47_generator_47_State_46_js__}).State;
var TryState = ($___46__46__47__46__46__47_codegeneration_47_generator_47_TryState_46_js__ = require("../../codegeneration/generator/TryState.js"), $___46__46__47__46__46__47_codegeneration_47_generator_47_TryState_46_js__ && $___46__46__47__46__46__47_codegeneration_47_generator_47_TryState_46_js__.__esModule && $___46__46__47__46__46__47_codegeneration_47_generator_47_TryState_46_js__ || {default: $___46__46__47__46__46__47_codegeneration_47_generator_47_TryState_46_js__}).TryState;
function addCatchOrFinallyStates(kind, enclosingMap, tryStates) {
  for (var i = 0; i < tryStates.length; i++) {
    var tryState = tryStates[i];
    if (tryState.kind === kind) {
      for (var j = 0; j < tryState.tryStates.length; j++) {
        var id = tryState.tryStates[j];
        enclosingMap[id] = tryState;
      }
    }
    addCatchOrFinallyStates(kind, enclosingMap, tryState.nestedTrys);
  }
}
function addAllCatchStates(tryStates, catches) {
  for (var i = 0; i < tryStates.length; i++) {
    var tryState = tryStates[i];
    if (tryState.kind === TryState.Kind.CATCH) {
      catches.push(tryState);
    }
    addAllCatchStates(tryState.nestedTrys, catches);
  }
}
var StateMachine = function($__super) {
  function StateMachine(startState, fallThroughState, states, exceptionBlocks) {
    $traceurRuntime.superConstructor(StateMachine).call(this, null);
    this.startState = startState;
    this.fallThroughState = fallThroughState;
    this.states = states;
    this.exceptionBlocks = exceptionBlocks;
  }
  return ($traceurRuntime.createClass)(StateMachine, {
    get type() {
      return STATE_MACHINE;
    },
    transform: function(transformer) {
      return transformer.transformStateMachine(this);
    },
    visit: function(visitor) {
      visitor.visitStateMachine(this);
    },
    getAllStateIDs: function() {
      var result = [];
      for (var i = 0; i < this.states.length; i++) {
        result.push(this.states[i].id);
      }
      return result;
    },
    getEnclosingFinallyMap: function() {
      var enclosingMap = Object.create(null);
      addCatchOrFinallyStates(TryState.Kind.FINALLY, enclosingMap, this.exceptionBlocks);
      return enclosingMap;
    },
    allCatchStates: function() {
      var catches = [];
      addAllCatchStates(this.exceptionBlocks, catches);
      return catches;
    },
    replaceStateId: function(oldState, newState) {
      return new StateMachine(State.replaceStateId(this.startState, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), State.replaceAllStates(this.states, oldState, newState), State.replaceAllStates(this.exceptionBlocks, oldState, newState));
    },
    replaceStartState: function(newState) {
      return this.replaceStateId(this.startState, newState);
    },
    replaceFallThroughState: function(newState) {
      return this.replaceStateId(this.fallThroughState, newState);
    },
    append: function(nextMachine) {
      var states = $traceurRuntime.spread(this.states);
      for (var i = 0; i < nextMachine.states.length; i++) {
        var otherState = nextMachine.states[i];
        states.push(otherState.replaceState(nextMachine.startState, this.fallThroughState));
      }
      var exceptionBlocks = $traceurRuntime.spread(this.exceptionBlocks);
      for (var i$__7 = 0; i$__7 < nextMachine.exceptionBlocks.length; i$__7++) {
        var tryState = nextMachine.exceptionBlocks[i$__7];
        exceptionBlocks.push(tryState.replaceState(nextMachine.startState, this.fallThroughState));
      }
      return new StateMachine(this.startState, nextMachine.fallThroughState, states, exceptionBlocks);
    }
  }, {}, $__super);
}(ParseTree);
Object.defineProperties(module.exports, {
  StateMachine: {get: function() {
      return StateMachine;
    }},
  __esModule: {value: true}
});
