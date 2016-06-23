"use strict";
var $__1 = Object,
    defineProperty = $__1.defineProperty,
    getOwnPropertyNames = $__1.getOwnPropertyNames;
function exportStar(object) {
  var $__2 = arguments,
      $__3 = function(i) {
        var mod = $__2[i];
        var names = getOwnPropertyNames(mod);
        var $__5 = function(j) {
          var name = names[j];
          if (name === '__esModule' || name === 'default') {
            return 0;
          }
          defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        },
            $__6;
        $__4: for (var j = 0; j < names.length; j++) {
          $__6 = $__5(j);
          switch ($__6) {
            case 0:
              continue $__4;
          }
        }
      };
  for (var i = 1; i < arguments.length; i++) {
    $__3(i);
  }
  return object;
}
var $__default = exportStar;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
