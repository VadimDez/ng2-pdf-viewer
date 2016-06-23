"use strict";
var $___46__46__47_syntax_47_TokenType_46_js__,
    $__ModuleTransformer_46_js__,
    $__ParseTreeFactory_46_js__,
    $__globalThis_46_js__,
    $__scopeContainsThis_46_js__;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var ModuleTransformer = ($__ModuleTransformer_46_js__ = require("./ModuleTransformer.js"), $__ModuleTransformer_46_js__ && $__ModuleTransformer_46_js__.__esModule && $__ModuleTransformer_46_js__ || {default: $__ModuleTransformer_46_js__}).ModuleTransformer;
var $__2 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createBindingIdentifier = $__2.createBindingIdentifier,
    createEmptyStatement = $__2.createEmptyStatement,
    createFunctionBody = $__2.createFunctionBody,
    createImmediatelyInvokedFunctionExpression = $__2.createImmediatelyInvokedFunctionExpression,
    createScopedExpression = $__2.createScopedExpression,
    createVariableStatement = $__2.createVariableStatement;
var globalThis = ($__globalThis_46_js__ = require("./globalThis.js"), $__globalThis_46_js__ && $__globalThis_46_js__.__esModule && $__globalThis_46_js__ || {default: $__globalThis_46_js__}).default;
var scopeContainsThis = ($__scopeContainsThis_46_js__ = require("./scopeContainsThis.js"), $__scopeContainsThis_46_js__ && $__scopeContainsThis_46_js__.__esModule && $__scopeContainsThis_46_js__ || {default: $__scopeContainsThis_46_js__}).default;
var anonInlineModules = 0;
var InlineModuleTransformer = function($__super) {
  function InlineModuleTransformer() {
    $traceurRuntime.superConstructor(InlineModuleTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(InlineModuleTransformer, {
    wrapModule: function(statements) {
      var seed = this.moduleName || 'anon_' + ++anonInlineModules;
      var idName = this.getTempVarNameForModuleName(seed);
      var body = createFunctionBody(statements);
      var moduleExpression;
      if (statements.some(scopeContainsThis)) {
        moduleExpression = createScopedExpression(body, globalThis());
      } else {
        moduleExpression = createImmediatelyInvokedFunctionExpression(body);
      }
      return [createVariableStatement(VAR, idName, moduleExpression)];
    },
    transformNamedExport: function(tree) {
      return createEmptyStatement();
    },
    transformModuleSpecifier: function(tree) {
      return createBindingIdentifier(this.getTempVarNameForModuleSpecifier(tree));
    }
  }, {}, $__super);
}(ModuleTransformer);
Object.defineProperties(module.exports, {
  InlineModuleTransformer: {get: function() {
      return InlineModuleTransformer;
    }},
  __esModule: {value: true}
});
