import * as ts from 'typescript';
import { ModuleFilenameResolver } from './api';
import { CompilerOptions } from './api';
export declare function createModuleFilenameResolver(tsHost: ts.ModuleResolutionHost, options: CompilerOptions): ModuleFilenameResolver;
