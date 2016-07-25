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
 * <ng-container [ngPlural]="messages.length">
 *   <template ngPluralCase="=0">zero</ng-container>
 *   <template ngPluralCase="=1">one</ng-container>
 *   <template ngPluralCase="other">more than one</ng-container>
 * </ng-container>
 * ```
 */
export declare function expandNodes(nodes: HtmlAst[]): ExpansionResult;
export declare class ExpansionResult {
    nodes: HtmlAst[];
    expanded: boolean;
    errors: ParseError[];
    constructor(nodes: HtmlAst[], expanded: boolean, errors: ParseError[]);
}
