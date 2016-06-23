var traceur = require('traceur');
var traceurGet = require('../lib/utils').traceurGet;
var ParseTreeTransformer = traceurGet('codegeneration/ParseTreeTransformer.js').ParseTreeTransformer;
var parseStatements = traceurGet('codegeneration/PlaceholderParser.js').parseStatements;
var parseStatement = traceurGet('codegeneration/PlaceholderParser.js').parseStatement;
var parseExpression = traceurGet('codegeneration/PlaceholderParser.js').parseExpression;
var Script = traceurGet('syntax/trees/ParseTrees.js').Script;
var FunctionBody = traceurGet('syntax/trees/ParseTrees.js').FunctionBody;

// wraps global scripts
function GlobalTransformer(name, deps, exportName, globals, systemGlobal) {
  this.name = name;
  this.deps = deps;
  this.exportName = exportName;
  this.varGlobals = [];
  this.fnGlobals = [];
  this.globals = globals;
  this.inOuterScope = true;
  this.systemGlobal = systemGlobal;
  return ParseTreeTransformer.call(this);
}

GlobalTransformer.prototype = Object.create(ParseTreeTransformer.prototype);

GlobalTransformer.prototype.transformVariableDeclarationList = function(tree) {
  this.isVarDeclaration = tree.declarationType == 'var';
  return ParseTreeTransformer.prototype.transformVariableDeclarationList.call(this, tree);
}

GlobalTransformer.prototype.transformVariableDeclaration = function(tree) {
  tree = ParseTreeTransformer.prototype.transformVariableDeclaration.call(this, tree);

  if (!this.inOuterScope || !this.isVarDeclaration)
    return tree;

  var varName = tree.lvalue.identifierToken.value;
  if (this.varGlobals.indexOf(varName) == -1)
    this.varGlobals.push(varName);

  return tree;
}
GlobalTransformer.prototype.enterScope = function() {
  var revert = this.inOuterScope;
  this.inOuterScope = false;
  return revert;
}
GlobalTransformer.prototype.exitScope = function(revert) {
  if (revert)
    this.inOuterScope = true;
}

GlobalTransformer.prototype.transformFunctionDeclaration = function(tree) {
  // named functions in outer scope are globals
  if (this.inOuterScope && tree.name)
    this.fnGlobals.push(tree.name.identifierToken.value);
  var revert = this.enterScope();
  tree = ParseTreeTransformer.prototype.transformFunctionDeclaration.call(this, tree);
  this.exitScope(revert);
  return tree;
}

GlobalTransformer.prototype.transformFunctionExpression = function(tree) {
  var revert = this.enterScope();
  tree = ParseTreeTransformer.prototype.transformFunctionExpression.call(this, tree);
  this.exitScope(revert);
  return tree;
}

GlobalTransformer.prototype.transformScript = function(tree) {
  tree = ParseTreeTransformer.prototype.transformScript.call(this, tree);

  // hoist function declaration assignments to the global
  var scriptItemList = this.fnGlobals.map(function(g) {
    return parseStatement(['this["' + g + '"] = ' + g + ';']);
  })
  // for globals defined as "var x = 5;" in outer scope, add "this.x = x;" at end
  .concat(this.varGlobals.map(function(g) {
    return parseStatement(['var ' + g + ' = this["' + g + '"];']);
  }))
  .concat(tree.scriptItemList).concat(this.varGlobals.map(function(g) {
    return parseStatement(['this["' + g + '"] = ' + g + ';']);
  }));

  var wrapperFunction = parseExpression(['function() {}'])
  wrapperFunction.location = null;
  wrapperFunction.body = new FunctionBody(null, scriptItemList);

  var globalExpression;
  if (this.globals) {
    var nl = '\n    ';
    globalExpression = '{';
    var first = true;
    for (var g in this.globals) {
      if (!this.globals[g])
        continue;
      globalExpression += (first ? '' : ',') + nl + '"' + g + '": $__require("' + this.globals[g] + '")';
      first = false;
    }
    globalExpression += nl + '}';
  }

  return new Script(tree.location, parseStatements([
      this.systemGlobal + '.registerDynamic(' + (this.name ? '"' + this.name + '", ' : '') + JSON.stringify(this.deps) + ', false, function($__require, $__exports, $__module) {\n'
      + 'var _retrieveGlobal = ' + this.systemGlobal + '.get("@@global-helpers").prepareGlobal($__module.id, '
      + (this.exportName ? '"' + this.exportName + '"' : 'null') + ', ' + (globalExpression ? globalExpression : 'null') + ');\n'
      + '  (',
      ')();\n'
      + '  return _retrieveGlobal();\n'
      + '});'], wrapperFunction));
}
exports.GlobalTransformer = GlobalTransformer;

exports.compile = function(load, opts, loader) {
  var options = { script: true, sourceRoot: true };

  if (opts.sourceMaps)
    options.sourceMaps = 'memory';
  if (opts.lowResSourceMaps)
    options.lowResolutionSourceMap = true;

  if (load.metadata.sourceMap)
    options.inputSourceMap = load.metadata.sourceMap;

  var compiler = new traceur.Compiler(options);
  var tree = compiler.parse(load.source, load.path);

  var deps = opts.normalize ? load.deps.map(function(dep) { return load.depMap[dep]; }) : load.deps;

  // send normalized globals into the transformer
  var normalizedGlobals
  if (load.metadata.globals) {
    normalizedGlobals = {};
    for (var g in load.metadata.globals)
      normalizedGlobals[g] = opts.normalize ? load.depMap[load.metadata.globals[g]] : load.metadata.globals[g];
  }

  var transformer = new GlobalTransformer(!opts.anonymous && load.name, deps, load.metadata.exports, normalizedGlobals, opts.systemGlobal);
  tree = transformer.transformAny(tree);

  var output = compiler.write(tree, load.path);

  return Promise.resolve({
    source: output,
    sourceMap: compiler.getSourceMap()
  });
};


exports.sfx = function(loader) {
  return require('fs').readFileSync(require('path').resolve(__dirname, '../templates/global-helpers.min.js')).toString();
};
