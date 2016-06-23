"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__TempVarTransformer_46_js__,
    $__InnerForOnTransformer_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    FOR_ON_STATEMENT = $__0.FOR_ON_STATEMENT,
    LABELLED_STATEMENT = $__0.LABELLED_STATEMENT;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var InnerForOnTransformer = ($__InnerForOnTransformer_46_js__ = require("./InnerForOnTransformer.js"), $__InnerForOnTransformer_46_js__ && $__InnerForOnTransformer_46_js__.__esModule && $__InnerForOnTransformer_46_js__ || {default: $__InnerForOnTransformer_46_js__}).InnerForOnTransformer;
var ForOnTransformer = function($__super) {
  function ForOnTransformer() {
    $traceurRuntime.superConstructor(ForOnTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(ForOnTransformer, {
    transformForOnStatement: function(original) {
      return this.transformForOnStatement_(original, []);
    },
    transformForOnStatement_: function(original, labelSet) {
      return InnerForOnTransformer.transform(this, $traceurRuntime.superGet(this, ForOnTransformer.prototype, "transformForOnStatement").call(this, original), labelSet);
    },
    transformLabelledStatement: function(tree) {
      var labelSet = [tree];
      var statement;
      for (statement = tree.statement; statement.type === LABELLED_STATEMENT; statement = statement.statement) {
        labelSet.push(statement);
      }
      if (statement.type !== FOR_ON_STATEMENT) {
        return $traceurRuntime.superGet(this, ForOnTransformer.prototype, "transformLabelledStatement").call(this, tree);
      }
      return this.transformForOnStatement_(statement, labelSet);
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  ForOnTransformer: {get: function() {
      return ForOnTransformer;
    }},
  __esModule: {value: true}
});
