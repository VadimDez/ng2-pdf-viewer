"use strict";
var $__utils_46_js__,
    $__assign_46_js__;
var $__0 = ($__utils_46_js__ = require("./utils.js"), $__utils_46_js__ && $__utils_46_js__.__esModule && $__utils_46_js__ || {default: $__utils_46_js__}),
    maybeAddFunctions = $__0.maybeAddFunctions,
    registerPolyfill = $__0.registerPolyfill;
var assign = ($__assign_46_js__ = require("./assign.js"), $__assign_46_js__ && $__assign_46_js__.__esModule && $__assign_46_js__ || {default: $__assign_46_js__}).default;
var $__4 = Object,
    defineProperty = $__4.defineProperty,
    getOwnPropertyDescriptor = $__4.getOwnPropertyDescriptor,
    getOwnPropertyNames = $__4.getOwnPropertyNames;
function is(left, right) {
  if (left === right)
    return left !== 0 || 1 / left === 1 / right;
  return left !== left && right !== right;
}
function mixin(target, source) {
  var props = getOwnPropertyNames(source);
  var p,
      descriptor,
      length = props.length;
  for (p = 0; p < length; p++) {
    var name = props[p];
    descriptor = getOwnPropertyDescriptor(source, props[p]);
    defineProperty(target, props[p], descriptor);
  }
  return target;
}
function polyfillObject(global) {
  var Object = global.Object;
  maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
}
registerPolyfill(polyfillObject);
Object.defineProperties(module.exports, {
  assign: {get: function() {
      return assign;
    }},
  is: {get: function() {
      return is;
    }},
  mixin: {get: function() {
      return mixin;
    }},
  polyfillObject: {get: function() {
      return polyfillObject;
    }},
  __esModule: {value: true}
});
