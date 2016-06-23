"use strict";
var $__State_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var EndState = function($__super) {
  function EndState() {
    $traceurRuntime.superConstructor(EndState).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(EndState, {
    replaceState: function(oldState, newState) {
      return new EndState(State.replaceStateId(this.id, oldState, newState));
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      return State.generateJump(enclosingFinally, machineEndState);
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  EndState: {get: function() {
      return EndState;
    }},
  __esModule: {value: true}
});
