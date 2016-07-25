import { ConcreteType, Type } from '../facade/lang';
import { ComponentFactory } from './component_factory';
/**
 * Low-level service for running the angular compiler duirng runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 * @stable
 */
export declare class Compiler {
    /**
     * Loads the template and styles of a component and returns the associated `ComponentFactory`.
     */
    compileComponentAsync<T>(component: ConcreteType<T>): Promise<ComponentFactory<T>>;
    /**
     * Compiles the given component. All templates have to be either inline or compiled via
     * `compileComponentAsync` before.
     */
    compileComponentSync<T>(component: ConcreteType<T>): ComponentFactory<T>;
    /**
     * Clears all caches
     */
    clearCache(): void;
    /**
     * Clears the cache for the given component.
     */
    clearCacheFor(compType: Type): void;
}
