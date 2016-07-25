/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Parser } from '../expression_parser/parser';
import { HtmlAst, HtmlAttrAst, HtmlElementAst, HtmlTextAst } from '../html_ast';
import { InterpolationConfig } from '../interpolation_config';
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
    readonly sourceSpan: ParseSourceSpan;
    createMessage(parser: Parser, interpolationConfig: InterpolationConfig): Message;
}
export declare function meaning(i18n: string): string;
export declare function description(i18n: string): string;
export declare function messageFromAttribute(parser: Parser, interpolationConfig: InterpolationConfig, attr: HtmlAttrAst, meaning?: string, description?: string): Message;
export declare function removeInterpolation(value: string, source: ParseSourceSpan, parser: Parser, interpolationConfig: InterpolationConfig): string;
export declare function getPhNameFromBinding(input: string, index: number): string;
export declare function dedupePhName(usedNames: Map<string, number>, name: string): string;
export declare function stringifyNodes(nodes: HtmlAst[], parser: Parser, interpolationConfig: InterpolationConfig): string;
