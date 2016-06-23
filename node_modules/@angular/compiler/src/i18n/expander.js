"use strict";
var exceptions_1 = require('../facade/exceptions');
var html_ast_1 = require('../html_ast');
var shared_1 = require('./shared');
// http://cldr.unicode.org/index/cldr-spec/plural-rules
var PLURAL_CASES = ['zero', 'one', 'two', 'few', 'many', 'other'];
/**
 * Expands special forms into elements.
 *
 * For example,
 *
 * ```
 * { messages.length, plural,
 *   =0 {zero}
 *   =1 {one}
 *   other {more than one}
 * }
 * ```
 *
 * will be expanded into
 *
 * ```
 * <ul [ngPlural]="messages.length">
 *   <template ngPluralCase="=0"><li i18n="plural_=0">zero</li></template>
 *   <template ngPluralCase="=1"><li i18n="plural_=1">one</li></template>
 *   <template ngPluralCase="other"><li i18n="plural_other">more than one</li></template>
 * </ul>
 * ```
 */
function expandNodes(nodes) {
    var e = new _Expander();
    var n = html_ast_1.htmlVisitAll(e, nodes);
    return new ExpansionResult(n, e.expanded, e.errors);
}
exports.expandNodes = expandNodes;
var ExpansionResult = (function () {
    function ExpansionResult(nodes, expanded, errors) {
        this.nodes = nodes;
        this.expanded = expanded;
        this.errors = errors;
    }
    return ExpansionResult;
}());
exports.ExpansionResult = ExpansionResult;
/**
 * Expand expansion forms (plural, select) to directives
 *
 * @internal
 */
var _Expander = (function () {
    function _Expander() {
        this.expanded = false;
        this.errors = [];
    }
    _Expander.prototype.visitElement = function (ast, context) {
        return new html_ast_1.HtmlElementAst(ast.name, ast.attrs, html_ast_1.htmlVisitAll(this, ast.children), ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
    };
    _Expander.prototype.visitAttr = function (ast, context) { return ast; };
    _Expander.prototype.visitText = function (ast, context) { return ast; };
    _Expander.prototype.visitComment = function (ast, context) { return ast; };
    _Expander.prototype.visitExpansion = function (ast, context) {
        this.expanded = true;
        return ast.type == 'plural' ? _expandPluralForm(ast, this.errors) : _expandDefaultForm(ast);
    };
    _Expander.prototype.visitExpansionCase = function (ast, context) {
        throw new exceptions_1.BaseException('Should not be reached');
    };
    return _Expander;
}());
function _expandPluralForm(ast, errors) {
    var children = ast.cases.map(function (c) {
        if (PLURAL_CASES.indexOf(c.value) == -1 && !c.value.match(/^=\d+$/)) {
            errors.push(new shared_1.I18nError(c.valueSourceSpan, "Plural cases should be \"=<number>\" or one of " + PLURAL_CASES.join(", ")));
        }
        var expansionResult = expandNodes(c.expression);
        errors.push.apply(errors, expansionResult.errors);
        var i18nAttrs = expansionResult.expanded ?
            [] :
            [new html_ast_1.HtmlAttrAst('i18n', ast.type + "_" + c.value, c.valueSourceSpan)];
        return new html_ast_1.HtmlElementAst("template", [
            new html_ast_1.HtmlAttrAst('ngPluralCase', c.value, c.valueSourceSpan),
        ], [new html_ast_1.HtmlElementAst("li", i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)], c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    var switchAttr = new html_ast_1.HtmlAttrAst('[ngPlural]', ast.switchValue, ast.switchValueSourceSpan);
    return new html_ast_1.HtmlElementAst('ul', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
function _expandDefaultForm(ast) {
    var children = ast.cases.map(function (c) {
        var expansionResult = expandNodes(c.expression);
        var i18nAttrs = expansionResult.expanded ?
            [] :
            [new html_ast_1.HtmlAttrAst('i18n', ast.type + "_" + c.value, c.valueSourceSpan)];
        return new html_ast_1.HtmlElementAst("template", [
            new html_ast_1.HtmlAttrAst('ngSwitchWhen', c.value, c.valueSourceSpan),
        ], [new html_ast_1.HtmlElementAst("li", i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)], c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    var switchAttr = new html_ast_1.HtmlAttrAst('[ngSwitch]', ast.switchValue, ast.switchValueSourceSpan);
    return new html_ast_1.HtmlElementAst('ul', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
//# sourceMappingURL=expander.js.map