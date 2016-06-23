"use strict";
var $___46__46__47_syntax_47_ParseTreeVisitor_46_js__,
    $___46__46__47_util_47_StringSet_46_js__,
    $___46__46__47_syntax_47_Keywords_46_js__;
var ParseTreeVisitor = ($___46__46__47_syntax_47_ParseTreeVisitor_46_js__ = require("../syntax/ParseTreeVisitor.js"), $___46__46__47_syntax_47_ParseTreeVisitor_46_js__ && $___46__46__47_syntax_47_ParseTreeVisitor_46_js__.__esModule && $___46__46__47_syntax_47_ParseTreeVisitor_46_js__ || {default: $___46__46__47_syntax_47_ParseTreeVisitor_46_js__}).ParseTreeVisitor;
var StringSet = ($___46__46__47_util_47_StringSet_46_js__ = require("../util/StringSet.js"), $___46__46__47_util_47_StringSet_46_js__ && $___46__46__47_util_47_StringSet_46_js__.__esModule && $___46__46__47_util_47_StringSet_46_js__ || {default: $___46__46__47_util_47_StringSet_46_js__}).StringSet;
var isStrictKeyword = ($___46__46__47_syntax_47_Keywords_46_js__ = require("../syntax/Keywords.js"), $___46__46__47_syntax_47_Keywords_46_js__ && $___46__46__47_syntax_47_Keywords_46_js__.__esModule && $___46__46__47_syntax_47_Keywords_46_js__ || {default: $___46__46__47_syntax_47_Keywords_46_js__}).isStrictKeyword;
var ParameterValidationVisitor = function($__super) {
  function ParameterValidationVisitor(isStrict, reporter) {
    $traceurRuntime.superConstructor(ParameterValidationVisitor).call(this);
    this.reporter_ = reporter;
    this.names_ = new StringSet();
    this.errors_ = [];
    this.reportStrictKeywords_ = isStrict;
    this.reportDuplicates_ = isStrict;
  }
  return ($traceurRuntime.createClass)(ParameterValidationVisitor, {
    visitBindingIdentifier: function(tree) {
      var name = tree.identifierToken.toString();
      if (this.reportStrictKeywords_ && (isStrictKeyword(name) || name === 'eval' || name === 'arguments')) {
        this.reporter_.reportError(tree.location, (name + " is a reserved identifier"));
      }
      if (this.names_.has(name)) {
        this.maybeReportDuplicateError_(name, tree.location);
      }
      this.names_.add(name);
    },
    visitBindingElement: function(tree) {
      if (tree.initializer !== null) {
        this.reportEarlierErrors_();
      }
      this.visitAny(tree.binding);
    },
    visitRestParameter: function(tree) {
      this.reportEarlierErrors_();
      this.visitAny(tree.identifier);
    },
    visitFormalParameter: function(tree) {
      this.visitAny(tree.parameter);
    },
    visitArrayPattern: function(tree) {
      this.reportEarlierErrors_();
      $traceurRuntime.superGet(this, ParameterValidationVisitor.prototype, "visitArrayPattern").call(this, tree);
    },
    visitObjectPattern: function(tree) {
      this.reportEarlierErrors_();
      $traceurRuntime.superGet(this, ParameterValidationVisitor.prototype, "visitObjectPattern").call(this, tree);
    },
    reportDuplicateError_: function(name, location) {
      this.reporter_.reportError(location, ("Duplicate parameter name " + name));
    },
    maybeReportDuplicateError_: function(name, location) {
      if (this.reportDuplicates_) {
        this.reportDuplicateError_(name, location);
      } else {
        this.errors_.push(name, location);
      }
    },
    reportEarlierErrors_: function() {
      if (!this.reportDuplicates_) {
        this.reportDuplicates_ = true;
        for (var i = 0; i < this.errors_.length; i += 2) {
          var name = this.errors_[i];
          var location = this.errors_[i + 1];
          this.reportDuplicateError_(name, location);
        }
      }
    }
  }, {}, $__super);
}(ParseTreeVisitor);
var $__default = function(tree, isStrict, reporter) {
  new ParameterValidationVisitor(isStrict, reporter).visitAny(tree);
};
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
