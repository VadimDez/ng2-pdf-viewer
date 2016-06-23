"use strict";
var $__util_47_StringMap_46_js__,
    $__WebPageTranscoder_46_js__;
var StringMap = ($__util_47_StringMap_46_js__ = require("./util/StringMap.js"), $__util_47_StringMap_46_js__ && $__util_47_StringMap_46_js__.__esModule && $__util_47_StringMap_46_js__ || {default: $__util_47_StringMap_46_js__}).StringMap;
var $__1 = ($__WebPageTranscoder_46_js__ = require("./WebPageTranscoder.js"), $__WebPageTranscoder_46_js__ && $__WebPageTranscoder_46_js__.__esModule && $__WebPageTranscoder_46_js__ || {default: $__WebPageTranscoder_46_js__}),
    WebPageTranscoder = $__1.WebPageTranscoder,
    scriptSelector = $__1.scriptSelector;
var importSelector = 'link[rel=import][href]';
var HTMLImportTranscoder = function() {
  function HTMLImportTranscoder() {
    this.importsToProcess_ = [];
  }
  return ($traceurRuntime.createClass)(HTMLImportTranscoder, {
    findAllChildrenHTMLImports_: function(parentImportNodes) {
      var foundImportNodes = [];
      for (var parentIndex = 0; parentIndex < parentImportNodes.length; parentIndex++) {
        var parentLink = parentImportNodes[parentIndex];
        var childImportNodes = parentLink.import.querySelectorAll(importSelector);
        if (childImportNodes.length > 0)
          this.findAllChildrenHTMLImports_(childImportNodes);
        this.importsToProcess_.push(parentLink);
      }
    },
    filterHTMLImports_: function(importNodes) {
      this.findAllChildrenHTMLImports_(importNodes);
      var importsToParse = [];
      var dupFilterMap = new StringMap();
      for (var index = 0; index < this.importsToProcess_.length; index++) {
        var processLink = this.importsToProcess_[index];
        if (!dupFilterMap.has(processLink.href)) {
          dupFilterMap.set(processLink.href, 0);
          var scripts = processLink.import.querySelectorAll(scriptSelector);
          if (scripts.length > 0)
            importsToParse.push({
              href: processLink.href,
              scripts: scripts
            });
        }
      }
      this.importsToProcess_ = [];
      return importsToParse;
    },
    selectAndProcessHTMLImports: function(importNodes, done) {
      var importInfoList = this.filterHTMLImports_(importNodes);
      if (importInfoList.length === 0)
        done();
      var processCount = importInfoList.length;
      importInfoList.forEach(function(importInfo) {
        var transcoder = new WebPageTranscoder(importInfo.href);
        transcoder.addFilesFromScriptElements(importInfo.scripts, function() {
          processCount--;
          if (processCount === 0 && done)
            done();
        });
      });
    },
    run: function() {
      var done = arguments[0] !== (void 0) ? arguments[0] : function() {};
      var $__4 = this;
      var ready = document.readyState;
      if (ready === 'complete' || ready === 'loaded') {
        var importNodes = document.querySelectorAll(importSelector);
        if (importNodes.length > 0)
          this.selectAndProcessHTMLImports(importNodes, done);
      } else {
        document.addEventListener('HTMLImportsLoaded', function(event) {
          var importNodes = event.detail && event.detail.allImports ? event.detail.allImports : document.querySelectorAll(importSelector);
          if (importNodes.length > 0)
            $__4.selectAndProcessHTMLImports(importNodes, done);
        });
      }
    }
  }, {});
}();
Object.defineProperties(module.exports, {
  HTMLImportTranscoder: {get: function() {
      return HTMLImportTranscoder;
    }},
  __esModule: {value: true}
});
