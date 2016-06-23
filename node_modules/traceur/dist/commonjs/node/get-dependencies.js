"use strict";
var $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__,
    $___46__46__47_syntax_47_Parser_46_js__,
    $___46__46__47_syntax_47_SourceFile_46_js__;
var ModuleSpecifierVisitor = ($___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__ = require("../codegeneration/module/ModuleSpecifierVisitor.js"), $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__ && $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__.__esModule && $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__ || {default: $___46__46__47_codegeneration_47_module_47_ModuleSpecifierVisitor_46_js__}).ModuleSpecifierVisitor;
var Parser = ($___46__46__47_syntax_47_Parser_46_js__ = require("../syntax/Parser.js"), $___46__46__47_syntax_47_Parser_46_js__ && $___46__46__47_syntax_47_Parser_46_js__.__esModule && $___46__46__47_syntax_47_Parser_46_js__ || {default: $___46__46__47_syntax_47_Parser_46_js__}).Parser;
var SourceFile = ($___46__46__47_syntax_47_SourceFile_46_js__ = require("../syntax/SourceFile.js"), $___46__46__47_syntax_47_SourceFile_46_js__ && $___46__46__47_syntax_47_SourceFile_46_js__.__esModule && $___46__46__47_syntax_47_SourceFile_46_js__ || {default: $___46__46__47_syntax_47_SourceFile_46_js__}).SourceFile;
var $__12 = require('path'),
    normalize = $__12.normalize,
    resolve = $__12.resolve,
    dirname = $__12.dirname;
var readFileSync = require('fs').readFileSync;
function addDependencies(deps, path) {
  path = resolve(path);
  if (deps.has(path))
    return;
  var content = readFileSync(path, 'utf-8');
  var sourceFile = new SourceFile(path, content);
  var parser = new Parser(sourceFile);
  var tree = parser.parseModule();
  var options = {};
  var visitor = new ModuleSpecifierVisitor(options);
  visitor.visitAny(tree);
  deps.add(path);
  var $__7 = true;
  var $__8 = false;
  var $__9 = undefined;
  try {
    for (var $__5 = void 0,
        $__4 = (visitor.moduleSpecifiers)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
      var spec = $__5.value;
      {
        var resolved = resolve(dirname(path), spec);
        addDependencies(deps, resolved);
      }
    }
  } catch ($__10) {
    $__8 = true;
    $__9 = $__10;
  } finally {
    try {
      if (!$__7 && $__4.return != null) {
        $__4.return();
      }
    } finally {
      if ($__8) {
        throw $__9;
      }
    }
  }
}
function getDependencies() {
  for (var paths = [],
      $__11 = 0; $__11 < arguments.length; $__11++)
    paths[$__11] = arguments[$__11];
  var deps = new Set();
  var $__7 = true;
  var $__8 = false;
  var $__9 = undefined;
  try {
    for (var $__5 = void 0,
        $__4 = (paths)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
      var path = $__5.value;
      {
        addDependencies(deps, path);
      }
    }
  } catch ($__10) {
    $__8 = true;
    $__9 = $__10;
  } finally {
    try {
      if (!$__7 && $__4.return != null) {
        $__4.return();
      }
    } finally {
      if ($__8) {
        throw $__9;
      }
    }
  }
  return deps;
}
var $__default = getDependencies;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
