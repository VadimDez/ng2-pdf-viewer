var path = require('path');
var url = require('url');
var traceur = require('traceur');
var traceurGet = require('../lib/utils').traceurGet;
var ParseTreeTransformer = traceurGet('codegeneration/ParseTreeTransformer.js').ParseTreeTransformer;
var Script = traceurGet('syntax/trees/ParseTrees.js').Script;
var parseStatements = traceurGet('codegeneration/PlaceholderParser.js').parseStatements;
var parseExpression = traceurGet('codegeneration/PlaceholderParser.js').parseExpression;
var STRING = traceurGet('syntax/TokenType.js').STRING;
var LiteralExpression = traceurGet('syntax/trees/ParseTrees.js').LiteralExpression;
var LiteralToken = traceurGet('syntax/LiteralToken.js').LiteralToken;
var IdentifierExpression = traceurGet('syntax/trees/ParseTrees.js').IdentifierExpression;
var IdentifierToken = traceurGet('syntax/IdentifierToken.js').IdentifierToken;
var BindingIdentifier = traceurGet('syntax/trees/ParseTrees.js').BindingIdentifier;
var createUseStrictDirective = traceurGet('codegeneration/ParseTreeFactory.js').createUseStrictDirective;
var Promise = require('bluebird');

function hasRemoveUseStrict(list) {
  for (var i = 0; i < list.length; i++) {
    if (!list[i].isDirectivePrologue())
      return false;
    if (list[i].isUseStrictDirective()) {
      list.splice(i, 1);
      return true;
    }
  }
  return false;
}

// remap require() statements
function CJSRequireTransformer(requireName, map, mappedRequireName) {
  this.requireName = requireName;
  this.mappedRequireName = mappedRequireName || requireName;
  this.map = map;
  this.requires = [];
  return ParseTreeTransformer.call(this);
}
CJSRequireTransformer.prototype = Object.create(ParseTreeTransformer.prototype);
CJSRequireTransformer.prototype.transformCallExpression = function(tree) {
  // found a require
  if (tree.operand.identifierToken && tree.operand.identifierToken.value == this.requireName
      && tree.args.args.length && tree.args.args.length == 1) {
    
    var arg = tree.args.args[0];
    var mappedCallExpression;

    // require('x');
    if (arg.literalToken) {
      var requireModule = tree.args.args[0].literalToken.processedValue;

      // mirror behaviour at https://github.com/systemjs/systemjs/blob/0.19.8/lib/cjs.js#L50 to remove trailing slash
      if (requireModule[requireModule.length - 1] == '/')
        requireModule = requireModule.substr(0, requireModule.length - 1);
      
      var requireModuleMapped = this.map && this.map(requireModule) || requireModule;

      this.requires.push(requireModule);

      mappedCallExpression = parseExpression([this.mappedRequireName + "('" + requireModuleMapped + "')"], []);
    }
    // require(expr)
    else {
      mappedCallExpression = parseExpression([this.mappedRequireName + '(', ')'], [arg]);
    }

    return ParseTreeTransformer.prototype.transformCallExpression.call(this, mappedCallExpression);
  }

  return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);
};

CJSRequireTransformer.prototype.transformBindingIdentifier = function(tree) {
  if (tree.identifierToken.value == this.requireName)
    tree = new BindingIdentifier(tree.location, new IdentifierToken(tree.identifierToken.location, this.mappedRequireName));
  return ParseTreeTransformer.prototype.transformBindingIdentifier.call(this, tree);
};

CJSRequireTransformer.prototype.transformIdentifierExpression = function(tree) {
  if (tree.identifierToken.value == this.requireName)
    tree = new IdentifierExpression(tree.location, new IdentifierToken(tree.identifierToken.location, this.mappedRequireName));
  return ParseTreeTransformer.prototype.transformIdentifierExpression.call(this, tree);
};
exports.CJSRequireTransformer = CJSRequireTransformer;


// convert CommonJS into System.registerDynamic
function CJSRegisterTransformer(name, deps, path, optimize, isStatic, globals, systemGlobal) {
  this.name = name;
  this.deps = deps;
  this.path = path;
  this.usesFilePaths = false;
  this.usesRequireResolve = false;
  this.optimize = optimize;
  this.static = isStatic;
  this.globals = globals;
  this.systemGlobal = systemGlobal;
  return ParseTreeTransformer.call(this);
}

CJSRegisterTransformer.prototype = Object.create(ParseTreeTransformer.prototype);

CJSRegisterTransformer.prototype.transformCallExpression = function(tree) {
  // require.resolve
  if (!this.usesRequireResolve && tree.operand.type == 'MEMBER_EXPRESSION' && 
      tree.operand.operand.identifierToken && tree.operand.operand.identifierToken.value == '$__require' && 
      tree.operand.memberName && tree.operand.memberName.value == 'resolve') {
    this.usesRequireResolve = true;
  }
  return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);
}

CJSRegisterTransformer.prototype.transformMemberExpression = function(tree) {
  if (this.optimize && tree.operand.operand && tree.operand.operand.identifierToken && 
      tree.operand.operand.identifierToken.value == 'process' && 
      tree.operand.memberName == 'env' && tree.memberName.value == 'NODE_ENV') {
    return new LiteralExpression(tree.location, new LiteralToken(STRING, '"production"', tree.location));
  }
  return tree;
};
CJSRegisterTransformer.prototype.transformIdentifierExpression = function(tree) {
  var value = tree.identifierToken.value;
  if (value == '__filename' || value == '__dirname')
    this.usesFilePaths = true;
  return ParseTreeTransformer.prototype.transformIdentifierExpression.call(this, tree);
};
CJSRegisterTransformer.prototype.transformerBindingIdentifier = function(tree) {
  var value = tree.identifierToken.value;
  if (value == '__filename' || value == '__dirname')
    this.usesFilePaths = true;
  return ParseTreeTransformer.prototype.transformBindingIdentifier.call(this, tree);
};

CJSRegisterTransformer.prototype.transformScript = function(tree) {
  tree = ParseTreeTransformer.prototype.transformScript.call(this, tree);

  var scriptItemList = tree.scriptItemList;
  var nl = '\n    ';

  if (this.usesFilePaths && this.static)
    scriptItemList = parseStatements([
      "var __filename = '" + this.path + "', __dirname = '" + this.path.split('/').slice(0, -1).join('/') + "';"
    ]).concat(scriptItemList);

  if (this.usesRequireResolve && !this.static) {
    scriptItemList = parseStatements([
      "$__require.resolve = function(request) { return " + this.systemGlobal + ".get('@@cjs-helpers').requireResolve(request, module.id); };"
    ]).concat(scriptItemList);
  }

  if (this.usesFilePaths && !this.static)
    scriptItemList = parseStatements([
      "var $__pathVars = " + this.systemGlobal + ".get('@@cjs-helpers').getPathVars(module.id), __filename = $__pathVars.filename, __dirname = $__pathVars.dirname;"
    ]).concat(scriptItemList);

  var globalExpression = '';
  if (this.globals) {
    globalExpression = 'var ';
    var first = true;
    for (var g in this.globals) {
      globalExpression += (first ? '' : ', ') + g + '= $__require("' + this.globals[g] + '")';
      first = false;
    }
    if (first == true)
      globalExpression = '';
    globalExpression += ';';
  }

  var useStrict = hasRemoveUseStrict(scriptItemList) ? [createUseStrictDirective()] : [];

  scriptItemList = useStrict.concat(parseStatements([
    (globalExpression ? globalExpression + nl : '') + 'var define, global = this, GLOBAL = this;'
  ])).concat(scriptItemList).concat(parseStatements([
    'return module.exports;'
  ]));

  // wrap everything in System.register
  return new Script(tree.location, parseStatements([
    this.systemGlobal + '.registerDynamic(' + (this.name ? '"' + this.name + '", ' : '') + JSON.stringify(this.deps) + ', true, function($__require, exports, module) {',
    '});'], scriptItemList));
};
exports.CJSRegisterTransformer = CJSRequireTransformer;

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

  var transformer;

  var normalize = opts.normalize;

  transformer = new CJSRequireTransformer('require', function(dep) { return opts.normalize ? load.depMap[dep] : dep; }, '$__require');
  tree = transformer.transformAny(tree);

  var deps = opts.normalize ? load.deps.map(function(dep) { return load.depMap[dep]; }) : load.deps;

  var globals = {};
  for (var g in load.metadata.globals) {
    globals[g] = normalize && load.depMap[load.metadata.globals[g]] || load.metadata.globals[g];
  }
  if (opts.static) {
    var path = load.path;
    if (path.substr(0, loader.baseURL.length) == loader.baseURL)
      path = path.substr(loader.baseURL.length);
  }
  transformer = new CJSRegisterTransformer(!opts.anonymous && load.name, deps, path, opts.production, opts.static, globals, opts.systemGlobal);
  tree = transformer.transformAny(tree);

  var output = compiler.write(tree, load.path);

  if (opts.systemGlobal != 'System')
    output = output.replace(/(^|[^_])System\._nodeRequire/g, function(match, startArg) {
      return startArg + opts.systemGlobal + '._nodeRequire';
    });

  return Promise.resolve({
    source: output,
    sourceMap: compiler.getSourceMap()
  });
};

function remap(source, map, fileName) {
  var options = {script: true};
  var compiler = new traceur.Compiler(options);
  var tree = compiler.parse(source, fileName);

  var transformer = new CJSRequireTransformer('require', map);
  tree = transformer.transformAny(tree);

  var output = compiler.write(tree, fileName);
  return Promise.resolve({
    source: output
  });
}
exports.remap = remap;
