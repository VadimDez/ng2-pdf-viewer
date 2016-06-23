"use strict";
var $___46__46__47_syntax_47_PredefinedName_46_js__,
    $__FindInFunctionScope_46_js__,
    $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_util_47_StringSet_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $___46__46__47_semantics_47_VariableBinder_46_js__;
var $__0 = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}),
    ARGUMENTS = $__0.ARGUMENTS,
    THIS = $__0.THIS;
var FindInFunctionScope = ($__FindInFunctionScope_46_js__ = require("./FindInFunctionScope.js"), $__FindInFunctionScope_46_js__ && $__FindInFunctionScope_46_js__.__esModule && $__FindInFunctionScope_46_js__ || {default: $__FindInFunctionScope_46_js__}).FindInFunctionScope;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var $__3 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    FunctionDeclaration = $__3.FunctionDeclaration,
    FunctionExpression = $__3.FunctionExpression,
    GetAccessor = $__3.GetAccessor,
    Method = $__3.Method,
    SetAccessor = $__3.SetAccessor;
var StringSet = ($___46__46__47_util_47_StringSet_46_js__ = require("../util/StringSet.js"), $___46__46__47_util_47_StringSet_46_js__ && $___46__46__47_util_47_StringSet_46_js__.__esModule && $___46__46__47_util_47_StringSet_46_js__ || {default: $___46__46__47_util_47_StringSet_46_js__}).StringSet;
var VARIABLE_DECLARATION_LIST = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}).VARIABLE_DECLARATION_LIST;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var $__7 = ($___46__46__47_semantics_47_VariableBinder_46_js__ = require("../semantics/VariableBinder.js"), $___46__46__47_semantics_47_VariableBinder_46_js__ && $___46__46__47_semantics_47_VariableBinder_46_js__.__esModule && $___46__46__47_semantics_47_VariableBinder_46_js__ || {default: $___46__46__47_semantics_47_VariableBinder_46_js__}),
    variablesInBlock = $__7.variablesInBlock,
    variablesInFunction = $__7.variablesInFunction;
var FindNames = function($__super) {
  function FindNames(names) {
    $traceurRuntime.superConstructor(FindNames).call(this);
    this.names = names;
  }
  return ($traceurRuntime.createClass)(FindNames, {visitBindingIdentifier: function(tree) {
      this.names.add(tree.getStringValue());
    }}, {}, $__super);
}(FindInFunctionScope);
function getLexicalBindingNames(tree) {
  var names = new StringSet();
  if (tree !== null && tree.type === VARIABLE_DECLARATION_LIST && tree.declarationType !== VAR) {
    var visitor = new FindNames(names);
    for (var i = 0; i < tree.declarations.length; i++) {
      visitor.visitAny(tree.declarations[i].lvalue);
    }
  }
  return names;
}
var ScopeTransformer = function($__super) {
  function ScopeTransformer(varName) {
    $traceurRuntime.superConstructor(ScopeTransformer).call(this);
    this.varName_ = varName;
  }
  return ($traceurRuntime.createClass)(ScopeTransformer, {
    transformBlock: function(tree) {
      if (variablesInBlock(tree).has(this.varName_)) {
        return tree;
      }
      return $traceurRuntime.superGet(this, ScopeTransformer.prototype, "transformBlock").call(this, tree);
    },
    sameTreeIfNameInLoopInitializer_: function(tree) {
      var names = getLexicalBindingNames(tree.initializer);
      if (names.has(this.varName_)) {
        return tree;
      }
      return null;
    },
    transformForStatement: function(tree) {
      return this.sameTreeIfNameInLoopInitializer_(tree) || $traceurRuntime.superGet(this, ScopeTransformer.prototype, "transformForStatement").call(this, tree);
    },
    transformForInStatement: function(tree) {
      return this.sameTreeIfNameInLoopInitializer_(tree) || $traceurRuntime.superGet(this, ScopeTransformer.prototype, "transformForInStatement").call(this, tree);
    },
    transformForOfStatement: function(tree) {
      return this.sameTreeIfNameInLoopInitializer_(tree) || $traceurRuntime.superGet(this, ScopeTransformer.prototype, "transformForOfStatement").call(this, tree);
    },
    transformForOnStatement: function(tree) {
      return this.sameTreeIfNameInLoopInitializer_(tree) || $traceurRuntime.superGet(this, ScopeTransformer.prototype, "transformForOnStatement").call(this, tree);
    },
    transformThisExpression: function(tree) {
      if (this.varName_ !== THIS)
        return tree;
      return $traceurRuntime.superGet(this, ScopeTransformer.prototype, "transformThisExpression").call(this, tree);
    },
    transformParameterListAndBody_: function(tree) {
      if (this.getDoNotRecurse(tree))
        return tree;
      return {
        parameterList: this.transformAny(tree.parameterList),
        body: this.transformAny(tree.body)
      };
    },
    transformFunctionDeclaration: function(tree) {
      var name = this.transformAny(tree.name);
      var typeAnnotation = this.transformAny(tree.typeAnnotation);
      var annotations = this.transformList(tree.annotations);
      var $__11 = this.transformParameterListAndBody_(tree),
          parameterList = $__11.parameterList,
          body = $__11.body;
      if (name === tree.name && parameterList === tree.parameterList && typeAnnotation === tree.typeAnnotation && annotations === tree.annotations && body === tree.body) {
        return tree;
      }
      return new FunctionDeclaration(tree.location, name, tree.functionKind, parameterList, typeAnnotation, annotations, body);
    },
    transformFunctionExpression: function(tree) {
      var name = this.transformAny(tree.name);
      var typeAnnotation = this.transformAny(tree.typeAnnotation);
      var annotations = this.transformList(tree.annotations);
      var $__11 = this.transformParameterListAndBody_(tree),
          parameterList = $__11.parameterList,
          body = $__11.body;
      if (name === tree.name && parameterList === tree.parameterList && typeAnnotation === tree.typeAnnotation && annotations === tree.annotations && body === tree.body) {
        return tree;
      }
      return new FunctionExpression(tree.location, name, tree.functionKind, parameterList, typeAnnotation, annotations, body);
    },
    transformMethod: function(tree) {
      var name = this.transformAny(tree.name);
      var typeAnnotation = this.transformAny(tree.typeAnnotation);
      var annotations = this.transformList(tree.annotations);
      var $__11 = this.transformParameterListAndBody_(tree),
          parameterList = $__11.parameterList,
          body = $__11.body;
      if (name === tree.name && typeAnnotation === tree.typeAnnotation && annotations === tree.annotations && parameterList === tree.parameterList && body === tree.body) {
        return tree;
      }
      return new Method(tree.location, tree.isStatic, tree.functionKind, name, parameterList, typeAnnotation, annotations, body, tree.debugName);
    },
    transformGetAccessor: function(tree) {
      var name = this.transformAny(tree.name);
      var typeAnnotation = this.transformAny(tree.typeAnnotation);
      var annotations = this.transformList(tree.annotations);
      var body = this.getDoNotRecurse(tree) ? tree.body : this.transformAny(tree.body);
      if (name === tree.name && typeAnnotation === tree.typeAnnotation && annotations === tree.annotations && body === tree.body) {
        return tree;
      }
      return new GetAccessor(tree.location, tree.isStatic, name, typeAnnotation, annotations, body);
    },
    transformSetAccessor: function(tree) {
      var name = this.transformAny(tree.name);
      var annotations = this.transformList(tree.annotations);
      var $__11 = this.transformParameterListAndBody_(tree),
          parameterList = $__11.parameterList,
          body = $__11.body;
      if (name === tree.name && annotations === tree.annotations && parameterList === tree.parameterList && body === tree.body) {
        return tree;
      }
      return new SetAccessor(tree.location, tree.isStatic, name, parameterList, annotations, body);
    },
    getDoNotRecurse: function(tree) {
      return this.varName_ === ARGUMENTS || this.varName_ === THIS || variablesInFunction(tree).has(this.varName_);
    },
    transformCatch: function(tree) {
      if (!tree.binding.isPattern() && this.varName_ === tree.binding.identifierToken.value) {
        return tree;
      }
      return $traceurRuntime.superGet(this, ScopeTransformer.prototype, "transformCatch").call(this, tree);
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  ScopeTransformer: {get: function() {
      return ScopeTransformer;
    }},
  __esModule: {value: true}
});
