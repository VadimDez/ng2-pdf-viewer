"use strict";
var $___46__46__47_private_46_js__,
    $___46__46__47_frozen_45_data_46_js__,
    $__utils_46_js__,
    $___46__46__47_has_45_native_45_symbols_46_js__;
var $__0 = ($___46__46__47_private_46_js__ = require("../private.js"), $___46__46__47_private_46_js__ && $___46__46__47_private_46_js__.__esModule && $___46__46__47_private_46_js__ || {default: $___46__46__47_private_46_js__}),
    createPrivateSymbol = $__0.createPrivateSymbol,
    deletePrivate = $__0.deletePrivate,
    getPrivate = $__0.getPrivate,
    hasPrivate = $__0.hasPrivate,
    setPrivate = $__0.setPrivate;
var $__1 = ($___46__46__47_frozen_45_data_46_js__ = require("../frozen-data.js"), $___46__46__47_frozen_45_data_46_js__ && $___46__46__47_frozen_45_data_46_js__.__esModule && $___46__46__47_frozen_45_data_46_js__ || {default: $___46__46__47_frozen_45_data_46_js__}),
    deleteFrozen = $__1.deleteFrozen,
    getFrozen = $__1.getFrozen,
    hasFrozen = $__1.hasFrozen,
    setFrozen = $__1.setFrozen;
var $__2 = ($__utils_46_js__ = require("./utils.js"), $__utils_46_js__ && $__utils_46_js__.__esModule && $__utils_46_js__ || {default: $__utils_46_js__}),
    isObject = $__2.isObject,
    registerPolyfill = $__2.registerPolyfill;
var hasNativeSymbol = ($___46__46__47_has_45_native_45_symbols_46_js__ = require("../has-native-symbols.js"), $___46__46__47_has_45_native_45_symbols_46_js__ && $___46__46__47_has_45_native_45_symbols_46_js__.__esModule && $___46__46__47_has_45_native_45_symbols_46_js__ || {default: $___46__46__47_has_45_native_45_symbols_46_js__}).default;
var $__6 = Object,
    defineProperty = $__6.defineProperty,
    getOwnPropertyDescriptor = $__6.getOwnPropertyDescriptor,
    isExtensible = $__6.isExtensible;
var $TypeError = TypeError;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var sentinel = {};
var WeakMap = function() {
  function WeakMap() {
    this.name_ = createPrivateSymbol();
    this.frozenData_ = [];
  }
  return ($traceurRuntime.createClass)(WeakMap, {
    set: function(key, value) {
      if (!isObject(key))
        throw new $TypeError('key must be an object');
      if (!isExtensible(key)) {
        setFrozen(this.frozenData_, key, value);
      } else {
        setPrivate(key, this.name_, value);
      }
      return this;
    },
    get: function(key) {
      if (!isObject(key))
        return undefined;
      if (!isExtensible(key)) {
        return getFrozen(this.frozenData_, key);
      }
      return getPrivate(key, this.name_);
    },
    delete: function(key) {
      if (!isObject(key))
        return false;
      if (!isExtensible(key)) {
        return deleteFrozen(this.frozenData_, key);
      }
      return deletePrivate(key, this.name_);
    },
    has: function(key) {
      if (!isObject(key))
        return false;
      if (!isExtensible(key)) {
        return hasFrozen(this.frozenData_, key);
      }
      return hasPrivate(key, this.name_);
    }
  }, {});
}();
function needsPolyfill(global) {
  var $__8 = global,
      WeakMap = $__8.WeakMap,
      Symbol = $__8.Symbol;
  if (!WeakMap || !hasNativeSymbol()) {
    return true;
  }
  try {
    var o = {};
    var wm = new WeakMap([[o, false]]);
    return wm.get(o);
  } catch (e) {
    return false;
  }
}
function polyfillWeakMap(global) {
  if (needsPolyfill(global)) {
    global.WeakMap = WeakMap;
  }
}
registerPolyfill(polyfillWeakMap);
Object.defineProperties(module.exports, {
  WeakMap: {get: function() {
      return WeakMap;
    }},
  polyfillWeakMap: {get: function() {
      return polyfillWeakMap;
    }},
  __esModule: {value: true}
});
