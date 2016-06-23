"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("../lint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoNamespaceWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "'namespace' and 'module' are disallowed";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoNamespaceWalker = (function (_super) {
    __extends(NoNamespaceWalker, _super);
    function NoNamespaceWalker() {
        _super.apply(this, arguments);
    }
    NoNamespaceWalker.prototype.visitModuleDeclaration = function (decl) {
        _super.prototype.visitModuleDeclaration.call(this, decl);
        if (decl.name.kind === ts.SyntaxKind.StringLiteral) {
            return;
        }
        if (Lint.isNodeFlagSet(decl, ts.NodeFlags.Ambient) && this.hasOption("allow-declarations")) {
            return;
        }
        if (Lint.isNestedModuleDeclaration(decl)) {
            return;
        }
        this.addFailure(this.createFailure(decl.getStart(), decl.getWidth(), Rule.FAILURE_STRING));
    };
    return NoNamespaceWalker;
}(Lint.RuleWalker));
