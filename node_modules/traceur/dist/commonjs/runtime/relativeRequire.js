"use strict";
var path;
function relativeRequire(callerPath, requiredPath) {
  path = path || typeof require !== 'undefined' && require('path');
  function isDirectory(path) {
    return path.slice(-1) === '/';
  }
  function isAbsolute(path) {
    return path[0] === '/';
  }
  function isRelative(path) {
    return path[0] === '.';
  }
  if (isDirectory(requiredPath) || isAbsolute(requiredPath))
    return;
  return isRelative(requiredPath) ? require(path.resolve(path.dirname(callerPath), requiredPath)) : require(requiredPath);
}
$traceurRuntime.require = relativeRequire;
