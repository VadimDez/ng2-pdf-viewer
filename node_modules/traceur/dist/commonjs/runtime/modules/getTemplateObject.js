"use strict";
var $__1 = Object,
    defineProperty = $__1.defineProperty,
    freeze = $__1.freeze;
var slice = Array.prototype.slice;
var map = Object.create(null);
function getTemplateObject(raw) {
  var cooked = arguments[1];
  var key = raw.join('${}');
  var templateObject = map[key];
  if (templateObject)
    return templateObject;
  if (!cooked) {
    cooked = slice.call(raw);
  }
  return map[key] = freeze(defineProperty(cooked, 'raw', {value: freeze(raw)}));
}
var $__default = getTemplateObject;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
