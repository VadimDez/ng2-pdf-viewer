"use strict";
var $__State_46_js__,
    $___46__46__47_ParseTreeFactory_46_js__,
    $___46__46__47_PlaceholderParser_46_js__;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var $__1 = ($___46__46__47_ParseTreeFactory_46_js__ = require("../ParseTreeFactory.js"), $___46__46__47_ParseTreeFactory_46_js__ && $___46__46__47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_ParseTreeFactory_46_js__ || {default: $___46__46__47_ParseTreeFactory_46_js__}),
    createBlock = $__1.createBlock,
    createIfStatement = $__1.createIfStatement;
var parseStatements = ($___46__46__47_PlaceholderParser_46_js__ = require("../PlaceholderParser.js"), $___46__46__47_PlaceholderParser_46_js__ && $___46__46__47_PlaceholderParser_46_js__.__esModule && $___46__46__47_PlaceholderParser_46_js__ || {default: $___46__46__47_PlaceholderParser_46_js__}).parseStatements;
var ConditionalState = function($__super) {
  function ConditionalState(id, ifState, elseState, condition) {
    $traceurRuntime.superConstructor(ConditionalState).call(this, id);
    this.ifState = ifState;
    this.elseState = elseState;
    this.condition = condition;
  }
  return ($traceurRuntime.createClass)(ConditionalState, {
    replaceState: function(oldState, newState) {
      return new ConditionalState(State.replaceStateId(this.id, oldState, newState), State.replaceStateId(this.ifState, oldState, newState), State.replaceStateId(this.elseState, oldState, newState), this.condition);
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      if (State.isFinallyExit(enclosingFinally, this.ifState) || State.isFinallyExit(enclosingFinally, this.elseState)) {
        return [createIfStatement(this.condition, createBlock(State.generateJump(enclosingFinally, this.ifState)), createBlock(State.generateJump(enclosingFinally, this.elseState)))];
      }
      return parseStatements($traceurRuntime.getTemplateObject(["$ctx.state = (", ") ? ", " : ", ";\n        break"]), this.condition, this.ifState, this.elseState);
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  ConditionalState: {get: function() {
      return ConditionalState;
    }},
  __esModule: {value: true}
});
