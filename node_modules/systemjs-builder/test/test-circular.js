var Builder = require('../index');

var builder = new Builder('test/fixtures/circular-tree');

suite('Test circular tree', function(err) {
  test('Circular tree', function() {
    builder.reset();
    
    return builder.bundle('a.js')
    .then(function(out) {
      assert(out.entryPoints.length == 1 && out.entryPoints[0] == 'a.js');
    });
  });
});