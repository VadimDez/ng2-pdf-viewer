"use strict";
var $__State_46_js__,
    $__TryState_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var TryState = ($__TryState_46_js__ = require("./TryState.js"), $__TryState_46_js__ && $__TryState_46_js__.__esModule && $__TryState_46_js__ || {default: $__TryState_46_js__}).TryState;
var CatchState = function($__super) {
  function CatchState(identifier, catchState, fallThroughState, allStates, nestedTrys) {
    $traceurRuntime.superConstructor(CatchState).call(this, TryState.Kind.CATCH, allStates, nestedTrys);
    this.identifier = identifier;
    this.catchState = catchState;
    this.fallThroughState = fallThroughState;
  }
  return ($traceurRuntime.createClass)(CatchState, {replaceState: function(oldState, newState) {
      return new CatchState(this.identifier, State.replaceStateId(this.catchState, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), this.replaceAllStates(oldState, newState), this.replaceNestedTrys(oldState, newState));
    }}, {}, $__super);
}(TryState);
Object.defineProperties(module.exports, {
  CatchState: {get: function() {
      return CatchState;
    }},
  __esModule: {value: true}
});
