"use strict";
var $__ParseTreeMapWriter_46_js__,
    $__ParseTreeWriter_46_js__,
    $__SourceMapIntegration_46_js__;
var ParseTreeMapWriter = ($__ParseTreeMapWriter_46_js__ = require("./ParseTreeMapWriter.js"), $__ParseTreeMapWriter_46_js__ && $__ParseTreeMapWriter_46_js__.__esModule && $__ParseTreeMapWriter_46_js__ || {default: $__ParseTreeMapWriter_46_js__}).ParseTreeMapWriter;
var ParseTreeWriter = ($__ParseTreeWriter_46_js__ = require("./ParseTreeWriter.js"), $__ParseTreeWriter_46_js__ && $__ParseTreeWriter_46_js__.__esModule && $__ParseTreeWriter_46_js__ || {default: $__ParseTreeWriter_46_js__}).ParseTreeWriter;
var SourceMapGenerator = ($__SourceMapIntegration_46_js__ = require("./SourceMapIntegration.js"), $__SourceMapIntegration_46_js__ && $__SourceMapIntegration_46_js__.__esModule && $__SourceMapIntegration_46_js__ || {default: $__SourceMapIntegration_46_js__}).SourceMapGenerator;
function toSource(tree) {
  var options = arguments[1];
  var outputName = arguments[2] !== (void 0) ? arguments[2] : '<toSourceOutput>';
  var sourceRoot = arguments[3];
  var sourceMapGenerator = options && options.sourceMapGenerator;
  var sourcemaps = options && options.sourceMaps;
  if (!sourceMapGenerator && sourcemaps) {
    sourceMapGenerator = new SourceMapGenerator({
      file: outputName,
      sourceRoot: sourceRoot,
      skipValidation: true
    });
  }
  var sourceMapConfiguration = {
    sourceMapGenerator: sourceMapGenerator,
    sourceRoot: sourceRoot,
    lowResolution: options && options.lowResolutionSourceMap
  };
  var writer;
  if (sourceMapGenerator)
    writer = new ParseTreeMapWriter(sourceMapConfiguration, options);
  else
    writer = new ParseTreeWriter(options);
  writer.visitAny(tree);
  return [writer.toString(), sourceMapGenerator && sourceMapGenerator.toString()];
}
Object.defineProperties(module.exports, {
  toSource: {get: function() {
      return toSource;
    }},
  __esModule: {value: true}
});
