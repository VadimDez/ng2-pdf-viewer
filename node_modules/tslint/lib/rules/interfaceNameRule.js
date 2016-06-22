"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("../lint");
var OPTION_ALWAYS = "always-prefix";
var OPTION_NEVER = "never-prefix";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NameWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "interface name must start with a capitalized I";
    Rule.FAILURE_STRING_NO_PREFIX = "interface name must not have an \"I\" prefix";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NameWalker = (function (_super) {
    __extends(NameWalker, _super);
    function NameWalker() {
        _super.apply(this, arguments);
    }
    NameWalker.prototype.visitInterfaceDeclaration = function (node) {
        var interfaceName = node.name.text;
        var always = this.hasOption(OPTION_ALWAYS) || (this.getOptions() && this.getOptions().length === 0);
        if (always) {
            if (!this.startsWithI(interfaceName)) {
                this.addFailureAt(node.name.getStart(), node.name.getWidth(), Rule.FAILURE_STRING);
            }
        }
        else if (this.hasOption(OPTION_NEVER)) {
            if (this.hasPrefixI(interfaceName)) {
                this.addFailureAt(node.name.getStart(), node.name.getWidth(), Rule.FAILURE_STRING_NO_PREFIX);
            }
        }
        _super.prototype.visitInterfaceDeclaration.call(this, node);
    };
    NameWalker.prototype.startsWithI = function (name) {
        if (name.length <= 0) {
            return true;
        }
        var firstCharacter = name.charAt(0);
        return (firstCharacter === "I");
    };
    NameWalker.prototype.hasPrefixI = function (name) {
        if (name.length <= 0) {
            return true;
        }
        var firstCharacter = name.charAt(0);
        if (firstCharacter !== "I") {
            return false;
        }
        var secondCharacter = name.charAt(1);
        if (secondCharacter === "") {
            return false;
        }
        else if (secondCharacter !== secondCharacter.toUpperCase()) {
            return false;
        }
        if (name.indexOf("IDB") === 0) {
            return false;
        }
        return true;
    };
    NameWalker.prototype.addFailureAt = function (position, width, failureString) {
        var failure = this.createFailure(position, width, failureString);
        this.addFailure(failure);
    };
    return NameWalker;
}(Lint.RuleWalker));
