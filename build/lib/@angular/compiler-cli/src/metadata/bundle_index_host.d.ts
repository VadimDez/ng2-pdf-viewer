import * as ts from 'typescript';
import { CompilerOptions } from '../transformers/api';
export declare function createBundleIndexHost<H extends ts.CompilerHost>(ngOptions: CompilerOptions, rootFiles: string[], host: H): {
    host: H;
    indexName?: string;
    errors?: ts.Diagnostic[];
};
