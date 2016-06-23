"use strict";
var $__ModuleTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_util_47_assert_46_js__,
    $__globalThis_46_js__,
    $__PlaceholderParser_46_js__,
    $__scopeContainsThis_46_js__,
    $__ParseTreeFactory_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__;
var ModuleTransformer = ($__ModuleTransformer_46_js__ = require("./ModuleTransformer.js"), $__ModuleTransformer_46_js__ && $__ModuleTransformer_46_js__.__esModule && $__ModuleTransformer_46_js__ || {default: $__ModuleTransformer_46_js__}).ModuleTransformer;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    CALL_EXPRESSION = $__1.CALL_EXPRESSION,
    GET_ACCESSOR = $__1.GET_ACCESSOR,
    OBJECT_LITERAL = $__1.OBJECT_LITERAL,
    PROPERTY_NAME_ASSIGNMENT = $__1.PROPERTY_NAME_ASSIGNMENT,
    RETURN_STATEMENT = $__1.RETURN_STATEMENT;
var $__2 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    ArgumentList = $__2.ArgumentList,
    CallExpression = $__2.CallExpression,
    ExpressionStatement = $__2.ExpressionStatement;
var assert = ($___46__46__47_util_47_assert_46_js__ = require("../util/assert.js"), $___46__46__47_util_47_assert_46_js__ && $___46__46__47_util_47_assert_46_js__.__esModule && $___46__46__47_util_47_assert_46_js__ || {default: $___46__46__47_util_47_assert_46_js__}).assert;
var globalThis = ($__globalThis_46_js__ = require("./globalThis.js"), $__globalThis_46_js__ && $__globalThis_46_js__.__esModule && $__globalThis_46_js__ || {default: $__globalThis_46_js__}).default;
var $__5 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseExpression = $__5.parseExpression,
    parsePropertyDefinition = $__5.parsePropertyDefinition,
    parseStatements = $__5.parseStatements;
var scopeContainsThis = ($__scopeContainsThis_46_js__ = require("./scopeContainsThis.js"), $__scopeContainsThis_46_js__ && $__scopeContainsThis_46_js__.__esModule && $__scopeContainsThis_46_js__ || {default: $__scopeContainsThis_46_js__}).default;
var $__7 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createEmptyParameterList = $__7.createEmptyParameterList,
    createFunctionExpression = $__7.createFunctionExpression,
    createIdentifierExpression = $__7.createIdentifierExpression,
    createObjectLiteral = $__7.createObjectLiteral,
    createPropertyNameAssignment = $__7.createPropertyNameAssignment,
    createVariableStatement = $__7.createVariableStatement,
    createVariableDeclaration = $__7.createVariableDeclaration,
    createVariableDeclarationList = $__7.createVariableDeclarationList;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var CommonJsModuleTransformer = function($__super) {
  function CommonJsModuleTransformer(identifierGenerator, reporter) {
    var options = arguments[2];
    $traceurRuntime.superConstructor(CommonJsModuleTransformer).call(this, identifierGenerator, reporter, options);
    this.moduleVars_ = [];
    this.anonymousModule = options && !options.bundle && options.moduleName !== true;
  }
  return ($traceurRuntime.createClass)(CommonJsModuleTransformer, {
    getModuleName: function(tree) {
      if (this.anonymousModule)
        return null;
      return tree.moduleName;
    },
    moduleProlog: function() {
      var statements = $traceurRuntime.superGet(this, CommonJsModuleTransformer.prototype, "moduleProlog").call(this);
      if (this.moduleVars_.length) {
        var tmpVarDeclarations = createVariableStatement(createVariableDeclarationList(VAR, this.moduleVars_.map(function(varName) {
          return createVariableDeclaration(varName, null);
        })));
        statements.push(tmpVarDeclarations);
      }
      return statements;
    },
    wrapModule: function(statements) {
      var needsIife = statements.some(scopeContainsThis);
      if (needsIife) {
        return parseStatements($traceurRuntime.getTemplateObject(["module.exports = function() {\n            ", "\n          }.call(", ");"]), statements, globalThis());
      }
      var last = statements[statements.length - 1];
      statements = statements.slice(0, -1);
      assert(last.type === RETURN_STATEMENT);
      var exportExpression = last.expression;
      if (this.hasExports()) {
        var exportStatement = this.transformExportExpressionToModuleExport(exportExpression);
        statements = statements.concat(exportStatement);
      }
      return statements;
    },
    transformExportExpressionToModuleExport: function(tree) {
      var expression;
      if (tree.type === CALL_EXPRESSION) {
        var descriptors = this.transformObjectLiteralToDescriptors(tree.args.args[0]);
        var object = parseExpression($traceurRuntime.getTemplateObject(["Object.defineProperties(module.exports, ", ")"]), descriptors);
        var newArgs = new ArgumentList(tree.args.location, $traceurRuntime.spread([object], tree.args.args.slice(1)));
        expression = new CallExpression(tree.location, tree.operand, newArgs);
      } else {
        var descriptors$__12 = this.transformObjectLiteralToDescriptors(tree);
        expression = parseExpression($traceurRuntime.getTemplateObject(["Object.defineProperties(module.exports, ", ")"]), descriptors$__12);
      }
      return new ExpressionStatement(expression.location, expression);
    },
    transformObjectLiteralToDescriptors: function(literalTree) {
      assert(literalTree.type === OBJECT_LITERAL);
      var props = literalTree.propertyNameAndValues.map(function(exp) {
        var descriptor;
        switch (exp.type) {
          case GET_ACCESSOR:
            {
              var getterFunction = createFunctionExpression(createEmptyParameterList(), exp.body);
              descriptor = parseExpression($traceurRuntime.getTemplateObject(["{get: ", "}"]), getterFunction);
              break;
            }
          case PROPERTY_NAME_ASSIGNMENT:
            descriptor = parseExpression($traceurRuntime.getTemplateObject(["{value: ", "}"]), exp.value);
            break;
          default:
            throw new Error(("Unexpected property type " + exp.type));
        }
        return createPropertyNameAssignment(exp.name, descriptor);
      });
      return createObjectLiteral(props);
    },
    transformModuleSpecifier: function(tree) {
      var moduleName = tree.token.processedValue;
      var tmpVar = this.getTempVarNameForModuleSpecifier(tree);
      this.moduleVars_.push(tmpVar);
      var tvId = createIdentifierExpression(tmpVar);
      return parseExpression($traceurRuntime.getTemplateObject(["(", " = require(", "),\n        ", " && ", ".__esModule && ", " || {default: ", "})"]), tvId, moduleName, tvId, tvId, tvId, tvId);
    },
    getExportProperties: function() {
      var properties = $traceurRuntime.superGet(this, CommonJsModuleTransformer.prototype, "getExportProperties").call(this);
      if (this.exportVisitor_.hasExports())
        properties.push(parsePropertyDefinition($traceurRuntime.getTemplateObject(["__esModule: true"])));
      return properties;
    }
  }, {}, $__super);
}(ModuleTransformer);
Object.defineProperties(module.exports, {
  CommonJsModuleTransformer: {get: function() {
      return CommonJsModuleTransformer;
    }},
  __esModule: {value: true}
});
