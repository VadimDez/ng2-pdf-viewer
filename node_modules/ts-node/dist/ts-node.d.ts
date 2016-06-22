import { BaseError } from 'make-error';
export interface TS_Common {
    sys: any;
    service: any;
    ScriptSnapshot: {
        fromString(value: string): any;
    };
    displayPartsToString(parts: any): string;
    createLanguageService(serviceHost: any): any;
    getDefaultLibFilePath(options: any): string;
    getPreEmitDiagnostics(program: any): any[];
    flattenDiagnosticMessageText(diagnostic: any, newLine: string): string;
}
export interface TS_1_7ish extends TS_Common {
    parseJsonConfigFileContent(config: any, host: any, fileName: string): any;
}
export interface TS_1_5ish extends TS_Common {
    parseConfigFile(config: any, host: any, fileName: string): any;
}
export declare type TSish = TS_1_5ish | TS_1_7ish;
export declare const VERSION: string;
export declare const EXTENSIONS: string[];
export interface Options {
    compiler?: string;
    noProject?: boolean;
    project?: string;
    ignoreWarnings?: Array<number | string>;
    isEval?: boolean;
    disableWarnings?: boolean;
    getFile?: (fileName: string) => string;
    getVersion?: (fileName: string) => string;
}
export declare function register(opts?: Options): {
    compile: (fileName: string) => any;
    getTypeInfo: (fileName: string, position: number) => string;
};
export declare function getVersion(fileName: string): string;
export declare function getFile(fileName: string): string;
export declare function printDiagnostics(diagnostics: string[]): string;
export declare class TSError extends BaseError {
    diagnostics: string[];
    name: string;
    constructor(diagnostics: string[]);
    print(): string;
}
