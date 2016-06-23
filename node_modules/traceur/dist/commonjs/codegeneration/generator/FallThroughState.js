"use strict";
var $__State_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var FallThroughState = function($__super) {
  function FallThroughState(id, fallThroughState, statements) {
    $traceurRuntime.superConstructor(FallThroughState).call(this, id);
    this.fallThroughState = fallThroughState;
    this.statements = statements;
  }
  return ($traceurRuntime.createClass)(FallThroughState, {
    replaceState: function(oldState, newState) {
      return new FallThroughState(State.replaceStateId(this.id, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), this.statements);
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      return $traceurRuntime.spread(this.statements, State.generateJump(enclosingFinally, this.fallThroughState));
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  FallThroughState: {get: function() {
      return FallThroughState;
    }},
  __esModule: {value: true}
});
