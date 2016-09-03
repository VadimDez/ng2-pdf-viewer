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
import { BoundEventAst, DirectiveAst } from '../template_parser/template_ast';
import { CompileElement } from './compile_element';
export declare class CompileElementAnimationOutput {
    listener: CompileEventListener;
    output: AnimationOutput;
    constructor(listener: CompileEventListener, output: AnimationOutput);
}
export declare class CompileEventListener {
    compileElement: CompileElement;
    eventTarget: string;
    eventName: string;
    private _method;
    private _hasComponentHostListener;
    private _methodName;
    private _eventParam;
    private _actionResultExprs;
    static getOrCreate(compileElement: CompileElement, eventTarget: string, eventName: string, targetEventListeners: CompileEventListener[]): CompileEventListener;
    methodName: string;
    constructor(compileElement: CompileElement, eventTarget: string, eventName: string, listenerIndex: number);
    addAction(hostEvent: BoundEventAst, directive: CompileDirectiveMetadata, directiveInstance: o.Expression): void;
    finishMethod(): void;
    listenToRenderer(): void;
    listenToAnimation(output: AnimationOutput): void;
    listenToDirective(directiveInstance: o.Expression, observablePropName: string): void;
}
export declare function collectEventListeners(hostEvents: BoundEventAst[], dirs: DirectiveAst[], compileElement: CompileElement): CompileEventListener[];
export declare function bindDirectiveOutputs(directiveAst: DirectiveAst, directiveInstance: o.Expression, eventListeners: CompileEventListener[]): void;
export declare function bindRenderOutputs(eventListeners: CompileEventListener[]): void;
export declare function bindAnimationOutputs(eventListeners: CompileElementAnimationOutput[]): void;
