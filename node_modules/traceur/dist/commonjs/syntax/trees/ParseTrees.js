"use strict";
var $__ParseTree_46_js__,
    $__ParseTreeType_46_js__;
var ParseTree = ($__ParseTree_46_js__ = require("./ParseTree.js"), $__ParseTree_46_js__ && $__ParseTree_46_js__.__esModule && $__ParseTree_46_js__ || {default: $__ParseTree_46_js__}).ParseTree;
var ParseTreeType = ($__ParseTreeType_46_js__ = require("./ParseTreeType.js"), $__ParseTreeType_46_js__ && $__ParseTreeType_46_js__.__esModule && $__ParseTreeType_46_js__ || {default: $__ParseTreeType_46_js__});
var ANNOTATION = ParseTreeType.ANNOTATION;
var Annotation = function($__super) {
  function Annotation(location, name, args) {
    $traceurRuntime.superConstructor(Annotation).call(this, location);
    this.name = name;
    this.args = args;
  }
  return ($traceurRuntime.createClass)(Annotation, {
    transform: function(transformer) {
      return transformer.transformAnnotation(this);
    },
    visit: function(visitor) {
      visitor.visitAnnotation(this);
    },
    get type() {
      return ANNOTATION;
    }
  }, {}, $__super);
}(ParseTree);
var ANON_BLOCK = ParseTreeType.ANON_BLOCK;
var AnonBlock = function($__super) {
  function AnonBlock(location, statements) {
    $traceurRuntime.superConstructor(AnonBlock).call(this, location);
    this.statements = statements;
  }
  return ($traceurRuntime.createClass)(AnonBlock, {
    transform: function(transformer) {
      return transformer.transformAnonBlock(this);
    },
    visit: function(visitor) {
      visitor.visitAnonBlock(this);
    },
    get type() {
      return ANON_BLOCK;
    }
  }, {}, $__super);
}(ParseTree);
var ARGUMENT_LIST = ParseTreeType.ARGUMENT_LIST;
var ArgumentList = function($__super) {
  function ArgumentList(location, args) {
    $traceurRuntime.superConstructor(ArgumentList).call(this, location);
    this.args = args;
  }
  return ($traceurRuntime.createClass)(ArgumentList, {
    transform: function(transformer) {
      return transformer.transformArgumentList(this);
    },
    visit: function(visitor) {
      visitor.visitArgumentList(this);
    },
    get type() {
      return ARGUMENT_LIST;
    }
  }, {}, $__super);
}(ParseTree);
var ARRAY_COMPREHENSION = ParseTreeType.ARRAY_COMPREHENSION;
var ArrayComprehension = function($__super) {
  function ArrayComprehension(location, comprehensionList, expression) {
    $traceurRuntime.superConstructor(ArrayComprehension).call(this, location);
    this.comprehensionList = comprehensionList;
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(ArrayComprehension, {
    transform: function(transformer) {
      return transformer.transformArrayComprehension(this);
    },
    visit: function(visitor) {
      visitor.visitArrayComprehension(this);
    },
    get type() {
      return ARRAY_COMPREHENSION;
    }
  }, {}, $__super);
}(ParseTree);
var ARRAY_LITERAL = ParseTreeType.ARRAY_LITERAL;
var ArrayLiteral = function($__super) {
  function ArrayLiteral(location, elements) {
    $traceurRuntime.superConstructor(ArrayLiteral).call(this, location);
    this.elements = elements;
  }
  return ($traceurRuntime.createClass)(ArrayLiteral, {
    transform: function(transformer) {
      return transformer.transformArrayLiteral(this);
    },
    visit: function(visitor) {
      visitor.visitArrayLiteral(this);
    },
    get type() {
      return ARRAY_LITERAL;
    }
  }, {}, $__super);
}(ParseTree);
var ARRAY_PATTERN = ParseTreeType.ARRAY_PATTERN;
var ArrayPattern = function($__super) {
  function ArrayPattern(location, elements) {
    $traceurRuntime.superConstructor(ArrayPattern).call(this, location);
    this.elements = elements;
  }
  return ($traceurRuntime.createClass)(ArrayPattern, {
    transform: function(transformer) {
      return transformer.transformArrayPattern(this);
    },
    visit: function(visitor) {
      visitor.visitArrayPattern(this);
    },
    get type() {
      return ARRAY_PATTERN;
    }
  }, {}, $__super);
}(ParseTree);
var ARRAY_TYPE = ParseTreeType.ARRAY_TYPE;
var ArrayType = function($__super) {
  function ArrayType(location, elementType) {
    $traceurRuntime.superConstructor(ArrayType).call(this, location);
    this.elementType = elementType;
  }
  return ($traceurRuntime.createClass)(ArrayType, {
    transform: function(transformer) {
      return transformer.transformArrayType(this);
    },
    visit: function(visitor) {
      visitor.visitArrayType(this);
    },
    get type() {
      return ARRAY_TYPE;
    }
  }, {}, $__super);
}(ParseTree);
var ARROW_FUNCTION = ParseTreeType.ARROW_FUNCTION;
var ArrowFunction = function($__super) {
  function ArrowFunction(location, functionKind, parameterList, body) {
    $traceurRuntime.superConstructor(ArrowFunction).call(this, location);
    this.functionKind = functionKind;
    this.parameterList = parameterList;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(ArrowFunction, {
    transform: function(transformer) {
      return transformer.transformArrowFunction(this);
    },
    visit: function(visitor) {
      visitor.visitArrowFunction(this);
    },
    get type() {
      return ARROW_FUNCTION;
    }
  }, {}, $__super);
}(ParseTree);
var ASSIGNMENT_ELEMENT = ParseTreeType.ASSIGNMENT_ELEMENT;
var AssignmentElement = function($__super) {
  function AssignmentElement(location, assignment, initializer) {
    $traceurRuntime.superConstructor(AssignmentElement).call(this, location);
    this.assignment = assignment;
    this.initializer = initializer;
  }
  return ($traceurRuntime.createClass)(AssignmentElement, {
    transform: function(transformer) {
      return transformer.transformAssignmentElement(this);
    },
    visit: function(visitor) {
      visitor.visitAssignmentElement(this);
    },
    get type() {
      return ASSIGNMENT_ELEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var AWAIT_EXPRESSION = ParseTreeType.AWAIT_EXPRESSION;
var AwaitExpression = function($__super) {
  function AwaitExpression(location, expression) {
    $traceurRuntime.superConstructor(AwaitExpression).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(AwaitExpression, {
    transform: function(transformer) {
      return transformer.transformAwaitExpression(this);
    },
    visit: function(visitor) {
      visitor.visitAwaitExpression(this);
    },
    get type() {
      return AWAIT_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var BINARY_EXPRESSION = ParseTreeType.BINARY_EXPRESSION;
var BinaryExpression = function($__super) {
  function BinaryExpression(location, left, operator, right) {
    $traceurRuntime.superConstructor(BinaryExpression).call(this, location);
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
  return ($traceurRuntime.createClass)(BinaryExpression, {
    transform: function(transformer) {
      return transformer.transformBinaryExpression(this);
    },
    visit: function(visitor) {
      visitor.visitBinaryExpression(this);
    },
    get type() {
      return BINARY_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var BINDING_ELEMENT = ParseTreeType.BINDING_ELEMENT;
var BindingElement = function($__super) {
  function BindingElement(location, binding, initializer) {
    $traceurRuntime.superConstructor(BindingElement).call(this, location);
    this.binding = binding;
    this.initializer = initializer;
  }
  return ($traceurRuntime.createClass)(BindingElement, {
    transform: function(transformer) {
      return transformer.transformBindingElement(this);
    },
    visit: function(visitor) {
      visitor.visitBindingElement(this);
    },
    get type() {
      return BINDING_ELEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var BINDING_IDENTIFIER = ParseTreeType.BINDING_IDENTIFIER;
var BindingIdentifier = function($__super) {
  function BindingIdentifier(location, identifierToken) {
    $traceurRuntime.superConstructor(BindingIdentifier).call(this, location);
    this.identifierToken = identifierToken;
  }
  return ($traceurRuntime.createClass)(BindingIdentifier, {
    transform: function(transformer) {
      return transformer.transformBindingIdentifier(this);
    },
    visit: function(visitor) {
      visitor.visitBindingIdentifier(this);
    },
    get type() {
      return BINDING_IDENTIFIER;
    }
  }, {}, $__super);
}(ParseTree);
var BLOCK = ParseTreeType.BLOCK;
var Block = function($__super) {
  function Block(location, statements) {
    $traceurRuntime.superConstructor(Block).call(this, location);
    this.statements = statements;
  }
  return ($traceurRuntime.createClass)(Block, {
    transform: function(transformer) {
      return transformer.transformBlock(this);
    },
    visit: function(visitor) {
      visitor.visitBlock(this);
    },
    get type() {
      return BLOCK;
    }
  }, {}, $__super);
}(ParseTree);
var BREAK_STATEMENT = ParseTreeType.BREAK_STATEMENT;
var BreakStatement = function($__super) {
  function BreakStatement(location, name) {
    $traceurRuntime.superConstructor(BreakStatement).call(this, location);
    this.name = name;
  }
  return ($traceurRuntime.createClass)(BreakStatement, {
    transform: function(transformer) {
      return transformer.transformBreakStatement(this);
    },
    visit: function(visitor) {
      visitor.visitBreakStatement(this);
    },
    get type() {
      return BREAK_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var CALL_EXPRESSION = ParseTreeType.CALL_EXPRESSION;
var CallExpression = function($__super) {
  function CallExpression(location, operand, args) {
    $traceurRuntime.superConstructor(CallExpression).call(this, location);
    this.operand = operand;
    this.args = args;
  }
  return ($traceurRuntime.createClass)(CallExpression, {
    transform: function(transformer) {
      return transformer.transformCallExpression(this);
    },
    visit: function(visitor) {
      visitor.visitCallExpression(this);
    },
    get type() {
      return CALL_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var CALL_SIGNATURE = ParseTreeType.CALL_SIGNATURE;
var CallSignature = function($__super) {
  function CallSignature(location, typeParameters, parameterList, returnType) {
    $traceurRuntime.superConstructor(CallSignature).call(this, location);
    this.typeParameters = typeParameters;
    this.parameterList = parameterList;
    this.returnType = returnType;
  }
  return ($traceurRuntime.createClass)(CallSignature, {
    transform: function(transformer) {
      return transformer.transformCallSignature(this);
    },
    visit: function(visitor) {
      visitor.visitCallSignature(this);
    },
    get type() {
      return CALL_SIGNATURE;
    }
  }, {}, $__super);
}(ParseTree);
var CASE_CLAUSE = ParseTreeType.CASE_CLAUSE;
var CaseClause = function($__super) {
  function CaseClause(location, expression, statements) {
    $traceurRuntime.superConstructor(CaseClause).call(this, location);
    this.expression = expression;
    this.statements = statements;
  }
  return ($traceurRuntime.createClass)(CaseClause, {
    transform: function(transformer) {
      return transformer.transformCaseClause(this);
    },
    visit: function(visitor) {
      visitor.visitCaseClause(this);
    },
    get type() {
      return CASE_CLAUSE;
    }
  }, {}, $__super);
}(ParseTree);
var CATCH = ParseTreeType.CATCH;
var Catch = function($__super) {
  function Catch(location, binding, catchBody) {
    $traceurRuntime.superConstructor(Catch).call(this, location);
    this.binding = binding;
    this.catchBody = catchBody;
  }
  return ($traceurRuntime.createClass)(Catch, {
    transform: function(transformer) {
      return transformer.transformCatch(this);
    },
    visit: function(visitor) {
      visitor.visitCatch(this);
    },
    get type() {
      return CATCH;
    }
  }, {}, $__super);
}(ParseTree);
var CLASS_DECLARATION = ParseTreeType.CLASS_DECLARATION;
var ClassDeclaration = function($__super) {
  function ClassDeclaration(location, name, superClass, elements, annotations, typeParameters) {
    $traceurRuntime.superConstructor(ClassDeclaration).call(this, location);
    this.name = name;
    this.superClass = superClass;
    this.elements = elements;
    this.annotations = annotations;
    this.typeParameters = typeParameters;
  }
  return ($traceurRuntime.createClass)(ClassDeclaration, {
    transform: function(transformer) {
      return transformer.transformClassDeclaration(this);
    },
    visit: function(visitor) {
      visitor.visitClassDeclaration(this);
    },
    get type() {
      return CLASS_DECLARATION;
    }
  }, {}, $__super);
}(ParseTree);
var CLASS_EXPRESSION = ParseTreeType.CLASS_EXPRESSION;
var ClassExpression = function($__super) {
  function ClassExpression(location, name, superClass, elements, annotations, typeParameters) {
    $traceurRuntime.superConstructor(ClassExpression).call(this, location);
    this.name = name;
    this.superClass = superClass;
    this.elements = elements;
    this.annotations = annotations;
    this.typeParameters = typeParameters;
  }
  return ($traceurRuntime.createClass)(ClassExpression, {
    transform: function(transformer) {
      return transformer.transformClassExpression(this);
    },
    visit: function(visitor) {
      visitor.visitClassExpression(this);
    },
    get type() {
      return CLASS_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var COMMA_EXPRESSION = ParseTreeType.COMMA_EXPRESSION;
var CommaExpression = function($__super) {
  function CommaExpression(location, expressions) {
    $traceurRuntime.superConstructor(CommaExpression).call(this, location);
    this.expressions = expressions;
  }
  return ($traceurRuntime.createClass)(CommaExpression, {
    transform: function(transformer) {
      return transformer.transformCommaExpression(this);
    },
    visit: function(visitor) {
      visitor.visitCommaExpression(this);
    },
    get type() {
      return COMMA_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var COMPREHENSION_FOR = ParseTreeType.COMPREHENSION_FOR;
var ComprehensionFor = function($__super) {
  function ComprehensionFor(location, left, iterator) {
    $traceurRuntime.superConstructor(ComprehensionFor).call(this, location);
    this.left = left;
    this.iterator = iterator;
  }
  return ($traceurRuntime.createClass)(ComprehensionFor, {
    transform: function(transformer) {
      return transformer.transformComprehensionFor(this);
    },
    visit: function(visitor) {
      visitor.visitComprehensionFor(this);
    },
    get type() {
      return COMPREHENSION_FOR;
    }
  }, {}, $__super);
}(ParseTree);
var COMPREHENSION_IF = ParseTreeType.COMPREHENSION_IF;
var ComprehensionIf = function($__super) {
  function ComprehensionIf(location, expression) {
    $traceurRuntime.superConstructor(ComprehensionIf).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(ComprehensionIf, {
    transform: function(transformer) {
      return transformer.transformComprehensionIf(this);
    },
    visit: function(visitor) {
      visitor.visitComprehensionIf(this);
    },
    get type() {
      return COMPREHENSION_IF;
    }
  }, {}, $__super);
}(ParseTree);
var COMPUTED_PROPERTY_NAME = ParseTreeType.COMPUTED_PROPERTY_NAME;
var ComputedPropertyName = function($__super) {
  function ComputedPropertyName(location, expression) {
    $traceurRuntime.superConstructor(ComputedPropertyName).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(ComputedPropertyName, {
    transform: function(transformer) {
      return transformer.transformComputedPropertyName(this);
    },
    visit: function(visitor) {
      visitor.visitComputedPropertyName(this);
    },
    get type() {
      return COMPUTED_PROPERTY_NAME;
    }
  }, {}, $__super);
}(ParseTree);
var CONDITIONAL_EXPRESSION = ParseTreeType.CONDITIONAL_EXPRESSION;
var ConditionalExpression = function($__super) {
  function ConditionalExpression(location, condition, left, right) {
    $traceurRuntime.superConstructor(ConditionalExpression).call(this, location);
    this.condition = condition;
    this.left = left;
    this.right = right;
  }
  return ($traceurRuntime.createClass)(ConditionalExpression, {
    transform: function(transformer) {
      return transformer.transformConditionalExpression(this);
    },
    visit: function(visitor) {
      visitor.visitConditionalExpression(this);
    },
    get type() {
      return CONDITIONAL_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var CONSTRUCT_SIGNATURE = ParseTreeType.CONSTRUCT_SIGNATURE;
var ConstructSignature = function($__super) {
  function ConstructSignature(location, typeParameters, parameterList, returnType) {
    $traceurRuntime.superConstructor(ConstructSignature).call(this, location);
    this.typeParameters = typeParameters;
    this.parameterList = parameterList;
    this.returnType = returnType;
  }
  return ($traceurRuntime.createClass)(ConstructSignature, {
    transform: function(transformer) {
      return transformer.transformConstructSignature(this);
    },
    visit: function(visitor) {
      visitor.visitConstructSignature(this);
    },
    get type() {
      return CONSTRUCT_SIGNATURE;
    }
  }, {}, $__super);
}(ParseTree);
var CONSTRUCTOR_TYPE = ParseTreeType.CONSTRUCTOR_TYPE;
var ConstructorType = function($__super) {
  function ConstructorType(location, typeParameters, parameterList, returnType) {
    $traceurRuntime.superConstructor(ConstructorType).call(this, location);
    this.typeParameters = typeParameters;
    this.parameterList = parameterList;
    this.returnType = returnType;
  }
  return ($traceurRuntime.createClass)(ConstructorType, {
    transform: function(transformer) {
      return transformer.transformConstructorType(this);
    },
    visit: function(visitor) {
      visitor.visitConstructorType(this);
    },
    get type() {
      return CONSTRUCTOR_TYPE;
    }
  }, {}, $__super);
}(ParseTree);
var CONTINUE_STATEMENT = ParseTreeType.CONTINUE_STATEMENT;
var ContinueStatement = function($__super) {
  function ContinueStatement(location, name) {
    $traceurRuntime.superConstructor(ContinueStatement).call(this, location);
    this.name = name;
  }
  return ($traceurRuntime.createClass)(ContinueStatement, {
    transform: function(transformer) {
      return transformer.transformContinueStatement(this);
    },
    visit: function(visitor) {
      visitor.visitContinueStatement(this);
    },
    get type() {
      return CONTINUE_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var COVER_FORMALS = ParseTreeType.COVER_FORMALS;
var CoverFormals = function($__super) {
  function CoverFormals(location, expressions) {
    $traceurRuntime.superConstructor(CoverFormals).call(this, location);
    this.expressions = expressions;
  }
  return ($traceurRuntime.createClass)(CoverFormals, {
    transform: function(transformer) {
      return transformer.transformCoverFormals(this);
    },
    visit: function(visitor) {
      visitor.visitCoverFormals(this);
    },
    get type() {
      return COVER_FORMALS;
    }
  }, {}, $__super);
}(ParseTree);
var COVER_INITIALIZED_NAME = ParseTreeType.COVER_INITIALIZED_NAME;
var CoverInitializedName = function($__super) {
  function CoverInitializedName(location, name, equalToken, initializer) {
    $traceurRuntime.superConstructor(CoverInitializedName).call(this, location);
    this.name = name;
    this.equalToken = equalToken;
    this.initializer = initializer;
  }
  return ($traceurRuntime.createClass)(CoverInitializedName, {
    transform: function(transformer) {
      return transformer.transformCoverInitializedName(this);
    },
    visit: function(visitor) {
      visitor.visitCoverInitializedName(this);
    },
    get type() {
      return COVER_INITIALIZED_NAME;
    }
  }, {}, $__super);
}(ParseTree);
var DEBUGGER_STATEMENT = ParseTreeType.DEBUGGER_STATEMENT;
var DebuggerStatement = function($__super) {
  function DebuggerStatement(location) {
    $traceurRuntime.superConstructor(DebuggerStatement).call(this, location);
  }
  return ($traceurRuntime.createClass)(DebuggerStatement, {
    transform: function(transformer) {
      return transformer.transformDebuggerStatement(this);
    },
    visit: function(visitor) {
      visitor.visitDebuggerStatement(this);
    },
    get type() {
      return DEBUGGER_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var DEFAULT_CLAUSE = ParseTreeType.DEFAULT_CLAUSE;
var DefaultClause = function($__super) {
  function DefaultClause(location, statements) {
    $traceurRuntime.superConstructor(DefaultClause).call(this, location);
    this.statements = statements;
  }
  return ($traceurRuntime.createClass)(DefaultClause, {
    transform: function(transformer) {
      return transformer.transformDefaultClause(this);
    },
    visit: function(visitor) {
      visitor.visitDefaultClause(this);
    },
    get type() {
      return DEFAULT_CLAUSE;
    }
  }, {}, $__super);
}(ParseTree);
var DO_WHILE_STATEMENT = ParseTreeType.DO_WHILE_STATEMENT;
var DoWhileStatement = function($__super) {
  function DoWhileStatement(location, body, condition) {
    $traceurRuntime.superConstructor(DoWhileStatement).call(this, location);
    this.body = body;
    this.condition = condition;
  }
  return ($traceurRuntime.createClass)(DoWhileStatement, {
    transform: function(transformer) {
      return transformer.transformDoWhileStatement(this);
    },
    visit: function(visitor) {
      visitor.visitDoWhileStatement(this);
    },
    get type() {
      return DO_WHILE_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var EMPTY_STATEMENT = ParseTreeType.EMPTY_STATEMENT;
var EmptyStatement = function($__super) {
  function EmptyStatement(location) {
    $traceurRuntime.superConstructor(EmptyStatement).call(this, location);
  }
  return ($traceurRuntime.createClass)(EmptyStatement, {
    transform: function(transformer) {
      return transformer.transformEmptyStatement(this);
    },
    visit: function(visitor) {
      visitor.visitEmptyStatement(this);
    },
    get type() {
      return EMPTY_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var EXPORT_DECLARATION = ParseTreeType.EXPORT_DECLARATION;
var ExportDeclaration = function($__super) {
  function ExportDeclaration(location, declaration, annotations) {
    $traceurRuntime.superConstructor(ExportDeclaration).call(this, location);
    this.declaration = declaration;
    this.annotations = annotations;
  }
  return ($traceurRuntime.createClass)(ExportDeclaration, {
    transform: function(transformer) {
      return transformer.transformExportDeclaration(this);
    },
    visit: function(visitor) {
      visitor.visitExportDeclaration(this);
    },
    get type() {
      return EXPORT_DECLARATION;
    }
  }, {}, $__super);
}(ParseTree);
var EXPORT_DEFAULT = ParseTreeType.EXPORT_DEFAULT;
var ExportDefault = function($__super) {
  function ExportDefault(location, expression) {
    $traceurRuntime.superConstructor(ExportDefault).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(ExportDefault, {
    transform: function(transformer) {
      return transformer.transformExportDefault(this);
    },
    visit: function(visitor) {
      visitor.visitExportDefault(this);
    },
    get type() {
      return EXPORT_DEFAULT;
    }
  }, {}, $__super);
}(ParseTree);
var EXPORT_SPECIFIER = ParseTreeType.EXPORT_SPECIFIER;
var ExportSpecifier = function($__super) {
  function ExportSpecifier(location, lhs, rhs) {
    $traceurRuntime.superConstructor(ExportSpecifier).call(this, location);
    this.lhs = lhs;
    this.rhs = rhs;
  }
  return ($traceurRuntime.createClass)(ExportSpecifier, {
    transform: function(transformer) {
      return transformer.transformExportSpecifier(this);
    },
    visit: function(visitor) {
      visitor.visitExportSpecifier(this);
    },
    get type() {
      return EXPORT_SPECIFIER;
    }
  }, {}, $__super);
}(ParseTree);
var EXPORT_SPECIFIER_SET = ParseTreeType.EXPORT_SPECIFIER_SET;
var ExportSpecifierSet = function($__super) {
  function ExportSpecifierSet(location, specifiers) {
    $traceurRuntime.superConstructor(ExportSpecifierSet).call(this, location);
    this.specifiers = specifiers;
  }
  return ($traceurRuntime.createClass)(ExportSpecifierSet, {
    transform: function(transformer) {
      return transformer.transformExportSpecifierSet(this);
    },
    visit: function(visitor) {
      visitor.visitExportSpecifierSet(this);
    },
    get type() {
      return EXPORT_SPECIFIER_SET;
    }
  }, {}, $__super);
}(ParseTree);
var EXPORT_STAR = ParseTreeType.EXPORT_STAR;
var ExportStar = function($__super) {
  function ExportStar(location) {
    $traceurRuntime.superConstructor(ExportStar).call(this, location);
  }
  return ($traceurRuntime.createClass)(ExportStar, {
    transform: function(transformer) {
      return transformer.transformExportStar(this);
    },
    visit: function(visitor) {
      visitor.visitExportStar(this);
    },
    get type() {
      return EXPORT_STAR;
    }
  }, {}, $__super);
}(ParseTree);
var EXPRESSION_STATEMENT = ParseTreeType.EXPRESSION_STATEMENT;
var ExpressionStatement = function($__super) {
  function ExpressionStatement(location, expression) {
    $traceurRuntime.superConstructor(ExpressionStatement).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(ExpressionStatement, {
    transform: function(transformer) {
      return transformer.transformExpressionStatement(this);
    },
    visit: function(visitor) {
      visitor.visitExpressionStatement(this);
    },
    get type() {
      return EXPRESSION_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var FINALLY = ParseTreeType.FINALLY;
var Finally = function($__super) {
  function Finally(location, block) {
    $traceurRuntime.superConstructor(Finally).call(this, location);
    this.block = block;
  }
  return ($traceurRuntime.createClass)(Finally, {
    transform: function(transformer) {
      return transformer.transformFinally(this);
    },
    visit: function(visitor) {
      visitor.visitFinally(this);
    },
    get type() {
      return FINALLY;
    }
  }, {}, $__super);
}(ParseTree);
var FOR_IN_STATEMENT = ParseTreeType.FOR_IN_STATEMENT;
var ForInStatement = function($__super) {
  function ForInStatement(location, initializer, collection, body) {
    $traceurRuntime.superConstructor(ForInStatement).call(this, location);
    this.initializer = initializer;
    this.collection = collection;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(ForInStatement, {
    transform: function(transformer) {
      return transformer.transformForInStatement(this);
    },
    visit: function(visitor) {
      visitor.visitForInStatement(this);
    },
    get type() {
      return FOR_IN_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var FOR_OF_STATEMENT = ParseTreeType.FOR_OF_STATEMENT;
var ForOfStatement = function($__super) {
  function ForOfStatement(location, initializer, collection, body) {
    $traceurRuntime.superConstructor(ForOfStatement).call(this, location);
    this.initializer = initializer;
    this.collection = collection;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(ForOfStatement, {
    transform: function(transformer) {
      return transformer.transformForOfStatement(this);
    },
    visit: function(visitor) {
      visitor.visitForOfStatement(this);
    },
    get type() {
      return FOR_OF_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var FOR_ON_STATEMENT = ParseTreeType.FOR_ON_STATEMENT;
var ForOnStatement = function($__super) {
  function ForOnStatement(location, initializer, observable, body) {
    $traceurRuntime.superConstructor(ForOnStatement).call(this, location);
    this.initializer = initializer;
    this.observable = observable;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(ForOnStatement, {
    transform: function(transformer) {
      return transformer.transformForOnStatement(this);
    },
    visit: function(visitor) {
      visitor.visitForOnStatement(this);
    },
    get type() {
      return FOR_ON_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var FOR_STATEMENT = ParseTreeType.FOR_STATEMENT;
var ForStatement = function($__super) {
  function ForStatement(location, initializer, condition, increment, body) {
    $traceurRuntime.superConstructor(ForStatement).call(this, location);
    this.initializer = initializer;
    this.condition = condition;
    this.increment = increment;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(ForStatement, {
    transform: function(transformer) {
      return transformer.transformForStatement(this);
    },
    visit: function(visitor) {
      visitor.visitForStatement(this);
    },
    get type() {
      return FOR_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var FORMAL_PARAMETER = ParseTreeType.FORMAL_PARAMETER;
var FormalParameter = function($__super) {
  function FormalParameter(location, parameter, typeAnnotation, annotations) {
    $traceurRuntime.superConstructor(FormalParameter).call(this, location);
    this.parameter = parameter;
    this.typeAnnotation = typeAnnotation;
    this.annotations = annotations;
  }
  return ($traceurRuntime.createClass)(FormalParameter, {
    transform: function(transformer) {
      return transformer.transformFormalParameter(this);
    },
    visit: function(visitor) {
      visitor.visitFormalParameter(this);
    },
    get type() {
      return FORMAL_PARAMETER;
    }
  }, {}, $__super);
}(ParseTree);
var FORMAL_PARAMETER_LIST = ParseTreeType.FORMAL_PARAMETER_LIST;
var FormalParameterList = function($__super) {
  function FormalParameterList(location, parameters) {
    $traceurRuntime.superConstructor(FormalParameterList).call(this, location);
    this.parameters = parameters;
  }
  return ($traceurRuntime.createClass)(FormalParameterList, {
    transform: function(transformer) {
      return transformer.transformFormalParameterList(this);
    },
    visit: function(visitor) {
      visitor.visitFormalParameterList(this);
    },
    get type() {
      return FORMAL_PARAMETER_LIST;
    }
  }, {}, $__super);
}(ParseTree);
var FORWARD_DEFAULT_EXPORT = ParseTreeType.FORWARD_DEFAULT_EXPORT;
var ForwardDefaultExport = function($__super) {
  function ForwardDefaultExport(location, name) {
    $traceurRuntime.superConstructor(ForwardDefaultExport).call(this, location);
    this.name = name;
  }
  return ($traceurRuntime.createClass)(ForwardDefaultExport, {
    transform: function(transformer) {
      return transformer.transformForwardDefaultExport(this);
    },
    visit: function(visitor) {
      visitor.visitForwardDefaultExport(this);
    },
    get type() {
      return FORWARD_DEFAULT_EXPORT;
    }
  }, {}, $__super);
}(ParseTree);
var FUNCTION_BODY = ParseTreeType.FUNCTION_BODY;
var FunctionBody = function($__super) {
  function FunctionBody(location, statements) {
    $traceurRuntime.superConstructor(FunctionBody).call(this, location);
    this.statements = statements;
  }
  return ($traceurRuntime.createClass)(FunctionBody, {
    transform: function(transformer) {
      return transformer.transformFunctionBody(this);
    },
    visit: function(visitor) {
      visitor.visitFunctionBody(this);
    },
    get type() {
      return FUNCTION_BODY;
    }
  }, {}, $__super);
}(ParseTree);
var FUNCTION_DECLARATION = ParseTreeType.FUNCTION_DECLARATION;
var FunctionDeclaration = function($__super) {
  function FunctionDeclaration(location, name, functionKind, parameterList, typeAnnotation, annotations, body) {
    $traceurRuntime.superConstructor(FunctionDeclaration).call(this, location);
    this.name = name;
    this.functionKind = functionKind;
    this.parameterList = parameterList;
    this.typeAnnotation = typeAnnotation;
    this.annotations = annotations;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(FunctionDeclaration, {
    transform: function(transformer) {
      return transformer.transformFunctionDeclaration(this);
    },
    visit: function(visitor) {
      visitor.visitFunctionDeclaration(this);
    },
    get type() {
      return FUNCTION_DECLARATION;
    }
  }, {}, $__super);
}(ParseTree);
var FUNCTION_EXPRESSION = ParseTreeType.FUNCTION_EXPRESSION;
var FunctionExpression = function($__super) {
  function FunctionExpression(location, name, functionKind, parameterList, typeAnnotation, annotations, body) {
    $traceurRuntime.superConstructor(FunctionExpression).call(this, location);
    this.name = name;
    this.functionKind = functionKind;
    this.parameterList = parameterList;
    this.typeAnnotation = typeAnnotation;
    this.annotations = annotations;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(FunctionExpression, {
    transform: function(transformer) {
      return transformer.transformFunctionExpression(this);
    },
    visit: function(visitor) {
      visitor.visitFunctionExpression(this);
    },
    get type() {
      return FUNCTION_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var FUNCTION_TYPE = ParseTreeType.FUNCTION_TYPE;
var FunctionType = function($__super) {
  function FunctionType(location, typeParameters, parameterList, returnType) {
    $traceurRuntime.superConstructor(FunctionType).call(this, location);
    this.typeParameters = typeParameters;
    this.parameterList = parameterList;
    this.returnType = returnType;
  }
  return ($traceurRuntime.createClass)(FunctionType, {
    transform: function(transformer) {
      return transformer.transformFunctionType(this);
    },
    visit: function(visitor) {
      visitor.visitFunctionType(this);
    },
    get type() {
      return FUNCTION_TYPE;
    }
  }, {}, $__super);
}(ParseTree);
var GENERATOR_COMPREHENSION = ParseTreeType.GENERATOR_COMPREHENSION;
var GeneratorComprehension = function($__super) {
  function GeneratorComprehension(location, comprehensionList, expression) {
    $traceurRuntime.superConstructor(GeneratorComprehension).call(this, location);
    this.comprehensionList = comprehensionList;
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(GeneratorComprehension, {
    transform: function(transformer) {
      return transformer.transformGeneratorComprehension(this);
    },
    visit: function(visitor) {
      visitor.visitGeneratorComprehension(this);
    },
    get type() {
      return GENERATOR_COMPREHENSION;
    }
  }, {}, $__super);
}(ParseTree);
var GET_ACCESSOR = ParseTreeType.GET_ACCESSOR;
var GetAccessor = function($__super) {
  function GetAccessor(location, isStatic, name, typeAnnotation, annotations, body) {
    $traceurRuntime.superConstructor(GetAccessor).call(this, location);
    this.isStatic = isStatic;
    this.name = name;
    this.typeAnnotation = typeAnnotation;
    this.annotations = annotations;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(GetAccessor, {
    transform: function(transformer) {
      return transformer.transformGetAccessor(this);
    },
    visit: function(visitor) {
      visitor.visitGetAccessor(this);
    },
    get type() {
      return GET_ACCESSOR;
    }
  }, {}, $__super);
}(ParseTree);
var IDENTIFIER_EXPRESSION = ParseTreeType.IDENTIFIER_EXPRESSION;
var IdentifierExpression = function($__super) {
  function IdentifierExpression(location, identifierToken) {
    $traceurRuntime.superConstructor(IdentifierExpression).call(this, location);
    this.identifierToken = identifierToken;
  }
  return ($traceurRuntime.createClass)(IdentifierExpression, {
    transform: function(transformer) {
      return transformer.transformIdentifierExpression(this);
    },
    visit: function(visitor) {
      visitor.visitIdentifierExpression(this);
    },
    get type() {
      return IDENTIFIER_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var IF_STATEMENT = ParseTreeType.IF_STATEMENT;
var IfStatement = function($__super) {
  function IfStatement(location, condition, ifClause, elseClause) {
    $traceurRuntime.superConstructor(IfStatement).call(this, location);
    this.condition = condition;
    this.ifClause = ifClause;
    this.elseClause = elseClause;
  }
  return ($traceurRuntime.createClass)(IfStatement, {
    transform: function(transformer) {
      return transformer.transformIfStatement(this);
    },
    visit: function(visitor) {
      visitor.visitIfStatement(this);
    },
    get type() {
      return IF_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var IMPORTED_BINDING = ParseTreeType.IMPORTED_BINDING;
var ImportedBinding = function($__super) {
  function ImportedBinding(location, binding) {
    $traceurRuntime.superConstructor(ImportedBinding).call(this, location);
    this.binding = binding;
  }
  return ($traceurRuntime.createClass)(ImportedBinding, {
    transform: function(transformer) {
      return transformer.transformImportedBinding(this);
    },
    visit: function(visitor) {
      visitor.visitImportedBinding(this);
    },
    get type() {
      return IMPORTED_BINDING;
    }
  }, {}, $__super);
}(ParseTree);
var IMPORT_CLAUSE_PAIR = ParseTreeType.IMPORT_CLAUSE_PAIR;
var ImportClausePair = function($__super) {
  function ImportClausePair(location, first, second) {
    $traceurRuntime.superConstructor(ImportClausePair).call(this, location);
    this.first = first;
    this.second = second;
  }
  return ($traceurRuntime.createClass)(ImportClausePair, {
    transform: function(transformer) {
      return transformer.transformImportClausePair(this);
    },
    visit: function(visitor) {
      visitor.visitImportClausePair(this);
    },
    get type() {
      return IMPORT_CLAUSE_PAIR;
    }
  }, {}, $__super);
}(ParseTree);
var IMPORT_DECLARATION = ParseTreeType.IMPORT_DECLARATION;
var ImportDeclaration = function($__super) {
  function ImportDeclaration(location, importClause, moduleSpecifier) {
    $traceurRuntime.superConstructor(ImportDeclaration).call(this, location);
    this.importClause = importClause;
    this.moduleSpecifier = moduleSpecifier;
  }
  return ($traceurRuntime.createClass)(ImportDeclaration, {
    transform: function(transformer) {
      return transformer.transformImportDeclaration(this);
    },
    visit: function(visitor) {
      visitor.visitImportDeclaration(this);
    },
    get type() {
      return IMPORT_DECLARATION;
    }
  }, {}, $__super);
}(ParseTree);
var IMPORT_SPECIFIER = ParseTreeType.IMPORT_SPECIFIER;
var ImportSpecifier = function($__super) {
  function ImportSpecifier(location, binding, name) {
    $traceurRuntime.superConstructor(ImportSpecifier).call(this, location);
    this.binding = binding;
    this.name = name;
  }
  return ($traceurRuntime.createClass)(ImportSpecifier, {
    transform: function(transformer) {
      return transformer.transformImportSpecifier(this);
    },
    visit: function(visitor) {
      visitor.visitImportSpecifier(this);
    },
    get type() {
      return IMPORT_SPECIFIER;
    }
  }, {}, $__super);
}(ParseTree);
var IMPORT_SPECIFIER_SET = ParseTreeType.IMPORT_SPECIFIER_SET;
var ImportSpecifierSet = function($__super) {
  function ImportSpecifierSet(location, specifiers) {
    $traceurRuntime.superConstructor(ImportSpecifierSet).call(this, location);
    this.specifiers = specifiers;
  }
  return ($traceurRuntime.createClass)(ImportSpecifierSet, {
    transform: function(transformer) {
      return transformer.transformImportSpecifierSet(this);
    },
    visit: function(visitor) {
      visitor.visitImportSpecifierSet(this);
    },
    get type() {
      return IMPORT_SPECIFIER_SET;
    }
  }, {}, $__super);
}(ParseTree);
var IMPORT_TYPE_CLAUSE = ParseTreeType.IMPORT_TYPE_CLAUSE;
var ImportTypeClause = function($__super) {
  function ImportTypeClause(location, clause) {
    $traceurRuntime.superConstructor(ImportTypeClause).call(this, location);
    this.clause = clause;
  }
  return ($traceurRuntime.createClass)(ImportTypeClause, {
    transform: function(transformer) {
      return transformer.transformImportTypeClause(this);
    },
    visit: function(visitor) {
      visitor.visitImportTypeClause(this);
    },
    get type() {
      return IMPORT_TYPE_CLAUSE;
    }
  }, {}, $__super);
}(ParseTree);
var INDEX_SIGNATURE = ParseTreeType.INDEX_SIGNATURE;
var IndexSignature = function($__super) {
  function IndexSignature(location, name, indexType, typeAnnotation) {
    $traceurRuntime.superConstructor(IndexSignature).call(this, location);
    this.name = name;
    this.indexType = indexType;
    this.typeAnnotation = typeAnnotation;
  }
  return ($traceurRuntime.createClass)(IndexSignature, {
    transform: function(transformer) {
      return transformer.transformIndexSignature(this);
    },
    visit: function(visitor) {
      visitor.visitIndexSignature(this);
    },
    get type() {
      return INDEX_SIGNATURE;
    }
  }, {}, $__super);
}(ParseTree);
var INTERFACE_DECLARATION = ParseTreeType.INTERFACE_DECLARATION;
var InterfaceDeclaration = function($__super) {
  function InterfaceDeclaration(location, name, typeParameters, extendsClause, objectType) {
    $traceurRuntime.superConstructor(InterfaceDeclaration).call(this, location);
    this.name = name;
    this.typeParameters = typeParameters;
    this.extendsClause = extendsClause;
    this.objectType = objectType;
  }
  return ($traceurRuntime.createClass)(InterfaceDeclaration, {
    transform: function(transformer) {
      return transformer.transformInterfaceDeclaration(this);
    },
    visit: function(visitor) {
      visitor.visitInterfaceDeclaration(this);
    },
    get type() {
      return INTERFACE_DECLARATION;
    }
  }, {}, $__super);
}(ParseTree);
var JSX_ATTRIBUTE = ParseTreeType.JSX_ATTRIBUTE;
var JsxAttribute = function($__super) {
  function JsxAttribute(location, name, value) {
    $traceurRuntime.superConstructor(JsxAttribute).call(this, location);
    this.name = name;
    this.value = value;
  }
  return ($traceurRuntime.createClass)(JsxAttribute, {
    transform: function(transformer) {
      return transformer.transformJsxAttribute(this);
    },
    visit: function(visitor) {
      visitor.visitJsxAttribute(this);
    },
    get type() {
      return JSX_ATTRIBUTE;
    }
  }, {}, $__super);
}(ParseTree);
var JSX_ELEMENT = ParseTreeType.JSX_ELEMENT;
var JsxElement = function($__super) {
  function JsxElement(location, name, attributes, children) {
    $traceurRuntime.superConstructor(JsxElement).call(this, location);
    this.name = name;
    this.attributes = attributes;
    this.children = children;
  }
  return ($traceurRuntime.createClass)(JsxElement, {
    transform: function(transformer) {
      return transformer.transformJsxElement(this);
    },
    visit: function(visitor) {
      visitor.visitJsxElement(this);
    },
    get type() {
      return JSX_ELEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var JSX_ELEMENT_NAME = ParseTreeType.JSX_ELEMENT_NAME;
var JsxElementName = function($__super) {
  function JsxElementName(location, names) {
    $traceurRuntime.superConstructor(JsxElementName).call(this, location);
    this.names = names;
  }
  return ($traceurRuntime.createClass)(JsxElementName, {
    transform: function(transformer) {
      return transformer.transformJsxElementName(this);
    },
    visit: function(visitor) {
      visitor.visitJsxElementName(this);
    },
    get type() {
      return JSX_ELEMENT_NAME;
    }
  }, {}, $__super);
}(ParseTree);
var JSX_PLACEHOLDER = ParseTreeType.JSX_PLACEHOLDER;
var JsxPlaceholder = function($__super) {
  function JsxPlaceholder(location, expression) {
    $traceurRuntime.superConstructor(JsxPlaceholder).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(JsxPlaceholder, {
    transform: function(transformer) {
      return transformer.transformJsxPlaceholder(this);
    },
    visit: function(visitor) {
      visitor.visitJsxPlaceholder(this);
    },
    get type() {
      return JSX_PLACEHOLDER;
    }
  }, {}, $__super);
}(ParseTree);
var JSX_SPREAD_ATTRIBUTE = ParseTreeType.JSX_SPREAD_ATTRIBUTE;
var JsxSpreadAttribute = function($__super) {
  function JsxSpreadAttribute(location, expression) {
    $traceurRuntime.superConstructor(JsxSpreadAttribute).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(JsxSpreadAttribute, {
    transform: function(transformer) {
      return transformer.transformJsxSpreadAttribute(this);
    },
    visit: function(visitor) {
      visitor.visitJsxSpreadAttribute(this);
    },
    get type() {
      return JSX_SPREAD_ATTRIBUTE;
    }
  }, {}, $__super);
}(ParseTree);
var JSX_TEXT = ParseTreeType.JSX_TEXT;
var JsxText = function($__super) {
  function JsxText(location, value) {
    $traceurRuntime.superConstructor(JsxText).call(this, location);
    this.value = value;
  }
  return ($traceurRuntime.createClass)(JsxText, {
    transform: function(transformer) {
      return transformer.transformJsxText(this);
    },
    visit: function(visitor) {
      visitor.visitJsxText(this);
    },
    get type() {
      return JSX_TEXT;
    }
  }, {}, $__super);
}(ParseTree);
var LABELLED_STATEMENT = ParseTreeType.LABELLED_STATEMENT;
var LabelledStatement = function($__super) {
  function LabelledStatement(location, name, statement) {
    $traceurRuntime.superConstructor(LabelledStatement).call(this, location);
    this.name = name;
    this.statement = statement;
  }
  return ($traceurRuntime.createClass)(LabelledStatement, {
    transform: function(transformer) {
      return transformer.transformLabelledStatement(this);
    },
    visit: function(visitor) {
      visitor.visitLabelledStatement(this);
    },
    get type() {
      return LABELLED_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var LITERAL_EXPRESSION = ParseTreeType.LITERAL_EXPRESSION;
var LiteralExpression = function($__super) {
  function LiteralExpression(location, literalToken) {
    $traceurRuntime.superConstructor(LiteralExpression).call(this, location);
    this.literalToken = literalToken;
  }
  return ($traceurRuntime.createClass)(LiteralExpression, {
    transform: function(transformer) {
      return transformer.transformLiteralExpression(this);
    },
    visit: function(visitor) {
      visitor.visitLiteralExpression(this);
    },
    get type() {
      return LITERAL_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var LITERAL_PROPERTY_NAME = ParseTreeType.LITERAL_PROPERTY_NAME;
var LiteralPropertyName = function($__super) {
  function LiteralPropertyName(location, literalToken) {
    $traceurRuntime.superConstructor(LiteralPropertyName).call(this, location);
    this.literalToken = literalToken;
  }
  return ($traceurRuntime.createClass)(LiteralPropertyName, {
    transform: function(transformer) {
      return transformer.transformLiteralPropertyName(this);
    },
    visit: function(visitor) {
      visitor.visitLiteralPropertyName(this);
    },
    get type() {
      return LITERAL_PROPERTY_NAME;
    }
  }, {}, $__super);
}(ParseTree);
var MEMBER_EXPRESSION = ParseTreeType.MEMBER_EXPRESSION;
var MemberExpression = function($__super) {
  function MemberExpression(location, operand, memberName) {
    $traceurRuntime.superConstructor(MemberExpression).call(this, location);
    this.operand = operand;
    this.memberName = memberName;
  }
  return ($traceurRuntime.createClass)(MemberExpression, {
    transform: function(transformer) {
      return transformer.transformMemberExpression(this);
    },
    visit: function(visitor) {
      visitor.visitMemberExpression(this);
    },
    get type() {
      return MEMBER_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var MEMBER_LOOKUP_EXPRESSION = ParseTreeType.MEMBER_LOOKUP_EXPRESSION;
var MemberLookupExpression = function($__super) {
  function MemberLookupExpression(location, operand, memberExpression) {
    $traceurRuntime.superConstructor(MemberLookupExpression).call(this, location);
    this.operand = operand;
    this.memberExpression = memberExpression;
  }
  return ($traceurRuntime.createClass)(MemberLookupExpression, {
    transform: function(transformer) {
      return transformer.transformMemberLookupExpression(this);
    },
    visit: function(visitor) {
      visitor.visitMemberLookupExpression(this);
    },
    get type() {
      return MEMBER_LOOKUP_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var METHOD = ParseTreeType.METHOD;
var Method = function($__super) {
  function Method(location, isStatic, functionKind, name, parameterList, typeAnnotation, annotations, body, debugName) {
    $traceurRuntime.superConstructor(Method).call(this, location);
    this.isStatic = isStatic;
    this.functionKind = functionKind;
    this.name = name;
    this.parameterList = parameterList;
    this.typeAnnotation = typeAnnotation;
    this.annotations = annotations;
    this.body = body;
    this.debugName = debugName;
  }
  return ($traceurRuntime.createClass)(Method, {
    transform: function(transformer) {
      return transformer.transformMethod(this);
    },
    visit: function(visitor) {
      visitor.visitMethod(this);
    },
    get type() {
      return METHOD;
    }
  }, {}, $__super);
}(ParseTree);
var METHOD_SIGNATURE = ParseTreeType.METHOD_SIGNATURE;
var MethodSignature = function($__super) {
  function MethodSignature(location, name, optional, callSignature) {
    $traceurRuntime.superConstructor(MethodSignature).call(this, location);
    this.name = name;
    this.optional = optional;
    this.callSignature = callSignature;
  }
  return ($traceurRuntime.createClass)(MethodSignature, {
    transform: function(transformer) {
      return transformer.transformMethodSignature(this);
    },
    visit: function(visitor) {
      visitor.visitMethodSignature(this);
    },
    get type() {
      return METHOD_SIGNATURE;
    }
  }, {}, $__super);
}(ParseTree);
var MODULE = ParseTreeType.MODULE;
var Module = function($__super) {
  function Module(location, scriptItemList, moduleName) {
    $traceurRuntime.superConstructor(Module).call(this, location);
    this.scriptItemList = scriptItemList;
    this.moduleName = moduleName;
  }
  return ($traceurRuntime.createClass)(Module, {
    transform: function(transformer) {
      return transformer.transformModule(this);
    },
    visit: function(visitor) {
      visitor.visitModule(this);
    },
    get type() {
      return MODULE;
    }
  }, {}, $__super);
}(ParseTree);
var MODULE_SPECIFIER = ParseTreeType.MODULE_SPECIFIER;
var ModuleSpecifier = function($__super) {
  function ModuleSpecifier(location, token) {
    $traceurRuntime.superConstructor(ModuleSpecifier).call(this, location);
    this.token = token;
  }
  return ($traceurRuntime.createClass)(ModuleSpecifier, {
    transform: function(transformer) {
      return transformer.transformModuleSpecifier(this);
    },
    visit: function(visitor) {
      visitor.visitModuleSpecifier(this);
    },
    get type() {
      return MODULE_SPECIFIER;
    }
  }, {}, $__super);
}(ParseTree);
var NAME_SPACE_EXPORT = ParseTreeType.NAME_SPACE_EXPORT;
var NameSpaceExport = function($__super) {
  function NameSpaceExport(location, name) {
    $traceurRuntime.superConstructor(NameSpaceExport).call(this, location);
    this.name = name;
  }
  return ($traceurRuntime.createClass)(NameSpaceExport, {
    transform: function(transformer) {
      return transformer.transformNameSpaceExport(this);
    },
    visit: function(visitor) {
      visitor.visitNameSpaceExport(this);
    },
    get type() {
      return NAME_SPACE_EXPORT;
    }
  }, {}, $__super);
}(ParseTree);
var NAME_SPACE_IMPORT = ParseTreeType.NAME_SPACE_IMPORT;
var NameSpaceImport = function($__super) {
  function NameSpaceImport(location, binding) {
    $traceurRuntime.superConstructor(NameSpaceImport).call(this, location);
    this.binding = binding;
  }
  return ($traceurRuntime.createClass)(NameSpaceImport, {
    transform: function(transformer) {
      return transformer.transformNameSpaceImport(this);
    },
    visit: function(visitor) {
      visitor.visitNameSpaceImport(this);
    },
    get type() {
      return NAME_SPACE_IMPORT;
    }
  }, {}, $__super);
}(ParseTree);
var NAMED_EXPORT = ParseTreeType.NAMED_EXPORT;
var NamedExport = function($__super) {
  function NamedExport(location, exportClause, moduleSpecifier) {
    $traceurRuntime.superConstructor(NamedExport).call(this, location);
    this.exportClause = exportClause;
    this.moduleSpecifier = moduleSpecifier;
  }
  return ($traceurRuntime.createClass)(NamedExport, {
    transform: function(transformer) {
      return transformer.transformNamedExport(this);
    },
    visit: function(visitor) {
      visitor.visitNamedExport(this);
    },
    get type() {
      return NAMED_EXPORT;
    }
  }, {}, $__super);
}(ParseTree);
var NEW_EXPRESSION = ParseTreeType.NEW_EXPRESSION;
var NewExpression = function($__super) {
  function NewExpression(location, operand, args) {
    $traceurRuntime.superConstructor(NewExpression).call(this, location);
    this.operand = operand;
    this.args = args;
  }
  return ($traceurRuntime.createClass)(NewExpression, {
    transform: function(transformer) {
      return transformer.transformNewExpression(this);
    },
    visit: function(visitor) {
      visitor.visitNewExpression(this);
    },
    get type() {
      return NEW_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var OBJECT_LITERAL = ParseTreeType.OBJECT_LITERAL;
var ObjectLiteral = function($__super) {
  function ObjectLiteral(location, propertyNameAndValues) {
    $traceurRuntime.superConstructor(ObjectLiteral).call(this, location);
    this.propertyNameAndValues = propertyNameAndValues;
  }
  return ($traceurRuntime.createClass)(ObjectLiteral, {
    transform: function(transformer) {
      return transformer.transformObjectLiteral(this);
    },
    visit: function(visitor) {
      visitor.visitObjectLiteral(this);
    },
    get type() {
      return OBJECT_LITERAL;
    }
  }, {}, $__super);
}(ParseTree);
var OBJECT_PATTERN = ParseTreeType.OBJECT_PATTERN;
var ObjectPattern = function($__super) {
  function ObjectPattern(location, fields) {
    $traceurRuntime.superConstructor(ObjectPattern).call(this, location);
    this.fields = fields;
  }
  return ($traceurRuntime.createClass)(ObjectPattern, {
    transform: function(transformer) {
      return transformer.transformObjectPattern(this);
    },
    visit: function(visitor) {
      visitor.visitObjectPattern(this);
    },
    get type() {
      return OBJECT_PATTERN;
    }
  }, {}, $__super);
}(ParseTree);
var OBJECT_PATTERN_FIELD = ParseTreeType.OBJECT_PATTERN_FIELD;
var ObjectPatternField = function($__super) {
  function ObjectPatternField(location, name, element) {
    $traceurRuntime.superConstructor(ObjectPatternField).call(this, location);
    this.name = name;
    this.element = element;
  }
  return ($traceurRuntime.createClass)(ObjectPatternField, {
    transform: function(transformer) {
      return transformer.transformObjectPatternField(this);
    },
    visit: function(visitor) {
      visitor.visitObjectPatternField(this);
    },
    get type() {
      return OBJECT_PATTERN_FIELD;
    }
  }, {}, $__super);
}(ParseTree);
var OBJECT_TYPE = ParseTreeType.OBJECT_TYPE;
var ObjectType = function($__super) {
  function ObjectType(location, typeMembers) {
    $traceurRuntime.superConstructor(ObjectType).call(this, location);
    this.typeMembers = typeMembers;
  }
  return ($traceurRuntime.createClass)(ObjectType, {
    transform: function(transformer) {
      return transformer.transformObjectType(this);
    },
    visit: function(visitor) {
      visitor.visitObjectType(this);
    },
    get type() {
      return OBJECT_TYPE;
    }
  }, {}, $__super);
}(ParseTree);
var PAREN_EXPRESSION = ParseTreeType.PAREN_EXPRESSION;
var ParenExpression = function($__super) {
  function ParenExpression(location, expression) {
    $traceurRuntime.superConstructor(ParenExpression).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(ParenExpression, {
    transform: function(transformer) {
      return transformer.transformParenExpression(this);
    },
    visit: function(visitor) {
      visitor.visitParenExpression(this);
    },
    get type() {
      return PAREN_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var POSTFIX_EXPRESSION = ParseTreeType.POSTFIX_EXPRESSION;
var PostfixExpression = function($__super) {
  function PostfixExpression(location, operand, operator) {
    $traceurRuntime.superConstructor(PostfixExpression).call(this, location);
    this.operand = operand;
    this.operator = operator;
  }
  return ($traceurRuntime.createClass)(PostfixExpression, {
    transform: function(transformer) {
      return transformer.transformPostfixExpression(this);
    },
    visit: function(visitor) {
      visitor.visitPostfixExpression(this);
    },
    get type() {
      return POSTFIX_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var PREDEFINED_TYPE = ParseTreeType.PREDEFINED_TYPE;
var PredefinedType = function($__super) {
  function PredefinedType(location, typeToken) {
    $traceurRuntime.superConstructor(PredefinedType).call(this, location);
    this.typeToken = typeToken;
  }
  return ($traceurRuntime.createClass)(PredefinedType, {
    transform: function(transformer) {
      return transformer.transformPredefinedType(this);
    },
    visit: function(visitor) {
      visitor.visitPredefinedType(this);
    },
    get type() {
      return PREDEFINED_TYPE;
    }
  }, {}, $__super);
}(ParseTree);
var SCRIPT = ParseTreeType.SCRIPT;
var Script = function($__super) {
  function Script(location, scriptItemList, moduleName) {
    $traceurRuntime.superConstructor(Script).call(this, location);
    this.scriptItemList = scriptItemList;
    this.moduleName = moduleName;
  }
  return ($traceurRuntime.createClass)(Script, {
    transform: function(transformer) {
      return transformer.transformScript(this);
    },
    visit: function(visitor) {
      visitor.visitScript(this);
    },
    get type() {
      return SCRIPT;
    }
  }, {}, $__super);
}(ParseTree);
var PROPERTY_NAME_ASSIGNMENT = ParseTreeType.PROPERTY_NAME_ASSIGNMENT;
var PropertyNameAssignment = function($__super) {
  function PropertyNameAssignment(location, name, value) {
    $traceurRuntime.superConstructor(PropertyNameAssignment).call(this, location);
    this.name = name;
    this.value = value;
  }
  return ($traceurRuntime.createClass)(PropertyNameAssignment, {
    transform: function(transformer) {
      return transformer.transformPropertyNameAssignment(this);
    },
    visit: function(visitor) {
      visitor.visitPropertyNameAssignment(this);
    },
    get type() {
      return PROPERTY_NAME_ASSIGNMENT;
    }
  }, {}, $__super);
}(ParseTree);
var PROPERTY_NAME_SHORTHAND = ParseTreeType.PROPERTY_NAME_SHORTHAND;
var PropertyNameShorthand = function($__super) {
  function PropertyNameShorthand(location, name) {
    $traceurRuntime.superConstructor(PropertyNameShorthand).call(this, location);
    this.name = name;
  }
  return ($traceurRuntime.createClass)(PropertyNameShorthand, {
    transform: function(transformer) {
      return transformer.transformPropertyNameShorthand(this);
    },
    visit: function(visitor) {
      visitor.visitPropertyNameShorthand(this);
    },
    get type() {
      return PROPERTY_NAME_SHORTHAND;
    }
  }, {}, $__super);
}(ParseTree);
var PROPERTY_VARIABLE_DECLARATION = ParseTreeType.PROPERTY_VARIABLE_DECLARATION;
var PropertyVariableDeclaration = function($__super) {
  function PropertyVariableDeclaration(location, isStatic, name, typeAnnotation, annotations, initializer) {
    $traceurRuntime.superConstructor(PropertyVariableDeclaration).call(this, location);
    this.isStatic = isStatic;
    this.name = name;
    this.typeAnnotation = typeAnnotation;
    this.annotations = annotations;
    this.initializer = initializer;
  }
  return ($traceurRuntime.createClass)(PropertyVariableDeclaration, {
    transform: function(transformer) {
      return transformer.transformPropertyVariableDeclaration(this);
    },
    visit: function(visitor) {
      visitor.visitPropertyVariableDeclaration(this);
    },
    get type() {
      return PROPERTY_VARIABLE_DECLARATION;
    }
  }, {}, $__super);
}(ParseTree);
var PROPERTY_SIGNATURE = ParseTreeType.PROPERTY_SIGNATURE;
var PropertySignature = function($__super) {
  function PropertySignature(location, name, optional, typeAnnotation) {
    $traceurRuntime.superConstructor(PropertySignature).call(this, location);
    this.name = name;
    this.optional = optional;
    this.typeAnnotation = typeAnnotation;
  }
  return ($traceurRuntime.createClass)(PropertySignature, {
    transform: function(transformer) {
      return transformer.transformPropertySignature(this);
    },
    visit: function(visitor) {
      visitor.visitPropertySignature(this);
    },
    get type() {
      return PROPERTY_SIGNATURE;
    }
  }, {}, $__super);
}(ParseTree);
var REST_PARAMETER = ParseTreeType.REST_PARAMETER;
var RestParameter = function($__super) {
  function RestParameter(location, identifier) {
    $traceurRuntime.superConstructor(RestParameter).call(this, location);
    this.identifier = identifier;
  }
  return ($traceurRuntime.createClass)(RestParameter, {
    transform: function(transformer) {
      return transformer.transformRestParameter(this);
    },
    visit: function(visitor) {
      visitor.visitRestParameter(this);
    },
    get type() {
      return REST_PARAMETER;
    }
  }, {}, $__super);
}(ParseTree);
var RETURN_STATEMENT = ParseTreeType.RETURN_STATEMENT;
var ReturnStatement = function($__super) {
  function ReturnStatement(location, expression) {
    $traceurRuntime.superConstructor(ReturnStatement).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(ReturnStatement, {
    transform: function(transformer) {
      return transformer.transformReturnStatement(this);
    },
    visit: function(visitor) {
      visitor.visitReturnStatement(this);
    },
    get type() {
      return RETURN_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var SET_ACCESSOR = ParseTreeType.SET_ACCESSOR;
var SetAccessor = function($__super) {
  function SetAccessor(location, isStatic, name, parameterList, annotations, body) {
    $traceurRuntime.superConstructor(SetAccessor).call(this, location);
    this.isStatic = isStatic;
    this.name = name;
    this.parameterList = parameterList;
    this.annotations = annotations;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(SetAccessor, {
    transform: function(transformer) {
      return transformer.transformSetAccessor(this);
    },
    visit: function(visitor) {
      visitor.visitSetAccessor(this);
    },
    get type() {
      return SET_ACCESSOR;
    }
  }, {}, $__super);
}(ParseTree);
var SPREAD_EXPRESSION = ParseTreeType.SPREAD_EXPRESSION;
var SpreadExpression = function($__super) {
  function SpreadExpression(location, expression) {
    $traceurRuntime.superConstructor(SpreadExpression).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(SpreadExpression, {
    transform: function(transformer) {
      return transformer.transformSpreadExpression(this);
    },
    visit: function(visitor) {
      visitor.visitSpreadExpression(this);
    },
    get type() {
      return SPREAD_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var SPREAD_PATTERN_ELEMENT = ParseTreeType.SPREAD_PATTERN_ELEMENT;
var SpreadPatternElement = function($__super) {
  function SpreadPatternElement(location, lvalue) {
    $traceurRuntime.superConstructor(SpreadPatternElement).call(this, location);
    this.lvalue = lvalue;
  }
  return ($traceurRuntime.createClass)(SpreadPatternElement, {
    transform: function(transformer) {
      return transformer.transformSpreadPatternElement(this);
    },
    visit: function(visitor) {
      visitor.visitSpreadPatternElement(this);
    },
    get type() {
      return SPREAD_PATTERN_ELEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var SUPER_EXPRESSION = ParseTreeType.SUPER_EXPRESSION;
var SuperExpression = function($__super) {
  function SuperExpression(location) {
    $traceurRuntime.superConstructor(SuperExpression).call(this, location);
  }
  return ($traceurRuntime.createClass)(SuperExpression, {
    transform: function(transformer) {
      return transformer.transformSuperExpression(this);
    },
    visit: function(visitor) {
      visitor.visitSuperExpression(this);
    },
    get type() {
      return SUPER_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var SWITCH_STATEMENT = ParseTreeType.SWITCH_STATEMENT;
var SwitchStatement = function($__super) {
  function SwitchStatement(location, expression, caseClauses) {
    $traceurRuntime.superConstructor(SwitchStatement).call(this, location);
    this.expression = expression;
    this.caseClauses = caseClauses;
  }
  return ($traceurRuntime.createClass)(SwitchStatement, {
    transform: function(transformer) {
      return transformer.transformSwitchStatement(this);
    },
    visit: function(visitor) {
      visitor.visitSwitchStatement(this);
    },
    get type() {
      return SWITCH_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var SYNTAX_ERROR_TREE = ParseTreeType.SYNTAX_ERROR_TREE;
var SyntaxErrorTree = function($__super) {
  function SyntaxErrorTree(location, nextToken, message) {
    $traceurRuntime.superConstructor(SyntaxErrorTree).call(this, location);
    this.nextToken = nextToken;
    this.message = message;
  }
  return ($traceurRuntime.createClass)(SyntaxErrorTree, {
    transform: function(transformer) {
      return transformer.transformSyntaxErrorTree(this);
    },
    visit: function(visitor) {
      visitor.visitSyntaxErrorTree(this);
    },
    get type() {
      return SYNTAX_ERROR_TREE;
    }
  }, {}, $__super);
}(ParseTree);
var TEMPLATE_LITERAL_EXPRESSION = ParseTreeType.TEMPLATE_LITERAL_EXPRESSION;
var TemplateLiteralExpression = function($__super) {
  function TemplateLiteralExpression(location, operand, elements) {
    $traceurRuntime.superConstructor(TemplateLiteralExpression).call(this, location);
    this.operand = operand;
    this.elements = elements;
  }
  return ($traceurRuntime.createClass)(TemplateLiteralExpression, {
    transform: function(transformer) {
      return transformer.transformTemplateLiteralExpression(this);
    },
    visit: function(visitor) {
      visitor.visitTemplateLiteralExpression(this);
    },
    get type() {
      return TEMPLATE_LITERAL_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var TEMPLATE_LITERAL_PORTION = ParseTreeType.TEMPLATE_LITERAL_PORTION;
var TemplateLiteralPortion = function($__super) {
  function TemplateLiteralPortion(location, value) {
    $traceurRuntime.superConstructor(TemplateLiteralPortion).call(this, location);
    this.value = value;
  }
  return ($traceurRuntime.createClass)(TemplateLiteralPortion, {
    transform: function(transformer) {
      return transformer.transformTemplateLiteralPortion(this);
    },
    visit: function(visitor) {
      visitor.visitTemplateLiteralPortion(this);
    },
    get type() {
      return TEMPLATE_LITERAL_PORTION;
    }
  }, {}, $__super);
}(ParseTree);
var TEMPLATE_SUBSTITUTION = ParseTreeType.TEMPLATE_SUBSTITUTION;
var TemplateSubstitution = function($__super) {
  function TemplateSubstitution(location, expression) {
    $traceurRuntime.superConstructor(TemplateSubstitution).call(this, location);
    this.expression = expression;
  }
  return ($traceurRuntime.createClass)(TemplateSubstitution, {
    transform: function(transformer) {
      return transformer.transformTemplateSubstitution(this);
    },
    visit: function(visitor) {
      visitor.visitTemplateSubstitution(this);
    },
    get type() {
      return TEMPLATE_SUBSTITUTION;
    }
  }, {}, $__super);
}(ParseTree);
var THIS_EXPRESSION = ParseTreeType.THIS_EXPRESSION;
var ThisExpression = function($__super) {
  function ThisExpression(location) {
    $traceurRuntime.superConstructor(ThisExpression).call(this, location);
  }
  return ($traceurRuntime.createClass)(ThisExpression, {
    transform: function(transformer) {
      return transformer.transformThisExpression(this);
    },
    visit: function(visitor) {
      visitor.visitThisExpression(this);
    },
    get type() {
      return THIS_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var THROW_STATEMENT = ParseTreeType.THROW_STATEMENT;
var ThrowStatement = function($__super) {
  function ThrowStatement(location, value) {
    $traceurRuntime.superConstructor(ThrowStatement).call(this, location);
    this.value = value;
  }
  return ($traceurRuntime.createClass)(ThrowStatement, {
    transform: function(transformer) {
      return transformer.transformThrowStatement(this);
    },
    visit: function(visitor) {
      visitor.visitThrowStatement(this);
    },
    get type() {
      return THROW_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var TRY_STATEMENT = ParseTreeType.TRY_STATEMENT;
var TryStatement = function($__super) {
  function TryStatement(location, body, catchBlock, finallyBlock) {
    $traceurRuntime.superConstructor(TryStatement).call(this, location);
    this.body = body;
    this.catchBlock = catchBlock;
    this.finallyBlock = finallyBlock;
  }
  return ($traceurRuntime.createClass)(TryStatement, {
    transform: function(transformer) {
      return transformer.transformTryStatement(this);
    },
    visit: function(visitor) {
      visitor.visitTryStatement(this);
    },
    get type() {
      return TRY_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var TYPE_ALIAS_DECLARATION = ParseTreeType.TYPE_ALIAS_DECLARATION;
var TypeAliasDeclaration = function($__super) {
  function TypeAliasDeclaration(location, name, value) {
    $traceurRuntime.superConstructor(TypeAliasDeclaration).call(this, location);
    this.name = name;
    this.value = value;
  }
  return ($traceurRuntime.createClass)(TypeAliasDeclaration, {
    transform: function(transformer) {
      return transformer.transformTypeAliasDeclaration(this);
    },
    visit: function(visitor) {
      visitor.visitTypeAliasDeclaration(this);
    },
    get type() {
      return TYPE_ALIAS_DECLARATION;
    }
  }, {}, $__super);
}(ParseTree);
var TYPE_ARGUMENTS = ParseTreeType.TYPE_ARGUMENTS;
var TypeArguments = function($__super) {
  function TypeArguments(location, args) {
    $traceurRuntime.superConstructor(TypeArguments).call(this, location);
    this.args = args;
  }
  return ($traceurRuntime.createClass)(TypeArguments, {
    transform: function(transformer) {
      return transformer.transformTypeArguments(this);
    },
    visit: function(visitor) {
      visitor.visitTypeArguments(this);
    },
    get type() {
      return TYPE_ARGUMENTS;
    }
  }, {}, $__super);
}(ParseTree);
var TYPE_NAME = ParseTreeType.TYPE_NAME;
var TypeName = function($__super) {
  function TypeName(location, moduleName, name) {
    $traceurRuntime.superConstructor(TypeName).call(this, location);
    this.moduleName = moduleName;
    this.name = name;
  }
  return ($traceurRuntime.createClass)(TypeName, {
    transform: function(transformer) {
      return transformer.transformTypeName(this);
    },
    visit: function(visitor) {
      visitor.visitTypeName(this);
    },
    get type() {
      return TYPE_NAME;
    }
  }, {}, $__super);
}(ParseTree);
var TYPE_PARAMETER = ParseTreeType.TYPE_PARAMETER;
var TypeParameter = function($__super) {
  function TypeParameter(location, identifierToken, extendsType) {
    $traceurRuntime.superConstructor(TypeParameter).call(this, location);
    this.identifierToken = identifierToken;
    this.extendsType = extendsType;
  }
  return ($traceurRuntime.createClass)(TypeParameter, {
    transform: function(transformer) {
      return transformer.transformTypeParameter(this);
    },
    visit: function(visitor) {
      visitor.visitTypeParameter(this);
    },
    get type() {
      return TYPE_PARAMETER;
    }
  }, {}, $__super);
}(ParseTree);
var TYPE_PARAMETERS = ParseTreeType.TYPE_PARAMETERS;
var TypeParameters = function($__super) {
  function TypeParameters(location, parameters) {
    $traceurRuntime.superConstructor(TypeParameters).call(this, location);
    this.parameters = parameters;
  }
  return ($traceurRuntime.createClass)(TypeParameters, {
    transform: function(transformer) {
      return transformer.transformTypeParameters(this);
    },
    visit: function(visitor) {
      visitor.visitTypeParameters(this);
    },
    get type() {
      return TYPE_PARAMETERS;
    }
  }, {}, $__super);
}(ParseTree);
var TYPE_REFERENCE = ParseTreeType.TYPE_REFERENCE;
var TypeReference = function($__super) {
  function TypeReference(location, typeName, args) {
    $traceurRuntime.superConstructor(TypeReference).call(this, location);
    this.typeName = typeName;
    this.args = args;
  }
  return ($traceurRuntime.createClass)(TypeReference, {
    transform: function(transformer) {
      return transformer.transformTypeReference(this);
    },
    visit: function(visitor) {
      visitor.visitTypeReference(this);
    },
    get type() {
      return TYPE_REFERENCE;
    }
  }, {}, $__super);
}(ParseTree);
var UNARY_EXPRESSION = ParseTreeType.UNARY_EXPRESSION;
var UnaryExpression = function($__super) {
  function UnaryExpression(location, operator, operand) {
    $traceurRuntime.superConstructor(UnaryExpression).call(this, location);
    this.operator = operator;
    this.operand = operand;
  }
  return ($traceurRuntime.createClass)(UnaryExpression, {
    transform: function(transformer) {
      return transformer.transformUnaryExpression(this);
    },
    visit: function(visitor) {
      visitor.visitUnaryExpression(this);
    },
    get type() {
      return UNARY_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
var UNION_TYPE = ParseTreeType.UNION_TYPE;
var UnionType = function($__super) {
  function UnionType(location, types) {
    $traceurRuntime.superConstructor(UnionType).call(this, location);
    this.types = types;
  }
  return ($traceurRuntime.createClass)(UnionType, {
    transform: function(transformer) {
      return transformer.transformUnionType(this);
    },
    visit: function(visitor) {
      visitor.visitUnionType(this);
    },
    get type() {
      return UNION_TYPE;
    }
  }, {}, $__super);
}(ParseTree);
var VARIABLE_DECLARATION = ParseTreeType.VARIABLE_DECLARATION;
var VariableDeclaration = function($__super) {
  function VariableDeclaration(location, lvalue, typeAnnotation, initializer) {
    $traceurRuntime.superConstructor(VariableDeclaration).call(this, location);
    this.lvalue = lvalue;
    this.typeAnnotation = typeAnnotation;
    this.initializer = initializer;
  }
  return ($traceurRuntime.createClass)(VariableDeclaration, {
    transform: function(transformer) {
      return transformer.transformVariableDeclaration(this);
    },
    visit: function(visitor) {
      visitor.visitVariableDeclaration(this);
    },
    get type() {
      return VARIABLE_DECLARATION;
    }
  }, {}, $__super);
}(ParseTree);
var VARIABLE_DECLARATION_LIST = ParseTreeType.VARIABLE_DECLARATION_LIST;
var VariableDeclarationList = function($__super) {
  function VariableDeclarationList(location, declarationType, declarations) {
    $traceurRuntime.superConstructor(VariableDeclarationList).call(this, location);
    this.declarationType = declarationType;
    this.declarations = declarations;
  }
  return ($traceurRuntime.createClass)(VariableDeclarationList, {
    transform: function(transformer) {
      return transformer.transformVariableDeclarationList(this);
    },
    visit: function(visitor) {
      visitor.visitVariableDeclarationList(this);
    },
    get type() {
      return VARIABLE_DECLARATION_LIST;
    }
  }, {}, $__super);
}(ParseTree);
var VARIABLE_STATEMENT = ParseTreeType.VARIABLE_STATEMENT;
var VariableStatement = function($__super) {
  function VariableStatement(location, declarations) {
    $traceurRuntime.superConstructor(VariableStatement).call(this, location);
    this.declarations = declarations;
  }
  return ($traceurRuntime.createClass)(VariableStatement, {
    transform: function(transformer) {
      return transformer.transformVariableStatement(this);
    },
    visit: function(visitor) {
      visitor.visitVariableStatement(this);
    },
    get type() {
      return VARIABLE_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var WHILE_STATEMENT = ParseTreeType.WHILE_STATEMENT;
var WhileStatement = function($__super) {
  function WhileStatement(location, condition, body) {
    $traceurRuntime.superConstructor(WhileStatement).call(this, location);
    this.condition = condition;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(WhileStatement, {
    transform: function(transformer) {
      return transformer.transformWhileStatement(this);
    },
    visit: function(visitor) {
      visitor.visitWhileStatement(this);
    },
    get type() {
      return WHILE_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var WITH_STATEMENT = ParseTreeType.WITH_STATEMENT;
var WithStatement = function($__super) {
  function WithStatement(location, expression, body) {
    $traceurRuntime.superConstructor(WithStatement).call(this, location);
    this.expression = expression;
    this.body = body;
  }
  return ($traceurRuntime.createClass)(WithStatement, {
    transform: function(transformer) {
      return transformer.transformWithStatement(this);
    },
    visit: function(visitor) {
      visitor.visitWithStatement(this);
    },
    get type() {
      return WITH_STATEMENT;
    }
  }, {}, $__super);
}(ParseTree);
var YIELD_EXPRESSION = ParseTreeType.YIELD_EXPRESSION;
var YieldExpression = function($__super) {
  function YieldExpression(location, expression, isYieldFor) {
    $traceurRuntime.superConstructor(YieldExpression).call(this, location);
    this.expression = expression;
    this.isYieldFor = isYieldFor;
  }
  return ($traceurRuntime.createClass)(YieldExpression, {
    transform: function(transformer) {
      return transformer.transformYieldExpression(this);
    },
    visit: function(visitor) {
      visitor.visitYieldExpression(this);
    },
    get type() {
      return YIELD_EXPRESSION;
    }
  }, {}, $__super);
}(ParseTree);
Object.defineProperties(module.exports, {
  Annotation: {get: function() {
      return Annotation;
    }},
  AnonBlock: {get: function() {
      return AnonBlock;
    }},
  ArgumentList: {get: function() {
      return ArgumentList;
    }},
  ArrayComprehension: {get: function() {
      return ArrayComprehension;
    }},
  ArrayLiteral: {get: function() {
      return ArrayLiteral;
    }},
  ArrayPattern: {get: function() {
      return ArrayPattern;
    }},
  ArrayType: {get: function() {
      return ArrayType;
    }},
  ArrowFunction: {get: function() {
      return ArrowFunction;
    }},
  AssignmentElement: {get: function() {
      return AssignmentElement;
    }},
  AwaitExpression: {get: function() {
      return AwaitExpression;
    }},
  BinaryExpression: {get: function() {
      return BinaryExpression;
    }},
  BindingElement: {get: function() {
      return BindingElement;
    }},
  BindingIdentifier: {get: function() {
      return BindingIdentifier;
    }},
  Block: {get: function() {
      return Block;
    }},
  BreakStatement: {get: function() {
      return BreakStatement;
    }},
  CallExpression: {get: function() {
      return CallExpression;
    }},
  CallSignature: {get: function() {
      return CallSignature;
    }},
  CaseClause: {get: function() {
      return CaseClause;
    }},
  Catch: {get: function() {
      return Catch;
    }},
  ClassDeclaration: {get: function() {
      return ClassDeclaration;
    }},
  ClassExpression: {get: function() {
      return ClassExpression;
    }},
  CommaExpression: {get: function() {
      return CommaExpression;
    }},
  ComprehensionFor: {get: function() {
      return ComprehensionFor;
    }},
  ComprehensionIf: {get: function() {
      return ComprehensionIf;
    }},
  ComputedPropertyName: {get: function() {
      return ComputedPropertyName;
    }},
  ConditionalExpression: {get: function() {
      return ConditionalExpression;
    }},
  ConstructSignature: {get: function() {
      return ConstructSignature;
    }},
  ConstructorType: {get: function() {
      return ConstructorType;
    }},
  ContinueStatement: {get: function() {
      return ContinueStatement;
    }},
  CoverFormals: {get: function() {
      return CoverFormals;
    }},
  CoverInitializedName: {get: function() {
      return CoverInitializedName;
    }},
  DebuggerStatement: {get: function() {
      return DebuggerStatement;
    }},
  DefaultClause: {get: function() {
      return DefaultClause;
    }},
  DoWhileStatement: {get: function() {
      return DoWhileStatement;
    }},
  EmptyStatement: {get: function() {
      return EmptyStatement;
    }},
  ExportDeclaration: {get: function() {
      return ExportDeclaration;
    }},
  ExportDefault: {get: function() {
      return ExportDefault;
    }},
  ExportSpecifier: {get: function() {
      return ExportSpecifier;
    }},
  ExportSpecifierSet: {get: function() {
      return ExportSpecifierSet;
    }},
  ExportStar: {get: function() {
      return ExportStar;
    }},
  ExpressionStatement: {get: function() {
      return ExpressionStatement;
    }},
  Finally: {get: function() {
      return Finally;
    }},
  ForInStatement: {get: function() {
      return ForInStatement;
    }},
  ForOfStatement: {get: function() {
      return ForOfStatement;
    }},
  ForOnStatement: {get: function() {
      return ForOnStatement;
    }},
  ForStatement: {get: function() {
      return ForStatement;
    }},
  FormalParameter: {get: function() {
      return FormalParameter;
    }},
  FormalParameterList: {get: function() {
      return FormalParameterList;
    }},
  ForwardDefaultExport: {get: function() {
      return ForwardDefaultExport;
    }},
  FunctionBody: {get: function() {
      return FunctionBody;
    }},
  FunctionDeclaration: {get: function() {
      return FunctionDeclaration;
    }},
  FunctionExpression: {get: function() {
      return FunctionExpression;
    }},
  FunctionType: {get: function() {
      return FunctionType;
    }},
  GeneratorComprehension: {get: function() {
      return GeneratorComprehension;
    }},
  GetAccessor: {get: function() {
      return GetAccessor;
    }},
  IdentifierExpression: {get: function() {
      return IdentifierExpression;
    }},
  IfStatement: {get: function() {
      return IfStatement;
    }},
  ImportedBinding: {get: function() {
      return ImportedBinding;
    }},
  ImportClausePair: {get: function() {
      return ImportClausePair;
    }},
  ImportDeclaration: {get: function() {
      return ImportDeclaration;
    }},
  ImportSpecifier: {get: function() {
      return ImportSpecifier;
    }},
  ImportSpecifierSet: {get: function() {
      return ImportSpecifierSet;
    }},
  ImportTypeClause: {get: function() {
      return ImportTypeClause;
    }},
  IndexSignature: {get: function() {
      return IndexSignature;
    }},
  InterfaceDeclaration: {get: function() {
      return InterfaceDeclaration;
    }},
  JsxAttribute: {get: function() {
      return JsxAttribute;
    }},
  JsxElement: {get: function() {
      return JsxElement;
    }},
  JsxElementName: {get: function() {
      return JsxElementName;
    }},
  JsxPlaceholder: {get: function() {
      return JsxPlaceholder;
    }},
  JsxSpreadAttribute: {get: function() {
      return JsxSpreadAttribute;
    }},
  JsxText: {get: function() {
      return JsxText;
    }},
  LabelledStatement: {get: function() {
      return LabelledStatement;
    }},
  LiteralExpression: {get: function() {
      return LiteralExpression;
    }},
  LiteralPropertyName: {get: function() {
      return LiteralPropertyName;
    }},
  MemberExpression: {get: function() {
      return MemberExpression;
    }},
  MemberLookupExpression: {get: function() {
      return MemberLookupExpression;
    }},
  Method: {get: function() {
      return Method;
    }},
  MethodSignature: {get: function() {
      return MethodSignature;
    }},
  Module: {get: function() {
      return Module;
    }},
  ModuleSpecifier: {get: function() {
      return ModuleSpecifier;
    }},
  NameSpaceExport: {get: function() {
      return NameSpaceExport;
    }},
  NameSpaceImport: {get: function() {
      return NameSpaceImport;
    }},
  NamedExport: {get: function() {
      return NamedExport;
    }},
  NewExpression: {get: function() {
      return NewExpression;
    }},
  ObjectLiteral: {get: function() {
      return ObjectLiteral;
    }},
  ObjectPattern: {get: function() {
      return ObjectPattern;
    }},
  ObjectPatternField: {get: function() {
      return ObjectPatternField;
    }},
  ObjectType: {get: function() {
      return ObjectType;
    }},
  ParenExpression: {get: function() {
      return ParenExpression;
    }},
  PostfixExpression: {get: function() {
      return PostfixExpression;
    }},
  PredefinedType: {get: function() {
      return PredefinedType;
    }},
  Script: {get: function() {
      return Script;
    }},
  PropertyNameAssignment: {get: function() {
      return PropertyNameAssignment;
    }},
  PropertyNameShorthand: {get: function() {
      return PropertyNameShorthand;
    }},
  PropertyVariableDeclaration: {get: function() {
      return PropertyVariableDeclaration;
    }},
  PropertySignature: {get: function() {
      return PropertySignature;
    }},
  RestParameter: {get: function() {
      return RestParameter;
    }},
  ReturnStatement: {get: function() {
      return ReturnStatement;
    }},
  SetAccessor: {get: function() {
      return SetAccessor;
    }},
  SpreadExpression: {get: function() {
      return SpreadExpression;
    }},
  SpreadPatternElement: {get: function() {
      return SpreadPatternElement;
    }},
  SuperExpression: {get: function() {
      return SuperExpression;
    }},
  SwitchStatement: {get: function() {
      return SwitchStatement;
    }},
  SyntaxErrorTree: {get: function() {
      return SyntaxErrorTree;
    }},
  TemplateLiteralExpression: {get: function() {
      return TemplateLiteralExpression;
    }},
  TemplateLiteralPortion: {get: function() {
      return TemplateLiteralPortion;
    }},
  TemplateSubstitution: {get: function() {
      return TemplateSubstitution;
    }},
  ThisExpression: {get: function() {
      return ThisExpression;
    }},
  ThrowStatement: {get: function() {
      return ThrowStatement;
    }},
  TryStatement: {get: function() {
      return TryStatement;
    }},
  TypeAliasDeclaration: {get: function() {
      return TypeAliasDeclaration;
    }},
  TypeArguments: {get: function() {
      return TypeArguments;
    }},
  TypeName: {get: function() {
      return TypeName;
    }},
  TypeParameter: {get: function() {
      return TypeParameter;
    }},
  TypeParameters: {get: function() {
      return TypeParameters;
    }},
  TypeReference: {get: function() {
      return TypeReference;
    }},
  UnaryExpression: {get: function() {
      return UnaryExpression;
    }},
  UnionType: {get: function() {
      return UnionType;
    }},
  VariableDeclaration: {get: function() {
      return VariableDeclaration;
    }},
  VariableDeclarationList: {get: function() {
      return VariableDeclarationList;
    }},
  VariableStatement: {get: function() {
      return VariableStatement;
    }},
  WhileStatement: {get: function() {
      return WhileStatement;
    }},
  WithStatement: {get: function() {
      return WithStatement;
    }},
  YieldExpression: {get: function() {
      return YieldExpression;
    }},
  __esModule: {value: true}
});
