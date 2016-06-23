"use strict";
var $___46__46__47__46__46__47_semantics_47_util_46_js__,
    $__YieldState_46_js__,
    $__State_46_js__,
    $___46__46__47_PlaceholderParser_46_js__;
var $__0 = ($___46__46__47__46__46__47_semantics_47_util_46_js__ = require("../../semantics/util.js"), $___46__46__47__46__46__47_semantics_47_util_46_js__ && $___46__46__47__46__46__47_semantics_47_util_46_js__.__esModule && $___46__46__47__46__46__47_semantics_47_util_46_js__ || {default: $___46__46__47__46__46__47_semantics_47_util_46_js__}),
    isUndefined = $__0.isUndefined,
    isVoidExpression = $__0.isVoidExpression;
var YieldState = ($__YieldState_46_js__ = require("./YieldState.js"), $__YieldState_46_js__ && $__YieldState_46_js__.__esModule && $__YieldState_46_js__ || {default: $__YieldState_46_js__}).YieldState;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var parseStatement = ($___46__46__47_PlaceholderParser_46_js__ = require("../PlaceholderParser.js"), $___46__46__47_PlaceholderParser_46_js__ && $___46__46__47_PlaceholderParser_46_js__.__esModule && $___46__46__47_PlaceholderParser_46_js__ || {default: $___46__46__47_PlaceholderParser_46_js__}).parseStatement;
var ReturnState = function($__super) {
  function ReturnState() {
    $traceurRuntime.superConstructor(ReturnState).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ReturnState, {transform: function(enclosingFinally, machineEndState, reporter) {
      var $__7;
      var e = this.expression;
      var statements = [];
      if (e && !isUndefined(e) && !isVoidExpression(e))
        statements.push(parseStatement($traceurRuntime.getTemplateObject(["$ctx.returnValue = ", ""]), this.expression));
      ($__7 = statements).push.apply($__7, $traceurRuntime.spread(State.generateJump(enclosingFinally, machineEndState)));
      return statements;
    }}, {}, $__super);
}(YieldState);
Object.defineProperties(module.exports, {
  ReturnState: {get: function() {
      return ReturnState;
    }},
  __esModule: {value: true}
});
