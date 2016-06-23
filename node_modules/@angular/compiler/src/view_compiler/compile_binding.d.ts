import { TemplateAst } from '../template_ast';
import { CompileNode } from './compile_element';
export declare class CompileBinding {
    node: CompileNode;
    sourceAst: TemplateAst;
    constructor(node: CompileNode, sourceAst: TemplateAst);
}
