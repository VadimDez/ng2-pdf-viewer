"use strict";
var $__SourceRange_46_js__;
var SourceRange = ($__SourceRange_46_js__ = require("./SourceRange.js"), $__SourceRange_46_js__ && $__SourceRange_46_js__.__esModule && $__SourceRange_46_js__ || {default: $__SourceRange_46_js__}).SourceRange;
var ErrorReporter = function() {
  function ErrorReporter() {
    this.hadError_ = false;
  }
  return ($traceurRuntime.createClass)(ErrorReporter, {
    reportError: function(location, message) {
      this.hadError_ = true;
      this.reportMessageInternal(location, message);
    },
    reportMessageInternal: function(location, message) {
      if (location)
        message = (location.start + ": " + message);
      console.error(message);
    },
    hadError: function() {
      return this.hadError_;
    },
    clearError: function() {
      this.hadError_ = false;
    }
  }, {});
}();
function format(location, text) {
  var args = arguments[2];
  var i = 0;
  text = text.replace(/%./g, function(s) {
    switch (s) {
      case '%s':
        return args && args[i++];
      case '%%':
        return '%';
    }
    return s;
  });
  if (location)
    text = (location + ": " + text);
  return text;
}
;
ErrorReporter.format = format;
Object.defineProperties(module.exports, {
  ErrorReporter: {get: function() {
      return ErrorReporter;
    }},
  format: {get: function() {
      return format;
    }},
  __esModule: {value: true}
});
