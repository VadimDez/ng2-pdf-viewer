/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Console } from '../console';
import { Type } from '../facade/lang';
import { ComponentFactory } from './component_factory';
import { ComponentResolver } from './component_resolver';
/**
 * Component resolver that can load components lazily
 *
 * @deprecated Lazy loading of components is deprecated. Use {@link SystemJsNgModuleLoader} to lazy
 * load
 * {@link NgModuleFactory}s instead.
 */
export declare class SystemJsComponentResolver implements ComponentResolver {
    private _resolver;
    private _console;
    constructor(_resolver: ComponentResolver, _console: Console);
    resolveComponent(componentType: string | Type): Promise<ComponentFactory<any>>;
    clearCache(): void;
}
/**
 * Component resolver that can load component factories lazily
 *
 * @deprecated Lazy loading of components is deprecated. Use {@link SystemJsNgModuleLoader}
 * to lazy
 * load {@link NgModuleFactory}s instead.
 */
export declare class SystemJsCmpFactoryResolver implements ComponentResolver {
    private _console;
    constructor(_console: Console);
    resolveComponent(componentType: string | Type): Promise<ComponentFactory<any>>;
    clearCache(): void;
}
