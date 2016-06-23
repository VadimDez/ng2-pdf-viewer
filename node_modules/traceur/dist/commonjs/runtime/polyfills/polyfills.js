"use strict";
var $__utils_46_js__;
var polyfillAll = ($__utils_46_js__ = require("./utils.js"), $__utils_46_js__ && $__utils_46_js__.__esModule && $__utils_46_js__ || {default: $__utils_46_js__}).polyfillAll;
polyfillAll(Reflect.global);
var setupGlobals = $traceurRuntime.setupGlobals;
$traceurRuntime.setupGlobals = function(global) {
  setupGlobals(global);
  polyfillAll(global);
};
