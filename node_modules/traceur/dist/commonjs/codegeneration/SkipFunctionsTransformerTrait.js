"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    ArrowFunction = $__0.ArrowFunction,
    FunctionDeclaration = $__0.FunctionDeclaration,
    FunctionExpression = $__0.FunctionExpression,
    GetAccessor = $__0.GetAccessor,
    Method = $__0.Method,
    SetAccessor = $__0.SetAccessor;
function SkipFunctionsTransformerTrait(ParseTreeTransformer) {
  return function($__super) {
    function SkipFunctionsTransformer() {
      $traceurRuntime.superConstructor(SkipFunctionsTransformer).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)(SkipFunctionsTransformer, {
      transformFunctionDeclaration: function(tree) {
        var annotations = this.transformList(tree.annotations);
        if (annotations === tree.annotations) {
          return tree;
        }
        return new FunctionDeclaration(tree.location, tree.name, tree.functionKind, tree.parameterList, tree.typeAnnotation, annotations, tree.body);
      },
      transformFunctionExpression: function(tree) {
        var annotations = this.transformList(tree.annotations);
        if (annotations === tree.annotations) {
          return tree;
        }
        return new FunctionDeclaration(tree.location, tree.name, tree.functionKind, tree.parameterList, tree.typeAnnotation, annotations, tree.body);
      },
      transformSetAccessor: function(tree) {
        var name = this.transformAny(tree.name);
        var annotations = this.transformList(tree.annotations);
        if (name === tree.name && annotations === tree.annotations) {
          return tree;
        }
        return new SetAccessor(tree.location, tree.isStatic, name, tree.parameterList, annotations, tree.body);
      },
      transformGetAccessor: function(tree) {
        var name = this.transformAny(tree.name);
        var annotations = this.transformList(tree.annotations);
        if (name === tree.name && annotations === tree.annotations) {
          return tree;
        }
        return new GetAccessor(tree.location, tree.isStatic, name, annotations, tree.body);
      },
      transformMethod: function(tree) {
        var name = this.transformAny(tree.name);
        var annotations = this.transformList(tree.annotations);
        if (name === tree.name && annotations === tree.annotations) {
          return tree;
        }
        return new Method(tree.location, tree.isStatic, tree.functionKind, name, tree.parameterList, tree.typeAnnotation, annotations, tree.body, tree.debugName);
      },
      transformArrowFunction: function(tree) {
        return tree;
      }
    }, {}, $__super);
  }(ParseTreeTransformer);
}
var $__default = SkipFunctionsTransformerTrait;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
