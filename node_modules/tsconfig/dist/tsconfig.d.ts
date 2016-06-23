import Promise = require('pinkie-promise');
export interface CompilerOptions {
    [key: string]: any;
}
export interface TSConfig {
    compilerOptions?: CompilerOptions;
    files?: string[];
    exclude?: string[];
    filesGlob?: string[];
    [key: string]: any;
}
export interface Options {
    compilerOptions?: CompilerOptions;
    filterDefinitions?: boolean;
    resolvePaths?: boolean;
}
export declare function resolve(dir: string): Promise<string>;
export declare function resolveSync(dir: string): string;
export declare function load(dir: string, options?: Options): Promise<TSConfig>;
export declare function loadSync(dir: string, options?: Options): TSConfig;
export declare function readFile(filename: string, options?: Options): Promise<{}>;
export declare function readFileSync(filename: string, options?: Options): TSConfig;
export declare function parseFile(contents: string, filename: string, options?: Options): Promise<TSConfig>;
export declare function parseFileSync(contents: string, filename: string, options?: Options): TSConfig;
export declare function resolveConfig(data: TSConfig, filename: string, options?: Options): Promise<TSConfig>;
export declare function resolveConfigSync(data: TSConfig, filename: string, options?: Options): TSConfig;
