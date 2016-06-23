"use strict";
var $__1 = Object,
    defineProperty = $__1.defineProperty,
    getOwnPropertyNames = $__1.getOwnPropertyNames,
    getOwnPropertySymbols = $__1.getOwnPropertySymbols,
    propertyIsEnumerable = $__1.propertyIsEnumerable;
function createDataProperty(o, p, v) {
  defineProperty(o, p, {
    configurable: true,
    enumerable: true,
    value: v,
    writable: true
  });
}
function copyDataProperties(target, source) {
  if (source == null) {
    return;
  }
  var copy = function(keys) {
    for (var i = 0; i < keys.length; i++) {
      var nextKey = keys[i];
      if (propertyIsEnumerable.call(source, nextKey)) {
        var propValue = source[nextKey];
        createDataProperty(target, nextKey, propValue);
      }
    }
  };
  copy(getOwnPropertyNames(source));
  copy(getOwnPropertySymbols(source));
}
var $__default = function() {
  var target = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    copyDataProperties(target, arguments[i]);
  }
  return target;
};
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
