/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '../facade/lang';
import { ComponentFactory } from './component_factory';
import { ComponentResolver } from './component_resolver';
/**
 * Component resolver that can load components lazily
 * @experimental
 */
export declare class SystemJsComponentResolver implements ComponentResolver {
    private _resolver;
    constructor(_resolver: ComponentResolver);
    resolveComponent(componentType: string | Type): Promise<ComponentFactory<any>>;
    clearCache(): void;
}
/**
 * Component resolver that can load component factories lazily
 * @experimental
 */
export declare class SystemJsCmpFactoryResolver implements ComponentResolver {
    resolveComponent(componentType: string | Type): Promise<ComponentFactory<any>>;
    clearCache(): void;
}
