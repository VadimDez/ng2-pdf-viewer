module.exports = function() {
  "use strict";
  (function(global) {
    'use strict';
    if (global.$traceurRuntime) {
      return;
    }
    function setupGlobals(global) {
      global.Reflect = global.Reflect || {};
      global.Reflect.global = global.Reflect.global || global;
    }
    setupGlobals(global);
    var typeOf = function(x) {
      return (typeof x === 'undefined' ? 'undefined' : $traceurRuntime.typeof(x));
    };
    global.$traceurRuntime = {
      options: {},
      setupGlobals: setupGlobals,
      typeof: typeOf
    };
  })(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
  return {};
}.call(Reflect.global);
