"use strict";
var $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__,
    $___46__46__47__46__46__47_util_47_StringSet_46_js__;
var ParseTreeVisitor = ($___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__ = require("../../syntax/ParseTreeVisitor.js"), $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__ && $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__}).ParseTreeVisitor;
var StringSet = ($___46__46__47__46__46__47_util_47_StringSet_46_js__ = require("../../util/StringSet.js"), $___46__46__47__46__46__47_util_47_StringSet_46_js__ && $___46__46__47__46__46__47_util_47_StringSet_46_js__.__esModule && $___46__46__47__46__46__47_util_47_StringSet_46_js__ || {default: $___46__46__47__46__46__47_util_47_StringSet_46_js__}).StringSet;
var ModuleSpecifierVisitor = function($__super) {
  function ModuleSpecifierVisitor(options) {
    $traceurRuntime.superConstructor(ModuleSpecifierVisitor).call(this);
    this.options_ = options;
    this.moduleSpecifiers_ = new StringSet();
  }
  return ($traceurRuntime.createClass)(ModuleSpecifierVisitor, {
    get moduleSpecifiers() {
      return this.moduleSpecifiers_.valuesAsArray();
    },
    visitModuleSpecifier: function(tree) {
      this.moduleSpecifiers_.add(tree.token.processedValue);
    }
  }, {}, $__super);
}(ParseTreeVisitor);
Object.defineProperties(module.exports, {
  ModuleSpecifierVisitor: {get: function() {
      return ModuleSpecifierVisitor;
    }},
  __esModule: {value: true}
});
