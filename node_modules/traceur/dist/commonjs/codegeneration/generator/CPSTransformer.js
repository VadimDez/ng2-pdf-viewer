"use strict";
var $___46__46__47_AlphaRenamer_46_js__,
    $__BreakContinueTransformer_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__CatchState_46_js__,
    $__ConditionalState_46_js__,
    $___46__46__47_ExplodeExpressionTransformer_46_js__,
    $__FallThroughState_46_js__,
    $__FinallyFallThroughState_46_js__,
    $__FinallyState_46_js__,
    $___46__46__47_FindInFunctionScope_46_js__,
    $___46__46__47_ParseTreeTransformer_46_js__,
    $___46__46__47__46__46__47_util_47_StringMap_46_js__,
    $___46__46__47_TempVarTransformer_46_js__,
    $___46__46__47__46__46__47_util_47_assert_46_js__,
    $___46__46__47_PlaceholderParser_46_js__,
    $__State_46_js__,
    $__StateAllocator_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__,
    $__SwitchState_46_js__,
    $__TryState_46_js__,
    $___46__46__47_ParseTreeFactory_46_js__,
    $___46__46__47_HoistVariablesTransformer_46_js__;
var AlphaRenamer = ($___46__46__47_AlphaRenamer_46_js__ = require("../AlphaRenamer.js"), $___46__46__47_AlphaRenamer_46_js__ && $___46__46__47_AlphaRenamer_46_js__.__esModule && $___46__46__47_AlphaRenamer_46_js__ || {default: $___46__46__47_AlphaRenamer_46_js__}).AlphaRenamer;
var BreakContinueTransformer = ($__BreakContinueTransformer_46_js__ = require("./BreakContinueTransformer.js"), $__BreakContinueTransformer_46_js__ && $__BreakContinueTransformer_46_js__.__esModule && $__BreakContinueTransformer_46_js__ || {default: $__BreakContinueTransformer_46_js__}).BreakContinueTransformer;
var $__2 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../../syntax/trees/ParseTreeType.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    BLOCK = $__2.BLOCK,
    CASE_CLAUSE = $__2.CASE_CLAUSE,
    CONDITIONAL_EXPRESSION = $__2.CONDITIONAL_EXPRESSION,
    EXPRESSION_STATEMENT = $__2.EXPRESSION_STATEMENT,
    PAREN_EXPRESSION = $__2.PAREN_EXPRESSION,
    STATE_MACHINE = $__2.STATE_MACHINE;
var $__3 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../../syntax/trees/ParseTrees.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__3.AnonBlock,
    Block = $__3.Block,
    CaseClause = $__3.CaseClause,
    IfStatement = $__3.IfStatement,
    SwitchStatement = $__3.SwitchStatement;
var CatchState = ($__CatchState_46_js__ = require("./CatchState.js"), $__CatchState_46_js__ && $__CatchState_46_js__.__esModule && $__CatchState_46_js__ || {default: $__CatchState_46_js__}).CatchState;
var ConditionalState = ($__ConditionalState_46_js__ = require("./ConditionalState.js"), $__ConditionalState_46_js__ && $__ConditionalState_46_js__.__esModule && $__ConditionalState_46_js__ || {default: $__ConditionalState_46_js__}).ConditionalState;
var ExplodeExpressionTransformer = ($___46__46__47_ExplodeExpressionTransformer_46_js__ = require("../ExplodeExpressionTransformer.js"), $___46__46__47_ExplodeExpressionTransformer_46_js__ && $___46__46__47_ExplodeExpressionTransformer_46_js__.__esModule && $___46__46__47_ExplodeExpressionTransformer_46_js__ || {default: $___46__46__47_ExplodeExpressionTransformer_46_js__}).ExplodeExpressionTransformer;
var FallThroughState = ($__FallThroughState_46_js__ = require("./FallThroughState.js"), $__FallThroughState_46_js__ && $__FallThroughState_46_js__.__esModule && $__FallThroughState_46_js__ || {default: $__FallThroughState_46_js__}).FallThroughState;
var FinallyFallThroughState = ($__FinallyFallThroughState_46_js__ = require("./FinallyFallThroughState.js"), $__FinallyFallThroughState_46_js__ && $__FinallyFallThroughState_46_js__.__esModule && $__FinallyFallThroughState_46_js__ || {default: $__FinallyFallThroughState_46_js__}).FinallyFallThroughState;
var FinallyState = ($__FinallyState_46_js__ = require("./FinallyState.js"), $__FinallyState_46_js__ && $__FinallyState_46_js__.__esModule && $__FinallyState_46_js__ || {default: $__FinallyState_46_js__}).FinallyState;
var FindInFunctionScope = ($___46__46__47_FindInFunctionScope_46_js__ = require("../FindInFunctionScope.js"), $___46__46__47_FindInFunctionScope_46_js__ && $___46__46__47_FindInFunctionScope_46_js__.__esModule && $___46__46__47_FindInFunctionScope_46_js__ || {default: $___46__46__47_FindInFunctionScope_46_js__}).FindInFunctionScope;
var ParseTreeTransformer = ($___46__46__47_ParseTreeTransformer_46_js__ = require("../ParseTreeTransformer.js"), $___46__46__47_ParseTreeTransformer_46_js__ && $___46__46__47_ParseTreeTransformer_46_js__.__esModule && $___46__46__47_ParseTreeTransformer_46_js__ || {default: $___46__46__47_ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var StringMap = ($___46__46__47__46__46__47_util_47_StringMap_46_js__ = require("../../util/StringMap.js"), $___46__46__47__46__46__47_util_47_StringMap_46_js__ && $___46__46__47__46__46__47_util_47_StringMap_46_js__.__esModule && $___46__46__47__46__46__47_util_47_StringMap_46_js__ || {default: $___46__46__47__46__46__47_util_47_StringMap_46_js__}).StringMap;
var TempVarTransformer = ($___46__46__47_TempVarTransformer_46_js__ = require("../TempVarTransformer.js"), $___46__46__47_TempVarTransformer_46_js__ && $___46__46__47_TempVarTransformer_46_js__.__esModule && $___46__46__47_TempVarTransformer_46_js__ || {default: $___46__46__47_TempVarTransformer_46_js__}).TempVarTransformer;
var assert = ($___46__46__47__46__46__47_util_47_assert_46_js__ = require("../../util/assert.js"), $___46__46__47__46__46__47_util_47_assert_46_js__ && $___46__46__47__46__46__47_util_47_assert_46_js__.__esModule && $___46__46__47__46__46__47_util_47_assert_46_js__ || {default: $___46__46__47__46__46__47_util_47_assert_46_js__}).assert;
var $__15 = ($___46__46__47_PlaceholderParser_46_js__ = require("../PlaceholderParser.js"), $___46__46__47_PlaceholderParser_46_js__ && $___46__46__47_PlaceholderParser_46_js__.__esModule && $___46__46__47_PlaceholderParser_46_js__ || {default: $___46__46__47_PlaceholderParser_46_js__}),
    parseExpression = $__15.parseExpression,
    parseStatement = $__15.parseStatement,
    parseStatements = $__15.parseStatements;
var State = ($__State_46_js__ = require("./State.js"), $__State_46_js__ && $__State_46_js__.__esModule && $__State_46_js__ || {default: $__State_46_js__}).State;
var StateAllocator = ($__StateAllocator_46_js__ = require("./StateAllocator.js"), $__StateAllocator_46_js__ && $__StateAllocator_46_js__.__esModule && $__StateAllocator_46_js__ || {default: $__StateAllocator_46_js__}).StateAllocator;
var StateMachine = ($___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ = require("../../syntax/trees/StateMachine.js"), $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_StateMachine_46_js__}).StateMachine;
var $__19 = ($__SwitchState_46_js__ = require("./SwitchState.js"), $__SwitchState_46_js__ && $__SwitchState_46_js__.__esModule && $__SwitchState_46_js__ || {default: $__SwitchState_46_js__}),
    SwitchClause = $__19.SwitchClause,
    SwitchState = $__19.SwitchState;
var TryState = ($__TryState_46_js__ = require("./TryState.js"), $__TryState_46_js__ && $__TryState_46_js__.__esModule && $__TryState_46_js__ || {default: $__TryState_46_js__}).TryState;
var $__21 = ($___46__46__47_ParseTreeFactory_46_js__ = require("../ParseTreeFactory.js"), $___46__46__47_ParseTreeFactory_46_js__ && $___46__46__47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_ParseTreeFactory_46_js__ || {default: $___46__46__47_ParseTreeFactory_46_js__}),
    createAssignStateStatement = $__21.createAssignStateStatement,
    createBreakStatement = $__21.createBreakStatement,
    createCaseClause = $__21.createCaseClause,
    createDefaultClause = $__21.createDefaultClause,
    createExpressionStatement = $__21.createExpressionStatement,
    createFunctionBody = $__21.createFunctionBody,
    id = $__21.createIdentifierExpression,
    createMemberExpression = $__21.createMemberExpression,
    createNumberLiteral = $__21.createNumberLiteral,
    createSwitchStatement = $__21.createSwitchStatement;
var HoistVariablesTransformer = ($___46__46__47_HoistVariablesTransformer_46_js__ = require("../HoistVariablesTransformer.js"), $___46__46__47_HoistVariablesTransformer_46_js__ && $___46__46__47_HoistVariablesTransformer_46_js__.__esModule && $___46__46__47_HoistVariablesTransformer_46_js__ || {default: $___46__46__47_HoistVariablesTransformer_46_js__}).default;
var LabelState = function() {
  function LabelState(name, continueState, fallThroughState) {
    this.name = name;
    this.continueState = continueState;
    this.fallThroughState = fallThroughState;
  }
  return ($traceurRuntime.createClass)(LabelState, {}, {});
}();
var NeedsStateMachine = function($__super) {
  function NeedsStateMachine() {
    $traceurRuntime.superConstructor(NeedsStateMachine).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(NeedsStateMachine, {
    visitBreakStatement: function(tree) {
      this.found = true;
    },
    visitContinueStatement: function(tree) {
      this.found = true;
    },
    visitStateMachine: function(tree) {
      this.found = true;
    },
    visitYieldExpression: function(tee) {
      this.found = true;
    }
  }, {}, $__super);
}(FindInFunctionScope);
function needsStateMachine(tree) {
  var visitor = new NeedsStateMachine();
  visitor.visitAny(tree);
  return visitor.found;
}
var HoistVariables = function($__super) {
  function HoistVariables() {
    $traceurRuntime.superConstructor(HoistVariables).call(this, true);
  }
  return ($traceurRuntime.createClass)(HoistVariables, {
    prependVariables: function(statements) {
      return statements;
    },
    prependFunctions: function(statements) {
      return statements;
    }
  }, {}, $__super);
}(HoistVariablesTransformer);
var CPSTransformer = function($__super) {
  function CPSTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(CPSTransformer).call(this, identifierGenerator, reporter, options);
    this.stateAllocator_ = new StateAllocator();
    this.labelSet_ = new StringMap();
    this.currentLabel_ = null;
    this.hoistVariablesTransformer_ = new HoistVariables();
  }
  return ($traceurRuntime.createClass)(CPSTransformer, {
    expressionNeedsStateMachine: function(tree) {
      return false;
    },
    allocateState: function() {
      return this.stateAllocator_.allocateState();
    },
    transformBlock: function(tree) {
      var labels = this.getLabels_();
      var label = this.clearCurrentLabel_();
      var transformedTree = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformBlock").call(this, tree);
      var machine = this.transformStatementList_(transformedTree.statements);
      if (machine === null)
        return transformedTree;
      if (label) {
        var states = [];
        for (var i = 0; i < machine.states.length; i++) {
          var state = machine.states[i];
          states.push(state.transformBreakOrContinue(labels));
        }
        machine = new StateMachine(machine.startState, machine.fallThroughState, states, machine.exceptionBlocks);
      }
      return machine;
    },
    transformFunctionBody: function(tree) {
      this.pushTempScope();
      var oldLabels = this.clearLabels_();
      var transformedTree = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformFunctionBody").call(this, tree);
      var machine = this.transformStatementList_(transformedTree.statements);
      this.restoreLabels_(oldLabels);
      this.popTempScope();
      return machine === null ? transformedTree : machine;
    },
    transformStatementList_: function(trees) {
      var groups = [];
      var newMachine;
      for (var i = 0; i < trees.length; i++) {
        if (trees[i].type === STATE_MACHINE) {
          groups.push(trees[i]);
        } else if (needsStateMachine(trees[i])) {
          newMachine = this.ensureTransformed_(trees[i]);
          groups.push(newMachine);
        } else {
          var last = groups[groups.length - 1];
          if (!(last instanceof Array))
            groups.push(last = []);
          last.push(trees[i]);
        }
      }
      if (groups.length === 1 && groups[0] instanceof Array)
        return null;
      var machine = null;
      for (var i$__35 = 0; i$__35 < groups.length; i$__35++) {
        if (groups[i$__35] instanceof Array) {
          newMachine = this.statementsToStateMachine_(groups[i$__35]);
        } else {
          newMachine = groups[i$__35];
        }
        if (i$__35 === 0)
          machine = newMachine;
        else
          machine = machine.append(newMachine);
      }
      return machine;
    },
    needsStateMachine_: function(statements) {
      if (statements instanceof Array) {
        for (var i = 0; i < statements.length; i++) {
          if (needsStateMachine(statements[i]))
            return true;
        }
        return false;
      }
      assert(statements instanceof SwitchStatement);
      return needsStateMachine(statements);
    },
    transformCaseClause: function(tree) {
      var result = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformCaseClause").call(this, tree);
      var machine = this.transformStatementList_(result.statements);
      return machine === null ? result : new CaseClause(null, result.expression, [machine]);
    },
    transformDoWhileStatement: function(tree) {
      var $__32;
      var $__30,
          $__31;
      var labels = this.getLabels_();
      var label = this.clearCurrentLabel_();
      var machine,
          condition,
          body;
      if (this.expressionNeedsStateMachine(tree.condition)) {
        (($__30 = this.expressionToStateMachine(tree.condition), machine = $__30.machine, condition = $__30.expression, $__30));
        body = this.transformAny(tree.body);
      } else {
        var result = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformDoWhileStatement").call(this, tree);
        (($__31 = result, condition = $__31.condition, body = $__31.body, $__31));
        if (body.type !== STATE_MACHINE)
          return result;
      }
      var loopBodyMachine = this.ensureTransformed_(body);
      var startState = loopBodyMachine.startState;
      var conditionState = loopBodyMachine.fallThroughState;
      var fallThroughState = this.allocateState();
      var states = [];
      this.addLoopBodyStates_(loopBodyMachine, conditionState, fallThroughState, labels, states);
      if (machine) {
        machine = machine.replaceStartState(conditionState);
        conditionState = machine.fallThroughState;
        ($__32 = states).push.apply($__32, $traceurRuntime.spread(machine.states));
      }
      states.push(new ConditionalState(conditionState, startState, fallThroughState, condition));
      machine = new StateMachine(startState, fallThroughState, states, loopBodyMachine.exceptionBlocks);
      if (label)
        machine = machine.replaceStateId(conditionState, label.continueState);
      return machine;
    },
    addLoopBodyStates_: function(loopBodyMachine, continueState, breakState, labels, states) {
      for (var i = 0; i < loopBodyMachine.states.length; i++) {
        var state = loopBodyMachine.states[i];
        states.push(state.transformBreakOrContinue(labels, breakState, continueState));
      }
    },
    transformForStatement: function(tree) {
      var $__32,
          $__33,
          $__34;
      var labels = this.getLabels_();
      var label = this.clearCurrentLabel_();
      var tmp;
      var initializer = null,
          initializerMachine;
      if (tree.initializer) {
        if (this.expressionNeedsStateMachine(tree.initializer)) {
          tmp = this.expressionToStateMachine(tree.initializer);
          initializer = tmp.expression;
          initializerMachine = tmp.machine;
        } else {
          initializer = this.transformAny(tree.initializer);
        }
      }
      var condition = null,
          conditionMachine;
      if (tree.condition) {
        if (this.expressionNeedsStateMachine(tree.condition)) {
          tmp = this.expressionToStateMachine(tree.condition);
          condition = tmp.expression;
          conditionMachine = tmp.machine;
        } else {
          condition = this.transformAny(tree.condition);
        }
      }
      var increment = null,
          incrementMachine;
      if (tree.increment) {
        if (this.expressionNeedsStateMachine(tree.increment)) {
          tmp = this.expressionToStateMachine(tree.increment);
          increment = tmp.expression;
          incrementMachine = tmp.machine;
        } else {
          increment = this.transformAny(tree.increment);
        }
      }
      var body = this.transformAny(tree.body);
      if (initializer === tree.initializer && condition === tree.condition && increment === tree.increment && body === tree.body) {
        return tree;
      }
      if (!initializerMachine && !conditionMachine && !incrementMachine && body.type !== STATE_MACHINE) {
        return new ForStatement(tree.location, initializer, condition, increment, body);
      }
      var loopBodyMachine = this.ensureTransformed_(body);
      var bodyFallThroughId = loopBodyMachine.fallThroughState;
      var fallThroughId = this.allocateState();
      var startId;
      var initializerStartId = initializer ? this.allocateState() : State.INVALID_STATE;
      var conditionStartId = increment ? this.allocateState() : bodyFallThroughId;
      var loopStartId = loopBodyMachine.startState;
      var incrementStartId = bodyFallThroughId;
      var states = [];
      if (initializer) {
        startId = initializerStartId;
        var initialiserFallThroughId;
        if (condition)
          initialiserFallThroughId = conditionStartId;
        else
          initialiserFallThroughId = loopStartId;
        var tmpId = initializerStartId;
        if (initializerMachine) {
          initializerMachine = initializerMachine.replaceStartState(initializerStartId);
          tmpId = initializerMachine.fallThroughState;
          ($__32 = states).push.apply($__32, $traceurRuntime.spread(initializerMachine.states));
        }
        states.push(new FallThroughState(tmpId, initialiserFallThroughId, [createExpressionStatement(initializer)]));
      }
      if (condition) {
        if (!initializer)
          startId = conditionStartId;
        var tmpId$__36 = conditionStartId;
        if (conditionMachine) {
          conditionMachine = conditionMachine.replaceStartState(conditionStartId);
          tmpId$__36 = conditionMachine.fallThroughState;
          ($__33 = states).push.apply($__33, $traceurRuntime.spread(conditionMachine.states));
        }
        states.push(new ConditionalState(tmpId$__36, loopStartId, fallThroughId, condition));
      }
      if (increment) {
        var incrementFallThroughId;
        if (condition)
          incrementFallThroughId = conditionStartId;
        else
          incrementFallThroughId = loopStartId;
        var tmpId$__37 = incrementStartId;
        if (incrementMachine) {
          incrementMachine = incrementMachine.replaceStartState(incrementStartId);
          tmpId$__37 = incrementMachine.fallThroughState;
          ($__34 = states).push.apply($__34, $traceurRuntime.spread(incrementMachine.states));
        }
        states.push(new FallThroughState(tmpId$__37, incrementFallThroughId, [createExpressionStatement(increment)]));
      }
      if (!initializer && !condition)
        startId = loopStartId;
      var continueId;
      if (increment)
        continueId = incrementStartId;
      else if (condition)
        continueId = conditionStartId;
      else
        continueId = loopStartId;
      if (!increment && !condition) {
        loopBodyMachine = loopBodyMachine.replaceFallThroughState(loopBodyMachine.startState);
      }
      this.addLoopBodyStates_(loopBodyMachine, continueId, fallThroughId, labels, states);
      var machine = new StateMachine(startId, fallThroughId, states, loopBodyMachine.exceptionBlocks);
      if (label)
        machine = machine.replaceStateId(continueId, label.continueState);
      return machine;
    },
    transformForInStatement: function(tree) {
      return tree;
    },
    transformForOfStatement: function(tree) {
      throw new Error('for of statements should be transformed before this pass');
    },
    transformIfStatement: function(tree) {
      var $__32,
          $__33,
          $__34;
      var $__30,
          $__31;
      var machine,
          condition,
          ifClause,
          elseClause;
      if (this.expressionNeedsStateMachine(tree.condition)) {
        (($__30 = this.expressionToStateMachine(tree.condition), machine = $__30.machine, condition = $__30.expression, $__30));
        ifClause = this.transformAny(tree.ifClause);
        elseClause = this.transformAny(tree.elseClause);
      } else {
        var result = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformIfStatement").call(this, tree);
        (($__31 = result, condition = $__31.condition, ifClause = $__31.ifClause, elseClause = $__31.elseClause, $__31));
        if (ifClause.type !== STATE_MACHINE && (elseClause === null || elseClause.type !== STATE_MACHINE)) {
          return result;
        }
      }
      ifClause = this.ensureTransformed_(ifClause);
      elseClause = this.ensureTransformed_(elseClause);
      var startState = this.allocateState();
      var fallThroughState = ifClause.fallThroughState;
      var ifState = ifClause.startState;
      var elseState = elseClause === null ? fallThroughState : elseClause.startState;
      var states = [];
      var exceptionBlocks = [];
      states.push(new ConditionalState(startState, ifState, elseState, condition));
      ($__32 = states).push.apply($__32, $traceurRuntime.spread(ifClause.states));
      ($__33 = exceptionBlocks).push.apply($__33, $traceurRuntime.spread(ifClause.exceptionBlocks));
      if (elseClause !== null) {
        this.replaceAndAddStates_(elseClause.states, elseClause.fallThroughState, fallThroughState, states);
        ($__34 = exceptionBlocks).push.apply($__34, $traceurRuntime.spread(State.replaceAllStates(elseClause.exceptionBlocks, elseClause.fallThroughState, fallThroughState)));
      }
      var ifMachine = new StateMachine(startState, fallThroughState, states, exceptionBlocks);
      if (machine)
        ifMachine = machine.append(ifMachine);
      return ifMachine;
    },
    removeEmptyStates: function(oldStates) {
      var emptyStates = [],
          newStates = [];
      for (var i = 0; i < oldStates.length; i++) {
        if (oldStates[i] instanceof FallThroughState && oldStates[i].statements.length === 0) {
          emptyStates.push(oldStates[i]);
        } else {
          newStates.push(oldStates[i]);
        }
      }
      for (var i$__38 = 0; i$__38 < newStates.length; i$__38++) {
        newStates[i$__38] = emptyStates.reduce(function(state, $__30) {
          var $__31 = $__30,
              id = $__31.id,
              fallThroughState = $__31.fallThroughState;
          return state.replaceState(id, fallThroughState);
        }, newStates[i$__38]);
      }
      return newStates;
    },
    replaceAndAddStates_: function(oldStates, oldState, newState, newStates) {
      for (var i = 0; i < oldStates.length; i++) {
        newStates.push(oldStates[i].replaceState(oldState, newState));
      }
    },
    transformLabelledStatement: function(tree) {
      var startState = this.allocateState();
      var continueState = this.allocateState();
      var fallThroughState = this.allocateState();
      var label = new LabelState(tree.name.value, continueState, fallThroughState);
      var oldLabels = this.addLabel_(label);
      this.currentLabel_ = label;
      var result = this.transformAny(tree.statement);
      if (result === tree.statement) {
        result = tree;
      } else if (result.type === STATE_MACHINE) {
        result = result.replaceStartState(startState);
        result = result.replaceFallThroughState(fallThroughState);
      }
      this.restoreLabels_(oldLabels);
      return result;
    },
    getLabels_: function() {
      return this.labelSet_;
    },
    restoreLabels_: function(oldLabels) {
      this.labelSet_ = oldLabels;
    },
    addLabel_: function(label) {
      var $__29 = this;
      var oldLabels = this.labelSet_;
      var labelSet = new StringMap();
      this.labelSet_.forEach(function(k) {
        return labelSet[k] = $__29.labelSet_[k];
      });
      labelSet.set(label.name, label);
      this.labelSet_ = labelSet;
      return oldLabels;
    },
    clearLabels_: function() {
      var result = this.labelSet_;
      this.labelSet_ = new StringMap();
      return result;
    },
    clearCurrentLabel_: function() {
      var result = this.currentLabel_;
      this.currentLabel_ = null;
      return result;
    },
    transformSwitchStatement: function(tree) {
      var $__30,
          $__31;
      var labels = this.getLabels_();
      var expression,
          machine,
          caseClauses;
      if (this.expressionNeedsStateMachine(tree.expression)) {
        (($__30 = this.expressionToStateMachine(tree.expression), expression = $__30.expression, machine = $__30.machine, $__30));
        caseClauses = this.transformList(tree.caseClauses);
      } else {
        var result = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformSwitchStatement").call(this, tree);
        if (!needsStateMachine(result))
          return result;
        (($__31 = result, expression = $__31.expression, caseClauses = $__31.caseClauses, $__31));
      }
      var startState = this.allocateState();
      var fallThroughState = this.allocateState();
      var nextState = fallThroughState;
      var states = [];
      var clauses = [];
      var tryStates = [];
      var hasDefault = false;
      for (var index = caseClauses.length - 1; index >= 0; index--) {
        var clause = caseClauses[index];
        if (clause.type === CASE_CLAUSE) {
          var caseClause = clause;
          nextState = this.addSwitchClauseStates_(nextState, fallThroughState, labels, caseClause.statements, states, tryStates);
          clauses.push(new SwitchClause(caseClause.expression, nextState));
        } else {
          hasDefault = true;
          var defaultClause = clause;
          nextState = this.addSwitchClauseStates_(nextState, fallThroughState, labels, defaultClause.statements, states, tryStates);
          clauses.push(new SwitchClause(null, nextState));
        }
      }
      if (!hasDefault) {
        clauses.push(new SwitchClause(null, fallThroughState));
      }
      states.push(new SwitchState(startState, expression, clauses.reverse()));
      var switchMachine = new StateMachine(startState, fallThroughState, states.reverse(), tryStates);
      if (machine)
        switchMachine = machine.append(switchMachine);
      return switchMachine;
    },
    addSwitchClauseStates_: function(nextState, fallThroughState, labels, statements, states, tryStates) {
      var $__32;
      var machine = this.ensureTransformedList_(statements);
      for (var i = 0; i < machine.states.length; i++) {
        var state = machine.states[i];
        var transformedState = state.transformBreak(labels, fallThroughState);
        states.push(transformedState.replaceState(machine.fallThroughState, nextState));
      }
      ($__32 = tryStates).push.apply($__32, $traceurRuntime.spread(machine.exceptionBlocks));
      return machine.startState;
    },
    transformTryStatement: function(tree) {
      var result = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformTryStatement").call(this, tree);
      var $__30 = result,
          body = $__30.body,
          catchBlock = $__30.catchBlock,
          finallyBlock = $__30.finallyBlock;
      if (body.type !== STATE_MACHINE && (catchBlock === null || catchBlock.catchBody.type !== STATE_MACHINE) && (finallyBlock === null || finallyBlock.block.type !== STATE_MACHINE)) {
        return result;
      }
      var outerCatchState = this.allocateState();
      var outerFinallyState = this.allocateState();
      var pushTryState = this.statementToStateMachine_(parseStatement($traceurRuntime.getTemplateObject(["$ctx.pushTry(\n            ", ",\n            ", ");"]), (catchBlock && outerCatchState), (finallyBlock && outerFinallyState)));
      var tryMachine = this.ensureTransformed_(body);
      tryMachine = pushTryState.append(tryMachine);
      if (catchBlock !== null) {
        var popTry = this.statementToStateMachine_(parseStatement($traceurRuntime.getTemplateObject(["$ctx.popTry();"])));
        tryMachine = tryMachine.append(popTry);
        var exceptionName = catchBlock.binding.identifierToken.value;
        var catchMachine = this.ensureTransformed_(catchBlock.catchBody);
        var catchStart = this.allocateState();
        this.addMachineVariable(exceptionName);
        var states = $traceurRuntime.spread(tryMachine.states, [new FallThroughState(catchStart, catchMachine.startState, parseStatements($traceurRuntime.getTemplateObject(["\n              $ctx.popTry();\n              $ctx.maybeUncatchable(); // see RETURN_SENTINEL in runtime\n              ", " = $ctx.storedException;"]), id(exceptionName)))]);
        this.replaceAndAddStates_(catchMachine.states, catchMachine.fallThroughState, tryMachine.fallThroughState, states);
        tryMachine = new StateMachine(tryMachine.startState, tryMachine.fallThroughState, states, [new CatchState(exceptionName, catchStart, tryMachine.fallThroughState, tryMachine.getAllStateIDs(), tryMachine.exceptionBlocks)]);
        tryMachine = tryMachine.replaceStateId(catchStart, outerCatchState);
      }
      if (finallyBlock !== null) {
        var finallyMachine = this.ensureTransformed_(finallyBlock.block);
        var popTry$__39 = this.statementToStateMachine_(parseStatement($traceurRuntime.getTemplateObject(["$ctx.popTry();"])));
        finallyMachine = popTry$__39.append(finallyMachine);
        var states$__40 = $traceurRuntime.spread(tryMachine.states, finallyMachine.states, [new FinallyFallThroughState(finallyMachine.fallThroughState)]);
        tryMachine = new StateMachine(tryMachine.startState, tryMachine.fallThroughState, states$__40, [new FinallyState(finallyMachine.startState, finallyMachine.fallThroughState, tryMachine.getAllStateIDs(), tryMachine.exceptionBlocks)]);
        tryMachine = tryMachine.replaceStateId(finallyMachine.startState, outerFinallyState);
      }
      return tryMachine;
    },
    transformWhileStatement: function(tree) {
      var $__32;
      var $__30,
          $__31;
      var labels = this.getLabels_();
      var label = this.clearCurrentLabel_();
      var condition,
          machine,
          body;
      if (this.expressionNeedsStateMachine(tree.condition)) {
        (($__30 = this.expressionToStateMachine(tree.condition), machine = $__30.machine, condition = $__30.expression, $__30));
        body = this.transformAny(tree.body);
      } else {
        var result = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformWhileStatement").call(this, tree);
        (($__31 = result, condition = $__31.condition, body = $__31.body, $__31));
        if (body.type !== STATE_MACHINE)
          return result;
      }
      var loopBodyMachine = this.ensureTransformed_(body);
      var startState = loopBodyMachine.fallThroughState;
      var fallThroughState = this.allocateState();
      var states = [];
      var conditionStart = startState;
      if (machine) {
        machine = machine.replaceStartState(startState);
        conditionStart = machine.fallThroughState;
        ($__32 = states).push.apply($__32, $traceurRuntime.spread(machine.states));
      }
      states.push(new ConditionalState(conditionStart, loopBodyMachine.startState, fallThroughState, condition));
      this.addLoopBodyStates_(loopBodyMachine, startState, fallThroughState, labels, states);
      machine = new StateMachine(startState, fallThroughState, states, loopBodyMachine.exceptionBlocks);
      if (label)
        machine = machine.replaceStateId(startState, label.continueState);
      return machine;
    },
    transformWithStatement: function(tree) {
      var result = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformWithStatement").call(this, tree);
      if (result.body.type !== STATE_MACHINE) {
        return result;
      }
      throw new Error('Unreachable - with statement not allowed in strict mode/harmony');
    },
    generateMachineInnerFunction: function(machine) {
      var enclosingFinallyState = machine.getEnclosingFinallyMap();
      var SwitchStatement = createSwitchStatement(createMemberExpression('$ctx', 'state'), this.transformMachineStates(machine, State.END_STATE, State.RETHROW_STATE, enclosingFinallyState));
      return parseExpression($traceurRuntime.getTemplateObject(["function($ctx) {\n      while (true) ", "\n    }"]), SwitchStatement);
    },
    addTempVar: function() {
      var name = this.getTempIdentifier();
      this.addMachineVariable(name);
      return name;
    },
    addMachineVariable: function(name) {
      this.hoistVariablesTransformer_.addVariable(name);
    },
    transformCpsFunctionBody: function(tree, runtimeMethod) {
      var $__32;
      var functionRef = arguments[2];
      var alphaRenamedTree = AlphaRenamer.rename(tree, 'arguments', '$arguments');
      var hasArguments = alphaRenamedTree !== tree;
      var hoistedTree = this.hoistVariablesTransformer_.transformAny(alphaRenamedTree);
      var maybeMachine = this.transformAny(hoistedTree);
      if (this.reporter.hadError())
        return tree;
      var machine;
      if (maybeMachine.type !== STATE_MACHINE) {
        machine = this.statementsToStateMachine_(maybeMachine.statements);
      } else {
        machine = new StateMachine(maybeMachine.startState, maybeMachine.fallThroughState, this.removeEmptyStates(maybeMachine.states), maybeMachine.exceptionBlocks);
      }
      machine = machine.replaceFallThroughState(State.END_STATE).replaceStartState(State.START_STATE);
      var statements = [];
      if (this.hoistVariablesTransformer_.hasFunctions())
        ($__32 = statements).push.apply($__32, $traceurRuntime.spread(this.hoistVariablesTransformer_.getFunctions()));
      if (this.hoistVariablesTransformer_.hasVariables())
        statements.push(this.hoistVariablesTransformer_.getVariableStatement());
      if (hasArguments)
        statements.push(parseStatement($traceurRuntime.getTemplateObject(["var $arguments = arguments;"])));
      if (functionRef) {
        statements.push(parseStatement($traceurRuntime.getTemplateObject(["return ", "(\n              ", ",\n              ", ", this);"]), runtimeMethod, this.generateMachineInnerFunction(machine), functionRef));
      } else {
        statements.push(parseStatement($traceurRuntime.getTemplateObject(["return ", "(\n              ", ", this);"]), runtimeMethod, this.generateMachineInnerFunction(machine)));
      }
      return createFunctionBody(statements);
    },
    transformFunctionDeclaration: function(tree) {
      return tree;
    },
    transformFunctionExpression: function(tree) {
      return tree;
    },
    transformGetAccessor: function(tree) {
      return tree;
    },
    transformSetAccessor: function(tree) {
      return tree;
    },
    transformArrowFunction: function(tree) {
      return tree;
    },
    transformStateMachine: function(tree) {
      return tree;
    },
    statementToStateMachine_: function(statement) {
      var statements;
      if (statement.type === BLOCK)
        statements = statement.statements;
      else
        statements = [statement];
      return this.statementsToStateMachine_(statements);
    },
    statementsToStateMachine_: function(statements) {
      var startState = this.allocateState();
      var fallThroughState = this.allocateState();
      return this.stateToStateMachine_(new FallThroughState(startState, fallThroughState, statements), fallThroughState);
    },
    stateToStateMachine_: function(newState, fallThroughState) {
      return new StateMachine(newState.id, fallThroughState, [newState], []);
    },
    transformMachineStates: function(machine, machineEndState, rethrowState, enclosingFinallyState) {
      var cases = [];
      for (var i = 0; i < machine.states.length; i++) {
        var state = machine.states[i];
        var stateCase = state.transformMachineState(enclosingFinallyState[state.id], machineEndState, this.reporter);
        if (stateCase !== null) {
          cases.push(stateCase);
        }
      }
      this.addFinallyFallThroughDispatches(null, machine.exceptionBlocks, cases);
      cases.push(createDefaultClause(parseStatements($traceurRuntime.getTemplateObject(["return $ctx.end()"]))));
      return cases;
    },
    addFinallyFallThroughDispatches: function(enclosingFinallyState, tryStates, cases) {
      for (var i = 0; i < tryStates.length; i++) {
        var tryState = tryStates[i];
        if (tryState.kind === TryState.Kind.FINALLY) {
          var finallyState = tryState;
          if (enclosingFinallyState !== null) {
            var caseClauses = [];
            var index = 0;
            for (var j = 0; j < enclosingFinallyState.tryStates.length; j++) {
              var destination = enclosingFinallyState.tryStates[j];
              index++;
              var statements = void 0;
              if (index < enclosingFinallyState.tryStates.length) {
                statements = [];
              } else {
                statements = parseStatements($traceurRuntime.getTemplateObject(["\n                  $ctx.state = $ctx.finallyFallThrough;\n                  $ctx.finallyFallThrough = ", ";\n                  break;"]), State.INVALID_STATE);
              }
              caseClauses.push(createCaseClause(createNumberLiteral(destination), statements));
            }
            caseClauses.push(createDefaultClause([createAssignStateStatement(enclosingFinallyState.finallyState), createBreakStatement()]));
            cases.push(createCaseClause(createNumberLiteral(finallyState.fallThroughState), [createSwitchStatement(createMemberExpression('$ctx', 'finallyFallThrough'), caseClauses), createBreakStatement()]));
          } else {
            cases.push(createCaseClause(createNumberLiteral(finallyState.fallThroughState), parseStatements($traceurRuntime.getTemplateObject(["\n                      $ctx.state = $ctx.finallyFallThrough;\n                      break;"]))));
          }
          this.addFinallyFallThroughDispatches(finallyState, finallyState.nestedTrys, cases);
        } else {
          this.addFinallyFallThroughDispatches(enclosingFinallyState, tryState.nestedTrys, cases);
        }
      }
    },
    transformVariableDeclarationList: function(tree) {
      this.reporter.reportError(tree.location, 'Traceur: const/let declarations in a block containing a yield are ' + 'not yet implemented');
      return tree;
    },
    maybeTransformStatement_: function(maybeTransformedStatement) {
      var breakContinueTransformed = new BreakContinueTransformer(this.stateAllocator_).transformAny(maybeTransformedStatement);
      if (breakContinueTransformed !== maybeTransformedStatement) {
        breakContinueTransformed = this.transformAny(breakContinueTransformed);
      }
      return breakContinueTransformed;
    },
    ensureTransformed_: function(statement) {
      if (statement === null) {
        return null;
      }
      var maybeTransformed = this.maybeTransformStatement_(statement);
      return maybeTransformed.type === STATE_MACHINE ? maybeTransformed : this.statementToStateMachine_(maybeTransformed);
    },
    ensureTransformedList_: function(statements) {
      var maybeTransformedStatements = [];
      var foundMachine = false;
      for (var i = 0; i < statements.length; i++) {
        var statement = statements[i];
        var maybeTransformedStatement = this.maybeTransformStatement_(statement);
        maybeTransformedStatements.push(maybeTransformedStatement);
        if (maybeTransformedStatement.type === STATE_MACHINE) {
          foundMachine = true;
        }
      }
      if (!foundMachine) {
        return this.statementsToStateMachine_(statements);
      }
      return this.transformStatementList_(maybeTransformedStatements);
    },
    expressionToStateMachine: function(tree) {
      var commaExpression = new ExplodeExpressionTransformer(this).transformAny(tree);
      var statements = new NormalizeCommaExpressionToStatementTransformer().transformAny(commaExpression).statements;
      var lastStatement = statements.pop();
      assert(lastStatement.type === EXPRESSION_STATEMENT);
      var expression = lastStatement.expression;
      statements = $traceurRuntime.superGet(this, CPSTransformer.prototype, "transformList").call(this, statements);
      var machine = this.transformStatementList_(statements);
      return {
        expression: expression,
        machine: machine
      };
    }
  }, {}, $__super);
}(TempVarTransformer);
var NormalizeCommaExpressionToStatementTransformer = function($__super) {
  function NormalizeCommaExpressionToStatementTransformer() {
    $traceurRuntime.superConstructor(NormalizeCommaExpressionToStatementTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(NormalizeCommaExpressionToStatementTransformer, {
    transformCommaExpression: function(tree) {
      var $__29 = this;
      var statements = tree.expressions.map(function(expr) {
        if (expr.type === CONDITIONAL_EXPRESSION)
          return $__29.transformAny(expr);
        return createExpressionStatement(expr);
      });
      return new AnonBlock(tree.location, statements);
    },
    transformConditionalExpression: function(tree) {
      var ifBlock = this.transformAny(tree.left);
      var elseBlock = this.transformAny(tree.right);
      return new IfStatement(tree.location, tree.condition, anonBlockToBlock(ifBlock), anonBlockToBlock(elseBlock));
    }
  }, {}, $__super);
}(ParseTreeTransformer);
function anonBlockToBlock(tree) {
  if (tree.type === PAREN_EXPRESSION)
    return anonBlockToBlock(tree.expression);
  return new Block(tree.location, tree.statements);
}
Object.defineProperties(module.exports, {
  CPSTransformer: {get: function() {
      return CPSTransformer;
    }},
  __esModule: {value: true}
});
