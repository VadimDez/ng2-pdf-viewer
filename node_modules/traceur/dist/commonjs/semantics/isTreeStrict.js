"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__util_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    ARROW_FUNCTION = $__0.ARROW_FUNCTION,
    CLASS_DECLARATION = $__0.CLASS_DECLARATION,
    CLASS_EXPRESSION = $__0.CLASS_EXPRESSION,
    FUNCTION_BODY = $__0.FUNCTION_BODY,
    FUNCTION_DECLARATION = $__0.FUNCTION_DECLARATION,
    FUNCTION_EXPRESSION = $__0.FUNCTION_EXPRESSION,
    GET_ACCESSOR = $__0.GET_ACCESSOR,
    METHOD = $__0.METHOD,
    MODULE = $__0.MODULE,
    SCRIPT = $__0.SCRIPT,
    SET_ACCESSOR = $__0.SET_ACCESSOR;
var hasUseStrict = ($__util_46_js__ = require("./util.js"), $__util_46_js__ && $__util_46_js__.__esModule && $__util_46_js__ || {default: $__util_46_js__}).hasUseStrict;
function isTreeStrict(tree) {
  switch (tree.type) {
    case CLASS_DECLARATION:
    case CLASS_EXPRESSION:
    case MODULE:
      return true;
    case FUNCTION_BODY:
      return hasUseStrict(tree.statements);
    case FUNCTION_EXPRESSION:
    case FUNCTION_DECLARATION:
    case METHOD:
      return isTreeStrict(tree.body);
    case ARROW_FUNCTION:
      if (tree.body.type === FUNCTION_BODY) {
        return isTreeStrict(tree.body);
      }
      return false;
    case GET_ACCESSOR:
    case SET_ACCESSOR:
      return isTreeStrict(tree.body);
    case SCRIPT:
      return hasUseStrict(tree.scriptItemList);
    default:
      return false;
  }
}
Object.defineProperties(module.exports, {
  isTreeStrict: {get: function() {
      return isTreeStrict;
    }},
  __esModule: {value: true}
});
