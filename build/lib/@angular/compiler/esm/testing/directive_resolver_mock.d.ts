/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DirectiveMetadata, Injector } from '@angular/core';
import { DirectiveResolver } from '../src/directive_resolver';
import { Type } from '../src/facade/lang';
/**
 * An implementation of {@link DirectiveResolver} that allows overriding
 * various properties of directives.
 */
export declare class MockDirectiveResolver extends DirectiveResolver {
    private _injector;
    private _providerOverrides;
    private viewProviderOverrides;
    constructor(_injector: Injector);
    private readonly _compiler;
    resolve(type: Type): DirectiveMetadata;
    setProvidersOverride(type: Type, providers: any[]): void;
    setViewProvidersOverride(type: Type, viewProviders: any[]): void;
}
