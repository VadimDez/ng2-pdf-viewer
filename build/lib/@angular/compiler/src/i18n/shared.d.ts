import { Parser } from '../expression_parser/parser';
import { HtmlAst, HtmlAttrAst, HtmlElementAst, HtmlTextAst } from '../html_ast';
import { ParseError, ParseSourceSpan } from '../parse_util';
import { Message } from './message';
export declare const I18N_ATTR: string;
export declare const I18N_ATTR_PREFIX: string;
/**
 * An i18n error.
 */
export declare class I18nError extends ParseError {
    constructor(span: ParseSourceSpan, msg: string);
}
export declare function partition(nodes: HtmlAst[], errors: ParseError[], implicitTags: string[]): Part[];
export declare class Part {
    rootElement: HtmlElementAst;
    rootTextNode: HtmlTextAst;
    children: HtmlAst[];
    i18n: string;
    hasI18n: boolean;
    constructor(rootElement: HtmlElementAst, rootTextNode: HtmlTextAst, children: HtmlAst[], i18n: string, hasI18n: boolean);
    sourceSpan: ParseSourceSpan;
    createMessage(parser: Parser): Message;
}
export declare function meaning(i18n: string): string;
export declare function description(i18n: string): string;
export declare function messageFromAttribute(parser: Parser, attr: HtmlAttrAst, meaning?: string, description?: string): Message;
export declare function removeInterpolation(value: string, source: ParseSourceSpan, parser: Parser): string;
export declare function getPhNameFromBinding(input: string, index: number): string;
export declare function dedupePhName(usedNames: Map<string, number>, name: string): string;
export declare function stringifyNodes(nodes: HtmlAst[], parser: Parser): string;
