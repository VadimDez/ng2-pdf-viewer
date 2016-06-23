"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_codegeneration_47_FindVisitor_46_js__;
var SUPER_EXPRESSION = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}).SUPER_EXPRESSION;
var FindVisitor = ($___46__46__47_codegeneration_47_FindVisitor_46_js__ = require("../codegeneration/FindVisitor.js"), $___46__46__47_codegeneration_47_FindVisitor_46_js__ && $___46__46__47_codegeneration_47_FindVisitor_46_js__.__esModule && $___46__46__47_codegeneration_47_FindVisitor_46_js__ || {default: $___46__46__47_codegeneration_47_FindVisitor_46_js__}).FindVisitor;
var ConstructorValidator = function($__super) {
  function ConstructorValidator(reporter) {
    $traceurRuntime.superConstructor(ConstructorValidator).call(this);
    this.reporter_ = reporter;
    this.hasError = false;
  }
  return ($traceurRuntime.createClass)(ConstructorValidator, {
    visitClassExpression: function(tree) {
      this.visitAny(tree.superClass);
    },
    visitClassDeclaration: function(tree) {
      this.visitAny(tree.superClass);
    },
    visitThisExpression: function(tree) {
      this.reportError_(tree.location, 'this');
    },
    visitCallExpression: function(tree) {
      if (tree.operand.type === SUPER_EXPRESSION) {
        this.visitAny(tree.args);
        this.found = true;
        return;
      }
      $traceurRuntime.superGet(this, ConstructorValidator.prototype, "visitCallExpression").call(this, tree);
    },
    visitSuperExpression: function(tree) {
      this.reportError_(tree.location, 'super property');
    },
    reportError_: function(location, kind) {
      this.reporter_.reportError(location, ("'" + kind + "' is not allowed before super()"));
      this.hasError = true;
      this.found = true;
    }
  }, {}, $__super);
}(FindVisitor);
function validateConstructor(tree, reporter) {
  var visitor = new ConstructorValidator(reporter);
  visitor.visitAny(tree);
  if (visitor.hasError)
    return false;
  if (visitor.found)
    return true;
  reporter.reportError(tree.location, 'Derived constructor must call super()');
  return false;
}
Object.defineProperties(module.exports, {
  validateConstructor: {get: function() {
      return validateConstructor;
    }},
  __esModule: {value: true}
});
