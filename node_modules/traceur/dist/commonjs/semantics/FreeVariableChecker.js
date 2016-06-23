"use strict";
var $__ScopeChainBuilderWithReferences_46_js__;
var ScopeChainBuilderWithReferences = ($__ScopeChainBuilderWithReferences_46_js__ = require("./ScopeChainBuilderWithReferences.js"), $__ScopeChainBuilderWithReferences_46_js__ && $__ScopeChainBuilderWithReferences_46_js__.__esModule && $__ScopeChainBuilderWithReferences_46_js__ || {default: $__ScopeChainBuilderWithReferences_46_js__}).ScopeChainBuilderWithReferences;
var FreeVariableChecker = function($__super) {
  function FreeVariableChecker(reporter, global) {
    $traceurRuntime.superConstructor(FreeVariableChecker).call(this, reporter);
    this.global_ = global;
  }
  return ($traceurRuntime.createClass)(FreeVariableChecker, {referenceFound: function(tree, name) {
      if (this.scope.getBinding(tree))
        return;
      if (!(name in this.global_)) {
        this.reporter.reportError(tree.location, (name + " is not defined"));
      }
    }}, {}, $__super);
}(ScopeChainBuilderWithReferences);
function validate(tree, reporter) {
  var global = arguments[2] !== (void 0) ? arguments[2] : Reflect.global;
  var checker = new FreeVariableChecker(reporter, global);
  checker.visitAny(tree);
}
Object.defineProperties(module.exports, {
  validate: {get: function() {
      return validate;
    }},
  __esModule: {value: true}
});
