"use strict";
var $__utils_46_js__,
    $__Map_46_js__,
    $___46__46__47_has_45_native_45_symbols_46_js__;
var $__0 = ($__utils_46_js__ = require("./utils.js"), $__utils_46_js__ && $__utils_46_js__.__esModule && $__utils_46_js__ || {default: $__utils_46_js__}),
    isObject = $__0.isObject,
    registerPolyfill = $__0.registerPolyfill;
var Map = ($__Map_46_js__ = require("./Map.js"), $__Map_46_js__ && $__Map_46_js__.__esModule && $__Map_46_js__ || {default: $__Map_46_js__}).Map;
var hasNativeSymbol = ($___46__46__47_has_45_native_45_symbols_46_js__ = require("../has-native-symbols.js"), $___46__46__47_has_45_native_45_symbols_46_js__ && $___46__46__47_has_45_native_45_symbols_46_js__.__esModule && $___46__46__47_has_45_native_45_symbols_46_js__ || {default: $___46__46__47_has_45_native_45_symbols_46_js__}).default;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var Set = function() {
  function Set() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Set called on incompatible type');
    if (hasOwnProperty.call(this, 'map_')) {
      throw new TypeError('Set can not be reentrantly initialised');
    }
    this.map_ = new Map();
    if (iterable !== null && iterable !== undefined) {
      var $__10 = true;
      var $__11 = false;
      var $__12 = undefined;
      try {
        for (var $__8 = void 0,
            $__7 = (iterable)[Symbol.iterator](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
          var item = $__8.value;
          {
            this.add(item);
          }
        }
      } catch ($__13) {
        $__11 = true;
        $__12 = $__13;
      } finally {
        try {
          if (!$__10 && $__7.return != null) {
            $__7.return();
          }
        } finally {
          if ($__11) {
            throw $__12;
          }
        }
      }
    }
  }
  return ($traceurRuntime.createClass)(Set, {
    get size() {
      return this.map_.size;
    },
    has: function(key) {
      return this.map_.has(key);
    },
    add: function(key) {
      this.map_.set(key, key);
      return this;
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__6 = this;
      return this.map_.forEach(function(value, key) {
        callbackFn.call(thisArg, key, key, $__6);
      });
    },
    values: $traceurRuntime.initGeneratorFunction(function $__16() {
      var $__17,
          $__18;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__17 = $ctx.wrapYieldStar(this.map_.keys()[Symbol.iterator]());
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__18 = $__17[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__18.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__18.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__18.value;
            default:
              return $ctx.end();
          }
      }, $__16, this);
    }),
    entries: $traceurRuntime.initGeneratorFunction(function $__19() {
      var $__20,
          $__21;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__20 = $ctx.wrapYieldStar(this.map_.entries()[Symbol.iterator]());
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__21 = $__20[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__21.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__21.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__21.value;
            default:
              return $ctx.end();
          }
      }, $__19, this);
    })
  }, {});
}();
Object.defineProperty(Set.prototype, Symbol.iterator, {
  configurable: true,
  writable: true,
  value: Set.prototype.values
});
Object.defineProperty(Set.prototype, 'keys', {
  configurable: true,
  writable: true,
  value: Set.prototype.values
});
function needsPolyfill(global) {
  var $__15 = global,
      Set = $__15.Set,
      Symbol = $__15.Symbol;
  if (!Set || !hasNativeSymbol() || !Set.prototype[Symbol.iterator] || !Set.prototype.values) {
    return true;
  }
  try {
    return new Set([1]).size !== 1;
  } catch (e) {
    return false;
  }
}
function polyfillSet(global) {
  if (needsPolyfill(global)) {
    global.Set = Set;
  }
}
registerPolyfill(polyfillSet);
Object.defineProperties(module.exports, {
  Set: {get: function() {
      return Set;
    }},
  polyfillSet: {get: function() {
      return polyfillSet;
    }},
  __esModule: {value: true}
});
