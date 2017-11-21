import { EmitterVisitorContext, OutputEmitter } from './abstract_emitter';
import * as o from './output_ast';
export declare function debugOutputAstAsTypeScript(ast: o.Statement | o.Expression | o.Type | any[]): string;
export declare type ReferenceFilter = (reference: o.ExternalReference) => boolean;
export declare class TypeScriptEmitter implements OutputEmitter {
    emitStatementsAndContext(genFilePath: string, stmts: o.Statement[], preamble?: string, emitSourceMaps?: boolean, referenceFilter?: ReferenceFilter): {
        sourceText: string;
        context: EmitterVisitorContext;
    };
    emitStatements(genFilePath: string, stmts: o.Statement[], preamble?: string): string;
}
