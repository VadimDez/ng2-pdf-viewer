"use strict";
var $__PlaceholderParser_46_js__;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
var expr;
function globalThis() {
  if (!expr)
    expr = parseExpression($traceurRuntime.getTemplateObject(["Reflect.global"]));
  return expr;
}
var $__default = globalThis;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
