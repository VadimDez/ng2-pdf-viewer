var Builder = require('../index');
var inline = require('../lib/output').inlineSourceMap;
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
if (process.argv[2] == 'typescript')
  global.ts = require('typescript');

var minify = true;

var err = function(e) {
  setTimeout(function() {
    throw e;
  });
};

var builder = new Builder('test/fixtures/test-tree', 'test/fixtures/test-tree.config.js');

function testPhantom(html) {
  return new Promise(function(resolve, reject) {
    spawn(path.resolve('node_modules/.bin/mocha-phantomjs' + (process.platform.match(/^win/) ? '.cmd' : '')), [html], { stdio: 'inherit' })
    .on('close', function(code) {
      if (code !== 0)
        reject(Error('Phantom test failed ' + html + ' failed.'));
      else
        resolve();
    });
  });
}

function doTests(transpiler) {

  test('In-memory build', function() {
    builder.reset();
    builder.config({ transpiler: transpiler });
    return builder.bundle('first.js', { sourceMaps: true, minify: minify })
    .then(function(output) {
      fs.writeFileSync('test/output/memory-test.js', inline(output.source, output.sourceMap));
    });
  });

  test('Multi-format tree build', function() {
    builder.reset();
    builder.config({ transpiler: transpiler });

    return builder.bundle('first.js', 'test/output/tree-build.js', { sourceMaps: true, minify: minify, globalDefs: { DEBUG: false } })
    .then(function(output) {
      assert(output.assetList[0].url);
      var treeFirst;
      Promise.all(['first.js', 'amd.js'].map(builder.trace.bind(builder)))
      .then(function(trees) {
        treeFirst = trees[0];
        return builder.bundle(builder.subtractTrees(trees[0], trees[1]), 'test/output/excluded.js');
      })

      .then(function() {
        return builder.trace('global-inner.js').then(function(tree) {
          return builder.bundle(tree, 'test/output/global-inner.js');
        });
      })

      .then(function() {
        return builder.trace('global-outer.js').then(function(tree) {
          return builder.bundle(tree, 'test/output/global-outer.js');
        });
      })

      .then(function() {
        return builder.trace('amd-1.js').then(function(tree) {
          return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/amd-1.js');
        });
      })

      .then(function() {
        return builder.trace('amd-2.js').then(function(tree) {
          return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/amd-2.js');
        });
      })

      .then(function() {
        return builder.trace('amd-3.js').then(function(tree) {
          return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/amd-3.js');
        });
      })

      .then(function() {
        return builder.trace('amd-4.js').then(function(tree) {
          return builder.getDeferredImports(tree)
          .then(function(deferredImports) {
            assert(deferredImports[0].name == 'x');
            return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/amd-4.js');
          });
        });
      })

      .then(function() {
        return builder.trace('amd-5a.js').then(function(tree) {
          return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/amd-5a.js');
        });
      })

      .then(function() {
        return builder.trace('amd-5b.js').then(function(tree) {
          return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/amd-5b.js');
        });
      })


      .then(function() {
        return builder.trace('amd-6a.js').then(function(tree) {
          return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/amd-6a.js');
        });
      })

      .then(function() {
        return builder.trace('amd-6b.js').then(function(tree) {
          return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/amd-6b.js');
        });
      })

      .then(function() {
        return builder.trace('umd.js').then(function(tree) {
          return builder.bundle(builder.subtractTrees(tree, treeFirst), 'test/output/umd.js');
        });
      })

      .then(function() {
        return builder.bundle('amd-7.js', 'test/output/amd-7.js');
      })

      .then(function() {
        return builder.bundle('amd-8.js', 'test/output/amd-8.js');
      })

      .then(function() {
        return builder.bundle('amd-9.js', 'test/output/amd-9.js');
      })

      .then(function() {
        return builder.bundle('amd-10.js', 'test/output/amd-10.js');
      })

      .then(function() {
        return builder.bundle('amd-11.js', 'test/output/amd-11.js');
      })

      .then(function() {
        return builder.bundle('amd-12.js', 'test/output/amd-12.js');
      })

      .then(function() {
        builder.loader.config({ paths: { 'output/*': './test/output/*' } });
        return builder.bundle('cjs-globals.js - output/amd-8.js', 'test/output/cjs-globals.js');
      })

      .then(function() {
        return builder.bundle('cjs-resolve.js', 'test/output/cjs-resolve.js');
      })

      .then(function() {
        return builder.bundle('runtime.js', 'test/output/runtime.js');
      })
    })
    .then(function () {
      return testPhantom('test/test-build.html');
    })
    ['catch'](function(err) {
      throw err;
    });
  });

  // traceur runtime function.bind fails in Phantom
  if (transpiler != 'traceur')
  test('SFX tree build', function() {
    builder.reset();
    builder.config({ transpiler: transpiler });
    builder.config({
      map: {
        'toamd1': 'amd-1.js'
      },
      meta: {
        'jquery-cdn': {
          build: false
        }
      }
    });
    return builder.buildStatic('toamd1', 'test/output/sfx.js', {
      runtime: true, 
      minify: minify, 
      format: 'global',
      globalDefs: { DEBUG: false }, 
      globalName: 'amd1',
      globalDeps: {
        'jquery-cdn': '$'
      }
    })
    .then(function() {
      return testPhantom('test/test-sfx.html');
    });
  });
}

suite('Basics', function() {
  test('Circular map config', function() {
    builder.reset();
    return builder.bundle('lodash');
  });
});

suite('Test tree builds - Traceur', function() {

  doTests('traceur');

});

suite('Test tree builds - Babel', function() {

  doTests('babel');

});

suite('Test tree builds - TypeScript', function() {

  doTests('typescript');
 
});

suite('Bundle Format', function() {
  test('Test AMD format', function() {
    return Promise.resolve()
    .then(function() {
      return builder.buildStatic('sfx-format-01.js', 'test/output/sfx-amd.js', { format: 'amd' });
    })
    .then(function() {
      return testPhantom('test/test-sfx-amd.html');
    });
  });
});



