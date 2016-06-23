(function() {
var define = System.amdDefine;
define('a', {a: 'a'});
define('b', {b: 'b'});
define("amd-10.js", ["c"], function(c) {
  return c;
});
define('c', ['b'], function(b) {
  return {
    b: b,
    c: 'c'
  };
});

})();

define(['amd-10.js'], function(m) {
  return m;
});