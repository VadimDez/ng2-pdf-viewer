"use strict";
var random = Math.random;
var counter = Date.now() % 1e9;
function newUniqueString() {
  return '__$' + (random() * 1e9 >>> 1) + '$' + ++counter + '$__';
}
var $__default = newUniqueString;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
