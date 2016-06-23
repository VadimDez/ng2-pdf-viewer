var Builder = require('../index');

var builder = new Builder('test/fixtures/conditional-tree');
builder.loadConfigSync('test/fixtures/conditional-tree.config.js');

var baseURL = builder.loader.baseURL;

builder.config({ defaultJSExtensions: true });

suite('Conditional Canonical Names', function() {
  test('Package environment canonical', function() {
    assert.equal(builder.getCanonicalName(baseURL + 'pkg#:env-condition'), 'pkg#:env-condition');
  });
  test('Interpolation', function() {
    assert.equal(builder.getCanonicalName(baseURL + 'interpolated-#{' + baseURL + 'conditions.js|test}.js'), 'interpolated-#{conditions.js|test}.js');
  });
  test('Plugin interpolation', function() {
    assert.equal(builder.getCanonicalName(baseURL + 'pkg/test-#{' + baseURL + 'conditions.js|test}.js!plugin-#{conditions.js|another}.js'), 'pkg/test-#{conditions.js|test}.js!plugin-#{conditions.js|another}.js');
  });
  test('Boolean conditional', function() {
    assert.equal(builder.getCanonicalName(baseURL + 'pkg/lib/test#?~' + baseURL + 'bool|exp'), 'pkg/lib/test#?~bool|exp');
  });
  test('Boolean conditional with plugin', function() {
    builder.config({
      paths: {
        a: 'asdf', // only if we add .js this catches
        condition: 'conditions.js',
        p: 'plugin'
      }
    })
    assert.equal(builder.getCanonicalName(baseURL + 'asdf.js' + '!' + baseURL + 'plugin.js#?' + baseURL + 'conditions.js'), 'asdf.js!p#?condition');
  })
});