"use strict";
var $__TempVarTransformer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__,
    $__ExplodeExpressionTransformer_46_js__;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    ArgumentList = $__1.ArgumentList,
    ClassDeclaration = $__1.ClassDeclaration,
    ClassExpression = $__1.ClassExpression,
    GetAccessor = $__1.GetAccessor,
    MemberExpression = $__1.MemberExpression,
    Method = $__1.Method,
    SetAccessor = $__1.SetAccessor;
var $__2 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    MEMBER_EXPRESSION = $__2.MEMBER_EXPRESSION,
    MEMBER_LOOKUP_EXPRESSION = $__2.MEMBER_LOOKUP_EXPRESSION,
    SUPER_EXPRESSION = $__2.SUPER_EXPRESSION;
var $__3 = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}),
    EQUAL = $__3.EQUAL,
    MINUS_MINUS = $__3.MINUS_MINUS,
    PLUS_PLUS = $__3.PLUS_PLUS;
var $__4 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createAssignmentExpression = $__4.createAssignmentExpression,
    createBindingIdentifier = $__4.createBindingIdentifier,
    createIdentifierExpression = $__4.createIdentifierExpression,
    createIdentifierToken = $__4.createIdentifierToken,
    createParenExpression = $__4.createParenExpression,
    createStringLiteral = $__4.createStringLiteral,
    createThisExpression = $__4.createThisExpression;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
var ExplodeExpressionTransformer = ($__ExplodeExpressionTransformer_46_js__ = require("./ExplodeExpressionTransformer.js"), $__ExplodeExpressionTransformer_46_js__ && $__ExplodeExpressionTransformer_46_js__.__esModule && $__ExplodeExpressionTransformer_46_js__ || {default: $__ExplodeExpressionTransformer_46_js__}).ExplodeExpressionTransformer;
function hasSuperMemberExpression(tree) {
  return (tree.type === MEMBER_EXPRESSION || tree.type === MEMBER_LOOKUP_EXPRESSION) && tree.operand.type === SUPER_EXPRESSION;
}
var State = function() {
  function State(transformer, home) {
    this.transformer = transformer;
    this.home_ = home;
    this.tempName = home ? null : transformer.getTempIdentifier();
    this.hasSuper = false;
  }
  return ($traceurRuntime.createClass)(State, {get home() {
      this.hasSuper = true;
      if (this.home_ === null) {
        this.home_ = createIdentifierExpression(createIdentifierToken(this.tempName));
      }
      return this.home_;
    }}, {});
}();
var ClassState = function($__super) {
  function ClassState(transformer, tree) {
    var home = null;
    if (tree.name !== null) {
      home = createIdentifierExpression(tree.name.identifierToken);
    }
    $traceurRuntime.superConstructor(ClassState).call(this, transformer, home);
    this.name_ = tree.name;
  }
  return ($traceurRuntime.createClass)(ClassState, {get name() {
      if (this.name_ !== null)
        return this.name_;
      if (this.hasSuper) {
        return createBindingIdentifier(this.home.identifierToken);
      }
      return null;
    }}, {}, $__super);
}(State);
var PrototypeState = function($__super) {
  function PrototypeState(transformer, classState) {
    $traceurRuntime.superConstructor(PrototypeState).call(this, transformer, null);
    this.classState = classState;
  }
  return ($traceurRuntime.createClass)(PrototypeState, {get home() {
      var ident = this.classState.home;
      return new MemberExpression(null, ident, createIdentifierToken('prototype'));
    }}, {}, $__super);
}(State);
var SuperTransformer = function($__super) {
  function SuperTransformer(identifierGenerator, reporter, options) {
    $traceurRuntime.superConstructor(SuperTransformer).call(this, identifierGenerator, reporter, options);
    this.stateStack_ = [];
  }
  return ($traceurRuntime.createClass)(SuperTransformer, {
    pushState: function(state) {
      this.stateStack_.push(state);
    },
    popState: function() {
      return this.stateStack_.pop();
    },
    peekState: function() {
      return this.stateStack_[this.stateStack_.length - 1];
    },
    transformObjectLiteral: function(tree) {
      var state = new State(this, null);
      this.pushState(state);
      this.pushState(state);
      var result = $traceurRuntime.superGet(this, SuperTransformer.prototype, "transformObjectLiteral").call(this, tree);
      this.popState();
      this.popState();
      if (state.hasSuper) {
        this.registerTempVarName(state.tempName);
        return createAssignmentExpression(state.home, result);
      }
      this.releaseTempName(state.tempName);
      return result;
    },
    transformClassExpression: function(tree) {
      var superClass = this.transformAny(tree.superClass);
      var annotations = this.transformList(tree.annotations);
      var classState = new ClassState(this, tree);
      var prototypeState = new PrototypeState(this, classState);
      this.pushState(classState);
      this.pushState(prototypeState);
      var elements = this.transformList(tree.elements);
      this.popState();
      this.popState();
      if (tree.name === null && tree.superClass !== null) {
        classState.home;
      } else if (tree.superClass === superClass && tree.elements === elements && tree.annotations === annotations) {
        return tree;
      }
      return new ClassExpression(tree.location, classState.name, superClass, elements, tree.annotations, tree.typeParameters);
    },
    transformClassDeclaration: function(tree) {
      var superClass = this.transformAny(tree.superClass);
      var annotations = this.transformList(tree.annotations);
      var classState = new ClassState(this, tree);
      var prototypeState = new PrototypeState(this, classState);
      this.pushState(classState);
      this.pushState(prototypeState);
      var elements = this.transformList(tree.elements);
      this.popState();
      this.popState();
      if (tree.superClass === superClass && tree.elements === elements && tree.annotations === annotations) {
        return tree;
      }
      return new ClassDeclaration(tree.location, tree.name, superClass, elements, tree.annotations, tree.typeParameters);
    },
    transformMethod: function(tree) {
      var name = this.transformAny(tree.name);
      var prototypeState;
      if (tree.isStatic) {
        prototypeState = this.popState();
      }
      var parameterList = this.transformAny(tree.parameterList);
      var body = this.transformAny(tree.body);
      if (tree.isStatic) {
        this.pushState(prototypeState);
      }
      if (tree.name === name && tree.parameterList === parameterList && tree.body === body) {
        return tree;
      }
      return new Method(tree.location, tree.isStatic, tree.functionKind, name, parameterList, tree.typeAnnotation, tree.annotations, body, tree.debugName);
    },
    transformGetAccessor: function(tree) {
      var name = this.transformAny(tree.name);
      var prototypeState;
      if (tree.isStatic) {
        prototypeState = this.popState();
      }
      var body = this.transformAny(tree.body);
      if (tree.isStatic) {
        this.pushState(prototypeState);
      }
      if (tree.name === name && tree.body === body) {
        return tree;
      }
      return new GetAccessor(tree.location, tree.isStatic, name, tree.typeAnnotation, tree.annotations, body);
    },
    transformSetAccessor: function(tree) {
      var name = this.transformAny(tree.name);
      var prototypeState;
      if (tree.isStatic) {
        prototypeState = this.popState();
      }
      var parameterList = this.transformAny(tree.parameterList);
      var body = this.transformAny(tree.body);
      if (tree.isStatic) {
        this.pushState(prototypeState);
      }
      if (tree.name === name && tree.parameterList === parameterList && tree.body === body) {
        return tree;
      }
      return new SetAccessor(tree.location, tree.isStatic, name, parameterList, tree.annotations, body);
    },
    transformComputedPropertyName: function(tree) {
      var s1 = this.popState();
      var s2 = this.popState();
      var result = $traceurRuntime.superGet(this, SuperTransformer.prototype, "transformComputedPropertyName").call(this, tree);
      this.pushState(s2);
      this.pushState(s1);
      return result;
    },
    transformSuperExpression: function(tree) {
      throw new Error('unreachable');
    },
    transformMemberShared_: function(name) {
      var home = this.peekState().home;
      return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.superGet(this, ", ", ", ")"]), home, name);
    },
    transformMemberExpression: function(tree) {
      if (tree.operand.type === SUPER_EXPRESSION) {
        return this.transformMemberShared_(tree.memberName.value);
      }
      return $traceurRuntime.superGet(this, SuperTransformer.prototype, "transformMemberExpression").call(this, tree);
    },
    transformMemberLookupExpression: function(tree) {
      if (tree.operand.type === SUPER_EXPRESSION)
        return this.transformMemberShared_(tree.memberExpression);
      return $traceurRuntime.superGet(this, SuperTransformer.prototype, "transformMemberLookupExpression").call(this, tree);
    },
    transformCallExpression: function(tree) {
      var operand,
          args;
      if (tree.operand.type === SUPER_EXPRESSION) {
        args = this.transformAny(tree.args);
        args = new ArgumentList(tree.location, $traceurRuntime.spread([createThisExpression()], args.args));
        var home = this.stateStack_[this.stateStack_.length - 2].home;
        operand = parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.superConstructor(", ")"]), home);
      } else if (hasSuperMemberExpression(tree.operand)) {
        operand = this.transformAny(tree.operand);
        args = this.transformAny(tree.args);
        args = new ArgumentList(args.location, $traceurRuntime.spread([createThisExpression()], args.args));
      } else {
        return $traceurRuntime.superGet(this, SuperTransformer.prototype, "transformCallExpression").call(this, tree);
      }
      return parseExpression($traceurRuntime.getTemplateObject(["", ".call(", ")"]), operand, args);
    },
    transformBinaryExpression: function(tree) {
      if (tree.operator.isAssignmentOperator() && hasSuperMemberExpression(tree.left)) {
        if (tree.operator.type !== EQUAL) {
          var exploded = new ExplodeExpressionTransformer(this).transformAny(tree);
          return this.transformAny(createParenExpression(exploded));
        }
        var name = tree.left.type === MEMBER_LOOKUP_EXPRESSION ? tree.left.memberExpression : createStringLiteral(tree.left.memberName.value);
        var right = this.transformAny(tree.right);
        var home = this.peekState().home;
        return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.superSet(this, ", ", ", ", ", ")"]), home, name, right);
      }
      return $traceurRuntime.superGet(this, SuperTransformer.prototype, "transformBinaryExpression").call(this, tree);
    },
    transformUnaryExpression: function(tree) {
      var transformed = this.transformIncrementDecrement_(tree);
      if (transformed)
        return transformed;
      return $traceurRuntime.superGet(this, SuperTransformer.prototype, "transformUnaryExpression").call(this, tree);
    },
    transformPostfixExpression: function(tree) {
      var transformed = this.transformIncrementDecrement_(tree);
      if (transformed)
        return transformed;
      return $traceurRuntime.superGet(this, SuperTransformer.prototype, "transformPostfixExpression").call(this, tree);
    },
    transformIncrementDecrement_: function(tree) {
      var operator = tree.operator;
      var operand = tree.operand;
      if ((operator.type === PLUS_PLUS || operator.type === MINUS_MINUS) && hasSuperMemberExpression(operand)) {
        var exploded = new ExplodeExpressionTransformer(this).transformAny(tree);
        if (exploded !== tree)
          exploded = createParenExpression(exploded);
        return this.transformAny(exploded);
      }
      return null;
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  SuperTransformer: {get: function() {
      return SuperTransformer;
    }},
  __esModule: {value: true}
});
