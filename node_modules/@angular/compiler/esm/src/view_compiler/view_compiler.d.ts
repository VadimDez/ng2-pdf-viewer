import { CompileDirectiveMetadata, CompilePipeMetadata } from '../compile_metadata';
import { CompilerConfig } from '../config';
import * as o from '../output/output_ast';
import { TemplateAst } from '../template_ast';
import { ViewCompileDependency } from './view_builder';
export declare class ViewCompileResult {
    statements: o.Statement[];
    viewFactoryVar: string;
    dependencies: ViewCompileDependency[];
    constructor(statements: o.Statement[], viewFactoryVar: string, dependencies: ViewCompileDependency[]);
}
export declare class ViewCompiler {
    private _genConfig;
    private _animationCompiler;
    constructor(_genConfig: CompilerConfig);
    compileComponent(component: CompileDirectiveMetadata, template: TemplateAst[], styles: o.Expression, pipes: CompilePipeMetadata[]): ViewCompileResult;
}
