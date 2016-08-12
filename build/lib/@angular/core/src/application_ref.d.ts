import { ExceptionHandler } from '../src/facade/exceptions';
import { ConcreteType, Type } from '../src/facade/lang';
import { ApplicationInitStatus } from './application_init';
import { ChangeDetectorRef } from './change_detection/change_detector_ref';
import { Console } from './console';
import { Injector } from './di';
import { CompilerOptions } from './linker/compiler';
import { ComponentFactory, ComponentRef } from './linker/component_factory';
import { ComponentFactoryResolver } from './linker/component_factory_resolver';
import { NgModuleFactory, NgModuleRef } from './linker/ng_module_factory';
import { Testability, TestabilityRegistry } from './testability/testability';
import { NgZone } from './zone/ng_zone';
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare function enableProdMode(): void;
/**
 * Locks the run mode of Angular. After this has been called,
 * it can't be changed any more. I.e. `isDevMode()` will always
 * return the same value.
 *
 * @deprecated This is a noop now. {@link isDevMode} automatically locks the run mode on first call.
 */
export declare function lockRunMode(): void;
/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare function isDevMode(): boolean;
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare function createPlatform(injector: Injector): PlatformRef;
/**
 * Factory for a platform.
 *
 * @experimental
 */
export declare type PlatformFactory = (extraProviders?: any[]) => PlatformRef;
/**
 * Creates a factory for a platform
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare function createPlatformFactory(parentPlaformFactory: PlatformFactory, name: string, providers?: any[]): PlatformFactory;
/**
 * Checks that there currently is a platform
 * which contains the given token as a provider.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare function assertPlatform(requiredToken: any): PlatformRef;
/**
 * Dispose the existing platform.
 *
 * @deprecated Use `destroyPlatform` instead
 */
export declare function disposePlatform(): void;
/**
 * Destroy the existing platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare function destroyPlatform(): void;
/**
 * Returns the current platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare function getPlatform(): PlatformRef;
/**
 * Shortcut for ApplicationRef.bootstrap.
 * Requires a platform to be created first.
 *
 * @deprecated Use {@link bootstrapModuleFactory} instead.
 */
export declare function coreBootstrap<C>(componentFactory: ComponentFactory<C>, injector: Injector): ComponentRef<C>;
/**
 * Resolves the componentFactory for the given component,
 * waits for asynchronous initializers and bootstraps the component.
 * Requires a platform to be created first.
 *
 * @deprecated Use {@link bootstrapModule} instead.
 */
export declare function coreLoadAndBootstrap(componentType: Type, injector: Injector): Promise<ComponentRef<any>>;
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link createPlatform}().
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare abstract class PlatformRef {
    /**
     * Creates an instance of an `@NgModule` for the given platform
     * for offline compilation.
     *
     * ## Simple Example
     *
     * ```typescript
     * my_module.ts:
     *
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * main.ts:
     * import {MyModuleNgFactory} from './my_module.ngfactory';
     * import {browserPlatform} from '@angular/platform-browser';
     *
     * let moduleRef = browserPlatform().bootstrapModuleFactory(MyModuleNgFactory);
     * ```
     *
     * @experimental APIs related to application bootstrap are currently under review.
     */
    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>): Promise<NgModuleRef<M>>;
    /**
     * Creates an instance of an `@NgModule` for a given platform using the given runtime compiler.
     *
     * ## Simple Example
     *
     * ```typescript
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * let moduleRef = browserPlatform().bootstrapModule(MyModule);
     * ```
     * @stable
     */
    bootstrapModule<M>(moduleType: ConcreteType<M>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<M>>;
    /**
     * Register a listener to be called when the platform is disposed.
     * @deprecated Use `OnDestroy` instead
     */
    abstract registerDisposeListener(dispose: () => void): void;
    /**
     * Register a listener to be called when the platform is disposed.
     */
    abstract onDestroy(callback: () => void): void;
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    injector: Injector;
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     * @deprecated Use `destroy` instead
     */
    abstract dispose(): void;
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     */
    abstract destroy(): void;
    /**
     * @deprecated Use `destroyed` instead
     */
    disposed: boolean;
    destroyed: boolean;
}
export declare class PlatformRef_ extends PlatformRef {
    private _injector;
    private _modules;
    private _destroyListeners;
    private _destroyed;
    constructor(_injector: Injector);
    /**
     * @deprecated
     */
    registerDisposeListener(dispose: () => void): void;
    onDestroy(callback: () => void): void;
    injector: Injector;
    /**
     * @deprecated
     */
    disposed: boolean;
    destroyed: boolean;
    destroy(): void;
    /**
     * @deprecated
     */
    dispose(): void;
    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>): Promise<NgModuleRef<M>>;
    private _bootstrapModuleFactoryWithZone<M>(moduleFactory, ngZone);
    bootstrapModule<M>(moduleType: ConcreteType<M>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<M>>;
    private _bootstrapModuleWithZone<M>(moduleType, compilerOptions, ngZone);
    private _moduleDoBootstrap(moduleRef);
}
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export declare abstract class ApplicationRef {
    /**
     * Register a listener to be called each time `bootstrap()` is called to bootstrap
     * a new root component.
     *
     * @deprecated Provide a callback via a multi provider for {@link APP_BOOTSTRAP_LISTENER}
     * instead.
     */
    abstract registerBootstrapListener(listener: (ref: ComponentRef<any>) => void): void;
    /**
     * Register a listener to be called when the application is disposed.
     *
     * @deprecated Use `ngOnDestroy` lifecycle hook or {@link NgModuleRef}.onDestroy.
     */
    abstract registerDisposeListener(dispose: () => void): void;
    /**
     * Returns a promise that resolves when all asynchronous application initializers
     * are done.
     *
     * @deprecated Use the {@link ApplicationInitStatus} class instead.
     */
    abstract waitForAsyncInitializers(): Promise<any>;
    /**
     * Runs the given callback in the zone and returns the result of the callback.
     * Exceptions will be forwarded to the ExceptionHandler and rethrown.
     *
     * @deprecated Use {@link NgZone}.run instead.
     */
    abstract run(callback: Function): any;
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * ### Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the [componentType]'s
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * ### Example
     * {@example core/ts/platform/platform.ts region='longform'}
     */
    abstract bootstrap<C>(componentFactory: ComponentFactory<C> | ConcreteType<C>): ComponentRef<C>;
    /**
     * Retrieve the application {@link Injector}.
     *
     * @deprecated inject an {@link Injector} directly where needed or use {@link
     * NgModuleRef}.injector.
     */
    injector: Injector;
    /**
     * Retrieve the application {@link NgZone}.
     *
     * @deprecated inject {@link NgZone} instead of calling this getter.
     */
    zone: NgZone;
    /**
     * Dispose of this application and all of its components.
     *
     * @deprecated Destroy the module that was created during bootstrap instead by calling
     * {@link NgModuleRef}.destroy.
     */
    abstract dispose(): void;
    /**
     * Invoke this method to explicitly process change detection and its side-effects.
     *
     * In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further changes are detected. If additional changes are picked up during this second cycle,
     * bindings in the app have side-effects that cannot be resolved in a single change detection
     * pass.
     * In this case, Angular throws an error, since an Angular application can only have one change
     * detection pass during which all change detection must complete.
     */
    abstract tick(): void;
    /**
     * Get a list of component types registered to this application.
     * This list is populated even before the component is created.
     */
    componentTypes: Type[];
    /**
     * Get a list of components registered to this application.
     */
    components: ComponentRef<any>[];
}
export declare class ApplicationRef_ extends ApplicationRef {
    private _zone;
    private _console;
    private _injector;
    private _exceptionHandler;
    private _componentFactoryResolver;
    private _initStatus;
    private _testabilityRegistry;
    private _testability;
    private _bootstrapListeners;
    /**
     * @deprecated
     */
    private _disposeListeners;
    private _rootComponents;
    private _rootComponentTypes;
    private _changeDetectorRefs;
    private _runningTick;
    private _enforceNoNewChanges;
    constructor(_zone: NgZone, _console: Console, _injector: Injector, _exceptionHandler: ExceptionHandler, _componentFactoryResolver: ComponentFactoryResolver, _initStatus: ApplicationInitStatus, _testabilityRegistry: TestabilityRegistry, _testability: Testability);
    /**
     * @deprecated
     */
    registerBootstrapListener(listener: (ref: ComponentRef<any>) => void): void;
    /**
     * @deprecated
     */
    registerDisposeListener(dispose: () => void): void;
    registerChangeDetector(changeDetector: ChangeDetectorRef): void;
    unregisterChangeDetector(changeDetector: ChangeDetectorRef): void;
    /**
     * @deprecated
     */
    waitForAsyncInitializers(): Promise<any>;
    /**
     * @deprecated
     */
    run(callback: Function): any;
    bootstrap<C>(componentOrFactory: ComponentFactory<C> | ConcreteType<C>): ComponentRef<C>;
    /**
     * @deprecated
     */
    injector: Injector;
    /**
     * @deprecated
     */
    zone: NgZone;
    tick(): void;
    ngOnDestroy(): void;
    /**
     * @deprecated
     */
    dispose(): void;
    componentTypes: Type[];
    components: ComponentRef<any>[];
}
