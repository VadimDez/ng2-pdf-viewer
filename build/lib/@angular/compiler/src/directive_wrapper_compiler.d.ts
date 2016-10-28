import { CompileDirectiveMetadata, CompileIdentifierMetadata } from './compile_metadata';
import { CompilerConfig } from './config';
import * as o from './output/output_ast';
export declare class DirectiveWrapperCompileResult {
    statements: o.Statement[];
    dirWrapperClassVar: string;
    constructor(statements: o.Statement[], dirWrapperClassVar: string);
}
/**
 * We generate directive wrappers to prevent code bloat when a directive is used.
 * A directive wrapper encapsulates
 * the dirty checking for `@Input`, the handling of `@HostListener` / `@HostBinding`
 * and calling the lifecyclehooks `ngOnInit`, `ngOnChanges`, `ngDoCheck`.
 *
 * So far, only `@Input` and the lifecycle hooks have been implemented.
 */
export declare class DirectiveWrapperCompiler {
    private compilerConfig;
    static dirWrapperClassName(id: CompileIdentifierMetadata): string;
    constructor(compilerConfig: CompilerConfig);
    compile(dirMeta: CompileDirectiveMetadata): DirectiveWrapperCompileResult;
}
