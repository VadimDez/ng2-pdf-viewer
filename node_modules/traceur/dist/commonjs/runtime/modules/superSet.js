"use strict";
var $__superDescriptor_46_js__;
var superDescriptor = ($__superDescriptor_46_js__ = require("./superDescriptor.js"), $__superDescriptor_46_js__ && $__superDescriptor_46_js__.__esModule && $__superDescriptor_46_js__ || {default: $__superDescriptor_46_js__}).default;
var $TypeError = TypeError;
function superSet(self, homeObject, name, value) {
  var descriptor = superDescriptor(homeObject, name);
  if (descriptor && descriptor.set) {
    descriptor.set.call(self, value);
    return value;
  }
  throw $TypeError(("super has no setter '" + name + "'."));
}
var $__default = superSet;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
