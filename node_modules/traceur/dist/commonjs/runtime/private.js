"use strict";
var $__private_45_symbol_46_js__,
    $__private_45_weak_45_map_46_js__;
var sym = ($__private_45_symbol_46_js__ = require("./private-symbol.js"), $__private_45_symbol_46_js__ && $__private_45_symbol_46_js__.__esModule && $__private_45_symbol_46_js__ || {default: $__private_45_symbol_46_js__});
var weak = ($__private_45_weak_45_map_46_js__ = require("./private-weak-map.js"), $__private_45_weak_45_map_46_js__ && $__private_45_weak_45_map_46_js__.__esModule && $__private_45_weak_45_map_46_js__ || {default: $__private_45_weak_45_map_46_js__});
var hasWeakMap = typeof WeakMap === 'function';
var m = hasWeakMap ? weak : sym;
var isPrivateSymbol = m.isPrivateSymbol;
var createPrivateSymbol = m.createPrivateSymbol;
var hasPrivate = m.hasPrivate;
var deletePrivate = m.deletePrivate;
var setPrivate = m.setPrivate;
var getPrivate = m.getPrivate;
m.init();
Object.defineProperties(module.exports, {
  isPrivateSymbol: {get: function() {
      return isPrivateSymbol;
    }},
  createPrivateSymbol: {get: function() {
      return createPrivateSymbol;
    }},
  hasPrivate: {get: function() {
      return hasPrivate;
    }},
  deletePrivate: {get: function() {
      return deletePrivate;
    }},
  setPrivate: {get: function() {
      return setPrivate;
    }},
  getPrivate: {get: function() {
      return getPrivate;
    }},
  __esModule: {value: true}
});
