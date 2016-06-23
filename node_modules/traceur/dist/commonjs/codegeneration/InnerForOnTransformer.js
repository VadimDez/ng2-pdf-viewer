"use strict";
var $__ParseTreeTransformer_46_js__,
    $__alphaRenameThisAndArguments_46_js__,
    $__PlaceholderParser_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_util_47_StringSet_46_js__,
    $__ParseTreeFactory_46_js__,
    $__SkipFunctionsTransformerTrait_46_js__,
    $___46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var alphaRenameThisAndArguments = ($__alphaRenameThisAndArguments_46_js__ = require("./alphaRenameThisAndArguments.js"), $__alphaRenameThisAndArguments_46_js__ && $__alphaRenameThisAndArguments_46_js__.__esModule && $__alphaRenameThisAndArguments_46_js__ || {default: $__alphaRenameThisAndArguments_46_js__}).default;
var $__2 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseStatement = $__2.parseStatement,
    parseStatements = $__2.parseStatements;
var $__3 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__3.AnonBlock,
    Block = $__3.Block,
    ContinueStatement = $__3.ContinueStatement,
    LabelledStatement = $__3.LabelledStatement,
    ReturnStatement = $__3.ReturnStatement;
var StringSet = ($___46__46__47_util_47_StringSet_46_js__ = require("../util/StringSet.js"), $___46__46__47_util_47_StringSet_46_js__ && $___46__46__47_util_47_StringSet_46_js__.__esModule && $___46__46__47_util_47_StringSet_46_js__ || {default: $___46__46__47_util_47_StringSet_46_js__}).StringSet;
var $__5 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createAssignmentStatement = $__5.createAssignmentStatement,
    createCaseClause = $__5.createCaseClause,
    createDefaultClause = $__5.createDefaultClause,
    id = $__5.createIdentifierExpression,
    createNumberLiteral = $__5.createNumberLiteral,
    createSwitchStatement = $__5.createSwitchStatement,
    createThisExpression = $__5.createThisExpression,
    createVariableStatement = $__5.createVariableStatement,
    createVariableDeclaration = $__5.createVariableDeclaration,
    createVariableDeclarationList = $__5.createVariableDeclarationList,
    createVoid0 = $__5.createVoid0;
var SkipFunctionsTransformerTrait = ($__SkipFunctionsTransformerTrait_46_js__ = require("./SkipFunctionsTransformerTrait.js"), $__SkipFunctionsTransformerTrait_46_js__ && $__SkipFunctionsTransformerTrait_46_js__.__esModule && $__SkipFunctionsTransformerTrait_46_js__ || {default: $__SkipFunctionsTransformerTrait_46_js__}).default;
var ARGUMENTS = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}).ARGUMENTS;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var $__9 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    VARIABLE_DECLARATION_LIST = $__9.VARIABLE_DECLARATION_LIST,
    BLOCK = $__9.BLOCK;
var InnerForOnTransformer = function($__super) {
  function InnerForOnTransformer(tempIdGenerator, labelSet) {
    var $__13;
    $traceurRuntime.superConstructor(InnerForOnTransformer).call(this);
    this.idGenerator_ = tempIdGenerator;
    this.inLoop_ = 0;
    this.inBreakble_ = 0;
    this.variableDeclarations_ = [];
    this.extractedStatements_ = [];
    this.labelSet_ = labelSet;
    this.labelledStatements_ = new StringSet();
    this.observer_ = id(this.idGenerator_.getTempIdentifier());
    this.result_ = id(this.idGenerator_.getTempIdentifier());
    this.parentLabels_ = new StringSet();
    this.labelSet_.forEach(($__13 = this, function(tree) {
      $__13.parentLabels_.add(tree.name.value);
    }));
  }
  return ($traceurRuntime.createClass)(InnerForOnTransformer, {
    transform: function(tree) {
      var value = id(this.idGenerator_.getTempIdentifier());
      var assignment;
      if (tree.initializer.type === VARIABLE_DECLARATION_LIST) {
        assignment = createVariableStatement(tree.initializer.declarationType, tree.initializer.declarations[0].lvalue, value);
      } else {
        assignment = parseStatement($traceurRuntime.getTemplateObject(["\n          ", " = ", ";"]), tree.initializer, value);
      }
      var body;
      if (tree.body.type === BLOCK) {
        body = new Block(tree.body.location, $traceurRuntime.spread([assignment], tree.body.statements));
      } else {
        body = new Block(null, [assignment, tree.body]);
      }
      body = this.transformAny(body);
      body = alphaRenameThisAndArguments(this, body);
      this.variableDeclarations_.push(createVariableDeclaration(this.result_, createVoid0()));
      var caseClauses = this.extractedStatements_.map(function(statement, index) {
        return createCaseClause(createNumberLiteral(index), [statement]);
      });
      caseClauses.push(createCaseClause(createVoid0(), [new ContinueStatement(null, null)]));
      caseClauses.push(createDefaultClause(parseStatements($traceurRuntime.getTemplateObject(["\n        return ", ".v;"]), this.result_)));
      var switchStatement = createSwitchStatement(this.result_, caseClauses);
      var statement = parseStatement($traceurRuntime.getTemplateObject(["\n        do {\n          ", "\n            await $traceurRuntime.observeForEach(\n              ", "[Symbol.observer].bind(", "),\n              async function (", ") {\n                var ", " = this;\n                try {\n                  ", "\n                } catch (e) {\n                  ", ".throw(e);\n                }\n              });\n          ", "\n        } while (false);"]), createVariableStatement(createVariableDeclarationList(VAR, this.variableDeclarations_)), tree.observable, tree.observable, value, this.observer_, body, this.observer_, switchStatement);
      var labelledStatement;
      while (labelledStatement = this.labelSet_.pop()) {
        statement = new LabelledStatement(labelledStatement.location, labelledStatement.name, statement);
      }
      return statement;
    },
    addTempVarForArguments: function() {
      var tmpVarName = this.idGenerator_.generateUniqueIdentifier();
      this.variableDeclarations_.push(createVariableDeclaration(tmpVarName, id(ARGUMENTS)));
      return tmpVarName;
    },
    addTempVarForThis: function() {
      var tmpVarName = this.idGenerator_.generateUniqueIdentifier();
      this.variableDeclarations_.push(createVariableDeclaration(tmpVarName, createThisExpression()));
      return tmpVarName;
    },
    transformAny: function(tree) {
      if (tree) {
        if (tree.isBreakableStatement())
          this.inBreakble_++;
        if (tree.isIterationStatement())
          this.inLoop_++;
        tree = $traceurRuntime.superGet(this, InnerForOnTransformer.prototype, "transformAny").call(this, tree);
        if (tree.isBreakableStatement())
          this.inBreakble_--;
        if (tree.isIterationStatement())
          this.inLoop_--;
      }
      return tree;
    },
    transformReturnStatement: function(tree) {
      return new AnonBlock(tree.location, parseStatements($traceurRuntime.getTemplateObject(["\n        ", ".return();\n        ", " = {v: ", "};\n        return;"]), this.observer_, this.result_, (tree.expression || createVoid0())));
    },
    transformAbruptCompletion_: function(tree) {
      this.extractedStatements_.push(tree);
      var index = this.extractedStatements_.length - 1;
      return new AnonBlock(null, parseStatements($traceurRuntime.getTemplateObject(["\n        ", ".return();\n        ", " = ", ";\n        return;"]), this.observer_, this.result_, index));
    },
    transformBreakStatement: function(tree) {
      if (!tree.name) {
        if (this.inBreakble_) {
          return $traceurRuntime.superGet(this, InnerForOnTransformer.prototype, "transformBreakStatement").call(this, tree);
        }
        return this.transformAbruptCompletion_(new ContinueStatement(tree.location, null));
      }
      if (this.labelledStatements_.has(tree.name.value)) {
        return $traceurRuntime.superGet(this, InnerForOnTransformer.prototype, "transformBreakStatement").call(this, tree);
      }
      return this.transformAbruptCompletion_(tree);
    },
    transformContinueStatement: function(tree) {
      if (!tree.name) {
        if (this.inLoop_) {
          return $traceurRuntime.superGet(this, InnerForOnTransformer.prototype, "transformContinueStatement").call(this, tree);
        }
        return new ReturnStatement(tree.location, null);
      }
      if (this.labelledStatements_.has(tree.name.value)) {
        return $traceurRuntime.superGet(this, InnerForOnTransformer.prototype, "transformContinueStatement").call(this, tree);
      }
      if (this.parentLabels_.has(tree.name.value)) {
        return new ReturnStatement(tree.location, null);
      }
      return this.transformAbruptCompletion_(tree);
    },
    transformLabelledStatement: function(tree) {
      this.labelledStatements_.add(tree.name.value);
      return $traceurRuntime.superGet(this, InnerForOnTransformer.prototype, "transformLabelledStatement").call(this, tree);
    },
    transformVariableStatement: function(tree) {
      var $__13 = this;
      if (tree.declarations.declarationType === VAR) {
        var assignments = [];
        tree.declarations.declarations.forEach(function(variableDeclaration) {
          var variableName = variableDeclaration.lvalue.getStringValue();
          var initializer = $traceurRuntime.superGet($__13, InnerForOnTransformer.prototype, "transformAny").call($__13, variableDeclaration.initializer);
          $__13.variableDeclarations_.push(createVariableDeclaration(variableName, null));
          assignments.push(createAssignmentStatement(id(variableName), initializer));
        });
        return new AnonBlock(null, assignments);
      }
      return $traceurRuntime.superGet(this, InnerForOnTransformer.prototype, "transformVariableStatement").call(this, tree);
    }
  }, {transform: function(tempIdGenerator, tree, labelSet) {
      return new InnerForOnTransformer(tempIdGenerator, labelSet).transform(tree);
    }}, $__super);
}(SkipFunctionsTransformerTrait(ParseTreeTransformer));
Object.defineProperties(module.exports, {
  InnerForOnTransformer: {get: function() {
      return InnerForOnTransformer;
    }},
  __esModule: {value: true}
});
