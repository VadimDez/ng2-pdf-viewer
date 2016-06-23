"use strict";
var glob = require('glob');
var path = require('path');
var NodeCompiler = require('./NodeCompiler.js').NodeCompiler;
function compileAllJsFilesInDir(inputDir, outputDir, options) {
  inputDir = path.normalize(inputDir).replace(/\\/g, '/');
  outputDir = path.normalize(outputDir).replace(/\\/g, '/');
  glob(inputDir + '/**/*.js', {}, function(er, files) {
    if (er)
      throw new Error('While scanning ' + inputDir + ': ' + er);
    files.forEach(function(inputFilePath) {
      var outputFilePath = inputFilePath.replace(inputDir, outputDir);
      var compiler = new NodeCompiler(options);
      compiler.compileSingleFile(inputFilePath, outputFilePath, function(err) {
        throw new Error('While reading ' + inputFilePath + ': ' + err);
      });
    });
  });
}
module.exports = {compileAllJsFilesInDir: compileAllJsFilesInDir};
