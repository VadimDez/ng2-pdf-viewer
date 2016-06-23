"use strict";
var fs = require('fs');
var Module = require('module');
var traceurAPI = require('./api.js');
var ext = '.traceur-compiled';
Module._extensions[ext] = function(module, filename) {
  module.filename = filename.slice(0, -ext.length);
  module._compile(module.compiledCode, module.filename);
};
function compile(filename, options) {
  var contents = fs.readFileSync(filename, 'utf-8');
  options = options || {};
  options.moduleName = filename;
  return traceurAPI.compile(contents, options, filename);
}
function traceurRequire(filename) {
  filename = require.resolve(filename);
  var source = compile(filename);
  var module = new Module(filename, require.main);
  module.compiledCode = source;
  module.load(filename + ext);
  return module.exports;
}
var filters = [];
var originalRequireJs = Module._extensions['.js'];
function shouldCompile(filename) {
  if (filters.length === 0)
    return true;
  for (var i = 0; i < filters.length; i++) {
    if (filters[i].call(null, filename))
      return true;
  }
  return false;
}
traceurRequire.nodeRequire = require;
traceurRequire.makeDefault = function(filter, options) {
  if (!filter)
    filters = [];
  else
    filters.push(filter);
  Module._extensions['.js'] = function(module, filename) {
    if (shouldCompile(filename)) {
      var source = compile(filename, options);
      return module._compile(source, filename);
    }
    return originalRequireJs(module, filename);
  };
};
module.exports = traceurRequire;
