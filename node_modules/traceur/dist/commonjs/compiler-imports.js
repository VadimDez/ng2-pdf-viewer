"use strict";
var $__Compiler_46_js__,
    $__syntax_47_Parser_46_js__,
    $__syntax_47_trees_47_ParseTrees_46_js__,
    $__syntax_47_SourceFile_46_js__,
    $__outputgeneration_47_ParseTreeMapWriter_46_js__,
    $__outputgeneration_47_ParseTreeWriter_46_js__,
    $__outputgeneration_47_regexpuRewritePattern_46_js__,
    $__outputgeneration_47_SourceMapIntegration_46_js__,
    $__outputgeneration_47_SourceMapIntegration_46_js__,
    $__outputgeneration_47_TreeWriter_46_js__,
    $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__,
    $__codegeneration_47_CloneTreeTransformer_46_js__,
    $__codegeneration_47_FromOptionsTransformer_46_js__,
    $__codegeneration_47_PureES6Transformer_46_js__,
    $__codegeneration_47_module_47_createModuleEvaluationStatement_46_js__,
    $__codegeneration_47_PlaceholderParser_46_js__;
var $__Compiler_46_js__ = ($__Compiler_46_js__ = require("./Compiler.js"), $__Compiler_46_js__ && $__Compiler_46_js__.__esModule && $__Compiler_46_js__ || {default: $__Compiler_46_js__});
var Parser = ($__syntax_47_Parser_46_js__ = require("./syntax/Parser.js"), $__syntax_47_Parser_46_js__ && $__syntax_47_Parser_46_js__.__esModule && $__syntax_47_Parser_46_js__ || {default: $__syntax_47_Parser_46_js__}).Parser;
var Script = ($__syntax_47_trees_47_ParseTrees_46_js__ = require("./syntax/trees/ParseTrees.js"), $__syntax_47_trees_47_ParseTrees_46_js__ && $__syntax_47_trees_47_ParseTrees_46_js__.__esModule && $__syntax_47_trees_47_ParseTrees_46_js__ || {default: $__syntax_47_trees_47_ParseTrees_46_js__}).Script;
var SourceFile = ($__syntax_47_SourceFile_46_js__ = require("./syntax/SourceFile.js"), $__syntax_47_SourceFile_46_js__ && $__syntax_47_SourceFile_46_js__.__esModule && $__syntax_47_SourceFile_46_js__ || {default: $__syntax_47_SourceFile_46_js__}).SourceFile;
var syntax = {
  Parser: Parser,
  SourceFile: SourceFile,
  trees: {Script: Script}
};
var ParseTreeMapWriter = ($__outputgeneration_47_ParseTreeMapWriter_46_js__ = require("./outputgeneration/ParseTreeMapWriter.js"), $__outputgeneration_47_ParseTreeMapWriter_46_js__ && $__outputgeneration_47_ParseTreeMapWriter_46_js__.__esModule && $__outputgeneration_47_ParseTreeMapWriter_46_js__ || {default: $__outputgeneration_47_ParseTreeMapWriter_46_js__}).ParseTreeMapWriter;
var ParseTreeWriter = ($__outputgeneration_47_ParseTreeWriter_46_js__ = require("./outputgeneration/ParseTreeWriter.js"), $__outputgeneration_47_ParseTreeWriter_46_js__ && $__outputgeneration_47_ParseTreeWriter_46_js__.__esModule && $__outputgeneration_47_ParseTreeWriter_46_js__ || {default: $__outputgeneration_47_ParseTreeWriter_46_js__}).ParseTreeWriter;
var regexpuRewritePattern = ($__outputgeneration_47_regexpuRewritePattern_46_js__ = require("./outputgeneration/regexpuRewritePattern.js"), $__outputgeneration_47_regexpuRewritePattern_46_js__ && $__outputgeneration_47_regexpuRewritePattern_46_js__.__esModule && $__outputgeneration_47_regexpuRewritePattern_46_js__ || {default: $__outputgeneration_47_regexpuRewritePattern_46_js__}).regexpuRewritePattern;
var SourceMapConsumer = ($__outputgeneration_47_SourceMapIntegration_46_js__ = require("./outputgeneration/SourceMapIntegration.js"), $__outputgeneration_47_SourceMapIntegration_46_js__ && $__outputgeneration_47_SourceMapIntegration_46_js__.__esModule && $__outputgeneration_47_SourceMapIntegration_46_js__ || {default: $__outputgeneration_47_SourceMapIntegration_46_js__}).SourceMapConsumer;
var SourceMapGenerator = ($__outputgeneration_47_SourceMapIntegration_46_js__ = require("./outputgeneration/SourceMapIntegration.js"), $__outputgeneration_47_SourceMapIntegration_46_js__ && $__outputgeneration_47_SourceMapIntegration_46_js__.__esModule && $__outputgeneration_47_SourceMapIntegration_46_js__ || {default: $__outputgeneration_47_SourceMapIntegration_46_js__}).SourceMapGenerator;
var TreeWriter = ($__outputgeneration_47_TreeWriter_46_js__ = require("./outputgeneration/TreeWriter.js"), $__outputgeneration_47_TreeWriter_46_js__ && $__outputgeneration_47_TreeWriter_46_js__.__esModule && $__outputgeneration_47_TreeWriter_46_js__ || {default: $__outputgeneration_47_TreeWriter_46_js__}).TreeWriter;
var outputgeneration = {
  ParseTreeMapWriter: ParseTreeMapWriter,
  ParseTreeWriter: ParseTreeWriter,
  regexpuRewritePattern: regexpuRewritePattern,
  SourceMapConsumer: SourceMapConsumer,
  SourceMapGenerator: SourceMapGenerator,
  TreeWriter: TreeWriter
};
var AttachModuleNameTransformer = ($__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__ = require("./codegeneration/module/AttachModuleNameTransformer.js"), $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__ && $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__.__esModule && $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__ || {default: $__codegeneration_47_module_47_AttachModuleNameTransformer_46_js__}).AttachModuleNameTransformer;
var CloneTreeTransformer = ($__codegeneration_47_CloneTreeTransformer_46_js__ = require("./codegeneration/CloneTreeTransformer.js"), $__codegeneration_47_CloneTreeTransformer_46_js__ && $__codegeneration_47_CloneTreeTransformer_46_js__.__esModule && $__codegeneration_47_CloneTreeTransformer_46_js__ || {default: $__codegeneration_47_CloneTreeTransformer_46_js__}).CloneTreeTransformer;
var FromOptionsTransformer = ($__codegeneration_47_FromOptionsTransformer_46_js__ = require("./codegeneration/FromOptionsTransformer.js"), $__codegeneration_47_FromOptionsTransformer_46_js__ && $__codegeneration_47_FromOptionsTransformer_46_js__.__esModule && $__codegeneration_47_FromOptionsTransformer_46_js__ || {default: $__codegeneration_47_FromOptionsTransformer_46_js__}).FromOptionsTransformer;
var PureES6Transformer = ($__codegeneration_47_PureES6Transformer_46_js__ = require("./codegeneration/PureES6Transformer.js"), $__codegeneration_47_PureES6Transformer_46_js__ && $__codegeneration_47_PureES6Transformer_46_js__.__esModule && $__codegeneration_47_PureES6Transformer_46_js__ || {default: $__codegeneration_47_PureES6Transformer_46_js__}).PureES6Transformer;
var createModuleEvaluationStatement = ($__codegeneration_47_module_47_createModuleEvaluationStatement_46_js__ = require("./codegeneration/module/createModuleEvaluationStatement.js"), $__codegeneration_47_module_47_createModuleEvaluationStatement_46_js__ && $__codegeneration_47_module_47_createModuleEvaluationStatement_46_js__.__esModule && $__codegeneration_47_module_47_createModuleEvaluationStatement_46_js__ || {default: $__codegeneration_47_module_47_createModuleEvaluationStatement_46_js__}).createModuleEvaluationStatement;
var $__14 = ($__codegeneration_47_PlaceholderParser_46_js__ = require("./codegeneration/PlaceholderParser.js"), $__codegeneration_47_PlaceholderParser_46_js__ && $__codegeneration_47_PlaceholderParser_46_js__.__esModule && $__codegeneration_47_PlaceholderParser_46_js__ || {default: $__codegeneration_47_PlaceholderParser_46_js__}),
    parseExpression = $__14.parseExpression,
    parseModule = $__14.parseModule,
    parseScript = $__14.parseScript,
    parseStatement = $__14.parseStatement;
var codegeneration = {
  CloneTreeTransformer: CloneTreeTransformer,
  FromOptionsTransformer: FromOptionsTransformer,
  PureES6Transformer: PureES6Transformer,
  parseExpression: parseExpression,
  parseModule: parseModule,
  parseScript: parseScript,
  parseStatement: parseStatement,
  module: {
    AttachModuleNameTransformer: AttachModuleNameTransformer,
    createModuleEvaluationStatement: createModuleEvaluationStatement
  }
};
Object.defineProperties(module.exports, {
  Compiler: {get: function() {
      return $__Compiler_46_js__.Compiler;
    }},
  syntax: {get: function() {
      return syntax;
    }},
  outputgeneration: {get: function() {
      return outputgeneration;
    }},
  codegeneration: {get: function() {
      return codegeneration;
    }},
  __esModule: {value: true}
});
