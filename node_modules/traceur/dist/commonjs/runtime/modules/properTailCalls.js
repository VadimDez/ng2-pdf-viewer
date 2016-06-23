"use strict";
var $___46__46__47_private_46_js__;
var $__0 = ($___46__46__47_private_46_js__ = require("../private.js"), $___46__46__47_private_46_js__ && $___46__46__47_private_46_js__.__esModule && $___46__46__47_private_46_js__ || {default: $___46__46__47_private_46_js__}),
    getPrivate = $__0.getPrivate,
    setPrivate = $__0.setPrivate,
    createPrivateSymbol = $__0.createPrivateSymbol;
var $apply = Function.prototype.call.bind(Function.prototype.apply);
var CONTINUATION_TYPE = Object.create(null);
var isTailRecursiveName = null;
function createContinuation(operand, thisArg, argsArray) {
  return [CONTINUATION_TYPE, operand, thisArg, argsArray];
}
function isContinuation(object) {
  return object && object[0] === CONTINUATION_TYPE;
}
function $bind(operand, thisArg, args) {
  var argArray = [thisArg];
  for (var i = 0; i < args.length; i++) {
    argArray[i + 1] = args[i];
  }
  var func = $apply(Function.prototype.bind, operand, argArray);
  return func;
}
function $construct(func, argArray) {
  var object = new ($bind(func, null, argArray));
  return object;
}
function isTailRecursive(func) {
  return !!getPrivate(func, isTailRecursiveName);
}
function tailCall(func, thisArg, argArray) {
  var continuation = argArray[0];
  if (isContinuation(continuation)) {
    continuation = $apply(func, thisArg, continuation[3]);
    return continuation;
  }
  continuation = createContinuation(func, thisArg, argArray);
  while (true) {
    if (isTailRecursive(func)) {
      continuation = $apply(func, continuation[2], [continuation]);
    } else {
      continuation = $apply(func, continuation[2], continuation[3]);
    }
    if (!isContinuation(continuation)) {
      return continuation;
    }
    func = continuation[1];
  }
}
function construct() {
  var object;
  if (isTailRecursive(this)) {
    object = $construct(this, [createContinuation(null, null, arguments)]);
  } else {
    object = $construct(this, arguments);
  }
  return object;
}
function setupProperTailCalls() {
  isTailRecursiveName = createPrivateSymbol();
  Function.prototype.call = initTailRecursiveFunction(function call(thisArg) {
    var result = tailCall(function(thisArg) {
      var argArray = [];
      for (var i = 1; i < arguments.length; ++i) {
        argArray[i - 1] = arguments[i];
      }
      var continuation = createContinuation(this, thisArg, argArray);
      return continuation;
    }, this, arguments);
    return result;
  });
  Function.prototype.apply = initTailRecursiveFunction(function apply(thisArg, argArray) {
    var result = tailCall(function(thisArg, argArray) {
      var continuation = createContinuation(this, thisArg, argArray);
      return continuation;
    }, this, arguments);
    return result;
  });
}
function initTailRecursiveFunction(func) {
  if (isTailRecursiveName === null) {
    setupProperTailCalls();
  }
  setPrivate(func, isTailRecursiveName, true);
  return func;
}
Object.defineProperties(module.exports, {
  construct: {get: function() {
      return construct;
    }},
  initTailRecursiveFunction: {get: function() {
      return initTailRecursiveFunction;
    }},
  call: {get: function() {
      return tailCall;
    }},
  continuation: {get: function() {
      return createContinuation;
    }},
  __esModule: {value: true}
});
