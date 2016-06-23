"use strict";
var ANNOTATION = 'ANNOTATION';
var ANON_BLOCK = 'ANON_BLOCK';
var ARGUMENT_LIST = 'ARGUMENT_LIST';
var ARRAY_COMPREHENSION = 'ARRAY_COMPREHENSION';
var ARRAY_LITERAL = 'ARRAY_LITERAL';
var ARRAY_PATTERN = 'ARRAY_PATTERN';
var ARRAY_TYPE = 'ARRAY_TYPE';
var ARROW_FUNCTION = 'ARROW_FUNCTION';
var ASSIGNMENT_ELEMENT = 'ASSIGNMENT_ELEMENT';
var AWAIT_EXPRESSION = 'AWAIT_EXPRESSION';
var BINARY_EXPRESSION = 'BINARY_EXPRESSION';
var BINDING_ELEMENT = 'BINDING_ELEMENT';
var BINDING_IDENTIFIER = 'BINDING_IDENTIFIER';
var BLOCK = 'BLOCK';
var BREAK_STATEMENT = 'BREAK_STATEMENT';
var CALL_EXPRESSION = 'CALL_EXPRESSION';
var CALL_SIGNATURE = 'CALL_SIGNATURE';
var CASE_CLAUSE = 'CASE_CLAUSE';
var CATCH = 'CATCH';
var CLASS_DECLARATION = 'CLASS_DECLARATION';
var CLASS_EXPRESSION = 'CLASS_EXPRESSION';
var COMMA_EXPRESSION = 'COMMA_EXPRESSION';
var COMPREHENSION_FOR = 'COMPREHENSION_FOR';
var COMPREHENSION_IF = 'COMPREHENSION_IF';
var COMPUTED_PROPERTY_NAME = 'COMPUTED_PROPERTY_NAME';
var CONDITIONAL_EXPRESSION = 'CONDITIONAL_EXPRESSION';
var CONSTRUCT_SIGNATURE = 'CONSTRUCT_SIGNATURE';
var CONSTRUCTOR_TYPE = 'CONSTRUCTOR_TYPE';
var CONTINUE_STATEMENT = 'CONTINUE_STATEMENT';
var COVER_FORMALS = 'COVER_FORMALS';
var COVER_INITIALIZED_NAME = 'COVER_INITIALIZED_NAME';
var DEBUGGER_STATEMENT = 'DEBUGGER_STATEMENT';
var DEFAULT_CLAUSE = 'DEFAULT_CLAUSE';
var DO_WHILE_STATEMENT = 'DO_WHILE_STATEMENT';
var EMPTY_STATEMENT = 'EMPTY_STATEMENT';
var EXPORT_DECLARATION = 'EXPORT_DECLARATION';
var EXPORT_DEFAULT = 'EXPORT_DEFAULT';
var EXPORT_SPECIFIER = 'EXPORT_SPECIFIER';
var EXPORT_SPECIFIER_SET = 'EXPORT_SPECIFIER_SET';
var EXPORT_STAR = 'EXPORT_STAR';
var EXPRESSION_STATEMENT = 'EXPRESSION_STATEMENT';
var FINALLY = 'FINALLY';
var FOR_IN_STATEMENT = 'FOR_IN_STATEMENT';
var FOR_OF_STATEMENT = 'FOR_OF_STATEMENT';
var FOR_ON_STATEMENT = 'FOR_ON_STATEMENT';
var FOR_STATEMENT = 'FOR_STATEMENT';
var FORMAL_PARAMETER = 'FORMAL_PARAMETER';
var FORMAL_PARAMETER_LIST = 'FORMAL_PARAMETER_LIST';
var FORWARD_DEFAULT_EXPORT = 'FORWARD_DEFAULT_EXPORT';
var FUNCTION_BODY = 'FUNCTION_BODY';
var FUNCTION_DECLARATION = 'FUNCTION_DECLARATION';
var FUNCTION_EXPRESSION = 'FUNCTION_EXPRESSION';
var FUNCTION_TYPE = 'FUNCTION_TYPE';
var GENERATOR_COMPREHENSION = 'GENERATOR_COMPREHENSION';
var GET_ACCESSOR = 'GET_ACCESSOR';
var IDENTIFIER_EXPRESSION = 'IDENTIFIER_EXPRESSION';
var IF_STATEMENT = 'IF_STATEMENT';
var IMPORT_CLAUSE_PAIR = 'IMPORT_CLAUSE_PAIR';
var IMPORT_DECLARATION = 'IMPORT_DECLARATION';
var IMPORT_SPECIFIER = 'IMPORT_SPECIFIER';
var IMPORT_SPECIFIER_SET = 'IMPORT_SPECIFIER_SET';
var IMPORT_TYPE_CLAUSE = 'IMPORT_TYPE_CLAUSE';
var IMPORTED_BINDING = 'IMPORTED_BINDING';
var INDEX_SIGNATURE = 'INDEX_SIGNATURE';
var INTERFACE_DECLARATION = 'INTERFACE_DECLARATION';
var JSX_ATTRIBUTE = 'JSX_ATTRIBUTE';
var JSX_ELEMENT = 'JSX_ELEMENT';
var JSX_ELEMENT_NAME = 'JSX_ELEMENT_NAME';
var JSX_PLACEHOLDER = 'JSX_PLACEHOLDER';
var JSX_SPREAD_ATTRIBUTE = 'JSX_SPREAD_ATTRIBUTE';
var JSX_TEXT = 'JSX_TEXT';
var LABELLED_STATEMENT = 'LABELLED_STATEMENT';
var LITERAL_EXPRESSION = 'LITERAL_EXPRESSION';
var LITERAL_PROPERTY_NAME = 'LITERAL_PROPERTY_NAME';
var MEMBER_EXPRESSION = 'MEMBER_EXPRESSION';
var MEMBER_LOOKUP_EXPRESSION = 'MEMBER_LOOKUP_EXPRESSION';
var METHOD = 'METHOD';
var METHOD_SIGNATURE = 'METHOD_SIGNATURE';
var MODULE = 'MODULE';
var MODULE_SPECIFIER = 'MODULE_SPECIFIER';
var NAME_SPACE_EXPORT = 'NAME_SPACE_EXPORT';
var NAME_SPACE_IMPORT = 'NAME_SPACE_IMPORT';
var NAMED_EXPORT = 'NAMED_EXPORT';
var NEW_EXPRESSION = 'NEW_EXPRESSION';
var OBJECT_LITERAL = 'OBJECT_LITERAL';
var OBJECT_PATTERN = 'OBJECT_PATTERN';
var OBJECT_PATTERN_FIELD = 'OBJECT_PATTERN_FIELD';
var OBJECT_TYPE = 'OBJECT_TYPE';
var PAREN_EXPRESSION = 'PAREN_EXPRESSION';
var POSTFIX_EXPRESSION = 'POSTFIX_EXPRESSION';
var PREDEFINED_TYPE = 'PREDEFINED_TYPE';
var PROPERTY_NAME_ASSIGNMENT = 'PROPERTY_NAME_ASSIGNMENT';
var PROPERTY_NAME_SHORTHAND = 'PROPERTY_NAME_SHORTHAND';
var PROPERTY_SIGNATURE = 'PROPERTY_SIGNATURE';
var PROPERTY_VARIABLE_DECLARATION = 'PROPERTY_VARIABLE_DECLARATION';
var REST_PARAMETER = 'REST_PARAMETER';
var RETURN_STATEMENT = 'RETURN_STATEMENT';
var SCRIPT = 'SCRIPT';
var SET_ACCESSOR = 'SET_ACCESSOR';
var SPREAD_EXPRESSION = 'SPREAD_EXPRESSION';
var SPREAD_PATTERN_ELEMENT = 'SPREAD_PATTERN_ELEMENT';
var STATE_MACHINE = 'STATE_MACHINE';
var SUPER_EXPRESSION = 'SUPER_EXPRESSION';
var SWITCH_STATEMENT = 'SWITCH_STATEMENT';
var SYNTAX_ERROR_TREE = 'SYNTAX_ERROR_TREE';
var TEMPLATE_LITERAL_EXPRESSION = 'TEMPLATE_LITERAL_EXPRESSION';
var TEMPLATE_LITERAL_PORTION = 'TEMPLATE_LITERAL_PORTION';
var TEMPLATE_SUBSTITUTION = 'TEMPLATE_SUBSTITUTION';
var THIS_EXPRESSION = 'THIS_EXPRESSION';
var THROW_STATEMENT = 'THROW_STATEMENT';
var TRY_STATEMENT = 'TRY_STATEMENT';
var TYPE_ALIAS_DECLARATION = 'TYPE_ALIAS_DECLARATION';
var TYPE_ARGUMENTS = 'TYPE_ARGUMENTS';
var TYPE_NAME = 'TYPE_NAME';
var TYPE_PARAMETER = 'TYPE_PARAMETER';
var TYPE_PARAMETERS = 'TYPE_PARAMETERS';
var TYPE_REFERENCE = 'TYPE_REFERENCE';
var UNARY_EXPRESSION = 'UNARY_EXPRESSION';
var UNION_TYPE = 'UNION_TYPE';
var VARIABLE_DECLARATION = 'VARIABLE_DECLARATION';
var VARIABLE_DECLARATION_LIST = 'VARIABLE_DECLARATION_LIST';
var VARIABLE_STATEMENT = 'VARIABLE_STATEMENT';
var WHILE_STATEMENT = 'WHILE_STATEMENT';
var WITH_STATEMENT = 'WITH_STATEMENT';
var YIELD_EXPRESSION = 'YIELD_EXPRESSION';
Object.defineProperties(module.exports, {
  ANNOTATION: {get: function() {
      return ANNOTATION;
    }},
  ANON_BLOCK: {get: function() {
      return ANON_BLOCK;
    }},
  ARGUMENT_LIST: {get: function() {
      return ARGUMENT_LIST;
    }},
  ARRAY_COMPREHENSION: {get: function() {
      return ARRAY_COMPREHENSION;
    }},
  ARRAY_LITERAL: {get: function() {
      return ARRAY_LITERAL;
    }},
  ARRAY_PATTERN: {get: function() {
      return ARRAY_PATTERN;
    }},
  ARRAY_TYPE: {get: function() {
      return ARRAY_TYPE;
    }},
  ARROW_FUNCTION: {get: function() {
      return ARROW_FUNCTION;
    }},
  ASSIGNMENT_ELEMENT: {get: function() {
      return ASSIGNMENT_ELEMENT;
    }},
  AWAIT_EXPRESSION: {get: function() {
      return AWAIT_EXPRESSION;
    }},
  BINARY_EXPRESSION: {get: function() {
      return BINARY_EXPRESSION;
    }},
  BINDING_ELEMENT: {get: function() {
      return BINDING_ELEMENT;
    }},
  BINDING_IDENTIFIER: {get: function() {
      return BINDING_IDENTIFIER;
    }},
  BLOCK: {get: function() {
      return BLOCK;
    }},
  BREAK_STATEMENT: {get: function() {
      return BREAK_STATEMENT;
    }},
  CALL_EXPRESSION: {get: function() {
      return CALL_EXPRESSION;
    }},
  CALL_SIGNATURE: {get: function() {
      return CALL_SIGNATURE;
    }},
  CASE_CLAUSE: {get: function() {
      return CASE_CLAUSE;
    }},
  CATCH: {get: function() {
      return CATCH;
    }},
  CLASS_DECLARATION: {get: function() {
      return CLASS_DECLARATION;
    }},
  CLASS_EXPRESSION: {get: function() {
      return CLASS_EXPRESSION;
    }},
  COMMA_EXPRESSION: {get: function() {
      return COMMA_EXPRESSION;
    }},
  COMPREHENSION_FOR: {get: function() {
      return COMPREHENSION_FOR;
    }},
  COMPREHENSION_IF: {get: function() {
      return COMPREHENSION_IF;
    }},
  COMPUTED_PROPERTY_NAME: {get: function() {
      return COMPUTED_PROPERTY_NAME;
    }},
  CONDITIONAL_EXPRESSION: {get: function() {
      return CONDITIONAL_EXPRESSION;
    }},
  CONSTRUCT_SIGNATURE: {get: function() {
      return CONSTRUCT_SIGNATURE;
    }},
  CONSTRUCTOR_TYPE: {get: function() {
      return CONSTRUCTOR_TYPE;
    }},
  CONTINUE_STATEMENT: {get: function() {
      return CONTINUE_STATEMENT;
    }},
  COVER_FORMALS: {get: function() {
      return COVER_FORMALS;
    }},
  COVER_INITIALIZED_NAME: {get: function() {
      return COVER_INITIALIZED_NAME;
    }},
  DEBUGGER_STATEMENT: {get: function() {
      return DEBUGGER_STATEMENT;
    }},
  DEFAULT_CLAUSE: {get: function() {
      return DEFAULT_CLAUSE;
    }},
  DO_WHILE_STATEMENT: {get: function() {
      return DO_WHILE_STATEMENT;
    }},
  EMPTY_STATEMENT: {get: function() {
      return EMPTY_STATEMENT;
    }},
  EXPORT_DECLARATION: {get: function() {
      return EXPORT_DECLARATION;
    }},
  EXPORT_DEFAULT: {get: function() {
      return EXPORT_DEFAULT;
    }},
  EXPORT_SPECIFIER: {get: function() {
      return EXPORT_SPECIFIER;
    }},
  EXPORT_SPECIFIER_SET: {get: function() {
      return EXPORT_SPECIFIER_SET;
    }},
  EXPORT_STAR: {get: function() {
      return EXPORT_STAR;
    }},
  EXPRESSION_STATEMENT: {get: function() {
      return EXPRESSION_STATEMENT;
    }},
  FINALLY: {get: function() {
      return FINALLY;
    }},
  FOR_IN_STATEMENT: {get: function() {
      return FOR_IN_STATEMENT;
    }},
  FOR_OF_STATEMENT: {get: function() {
      return FOR_OF_STATEMENT;
    }},
  FOR_ON_STATEMENT: {get: function() {
      return FOR_ON_STATEMENT;
    }},
  FOR_STATEMENT: {get: function() {
      return FOR_STATEMENT;
    }},
  FORMAL_PARAMETER: {get: function() {
      return FORMAL_PARAMETER;
    }},
  FORMAL_PARAMETER_LIST: {get: function() {
      return FORMAL_PARAMETER_LIST;
    }},
  FORWARD_DEFAULT_EXPORT: {get: function() {
      return FORWARD_DEFAULT_EXPORT;
    }},
  FUNCTION_BODY: {get: function() {
      return FUNCTION_BODY;
    }},
  FUNCTION_DECLARATION: {get: function() {
      return FUNCTION_DECLARATION;
    }},
  FUNCTION_EXPRESSION: {get: function() {
      return FUNCTION_EXPRESSION;
    }},
  FUNCTION_TYPE: {get: function() {
      return FUNCTION_TYPE;
    }},
  GENERATOR_COMPREHENSION: {get: function() {
      return GENERATOR_COMPREHENSION;
    }},
  GET_ACCESSOR: {get: function() {
      return GET_ACCESSOR;
    }},
  IDENTIFIER_EXPRESSION: {get: function() {
      return IDENTIFIER_EXPRESSION;
    }},
  IF_STATEMENT: {get: function() {
      return IF_STATEMENT;
    }},
  IMPORT_CLAUSE_PAIR: {get: function() {
      return IMPORT_CLAUSE_PAIR;
    }},
  IMPORT_DECLARATION: {get: function() {
      return IMPORT_DECLARATION;
    }},
  IMPORT_SPECIFIER: {get: function() {
      return IMPORT_SPECIFIER;
    }},
  IMPORT_SPECIFIER_SET: {get: function() {
      return IMPORT_SPECIFIER_SET;
    }},
  IMPORT_TYPE_CLAUSE: {get: function() {
      return IMPORT_TYPE_CLAUSE;
    }},
  IMPORTED_BINDING: {get: function() {
      return IMPORTED_BINDING;
    }},
  INDEX_SIGNATURE: {get: function() {
      return INDEX_SIGNATURE;
    }},
  INTERFACE_DECLARATION: {get: function() {
      return INTERFACE_DECLARATION;
    }},
  JSX_ATTRIBUTE: {get: function() {
      return JSX_ATTRIBUTE;
    }},
  JSX_ELEMENT: {get: function() {
      return JSX_ELEMENT;
    }},
  JSX_ELEMENT_NAME: {get: function() {
      return JSX_ELEMENT_NAME;
    }},
  JSX_PLACEHOLDER: {get: function() {
      return JSX_PLACEHOLDER;
    }},
  JSX_SPREAD_ATTRIBUTE: {get: function() {
      return JSX_SPREAD_ATTRIBUTE;
    }},
  JSX_TEXT: {get: function() {
      return JSX_TEXT;
    }},
  LABELLED_STATEMENT: {get: function() {
      return LABELLED_STATEMENT;
    }},
  LITERAL_EXPRESSION: {get: function() {
      return LITERAL_EXPRESSION;
    }},
  LITERAL_PROPERTY_NAME: {get: function() {
      return LITERAL_PROPERTY_NAME;
    }},
  MEMBER_EXPRESSION: {get: function() {
      return MEMBER_EXPRESSION;
    }},
  MEMBER_LOOKUP_EXPRESSION: {get: function() {
      return MEMBER_LOOKUP_EXPRESSION;
    }},
  METHOD: {get: function() {
      return METHOD;
    }},
  METHOD_SIGNATURE: {get: function() {
      return METHOD_SIGNATURE;
    }},
  MODULE: {get: function() {
      return MODULE;
    }},
  MODULE_SPECIFIER: {get: function() {
      return MODULE_SPECIFIER;
    }},
  NAME_SPACE_EXPORT: {get: function() {
      return NAME_SPACE_EXPORT;
    }},
  NAME_SPACE_IMPORT: {get: function() {
      return NAME_SPACE_IMPORT;
    }},
  NAMED_EXPORT: {get: function() {
      return NAMED_EXPORT;
    }},
  NEW_EXPRESSION: {get: function() {
      return NEW_EXPRESSION;
    }},
  OBJECT_LITERAL: {get: function() {
      return OBJECT_LITERAL;
    }},
  OBJECT_PATTERN: {get: function() {
      return OBJECT_PATTERN;
    }},
  OBJECT_PATTERN_FIELD: {get: function() {
      return OBJECT_PATTERN_FIELD;
    }},
  OBJECT_TYPE: {get: function() {
      return OBJECT_TYPE;
    }},
  PAREN_EXPRESSION: {get: function() {
      return PAREN_EXPRESSION;
    }},
  POSTFIX_EXPRESSION: {get: function() {
      return POSTFIX_EXPRESSION;
    }},
  PREDEFINED_TYPE: {get: function() {
      return PREDEFINED_TYPE;
    }},
  PROPERTY_NAME_ASSIGNMENT: {get: function() {
      return PROPERTY_NAME_ASSIGNMENT;
    }},
  PROPERTY_NAME_SHORTHAND: {get: function() {
      return PROPERTY_NAME_SHORTHAND;
    }},
  PROPERTY_SIGNATURE: {get: function() {
      return PROPERTY_SIGNATURE;
    }},
  PROPERTY_VARIABLE_DECLARATION: {get: function() {
      return PROPERTY_VARIABLE_DECLARATION;
    }},
  REST_PARAMETER: {get: function() {
      return REST_PARAMETER;
    }},
  RETURN_STATEMENT: {get: function() {
      return RETURN_STATEMENT;
    }},
  SCRIPT: {get: function() {
      return SCRIPT;
    }},
  SET_ACCESSOR: {get: function() {
      return SET_ACCESSOR;
    }},
  SPREAD_EXPRESSION: {get: function() {
      return SPREAD_EXPRESSION;
    }},
  SPREAD_PATTERN_ELEMENT: {get: function() {
      return SPREAD_PATTERN_ELEMENT;
    }},
  STATE_MACHINE: {get: function() {
      return STATE_MACHINE;
    }},
  SUPER_EXPRESSION: {get: function() {
      return SUPER_EXPRESSION;
    }},
  SWITCH_STATEMENT: {get: function() {
      return SWITCH_STATEMENT;
    }},
  SYNTAX_ERROR_TREE: {get: function() {
      return SYNTAX_ERROR_TREE;
    }},
  TEMPLATE_LITERAL_EXPRESSION: {get: function() {
      return TEMPLATE_LITERAL_EXPRESSION;
    }},
  TEMPLATE_LITERAL_PORTION: {get: function() {
      return TEMPLATE_LITERAL_PORTION;
    }},
  TEMPLATE_SUBSTITUTION: {get: function() {
      return TEMPLATE_SUBSTITUTION;
    }},
  THIS_EXPRESSION: {get: function() {
      return THIS_EXPRESSION;
    }},
  THROW_STATEMENT: {get: function() {
      return THROW_STATEMENT;
    }},
  TRY_STATEMENT: {get: function() {
      return TRY_STATEMENT;
    }},
  TYPE_ALIAS_DECLARATION: {get: function() {
      return TYPE_ALIAS_DECLARATION;
    }},
  TYPE_ARGUMENTS: {get: function() {
      return TYPE_ARGUMENTS;
    }},
  TYPE_NAME: {get: function() {
      return TYPE_NAME;
    }},
  TYPE_PARAMETER: {get: function() {
      return TYPE_PARAMETER;
    }},
  TYPE_PARAMETERS: {get: function() {
      return TYPE_PARAMETERS;
    }},
  TYPE_REFERENCE: {get: function() {
      return TYPE_REFERENCE;
    }},
  UNARY_EXPRESSION: {get: function() {
      return UNARY_EXPRESSION;
    }},
  UNION_TYPE: {get: function() {
      return UNION_TYPE;
    }},
  VARIABLE_DECLARATION: {get: function() {
      return VARIABLE_DECLARATION;
    }},
  VARIABLE_DECLARATION_LIST: {get: function() {
      return VARIABLE_DECLARATION_LIST;
    }},
  VARIABLE_STATEMENT: {get: function() {
      return VARIABLE_STATEMENT;
    }},
  WHILE_STATEMENT: {get: function() {
      return WHILE_STATEMENT;
    }},
  WITH_STATEMENT: {get: function() {
      return WITH_STATEMENT;
    }},
  YIELD_EXPRESSION: {get: function() {
      return YIELD_EXPRESSION;
    }},
  __esModule: {value: true}
});
