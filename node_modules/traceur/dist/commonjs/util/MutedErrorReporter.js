"use strict";
var $__ErrorReporter_46_js__;
var ErrorReporter = ($__ErrorReporter_46_js__ = require("./ErrorReporter.js"), $__ErrorReporter_46_js__ && $__ErrorReporter_46_js__.__esModule && $__ErrorReporter_46_js__ || {default: $__ErrorReporter_46_js__}).ErrorReporter;
var MutedErrorReporter = function($__super) {
  function MutedErrorReporter() {
    $traceurRuntime.superConstructor(MutedErrorReporter).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(MutedErrorReporter, {reportMessageInternal: function(location, format, args) {}}, {}, $__super);
}(ErrorReporter);
Object.defineProperties(module.exports, {
  MutedErrorReporter: {get: function() {
      return MutedErrorReporter;
    }},
  __esModule: {value: true}
});
