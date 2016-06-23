"use strict";
var $__State_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var StateAllocator = function() {
  function StateAllocator() {
    this.nextState_ = State.START_STATE + 1;
  }
  return ($traceurRuntime.createClass)(StateAllocator, {allocateState: function() {
      return this.nextState_++;
    }}, {});
}();
Object.defineProperties(module.exports, {
  StateAllocator: {get: function() {
      return StateAllocator;
    }},
  __esModule: {value: true}
});
