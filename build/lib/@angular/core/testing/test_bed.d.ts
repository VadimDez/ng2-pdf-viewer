/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentMetadataType, DirectiveMetadataType, Injector, NgModuleMetadataType, OpaqueToken, PipeMetadataType, PlatformRef, SchemaMetadata, Type } from '@angular/core';
import { ComponentFixture } from './component_fixture';
import { MetadataOverride } from './metadata_override';
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
export declare class TestComponentRenderer {
    insertRootElement(rootElementId: string): void;
}
/**
 * @experimental
 */
export declare var ComponentFixtureAutoDetect: OpaqueToken;
/**
 * @experimental
 */
export declare var ComponentFixtureNoNgZone: OpaqueToken;
/**
 * @experimental
 */
export declare type TestModuleMetadata = {
    providers?: any[];
    declarations?: any[];
    imports?: any[];
    schemas?: Array<SchemaMetadata | any[]>;
};
/**
 * @experimental
 */
export declare class TestBed implements Injector {
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * 'angular2/platform/testing/<platform_name>'.
     *
     * @experimental
     */
    static initTestEnvironment(ngModule: Type<any>, platform: PlatformRef): TestBed;
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    static resetTestEnvironment(): void;
    static resetTestingModule(): typeof TestBed;
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    static configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): typeof TestBed;
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef: TestModuleMetadata): typeof TestBed;
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents(): Promise<any>;
    static overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModuleMetadataType>): typeof TestBed;
    static overrideComponent(component: Type<any>, override: MetadataOverride<ComponentMetadataType>): typeof TestBed;
    static overrideDirective(directive: Type<any>, override: MetadataOverride<DirectiveMetadataType>): typeof TestBed;
    static overridePipe(pipe: Type<any>, override: MetadataOverride<PipeMetadataType>): typeof TestBed;
    static get(token: any, notFoundValue?: any): any;
    static createComponent<T>(component: Type<T>): ComponentFixture<T>;
    private _instantiated;
    private _compiler;
    private _moduleRef;
    private _moduleWithComponentFactories;
    private _compilerOptions;
    private _moduleOverrides;
    private _componentOverrides;
    private _directiveOverrides;
    private _pipeOverrides;
    private _providers;
    private _declarations;
    private _imports;
    private _schemas;
    private _activeFixtures;
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * 'angular2/platform/testing/<platform_name>'.
     *
     * @experimental
     */
    initTestEnvironment(ngModule: Type<any>, platform: PlatformRef): void;
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    resetTestEnvironment(): void;
    resetTestingModule(): void;
    platform: PlatformRef;
    ngModule: Type<any>;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureTestingModule(moduleDef: TestModuleMetadata): void;
    compileComponents(): Promise<any>;
    private _initIfNeeded();
    private _createCompilerAndModule();
    private _assertNotInstantiated(methodName, methodDescription);
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function): any;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModuleMetadataType>): void;
    overrideComponent(component: Type<any>, override: MetadataOverride<ComponentMetadataType>): void;
    overrideDirective(directive: Type<any>, override: MetadataOverride<DirectiveMetadataType>): void;
    overridePipe(pipe: Type<any>, override: MetadataOverride<PipeMetadataType>): void;
    createComponent<T>(component: Type<T>): ComponentFixture<T>;
}
/**
 * @experimental
 */
export declare function getTestBed(): TestBed;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @stable
 */
export declare function inject(tokens: any[], fn: Function): () => any;
/**
 * @experimental
 */
export declare class InjectSetupWrapper {
    private _moduleDef;
    constructor(_moduleDef: () => TestModuleMetadata);
    private _addModule();
    inject(tokens: any[], fn: Function): () => any;
}
/**
 * @experimental
 */
export declare function withModule(moduleDef: TestModuleMetadata): InjectSetupWrapper;
export declare function withModule(moduleDef: TestModuleMetadata, fn: Function): () => any;
