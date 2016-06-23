"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    IDENTIFIER_EXPRESSION = $__0.IDENTIFIER_EXPRESSION,
    MEMBER_EXPRESSION = $__0.MEMBER_EXPRESSION,
    MEMBER_LOOKUP_EXPRESSION = $__0.MEMBER_LOOKUP_EXPRESSION,
    PAREN_EXPRESSION = $__0.PAREN_EXPRESSION;
function isValidSimpleAssignmentTarget(tree, isStrict) {
  switch (tree.type) {
    case IDENTIFIER_EXPRESSION:
      {
        if (!isStrict)
          return true;
        var value = tree.identifierToken.value;
        return value !== 'arguments' && value !== 'eval';
      }
    case PAREN_EXPRESSION:
      return isValidSimpleAssignmentTarget(tree.expression, isStrict);
    case MEMBER_EXPRESSION:
    case MEMBER_LOOKUP_EXPRESSION:
      return true;
    default:
      return false;
  }
}
var $__default = isValidSimpleAssignmentTarget;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
