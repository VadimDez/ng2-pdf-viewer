var rollup = require('rollup');
var traverseTree = require('./arithmetic').traverseTree;
var getConditionModule = require('./trace').getConditionModule;
var extend = require('./utils').extend;
var getAlias = require('./utils').getAlias;

exports.rollupTree = function(loader, tree, entryPoints, traceOpts, compileOpts) {
  /* 
   * 1. Determine the tree entry points and optimization points
   *
   * eg for the tree:
   * 
   * A -> B -> C
   * D -> C
   * 
   * A and D are the entry points.
   * Optimization points are ES module entry points to be optimized
   *
   */

  entryPoints = entryPoints.concat([]);

  var optimizationPoints = [];

  var entryMap = {};

  function isESM(moduleName) {
    return tree[moduleName] && tree[moduleName].metadata && tree[moduleName].metadata.format == 'esm' && !tree[moduleName].metadata.originalSource;
  }

  // for each module in the tree, we traverse the whole tree
  // we then relate each module in the tree to the first traced entry point
  Object.keys(tree).forEach(function(entryPoint) {
    traverseTree(tree, entryPoint, function(depName, parentName) {
      // esm from a non-esm parent means this is an optimization entry point from the linking alogorithm perspective
      if (parentName && isESM(depName) && !isESM(parentName) && optimizationPoints.indexOf(depName) == -1)
        optimizationPoints.push(depName);

      // if we have a entryMap for the given module, then stop
      if (entryMap[depName])
        return false;

      if (parentName)
        entryMap[depName] = entryPoint;
    }, traceOpts);
  });

  // the entry points are then the modules not represented in entryMap
  Object.keys(tree).forEach(function(entryPoint) {
    if (!entryMap[entryPoint] && tree[entryPoint] && entryPoints.indexOf(entryPoint) == -1)
      entryPoints.push(entryPoint);
  });

  // if all the entry points are ES modules, 
  // then we can create a single dummy entry point
  // that represents the tree
  var esmEntryPoints = 0;
  entryPoints.forEach(function(entryPoint) {
    if (tree[entryPoint].metadata && tree[entryPoint].metadata.format == 'esm')
      esmEntryPoints ++;
  });

  if (esmEntryPoints > 1 && esmEntryPoints == entryPoints.length) {
    var dummySource = 'export * from "' + entryPoints[0] + '";\n';
    var dummyDepMap = {};

    entryPoints.forEach(function(entryPoint) {
      dummyDepMap[entryPoint] = entryPoint;

      dummySource += 'import "' + entryPoint + '";';
    });

    tree['@dummy-entry-point'] = {
      name: '@dummy-entry-point',
      path: null,
      metadata: { format: 'esm' },
      deps: entryPoints,
      depMap: dummyDepMap,
      source: dummySource
    };
    entryPoints = ['@dummy-entry-point'];
  }

  // optimization points are then es module entry points
  entryPoints.forEach(function(entryPoint) {
    if (isESM(entryPoint) && optimizationPoints.indexOf(entryPoint) == -1)
      optimizationPoints.push(entryPoint);
  });

  /* 
   * 2. Determine unoptimizable modules, splitting them out into their own optimization points
   *
   * eg for the tree:
   *   A -> B -> C -> D
   *   E -> C -> D
   *
   * A, E are top-level entry points detected by the previous step
   *   (and hence optimization points if they are es modules)
   * C is not optimizable because it has two unique parent entry points
   *   (which is what this step looks for)
   * So C becomes its own optimization point
   * Leading to D inlining into C and B inlining into A
   *
   */

  // for each module in the tree, we track its parent optimization point
  // as soon as a module has two parent entry points, it is not optimizable
  // and we set it to undefined here. It then becomes its own optimizationPoint.
  var optimizationParentMap = {};

  // build up the parent entry point map as above
  // we use for over forEach because this list will grow as we go
  for (var i = 0; i < optimizationPoints.length; i++) {
    var entryPoint = optimizationPoints[i];
    traverseTree(tree, entryPoint, function(depName, parentName) {

      // we only traverse ES module tree subgraphs
      if (!isESM(depName))
        return false;

      if (depName == entryPoint)
        return;

      // dont traverse through other entry points
      if (optimizationPoints.indexOf(depName) != -1)
        return false;

      if (!optimizationParentMap[depName]) {
        optimizationParentMap[depName] = entryPoint;
        return;
      }

      // module in two separate entry point graphs -> it becomes its own optimization entry point
      if (optimizationParentMap[depName] != entryPoint) {
        optimizationParentMap[depName] = undefined;

        // this new optimization point will then be traversed in turn as part of this loop later
        optimizationPoints.push(depName);
      }
    }, traceOpts);
  }

  /*
   * 3. Given complete optimization points, populate subgraph externals
   *
   * eg for the graph
   *    A -> B -> C
   *  
   * Where A is the optimization point, and C is not ESM, another optimization point,
   * or not contained in our build tree, then we mark 'C' as an external.
   *
   * That is, optimizationGraphExternals[A] = [C]
   *
   * This externals input is used in the Rollup API.
   * This way we just optimize B into A, retaining an explicit dependency on C.
   */

  var inlinedModules = [];
  var optimizationGraphExternals = {};

  optimizationPoints.forEach(function(entryPoint) {
    // the subgraph object is the list of modules in the subgraph
    // and the list of modules that are "external" boundaries of the subgraph
    var externals = [];

    // this traversal is a bit odd, since we need to traverse the full 
    // dependency graph to detect externals, not just the direct build graph
    traverseTree(tree, entryPoint, function(depName, parentName) {
      if (!isESM(depName) || (depName != entryPoint && optimizationPoints.indexOf(depName) != -1))
        return false;

      var depLoad = tree[depName];
      depLoad.deps && depLoad.deps.forEach(function(depName) {
        depName = depLoad.depMap[depName];
        if (depName == entryPoint)
          return;

        // anything not ESM, not in the tree, or an optimization point, is external
        if (!isESM(depName) || optimizationPoints.indexOf(depName) != -1) {
          if (externals.indexOf(depName) == -1)
            externals.push(depName);
        }
        else {
          if (inlinedModules.indexOf(depName) == -1)
            inlinedModules.push(depName);
        }
      }, traceOpts);
    });

    optimizationGraphExternals[entryPoint] = externals;
  });

  // finally we rollup each optimization graph
  var rolledUpTree = {};
  Object.keys(tree).forEach(function(moduleName) {
    if (inlinedModules.indexOf(moduleName) == -1)
      rolledUpTree[moduleName] = tree[moduleName];
  });

  // compute the inlineMap
  var inlineMap = {};
  inlinedModules.forEach(function(moduleName) {
    var optimizationParent = optimizationParentMap[moduleName];
    (inlineMap[optimizationParent] = inlineMap[optimizationParent] || []).push(moduleName);
  });
  
  // if every module in the tree is rolled-up, then we can do a full tree rollup
  var fullTreeRollup = entryPoints.length == 1 && optimizationPoints.length == 1 && Object.keys(optimizationGraphExternals).length == 1;

  return Promise.all(Object.keys(optimizationGraphExternals).map(function(entryPoint) {
    var externals = optimizationGraphExternals[entryPoint];

    // if all externals are outside the tree then this really is a full tree rollup
    if (fullTreeRollup)
      externals.forEach(function(external) {
        if (tree[external])
          fullTreeRollup = false;
      });

    var aliasedExternals = externals.map(function(external) {
      var alias = getAlias(loader, external) || externals;
      if (alias.indexOf('#:') != -1)
        alias = alias.replace('#:', '/');
      return alias;
    });

    return rollup.rollup({
      entry: entryPoint,
      external: aliasedExternals,
      plugins: [{    
        resolveId: function(id, importer, options) {
          var resolved = importer ? tree[importer].depMap[id] : id;
          var externalIndex = externals.indexOf(resolved);
          if (externalIndex != -1)
            return aliasedExternals[externalIndex];
          return resolved;
        },
        load: function(id, options) {
          return {
            code: tree[id].metadata.originalSource || tree[id].source,
            map: tree[id].metadata.sourceMap
          };
        }
      }],
      onwarn: function(message) {}
    })
    .then(function(bundle) {
      var entryPointLoad = tree[entryPoint];

      var defaultExport = compileOpts.defaultExport;
      if (entryPointLoad.metadata.format != 'esm' && entryPointLoad.metadata.format != 'register')
        defaultExport = true;

      var generateOptions = {
        sourceMap: compileOpts.sourceMaps,
        exports: defaultExport ? 'default' : 'named'
      };

      // for a full tree rollup, we pass all the output options into rollup itself
      if (fullTreeRollup) {
        generateOptions.format = compileOpts.format;
        if (generateOptions.format == 'global')
          generateOptions.format = 'iife';
        if (generateOptions.format == 'esm')
          generateOptions.format = 'es6';

        if ((generateOptions.format == 'iife' || generateOptions.format == 'umd') &&
            !compileOpts.globalName)
          throw new Error('The globalName option must be set for full-tree rollup global and UMD builds.');

        if (compileOpts.globalName)
          generateOptions.moduleName = compileOpts.globalName;

        if (compileOpts.globalDeps)
          generateOptions.globals = compileOpts.globalDeps;
      }

      var output = bundle.generate(generateOptions);

      // convert sources list into paths
      if (output.map) {
        output.map.sources = output.map.sources.map(function(name) {
          name = loader.getCanonicalName(loader.decanonicalize(name));
          return tree[name] && tree[name].path || loader.decanonicalize(name);
        });
      }

      if (fullTreeRollup)
        return {
          source: output.code,
          sourceMap: output.map
        };

      // replace the entry point module itself with the inlined subgraph module
      var curInlined = inlineMap[entryPoint] || [];

      // the process of running rollup will itself normalize all dependencies
      // the depMap then just becomes the identity map for non-externals
      var inlinedDepMap = {};
      aliasedExternals.forEach(function(dep, index) {
        inlinedDepMap[dep] = externals[index];
      });

      rolledUpTree[entryPoint] = extend(extend({}, entryPointLoad), {
        deps: aliasedExternals,
        depMap: inlinedDepMap,
        metadata: extend(extend({}, entryPointLoad.metadata), {
          originalSource: undefined,
          sourceMap: output.map
        }),
        source: output.code
      });
    });
  }))
  .then(function(outputs) {
    if (fullTreeRollup)
      return {
        outputs: outputs
      };

    return {
      tree: rolledUpTree,
      inlineMap: inlineMap
    };
  });
};
