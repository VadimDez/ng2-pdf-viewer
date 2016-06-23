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
        return this.applyWithWalker(new TypedefWhitespaceWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TypedefWhitespaceWalker = (function (_super) {
    __extends(TypedefWhitespaceWalker, _super);
    function TypedefWhitespaceWalker() {
        _super.apply(this, arguments);
    }
    TypedefWhitespaceWalker.getColonPosition = function (node) {
        var colon = node.getChildren().filter(function (child) {
            return child.kind === ts.SyntaxKind.ColonToken;
        })[0];
        return colon == null ? -1 : colon.getStart();
    };
    TypedefWhitespaceWalker.prototype.visitFunctionDeclaration = function (node) {
        this.checkSpace("call-signature", node, node.type);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitFunctionExpression = function (node) {
        this.checkSpace("call-signature", node, node.type);
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitGetAccessor = function (node) {
        this.checkSpace("call-signature", node, node.type);
        _super.prototype.visitGetAccessor.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitIndexSignatureDeclaration = function (node) {
        this.checkSpace("index-signature", node, node.type);
        _super.prototype.visitIndexSignatureDeclaration.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitMethodDeclaration = function (node) {
        this.checkSpace("call-signature", node, node.type);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitMethodSignature = function (node) {
        this.checkSpace("call-signature", node, node.type);
        _super.prototype.visitMethodSignature.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitParameterDeclaration = function (node) {
        this.checkSpace("parameter", node, node.type);
        _super.prototype.visitParameterDeclaration.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitPropertyDeclaration = function (node) {
        this.checkSpace("property-declaration", node, node.type);
        _super.prototype.visitPropertyDeclaration.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitPropertySignature = function (node) {
        this.checkSpace("property-declaration", node, node.type);
        _super.prototype.visitPropertySignature.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitSetAccessor = function (node) {
        this.checkSpace("call-signature", node, node.type);
        _super.prototype.visitSetAccessor.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.visitVariableDeclaration = function (node) {
        this.checkSpace("variable-declaration", node, node.type);
        _super.prototype.visitVariableDeclaration.call(this, node);
    };
    TypedefWhitespaceWalker.prototype.checkSpace = function (option, node, typeNode) {
        if (this.hasOption(option) && typeNode != null) {
            var colonPosition = TypedefWhitespaceWalker.getColonPosition(node);
            if (colonPosition != null) {
                var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, node.getText());
                this.checkLeft(option, node, scanner, colonPosition);
                this.checkRight(option, node, scanner, colonPosition);
            }
        }
    };
    TypedefWhitespaceWalker.prototype.hasOption = function (option) {
        return this.hasLeftOption(option) || this.hasRightOption(option);
    };
    TypedefWhitespaceWalker.prototype.hasLeftOption = function (option) {
        var allOptions = this.getOptions();
        if (allOptions == null || allOptions.length === 0) {
            return false;
        }
        var options = allOptions[0];
        return options != null && options[option] != null;
    };
    TypedefWhitespaceWalker.prototype.hasRightOption = function (option) {
        var allOptions = this.getOptions();
        if (allOptions == null || allOptions.length < 2) {
            return false;
        }
        var options = allOptions[1];
        return options != null && options[option] != null;
    };
    TypedefWhitespaceWalker.prototype.getLeftOption = function (option) {
        if (!this.hasLeftOption(option)) {
            return null;
        }
        var allOptions = this.getOptions();
        var options = allOptions[0];
        return options[option];
    };
    TypedefWhitespaceWalker.prototype.getRightOption = function (option) {
        if (!this.hasRightOption(option)) {
            return null;
        }
        var allOptions = this.getOptions();
        var options = allOptions[1];
        return options[option];
    };
    TypedefWhitespaceWalker.prototype.checkLeft = function (option, node, scanner, colonPosition) {
        if (this.hasLeftOption(option)) {
            var positionToCheck = colonPosition - 1 - node.getStart();
            var hasLeadingWhitespace = void 0;
            if (positionToCheck < 0) {
                hasLeadingWhitespace = false;
            }
            else {
                scanner.setTextPos(positionToCheck);
                hasLeadingWhitespace = scanner.scan() === ts.SyntaxKind.WhitespaceTrivia;
            }
            positionToCheck = colonPosition - 2 - node.getStart();
            var hasSeveralLeadingWhitespaces = void 0;
            if (positionToCheck < 0) {
                hasSeveralLeadingWhitespaces = false;
            }
            else {
                scanner.setTextPos(positionToCheck);
                hasSeveralLeadingWhitespaces = hasLeadingWhitespace &&
                    scanner.scan() === ts.SyntaxKind.WhitespaceTrivia;
            }
            var optionValue = this.getLeftOption(option);
            var message = "expected " + optionValue + " before colon in " + option;
            this.performFailureCheck(optionValue, hasLeadingWhitespace, hasSeveralLeadingWhitespaces, colonPosition - 1, message);
        }
    };
    TypedefWhitespaceWalker.prototype.checkRight = function (option, node, scanner, colonPosition) {
        if (this.hasRightOption(option)) {
            var positionToCheck = colonPosition + 1 - node.getStart();
            var hasTrailingWhitespace = void 0;
            if (positionToCheck >= node.getWidth()) {
                hasTrailingWhitespace = false;
            }
            else {
                scanner.setTextPos(positionToCheck);
                hasTrailingWhitespace = scanner.scan() === ts.SyntaxKind.WhitespaceTrivia;
            }
            positionToCheck = colonPosition + 2 - node.getStart();
            var hasSeveralTrailingWhitespaces = void 0;
            if (positionToCheck >= node.getWidth()) {
                hasSeveralTrailingWhitespaces = false;
            }
            else {
                scanner.setTextPos(positionToCheck);
                hasSeveralTrailingWhitespaces = hasTrailingWhitespace &&
                    scanner.scan() === ts.SyntaxKind.WhitespaceTrivia;
            }
            var optionValue = this.getRightOption(option);
            var message = "expected " + optionValue + " after colon in " + option;
            this.performFailureCheck(optionValue, hasTrailingWhitespace, hasSeveralTrailingWhitespaces, colonPosition + 1, message);
        }
    };
    TypedefWhitespaceWalker.prototype.performFailureCheck = function (optionValue, hasWS, hasSeveralWS, failurePos, message) {
        var isFailure = hasSeveralWS &&
            (optionValue === "onespace" || optionValue === "nospace");
        isFailure = isFailure || hasWS && optionValue === "nospace";
        isFailure = isFailure || !hasWS &&
            (optionValue === "onespace" || optionValue === "space");
        if (isFailure) {
            this.addFailure(this.createFailure(failurePos, 1, message));
        }
    };
    return TypedefWhitespaceWalker;
}(Lint.RuleWalker));
