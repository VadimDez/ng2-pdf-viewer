"use strict";
var fs = require('fs');
var path = require('path');
var filename = '../../bin/traceur.js';
filename = path.join(path.dirname(module.filename), filename);
var data = fs.readFileSync(filename, 'utf8');
if (!data)
  throw new Error('Failed to import ' + filename);
module._compile(data, filename);
module.exports = {
  __proto__: traceur,
  get require() {
    return require('./require.js');
  },
  get selfCompiledFilename() {
    return filename;
  }
};
