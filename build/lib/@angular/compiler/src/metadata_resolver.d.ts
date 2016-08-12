/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEntryMetadata, AnimationMetadata, AnimationStateMetadata, AnimationStyleMetadata, Provider, QueryMetadata } from '@angular/core';
import { Console, ReflectorReader } from '../core_private';
import * as cpl from './compile_metadata';
import { CompilerConfig } from './config';
import { DirectiveResolver } from './directive_resolver';
import { Type } from './facade/lang';
import { NgModuleResolver } from './ng_module_resolver';
import { PipeResolver } from './pipe_resolver';
import { ElementSchemaRegistry } from './schema/element_schema_registry';
export declare class CompileMetadataResolver {
    private _ngModuleResolver;
    private _directiveResolver;
    private _pipeResolver;
    private _config;
    private _console;
    private _schemaRegistry;
    private _reflector;
    private _directiveCache;
    private _pipeCache;
    private _ngModuleCache;
    private _ngModuleOfTypes;
    private _anonymousTypes;
    private _anonymousTypeIndex;
    constructor(_ngModuleResolver: NgModuleResolver, _directiveResolver: DirectiveResolver, _pipeResolver: PipeResolver, _config: CompilerConfig, _console: Console, _schemaRegistry: ElementSchemaRegistry, _reflector?: ReflectorReader);
    private sanitizeTokenName(token);
    clearCacheFor(type: Type): void;
    clearCache(): void;
    getAnimationEntryMetadata(entry: AnimationEntryMetadata): cpl.CompileAnimationEntryMetadata;
    getAnimationStateMetadata(value: AnimationStateMetadata): cpl.CompileAnimationStateMetadata;
    getAnimationStyleMetadata(value: AnimationStyleMetadata): cpl.CompileAnimationStyleMetadata;
    getAnimationMetadata(value: AnimationMetadata): cpl.CompileAnimationMetadata;
    getDirectiveMetadata(directiveType: Type, throwIfNotFound?: boolean): cpl.CompileDirectiveMetadata;
    getNgModuleMetadata(moduleType: any, throwIfNotFound?: boolean): cpl.CompileNgModuleMetadata;
    addComponentToModule(moduleType: Type, compType: Type): void;
    private _verifyModule(moduleMeta);
    private _addTypeToModule(type, moduleType);
    private _getTransitiveViewDirectivesAndPipes(compMeta, moduleMeta);
    private _getTransitiveNgModuleMetadata(importedModules, exportedModules);
    private _addDirectiveToModule(dirMeta, moduleType, transitiveModule, declaredDirectives, force?);
    private _addPipeToModule(pipeMeta, moduleType, transitiveModule, declaredPipes, force?);
    getTypeMetadata(type: Type, moduleUrl: string, dependencies?: any[]): cpl.CompileTypeMetadata;
    getFactoryMetadata(factory: Function, moduleUrl: string, dependencies?: any[]): cpl.CompileFactoryMetadata;
    getPipeMetadata(pipeType: Type, throwIfNotFound?: boolean): cpl.CompilePipeMetadata;
    getDependenciesMetadata(typeOrFunc: Type | Function, dependencies: any[]): cpl.CompileDiDependencyMetadata[];
    getTokenMetadata(token: any): cpl.CompileTokenMetadata;
    getProvidersMetadata(providers: any[], targetEntryComponents: cpl.CompileTypeMetadata[]): Array<cpl.CompileProviderMetadata | cpl.CompileTypeMetadata | any[]>;
    private _getEntryComponentsFromProvider(provider);
    getProviderMetadata(provider: Provider): cpl.CompileProviderMetadata;
    getQueriesMetadata(queries: {
        [key: string]: QueryMetadata;
    }, isViewQuery: boolean, directiveType: Type): cpl.CompileQueryMetadata[];
    getQueryMetadata(q: QueryMetadata, propertyName: string, typeOrFunc: Type | Function): cpl.CompileQueryMetadata;
}
