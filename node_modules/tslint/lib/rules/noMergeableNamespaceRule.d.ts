import * as ts from "typescript";
import * as Lint from "../lint";
export declare class Rule extends Lint.Rules.AbstractRule {
    static failureStringFactory(identifier: string, locationToMerge: ts.LineAndCharacter): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
