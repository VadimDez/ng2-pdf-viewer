"use strict";
var $__State_46_js__,
    $__TryState_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var TryState = ($__TryState_46_js__ = require("./TryState.js"), $__TryState_46_js__ && $__TryState_46_js__.__esModule && $__TryState_46_js__ || {default: $__TryState_46_js__}).TryState;
var FinallyState = function($__super) {
  function FinallyState(finallyState, fallThroughState, allStates, nestedTrys) {
    $traceurRuntime.superConstructor(FinallyState).call(this, TryState.Kind.FINALLY, allStates, nestedTrys);
    this.finallyState = finallyState;
    this.fallThroughState = fallThroughState;
  }
  return ($traceurRuntime.createClass)(FinallyState, {replaceState: function(oldState, newState) {
      return new FinallyState(State.replaceStateId(this.finallyState, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), this.replaceAllStates(oldState, newState), this.replaceNestedTrys(oldState, newState));
    }}, {}, $__super);
}(TryState);
Object.defineProperties(module.exports, {
  FinallyState: {get: function() {
      return FinallyState;
    }},
  __esModule: {value: true}
});
