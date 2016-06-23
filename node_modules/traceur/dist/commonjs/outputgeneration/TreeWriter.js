"use strict";
var $__toSource_46_js__;
var toSource = ($__toSource_46_js__ = require("./toSource.js"), $__toSource_46_js__ && $__toSource_46_js__.__esModule && $__toSource_46_js__ || {default: $__toSource_46_js__}).toSource;
function write(tree) {
  var $__5,
      $__6;
  var options = arguments[1];
  var outputName = arguments[2] !== (void 0) ? arguments[2] : '<TreeWriter-output>';
  var sourceRoot = arguments[3];
  var $__4 = toSource(tree, options, outputName, sourceRoot),
      result = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
      sourceMap = ($__6 = $__5.next()).done ? void 0 : $__6.value;
  if (sourceMap)
    options.generatedSourceMap = sourceMap;
  return result;
}
var TreeWriter = function() {
  function TreeWriter() {}
  return ($traceurRuntime.createClass)(TreeWriter, {}, {});
}();
TreeWriter.write = write;
Object.defineProperties(module.exports, {
  write: {get: function() {
      return write;
    }},
  TreeWriter: {get: function() {
      return TreeWriter;
    }},
  __esModule: {value: true}
});
