"use strict";
var $__BreakState_46_js__,
    $__ContinueState_46_js__,
    $___46__46__47_ParseTreeTransformer_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__;
var BreakState = ($__BreakState_46_js__ = require("./BreakState.js"), $__BreakState_46_js__ && $__BreakState_46_js__.__esModule && $__BreakState_46_js__ || {default: $__BreakState_46_js__}).BreakState;
var ContinueState = ($__ContinueState_46_js__ = require("./ContinueState.js"), $__ContinueState_46_js__ && $__ContinueState_46_js__.__esModule && $__ContinueState_46_js__ || {default: $__ContinueState_46_js__}).ContinueState;
var ParseTreeTransformer = ($___46__46__47_ParseTreeTransformer_46_js__ = require("../ParseTreeTransformer.js"), $___46__46__47_ParseTreeTransformer_46_js__ && $___46__46__47_ParseTreeTransformer_46_js__.__esModule && $___46__46__47_ParseTreeTransformer_46_js__ || {default: $___46__46__47_ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var StateMachine = ($___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ = require("../../syntax/trees/StateMachine.js"), $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__}).StateMachine;
function safeGetLabel(tree) {
  return tree.name ? tree.name.value : null;
}
var BreakContinueTransformer = function($__super) {
  function BreakContinueTransformer(stateAllocator) {
    $traceurRuntime.superConstructor(BreakContinueTransformer).call(this);
    this.transformBreaks_ = true;
    this.stateAllocator_ = stateAllocator;
  }
  return ($traceurRuntime.createClass)(BreakContinueTransformer, {
    allocateState_: function() {
      return this.stateAllocator_.allocateState();
    },
    stateToStateMachine_: function(newState) {
      var fallThroughState = this.allocateState_();
      return new StateMachine(newState.id, fallThroughState, [newState], []);
    },
    transformBreakStatement: function(tree) {
      return this.transformBreaks_ || tree.name ? this.stateToStateMachine_(new BreakState(this.allocateState_(), safeGetLabel(tree))) : tree;
    },
    transformContinueStatement: function(tree) {
      return this.stateToStateMachine_(new ContinueState(this.allocateState_(), safeGetLabel(tree)));
    },
    transformDoWhileStatement: function(tree) {
      return tree;
    },
    transformForOfStatement: function(tree) {
      return tree;
    },
    transformForOnStatement: function(tree) {
      return tree;
    },
    transformForStatement: function(tree) {
      return tree;
    },
    transformFunctionDeclaration: function(tree) {
      return tree;
    },
    transformFunctionExpression: function(tree) {
      return tree;
    },
    transformStateMachine: function(tree) {
      return tree;
    },
    transformSwitchStatement: function(tree) {
      var oldState = this.transformBreaks_;
      this.transformBreaks_ = false;
      var result = $traceurRuntime.superGet(this, BreakContinueTransformer.prototype, "transformSwitchStatement").call(this, tree);
      this.transformBreaks_ = oldState;
      return result;
    },
    transformWhileStatement: function(tree) {
      return tree;
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  BreakContinueTransformer: {get: function() {
      return BreakContinueTransformer;
    }},
  __esModule: {value: true}
});
