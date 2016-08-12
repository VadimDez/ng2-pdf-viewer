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
import { createPlatformFactory, Injectable, COMPILER_OPTIONS, CompilerFactory, NgModuleMetadata, ComponentMetadata, DirectiveMetadata, PipeMetadata } from '@angular/core';
import { TestingCompilerFactory } from './core_private_testing';
import { platformCoreDynamic, DirectiveResolver, NgModuleResolver, PipeResolver } from './index';
import { MockDirectiveResolver } from './testing/directive_resolver_mock';
import { MockNgModuleResolver } from './testing/ng_module_resolver_mock';
import { MockPipeResolver } from './testing/pipe_resolver_mock';
import { MetadataOverrider } from './testing/metadata_overrider';
export class TestingCompilerFactoryImpl {
    constructor(_compilerFactory) {
        this._compilerFactory = _compilerFactory;
    }
    createTestingCompiler(options) {
        const compiler = this._compilerFactory.createCompiler(options);
        return new TestingCompilerImpl(compiler, compiler.injector.get(MockDirectiveResolver), compiler.injector.get(MockPipeResolver), compiler.injector.get(MockNgModuleResolver));
    }
}
/** @nocollapse */
TestingCompilerFactoryImpl.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TestingCompilerFactoryImpl.ctorParameters = [
    { type: CompilerFactory, },
];
export class TestingCompilerImpl {
    constructor(_compiler, _directiveResolver, _pipeResolver, _moduleResolver) {
        this._compiler = _compiler;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._moduleResolver = _moduleResolver;
        this._overrider = new MetadataOverrider();
    }
    get injector() { return this._compiler.injector; }
    compileComponentAsync(component, ngModule = null) {
        return this._compiler.compileComponentAsync(component, ngModule);
    }
    compileComponentSync(component, ngModule = null) {
        return this._compiler.compileComponentSync(component, ngModule);
    }
    compileModuleSync(moduleType) {
        return this._compiler.compileModuleSync(moduleType);
    }
    compileModuleAsync(moduleType) {
        return this._compiler.compileModuleAsync(moduleType);
    }
    compileModuleAndAllComponentsSync(moduleType) {
        return this._compiler.compileModuleAndAllComponentsSync(moduleType);
    }
    compileModuleAndAllComponentsAsync(moduleType) {
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType);
    }
    overrideModule(ngModule, override) {
        const oldMetadata = this._moduleResolver.resolve(ngModule, false);
        this._moduleResolver.setNgModule(ngModule, this._overrider.overrideMetadata(NgModuleMetadata, oldMetadata, override));
    }
    overrideDirective(directive, override) {
        const oldMetadata = this._directiveResolver.resolve(directive, false);
        this._directiveResolver.setDirective(directive, this._overrider.overrideMetadata(DirectiveMetadata, oldMetadata, override));
    }
    overrideComponent(component, override) {
        const oldMetadata = this._directiveResolver.resolve(component, false);
        this._directiveResolver.setDirective(component, this._overrider.overrideMetadata(ComponentMetadata, oldMetadata, override));
    }
    overridePipe(pipe, override) {
        const oldMetadata = this._pipeResolver.resolve(pipe, false);
        this._pipeResolver.setPipe(pipe, this._overrider.overrideMetadata(PipeMetadata, oldMetadata, override));
    }
    clearCache() { this._compiler.clearCache(); }
    clearCacheFor(type) { this._compiler.clearCacheFor(type); }
}
/**
 * Platform for dynamic tests
 *
 * @experimental
 */
export const platformCoreDynamicTesting = createPlatformFactory(platformCoreDynamic, 'coreDynamicTesting', [
    {
        provide: COMPILER_OPTIONS,
        useValue: {
            providers: [
                MockPipeResolver, { provide: PipeResolver, useExisting: MockPipeResolver },
                MockDirectiveResolver, { provide: DirectiveResolver, useExisting: MockDirectiveResolver },
                MockNgModuleResolver, { provide: NgModuleResolver, useExisting: MockNgModuleResolver }
            ]
        },
        multi: true
    },
    { provide: TestingCompilerFactory, useClass: TestingCompilerFactoryImpl }
]);
//# sourceMappingURL=testing.js.map