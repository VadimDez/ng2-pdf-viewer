"use strict";
var keywords = ['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'enum', 'extends', 'null', 'true', 'false'];
var strictKeywords = ['implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'yield'];
var keywordsByName = Object.create(null);
var NORMAL_KEYWORD = 1;
var STRICT_KEYWORD = 2;
keywords.forEach(function(value) {
  keywordsByName[value] = NORMAL_KEYWORD;
});
strictKeywords.forEach(function(value) {
  keywordsByName[value] = STRICT_KEYWORD;
});
function getKeywordType(value) {
  return keywordsByName[value];
}
function isStrictKeyword(value) {
  return getKeywordType(value) === STRICT_KEYWORD;
}
Object.defineProperties(module.exports, {
  NORMAL_KEYWORD: {get: function() {
      return NORMAL_KEYWORD;
    }},
  STRICT_KEYWORD: {get: function() {
      return STRICT_KEYWORD;
    }},
  getKeywordType: {get: function() {
      return getKeywordType;
    }},
  isStrictKeyword: {get: function() {
      return isStrictKeyword;
    }},
  __esModule: {value: true}
});
