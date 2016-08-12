/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewEncapsulation } from '@angular/core';
import { CompileIdentifierMetadata } from './compile_metadata';
export declare class CompilerConfig {
    renderTypes: RenderTypes;
    defaultEncapsulation: ViewEncapsulation;
    private _genDebugInfo;
    private _logBindingUpdate;
    useJit: boolean;
    /**
     * @deprecated Providing platform directives via the {@link CompilerConfig} is deprecated. Provide
     * platform directives via an {@link NgModule} instead.
     */
    platformDirectives: any[];
    /**
     * @deprecated Providing platform pipes via the {@link CompilerConfig} is deprecated. Provide
     * platform pipes via an {@link NgModule} instead.
     */
    platformPipes: any[];
    constructor({renderTypes, defaultEncapsulation, genDebugInfo, logBindingUpdate, useJit, deprecatedPlatformDirectives, deprecatedPlatformPipes}?: {
        renderTypes?: RenderTypes;
        defaultEncapsulation?: ViewEncapsulation;
        genDebugInfo?: boolean;
        logBindingUpdate?: boolean;
        useJit?: boolean;
        deprecatedPlatformDirectives?: any[];
        deprecatedPlatformPipes?: any[];
    });
    genDebugInfo: boolean;
    logBindingUpdate: boolean;
}
/**
 * Types used for the renderer.
 * Can be replaced to specialize the generated output to a specific renderer
 * to help tree shaking.
 */
export declare abstract class RenderTypes {
    renderer: CompileIdentifierMetadata;
    renderText: CompileIdentifierMetadata;
    renderElement: CompileIdentifierMetadata;
    renderComment: CompileIdentifierMetadata;
    renderNode: CompileIdentifierMetadata;
    renderEvent: CompileIdentifierMetadata;
}
export declare class DefaultRenderTypes implements RenderTypes {
    renderer: CompileIdentifierMetadata;
    renderText: any;
    renderElement: any;
    renderComment: any;
    renderNode: any;
    renderEvent: any;
}
