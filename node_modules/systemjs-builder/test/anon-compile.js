var Builder = require('../index');
var builder = new Builder();

builder.loadConfigSync('./test/fixtures/test-tree.config.js');

builder.config({ transpiler: 'babel' });

suite('Anonymous Compilation', function() {
  test('AMD', function(done) {
    builder.compile('amd.js').then(function(output) {
      assert.match(output.source, /define\(\["\.\/global\.js"/);
    })
    .then(done, done);
  });

  test('CJS', function(done) {
    builder.compile('cjs.js').then(function(output) {
      assert.match(output.source, /System\.registerDynamic\(\[\]/);
    })
    .then(done, done);
  });

  test('Global', function(done) {
    builder.compile('global.js').then(function(output) {
      assert.match(output.source, /System\.registerDynamic\(\["\.\/jquery\.js"/);
    })
    .then(done, done);
  });

  test('Register', function(done) {
    builder.compile('third.js').then(function(output) {
      assert.match(output.source, /System\.register\(\["\.\/second.js"\]/);
    })
    .then(done, done);
  });

  test('ES', function(done) {
    builder.compile('first.js').then(function(output) {
      assert.match(output.source, /System\.register\(\[/);
    })
    .then(done, done);
  });
});