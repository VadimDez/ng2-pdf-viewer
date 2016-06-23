"use strict";
function iteratorToArray(iter) {
  var rv = [];
  var i = 0;
  var tmp;
  while (!(tmp = iter.next()).done) {
    rv[i++] = tmp.value;
  }
  return rv;
}
var $__default = iteratorToArray;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
