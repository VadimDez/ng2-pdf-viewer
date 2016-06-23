"use strict";
var $__TraceurLoader_46_js__,
    $___46__46__47_node_47_NodeLoaderCompiler_46_js__;
var TraceurLoader = ($__TraceurLoader_46_js__ = require("./TraceurLoader.js"), $__TraceurLoader_46_js__ && $__TraceurLoader_46_js__.__esModule && $__TraceurLoader_46_js__ || {default: $__TraceurLoader_46_js__}).TraceurLoader;
var NodeLoaderCompiler = ($___46__46__47_node_47_NodeLoaderCompiler_46_js__ = require("../node/NodeLoaderCompiler.js"), $___46__46__47_node_47_NodeLoaderCompiler_46_js__ && $___46__46__47_node_47_NodeLoaderCompiler_46_js__.__esModule && $___46__46__47_node_47_NodeLoaderCompiler_46_js__ || {default: $___46__46__47_node_47_NodeLoaderCompiler_46_js__}).NodeLoaderCompiler;
var NodeTraceurLoader = function($__super) {
  function NodeTraceurLoader() {
    var path = require('path');
    var fileloader = require('../node/nodeLoader.js');
    var url = (path.resolve('./') + '/').replace(/\\/g, '/');
    $traceurRuntime.superConstructor(NodeTraceurLoader).call(this, fileloader, url, new NodeLoaderCompiler());
    this.traceurMap_ = null;
  }
  return ($traceurRuntime.createClass)(NodeTraceurLoader, {getSourceMap: function(filename) {
      var map = $traceurRuntime.superGet(this, NodeTraceurLoader.prototype, "getSourceMap").call(this, filename);
      if (!map && filename.replace(/\\/g, '/').endsWith('/bin/traceur.js')) {
        if (!this.traceurMap_) {
          var fs = require('fs');
          this.traceurMap_ = fs.readFileSync(filename + '.map', 'utf8');
        }
        map = this.traceurMap_;
      }
      return map;
    }}, {}, $__super);
}(TraceurLoader);
Object.defineProperties(module.exports, {
  NodeTraceurLoader: {get: function() {
      return NodeTraceurLoader;
    }},
  __esModule: {value: true}
});
