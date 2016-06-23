var traceur = require('traceur');
var traceurGet = require('../lib/utils').traceurGet;

var ParseTreeTransformer = traceurGet('codegeneration/ParseTreeTransformer.js').ParseTreeTransformer;
var CallExpression = traceurGet('syntax/trees/ParseTrees.js').CallExpression;
var ArgumentList = traceurGet('syntax/trees/ParseTrees.js').ArgumentList;
var ArrayLiteral = traceurGet('syntax/trees/ParseTrees.js').ArrayLiteral;
var createStringLiteral = traceurGet('codegeneration/ParseTreeFactory.js').createStringLiteral;
var parseExpression = traceurGet('codegeneration/PlaceholderParser.js').parseExpression;
var FunctionBody = traceurGet('syntax/trees/ParseTrees.js').FunctionBody;

// converts anonymous System.register([] into named System.register('name', [], ...
// NB need to add that if no anon, last named must define this module
// also this should be rewritten with a proper parser!
function RegisterTransformer(moduleName, map, systemGlobal) {
  this.name = moduleName;
  this.hasAnonRegister = false;
  this.map = map;
  this.systemOperand = parseExpression([systemGlobal + '.register']);
  this.usesModuleName = false;
  return ParseTreeTransformer.call(this);
}

RegisterTransformer.prototype = Object.create(ParseTreeTransformer.prototype);
RegisterTransformer.prototype.transformCallExpression = function(tree) {
  tree = ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);

  if (tree.operand.type == 'MEMBER_EXPRESSION'
      && tree.operand.memberName.value == 'register'
      && tree.operand.operand.type == 'IDENTIFIER_EXPRESSION'
      && tree.operand.operand.identifierToken.value == 'System'
      && tree.args) {

    var firstArg = tree.args.args[0];

    var declare;
    if (firstArg.type == 'ARRAY_LITERAL')
      declare = tree.args.args[1];
    else
      declare = tree.args.args[2];

    // contains a __moduleName reference, while System.register declare function doesn't have a __moduleName argument
    // so add it
    // this is backwards compatibility for https://github.com/systemjs/builder/issues/416
    if (this.usesModuleName && declare && declare.parameterList && declare.parameterList.parameters.length == 1) {
      var newDeclare = parseExpression(['function() {}']);
      newDeclare.location = declare.location;
      newDeclare.body = new FunctionBody(declare.body.location, declare.body.statements);
      newDeclare.parameterList.parameters.push(declare.parameterList.parameters[0]);
      newDeclare.parameterList.parameters.push(parseExpression(['__moduleName']));
      declare = newDeclare; 
    }

    // System.register(deps, declare)
    if (firstArg.type == 'ARRAY_LITERAL') {

      if (this.hasAnonRegister) {
        throw 'Source ' + this.name + ' has multiple anonymous System.register calls.';
      }

      // normalize dependencies in array
      // NB add metadata.deps here too
      var map = this.map;
      var normalizedDepArray = new ArrayLiteral(firstArg.location, firstArg.elements.map(function(el) {
        var str = el.literalToken.value.toString();
        return createStringLiteral(map(str.substr(1, str.length - 2)));
      }));

      this.hasAnonRegister = true;

      var newArgs = this.name ? [createStringLiteral(this.name), normalizedDepArray, declare] : [normalizedDepArray, declare];

      return new CallExpression(tree.location, this.systemOperand, new ArgumentList(tree.args.location, newArgs));
    }
    // System.register(name, deps, declare)
    else {
      var args = tree.args.args.concat([]);
      args.splice(2, 1, declare);
      return new CallExpression(tree.location, this.systemOperand, args);
    }
  }

  return tree;
};
RegisterTransformer.prototype.transformIdentifierExpression = function(tree) {
  if (tree.identifierToken.value == '__moduleName')
    this.usesModuleName = true;
  return ParseTreeTransformer.prototype.transformIdentifierExpression.call(this, tree);
};

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

  var transformer = new RegisterTransformer(!opts.anonymous && load.name, function(dep) { return opts.normalize ? load.depMap[dep] : dep; }, opts.systemGlobal);
  tree = transformer.transformAny(tree);

  // if the transformer didn't find an anonymous System.register
  // then this is a bundle itself
  // so we need to reconstruct files with load.metadata.execute etc
  // if this comes up, we can tackle it or work around it
  if (!transformer.hasAnonRegister)
    throw new TypeError('Source ' + load.path + ' is already a bundle file, so can\'t be built as a module.');

  var output = compiler.write(tree, load.path);

  return Promise.resolve({
    source: output,
    sourceMap: compiler.getSourceMap()
  });
};
