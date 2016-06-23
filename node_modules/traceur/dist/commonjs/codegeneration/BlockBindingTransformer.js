"use strict";
var $__AlphaRenamer_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__,
    $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__,
    $___46__46__47_syntax_47_IdentifierToken_46_js__,
    $__ParseTreeTransformer_46_js__,
    $___46__46__47_syntax_47_TokenType_46_js__,
    $__ParseTreeFactory_46_js__,
    $__FindIdentifiers_46_js__,
    $__FindVisitor_46_js__,
    $__FnExtractAbruptCompletions_46_js__,
    $___46__46__47_semantics_47_ScopeChainBuilderWithReferences_46_js__,
    $__PlaceholderParser_46_js__,
    $__PrependStatements_46_js__;
var AlphaRenamer = ($__AlphaRenamer_46_js__ = require("./AlphaRenamer.js"), $__AlphaRenamer_46_js__ && $__AlphaRenamer_46_js__.__esModule && $__AlphaRenamer_46_js__ || {default: $__AlphaRenamer_46_js__}).AlphaRenamer;
var $__1 = ($___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ = require("../syntax/trees/ParseTreeType.js"), $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTreeType_46_js__}),
    ANON_BLOCK = $__1.ANON_BLOCK,
    BINDING_IDENTIFIER = $__1.BINDING_IDENTIFIER,
    FOR_IN_STATEMENT = $__1.FOR_IN_STATEMENT,
    FOR_OF_STATEMENT = $__1.FOR_OF_STATEMENT,
    VARIABLE_DECLARATION_LIST = $__1.VARIABLE_DECLARATION_LIST;
var $__2 = ($___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ = require("../syntax/trees/ParseTrees.js"), $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__.__esModule && $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__ || {default: $___46__46__47_syntax_47_trees_47_ParseTrees_46_js__}),
    AnonBlock = $__2.AnonBlock,
    BindingElement = $__2.BindingElement,
    BindingIdentifier = $__2.BindingIdentifier,
    Block = $__2.Block,
    Catch = $__2.Catch,
    DoWhileStatement = $__2.DoWhileStatement,
    ForInStatement = $__2.ForInStatement,
    ForStatement = $__2.ForStatement,
    FormalParameter = $__2.FormalParameter,
    FunctionBody = $__2.FunctionBody,
    FunctionExpression = $__2.FunctionExpression,
    LabelledStatement = $__2.LabelledStatement,
    LiteralPropertyName = $__2.LiteralPropertyName,
    Module = $__2.Module,
    ObjectPatternField = $__2.ObjectPatternField,
    Script = $__2.Script,
    VariableDeclaration = $__2.VariableDeclaration,
    VariableDeclarationList = $__2.VariableDeclarationList,
    VariableStatement = $__2.VariableStatement,
    WhileStatement = $__2.WhileStatement;
var IdentifierToken = ($___46__46__47_syntax_47_IdentifierToken_46_js__ = require("../syntax/IdentifierToken.js"), $___46__46__47_syntax_47_IdentifierToken_46_js__ && $___46__46__47_syntax_47_IdentifierToken_46_js__.__esModule && $___46__46__47_syntax_47_IdentifierToken_46_js__ || {default: $___46__46__47_syntax_47_IdentifierToken_46_js__}).IdentifierToken;
var ParseTreeTransformer = ($__ParseTreeTransformer_46_js__ = require("./ParseTreeTransformer.js"), $__ParseTreeTransformer_46_js__ && $__ParseTreeTransformer_46_js__.__esModule && $__ParseTreeTransformer_46_js__ || {default: $__ParseTreeTransformer_46_js__}).ParseTreeTransformer;
var VAR = ($___46__46__47_syntax_47_TokenType_46_js__ = require("../syntax/TokenType.js"), $___46__46__47_syntax_47_TokenType_46_js__ && $___46__46__47_syntax_47_TokenType_46_js__.__esModule && $___46__46__47_syntax_47_TokenType_46_js__ || {default: $___46__46__47_syntax_47_TokenType_46_js__}).VAR;
var $__6 = ($__ParseTreeFactory_46_js__ = require("./ParseTreeFactory.js"), $__ParseTreeFactory_46_js__ && $__ParseTreeFactory_46_js__.__esModule && $__ParseTreeFactory_46_js__ || {default: $__ParseTreeFactory_46_js__}),
    createBindingIdentifier = $__6.createBindingIdentifier,
    createIdentifierExpression = $__6.createIdentifierExpression,
    createIdentifierToken = $__6.createIdentifierToken;
var FindIdentifiers = ($__FindIdentifiers_46_js__ = require("./FindIdentifiers.js"), $__FindIdentifiers_46_js__ && $__FindIdentifiers_46_js__.__esModule && $__FindIdentifiers_46_js__ || {default: $__FindIdentifiers_46_js__}).FindIdentifiers;
var FindVisitor = ($__FindVisitor_46_js__ = require("./FindVisitor.js"), $__FindVisitor_46_js__ && $__FindVisitor_46_js__.__esModule && $__FindVisitor_46_js__ || {default: $__FindVisitor_46_js__}).FindVisitor;
var FnExtractAbruptCompletions = ($__FnExtractAbruptCompletions_46_js__ = require("./FnExtractAbruptCompletions.js"), $__FnExtractAbruptCompletions_46_js__ && $__FnExtractAbruptCompletions_46_js__.__esModule && $__FnExtractAbruptCompletions_46_js__ || {default: $__FnExtractAbruptCompletions_46_js__}).FnExtractAbruptCompletions;
var ScopeChainBuilderWithReferences = ($___46__46__47_semantics_47_ScopeChainBuilderWithReferences_46_js__ = require("../semantics/ScopeChainBuilderWithReferences.js"), $___46__46__47_semantics_47_ScopeChainBuilderWithReferences_46_js__ && $___46__46__47_semantics_47_ScopeChainBuilderWithReferences_46_js__.__esModule && $___46__46__47_semantics_47_ScopeChainBuilderWithReferences_46_js__ || {default: $___46__46__47_semantics_47_ScopeChainBuilderWithReferences_46_js__}).ScopeChainBuilderWithReferences;
var parseExpression = ($__PlaceholderParser_46_js__ = require("./PlaceholderParser.js"), $__PlaceholderParser_46_js__ && $__PlaceholderParser_46_js__.__esModule && $__PlaceholderParser_46_js__ || {default: $__PlaceholderParser_46_js__}).parseExpression;
var prependStatements = ($__PrependStatements_46_js__ = require("./PrependStatements.js"), $__PrependStatements_46_js__ && $__PrependStatements_46_js__.__esModule && $__PrependStatements_46_js__ || {default: $__PrependStatements_46_js__}).prependStatements;
function varNeedsInitializer(tree, loopTree) {
  if (loopTree === null)
    return false;
  var type = loopTree.type;
  if (type !== FOR_IN_STATEMENT && type !== FOR_OF_STATEMENT)
    return true;
  return loopTree.initializer.declarations[0] !== tree;
}
var BlockBindingTransformer = function($__super) {
  function BlockBindingTransformer(idGenerator, reporter, tree) {
    var scopeBuilder = arguments[3];
    var latestScope = arguments[4];
    $traceurRuntime.superConstructor(BlockBindingTransformer).call(this);
    this.idGenerator_ = idGenerator;
    this.reporter_ = reporter;
    if (!scopeBuilder) {
      scopeBuilder = new ScopeChainBuilderWithReferences(reporter);
      scopeBuilder.visitAny(tree);
    }
    this.scopeBuilder_ = scopeBuilder;
    this.labelledLoops_ = new Map();
    this.prependStatement_ = [];
    this.prependBlockStatement_ = [];
    this.blockRenames_ = [];
    this.rootTree_ = tree;
    if (latestScope) {
      this.scope_ = latestScope;
    } else {
      this.pushScope(tree);
    }
    this.usedVars_ = this.scope_.getAllBindingNames();
    this.maybeRename_ = false;
    this.inObjectPattern_ = false;
    this.currentLoopTree_ = null;
  }
  return ($traceurRuntime.createClass)(BlockBindingTransformer, {
    getVariableName_: function(variable) {
      var lvalue = variable.lvalue;
      if (lvalue.type === BINDING_IDENTIFIER) {
        return lvalue.getStringValue();
      }
      throw new Error('Unexpected destructuring declaration found.');
    },
    flushRenames: function(tree) {
      tree = renameAll(this.blockRenames_, tree);
      this.blockRenames_.length = 0;
      return tree;
    },
    pushScope: function(tree) {
      var scope = this.scopeBuilder_.getScopeForTree(tree);
      if (!scope)
        throw new Error('BlockBindingTransformer tree with no scope');
      if (this.scope_)
        this.scope_.blockBindingRenames = this.blockRenames_;
      this.scope_ = scope;
      this.blockRenames_ = [];
      return scope;
    },
    popScope: function(scope) {
      if (this.scope_ !== scope) {
        throw new Error('BlockBindingTransformer scope mismatch');
      }
      this.scope_ = scope.parent;
      this.blockRenames_ = this.scope_ && this.scope_.blockBindingRenames || [];
    },
    revisitTreeForScopes: function(tree) {
      this.scopeBuilder_.scope = this.scope_;
      this.scopeBuilder_.visitAny(tree);
      this.scopeBuilder_.scope = null;
    },
    needsRename_: function(name) {
      if (this.usedVars_.has(name))
        return true;
      var scope = this.scope_;
      var parent = scope.parent;
      if (!parent || scope.isVarScope)
        return false;
      var varScope = scope.getVarScope();
      if (varScope && varScope.hasFreeVariable(name)) {
        return true;
      }
      var parentBinding = parent.getBindingByName(name);
      if (!parentBinding)
        return false;
      var currentBinding = scope.getBindingByName(name);
      if (currentBinding.tree === parentBinding.tree)
        return false;
      return true;
    },
    newNameFromOrig: function(origName, renames) {
      var newName;
      if (this.needsRename_(origName)) {
        newName = origName + this.idGenerator_.generateUniqueIdentifier();
        renames.push(new Rename(origName, newName));
      } else {
        this.usedVars_.add(origName);
        newName = origName;
      }
      return newName;
    },
    transformFunctionBody: function(tree) {
      if (tree === this.rootTree_ || !this.rootTree_) {
        tree = $traceurRuntime.superGet(this, BlockBindingTransformer.prototype, "transformFunctionBody").call(this, tree);
        if (this.prependStatement_.length || this.blockRenames_.length) {
          var statements = prependStatements.apply((void 0), $traceurRuntime.spread([tree.statements], this.prependStatement_));
          tree = new FunctionBody(tree.location, statements);
          tree = this.flushRenames(tree);
        }
      } else {
        var functionTransform = new BlockBindingTransformer(this.idGenerator_, this.reporter_, tree, this.scopeBuilder_, this.scope_);
        var functionBodyTree = functionTransform.transformAny(tree);
        if (functionBodyTree === tree) {
          return tree;
        }
        tree = new FunctionBody(tree.location, functionBodyTree.statements);
      }
      return tree;
    },
    transformScript: function(tree) {
      if (tree === this.rootTree_ || !this.rootTree_) {
        tree = $traceurRuntime.superGet(this, BlockBindingTransformer.prototype, "transformScript").call(this, tree);
        if (this.prependStatement_.length || this.blockRenames_.length) {
          var scriptItemList = prependStatements.apply((void 0), $traceurRuntime.spread([tree.scriptItemList], this.prependStatement_));
          tree = new Script(tree.location, scriptItemList, tree.moduleName);
          tree = this.flushRenames(tree);
        }
      } else {
        var functionTransform = new BlockBindingTransformer(this.idGenerator_, this.reporter_, tree, this.scopeBuilder_);
        var newTree = functionTransform.transformAny(tree);
        if (newTree === tree) {
          return tree;
        }
        tree = new Script(tree.location, newTree.scriptItemList, tree.moduleName);
      }
      return tree;
    },
    transformModule: function(tree) {
      if (tree === this.rootTree_ || !this.rootTree_) {
        tree = $traceurRuntime.superGet(this, BlockBindingTransformer.prototype, "transformModule").call(this, tree);
        if (this.prependStatement_.length || this.blockRenames_.length) {
          var scriptItemList = prependStatements.apply((void 0), $traceurRuntime.spread([tree.scriptItemList], this.prependStatement_));
          tree = new Module(tree.location, scriptItemList, tree.moduleName);
          tree = this.flushRenames(tree);
        }
      } else {
        var functionTransform = new BlockBindingTransformer(this.idGenerator_, this.reporter_, tree, this.scopeBuilder_);
        var newTree = functionTransform.transformAny(tree);
        if (newTree === tree) {
          return tree;
        }
        tree = new Module(tree.location, newTree.scriptItemList, tree.moduleName);
      }
      return tree;
    },
    transformVariableStatement: function(tree) {
      var declarations = this.transformAny(tree.declarations);
      if (declarations.type === ANON_BLOCK) {
        return declarations;
      }
      if (declarations === tree.declarations) {
        return tree;
      }
      return new VariableStatement(tree.location, declarations);
    },
    transformVariableDeclarationList: function(tree) {
      if (tree.declarationType === VAR) {
        return $traceurRuntime.superGet(this, BlockBindingTransformer.prototype, "transformVariableDeclarationList").call(this, tree);
      }
      this.maybeRename_ = !this.scope_.isVarScope;
      var declarations = this.transformList(tree.declarations);
      this.maybeRename_ = false;
      return new VariableDeclarationList(tree.location, VAR, declarations);
    },
    transformVariableDeclaration: function(tree) {
      var maybeRename = this.maybeRename_;
      var lvalue = this.transformAny(tree.lvalue);
      this.maybeRename_ = false;
      var initializer = null;
      if (tree.initializer) {
        initializer = this.transformAny(tree.initializer);
      } else if (varNeedsInitializer(tree, this.currentLoopTree_)) {
        initializer = parseExpression($traceurRuntime.getTemplateObject(["void 0"]));
      }
      this.maybeRename_ = maybeRename;
      if (tree.lvalue === lvalue && tree.initializer === initializer) {
        return tree;
      }
      return new VariableDeclaration(tree.location, lvalue, tree.typeAnnotation, initializer);
    },
    transformBindingIdentifier: function(tree) {
      if (this.maybeRename_) {
        var origName = tree.getStringValue();
        var newName = this.newNameFromOrig(origName, this.blockRenames_);
        if (origName === newName) {
          return tree;
        }
        var newToken = new IdentifierToken(tree.location, newName);
        var bindingIdentifier = new BindingIdentifier(tree.location, newToken);
        this.scope_.renameBinding(origName, bindingIdentifier, VAR, this.reporter_);
        return bindingIdentifier;
      }
      return $traceurRuntime.superGet(this, BlockBindingTransformer.prototype, "transformBindingIdentifier").call(this, tree);
    },
    transformBindingElement: function(tree) {
      var maybeRename = this.maybeRename_;
      var inObjectPattern = this.inObjectPattern_;
      var binding = this.transformAny(tree.binding);
      this.maybeRename_ = false;
      this.inObjectPattern_ = false;
      var initializer = this.transformAny(tree.initializer);
      this.maybeRename_ = maybeRename;
      this.inObjectPattern_ = inObjectPattern;
      if (tree.binding === binding && tree.initializer === initializer) {
        return tree;
      }
      var bindingElement = new BindingElement(tree.location, binding, initializer);
      if (this.inObjectPattern_ && tree.binding !== binding && tree.binding.type === BINDING_IDENTIFIER) {
        return new ObjectPatternField(tree.location, new LiteralPropertyName(tree.location, tree.binding.identifierToken), bindingElement);
      }
      return bindingElement;
    },
    transformObjectPattern: function(tree) {
      var inObjectPattern = this.inObjectPattern_;
      this.inObjectPattern_ = true;
      var transformed = $traceurRuntime.superGet(this, BlockBindingTransformer.prototype, "transformObjectPattern").call(this, tree);
      this.inObjectPattern_ = inObjectPattern;
      return transformed;
    },
    transformObjectPatternField: function(tree) {
      var name = this.transformAny(tree.name);
      this.inObjectPattern_ = false;
      var element = this.transformAny(tree.element);
      this.inObjectPattern_ = true;
      if (tree.name === name && tree.element === element) {
        return tree;
      }
      return new ObjectPatternField(tree.location, name, element);
    },
    transformBlock: function(tree) {
      var scope = this.pushScope(tree);
      var outerPrepends = this.prependBlockStatement_;
      this.prependBlockStatement_ = [];
      tree = $traceurRuntime.superGet(this, BlockBindingTransformer.prototype, "transformBlock").call(this, tree);
      if (this.prependBlockStatement_.length) {
        tree = new Block(tree.location, prependStatements.apply((void 0), $traceurRuntime.spread([tree.statements], this.prependBlockStatement_)));
      }
      this.prependBlockStatement_ = outerPrepends;
      tree = this.flushRenames(tree);
      this.popScope(scope);
      return tree;
    },
    transformCatch: function(tree) {
      var scope = this.pushScope(tree);
      var binding = this.transformAny(tree.binding);
      var statements = this.transformList(tree.catchBody.statements);
      if (binding !== tree.binding || statements !== tree.catchBody.statements) {
        tree = new Catch(tree.location, binding, new Block(tree.catchBody.location, statements));
      }
      tree = this.flushRenames(tree);
      this.popScope(scope);
      return tree;
    },
    transformFunctionForScope_: function(func, tree) {
      var scope = this.pushScope(tree);
      tree = func();
      tree = this.flushRenames(tree);
      this.popScope(scope);
      return tree;
    },
    transformGetAccessor: function(tree) {
      var $__18 = this;
      return this.transformFunctionForScope_(function() {
        return $traceurRuntime.superGet($__18, BlockBindingTransformer.prototype, "transformGetAccessor").call($__18, tree);
      }, tree);
    },
    transformSetAccessor: function(tree) {
      var $__18 = this;
      return this.transformFunctionForScope_(function() {
        return $traceurRuntime.superGet($__18, BlockBindingTransformer.prototype, "transformSetAccessor").call($__18, tree);
      }, tree);
    },
    transformFunctionExpression: function(tree) {
      var $__18 = this;
      return this.transformFunctionForScope_(function() {
        return $traceurRuntime.superGet($__18, BlockBindingTransformer.prototype, "transformFunctionExpression").call($__18, tree);
      }, tree);
    },
    transformFunctionDeclaration: function(tree) {
      var $__18 = this;
      if (!this.scope_.isVarScope) {
        var origName = tree.name.getStringValue();
        var newName = this.newNameFromOrig(origName, this.blockRenames_);
        var functionExpression = new FunctionExpression(tree.location, null, tree.functionKind, tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body);
        this.revisitTreeForScopes(functionExpression);
        functionExpression = this.transformAny(functionExpression);
        var bindingIdentifier = createBindingIdentifier(newName);
        var statement = new VariableStatement(tree.location, new VariableDeclarationList(tree.location, VAR, [new VariableDeclaration(tree.location, bindingIdentifier, null, functionExpression)]));
        this.scope_.renameBinding(origName, bindingIdentifier, VAR, this.reporter_);
        this.prependBlockStatement_.push(statement);
        return new AnonBlock(null, []);
      }
      return this.transformFunctionForScope_(function() {
        return $traceurRuntime.superGet($__18, BlockBindingTransformer.prototype, "transformFunctionDeclaration").call($__18, tree);
      }, tree);
    },
    transformLoop_: function(func, tree, loopFactory) {
      var $__18 = this;
      var scope,
          initializerIsBlockBinding;
      if (tree.initializer && tree.initializer.type === VARIABLE_DECLARATION_LIST && tree.initializer.declarationType !== VAR) {
        initializerIsBlockBinding = true;
      }
      if (initializerIsBlockBinding) {
        scope = this.pushScope(tree);
      }
      var finder = new FindBlockBindingInLoop(tree, this.scopeBuilder_);
      finder.visitAny(tree);
      if (!finder.found) {
        var callFunc = function() {
          var currentLoopTree = $__18.currentLoopTree_;
          $__18.currentLoopTree_ = tree;
          var rv = func(tree);
          $__18.currentLoopTree_ = currentLoopTree;
          return rv;
        };
        if (!initializerIsBlockBinding) {
          return callFunc();
        }
        var renames = [];
        var initializer = new VariableDeclarationList(null, VAR, tree.initializer.declarations.map(function(declaration) {
          var origName = $__18.getVariableName_(declaration);
          var newName = $__18.newNameFromOrig(origName, renames);
          var bindingIdentifier = createBindingIdentifier(newName);
          $__18.scope_.renameBinding(origName, bindingIdentifier, VAR, $__18.reporter_);
          return new VariableDeclaration(null, bindingIdentifier, null, declaration.initializer);
        }));
        initializer = renameAll(renames, initializer);
        tree = loopFactory(initializer, renames, renameAll(renames, tree.body));
        this.revisitTreeForScopes(tree);
        tree = callFunc();
      } else {
        var iifeParameterList = [];
        var iifeArgumentList = [];
        var renames$__19 = [];
        var initializer$__20 = null;
        if (tree.initializer) {
          if (tree.initializer.type === VARIABLE_DECLARATION_LIST && tree.initializer.declarationType !== VAR) {
            initializer$__20 = new VariableDeclarationList(null, VAR, tree.initializer.declarations.map(function(declaration) {
              var origName = $__18.getVariableName_(declaration);
              var newName = $__18.newNameFromOrig(origName, renames$__19);
              iifeArgumentList.push(createIdentifierExpression(newName));
              iifeParameterList.push(new FormalParameter(null, new BindingElement(null, createBindingIdentifier(origName), null), null, []));
              var bindingIdentifier = createBindingIdentifier(newName);
              $__18.scope_.renameBinding(origName, bindingIdentifier, VAR, $__18.reporter_);
              return new VariableDeclaration(null, bindingIdentifier, null, declaration.initializer);
            }));
            initializer$__20 = renameAll(renames$__19, initializer$__20);
          } else {
            initializer$__20 = this.transformAny(tree.initializer);
          }
        }
        var loopLabel = this.labelledLoops_.get(tree);
        var iifeInfo = FnExtractAbruptCompletions.createIIFE(this.idGenerator_, tree.body, iifeParameterList, iifeArgumentList, function() {
          return loopLabel = loopLabel || createIdentifierToken($__18.idGenerator_.generateUniqueIdentifier());
        }, this.scope_.inGenerator);
        tree = loopFactory(initializer$__20, renames$__19, iifeInfo.loopBody);
        if (loopLabel) {
          tree = new LabelledStatement(tree.location, loopLabel, tree);
        }
        tree = new AnonBlock(tree.location, [iifeInfo.variableStatements, tree]);
        this.revisitTreeForScopes(tree);
        tree = this.transformAny(tree);
      }
      if (initializerIsBlockBinding) {
        tree = this.flushRenames(tree);
        this.popScope(scope);
      }
      return tree;
    },
    transformForInStatement: function(tree) {
      var $__18 = this;
      return this.transformLoop_(function(t) {
        return $traceurRuntime.superGet($__18, BlockBindingTransformer.prototype, "transformForInStatement").call($__18, t);
      }, tree, function(initializer, renames, body) {
        return new ForInStatement(tree.location, initializer, renameAll(renames, tree.collection), body);
      });
    },
    transformForStatement: function(tree) {
      var $__18 = this;
      return this.transformLoop_(function(t) {
        return $traceurRuntime.superGet($__18, BlockBindingTransformer.prototype, "transformForStatement").call($__18, t);
      }, tree, function(initializer, renames, body) {
        return new ForStatement(tree.location, initializer, renameAll(renames, tree.condition), renameAll(renames, tree.increment), body);
      });
    },
    transformWhileStatement: function(tree) {
      var $__18 = this;
      return this.transformLoop_(function(t) {
        return $traceurRuntime.superGet($__18, BlockBindingTransformer.prototype, "transformWhileStatement").call($__18, t);
      }, tree, function(initializer, renames, body) {
        return new WhileStatement(tree.location, renameAll(renames, tree.condition), body);
      });
    },
    transformDoWhileStatement: function(tree) {
      var $__18 = this;
      return this.transformLoop_(function(t) {
        return $traceurRuntime.superGet($__18, BlockBindingTransformer.prototype, "transformDoWhileStatement").call($__18, t);
      }, tree, function(initializer, renames, body) {
        return new DoWhileStatement(tree.location, body, renameAll(renames, tree.condition));
      });
    },
    transformLabelledStatement: function(tree) {
      if (tree.statement.isIterationStatement()) {
        this.labelledLoops_.set(tree.statement, tree.name.value);
        var statement = this.transformAny(tree.statement);
        if (!statement.isStatement()) {
          return statement;
        }
        if (statement === tree.statement) {
          return tree;
        }
        return new LabelledStatement(tree.location, tree.name, statement);
      }
      return $traceurRuntime.superGet(this, BlockBindingTransformer.prototype, "transformLabelledStatement").call(this, tree);
    }
  }, {}, $__super);
}(ParseTreeTransformer);
var Rename = function() {
  function Rename(oldName, newName) {
    this.oldName = oldName;
    this.newName = newName;
  }
  return ($traceurRuntime.createClass)(Rename, {}, {});
}();
function renameAll(renames, tree) {
  renames.forEach(function(rename) {
    tree = AlphaRenamer.rename(tree, rename.oldName, rename.newName);
  });
  return tree;
}
var FindBlockBindingInLoop = function($__super) {
  function FindBlockBindingInLoop(tree, scopeBuilder) {
    $traceurRuntime.superConstructor(FindBlockBindingInLoop).call(this);
    this.scopeBuilder_ = scopeBuilder;
    this.topScope_ = scopeBuilder.getScopeForTree(tree) || scopeBuilder.getScopeForTree(tree.body);
    this.outOfScope_ = null;
    this.acceptLoop_ = tree.isIterationStatement();
  }
  return ($traceurRuntime.createClass)(FindBlockBindingInLoop, {
    visitForInStatement: function(tree) {
      var $__18 = this;
      this.visitLoop_(tree, function() {
        return $traceurRuntime.superGet($__18, FindBlockBindingInLoop.prototype, "visitForInStatement").call($__18, tree);
      });
    },
    visitForStatement: function(tree) {
      var $__18 = this;
      this.visitLoop_(tree, function() {
        return $traceurRuntime.superGet($__18, FindBlockBindingInLoop.prototype, "visitForStatement").call($__18, tree);
      });
    },
    visitWhileStatement: function(tree) {
      var $__18 = this;
      this.visitLoop_(tree, function() {
        return $traceurRuntime.superGet($__18, FindBlockBindingInLoop.prototype, "visitWhileStatement").call($__18, tree);
      });
    },
    visitDoWhileStatement: function(tree) {
      var $__18 = this;
      this.visitLoop_(tree, function() {
        return $traceurRuntime.superGet($__18, FindBlockBindingInLoop.prototype, "visitDoWhileStatement").call($__18, tree);
      });
    },
    visitLoop_: function(tree, func) {
      if (this.acceptLoop_) {
        this.acceptLoop_ = false;
      } else if (!this.outOfScope_) {
        this.outOfScope_ = this.scopeBuilder_.getScopeForTree(tree) || this.scopeBuilder_.getScopeForTree(tree.body);
      }
      func();
    },
    visitArrowFunction: function(tree) {
      this.visitFunction_(tree);
    },
    visitFunctionDeclaration: function(tree) {
      this.visitFunction_(tree);
    },
    visitFunctionExpression: function(tree) {
      this.visitFunction_(tree);
    },
    visitGetAccessor: function(tree) {
      this.visitFunction_(tree);
    },
    visitMethod: function(tree) {
      this.visitFunction_(tree);
    },
    visitSetAccessor: function(tree) {
      this.visitFunction_(tree);
    },
    visitFunction_: function(tree) {
      var $__18 = this;
      this.found = new FindIdentifiers(tree, function(identifierToken, identScope) {
        identScope = $__18.scopeBuilder_.getScopeForTree(identScope);
        var fnScope = $__18.outOfScope_ || $__18.scopeBuilder_.getScopeForTree(tree);
        if (identScope.hasLexicalBindingName(identifierToken)) {
          return false;
        }
        while (identScope !== fnScope && (identScope = identScope.parent)) {
          if (identScope.hasLexicalBindingName(identifierToken)) {
            return false;
          }
        }
        while (fnScope = fnScope.parent) {
          if (fnScope.hasLexicalBindingName(identifierToken)) {
            return true;
          }
          if (fnScope.hasVariableBindingName(identifierToken)) {
            return false;
          }
          if (fnScope === $__18.topScope_)
            break;
        }
        return false;
      }).found;
    }
  }, {}, $__super);
}(FindVisitor);
Object.defineProperties(module.exports, {
  BlockBindingTransformer: {get: function() {
      return BlockBindingTransformer;
    }},
  __esModule: {value: true}
});
