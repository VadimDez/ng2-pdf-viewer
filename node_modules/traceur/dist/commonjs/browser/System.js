"use strict";
var $___46__46__47_loader_47_TraceurLoader_46_js__;
var BrowserTraceurLoader = ($___46__46__47_loader_47_TraceurLoader_46_js__ = require("../loader/TraceurLoader.js"), $___46__46__47_loader_47_TraceurLoader_46_js__ && $___46__46__47_loader_47_TraceurLoader_46_js__.__esModule && $___46__46__47_loader_47_TraceurLoader_46_js__ || {default: $___46__46__47_loader_47_TraceurLoader_46_js__}).BrowserTraceurLoader;
var traceurLoader = new BrowserTraceurLoader();
Reflect.global.System = traceurLoader;
traceurLoader.map = traceurLoader.semverMap('traceur@' + traceurLoader.version);
$traceurRuntime.normalizeModuleName = traceurLoader.normalize.bind(traceurLoader);
Object.defineProperties(module.exports, {
  System: {get: function() {
      return traceurLoader;
    }},
  __esModule: {value: true}
});
