import * as ts from 'typescript';
import * as api from './transformers/api';
export declare type Diagnostics = Array<ts.Diagnostic | api.Diagnostic>;
export declare function filterErrorsAndWarnings(diagnostics: Diagnostics): Diagnostics;
export declare function formatDiagnostics(diags: Diagnostics, tsFormatHost?: ts.FormatDiagnosticsHost): string;
export interface ParsedConfiguration {
    project: string;
    options: api.CompilerOptions;
    rootNames: string[];
    emitFlags: api.EmitFlags;
    errors: Diagnostics;
}
export declare function calcProjectFileAndBasePath(project: string): {
    projectFile: string;
    basePath: string;
};
export declare function createNgCompilerOptions(basePath: string, config: any, tsOptions: ts.CompilerOptions): api.CompilerOptions;
export declare function readConfiguration(project: string, existingOptions?: ts.CompilerOptions): ParsedConfiguration;
export interface PerformCompilationResult {
    diagnostics: Diagnostics;
    program?: api.Program;
    emitResult?: ts.EmitResult;
}
export declare function exitCodeFromResult(diags: Diagnostics | undefined): number;
export declare function performCompilation({rootNames, options, host, oldProgram, emitCallback, gatherDiagnostics, customTransformers, emitFlags}: {
    rootNames: string[];
    options: api.CompilerOptions;
    host?: api.CompilerHost;
    oldProgram?: api.Program;
    emitCallback?: api.TsEmitCallback;
    gatherDiagnostics?: (program: api.Program) => Diagnostics;
    customTransformers?: api.CustomTransformers;
    emitFlags?: api.EmitFlags;
}): PerformCompilationResult;
