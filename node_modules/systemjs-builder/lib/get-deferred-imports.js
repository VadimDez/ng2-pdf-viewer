var traceur = require('traceur');

var traceurGet = require('./utils').traceurGet;

var ParseTreeTransformer = traceurGet('codegeneration/ParseTreeTransformer.js').ParseTreeTransformer;

var getCanonicalName = require('./utils').getCanonicalName;

var Promise = require('bluebird');

function DeferredImportsTransformer(map) {
  this.imports = [];
  return ParseTreeTransformer.apply(this, arguments);
}

DeferredImportsTransformer.prototype = Object.create(ParseTreeTransformer.prototype);

DeferredImportsTransformer.prototype.transformCallExpression = function(tree) {
  tree = ParseTreeTransformer.prototype.transformCallExpression.call(this, tree);

  if (tree.operand.type == 'MEMBER_EXPRESSION'
      && tree.operand.memberName.value == 'import'
      && tree.operand.operand.type == 'IDENTIFIER_EXPRESSION'
      && tree.operand.operand.identifierToken.value == 'System'
      && tree.args.args.length == 1) {

    if (tree.args.args[0].type === 'LITERAL_EXPRESSION')
      this.imports.push(tree.args.args[0].literalToken.processedValue);
  }

  return tree;
}

module.exports = function(builder, trace) {
  var deferredImports = [];

  return Promise.all(Object.keys(trace).map(function(name) {
    var load = trace[name];

    if (load.deferredImports) {
      deferredImports = deferredImports.concat(load.deferredImports);
      return;
    }

    var curDeferredImports = [];

    if (!load || load.conditional)
      return;

    var compiler = new traceur.Compiler({ script: load.metadata.format !== 'esm' });

    var tree = compiler.parse(load.source, load.path);

    var transformer = new DeferredImportsTransformer();

    tree = transformer.transformAny(tree);

    return Promise.all(transformer.imports.map(function(impt) {
      return builder.loader.normalize(impt)
      .then(function(moduleName) {
        var canonical = getCanonicalName(builder.loader, moduleName);

        curDeferredImports.push({
          name: canonical,
          parent: name
        });
      });
    }))
    .then(function() {
      // store on the load record itself to allow caching
      load.deferredImports = curDeferredImports;
      deferredImports = deferredImports.concat(curDeferredImports);
    });
  }))
  .then(function() {
    return deferredImports;
  });
};