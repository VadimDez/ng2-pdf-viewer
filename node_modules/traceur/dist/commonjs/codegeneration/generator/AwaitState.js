"use strict";
var $__State_46_js__,
    $___46__46__47_PlaceholderParser_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var parseStatements = ($___46__46__47_PlaceholderParser_46_js__ = require("../PlaceholderParser.js"), $___46__46__47_PlaceholderParser_46_js__ && $___46__46__47_PlaceholderParser_46_js__.__esModule && $___46__46__47_PlaceholderParser_46_js__ || {default: $___46__46__47_PlaceholderParser_46_js__}).parseStatements;
var AwaitState = function($__super) {
  function AwaitState(id, callbackState, expression) {
    $traceurRuntime.superConstructor(AwaitState).call(this, id), this.callbackState = callbackState;
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(AwaitState, {
    replaceState: function(oldState, newState) {
      return new AwaitState(State.replaceStateId(this.id, oldState, newState), State.replaceStateId(this.callbackState, oldState, newState), this.expression);
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      var $__5;
      var stateId,
          statements;
      if (State.isFinallyExit(enclosingFinally, this.callbackState)) {
        stateId = enclosingFinally.finallyState;
        statements = parseStatements($traceurRuntime.getTemplateObject(["$ctx.finallyFallThrough = ", ""]), this.callbackState);
      } else {
        stateId = this.callbackState;
        statements = [];
      }
      ($__5 = statements).push.apply($__5, $traceurRuntime.spread(parseStatements($traceurRuntime.getTemplateObject(["Promise.resolve(", ").then(\n          $ctx.createCallback(", "), $ctx.errback);\n          return;"]), this.expression, stateId)));
      return statements;
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  AwaitState: {get: function() {
      return AwaitState;
    }},
  __esModule: {value: true}
});
