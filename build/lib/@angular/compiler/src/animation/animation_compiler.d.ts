/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompileDirectiveMetadata } from '../compile_metadata';
import * as o from '../output/output_ast';
import { AnimationOutput } from '../private_import_core';
import * as t from '../template_parser/template_ast';
import { AnimationParseError } from './animation_parser';
export declare class CompiledAnimationTriggerResult {
    name: string;
    statesMapStatement: o.Statement;
    statesVariableName: string;
    fnStatement: o.Statement;
    fnVariable: o.Expression;
    constructor(name: string, statesMapStatement: o.Statement, statesVariableName: string, fnStatement: o.Statement, fnVariable: o.Expression);
}
export declare class CompiledComponentAnimationResult {
    outputs: AnimationOutput[];
    triggers: CompiledAnimationTriggerResult[];
    constructor(outputs: AnimationOutput[], triggers: CompiledAnimationTriggerResult[]);
}
export declare class AnimationCompiler {
    compileComponent(component: CompileDirectiveMetadata, template: t.TemplateAst[]): CompiledComponentAnimationResult;
}
export declare class AnimationPropertyValidationOutput {
    outputs: AnimationOutput[];
    errors: AnimationParseError[];
    constructor(outputs: AnimationOutput[], errors: AnimationParseError[]);
}
