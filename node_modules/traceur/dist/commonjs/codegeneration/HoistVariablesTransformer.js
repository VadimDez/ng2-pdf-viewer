"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__ParseTreeTransformer_46_js__,
    $___46__46__47_util_47_StringSet_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PrependStatements_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__0.AnonBlock,
    Catch = $__0.Catch,
    FunctionBody = $__0.FunctionBody,
    ForInStatement = $__0.ForInStatement,
    ForOfStatement = $__0.ForOfStatement,
    ForStatement = $__0.ForStatement,
    VariableDeclarationList = $__0.VariableDeclarationList,
    VariableStatement = $__0.VariableStatement;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    OBJECT_PATTERN = $__1.OBJECT_PATTERN,
    VARIABLE_DECLARATION_LIST = $__1.VARIABLE_DECLARATION_LIST;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var StringSet = ($___46__46__47_util_47_StringSet_46_js__ = require("../util/StringSet.js"), $___46__46__47_util_47_StringSet_46_js__ && $___46__46__47_util_47_StringSet_46_js__.__esModule && $___46__46__47_util_47_StringSet_46_js__ || {default: $___46__46__47_util_47_StringSet_46_js__}).StringSet;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var $__5 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createAssignmentExpression = $__5.createAssignmentExpression,
    createCommaExpression = $__5.createCommaExpression,
    createExpressionStatement = $__5.createExpressionStatement,
    id = $__5.createIdentifierExpression,
    createParenExpression = $__5.createParenExpression,
    createVariableDeclaration = $__5.createVariableDeclaration;
var prependStatements = ($__PrependStatements_46_js__ = require("./PrependStatements.js"), $__PrependStatements_46_js__ && $__PrependStatements_46_js__.__esModule && $__PrependStatements_46_js__ || {default: $__PrependStatements_46_js__}).prependStatements;
var HoistVariablesTransformer = function($__super) {
  function HoistVariablesTransformer() {
    var shouldHoistFunctions = arguments[0] !== (void 0) ? arguments[0] : false;
    $traceurRuntime.superConstructor(HoistVariablesTransformer).call(this);
    this.hoistedFunctions_ = [];
    this.hoistedVariables_ = new StringSet();
    this.keepBindingIdentifiers_ = false;
    this.inBlockOrFor_ = false;
    this.shouldHoistFunctions_ = shouldHoistFunctions;
  }
  return ($traceurRuntime.createClass)(HoistVariablesTransformer, {
    transformFunctionBody: function(tree) {
      var statements = this.transformList(tree.statements);
      if (statements === tree.statements)
        return tree;
      statements = this.prependVariables(statements);
      statements = this.prependFunctions(statements);
      return new FunctionBody(tree.location, statements);
    },
    addVariable: function(name) {
      this.hoistedVariables_.add(name);
    },
    addFunctionDeclaration: function(tree) {
      this.hoistedFunctions_.push(tree);
    },
    hasVariables: function() {
      return !this.hoistedVariables_.isEmpty();
    },
    hasFunctions: function() {
      return this.hoistedFunctions_.length > 0;
    },
    getVariableNames: function() {
      return this.hoistedVariables_.valuesAsArray();
    },
    getVariableStatement: function() {
      if (!this.hasVariables())
        return new AnonBlock(null, []);
      var declarations = this.getVariableNames().map(function(name) {
        return createVariableDeclaration(name, null);
      });
      return new VariableStatement(null, new VariableDeclarationList(null, VAR, declarations));
    },
    getFunctions: function() {
      return this.hoistedFunctions_;
    },
    prependVariables: function(statements) {
      if (!this.hasVariables())
        return statements;
      return prependStatements(statements, this.getVariableStatement());
    },
    prependFunctions: function(statements) {
      if (!this.hasFunctions())
        return statements;
      return prependStatements(statements, this.getFunctionDeclarations());
    },
    transformVariableStatement: function(tree) {
      var declarations = this.transformAny(tree.declarations);
      if (declarations === tree.declarations)
        return tree;
      if (declarations === null)
        return new AnonBlock(null, []);
      if (declarations.type === VARIABLE_DECLARATION_LIST)
        return new VariableStatement(tree.location, declarations);
      return createExpressionStatement(declarations);
    },
    transformVariableDeclaration: function(tree) {
      var lvalue = this.transformAny(tree.lvalue);
      var initializer = this.transformAny(tree.initializer);
      if (initializer) {
        var expression = createAssignmentExpression(lvalue, initializer);
        if (lvalue.type === OBJECT_PATTERN)
          expression = createParenExpression(expression);
        return expression;
      }
      return null;
    },
    transformObjectPattern: function(tree) {
      var keepBindingIdentifiers = this.keepBindingIdentifiers_;
      this.keepBindingIdentifiers_ = true;
      var transformed = $traceurRuntime.superGet(this, HoistVariablesTransformer.prototype, "transformObjectPattern").call(this, tree);
      this.keepBindingIdentifiers_ = keepBindingIdentifiers;
      return transformed;
    },
    transformArrayPattern: function(tree) {
      var keepBindingIdentifiers = this.keepBindingIdentifiers_;
      this.keepBindingIdentifiers_ = true;
      var transformed = $traceurRuntime.superGet(this, HoistVariablesTransformer.prototype, "transformArrayPattern").call(this, tree);
      this.keepBindingIdentifiers_ = keepBindingIdentifiers;
      return transformed;
    },
    transformBindingIdentifier: function(tree) {
      var idToken = tree.identifierToken;
      this.addVariable(idToken.value);
      if (this.keepBindingIdentifiers_)
        return tree;
      return id(idToken);
    },
    transformVariableDeclarationList: function(tree) {
      if (tree.declarationType === VAR || !this.inBlockOrFor_) {
        var expressions = this.transformList(tree.declarations);
        expressions = expressions.filter(function(tree) {
          return tree;
        });
        if (expressions.length === 0)
          return null;
        if (expressions.length === 1)
          return expressions[0];
        return createCommaExpression(expressions);
      }
      return tree;
    },
    transformCatch: function(tree) {
      var catchBody = this.transformAny(tree.catchBody);
      if (catchBody === tree.catchBody)
        return tree;
      return new Catch(tree.location, tree.binding, catchBody);
    },
    transformForInStatement: function(tree) {
      return this.transformLoop_(tree, ForInStatement);
    },
    transformForOfStatement: function(tree) {
      return this.transformLoop_(tree, ForOfStatement);
    },
    transformForOnStatement: function(tree) {
      return this.transformLoop_(tree, ForOfStatement);
    },
    transformLoop_: function(tree, ctor) {
      var initializer = this.transformLoopIninitaliser_(tree.initializer);
      var collection = this.transformAny(tree.collection);
      var body = this.transformAny(tree.body);
      if (initializer === tree.initializer && collection === tree.collection && body === tree.body) {
        return tree;
      }
      return new ctor(tree.location, initializer, collection, body);
    },
    transformLoopIninitaliser_: function(tree) {
      if (tree.type !== VARIABLE_DECLARATION_LIST || tree.declarationType !== VAR)
        return tree;
      return this.transformAny(tree.declarations[0].lvalue);
    },
    transformForStatement: function(tree) {
      var inBlockOrFor = this.inBlockOrFor_;
      this.inBlockOrFor_ = true;
      var initializer = this.transformAny(tree.initializer);
      this.inBlockOrFor_ = inBlockOrFor;
      var condition = this.transformAny(tree.condition);
      var increment = this.transformAny(tree.increment);
      var body = this.transformAny(tree.body);
      if (initializer === tree.initializer && condition === tree.condition && increment === tree.increment && body === tree.body) {
        return tree;
      }
      return new ForStatement(tree.location, initializer, condition, increment, body);
    },
    transformBlock: function(tree) {
      var inBlockOrFor = this.inBlockOrFor_;
      this.inBlockOrFor_ = true;
      tree = $traceurRuntime.superGet(this, HoistVariablesTransformer.prototype, "transformBlock").call(this, tree);
      this.inBlockOrFor_ = inBlockOrFor;
      return tree;
    },
    addMachineVariable: function(name) {
      this.machineVariables_[name] = true;
    },
    transformClassDeclaration: function(tree) {
      return tree;
    },
    transformClassExpression: function(tree) {
      return tree;
    },
    transformFunctionDeclaration: function(tree) {
      if (this.shouldHoistFunctions_) {
        this.addFunctionDeclaration(tree);
        return new AnonBlock(null, []);
      }
      return tree;
    },
    transformFunctionExpression: function(tree) {
      return tree;
    },
    transformGetAccessor: function(tree) {
      return tree;
    },
    transformSetAccessor: function(tree) {
      return tree;
    },
    transformMethod: function(tree) {
      return tree;
    },
    transformArrowFunction: function(tree) {
      return tree;
    },
    transformComprehensionFor: function(tree) {
      return tree;
    }
  }, {}, $__super);
}(ParseTreeTransformer);
var $__default = HoistVariablesTransformer;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
