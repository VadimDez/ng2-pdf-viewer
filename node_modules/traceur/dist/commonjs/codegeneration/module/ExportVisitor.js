"use strict";
var $__ModuleVisitor_46_js__,
    $___46__46__47__46__46__47_util_47_assert_46_js__;
var ModuleVisitor = ($__ModuleVisitor_46_js__ = require("./ModuleVisitor.js"), $__ModuleVisitor_46_js__ && $__ModuleVisitor_46_js__.__esModule && $__ModuleVisitor_46_js__ || {default: $__ModuleVisitor_46_js__}).ModuleVisitor;
var assert = ($___46__46__47__46__46__47_util_47_assert_46_js__ = require("../../util/assert.js"), $___46__46__47__46__46__47_util_47_assert_46_js__ && $___46__46__47__46__46__47_util_47_assert_46_js__.__esModule && $___46__46__47__46__46__47_util_47_assert_46_js__ || {default: $___46__46__47__46__46__47_util_47_assert_46_js__}).assert;
var ExportVisitor = function($__super) {
  function ExportVisitor(reporter, loader, moduleSymbol) {
    $traceurRuntime.superConstructor(ExportVisitor).call(this, reporter, loader, moduleSymbol);
    this.inExport_ = false;
    this.moduleSpecifier = null;
  }
  return ($traceurRuntime.createClass)(ExportVisitor, {
    addExport_: function(name, tree) {
      assert(typeof name === 'string');
      if (this.inExport_)
        this.addExport(name, tree);
    },
    addExport: function(name, tree) {
      var moduleSymbol = this.moduleSymbol;
      var existingExport = moduleSymbol.getExport(name);
      if (existingExport) {
        this.reportError(tree, ("Duplicate export. '" + name + "' was previously ") + ("exported at " + existingExport.location.start));
      } else {
        moduleSymbol.addExport(name, tree);
      }
    },
    visitClassDeclaration: function(tree) {
      this.addExport_(tree.name.identifierToken.value, tree);
    },
    visitExportDeclaration: function(tree) {
      this.inExport_ = true;
      this.visitAny(tree.declaration);
      this.inExport_ = false;
    },
    visitNamedExport: function(tree) {
      this.moduleSpecifier = tree.moduleSpecifier;
      this.visitAny(tree.exportClause);
      this.moduleSpecifier = null;
    },
    visitExportDefault: function(tree) {
      this.addExport_('default', tree);
    },
    visitExportSpecifier: function(tree) {
      this.addExport_((tree.rhs || tree.lhs).value, tree);
    },
    visitExportStar: function(tree) {
      var $__5 = this;
      var name = this.moduleSpecifier.token.processedValue;
      var exportList = this.getExportsListForModuleSpecifier(name);
      if (exportList) {
        exportList.getExports().forEach(function(name) {
          return $__5.addExport(name, tree);
        });
      }
    },
    visitNameSpaceExport: function(tree) {
      this.addExport_(tree.name.value, tree);
    },
    visitForwardDefaultExport: function(tree) {
      this.addExport_(tree.name.value, tree);
    },
    visitFunctionDeclaration: function(tree) {
      this.addExport_(tree.name.getStringValue(), tree);
    },
    visitVariableDeclaration: function(tree) {
      this.visitAny(tree.lvalue);
    },
    visitBindingIdentifier: function(tree) {
      this.addExport_(tree.getStringValue(), tree);
    },
    visitBindingElement: function(tree) {
      this.visitAny(tree.binding);
    },
    visitTypeAliasDeclaration: function(tree) {
      this.addExport(tree.name.value, tree);
    }
  }, {}, $__super);
}(ModuleVisitor);
Object.defineProperties(module.exports, {
  ExportVisitor: {get: function() {
      return ExportVisitor;
    }},
  __esModule: {value: true}
});
