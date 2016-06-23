"use strict";
var $___46__46__47_semantics_47_ScopeVisitor_46_js__;
var ScopeVisitor = ($___46__46__47_semantics_47_ScopeVisitor_46_js__ = require("../semantics/ScopeVisitor.js"), $___46__46__47_semantics_47_ScopeVisitor_46_js__ && $___46__46__47_semantics_47_ScopeVisitor_46_js__.__esModule && $___46__46__47_semantics_47_ScopeVisitor_46_js__ || {default: $___46__46__47_semantics_47_ScopeVisitor_46_js__}).ScopeVisitor;
var FindIdentifiers = function($__super) {
  function FindIdentifiers(tree, filterFunction) {
    $traceurRuntime.superConstructor(FindIdentifiers).call(this);
    this.filterFunction_ = filterFunction;
    this.found_ = false;
    this.visitAny(tree);
  }
  return ($traceurRuntime.createClass)(FindIdentifiers, {
    visitIdentifierExpression: function(tree) {
      if (this.filterFunction_(tree.identifierToken.value, this.scope.tree)) {
        this.found = true;
      }
    },
    get found() {
      return this.found_;
    },
    set found(v) {
      if (v) {
        this.found_ = true;
      }
    },
    visitAny: function(tree) {
      !this.found_ && tree && tree.visit(this);
    },
    visitList: function(list) {
      if (list) {
        for (var i = 0; !this.found_ && i < list.length; i++) {
          this.visitAny(list[i]);
        }
      }
    }
  }, {}, $__super);
}(ScopeVisitor);
Object.defineProperties(module.exports, {
  FindIdentifiers: {get: function() {
      return FindIdentifiers;
    }},
  __esModule: {value: true}
});
