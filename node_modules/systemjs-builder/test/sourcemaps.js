var fs = require('fs');
var Builder = require('../index');

function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
}

var err = function(e) {
  setTimeout(function() {
    throw e;
  });
};

var buildOpts = { sourceMaps: true };
var configFile = './test/fixtures/test-tree.config.js';

var compareSourceMaps = function(filename, expectation, done, transpiler) {
  var instance = new Builder();
  instance.loadConfigSync(configFile);
  buildOpts.config = buildOpts.config || {};
  buildOpts.config.transpiler = transpiler || 'traceur';
  instance.bundle(filename, null, buildOpts)
  .then(function(output) {
    assert.equal(output.sourceMap.toString(), expectation);
  })
  .then(done)
  .catch(err);
};

var readExpectation = function(filename) {
  return fs.readFileSync('test/fixtures/sourcemaps-expectations/' + filename).toString().replace(/\n$/, '');
};

function writeTestOutput(done) {
  var builder = new Builder();
  return builder.loadConfig(configFile)
    .then(function() {
      builder.buildStatic('first.js', 'test/output/output.js', buildOpts);
    })
    .then(done)
    .catch(err);
}

function writeSourceMaps(moduleName, transpiler, sourceMapFile) {
  var instance = new Builder();
  instance.loadConfigSync(configFile);
  buildOpts.config = buildOpts.config || {};
  buildOpts.config.transpiler = transpiler || 'traceur';
  instance.bundle(moduleName, null, buildOpts)
  .then(function(output) {
    fs.writeFile('test/fixtures/sourcemaps-expectations/' + sourceMapFile, output.sourceMap.toString());
  })
  .catch(err);
}

var toJSON = function(map) {
  return JSON.parse(map.toString());
};

var getSources = function(map) {
  return toJSON(map).sources;
};

suite('Source Maps', function() {
  suiteSetup(writeTestOutput);

  test('can render inline', function(done) {
    var module = 'amd-2.js';

    var instance = new Builder();
    instance.loadConfigSync(configFile);
    instance.bundle(module, null, { sourceMaps: 'inline' })
    .then(function(output) {
      assert.equal(undefined, output.sourceMap);
      var source = output.source;
      assert.equal(1, source.match(/sourceMappingURL=/g).length);
      var lines = output.source.split("\n");
      var lastLine = lines[lines.length - 1];
      var commentPrefix = /^\/\/# sourceMappingURL=data:application\/json;base64,/;
      assert(lastLine.match(commentPrefix));
      var encoding = lastLine.replace(commentPrefix, "");
      var decoded = JSON.parse(atob(encoding));
      // not a regular array so tedious
      assert.equal(1, decoded.sources.length);
      assert.equal('test/fixtures/test-tree/amd-2.js', decoded.sources[0]);
    })
    .then(done)
    .catch(err);
  });

  test('can consume input source maps', function(done) {
    var module = 'register.js';

    var instance = new Builder();
    instance.loadConfigSync(configFile);
    instance.bundle(module, null, { sourceMaps: true })
    .then(function(output) {
      var sources = getSources(output.sourceMap);
      assert.deepEqual(sources,
        [ "test/fixtures/test-tree/jquery.js",
          "test/fixtures/test-tree/global.js",
          "test/fixtures/test-tree/example",
          "test/fixtures/test-tree/example.js",
          "test/fixtures/test-tree/register.js",
          "test/fixtures/test-tree/babel.js" ]);
    })
    .then(done)
    .catch(err);
  });

  test('can be disabled for tracing', function(done) {
    var module = 'register.js';
    var instance = new Builder();

    // Load our test configuration.
    instance.loadConfigSync(configFile);

    instance
      .bundle(module, { sourceMaps: false })
      .then(function(output) {
        assert.isUndefined(output.sourceMap);
      })
      .then(done)
      .catch(err);
  });

  suite('sources paths', function() {

    test('are relative to outFile', function(done) {
      var builder = new Builder();
      builder.loadConfigSync(configFile);
      builder.buildStatic('first.js', 'test/output/output.js', buildOpts)
      .then(function(outputs) {
        var sources = getSources(outputs.sourceMap);
        assert.deepEqual(sources,
        [ '../fixtures/test-tree/third.js',
          '../fixtures/test-tree/cjs.js',
          '../fixtures/test-tree/second.js',
          '../fixtures/test-tree/jquery.js',
          '../fixtures/test-tree/global.js',
          '../fixtures/test-tree/some.js',
          '../fixtures/test-tree/text.txt',
          '../fixtures/test-tree/amd.js',
          '../fixtures/test-tree/component.jsx',
          '../fixtures/test-tree/file.json',
          '../fixtures/test-tree/first.js' ]);
      })
      .then(done)
      .catch(err);
    });

    test('are relative to baseURL, if no outFile', function(done) {
      var builder = new Builder();
      builder.config({ baseURL: 'test/fixtures/test-tree' });
      builder.loadConfigSync(configFile);
      var opts = { sourceMaps: true };
      builder.buildStatic('first.js', null, opts)
      .then(function(outputs) {
        var sources = getSources(outputs.sourceMap);
        assert.deepEqual(sources,
        [ 'third.js',
          'cjs.js',
          'second.js',
          'jquery.js',
          'global.js',
          'some.js',
          'text.txt',
          'amd.js',
          'component.jsx',
          'file.json',
          'first.js' ]);
      })
      .then(done)
      .catch(err);
    });
  });

  suite('Option: sourceMapContents', function() {
    test.skip('includes all file contents', function(done) {
      var builder = new Builder();
      builder.loadConfigSync(configFile);
      var opts = { sourceMaps: true, sourceMapContents: true };
      builder.buildStatic('first.js', null, opts)
      .then(function(outputs) {
        var map = toJSON(outputs.sourceMap);
        var sources = map.sources;
        var contents = map.sourcesContent;
        assert.equal(sources.length, contents.length);
        for (var i=0; i<contents.length; i++) {
          var content = contents[i];
          assert(content && content.length > 0, 'empty sourcemap content');
          assert.equal(content, fs.readFileSync(sources[i]).toString());
        }
      })
      .then(done)
      .catch(err);
    });
  });


  suite('Traceur', function() {
    var transpiler = 'traceur';

    suite('without input source maps', function() {
      test('handles single compilation targets correctly', function(done) {
        var module = 'amd-2.js';
        var source = 'traceur.tree.single.json';
        if (process.env.UPDATE_EXPECTATIONS)
          writeSourceMaps(module, transpiler, source);
        var expected = readExpectation(source);
        compareSourceMaps(module, expected, done, transpiler);
      });

      test('handles multiple compilation targets correctly', function(done) {
        var module = 'first.js';
        var source = 'traceur.tree.multi.json';
        if (process.env.UPDATE_EXPECTATIONS)
          writeSourceMaps(module, transpiler, source);
        var expected = readExpectation(source);
        compareSourceMaps(module, expected, done, transpiler);
      });
    });
  });

  suite('babel', function() {
    var transpiler = 'babel';

    suite('without input source maps', function() {
      test('handles single compilation targets correctly', function(done) {
        var module = 'amd-2.js';
        var source = 'babel.tree.single.json';
        if (process.env.UPDATE_EXPECTATIONS)
          writeSourceMaps(module, transpiler, source);
        var expected = readExpectation(source);
        compareSourceMaps(module, expected, done, transpiler);
      });

      test('handles multiple compilation targets correctly', function(done) {
        var module = 'first.js';
        var source = 'babel.tree.multi.json';
        if (process.env.UPDATE_EXPECTATIONS)
          writeSourceMaps(module, transpiler, source);
        var expected = readExpectation(source);
        compareSourceMaps(module, expected, done, transpiler);
      });
    });
  });
});
