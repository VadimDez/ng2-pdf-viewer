"use strict";
var $__LoaderCompiler_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__;
var LoaderCompiler = ($__LoaderCompiler_46_js__ = require("./LoaderCompiler.js"), $__LoaderCompiler_46_js__ && $__LoaderCompiler_46_js__.__esModule && $__LoaderCompiler_46_js__ || {default: $__LoaderCompiler_46_js__}).LoaderCompiler;
var Script = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}).Script;
var InlineLoaderCompiler = function($__super) {
  function InlineLoaderCompiler(elements) {
    $traceurRuntime.superConstructor(InlineLoaderCompiler).call(this);
    this.elements = elements;
  }
  return ($traceurRuntime.createClass)(InlineLoaderCompiler, {
    write: function() {},
    evaluateCodeUnit: function(codeUnit) {
      var $__5;
      var tree = codeUnit.metadata.transformedTree;
      ($__5 = this.elements).push.apply($__5, $traceurRuntime.spread(tree.scriptItemList));
    },
    toTree: function() {
      return new Script(null, this.elements, null);
    }
  }, {}, $__super);
}(LoaderCompiler);
Object.defineProperties(module.exports, {
  InlineLoaderCompiler: {get: function() {
      return InlineLoaderCompiler;
    }},
  __esModule: {value: true}
});
