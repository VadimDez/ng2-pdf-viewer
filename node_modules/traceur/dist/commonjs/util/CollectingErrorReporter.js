"use strict";
var $___46__46__47_util_47_ErrorReporter_46_js__;
var ErrorReporter = ($___46__46__47_util_47_ErrorReporter_46_js__ = require("../util/ErrorReporter.js"), $___46__46__47_util_47_ErrorReporter_46_js__ && $___46__46__47_util_47_ErrorReporter_46_js__.__esModule && $___46__46__47_util_47_ErrorReporter_46_js__ || {default: $___46__46__47_util_47_ErrorReporter_46_js__}).ErrorReporter;
var MultipleErrors = function($__super) {
  function MultipleErrors(errors) {
    $traceurRuntime.superConstructor(MultipleErrors).call(this);
    this.message = errors ? errors.join('\n') : '';
    this.name = 'MultipleErrors';
    this.errors = errors;
  }
  return ($traceurRuntime.createClass)(MultipleErrors, {}, {}, $__super);
}(Error);
var CollectingErrorReporter = function($__super) {
  function CollectingErrorReporter() {
    $traceurRuntime.superConstructor(CollectingErrorReporter).call(this);
    this.errors = [];
  }
  return ($traceurRuntime.createClass)(CollectingErrorReporter, {
    reportMessageInternal: function(location, message) {
      this.errors.push((location.start + ": " + message));
    },
    errorsAsString: function() {
      return this.toError().message;
    },
    toError: function() {
      return new MultipleErrors(this.errors);
    }
  }, {}, $__super);
}(ErrorReporter);
Object.defineProperties(module.exports, {
  MultipleErrors: {get: function() {
      return MultipleErrors;
    }},
  CollectingErrorReporter: {get: function() {
      return CollectingErrorReporter;
    }},
  __esModule: {value: true}
});
