"use strict";
var $Object = Object;
var $TypeError = TypeError;
var $__1 = Object,
    create = $__1.create,
    defineProperties = $__1.defineProperties,
    defineProperty = $__1.defineProperty,
    getOwnPropertyDescriptor = $__1.getOwnPropertyDescriptor,
    getOwnPropertyNames = $__1.getOwnPropertyNames,
    getOwnPropertySymbols = $__1.getOwnPropertySymbols;
function forEachPropertyKey(object, f) {
  getOwnPropertyNames(object).forEach(f);
  if (getOwnPropertySymbols) {
    getOwnPropertySymbols(object).forEach(f);
  }
}
function getDescriptors(object) {
  var descriptors = {};
  forEachPropertyKey(object, function(key) {
    descriptors[key] = getOwnPropertyDescriptor(object, key);
    descriptors[key].enumerable = false;
  });
  return descriptors;
}
var nonEnum = {enumerable: false};
function makePropertiesNonEnumerable(object) {
  forEachPropertyKey(object, function(key) {
    defineProperty(object, key, nonEnum);
  });
}
function createClass(ctor, object, staticObject, superClass) {
  defineProperty(object, 'constructor', {
    value: ctor,
    configurable: true,
    enumerable: false,
    writable: true
  });
  if (arguments.length > 3) {
    if (typeof superClass === 'function')
      ctor.__proto__ = superClass;
    ctor.prototype = create(getProtoParent(superClass), getDescriptors(object));
  } else {
    makePropertiesNonEnumerable(object);
    ctor.prototype = object;
  }
  defineProperty(ctor, 'prototype', {
    configurable: false,
    writable: false
  });
  return defineProperties(ctor, getDescriptors(staticObject));
}
var $__default = createClass;
function getProtoParent(superClass) {
  if (typeof superClass === 'function') {
    var prototype = superClass.prototype;
    if ($Object(prototype) === prototype || prototype === null)
      return superClass.prototype;
    throw new $TypeError('super prototype must be an Object or null');
  }
  if (superClass === null)
    return null;
  throw new $TypeError(("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : $traceurRuntime.typeof(superClass)) + "."));
}
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
