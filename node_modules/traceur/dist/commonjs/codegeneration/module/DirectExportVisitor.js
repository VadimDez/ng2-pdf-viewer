"use strict";
var $__ExportVisitor_46_js__;
var ExportVisitor = ($__ExportVisitor_46_js__ = require("./ExportVisitor.js"), $__ExportVisitor_46_js__ && $__ExportVisitor_46_js__.__esModule && $__ExportVisitor_46_js__ || {default: $__ExportVisitor_46_js__}).ExportVisitor;
var DirectExportVisitor = function($__super) {
  function DirectExportVisitor() {
    $traceurRuntime.superConstructor(DirectExportVisitor).call(this, null, null, null);
    this.namedExports = [];
    this.starExports = [];
  }
  return ($traceurRuntime.createClass)(DirectExportVisitor, {
    addExport: function(name, tree) {
      this.namedExports.push({
        name: name,
        tree: tree,
        moduleSpecifier: this.moduleSpecifier
      });
    },
    visitExportStar: function(tree) {
      this.starExports.push(this.moduleSpecifier);
    },
    hasExports: function() {
      return this.namedExports.length !== 0 || this.starExports.length !== 0;
    }
  }, {}, $__super);
}(ExportVisitor);
Object.defineProperties(module.exports, {
  DirectExportVisitor: {get: function() {
      return DirectExportVisitor;
    }},
  __esModule: {value: true}
});
