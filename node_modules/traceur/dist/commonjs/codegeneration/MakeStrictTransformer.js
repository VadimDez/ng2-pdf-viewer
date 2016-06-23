"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__ParseTreeTransformer_46_js__,
    $__ParseTreeFactory_46_js__,
    $___46__46__47_semantics_47_util_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    FunctionBody = $__0.FunctionBody,
    Script = $__0.Script;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var createUseStrictDirective = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}).createUseStrictDirective;
var hasUseStrict = ($___46__46__47_semantics_47_util_46_js__ = require("../semantics/util.js"), $___46__46__47_semantics_47_util_46_js__ && $___46__46__47_semantics_47_util_46_js__.__esModule && $___46__46__47_semantics_47_util_46_js__ || {default: $___46__46__47_semantics_47_util_46_js__}).hasUseStrict;
function prepend(statements) {
  return $traceurRuntime.spread([createUseStrictDirective()], statements);
}
var MakeStrictTransformer = function($__super) {
  function MakeStrictTransformer() {
    $traceurRuntime.superConstructor(MakeStrictTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(MakeStrictTransformer, {
    transformScript: function(tree) {
      if (hasUseStrict(tree.scriptItemList))
        return tree;
      return new Script(tree.location, prepend(tree.scriptItemList), tree.moduleName);
    },
    transformFunctionBody: function(tree) {
      if (hasUseStrict(tree.statements))
        return tree;
      return new FunctionBody(tree.location, prepend(tree.statements));
    }
  }, {transformTree: function(tree) {
      return new MakeStrictTransformer().transformAny(tree);
    }}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  MakeStrictTransformer: {get: function() {
      return MakeStrictTransformer;
    }},
  __esModule: {value: true}
});
