import { CompileDirectiveMetadata } from '../compile_metadata';
import * as o from '../output/output_ast';
import * as t from '../template_parser/template_ast';
export declare class CompiledAnimation {
    name: string;
    statesMapStatement: o.Statement;
    statesVariableName: string;
    fnStatement: o.Statement;
    fnVariable: o.Expression;
    constructor(name: string, statesMapStatement: o.Statement, statesVariableName: string, fnStatement: o.Statement, fnVariable: o.Expression);
}
export declare class AnimationCompiler {
    compileComponent(component: CompileDirectiveMetadata, template: t.TemplateAst[]): CompiledAnimation[];
}
