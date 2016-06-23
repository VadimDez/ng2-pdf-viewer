"use strict";
var $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_util_47_StringSet_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PrependStatements_46_js__;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    Module = $__1.Module,
    Script = $__1.Script;
var ARGUMENTS = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}).ARGUMENTS;
var StringSet = ($___46__46__47_util_47_StringSet_46_js__ = require("../util/StringSet.js"), $___46__46__47_util_47_StringSet_46_js__ && $___46__46__47_util_47_StringSet_46_js__.__esModule && $___46__46__47_util_47_StringSet_46_js__ || {default: $___46__46__47_util_47_StringSet_46_js__}).StringSet;
var $__4 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    LET = $__4.LET,
    VAR = $__4.VAR;
var $__5 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createFunctionBody = $__5.createFunctionBody,
    createThisExpression = $__5.createThisExpression,
    createIdentifierExpression = $__5.createIdentifierExpression,
    createVariableDeclaration = $__5.createVariableDeclaration,
    createVariableDeclarationList = $__5.createVariableDeclarationList,
    createVariableStatement = $__5.createVariableStatement;
var prependStatements = ($__PrependStatements_46_js__ = require("./PrependStatements.js"), $__PrependStatements_46_js__ && $__PrependStatements_46_js__.__esModule && $__PrependStatements_46_js__ || {default: $__PrependStatements_46_js__}).prependStatements;
var TempVarStatement = function() {
  function TempVarStatement(name, initializer) {
    this.name = name;
    this.initializer = initializer;
  }
  return ($traceurRuntime.createClass)(TempVarStatement, {}, {});
}();
var TempScope = function() {
  function TempScope() {
    this.identifiers = [];
  }
  return ($traceurRuntime.createClass)(TempScope, {
    push: function(identifier) {
      this.identifiers.push(identifier);
    },
    pop: function() {
      return this.identifiers.pop();
    },
    release: function(obj) {
      for (var i = this.identifiers.length - 1; i >= 0; i--) {
        obj.releaseTempName(this.identifiers[i]);
      }
    }
  }, {});
}();
var VarScope = function() {
  function VarScope(options) {
    this.thisName = null;
    this.argumentName = null;
    this.tempVarStatements = [];
    this.declarationType_ = options.blockBinding && !options.transformOptions.blockBinding ? LET : VAR;
  }
  return ($traceurRuntime.createClass)(VarScope, {
    push: function(tempVarStatement) {
      this.tempVarStatements.push(tempVarStatement);
    },
    pop: function() {
      return this.tempVarStatements.pop();
    },
    release: function(obj) {
      for (var i = this.tempVarStatements.length - 1; i >= 0; i--) {
        obj.releaseTempName(this.tempVarStatements[i].name);
      }
    },
    isEmpty: function() {
      return !this.tempVarStatements.length;
    },
    createVariableStatement: function() {
      var declarations = [];
      var seenNames = new StringSet();
      for (var i = 0; i < this.tempVarStatements.length; i++) {
        var $__13 = this.tempVarStatements[i],
            name = $__13.name,
            initializer = $__13.initializer;
        if (seenNames.has(name)) {
          if (initializer)
            throw new Error('Invalid use of TempVarTransformer');
          continue;
        }
        seenNames.add(name);
        declarations.push(createVariableDeclaration(name, initializer));
      }
      return createVariableStatement(createVariableDeclarationList(this.declarationType_, declarations));
    }
  }, {});
}();
var TempVarTransformer = function($__super) {
  function TempVarTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(TempVarTransformer).call(this);
    this.identifierGenerator = identifierGenerator;
    this.reporter = reporter;
    this.options = options;
    this.tempVarStack_ = [new VarScope(this.options)];
    this.tempScopeStack_ = [new TempScope()];
    this.namePool_ = [];
  }
  return ($traceurRuntime.createClass)(TempVarTransformer, {
    transformStatements_: function(statements) {
      this.tempVarStack_.push(new VarScope(this.options));
      var transformedStatements = this.transformList(statements);
      var vars = this.tempVarStack_.pop();
      if (vars.isEmpty())
        return transformedStatements;
      var variableStatement = vars.createVariableStatement();
      vars.release(this);
      return prependStatements(transformedStatements, variableStatement);
    },
    transformScript: function(tree) {
      var scriptItemList = this.transformStatements_(tree.scriptItemList);
      if (scriptItemList === tree.scriptItemList) {
        return tree;
      }
      return new Script(tree.location, scriptItemList, tree.moduleName);
    },
    transformModule: function(tree) {
      var scriptItemList = this.transformStatements_(tree.scriptItemList);
      if (scriptItemList === tree.scriptItemList) {
        return tree;
      }
      return new Module(tree.location, scriptItemList, tree.moduleName);
    },
    transformFunctionBody: function(tree) {
      this.pushTempScope();
      var statements = this.transformStatements_(tree.statements);
      this.popTempScope();
      if (statements === tree.statements)
        return tree;
      return createFunctionBody(statements);
    },
    getTempIdentifier: function() {
      var name = this.getName_();
      this.tempScopeStack_[this.tempScopeStack_.length - 1].push(name);
      return name;
    },
    getName_: function() {
      return this.namePool_.length ? this.namePool_.pop() : this.identifierGenerator.generateUniqueIdentifier();
    },
    addTempVar: function() {
      var initializer = arguments[0] !== (void 0) ? arguments[0] : null;
      var vars = this.tempVarStack_[this.tempVarStack_.length - 1];
      var name = this.getName_();
      vars.push(new TempVarStatement(name, initializer));
      return name;
    },
    registerTempVarName: function(name) {
      var vars = this.tempVarStack_[this.tempVarStack_.length - 1];
      vars.push(new TempVarStatement(name, null));
    },
    addTempVarForThis: function() {
      var varScope = this.tempVarStack_[this.tempVarStack_.length - 1];
      return varScope.thisName || (varScope.thisName = this.addTempVar(createThisExpression()));
    },
    addTempVarForArguments: function() {
      var varScope = this.tempVarStack_[this.tempVarStack_.length - 1];
      return varScope.argumentName || (varScope.argumentName = this.addTempVar(createIdentifierExpression(ARGUMENTS)));
    },
    pushTempScope: function() {
      this.tempScopeStack_.push(new TempScope());
    },
    popTempScope: function() {
      this.tempScopeStack_.pop().release(this);
    },
    releaseTempName: function(name) {
      this.namePool_.push(name);
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  TempVarTransformer: {get: function() {
      return TempVarTransformer;
    }},
  __esModule: {value: true}
});
