"use strict";
var $__ScopeChainBuilder_46_js__,
    $__ScopeReferences_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__;
var ScopeChainBuilder = ($__ScopeChainBuilder_46_js__ = require("./ScopeChainBuilder.js"), $__ScopeChainBuilder_46_js__ && $__ScopeChainBuilder_46_js__.__esModule && $__ScopeChainBuilder_46_js__ || {default: $__ScopeChainBuilder_46_js__}).ScopeChainBuilder;
var ScopeReferences = ($__ScopeReferences_46_js__ = require("./ScopeReferences.js"), $__ScopeReferences_46_js__ && $__ScopeReferences_46_js__.__esModule && $__ScopeReferences_46_js__ || {default: $__ScopeReferences_46_js__}).ScopeReferences;
var $__2 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    FUNCTION_DECLARATION = $__2.FUNCTION_DECLARATION,
    FUNCTION_EXPRESSION = $__2.FUNCTION_EXPRESSION,
    GET_ACCESSOR = $__2.GET_ACCESSOR,
    IDENTIFIER_EXPRESSION = $__2.IDENTIFIER_EXPRESSION,
    METHOD = $__2.METHOD,
    MODULE = $__2.MODULE,
    SET_ACCESSOR = $__2.SET_ACCESSOR;
var TYPEOF = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).TYPEOF;
function hasArgumentsInScope(scope) {
  for (; scope; scope = scope.parent) {
    switch (scope.tree.type) {
      case FUNCTION_DECLARATION:
      case FUNCTION_EXPRESSION:
      case GET_ACCESSOR:
      case METHOD:
      case SET_ACCESSOR:
        return true;
    }
  }
  return false;
}
function inModuleScope(scope) {
  for (; scope; scope = scope.parent) {
    if (scope.tree.type === MODULE) {
      return true;
    }
  }
  return false;
}
var ScopeChainBuilderWithReferences = function($__super) {
  function ScopeChainBuilderWithReferences() {
    $traceurRuntime.superConstructor(ScopeChainBuilderWithReferences).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ScopeChainBuilderWithReferences, {
    createScope: function(tree) {
      return new ScopeReferences(this.scope, tree);
    },
    visitIdentifierExpression: function(tree) {
      if (this.inWithBlock) {
        return;
      }
      var scope = this.scope;
      var name = tree.getStringValue();
      if (name === 'arguments' && hasArgumentsInScope(scope)) {
        return;
      }
      if (name === '__moduleName' && inModuleScope(scope)) {
        return;
      }
      this.referenceFound(tree, name);
    },
    visitUnaryExpression: function(tree) {
      if (tree.operator.type === TYPEOF && tree.operand.type === IDENTIFIER_EXPRESSION) {
        var scope = this.scope;
        var binding = scope.getBinding(tree.operand);
        if (!binding) {
          scope.addVar(tree.operand, this.reporter);
        }
      } else {
        $traceurRuntime.superGet(this, ScopeChainBuilderWithReferences.prototype, "visitUnaryExpression").call(this, tree);
      }
    },
    referenceFound: function(tree, name) {
      this.scope.addReference(name);
    }
  }, {}, $__super);
}(ScopeChainBuilder);
Object.defineProperties(module.exports, {
  ScopeChainBuilderWithReferences: {get: function() {
      return ScopeChainBuilderWithReferences;
    }},
  __esModule: {value: true}
});
