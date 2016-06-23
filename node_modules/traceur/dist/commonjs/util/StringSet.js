"use strict";
function assertString(value) {
  if (typeof value !== 'string')
    throw new TypeError();
}
var StringSet = function() {
  function StringSet() {
    this.storage_ = Object.create(null);
  }
  return ($traceurRuntime.createClass)(StringSet, {
    add: function(value) {
      assertString(value);
      this.storage_[value] = true;
    },
    has: function(value) {
      assertString(value);
      return this.storage_[value] !== undefined;
    },
    delete: function(value) {
      assertString(value);
      delete this.storage_[value];
    },
    isEmpty: function() {
      for (var _ in this.storage_) {
        return false;
      }
      return true;
    },
    valuesAsArray: function() {
      return Object.keys(this.storage_);
    },
    forEach: function(func) {
      for (var value in this.storage_) {
        func(value);
      }
    }
  }, {});
}();
Object.defineProperties(module.exports, {
  StringSet: {get: function() {
      return StringSet;
    }},
  __esModule: {value: true}
});
