var Builder = require('../index');
var builder = new Builder();

builder.loadConfigSync('./test/fixtures/test-tree.config.js');

builder.config({ transpiler: 'babel' });

var baseURL = builder.loader.baseURL;

suite('Canonical Names', function() {
  test('Simple canonical', function() {
    assert.equal(builder.getCanonicalName('amd.js'), 'amd.js');
  });

  test('Wildcard', function() {
    assert.equal(builder.getCanonicalName(baseURL + 'test/fixtures/test-tree/asdf'), 'asdf');
  });

  test('Exact beats wildcard', function() {
    assert.equal(builder.getCanonicalName(baseURL + 'node_modules/babel/node_modules/babel-core/browser.js'), 'babel');
  });

  test('Wildcard extensions', function() {
    assert.equal(builder.getCanonicalName(baseURL + 'test/dummy/file.jade'), 'file.jade');
  });

  test('Wildcard extensions with a plugin', function() {
    builder.loader.defaultJSExtensions = true;
    assert.equal(builder.getCanonicalName('cjs'), 'cjs');
    assert.equal(builder.getCanonicalName(baseURL + 'test/dummy/file.jade!' + baseURL + 'test/fixtures/test-tree/jade.js'), 'file.jade!jade.js');
  });

  test('Trailing / canonical', function() {
    builder.loader.defaultJSExtensions = false;
    builder.config({
      paths: {
        'trailing/': 'src/'
      }
    });
    assert.equal(builder.getCanonicalName(baseURL + 'src/asdf'), 'trailing/asdf');
    assert.equal(builder.getCanonicalName(baseURL + 'src/'), 'trailing/');
    assert.equal(builder.getCanonicalName(baseURL + 'src'), 'trailing');
  })
});