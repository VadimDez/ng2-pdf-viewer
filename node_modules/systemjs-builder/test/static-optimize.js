var Builder = require('../index');
var builder = new Builder();

var minify = false;

builder.loadConfigSync('./test/fixtures/test-tree.config.js');

builder.config({
  transpiler: false,
  meta: {
    'a.js': {
      format: 'esm'
    },
    'b.js': {
      format: 'esm'
    },
    'global-dep.js': {
      format: 'esm'
    },
    'global-dep-loader.js': {
      format: 'esm'
    }
  },
  paths: {
    '*': './test/fixtures/es-tree/*',
    'global': './test/fixtures/test-tree/global-inner.js'
  }
});

suite('SFX Optimizations', function() {
  test('All ES6 rollup optimization', function(done) {
    builder.buildStatic('a.js', 'test/output/es-sfx.js', { runtime: false, minify: minify, format: 'esm', rollup: true })
    .then(function(output) {
      assert(output.source, 'var b = \'b\';\n\nvar a = \'a\';\n\nexport { a, b };');
      done();
    }, done)
  });

  test('ES6 rollup with a global dep', function(done) {
    builder.buildStatic('global-dep.js', 'test/output/es-sfx.js', { runtime: false, minify: minify, format: 'esm', rollup: true })
    .then(function(output) {
      assert(output.source.indexOf('System.registerDynamic("2"') != -1 && output.source.indexOf(', [\'2\'') != -1);
      done();
    }, done);
  });
});