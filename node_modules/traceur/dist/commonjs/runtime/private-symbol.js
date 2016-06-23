"use strict";
var $__new_45_unique_45_string_46_js__;
var newUniqueString = ($__new_45_unique_45_string_46_js__ = require("./new-unique-string.js"), $__new_45_unique_45_string_46_js__ && $__new_45_unique_45_string_46_js__.__esModule && $__new_45_unique_45_string_46_js__ || {default: $__new_45_unique_45_string_46_js__}).default;
var $Symbol = typeof Symbol === 'function' ? Symbol : undefined;
var $getOwnPropertySymbols = Object.getOwnPropertySymbols;
var $create = Object.create;
var privateNames = $create(null);
function isPrivateSymbol(s) {
  return privateNames[s];
}
;
function createPrivateSymbol() {
  var s = ($Symbol || newUniqueString)();
  privateNames[s] = true;
  return s;
}
;
function hasPrivate(obj, sym) {
  return hasOwnProperty.call(obj, sym);
}
;
function deletePrivate(obj, sym) {
  if (!hasPrivate(obj, sym)) {
    return false;
  }
  delete obj[sym];
  return true;
}
;
function setPrivate(obj, sym, val) {
  obj[sym] = val;
}
;
function getPrivate(obj, sym) {
  var val = obj[sym];
  if (val === undefined)
    return undefined;
  return hasOwnProperty.call(obj, sym) ? val : undefined;
}
;
function init() {
  if ($getOwnPropertySymbols) {
    Object.getOwnPropertySymbols = function getOwnPropertySymbols(object) {
      var rv = [];
      var symbols = $getOwnPropertySymbols(object);
      for (var i = 0; i < symbols.length; i++) {
        var symbol = symbols[i];
        if (!isPrivateSymbol(symbol)) {
          rv.push(symbol);
        }
      }
      return rv;
    };
  }
}
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
  init: {get: function() {
      return init;
    }},
  __esModule: {value: true}
});
