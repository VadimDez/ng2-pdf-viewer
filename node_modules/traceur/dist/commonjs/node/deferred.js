"use strict";
function wrapFunction(fn, firstArg) {
  return function() {
    var resolve,
        reject;
    var promise = new Promise(function(res, rej) {
      resolve = res;
      reject = rej;
    });
    var args = [].slice.call(arguments);
    var originalCallback = args[firstArg ? 0 : args.length - 1];
    function callback(err, value) {
      if (originalCallback)
        originalCallback.apply(this, arguments);
      if (err)
        reject(err);
      else
        resolve(value);
    }
    if (typeof originalCallback !== 'function') {
      originalCallback = null;
      if (firstArg)
        args.unshift(callback);
      else
        args.push(callback);
    } else {
      args[firstArg ? 0 : args.length - 1] = callback;
    }
    fn.apply(this, args);
    return promise;
  };
}
function wrapModule(module, functions) {
  if (typeof module === 'string')
    module = require(module);
  if (!functions) {
    for (var k in module) {
      if (typeof module[k] === 'function' && typeof module[k + 'Sync'] === 'function')
        module[k] = wrapFunction(module[k]);
    }
  } else {
    for (var i = 0,
        k = void 0; i < functions.length; i++) {
      var k = functions[i];
      module[k] = wrapFunction(module[k]);
    }
  }
  return module;
}
function wrap() {
  wrapModule('fs');
  process.nextTick = wrapFunction(process.nextTick, true);
}
exports.wrap = wrap;
