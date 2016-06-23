"use strict";
var $__utils_46_js__;
var $__0 = ($__utils_46_js__ = require("./utils.js"), $__utils_46_js__ && $__utils_46_js__.__esModule && $__utils_46_js__ || {default: $__utils_46_js__}),
    toObject = $__0.toObject,
    toUint32 = $__0.toUint32,
    createIteratorResultObject = $__0.createIteratorResultObject;
var ARRAY_ITERATOR_KIND_KEYS = 1;
var ARRAY_ITERATOR_KIND_VALUES = 2;
var ARRAY_ITERATOR_KIND_ENTRIES = 3;
var ArrayIterator = function() {
  var $__4;
  function ArrayIterator() {}
  return ($traceurRuntime.createClass)(ArrayIterator, ($__4 = {}, Object.defineProperty($__4, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__4, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__4), {});
}();
function createArrayIterator(array, kind) {
  var object = toObject(array);
  var iterator = new ArrayIterator;
  iterator.iteratorObject_ = object;
  iterator.arrayIteratorNextIndex_ = 0;
  iterator.arrayIterationKind_ = kind;
  return iterator;
}
function entries() {
  return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
}
function keys() {
  return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
}
function values() {
  return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
}
Object.defineProperties(module.exports, {
  entries: {get: function() {
      return entries;
    }},
  keys: {get: function() {
      return keys;
    }},
  values: {get: function() {
      return values;
    }},
  __esModule: {value: true}
});
