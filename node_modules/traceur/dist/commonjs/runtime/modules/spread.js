"use strict";
var $___46__46__47_checkObjectCoercible_46_js__;
var checkObjectCoercible = ($___46__46__47_checkObjectCoercible_46_js__ = require("../checkObjectCoercible.js"), $___46__46__47_checkObjectCoercible_46_js__ && $___46__46__47_checkObjectCoercible_46_js__.__esModule && $___46__46__47_checkObjectCoercible_46_js__ || {default: $___46__46__47_checkObjectCoercible_46_js__}).default;
function spread() {
  var rv = [],
      j = 0,
      iterResult;
  for (var i = 0; i < arguments.length; i++) {
    var valueToSpread = checkObjectCoercible(arguments[i]);
    if (typeof valueToSpread[Symbol.iterator] !== 'function') {
      throw new TypeError('Cannot spread non-iterable object.');
    }
    var iter = valueToSpread[Symbol.iterator]();
    while (!(iterResult = iter.next()).done) {
      rv[j++] = iterResult.value;
    }
  }
  return rv;
}
var $__default = spread;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
