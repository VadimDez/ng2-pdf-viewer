"use strict";
var $__StringSet_46_js__;
var StringSet = ($__StringSet_46_js__ = require("./StringSet.js"), $__StringSet_46_js__ && $__StringSet_46_js__.__esModule && $__StringSet_46_js__ || {default: $__StringSet_46_js__}).StringSet;
function assertString(value) {
  if (typeof value !== 'string')
    throw new TypeError();
}
var StringMap = function() {
  function StringMap() {
    this.storage_ = Object.create(null);
  }
  return ($traceurRuntime.createClass)(StringMap, {
    set: function(key, value) {
      assertString(key);
      this.storage_[key] = value;
    },
    get: function(key) {
      assertString(key);
      return this.storage_[key];
    },
    delete: function(key) {
      assertString(key);
      delete this.storage_[key];
    },
    has: function(key) {
      assertString(key);
      return this.storage_[key] !== undefined;
    },
    keysAsArray: function() {
      return Object.keys(this.storage_);
    },
    keysAsSet: function() {
      var set = new StringSet();
      this.forEach(function(key) {
        return set.add(key);
      });
      return set;
    },
    forEach: function(func) {
      for (var key in this.storage_) {
        func(key, this.storage_[key]);
      }
    }
  }, {});
}();
Object.defineProperties(module.exports, {
  StringMap: {get: function() {
      return StringMap;
    }},
  __esModule: {value: true}
});
