"use strict";
var fs = require('fs');
var path = require('path');
function existsSync(p) {
  return fs.existsSync ? fs.existsSync(p) : path.existsSync(p);
}
function mkdirRecursive(dir) {
  var parts = path.normalize(dir).split(path.sep);
  dir = '';
  for (var i = 0; i < parts.length; i++) {
    dir += parts[i] + path.sep;
    if (!existsSync(dir)) {
      fs.mkdirSync(dir, 0x1FD);
    }
  }
}
function removeCommonPrefix(basedir, filedir) {
  var baseparts = basedir.split(path.sep);
  var fileparts = filedir.split(path.sep);
  var i = 0;
  while (i < fileparts.length && fileparts[i] === baseparts[i]) {
    i++;
  }
  return fileparts.slice(i).join(path.sep);
}
function writeFile(filename, contents) {
  var outputdir = fs.realpathSync(process.cwd());
  mkdirRecursive(path.dirname(filename));
  var filedir = fs.realpathSync(path.dirname(filename));
  filedir = removeCommonPrefix(outputdir, filedir);
  outputdir = path.join(outputdir, filedir);
  mkdirRecursive(outputdir);
  var outputfile = path.join(outputdir, path.basename(filename));
  fs.writeFileSync(outputfile, contents, 'utf8');
}
function normalizePath(s) {
  return path.sep == '\\' ? s.replace(/\\/g, '/') : s;
}
exports.mkdirRecursive = mkdirRecursive;
exports.normalizePath = normalizePath;
exports.removeCommonPrefix = removeCommonPrefix;
exports.writeFile = writeFile;
