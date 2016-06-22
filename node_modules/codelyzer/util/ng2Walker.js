"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ts = require('typescript');
var getDecoratorName = function (decorator) {
    var baseExpr = decorator.expression || {};
    var expr = baseExpr.expression || {};
    return expr.text;
};
var getDecoratorStringArgs = function (decorator) {
    var baseExpr = decorator.expression || {};
    var expr = baseExpr.expression || {};
    var args = baseExpr.arguments || [];
    return args.map(function (a) { return (a.kind === ts.SyntaxKind.StringLiteral) ? a.text : null; });
};
var Ng2Walker = (function (_super) {
    __extends(Ng2Walker, _super);
    function Ng2Walker() {
        _super.apply(this, arguments);
    }
    Ng2Walker.prototype.visitClassDeclaration = function (declaration) {
        (declaration.decorators || []).forEach(this.visitClassDecorator.bind(this));
        _super.prototype.visitClassDeclaration.call(this, declaration);
    };
    Ng2Walker.prototype.visitMethodDeclaration = function (method) {
        (method.decorators || []).forEach(this.visitMethodDecorator.bind(this));
        _super.prototype.visitMethodDeclaration.call(this, method);
    };
    Ng2Walker.prototype.visitMethodDecorator = function (decorator) {
        var name = getDecoratorName(decorator);
        if (name === 'HostListener') {
            this.visitNg2HostListener(decorator.parent, decorator, getDecoratorStringArgs(decorator));
        }
    };
    Ng2Walker.prototype.visitPropertyDeclaration = function (prop) {
        (prop.decorators || []).forEach(this.visitPropertyDecorator.bind(this));
        _super.prototype.visitPropertyDeclaration.call(this, prop);
    };
    Ng2Walker.prototype.visitPropertyDecorator = function (decorator) {
        var name = getDecoratorName(decorator);
        switch (name) {
            case 'Input':
                this.visitNg2Input(decorator.parent, decorator, getDecoratorStringArgs(decorator));
                break;
            case 'Output':
                this.visitNg2Output(decorator.parent, decorator, getDecoratorStringArgs(decorator));
                break;
            case 'HostBinding':
                this.visitNg2HostBinding(decorator.parent, decorator, getDecoratorStringArgs(decorator));
                break;
        }
    };
    Ng2Walker.prototype.visitClassDecorator = function (decorator) {
        var name = getDecoratorName(decorator);
        if (name === 'Component') {
            this.visitNg2Component(decorator.parent, decorator);
        }
        else if (name === 'Directive') {
            this.visitNg2Directive(decorator.parent, decorator);
        }
    };
    Ng2Walker.prototype.visitNg2Component = function (controller, decorator) { };
    Ng2Walker.prototype.visitNg2Directive = function (controller, decorator) { };
    Ng2Walker.prototype.visitNg2Input = function (property, input, args) { };
    Ng2Walker.prototype.visitNg2Output = function (property, output, args) { };
    Ng2Walker.prototype.visitNg2HostBinding = function (property, decorator, args) { };
    Ng2Walker.prototype.visitNg2HostListener = function (method, decorator, args) { };
    return Ng2Walker;
}(Lint.RuleWalker));
exports.Ng2Walker = Ng2Walker;
