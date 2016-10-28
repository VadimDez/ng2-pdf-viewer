import * as o from '../output/output_ast';
import { BoundElementPropertyAst, BoundTextAst, DirectiveAst } from '../template_parser/template_ast';
import { CompileElement, CompileNode } from './compile_element';
import { CompileView } from './compile_view';
import { CompileEventListener } from './event_binder';
export declare function bindRenderText(boundText: BoundTextAst, compileNode: CompileNode, view: CompileView): void;
export declare function bindRenderInputs(boundProps: BoundElementPropertyAst[], compileElement: CompileElement, eventListeners: CompileEventListener[]): void;
export declare function bindDirectiveHostProps(directiveAst: DirectiveAst, directiveInstance: o.Expression, compileElement: CompileElement, eventListeners: CompileEventListener[]): void;
export declare function bindDirectiveInputs(directiveAst: DirectiveAst, directiveWrapperInstance: o.Expression, compileElement: CompileElement): void;
