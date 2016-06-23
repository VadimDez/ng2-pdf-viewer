"use strict";
var $__Scope_46_js__,
    $___46__46__47_util_47_StringSet_46_js__;
var Scope = ($__Scope_46_js__ = require("./Scope.js"), $__Scope_46_js__ && $__Scope_46_js__.__esModule && $__Scope_46_js__ || {default: $__Scope_46_js__}).Scope;
var StringSet = ($___46__46__47_util_47_StringSet_46_js__ = require("../util/StringSet.js"), $___46__46__47_util_47_StringSet_46_js__ && $___46__46__47_util_47_StringSet_46_js__.__esModule && $___46__46__47_util_47_StringSet_46_js__ || {default: $___46__46__47_util_47_StringSet_46_js__}).StringSet;
var ScopeReferences = function($__super) {
  function ScopeReferences(parent, tree) {
    $traceurRuntime.superConstructor(ScopeReferences).call(this, parent, tree);
    this.freeVars_ = new StringSet();
  }
  return ($traceurRuntime.createClass)(ScopeReferences, {
    addReference: function(name) {
      this.freeVars_.add(name);
    },
    hasFreeVariable: function(name) {
      return this.freeVars_.has(name);
    }
  }, {}, $__super);
}(Scope);
Object.defineProperties(module.exports, {
  ScopeReferences: {get: function() {
      return ScopeReferences;
    }},
  __esModule: {value: true}
});
