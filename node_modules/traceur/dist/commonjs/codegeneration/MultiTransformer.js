"use strict";
var $___46__46__47_syntax_47_ParseTreeValidator_46_js__;
var ParseTreeValidator = ($___46__46__47_syntax_47_ParseTreeValidator_46_js__ = require("../syntax/ParseTreeValidator.js"), $___46__46__47_syntax_47_ParseTreeValidator_46_js__ && $___46__46__47_syntax_47_ParseTreeValidator_46_js__.__esModule && $___46__46__47_syntax_47_ParseTreeValidator_46_js__ || {default: $___46__46__47_syntax_47_ParseTreeValidator_46_js__}).ParseTreeValidator;
var MultiTransformer = function() {
  function MultiTransformer(reporter, validate) {
    this.reporter_ = reporter;
    this.validate_ = validate;
    this.treeTransformers_ = [];
  }
  return ($traceurRuntime.createClass)(MultiTransformer, {
    append: function(treeTransformer) {
      this.treeTransformers_.push(treeTransformer);
    },
    transform: function(tree) {
      var reporter = this.reporter_;
      var validate = this.validate_;
      this.treeTransformers_.every(function(transformTree) {
        tree = transformTree(tree);
        if (reporter.hadError())
          return false;
        if (validate)
          ParseTreeValidator.validate(tree);
        return true;
      });
      return tree;
    }
  }, {});
}();
Object.defineProperties(module.exports, {
  MultiTransformer: {get: function() {
      return MultiTransformer;
    }},
  __esModule: {value: true}
});
