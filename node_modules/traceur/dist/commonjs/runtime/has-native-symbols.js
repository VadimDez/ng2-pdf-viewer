"use strict";
var v = !!Object.getOwnPropertySymbols && typeof Symbol === 'function';
function hasNativeSymbol() {
  return v;
}
var $__default = hasNativeSymbol;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
