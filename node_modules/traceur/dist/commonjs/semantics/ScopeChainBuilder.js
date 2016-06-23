"use strict";
var $___46__46__47_syntax_47_TokenType_46_js__,
    $__ScopeVisitor_46_js__;
var $__0 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    CONST = $__0.CONST,
    LET = $__0.LET,
    VAR = $__0.VAR;
var ScopeVisitor = ($__ScopeVisitor_46_js__ = require("./ScopeVisitor.js"), $__ScopeVisitor_46_js__ && $__ScopeVisitor_46_js__.__esModule && $__ScopeVisitor_46_js__ || {default: $__ScopeVisitor_46_js__}).ScopeVisitor;
var ScopeChainBuilder = function($__super) {
  function ScopeChainBuilder(reporter) {
    $traceurRuntime.superConstructor(ScopeChainBuilder).call(this);
    this.reporter = reporter;
    this.declarationType_ = null;
  }
  return ($traceurRuntime.createClass)(ScopeChainBuilder, {
    visitCatch: function(tree) {
      var scope = this.pushScope(tree);
      this.declarationType_ = LET;
      this.visitAny(tree.binding);
      this.visitList(tree.catchBody.statements);
      this.popScope(scope);
    },
    visitImportedBinding: function(tree) {
      this.declarationType_ = CONST;
      $traceurRuntime.superGet(this, ScopeChainBuilder.prototype, "visitImportedBinding").call(this, tree);
    },
    visitVariableDeclarationList: function(tree) {
      this.declarationType_ = tree.declarationType;
      $traceurRuntime.superGet(this, ScopeChainBuilder.prototype, "visitVariableDeclarationList").call(this, tree);
    },
    visitBindingIdentifier: function(tree) {
      this.declareVariable(tree);
    },
    visitFunctionExpression: function(tree) {
      var scope = this.pushScope(tree);
      if (tree.name) {
        this.declarationType_ = CONST;
        this.visitAny(tree.name);
      }
      this.visitAny(tree.parameterList);
      scope.inGenerator = tree.isGenerator();
      this.visitAny(tree.body);
      this.popScope(scope);
    },
    visitFormalParameter: function(tree) {
      this.declarationType_ = VAR;
      $traceurRuntime.superGet(this, ScopeChainBuilder.prototype, "visitFormalParameter").call(this, tree);
    },
    visitFunctionDeclaration: function(tree) {
      if (this.scope) {
        if (this.scope.isVarScope) {
          this.declarationType_ = VAR;
          this.visitAny(tree.name);
        } else {
          if (!this.scope.strictMode) {
            var varScope = this.scope.getVarScope();
            if (varScope) {
              varScope.addVar(tree.name, this.reporter);
            }
          }
          this.declarationType_ = LET;
          this.visitAny(tree.name);
        }
      }
      this.visitFunctionBodyForScope(tree, tree.parameterList, tree.body);
    },
    visitClassDeclaration: function(tree) {
      this.visitAny(tree.superClass);
      this.declarationType_ = LET;
      this.visitAny(tree.name);
      var scope = this.pushScope(tree);
      this.declarationType_ = CONST;
      this.visitAny(tree.name);
      this.visitList(tree.elements);
      this.popScope(scope);
    },
    visitClassExpression: function(tree) {
      this.visitAny(tree.superClass);
      var scope;
      if (tree.name) {
        scope = this.pushScope(tree);
        this.declarationType_ = CONST;
        this.visitAny(tree.name);
      }
      this.visitList(tree.elements);
      if (tree.name) {
        this.popScope(scope);
      }
    },
    visitComprehensionFor: function(tree) {
      this.declarationType_ = LET;
      $traceurRuntime.superGet(this, ScopeChainBuilder.prototype, "visitComprehensionFor").call(this, tree);
    },
    declareVariable: function(tree) {
      this.scope.addBinding(tree, this.declarationType_, this.reporter);
    }
  }, {}, $__super);
}(ScopeVisitor);
Object.defineProperties(module.exports, {
  ScopeChainBuilder: {get: function() {
      return ScopeChainBuilder;
    }},
  __esModule: {value: true}
});
