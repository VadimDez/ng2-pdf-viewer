define('a', {
  a: 'a'
});

define('b', {
  b: 'b'
});

define(['c'], function(c) {
  return c;
});

define('c', ['b'], function(b) {
  return {
    b: b,
    c: 'c'
  };
});