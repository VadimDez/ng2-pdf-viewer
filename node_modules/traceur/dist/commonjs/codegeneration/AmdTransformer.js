"use strict";
var $__ModuleTransformer_46_js__,
    $__ParseTreeFactory_46_js__,
    $__globalThis_46_js__,
    $__PlaceholderParser_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__scopeContainsThis_46_js__;
var ModuleTransformer = ($__ModuleTransformer_46_js__ = require("./ModuleTransformer.js"), $__ModuleTransformer_46_js__ && $__ModuleTransformer_46_js__.__esModule && $__ModuleTransformer_46_js__ || {default: $__ModuleTransformer_46_js__}).ModuleTransformer;
var $__1 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createIdentifierExpression = $__1.createIdentifierExpression,
    createFormalParameter = $__1.createFormalParameter,
    createStringLiteralToken = $__1.createStringLiteralToken;
var globalThis = ($__globalThis_46_js__ = require("./globalThis.js"), $__globalThis_46_js__ && $__globalThis_46_js__.__esModule && $__globalThis_46_js__ || {default: $__globalThis_46_js__}).default;
var $__3 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseExpression = $__3.parseExpression,
    parseStatement = $__3.parseStatement,
    parseStatements = $__3.parseStatements,
    parsePropertyDefinition = $__3.parsePropertyDefinition;
var $__4 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    FormalParameterList = $__4.FormalParameterList,
    FunctionBody = $__4.FunctionBody,
    FunctionExpression = $__4.FunctionExpression;
var scopeContainsThis = ($__scopeContainsThis_46_js__ = require("./scopeContainsThis.js"), $__scopeContainsThis_46_js__ && $__scopeContainsThis_46_js__.__esModule && $__scopeContainsThis_46_js__ || {default: $__scopeContainsThis_46_js__}).default;
var AmdTransformer = function($__super) {
  function AmdTransformer(identifierGenerator, reporter) {
    var options = arguments[2];
    $traceurRuntime.superConstructor(AmdTransformer).call(this, identifierGenerator, reporter, options);
    this.dependencies = [];
    this.anonymousModule = options && !options.bundle && options.moduleName !== true;
  }
  return ($traceurRuntime.createClass)(AmdTransformer, {
    getModuleName: function(tree) {
      if (this.anonymousModule)
        return null;
      return tree.moduleName;
    },
    getExportProperties: function() {
      var properties = $traceurRuntime.superGet(this, AmdTransformer.prototype, "getExportProperties").call(this);
      if (this.exportVisitor_.hasExports())
        properties.push(parsePropertyDefinition($traceurRuntime.getTemplateObject(["__esModule: true"])));
      return properties;
    },
    moduleProlog: function() {
      var locals = this.dependencies.map(function(dep) {
        var local = createIdentifierExpression(dep.local);
        return parseStatement($traceurRuntime.getTemplateObject(["if (!", " || !", ".__esModule)\n            ", " = {default: ", "}"]), local, local, local, local);
      });
      return $traceurRuntime.superGet(this, AmdTransformer.prototype, "moduleProlog").call(this).concat(locals);
    },
    wrapModule: function(statements) {
      var depPaths = this.dependencies.map(function(dep) {
        return dep.path;
      });
      var formals = this.dependencies.map(function(dep) {
        return createFormalParameter(dep.local);
      });
      var hasTopLevelThis = statements.some(scopeContainsThis);
      var parameterList = new FormalParameterList(null, formals);
      var body = new FunctionBody(null, statements);
      var func = new FunctionExpression(null, null, null, parameterList, null, [], body);
      if (hasTopLevelThis)
        func = parseExpression($traceurRuntime.getTemplateObject(["", ".bind(", ")"]), func, globalThis());
      if (this.moduleName) {
        return parseStatements($traceurRuntime.getTemplateObject(["define(", ", ", ", ", ");"]), this.moduleName, depPaths, func);
      } else {
        return parseStatements($traceurRuntime.getTemplateObject(["define(", ", ", ");"]), depPaths, func);
      }
    },
    transformModuleSpecifier: function(tree) {
      var localName = this.getTempIdentifier();
      var value = tree.token.processedValue;
      var stringLiteral = createStringLiteralToken(value.replace(/\.js$/, ''));
      this.dependencies.push({
        path: stringLiteral,
        local: localName
      });
      return createIdentifierExpression(localName);
    }
  }, {}, $__super);
}(ModuleTransformer);
Object.defineProperties(module.exports, {
  AmdTransformer: {get: function() {
      return AmdTransformer;
    }},
  __esModule: {value: true}
});
