"use strict";
var $__FindInFunctionScope_46_js__;
var FindInFunctionScope = ($__FindInFunctionScope_46_js__ = require("./FindInFunctionScope.js"), $__FindInFunctionScope_46_js__ && $__FindInFunctionScope_46_js__.__esModule && $__FindInFunctionScope_46_js__ || {default: $__FindInFunctionScope_46_js__}).FindInFunctionScope;
var FindThis = function($__super) {
  function FindThis() {
    $traceurRuntime.superConstructor(FindThis).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(FindThis, {visitThisExpression: function(tree) {
      this.found = true;
    }}, {}, $__super);
}(FindInFunctionScope);
function scopeContainsThis(tree) {
  var visitor = new FindThis();
  visitor.visitAny(tree);
  return visitor.found;
}
var $__default = scopeContainsThis;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
