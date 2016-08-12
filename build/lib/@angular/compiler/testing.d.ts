/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export * from './testing/schema_registry_mock';
export * from './testing/test_component_builder';
export * from './testing/directive_resolver_mock';
export * from './testing/ng_module_resolver_mock';
export * from './testing/pipe_resolver_mock';
import { ConcreteType, Type } from './src/facade/lang';
import { ModuleWithComponentFactories, CompilerOptions, PlatformRef, CompilerFactory, ComponentFactory, NgModuleFactory, Injector, NgModuleMetadataType, ComponentMetadataType, DirectiveMetadataType, PipeMetadataType } from '@angular/core';
import { MetadataOverride } from '@angular/core/testing';
import { TestingCompilerFactory, TestingCompiler } from './core_private_testing';
import { RuntimeCompiler } from './index';
import { MockDirectiveResolver } from './testing/directive_resolver_mock';
import { MockNgModuleResolver } from './testing/ng_module_resolver_mock';
import { MockPipeResolver } from './testing/pipe_resolver_mock';
export declare class TestingCompilerFactoryImpl implements TestingCompilerFactory {
    private _compilerFactory;
    constructor(_compilerFactory: CompilerFactory);
    createTestingCompiler(options: CompilerOptions[]): TestingCompiler;
}
export declare class TestingCompilerImpl implements TestingCompiler {
    private _compiler;
    private _directiveResolver;
    private _pipeResolver;
    private _moduleResolver;
    private _overrider;
    constructor(_compiler: RuntimeCompiler, _directiveResolver: MockDirectiveResolver, _pipeResolver: MockPipeResolver, _moduleResolver: MockNgModuleResolver);
    injector: Injector;
    compileComponentAsync<T>(component: ConcreteType<T>, ngModule?: Type): Promise<ComponentFactory<T>>;
    compileComponentSync<T>(component: ConcreteType<T>, ngModule?: Type): ComponentFactory<T>;
    compileModuleSync<T>(moduleType: ConcreteType<T>): NgModuleFactory<T>;
    compileModuleAsync<T>(moduleType: ConcreteType<T>): Promise<NgModuleFactory<T>>;
    compileModuleAndAllComponentsSync<T>(moduleType: ConcreteType<T>): ModuleWithComponentFactories<T>;
    compileModuleAndAllComponentsAsync<T>(moduleType: ConcreteType<T>): Promise<ModuleWithComponentFactories<T>>;
    overrideModule(ngModule: ConcreteType<any>, override: MetadataOverride<NgModuleMetadataType>): void;
    overrideDirective(directive: ConcreteType<any>, override: MetadataOverride<DirectiveMetadataType>): void;
    overrideComponent(component: ConcreteType<any>, override: MetadataOverride<ComponentMetadataType>): void;
    overridePipe(pipe: ConcreteType<any>, override: MetadataOverride<PipeMetadataType>): void;
    clearCache(): void;
    clearCacheFor(type: Type): void;
}
/**
 * Platform for dynamic tests
 *
 * @experimental
 */
export declare const platformCoreDynamicTesting: (extraProviders?: any[]) => PlatformRef;
