"use strict";
var $__FallThroughState_46_js__,
    $__State_46_js__;
var FallThroughState = ($__FallThroughState_46_js__ = require("./FallThroughState.js"), $__FallThroughState_46_js__ && $__FallThroughState_46_js__.__esModule && $__FallThroughState_46_js__ || {default: $__FallThroughState_46_js__}).FallThroughState;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var ContinueState = function($__super) {
  function ContinueState(id, label) {
    $traceurRuntime.superConstructor(ContinueState).call(this, id);
    this.label = label;
  }
  return ($traceurRuntime.createClass)(ContinueState, {
    replaceState: function(oldState, newState) {
      return new ContinueState(State.replaceStateId(this.id, oldState, newState), this.label);
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      throw new Error('These should be removed before the transform step');
    },
    transformBreakOrContinue: function(labelSet) {
      var breakState = arguments[1];
      var continueState = arguments[2];
      if (this.label === null)
        return new FallThroughState(this.id, continueState, []);
      if (labelSet.has(this.label)) {
        return new FallThroughState(this.id, labelSet.get(this.label).continueState, []);
      }
      return this;
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  ContinueState: {get: function() {
      return ContinueState;
    }},
  __esModule: {value: true}
});
