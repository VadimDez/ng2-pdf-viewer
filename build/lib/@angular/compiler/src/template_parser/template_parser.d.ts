/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SchemaMetadata } from '@angular/core';
import { Console } from '../../core_private';
import { CompileDirectiveMetadata, CompilePipeMetadata } from '../compile_metadata';
import { BindingPipe, RecursiveAstVisitor } from '../expression_parser/ast';
import { Parser } from '../expression_parser/parser';
import { HtmlParser } from '../ml_parser/html_parser';
import { ParseError, ParseErrorLevel, ParseSourceSpan } from '../parse_util';
import { ElementSchemaRegistry } from '../schema/element_schema_registry';
import { TemplateAst, TemplateAstVisitor } from './template_ast';
/**
 * Provides an array of {@link TemplateAstVisitor}s which will be used to transform
 * parsed templates before compilation is invoked, allowing custom expression syntax
 * and other advanced transformations.
 *
 * This is currently an internal-only feature and not meant for general use.
 */
export declare const TEMPLATE_TRANSFORMS: any;
export declare class TemplateParseError extends ParseError {
    constructor(message: string, span: ParseSourceSpan, level: ParseErrorLevel);
}
export declare class TemplateParseResult {
    templateAst: TemplateAst[];
    errors: ParseError[];
    constructor(templateAst?: TemplateAst[], errors?: ParseError[]);
}
export declare class TemplateParser {
    private _exprParser;
    private _schemaRegistry;
    private _htmlParser;
    private _console;
    transforms: TemplateAstVisitor[];
    constructor(_exprParser: Parser, _schemaRegistry: ElementSchemaRegistry, _htmlParser: HtmlParser, _console: Console, transforms: TemplateAstVisitor[]);
    parse(component: CompileDirectiveMetadata, template: string, directives: CompileDirectiveMetadata[], pipes: CompilePipeMetadata[], schemas: SchemaMetadata[], templateUrl: string): TemplateAst[];
    tryParse(component: CompileDirectiveMetadata, template: string, directives: CompileDirectiveMetadata[], pipes: CompilePipeMetadata[], schemas: SchemaMetadata[], templateUrl: string): TemplateParseResult;
}
export declare function splitClasses(classAttrValue: string): string[];
export declare class PipeCollector extends RecursiveAstVisitor {
    pipes: Set<string>;
    visitPipe(ast: BindingPipe, context: any): any;
}
