"use strict";
var $___46__46__47_ParseTreeTransformer_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__;
var ParseTreeTransformer = ($___46__46__47_ParseTreeTransformer_46_js__ = require("../ParseTreeTransformer.js"), $___46__46__47_ParseTreeTransformer_46_js__ && $___46__46__47_ParseTreeTransformer_46_js__.__esModule && $___46__46__47_ParseTreeTransformer_46_js__ || {default: $___46__46__47_ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var $__1 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../../syntax/trees/ParseTrees.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    Module = $__1.Module,
    Script = $__1.Script;
var AttachModuleNameTransformer = function($__super) {
  function AttachModuleNameTransformer(moduleName) {
    $traceurRuntime.superConstructor(AttachModuleNameTransformer).call(this);
    this.moduleName_ = moduleName;
  }
  return ($traceurRuntime.createClass)(AttachModuleNameTransformer, {
    transformModule: function(tree) {
      return new Module(tree.location, tree.scriptItemList, this.moduleName_);
    },
    transformScript: function(tree) {
      return new Script(tree.location, tree.scriptItemList, this.moduleName_);
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  AttachModuleNameTransformer: {get: function() {
      return AttachModuleNameTransformer;
    }},
  __esModule: {value: true}
});
