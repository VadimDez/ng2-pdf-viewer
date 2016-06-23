"use strict";
var $__State_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var FinallyFallThroughState = function($__super) {
  function FinallyFallThroughState() {
    $traceurRuntime.superConstructor(FinallyFallThroughState).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(FinallyFallThroughState, {
    replaceState: function(oldState, newState) {
      return new FinallyFallThroughState(State.replaceStateId(this.id, oldState, newState));
    },
    transformMachineState: function(enclosingFinally, machineEndState, reporter) {
      return null;
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      throw new Error('these are generated in addFinallyFallThroughDispatches');
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  FinallyFallThroughState: {get: function() {
      return FinallyFallThroughState;
    }},
  __esModule: {value: true}
});
