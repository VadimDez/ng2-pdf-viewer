/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler, CompilerOptions, ComponentMetadataType, DirectiveMetadataType, Injector, NgModuleMetadataType, PipeMetadataType } from '../index';
import { ConcreteType } from '../src/facade/lang';
import { MetadataOverride } from './metadata_override';
/**
 * Special interface to the compiler only used by testing
 *
 * @experimental
 */
export declare class TestingCompiler extends Compiler {
    readonly injector: Injector;
    overrideModule(module: ConcreteType<any>, overrides: MetadataOverride<NgModuleMetadataType>): void;
    overrideDirective(directive: ConcreteType<any>, overrides: MetadataOverride<DirectiveMetadataType>): void;
    overrideComponent(component: ConcreteType<any>, overrides: MetadataOverride<ComponentMetadataType>): void;
    overridePipe(directive: ConcreteType<any>, overrides: MetadataOverride<PipeMetadataType>): void;
}
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
export declare abstract class TestingCompilerFactory {
    abstract createTestingCompiler(options?: CompilerOptions[]): TestingCompiler;
}
