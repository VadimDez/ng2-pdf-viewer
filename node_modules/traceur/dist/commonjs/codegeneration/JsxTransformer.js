"use strict";
var $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_LiteralToken_46_js__,
    $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__ParseTreeFactory_46_js__,
    $__PlaceholderParser_46_js__,
    $__SpreadPropertiesTransformer_46_js__;
var $__0 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    JSX_ELEMENT = $__0.JSX_ELEMENT,
    JSX_PLACEHOLDER = $__0.JSX_PLACEHOLDER,
    JSX_SPREAD_ATTRIBUTE = $__0.JSX_SPREAD_ATTRIBUTE,
    JSX_TEXT = $__0.JSX_TEXT,
    LITERAL_EXPRESSION = $__0.LITERAL_EXPRESSION;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    JsxText = $__1.JsxText,
    LiteralExpression = $__1.LiteralExpression,
    LiteralPropertyName = $__1.LiteralPropertyName,
    SpreadExpression = $__1.SpreadExpression;
var LiteralToken = ($___46__46__47_syntax_47_LiteralToken_46_js__ = require("../syntax/LiteralToken.js"), $___46__46__47_syntax_47_LiteralToken_46_js__ && $___46__46__47_syntax_47_LiteralToken_46_js__.__esModule && $___46__46__47_syntax_47_LiteralToken_46_js__ || {default: $___46__46__47_syntax_47_LiteralToken_46_js__}).LiteralToken;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var STRING = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).STRING;
var $__5 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createArgumentList = $__5.createArgumentList,
    createIdentifierExpression = $__5.createIdentifierExpression,
    createIdentifierToken = $__5.createIdentifierToken,
    createMemberExpression = $__5.createMemberExpression,
    createNullLiteral = $__5.createNullLiteral,
    createObjectLiteral = $__5.createObjectLiteral,
    createPropertyNameAssignment = $__5.createPropertyNameAssignment,
    createStringLiteral = $__5.createStringLiteral,
    createStringLiteralToken = $__5.createStringLiteralToken,
    createTrueLiteral = $__5.createTrueLiteral;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
var spreadProperties = ($__SpreadPropertiesTransformer_46_js__ = require("./SpreadPropertiesTransformer.js"), $__SpreadPropertiesTransformer_46_js__ && $__SpreadPropertiesTransformer_46_js__.__esModule && $__SpreadPropertiesTransformer_46_js__ || {default: $__SpreadPropertiesTransformer_46_js__}).spreadProperties;
var JsxTransformer = function($__super) {
  function JsxTransformer(idGen, reporter, options) {
    $traceurRuntime.superConstructor(JsxTransformer).call(this);
    this.options_ = options;
    this.jsxFunction_ = null;
  }
  return ($traceurRuntime.createClass)(JsxTransformer, {
    getJsxFunction_: function() {
      if (!this.jsxFunction_) {
        var jsx = this.options_.jsx;
        if (typeof jsx === 'string') {
          this.jsxFunction_ = parseExpression([jsx]);
        } else {
          this.jsxFunction_ = parseExpression($traceurRuntime.getTemplateObject(["React.createElement"]));
        }
      }
      return this.jsxFunction_;
    },
    transformJsxElement: function(tree) {
      var name = this.transformAny(tree.name);
      var props = this.transformJsxAttributes_(tree);
      var children = this.transformJsxChildren_(tree.children);
      var args = createArgumentList($traceurRuntime.spread([name, props], children));
      return parseExpression($traceurRuntime.getTemplateObject(["", "(", ")"]), this.getJsxFunction_(), args);
    },
    transformJsxAttributes_: function(tree) {
      var attrs = this.transformList(tree.attributes);
      if (attrs.length === 0) {
        return createNullLiteral();
      }
      if (tree.attributes.some(function(a) {
        return a.type === JSX_SPREAD_ATTRIBUTE;
      })) {
        return this.createSpreadAttributeExpression_(attrs);
      }
      return createObjectLiteral(attrs);
    },
    createSpreadAttributeExpression_: function(attrs) {
      return spreadProperties(attrs);
    },
    transformJsxElementName: function(tree) {
      if (tree.names.length === 1) {
        var value = tree.names[0].value;
        if (value[0] === value[0].toUpperCase()) {
          return createIdentifierExpression(value);
          ;
        }
        return createStringLiteral(value);
      }
      var names = tree.names.map(jsxIdentifierToToken);
      var operand = names[0];
      if (operand.type === STRING) {
        names[0] = new LiteralExpression(operand.location, operand);
      }
      return createMemberExpression.apply((void 0), $traceurRuntime.spread(names));
    },
    transformJsxAttribute: function(tree) {
      var name = new LiteralPropertyName(tree.name.location, jsxIdentifierToToken(tree.name));
      var value;
      if (tree.value === null) {
        value = createTrueLiteral();
      } else if (tree.value.type === LITERAL_EXPRESSION) {
        var literalToken = tree.value.literalToken;
        var v = literalToken.value;
        var location = literalToken.location;
        var lit = new LiteralToken(STRING, normalizeAttributeValue(v), location);
        value = new LiteralExpression(location, lit);
      } else {
        value = this.transformAny(tree.value);
      }
      return createPropertyNameAssignment(name, value);
    },
    transformJsxPlaceholder: function(tree) {
      return this.transformAny(tree.expression);
    },
    transformJsxSpreadAttribute: function(tree) {
      return new SpreadExpression(tree.location, this.transformAny(tree.expression));
    },
    transformJsxText: function(tree) {
      return createStringLiteral(tree.value.value);
    },
    transformJsxChildren_: function(trees) {
      var $__11 = this;
      var rv = [];
      trees.forEach(function(tree) {
        var newTree;
        switch (tree.type) {
          case JSX_ELEMENT:
            newTree = $__11.transformAny(tree);
            break;
          case JSX_PLACEHOLDER:
            if (tree.expression === null) {
              return;
            }
            newTree = $__11.transformAny(tree);
            break;
          case JSX_TEXT:
            {
              var s = tree.value.value;
              s = s.replace(/\t/g, ' ');
              if (!/[\n\r]/.test(s)) {
                newTree = createStringLiteral(s);
              } else {
                s = s.replace(/^[ \t]*[\n\r]\s*/, '');
                s = s.replace(/[ \t]*[\n\r]\s*$/, '');
                if (s === '') {
                  return;
                }
                newTree = createStringLiteral(s);
              }
              break;
            }
        }
        rv.push(newTree);
      });
      return rv;
    }
  }, {}, $__super);
}(ParseTreeTransformer);
function jsxIdentifierToToken(token) {
  var value = token.value;
  if (value.indexOf('-') !== -1) {
    return createStringLiteralToken(value);
  }
  return createIdentifierToken(value);
}
function normalizeAttributeValue(s) {
  return JSON.stringify(s.slice(1, -1).replace(/\n\s+/g, ' '));
}
Object.defineProperties(module.exports, {
  JsxTransformer: {get: function() {
      return JsxTransformer;
    }},
  __esModule: {value: true}
});
