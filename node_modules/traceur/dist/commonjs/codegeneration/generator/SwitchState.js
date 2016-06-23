"use strict";
var $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__State_46_js__,
    $___46__46__47_ParseTreeFactory_46_js__;
var $__0 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../../syntax/trees/ParseTrees.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    CaseClause = $__0.CaseClause,
    DefaultClause = $__0.DefaultClause,
    SwitchStatement = $__0.SwitchStatement;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var createBreakStatement = ($___46__46__47_ParseTreeFactory_46_js__ = require("../ParseTreeFactory.js"), $___46__46__47_ParseTreeFactory_46_js__ && $___46__46__47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_ParseTreeFactory_46_js__ || {default: $___46__46__47_ParseTreeFactory_46_js__}).createBreakStatement;
var SwitchClause = function() {
  function SwitchClause(first, second) {
    this.first = first;
    this.second = second;
  }
  return ($traceurRuntime.createClass)(SwitchClause, {}, {});
}();
var SwitchState = function($__super) {
  function SwitchState(id, expression, clauses) {
    $traceurRuntime.superConstructor(SwitchState).call(this, id);
    this.expression = expression;
    this.clauses = clauses;
  }
  return ($traceurRuntime.createClass)(SwitchState, {
    replaceState: function(oldState, newState) {
      var clauses = this.clauses.map(function(clause) {
        return new SwitchClause(clause.first, State.replaceStateId(clause.second, oldState, newState));
      });
      return new SwitchState(State.replaceStateId(this.id, oldState, newState), this.expression, clauses);
    },
    transform: function(enclosingFinally, machineEndState, reporter) {
      var clauses = [];
      for (var i = 0; i < this.clauses.length; i++) {
        var clause = this.clauses[i];
        if (clause.first === null) {
          clauses.push(new DefaultClause(null, State.generateJump(enclosingFinally, clause.second)));
        } else {
          clauses.push(new CaseClause(null, clause.first, State.generateJump(enclosingFinally, clause.second)));
        }
      }
      return [new SwitchStatement(null, this.expression, clauses), createBreakStatement()];
    }
  }, {}, $__super);
}(State);
Object.defineProperties(module.exports, {
  SwitchClause: {get: function() {
      return SwitchClause;
    }},
  SwitchState: {get: function() {
      return SwitchState;
    }},
  __esModule: {value: true}
});
