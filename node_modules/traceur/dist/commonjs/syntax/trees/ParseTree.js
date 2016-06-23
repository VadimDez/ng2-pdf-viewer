"use strict";
var $__ParseTreeType_46_js__,
    $___46__46__47_TokenType_46_js__,
    $___46__46__47_Token_46_js__,
    $___46__46__47__46__46__47_util_47_JSON_46_js__,
    $___46__46__47_PredefinedName_46_js__,
    $__ParseTreeType_46_js__;
var ParseTreeType = ($__ParseTreeType_46_js__ = require("./ParseTreeType.js"), $__ParseTreeType_46_js__ && $__ParseTreeType_46_js__.__esModule && $__ParseTreeType_46_js__ || {default: $__ParseTreeType_46_js__});
var $__0 = ($___46__46__47_TokenType_46_js__ = require("../TokenType.js"), $___46__46__47_TokenType_46_js__ && $___46__46__47_TokenType_46_js__.__esModule && $___46__46__47_TokenType_46_js__ || {default: $___46__46__47_TokenType_46_js__}),
    IDENTIFIER = $__0.IDENTIFIER,
    STAR = $__0.STAR,
    STRING = $__0.STRING,
    VAR = $__0.VAR;
var Token = ($___46__46__47_Token_46_js__ = require("../Token.js"), $___46__46__47_Token_46_js__ && $___46__46__47_Token_46_js__.__esModule && $___46__46__47_Token_46_js__ || {default: $___46__46__47_Token_46_js__}).Token;
var utilJSON = ($___46__46__47__46__46__47_util_47_JSON_46_js__ = require("../../util/JSON.js"), $___46__46__47__46__46__47_util_47_JSON_46_js__ && $___46__46__47__46__46__47_util_47_JSON_46_js__.__esModule && $___46__46__47__46__46__47_util_47_JSON_46_js__ || {default: $___46__46__47__46__46__47_util_47_JSON_46_js__});
var $__2 = ($___46__46__47_PredefinedName_46_js__ = require("../PredefinedName.js"), $___46__46__47_PredefinedName_46_js__ && $___46__46__47_PredefinedName_46_js__.__esModule && $___46__46__47_PredefinedName_46_js__ || {default: $___46__46__47_PredefinedName_46_js__}),
    ASYNC = $__2.ASYNC,
    ASYNC_STAR = $__2.ASYNC_STAR;
var $__3 = ($__ParseTreeType_46_js__ = require("./ParseTreeType.js"), $__ParseTreeType_46_js__ && $__ParseTreeType_46_js__.__esModule && $__ParseTreeType_46_js__ || {default: $__ParseTreeType_46_js__}),
    ARRAY_COMPREHENSION = $__3.ARRAY_COMPREHENSION,
    ARRAY_LITERAL = $__3.ARRAY_LITERAL,
    ARRAY_PATTERN = $__3.ARRAY_PATTERN,
    ARROW_FUNCTION = $__3.ARROW_FUNCTION,
    AWAIT_EXPRESSION = $__3.AWAIT_EXPRESSION,
    BINARY_EXPRESSION = $__3.BINARY_EXPRESSION,
    BINDING_IDENTIFIER = $__3.BINDING_IDENTIFIER,
    BLOCK = $__3.BLOCK,
    BREAK_STATEMENT = $__3.BREAK_STATEMENT,
    CALL_EXPRESSION = $__3.CALL_EXPRESSION,
    CLASS_DECLARATION = $__3.CLASS_DECLARATION,
    CLASS_EXPRESSION = $__3.CLASS_EXPRESSION,
    COMMA_EXPRESSION = $__3.COMMA_EXPRESSION,
    CONDITIONAL_EXPRESSION = $__3.CONDITIONAL_EXPRESSION,
    CONSTRUCTOR_TYPE = $__3.CONSTRUCTOR_TYPE,
    CONTINUE_STATEMENT = $__3.CONTINUE_STATEMENT,
    DEBUGGER_STATEMENT = $__3.DEBUGGER_STATEMENT,
    DO_WHILE_STATEMENT = $__3.DO_WHILE_STATEMENT,
    EMPTY_STATEMENT = $__3.EMPTY_STATEMENT,
    EXPORT_DECLARATION = $__3.EXPORT_DECLARATION,
    EXPRESSION_STATEMENT = $__3.EXPRESSION_STATEMENT,
    FOR_IN_STATEMENT = $__3.FOR_IN_STATEMENT,
    FOR_OF_STATEMENT = $__3.FOR_OF_STATEMENT,
    FOR_ON_STATEMENT = $__3.FOR_ON_STATEMENT,
    FOR_STATEMENT = $__3.FOR_STATEMENT,
    FORMAL_PARAMETER = $__3.FORMAL_PARAMETER,
    FUNCTION_DECLARATION = $__3.FUNCTION_DECLARATION,
    FUNCTION_EXPRESSION = $__3.FUNCTION_EXPRESSION,
    FUNCTION_TYPE = $__3.FUNCTION_TYPE,
    GENERATOR_COMPREHENSION = $__3.GENERATOR_COMPREHENSION,
    IDENTIFIER_EXPRESSION = $__3.IDENTIFIER_EXPRESSION,
    IF_STATEMENT = $__3.IF_STATEMENT,
    IMPORT_DECLARATION = $__3.IMPORT_DECLARATION,
    IMPORTED_BINDING = $__3.IMPORTED_BINDING,
    INTERFACE_DECLARATION = $__3.INTERFACE_DECLARATION,
    JSX_ELEMENT = $__3.JSX_ELEMENT,
    LABELLED_STATEMENT = $__3.LABELLED_STATEMENT,
    LITERAL_EXPRESSION = $__3.LITERAL_EXPRESSION,
    LITERAL_PROPERTY_NAME = $__3.LITERAL_PROPERTY_NAME,
    MEMBER_EXPRESSION = $__3.MEMBER_EXPRESSION,
    MEMBER_LOOKUP_EXPRESSION = $__3.MEMBER_LOOKUP_EXPRESSION,
    NEW_EXPRESSION = $__3.NEW_EXPRESSION,
    OBJECT_LITERAL = $__3.OBJECT_LITERAL,
    OBJECT_PATTERN = $__3.OBJECT_PATTERN,
    OBJECT_TYPE = $__3.OBJECT_TYPE,
    PAREN_EXPRESSION = $__3.PAREN_EXPRESSION,
    POSTFIX_EXPRESSION = $__3.POSTFIX_EXPRESSION,
    PREDEFINED_TYPE = $__3.PREDEFINED_TYPE,
    PROPERTY_NAME_SHORTHAND = $__3.PROPERTY_NAME_SHORTHAND,
    REST_PARAMETER = $__3.REST_PARAMETER,
    RETURN_STATEMENT = $__3.RETURN_STATEMENT,
    SPREAD_EXPRESSION = $__3.SPREAD_EXPRESSION,
    SPREAD_PATTERN_ELEMENT = $__3.SPREAD_PATTERN_ELEMENT,
    SUPER_EXPRESSION = $__3.SUPER_EXPRESSION,
    SWITCH_STATEMENT = $__3.SWITCH_STATEMENT,
    TEMPLATE_LITERAL_EXPRESSION = $__3.TEMPLATE_LITERAL_EXPRESSION,
    THIS_EXPRESSION = $__3.THIS_EXPRESSION,
    THROW_STATEMENT = $__3.THROW_STATEMENT,
    TRY_STATEMENT = $__3.TRY_STATEMENT,
    TYPE_ALIAS_DECLARATION = $__3.TYPE_ALIAS_DECLARATION,
    TYPE_NAME = $__3.TYPE_NAME,
    TYPE_REFERENCE = $__3.TYPE_REFERENCE,
    UNARY_EXPRESSION = $__3.UNARY_EXPRESSION,
    VARIABLE_DECLARATION = $__3.VARIABLE_DECLARATION,
    VARIABLE_STATEMENT = $__3.VARIABLE_STATEMENT,
    WHILE_STATEMENT = $__3.WHILE_STATEMENT,
    WITH_STATEMENT = $__3.WITH_STATEMENT,
    YIELD_EXPRESSION = $__3.YIELD_EXPRESSION;
var ParseTree = function() {
  function ParseTree(location) {
    this.location = location;
  }
  return ($traceurRuntime.createClass)(ParseTree, {
    isPattern: function() {
      switch (this.type) {
        case ARRAY_PATTERN:
        case OBJECT_PATTERN:
          return true;
        default:
          return false;
      }
    },
    isLeftHandSideExpression: function() {
      switch (this.type) {
        case ARRAY_PATTERN:
        case IDENTIFIER_EXPRESSION:
        case MEMBER_EXPRESSION:
        case MEMBER_LOOKUP_EXPRESSION:
        case OBJECT_PATTERN:
          return true;
        case PAREN_EXPRESSION:
          return this.expression.isLeftHandSideExpression();
        default:
          return false;
      }
    },
    isAssignmentExpression: function() {
      switch (this.type) {
        case ARRAY_COMPREHENSION:
        case ARRAY_LITERAL:
        case ARROW_FUNCTION:
        case AWAIT_EXPRESSION:
        case BINARY_EXPRESSION:
        case CALL_EXPRESSION:
        case CLASS_EXPRESSION:
        case CONDITIONAL_EXPRESSION:
        case FUNCTION_EXPRESSION:
        case GENERATOR_COMPREHENSION:
        case IDENTIFIER_EXPRESSION:
        case JSX_ELEMENT:
        case LITERAL_EXPRESSION:
        case MEMBER_EXPRESSION:
        case MEMBER_LOOKUP_EXPRESSION:
        case NEW_EXPRESSION:
        case OBJECT_LITERAL:
        case PAREN_EXPRESSION:
        case POSTFIX_EXPRESSION:
        case TEMPLATE_LITERAL_EXPRESSION:
        case SUPER_EXPRESSION:
        case THIS_EXPRESSION:
        case UNARY_EXPRESSION:
        case YIELD_EXPRESSION:
          return true;
        default:
          return false;
      }
    },
    isMemberExpression: function() {
      switch (this.type) {
        case THIS_EXPRESSION:
        case CLASS_EXPRESSION:
        case SUPER_EXPRESSION:
        case IDENTIFIER_EXPRESSION:
        case JSX_ELEMENT:
        case LITERAL_EXPRESSION:
        case ARRAY_LITERAL:
        case OBJECT_LITERAL:
        case PAREN_EXPRESSION:
        case TEMPLATE_LITERAL_EXPRESSION:
        case FUNCTION_EXPRESSION:
        case MEMBER_LOOKUP_EXPRESSION:
        case MEMBER_EXPRESSION:
        case CALL_EXPRESSION:
          return true;
        case NEW_EXPRESSION:
          return this.args !== null;
      }
      return false;
    },
    isExpression: function() {
      return this.isAssignmentExpression() || this.type === COMMA_EXPRESSION;
    },
    isAssignmentOrSpread: function() {
      return this.isAssignmentExpression() || this.type === SPREAD_EXPRESSION;
    },
    isRestParameter: function() {
      return this.type === REST_PARAMETER || (this.type === FORMAL_PARAMETER && this.parameter.isRestParameter());
    },
    isSpreadPatternElement: function() {
      return this.type === SPREAD_PATTERN_ELEMENT;
    },
    isStatementListItem: function() {
      return this.isStatement() || this.isDeclaration() || this.type === TYPE_ALIAS_DECLARATION;
    },
    isStatement: function() {
      switch (this.type) {
        case BLOCK:
        case VARIABLE_STATEMENT:
        case EMPTY_STATEMENT:
        case EXPRESSION_STATEMENT:
        case IF_STATEMENT:
        case CONTINUE_STATEMENT:
        case BREAK_STATEMENT:
        case RETURN_STATEMENT:
        case WITH_STATEMENT:
        case LABELLED_STATEMENT:
        case THROW_STATEMENT:
        case TRY_STATEMENT:
        case DEBUGGER_STATEMENT:
          return true;
      }
      return this.isBreakableStatement();
    },
    isDeclaration: function() {
      switch (this.type) {
        case FUNCTION_DECLARATION:
        case CLASS_DECLARATION:
          return true;
      }
      return this.isLexicalDeclaration();
    },
    isLexicalDeclaration: function() {
      switch (this.type) {
        case VARIABLE_STATEMENT:
          return this.declarations.declarationType !== VAR;
      }
      return false;
    },
    isBreakableStatement: function() {
      switch (this.type) {
        case SWITCH_STATEMENT:
          return true;
      }
      return this.isIterationStatement();
    },
    isIterationStatement: function() {
      switch (this.type) {
        case DO_WHILE_STATEMENT:
        case FOR_IN_STATEMENT:
        case FOR_OF_STATEMENT:
        case FOR_ON_STATEMENT:
        case FOR_STATEMENT:
        case WHILE_STATEMENT:
          return true;
      }
      return false;
    },
    isScriptElement: function() {
      switch (this.type) {
        case CLASS_DECLARATION:
        case EXPORT_DECLARATION:
        case FUNCTION_DECLARATION:
        case IMPORT_DECLARATION:
        case INTERFACE_DECLARATION:
        case VARIABLE_DECLARATION:
        case TYPE_ALIAS_DECLARATION:
          return true;
      }
      return this.isStatement();
    },
    isGenerator: function() {
      return this.functionKind !== null && this.functionKind.type === STAR;
    },
    isAsyncFunction: function() {
      return this.functionKind !== null && this.functionKind.type === IDENTIFIER && this.functionKind.value === ASYNC;
    },
    isAsyncGenerator: function() {
      return this.functionKind !== null && this.functionKind.type === IDENTIFIER && this.functionKind.value === ASYNC_STAR;
    },
    isType: function() {
      switch (this.type) {
        case CONSTRUCTOR_TYPE:
        case FUNCTION_TYPE:
        case OBJECT_TYPE:
        case PREDEFINED_TYPE:
        case TYPE_NAME:
        case TYPE_REFERENCE:
          return true;
      }
      return false;
    },
    getDirectivePrologueStringToken_: function() {
      var tree = this;
      if (tree.type !== EXPRESSION_STATEMENT || !(tree = tree.expression))
        return null;
      if (tree.type !== LITERAL_EXPRESSION || !(tree = tree.literalToken))
        return null;
      if (tree.type !== STRING)
        return null;
      return tree;
    },
    isDirectivePrologue: function() {
      return this.getDirectivePrologueStringToken_() !== null;
    },
    isUseStrictDirective: function() {
      var token = this.getDirectivePrologueStringToken_();
      if (!token)
        return false;
      var v = token.value;
      return v === '"use strict"' || v === "'use strict'";
    },
    toJSON: function() {
      return utilJSON.transform(this, ParseTree.replacer);
    },
    stringify: function() {
      var indent = arguments[0] !== (void 0) ? arguments[0] : 2;
      return JSON.stringify(this, ParseTree.replacer, indent);
    },
    getStringValue: function() {
      switch (this.type) {
        case IDENTIFIER_EXPRESSION:
        case BINDING_IDENTIFIER:
          return this.identifierToken.toString();
        case IMPORTED_BINDING:
          return this.binding.getStringValue();
        case PROPERTY_NAME_SHORTHAND:
          return this.name.toString();
        case LITERAL_PROPERTY_NAME:
          return this.literalToken.toString();
      }
      throw new Error('Not yet implemented');
    }
  }, {
    stripLocation: function(key, value) {
      if (key === 'location') {
        return undefined;
      }
      return value;
    },
    replacer: function(k, v) {
      if (v instanceof ParseTree || v instanceof Token) {
        var rv = {type: v.type};
        Object.keys(v).forEach(function(name) {
          if (name !== 'location')
            rv[name] = v[name];
        });
        return rv;
      }
      return v;
    }
  });
}();
Object.defineProperties(module.exports, {
  ParseTreeType: {get: function() {
      return ParseTreeType;
    }},
  ParseTree: {get: function() {
      return ParseTree;
    }},
  __esModule: {value: true}
});
