"use strict";
var $___46__46__47_codegeneration_47_module_47_ExportListBuilder_46_js__,
    $___46__46__47_util_47_CollectingErrorReporter_46_js__,
    $___46__46__47_Compiler_46_js__,
    $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__,
    $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__,
    $___46__46__47_syntax_47_Parser_46_js__,
    $___46__46__47_syntax_47_SourceFile_46_js__,
    $__system_45_map_46_js__,
    $___46__46__47_codegeneration_47_UniqueIdentifierGenerator_46_js__,
    $___46__46__47_util_47_url_46_js__,
    $___46__46__47_util_47_assert_46_js__;
var buildExportList = ($___46__46__47_codegeneration_47_module_47_ExportListBuilder_46_js__ = require("../codegeneration/module/ExportListBuilder.js"), $___46__46__47_codegeneration_47_module_47_ExportListBuilder_46_js__ && $___46__46__47_codegeneration_47_module_47_ExportListBuilder_46_js__.__esModule && $___46__46__47_codegeneration_47_module_47_ExportListBuilder_46_js__ || {default: $___46__46__47_codegeneration_47_module_47_ExportListBuilder_46_js__}).buildExportList;
var CollectingErrorReporter = ($___46__46__47_util_47_CollectingErrorReporter_46_js__ = require("../util/CollectingErrorReporter.js"), $___46__46__47_util_47_CollectingErrorReporter_46_js__ && $___46__46__47_util_47_CollectingErrorReporter_46_js__.__esModule && $___46__46__47_util_47_CollectingErrorReporter_46_js__ || {default: $___46__46__47_util_47_CollectingErrorReporter_46_js__}).CollectingErrorReporter;
var Compiler = ($___46__46__47_Compiler_46_js__ = require("../Compiler.js"), $___46__46__47_Compiler_46_js__ && $___46__46__47_Compiler_46_js__.__esModule && $___46__46__47_Compiler_46_js__ || {default: $___46__46__47_Compiler_46_js__}).Compiler;
var ModuleSpecifierVisitor = ($___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__ = require("../codegeneration/module/ModuleSpecifierVisitor.js"), $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__ && $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__.__esModule && $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__ || {default: $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__}).ModuleSpecifierVisitor;
var ModuleSymbol = ($___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__ = require("../codegeneration/module/ModuleSymbol.js"), $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__ && $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__.__esModule && $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__ || {default: $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__}).ModuleSymbol;
var Parser = ($___46__46__47_syntax_47_Parser_46_js__ = require("../syntax/Parser.js"), $___46__46__47_syntax_47_Parser_46_js__ && $___46__46__47_syntax_47_Parser_46_js__.__esModule && $___46__46__47_syntax_47_Parser_46_js__ || {default: $___46__46__47_syntax_47_Parser_46_js__}).Parser;
var SourceFile = ($___46__46__47_syntax_47_SourceFile_46_js__ = require("../syntax/SourceFile.js"), $___46__46__47_syntax_47_SourceFile_46_js__ && $___46__46__47_syntax_47_SourceFile_46_js__.__esModule && $___46__46__47_syntax_47_SourceFile_46_js__ || {default: $___46__46__47_syntax_47_SourceFile_46_js__}).SourceFile;
var systemjs = ($__system_45_map_46_js__ = require("./system-map.js"), $__system_45_map_46_js__ && $__system_45_map_46_js__.__esModule && $__system_45_map_46_js__ || {default: $__system_45_map_46_js__}).systemjs;
var UniqueIdentifierGenerator = ($___46__46__47_codegeneration_47_UniqueIdentifierGenerator_46_js__ = require("../codegeneration/UniqueIdentifierGenerator.js"), $___46__46__47_codegeneration_47_UniqueIdentifierGenerator_46_js__ && $___46__46__47_codegeneration_47_UniqueIdentifierGenerator_46_js__.__esModule && $___46__46__47_codegeneration_47_UniqueIdentifierGenerator_46_js__ || {default: $___46__46__47_codegeneration_47_UniqueIdentifierGenerator_46_js__}).UniqueIdentifierGenerator;
var $__9 = ($___46__46__47_util_47_url_46_js__ = require("../util/url.js"), $___46__46__47_util_47_url_46_js__ && $___46__46__47_util_47_url_46_js__.__esModule && $___46__46__47_util_47_url_46_js__ || {default: $___46__46__47_util_47_url_46_js__}),
    isAbsolute = $__9.isAbsolute,
    resolveUrl = $__9.resolveUrl;
var assert = ($___46__46__47_util_47_assert_46_js__ = require("../util/assert.js"), $___46__46__47_util_47_assert_46_js__ && $___46__46__47_util_47_assert_46_js__.__esModule && $___46__46__47_util_47_assert_46_js__ || {default: $___46__46__47_util_47_assert_46_js__}).assert;
var NOT_STARTED = 0;
var LOADING = 1;
var LOADED = 2;
var PARSED = 3;
var TRANSFORMING = 4;
var TRANSFORMED = 5;
var COMPLETE = 6;
var ERROR = 7;
var identifierGenerator = new UniqueIdentifierGenerator();
var anonymousSourcesSeen = 0;
var LoaderCompiler = function() {
  function LoaderCompiler() {}
  return ($traceurRuntime.createClass)(LoaderCompiler, {
    getModuleSpecifiers: function(codeUnit) {
      this.parse(codeUnit);
      var moduleSpecifierVisitor = new ModuleSpecifierVisitor(codeUnit.metadata.traceurOptions);
      moduleSpecifierVisitor.visit(codeUnit.metadata.tree);
      return moduleSpecifierVisitor.moduleSpecifiers;
    },
    parse: function(codeUnit) {
      assert(!codeUnit.metadata.tree);
      var metadata = codeUnit.metadata;
      var options = metadata.traceurOptions;
      if (codeUnit.type === 'script')
        options.script = true;
      metadata.compiler = new Compiler(options);
      var sourceName = codeUnit.metadata.sourceName = codeUnit.address || codeUnit.normalizedName || '(unnamed)#' + String(++anonymousSourcesSeen);
      metadata.tree = metadata.compiler.parse(codeUnit.source, sourceName);
    },
    transform: function(codeUnit) {
      var metadata = codeUnit.metadata;
      metadata.transformedTree = metadata.compiler.transform(metadata.tree, codeUnit.normalizedName, metadata);
    },
    write: function(codeUnit) {
      var metadata = codeUnit.metadata;
      var outputName = metadata.outputName || metadata.sourceName || '<loaderOutput>';
      var sourceRoot = metadata.sourceRoot;
      var sourceURL = metadata.sourceName || codeUnit.normalizedName || codeUnit.address;
      metadata.transcoded = metadata.compiler.write(metadata.transformedTree, outputName, undefined, sourceURL);
    },
    evaluateCodeUnit: function(codeUnit) {
      var result = ('global', eval)(codeUnit.metadata.transcoded);
      codeUnit.metadata.transformedTree = null;
      return result;
    },
    analyzeDependencies: function(dependencies, loader) {
      var deps = [];
      for (var i = 0; i < dependencies.length; i++) {
        var codeUnit = dependencies[i];
        assert(codeUnit.state >= PARSED);
        if (codeUnit.state == PARSED) {
          var symbol = codeUnit.metadata.moduleSymbol = new ModuleSymbol(codeUnit.metadata.tree, codeUnit.normalizedName);
          deps.push(symbol);
        }
      }
      this.checkForErrors(function(reporter) {
        return buildExportList(deps, loader, reporter);
      });
    },
    checkForErrors: function(fncOfReporter) {
      var reporter = new CollectingErrorReporter();
      var result = fncOfReporter(reporter);
      if (reporter.hadError())
        throw reporter.toError();
      return result;
    }
  }, {});
}();
Object.defineProperties(module.exports, {
  LoaderCompiler: {get: function() {
      return LoaderCompiler;
    }},
  __esModule: {value: true}
});
