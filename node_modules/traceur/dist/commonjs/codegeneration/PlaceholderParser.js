"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_IdentifierToken_46_js__,
    $___46__46__47_syntax_47_LiteralToken_46_js__,
    $___46__46__47_util_47_CollectingErrorReporter_46_js__,
    $___46__46__47_Options_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTree_46_js__,
    $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_Parser_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_SourceFile_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__ParseTreeFactory_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    ARGUMENT_LIST = $__0.ARGUMENT_LIST,
    BLOCK = $__0.BLOCK,
    EXPRESSION_STATEMENT = $__0.EXPRESSION_STATEMENT,
    IDENTIFIER_EXPRESSION = $__0.IDENTIFIER_EXPRESSION;
var IdentifierToken = ($___46__46__47_syntax_47_IdentifierToken_46_js__ = require("../syntax/IdentifierToken.js"), $___46__46__47_syntax_47_IdentifierToken_46_js__ && $___46__46__47_syntax_47_IdentifierToken_46_js__.__esModule && $___46__46__47_syntax_47_IdentifierToken_46_js__ || {default: $___46__46__47_syntax_47_IdentifierToken_46_js__}).IdentifierToken;
var LiteralToken = ($___46__46__47_syntax_47_LiteralToken_46_js__ = require("../syntax/LiteralToken.js"), $___46__46__47_syntax_47_LiteralToken_46_js__ && $___46__46__47_syntax_47_LiteralToken_46_js__.__esModule && $___46__46__47_syntax_47_LiteralToken_46_js__ || {default: $___46__46__47_syntax_47_LiteralToken_46_js__}).LiteralToken;
var CollectingErrorReporter = ($___46__46__47_util_47_CollectingErrorReporter_46_js__ = require("../util/CollectingErrorReporter.js"), $___46__46__47_util_47_CollectingErrorReporter_46_js__ && $___46__46__47_util_47_CollectingErrorReporter_46_js__.__esModule && $___46__46__47_util_47_CollectingErrorReporter_46_js__ || {default: $___46__46__47_util_47_CollectingErrorReporter_46_js__}).CollectingErrorReporter;
var Options = ($___46__46__47_Options_46_js__ = require("../Options.js"), $___46__46__47_Options_46_js__ && $___46__46__47_Options_46_js__.__esModule && $___46__46__47_Options_46_js__ || {default: $___46__46__47_Options_46_js__}).Options;
var ParseTree = ($___46__46__47_syntax_47_trees_47_ParseTree_46_js__ = require("../syntax/trees/ParseTree.js"), $___46__46__47_syntax_47_trees_47_ParseTree_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTree_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTree_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTree_46_js__}).ParseTree;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var Parser = ($___46__46__47_syntax_47_Parser_46_js__ = require("../syntax/Parser.js"), $___46__46__47_syntax_47_Parser_46_js__ && $___46__46__47_syntax_47_Parser_46_js__.__esModule && $___46__46__47_syntax_47_Parser_46_js__ || {default: $___46__46__47_syntax_47_Parser_46_js__}).Parser;
var $__8 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    LiteralExpression = $__8.LiteralExpression,
    LiteralPropertyName = $__8.LiteralPropertyName,
    TypeName = $__8.TypeName;
var SourceFile = ($___46__46__47_syntax_47_SourceFile_46_js__ = require("../syntax/SourceFile.js"), $___46__46__47_syntax_47_SourceFile_46_js__ && $___46__46__47_syntax_47_SourceFile_46_js__.__esModule && $___46__46__47_syntax_47_SourceFile_46_js__ || {default: $___46__46__47_syntax_47_SourceFile_46_js__}).SourceFile;
var IDENTIFIER = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).IDENTIFIER;
var $__11 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createArrayLiteral = $__11.createArrayLiteral,
    createBindingIdentifier = $__11.createBindingIdentifier,
    createBlock = $__11.createBlock,
    createBooleanLiteral = $__11.createBooleanLiteral,
    createCommaExpression = $__11.createCommaExpression,
    createExpressionStatement = $__11.createExpressionStatement,
    createFunctionBody = $__11.createFunctionBody,
    createIdentifierExpression = $__11.createIdentifierExpression,
    createIdentifierToken = $__11.createIdentifierToken,
    createMemberExpression = $__11.createMemberExpression,
    createNullLiteral = $__11.createNullLiteral,
    createNumberLiteral = $__11.createNumberLiteral,
    createParenExpression = $__11.createParenExpression,
    createStringLiteral = $__11.createStringLiteral,
    createVoid0 = $__11.createVoid0;
var NOT_FOUND = {};
function makeParseFunction(doParse) {
  var cache = new Map();
  return function(sourceLiterals) {
    for (var values = [],
        $__15 = 1; $__15 < arguments.length; $__15++)
      values[$__15 - 1] = arguments[$__15];
    return parse(sourceLiterals, values, doParse, cache);
  };
}
var parseExpression = makeParseFunction(function(p) {
  return p.parseExpression();
});
var parseStatement = makeParseFunction(function(p) {
  return p.parseStatement();
});
var parseModule = makeParseFunction(function(p) {
  return p.parseModule();
});
var parseScript = makeParseFunction(function(p) {
  return p.parseScript();
});
var parseStatements = makeParseFunction(function(p) {
  return p.parseStatements();
});
var parsePropertyDefinition = makeParseFunction(function(p) {
  return p.parsePropertyDefinition();
});
function parse(sourceLiterals, values, doParse, cache) {
  var tree = cache.get(sourceLiterals);
  if (!tree) {
    var source = insertPlaceholderIdentifiers(sourceLiterals);
    var errorReporter = new CollectingErrorReporter();
    var parser = getParser(source, errorReporter);
    tree = doParse(parser);
    if (errorReporter.hadError() || !tree || !parser.isAtEnd()) {
      throw new Error(("Internal error trying to parse:\n\n" + source + "\n\n" + errorReporter.errorsAsString()));
    }
    cache.set(sourceLiterals, tree);
  }
  if (!values.length)
    return tree;
  if (tree instanceof ParseTree)
    return new PlaceholderTransformer(values).transformAny(tree);
  return new PlaceholderTransformer(values).transformList(tree);
}
var PREFIX = '$__placeholder__';
function insertPlaceholderIdentifiers(sourceLiterals) {
  var source = sourceLiterals[0];
  for (var i = 1; i < sourceLiterals.length; i++) {
    source += PREFIX + String(i - 1) + sourceLiterals[i];
  }
  return source;
}
var counter = 0;
function getParser(source, errorReporter) {
  var file = new SourceFile(null, source);
  var options = new Options();
  options.experimental = true;
  return new Parser(file, errorReporter, options);
}
function convertValueToExpression(value) {
  if (value instanceof ParseTree)
    return value;
  if (value instanceof IdentifierToken)
    return createIdentifierExpression(value);
  if (value instanceof LiteralToken)
    return new LiteralExpression(value.location, value);
  if (Array.isArray(value)) {
    if (value[0] instanceof ParseTree) {
      if (value.length === 1)
        return value[0];
      if (value[0].isStatement())
        return createBlock(value);
      else
        return createParenExpression(createCommaExpression(value));
    }
    return createArrayLiteral(value.map(convertValueToExpression));
  }
  if (value === null)
    return createNullLiteral();
  if (value === undefined)
    return createVoid0();
  switch ((typeof value === 'undefined' ? 'undefined' : $traceurRuntime.typeof(value))) {
    case 'string':
      return createStringLiteral(value);
    case 'boolean':
      return createBooleanLiteral(value);
    case 'number':
      return createNumberLiteral(value);
  }
  throw new Error('Not implemented');
}
function convertValueToIdentifierToken(value) {
  if (value instanceof IdentifierToken)
    return value;
  return createIdentifierToken(value);
}
function convertValueToType(value) {
  if (value === null)
    return null;
  if (value instanceof ParseTree)
    return value;
  if (typeof value === 'string') {
    return new TypeName(null, null, convertValueToIdentifierToken(value));
  }
  if (value instanceof IdentifierToken) {
    return new TypeName(null, null, value);
  }
  throw new Error('Not implemented');
}
var PlaceholderTransformer = function($__super) {
  function PlaceholderTransformer(values) {
    $traceurRuntime.superConstructor(PlaceholderTransformer).call(this);
    this.values = values;
  }
  return ($traceurRuntime.createClass)(PlaceholderTransformer, {
    getValueAt: function(index) {
      return this.values[index];
    },
    getValue_: function(str) {
      if (str.indexOf(PREFIX) !== 0)
        return NOT_FOUND;
      return this.getValueAt(Number(str.slice(PREFIX.length)));
    },
    transformIdentifierExpression: function(tree) {
      var value = this.getValue_(tree.identifierToken.value);
      if (value === NOT_FOUND)
        return tree;
      return convertValueToExpression(value);
    },
    transformBindingIdentifier: function(tree) {
      var value = this.getValue_(tree.identifierToken.value);
      if (value === NOT_FOUND)
        return tree;
      return createBindingIdentifier(value);
    },
    transformExpressionStatement: function(tree) {
      if (tree.expression.type === IDENTIFIER_EXPRESSION) {
        var transformedExpression = this.transformIdentifierExpression(tree.expression);
        if (transformedExpression === tree.expression)
          return tree;
        if (transformedExpression.isStatementListItem())
          return transformedExpression;
        return createExpressionStatement(transformedExpression);
      }
      return $traceurRuntime.superGet(this, PlaceholderTransformer.prototype, "transformExpressionStatement").call(this, tree);
    },
    transformBlock: function(tree) {
      if (tree.statements.length === 1 && tree.statements[0].type === EXPRESSION_STATEMENT) {
        var transformedStatement = this.transformExpressionStatement(tree.statements[0]);
        if (transformedStatement === tree.statements[0])
          return tree;
        if (transformedStatement.type === BLOCK)
          return transformedStatement;
      }
      return $traceurRuntime.superGet(this, PlaceholderTransformer.prototype, "transformBlock").call(this, tree);
    },
    transformFunctionBody: function(tree) {
      if (tree.statements.length === 1 && tree.statements[0].type === EXPRESSION_STATEMENT) {
        var transformedStatement = this.transformExpressionStatement(tree.statements[0]);
        if (transformedStatement === tree.statements[0])
          return tree;
        if (transformedStatement.type === BLOCK)
          return createFunctionBody(transformedStatement.statements);
      }
      return $traceurRuntime.superGet(this, PlaceholderTransformer.prototype, "transformFunctionBody").call(this, tree);
    },
    transformMemberExpression: function(tree) {
      var value = this.getValue_(tree.memberName.value);
      if (value === NOT_FOUND)
        return $traceurRuntime.superGet(this, PlaceholderTransformer.prototype, "transformMemberExpression").call(this, tree);
      var operand = this.transformAny(tree.operand);
      return createMemberExpression(operand, value);
    },
    transformLiteralPropertyName: function(tree) {
      if (tree.literalToken.type === IDENTIFIER) {
        var value = this.getValue_(tree.literalToken.value);
        if (value !== NOT_FOUND) {
          return new LiteralPropertyName(null, convertValueToIdentifierToken(value));
        }
      }
      return $traceurRuntime.superGet(this, PlaceholderTransformer.prototype, "transformLiteralPropertyName").call(this, tree);
    },
    transformArgumentList: function(tree) {
      if (tree.args.length === 1 && tree.args[0].type === IDENTIFIER_EXPRESSION) {
        var arg0 = this.transformAny(tree.args[0]);
        if (arg0 === tree.args[0])
          return tree;
        if (arg0.type === ARGUMENT_LIST)
          return arg0;
      }
      return $traceurRuntime.superGet(this, PlaceholderTransformer.prototype, "transformArgumentList").call(this, tree);
    },
    transformTypeName: function(tree) {
      var value = this.getValue_(tree.name.value);
      if (value === NOT_FOUND)
        return $traceurRuntime.superGet(this, PlaceholderTransformer.prototype, "transformTypeName").call(this, tree);
      var moduleName = this.transformAny(tree.moduleName);
      if (moduleName !== null) {
        return new TypeName(null, moduleName, convertValueToIdentifierToken(value));
      }
      return convertValueToType(value);
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  parseExpression: {get: function() {
      return parseExpression;
    }},
  parseStatement: {get: function() {
      return parseStatement;
    }},
  parseModule: {get: function() {
      return parseModule;
    }},
  parseScript: {get: function() {
      return parseScript;
    }},
  parseStatements: {get: function() {
      return parseStatements;
    }},
  parsePropertyDefinition: {get: function() {
      return parsePropertyDefinition;
    }},
  PlaceholderTransformer: {get: function() {
      return PlaceholderTransformer;
    }},
  __esModule: {value: true}
});
