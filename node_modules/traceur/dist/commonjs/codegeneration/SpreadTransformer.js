"use strict";
var $___46__46__47_syntax_47_PredefinedName_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $__TempVarTransformer_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__;
var $__0 = ($___46__46__47_syntax_47_PredefinedName_46_js__ = require("../syntax/PredefinedName.js"), $___46__46__47_syntax_47_PredefinedName_46_js__ && $___46__46__47_syntax_47_PredefinedName_46_js__.__esModule && $___46__46__47_syntax_47_PredefinedName_46_js__ || {default: $___46__46__47_syntax_47_PredefinedName_46_js__}),
    APPLY = $__0.APPLY,
    BIND = $__0.BIND,
    FUNCTION = $__0.FUNCTION,
    PROTOTYPE = $__0.PROTOTYPE;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    MEMBER_EXPRESSION = $__1.MEMBER_EXPRESSION,
    MEMBER_LOOKUP_EXPRESSION = $__1.MEMBER_LOOKUP_EXPRESSION,
    SPREAD_EXPRESSION = $__1.SPREAD_EXPRESSION;
var TempVarTransformer = ($__TempVarTransformer_46_js__ = require("./TempVarTransformer.js"), $__TempVarTransformer_46_js__ && $__TempVarTransformer_46_js__.__esModule && $__TempVarTransformer_46_js__ || {default: $__TempVarTransformer_46_js__}).TempVarTransformer;
var $__3 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createArgumentList = $__3.createArgumentList,
    createArrayLiteral = $__3.createArrayLiteral,
    createAssignmentExpression = $__3.createAssignmentExpression,
    createCallExpression = $__3.createCallExpression,
    createEmptyArgumentList = $__3.createEmptyArgumentList,
    createIdentifierExpression = $__3.createIdentifierExpression,
    createMemberExpression = $__3.createMemberExpression,
    createMemberLookupExpression = $__3.createMemberLookupExpression,
    createNewExpression = $__3.createNewExpression,
    createNullLiteral = $__3.createNullLiteral,
    createParenExpression = $__3.createParenExpression,
    createVoid0 = $__3.createVoid0;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
function hasSpreadMember(trees) {
  return trees.some(function(tree) {
    return tree && tree.type === SPREAD_EXPRESSION;
  });
}
var SpreadTransformer = function($__super) {
  function SpreadTransformer() {
    $traceurRuntime.superConstructor(SpreadTransformer).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(SpreadTransformer, {
    createArrayFromElements_: function(elements) {
      var length = elements.length;
      var args = [];
      var lastArray;
      for (var i = 0; i < length; i++) {
        if (elements[i] && elements[i].type === SPREAD_EXPRESSION) {
          if (lastArray) {
            args.push(createArrayLiteral(lastArray));
            lastArray = null;
          }
          args.push(this.transformAny(elements[i].expression));
        } else {
          if (!lastArray)
            lastArray = [];
          lastArray.push(this.transformAny(elements[i]));
        }
      }
      if (lastArray)
        args.push(createArrayLiteral(lastArray));
      return parseExpression($traceurRuntime.getTemplateObject(["$traceurRuntime.spread(", ")"]), createArgumentList(args));
    },
    desugarCallSpread_: function(tree) {
      var operand = this.transformAny(tree.operand);
      var functionObject,
          contextObject;
      this.pushTempScope();
      if (operand.type === MEMBER_EXPRESSION) {
        var tempIdent = createIdentifierExpression(this.addTempVar());
        var parenExpression = createParenExpression(createAssignmentExpression(tempIdent, operand.operand));
        var memberName = operand.memberName;
        contextObject = tempIdent;
        functionObject = createMemberExpression(parenExpression, memberName);
      } else if (tree.operand.type === MEMBER_LOOKUP_EXPRESSION) {
        var tempIdent$__8 = createIdentifierExpression(this.addTempVar());
        var parenExpression$__9 = createParenExpression(createAssignmentExpression(tempIdent$__8, operand.operand));
        var memberExpression = this.transformAny(operand.memberExpression);
        contextObject = tempIdent$__8;
        functionObject = createMemberLookupExpression(parenExpression$__9, memberExpression);
      } else {
        contextObject = createVoid0();
        functionObject = operand;
      }
      this.popTempScope();
      var arrayExpression = this.createArrayFromElements_(tree.args.args);
      return createCallExpression(createMemberExpression(functionObject, APPLY), createArgumentList([contextObject, arrayExpression]));
    },
    desugarNewSpread_: function(tree) {
      var arrayExpression = $traceurRuntime.spread([createNullLiteral()], tree.args.args);
      arrayExpression = this.createArrayFromElements_(arrayExpression);
      return createNewExpression(createParenExpression(createCallExpression(createMemberExpression(FUNCTION, PROTOTYPE, BIND, APPLY), createArgumentList([this.transformAny(tree.operand), arrayExpression]))), createEmptyArgumentList());
    },
    transformArrayLiteral: function(tree) {
      if (hasSpreadMember(tree.elements)) {
        return this.createArrayFromElements_(tree.elements);
      }
      return $traceurRuntime.superGet(this, SpreadTransformer.prototype, "transformArrayLiteral").call(this, tree);
    },
    transformCallExpression: function(tree) {
      if (hasSpreadMember(tree.args.args)) {
        return this.desugarCallSpread_(tree);
      }
      return $traceurRuntime.superGet(this, SpreadTransformer.prototype, "transformCallExpression").call(this, tree);
    },
    transformNewExpression: function(tree) {
      if (tree.args !== null && hasSpreadMember(tree.args.args)) {
        return this.desugarNewSpread_(tree);
      }
      return $traceurRuntime.superGet(this, SpreadTransformer.prototype, "transformNewExpression").call(this, tree);
    }
  }, {}, $__super);
}(TempVarTransformer);
Object.defineProperties(module.exports, {
  SpreadTransformer: {get: function() {
      return SpreadTransformer;
    }},
  __esModule: {value: true}
});
