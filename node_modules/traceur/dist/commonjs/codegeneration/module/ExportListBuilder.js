"use strict";
var $__ExportVisitor_46_js__,
    $__ValidationVisitor_46_js__;
var ExportVisitor = ($__ExportVisitor_46_js__ = require("./ExportVisitor.js"), $__ExportVisitor_46_js__ && $__ExportVisitor_46_js__.__esModule && $__ExportVisitor_46_js__ || {default: $__ExportVisitor_46_js__}).ExportVisitor;
var ValidationVisitor = ($__ValidationVisitor_46_js__ = require("./ValidationVisitor.js"), $__ValidationVisitor_46_js__ && $__ValidationVisitor_46_js__.__esModule && $__ValidationVisitor_46_js__ || {default: $__ValidationVisitor_46_js__}).ValidationVisitor;
function buildExportList(deps, loader, reporter) {
  function doVisit(ctor) {
    for (var i = 0; i < deps.length; i++) {
      var visitor = new ctor(reporter, loader, deps[i]);
      visitor.visitAny(deps[i].tree);
    }
  }
  function reverseVisit(ctor) {
    for (var i = deps.length - 1; i >= 0; i--) {
      var visitor = new ctor(reporter, loader, deps[i]);
      visitor.visitAny(deps[i].tree);
    }
  }
  reverseVisit(ExportVisitor);
  doVisit(ValidationVisitor);
}
Object.defineProperties(module.exports, {
  buildExportList: {get: function() {
      return buildExportList;
    }},
  __esModule: {value: true}
});
