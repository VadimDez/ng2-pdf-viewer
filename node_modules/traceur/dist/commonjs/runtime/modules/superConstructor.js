"use strict";
function superConstructor(ctor) {
  return ctor.__proto__;
}
var $__default = superConstructor;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
