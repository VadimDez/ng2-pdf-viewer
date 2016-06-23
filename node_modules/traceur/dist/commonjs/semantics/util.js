"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    IDENTIFIER_EXPRESSION = $__0.IDENTIFIER_EXPRESSION,
    LITERAL_EXPRESSION = $__0.LITERAL_EXPRESSION,
    PAREN_EXPRESSION = $__0.PAREN_EXPRESSION,
    UNARY_EXPRESSION = $__0.UNARY_EXPRESSION;
var UNDEFINED = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}).UNDEFINED;
var VOID = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VOID;
function hasUseStrict(list) {
  for (var i = 0; i < list.length; i++) {
    if (!list[i].isDirectivePrologue())
      return false;
    if (list[i].isUseStrictDirective())
      return true;
  }
  return false;
}
function isUndefined(tree) {
  if (tree.type === PAREN_EXPRESSION)
    return isUndefined(tree.expression);
  return tree.type === IDENTIFIER_EXPRESSION && tree.identifierToken.value === UNDEFINED;
}
function isVoidExpression(tree) {
  if (tree.type === PAREN_EXPRESSION)
    return isVoidExpression(tree.expression);
  return tree.type === UNARY_EXPRESSION && tree.operator.type === VOID && isLiteralExpression(tree.operand);
}
function isLiteralExpression(tree) {
  if (tree.type === PAREN_EXPRESSION)
    return isLiteralExpression(tree.expression);
  return tree.type === LITERAL_EXPRESSION;
}
Object.defineProperties(module.exports, {
  hasUseStrict: {get: function() {
      return hasUseStrict;
    }},
  isUndefined: {get: function() {
      return isUndefined;
    }},
  isVoidExpression: {get: function() {
      return isVoidExpression;
    }},
  isLiteralExpression: {get: function() {
      return isLiteralExpression;
    }},
  __esModule: {value: true}
});
