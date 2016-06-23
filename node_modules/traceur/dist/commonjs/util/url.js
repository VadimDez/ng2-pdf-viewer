"use strict";
var canonicalizeUrl = $traceurRuntime.canonicalizeUrl;
var isAbsolute = $traceurRuntime.isAbsolute;
var removeDotSegments = $traceurRuntime.removeDotSegments;
var resolveUrl = $traceurRuntime.resolveUrl;
Object.defineProperties(module.exports, {
  canonicalizeUrl: {get: function() {
      return canonicalizeUrl;
    }},
  isAbsolute: {get: function() {
      return isAbsolute;
    }},
  removeDotSegments: {get: function() {
      return removeDotSegments;
    }},
  resolveUrl: {get: function() {
      return resolveUrl;
    }},
  __esModule: {value: true}
});
