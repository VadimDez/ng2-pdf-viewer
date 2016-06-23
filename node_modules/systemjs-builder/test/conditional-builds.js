var Builder = require('../index');

var builder = new Builder('test/fixtures/conditional-tree');

builder.loadConfigSync('test/fixtures/conditional-tree.config.js');

suite('Conditional Builds', function() {  
  test('Package environment traces all conditional variations', function() {
    return builder.trace('pkg/env-condition')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['pkg/#:./env-condition', 'pkg/env-condition-browser.js', 'pkg/env-condition.js'].sort());
    });
  });

  test('Conditional interpolation traces all conditional variations', function() {
    return builder.trace('interpolated-#{conditions.js|test}.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['interpolated-#{conditions.js|test}.js', 'conditions.js', 'interpolated-1.js', 'interpolate-1-dep.js', 'interpolated-2.js'].sort());
    });
  });

  test('Boolean conditional', function() {
    // This can be updated to just #?browser
    return builder.trace('interpolated-1.js#?|browser')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['interpolated-1.js#?@system-env|browser', 'interpolated-1.js', 'interpolate-1-dep.js'].sort());
    });
  });

  test('Boolean conditional exclusion', function() {
    return builder.trace('interpolated-1.js#?|browser', { node: true })
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree), ['interpolated-1.js#?@system-env|browser']);
    })
  })

  test('traceAllConditionals false', function() {
    return builder.trace('pkg/env-condition + interpolated-#{conditions.js|test}.js', { traceAllConditionals: false })
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['interpolated-#{conditions.js|test}.js', 'pkg/#:./env-condition', 'conditions.js'].sort());
    });
  });

  test('Browser:false tracing', function() {
    return builder.trace('pkg/env-condition + interpolated-#{conditions.js|test}.js', { browser: false })
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['pkg/#:./env-condition', 'pkg/env-condition.js', 'interpolated-#{conditions.js|test}.js', 'conditions.js', 'interpolated-1.js', 'interpolate-1-dep.js', 'interpolated-2.js'].sort())
    });
  });

  test('Custom conditions trace', function() {
    return builder.trace('interpolated-#{conditions.js|test}.js', { conditions: { 'conditions.js|test': '1' } })
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['interpolated-#{conditions.js|test}.js', 'conditions.js', 'interpolated-1.js', 'interpolate-1-dep.js'].sort());
    });
  });

  test('Environment tracing', function() {
    return builder.trace('pkg/env-condition + interpolated-#{conditions.js|test}.js', { traceConditionsOnly: true })
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree), ['conditions.js']);
    });
  });

  test('Custom condition build', function() {
    builder.config({
      map: {
        'ENV': 'ENV.js'
      }
    });
    return builder.trace('custom-conditions.js', { conditions: { 'ENV|mock': false, 'ENV|environment': ['dev'], 'ENV|optimize': true } })
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['ENV.js', 'config.#{ENV.js|environment}.js', 'config.dev.js', 'custom-conditions.js', 'mock.js#?ENV.js|mock']);
    });
  });

  test('Build including all conditional variations', function() {
    return builder.bundle('pkg/env-condition + interpolated-#{conditions.js|test}.js', 'test/output/conditional-build.js', { sourceMaps: true })
    .then(function(output) {
      assert(output.source);
    });
  });
});
