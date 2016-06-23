var Builder = require('../index');
var builder = new Builder('test/fixtures/error-tree');

suite('Errors', function() {
  test('Non-existing file', function() {
    return builder.bundle('asdf')
    .catch(function(e) {
      assert(e.toString().indexOf('ENOENT') != -1);
    });
  });

  test('Non-existing dependency', function() {
    return builder.bundle('a.js')
    .catch(function(e) {
      assert(e.stack.toString().indexOf('a.js') != -1);
    });
  });
});