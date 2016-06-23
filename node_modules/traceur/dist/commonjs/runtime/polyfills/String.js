"use strict";
var $___46__46__47_checkObjectCoercible_46_js__,
    $__StringIterator_46_js__,
    $__utils_46_js__;
var checkObjectCoercible = ($___46__46__47_checkObjectCoercible_46_js__ = require("../checkObjectCoercible.js"), $___46__46__47_checkObjectCoercible_46_js__ && $___46__46__47_checkObjectCoercible_46_js__.__esModule && $___46__46__47_checkObjectCoercible_46_js__ || {default: $___46__46__47_checkObjectCoercible_46_js__}).default;
var createStringIterator = ($__StringIterator_46_js__ = require("./StringIterator.js"), $__StringIterator_46_js__ && $__StringIterator_46_js__.__esModule && $__StringIterator_46_js__ || {default: $__StringIterator_46_js__}).createStringIterator;
var $__2 = ($__utils_46_js__ = require("./utils.js"), $__utils_46_js__ && $__utils_46_js__.__esModule && $__utils_46_js__ || {default: $__utils_46_js__}),
    maybeAddFunctions = $__2.maybeAddFunctions,
    maybeAddIterator = $__2.maybeAddIterator,
    registerPolyfill = $__2.registerPolyfill;
var $toString = Object.prototype.toString;
var $indexOf = String.prototype.indexOf;
var $lastIndexOf = String.prototype.lastIndexOf;
function startsWith(search) {
  var string = String(this);
  if (this == null || $toString.call(search) == '[object RegExp]') {
    throw TypeError();
  }
  var stringLength = string.length;
  var searchString = String(search);
  var searchLength = searchString.length;
  var position = arguments.length > 1 ? arguments[1] : undefined;
  var pos = position ? Number(position) : 0;
  if (isNaN(pos)) {
    pos = 0;
  }
  var start = Math.min(Math.max(pos, 0), stringLength);
  return $indexOf.call(string, searchString, pos) == start;
}
function endsWith(search) {
  var string = String(this);
  if (this == null || $toString.call(search) == '[object RegExp]') {
    throw TypeError();
  }
  var stringLength = string.length;
  var searchString = String(search);
  var searchLength = searchString.length;
  var pos = stringLength;
  if (arguments.length > 1) {
    var position = arguments[1];
    if (position !== undefined) {
      pos = position ? Number(position) : 0;
      if (isNaN(pos)) {
        pos = 0;
      }
    }
  }
  var end = Math.min(Math.max(pos, 0), stringLength);
  var start = end - searchLength;
  if (start < 0) {
    return false;
  }
  return $lastIndexOf.call(string, searchString, start) == start;
}
function includes(search) {
  if (this == null) {
    throw TypeError();
  }
  var string = String(this);
  if (search && $toString.call(search) == '[object RegExp]') {
    throw TypeError();
  }
  var stringLength = string.length;
  var searchString = String(search);
  var searchLength = searchString.length;
  var position = arguments.length > 1 ? arguments[1] : undefined;
  var pos = position ? Number(position) : 0;
  if (pos != pos) {
    pos = 0;
  }
  var start = Math.min(Math.max(pos, 0), stringLength);
  if (searchLength + start > stringLength) {
    return false;
  }
  return $indexOf.call(string, searchString, pos) != -1;
}
function repeat(count) {
  if (this == null) {
    throw TypeError();
  }
  var string = String(this);
  var n = count ? Number(count) : 0;
  if (isNaN(n)) {
    n = 0;
  }
  if (n < 0 || n == Infinity) {
    throw RangeError();
  }
  if (n == 0) {
    return '';
  }
  var result = '';
  while (n--) {
    result += string;
  }
  return result;
}
function codePointAt(position) {
  if (this == null) {
    throw TypeError();
  }
  var string = String(this);
  var size = string.length;
  var index = position ? Number(position) : 0;
  if (isNaN(index)) {
    index = 0;
  }
  if (index < 0 || index >= size) {
    return undefined;
  }
  var first = string.charCodeAt(index);
  var second;
  if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
    second = string.charCodeAt(index + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }
  return first;
}
function raw(callsite) {
  var raw = callsite.raw;
  var len = raw.length >>> 0;
  if (len === 0)
    return '';
  var s = '';
  var i = 0;
  while (true) {
    s += raw[i];
    if (i + 1 === len)
      return s;
    s += arguments[++i];
  }
}
function fromCodePoint(_) {
  var codeUnits = [];
  var floor = Math.floor;
  var highSurrogate;
  var lowSurrogate;
  var index = -1;
  var length = arguments.length;
  if (!length) {
    return '';
  }
  while (++index < length) {
    var codePoint = Number(arguments[index]);
    if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
      throw RangeError('Invalid code point: ' + codePoint);
    }
    if (codePoint <= 0xFFFF) {
      codeUnits.push(codePoint);
    } else {
      codePoint -= 0x10000;
      highSurrogate = (codePoint >> 10) + 0xD800;
      lowSurrogate = (codePoint % 0x400) + 0xDC00;
      codeUnits.push(highSurrogate, lowSurrogate);
    }
  }
  return String.fromCharCode.apply(null, codeUnits);
}
function stringPrototypeIterator() {
  var o = checkObjectCoercible(this);
  var s = String(o);
  return createStringIterator(s);
}
function polyfillString(global) {
  var String = global.String;
  maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'endsWith', endsWith, 'includes', includes, 'repeat', repeat, 'startsWith', startsWith]);
  maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
  maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
}
registerPolyfill(polyfillString);
Object.defineProperties(module.exports, {
  startsWith: {get: function() {
      return startsWith;
    }},
  endsWith: {get: function() {
      return endsWith;
    }},
  includes: {get: function() {
      return includes;
    }},
  repeat: {get: function() {
      return repeat;
    }},
  codePointAt: {get: function() {
      return codePointAt;
    }},
  raw: {get: function() {
      return raw;
    }},
  fromCodePoint: {get: function() {
      return fromCodePoint;
    }},
  stringPrototypeIterator: {get: function() {
      return stringPrototypeIterator;
    }},
  polyfillString: {get: function() {
      return polyfillString;
    }},
  __esModule: {value: true}
});
