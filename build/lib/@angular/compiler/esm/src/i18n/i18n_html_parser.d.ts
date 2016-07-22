/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Parser } from '../expression_parser/parser';
import { HtmlAst } from '../html_ast';
import { HtmlParseTreeResult, HtmlParser } from '../html_parser';
import { InterpolationConfig } from '../interpolation_config';
import { ParseError } from '../parse_util';
/**
 * Creates an i18n-ed version of the parsed template.
 *
 * Algorithm:
 *
 * See `message_extractor.ts` for details on the partitioning algorithm.
 *
 * This is how the merging works:
 *
 * 1. Use the stringify function to get the message id. Look up the message in the map.
 * 2. Get the translated message. At this point we have two trees: the original tree
 * and the translated tree, where all the elements are replaced with placeholders.
 * 3. Use the original tree to create a mapping Index:number -> HtmlAst.
 * 4. Walk the translated tree.
 * 5. If we encounter a placeholder element, get its name property.
 * 6. Get the type and the index of the node using the name property.
 * 7. If the type is 'e', which means element, then:
 *     - translate the attributes of the original element
 *     - recurse to merge the children
 *     - create a new element using the original element name, original position,
 *     and translated children and attributes
 * 8. If the type if 't', which means text, then:
 *     - get the list of expressions from the original node.
 *     - get the string version of the interpolation subtree
 *     - find all the placeholders in the translated message, and replace them with the
 *     corresponding original expressions
 */
export declare class I18nHtmlParser implements HtmlParser {
    private _htmlParser;
    private _parser;
    private _messagesContent;
    private _messages;
    private _implicitTags;
    private _implicitAttrs;
    errors: ParseError[];
    private _interpolationConfig;
    constructor(_htmlParser: HtmlParser, _parser: Parser, _messagesContent: string, _messages: {
        [key: string]: HtmlAst[];
    }, _implicitTags: string[], _implicitAttrs: {
        [k: string]: string[];
    });
    parse(sourceContent: string, sourceUrl: string, parseExpansionForms?: boolean, interpolationConfig?: InterpolationConfig): HtmlParseTreeResult;
    private _processI18nPart(part);
    private _mergeI18Part(part);
    private _recurseIntoI18nPart(p);
    private _recurse(nodes);
    private _mergeTrees(p, translated, original);
    private _mergeTreesHelper(translated, mapping);
    private _mergeElementOrInterpolation(t, translated, mapping);
    private _getName(t);
    private _mergeTextInterpolation(t, originalNode);
    private _mergeElement(t, originalNode, mapping);
    private _i18nAttributes(el);
    private _replaceInterpolationInAttr(attr, msg);
    private _replacePlaceholdersWithExpressions(message, exps, sourceSpan);
    private _buildExprMap(exps);
    private _convertIntoExpression(name, expMap, sourceSpan);
}
