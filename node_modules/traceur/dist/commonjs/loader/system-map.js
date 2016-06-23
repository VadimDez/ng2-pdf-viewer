"use strict";
function prefixMatchLength(name, prefix) {
  var prefixParts = prefix.split('/');
  var nameParts = name.split('/');
  if (prefixParts.length > nameParts.length)
    return 0;
  for (var i = 0; i < prefixParts.length; i++) {
    if (nameParts[i] != prefixParts[i])
      return 0;
  }
  return prefixParts.length;
}
function applyMap(map, name, parentName) {
  var curMatch,
      curMatchLength = 0;
  var curParent,
      curParentMatchLength = 0;
  if (parentName) {
    var mappedName;
    Object.getOwnPropertyNames(map).some(function(p) {
      var curMap = map[p];
      if (curMap && (typeof curMap === 'undefined' ? 'undefined' : $traceurRuntime.typeof(curMap)) === 'object') {
        if (prefixMatchLength(parentName, p) <= curParentMatchLength)
          return;
        Object.getOwnPropertyNames(curMap).forEach(function(q) {
          if (prefixMatchLength(name, q) > curMatchLength) {
            curMatch = q;
            curMatchLength = q.split('/').length;
            curParent = p;
            curParentMatchLength = p.split('/').length;
          }
        });
      }
      if (curMatch) {
        var subPath = name.split('/').splice(curMatchLength).join('/');
        mappedName = map[curParent][curMatch] + (subPath ? '/' + subPath : '');
        return mappedName;
      }
    });
  }
  if (mappedName)
    return mappedName;
  Object.getOwnPropertyNames(map).forEach(function(p) {
    var curMap = map[p];
    if (curMap && typeof curMap === 'string') {
      if (prefixMatchLength(name, p) > curMatchLength) {
        curMatch = p;
        curMatchLength = p.split('/').length;
      }
    }
  });
  if (!curMatch)
    return name;
  var subPath = name.split('/').splice(curMatchLength).join('/');
  return map[curMatch] + (subPath ? '/' + subPath : '');
}
var systemjs = {applyMap: applyMap};
Object.defineProperties(module.exports, {
  systemjs: {get: function() {
      return systemjs;
    }},
  __esModule: {value: true}
});
