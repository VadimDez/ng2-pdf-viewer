"use strict";
var $___46__46__47_syntax_47_PredefinedName_46_js__,
    $__AlphaRenamer_46_js__,
    $__FindThisOrArguments_46_js__;
var $__0 = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}),
    ARGUMENTS = $__0.ARGUMENTS,
    THIS = $__0.THIS;
var AlphaRenamer = ($__AlphaRenamer_46_js__ = require("./AlphaRenamer.js"), $__AlphaRenamer_46_js__ && $__AlphaRenamer_46_js__.__esModule && $__AlphaRenamer_46_js__ || {default: $__AlphaRenamer_46_js__}).AlphaRenamer;
var FindThisOrArguments = ($__FindThisOrArguments_46_js__ = require("./FindThisOrArguments.js"), $__FindThisOrArguments_46_js__ && $__FindThisOrArguments_46_js__.__esModule && $__FindThisOrArguments_46_js__ || {default: $__FindThisOrArguments_46_js__}).FindThisOrArguments;
function alphaRenameThisAndArguments(tempVarTransformer, tree) {
  var finder = new FindThisOrArguments();
  finder.visitAny(tree);
  if (finder.foundArguments) {
    var argumentsTempName = tempVarTransformer.addTempVarForArguments();
    tree = AlphaRenamer.rename(tree, ARGUMENTS, argumentsTempName);
  }
  if (finder.foundThis) {
    var thisTempName = tempVarTransformer.addTempVarForThis();
    tree = AlphaRenamer.rename(tree, THIS, thisTempName);
  }
  return tree;
}
var $__default = alphaRenameThisAndArguments;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
