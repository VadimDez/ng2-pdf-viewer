"use strict";
var $___46__46__47_loader_47_LoaderCompiler_46_js__;
var LoaderCompiler = ($___46__46__47_loader_47_LoaderCompiler_46_js__ = require("../loader/LoaderCompiler.js"), $___46__46__47_loader_47_LoaderCompiler_46_js__ && $___46__46__47_loader_47_LoaderCompiler_46_js__.__esModule && $___46__46__47_loader_47_LoaderCompiler_46_js__ || {default: $___46__46__47_loader_47_LoaderCompiler_46_js__}).LoaderCompiler;
var NodeLoaderCompiler = function($__super) {
  function NodeLoaderCompiler() {
    $traceurRuntime.superConstructor(NodeLoaderCompiler).call(this);
    this.sourceMapsInMemory_ = false;
  }
  return ($traceurRuntime.createClass)(NodeLoaderCompiler, {
    evaluateCodeUnit: function(codeUnit) {
      var runInThisContext = require('vm').runInThisContext;
      var semver = require('semver');
      var content = codeUnit.metadata.transcoded;
      var filename = codeUnit.address || codeUnit.normalizedName;
      if (codeUnit.metadata.traceurOptions.sourceMaps === 'memory') {
        this.enableMemorySourceMaps_();
      }
      var options;
      if (semver.gte(process.version, '0.12.0')) {
        options = {filename: filename};
      } else {
        options = filename;
      }
      var result = runInThisContext(content, options);
      codeUnit.metadata.transformedTree = null;
      return result;
    },
    enableMemorySourceMaps_: function() {
      if (this.sourceMapsInMemory_) {
        return;
      }
      require('source-map-support').install({retrieveSourceMap: function(url) {
          try {
            var map = System.getSourceMap(url);
            if (map) {
              return {
                url: url,
                map: map
              };
            }
          } catch (ex) {
            console.error('retrieveSourceMap FAILED ', ex);
          }
        }});
      this.sourceMapsInMemory_ = true;
    }
  }, {}, $__super);
}(LoaderCompiler);
Object.defineProperties(module.exports, {
  NodeLoaderCompiler: {get: function() {
      return NodeLoaderCompiler;
    }},
  __esModule: {value: true}
});
