import { HtmlAst } from '../html_ast';
import { ParseError } from '../parse_util';
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
export declare function expandNodes(nodes: HtmlAst[]): ExpansionResult;
export declare class ExpansionResult {
    nodes: HtmlAst[];
    expanded: boolean;
    errors: ParseError[];
    constructor(nodes: HtmlAst[], expanded: boolean, errors: ParseError[]);
}
