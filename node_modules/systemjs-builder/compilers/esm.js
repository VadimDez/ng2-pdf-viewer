var traceur = require('traceur');
var traceurGet = require('../lib/utils').traceurGet;

var ParseTreeTransformer = traceurGet('codegeneration/ParseTreeTransformer.js').ParseTreeTransformer;
var ModuleSpecifier = traceurGet('syntax/trees/ParseTrees.js').ModuleSpecifier;
var createStringLiteralToken = traceurGet('codegeneration/ParseTreeFactory.js').createStringLiteralToken;
var InstantiateModuleTransformer = traceurGet('codegeneration/InstantiateModuleTransformer.js').InstantiateModuleTransformer;

var extend = require('../lib/utils').extend;

// patch pending https://github.com/google/traceur-compiler/pull/2053
var createUseStrictDirective = traceurGet('codegeneration/ParseTreeFactory.js').createUseStrictDirective;
InstantiateModuleTransformer.prototype.__proto__.moduleProlog = function() {
  return [createUseStrictDirective()];
};


var CollectingErrorReporter = traceurGet('util/CollectingErrorReporter.js').CollectingErrorReporter;
var UniqueIdentifierGenerator = traceurGet('codegeneration/UniqueIdentifierGenerator.js').UniqueIdentifierGenerator;

function TraceurImportNormalizeTransformer(map) {
  this.map = map;
  return ParseTreeTransformer.apply(this, arguments);
}
TraceurImportNormalizeTransformer.prototype = Object.create(ParseTreeTransformer.prototype);
TraceurImportNormalizeTransformer.prototype.transformModuleSpecifier = function(tree) {
  var depName = this.map(tree.token.processedValue) || tree.token.processedValue;

  return new ModuleSpecifier(tree.location, createStringLiteralToken(depName));
};

exports.TraceurImportNormalizeTransformer = TraceurImportNormalizeTransformer;


function remap(source, map, fileName) {
  var compiler = new traceur.Compiler();

  var tree = compiler.parse(source, fileName);

  tree = new TraceurImportNormalizeTransformer(map).transformAny(tree);

  return Promise.resolve({
    source: compiler.write(tree)
  });
}
exports.remap = remap;

// override System instantiate to handle esm tracing
exports.attach = function(loader) {
  var systemInstantiate = loader.instantiate;
  loader.instantiate = function(load) {
    // skip plugin loader attachment || non es modules || es modules handled by internal transpilation layer
    if (!loader.builder || load.metadata.format != 'esm' || load.metadata.originalSource)
      return systemInstantiate.call(this, load);

    var depsList = load.metadata.deps.concat([]);

    var babel = require('babel-core');
    var output = babel.transform(load.source, {
      babelrc: false,
      filename: load.path,
      //sourceFileName: load.path,
      inputSourceMap: load.metadata.sourceMap,
      ast: true,
      resolveModuleSource: function(dep) {
        if (depsList.indexOf(dep) == -1)
          depsList.push(dep);
        return dep;
      }
    });
    // turn back on comments (for some reason!)
    output.ast.comments.forEach(function(comment) {
      comment.ignore = false;
    });
    load.metadata.ast = output.ast;

    return Promise.resolve({
      deps: depsList,
      execute: null
    });
  };
};

var versionCheck = true;

exports.compile = function(load, opts, loader) {
  if (!load.metadata.originalSource || load.metadata.loader && load.metadata.format == 'esm') {
    var babel = require('babel-core');

    var babelOptions = {
      babelrc: false,
      plugins: [[require('babel-plugin-transform-es2015-modules-systemjs'), { systemGlobal: opts.systemGlobal }]],
      filename: load.path,
      //sourceFileName: load.path,
      sourceMaps: opts.sourceMaps,
      inputSourceMap: load.metadata.sourceMap,
      moduleIds: !opts.anonymous,
      moduleId: !opts.anonymous && load.name,
      code: true,
      resolveModuleSource: function(dep) {
        if (opts.normalize)
          return load.depMap[dep];
        else
          return dep;
      }
    };

    var source = load.metadata.originalSource || load.source;

    var output;
    if (load.metadata.ast)
      output = babel.transformFromAst(load.metadata.ast, source, babelOptions);
    else
      output = babel.transform(source, babelOptions);

    // NB this can be removed with merging of ()
    if (opts.systemGlobal != 'System')
      output.code = output.code.replace(/(\s|^)System\.register\(/, '$1' + opts.systemGlobal + '.register(');

    // for some reason Babel isn't respecting sourceFileName...
    if (output.map)
      output.map.sources[0] = load.path;

    return Promise.resolve({
      source: output.code,
      sourceMap: output.map
    });
  }

  // ... legacy transpilation, to be deprecated with internal transpilation layer
  return Promise.resolve(global[loader.transpiler == 'typescript' ? 'ts' : loader.transpiler] || loader.pluginLoader.import(loader.transpiler))
  .then(function(transpiler) {
    if (transpiler.__useDefault)
      transpiler = transpiler['default'];

    if (transpiler.Compiler) {
      var options = loader.traceurOptions || {};
      options.modules = 'instantiate';
      options.script = false;
      options.sourceRoot = true;
      options.moduleName = !opts.anonymous;

      if (opts.sourceMaps)
        options.sourceMaps = 'memory';
      if (opts.lowResSourceMaps)
        options.lowResolutionSourceMap = true;

      if (load.metadata.sourceMap)
        options.inputSourceMap = load.metadata.sourceMap;

      var compiler = new transpiler.Compiler(options);

      var tree = compiler.parse(load.source, load.path);

      var transformer = new TraceurImportNormalizeTransformer(function(dep) {
        return opts.normalize ? load.depMap[dep] : dep;
      });

      tree = transformer.transformAny(tree);

      tree = compiler.transform(tree, load.name);

      var outputSource = compiler.write(tree, load.path);

      if (outputSource.match(/\$traceurRuntime/))
        load.metadata.usesTraceurRuntimeGlobal = true;

      return Promise.resolve({
        source: outputSource,
        sourceMap: compiler.getSourceMap()
      });
    }
    else if (transpiler.createLanguageService) {
      var options = loader.typescriptOptions || {};
      if (options.target === undefined)
        options.target = transpiler.ScriptTarget.ES5;
      options.module = transpiler.ModuleKind.System;
      
      var transpileOptions = { 
        compilerOptions: options, 
        renamedDependencies: load.depMap, 
        fileName: load.path, 
        moduleName: !opts.anonymous && load.name 
      };
      
      var transpiled = transpiler.transpileModule(load.source, transpileOptions);
      
      return Promise.resolve({
        source: transpiled.outputText,
        sourceMap: transpiled.sourceMapText
      });
    }
    else {
      if (versionCheck) {
        var babelVersion = transpiler.version;
        if (babelVersion.split('.')[0] > 5)
          console.log('Warning - using Babel ' + babelVersion + '. This version of SystemJS builder is designed to run against Babel 5.');
        versionCheck = false;
      }
        
      var options = extend({}, loader.babelOptions || {});
      options.modules = 'system';
      if (opts.sourceMaps)
        options.sourceMap = true;
      if (load.metadata.sourceMap)
        options.inputSourceMap = load.metadata.sourceMap;
      options.filename = load.path;
      options.filenameRelative = load.name;
      options.sourceFileName = load.path;
      options.keepModuleIdExtensions = true;
      options.code = true;
      options.ast = false;
      options.moduleIds = !opts.anonymous;
      options.externalHelpers = true;

      if (transpiler.version.match(/^4/))
        options.returnUsedHelpers = true;
      else if (transpiler.version.match(/^5\.[01234]\./))
        options.metadataUsedHelpers = true;

      if (opts.normalize)
        options.resolveModuleSource = function(dep) {
          return load.depMap[dep] || dep;
        };

      var output = transpiler.transform(load.source, options);

      var usedHelpers = output.usedHelpers || output.metadata && output.metadata.usedHelpers;

      if ((!options.optional || options.optional.indexOf('runtime') == -1) && usedHelpers.length)
        load.metadata.usesBabelHelpersGlobal = true;

      // pending Babel v5, we need to manually map the helpers
      if (options.optional && options.optional.indexOf('runtime') != -1)
        load.deps.forEach(function(dep) {
          if (dep.match(/^babel-runtime/))
            output.code = output.code.replace(dep, load.depMap[dep]);
        });

      // clear options for reuse
      delete options.filenameRelative;
      delete options.sourceFileName;

      return Promise.resolve({
        source: output.code,
        sourceMap: output.map
      });
    }
  })
  .then(function(output) {
    if (opts.systemGlobal != 'System')
      output.source = output.source.replace(/System\.register\(/, opts.systemGlobal + '.register(');
    return output;
  });
};
