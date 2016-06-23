"use strict";
var $___46__46__47_syntax_47_PredefinedName_46_js__,
    $__FindInFunctionScope_46_js__;
var ARGUMENTS = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}).ARGUMENTS;
var FindInFunctionScope = ($__FindInFunctionScope_46_js__ = require("./FindInFunctionScope.js"), $__FindInFunctionScope_46_js__ && $__FindInFunctionScope_46_js__.__esModule && $__FindInFunctionScope_46_js__ || {default: $__FindInFunctionScope_46_js__}).FindInFunctionScope;
var FindThisOrArguments = function($__super) {
  function FindThisOrArguments() {
    $traceurRuntime.superConstructor(FindThisOrArguments).call(this);
    this.foundThis = false;
    this.foundArguments = false;
  }
  return ($traceurRuntime.createClass)(FindThisOrArguments, {
    visitThisExpression: function(tree) {
      this.foundThis = true;
      this.found = this.foundArguments;
    },
    visitIdentifierExpression: function(tree) {
      if (tree.identifierToken.value === ARGUMENTS) {
        this.foundArguments = true;
        this.found = this.foundThis;
      }
    }
  }, {}, $__super);
}(FindInFunctionScope);
Object.defineProperties(module.exports, {
  FindThisOrArguments: {get: function() {
      return FindThisOrArguments;
    }},
  __esModule: {value: true}
});
