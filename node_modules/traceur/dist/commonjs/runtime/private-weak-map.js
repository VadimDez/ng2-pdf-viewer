"use strict";
var $WeakMap = typeof WeakMap === 'function' ? WeakMap : undefined;
function isPrivateSymbol(s) {
  return false;
}
function createPrivateSymbol() {
  return new $WeakMap();
}
function hasPrivate(obj, sym) {
  return sym.has(obj);
}
function deletePrivate(obj, sym) {
  return sym.delete(obj);
}
function setPrivate(obj, sym, val) {
  sym.set(obj, val);
}
function getPrivate(obj, sym) {
  return sym.get(obj);
}
function init() {}
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
