var Promise = require('bluebird');
var asp = require('bluebird').promisify;
var fs = require('fs');
var path = require('path');
var url = require('url');
var createHash = require('crypto').createHash;
var template = require('es6-template-strings');
var getAlias = require('./utils').getAlias;
var extend = require('./utils').extend;
var traverseTree = require('./arithmetic').traverseTree;
var verifyTree = require('./utils').verifyTree;
var getFormatHint = require('./utils').getFormatHint;

var compilerMap = {
  'amd': '../compilers/amd',
  'cjs': '../compilers/cjs',
  'esm': '../compilers/esm',
  'global': '../compilers/global',
  'register': '../compilers/register',
  'json': '../compilers/json'
};

// create a compile hash based on path + source + metadata + compileOpts
// one implication here is that plugins shouldn't rely on System.x checks
// as these will not be cache-invalidated but within the bundle hook is fine
function getCompileHash(load, compileOpts) {
  return createHash('md5')
  .update(JSON.stringify({
    source: load.source,
    metadata: load.metadata,
    path: compileOpts.sourceMaps && load.path,

    normalize: compileOpts.normalize,
    anonymous: compileOpts.anonymous,
    systemGlobal: compileOpts.systemGlobal,
    static: compileOpts.static,
    encodeNames: compileOpts.encodeNames,
    sourceMaps: compileOpts.sourceMaps,
    lowResSourceMaps: compileOpts.lowResSourceMaps
  }))
  .digest('hex');
}

function getEncoding(canonical, encodings, loader) {
  // dont encode system modules
  if (canonical[0] == '@' && canonical != '@dummy-entry-point' && loader.has(canonical))
    return canonical;

  // return existing encoding if present
  if (encodings[canonical])
    return encodings[canonical];

  // search for the first available key
  var highestEncoding = 0;
  Object.keys(encodings).forEach(function(canonical) {
    var encoding = encodings[canonical];
    highestEncoding = Math.max(parseInt(encoding, '16'), highestEncoding);
  });

  highestEncoding++;

  return encodings[canonical] = highestEncoding.toString(16);
}
function getName(encoding, encodings) {
  var match
  Object.keys(encodings).some(function(e) {
    if (encodings[e] == encoding) {
      match = e;
      return true;
    }
  });
  return match;
}

// used to support leading #!/usr/bin/env in scripts as supported in Node
var hashBangRegEx = /^\#\!.*/;

exports.compileLoad = compileLoad;
function compileLoad(loader, load, compileOpts, cache) {
  // use cached if we have it
  var cached = cache.loads[load.name];
  if (cached && cached.hash == getCompileHash(load, compileOpts))
    return Promise.resolve(cached.output);

  // create a new load record with any necessary final mappings
  function remapLoadRecord(load, mapFunction) {
    load = extend({}, load);
    load.name = mapFunction(load.name, load.name);
    var depMap = {};
    Object.keys(load.depMap).forEach(function(dep) {
      depMap[dep] = mapFunction(load.depMap[dep], dep);
    });
    load.depMap = depMap;
    return load;
  }
  var mappedLoad = remapLoadRecord(load, function(name, original) {
    // do SFX encodings
    if (compileOpts.encodeNames)
      return getEncoding(name, cache.encodings, loader);

    if (compileOpts.normalize && name.indexOf('#:') != -1)
      throw new Error('Unable to build dependency ' + name + '. normalize must be disabled for bundles containing conditionals.');

    return name;
  });

  var format = load.metadata.format;

  if (format == 'defined')
    return Promise.resolve({ source:  compileOpts.systemGlobal + '.register("' + mappedLoad.name + '", [], function() { return { setters: [], execute: function() {} } });\n' });

  if (format in compilerMap) {
    if (format == 'cjs')
      mappedLoad.source = mappedLoad.source.replace(hashBangRegEx, '');
    return Promise.resolve()
    .then(function() {
      return require(compilerMap[format]).compile(mappedLoad, compileOpts, loader);
    })
    .then(function(output) {
      // store compiled output in cache
      cache.loads[load.name] = {
        hash: getCompileHash(load, compileOpts),
        output: output
      };

      return output;
    })
    .catch(function(err) {
      // Traceur has a habit of throwing array errors
      if (err instanceof Array)
        err = err[0];
      err.message = 'Error compiling ' + format + ' module "' + load.name + '" at ' + load.path + '\n\t' + err.message;
      throw err;
    });
  }

  return Promise.reject(new TypeError('Unknown module format ' + format));
}

// sort in reverse pre-order, filter modules to actually built loads (excluding conditionals, build: false)
// (exported for unit testing)
exports.getTreeModulesPostOrder = getTreeModulesPostOrder;
function getTreeModulesPostOrder(tree, traceOpts) {
  var entryPoints = [];

  // build up the map of parents of the graph
  var entryMap = {};

  var moduleList = Object.keys(tree).filter(function(module) {
    return tree[module] !== false;
  }).sort();

  // for each module in the tree, we traverse the whole tree
  // we then relate each module in the tree to the first traced entry point
  moduleList.forEach(function(entryPoint) {
    traverseTree(tree, entryPoint, function(depName, parentName) {
      // if we have a entryMap for the given module, then stop
      if (entryMap[depName])
        return false;

      if (parentName)
        entryMap[depName] = entryPoint;
    }, traceOpts);
  });

  // the entry points are then the modules not represented in entryMap
  moduleList.forEach(function(entryPoint) {
    if (!entryMap[entryPoint])
      entryPoints.push(entryPoint);
  });

  // now that we have the entry points, sort them alphabetically and 
  // run the traversal to get the ordered module list
  entryPoints = entryPoints.sort();

  var modules = [];

  entryPoints.reverse().forEach(function(moduleName) {
    traverseTree(tree, moduleName, function(depName, parentName) {
      if (modules.indexOf(depName) == -1)
        modules.push(depName);
    }, traceOpts, true);
  });

  return {
    entryPoints: entryPoints,
    modules: modules.reverse()
  };
}

exports.compileTree = compileTree;
function compileTree(loader, tree, traceOpts, compileOpts, outputOpts, cache) {

  // verify that the tree is a tree
  verifyTree(tree);

  var ordered = getTreeModulesPostOrder(tree, traceOpts);

  var inputEntryPoints;

  // get entrypoints from graph algorithm
  var entryPoints;

  var modules;

  // plugins have the ability to report an asset list during builds
  var assetList = [];

  var outputs = [];

  // store plugins with a bundle hook to allow post-processing
  var pluginLoads = {};
  var compilers = {};

  return Promise.resolve()
  .then(function() {
    // compileOpts.entryPoints can be unnormalized
    if (!compileOpts.entryPoints)
      return [];

    return Promise.all(compileOpts.entryPoints.map(function(entryPoint) {
      return loader.normalize(entryPoint)
      .then(function(normalized) {
        return loader.getCanonicalName(normalized);
      });
    }))
    .filter(function(inputEntryPoint) {
      // skip conditional entry points and entry points not in the tree (eg rollup optimized out)
      return !inputEntryPoint.match(/\#\:|\#\?|\#{/) && tree[inputEntryPoint];
    })
  })
  .then(function(inputEntryPoints) {
    entryPoints = inputEntryPoints || [];
    
    ordered.entryPoints.forEach(function(entryPoint) {
      if (entryPoints.indexOf(entryPoint) == -1)
        entryPoints.push(entryPoint);
    });

    modules = ordered.modules.filter(function(moduleName) {
      var load = tree[moduleName];
      if (load.runtimePlugin && compileOpts.static)
        throw new TypeError('Plugin ' + load.plugin + ' does not support static builds, compiling ' + load.name + '.');
      return load && !load.conditional && !load.runtimePlugin;
    });

    if (compileOpts.encodeNames)
      entryPoints = entryPoints.map(function(name) {
        return getEncoding(name, cache.encodings, loader);
      });
  })

  // create load output objects
  .then(function() {
    return Promise.all(modules.map(function(name) {
      return Promise.resolve()
      .then(function() {
        var load = tree[name];

        if (load === true)
          throw new TypeError(name + ' was defined via a bundle, so can only be used for subtraction or union operations.');

        // store plugin loads for bundle hook
        if (load.metadata.loader) {
          var pluginLoad = extend({}, load);
          pluginLoad.address = loader.baseURL + load.path;
          (pluginLoads[load.metadata.loader] = pluginLoads[load.metadata.loader] || []).push(pluginLoad);
        }

        return compileLoad(loader, tree[name], compileOpts, cache);
      });
    }));
  })
  .then(function(compiled) {
    outputs = outputs.concat(compiled);
  })

  // run plugin bundle hook
  .then(function() {
    return Promise.all(Object.keys(pluginLoads).map(function(pluginName) {
      var loads = pluginLoads[pluginName];
      var loaderModule = loads[0].metadata.loaderModule;

      return Promise.resolve()
      .then(function() {
        if (loaderModule.listAssets)
          return Promise.resolve(loaderModule.listAssets.call(loader.pluginLoader, loads, compileOpts, outputOpts))
          .then(function(_assetList) {
            assetList = assetList.concat(_assetList.map(function(asset) {
              return {
                url: asset.url,
                type: asset.type,
                source: asset.source,
                sourceMap: asset.sourceMap
              };
            }));
          });
      })
      .then(function() {
        if (compileOpts.inlinePlugins) {
          if (loaderModule.inline) {
            return Promise.resolve(loaderModule.inline.call(loader.pluginLoader, loads, compileOpts, outputOpts));
          }
          // NB deprecate bundle hook for inline hook
          else if (loaderModule.bundle) {
            // NB deprecate the 2 argument form
            if (loaderModule.bundle.length < 3)
              return Promise.resolve(loaderModule.bundle.call(loader.pluginLoader, loads, extend(extend({}, compileOpts), outputOpts)));
            else
              return Promise.resolve(loaderModule.bundle.call(loader.pluginLoader, loads, compileOpts, outputOpts));
          }
        }
      });
    }))
    .then(function(compiled) {
      compiled = compiled || [];
      compiled.forEach(function(output) {
        if (output instanceof Array)
          outputs = outputs.concat(output);
        else if (output)
          outputs.push(output);
      });
    });
  })
  .then(function() {

    // if any module in the bundle is AMD, add a "bundle" meta to the bundle
    // this can be deprecated if https://github.com/systemjs/builder/issues/264 lands
    if (modules.some(function(name) {
          return tree[name].metadata.format == 'amd';
        }) && !compileOpts.static)
      outputs.unshift('"bundle";');

    // static bundle wraps with a self-executing loader
    if (compileOpts.static)
      return wrapSFXOutputs(loader, tree, modules, outputs, entryPoints, compileOpts, cache);

    return outputs;
  })
  .then(function(outputs) {
    // NB also include all aliases of all entryPoints along with entryPoints
    return {
      outputs: outputs,
      entryPoints: entryPoints,
      assetList: assetList,
      modules: modules.reverse()
    };
  });
}

exports.wrapSFXOutputs = wrapSFXOutputs;
function wrapSFXOutputs(loader, tree, modules, outputs, entryPoints, compileOpts, cache) {
  var compilers = {};

  // NB deprecate
  if (compileOpts.format == 'es6')
    compileOpts.format = 'esm';

  var externalDeps = [];

  // all System.register static builds get simplified wrapper
  // NB the next optimization step is to do no wrapping for the single module cases
  var allRegister = true;

  Object.keys(tree).forEach(function(module) {
    if (tree[module] === false && !loader.has(module))
      externalDeps.push(module);
  });

  externalDeps.sort();

  // determine compilers used
  var legacyTranspiler = false;
  modules.forEach(function(name) {
    if (!legacyTranspiler && tree[name].metadata.originalSource)
      legacyTranspiler = true;
    if (tree[name].metadata.format != 'esm' && tree[name].metadata.format != 'register')
      allRegister = false;
    compilers[tree[name].metadata.format] = true;
  });

  // include compiler helpers at the beginning of outputs
  Object.keys(compilerMap).forEach(function(format) {
    if (!compilers[format])
      return;
    var compiler = require(compilerMap[format]);
    if (compiler.sfx)
      outputs.unshift(compiler.sfx(loader));
  });

  // determine if the SFX bundle has any external dependencies it relies on
  var globalDeps = [];
  modules.forEach(function(name) {
    var load = tree[name];

    // check all deps are present
    load.deps.forEach(function(dep) {
      var key = load.depMap[dep];
      if (!(key in tree) && !loader.has(key)) {
        if (compileOpts.format == 'esm')
          throw new TypeError('ESM static builds with externals only work when all modules in the build are ESM.');

        if (externalDeps.indexOf(key) == -1)
          externalDeps.push(key);
      }
    });
  });

  var externalDepIds = externalDeps.map(function(dep) {
    if (compileOpts.format == 'global' || 
        compileOpts.format == 'umd' && (compileOpts.globalName || Object.keys(compileOpts.globalDeps).length > 0)) {
      var alias = getAlias(loader, dep);
      var globalDep = compileOpts.globalDeps[dep] || compileOpts.globalDeps[alias];
      if (!globalDep)
        throw new TypeError('Global SFX bundle dependency "' + alias +
         '" must be configured to an environment global via the globalDeps option.');

      globalDeps.push(globalDep);
    }

    // remove external deps from calculated entry points list
    var entryPointIndex = entryPoints.indexOf(dep);
    if (entryPointIndex != -1)
      entryPoints.splice(entryPointIndex, 1);

    if (compileOpts.encodeNames)
      return getEncoding(dep, cache.encodings, loader);
    else
      return dep;
  });

  // next wrap with the core code
  return asp(fs.readFile)(path.resolve(__dirname, (allRegister ? '../templates/sfx-core-register.min.js' : '../templates/sfx-core.min.js')))
  .then(function(sfxcore) {
    // for NodeJS execution to work correctly, we need to ensure the scoped module, exports and require variables are nulled out
    outputs.unshift("var require = this.require, exports = this.exports, module = this.module;");

    // if the first entry point is a dynamic module, then it is exportDefault always by default
    var exportDefault = compileOpts.exportDefault;
    var exportedLoad = tree[compileOpts.encodeNames && getName(entryPoints[0], cache.encodings) || entryPoints[0]];
    if (exportedLoad && exportedLoad.metadata.format != 'register' && exportedLoad.metadata.format != 'esm')
      exportDefault = true;

    outputs.unshift(sfxcore.toString(), "(" + JSON.stringify(entryPoints) + ", " + JSON.stringify(externalDepIds) + ", " + 
        (exportDefault ? "true" : "false") + ", function(" + compileOpts.systemGlobal + ") {");

    outputs.push("})");
    return asp(fs.readFile)(path.resolve(__dirname, '../templates/sfx-' + compileOpts.format + '.js'));
  })
  // then include the sfx module format wrapper
  .then(function(formatWrapper) {
    outputs.push(template(formatWrapper.toString(), {
      deps: externalDeps.map(function(dep) {
        if (dep.indexOf('#:') != -1)
          dep = dep.replace('#:/', '/');
        var name = getAlias(loader, dep);
        return name;
      }),
      globalDeps: globalDeps,
      globalName: compileOpts.globalName
    }));
  })
  // then wrap with the runtime
  .then(function() {
    if (!legacyTranspiler)
      return;

    // NB legacy runtime wrappings
    var usesBabelHelpersGlobal = modules.some(function(name) {
      return tree[name].metadata.usesBabelHelpersGlobal;
    });
    // regenerator runtime check
    if (!usesBabelHelpersGlobal)
      usesBabelHelpersGlobal = modules.some(function(name) {
        return tree[name].metadata.format == 'esm' && cache.loads[name].output.source.match(/regeneratorRuntime/);
      });
    if (compileOpts.runtime && usesBabelHelpersGlobal)
      return getModuleSource(loader, 'babel/external-helpers')
      .then(function(source) {
        outputs.unshift(source);
      });
  })
  .then(function() {
    if (!legacyTranspiler)
      return;

    // NB legacy runtime wrappings to eb deprecated
    var usesTraceurRuntimeGlobal = modules.some(function(name) {
      return tree[name].metadata.usesTraceurRuntimeGlobal;
    });
    if (compileOpts.runtime && usesTraceurRuntimeGlobal)
      return getModuleSource(loader, 'traceur-runtime')
      .then(function(source) {
        // protect System global clobbering
        outputs.unshift("(function(){ var curSystem = typeof System != 'undefined' ? System : undefined;\n" + source + "\nSystem = curSystem; })();");
      });
  })
  // for AMD, CommonJS and global SFX outputs, add a "format " meta to support SystemJS loading
  .then(function() {
    if (compileOpts.formatHint)
      outputs.unshift(getFormatHint(compileOpts));
  })
  .then(function() {
    return outputs;
  });
}

exports.attachCompilers = function(loader) {
  Object.keys(compilerMap).forEach(function(compiler) {
    var attach = require(compilerMap[compiler]).attach;
    if (attach)
      attach(loader);
  });
};

function getModuleSource(loader, module) {
  return loader.normalize(module)
  .then(function(normalized) {
    return loader.locate({ name: normalized, metadata: {} });
  })
  .then(function(address) {
    return loader.fetch({ address: address, metadata: {} });
  })
  .then(function(fetched) {
    // allow to be a redirection module
    var redirection = fetched.toString().match(/^\s*module\.exports = require\(\"([^\"]+)\"\);\s*$/);
    if (redirection)
      return getModuleSource(loader, redirection[1]);
    return fetched;
  })
  .catch(function(err) {
    console.log('Unable to find helper module "' + module + '". Make sure it is configured in the builder.');
    throw err;
  });
}





