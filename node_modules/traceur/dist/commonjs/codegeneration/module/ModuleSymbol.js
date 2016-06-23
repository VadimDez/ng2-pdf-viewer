"use strict";
var $___46__46__47__46__46__47_util_47_StringMap_46_js__,
    $___46__46__47__46__46__47_util_47_assert_46_js__;
var StringMap = ($___46__46__47__46__46__47_util_47_StringMap_46_js__ = require("../../util/StringMap.js"), $___46__46__47__46__46__47_util_47_StringMap_46_js__ && $___46__46__47__46__46__47_util_47_StringMap_46_js__.__esModule && $___46__46__47__46__46__47_util_47_StringMap_46_js__ || {default: $___46__46__47__46__46__47_util_47_StringMap_46_js__}).StringMap;
var assert = ($___46__46__47__46__46__47_util_47_assert_46_js__ = require("../../util/assert.js"), $___46__46__47__46__46__47_util_47_assert_46_js__ && $___46__46__47__46__46__47_util_47_assert_46_js__.__esModule && $___46__46__47__46__46__47_util_47_assert_46_js__ || {default: $___46__46__47__46__46__47_util_47_assert_46_js__}).assert;
var ExportsList = function() {
  function ExportsList(normalizedName) {
    this.exports_ = new StringMap();
    if (normalizedName !== null)
      this.normalizedName = normalizedName.replace(/\\/g, '/');
    else
      this.normalizedName = null;
  }
  return ($traceurRuntime.createClass)(ExportsList, {
    addExport: function(name, tree) {
      assert(!this.exports_.has(name));
      this.exports_.set(name, tree);
    },
    getExport: function(name) {
      return this.exports_.get(name);
    },
    getExports: function() {
      return this.exports_.keysAsArray();
    },
    addExportsFromModule: function(module) {
      var $__6 = this;
      Object.getOwnPropertyNames(module).forEach(function(name) {
        $__6.addExport(name, true);
      });
    }
  }, {});
}();
var ModuleSymbol = function($__super) {
  function ModuleSymbol(tree, normalizedName) {
    $traceurRuntime.superConstructor(ModuleSymbol).call(this, normalizedName);
    this.tree = tree;
    this.imports_ = new StringMap();
  }
  return ($traceurRuntime.createClass)(ModuleSymbol, {
    addImport: function(name, tree) {
      assert(!this.imports_.has(name));
      this.imports_.set(name, tree);
    },
    getImport: function(name) {
      return this.imports_.get(name);
    }
  }, {}, $__super);
}(ExportsList);
Object.defineProperties(module.exports, {
  ExportsList: {get: function() {
      return ExportsList;
    }},
  ModuleSymbol: {get: function() {
      return ModuleSymbol;
    }},
  __esModule: {value: true}
});
