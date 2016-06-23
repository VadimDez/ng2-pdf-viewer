"use strict";
var path = require('path');
var traceur = require('./traceur.js');
var NodeCompilerModule = require('./NodeCompiler.js');
var NodeCompiler = NodeCompilerModule.NodeCompiler;
var recursiveModuleCompile = require('./recursiveModuleCompile.js');
var compileAllJsFilesInDir = require('./compileAllJsFilesInDir.js');
var Compiler = traceur.Compiler;
function compile(src, options, sourceName, outputName) {
  sourceName = sourceName || '<compile-source>';
  outputName = outputName || '<compile-output>';
  return new NodeCompiler(Compiler.commonJSOptions(options)).compile(src, sourceName, outputName);
}
var RUNTIME_PATH = path.join(__dirname, '../../bin/traceur-runtime.js').replace(/\\/g, '/');
module.exports = {
  __proto__: traceur,
  recursiveModuleCompileToSingleFile: recursiveModuleCompile.recursiveModuleCompileToSingleFile,
  forEachRecursiveModuleCompile: recursiveModuleCompile.forEachRecursiveModuleCompile,
  compileAllJsFilesInDir: compileAllJsFilesInDir.compileAllJsFilesInDir,
  NodeCompiler: NodeCompiler,
  compile: compile,
  commonJSOptions: Compiler.commonJSOptions,
  amdOptions: Compiler.amdOptions,
  closureOptions: Compiler.closureOptions,
  RUNTIME_PATH: RUNTIME_PATH
};
