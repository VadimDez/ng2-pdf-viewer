"use strict";
var fs = require('fs');
var path = require('path');
var Promise = require('rsvp').Promise;
var nodeLoader = require('./nodeLoader.js');
var util = require('./file-util.js');
var normalizePath = util.normalizePath;
var mkdirRecursive = util.mkdirRecursive;
var NodeCompiler = require('./NodeCompiler.js').NodeCompiler;
var cwd = process.cwd();
function revertCwd() {
  process.chdir(cwd);
}
function recursiveModuleCompileToSingleFile(outputFile, includes, options) {
  var resolvedOutputFile = path.resolve(outputFile);
  var outputDir = path.dirname(resolvedOutputFile);
  var resolvedIncludes = includes.map(function(include) {
    include.name = path.resolve(include.name);
    include.rootModule = true;
    return include;
  });
  options.bundle = includes.length > 1;
  var compiler = new NodeCompiler(options);
  mkdirRecursive(outputDir);
  process.chdir(outputDir);
  resolvedIncludes = resolvedIncludes.map(function(include) {
    include.name = normalizePath(path.relative(outputDir, include.name));
    return include;
  });
  return recursiveModuleCompile(resolvedIncludes, options).then(function(tree) {
    compiler.writeTreeToFile(tree, resolvedOutputFile);
  }).then(revertCwd, function(err) {
    revertCwd();
    throw err;
  });
}
function forEachRecursiveModuleCompile(outputDir, includes, options) {
  var outputDir = path.resolve(outputDir);
  var compiler = new NodeCompiler(options);
  function getPromise(input) {
    return recursiveModuleCompile([input], options).then(function(tree) {
      var outputFileName = path.join(outputDir, input.name);
      compiler.writeTreeToFile(tree, outputFileName);
    });
  }
  return Promise.all(includes.map(getPromise));
}
var TraceurLoader = traceur.loader.TraceurLoader;
var InlineLoaderCompiler = traceur.loader.InlineLoaderCompiler;
var Options = traceur.util.Options;
function sequencePromises(list, f) {
  var result = Promise.resolve();
  list.forEach(function(item) {
    result = result.then(function() {
      return f(item);
    });
  });
  return result;
}
function recursiveModuleCompile(fileNamesAndTypes, options) {
  var referrerName = options && options.referrer;
  var basePath = path.resolve('./') + '/';
  basePath = basePath.replace(/\\/g, '/');
  var elements = [];
  var loaderCompiler = new InlineLoaderCompiler(elements);
  var loader = new TraceurLoader(nodeLoader, basePath, loaderCompiler);
  function appendEvaluateModule(name) {
    var normalizedName = $traceurRuntime.ModuleStore.normalize(name, referrerName);
    var moduleModule = traceur.codegeneration.module;
    var tree = moduleModule.createModuleEvaluationStatement(normalizedName);
    elements.push(tree);
  }
  function loadInput(input) {
    var doEvaluateModule = false;
    var loadFunction = loader.import;
    var name = input.name;
    var optionsCopy = new Options(options);
    if (input.type === 'script') {
      loadFunction = loader.loadAsScript;
    } else if (optionsCopy.modules === 'bootstrap') {
      doEvaluateModule = true;
    }
    var loadOptions = {
      referrerName: referrerName,
      metadata: {
        traceurOptions: optionsCopy,
        rootModule: input.rootModule && input.name
      }
    };
    return loadFunction.call(loader, name, loadOptions).then(function() {
      if (doEvaluateModule) {
        appendEvaluateModule(name);
      }
    });
  }
  return sequencePromises(fileNamesAndTypes, loadInput).then(function() {
    return loaderCompiler.toTree();
  });
}
exports.recursiveModuleCompileToSingleFile = recursiveModuleCompileToSingleFile;
exports.forEachRecursiveModuleCompile = forEachRecursiveModuleCompile;
