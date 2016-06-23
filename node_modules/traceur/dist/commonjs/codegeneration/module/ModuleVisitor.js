"use strict";
var $__ModuleSymbol_46_js__,
    $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__,
    $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__;
var ExportsList = ($__ModuleSymbol_46_js__ = require("./ModuleSymbol.js"), $__ModuleSymbol_46_js__ && $__ModuleSymbol_46_js__.__esModule && $__ModuleSymbol_46_js__ || {default: $__ModuleSymbol_46_js__}).ExportsList;
var ParseTreeVisitor = ($___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__ = require("../../syntax/ParseTreeVisitor.js"), $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__ && $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_ParseTreeVisitor_46_js__}).ParseTreeVisitor;
var $__2 = ($___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../../syntax/trees/ParseTreeType.js"), $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47__46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    EXPORT_DECLARATION = $__2.EXPORT_DECLARATION,
    IMPORT_DECLARATION = $__2.IMPORT_DECLARATION;
var ModuleVisitor = function($__super) {
  function ModuleVisitor(reporter, loader, moduleSymbol) {
    $traceurRuntime.superConstructor(ModuleVisitor).call(this);
    this.reporter = reporter;
    this.loader_ = loader;
    this.moduleSymbol = moduleSymbol;
  }
  return ($traceurRuntime.createClass)(ModuleVisitor, {
    getExportsListForModuleSpecifier: function(name) {
      var referrer = this.moduleSymbol.normalizedName;
      return this.loader_.getExportsListForModuleSpecifier(name, referrer);
    },
    visitFunctionDeclaration: function(tree) {},
    visitFunctionExpression: function(tree) {},
    visitFunctionBody: function(tree) {},
    visitBlock: function(tree) {},
    visitClassDeclaration: function(tree) {},
    visitClassExpression: function(tree) {},
    visitModuleElement_: function(element) {
      switch (element.type) {
        case EXPORT_DECLARATION:
        case IMPORT_DECLARATION:
          this.visitAny(element);
      }
    },
    visitScript: function(tree) {
      tree.scriptItemList.forEach(this.visitModuleElement_, this);
    },
    visitModule: function(tree) {
      tree.scriptItemList.forEach(this.visitModuleElement_, this);
    },
    reportError: function(tree, message) {
      this.reporter.reportError(tree.location, message);
    }
  }, {}, $__super);
}(ParseTreeVisitor);
Object.defineProperties(module.exports, {
  ModuleVisitor: {get: function() {
      return ModuleVisitor;
    }},
  __esModule: {value: true}
});
