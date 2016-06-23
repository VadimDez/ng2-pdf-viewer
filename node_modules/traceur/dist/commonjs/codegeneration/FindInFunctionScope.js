"use strict";
var $__FindVisitor_46_js__;
var FindVisitor = ($__FindVisitor_46_js__ = require("./FindVisitor.js"), $__FindVisitor_46_js__ && $__FindVisitor_46_js__.__esModule && $__FindVisitor_46_js__ || {default: $__FindVisitor_46_js__}).FindVisitor;
var FindInFunctionScope = function($__super) {
  function FindInFunctionScope() {
    $traceurRuntime.superConstructor(FindInFunctionScope).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(FindInFunctionScope, {
    visitFunctionDeclaration: function(tree) {
      this.visitList(tree.annotations);
    },
    visitFunctionExpression: function(tree) {
      this.visitList(tree.annotations);
    },
    visitSetAccessor: function(tree) {
      this.visitAny(tree.name);
      this.visitList(tree.annotations);
    },
    visitGetAccessor: function(tree) {
      this.visitAny(tree.name);
      this.visitList(tree.annotations);
    },
    visitMethod: function(tree) {
      this.visitAny(tree.name);
      this.visitList(tree.annotations);
    }
  }, {}, $__super);
}(FindVisitor);
Object.defineProperties(module.exports, {
  FindInFunctionScope: {get: function() {
      return FindInFunctionScope;
    }},
  __esModule: {value: true}
});
