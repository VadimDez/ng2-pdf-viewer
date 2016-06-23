"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__ScopeVisitor_46_js__,
    $__ScopeChainBuilder_46_js__;
var IDENTIFIER_EXPRESSION = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}).IDENTIFIER_EXPRESSION;
var $__1 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    CONST = $__1.CONST,
    MINUS_MINUS = $__1.MINUS_MINUS,
    PLUS_PLUS = $__1.PLUS_PLUS;
var ScopeVisitor = ($__ScopeVisitor_46_js__ = require("./ScopeVisitor.js"), $__ScopeVisitor_46_js__ && $__ScopeVisitor_46_js__.__esModule && $__ScopeVisitor_46_js__ || {default: $__ScopeVisitor_46_js__}).ScopeVisitor;
var ScopeChainBuilder = ($__ScopeChainBuilder_46_js__ = require("./ScopeChainBuilder.js"), $__ScopeChainBuilder_46_js__ && $__ScopeChainBuilder_46_js__.__esModule && $__ScopeChainBuilder_46_js__ || {default: $__ScopeChainBuilder_46_js__}).ScopeChainBuilder;
var ConstChecker = function($__super) {
  function ConstChecker(scopeBuilder, reporter) {
    $traceurRuntime.superConstructor(ConstChecker).call(this);
    this.scopeBuilder_ = scopeBuilder;
    this.reporter_ = reporter;
  }
  return ($traceurRuntime.createClass)(ConstChecker, {
    pushScope: function(tree) {
      return this.scope = this.scopeBuilder_.getScopeForTree(tree);
    },
    visitUnaryExpression: function(tree) {
      if (tree.operand.type === IDENTIFIER_EXPRESSION && (tree.operator.type === PLUS_PLUS || tree.operator.type === MINUS_MINUS)) {
        this.validateMutation_(tree.operand);
      }
      $traceurRuntime.superGet(this, ConstChecker.prototype, "visitUnaryExpression").call(this, tree);
    },
    visitPostfixExpression: function(tree) {
      if (tree.operand.type === IDENTIFIER_EXPRESSION) {
        this.validateMutation_(tree.operand);
      }
      $traceurRuntime.superGet(this, ConstChecker.prototype, "visitPostfixExpression").call(this, tree);
    },
    visitBinaryExpression: function(tree) {
      if (tree.left.type === IDENTIFIER_EXPRESSION && tree.operator.isAssignmentOperator()) {
        this.validateMutation_(tree.left);
      }
      $traceurRuntime.superGet(this, ConstChecker.prototype, "visitBinaryExpression").call(this, tree);
    },
    validateMutation_: function(identifierExpression) {
      if (this.inWithBlock) {
        return;
      }
      var binding = this.scope.getBinding(identifierExpression);
      if (binding === null) {
        return;
      }
      var $__7 = binding,
          type = $__7.type,
          tree = $__7.tree;
      if (type === CONST) {
        this.reportError_(identifierExpression.location, (tree.getStringValue() + " is read-only"));
      }
    },
    reportError_: function(location, message) {
      this.reporter_.reportError(location, message);
    }
  }, {}, $__super);
}(ScopeVisitor);
function validate(tree, reporter) {
  var builder = new ScopeChainBuilder(reporter);
  builder.visitAny(tree);
  var checker = new ConstChecker(builder, reporter);
  checker.visitAny(tree);
}
Object.defineProperties(module.exports, {
  ConstChecker: {get: function() {
      return ConstChecker;
    }},
  validate: {get: function() {
      return validate;
    }},
  __esModule: {value: true}
});
