"use strict";
function assert(b) {
  if (!b && $traceurRuntime.options.debug)
    throw Error('Assertion failed');
}
Object.defineProperties(module.exports, {
  assert: {get: function() {
      return assert;
    }},
  __esModule: {value: true}
});
