"use strict";
var $__ScopeChainBuilder_46_js__;
var ScopeChainBuilder = ($__ScopeChainBuilder_46_js__ = require("./ScopeChainBuilder.js"), $__ScopeChainBuilder_46_js__ && $__ScopeChainBuilder_46_js__.__esModule && $__ScopeChainBuilder_46_js__ || {default: $__ScopeChainBuilder_46_js__}).ScopeChainBuilder;
function variablesInBlock(tree) {
  var includeFunctionScope = arguments[1];
  var builder = new ScopeChainBuilder(null);
  builder.visitAny(tree);
  var scope = builder.getScopeForTree(tree);
  var names = scope.getLexicalBindingNames();
  if (!includeFunctionScope) {
    return names;
  }
  var variableBindingNames = scope.getVariableBindingNames();
  variableBindingNames.forEach(function(name) {
    return names.add(name);
  });
  return names;
}
function variablesInFunction(tree) {
  var builder = new ScopeChainBuilder(null);
  builder.visitAny(tree);
  var scope = builder.getScopeForTree(tree);
  return scope.getAllBindingNames();
}
Object.defineProperties(module.exports, {
  variablesInBlock: {get: function() {
      return variablesInBlock;
    }},
  variablesInFunction: {get: function() {
      return variablesInFunction;
    }},
  __esModule: {value: true}
});
