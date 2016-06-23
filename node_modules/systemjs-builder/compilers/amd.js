var System = require('systemjs');
var traceur = require('traceur');
var vm = require('vm');
var traceurGet = require('../lib/utils').traceurGet;

var ParseTreeTransformer = traceurGet('codegeneration/ParseTreeTransformer.js').ParseTreeTransformer;
var parseExpression = traceurGet('codegeneration/PlaceholderParser.js').parseExpression;

var CJSRequireTransformer = require('./cjs').CJSRequireTransformer;
var Promise = require('bluebird');

// First of two-pass transform
// lists number of define statements, the named module it defines (if any), and deps
// second pass will do rewriting based on this info
// we set this.anonDefine, which is true if there is one named define, or one anonymous define
// if there are more than one anonymous defines, it is invalid
function AMDDependenciesTransformer(map) {
  // optional mapping function
  this.map = map;
  this.anonDefine = false;
  this.anonDefineIndex = -1;
  this.anonNamed = false;
  this.deps = [];
  this.bundleDefines = [];
  this.defineRedefined = false;
  return ParseTreeTransformer.call(this);
}
AMDDependenciesTransformer.prototype = Object.create(ParseTreeTransformer.prototype);
AMDDependenciesTransformer.prototype.filterAMDDeps = function(deps) {
  var newDeps = [];
  var bundleDefines = this.bundleDefines;
  deps.forEach(function(dep) {
    if (['require', 'exports', 'module'].indexOf(dep) != -1)
      return;
    if (bundleDefines.indexOf(dep) != -1)
      return;
    newDeps.push(dep);
  });
  return newDeps;
};
// var define = x is the stopping point for handling a define
// we still allow (function(define) {})
// these are the same rules of the r.js optimizer

// var define disables until we quit the existing scope
AMDDependenciesTransformer.prototype.transformVariableDeclaration = function(tree) {
  if (tree.lvalue.identifierToken && tree.lvalue.identifierToken.value == 'define')
    this.defineRedefined = true;
  return tree;
};
// this catches the scope exit, although should be better handled than this (eg blocks for ES6)
AMDDependenciesTransformer.prototype.transformFunctionDeclaration = function(tree) {
  var defineRedefined = this.defineRedefined;
  tree = ParseTreeTransformer.prototype.transformFunctionDeclaration.call(this, tree);
  if (defineRedefined === false)
    this.defineRedefined = false;
  return tree;
};
AMDDependenciesTransformer.prototype.transformFunctionExpression = function(tree) {
  var defineRedefined = this.defineRedefined;
  tree = ParseTreeTransformer.prototype.transformFunctionExpression.call(this, tree);
  if (defineRedefined === false)
    this.defineRedefined = false;
  return tree;
};
AMDDependenciesTransformer.prototype.transformCallExpression = function(tree) {
  if (this.defineRedefined || !tree.operand.identifierToken || tree.operand.identifierToken.value != 'define')
    return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);

  var args = tree.args.args;
  var name;
  var depArg = -1;
  if (args[0].type == 'LITERAL_EXPRESSION' || args[1] && args[1].type == 'ARRAY_LITERAL') {
    name = args[0].literalToken && args[0].literalToken.processedValue || true;
    if (args[1] && args[1].type == 'ARRAY_LITERAL')
      depArg = 1;
  }
  else if (args[0].type == 'ARRAY_LITERAL') {
    depArg = 0;
  }

  var factoryArg = name && depArg == -1 ? 1 : depArg + 1;
  
  // ignore requires of the wrong form
  if (!args[factoryArg])
    return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);

  // note the define index
  // so we know which one to name for the second pass
  if (!this.anonDefine || this.anonNamed)
    this.anonDefineIndex++;

  var parseDeps = false;

  // anonymous define
  if (!name) {
    if (this.anonDefine && !this.anonNamed)
      throw new Error('Multiple anonymous defines.');
    
    this.anonDefine = true;
    this.anonNamed = false;
    parseDeps = true;
  }
  // named define
  else {
    if (typeof name != 'boolean') {
      this.bundleDefines.push(name);
      // remove any deps which exactly reference a name
      var depsIndex = this.deps.indexOf(name);
      if (depsIndex != -1)
        this.deps.splice(depsIndex, 1);
    }
    if (!this.anonDefine && this.anonDefineIndex == 0 && typeof name != 'boolean') {
      this.anonDefine = true;
      this.anonNamed = true;
      parseDeps = true;
    }
    else if (this.anonDefine && this.anonNamed) {
      this.anonDefine = false;
      this.anonNamed = false;
      this.deps = [];
    }
  }

  // only continue to extracting dependencies if this is THE anonymous define
  if (!parseDeps)
    return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);

  if (depArg != -1) {
    var deps = args[depArg].elements.map(function(dep) {
      return dep.literalToken.processedValue;
    });

    // apply the map
    var depMap = this.map;
    if (depMap)
      deps = deps.map(function(dep) {
        if (['require', 'exports', 'module'].indexOf(dep) != -1)
          return dep;
        return depMap(dep);
      });

    // store dependencies for trace
    this.deps = this.filterAMDDeps(deps);

    // this is ONLY a mutation for remap which will be deprecated
    args[depArg] = parseExpression([JSON.stringify(deps)]);

    return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);
  }

  if (depArg == -1 && args[factoryArg].type == 'FUNCTION_EXPRESSION') {
    var cjsFactory = args[factoryArg];
    // now we need to do a scope transformer for the require function at this position
    var fnParameters = cjsFactory.parameterList.parameters;
    var reqName = fnParameters[0] && fnParameters[0].parameter.binding.identifierToken.value;

    // now we create a new scope transformer and apply it to this function to find every call of
    // the function reqName, noting the require
    var cjsRequires = new CJSRequireTransformer(reqName);
    cjsFactory.body = cjsRequires.transformAny(cjsFactory.body);
    this.deps = this.filterAMDDeps(cjsRequires.requires);
  }

  return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);
};
exports.AMDDependenciesTransformer = AMDDependenciesTransformer;

// AMD System.registerDynamic transpiler
// This is the second of the two pass transform
function AMDDefineRegisterTransformer(moduleName, load, anonDefine, anonDefineIndex, depMap) {
  this.name = moduleName;
  this.load = load;
  this.anonDefine = anonDefine;
  this.anonDefineIndex = anonDefineIndex;
  this.curDefineIndex = -1;
  this.depMap = depMap;
  this.defineRedefined = false;
  return ParseTreeTransformer.call(this);
}
AMDDefineRegisterTransformer.prototype = Object.create(ParseTreeTransformer.prototype);
AMDDefineRegisterTransformer.prototype.transformVariableDeclaration = AMDDependenciesTransformer.prototype.transformVariableDeclaration;
AMDDefineRegisterTransformer.prototype.transformFunctionDeclaration = AMDDependenciesTransformer.prototype.transformFunctionDeclaration;
AMDDefineRegisterTransformer.prototype.transformFunctionExpression = AMDDependenciesTransformer.prototype.transformFunctionExpression;
AMDDefineRegisterTransformer.prototype.transformCallExpression = function(tree) {
  if (this.defineRedefined || !tree.operand.identifierToken || tree.operand.identifierToken.value != 'define')
    return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);

  var self = this;

  var args = tree.args.args;
  var name;
  var depArg = -1;
  if (args[0].type == 'LITERAL_EXPRESSION' || args[1] && args[1].type == 'ARRAY_LITERAL') {
    name = args[0].literalToken && args[0].literalToken.processedValue || true;
    if (args[1] && args[1].type == 'ARRAY_LITERAL')
      depArg = 1;
  }
  else if (args[0].type == 'ARRAY_LITERAL') {
    depArg = 0;
  }

  var factoryArg = name && depArg == -1 ? 1 : depArg + 1;
  
  // ignore requires of the wrong form
  // skip all named defines until we reach our anonymous define
  // then skip all further named defines
  if (!args[factoryArg] || ++this.curDefineIndex != this.anonDefineIndex)
    return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);


  var factoryTree = args[factoryArg];

  // put together normalized deps array
  var deps = [];
  if (depArg != -1) {
    deps = args[depArg].elements.map(function(dep) {
      var depVal = dep.literalToken.processedValue;
      return self.depMap[depVal] || depVal;
    });
    // amend deps with any extra dependencies from metadata
    deps = deps.concat(this.load.deps.map(function(dep) {
      return self.depMap[dep] || dep;
    }).filter(function(dep) {
      return deps.indexOf(dep) == -1;
    }));
  }
  else if (factoryTree.type == 'FUNCTION_EXPRESSION') {
    deps = ['require', 'exports', 'module'].splice(0, factoryTree.parameterList.parameters.length).concat(this.load.deps.map(function(dep) {
      return self.depMap[dep] || dep;
    }));
  }

  // normalize CommonJS-style requires in body
  var requireIndex = deps.indexOf('require');
  if (requireIndex != -1 && factoryTree.type == 'FUNCTION_EXPRESSION') {
    var fnParameters = factoryTree.parameterList.parameters;
    var reqName = fnParameters[requireIndex] && fnParameters[requireIndex].parameter.binding.identifierToken.value;
    var cjsRequireTransformer = new CJSRequireTransformer(reqName, function(v) { return self.depMap[v] || v });
    factoryTree.body = cjsRequireTransformer.transformAny(factoryTree.body);
  }

  // support for single named modules as doubling as anonymous modules
  /*
    define('jquery', function() {
      ...
    })
    ->
    define('this:name', function() {
      ...
    }), define('jquery', ['this:name'], function(m) { return m; })
  */
  var nameAlias = '';
  if (name && this.name && name != this.name)
    nameAlias = '&& define("' + name + '", ["' + this.name + '"], function(m) { return m; })';

  // write out the anonymous define as named and dep-normalized
  return parseExpression(['define(' + (this.name ? '"' + this.name + '", ' : '') + JSON.stringify(deps) + ', ', ')' + nameAlias + ';'], factoryTree);
};
exports.AMDDefineRegisterTransformer = AMDDefineRegisterTransformer;

function dedupe(deps) {
  var newDeps = [];
  for (var i = 0, l = deps.length; i < l; i++)
    if (newDeps.indexOf(deps[i]) == -1)
      newDeps.push(deps[i])
  return newDeps;
}

function group(deps) {
  var names = [];
  var indices = [];
  for (var i = 0, l = deps.length; i < l; i++) {
    var index = names.indexOf(deps[i]);
    if (index === -1) {
      names.push(deps[i]);
      indices.push([i]);
    }
    else {
      indices[index].push(i);
    }
  }
  return { names: names, indices: indices };
}

// override System instantiate to handle AMD dependencies
exports.attach = function(loader) {
  var systemInstantiate = loader.instantiate;
  loader.instantiate = function(load) {
    var loader = this;

    return systemInstantiate.call(this, load).then(function(result) {
      if (load.metadata.format == 'amd') {
        // extract AMD dependencies using tree parsing
        // NB can remove after Traceur 0.0.77
        if (!load.source) load.source = ' ';
        var compiler = new traceur.Compiler({ script: true, sourceRoot: true });
        load.metadata.parseTree = compiler.parse(load.source, load.path);
        var depTransformer = new AMDDependenciesTransformer();
        depTransformer.transformAny(load.metadata.parseTree);

        // we store the results as meta
        load.metadata.anonDefine = depTransformer.anonDefine;
        load.metadata.anonDefineIndex = depTransformer.anonDefineIndex;

        var entry = loader.defined[load.name];
        entry.deps = dedupe(depTransformer.deps.concat(load.metadata.deps));

        load.metadata.builderExecute = function(require, exports, module) {
          var removeDefine = loader.get('@@amd-helpers').createDefine(loader);

          // NB source maps, System overwriting skipped here
          vm.runInThisContext(load.source);

          removeDefine(loader);

          var lastModule = loader.get('@@amd-helpers').lastModule;

          if (!lastModule.anonDefine && !lastModule.isBundle)
            throw new TypeError('AMD module ' + load.name + ' did not define');

          if (lastModule.anonDefine)
            return lastModule.anonDefine.execute.apply(this, arguments);

          lastModule.isBundle = false;
          lastModule.anonDefine = null;
        };

        // first, normalize all dependencies
        var normalizePromises = [];
        for (var i = 0, l = entry.deps.length; i < l; i++)
          normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

        return Promise.all(normalizePromises).then(function(normalizedDeps) {
          entry.normalizedDeps = normalizedDeps;
          entry.originalIndices = group(entry.deps);

          return {
            deps: entry.deps,
            execute: result.execute
          };
        });
      }

      return result;
    });
  };
};

exports.remap = function(source, map, fileName) {
  var options = { script: true, sourceRoot: true };
  var compiler = new traceur.Compiler(options);
  var tree = compiler.parse(source, fileName || '');
  var transformer = new AMDDependenciesTransformer(map);
  tree = transformer.transformAny(tree);

  var output = compiler.write(tree);
  return Promise.resolve(output);
};


// converts anonymous AMDs into named AMD for the module
exports.compile = function(load, opts, loader) {
  var normalize = opts.normalize;
  var options = { sourceRoot: true, script: true };
  if (opts.sourceMaps)
    options.sourceMaps = 'memory';
  if (opts.lowResSourceMaps)
    options.lowResolutionSourceMap = true;

  if (load.metadata.sourceMap)
    options.inputSourceMap = load.metadata.sourceMap;

  var compiler = new traceur.Compiler(options);

  var tree = load.metadata.parseTree || compiler.parse(load.source, load.path);
  var transformer = new AMDDefineRegisterTransformer(!opts.anonymous && load.name, load, load.metadata.anonDefine, load.metadata.anonDefineIndex, normalize ? load.depMap : {});
  tree = transformer.transformAny(tree);

  var output = compiler.write(tree, load.path);

  // AMD define extraction via parsing stops on var define redefinitions
  // so this creates a natural boundary to allow future folds of this same code through rebundling
  return Promise.resolve({
    source: '(function() {\nvar define = ' + opts.systemGlobal + '.amdDefine;\n' + output + '\n})();',
    sourceMap: compiler.getSourceMap(),
    sourceMapOffset: 2
  });
};

exports.sfx = function(loader) {
  return require('fs').readFileSync(require('path').resolve(__dirname, '../templates/amd-helpers.min.js')).toString();
};
