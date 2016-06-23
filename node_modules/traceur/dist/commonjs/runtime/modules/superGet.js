"use strict";
var $__superDescriptor_46_js__;
var superDescriptor = ($__superDescriptor_46_js__ = require("./superDescriptor.js"), $__superDescriptor_46_js__ && $__superDescriptor_46_js__.__esModule && $__superDescriptor_46_js__ || {default: $__superDescriptor_46_js__}).default;
function superGet(self, homeObject, name) {
  var descriptor = superDescriptor(homeObject, name);
  if (descriptor) {
    var value = descriptor.value;
    if (value)
      return value;
    if (!descriptor.get)
      return value;
    return descriptor.get.call(self);
  }
  return undefined;
}
var $__default = superGet;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
