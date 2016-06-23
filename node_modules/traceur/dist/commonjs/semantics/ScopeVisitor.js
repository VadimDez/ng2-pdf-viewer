"use strict";
var $___46__46__47_syntax_47_ParseTreeVisitor_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__Scope_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__;
var ParseTreeVisitor = ($___46__46__47_syntax_47_ParseTreeVisitor_46_js__ = require("../syntax/ParseTreeVisitor.js"), $___46__46__47_syntax_47_ParseTreeVisitor_46_js__ && $___46__46__47_syntax_47_ParseTreeVisitor_46_js__.__esModule && $___46__46__47_syntax_47_ParseTreeVisitor_46_js__ || {default: $___46__46__47_syntax_47_ParseTreeVisitor_46_js__}).ParseTreeVisitor;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var Scope = ($__Scope_46_js__ = require("./Scope.js"), $__Scope_46_js__ && $__Scope_46_js__.__esModule && $__Scope_46_js__ || {default: $__Scope_46_js__}).Scope;
var $__3 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    COMPREHENSION_FOR = $__3.COMPREHENSION_FOR,
    VARIABLE_DECLARATION_LIST = $__3.VARIABLE_DECLARATION_LIST;
var ScopeVisitor = function($__super) {
  function ScopeVisitor() {
    $traceurRuntime.superConstructor(ScopeVisitor).call(this);
    this.map_ = new Map();
    this.scope = null;
    this.withBlockCounter_ = 0;
  }
  return ($traceurRuntime.createClass)(ScopeVisitor, {
    getScopeForTree: function(tree) {
      return this.map_.get(tree);
    },
    createScope: function(tree) {
      return new Scope(this.scope, tree);
    },
    pushScope: function(tree) {
      var scope = this.createScope(tree);
      this.map_.set(tree, scope);
      return this.scope = scope;
    },
    popScope: function(scope) {
      if (this.scope !== scope) {
        throw new Error('ScopeVisitor scope mismatch');
      }
      this.scope = scope.parent;
    },
    visitScript: function(tree) {
      var scope = this.pushScope(tree);
      $traceurRuntime.superGet(this, ScopeVisitor.prototype, "visitScript").call(this, tree);
      this.popScope(scope);
    },
    visitModule: function(tree) {
      var scope = this.pushScope(tree);
      $traceurRuntime.superGet(this, ScopeVisitor.prototype, "visitModule").call(this, tree);
      this.popScope(scope);
    },
    visitBlock: function(tree) {
      var scope = this.pushScope(tree);
      $traceurRuntime.superGet(this, ScopeVisitor.prototype, "visitBlock").call(this, tree);
      this.popScope(scope);
    },
    visitCatch: function(tree) {
      var scope = this.pushScope(tree);
      this.visitAny(tree.binding);
      this.visitList(tree.catchBody.statements);
      this.popScope(scope);
    },
    visitFunctionBodyForScope: function(tree) {
      var parameterList = arguments[1] !== (void 0) ? arguments[1] : tree.parameterList;
      var scope = this.pushScope(tree);
      this.visitAny(parameterList);
      scope.inGenerator = tree.functionKind && tree.isGenerator();
      this.visitAny(tree.body);
      this.popScope(scope);
    },
    visitFunctionExpression: function(tree) {
      this.visitFunctionBodyForScope(tree);
    },
    visitFunctionDeclaration: function(tree) {
      this.visitAny(tree.name);
      this.visitFunctionBodyForScope(tree);
    },
    visitArrowFunction: function(tree) {
      this.visitFunctionBodyForScope(tree);
    },
    visitGetAccessor: function(tree) {
      this.visitFunctionBodyForScope(tree, null);
    },
    visitSetAccessor: function(tree) {
      this.visitFunctionBodyForScope(tree);
    },
    visitMethod: function(tree) {
      this.visitFunctionBodyForScope(tree);
    },
    visitClassDeclaration: function(tree) {
      this.visitAny(tree.superClass);
      var scope = this.pushScope(tree);
      this.visitAny(tree.name);
      this.visitList(tree.elements);
      this.popScope(scope);
    },
    visitClassExpression: function(tree) {
      this.visitAny(tree.superClass);
      var scope;
      if (tree.name) {
        scope = this.pushScope(tree);
        this.visitAny(tree.name);
      }
      this.visitList(tree.elements);
      if (tree.name) {
        this.popScope(scope);
      }
    },
    visitWithStatement: function(tree) {
      this.visitAny(tree.expression);
      this.withBlockCounter_++;
      this.visitAny(tree.body);
      this.withBlockCounter_--;
    },
    get inWithBlock() {
      return this.withBlockCounter_ > 0;
    },
    visitLoop_: function(tree, func) {
      if (tree.initializer.type !== VARIABLE_DECLARATION_LIST || tree.initializer.declarationType === VAR) {
        func();
        return;
      }
      var scope = this.pushScope(tree);
      func();
      this.popScope(scope);
    },
    visitForInStatement: function(tree) {
      var $__7 = this;
      this.visitLoop_(tree, function() {
        return $traceurRuntime.superGet($__7, ScopeVisitor.prototype, "visitForInStatement").call($__7, tree);
      });
    },
    visitForOfStatement: function(tree) {
      var $__7 = this;
      this.visitLoop_(tree, function() {
        return $traceurRuntime.superGet($__7, ScopeVisitor.prototype, "visitForOfStatement").call($__7, tree);
      });
    },
    visitForStatement: function(tree) {
      var $__7 = this;
      if (!tree.initializer) {
        $traceurRuntime.superGet(this, ScopeVisitor.prototype, "visitForStatement").call(this, tree);
      } else {
        this.visitLoop_(tree, function() {
          return $traceurRuntime.superGet($__7, ScopeVisitor.prototype, "visitForStatement").call($__7, tree);
        });
      }
    },
    visitComprehension_: function(tree) {
      var scopes = [];
      for (var i = 0; i < tree.comprehensionList.length; i++) {
        var scope = null;
        if (tree.comprehensionList[i].type === COMPREHENSION_FOR) {
          scope = this.pushScope(tree.comprehensionList[i]);
        }
        scopes.push(scope);
        this.visitAny(tree.comprehensionList[i]);
      }
      this.visitAny(tree.expression);
      for (var i$__8 = scopes.length - 1; i$__8 >= 0; i$__8--) {
        if (scopes[i$__8]) {
          this.popScope(scopes[i$__8]);
        }
      }
    },
    visitArrayComprehension: function(tree) {
      this.visitComprehension_(tree);
    },
    visitGeneratorComprehension: function(tree) {
      this.visitComprehension_(tree);
    },
    visitPredefinedType: function(tree) {},
    visitTypeArguments: function(tree) {},
    visitFunctionType: function(tree) {}
  }, {}, $__super);
}(ParseTreeVisitor);
Object.defineProperties(module.exports, {
  ScopeVisitor: {get: function() {
      return ScopeVisitor;
    }},
  __esModule: {value: true}
});
