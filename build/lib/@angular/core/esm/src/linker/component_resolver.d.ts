/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '../facade/lang';
import { ComponentFactory } from './component_factory';
/**
 * Low-level service for loading {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * @deprecated Use {@link ComponentFactoryResolver} together with {@link
 * NgModule}.entryComponents}/{@link Component}.entryComponents or
 * {@link ANALYZE_FOR_ENTRY_COMPONENTS} provider for dynamic component creation.
 * Use {@link NgModuleFactoryLoader} for lazy loading.
 */
export declare abstract class ComponentResolver {
    static DynamicCompilationDeprecationMsg: string;
    static LazyLoadingDeprecationMsg: string;
    abstract resolveComponent(component: Type | string): Promise<ComponentFactory<any>>;
    abstract clearCache(): void;
}
