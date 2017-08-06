import * as ts from 'typescript';
import { CompilerHost, CompilerOptions } from './api';
import { createModuleFilenameResolver } from './module_filename_resolver';
export { createProgram } from './program';
export { createModuleFilenameResolver };
export declare function createHost({tsHost, options}: {
    tsHost: ts.CompilerHost;
    options: CompilerOptions;
}): CompilerHost;
