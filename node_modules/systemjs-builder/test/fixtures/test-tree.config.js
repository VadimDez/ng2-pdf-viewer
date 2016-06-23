System.config({
  paths: {
    '*': './test/fixtures/test-tree/*',
    '*.jade': './test/dummy/*.jade',
    'babel': './node_modules/babel/node_modules/babel-core/browser.js',
    'babel-helpers': './node_modules/babel/node_modules/babel-core/external-helpers.js',
    'traceur': './node_modules/traceur/bin/traceur.js',
    'traceur-runtime': './node_modules/traceur/bin/traceur-runtime.js',
    'typescript': './node_modules/typescript/lib/typescript.js'
  },
  map: {
    lodash: 'lodash/lodash.js'
  },
  meta: {
    'babel': {
      format: 'global'
    },
    'jquery-cdn': {
      build: false
    },
    'cjs-globals.js': {
      globals: {
        Buffer: 'Buffer.js'
      }
    },
    '*.json': {
      loader: 'json-plugin.js'
    }
  }
});
