import { BaseException } from '../facade/exceptions';
import { HtmlAttrAst, HtmlElementAst, htmlVisitAll } from '../html_ast';
import { I18nError } from './shared';
// http://cldr.unicode.org/index/cldr-spec/plural-rules
const PLURAL_CASES = ['zero', 'one', 'two', 'few', 'many', 'other'];
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
export function expandNodes(nodes) {
    let e = new _Expander();
    let n = htmlVisitAll(e, nodes);
    return new ExpansionResult(n, e.expanded, e.errors);
}
export class ExpansionResult {
    constructor(nodes, expanded, errors) {
        this.nodes = nodes;
        this.expanded = expanded;
        this.errors = errors;
    }
}
/**
 * Expand expansion forms (plural, select) to directives
 *
 * @internal
 */
class _Expander {
    constructor() {
        this.expanded = false;
        this.errors = [];
    }
    visitElement(ast, context) {
        return new HtmlElementAst(ast.name, ast.attrs, htmlVisitAll(this, ast.children), ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
    }
    visitAttr(ast, context) { return ast; }
    visitText(ast, context) { return ast; }
    visitComment(ast, context) { return ast; }
    visitExpansion(ast, context) {
        this.expanded = true;
        return ast.type == 'plural' ? _expandPluralForm(ast, this.errors) : _expandDefaultForm(ast);
    }
    visitExpansionCase(ast, context) {
        throw new BaseException('Should not be reached');
    }
}
function _expandPluralForm(ast, errors) {
    let children = ast.cases.map(c => {
        if (PLURAL_CASES.indexOf(c.value) == -1 && !c.value.match(/^=\d+$/)) {
            errors.push(new I18nError(c.valueSourceSpan, `Plural cases should be "=<number>" or one of ${PLURAL_CASES.join(", ")}`));
        }
        let expansionResult = expandNodes(c.expression);
        errors.push(...expansionResult.errors);
        let i18nAttrs = expansionResult.expanded ?
            [] :
            [new HtmlAttrAst('i18n', `${ast.type}_${c.value}`, c.valueSourceSpan)];
        return new HtmlElementAst(`template`, [
            new HtmlAttrAst('ngPluralCase', c.value, c.valueSourceSpan),
        ], [new HtmlElementAst(`li`, i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)], c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    let switchAttr = new HtmlAttrAst('[ngPlural]', ast.switchValue, ast.switchValueSourceSpan);
    return new HtmlElementAst('ul', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
function _expandDefaultForm(ast) {
    let children = ast.cases.map(c => {
        let expansionResult = expandNodes(c.expression);
        let i18nAttrs = expansionResult.expanded ?
            [] :
            [new HtmlAttrAst('i18n', `${ast.type}_${c.value}`, c.valueSourceSpan)];
        return new HtmlElementAst(`template`, [
            new HtmlAttrAst('ngSwitchWhen', c.value, c.valueSourceSpan),
        ], [new HtmlElementAst(`li`, i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)], c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    let switchAttr = new HtmlAttrAst('[ngSwitch]', ast.switchValue, ast.switchValueSourceSpan);
    return new HtmlElementAst('ul', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
//# sourceMappingURL=expander.js.map