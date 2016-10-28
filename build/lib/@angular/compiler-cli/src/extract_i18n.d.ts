import 'reflect-metadata';
import * as compiler from '@angular/compiler';
import * as ts from 'typescript';
import * as tsc from '@angular/tsc-wrapped';
import { ReflectorHost, ReflectorHostContext } from './reflector_host';
import { StaticReflector } from './static_reflector';
export declare class Extractor {
    private program;
    host: ts.CompilerHost;
    private staticReflector;
    private messageBundle;
    private reflectorHost;
    private metadataResolver;
    private directiveNormalizer;
    constructor(program: ts.Program, host: ts.CompilerHost, staticReflector: StaticReflector, messageBundle: compiler.MessageBundle, reflectorHost: ReflectorHost, metadataResolver: compiler.CompileMetadataResolver, directiveNormalizer: compiler.DirectiveNormalizer);
    private readFileMetadata(absSourcePath);
    extract(): Promise<compiler.MessageBundle>;
    static create(options: tsc.AngularCompilerOptions, translationsFormat: string, program: ts.Program, compilerHost: ts.CompilerHost, htmlParser: compiler.I18NHtmlParser, reflectorHostContext?: ReflectorHostContext): Extractor;
}
