define(function() {

  var a = 'a';

  function internal() {
    define(a, [], {});
  }

  return { a: a };
});