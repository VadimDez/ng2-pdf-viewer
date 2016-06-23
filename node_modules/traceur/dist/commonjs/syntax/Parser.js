"use strict";
var $___46__46__47_codegeneration_47_FindVisitor_46_js__,
    $__IdentifierToken_46_js__,
    $__trees_47_ParseTreeType_46_js__,
    $___46__46__47_Options_46_js__,
    $__PredefinedName_46_js__,
    $___46__46__47_util_47_SyntaxErrorReporter_46_js__,
    $__Scanner_46_js__,
    $___46__46__47_util_47_SourceRange_46_js__,
    $__Token_46_js__,
    $__Keywords_46_js__,
    $___46__46__47_semantics_47_ConstructorValidator_46_js__,
    $___46__46__47_staticsemantics_47_validateParameters_46_js__,
    $___46__46__47_staticsemantics_47_isValidSimpleAssignmentTarget_46_js__,
    $__TokenType_46_js__,
    $__trees_47_ParseTrees_46_js__;
var FindVisitor = ($___46__46__47_codegeneration_47_FindVisitor_46_js__ = require("../codegeneration/FindVisitor.js"), $___46__46__47_codegeneration_47_FindVisitor_46_js__ && $___46__46__47_codegeneration_47_FindVisitor_46_js__.__esModule && $___46__46__47_codegeneration_47_FindVisitor_46_js__ || {default: $___46__46__47_codegeneration_47_FindVisitor_46_js__}).FindVisitor;
var IdentifierToken = ($__IdentifierToken_46_js__ = require("./IdentifierToken.js"), $__IdentifierToken_46_js__ && $__IdentifierToken_46_js__.__esModule && $__IdentifierToken_46_js__ || {default: $__IdentifierToken_46_js__}).IdentifierToken;
var $__2 = ($__trees_47_ParseTreeType_46_js__ = require("./trees/ParseTreeType.js"), $__trees_47_ParseTreeType_46_js__ && $__trees_47_ParseTreeType_46_js__.__esModule && $__trees_47_ParseTreeType_46_js__ || {default: $__trees_47_ParseTreeType_46_js__}),
    ARRAY_LITERAL = $__2.ARRAY_LITERAL,
    BINDING_IDENTIFIER = $__2.BINDING_IDENTIFIER,
    CALL_EXPRESSION = $__2.CALL_EXPRESSION,
    COMPUTED_PROPERTY_NAME = $__2.COMPUTED_PROPERTY_NAME,
    COVER_FORMALS = $__2.COVER_FORMALS,
    FORMAL_PARAMETER_LIST = $__2.FORMAL_PARAMETER_LIST,
    IDENTIFIER_EXPRESSION = $__2.IDENTIFIER_EXPRESSION,
    LITERAL_PROPERTY_NAME = $__2.LITERAL_PROPERTY_NAME,
    OBJECT_LITERAL = $__2.OBJECT_LITERAL,
    REST_PARAMETER = $__2.REST_PARAMETER,
    SYNTAX_ERROR_TREE = $__2.SYNTAX_ERROR_TREE;
var Options = ($___46__46__47_Options_46_js__ = require("../Options.js"), $___46__46__47_Options_46_js__ && $___46__46__47_Options_46_js__.__esModule && $___46__46__47_Options_46_js__ || {default: $___46__46__47_Options_46_js__}).Options;
var $__4 = ($__PredefinedName_46_js__ = require("./PredefinedName.js"), $__PredefinedName_46_js__ && $__PredefinedName_46_js__.__esModule && $__PredefinedName_46_js__ || {default: $__PredefinedName_46_js__}),
    AS = $__4.AS,
    ASYNC = $__4.ASYNC,
    ASYNC_STAR = $__4.ASYNC_STAR,
    AWAIT = $__4.AWAIT,
    CONSTRUCTOR = $__4.CONSTRUCTOR,
    FROM = $__4.FROM,
    GET = $__4.GET,
    OF = $__4.OF,
    ON = $__4.ON,
    SET = $__4.SET,
    TYPE = $__4.TYPE;
var SyntaxErrorReporter = ($___46__46__47_util_47_SyntaxErrorReporter_46_js__ = require("../util/SyntaxErrorReporter.js"), $___46__46__47_util_47_SyntaxErrorReporter_46_js__ && $___46__46__47_util_47_SyntaxErrorReporter_46_js__.__esModule && $___46__46__47_util_47_SyntaxErrorReporter_46_js__ || {default: $___46__46__47_util_47_SyntaxErrorReporter_46_js__}).SyntaxErrorReporter;
var $__6 = ($__Scanner_46_js__ = require("./Scanner.js"), $__Scanner_46_js__ && $__Scanner_46_js__.__esModule && $__Scanner_46_js__ || {default: $__Scanner_46_js__}),
    getLastToken = $__6.getLastToken,
    getPosition = $__6.getPosition,
    initScanner = $__6.init,
    isAtEnd = $__6.isAtEnd,
    nextCloseAngle = $__6.nextCloseAngle,
    nextJsxTextToken = $__6.nextJsxTextToken,
    nextJsxToken = $__6.nextJsxToken,
    nextRegularExpressionLiteralToken = $__6.nextRegularExpressionLiteralToken,
    nextTemplateLiteralToken = $__6.nextTemplateLiteralToken,
    nextToken = $__6.nextToken,
    peek = $__6.peek,
    peekJsxToken = $__6.peekJsxToken,
    peekLocation = $__6.peekLocation,
    peekLookahead = $__6.peekLookahead,
    peekToken = $__6.peekToken,
    peekTokenLookahead = $__6.peekTokenLookahead,
    peekTokenNoLineTerminator = $__6.peekTokenNoLineTerminator,
    peekType = $__6.peekType,
    resetScanner = $__6.setIndex;
var SourceRange = ($___46__46__47_util_47_SourceRange_46_js__ = require("../util/SourceRange.js"), $___46__46__47_util_47_SourceRange_46_js__ && $___46__46__47_util_47_SourceRange_46_js__.__esModule && $___46__46__47_util_47_SourceRange_46_js__ || {default: $___46__46__47_util_47_SourceRange_46_js__}).SourceRange;
var $__8 = ($__Token_46_js__ = require("./Token.js"), $__Token_46_js__ && $__Token_46_js__.__esModule && $__Token_46_js__ || {default: $__Token_46_js__}),
    Token = $__8.Token,
    isAssignmentOperator = $__8.isAssignmentOperator;
var getKeywordType = ($__Keywords_46_js__ = require("./Keywords.js"), $__Keywords_46_js__ && $__Keywords_46_js__.__esModule && $__Keywords_46_js__ || {default: $__Keywords_46_js__}).getKeywordType;
var validateConstructor = ($___46__46__47_semantics_47_ConstructorValidator_46_js__ = require("../semantics/ConstructorValidator.js"), $___46__46__47_semantics_47_ConstructorValidator_46_js__ && $___46__46__47_semantics_47_ConstructorValidator_46_js__.__esModule && $___46__46__47_semantics_47_ConstructorValidator_46_js__ || {default: $___46__46__47_semantics_47_ConstructorValidator_46_js__}).validateConstructor;
var validateParameters = ($___46__46__47_staticsemantics_47_validateParameters_46_js__ = require("../staticsemantics/validateParameters.js"), $___46__46__47_staticsemantics_47_validateParameters_46_js__ && $___46__46__47_staticsemantics_47_validateParameters_46_js__.__esModule && $___46__46__47_staticsemantics_47_validateParameters_46_js__ || {default: $___46__46__47_staticsemantics_47_validateParameters_46_js__}).default;
var isValidSimpleAssignmentTarget = ($___46__46__47_staticsemantics_47_isValidSimpleAssignmentTarget_46_js__ = require("../staticsemantics/isValidSimpleAssignmentTarget.js"), $___46__46__47_staticsemantics_47_isValidSimpleAssignmentTarget_46_js__ && $___46__46__47_staticsemantics_47_isValidSimpleAssignmentTarget_46_js__.__esModule && $___46__46__47_staticsemantics_47_isValidSimpleAssignmentTarget_46_js__ || {default: $___46__46__47_staticsemantics_47_isValidSimpleAssignmentTarget_46_js__}).default;
var $__13 = ($__TokenType_46_js__ = require("./TokenType.js"), $__TokenType_46_js__ && $__TokenType_46_js__.__esModule && $__TokenType_46_js__ || {default: $__TokenType_46_js__}),
    AMPERSAND = $__13.AMPERSAND,
    AND = $__13.AND,
    ARROW = $__13.ARROW,
    AT = $__13.AT,
    BANG = $__13.BANG,
    BAR = $__13.BAR,
    BREAK = $__13.BREAK,
    CARET = $__13.CARET,
    CASE = $__13.CASE,
    CATCH = $__13.CATCH,
    CLASS = $__13.CLASS,
    CLOSE_ANGLE = $__13.CLOSE_ANGLE,
    CLOSE_CURLY = $__13.CLOSE_CURLY,
    CLOSE_PAREN = $__13.CLOSE_PAREN,
    CLOSE_SQUARE = $__13.CLOSE_SQUARE,
    COLON = $__13.COLON,
    COMMA = $__13.COMMA,
    CONST = $__13.CONST,
    CONTINUE = $__13.CONTINUE,
    DEBUGGER = $__13.DEBUGGER,
    DEFAULT = $__13.DEFAULT,
    DELETE = $__13.DELETE,
    DO = $__13.DO,
    DOT_DOT_DOT = $__13.DOT_DOT_DOT,
    ELSE = $__13.ELSE,
    END_OF_FILE = $__13.END_OF_FILE,
    EQUAL = $__13.EQUAL,
    EQUAL_EQUAL = $__13.EQUAL_EQUAL,
    EQUAL_EQUAL_EQUAL = $__13.EQUAL_EQUAL_EQUAL,
    ERROR = $__13.ERROR,
    EXPORT = $__13.EXPORT,
    EXTENDS = $__13.EXTENDS,
    FALSE = $__13.FALSE,
    FINALLY = $__13.FINALLY,
    FOR = $__13.FOR,
    FUNCTION = $__13.FUNCTION,
    GREATER_EQUAL = $__13.GREATER_EQUAL,
    IDENTIFIER = $__13.IDENTIFIER,
    IF = $__13.IF,
    IMPLEMENTS = $__13.IMPLEMENTS,
    IMPORT = $__13.IMPORT,
    IN = $__13.IN,
    INSTANCEOF = $__13.INSTANCEOF,
    INTERFACE = $__13.INTERFACE,
    JSX_IDENTIFIER = $__13.JSX_IDENTIFIER,
    LEFT_SHIFT = $__13.LEFT_SHIFT,
    LESS_EQUAL = $__13.LESS_EQUAL,
    LET = $__13.LET,
    MINUS = $__13.MINUS,
    MINUS_MINUS = $__13.MINUS_MINUS,
    NEW = $__13.NEW,
    NO_SUBSTITUTION_TEMPLATE = $__13.NO_SUBSTITUTION_TEMPLATE,
    NOT_EQUAL = $__13.NOT_EQUAL,
    NOT_EQUAL_EQUAL = $__13.NOT_EQUAL_EQUAL,
    NULL = $__13.NULL,
    NUMBER = $__13.NUMBER,
    OPEN_ANGLE = $__13.OPEN_ANGLE,
    OPEN_CURLY = $__13.OPEN_CURLY,
    OPEN_PAREN = $__13.OPEN_PAREN,
    OPEN_SQUARE = $__13.OPEN_SQUARE,
    OR = $__13.OR,
    PACKAGE = $__13.PACKAGE,
    PERCENT = $__13.PERCENT,
    PERIOD = $__13.PERIOD,
    PLUS = $__13.PLUS,
    PLUS_PLUS = $__13.PLUS_PLUS,
    PRIVATE = $__13.PRIVATE,
    PROTECTED = $__13.PROTECTED,
    PUBLIC = $__13.PUBLIC,
    QUESTION = $__13.QUESTION,
    RETURN = $__13.RETURN,
    RIGHT_SHIFT = $__13.RIGHT_SHIFT,
    SEMI_COLON = $__13.SEMI_COLON,
    SLASH = $__13.SLASH,
    SLASH_EQUAL = $__13.SLASH_EQUAL,
    STAR = $__13.STAR,
    STAR_STAR = $__13.STAR_STAR,
    STATIC = $__13.STATIC,
    STRING = $__13.STRING,
    SUPER = $__13.SUPER,
    SWITCH = $__13.SWITCH,
    TEMPLATE_HEAD = $__13.TEMPLATE_HEAD,
    TEMPLATE_TAIL = $__13.TEMPLATE_TAIL,
    THIS = $__13.THIS,
    THROW = $__13.THROW,
    TILDE = $__13.TILDE,
    TRUE = $__13.TRUE,
    TRY = $__13.TRY,
    TYPEOF = $__13.TYPEOF,
    UNSIGNED_RIGHT_SHIFT = $__13.UNSIGNED_RIGHT_SHIFT,
    VAR = $__13.VAR,
    VOID = $__13.VOID,
    WHILE = $__13.WHILE,
    WITH = $__13.WITH,
    YIELD = $__13.YIELD;
var $__14 = ($__trees_47_ParseTrees_46_js__ = require("./trees/ParseTrees.js"), $__trees_47_ParseTrees_46_js__ && $__trees_47_ParseTrees_46_js__.__esModule && $__trees_47_ParseTrees_46_js__ || {default: $__trees_47_ParseTrees_46_js__}),
    ArgumentList = $__14.ArgumentList,
    ArrayComprehension = $__14.ArrayComprehension,
    ArrayLiteral = $__14.ArrayLiteral,
    ArrayPattern = $__14.ArrayPattern,
    ArrayType = $__14.ArrayType,
    ArrowFunction = $__14.ArrowFunction,
    AssignmentElement = $__14.AssignmentElement,
    AwaitExpression = $__14.AwaitExpression,
    BinaryExpression = $__14.BinaryExpression,
    BindingElement = $__14.BindingElement,
    BindingIdentifier = $__14.BindingIdentifier,
    Block = $__14.Block,
    BreakStatement = $__14.BreakStatement,
    CallExpression = $__14.CallExpression,
    CallSignature = $__14.CallSignature,
    CaseClause = $__14.CaseClause,
    Catch = $__14.Catch,
    ClassDeclaration = $__14.ClassDeclaration,
    ClassExpression = $__14.ClassExpression,
    CommaExpression = $__14.CommaExpression,
    ComprehensionFor = $__14.ComprehensionFor,
    ComprehensionIf = $__14.ComprehensionIf,
    ComputedPropertyName = $__14.ComputedPropertyName,
    ConditionalExpression = $__14.ConditionalExpression,
    ConstructSignature = $__14.ConstructSignature,
    ConstructorType = $__14.ConstructorType,
    ContinueStatement = $__14.ContinueStatement,
    CoverFormals = $__14.CoverFormals,
    CoverInitializedName = $__14.CoverInitializedName,
    DebuggerStatement = $__14.DebuggerStatement,
    Annotation = $__14.Annotation,
    DefaultClause = $__14.DefaultClause,
    DoWhileStatement = $__14.DoWhileStatement,
    EmptyStatement = $__14.EmptyStatement,
    ExportDeclaration = $__14.ExportDeclaration,
    ExportDefault = $__14.ExportDefault,
    ExportSpecifier = $__14.ExportSpecifier,
    ExportSpecifierSet = $__14.ExportSpecifierSet,
    ExportStar = $__14.ExportStar,
    ExpressionStatement = $__14.ExpressionStatement,
    Finally = $__14.Finally,
    ForInStatement = $__14.ForInStatement,
    ForOfStatement = $__14.ForOfStatement,
    ForOnStatement = $__14.ForOnStatement,
    ForStatement = $__14.ForStatement,
    FormalParameter = $__14.FormalParameter,
    FormalParameterList = $__14.FormalParameterList,
    ForwardDefaultExport = $__14.ForwardDefaultExport,
    FunctionBody = $__14.FunctionBody,
    FunctionDeclaration = $__14.FunctionDeclaration,
    FunctionExpression = $__14.FunctionExpression,
    FunctionType = $__14.FunctionType,
    GeneratorComprehension = $__14.GeneratorComprehension,
    GetAccessor = $__14.GetAccessor,
    IdentifierExpression = $__14.IdentifierExpression,
    IfStatement = $__14.IfStatement,
    ImportClausePair = $__14.ImportClausePair,
    ImportDeclaration = $__14.ImportDeclaration,
    ImportSpecifier = $__14.ImportSpecifier,
    ImportSpecifierSet = $__14.ImportSpecifierSet,
    ImportedBinding = $__14.ImportedBinding,
    ImportTypeClause = $__14.ImportTypeClause,
    IndexSignature = $__14.IndexSignature,
    InterfaceDeclaration = $__14.InterfaceDeclaration,
    JsxAttribute = $__14.JsxAttribute,
    JsxElement = $__14.JsxElement,
    JsxElementName = $__14.JsxElementName,
    JsxPlaceholder = $__14.JsxPlaceholder,
    JsxSpreadAttribute = $__14.JsxSpreadAttribute,
    JsxText = $__14.JsxText,
    LabelledStatement = $__14.LabelledStatement,
    LiteralExpression = $__14.LiteralExpression,
    LiteralPropertyName = $__14.LiteralPropertyName,
    MemberExpression = $__14.MemberExpression,
    MemberLookupExpression = $__14.MemberLookupExpression,
    Method = $__14.Method,
    MethodSignature = $__14.MethodSignature,
    Module = $__14.Module,
    ModuleSpecifier = $__14.ModuleSpecifier,
    NameSpaceExport = $__14.NameSpaceExport,
    NameSpaceImport = $__14.NameSpaceImport,
    NamedExport = $__14.NamedExport,
    NewExpression = $__14.NewExpression,
    ObjectLiteral = $__14.ObjectLiteral,
    ObjectPattern = $__14.ObjectPattern,
    ObjectPatternField = $__14.ObjectPatternField,
    ObjectType = $__14.ObjectType,
    ParenExpression = $__14.ParenExpression,
    PostfixExpression = $__14.PostfixExpression,
    PredefinedType = $__14.PredefinedType,
    PropertyNameAssignment = $__14.PropertyNameAssignment,
    PropertyNameShorthand = $__14.PropertyNameShorthand,
    PropertySignature = $__14.PropertySignature,
    PropertyVariableDeclaration = $__14.PropertyVariableDeclaration,
    RestParameter = $__14.RestParameter,
    ReturnStatement = $__14.ReturnStatement,
    Script = $__14.Script,
    SetAccessor = $__14.SetAccessor,
    SpreadExpression = $__14.SpreadExpression,
    SpreadPatternElement = $__14.SpreadPatternElement,
    SuperExpression = $__14.SuperExpression,
    SwitchStatement = $__14.SwitchStatement,
    SyntaxErrorTree = $__14.SyntaxErrorTree,
    TemplateLiteralExpression = $__14.TemplateLiteralExpression,
    TemplateLiteralPortion = $__14.TemplateLiteralPortion,
    TemplateSubstitution = $__14.TemplateSubstitution,
    ThisExpression = $__14.ThisExpression,
    ThrowStatement = $__14.ThrowStatement,
    TryStatement = $__14.TryStatement,
    TypeAliasDeclaration = $__14.TypeAliasDeclaration,
    TypeArguments = $__14.TypeArguments,
    TypeName = $__14.TypeName,
    TypeParameter = $__14.TypeParameter,
    TypeParameters = $__14.TypeParameters,
    TypeReference = $__14.TypeReference,
    UnaryExpression = $__14.UnaryExpression,
    UnionType = $__14.UnionType,
    VariableDeclaration = $__14.VariableDeclaration,
    VariableDeclarationList = $__14.VariableDeclarationList,
    VariableStatement = $__14.VariableStatement,
    WhileStatement = $__14.WhileStatement,
    WithStatement = $__14.WithStatement,
    YieldExpression = $__14.YieldExpression;
var ALLOW_IN = true;
var NO_IN = false;
var INITIALIZER_REQUIRED = true;
var INITIALIZER_OPTIONAL = false;
var ValidateObjectLiteral = function($__super) {
  function ValidateObjectLiteral() {
    $traceurRuntime.superConstructor(ValidateObjectLiteral).call(this);
    this.errorToken = null;
  }
  return ($traceurRuntime.createClass)(ValidateObjectLiteral, {visitCoverInitializedName: function(tree) {
      this.errorToken = tree.equalToken;
      this.found = true;
    }}, {}, $__super);
}(FindVisitor);
function containsInitializer(declarations) {
  return declarations.some(function(v) {
    return v.initializer;
  });
}
var FUNCTION_STATE_SCRIPT = 1;
var FUNCTION_STATE_MODULE = 1 << 1;
var FUNCTION_STATE_FUNCTION = 1 << 2;
var FUNCTION_STATE_ARROW = 1 << 3;
var FUNCTION_STATE_METHOD = 1 << 4;
var FUNCTION_STATE_DERIVED_CONSTRUCTOR = 1 << 5;
var FUNCTION_STATE_GENERATOR = 1 << 6;
var FUNCTION_STATE_ASYNC = 1 << 7;
var FUNCTION_STATE_LENIENT = FUNCTION_STATE_METHOD | FUNCTION_STATE_GENERATOR | FUNCTION_STATE_ASYNC | FUNCTION_STATE_DERIVED_CONSTRUCTOR;
var FunctionState = function() {
  function FunctionState(outer, kind) {
    this.outer = outer;
    this.kind = kind;
  }
  return ($traceurRuntime.createClass)(FunctionState, {
    isTopMost: function() {
      return this.kind & (FUNCTION_STATE_SCRIPT | FUNCTION_STATE_MODULE);
    },
    isMethod: function() {
      return this.kind & FUNCTION_STATE_METHOD;
    },
    isDerivedConstructor: function() {
      return this.kind & FUNCTION_STATE_DERIVED_CONSTRUCTOR;
    },
    isArrowFunction: function() {
      return this.kind & FUNCTION_STATE_ARROW;
    },
    isGenerator: function() {
      return this.kind & FUNCTION_STATE_GENERATOR;
    },
    isAsyncFunction: function() {
      return this.kind & FUNCTION_STATE_ASYNC;
    },
    isAsyncGenerator: function() {
      return this.isGenerator() && this.isAsyncFunction();
    }
  }, {});
}();
var Parser = function() {
  function Parser(file) {
    var errorReporter = arguments[1] !== (void 0) ? arguments[1] : new SyntaxErrorReporter();
    var options = arguments[2] !== (void 0) ? arguments[2] : new Options();
    this.errorReporter_ = errorReporter;
    initScanner(errorReporter, file, this, options);
    this.options_ = options;
    this.coverInitializedNameCount_ = 0;
    this.strictMode_ = false;
    this.annotations_ = [];
    this.functionState_ = null;
  }
  return ($traceurRuntime.createClass)(Parser, {
    get allowYield_() {
      return this.functionState_.isGenerator();
    },
    get allowAwait_() {
      return this.functionState_.isAsyncFunction();
    },
    get allowForOn_() {
      return this.functionState_.isAsyncFunction();
    },
    parseScript: function() {
      this.strictMode_ = false;
      var start = this.getTreeStartLocation_();
      var fs = this.pushFunctionState_(FUNCTION_STATE_SCRIPT);
      var scriptItemList = this.parseStatementList_(true);
      this.eat_(END_OF_FILE);
      this.popFunctionState_(fs);
      return new Script(this.getTreeLocation_(start), scriptItemList, null);
    },
    pushFunctionState_: function(kind) {
      return this.functionState_ = new FunctionState(this.functionState_, kind);
    },
    popFunctionState_: function(fs) {
      if (fs != this.functionState_) {
        throw new Error('Internal error');
      }
      this.functionState_ = this.functionState_.outer;
    },
    parseStatementList_: function(checkUseStrictDirective) {
      var result = [];
      var type;
      while ((type = peekType()) !== CLOSE_CURLY && type !== END_OF_FILE) {
        var statement = this.parseStatementListItem_(type);
        if (checkUseStrictDirective) {
          if (!statement.isDirectivePrologue()) {
            checkUseStrictDirective = false;
          } else if (statement.isUseStrictDirective()) {
            this.strictMode_ = true;
            checkUseStrictDirective = false;
          }
        }
        result.push(statement);
      }
      return result;
    },
    parseStatementListItem_: function(type) {
      switch (type) {
        case LET:
        case CONST:
          if (this.options_.blockBinding) {
            return this.parseVariableStatement_();
          }
          break;
        case CLASS:
          if (this.options_.classes) {
            return this.parseClassDeclaration_();
          }
          break;
        case FUNCTION:
          return this.parseFunctionDeclaration_();
        case IDENTIFIER:
          if (this.options_.types && this.peekPredefinedString_(TYPE) && peekLookahead(IDENTIFIER)) {
            return this.parseTypeAliasDeclaration_();
          }
          break;
      }
      return this.parseStatementWithType_(type);
    },
    parseModule: function() {
      var start = this.getTreeStartLocation_();
      var fs = this.pushFunctionState_(FUNCTION_STATE_MODULE);
      var scriptItemList = this.parseModuleItemList_();
      this.eat_(END_OF_FILE);
      this.popFunctionState_(fs);
      return new Module(this.getTreeLocation_(start), scriptItemList, null);
    },
    parseModuleItemList_: function() {
      this.strictMode_ = true;
      var result = [];
      var type;
      while ((type = peekType()) !== END_OF_FILE) {
        var statement = this.parseModuleItem_(type);
        result.push(statement);
      }
      return result;
    },
    parseModuleItem_: function(type) {
      switch (type) {
        case IMPORT:
          return this.parseImportDeclaration_();
        case EXPORT:
          return this.parseExportDeclaration_();
        case AT:
          if (this.options_.annotations)
            return this.parseAnnotatedDeclarations_(true);
          break;
      }
      return this.parseStatementListItem_(type);
    },
    parseModuleSpecifier_: function() {
      var start = this.getTreeStartLocation_();
      var token = this.eat_(STRING);
      return new ModuleSpecifier(this.getTreeLocation_(start), token);
    },
    parseNameSpaceImport_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(STAR);
      this.eatId_(AS);
      var binding = this.parseImportedBinding_();
      return new NameSpaceImport(this.getTreeLocation_(start), binding);
    },
    parseImportDeclaration_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(IMPORT);
      var importClause = null;
      if (!peek(STRING)) {
        importClause = this.parseImportClause_(true, this.options_.types);
        this.eatId_(FROM);
      }
      var moduleSpecifier = this.parseModuleSpecifier_();
      this.eatPossibleImplicitSemiColon_();
      return new ImportDeclaration(this.getTreeLocation_(start), importClause, moduleSpecifier);
    },
    parseImportClause_: function(allowImportedDefaultBinding, allowType) {
      switch (peekType()) {
        case STAR:
          return this.parseNameSpaceImport_();
        case OPEN_CURLY:
          return this.parseImportSpecifierSet_();
        case IDENTIFIER:
          if (allowType && this.peekPredefinedString_(TYPE)) {
            var start = this.getTreeStartLocation_();
            var t = peekTokenLookahead();
            if (t.type === OPEN_CURLY || t.type === IDENTIFIER && t.value !== FROM) {
              this.eatId_(TYPE);
              var clause = this.parseImportClause_(allowImportedDefaultBinding, false);
              return new ImportTypeClause(this.getTreeLocation_(start), clause);
            }
          }
          if (allowImportedDefaultBinding) {
            var start$__21 = this.getTreeStartLocation_();
            var importedBinding = this.parseImportedBinding_();
            if (this.eatIf_(COMMA)) {
              var second = this.parseImportClause_(false, false);
              return new ImportClausePair(this.getTreeLocation_(start$__21), importedBinding, second);
            }
            return importedBinding;
          }
          break;
      }
      return this.parseUnexpectedToken_();
    },
    parseImportSpecifierSet_: function() {
      var start = this.getTreeStartLocation_();
      var specifiers = [];
      this.eat_(OPEN_CURLY);
      while (!peek(CLOSE_CURLY) && !isAtEnd()) {
        specifiers.push(this.parseImportSpecifier_());
        if (!this.eatIf_(COMMA))
          break;
      }
      this.eat_(CLOSE_CURLY);
      return new ImportSpecifierSet(this.getTreeLocation_(start), specifiers);
    },
    parseImportedBinding_: function() {
      var start = this.getTreeStartLocation_();
      var binding = this.parseBindingIdentifier_();
      return new ImportedBinding(this.getTreeLocation_(start), binding);
    },
    parseImportSpecifier_: function() {
      var start = this.getTreeStartLocation_();
      var token = peekToken();
      var isKeyword = token.isKeyword();
      var binding;
      var name = this.eatIdName_();
      if (isKeyword || this.peekPredefinedString_(AS)) {
        this.eatId_(AS);
        binding = this.parseImportedBinding_();
      } else {
        binding = new ImportedBinding(name.location, new BindingIdentifier(name.location, name));
        name = null;
      }
      return new ImportSpecifier(this.getTreeLocation_(start), binding, name);
    },
    parseExportDeclaration_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(EXPORT);
      var exportTree;
      var annotations = this.popAnnotations_();
      var type = peekType();
      switch (type) {
        case CONST:
        case LET:
          if (this.options_.blockBinding) {
            exportTree = this.parseVariableStatement_();
            break;
          }
          return this.parseUnexpectedToken_();
        case VAR:
          exportTree = this.parseVariableStatement_();
          break;
        case FUNCTION:
          exportTree = this.parseFunctionDeclaration_();
          break;
        case CLASS:
          exportTree = this.parseClassDeclaration_();
          break;
        case DEFAULT:
          exportTree = this.parseExportDefault_();
          break;
        case OPEN_CURLY:
        case STAR:
          exportTree = this.parseNamedExport_();
          break;
        case IDENTIFIER:
          if (this.options_.asyncFunctions && this.peekPredefinedString_(ASYNC)) {
            var asyncToken = this.eatId_();
            exportTree = this.parseAsyncFunctionDeclaration_(asyncToken);
          } else if (this.options_.types && this.peekPredefinedString_(TYPE) && peekLookahead(IDENTIFIER)) {
            exportTree = this.parseTypeAliasDeclaration_();
          } else if (this.options_.exportFromExtended) {
            exportTree = this.parseNamedExport_();
          } else {
            return this.parseUnexpectedToken_();
          }
          break;
        default:
          {
            var token = peekToken();
            if (!token.isKeyword()) {
              return this.parseUnexpectedToken_();
            }
            exportTree = this.parseNamedExport_();
          }
      }
      return new ExportDeclaration(this.getTreeLocation_(start), exportTree, annotations);
    },
    parseExportDefault_: function() {
      var start = this.getTreeStartLocation_();
      var defaultToken = this.eat_(DEFAULT);
      if (this.options_.exportFromExtended && this.peekPredefinedString_(FROM)) {
        var idName = new IdentifierToken(defaultToken.location, DEFAULT);
        var namedExport = new ForwardDefaultExport(this.getTreeLocation_(start), idName);
        this.eatId_(FROM);
        var moduleSpecifier = this.parseModuleSpecifier_();
        return new NamedExport(this.getTreeLocation_(start), namedExport, moduleSpecifier);
      }
      var exportValue;
      switch (peekType()) {
        case FUNCTION:
          {
            var tree = this.parseFunctionExpression_();
            if (tree.name) {
              tree = new FunctionDeclaration(tree.location, tree.name, tree.functionKind, tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body);
            }
            exportValue = tree;
            break;
          }
        case CLASS:
          {
            if (!this.options_.classes) {
              return this.parseSyntaxError_('Unexpected reserved word');
            }
            var tree$__22 = this.parseClassExpression_();
            if (tree$__22.name) {
              tree$__22 = new ClassDeclaration(tree$__22.location, tree$__22.name, tree$__22.superClass, tree$__22.elements, tree$__22.annotations, tree$__22.typeParameters);
            }
            exportValue = tree$__22;
            break;
          }
        default:
          exportValue = this.parseAssignmentExpression_(ALLOW_IN);
          this.eatPossibleImplicitSemiColon_();
      }
      return new ExportDefault(this.getTreeLocation_(start), exportValue);
    },
    parseNamedExport_: function() {
      var start = this.getTreeStartLocation_();
      var exportClause,
          moduleSpecifier = null;
      switch (peekType()) {
        case OPEN_CURLY:
          exportClause = this.parseExportSpecifierSet_();
          if (this.peekPredefinedString_(FROM)) {
            this.eatId_(FROM);
            moduleSpecifier = this.parseModuleSpecifier_();
          } else {
            this.validateExportSpecifierSet_(exportClause);
          }
          break;
        case STAR:
          exportClause = this.parseExportStar_();
          this.eatId_(FROM);
          moduleSpecifier = this.parseModuleSpecifier_();
          break;
        default:
          exportClause = this.parseForwardDefaultExport_();
          this.eatId_(FROM);
          moduleSpecifier = this.parseModuleSpecifier_();
          break;
      }
      this.eatPossibleImplicitSemiColon_();
      return new NamedExport(this.getTreeLocation_(start), exportClause, moduleSpecifier);
    },
    parseExportStar_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(STAR);
      if (this.peekPredefinedString_(AS)) {
        this.eatId_(AS);
        var name = this.eatIdName_();
        return new NameSpaceExport(this.getTreeLocation_(start), name);
      }
      return new ExportStar(this.getTreeLocation_(start));
    },
    parseExportSpecifierSet_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(OPEN_CURLY);
      var specifiers = [this.parseExportSpecifier_()];
      while (this.eatIf_(COMMA)) {
        if (peek(CLOSE_CURLY))
          break;
        specifiers.push(this.parseExportSpecifier_());
      }
      this.eat_(CLOSE_CURLY);
      return new ExportSpecifierSet(this.getTreeLocation_(start), specifiers);
    },
    parseExportSpecifier_: function() {
      var start = this.getTreeStartLocation_();
      var lhs = this.eatIdName_();
      var rhs = null;
      if (this.peekPredefinedString_(AS)) {
        this.eatId_();
        rhs = this.eatIdName_();
      }
      return new ExportSpecifier(this.getTreeLocation_(start), lhs, rhs);
    },
    parseForwardDefaultExport_: function() {
      var start = this.getTreeStartLocation_();
      var idName = this.eatIdName_();
      return new ForwardDefaultExport(this.getTreeLocation_(start), idName);
    },
    validateExportSpecifierSet_: function(tree) {
      for (var i = 0; i < tree.specifiers.length; i++) {
        var specifier = tree.specifiers[i];
        if (getKeywordType(specifier.lhs.value)) {
          this.reportError_(specifier.lhs.location, ("Unexpected token " + specifier.lhs.value));
        }
      }
    },
    peekId_: function(type) {
      if (type === IDENTIFIER)
        return true;
      if (this.strictMode_)
        return false;
      return peekToken().isStrictKeyword();
    },
    peekIdName_: function(token) {
      return token.type === IDENTIFIER || token.isKeyword();
    },
    parseClassShared_: function(constr) {
      var start = this.getTreeStartLocation_();
      var strictMode = this.strictMode_;
      this.strictMode_ = true;
      this.eat_(CLASS);
      var name = null;
      var typeParameters = null;
      var annotations = [];
      if (constr === ClassDeclaration || !peek(EXTENDS) && !peek(OPEN_CURLY)) {
        name = this.parseBindingIdentifier_();
        if (this.options_.types) {
          typeParameters = this.parseTypeParametersOpt_();
        }
        annotations = this.popAnnotations_();
      }
      var superClass = null;
      if (this.eatIf_(EXTENDS)) {
        superClass = this.parseLeftHandSideExpression_();
        superClass = this.coverFormalsToParenExpression_(superClass);
      }
      this.eat_(OPEN_CURLY);
      var elements = this.parseClassElements_(superClass);
      this.eat_(CLOSE_CURLY);
      this.strictMode_ = strictMode;
      return new constr(this.getTreeLocation_(start), name, superClass, elements, annotations, typeParameters);
    },
    parseClassDeclaration_: function() {
      return this.parseClassShared_(ClassDeclaration);
    },
    parseClassExpression_: function() {
      return this.parseClassShared_(ClassExpression);
    },
    parseClassElements_: function(derivedClass) {
      var result = [];
      while (true) {
        var type = peekType();
        if (type === SEMI_COLON) {
          nextToken();
        } else if (this.peekClassElement_(peekType())) {
          result.push(this.parseClassElement_(derivedClass));
        } else {
          break;
        }
      }
      return result;
    },
    peekClassElement_: function(type) {
      return this.peekPropertyName_(type) || type === STAR && this.options_.generators || type === AT && this.options_.annotations;
    },
    parsePropertyName_: function() {
      if (peek(OPEN_SQUARE))
        return this.parseComputedPropertyName_();
      return this.parseLiteralPropertyName_();
    },
    parseLiteralPropertyName_: function() {
      var start = this.getTreeStartLocation_();
      var token = nextToken();
      return new LiteralPropertyName(this.getTreeLocation_(start), token);
    },
    parseComputedPropertyName_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(OPEN_SQUARE);
      var expression = this.parseAssignmentExpression_(ALLOW_IN);
      this.eat_(CLOSE_SQUARE);
      return new ComputedPropertyName(this.getTreeLocation_(start), expression);
    },
    parseStatement: function() {
      var fs = this.pushFunctionState_(FUNCTION_STATE_LENIENT);
      var result = this.parseModuleItem_(peekType());
      this.popFunctionState_(fs);
      return result;
    },
    parseStatements: function() {
      var fs = this.pushFunctionState_(FUNCTION_STATE_LENIENT);
      var result = this.parseModuleItemList_();
      this.popFunctionState_(fs);
      return result;
    },
    parseStatement_: function() {
      return this.parseStatementWithType_(peekType());
    },
    parseStatementWithType_: function(type) {
      switch (type) {
        case RETURN:
          return this.parseReturnStatement_();
        case VAR:
          return this.parseVariableStatement_();
        case IF:
          return this.parseIfStatement_();
        case FOR:
          return this.parseForStatement_();
        case BREAK:
          return this.parseBreakStatement_();
        case SWITCH:
          return this.parseSwitchStatement_();
        case THROW:
          return this.parseThrowStatement_();
        case WHILE:
          return this.parseWhileStatement_();
        case AT:
          if (this.options_.annotations)
            return this.parseAnnotatedDeclarations_(false);
          break;
        case CONTINUE:
          return this.parseContinueStatement_();
        case DEBUGGER:
          return this.parseDebuggerStatement_();
        case DO:
          return this.parseDoWhileStatement_();
        case OPEN_CURLY:
          return this.parseBlock_();
        case SEMI_COLON:
          return this.parseEmptyStatement_();
        case TRY:
          return this.parseTryStatement_();
        case WITH:
          return this.parseWithStatement_();
        case INTERFACE:
          if (this.options_.types) {
            return this.parseInterfaceDeclaration_();
          }
      }
      return this.parseFallThroughStatement_();
    },
    parseFunctionDeclaration_: function() {
      return this.parseFunction_(FunctionDeclaration);
    },
    parseFunctionExpression_: function() {
      return this.parseFunction_(FunctionExpression);
    },
    parseAsyncFunctionDeclaration_: function(asyncToken) {
      return this.parseAsyncFunction_(asyncToken, FunctionDeclaration);
    },
    parseAsyncFunctionExpression_: function(asyncToken) {
      return this.parseAsyncFunction_(asyncToken, FunctionExpression);
    },
    peekAsyncStar_: function() {
      return this.options_.asyncGenerators && peek(STAR);
    },
    parseAsyncFunction_: function(asyncToken, ctor) {
      var start = asyncToken.location.start;
      this.eat_(FUNCTION);
      var kind = FUNCTION_STATE_FUNCTION | FUNCTION_STATE_ASYNC;
      if (this.peekAsyncStar_()) {
        kind |= FUNCTION_STATE_GENERATOR;
        this.eat_(STAR);
        asyncToken = new IdentifierToken(asyncToken.location, ASYNC_STAR);
      }
      var fs = this.pushFunctionState_(kind);
      var f = this.parseFunction2_(start, asyncToken, ctor);
      this.popFunctionState_(fs);
      return f;
    },
    parseFunction_: function(ctor) {
      var start = this.getTreeStartLocation_();
      this.eat_(FUNCTION);
      var functionKind = null;
      var kind = FUNCTION_STATE_FUNCTION;
      if (this.options_.generators && peek(STAR)) {
        functionKind = this.eat_(STAR);
        kind |= FUNCTION_STATE_GENERATOR;
      }
      var fs = this.pushFunctionState_(kind);
      var f = this.parseFunction2_(start, functionKind, ctor);
      this.popFunctionState_(fs);
      return f;
    },
    parseFunction2_: function(start, functionKind, ctor) {
      var name = null;
      var annotations = [];
      if (ctor === FunctionDeclaration || this.peekBindingIdentifier_(peekType())) {
        name = this.parseBindingIdentifier_();
        annotations = this.popAnnotations_();
      }
      this.eat_(OPEN_PAREN);
      var parameters = this.parseFormalParameters_();
      this.eat_(CLOSE_PAREN);
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      var body = this.parseFunctionBody_(parameters);
      return new ctor(this.getTreeLocation_(start), name, functionKind, parameters, typeAnnotation, annotations, body);
    },
    peekRest_: function(type) {
      return type === DOT_DOT_DOT && this.options_.restParameters;
    },
    parseFormalParameters_: function() {
      var start = this.getTreeStartLocation_();
      var formals = [];
      this.pushAnnotations_();
      var type = peekType();
      if (this.peekRest_(type)) {
        formals.push(this.parseFormalRestParameter_());
      } else {
        if (this.peekFormalParameter_(peekType()))
          formals.push(this.parseFormalParameter_(INITIALIZER_OPTIONAL));
        while (this.eatIf_(COMMA)) {
          this.pushAnnotations_();
          if (this.peekRest_(peekType())) {
            formals.push(this.parseFormalRestParameter_());
            break;
          }
          formals.push(this.parseFormalParameter_(INITIALIZER_OPTIONAL));
        }
      }
      return new FormalParameterList(this.getTreeLocation_(start), formals);
    },
    peekFormalParameter_: function(type) {
      return this.peekBindingElement_(type);
    },
    parseFormalParameter_: function(initializerAllowed) {
      var start = this.getTreeStartLocation_();
      var binding = this.parseBindingElementBinding_();
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      var initializer = this.parseBindingElementInitializer_(initializerAllowed);
      return new FormalParameter(this.getTreeLocation_(start), new BindingElement(this.getTreeLocation_(start), binding, initializer), typeAnnotation, this.popAnnotations_());
    },
    parseFormalRestParameter_: function() {
      var start = this.getTreeStartLocation_();
      var restParameter = this.parseRestParameter_();
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      return new FormalParameter(this.getTreeLocation_(start), restParameter, typeAnnotation, this.popAnnotations_());
    },
    parseRestParameter_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(DOT_DOT_DOT);
      var id = this.parseBindingIdentifier_();
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      return new RestParameter(this.getTreeLocation_(start), id, typeAnnotation);
    },
    parseFunctionBody_: function(params) {
      var start = this.getTreeStartLocation_();
      this.eat_(OPEN_CURLY);
      var strictMode = this.strictMode_;
      var result = this.parseStatementList_(!strictMode);
      validateParameters(params, this.strictMode_, this.errorReporter_);
      this.strictMode_ = strictMode;
      this.eat_(CLOSE_CURLY);
      return new FunctionBody(this.getTreeLocation_(start), result);
    },
    parseSpreadExpression_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(DOT_DOT_DOT);
      var operand = this.parseAssignmentExpression_(ALLOW_IN);
      return new SpreadExpression(this.getTreeLocation_(start), operand);
    },
    parseBlock_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(OPEN_CURLY);
      var result = this.parseStatementList_(false);
      this.eat_(CLOSE_CURLY);
      return new Block(this.getTreeLocation_(start), result);
    },
    parseVariableStatement_: function() {
      var start = this.getTreeStartLocation_();
      var declarations = this.parseVariableDeclarationList_(ALLOW_IN, INITIALIZER_REQUIRED);
      this.checkInitializers_(declarations);
      this.eatPossibleImplicitSemiColon_();
      return new VariableStatement(this.getTreeLocation_(start), declarations);
    },
    parseVariableDeclarationList_: function(allowIn, initializerRequired) {
      var type = peekType();
      switch (type) {
        case CONST:
        case LET:
        case VAR:
          nextToken();
          break;
        default:
          throw Error('unreachable');
      }
      var start = this.getTreeStartLocation_();
      var declarations = [];
      declarations.push(this.parseVariableDeclaration_(type, allowIn, initializerRequired));
      while (this.eatIf_(COMMA)) {
        declarations.push(this.parseVariableDeclaration_(type, allowIn, initializerRequired));
      }
      return new VariableDeclarationList(this.getTreeLocation_(start), type, declarations);
    },
    parseVariableDeclaration_: function(binding, noIn, initializerRequired) {
      var initRequired = initializerRequired !== INITIALIZER_OPTIONAL;
      var start = this.getTreeStartLocation_();
      var lvalue;
      var typeAnnotation;
      if (this.peekPattern_(peekType())) {
        lvalue = this.parseBindingPattern_();
        typeAnnotation = null;
      } else {
        lvalue = this.parseBindingIdentifier_();
        typeAnnotation = this.parseTypeAnnotationOpt_();
      }
      var init = null;
      if (peek(EQUAL)) {
        init = this.parseInitializer_(noIn);
      } else if (lvalue.isPattern() && initRequired) {
        this.reportError_(lvalue.location, 'destructuring must have an initializer');
      }
      return new VariableDeclaration(this.getTreeLocation_(start), lvalue, typeAnnotation, init);
    },
    parseInitializer_: function(allowIn) {
      this.eat_(EQUAL);
      return this.parseAssignmentExpression_(allowIn);
    },
    parseInitializerOpt_: function(allowIn) {
      if (this.eatIf_(EQUAL))
        return this.parseAssignmentExpression_(allowIn);
      return null;
    },
    parseEmptyStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(SEMI_COLON);
      return new EmptyStatement(this.getTreeLocation_(start));
    },
    parseFallThroughStatement_: function() {
      var start = this.getTreeStartLocation_();
      var expression;
      switch (peekType()) {
        case OPEN_CURLY:
          return this.parseUnexpectedToken_();
        case FUNCTION:
        case CLASS:
          return this.parseUnexpectedReservedWord_(peekToken());
        case LET:
          {
            var token = peekLookahead(OPEN_SQUARE);
            if (token) {
              return this.parseSyntaxError_("A statement cannot start with 'let ['");
            }
          }
      }
      if (this.options_.asyncFunctions && this.peekPredefinedString_(ASYNC) && peekLookahead(FUNCTION)) {
        var asyncToken = this.eatId_();
        var functionToken = peekTokenNoLineTerminator();
        if (functionToken !== null)
          return this.parseAsyncFunctionDeclaration_(asyncToken);
        expression = new IdentifierExpression(this.getTreeLocation_(start), asyncToken);
      } else {
        expression = this.parseExpression_(ALLOW_IN);
      }
      if (expression.type === IDENTIFIER_EXPRESSION) {
        if (this.eatIf_(COLON)) {
          var nameToken = expression.identifierToken;
          var statement = this.parseStatement_();
          return new LabelledStatement(this.getTreeLocation_(start), nameToken, statement);
        }
      }
      this.eatPossibleImplicitSemiColon_();
      return new ExpressionStatement(this.getTreeLocation_(start), expression);
    },
    parseIfStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(IF);
      this.eat_(OPEN_PAREN);
      var condition = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      var ifClause = this.parseStatement_();
      var elseClause = null;
      if (this.eatIf_(ELSE)) {
        elseClause = this.parseStatement_();
      }
      return new IfStatement(this.getTreeLocation_(start), condition, ifClause, elseClause);
    },
    parseDoWhileStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(DO);
      var body = this.parseStatement_();
      this.eat_(WHILE);
      this.eat_(OPEN_PAREN);
      var condition = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      this.eatPossibleImplicitSemiColon_();
      return new DoWhileStatement(this.getTreeLocation_(start), body, condition);
    },
    parseWhileStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(WHILE);
      this.eat_(OPEN_PAREN);
      var condition = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      var body = this.parseStatement_();
      return new WhileStatement(this.getTreeLocation_(start), condition, body);
    },
    parseForStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(FOR);
      this.eat_(OPEN_PAREN);
      var type = peekType();
      if (this.peekVariableDeclarationList_(type)) {
        var variables = this.parseVariableDeclarationList_(NO_IN, INITIALIZER_OPTIONAL);
        var declarations = variables.declarations;
        if (declarations.length > 1 || containsInitializer(declarations)) {
          return this.parseForStatement2_(start, variables);
        }
        type = peekType();
        if (type === IN) {
          return this.parseForInStatement_(start, variables);
        } else if (this.peekOf_()) {
          return this.parseForOfStatement_(start, variables);
        } else if (this.allowForOn_ && this.peekOn_()) {
          return this.parseForOnStatement_(start, variables);
        } else {
          this.checkInitializers_(variables);
          return this.parseForStatement2_(start, variables);
        }
      }
      if (type === SEMI_COLON) {
        return this.parseForStatement2_(start, null);
      }
      var coverInitializedNameCount = this.coverInitializedNameCount_;
      var initializer = this.parseExpressionAllowPattern_(NO_IN);
      type = peekType();
      if ((type === IN || this.peekOf_() || this.allowForOn_ && this.peekOn_())) {
        initializer = this.transformLeftHandSideExpression_(initializer);
        this.validateAssignmentTarget_(initializer, 'assignment');
        if (this.peekOf_()) {
          return this.parseForOfStatement_(start, initializer);
        } else if (this.allowForOn_ && this.peekOn_()) {
          return this.parseForOnStatement_(start, initializer);
        }
        return this.parseForInStatement_(start, initializer);
      }
      this.ensureNoCoverInitializedNames_(initializer, coverInitializedNameCount);
      return this.parseForStatement2_(start, initializer);
    },
    peekOf_: function() {
      return this.options_.forOf && this.peekPredefinedString_(OF);
    },
    peekOn_: function() {
      return this.options_.forOn && this.peekPredefinedString_(ON);
    },
    parseForOfStatement_: function(start, initializer) {
      this.eatId_();
      var collection = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      var body = this.parseStatement_();
      return new ForOfStatement(this.getTreeLocation_(start), initializer, collection, body);
    },
    parseForOnStatement_: function(start, initializer) {
      this.eatId_();
      var observable = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      var body = this.parseStatement_();
      return new ForOnStatement(this.getTreeLocation_(start), initializer, observable, body);
    },
    checkInitializers_: function(variables) {
      if (this.options_.blockBinding && variables.declarationType === CONST) {
        var type = variables.declarationType;
        for (var i = 0; i < variables.declarations.length; i++) {
          if (!this.checkInitializer_(type, variables.declarations[i])) {
            break;
          }
        }
      }
    },
    checkInitializer_: function(type, declaration) {
      if (this.options_.blockBinding && type === CONST && declaration.initializer === null) {
        this.reportError_(declaration.location, 'const variables must have an initializer');
        return false;
      }
      return true;
    },
    peekVariableDeclarationList_: function(type) {
      switch (type) {
        case VAR:
          return true;
        case CONST:
        case LET:
          return this.options_.blockBinding;
        default:
          return false;
      }
    },
    parseForStatement2_: function(start, initializer) {
      this.eat_(SEMI_COLON);
      var condition = null;
      if (!peek(SEMI_COLON)) {
        condition = this.parseExpression_(ALLOW_IN);
      }
      this.eat_(SEMI_COLON);
      var increment = null;
      if (!peek(CLOSE_PAREN)) {
        increment = this.parseExpression_(ALLOW_IN);
      }
      this.eat_(CLOSE_PAREN);
      var body = this.parseStatement_();
      return new ForStatement(this.getTreeLocation_(start), initializer, condition, increment, body);
    },
    parseForInStatement_: function(start, initializer) {
      this.eat_(IN);
      var collection = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      var body = this.parseStatement_();
      return new ForInStatement(this.getTreeLocation_(start), initializer, collection, body);
    },
    parseContinueStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(CONTINUE);
      var name = null;
      if (!this.peekImplicitSemiColon_()) {
        name = this.eatIdOpt_();
      }
      this.eatPossibleImplicitSemiColon_();
      return new ContinueStatement(this.getTreeLocation_(start), name);
    },
    parseBreakStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(BREAK);
      var name = null;
      if (!this.peekImplicitSemiColon_()) {
        name = this.eatIdOpt_();
      }
      this.eatPossibleImplicitSemiColon_();
      return new BreakStatement(this.getTreeLocation_(start), name);
    },
    parseReturnStatement_: function() {
      var start = this.getTreeStartLocation_();
      var returnToken = this.eat_(RETURN);
      if (this.functionState_.isTopMost()) {
        this.reportError_(returnToken.location, 'Illegal return statement');
      }
      var expression = null;
      if (!this.peekImplicitSemiColon_()) {
        expression = this.parseExpression_(ALLOW_IN);
      }
      this.eatPossibleImplicitSemiColon_();
      return new ReturnStatement(this.getTreeLocation_(start), expression);
    },
    parseYieldExpression_: function(allowIn) {
      var start = this.getTreeStartLocation_();
      this.eat_(YIELD);
      var expression = null;
      var isYieldFor = false;
      var token = peekTokenNoLineTerminator();
      if (token !== null) {
        switch (token.type) {
          case CLOSE_CURLY:
          case CLOSE_PAREN:
          case CLOSE_SQUARE:
          case COLON:
          case COMMA:
          case END_OF_FILE:
          case SEMI_COLON:
            break;
          default:
            isYieldFor = this.eatIf_(STAR);
            expression = this.parseAssignmentExpression_(allowIn);
        }
      }
      return new YieldExpression(this.getTreeLocation_(start), expression, isYieldFor);
    },
    parseWithStatement_: function() {
      var start = this.getTreeStartLocation_();
      var withToken = this.eat_(WITH);
      if (this.strictMode_) {
        this.reportError_(withToken.location, 'Strict mode code may not include a with statement');
      }
      this.eat_(OPEN_PAREN);
      var expression = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      var body = this.parseStatement_();
      return new WithStatement(this.getTreeLocation_(start), expression, body);
    },
    parseSwitchStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(SWITCH);
      this.eat_(OPEN_PAREN);
      var expression = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      this.eat_(OPEN_CURLY);
      var caseClauses = this.parseCaseClauses_();
      this.eat_(CLOSE_CURLY);
      return new SwitchStatement(this.getTreeLocation_(start), expression, caseClauses);
    },
    parseCaseClauses_: function() {
      var foundDefaultClause = false;
      var result = [];
      while (true) {
        var start = this.getTreeStartLocation_();
        switch (peekType()) {
          case CASE:
            {
              nextToken();
              var expression = this.parseExpression_(ALLOW_IN);
              this.eat_(COLON);
              var statements = this.parseCaseStatementsOpt_();
              result.push(new CaseClause(this.getTreeLocation_(start), expression, statements));
              break;
            }
          case DEFAULT:
            {
              var defaultToken = nextToken();
              if (foundDefaultClause) {
                this.reportError_(defaultToken.location, 'Switch statements may have at most one \'default\' clause');
              } else {
                foundDefaultClause = true;
              }
              this.eat_(COLON);
              result.push(new DefaultClause(this.getTreeLocation_(start), this.parseCaseStatementsOpt_()));
              break;
            }
          default:
            return result;
        }
      }
    },
    parseCaseStatementsOpt_: function() {
      var result = [];
      var type;
      while (true) {
        switch (type = peekType()) {
          case CASE:
          case DEFAULT:
          case CLOSE_CURLY:
          case END_OF_FILE:
            return result;
        }
        result.push(this.parseStatementListItem_(type));
      }
    },
    parseThrowStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(THROW);
      var value = null;
      if (!this.peekImplicitSemiColon_()) {
        value = this.parseExpression_(ALLOW_IN);
      }
      this.eatPossibleImplicitSemiColon_();
      return new ThrowStatement(this.getTreeLocation_(start), value);
    },
    parseTryStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(TRY);
      var body = this.parseBlock_();
      var catchBlock = null;
      if (peek(CATCH)) {
        catchBlock = this.parseCatch_();
      }
      var finallyBlock = null;
      if (peek(FINALLY)) {
        finallyBlock = this.parseFinallyBlock_();
      }
      if (catchBlock === null && finallyBlock === null) {
        var token = peekToken();
        this.reportError_(token.location, "'catch' or 'finally' expected.");
      }
      return new TryStatement(this.getTreeLocation_(start), body, catchBlock, finallyBlock);
    },
    parseCatch_: function() {
      var start = this.getTreeStartLocation_();
      var catchBlock;
      this.eat_(CATCH);
      this.eat_(OPEN_PAREN);
      var binding;
      if (this.peekPattern_(peekType()))
        binding = this.parseBindingPattern_();
      else
        binding = this.parseBindingIdentifier_();
      this.eat_(CLOSE_PAREN);
      var catchBody = this.parseBlock_();
      catchBlock = new Catch(this.getTreeLocation_(start), binding, catchBody);
      return catchBlock;
    },
    parseFinallyBlock_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(FINALLY);
      var finallyBlock = this.parseBlock_();
      return new Finally(this.getTreeLocation_(start), finallyBlock);
    },
    parseDebuggerStatement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(DEBUGGER);
      this.eatPossibleImplicitSemiColon_();
      return new DebuggerStatement(this.getTreeLocation_(start));
    },
    parsePrimaryExpression_: function() {
      switch (peekType()) {
        case CLASS:
          return this.options_.classes ? this.parseClassExpression_() : this.parseUnexpectedReservedWord_(peekToken());
        case THIS:
          return this.parseThisExpression_();
        case IDENTIFIER:
          {
            var identifier = this.parseIdentifierExpression_();
            if (this.options_.asyncFunctions && identifier.identifierToken.value === ASYNC) {
              var token$__23 = peekTokenNoLineTerminator();
              if (token$__23 && token$__23.type === FUNCTION) {
                var asyncToken = identifier.identifierToken;
                return this.parseAsyncFunctionExpression_(asyncToken);
              }
            }
            return identifier;
          }
        case NUMBER:
        case STRING:
        case TRUE:
        case FALSE:
        case NULL:
          return this.parseLiteralExpression_();
        case OPEN_SQUARE:
          return this.parseArrayLiteral_();
        case OPEN_CURLY:
          return this.parseObjectLiteral_();
        case OPEN_PAREN:
          return this.parsePrimaryExpressionStartingWithParen_();
        case SLASH:
        case SLASH_EQUAL:
          return this.parseRegularExpressionLiteral_();
        case NO_SUBSTITUTION_TEMPLATE:
        case TEMPLATE_HEAD:
          if (this.options_.templateLiterals) {
            return this.parseTemplateLiteral_(null);
          }
          break;
        case IMPLEMENTS:
        case INTERFACE:
        case PACKAGE:
        case PRIVATE:
        case PROTECTED:
        case PUBLIC:
        case STATIC:
        case YIELD:
          if (this.strictMode_) {
            this.reportReservedIdentifier_(nextToken());
          }
          return this.parseIdentifierExpression_();
        case OPEN_ANGLE:
          if (this.options_.jsx) {
            return this.parseJsxElement_();
          }
          break;
        case END_OF_FILE:
          return this.parseSyntaxError_('Unexpected end of input');
      }
      var token = peekToken();
      if (token.isKeyword()) {
        return this.parseUnexpectedReservedWord_(token);
      }
      return this.parseUnexpectedToken_(token);
    },
    parseSuperExpression_: function(isNew) {
      var start = this.getTreeStartLocation_();
      var fs = this.functionState_;
      while (fs && fs.isArrowFunction()) {
        fs = fs.outer;
      }
      var superToken = this.eat_(SUPER);
      if (!fs || !fs.isMethod()) {
        this.reportError_(superToken.location, 'super is only allowed in methods');
      }
      var operand = new SuperExpression(this.getTreeLocation_(start));
      var type = peekType();
      if (isNew) {
        if (type === OPEN_SQUARE) {
          return this.parseMemberLookupExpression_(start, operand);
        }
        return this.parseMemberExpression_(start, operand);
      }
      switch (type) {
        case OPEN_SQUARE:
          return this.parseMemberLookupExpression_(start, operand);
        case PERIOD:
          return this.parseMemberExpression_(start, operand);
        case OPEN_PAREN:
          {
            var superCall = this.parseCallExpression_(start, operand);
            if (!fs.isDerivedConstructor()) {
              this.reportError_(superToken.location, 'super call is only allowed in derived constructor');
            }
            return superCall;
          }
      }
      return this.parseUnexpectedToken_();
    },
    parseThisExpression_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(THIS);
      return new ThisExpression(this.getTreeLocation_(start));
    },
    peekBindingIdentifier_: function(type) {
      return this.peekId_(type);
    },
    parseBindingIdentifier_: function() {
      var start = this.getTreeStartLocation_();
      var identifier = this.eatId_();
      return new BindingIdentifier(this.getTreeLocation_(start), identifier);
    },
    parseIdentifierExpression_: function() {
      var start = this.getTreeStartLocation_();
      var identifier = this.eatId_();
      return new IdentifierExpression(this.getTreeLocation_(start), identifier);
    },
    parseIdentifierNameExpression_: function() {
      var start = this.getTreeStartLocation_();
      var identifier = this.eatIdName_();
      return new IdentifierExpression(this.getTreeLocation_(start), identifier);
    },
    parseLiteralExpression_: function() {
      var start = this.getTreeStartLocation_();
      var literal = this.nextLiteralToken_();
      return new LiteralExpression(this.getTreeLocation_(start), literal);
    },
    nextLiteralToken_: function() {
      return nextToken();
    },
    parseRegularExpressionLiteral_: function() {
      var start = this.getTreeStartLocation_();
      var literal = nextRegularExpressionLiteralToken();
      return new LiteralExpression(this.getTreeLocation_(start), literal);
    },
    peekSpread_: function(type) {
      return type === DOT_DOT_DOT && this.options_.spread;
    },
    parseArrayLiteral_: function() {
      var start = this.getTreeStartLocation_();
      var expression;
      var elements = [];
      this.eat_(OPEN_SQUARE);
      var type = peekType();
      if (type === FOR && this.options_.arrayComprehension)
        return this.parseArrayComprehension_(start);
      while (true) {
        type = peekType();
        if (type === COMMA) {
          expression = null;
        } else if (this.peekSpread_(type)) {
          expression = this.parseSpreadExpression_();
        } else if (type === CLOSE_SQUARE || type === END_OF_FILE) {
          break;
        } else {
          expression = this.parseAssignmentExpression_(ALLOW_IN);
        }
        elements.push(expression);
        type = peekType();
        if (type !== CLOSE_SQUARE)
          this.eat_(COMMA);
      }
      this.eat_(CLOSE_SQUARE);
      return new ArrayLiteral(this.getTreeLocation_(start), elements);
    },
    parseArrayComprehension_: function(start) {
      var list = this.parseComprehensionList_();
      var expression = this.parseAssignmentExpression_(ALLOW_IN);
      this.eat_(CLOSE_SQUARE);
      return new ArrayComprehension(this.getTreeLocation_(start), list, expression);
    },
    parseComprehensionList_: function() {
      var list = [this.parseComprehensionFor_()];
      while (true) {
        var type = peekType();
        switch (type) {
          case FOR:
            list.push(this.parseComprehensionFor_());
            break;
          case IF:
            list.push(this.parseComprehensionIf_());
            break;
          default:
            return list;
        }
      }
    },
    parseComprehensionFor_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(FOR);
      this.eat_(OPEN_PAREN);
      var left = this.parseForBinding_();
      this.eatId_(OF);
      var iterator = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      return new ComprehensionFor(this.getTreeLocation_(start), left, iterator);
    },
    parseComprehensionIf_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(IF);
      this.eat_(OPEN_PAREN);
      var expression = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      return new ComprehensionIf(this.getTreeLocation_(start), expression);
    },
    parseObjectLiteral_: function() {
      var start = this.getTreeStartLocation_();
      var result = [];
      this.eat_(OPEN_CURLY);
      while (this.peekPropertyDefinition_(peekType())) {
        var propertyDefinition = this.parsePropertyDefinition_();
        result.push(propertyDefinition);
        if (!this.eatIf_(COMMA))
          break;
      }
      this.eat_(CLOSE_CURLY);
      return new ObjectLiteral(this.getTreeLocation_(start), result);
    },
    parsePropertyDefinition: function() {
      var fs = this.pushFunctionState_(FUNCTION_STATE_SCRIPT);
      var result = this.parsePropertyDefinition_();
      this.popFunctionState_(fs);
      return result;
    },
    parsePropertyDefinition_: function() {
      var start = this.getTreeStartLocation_();
      var functionKind = null;
      var isStatic = false;
      if (this.options_.generators && this.options_.propertyMethods && peek(STAR)) {
        var fs = this.pushFunctionState_(FUNCTION_STATE_METHOD | FUNCTION_STATE_GENERATOR);
        var m = this.parseGeneratorMethod_(start, isStatic, []);
        this.popFunctionState_(fs);
        return m;
      }
      if (this.options_.spreadProperties && peek(DOT_DOT_DOT)) {
        return this.parseSpreadExpression_();
      }
      var token = peekToken();
      var name = this.parsePropertyName_();
      if (this.options_.propertyMethods && peek(OPEN_PAREN)) {
        var fs$__24 = this.pushFunctionState_(FUNCTION_STATE_METHOD);
        var m$__25 = this.parseMethod_(start, isStatic, functionKind, name, []);
        this.popFunctionState_(fs$__24);
        return m$__25;
      }
      if (this.eatIf_(COLON)) {
        var value = this.parseAssignmentExpression_(ALLOW_IN);
        return new PropertyNameAssignment(this.getTreeLocation_(start), name, value);
      }
      var type = peekType();
      if (name.type === LITERAL_PROPERTY_NAME) {
        var nameLiteral = name.literalToken;
        if (nameLiteral.value === GET && this.peekPropertyName_(type)) {
          return this.parseGetAccessor_(start, isStatic, []);
        }
        if (nameLiteral.value === SET && this.peekPropertyName_(type)) {
          return this.parseSetAccessor_(start, isStatic, []);
        }
        if (this.options_.asyncFunctions && nameLiteral.value === ASYNC && (this.peekPropertyName_(type) || this.peekAsyncStar_())) {
          var async = nameLiteral;
          var kind = FUNCTION_STATE_METHOD | FUNCTION_STATE_ASYNC;
          if (this.peekAsyncStar_()) {
            kind |= FUNCTION_STATE_GENERATOR;
            this.eat_(STAR);
            async = new IdentifierToken(async.location, ASYNC_STAR);
          }
          var name$__26 = this.parsePropertyName_();
          var fs$__27 = this.pushFunctionState_(kind);
          var m$__28 = this.parseMethod_(start, isStatic, async, name$__26, []);
          this.popFunctionState_(fs$__27);
          return m$__28;
        }
        if (this.options_.propertyNameShorthand && (nameLiteral.type === IDENTIFIER || nameLiteral.isStrictKeyword() && !this.strictMode_ || nameLiteral.type === YIELD && this.allowYield_)) {
          if (peek(EQUAL)) {
            token = nextToken();
            var coverInitializedNameCount = this.coverInitializedNameCount_;
            var expr = this.parseAssignmentExpression_(ALLOW_IN);
            this.ensureNoCoverInitializedNames_(expr, coverInitializedNameCount);
            this.coverInitializedNameCount_++;
            return new CoverInitializedName(this.getTreeLocation_(start), nameLiteral, token, expr);
          }
          return new PropertyNameShorthand(this.getTreeLocation_(start), nameLiteral);
        }
        if (this.strictMode_ && nameLiteral.isStrictKeyword())
          this.reportReservedIdentifier_(nameLiteral);
      }
      if (name.type === COMPUTED_PROPERTY_NAME)
        token = peekToken();
      return this.parseUnexpectedToken_(token);
    },
    parseClassElement_: function(derivedClass) {
      var start = this.getTreeStartLocation_();
      var annotations = this.parseAnnotations_();
      var type = peekType();
      var isStatic = false,
          functionKind = null;
      switch (type) {
        case STATIC:
          {
            var staticToken = nextToken();
            type = peekType();
            switch (type) {
              case OPEN_PAREN:
                {
                  var location = this.getTreeLocation_(start);
                  var name = new LiteralPropertyName(location, staticToken);
                  var fs = this.pushFunctionState_(FUNCTION_STATE_METHOD);
                  var m = this.parseMethod_(start, isStatic, functionKind, name, annotations);
                  this.popFunctionState_(fs);
                  return m;
                }
              default:
                isStatic = true;
                if (type === STAR && this.options_.generators)
                  return this.parseGeneratorMethod_(start, true, annotations);
                return this.parseClassElement2_(start, isStatic, annotations, derivedClass);
            }
            break;
          }
        case STAR:
          return this.parseGeneratorMethod_(start, isStatic, annotations);
        default:
          return this.parseClassElement2_(start, isStatic, annotations, derivedClass);
      }
    },
    parseGeneratorMethod_: function(start, isStatic, annotations) {
      var functionKind = this.eat_(STAR);
      var name = this.parsePropertyName_();
      var fs = this.pushFunctionState_(FUNCTION_STATE_METHOD | FUNCTION_STATE_GENERATOR);
      var m = this.parseMethod_(start, isStatic, functionKind, name, annotations);
      this.popFunctionState_(fs);
      return m;
    },
    parseMethod_: function(start, isStatic, functionKind, name, annotations) {
      this.eat_(OPEN_PAREN);
      var parameterList = this.parseFormalParameters_();
      this.eat_(CLOSE_PAREN);
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      var body = this.parseFunctionBody_(parameterList);
      return new Method(this.getTreeLocation_(start), isStatic, functionKind, name, parameterList, typeAnnotation, annotations, body, null);
    },
    parsePropertyVariableDeclaration_: function(start, isStatic, name, annotations) {
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      var initializer = this.parseInitializerOpt_(ALLOW_IN);
      this.eat_(SEMI_COLON);
      return new PropertyVariableDeclaration(this.getTreeLocation_(start), isStatic, name, typeAnnotation, annotations, initializer);
    },
    parseClassElement2_: function(start, isStatic, annotations, derivedClass) {
      var functionKind = null;
      var name = this.parsePropertyName_();
      var type = peekType();
      if (name.type === LITERAL_PROPERTY_NAME && name.literalToken.value === GET && this.peekPropertyName_(type)) {
        return this.parseGetAccessor_(start, isStatic, annotations);
      }
      if (name.type === LITERAL_PROPERTY_NAME && name.literalToken.value === SET && this.peekPropertyName_(type)) {
        return this.parseSetAccessor_(start, isStatic, annotations);
      }
      if (this.options_.asyncFunctions && name.type === LITERAL_PROPERTY_NAME && name.literalToken.value === ASYNC && (this.peekPropertyName_(type) || this.peekAsyncStar_())) {
        var async = name.literalToken;
        var kind = FUNCTION_STATE_METHOD | FUNCTION_STATE_ASYNC;
        if (this.peekAsyncStar_()) {
          kind |= FUNCTION_STATE_GENERATOR;
          this.eat_(STAR);
          async = new IdentifierToken(async.location, ASYNC_STAR);
        }
        name = this.parsePropertyName_();
        var fs = this.pushFunctionState_(kind);
        var m = this.parseMethod_(start, isStatic, async, name, annotations);
        this.popFunctionState_(fs);
        return m;
      }
      if (!this.options_.memberVariables || type === OPEN_PAREN) {
        var kind$__29 = FUNCTION_STATE_METHOD;
        var isDerivedConstructor = derivedClass && !isStatic && functionKind === null && name.type === LITERAL_PROPERTY_NAME && name.literalToken.value === CONSTRUCTOR;
        if (isDerivedConstructor) {
          kind$__29 |= FUNCTION_STATE_DERIVED_CONSTRUCTOR;
        }
        var fs$__30 = this.pushFunctionState_(kind$__29);
        var m$__31 = this.parseMethod_(start, isStatic, functionKind, name, annotations);
        this.popFunctionState_(fs$__30);
        if (isDerivedConstructor) {
          validateConstructor(m$__31, this.errorReporter_);
        }
        return m$__31;
      }
      return this.parsePropertyVariableDeclaration_(start, isStatic, name, annotations);
    },
    parseGetAccessor_: function(start, isStatic, annotations) {
      var name = this.parsePropertyName_();
      var fs = this.pushFunctionState_(FUNCTION_STATE_METHOD);
      this.eat_(OPEN_PAREN);
      this.eat_(CLOSE_PAREN);
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      var body = this.parseFunctionBody_(null);
      this.popFunctionState_(fs);
      return new GetAccessor(this.getTreeLocation_(start), isStatic, name, typeAnnotation, annotations, body);
    },
    parseSetAccessor_: function(start, isStatic, annotations) {
      var name = this.parsePropertyName_();
      var fs = this.pushFunctionState_(FUNCTION_STATE_METHOD);
      this.eat_(OPEN_PAREN);
      var parameterList = this.parsePropertySetParameterList_();
      this.eat_(CLOSE_PAREN);
      var body = this.parseFunctionBody_(parameterList);
      this.popFunctionState_(fs);
      return new SetAccessor(this.getTreeLocation_(start), isStatic, name, parameterList, annotations, body);
    },
    peekPropertyDefinition_: function(type) {
      return this.peekPropertyName_(type) || type === STAR && this.options_.propertyMethods && this.options_.generators || type === DOT_DOT_DOT && this.options_.spreadProperties;
    },
    peekPropertyName_: function(type) {
      switch (type) {
        case IDENTIFIER:
        case STRING:
        case NUMBER:
          return true;
        case OPEN_SQUARE:
          return this.options_.computedPropertyNames;
        default:
          return peekToken().isKeyword();
      }
    },
    peekPredefinedString_: function(string) {
      var token = peekToken();
      return token.type === IDENTIFIER && token.value === string;
    },
    parsePropertySetParameterList_: function() {
      var start = this.getTreeStartLocation_();
      var binding;
      this.pushAnnotations_();
      if (this.peekPattern_(peekType()))
        binding = this.parseBindingPattern_();
      else
        binding = this.parseBindingIdentifier_();
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      var parameter = new FormalParameter(this.getTreeLocation_(start), new BindingElement(this.getTreeLocation_(start), binding, null), typeAnnotation, this.popAnnotations_());
      return new FormalParameterList(parameter.location, [parameter]);
    },
    parsePrimaryExpressionStartingWithParen_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(OPEN_PAREN);
      if (peek(FOR) && this.options_.generatorComprehension)
        return this.parseGeneratorComprehension_(start);
      return this.parseCoverFormals_(start);
    },
    parseSyntaxError_: function(message) {
      var token = nextToken();
      this.reportError_(token.location, message);
      return new SyntaxErrorTree(token.location, token, message);
    },
    parseUnexpectedToken_: function() {
      var token = arguments[0] !== (void 0) ? arguments[0] : peekToken();
      if (token.type === NO_SUBSTITUTION_TEMPLATE) {
        return this.parseSyntaxError_('Unexpected token `');
      }
      return this.parseSyntaxError_(("Unexpected token " + token));
    },
    parseUnexpectedReservedWord_: function(token) {
      return this.parseSyntaxError_(("Unexpected reserved word " + token));
    },
    parseExpression_: function(allowIn) {
      var coverInitializedNameCount = this.coverInitializedNameCount_;
      var expression = this.parseExpressionAllowPattern_(allowIn);
      this.ensureNoCoverInitializedNames_(expression, coverInitializedNameCount);
      return expression;
    },
    parseExpression: function() {
      var fs = this.pushFunctionState_(FUNCTION_STATE_LENIENT);
      var expression = this.parseExpression_(ALLOW_IN);
      this.popFunctionState_(fs);
      return expression;
    },
    parseExpressionAllowPattern_: function(allowIn) {
      var start = this.getTreeStartLocation_();
      var expression = this.parseAssignmentExpression_(allowIn);
      if (peek(COMMA)) {
        var expressions = [expression];
        while (this.eatIf_(COMMA)) {
          expressions.push(this.parseAssignmentExpression_(allowIn));
        }
        return new CommaExpression(this.getTreeLocation_(start), expressions);
      }
      return expression;
    },
    parseAssignmentExpression_: function(allowIn) {
      if (this.allowYield_ && peek(YIELD))
        return this.parseYieldExpression_(allowIn);
      var start = this.getTreeStartLocation_();
      var validAsyncParen = false;
      if (this.options_.asyncFunctions && this.peekPredefinedString_(ASYNC)) {
        var asyncToken = peekToken();
        var maybeOpenParenToken = peekTokenLookahead();
        validAsyncParen = maybeOpenParenToken.type === OPEN_PAREN && asyncToken.location.end.line === maybeOpenParenToken.location.start.line;
      }
      var left = this.parseConditional_(allowIn);
      var type = peekType();
      if (this.options_.asyncFunctions && left.type === IDENTIFIER_EXPRESSION && left.identifierToken.value === ASYNC && type === IDENTIFIER) {
        if (peekTokenNoLineTerminator() !== null) {
          var bindingIdentifier = this.parseBindingIdentifier_();
          var asyncToken$__32 = left.identifierToken;
          return this.parseArrowFunction_(start, bindingIdentifier, asyncToken$__32);
        }
      }
      if (type === ARROW && peekTokenNoLineTerminator() !== null) {
        if (left.type === COVER_FORMALS || left.type === IDENTIFIER_EXPRESSION)
          return this.parseArrowFunction_(start, left, null);
        if (validAsyncParen && left.type === CALL_EXPRESSION) {
          var asyncToken$__33 = left.operand.identifierToken;
          return this.parseArrowFunction_(start, left.args, asyncToken$__33);
        }
      }
      left = this.coverFormalsToParenExpression_(left);
      if (this.peekAssignmentOperator_(type)) {
        if (type === EQUAL)
          left = this.transformLeftHandSideExpression_(left);
        this.validateAssignmentTarget_(left, 'assignment');
        var operator = nextToken();
        var right = this.parseAssignmentExpression_(allowIn);
        return new BinaryExpression(this.getTreeLocation_(start), left, operator, right);
      }
      return left;
    },
    transformLeftHandSideExpression_: function(tree) {
      switch (tree.type) {
        case ARRAY_LITERAL:
        case OBJECT_LITERAL:
          resetScanner(tree.location.start.offset);
          return this.parseAssignmentPattern_();
      }
      return tree;
    },
    peekAssignmentOperator_: function(type) {
      return isAssignmentOperator(type);
    },
    parseConditional_: function(allowIn) {
      var start = this.getTreeStartLocation_();
      var condition = this.parseBinaryExpression_(allowIn);
      if (this.eatIf_(QUESTION)) {
        condition = this.toPrimaryExpression_(condition);
        var left = this.parseAssignmentExpression_(ALLOW_IN);
        this.eat_(COLON);
        var right = this.parseAssignmentExpression_(allowIn);
        return new ConditionalExpression(this.getTreeLocation_(start), condition, left, right);
      }
      return condition;
    },
    getPrecedence_: function(type, allowIn) {
      switch (type) {
        case OR:
          return 1;
        case AND:
          return 2;
        case BAR:
          return 3;
        case CARET:
          return 4;
        case AMPERSAND:
          return 5;
        case EQUAL_EQUAL:
        case EQUAL_EQUAL_EQUAL:
        case NOT_EQUAL:
        case NOT_EQUAL_EQUAL:
          return 6;
        case CLOSE_ANGLE:
        case GREATER_EQUAL:
        case INSTANCEOF:
        case LESS_EQUAL:
        case OPEN_ANGLE:
          return 7;
        case IN:
          return allowIn ? 7 : 0;
        case LEFT_SHIFT:
        case RIGHT_SHIFT:
        case UNSIGNED_RIGHT_SHIFT:
          return 8;
        case MINUS:
        case PLUS:
          return 9;
        case SLASH:
        case STAR:
        case PERCENT:
          return 10;
        case STAR_STAR:
          return this.options_.exponentiation ? 11 : 0;
        default:
          return 0;
      }
    },
    parseBinaryExpression_: function(allowIn) {
      var start = this.getTreeStartLocation_();
      var left = this.parseUnaryExpression_();
      return this.parseBinaryExpressionHelper_(start, left, -1, allowIn);
    },
    parseBinaryExpressionHelper_: function(start, left, minPrec, allowIn) {
      var type = peekType();
      var prec = this.getPrecedence_(type, allowIn);
      if (prec === 0) {
        return left;
      }
      var leftToRight = type !== STAR_STAR;
      if (leftToRight ? prec > minPrec : prec >= minPrec) {
        var token = nextToken();
        var rightStart = this.getTreeStartLocation_();
        var rightUnary = this.parseUnaryExpression_();
        var right = this.parseBinaryExpressionHelper_(rightStart, rightUnary, prec, allowIn);
        left = this.toPrimaryExpression_(left);
        right = this.toPrimaryExpression_(right);
        var node = new BinaryExpression(this.getTreeLocation_(start), left, token, right);
        return this.parseBinaryExpressionHelper_(start, node, minPrec, allowIn);
      }
      return left;
    },
    parseUnaryExpression_: function() {
      var start = this.getTreeStartLocation_();
      if (this.allowAwait_ && this.peekPredefinedString_(AWAIT)) {
        this.eatId_();
        var operand;
        if (this.allowYield_ && peek(YIELD)) {
          operand = this.parseYieldExpression_(ALLOW_IN);
        } else {
          operand = this.parseUnaryExpression_();
          operand = this.toPrimaryExpression_(operand);
        }
        return new AwaitExpression(this.getTreeLocation_(start), operand);
      }
      if (this.peekUnaryOperator_(peekType())) {
        var operator = nextToken();
        var operand$__34 = this.parseUnaryExpression_();
        operand$__34 = this.toPrimaryExpression_(operand$__34);
        if (operand$__34.type !== SYNTAX_ERROR_TREE) {
          switch (operator.type) {
            case PLUS_PLUS:
            case MINUS_MINUS:
              this.validateAssignmentTarget_(operand$__34, 'prefix operation');
          }
        }
        return new UnaryExpression(this.getTreeLocation_(start), operator, operand$__34);
      }
      return this.parsePostfixExpression_();
    },
    peekUnaryOperator_: function(type) {
      switch (type) {
        case DELETE:
        case VOID:
        case TYPEOF:
        case PLUS_PLUS:
        case MINUS_MINUS:
        case PLUS:
        case MINUS:
        case TILDE:
        case BANG:
          return true;
        default:
          return false;
      }
    },
    parsePostfixExpression_: function() {
      var start = this.getTreeStartLocation_();
      var operand = this.parseLeftHandSideExpression_();
      while (this.peekPostfixOperator_(peekType())) {
        operand = this.toPrimaryExpression_(operand);
        var operator = nextToken();
        this.validateAssignmentTarget_(operand, 'postfix operation');
        operand = new PostfixExpression(this.getTreeLocation_(start), operand, operator);
      }
      return operand;
    },
    peekPostfixOperator_: function(type) {
      switch (type) {
        case PLUS_PLUS:
        case MINUS_MINUS:
          {
            var token = peekTokenNoLineTerminator();
            return token !== null;
          }
      }
      return false;
    },
    parseLeftHandSideExpression_: function() {
      var start = this.getTreeStartLocation_();
      var operand = this.parseNewExpression_();
      if (!(operand instanceof NewExpression) || operand.args !== null) {
        loop: while (true) {
          switch (peekType()) {
            case OPEN_PAREN:
              operand = this.toPrimaryExpression_(operand);
              operand = this.parseCallExpression_(start, operand);
              break;
            case OPEN_SQUARE:
              operand = this.toPrimaryExpression_(operand);
              operand = this.parseMemberLookupExpression_(start, operand);
              break;
            case PERIOD:
              operand = this.toPrimaryExpression_(operand);
              operand = this.parseMemberExpression_(start, operand);
              break;
            case NO_SUBSTITUTION_TEMPLATE:
            case TEMPLATE_HEAD:
              if (!this.options_.templateLiterals)
                break loop;
              operand = this.toPrimaryExpression_(operand);
              if (this.options_.templateLiterals) {
                operand = this.parseTemplateLiteral_(operand);
              }
              break;
            default:
              break loop;
          }
        }
      }
      return operand;
    },
    parseMemberExpressionNoNew_: function() {
      var start = this.getTreeStartLocation_();
      var operand;
      if (peekType() === FUNCTION) {
        operand = this.parseFunctionExpression_();
      } else {
        operand = this.parsePrimaryExpression_();
      }
      loop: while (true) {
        switch (peekType()) {
          case OPEN_SQUARE:
            operand = this.toPrimaryExpression_(operand);
            operand = this.parseMemberLookupExpression_(start, operand);
            break;
          case PERIOD:
            operand = this.toPrimaryExpression_(operand);
            operand = this.parseMemberExpression_(start, operand);
            break;
          case NO_SUBSTITUTION_TEMPLATE:
          case TEMPLATE_HEAD:
            if (!this.options_.templateLiterals)
              break loop;
            operand = this.toPrimaryExpression_(operand);
            operand = this.parseTemplateLiteral_(operand);
            break;
          default:
            break loop;
        }
      }
      return operand;
    },
    parseMemberExpression_: function(start, operand) {
      this.eat_(PERIOD);
      var name = this.eatIdName_();
      return new MemberExpression(this.getTreeLocation_(start), operand, name);
    },
    parseMemberLookupExpression_: function(start, operand) {
      this.eat_(OPEN_SQUARE);
      var member = this.parseExpression_(ALLOW_IN);
      this.eat_(CLOSE_SQUARE);
      return new MemberLookupExpression(this.getTreeLocation_(start), operand, member);
    },
    parseCallExpression_: function(start, operand) {
      var args = this.parseArguments_();
      return new CallExpression(this.getTreeLocation_(start), operand, args);
    },
    parseNewExpression_: function() {
      var operand,
          start;
      switch (peekType()) {
        case NEW:
          {
            start = this.getTreeStartLocation_();
            this.eat_(NEW);
            if (peek(SUPER)) {
              operand = this.parseSuperExpression_(true);
            } else {
              operand = this.toPrimaryExpression_(this.parseNewExpression_());
            }
            var args = null;
            if (peek(OPEN_PAREN)) {
              args = this.parseArguments_();
            }
            return new NewExpression(this.getTreeLocation_(start), operand, args);
          }
        case SUPER:
          return this.parseSuperExpression_(false);
        default:
          return this.parseMemberExpressionNoNew_();
      }
    },
    parseArguments_: function() {
      var start = this.getTreeStartLocation_();
      var args = [];
      this.eat_(OPEN_PAREN);
      if (!peek(CLOSE_PAREN)) {
        args.push(this.parseArgument_());
        while (this.eatIf_(COMMA)) {
          args.push(this.parseArgument_());
        }
      }
      this.eat_(CLOSE_PAREN);
      return new ArgumentList(this.getTreeLocation_(start), args);
    },
    parseArgument_: function() {
      if (this.peekSpread_(peekType()))
        return this.parseSpreadExpression_();
      return this.parseAssignmentExpression_(ALLOW_IN);
    },
    parseArrowFunction_: function(start, tree, asyncToken) {
      var $__20 = this;
      var formals;
      var kind = FUNCTION_STATE_ARROW;
      if (asyncToken && asyncToken.value === ASYNC) {
        kind |= FUNCTION_STATE_ASYNC;
      }
      var fs = this.pushFunctionState_(kind);
      var makeFormals = function(tree) {
        return new FormalParameterList($__20.getTreeLocation_(start), [new FormalParameter(tree.location, new BindingElement(tree.location, tree, null), null, [])]);
      };
      switch (tree.type) {
        case IDENTIFIER_EXPRESSION:
          formals = makeFormals(new BindingIdentifier(tree.location, tree.identifierToken));
          break;
        case BINDING_IDENTIFIER:
          formals = makeFormals(tree);
          break;
        case FORMAL_PARAMETER_LIST:
          formals = tree;
          break;
        default:
          formals = this.toFormalParameters_(start, tree, asyncToken);
      }
      this.eat_(ARROW);
      var body = this.parseConciseBody_(formals);
      this.popFunctionState_(fs);
      return new ArrowFunction(this.getTreeLocation_(start), asyncToken, formals, body);
    },
    parseCoverFormals_: function(start) {
      var expressions = [];
      if (!peek(CLOSE_PAREN)) {
        do {
          var type = peekType();
          if (this.peekRest_(type)) {
            expressions.push(this.parseRestParameter_());
            break;
          } else {
            expressions.push(this.parseAssignmentExpression_(ALLOW_IN));
          }
          if (this.eatIf_(COMMA))
            continue;
        } while (!peek(CLOSE_PAREN) && !isAtEnd());
      }
      this.eat_(CLOSE_PAREN);
      return new CoverFormals(this.getTreeLocation_(start), expressions);
    },
    ensureNoCoverInitializedNames_: function(tree, coverInitializedNameCount) {
      if (coverInitializedNameCount === this.coverInitializedNameCount_)
        return;
      var finder = new ValidateObjectLiteral();
      finder.visitAny(tree);
      if (finder.found) {
        var token = finder.errorToken;
        this.reportError_(token.location, ("Unexpected token " + token));
      }
    },
    toPrimaryExpression_: function(tree) {
      if (tree.type === COVER_FORMALS)
        return this.coverFormalsToParenExpression_(tree);
      return tree;
    },
    validateCoverFormalsAsParenExpression_: function(tree) {
      for (var i = 0; i < tree.expressions.length; i++) {
        if (tree.expressions[i].type === REST_PARAMETER) {
          var token = new Token(DOT_DOT_DOT, tree.expressions[i].location);
          this.reportError_(token.location, ("Unexpected token " + token));
          return;
        }
      }
    },
    coverFormalsToParenExpression_: function(tree) {
      if (tree.type === COVER_FORMALS) {
        var expressions = tree.expressions;
        if (expressions.length === 0) {
          var message = 'Unexpected token )';
          this.reportError_(tree.location, message);
        } else {
          this.validateCoverFormalsAsParenExpression_(tree);
          var expression;
          if (expressions.length > 1)
            expression = new CommaExpression(expressions[0].location, expressions);
          else
            expression = expressions[0];
          return new ParenExpression(tree.location, expression);
        }
      }
      return tree;
    },
    toFormalParameters_: function(start, tree, asyncToken) {
      resetScanner(start.offset);
      return this.parseArrowFormalParameters_(asyncToken);
    },
    parseArrowFormalParameters_: function(asyncToken) {
      if (asyncToken)
        this.eat_(IDENTIFIER);
      this.eat_(OPEN_PAREN);
      var parameters = this.parseFormalParameters_();
      this.eat_(CLOSE_PAREN);
      return parameters;
    },
    peekArrow_: function(type) {
      return type === ARROW && this.options_.arrowFunctions;
    },
    parseConciseBody_: function(params) {
      if (peek(OPEN_CURLY))
        return this.parseFunctionBody_(params);
      validateParameters(params, this.strictMode_, this.errorReporter_);
      return this.parseAssignmentExpression_(ALLOW_IN);
    },
    parseGeneratorComprehension_: function(start) {
      var comprehensionList = this.parseComprehensionList_();
      var expression = this.parseAssignmentExpression_(ALLOW_IN);
      this.eat_(CLOSE_PAREN);
      return new GeneratorComprehension(this.getTreeLocation_(start), comprehensionList, expression);
    },
    parseForBinding_: function() {
      if (this.peekPattern_(peekType()))
        return this.parseBindingPattern_();
      return this.parseBindingIdentifier_();
    },
    peekPattern_: function(type) {
      return this.options_.destructuring && (this.peekObjectPattern_(type) || this.peekArrayPattern_(type));
    },
    peekArrayPattern_: function(type) {
      return type === OPEN_SQUARE;
    },
    peekObjectPattern_: function(type) {
      return type === OPEN_CURLY;
    },
    parseBindingPattern_: function() {
      return this.parsePattern_(true);
    },
    parsePattern_: function(useBinding) {
      if (this.peekArrayPattern_(peekType()))
        return this.parseArrayPattern_(useBinding);
      return this.parseObjectPattern_(useBinding);
    },
    parseArrayBindingPattern_: function() {
      return this.parseArrayPattern_(true);
    },
    parsePatternElement_: function(useBinding) {
      return useBinding ? this.parseBindingElement_() : this.parseAssignmentElement_();
    },
    parsePatternRestElement_: function(useBinding) {
      return useBinding ? this.parseBindingRestElement_() : this.parseAssignmentRestElement_();
    },
    parseArrayPattern_: function(useBinding) {
      var start = this.getTreeStartLocation_();
      var elements = [];
      this.eat_(OPEN_SQUARE);
      while (true) {
        var type = peekType();
        if (type === COMMA) {
          elements.push(null);
        } else if (this.peekSpread_(type)) {
          elements.push(this.parsePatternRestElement_(useBinding));
          break;
        } else if (type === CLOSE_SQUARE || type === END_OF_FILE) {
          break;
        } else {
          elements.push(this.parsePatternElement_(useBinding));
        }
        type = peekType();
        if (type !== CLOSE_SQUARE) {
          this.eat_(COMMA);
        }
      }
      this.eat_(CLOSE_SQUARE);
      return new ArrayPattern(this.getTreeLocation_(start), elements);
    },
    parseBindingElementList_: function(elements) {
      this.parseElisionOpt_(elements);
      elements.push(this.parseBindingElement_());
      while (this.eatIf_(COMMA)) {
        this.parseElisionOpt_(elements);
        elements.push(this.parseBindingElement_());
      }
    },
    parseElisionOpt_: function(elements) {
      while (this.eatIf_(COMMA)) {
        elements.push(null);
      }
    },
    peekBindingElement_: function(type) {
      return this.peekBindingIdentifier_(type) || this.peekPattern_(type);
    },
    parseBindingElement_: function() {
      var start = this.getTreeStartLocation_();
      var binding = this.parseBindingElementBinding_();
      var initializer = this.parseBindingElementInitializer_(INITIALIZER_OPTIONAL);
      return new BindingElement(this.getTreeLocation_(start), binding, initializer);
    },
    parseBindingElementBinding_: function() {
      if (this.peekPattern_(peekType()))
        return this.parseBindingPattern_();
      return this.parseBindingIdentifier_();
    },
    parseBindingElementInitializer_: function(initializerRequired) {
      if (peek(EQUAL) || initializerRequired) {
        return this.parseInitializer_(ALLOW_IN);
      }
      return null;
    },
    parseBindingRestElement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(DOT_DOT_DOT);
      var identifier = this.parseBindingIdentifier_();
      return new SpreadPatternElement(this.getTreeLocation_(start), identifier);
    },
    parseObjectPattern_: function(useBinding) {
      var start = this.getTreeStartLocation_();
      var elements = [];
      this.eat_(OPEN_CURLY);
      var type;
      while ((type = peekType()) !== CLOSE_CURLY && type !== END_OF_FILE) {
        elements.push(this.parsePatternProperty_(useBinding));
        if (!this.eatIf_(COMMA))
          break;
      }
      this.eat_(CLOSE_CURLY);
      return new ObjectPattern(this.getTreeLocation_(start), elements);
    },
    parsePatternProperty_: function(useBinding) {
      var start = this.getTreeStartLocation_();
      var name = this.parsePropertyName_();
      var requireColon = name.type !== LITERAL_PROPERTY_NAME || !name.literalToken.isStrictKeyword() && name.literalToken.type !== IDENTIFIER;
      if (requireColon || peek(COLON)) {
        this.eat_(COLON);
        var element = this.parsePatternElement_(useBinding);
        return new ObjectPatternField(this.getTreeLocation_(start), name, element);
      }
      var token = name.literalToken;
      if (this.strictMode_ && token.isStrictKeyword())
        this.reportReservedIdentifier_(token);
      if (useBinding) {
        var binding = new BindingIdentifier(name.location, token);
        var initializer$__35 = this.parseInitializerOpt_(ALLOW_IN);
        return new BindingElement(this.getTreeLocation_(start), binding, initializer$__35);
      }
      var assignment = new IdentifierExpression(name.location, token);
      var initializer = this.parseInitializerOpt_(ALLOW_IN);
      return new AssignmentElement(this.getTreeLocation_(start), assignment, initializer);
    },
    parseAssignmentPattern_: function() {
      return this.parsePattern_(false);
    },
    parseArrayAssignmentPattern_: function() {
      return this.parseArrayPattern_(false);
    },
    parseAssignmentElement_: function() {
      var start = this.getTreeStartLocation_();
      var assignment = this.parseDestructuringAssignmentTarget_();
      var initializer = this.parseInitializerOpt_(ALLOW_IN);
      return new AssignmentElement(this.getTreeLocation_(start), assignment, initializer);
    },
    parseDestructuringAssignmentTarget_: function() {
      switch (peekType()) {
        case OPEN_SQUARE:
          return this.parseArrayAssignmentPattern_();
        case OPEN_CURLY:
          return this.parseObjectAssignmentPattern_();
      }
      var expression = this.parseLeftHandSideExpression_();
      expression = this.coverFormalsToParenExpression_(expression);
      this.validateAssignmentTarget_(expression, 'assignment');
      return expression;
    },
    parseAssignmentRestElement_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(DOT_DOT_DOT);
      var id = this.parseDestructuringAssignmentTarget_();
      return new SpreadPatternElement(this.getTreeLocation_(start), id);
    },
    parseObjectAssignmentPattern_: function() {
      return this.parseObjectPattern_(false);
    },
    parseAssignmentProperty_: function() {
      return this.parsePatternProperty_(false);
    },
    parseTemplateLiteral_: function(operand) {
      var start = operand ? operand.location.start : this.getTreeStartLocation_();
      var token = nextToken();
      var elements = [new TemplateLiteralPortion(token.location, token)];
      if (token.type === NO_SUBSTITUTION_TEMPLATE) {
        return new TemplateLiteralExpression(this.getTreeLocation_(start), operand, elements);
      }
      var expression = this.parseExpression_(ALLOW_IN);
      elements.push(new TemplateSubstitution(expression.location, expression));
      while (expression.type !== SYNTAX_ERROR_TREE) {
        token = nextTemplateLiteralToken();
        if (token.type === ERROR || token.type === END_OF_FILE)
          break;
        elements.push(new TemplateLiteralPortion(token.location, token));
        if (token.type === TEMPLATE_TAIL)
          break;
        expression = this.parseExpression_(ALLOW_IN);
        elements.push(new TemplateSubstitution(expression.location, expression));
      }
      return new TemplateLiteralExpression(this.getTreeLocation_(start), operand, elements);
    },
    parseTypeAnnotationOpt_: function() {
      if (this.options_.types && this.eatOpt_(COLON)) {
        return this.parseType_();
      }
      return null;
    },
    parseType_: function() {
      switch (peekType()) {
        case NEW:
          return this.parseConstructorType_();
        case OPEN_PAREN:
        case OPEN_ANGLE:
          return this.parseFunctionType_();
      }
      var start = this.getTreeStartLocation_();
      var elementType = this.parsePrimaryType_();
      return this.parseUnionTypeSuffix_(start, elementType);
    },
    parsePrimaryType_: function() {
      var start = this.getTreeStartLocation_();
      var elementType,
          token;
      switch (peekType()) {
        case VOID:
          token = nextToken();
          elementType = new PredefinedType(this.getTreeLocation_(start), token);
          break;
        case IDENTIFIER:
          switch (peekToken().value) {
            case 'any':
            case 'boolean':
            case 'number':
            case 'string':
            case 'symbol':
              token = nextToken();
              elementType = new PredefinedType(this.getTreeLocation_(start), token);
              break;
            default:
              elementType = this.parseTypeReference_();
          }
          break;
        case TYPEOF:
          elementType = this.parseTypeQuery_(start);
          break;
        case OPEN_CURLY:
          elementType = this.parseObjectType_();
          break;
        default:
          return this.parseUnexpectedToken_();
      }
      return this.parseArrayTypeSuffix_(start, elementType);
    },
    parseTypeReference_: function() {
      var start = this.getTreeStartLocation_();
      var typeName = this.parseTypeName_();
      var args = null;
      if (peek(OPEN_ANGLE)) {
        var args$__36 = this.parseTypeArguments_();
        return new TypeReference(this.getTreeLocation_(start), typeName, args$__36);
      }
      return typeName;
    },
    parseUnionTypeSuffix_: function(start, elementType) {
      if (peek(BAR)) {
        var types = [elementType];
        this.eat_(BAR);
        while (true) {
          types.push(this.parsePrimaryType_());
          if (!this.eatIf_(BAR)) {
            break;
          }
        }
        return new UnionType(this.getTreeLocation_(start), types);
      }
      return elementType;
    },
    parseArrayTypeSuffix_: function(start, elementType) {
      var token = peekTokenNoLineTerminator();
      if (token && token.type === OPEN_SQUARE) {
        this.eat_(OPEN_SQUARE);
        this.eat_(CLOSE_SQUARE);
        elementType = new ArrayType(this.getTreeLocation_(start), elementType);
        return this.parseArrayTypeSuffix_(start, elementType);
      }
      return elementType;
    },
    parseTypeArguments_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(OPEN_ANGLE);
      var args = [this.parseType_()];
      while (peek(COMMA)) {
        this.eat_(COMMA);
        args.push(this.parseType_());
      }
      var token = nextCloseAngle();
      if (token.type !== CLOSE_ANGLE) {
        return this.parseUnexpectedToken_(token);
      }
      return new TypeArguments(this.getTreeLocation_(start), args);
    },
    parseConstructorType_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(NEW);
      var typeParameters = this.parseTypeParametersOpt_();
      this.eat_(OPEN_PAREN);
      var parameterList = this.parseFormalParameters_();
      this.eat_(CLOSE_PAREN);
      this.eat_(ARROW);
      var returnType = this.parseType_();
      return new ConstructorType(this.getTreeLocation_(start), typeParameters, parameterList, returnType);
    },
    parseObjectType_: function() {
      var start = this.getTreeStartLocation_();
      var typeMembers = [];
      this.eat_(OPEN_CURLY);
      var type;
      while (this.peekTypeMember_(type = peekType())) {
        typeMembers.push(this.parseTypeMember_(type));
        if (!this.eatIf_(SEMI_COLON)) {
          break;
        }
      }
      this.eat_(CLOSE_CURLY);
      return new ObjectType(this.getTreeLocation_(start), typeMembers);
    },
    peekTypeMember_: function(type) {
      switch (type) {
        case NEW:
        case OPEN_PAREN:
        case OPEN_ANGLE:
        case OPEN_SQUARE:
        case IDENTIFIER:
        case STRING:
        case NUMBER:
          return true;
        default:
          return peekToken().isKeyword();
      }
    },
    parseTypeMember_: function(type) {
      switch (type) {
        case NEW:
          return this.parseConstructSignature_();
        case OPEN_PAREN:
        case OPEN_ANGLE:
          return this.parseCallSignature_();
        case OPEN_SQUARE:
          return this.parseIndexSignature_();
      }
      var start = this.getTreeStartLocation_();
      var propertyName = this.parseLiteralPropertyName_();
      var isOpt = this.eatIf_(QUESTION);
      type = peekType();
      if (type === OPEN_ANGLE || type === OPEN_PAREN) {
        var callSignature = this.parseCallSignature_();
        return new MethodSignature(this.getTreeLocation_(start), propertyName, isOpt, callSignature);
      }
      var typeAnnotation = this.parseTypeAnnotationOpt_();
      return new PropertySignature(this.getTreeLocation_(start), propertyName, isOpt, typeAnnotation);
    },
    parseCallSignature_: function() {
      var start = this.getTreeStartLocation_();
      var typeParameters = this.parseTypeParametersOpt_();
      this.eat_(OPEN_PAREN);
      var parameterList = this.parseFormalParameters_();
      this.eat_(CLOSE_PAREN);
      var returnType = this.parseTypeAnnotationOpt_();
      return new CallSignature(this.getTreeLocation_(start), typeParameters, parameterList, returnType);
    },
    parseConstructSignature_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(NEW);
      var typeParameters = this.parseTypeParametersOpt_();
      this.eat_(OPEN_PAREN);
      var parameterList = this.parseFormalParameters_();
      this.eat_(CLOSE_PAREN);
      var returnType = this.parseTypeAnnotationOpt_();
      return new ConstructSignature(this.getTreeLocation_(start), typeParameters, parameterList, returnType);
    },
    parseIndexSignature_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(OPEN_SQUARE);
      var id = this.eatId_();
      this.eat_(COLON);
      var typeName;
      var typeStart = this.getTreeStartLocation_();
      if (this.peekPredefinedString_('string')) {
        typeName = this.eatId_('string');
      } else {
        typeName = this.eatId_('number');
      }
      var indexType = new PredefinedType(this.getTreeLocation_(typeStart), typeName);
      this.eat_(CLOSE_SQUARE);
      this.eat_(COLON);
      var typeAnnotation = this.parseType_();
      return new IndexSignature(this.getTreeLocation_(start), id, indexType, typeAnnotation);
    },
    parseFunctionType_: function() {
      var start = this.getTreeStartLocation_();
      var typeParameters = this.parseTypeParametersOpt_();
      this.eat_(OPEN_PAREN);
      var parameterList = this.parseFormalParameters_();
      this.eat_(CLOSE_PAREN);
      this.eat_(ARROW);
      var returnType = this.parseType_();
      return new FunctionType(this.getTreeLocation_(start), typeParameters, parameterList, returnType);
    },
    parseTypeQuery_: function(start) {
      throw 'NYI';
    },
    peekTypeParameters_: function() {
      return peek(OPEN_ANGLE);
    },
    parseTypeParametersOpt_: function() {
      if (peek(OPEN_ANGLE)) {
        return this.parseTypeParameters_();
      }
      return null;
    },
    parseTypeParameters_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(OPEN_ANGLE);
      var parameters = [this.parseTypeParameter_()];
      while (peek(COMMA)) {
        this.eat_(COMMA);
        parameters.push(this.parseTypeParameter_());
      }
      this.eat_(CLOSE_ANGLE);
      return new TypeParameters(this.getTreeLocation_(start), parameters);
    },
    parseTypeParameter_: function() {
      var start = this.getTreeStartLocation_();
      var id = this.eatId_();
      var extendsType = null;
      if (this.eatIf_(EXTENDS)) {
        extendsType = this.parseType_();
      }
      return new TypeParameter(this.getTreeLocation_(start), id, extendsType);
    },
    parseNamedOrPredefinedType_: function() {
      var start = this.getTreeStartLocation_();
      switch (peekToken().value) {
        case 'any':
        case 'number':
        case 'boolean':
        case 'string':
          {
            var token = nextToken();
            return new PredefinedType(this.getTreeLocation_(start), token);
          }
        default:
          return this.parseTypeName_();
      }
    },
    parseTypeName_: function() {
      var start = this.getTreeStartLocation_();
      var id = this.eatId_();
      var typeName = new TypeName(this.getTreeLocation_(start), null, id);
      while (this.eatIf_(PERIOD)) {
        var memberName = this.eatIdName_();
        typeName = new TypeName(this.getTreeLocation_(start), typeName, memberName);
      }
      return typeName;
    },
    parseInterfaceDeclaration_: function() {
      var start = this.getTreeStartLocation_();
      this.eat_(INTERFACE);
      var name = this.eatId_();
      var typeParameters = this.parseTypeParametersOpt_();
      var extendsClause;
      if (this.eatIf_(EXTENDS)) {
        extendsClause = this.parseInterfaceExtendsClause_();
      } else {
        extendsClause = [];
      }
      var objectType = this.parseObjectType_();
      return new InterfaceDeclaration(this.getTreeLocation_(start), name, typeParameters, extendsClause, objectType);
    },
    parseInterfaceExtendsClause_: function() {
      var result = [this.parseTypeReference_()];
      while (this.eatIf_(COMMA)) {
        result.push(this.parseTypeReference_());
      }
      return result;
    },
    parseAnnotatedDeclarations_: function(parsingModuleItem) {
      this.pushAnnotations_();
      var declaration;
      var type = peekType();
      if (parsingModuleItem) {
        declaration = this.parseModuleItem_(type);
      } else {
        declaration = this.parseStatementListItem_(type);
      }
      if (this.annotations_.length > 0) {
        this.reportError_(this.annotations_[0].location, 'Unsupported annotated expression');
      }
      return declaration;
    },
    parseAnnotations_: function() {
      var annotations = [];
      while (this.eatIf_(AT)) {
        annotations.push(this.parseAnnotation_());
      }
      return annotations;
    },
    pushAnnotations_: function() {
      this.annotations_ = this.parseAnnotations_();
    },
    popAnnotations_: function() {
      var annotations = this.annotations_;
      this.annotations_ = [];
      return annotations;
    },
    parseAnnotation_: function() {
      var start = this.getTreeStartLocation_();
      var expression = this.parseMemberExpressionNoNew_();
      var args = null;
      if (peek(OPEN_PAREN))
        args = this.parseArguments_();
      return new Annotation(this.getTreeLocation_(start), expression, args);
    },
    parseTypeAliasDeclaration_: function() {
      var start = this.getTreeStartLocation_();
      this.eatId_(TYPE);
      var name = this.eatId_();
      this.eat_(EQUAL);
      var type = this.parseType_();
      this.eatPossibleImplicitSemiColon_();
      return new TypeAliasDeclaration(this.getTreeLocation_(start), name, type);
    },
    parseJsxElement_: function() {
      var token = this.eatJsx_(OPEN_ANGLE);
      return this.parseJsxElementContinuation_(token.location.start);
    },
    parseJsxElementContinuation_: function(start) {
      var name = this.parseJsxElementName_();
      var attrs = this.parseJsxAttributes_();
      var children = [];
      switch (peekJsxToken().type) {
        case SLASH:
          nextJsxToken();
          this.eat_(CLOSE_ANGLE);
          break;
        case CLOSE_ANGLE:
          {
            nextJsxTextToken();
            loop: while (true) {
              var token = nextJsxTextToken();
              switch (token.type) {
                case STRING:
                  {
                    children.push(new JsxText(token.location, token));
                    continue;
                  }
                case OPEN_CURLY:
                  {
                    var start$__37 = token.location.start;
                    var expression = null;
                    if (!peek(CLOSE_CURLY)) {
                      expression = this.parseAssignmentExpression_(ALLOW_IN);
                    }
                    this.eatJsx_(CLOSE_CURLY);
                    var placeHolder = new JsxPlaceholder(this.getTreeLocation_(start$__37), expression);
                    children.push(placeHolder);
                    continue;
                  }
                case OPEN_ANGLE:
                  {
                    var start$__38 = token.location.start;
                    if (peekJsxToken().type === SLASH) {
                      nextJsxToken();
                      break loop;
                    }
                    var subElement = this.parseJsxElementContinuation_(start$__38);
                    children.push(subElement);
                    resetScanner(subElement.location.end.offset);
                    continue;
                  }
                default:
                  return this.parseSyntaxError_('Unexpected token');
              }
            }
            var closeName = this.parseJsxElementName_();
            if (!jsxNamesEqual(name, closeName)) {
              this.reportError_(closeName.location, ("Non matching JSX closing tag. Expected " + jsxNameToString(name) + ", found " + jsxNameToString(closeName)));
            }
            this.eat_(CLOSE_ANGLE);
            break;
          }
        default:
          return this.parseSyntaxError_('Unexpected token');
      }
      var element = new JsxElement(this.getTreeLocation_(start), name, attrs, children);
      return element;
    },
    parseJsxElementName_: function() {
      var tokens = [];
      var id = this.eatJsx_(JSX_IDENTIFIER);
      var start = id.location.start;
      tokens.push(id);
      while (peekJsxToken().type === PERIOD) {
        nextJsxToken();
        var id$__39 = this.eatJsx_(JSX_IDENTIFIER);
        tokens.push(id$__39);
      }
      return new JsxElementName(this.getTreeLocation_(start), tokens);
    },
    parseJsxAttributes_: function() {
      var attributes = [];
      loop: while (true) {
        switch (peekJsxToken().type) {
          case JSX_IDENTIFIER:
            attributes.push(this.parseJsxAttribute_());
            break;
          case OPEN_CURLY:
            attributes.push(this.parseJsxSpreadAttribute_());
            break;
          default:
            break loop;
        }
      }
      return attributes;
    },
    parseJsxAttribute_: function() {
      var name = this.eatJsx_(JSX_IDENTIFIER);
      var start = name.location.start;
      var value = null;
      if (peekJsxToken().type === EQUAL) {
        this.eatJsx_(EQUAL);
        value = this.parseJsxAttributeValue_();
      }
      return new JsxAttribute(this.getTreeLocation_(start), name, value);
    },
    parseJsxAttributeValue_: function() {
      var token = peekJsxToken();
      var start = token.location.start;
      switch (token.type) {
        case STRING:
          nextJsxToken();
          return new LiteralExpression(this.getTreeLocation_(start), token);
        case OPEN_CURLY:
          {
            nextJsxToken();
            var expr = this.parseAssignmentExpression_(ALLOW_IN);
            this.eatJsx_(CLOSE_CURLY);
            return new JsxPlaceholder(this.getTreeLocation_(start), expr);
          }
        case OPEN_ANGLE:
          return this.parseJsxElement_();
      }
      return this.parseSyntaxError_('Unexpected token');
    },
    parseJsxSpreadAttribute_: function() {
      var token = peekJsxToken();
      var start = token.location.start;
      nextJsxToken();
      this.eatJsx_(DOT_DOT_DOT);
      var expr = this.parseAssignmentExpression_(ALLOW_IN);
      this.eatJsx_(CLOSE_CURLY);
      return new JsxSpreadAttribute(this.getTreeLocation_(start), expr);
    },
    eatPossibleImplicitSemiColon_: function() {
      var token = peekTokenNoLineTerminator();
      if (!token)
        return;
      switch (token.type) {
        case SEMI_COLON:
          nextToken();
          return;
        case END_OF_FILE:
        case CLOSE_CURLY:
          return;
      }
      this.reportError_(token.location, 'Semi-colon expected');
    },
    peekImplicitSemiColon_: function() {
      switch (peekType()) {
        case SEMI_COLON:
        case CLOSE_CURLY:
        case END_OF_FILE:
          return true;
      }
      var token = peekTokenNoLineTerminator();
      return token === null;
    },
    eatOpt_: function(expectedTokenType) {
      if (peek(expectedTokenType))
        return nextToken();
      return null;
    },
    eatIdOpt_: function() {
      return peek(IDENTIFIER) ? this.eatId_() : null;
    },
    eatId_: function() {
      var expected = arguments[0];
      var token = nextToken();
      if (token.type === IDENTIFIER) {
        if (expected && token.value !== expected)
          this.reportExpectedError_(token, expected);
        return token;
      }
      if (token.isStrictKeyword()) {
        if (this.strictMode_) {
          this.reportReservedIdentifier_(token);
        } else {
          return new IdentifierToken(token.location, token.type);
        }
      } else {
        this.reportExpectedError_(token, expected || 'identifier');
      }
      return token;
    },
    eatIdName_: function() {
      var t = nextToken();
      if (t.type !== IDENTIFIER) {
        if (!t.isKeyword()) {
          this.reportExpectedError_(t, 'identifier');
          return null;
        }
        return new IdentifierToken(t.location, t.type);
      }
      return t;
    },
    eat_: function(expectedTokenType) {
      return this.isExpectedToken_(nextToken(), expectedTokenType);
    },
    eatIf_: function(expectedTokenType) {
      if (peek(expectedTokenType)) {
        nextToken();
        return true;
      }
      return false;
    },
    eatJsx_: function(expectedTokenType) {
      return this.isExpectedToken_(nextJsxToken(), expectedTokenType);
    },
    isExpectedToken_: function(token, expectedTokenType) {
      if (token.type !== expectedTokenType) {
        this.reportExpectedError_(token, expectedTokenType);
      }
      return token;
    },
    reportExpectedError_: function(token, expected) {
      this.reportError_(token.location, ("Unexpected token " + token));
    },
    getTreeStartLocation_: function() {
      return peekLocation().start;
    },
    getTreeEndLocation_: function() {
      return getLastToken().location.end;
    },
    getTreeLocation_: function(start) {
      return new SourceRange(start, this.getTreeEndLocation_());
    },
    handleComment: function(range) {},
    isAtEnd: function() {
      return isAtEnd();
    },
    reportError_: function(location, message) {
      this.errorReporter_.reportError(location, message);
    },
    reportReservedIdentifier_: function(token) {
      this.reportError_(token.location, (token.type + " is a reserved identifier"));
    },
    validateAssignmentTarget_: function(tree, operation) {
      if (!tree.isPattern() && !isValidSimpleAssignmentTarget(tree, this.strictMode_)) {
        this.reportError_(tree.location, ("Invalid left-hand side expression in " + operation));
      }
    }
  }, {});
}();
function jsxNamesEqual(name, other) {
  if (name.names.length !== other.names.length) {
    return false;
  }
  for (var i = 0; i < name.names.length; i++) {
    if (name.names[i].value !== other.names[i].value) {
      return false;
    }
  }
  return true;
}
function jsxNameToString(name) {
  return name.names.join('.');
}
Object.defineProperties(module.exports, {
  Parser: {get: function() {
      return Parser;
    }},
  __esModule: {value: true}
});
