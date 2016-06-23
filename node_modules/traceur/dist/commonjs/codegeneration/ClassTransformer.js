"use strict";
var $___46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_codegeneration_47_ParseTreeFactory_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__TempVarTransformer_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__MakeStrictTransformer_46_js__,
    $__ParenTrait_46_js__,
    $__ParseTreeFactory_46_js__,
    $___46__46__47_semantics_47_util_46_js__,
    $__PlaceholderParser_46_js__;
var CONSTRUCTOR = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}).CONSTRUCTOR;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__1.AnonBlock,
    ClassExpression = $__1.ClassExpression,
    ExportDeclaration = $__1.ExportDeclaration,
    FunctionDeclaration = $__1.FunctionDeclaration,
    FunctionExpression = $__1.FunctionExpression,
    GetAccessor = $__1.GetAccessor,
    Method = $__1.Method,
    SetAccessor = $__1.SetAccessor;
var createBindingIdentifier = ($___46__46__47_codegeneration_47_ParseTreeFactory_46_js__ = require("../codegeneration/ParseTreeFactory.js"), $___46__46__47_codegeneration_47_ParseTreeFactory_46_js__ && $___46__46__47_codegeneration_47_ParseTreeFactory_46_js__.__esModule && $___46__46__47_codegeneration_47_ParseTreeFactory_46_js__ || {default: $___46__46__47_codegeneration_47_ParseTreeFactory_46_js__}).createBindingIdentifier;
var $__3 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    COMPUTED_PROPERTY_NAME = $__3.COMPUTED_PROPERTY_NAME,
    GET_ACCESSOR = $__3.GET_ACCESSOR,
    LITERAL_PROPERTY_NAME = $__3.LITERAL_PROPERTY_NAME,
    METHOD = $__3.METHOD,
    SET_ACCESSOR = $__3.SET_ACCESSOR;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var $__5 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    CONST = $__5.CONST,
    LET = $__5.LET,
    VAR = $__5.VAR,
    STRING = $__5.STRING;
var MakeStrictTransformer = ($__MakeStrictTransformer_46_js__ = require("./MakeStrictTransformer.js"), $__MakeStrictTransformer_46_js__ && $__MakeStrictTransformer_46_js__.__esModule && $__MakeStrictTransformer_46_js__ || {default: $__MakeStrictTransformer_46_js__}).MakeStrictTransformer;
var ParenTrait = ($__ParenTrait_46_js__ = require("./ParenTrait.js"), $__ParenTrait_46_js__ && $__ParenTrait_46_js__.__esModule && $__ParenTrait_46_js__ || {default: $__ParenTrait_46_js__}).ParenTrait;
var $__8 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    id = $__8.createIdentifierExpression,
    createObjectLiteral = $__8.createObjectLiteral,
    createVariableStatement = $__8.createVariableStatement;
var hasUseStrict = ($___46__46__47_semantics_47_util_46_js__ = require("../semantics/util.js"), $___46__46__47_semantics_47_util_46_js__ && $___46__46__47_semantics_47_util_46_js__.__esModule && $___46__46__47_semantics_47_util_46_js__ || {default: $___46__46__47_semantics_47_util_46_js__}).hasUseStrict;
var $__10 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseExpression = $__10.parseExpression,
    parsePropertyDefinition = $__10.parsePropertyDefinition;
function classCall(func, object, staticObject, superClass) {
  if (superClass) {
    return parseExpression($traceurRuntime.getTemplateObject(["($traceurRuntime.createClass)(", ", ", ", ", ",\n                                       ", ")"]), func, object, staticObject, superClass);
  }
  return parseExpression($traceurRuntime.getTemplateObject(["($traceurRuntime.createClass)(", ", ", ", ", ")"]), func, object, staticObject);
}
function methodNameFromTree(tree) {
  if (tree.type === COMPUTED_PROPERTY_NAME) {
    return '';
  }
  if (tree.literalToken && tree.literalToken.type === STRING) {
    return tree.getStringValue().substr(1, -1);
  }
  return tree.getStringValue();
}
function classMethodDebugName(className, methodName, isStatic) {
  if (isStatic) {
    return createBindingIdentifier('$__' + className + '_' + methodName);
  }
  return createBindingIdentifier('$__' + className + '_prototype_' + methodName);
}
function functionExpressionToDeclaration(tree, name) {
  if (tree.name === null) {
    name = createBindingIdentifier(name);
  } else {
    name = tree.name;
  }
  return new FunctionDeclaration(tree.location, name, tree.functionKind, tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body);
}
function removeStaticModifier(tree) {
  switch (tree.type) {
    case GET_ACCESSOR:
      return new GetAccessor(tree.location, false, tree.name, tree.typeAnnotation, tree.annotations, tree.body);
    case SET_ACCESSOR:
      return new SetAccessor(tree.location, false, tree.name, tree.parameterList, tree.annotations, tree.body);
    case METHOD:
      return new Method(tree.location, false, tree.functionKind, tree.name, tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body, tree.debugName);
    default:
      throw new Error('unreachable');
  }
}
function isConstructor(tree) {
  if (tree.type !== METHOD || tree.isStatic || tree.functionKind !== null) {
    return false;
  }
  var name = tree.name;
  return name.type === LITERAL_PROPERTY_NAME && name.literalToken.value === CONSTRUCTOR;
}
var $__default = isConstructor;
var ClassTransformer = function($__super) {
  function ClassTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(ClassTransformer).call(this, identifierGenerator, reporter, options);
    this.strictCount_ = 0;
    this.state_ = null;
  }
  return ($traceurRuntime.createClass)(ClassTransformer, {
    transformExportDeclaration: function(tree) {
      var transformed = $traceurRuntime.superGet(this, ClassTransformer.prototype, "transformExportDeclaration").call(this, tree);
      if (transformed === tree)
        return tree;
      var declaration = transformed.declaration;
      if (declaration instanceof AnonBlock) {
        var statements = $traceurRuntime.spread([new ExportDeclaration(null, declaration.statements[0], [])], declaration.statements.slice(1));
        return new AnonBlock(null, statements);
      }
      return transformed;
    },
    transformModule: function(tree) {
      this.strictCount_ = 1;
      return $traceurRuntime.superGet(this, ClassTransformer.prototype, "transformModule").call(this, tree);
    },
    transformScript: function(tree) {
      this.strictCount_ = hasUseStrict(tree.scriptItemList) ? 1 : 0;
      return $traceurRuntime.superGet(this, ClassTransformer.prototype, "transformScript").call(this, tree);
    },
    transformFunctionBody: function(tree) {
      var useStrict = hasUseStrict(tree.statements) ? 1 : 0;
      this.strictCount_ += useStrict;
      var result = $traceurRuntime.superGet(this, ClassTransformer.prototype, "transformFunctionBody").call(this, tree);
      this.strictCount_ -= useStrict;
      return result;
    },
    makeStrict_: function(tree) {
      if (this.strictCount_)
        return tree;
      return MakeStrictTransformer.transformTree(tree);
    },
    transformClassDeclaration: function(tree) {
      var classExpression = new ClassExpression(tree.location, tree.name, tree.superClass, tree.elements, tree.annotations, tree.typeParameters);
      var transformed = this.transformClassExpression(classExpression);
      var useLet = !this.options.transformOptions.blockBinding && this.options.parseOptions.blockBinding;
      return createVariableStatement(useLet ? LET : VAR, tree.name, transformed);
    },
    transformClassExpression: function(tree) {
      var superClass = this.transformAny(tree.superClass);
      var elements = this.transformList(tree.elements);
      var annotations = this.transformList(tree.annotations);
      var constructor = null;
      var protoElements = elements.filter(function(tree) {
        if (tree.isStatic)
          return false;
        if (isConstructor(tree)) {
          constructor = tree;
          return false;
        }
        return true;
      });
      var staticElements = elements.filter(function(tree) {
        return tree.isStatic;
      }).map(removeStaticModifier);
      var protoObject = createObjectLiteral(protoElements);
      var staticObject = createObjectLiteral(staticElements);
      if (!constructor) {
        constructor = this.getDefaultConstructor_(tree);
      }
      var func = new FunctionExpression(tree.location, tree.name, null, constructor.parameterList, null, annotations, constructor.body);
      var expression;
      if (tree.name) {
        var functionStatement;
        var name = tree.name.identifierToken;
        var nameId = id(("" + name));
        if (!this.options.transformOptions.blockBinding && this.options.parseOptions.blockBinding) {
          functionStatement = createVariableStatement(CONST, tree.name, func);
        } else {
          functionStatement = functionExpressionToDeclaration(func, name);
        }
        if (superClass) {
          expression = parseExpression($traceurRuntime.getTemplateObject(["function($__super) {\n          ", ";\n          return ($traceurRuntime.createClass)(", ", ", ",\n                                               ", ", $__super);\n        }(", ")"]), functionStatement, nameId, protoObject, staticObject, superClass);
        } else {
          expression = parseExpression($traceurRuntime.getTemplateObject(["function() {\n          ", ";\n          return ($traceurRuntime.createClass)(", ", ", ",\n                                               ", ");\n        }()"]), functionStatement, nameId, protoObject, staticObject);
        }
      } else {
        expression = classCall(func, protoObject, staticObject, superClass);
      }
      return this.makeStrict_(expression);
    },
    getDefaultConstructor_: function(tree) {
      if (tree.superClass) {
        var name = id(tree.name.identifierToken);
        return parsePropertyDefinition($traceurRuntime.getTemplateObject(["constructor() {\n        $traceurRuntime.superConstructor(", ").apply(this, arguments)\n      }"]), name);
      }
      return parsePropertyDefinition($traceurRuntime.getTemplateObject(["constructor() {}"]));
    }
  }, {}, $__super);
}(ParenTrait(TempVarTransformer));
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  ClassTransformer: {get: function() {
      return ClassTransformer;
    }},
  __esModule: {value: true}
});
