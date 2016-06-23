"use strict";
var $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_staticsemantics_47_PropName_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var CONSTRUCTOR = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}).CONSTRUCTOR;
var STRING = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).STRING;
var $__3 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__3.AnonBlock,
    ClassDeclaration = $__3.ClassDeclaration,
    ExportDeclaration = $__3.ExportDeclaration,
    FormalParameter = $__3.FormalParameter,
    FunctionDeclaration = $__3.FunctionDeclaration,
    GetAccessor = $__3.GetAccessor,
    LiteralExpression = $__3.LiteralExpression,
    Method = $__3.Method,
    SetAccessor = $__3.SetAccessor;
var propName = ($___46__46__47_staticsemantics_47_PropName_46_js__ = require("../staticsemantics/PropName.js"), $___46__46__47_staticsemantics_47_PropName_46_js__ && $___46__46__47_staticsemantics_47_PropName_46_js__.__esModule && $___46__46__47_staticsemantics_47_PropName_46_js__ || {default: $___46__46__47_staticsemantics_47_PropName_46_js__}).propName;
var $__5 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createArgumentList = $__5.createArgumentList,
    createArrayLiteral = $__5.createArrayLiteral,
    createAssignmentStatement = $__5.createAssignmentStatement,
    createIdentifierExpression = $__5.createIdentifierExpression,
    createMemberExpression = $__5.createMemberExpression,
    createNewExpression = $__5.createNewExpression,
    createStringLiteralToken = $__5.createStringLiteralToken;
var $__6 = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}),
    parseExpression = $__6.parseExpression,
    parseStatement = $__6.parseStatement;
var AnnotationsScope = function() {
  function AnnotationsScope() {
    this.className = null;
    this.isExport = false;
    this.constructorParameters = [];
    this.annotations = [];
    this.metadata = [];
  }
  return ($traceurRuntime.createClass)(AnnotationsScope, {get inClassScope() {
      return this.className !== null;
    }}, {});
}();
var AnnotationsTransformer = function($__super) {
  function AnnotationsTransformer() {
    $traceurRuntime.superConstructor(AnnotationsTransformer).call(this);
    this.stack_ = [new AnnotationsScope()];
  }
  return ($traceurRuntime.createClass)(AnnotationsTransformer, {
    transformExportDeclaration: function(tree) {
      var $__12;
      var scope = this.pushAnnotationScope_();
      scope.isExport = true;
      ($__12 = scope.annotations).push.apply($__12, $traceurRuntime.spread(tree.annotations));
      var declaration = this.transformAny(tree.declaration);
      if (declaration !== tree.declaration || tree.annotations.length > 0)
        tree = new ExportDeclaration(tree.location, declaration, []);
      return this.appendMetadata_(tree);
    },
    transformClassDeclaration: function(tree) {
      var $__12,
          $__13;
      var elementsChanged = false;
      var exportAnnotations = this.scope.isExport ? this.scope.annotations : [];
      var scope = this.pushAnnotationScope_();
      scope.className = tree.name;
      ($__12 = scope.annotations).push.apply($__12, $traceurRuntime.spread(exportAnnotations, tree.annotations));
      tree = $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformClassDeclaration").call(this, tree);
      ($__13 = scope.metadata).unshift.apply($__13, $traceurRuntime.spread(this.transformMetadata_(createIdentifierExpression(tree.name), scope.annotations, scope.constructorParameters)));
      if (tree.annotations.length > 0) {
        tree = new ClassDeclaration(tree.location, tree.name, tree.superClass, tree.elements, [], null);
      }
      return this.appendMetadata_(tree);
    },
    transformFunctionDeclaration: function(tree) {
      var $__12,
          $__13;
      var exportAnnotations = this.scope.isExport ? this.scope.annotations : [];
      var scope = this.pushAnnotationScope_();
      ($__12 = scope.annotations).push.apply($__12, $traceurRuntime.spread(exportAnnotations, tree.annotations));
      ($__13 = scope.metadata).push.apply($__13, $traceurRuntime.spread(this.transformMetadata_(createIdentifierExpression(tree.name), scope.annotations, tree.parameterList.parameters)));
      tree = $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformFunctionDeclaration").call(this, tree);
      if (tree.annotations.length > 0) {
        tree = new FunctionDeclaration(tree.location, tree.name, tree.functionKind, tree.parameterList, tree.typeAnnotation, [], tree.body);
      }
      return this.appendMetadata_(tree);
    },
    transformFormalParameter: function(tree) {
      if (tree.annotations.length > 0) {
        tree = new FormalParameter(tree.location, tree.parameter, tree.typeAnnotation, []);
      }
      return $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformFormalParameter").call(this, tree);
    },
    transformGetAccessor: function(tree) {
      var $__12;
      if (!this.scope.inClassScope)
        return $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformGetAccessor").call(this, tree);
      ($__12 = this.scope.metadata).push.apply($__12, $traceurRuntime.spread(this.transformMetadata_(this.transformAccessor_(tree, this.scope.className, 'get'), tree.annotations, [])));
      if (tree.annotations.length > 0) {
        tree = new GetAccessor(tree.location, tree.isStatic, tree.name, tree.typeAnnotation, [], tree.body);
      }
      return $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformGetAccessor").call(this, tree);
    },
    transformSetAccessor: function(tree) {
      var $__12;
      if (!this.scope.inClassScope)
        return $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformSetAccessor").call(this, tree);
      ($__12 = this.scope.metadata).push.apply($__12, $traceurRuntime.spread(this.transformMetadata_(this.transformAccessor_(tree, this.scope.className, 'set'), tree.annotations, tree.parameterList.parameters)));
      var parameterList = this.transformAny(tree.parameterList);
      if (parameterList !== tree.parameterList || tree.annotations.length > 0) {
        tree = new SetAccessor(tree.location, tree.isStatic, tree.name, parameterList, [], tree.body);
      }
      return $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformSetAccessor").call(this, tree);
    },
    transformMethod: function(tree) {
      var $__12,
          $__13;
      if (!this.scope.inClassScope)
        return $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformMethod").call(this, tree);
      if (!tree.isStatic && propName(tree) === CONSTRUCTOR) {
        ($__12 = this.scope.annotations).push.apply($__12, $traceurRuntime.spread(tree.annotations));
        this.scope.constructorParameters = tree.parameterList.parameters;
      } else {
        ($__13 = this.scope.metadata).push.apply($__13, $traceurRuntime.spread(this.transformMetadata_(this.transformPropertyMethod_(tree, this.scope.className), tree.annotations, tree.parameterList.parameters)));
      }
      var parameterList = this.transformAny(tree.parameterList);
      if (parameterList !== tree.parameterList || tree.annotations.length > 0) {
        tree = new Method(tree.location, tree.isStatic, tree.functionKind, tree.name, parameterList, tree.typeAnnotation, [], tree.body, tree.debugName);
      }
      return $traceurRuntime.superGet(this, AnnotationsTransformer.prototype, "transformMethod").call(this, tree);
    },
    appendMetadata_: function(tree) {
      var $__12;
      var metadata = this.stack_.pop().metadata;
      if (metadata.length > 0) {
        if (this.scope.isExport) {
          ($__12 = this.scope.metadata).push.apply($__12, $traceurRuntime.spread(metadata));
        } else {
          tree = new AnonBlock(null, $traceurRuntime.spread([tree], metadata));
        }
      }
      return tree;
    },
    transformClassReference_: function(tree, className) {
      var parent = createIdentifierExpression(className);
      if (!tree.isStatic)
        parent = createMemberExpression(parent, 'prototype');
      return parent;
    },
    transformPropertyMethod_: function(tree, className) {
      return createMemberExpression(this.transformClassReference_(tree, className), tree.name.literalToken);
    },
    transformAccessor_: function(tree, className, accessor) {
      var args = createArgumentList([this.transformClassReference_(tree, className), this.createLiteralStringExpression_(tree.name)]);
      var descriptor = parseExpression($traceurRuntime.getTemplateObject(["Object.getOwnPropertyDescriptor(", ")"]), args);
      return createMemberExpression(descriptor, accessor);
    },
    transformParameters_: function(parameters) {
      var $__11 = this;
      var hasParameterMetadata = false;
      parameters = parameters.map(function(param) {
        var $__12;
        var metadata = [];
        if (param.typeAnnotation)
          metadata.push($__11.transformAny(param.typeAnnotation));
        if (param.annotations && param.annotations.length > 0)
          ($__12 = metadata).push.apply($__12, $traceurRuntime.spread($__11.transformAnnotations_(param.annotations)));
        if (metadata.length > 0) {
          hasParameterMetadata = true;
          return createArrayLiteral(metadata);
        }
        return createArrayLiteral([]);
      });
      return hasParameterMetadata ? parameters : [];
    },
    transformAnnotations_: function(annotations) {
      return annotations.map(function(annotation) {
        return createNewExpression(annotation.name, annotation.args);
      });
    },
    transformMetadata_: function(target, annotations, parameters) {
      var metadataStatements = [];
      if (annotations !== null) {
        annotations = this.transformAnnotations_(annotations);
        if (annotations.length > 0) {
          metadataStatements.push(this.createDefinePropertyStatement_(target, 'annotations', createArrayLiteral(annotations)));
        }
      }
      if (parameters !== null) {
        parameters = this.transformParameters_(parameters);
        if (parameters.length > 0) {
          metadataStatements.push(this.createDefinePropertyStatement_(target, 'parameters', createArrayLiteral(parameters)));
        }
      }
      return metadataStatements;
    },
    createDefinePropertyStatement_: function(target, property, value) {
      return parseStatement($traceurRuntime.getTemplateObject(["Object.defineProperty(", ", ", ",\n        {get: function() {return ", "}});"]), target, property, value);
    },
    createLiteralStringExpression_: function(tree) {
      var token = tree.literalToken;
      if (tree.literalToken.type !== STRING)
        token = createStringLiteralToken(tree.literalToken.value);
      return new LiteralExpression(null, token);
    },
    get scope() {
      return this.stack_[this.stack_.length - 1];
    },
    pushAnnotationScope_: function() {
      var scope = new AnnotationsScope();
      this.stack_.push(scope);
      return scope;
    }
  }, {}, $__super);
}(ParseTreeTransformer);
Object.defineProperties(module.exports, {
  AnnotationsTransformer: {get: function() {
      return AnnotationsTransformer;
    }},
  __esModule: {value: true}
});
