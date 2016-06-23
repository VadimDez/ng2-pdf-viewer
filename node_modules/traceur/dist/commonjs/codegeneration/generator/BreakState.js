"use strict";
var $__FallThroughState_46_js__,
    $__State_46_js__;
var FallThroughState = ($__FallThroughState_46_js__ = require("./FallThroughState.js"), $__FallThroughState_46_js__ && $__FallThroughState_46_js__.__esModule && $__FallThroughState_46_js__ || {default: $__FallThroughState_46_js__}).FallThroughState;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var BreakState = function($__super) {
  function BreakState(id, label) {
    $traceurRuntime.superConstructor(BreakState).call(this, id);
    this.label = label;
  }
  return ($traceurRuntime.createClass)(BreakState, {
    replaceState: function(oldState, newState) {
      return new BreakState(State.replaceStateId(this.id, oldState, newState), this.label);
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      throw new Error('These should be removed before the transform step');
    },
    transformBreak: function(labelSet) {
      var breakState = arguments[1];
      if (this.label === null)
        return new FallThroughState(this.id, breakState, []);
      if (labelSet.has(this.label)) {
        return new FallThroughState(this.id, labelSet.get(this.label).fallThroughState, []);
      }
      return this;
    },
    transformBreakOrContinue: function(labelSet) {
      var breakState = arguments[1];
      var continueState = arguments[2];
      return this.transformBreak(labelSet, breakState);
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  BreakState: {get: function() {
      return BreakState;
    }},
  __esModule: {value: true}
});
