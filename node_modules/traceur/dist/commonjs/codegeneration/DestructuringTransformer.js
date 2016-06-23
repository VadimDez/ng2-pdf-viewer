"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__TempVarTransformer_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__,
    $__PrependStatements_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    ARRAY_LITERAL = $__0.ARRAY_LITERAL,
    ARRAY_PATTERN = $__0.ARRAY_PATTERN,
    ASSIGNMENT_ELEMENT = $__0.ASSIGNMENT_ELEMENT,
    BINDING_ELEMENT = $__0.BINDING_ELEMENT,
    BINDING_IDENTIFIER = $__0.BINDING_IDENTIFIER,
    BLOCK = $__0.BLOCK,
    CALL_EXPRESSION = $__0.CALL_EXPRESSION,
    COMPUTED_PROPERTY_NAME = $__0.COMPUTED_PROPERTY_NAME,
    IDENTIFIER_EXPRESSION = $__0.IDENTIFIER_EXPRESSION,
    LITERAL_EXPRESSION = $__0.LITERAL_EXPRESSION,
    MEMBER_EXPRESSION = $__0.MEMBER_EXPRESSION,
    MEMBER_LOOKUP_EXPRESSION = $__0.MEMBER_LOOKUP_EXPRESSION,
    OBJECT_LITERAL = $__0.OBJECT_LITERAL,
    OBJECT_PATTERN = $__0.OBJECT_PATTERN,
    OBJECT_PATTERN_FIELD = $__0.OBJECT_PATTERN_FIELD,
    PAREN_EXPRESSION = $__0.PAREN_EXPRESSION,
    VARIABLE_DECLARATION_LIST = $__0.VARIABLE_DECLARATION_LIST;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AssignmentElement = $__1.AssignmentElement,
    BindingElement = $__1.BindingElement,
    Catch = $__1.Catch,
    ForInStatement = $__1.ForInStatement,
    ForOfStatement = $__1.ForOfStatement,
    ForOnStatement = $__1.ForOnStatement;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var $__3 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    EQUAL = $__3.EQUAL,
    LET = $__3.LET,
    VAR = $__3.VAR;
var $__4 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createAssignmentExpression = $__4.createAssignmentExpression,
    createBindingIdentifier = $__4.createBindingIdentifier,
    createBlock = $__4.createBlock,
    createCommaExpression = $__4.createCommaExpression,
    createExpressionStatement = $__4.createExpressionStatement,
    createFunctionBody = $__4.createFunctionBody,
    createIdentifierExpression = $__4.createIdentifierExpression,
    createMemberExpression = $__4.createMemberExpression,
    createMemberLookupExpression = $__4.createMemberLookupExpression,
    createParenExpression = $__4.createParenExpression,
    createVariableDeclaration = $__4.createVariableDeclaration,
    createVariableDeclarationList = $__4.createVariableDeclarationList,
    createVariableStatement = $__4.createVariableStatement;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
var prependStatements = ($__PrependStatements_46_js__ = require("./PrependStatements.js"), $__PrependStatements_46_js__ && $__PrependStatements_46_js__.__esModule && $__PrependStatements_46_js__ || {default: $__PrependStatements_46_js__}).prependStatements;
var Desugaring = function() {
  function Desugaring(rvalue) {
    this.rvalue = rvalue;
    this.expressions = [];
    this.pendingExpressions = [];
  }
  return ($traceurRuntime.createClass)(Desugaring, {
    createIterator: function(iterId) {
      this.pendingExpressions.push(parseExpression($traceurRuntime.getTemplateObject(["", " = ", "[Symbol.iterator]()"]), iterId, this.rvalue));
    },
    createInitializer: function(expression) {
      if (this.pendingExpressions.length === 0)
        return expression;
      var expressions = this.pendingExpressions;
      this.pendingExpressions = [];
      expressions.push(expression);
      return createParenExpression(createCommaExpression(expressions));
    },
    skipHole: function(iterId) {
      this.pendingExpressions.push(parseExpression($traceurRuntime.getTemplateObject(["", ".next()"]), iterId));
    }
  }, {});
}();
var AssignmentExpressionDesugaring = function($__super) {
  function AssignmentExpressionDesugaring(rvalue) {
    $traceurRuntime.superConstructor(AssignmentExpressionDesugaring).call(this, rvalue);
  }
  return ($traceurRuntime.createClass)(AssignmentExpressionDesugaring, {
    assign: function(lvalue, rvalue) {
      lvalue = lvalue instanceof AssignmentElement ? lvalue.assignment : lvalue;
      rvalue = this.createInitializer(rvalue);
      this.expressions.push(createAssignmentExpression(lvalue, rvalue));
    },
    createAssignmentExpression: function(tempId, rvalue) {
      var $__14;
      var expressions = this.expressions;
      expressions.unshift(createAssignmentExpression(tempId, rvalue));
      ($__14 = expressions).push.apply($__14, $traceurRuntime.spread(this.pendingExpressions, [tempId]));
      return createParenExpression(createCommaExpression(expressions));
    }
  }, {}, $__super);
}(Desugaring);
var VariableDeclarationDesugaring = function($__super) {
  function VariableDeclarationDesugaring(rvalue) {
    $traceurRuntime.superConstructor(VariableDeclarationDesugaring).call(this, rvalue);
  }
  return ($traceurRuntime.createClass)(VariableDeclarationDesugaring, {
    assign: function(lvalue, rvalue) {
      var binding = lvalue instanceof BindingElement ? lvalue.binding : createBindingIdentifier(lvalue);
      rvalue = this.createInitializer(rvalue);
      this.expressions.push(createVariableDeclaration(binding, rvalue));
    },
    get declarations() {
      return this.expressions;
    }
  }, {}, $__super);
}(Desugaring);
var DestructuringTransformer = function($__super) {
  function DestructuringTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(DestructuringTransformer).call(this, identifierGenerator, reporter, options);
    this.parameterDeclarations = null;
  }
  return ($traceurRuntime.createClass)(DestructuringTransformer, {
    transformArrayPattern: function(tree) {
      throw new Error('unreachable');
    },
    transformObjectPattern: function(tree) {
      throw new Error('unreachable');
    },
    transformBinaryExpression: function(tree) {
      this.pushTempScope();
      var rv;
      if (tree.operator.type === EQUAL && tree.left.isPattern()) {
        rv = this.transformAny(this.desugarAssignment_(tree.left, tree.right));
      } else {
        rv = $traceurRuntime.superGet(this, DestructuringTransformer.prototype, "transformBinaryExpression").call(this, tree);
      }
      this.popTempScope();
      return rv;
    },
    desugarAssignment_: function(lvalue, rvalue) {
      var tempId = createIdentifierExpression(this.addTempVar());
      var desugaring = new AssignmentExpressionDesugaring(tempId);
      this.desugarPattern_(desugaring, lvalue);
      return desugaring.createAssignmentExpression(tempId, rvalue);
    },
    transformVariableDeclarationList: function(tree) {
      var $__13 = this;
      if (!this.destructuringInDeclaration_(tree)) {
        return $traceurRuntime.superGet(this, DestructuringTransformer.prototype, "transformVariableDeclarationList").call(this, tree);
      }
      var desugaredDeclarations = [];
      tree.declarations.forEach(function(declaration) {
        var $__14;
        if (declaration.lvalue.isPattern()) {
          ($__14 = desugaredDeclarations).push.apply($__14, $traceurRuntime.spread($__13.desugarVariableDeclaration_(declaration)));
        } else {
          desugaredDeclarations.push(declaration);
        }
      });
      var transformedTree = this.transformVariableDeclarationList(createVariableDeclarationList(tree.declarationType, desugaredDeclarations));
      return transformedTree;
    },
    transformForInStatement: function(tree) {
      return this.transformForInOrOfOrOn_(tree, $traceurRuntime.superGet(this, DestructuringTransformer.prototype, "transformForInStatement"), ForInStatement);
    },
    transformForOfStatement: function(tree) {
      return this.transformForInOrOfOrOn_(tree, $traceurRuntime.superGet(this, DestructuringTransformer.prototype, "transformForOfStatement"), ForOfStatement);
    },
    transformForOnStatement: function(tree) {
      return this.transformForInOrOfOrOn_(tree, $traceurRuntime.superGet(this, DestructuringTransformer.prototype, "transformForOnStatement"), ForOnStatement);
    },
    transformForInOrOfOrOn_: function(tree, superMethod, constr) {
      var $__14;
      if (!tree.initializer.isPattern() && (tree.initializer.type !== VARIABLE_DECLARATION_LIST || !this.destructuringInDeclaration_(tree.initializer))) {
        return superMethod.call(this, tree);
      }
      this.pushTempScope();
      var declarationType,
          lvalue;
      if (tree.initializer.isPattern()) {
        declarationType = null;
        lvalue = tree.initializer;
      } else {
        declarationType = tree.initializer.declarationType;
        lvalue = tree.initializer.declarations[0].lvalue;
      }
      var statements = [];
      var binding = this.desugarBinding_(lvalue, statements, declarationType);
      var initializer = createVariableDeclarationList(VAR, binding, null);
      var collection = this.transformAny(tree.collection);
      var body = this.transformAny(tree.body);
      if (body.type === BLOCK)
        ($__14 = statements).push.apply($__14, $traceurRuntime.spread(body.statements));
      else
        statements.push(body);
      body = createBlock(statements);
      this.popTempScope();
      return new constr(tree.location, initializer, collection, body);
    },
    transformAssignmentElement: function(tree) {
      throw new Error('unreachable');
    },
    transformBindingElement: function(tree) {
      if (!tree.binding.isPattern() || tree.initializer)
        return tree;
      if (this.parameterDeclarations === null) {
        this.parameterDeclarations = [];
        this.pushTempScope();
      }
      var varName = this.getTempIdentifier();
      var binding = createBindingIdentifier(varName);
      var initializer = createIdentifierExpression(varName);
      var decl = createVariableDeclaration(tree.binding, initializer);
      this.parameterDeclarations.push(decl);
      return new BindingElement(null, binding, null);
    },
    transformFunctionBody: function(tree) {
      if (this.parameterDeclarations === null)
        return $traceurRuntime.superGet(this, DestructuringTransformer.prototype, "transformFunctionBody").call(this, tree);
      var list = createVariableDeclarationList(VAR, this.parameterDeclarations);
      var statement = createVariableStatement(list);
      var statements = prependStatements(tree.statements, statement);
      var newBody = createFunctionBody(statements);
      this.parameterDeclarations = null;
      var result = $traceurRuntime.superGet(this, DestructuringTransformer.prototype, "transformFunctionBody").call(this, newBody);
      this.popTempScope();
      return result;
    },
    transformCatch: function(tree) {
      var $__14;
      if (!tree.binding.isPattern())
        return $traceurRuntime.superGet(this, DestructuringTransformer.prototype, "transformCatch").call(this, tree);
      var body = this.transformAny(tree.catchBody);
      var statements = [];
      var kind = this.options.blockBinding ? LET : VAR;
      var binding = this.desugarBinding_(tree.binding, statements, kind);
      ($__14 = statements).push.apply($__14, $traceurRuntime.spread(body.statements));
      return new Catch(tree.location, binding, createBlock(statements));
    },
    desugarBinding_: function(bindingTree, statements, declarationType) {
      var varName = this.getTempIdentifier();
      var binding = createBindingIdentifier(varName);
      var idExpr = createIdentifierExpression(varName);
      var desugaring;
      if (declarationType === null)
        desugaring = new AssignmentExpressionDesugaring(idExpr);
      else
        desugaring = new VariableDeclarationDesugaring(idExpr);
      this.desugarPattern_(desugaring, bindingTree);
      if (declarationType === null) {
        statements.push(createExpressionStatement(createCommaExpression(desugaring.expressions)));
      } else {
        statements.push(createVariableStatement(this.transformVariableDeclarationList(createVariableDeclarationList(declarationType, desugaring.declarations))));
      }
      return binding;
    },
    destructuringInDeclaration_: function(tree) {
      return tree.declarations.some(function(declaration) {
        return declaration.lvalue.isPattern();
      });
    },
    desugarVariableDeclaration_: function(tree) {
      var tempRValueName = this.getTempIdentifier();
      var tempRValueIdent = createIdentifierExpression(tempRValueName);
      var desugaring;
      var initializer;
      switch (tree.initializer.type) {
        case ARRAY_LITERAL:
        case CALL_EXPRESSION:
        case IDENTIFIER_EXPRESSION:
        case LITERAL_EXPRESSION:
        case MEMBER_EXPRESSION:
        case MEMBER_LOOKUP_EXPRESSION:
        case OBJECT_LITERAL:
        case PAREN_EXPRESSION:
          initializer = tree.initializer;
      }
      desugaring = new VariableDeclarationDesugaring(tempRValueIdent);
      desugaring.assign(desugaring.rvalue, tree.initializer);
      var initializerFound = this.desugarPattern_(desugaring, tree.lvalue);
      if (initializerFound || desugaring.declarations.length > 2) {
        return desugaring.declarations;
      }
      if (!initializer) {
        initializer = createParenExpression(tree.initializer);
      }
      desugaring = new VariableDeclarationDesugaring(initializer);
      this.desugarPattern_(desugaring, tree.lvalue);
      return desugaring.declarations;
    },
    desugarPattern_: function(desugaring, tree) {
      var $__13 = this;
      var initializerFound = false;
      var pattern;
      switch (tree.type) {
        case ARRAY_PATTERN:
          {
            pattern = tree;
            this.pushTempScope();
            var iterId = createIdentifierExpression(this.addTempVar());
            var iterObjectId = createIdentifierExpression(this.addTempVar());
            desugaring.createIterator(iterId);
            for (var i = 0; i < pattern.elements.length; i++) {
              var lvalue = pattern.elements[i];
              if (lvalue === null) {
                desugaring.skipHole(iterId);
                continue;
              } else if (lvalue.isSpreadPatternElement()) {
                desugaring.assign(lvalue.lvalue, parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.iteratorToArray(", ")"]), iterId));
              } else {
                if (lvalue.initializer) {
                  initializerFound = true;
                }
                desugaring.assign(lvalue, this.createConditionalIterExpression(iterObjectId, iterId, lvalue.initializer));
              }
            }
            this.popTempScope();
            break;
          }
        case OBJECT_PATTERN:
          {
            pattern = tree;
            var elementHelper = function(lvalue, initializer) {
              if (initializer)
                initializerFound = true;
              var lookup = $__13.createConditionalMemberExpression(desugaring.rvalue, lvalue, initializer);
              desugaring.assign(lvalue, lookup);
            };
            pattern.fields.forEach(function(field) {
              var lookup;
              switch (field.type) {
                case ASSIGNMENT_ELEMENT:
                  elementHelper(field.assignment, field.initializer);
                  break;
                case BINDING_ELEMENT:
                  elementHelper(field.binding, field.initializer);
                  break;
                case OBJECT_PATTERN_FIELD:
                  {
                    if (field.element.initializer)
                      initializerFound = true;
                    var name = field.name;
                    lookup = $__13.createConditionalMemberExpression(desugaring.rvalue, name, field.element.initializer);
                    desugaring.assign(field.element, lookup);
                    break;
                  }
                default:
                  throw Error('unreachable');
              }
            });
            break;
          }
        case PAREN_EXPRESSION:
          return this.desugarPattern_(desugaring, tree.expression);
        default:
          throw new Error('unreachable');
      }
      if (desugaring instanceof VariableDeclarationDesugaring && desugaring.declarations.length === 0) {
        desugaring.assign(createBindingIdentifier(this.getTempIdentifier()), desugaring.rvalue);
      }
      return initializerFound;
    },
    createConditionalMemberExpression: function(rvalue, name, initializer) {
      if (name.type === COMPUTED_PROPERTY_NAME) {
        return this.createConditionalMemberLookupExpression(rvalue, name.expression, initializer);
      }
      var token;
      switch (name.type) {
        case BINDING_IDENTIFIER:
        case IDENTIFIER_EXPRESSION:
          token = name.identifierToken;
          break;
        default:
          token = name.literalToken;
      }
      if (!initializer)
        return createMemberExpression(rvalue, token);
      var tempIdent = createIdentifierExpression(this.addTempVar());
      return parseExpression($traceurRuntime.getTemplateObject(["(", " = ", ".", ") === void 0 ?\n        ", " : ", ""]), tempIdent, rvalue, token, initializer, tempIdent);
    },
    createConditionalMemberLookupExpression: function(rvalue, index, initializer) {
      if (!initializer)
        return createMemberLookupExpression(rvalue, index);
      var tempIdent = createIdentifierExpression(this.addTempVar());
      return parseExpression($traceurRuntime.getTemplateObject(["(", " = ", "[", "]) === void 0 ?\n        ", " : ", ""]), tempIdent, rvalue, index, initializer, tempIdent);
    },
    createConditionalIterExpression: function(iterObjectId, iterId, initializer) {
      var expr = parseExpression($traceurRuntime.getTemplateObject(["(", " =\n        ", ".next()).done ? void 0 : ", ".value"]), iterObjectId, iterId, iterObjectId);
      if (!initializer) {
        return expr;
      }
      var tempIdent = createIdentifierExpression(this.addTempVar());
      return parseExpression($traceurRuntime.getTemplateObject(["(", " = ", ") === void 0 ?\n        ", " : ", ""]), tempIdent, expr, initializer, tempIdent);
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  DestructuringTransformer: {get: function() {
      return DestructuringTransformer;
    }},
  __esModule: {value: true}
});
