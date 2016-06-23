"use strict";
var $__State_46_js__,
    $___46__46__47_ParseTreeFactory_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var createReturnStatement = ($___46__46__47_ParseTreeFactory_46_js__ = require("../ParseTreeFactory.js"), $___46__46__47_ParseTreeFactory_46_js__ && $___46__46__47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_ParseTreeFactory_46_js__ || {default: $___46__46__47_ParseTreeFactory_46_js__}).createReturnStatement;
var YieldState = function($__super) {
  function YieldState(id, fallThroughState, expression) {
    $traceurRuntime.superConstructor(YieldState).call(this, id);
    this.fallThroughState = fallThroughState;
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(YieldState, {
    replaceState: function(oldState, newState) {
      return new this.constructor(State.replaceStateId(this.id, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), this.expression);
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      return $traceurRuntime.spread(State.generateAssignState(enclosingFinally, this.fallThroughState), [createReturnStatement(this.expression)]);
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  YieldState: {get: function() {
      return YieldState;
    }},
  __esModule: {value: true}
});
