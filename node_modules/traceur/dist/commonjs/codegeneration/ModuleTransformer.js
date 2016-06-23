"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__DestructuringTransformer_46_js__,
    $__module_47_DirectExportVisitor_46_js__,
    $__ImportSimplifyingTransformer_46_js__,
    $__TempVarTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $___46__46__47_util_47_assert_46_js__,
    $___46__46__47_util_47_url_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__0.AnonBlock,
    BindingElement = $__0.BindingElement,
    EmptyStatement = $__0.EmptyStatement,
    LiteralPropertyName = $__0.LiteralPropertyName,
    Module = $__0.Module,
    ObjectPattern = $__0.ObjectPattern,
    ObjectPatternField = $__0.ObjectPatternField,
    Script = $__0.Script;
var DestructuringTransformer = ($__DestructuringTransformer_46_js__ = require("./DestructuringTransformer.js"), $__DestructuringTransformer_46_js__ && $__DestructuringTransformer_46_js__.__esModule && $__DestructuringTransformer_46_js__ || {default: $__DestructuringTransformer_46_js__}).DestructuringTransformer;
var DirectExportVisitor = ($__module_47_DirectExportVisitor_46_js__ = require("./module/DirectExportVisitor.js"), $__module_47_DirectExportVisitor_46_js__ && $__module_47_DirectExportVisitor_46_js__.__esModule && $__module_47_DirectExportVisitor_46_js__ || {default: $__module_47_DirectExportVisitor_46_js__}).DirectExportVisitor;
var ImportSimplifyingTransformer = ($__ImportSimplifyingTransformer_46_js__ = require("./ImportSimplifyingTransformer.js"), $__ImportSimplifyingTransformer_46_js__ && $__ImportSimplifyingTransformer_46_js__.__esModule && $__ImportSimplifyingTransformer_46_js__ || {default: $__ImportSimplifyingTransformer_46_js__}).ImportSimplifyingTransformer;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var $__5 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    CLASS_DECLARATION = $__5.CLASS_DECLARATION,
    EXPORT_DEFAULT = $__5.EXPORT_DEFAULT,
    EXPORT_SPECIFIER = $__5.EXPORT_SPECIFIER,
    FORWARD_DEFAULT_EXPORT = $__5.FORWARD_DEFAULT_EXPORT,
    FUNCTION_DECLARATION = $__5.FUNCTION_DECLARATION,
    IMPORT_SPECIFIER_SET = $__5.IMPORT_SPECIFIER_SET,
    IMPORT_TYPE_CLAUSE = $__5.IMPORT_TYPE_CLAUSE,
    NAME_SPACE_EXPORT = $__5.NAME_SPACE_EXPORT,
    TYPE_ALIAS_DECLARATION = $__5.TYPE_ALIAS_DECLARATION;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var assert = ($___46__46__47_util_47_assert_46_js__ = require("../util/assert.js"), $___46__46__47_util_47_assert_46_js__ && $___46__46__47_util_47_assert_46_js__.__esModule && $___46__46__47_util_47_assert_46_js__ || {default: $___46__46__47_util_47_assert_46_js__}).assert;
var $__8 = ($___46__46__47_util_47_url_46_js__ = require("../util/url.js"), $___46__46__47_util_47_url_46_js__ && $___46__46__47_util_47_url_46_js__.__esModule && $___46__46__47_util_47_url_46_js__ || {default: $___46__46__47_util_47_url_46_js__}),
    resolveUrl = $__8.resolveUrl,
    canonicalizeUrl = $__8.canonicalizeUrl;
var $__9 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createArgumentList = $__9.createArgumentList,
    createExpressionStatement = $__9.createExpressionStatement,
    createIdentifierExpression = $__9.createIdentifierExpression,
    createIdentifierToken = $__9.createIdentifierToken,
    createMemberExpression = $__9.createMemberExpression,
    createObjectLiteral = $__9.createObjectLiteral,
    createUseStrictDirective = $__9.createUseStrictDirective,
    createVariableStatement = $__9.createVariableStatement;
var $__10 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseExpression = $__10.parseExpression,
    parsePropertyDefinition = $__10.parsePropertyDefinition,
    parseStatement = $__10.parseStatement,
    parseStatements = $__10.parseStatements;
function removeUseStrictDirectives(tree) {
  var result = tree.scriptItemList.filter(function(tree) {
    return !tree.isUseStrictDirective();
  });
  return new Module(tree.location, result, tree.moduleName);
}
var DestructImportVarStatement = function($__super) {
  function DestructImportVarStatement() {
    $traceurRuntime.superConstructor(DestructImportVarStatement).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(DestructImportVarStatement, {createGuardedExpression: function(tree) {
      return tree;
    }}, {}, $__super);
}(DestructuringTransformer);
var ModuleTransformer = function($__super) {
  function ModuleTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(ModuleTransformer).call(this, identifierGenerator, reporter, options);
    this.exportVisitor_ = new DirectExportVisitor();
    this.importSimplifier_ = new ImportSimplifyingTransformer();
    this.moduleName = null;
  }
  return ($traceurRuntime.createClass)(ModuleTransformer, {
    getTempVarNameForModuleName: function(moduleName) {
      return '$__' + moduleName.replace(/[^a-zA-Z0-9$]/g, function(c) {
        return '_' + String(c.charCodeAt(0)) + '_';
      }) + '__';
    },
    getModuleName: function(tree) {
      return tree.moduleName;
    },
    getTempVarNameForModuleSpecifier: function(moduleSpecifier) {
      var name = moduleSpecifier.token.processedValue;
      if (name[0] === '.' && this.moduleName) {
        name = resolveUrl(this.moduleName, name);
      } else {
        name = canonicalizeUrl(name);
      }
      return this.getTempVarNameForModuleName(name);
    },
    transformScript: function(tree) {
      this.moduleName = tree.moduleName;
      return $traceurRuntime.superGet(this, ModuleTransformer.prototype, "transformScript").call(this, tree);
    },
    transformModule: function(tree) {
      tree = removeUseStrictDirectives(tree);
      tree = this.importSimplifier_.transformModule(tree);
      this.moduleName = this.getModuleName(tree);
      this.pushTempScope();
      var statements = this.transformList(tree.scriptItemList);
      statements = this.appendExportStatement(statements);
      this.popTempScope();
      statements = this.wrapModule(this.moduleProlog().concat(statements));
      return new Script(tree.location, statements, null);
    },
    moduleProlog: function() {
      var statements = [createUseStrictDirective()];
      if (this.moduleName) {
        statements.push(parseStatement($traceurRuntime.getTemplateObject(["var __moduleName = ", ";"]), this.moduleName));
      }
      return statements;
    },
    wrapModule: function(statements) {
      var functionExpression;
      if (this.options.transformOptions.require) {
        functionExpression = parseExpression($traceurRuntime.getTemplateObject(["function(require) {\n        ", "\n      }"]), statements);
      } else {
        functionExpression = parseExpression($traceurRuntime.getTemplateObject(["function() {\n        ", "\n      }"]), statements);
      }
      if (this.moduleName === null) {
        return parseStatements($traceurRuntime.getTemplateObject(["$traceurRuntime.ModuleStore.getAnonymousModule(\n              ", ");"]), functionExpression);
      }
      return parseStatements($traceurRuntime.getTemplateObject(["$traceurRuntime.registerModule(", ", [], ", ");"]), this.moduleName, functionExpression);
    },
    getGetterExport: function($__16) {
      var $__17 = $__16,
          name = $__17.name,
          tree = $__17.tree,
          moduleSpecifier = $__17.moduleSpecifier;
      var returnExpression;
      switch (tree.type) {
        case EXPORT_DEFAULT:
          returnExpression = createIdentifierExpression('$__default');
          break;
        case EXPORT_SPECIFIER:
          if (moduleSpecifier) {
            var idName = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
            returnExpression = createMemberExpression(idName, tree.lhs);
          } else {
            returnExpression = createIdentifierExpression(tree.lhs);
          }
          break;
        case NAME_SPACE_EXPORT:
          {
            var idName$__18 = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
            returnExpression = createIdentifierExpression(idName$__18);
            break;
          }
        case FORWARD_DEFAULT_EXPORT:
          {
            var idName$__19 = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
            returnExpression = createMemberExpression(idName$__19, 'default');
            break;
          }
        default:
          returnExpression = createIdentifierExpression(name);
          break;
      }
      return parsePropertyDefinition($traceurRuntime.getTemplateObject(["get ", "() { return ", "; }"]), name, returnExpression);
    },
    getExportProperties: function() {
      var $__15 = this;
      return this.exportVisitor_.namedExports.filter(function(exp) {
        return exp.tree.type !== TYPE_ALIAS_DECLARATION;
      }).map(function(exp) {
        return $__15.getGetterExport(exp);
      }).concat(this.exportVisitor_.namedExports.map(function(exp) {
        return $__15.getSetterExport(exp);
      })).filter(function(e) {
        return e;
      });
    },
    getSetterExport: function($__16) {
      var $__17 = $__16,
          name = $__17.name,
          tree = $__17.tree,
          moduleSpecifier = $__17.moduleSpecifier;
      return null;
    },
    getExportObject: function() {
      var $__15 = this;
      var exportObject = createObjectLiteral(this.getExportProperties());
      if (this.exportVisitor_.starExports.length) {
        var starExports = this.exportVisitor_.starExports;
        var starIdents = starExports.map(function(moduleSpecifier) {
          return createIdentifierExpression($__15.getTempVarNameForModuleSpecifier(moduleSpecifier));
        });
        var args = createArgumentList($traceurRuntime.spread([exportObject], starIdents));
        return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.exportStar(", ")"]), args);
      }
      return exportObject;
    },
    appendExportStatement: function(statements) {
      var exportObject = this.getExportObject();
      statements.push(parseStatement($traceurRuntime.getTemplateObject(["return ", ""]), exportObject));
      return statements;
    },
    hasExports: function() {
      return this.exportVisitor_.hasExports();
    },
    hasStarExports: function() {
      return this.exportVisitor_.starExports.length > 0;
    },
    transformExportDeclaration: function(tree) {
      this.exportVisitor_.visitAny(tree);
      return this.transformAny(tree.declaration);
    },
    transformExportDefault: function(tree) {
      switch (tree.expression.type) {
        case CLASS_DECLARATION:
        case FUNCTION_DECLARATION:
          {
            var nameBinding = tree.expression.name;
            var name = createIdentifierExpression(nameBinding.identifierToken);
            return new AnonBlock(null, [tree.expression, parseStatement($traceurRuntime.getTemplateObject(["var $__default = ", ""]), name)]);
          }
      }
      return parseStatement($traceurRuntime.getTemplateObject(["var $__default = ", ""]), tree.expression);
    },
    transformNamedExport: function(tree) {
      var moduleSpecifier = tree.moduleSpecifier;
      if (moduleSpecifier) {
        var expression = this.transformAny(moduleSpecifier);
        var idName = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
        return createVariableStatement(VAR, idName, expression);
      }
      return new AnonBlock(null, []);
    },
    transformModuleSpecifier: function(tree) {
      assert(this.moduleName);
      var name = tree.token.processedValue;
      return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.getModule(\n      $traceurRuntime.normalizeModuleName(", ", ", "));"]), name, this.moduleName);
    },
    transformImportDeclaration: function(tree) {
      if (tree.importClause.type === IMPORT_TYPE_CLAUSE) {
        return new AnonBlock(null, []);
      }
      if (tree.importClause.type === IMPORT_SPECIFIER_SET && tree.importClause.specifiers.length === 0) {
        return createExpressionStatement(this.transformAny(tree.moduleSpecifier));
      }
      var binding = this.transformAny(tree.importClause);
      var initializer = this.transformAny(tree.moduleSpecifier);
      var varStatement = createVariableStatement(VAR, binding, initializer);
      if (this.options.transformOptions.destructuring || !this.options.parseOptions.destructuring) {
        var destructuringTransformer = new DestructImportVarStatement(this.identifierGenerator, this.reporter, this.options);
        varStatement = varStatement.transform(destructuringTransformer);
      }
      return varStatement;
    },
    transformImportSpecifierSet: function(tree) {
      var fields = this.transformList(tree.specifiers);
      return new ObjectPattern(null, fields);
    },
    transformNameSpaceImport: function(tree) {
      return tree.binding.binding;
    },
    transformImportSpecifier: function(tree) {
      var binding = tree.binding.binding;
      var bindingElement = new BindingElement(binding.location, binding, null);
      if (tree.name) {
        var name = new LiteralPropertyName(tree.name.location, tree.name);
        return new ObjectPatternField(tree.location, name, bindingElement);
      }
      return bindingElement;
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  ModuleTransformer: {get: function() {
      return ModuleTransformer;
    }},
  __esModule: {value: true}
});
