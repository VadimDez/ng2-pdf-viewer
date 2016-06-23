"use strict";
var $TypeError = TypeError;
function checkObjectCoercible(v) {
  if (v === null || v === undefined) {
    throw new $TypeError('Value cannot be converted to an Object');
  }
  return v;
}
var $__default = checkObjectCoercible;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
