"use strict";
var fs = require('fs');
var traceur = require('./traceur.js');
var nodeLoader = require('./nodeLoader.js');
function interpret(filename, options) {
  var moduleName = filename.replace(/\\/g, '/');
  var metadata = {
    traceurOptions: options,
    outputName: filename
  };
  System.import(moduleName, {metadata: metadata}).catch(function(err) {
    console.error(err.stack || err + '');
    process.exit(1);
  });
}
module.exports = interpret;
