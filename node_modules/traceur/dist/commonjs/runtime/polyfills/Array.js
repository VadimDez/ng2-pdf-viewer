"use strict";
var $__ArrayIterator_46_js__,
    $__utils_46_js__;
var $__0 = ($__ArrayIterator_46_js__ = require("./ArrayIterator.js"), $__ArrayIterator_46_js__ && $__ArrayIterator_46_js__.__esModule && $__ArrayIterator_46_js__ || {default: $__ArrayIterator_46_js__}),
    entries = $__0.entries,
    keys = $__0.keys,
    jsValues = $__0.values;
var $__1 = ($__utils_46_js__ = require("./utils.js"), $__utils_46_js__ && $__utils_46_js__.__esModule && $__utils_46_js__ || {default: $__utils_46_js__}),
    checkIterable = $__1.checkIterable,
    isCallable = $__1.isCallable,
    isConstructor = $__1.isConstructor,
    maybeAddFunctions = $__1.maybeAddFunctions,
    maybeAddIterator = $__1.maybeAddIterator,
    registerPolyfill = $__1.registerPolyfill,
    toInteger = $__1.toInteger,
    toLength = $__1.toLength,
    toObject = $__1.toObject;
function from(arrLike) {
  var mapFn = arguments[1];
  var thisArg = arguments[2];
  var C = this;
  var items = toObject(arrLike);
  var mapping = mapFn !== undefined;
  var k = 0;
  var arr,
      len;
  if (mapping && !isCallable(mapFn)) {
    throw TypeError();
  }
  if (checkIterable(items)) {
    arr = isConstructor(C) ? new C() : [];
    var $__7 = true;
    var $__8 = false;
    var $__9 = undefined;
    try {
      for (var $__5 = void 0,
          $__4 = (items)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
        var item = $__5.value;
        {
          if (mapping) {
            arr[k] = mapFn.call(thisArg, item, k);
          } else {
            arr[k] = item;
          }
          k++;
        }
      }
    } catch ($__10) {
      $__8 = true;
      $__9 = $__10;
    } finally {
      try {
        if (!$__7 && $__4.return != null) {
          $__4.return();
        }
      } finally {
        if ($__8) {
          throw $__9;
        }
      }
    }
    arr.length = k;
    return arr;
  }
  len = toLength(items.length);
  arr = isConstructor(C) ? new C(len) : new Array(len);
  for (; k < len; k++) {
    if (mapping) {
      arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
    } else {
      arr[k] = items[k];
    }
  }
  arr.length = len;
  return arr;
}
function of() {
  for (var items = [],
      $__11 = 0; $__11 < arguments.length; $__11++)
    items[$__11] = arguments[$__11];
  var C = this;
  var len = items.length;
  var arr = isConstructor(C) ? new C(len) : new Array(len);
  for (var k = 0; k < len; k++) {
    arr[k] = items[k];
  }
  arr.length = len;
  return arr;
}
function fill(value) {
  var start = arguments[1] !== (void 0) ? arguments[1] : 0;
  var end = arguments[2];
  var object = toObject(this);
  var len = toLength(object.length);
  var fillStart = toInteger(start);
  var fillEnd = end !== undefined ? toInteger(end) : len;
  fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
  fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
  while (fillStart < fillEnd) {
    object[fillStart] = value;
    fillStart++;
  }
  return object;
}
function find(predicate) {
  var thisArg = arguments[1];
  return findHelper(this, predicate, thisArg);
}
function findIndex(predicate) {
  var thisArg = arguments[1];
  return findHelper(this, predicate, thisArg, true);
}
function findHelper(self, predicate) {
  var thisArg = arguments[2];
  var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
  var object = toObject(self);
  var len = toLength(object.length);
  if (!isCallable(predicate)) {
    throw TypeError();
  }
  for (var i = 0; i < len; i++) {
    var value = object[i];
    if (predicate.call(thisArg, value, i, object)) {
      return returnIndex ? i : value;
    }
  }
  return returnIndex ? -1 : undefined;
}
function polyfillArray(global) {
  var $__12 = global,
      Array = $__12.Array,
      Object = $__12.Object,
      Symbol = $__12.Symbol;
  var values = jsValues;
  if (Symbol && Symbol.iterator && Array.prototype[Symbol.iterator]) {
    values = Array.prototype[Symbol.iterator];
  }
  maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
  maybeAddFunctions(Array, ['from', from, 'of', of]);
  maybeAddIterator(Array.prototype, values, Symbol);
  maybeAddIterator(Object.getPrototypeOf([].values()), function() {
    return this;
  }, Symbol);
}
registerPolyfill(polyfillArray);
Object.defineProperties(module.exports, {
  from: {get: function() {
      return from;
    }},
  of: {get: function() {
      return of;
    }},
  fill: {get: function() {
      return fill;
    }},
  find: {get: function() {
      return find;
    }},
  findIndex: {get: function() {
      return findIndex;
    }},
  polyfillArray: {get: function() {
      return polyfillArray;
    }},
  __esModule: {value: true}
});
