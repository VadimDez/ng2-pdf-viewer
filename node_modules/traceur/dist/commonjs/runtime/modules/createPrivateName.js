"use strict";
var create = Object.create;
var $__3 = Math,
    floor = $__3.floor,
    random = $__3.random;
var privateNames = create(null);
var counter = 0;
function newUniqueString() {
  return '__$' + floor(random() * 1e9) + '$' + ++counter + '$__';
}
function createPrivateName() {
  var s = newUniqueString();
  privateNames[s] = true;
  return s;
}
function isPrivateName(s) {
  return privateNames[s];
}
Object.defineProperties(module.exports, {
  createPrivateName: {get: function() {
      return createPrivateName;
    }},
  __esModule: {value: true}
});
