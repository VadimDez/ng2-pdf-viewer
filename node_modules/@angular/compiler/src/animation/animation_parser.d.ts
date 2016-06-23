import { CompileAnimationEntryMetadata } from '../compile_metadata';
import { ParseError } from '../parse_util';
import { AnimationEntryAst } from './animation_ast';
export declare class AnimationParseError extends ParseError {
    constructor(message: any);
    toString(): string;
}
export declare class ParsedAnimationResult {
    ast: AnimationEntryAst;
    errors: AnimationParseError[];
    constructor(ast: AnimationEntryAst, errors: AnimationParseError[]);
}
export declare function parseAnimationEntry(entry: CompileAnimationEntryMetadata): ParsedAnimationResult;
