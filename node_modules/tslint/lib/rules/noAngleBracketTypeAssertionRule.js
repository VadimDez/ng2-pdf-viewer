"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("../lint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoAngleBracketTypeAssertionWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "Type assertion using the '<>' syntax is forbidden. Use the 'as' syntax instead.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoAngleBracketTypeAssertionWalker = (function (_super) {
    __extends(NoAngleBracketTypeAssertionWalker, _super);
    function NoAngleBracketTypeAssertionWalker() {
        _super.apply(this, arguments);
    }
    NoAngleBracketTypeAssertionWalker.prototype.visitTypeAssertionExpression = function (node) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        _super.prototype.visitTypeAssertionExpression.call(this, node);
    };
    return NoAngleBracketTypeAssertionWalker;
}(Lint.RuleWalker));
