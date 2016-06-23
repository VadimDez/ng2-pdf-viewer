var Builder = require('../index');
var builder = new Builder();

builder.config({
  paths: {
    'npm:': 'node_modules/'
  },
  map: {
    x: 'npm:x'
  }
});

var utils = require('../lib/utils.js');

suite('Aliasing', function() {
  test('getAlias', function(done) {
    assert.equal(utils.getAlias(builder.loader, 'npm:x'), 'x');
    done();
  });
});