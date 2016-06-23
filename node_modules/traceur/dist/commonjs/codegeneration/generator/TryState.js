"use strict";
var $__State_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var Kind = {
  CATCH: 'catch',
  FINALLY: 'finally'
};
var TryState = function() {
  function TryState(kind, tryStates, nestedTrys) {
    this.kind = kind;
    this.tryStates = tryStates;
    this.nestedTrys = nestedTrys;
  }
  return ($traceurRuntime.createClass)(TryState, {
    replaceAllStates: function(oldState, newState) {
      return State.replaceStateList(this.tryStates, oldState, newState);
    },
    replaceNestedTrys: function(oldState, newState) {
      var states = [];
      for (var i = 0; i < this.nestedTrys.length; i++) {
        states.push(this.nestedTrys[i].replaceState(oldState, newState));
      }
      return states;
    }
  }, {});
}();
TryState.Kind = Kind;
Object.defineProperties(module.exports, {
  TryState: {get: function() {
      return TryState;
    }},
  __esModule: {value: true}
});
