"use strict";
var $___46__46__47_syntax_47_IdentifierToken_46_js__,
    $___46__46__47_syntax_47_LiteralToken_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTree_46_js__,
    $___46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_syntax_47_Token_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $___46__46__47_util_47_assert_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__;
var IdentifierToken = ($___46__46__47_syntax_47_IdentifierToken_46_js__ = require("../syntax/IdentifierToken.js"), $___46__46__47_syntax_47_IdentifierToken_46_js__ && $___46__46__47_syntax_47_IdentifierToken_46_js__.__esModule && $___46__46__47_syntax_47_IdentifierToken_46_js__ || {default: $___46__46__47_syntax_47_IdentifierToken_46_js__}).IdentifierToken;
var LiteralToken = ($___46__46__47_syntax_47_LiteralToken_46_js__ = require("../syntax/LiteralToken.js"), $___46__46__47_syntax_47_LiteralToken_46_js__ && $___46__46__47_syntax_47_LiteralToken_46_js__.__esModule && $___46__46__47_syntax_47_LiteralToken_46_js__ || {default: $___46__46__47_syntax_47_LiteralToken_46_js__}).LiteralToken;
var $__2 = ($___46__46__47_syntax_47_trees_47_ParseTree_46_js__ = require("../syntax/trees/ParseTree.js"), $___46__46__47_syntax_47_trees_47_ParseTree_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTree_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTree_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTree_46_js__}),
    ParseTree = $__2.ParseTree,
    ParseTreeType = $__2.ParseTreeType;
var $__3 = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}),
    CALL = $__3.CALL,
    CREATE = $__3.CREATE,
    DEFINE_PROPERTY = $__3.DEFINE_PROPERTY,
    FREEZE = $__3.FREEZE,
    OBJECT = $__3.OBJECT,
    UNDEFINED = $__3.UNDEFINED;
var Token = ($___46__46__47_syntax_47_Token_46_js__ = require("../syntax/Token.js"), $___46__46__47_syntax_47_Token_46_js__ && $___46__46__47_syntax_47_Token_46_js__.__esModule && $___46__46__47_syntax_47_Token_46_js__ || {default: $___46__46__47_syntax_47_Token_46_js__}).Token;
var $__5 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    EQUAL = $__5.EQUAL,
    FALSE = $__5.FALSE,
    NULL = $__5.NULL,
    NUMBER = $__5.NUMBER,
    STRING = $__5.STRING,
    TRUE = $__5.TRUE,
    VOID = $__5.VOID;
var assert = ($___46__46__47_util_47_assert_46_js__ = require("../util/assert.js"), $___46__46__47_util_47_assert_46_js__ && $___46__46__47_util_47_assert_46_js__.__esModule && $___46__46__47_util_47_assert_46_js__ || {default: $___46__46__47_util_47_assert_46_js__}).assert;
var $__7 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    ArgumentList = $__7.ArgumentList,
    ArrayLiteral = $__7.ArrayLiteral,
    BindingElement = $__7.BindingElement,
    BinaryExpression = $__7.BinaryExpression,
    BindingIdentifier = $__7.BindingIdentifier,
    Block = $__7.Block,
    BreakStatement = $__7.BreakStatement,
    CallExpression = $__7.CallExpression,
    CaseClause = $__7.CaseClause,
    Catch = $__7.Catch,
    ClassDeclaration = $__7.ClassDeclaration,
    CommaExpression = $__7.CommaExpression,
    ConditionalExpression = $__7.ConditionalExpression,
    ContinueStatement = $__7.ContinueStatement,
    DefaultClause = $__7.DefaultClause,
    DoWhileStatement = $__7.DoWhileStatement,
    EmptyStatement = $__7.EmptyStatement,
    ExpressionStatement = $__7.ExpressionStatement,
    Finally = $__7.Finally,
    ForInStatement = $__7.ForInStatement,
    ForOfStatement = $__7.ForOfStatement,
    ForStatement = $__7.ForStatement,
    FormalParameter = $__7.FormalParameter,
    FormalParameterList = $__7.FormalParameterList,
    FunctionBody = $__7.FunctionBody,
    FunctionExpression = $__7.FunctionExpression,
    IdentifierExpression = $__7.IdentifierExpression,
    IfStatement = $__7.IfStatement,
    ImportedBinding = $__7.ImportedBinding,
    LiteralExpression = $__7.LiteralExpression,
    LiteralPropertyName = $__7.LiteralPropertyName,
    MemberExpression = $__7.MemberExpression,
    MemberLookupExpression = $__7.MemberLookupExpression,
    NewExpression = $__7.NewExpression,
    ObjectLiteral = $__7.ObjectLiteral,
    ParenExpression = $__7.ParenExpression,
    PostfixExpression = $__7.PostfixExpression,
    Script = $__7.Script,
    PropertyNameAssignment = $__7.PropertyNameAssignment,
    RestParameter = $__7.RestParameter,
    ReturnStatement = $__7.ReturnStatement,
    SpreadExpression = $__7.SpreadExpression,
    SwitchStatement = $__7.SwitchStatement,
    ThisExpression = $__7.ThisExpression,
    ThrowStatement = $__7.ThrowStatement,
    TryStatement = $__7.TryStatement,
    UnaryExpression = $__7.UnaryExpression,
    VariableDeclaration = $__7.VariableDeclaration,
    VariableDeclarationList = $__7.VariableDeclarationList,
    VariableStatement = $__7.VariableStatement,
    WhileStatement = $__7.WhileStatement,
    WithStatement = $__7.WithStatement;
var slice = Array.prototype.slice.call.bind(Array.prototype.slice);
var map = Array.prototype.map.call.bind(Array.prototype.map);
function createOperatorToken(operator) {
  return new Token(operator, null);
}
function createIdentifierToken(identifier) {
  return new IdentifierToken(null, identifier);
}
function createStringLiteralToken(value) {
  return new LiteralToken(STRING, JSON.stringify(value), null);
}
function createBooleanLiteralToken(value) {
  return new Token(value ? TRUE : FALSE, null);
}
function createNullLiteralToken() {
  return new LiteralToken(NULL, 'null', null);
}
function createNumberLiteralToken(value) {
  return new LiteralToken(NUMBER, String(value), null);
}
function createEmptyParameterList() {
  return new FormalParameterList(null, []);
}
function createFormalParameter(name) {
  var bindingIdentifier = createBindingIdentifier(name);
  return new FormalParameter(null, new BindingElement(null, bindingIdentifier, null), null, []);
}
function createArgumentList(list) {
  return new ArgumentList(null, list);
}
function createEmptyArgumentList() {
  return createArgumentList([]);
}
function createArrayLiteral(list) {
  return new ArrayLiteral(null, list);
}
function createEmptyArrayLiteral() {
  return createArrayLiteral([]);
}
function createAssignmentExpression(lhs, rhs) {
  return new BinaryExpression(null, lhs, createOperatorToken(EQUAL), rhs);
}
function createBinaryExpression(left, operator, right) {
  return new BinaryExpression(null, left, operator, right);
}
function createBindingIdentifier(identifier) {
  if (typeof identifier === 'string')
    identifier = createIdentifierToken(identifier);
  else if (identifier.type === ParseTreeType.BINDING_IDENTIFIER)
    return identifier;
  else if (identifier.type === ParseTreeType.IDENTIFIER_EXPRESSION)
    return new BindingIdentifier(identifier.location, identifier.identifierToken);
  return new BindingIdentifier(null, identifier);
}
function createImportedBinding(name) {
  var bindingIdentifier = createBindingIdentifier(name);
  return new ImportedBinding(bindingIdentifier.location, bindingIdentifier);
}
function createEmptyStatement() {
  return new EmptyStatement(null);
}
function createEmptyBlock() {
  return createBlock([]);
}
function createBlock(statements) {
  return new Block(null, statements);
}
function createFunctionBody(statements) {
  return new FunctionBody(null, statements);
}
function createScopedExpression(body, scope) {
  assert(body.type === 'FUNCTION_BODY');
  return createCallCall(createParenExpression(createFunctionExpression(createEmptyParameterList(), body)), scope);
}
function createImmediatelyInvokedFunctionExpression(body) {
  assert(body.type === 'FUNCTION_BODY');
  return createCallExpression(createParenExpression(createFunctionExpression(createEmptyParameterList(), body)));
}
function createCallExpression(operand) {
  var args = arguments[1] !== (void 0) ? arguments[1] : createEmptyArgumentList();
  return new CallExpression(null, operand, args);
}
function createBreakStatement() {
  var name = arguments[0] !== (void 0) ? arguments[0] : null;
  return new BreakStatement(null, name);
}
function createCallCall(func, thisExpression) {
  return createCallExpression(createMemberExpression(func, CALL), createArgumentList([thisExpression]));
}
function createCaseClause(expression, statements) {
  return new CaseClause(null, expression, statements);
}
function createCatch(identifier, catchBody) {
  identifier = createBindingIdentifier(identifier);
  return new Catch(null, identifier, catchBody);
}
function createClassDeclaration(name, superClass, elements) {
  return new ClassDeclaration(null, name, superClass, elements, []);
}
function createCommaExpression(expressions) {
  return new CommaExpression(null, expressions);
}
function createConditionalExpression(condition, left, right) {
  return new ConditionalExpression(null, condition, left, right);
}
function createContinueStatement() {
  var name = arguments[0] !== (void 0) ? arguments[0] : null;
  return new ContinueStatement(null, name);
}
function createDefaultClause(statements) {
  return new DefaultClause(null, statements);
}
function createDoWhileStatement(body, condition) {
  return new DoWhileStatement(null, body, condition);
}
function createAssignmentStatement(lhs, rhs) {
  return createExpressionStatement(createAssignmentExpression(lhs, rhs));
}
function createCallStatement(operand) {
  var args = arguments[1];
  return createExpressionStatement(createCallExpression(operand, args));
}
function createExpressionStatement(expression) {
  return new ExpressionStatement(null, expression);
}
function createFinally(block) {
  return new Finally(null, block);
}
function createForOfStatement(initializer, collection, body) {
  return new ForOfStatement(null, initializer, collection, body);
}
function createForInStatement(initializer, collection, body) {
  return new ForInStatement(null, initializer, collection, body);
}
function createForStatement(variables, condition, increment, body) {
  return new ForStatement(null, variables, condition, increment, body);
}
function createFunctionExpression(parameterList, body) {
  assert(body.type === 'FUNCTION_BODY');
  return new FunctionExpression(null, null, false, parameterList, null, [], body);
}
function createIdentifierExpression(identifier) {
  if (typeof identifier === 'string')
    identifier = createIdentifierToken(identifier);
  else if (identifier instanceof BindingIdentifier)
    identifier = identifier.identifierToken;
  return new IdentifierExpression(null, identifier);
}
function createUndefinedExpression() {
  return createIdentifierExpression(UNDEFINED);
}
function createIfStatement(condition, ifClause) {
  var elseClause = arguments[2] !== (void 0) ? arguments[2] : null;
  return new IfStatement(null, condition, ifClause, elseClause);
}
function createStringLiteral(value) {
  return new LiteralExpression(null, createStringLiteralToken(value));
}
function createBooleanLiteral(value) {
  return new LiteralExpression(null, createBooleanLiteralToken(value));
}
function createTrueLiteral() {
  return createBooleanLiteral(true);
}
function createFalseLiteral() {
  return createBooleanLiteral(false);
}
function createNullLiteral() {
  return new LiteralExpression(null, createNullLiteralToken());
}
function createNumberLiteral(value) {
  return new LiteralExpression(null, createNumberLiteralToken(value));
}
function createMemberExpression(operand, memberName) {
  for (var memberNames = [],
      $__10 = 2; $__10 < arguments.length; $__10++)
    memberNames[$__10 - 2] = arguments[$__10];
  if (typeof operand === 'string' || operand instanceof IdentifierToken)
    operand = createIdentifierExpression(operand);
  if (typeof memberName === 'string')
    memberName = createIdentifierToken(memberName);
  if (memberName instanceof LiteralToken)
    memberName = new LiteralExpression(null, memberName);
  var tree = memberName instanceof LiteralExpression ? new MemberLookupExpression(null, operand, memberName) : new MemberExpression(null, operand, memberName);
  for (var i = 0; i < memberNames.length; i++) {
    tree = createMemberExpression(tree, memberNames[i]);
  }
  return tree;
}
function createMemberLookupExpression(operand, memberExpression) {
  return new MemberLookupExpression(null, operand, memberExpression);
}
function createThisExpression() {
  return new ThisExpression(null);
}
function createNewExpression(operand, args) {
  return new NewExpression(null, operand, args);
}
function createObjectFreeze(value) {
  return createCallExpression(createMemberExpression(OBJECT, FREEZE), createArgumentList([value]));
}
function createObjectCreate(protoExpression) {
  var descriptors = arguments[1];
  var argumentList = [protoExpression];
  if (descriptors)
    argumentList.push(descriptors);
  return createCallExpression(createMemberExpression(OBJECT, CREATE), createArgumentList(argumentList));
}
function createObjectLiteralForDescriptor(descr) {
  var propertyNameAndValues = Object.keys(descr).map(function(name) {
    var value = descr[name];
    if (!(value instanceof ParseTree))
      value = createBooleanLiteral(!!value);
    return createPropertyNameAssignment(name, value);
  });
  return createObjectLiteral(propertyNameAndValues);
}
function createDefineProperty(tree, name, descr) {
  if (typeof name === 'string')
    name = createStringLiteral(name);
  return createCallExpression(createMemberExpression(OBJECT, DEFINE_PROPERTY), createArgumentList([tree, name, createObjectLiteralForDescriptor(descr)]));
}
function createObjectLiteral(propertyNameAndValues) {
  return new ObjectLiteral(null, propertyNameAndValues);
}
function createParenExpression(expression) {
  return new ParenExpression(null, expression);
}
function createPostfixExpression(operand, operator) {
  return new PostfixExpression(null, operand, operator);
}
function createScript(scriptItemList) {
  return new Script(null, scriptItemList, null);
}
function createPropertyNameAssignment(identifier, value) {
  if (typeof identifier === 'string')
    identifier = createLiteralPropertyName(identifier);
  return new PropertyNameAssignment(null, identifier, value);
}
function createLiteralPropertyName(name) {
  return new LiteralPropertyName(null, createIdentifierToken(name));
}
function createRestParameter(identifier) {
  var rest = new RestParameter(null, createBindingIdentifier(identifier));
  return new FormalParameter(null, rest, null, []);
}
function createReturnStatement(expression) {
  return new ReturnStatement(null, expression);
}
function createSpreadExpression(expression) {
  return new SpreadExpression(null, expression);
}
function createSwitchStatement(expression, caseClauses) {
  return new SwitchStatement(null, expression, caseClauses);
}
function createThrowStatement(value) {
  return new ThrowStatement(null, value);
}
function createTryStatement(body, catchBlock) {
  var finallyBlock = arguments[2] !== (void 0) ? arguments[2] : null;
  return new TryStatement(null, body, catchBlock, finallyBlock);
}
function createUnaryExpression(operator, operand) {
  return new UnaryExpression(null, operator, operand);
}
function createUseStrictDirective() {
  return createExpressionStatement(createStringLiteral('use strict'));
}
function createVariableDeclarationList(binding, identifierOrDeclarations) {
  var initializer = arguments[2];
  if (identifierOrDeclarations instanceof Array) {
    var declarations = identifierOrDeclarations;
    return new VariableDeclarationList(null, binding, declarations);
  }
  var identifier = identifierOrDeclarations;
  return createVariableDeclarationList(binding, [createVariableDeclaration(identifier, initializer)]);
}
function createVariableDeclaration(identifier, initializer) {
  if (!(identifier instanceof ParseTree) || identifier.type !== ParseTreeType.BINDING_IDENTIFIER && identifier.type !== ParseTreeType.OBJECT_PATTERN && identifier.type !== ParseTreeType.ARRAY_PATTERN) {
    identifier = createBindingIdentifier(identifier);
  }
  return new VariableDeclaration(null, identifier, null, initializer);
}
function createVariableStatement(listOrBinding) {
  var identifier = arguments[1];
  var initializer = arguments[2];
  if (listOrBinding instanceof VariableDeclarationList)
    return new VariableStatement(null, listOrBinding);
  var binding = listOrBinding;
  var list = createVariableDeclarationList(binding, identifier, initializer);
  return createVariableStatement(list);
}
function createVoid0() {
  return createParenExpression(createUnaryExpression(createOperatorToken(VOID), createNumberLiteral(0)));
}
function createWhileStatement(condition, body) {
  return new WhileStatement(null, condition, body);
}
function createWithStatement(expression, body) {
  return new WithStatement(null, expression, body);
}
function createAssignStateStatement(state) {
  return createAssignmentStatement(createMemberExpression('$ctx', 'state'), createNumberLiteral(state));
}
Object.defineProperties(module.exports, {
  createOperatorToken: {get: function() {
      return createOperatorToken;
    }},
  createIdentifierToken: {get: function() {
      return createIdentifierToken;
    }},
  createStringLiteralToken: {get: function() {
      return createStringLiteralToken;
    }},
  createBooleanLiteralToken: {get: function() {
      return createBooleanLiteralToken;
    }},
  createNullLiteralToken: {get: function() {
      return createNullLiteralToken;
    }},
  createNumberLiteralToken: {get: function() {
      return createNumberLiteralToken;
    }},
  createEmptyParameterList: {get: function() {
      return createEmptyParameterList;
    }},
  createFormalParameter: {get: function() {
      return createFormalParameter;
    }},
  createArgumentList: {get: function() {
      return createArgumentList;
    }},
  createEmptyArgumentList: {get: function() {
      return createEmptyArgumentList;
    }},
  createArrayLiteral: {get: function() {
      return createArrayLiteral;
    }},
  createEmptyArrayLiteral: {get: function() {
      return createEmptyArrayLiteral;
    }},
  createAssignmentExpression: {get: function() {
      return createAssignmentExpression;
    }},
  createBinaryExpression: {get: function() {
      return createBinaryExpression;
    }},
  createBindingIdentifier: {get: function() {
      return createBindingIdentifier;
    }},
  createImportedBinding: {get: function() {
      return createImportedBinding;
    }},
  createEmptyStatement: {get: function() {
      return createEmptyStatement;
    }},
  createEmptyBlock: {get: function() {
      return createEmptyBlock;
    }},
  createBlock: {get: function() {
      return createBlock;
    }},
  createFunctionBody: {get: function() {
      return createFunctionBody;
    }},
  createScopedExpression: {get: function() {
      return createScopedExpression;
    }},
  createImmediatelyInvokedFunctionExpression: {get: function() {
      return createImmediatelyInvokedFunctionExpression;
    }},
  createCallExpression: {get: function() {
      return createCallExpression;
    }},
  createBreakStatement: {get: function() {
      return createBreakStatement;
    }},
  createCaseClause: {get: function() {
      return createCaseClause;
    }},
  createCatch: {get: function() {
      return createCatch;
    }},
  createClassDeclaration: {get: function() {
      return createClassDeclaration;
    }},
  createCommaExpression: {get: function() {
      return createCommaExpression;
    }},
  createConditionalExpression: {get: function() {
      return createConditionalExpression;
    }},
  createContinueStatement: {get: function() {
      return createContinueStatement;
    }},
  createDefaultClause: {get: function() {
      return createDefaultClause;
    }},
  createDoWhileStatement: {get: function() {
      return createDoWhileStatement;
    }},
  createAssignmentStatement: {get: function() {
      return createAssignmentStatement;
    }},
  createCallStatement: {get: function() {
      return createCallStatement;
    }},
  createExpressionStatement: {get: function() {
      return createExpressionStatement;
    }},
  createFinally: {get: function() {
      return createFinally;
    }},
  createForOfStatement: {get: function() {
      return createForOfStatement;
    }},
  createForInStatement: {get: function() {
      return createForInStatement;
    }},
  createForStatement: {get: function() {
      return createForStatement;
    }},
  createFunctionExpression: {get: function() {
      return createFunctionExpression;
    }},
  createIdentifierExpression: {get: function() {
      return createIdentifierExpression;
    }},
  createUndefinedExpression: {get: function() {
      return createUndefinedExpression;
    }},
  createIfStatement: {get: function() {
      return createIfStatement;
    }},
  createStringLiteral: {get: function() {
      return createStringLiteral;
    }},
  createBooleanLiteral: {get: function() {
      return createBooleanLiteral;
    }},
  createTrueLiteral: {get: function() {
      return createTrueLiteral;
    }},
  createFalseLiteral: {get: function() {
      return createFalseLiteral;
    }},
  createNullLiteral: {get: function() {
      return createNullLiteral;
    }},
  createNumberLiteral: {get: function() {
      return createNumberLiteral;
    }},
  createMemberExpression: {get: function() {
      return createMemberExpression;
    }},
  createMemberLookupExpression: {get: function() {
      return createMemberLookupExpression;
    }},
  createThisExpression: {get: function() {
      return createThisExpression;
    }},
  createNewExpression: {get: function() {
      return createNewExpression;
    }},
  createObjectFreeze: {get: function() {
      return createObjectFreeze;
    }},
  createObjectCreate: {get: function() {
      return createObjectCreate;
    }},
  createObjectLiteralForDescriptor: {get: function() {
      return createObjectLiteralForDescriptor;
    }},
  createDefineProperty: {get: function() {
      return createDefineProperty;
    }},
  createObjectLiteral: {get: function() {
      return createObjectLiteral;
    }},
  createParenExpression: {get: function() {
      return createParenExpression;
    }},
  createPostfixExpression: {get: function() {
      return createPostfixExpression;
    }},
  createScript: {get: function() {
      return createScript;
    }},
  createPropertyNameAssignment: {get: function() {
      return createPropertyNameAssignment;
    }},
  createLiteralPropertyName: {get: function() {
      return createLiteralPropertyName;
    }},
  createRestParameter: {get: function() {
      return createRestParameter;
    }},
  createReturnStatement: {get: function() {
      return createReturnStatement;
    }},
  createSwitchStatement: {get: function() {
      return createSwitchStatement;
    }},
  createThrowStatement: {get: function() {
      return createThrowStatement;
    }},
  createTryStatement: {get: function() {
      return createTryStatement;
    }},
  createUnaryExpression: {get: function() {
      return createUnaryExpression;
    }},
  createUseStrictDirective: {get: function() {
      return createUseStrictDirective;
    }},
  createVariableDeclarationList: {get: function() {
      return createVariableDeclarationList;
    }},
  createVariableDeclaration: {get: function() {
      return createVariableDeclaration;
    }},
  createVariableStatement: {get: function() {
      return createVariableStatement;
    }},
  createVoid0: {get: function() {
      return createVoid0;
    }},
  createWhileStatement: {get: function() {
      return createWhileStatement;
    }},
  createWithStatement: {get: function() {
      return createWithStatement;
    }},
  createAssignStateStatement: {get: function() {
      return createAssignStateStatement;
    }},
  __esModule: {value: true}
});
