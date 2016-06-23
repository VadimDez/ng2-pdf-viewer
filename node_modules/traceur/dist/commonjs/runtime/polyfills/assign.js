"use strict";
var keys = Object.keys;
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    var props = source == null ? [] : keys(source);
    var p = void 0,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      target[name] = source[name];
    }
  }
  return target;
}
var $__default = assign;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
