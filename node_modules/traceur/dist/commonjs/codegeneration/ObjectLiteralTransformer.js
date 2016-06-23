"use strict";
var $__FindVisitor_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $__TempVarTransformer_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_util_47_StringMap_46_js__,
    $__ParseTreeFactory_46_js__,
    $___46__46__47_staticsemantics_47_PropName_46_js__;
var FindVisitor = ($__FindVisitor_46_js__ = require("./FindVisitor.js"), $__FindVisitor_46_js__ && $__FindVisitor_46_js__.__esModule && $__FindVisitor_46_js__ || {default: $__FindVisitor_46_js__}).FindVisitor;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    FunctionExpression = $__1.FunctionExpression,
    IdentifierExpression = $__1.IdentifierExpression,
    LiteralExpression = $__1.LiteralExpression;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var IDENTIFIER = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).IDENTIFIER;
var $__4 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    COMPUTED_PROPERTY_NAME = $__4.COMPUTED_PROPERTY_NAME,
    LITERAL_PROPERTY_NAME = $__4.LITERAL_PROPERTY_NAME;
var StringMap = ($___46__46__47_util_47_StringMap_46_js__ = require("../util/StringMap.js"), $___46__46__47_util_47_StringMap_46_js__ && $___46__46__47_util_47_StringMap_46_js__.__esModule && $___46__46__47_util_47_StringMap_46_js__ || {default: $___46__46__47_util_47_StringMap_46_js__}).StringMap;
var $__6 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createAssignmentExpression = $__6.createAssignmentExpression,
    createCommaExpression = $__6.createCommaExpression,
    createDefineProperty = $__6.createDefineProperty,
    createEmptyParameterList = $__6.createEmptyParameterList,
    createFunctionExpression = $__6.createFunctionExpression,
    createIdentifierExpression = $__6.createIdentifierExpression,
    createObjectCreate = $__6.createObjectCreate,
    createObjectLiteral = $__6.createObjectLiteral,
    createParenExpression = $__6.createParenExpression,
    createPropertyNameAssignment = $__6.createPropertyNameAssignment,
    createStringLiteral = $__6.createStringLiteral;
var propName = ($___46__46__47_staticsemantics_47_PropName_46_js__ = require("../staticsemantics/PropName.js"), $___46__46__47_staticsemantics_47_PropName_46_js__ && $___46__46__47_staticsemantics_47_PropName_46_js__.__esModule && $___46__46__47_staticsemantics_47_PropName_46_js__ || {default: $___46__46__47_staticsemantics_47_PropName_46_js__}).propName;
var FindAdvancedProperty = function($__super) {
  function FindAdvancedProperty(transformOptions) {
    $traceurRuntime.superConstructor(FindAdvancedProperty).call(this, true);
    this.transformOptions_ = transformOptions;
    this.protoExpression = null;
  }
  return ($traceurRuntime.createClass)(FindAdvancedProperty, {
    visitPropertyNameAssignment: function(tree) {
      if (isProtoName(tree.name))
        this.protoExpression = tree.value;
      else
        this.visitAny(tree.name);
    },
    visitMethod: function(tree) {
      this.visitAny(tree.name);
    },
    visitGetAccessor: function(tree) {
      if (this.transformOptions_.properTailCalls) {
        this.found = true;
      } else {
        this.visitAny(tree.name);
      }
    },
    visitSetAccessor: function(tree) {
      if (this.transformOptions_.properTailCalls) {
        this.found = true;
      } else {
        this.visitAny(tree.name);
      }
    },
    visitComputedPropertyName: function(tree) {
      if (this.transformOptions_.computedPropertyNames)
        this.found = true;
    }
  }, {}, $__super);
}(FindVisitor);
function isProtoName(tree) {
  return propName(tree) === '__proto__';
}
var ObjectLiteralTransformer = function($__super) {
  function ObjectLiteralTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(ObjectLiteralTransformer).call(this, identifierGenerator, reporter, options);
    this.transformOptions_ = options.transformOptions;
    this.protoExpression = null;
    this.needsAdvancedTransform = false;
    this.seenAccessors = null;
  }
  return ($traceurRuntime.createClass)(ObjectLiteralTransformer, {
    findSeenAccessor_: function(name) {
      if (name.type === COMPUTED_PROPERTY_NAME)
        return null;
      var s = propName(name);
      return this.seenAccessors.get(s);
    },
    removeSeenAccessor_: function(name) {
      if (name.type === COMPUTED_PROPERTY_NAME)
        return;
      var s = propName(name);
      this.seenAccessors.delete(s);
    },
    addSeenAccessor_: function(name, descr) {
      if (name.type === COMPUTED_PROPERTY_NAME)
        return;
      var s = propName(name);
      this.seenAccessors.set(s, descr);
    },
    createProperty_: function(name, descr) {
      var expression;
      if (name.type === LITERAL_PROPERTY_NAME) {
        if (this.needsAdvancedTransform)
          expression = this.getPropertyName_(name);
        else
          expression = name;
      } else {
        expression = name.expression;
      }
      if (descr.get || descr.set) {
        var oldAccessor = this.findSeenAccessor_(name);
        if (oldAccessor) {
          oldAccessor.get = descr.get || oldAccessor.get;
          oldAccessor.set = descr.set || oldAccessor.set;
          this.removeSeenAccessor_(name);
          return null;
        } else {
          this.addSeenAccessor_(name, descr);
        }
      }
      return [expression, descr];
    },
    getPropertyName_: function(nameTree) {
      var token = nameTree.literalToken;
      switch (token.type) {
        case IDENTIFIER:
          return createStringLiteral(token.value);
        default:
          if (token.isKeyword())
            return createStringLiteral(token.type);
          return new LiteralExpression(token.location, token);
      }
    },
    transformClassDeclaration: function(tree) {
      return tree;
    },
    transformClassExpression: function(tree) {
      return tree;
    },
    transformObjectLiteral: function(tree) {
      var oldNeedsTransform = this.needsAdvancedTransform;
      var oldSeenAccessors = this.seenAccessors;
      var transformed = this.transformObjectLiteralInner_(tree);
      this.needsAdvancedTransform = oldNeedsTransform;
      this.seenAccessors = oldSeenAccessors;
      return transformed;
    },
    transformObjectLiteralInner_: function(tree) {
      var finder = new FindAdvancedProperty(this.transformOptions_);
      finder.visitAny(tree);
      if (!finder.found) {
        this.needsAdvancedTransform = false;
        return $traceurRuntime.superGet(this, ObjectLiteralTransformer.prototype, "transformObjectLiteral").call(this, tree);
      }
      this.needsAdvancedTransform = true;
      this.seenAccessors = new StringMap();
      var properties = this.transformList(tree.propertyNameAndValues);
      properties = properties.filter(function(tree) {
        return tree;
      });
      var tempVar = this.addTempVar();
      var tempVarIdentifierExpression = createIdentifierExpression(tempVar);
      var expressions = properties.map(function(property) {
        var expression = property[0];
        var descr = property[1];
        return createDefineProperty(tempVarIdentifierExpression, expression, descr);
      });
      var protoExpression = this.transformAny(finder.protoExpression);
      var objectExpression;
      if (protoExpression)
        objectExpression = createObjectCreate(protoExpression);
      else
        objectExpression = createObjectLiteral([]);
      expressions.unshift(createAssignmentExpression(tempVarIdentifierExpression, objectExpression));
      expressions.push(tempVarIdentifierExpression);
      return createParenExpression(createCommaExpression(expressions));
    },
    transformPropertyNameAssignment: function(tree) {
      if (!this.needsAdvancedTransform)
        return $traceurRuntime.superGet(this, ObjectLiteralTransformer.prototype, "transformPropertyNameAssignment").call(this, tree);
      if (isProtoName(tree.name))
        return null;
      return this.createProperty_(tree.name, {
        value: this.transformAny(tree.value),
        configurable: true,
        enumerable: true,
        writable: true
      });
    },
    transformGetAccessor: function(tree) {
      if (!this.needsAdvancedTransform)
        return $traceurRuntime.superGet(this, ObjectLiteralTransformer.prototype, "transformGetAccessor").call(this, tree);
      var body = this.transformAny(tree.body);
      var func = createFunctionExpression(createEmptyParameterList(), body);
      return this.createProperty_(tree.name, {
        get: func,
        configurable: true,
        enumerable: true
      });
    },
    transformSetAccessor: function(tree) {
      if (!this.needsAdvancedTransform)
        return $traceurRuntime.superGet(this, ObjectLiteralTransformer.prototype, "transformSetAccessor").call(this, tree);
      var body = this.transformAny(tree.body);
      var parameterList = this.transformAny(tree.parameterList);
      var func = createFunctionExpression(parameterList, body);
      return this.createProperty_(tree.name, {
        set: func,
        configurable: true,
        enumerable: true
      });
    },
    transformMethod: function(tree) {
      var func = new FunctionExpression(tree.location, tree.debugName, tree.functionKind, this.transformAny(tree.parameterList), tree.typeAnnotation, [], this.transformAny(tree.body));
      if (!this.needsAdvancedTransform) {
        return createPropertyNameAssignment(tree.name, func);
      }
      var expression = this.transformAny(tree.name);
      return this.createProperty_(tree.name, {
        value: func,
        configurable: true,
        enumerable: true,
        writable: true
      });
    },
    transformPropertyNameShorthand: function(tree) {
      if (!this.needsAdvancedTransform)
        return $traceurRuntime.superGet(this, ObjectLiteralTransformer.prototype, "transformPropertyNameShorthand").call(this, tree);
      var expression = this.transformAny(tree.name);
      return this.createProperty_(tree.name, {
        value: new IdentifierExpression(tree.location, tree.name.identifierToken),
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  ObjectLiteralTransformer: {get: function() {
      return ObjectLiteralTransformer;
    }},
  __esModule: {value: true}
});
