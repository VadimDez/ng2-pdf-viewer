"use strict";
var $__2 = Object,
    getOwnPropertyDescriptor = $__2.getOwnPropertyDescriptor,
    getPrototypeOf = $__2.getPrototypeOf;
function superDescriptor(homeObject, name) {
  var proto = getPrototypeOf(homeObject);
  do {
    var result = getOwnPropertyDescriptor(proto, name);
    if (result)
      return result;
    proto = getPrototypeOf(proto);
  } while (proto);
  return undefined;
}
var $__default = superDescriptor;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
