"use strict";
var $__LineNumberTable_46_js__;
var LineNumberTable = ($__LineNumberTable_46_js__ = require("./LineNumberTable.js"), $__LineNumberTable_46_js__ && $__LineNumberTable_46_js__.__esModule && $__LineNumberTable_46_js__ || {default: $__LineNumberTable_46_js__}).LineNumberTable;
var SourceFile = function() {
  function SourceFile(name, contents) {
    this.name = name;
    this.contents = contents;
    this.lineNumberTable = new LineNumberTable(this);
  }
  return ($traceurRuntime.createClass)(SourceFile, {}, {});
}();
Object.defineProperties(module.exports, {
  SourceFile: {get: function() {
      return SourceFile;
    }},
  __esModule: {value: true}
});
