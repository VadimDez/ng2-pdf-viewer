"use strict";
var $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__,
    $__codegeneration_47_FromOptionsTransformer_46_js__,
    $__syntax_47_Parser_46_js__,
    $__codegeneration_47_PureES6Transformer_46_js__,
    $__syntax_47_SourceFile_46_js__,
    $__util_47_CollectingErrorReporter_46_js__,
    $__Options_46_js__,
    $__outputgeneration_47_ParseTreeMapWriter_46_js__,
    $__outputgeneration_47_ParseTreeWriter_46_js__,
    $__outputgeneration_47_SourceMapIntegration_46_js__;
var AttachModuleNameTransformer = ($__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__ = require("./codegeneration/module/AttachModuleNameTransformer.js"), $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__ && $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__.__esModule && $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__ || {default: $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__}).AttachModuleNameTransformer;
var FromOptionsTransformer = ($__codegeneration_47_FromOptionsTransformer_46_js__ = require("./codegeneration/FromOptionsTransformer.js"), $__codegeneration_47_FromOptionsTransformer_46_js__ && $__codegeneration_47_FromOptionsTransformer_46_js__.__esModule && $__codegeneration_47_FromOptionsTransformer_46_js__ || {default: $__codegeneration_47_FromOptionsTransformer_46_js__}).FromOptionsTransformer;
var Parser = ($__syntax_47_Parser_46_js__ = require("./syntax/Parser.js"), $__syntax_47_Parser_46_js__ && $__syntax_47_Parser_46_js__.__esModule && $__syntax_47_Parser_46_js__ || {default: $__syntax_47_Parser_46_js__}).Parser;
var PureES6Transformer = ($__codegeneration_47_PureES6Transformer_46_js__ = require("./codegeneration/PureES6Transformer.js"), $__codegeneration_47_PureES6Transformer_46_js__ && $__codegeneration_47_PureES6Transformer_46_js__.__esModule && $__codegeneration_47_PureES6Transformer_46_js__ || {default: $__codegeneration_47_PureES6Transformer_46_js__}).PureES6Transformer;
var SourceFile = ($__syntax_47_SourceFile_46_js__ = require("./syntax/SourceFile.js"), $__syntax_47_SourceFile_46_js__ && $__syntax_47_SourceFile_46_js__.__esModule && $__syntax_47_SourceFile_46_js__ || {default: $__syntax_47_SourceFile_46_js__}).SourceFile;
var CollectingErrorReporter = ($__util_47_CollectingErrorReporter_46_js__ = require("./util/CollectingErrorReporter.js"), $__util_47_CollectingErrorReporter_46_js__ && $__util_47_CollectingErrorReporter_46_js__.__esModule && $__util_47_CollectingErrorReporter_46_js__ || {default: $__util_47_CollectingErrorReporter_46_js__}).CollectingErrorReporter;
var $__6 = ($__Options_46_js__ = require("./Options.js"), $__Options_46_js__ && $__Options_46_js__.__esModule && $__Options_46_js__ || {default: $__Options_46_js__}),
    Options = $__6.Options,
    versionLockedOptions = $__6.versionLockedOptions;
var ParseTreeMapWriter = ($__outputgeneration_47_ParseTreeMapWriter_46_js__ = require("./outputgeneration/ParseTreeMapWriter.js"), $__outputgeneration_47_ParseTreeMapWriter_46_js__ && $__outputgeneration_47_ParseTreeMapWriter_46_js__.__esModule && $__outputgeneration_47_ParseTreeMapWriter_46_js__ || {default: $__outputgeneration_47_ParseTreeMapWriter_46_js__}).ParseTreeMapWriter;
var ParseTreeWriter = ($__outputgeneration_47_ParseTreeWriter_46_js__ = require("./outputgeneration/ParseTreeWriter.js"), $__outputgeneration_47_ParseTreeWriter_46_js__ && $__outputgeneration_47_ParseTreeWriter_46_js__.__esModule && $__outputgeneration_47_ParseTreeWriter_46_js__ || {default: $__outputgeneration_47_ParseTreeWriter_46_js__}).ParseTreeWriter;
var $__9 = ($__outputgeneration_47_SourceMapIntegration_46_js__ = require("./outputgeneration/SourceMapIntegration.js"), $__outputgeneration_47_SourceMapIntegration_46_js__ && $__outputgeneration_47_SourceMapIntegration_46_js__.__esModule && $__outputgeneration_47_SourceMapIntegration_46_js__ || {default: $__outputgeneration_47_SourceMapIntegration_46_js__}),
    SourceMapConsumer = $__9.SourceMapConsumer,
    SourceMapGenerator = $__9.SourceMapGenerator;
function merge() {
  for (var srcs = [],
      $__12 = 0; $__12 < arguments.length; $__12++)
    srcs[$__12] = arguments[$__12];
  var dest = Object.create(null);
  srcs.forEach(function(src) {
    Object.keys(src).forEach(function(key) {
      dest[key] = src[key];
    });
    var srcModules = src.modules;
    if (typeof srcModules !== 'undefined') {
      dest.modules = srcModules;
    }
  });
  return dest;
}
function basePath(name) {
  if (!name)
    return null;
  var lastSlash = name.lastIndexOf('/');
  if (lastSlash < 0)
    return null;
  return name.substring(0, lastSlash + 1);
}
var Compiler = function() {
  function Compiler() {
    var overridingOptions = arguments[0] !== (void 0) ? arguments[0] : {};
    this.options_ = new Options(this.defaultOptions());
    this.options_.setFromObject(overridingOptions);
    this.sourceMapConfiguration_ = null;
    this.sourceMapInfo_ = null;
    this.sourceMapCache_ = null;
  }
  return ($traceurRuntime.createClass)(Compiler, {
    compile: function(content) {
      var sourceName = arguments[1] !== (void 0) ? arguments[1] : '<compileSource>';
      var outputName = arguments[2] !== (void 0) ? arguments[2] : '<compileOutput>';
      var sourceRoot = arguments[3];
      sourceName = this.normalize(sourceName);
      outputName = this.normalize(outputName);
      var tree = this.parse(content, sourceName);
      tree = this.transform(tree, sourceName);
      var sourceURL = sourceName !== outputName ? sourceName : undefined;
      if (sourceRoot === undefined)
        sourceRoot = this.options_.sourceRoot;
      return this.write(tree, outputName, sourceRoot, sourceURL);
    },
    throwIfErrors: function(errorReporter) {
      if (errorReporter.hadError())
        throw errorReporter.toError();
    },
    parse: function(content) {
      var sourceName = arguments[1] !== (void 0) ? arguments[1] : '<compiler-parse-input>';
      sourceName = this.normalize(sourceName);
      this.sourceMapCache_ = null;
      this.sourceMapConfiguration_ = null;
      var errorReporter = new CollectingErrorReporter();
      var sourceFile = new SourceFile(sourceName, content);
      var parser = new Parser(sourceFile, errorReporter, this.options_);
      var tree = this.options_.script ? parser.parseScript() : parser.parseModule();
      this.throwIfErrors(errorReporter);
      return tree;
    },
    transform: function(tree) {
      var candidateModuleName = arguments[1];
      var metadata = arguments[2];
      var transformer;
      if (candidateModuleName) {
        var transformer$__13 = new AttachModuleNameTransformer(candidateModuleName);
        tree = transformer$__13.transformAny(tree);
      }
      var errorReporter = new CollectingErrorReporter();
      if (this.options_.outputLanguage.toLowerCase() === 'es6') {
        transformer = new PureES6Transformer(errorReporter, this.options_, metadata);
      } else {
        transformer = new FromOptionsTransformer(errorReporter, this.options_);
      }
      var transformedTree = transformer.transform(tree);
      this.throwIfErrors(errorReporter);
      return transformedTree;
    },
    createSourceMapConfiguration_: function(outputName) {
      var sourceRoot = arguments[1];
      var sourceURL = arguments[2];
      if (this.options_.sourceMaps) {
        return {
          sourceMapGenerator: new SourceMapGenerator({
            file: outputName,
            sourceRoot: sourceRoot,
            skipValidation: true
          }),
          basepath: basePath(outputName),
          inputSourceMap: this.options_.inputSourceMap,
          sourceURL: sourceURL,
          outputName: outputName
        };
      }
    },
    getSourceMap: function() {
      if (this.sourceMapCache_) {
        return this.sourceMapCache_;
      }
      if (this.sourceMapConfiguration_) {
        var sourceMap = this.sourceMapConfiguration_.sourceMapGenerator.toString();
        var inputSourceMap = this.sourceMapConfiguration_.inputSourceMap;
        if (inputSourceMap) {
          var generator = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(sourceMap));
          generator.applySourceMap(new SourceMapConsumer(inputSourceMap));
          sourceMap = generator.toJSON();
        }
        this.sourceMapCache_ = sourceMap;
        return sourceMap;
      }
    },
    get sourceMapInfo() {
      if (!this.sourceMapInfo_ && this.sourceMapConfiguration_) {
        var sourceMap = this.getSourceMap();
        this.sourceMapInfo_ = {
          url: this.sourceMapConfiguration_.sourceURL,
          outputName: this.sourceMapConfiguration_.outputName,
          map: sourceMap
        };
      }
      return this.sourceMapInfo_;
    },
    write: function(tree) {
      var outputName = arguments[1];
      var sourceRoot = arguments[2];
      var sourceURL = arguments[3];
      outputName = this.normalize(outputName);
      if (sourceRoot === undefined)
        sourceRoot = this.options_.sourceRoot;
      if (sourceRoot === true)
        sourceRoot = basePath(outputName);
      else if (!sourceRoot)
        sourceRoot = undefined;
      else
        sourceRoot = this.normalize(sourceRoot);
      var writer;
      this.sourceMapCache_ = null;
      this.sourceMapConfiguration_ = this.createSourceMapConfiguration_(outputName, sourceRoot, sourceURL);
      if (this.sourceMapConfiguration_) {
        this.sourceMapConfiguration_.lowResolution = this.options_.lowResolutionSourceMap;
        writer = new ParseTreeMapWriter(this.sourceMapConfiguration_, this.options_);
      } else {
        writer = new ParseTreeWriter(this.options_);
      }
      writer.visitAny(tree);
      var compiledCode = writer.toString();
      var link = this.debuggerLink(sourceURL, outputName);
      if (link) {
        compiledCode += link;
      }
      return compiledCode;
    },
    debuggerLink: function(sourceURL, outputName) {
      if (this.sourceMapConfiguration_) {
        if (this.options_.sourceMaps === 'memory') {
          return;
        }
        var sourceMappingURL = this.sourceMappingURL(sourceURL || outputName || 'unnamed.js');
        return '//# sourceMappingURL=' + sourceMappingURL + '\n';
      } else {
        if (sourceURL) {
          return '//# sourceURL=' + sourceURL + '\n';
        }
      }
    },
    sourceName: function(filename) {
      return filename;
    },
    sourceMappingURL: function(path) {
      if (this.options_.sourceMaps === 'inline') {
        if (Reflect.global.btoa) {
          return 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(this.getSourceMap())));
        }
      }
      path = path || 'unamed.js';
      path = path.split('/').pop();
      return path + '.map';
    },
    sourceNameFromTree: function(tree) {
      return tree.location.start.source.name;
    },
    defaultOptions: function() {
      return versionLockedOptions;
    },
    normalize: function(name) {
      return name && name.replace(/\\/g, '/');
    }
  }, {
    script: function(content) {
      var options = arguments[1] !== (void 0) ? arguments[1] : {};
      options = new Options(options);
      options.script = true;
      return new Compiler(options).compile(content);
    },
    module: function(content) {
      var options = arguments[1] !== (void 0) ? arguments[1] : {};
      options = new Options(options);
      options.modules = 'bootstrap';
      return new Compiler(options).compile(content);
    },
    amdOptions: function() {
      var options = arguments[0] !== (void 0) ? arguments[0] : {};
      var amdOptions = {
        modules: 'amd',
        sourceMaps: false,
        moduleName: false
      };
      return merge(amdOptions, options);
    },
    closureOptions: function() {
      var options = arguments[0] !== (void 0) ? arguments[0] : {};
      var closureOptions = {
        modules: 'closure',
        sourceMaps: false,
        moduleName: true
      };
      return merge(closureOptions, options);
    },
    commonJSOptions: function() {
      var options = arguments[0] !== (void 0) ? arguments[0] : {};
      var commonjsOptions = {
        modules: 'commonjs',
        sourceMaps: false,
        moduleName: false
      };
      return merge(commonjsOptions, options);
    }
  });
}();
Object.defineProperties(module.exports, {
  Compiler: {get: function() {
      return Compiler;
    }},
  __esModule: {value: true}
});
