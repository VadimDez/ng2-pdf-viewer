var Builder = require('../index');
var expect = require('chai').expect;
var toFileURL = require('../lib/utils.js').toFileURL;
var fs = require('fs');

suite('Test compiler cache', function() {
  var builder = new Builder('test/fixtures/test-cache-tree');
  builder.config({ transpiler: 'babel' });

  test('Use compile cache entry when available', function() {
    var loadName = 'simple.js';
    var outputPath = 'test/output/cached.js';
    var cacheObj;
    var tree;

    return builder.trace(loadName).then(function(_tree) {
      tree = _tree;
      return builder.bundle(tree);
    })
    .then(function() {
      var cacheEntry = builder.getCache();

      expect(cacheEntry).to.be.an('object');

      cacheObj = cacheEntry.compile.loads['simple.js'];

      expect(cacheObj).to.be.an('object');
      expect(cacheObj.hash).to.be.a('string');
      expect(cacheObj.output).to.be.an('object');

      // poison cache
      cacheObj.output.source = cacheObj.output.source.replace('hate', 'love');

      return builder.bundle(tree);
    })
    .then(function(output) {
      // verify buildTree use poisoned cache rather than recompiling
      var outputSource = output.source;
      expect(outputSource).not.to.contain('hate caches');
      expect(outputSource).to.contain('love caches');

      // invalidate poisoned cache entry and rebuild
      cacheObj.hash = 'out of date';
      return builder.bundle(tree);
    })
    .then(function(output) {
      // verify original source is used once more
      var outputSource = output.source;
      expect(outputSource).to.contain('hate caches');
      expect(outputSource).not.to.contain('love caches');
    });
  });

  test('Use trace cache when available', function() {
    // construct the load record for the cache
    var cacheObj = {
      trace: {
        'simple.js': {
          name: 'simple.js',
          path: 'fixtures/test-cache-tree/simple.js',
          metadata: {
            deps: [],
            format: 'amd',
            isAnon: true
          },
          deps: [],
          depMap: {},
          source: 'define([], function(module) {\n  console.log(\'fake cache\');\n});\n',
          originalSource: 'define([], function(module) {\n  console.log(\'fake cache\');\n});\n'
        }
      }
    };

    builder.reset();
    builder.setCache(cacheObj);

    return builder.bundle('simple.js').then(function(output) {
      expect(output.source).to.contain('fake cache');
    });
  });

  test('Cache invalidation', function() {
    var cacheObj = {
      trace: {
        'simple.js': {},
        'another/path.js': {}
      }
    };

    builder.reset();
    builder.setCache(cacheObj);

    var invalidated = builder.invalidate('*');
    assert.deepEqual(invalidated, [builder.loader.normalizeSync('simple.js'), builder.loader.normalizeSync('another/path.js')]);

    cacheObj = {
      trace: {
        'simple.js': {},
        'new/path.js': {},
        'deep/wildcard/test.js': {}
      }
    };

    builder.setCache(cacheObj);

    invalidated = builder.invalidate('new/path.js');
    assert.deepEqual(invalidated, [builder.loader.normalizeSync('new/path.js')]);

    invalidated = builder.invalidate('deep/*.js');
    assert.deepEqual(invalidated, [builder.loader.normalizeSync('deep/wildcard/test.js')]);
  });

  test('Bundle example', function() {
    var builder = new Builder('test/output');
    fs.writeFileSync('./test/output/dynamic-module.js', 'export var p = 5;');

    return builder.bundle('dynamic-module.js')
    .then(function(output) {
      assert(output.source.match(/p = 5/));

      fs.writeFileSync('./test/output/dynamic-module.js', 'export var p = 6;');
      builder.invalidate('dynamic-module.js');

      return builder.bundle('dynamic-module.js');
    })
    .then(function(output) {
      assert(output.source.match(/p = 6/));
    });
  });

  test('Bundle example with imported file', function() {
    var builder = new Builder('test/output');

    fs.writeFileSync('./test/output/dynamic-import.js', [
      'const d = 9;',
      'export default d;'
    ].join('\n'));

    fs.writeFileSync('./test/output/dynamic-main.js', [
      'import d from "./dynamic-import.js";',
      'console.log(d);'
    ].join('\n'));

    return builder.bundle('dynamic-main.js')
    .then(function(output) {
      assert(output.source.match(/d = 9/));
      assert(output.source.match(/console/));

      fs.writeFileSync('./test/output/dynamic-import.js', [
        'import "./dynamic-import2.js";', // Add another transitive dependency.
        'const d = 7;',
        'export default d;'
      ].join('\n'));
      builder.invalidate('dynamic-import.js');

      fs.writeFileSync('./test/output/dynamic-import2.js', [
        'const u = "transitive";',
        'export default u;'
      ].join('\n'));

      return builder.bundle('dynamic-main.js');
    })
    .then(function(output) {
      assert(output.source.match(/transitive/));
      assert(output.source.match(/d = 7/));
      assert(output.source.match(/console/));

      // Remove the transitive dependency from the build.
      fs.writeFileSync('./test/output/dynamic-import.js', [
        'const d = 7;',
        'export default d;'
      ].join('\n'));
      builder.invalidate('dynamic-import.js');

      return builder.bundle('dynamic-main.js');
    })
    .then(function(output) {
      assert(!output.source.match(/transitive/));
    });
  });

  test('Static build example statting check', function() {
    var builder = new Builder('test/output');

    fs.writeFileSync('./test/output/static-main.js', "import { testThing } from './static-test-module.js'; testThing();");
    fs.writeFileSync('./test/output/static-test-module.js', "export function testThing() { console.log('test'); }");

    return builder.buildStatic('static-main.js')
    .then(function() {
      builder.invalidate('static-main.js');
      // despite removing the file, it remains cached
      fs.unlinkSync('./test/output/static-test-module.js');
      return builder.buildStatic('static-main.js');
    });
  });

  test('Static build example dependency reload check', function() {
    var builder = new Builder('test/output');

    fs.writeFileSync('./test/output/static-main.js', "import { testThing } from './static-test-module.js'; testThing();");
    fs.writeFileSync('./test/output/static-test-module.js', "export function testThing() { console.log('test'); }");

    return builder.buildStatic('static-main.js')
    .then(function() {
      fs.writeFileSync('./test/output/static-test-module.js', "export function testThing() { console.log('new test'); }")
      builder.invalidate('static-test-module.js');
      return builder.buildStatic('static-main.js');
    });
  });

  test('Static build, fetch override', function () {
    var builder = new Builder('test/fixtures/test-tree');
    return builder.buildStatic('foo.js', {
      fetch: function (load, fetch) {
        if (load.name.indexOf('foo.js') !== -1) {
          return fs.readFileSync('test/fixtures/test-tree/cjs.js', 'utf8');
        } else {
          return fetch(load);
        }
      }
    });
  });

  test('Static string build', function () {
    var builder = new Builder('test/fixtures/test-tree');
    return builder.bundle('foo.js', {
      fetch: function (load, fetch) {
        if (load.name.indexOf('foo.js') !== -1) {
          return fs.readFileSync('test/fixtures/test-tree/cjs.js', 'utf8');
        } else {
          return fetch(load);
        }
      }
    });
  });
});
