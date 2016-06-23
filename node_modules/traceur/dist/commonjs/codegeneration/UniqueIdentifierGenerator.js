"use strict";
var UniqueIdentifierGenerator = function() {
  function UniqueIdentifierGenerator() {
    this.identifierIndex = 0;
  }
  return ($traceurRuntime.createClass)(UniqueIdentifierGenerator, {generateUniqueIdentifier: function() {
      return ("$__" + this.identifierIndex++);
    }}, {});
}();
Object.defineProperties(module.exports, {
  UniqueIdentifierGenerator: {get: function() {
      return UniqueIdentifierGenerator;
    }},
  __esModule: {value: true}
});
