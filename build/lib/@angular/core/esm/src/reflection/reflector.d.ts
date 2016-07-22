import { Type } from '../facade/lang';
import { PlatformReflectionCapabilities } from './platform_reflection_capabilities';
import { ReflectorReader } from './reflector_reader';
import { GetterFn, MethodFn, SetterFn } from './types';
export { PlatformReflectionCapabilities } from './platform_reflection_capabilities';
export { GetterFn, MethodFn, SetterFn } from './types';
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
export declare class ReflectionInfo {
    annotations: any[];
    parameters: any[][];
    factory: Function;
    interfaces: any[];
    propMetadata: {
        [key: string]: any[];
    };
    constructor(annotations?: any[], parameters?: any[][], factory?: Function, interfaces?: any[], propMetadata?: {
        [key: string]: any[];
    });
}
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export declare class Reflector extends ReflectorReader {
    reflectionCapabilities: PlatformReflectionCapabilities;
    constructor(reflectionCapabilities: PlatformReflectionCapabilities);
    updateCapabilities(caps: PlatformReflectionCapabilities): void;
    isReflectionEnabled(): boolean;
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    trackUsage(): void;
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    listUnusedKeys(): any[];
    registerFunction(func: Function, funcInfo: ReflectionInfo): void;
    registerType(type: Type, typeInfo: ReflectionInfo): void;
    registerGetters(getters: {
        [key: string]: GetterFn;
    }): void;
    registerSetters(setters: {
        [key: string]: SetterFn;
    }): void;
    registerMethods(methods: {
        [key: string]: MethodFn;
    }): void;
    factory(type: Type): Function;
    parameters(typeOrFunc: any): any[][];
    annotations(typeOrFunc: any): any[];
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    interfaces(type: any): any[];
    hasLifecycleHook(type: any, lcInterface: Type, lcProperty: string): boolean;
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    importUri(type: any): string;
}
