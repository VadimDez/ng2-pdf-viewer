"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("../lint");
var OPTION_IGNORE_FOR_LOOP = "ignore-for-loop";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var oneVarWalker = new OneVariablePerDeclarationWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(oneVarWalker);
    };
    Rule.FAILURE_STRING = "Multiple variable declarations in the same statement are forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var OneVariablePerDeclarationWalker = (function (_super) {
    __extends(OneVariablePerDeclarationWalker, _super);
    function OneVariablePerDeclarationWalker() {
        _super.apply(this, arguments);
    }
    OneVariablePerDeclarationWalker.prototype.visitVariableStatement = function (node) {
        var declarationList = node.declarationList;
        if (declarationList.declarations.length > 1) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitVariableStatement.call(this, node);
    };
    OneVariablePerDeclarationWalker.prototype.visitForStatement = function (node) {
        var initializer = node.initializer;
        var shouldIgnoreForLoop = this.hasOption(OPTION_IGNORE_FOR_LOOP);
        if (!shouldIgnoreForLoop
            && initializer != null
            && initializer.kind === ts.SyntaxKind.VariableDeclarationList
            && initializer.declarations.length > 1) {
            this.addFailure(this.createFailure(initializer.getStart(), initializer.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitForStatement.call(this, node);
    };
    return OneVariablePerDeclarationWalker;
}(Lint.RuleWalker));
