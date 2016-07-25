import { BaseException } from '../facade/exceptions';
import { ConcreteType } from '../facade/lang';
import { ComponentFactory } from './component_factory';
/**
 * @stable
 */
export declare class NoComponentFactoryError extends BaseException {
    component: Function;
    constructor(component: Function);
}
/**
 * @stable
 */
export declare abstract class ComponentFactoryResolver {
    static NULL: ComponentFactoryResolver;
    abstract resolveComponentFactory<T>(component: ConcreteType<T>): ComponentFactory<T>;
}
export declare class CodegenComponentFactoryResolver implements ComponentFactoryResolver {
    private _parent;
    private _factories;
    constructor(factories: ComponentFactory<any>[], _parent: ComponentFactoryResolver);
    resolveComponentFactory<T>(component: {
        new (...args: any[]): T;
    }): ComponentFactory<T>;
}
