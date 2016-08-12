/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEntryMetadata, DirectiveMetadata, Injector, ViewMetadata } from '@angular/core';
import { DirectiveResolver } from '../src/directive_resolver';
import { Type } from '../src/facade/lang';
/**
 * An implementation of {@link DirectiveResolver} that allows overriding
 * various properties of directives.
 */
export declare class MockDirectiveResolver extends DirectiveResolver {
    private _injector;
    private _directives;
    private _providerOverrides;
    private _viewProviderOverrides;
    private _views;
    private _inlineTemplates;
    private _animations;
    private _directiveOverrides;
    constructor(_injector: Injector);
    private readonly _compiler;
    private _clearCacheFor(component);
    resolve(type: Type, throwIfNotFound?: boolean): DirectiveMetadata;
    /**
     * Overrides the {@link DirectiveMetadata} for a directive.
     */
    setDirective(type: Type, metadata: DirectiveMetadata): void;
    setProvidersOverride(type: Type, providers: any[]): void;
    setViewProvidersOverride(type: Type, viewProviders: any[]): void;
    /**
     * Overrides the {@link ViewMetadata} for a component.
     */
    setView(component: Type, view: ViewMetadata): void;
    /**
     * Overrides the inline template for a component - other configuration remains unchanged.
     */
    setInlineTemplate(component: Type, template: string): void;
    setAnimations(component: Type, animations: AnimationEntryMetadata[]): void;
    /**
     * Overrides a directive from the component {@link ViewMetadata}.
     */
    overrideViewDirective(component: Type, from: Type, to: Type): void;
}
