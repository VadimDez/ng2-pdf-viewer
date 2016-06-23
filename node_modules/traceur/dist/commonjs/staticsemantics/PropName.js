"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    COMPUTED_PROPERTY_NAME = $__0.COMPUTED_PROPERTY_NAME,
    GET_ACCESSOR = $__0.GET_ACCESSOR,
    LITERAL_PROPERTY_NAME = $__0.LITERAL_PROPERTY_NAME,
    METHOD = $__0.METHOD,
    PROPERTY_NAME_ASSIGNMENT = $__0.PROPERTY_NAME_ASSIGNMENT,
    PROPERTY_NAME_SHORTHAND = $__0.PROPERTY_NAME_SHORTHAND,
    SET_ACCESSOR = $__0.SET_ACCESSOR;
var IDENTIFIER = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).IDENTIFIER;
function propName(tree) {
  switch (tree.type) {
    case LITERAL_PROPERTY_NAME:
      {
        var token = tree.literalToken;
        if (token.isKeyword() || token.type === IDENTIFIER)
          return token.toString();
        return String(tree.literalToken.processedValue);
      }
    case COMPUTED_PROPERTY_NAME:
      return '';
    case PROPERTY_NAME_SHORTHAND:
      return tree.name.toString();
    case METHOD:
    case PROPERTY_NAME_ASSIGNMENT:
    case GET_ACCESSOR:
    case SET_ACCESSOR:
      return propName(tree.name);
  }
}
Object.defineProperties(module.exports, {
  propName: {get: function() {
      return propName;
    }},
  __esModule: {value: true}
});
