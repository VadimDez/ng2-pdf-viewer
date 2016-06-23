import { Type } from '../src/facade/lang';
import { ChangeDetectorRef } from './change_detection/change_detector_ref';
import { Injector } from './di';
import { ComponentFactory, ComponentRef } from './linker/component_factory';
import { NgZone } from './zone/ng_zone';
/**
 * Create an Angular zone.
 * @experimental
 */
export declare function createNgZone(): NgZone;
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 * @experimental
 */
export declare function createPlatform(injector: Injector): PlatformRef;
/**
 * Checks that there currently is a platform
 * which contains the given token as a provider.
 * @experimental
 */
export declare function assertPlatform(requiredToken: any): PlatformRef;
/**
 * Dispose the existing platform.
 * @experimental
 */
export declare function disposePlatform(): void;
/**
 * Returns the current platform.
 * @experimental
 */
export declare function getPlatform(): PlatformRef;
/**
 * Shortcut for ApplicationRef.bootstrap.
 * Requires a platform to be created first.
 * @experimental
 */
export declare function coreBootstrap<C>(componentFactory: ComponentFactory<C>, injector: Injector): ComponentRef<C>;
/**
 * Resolves the componentFactory for the given component,
 * waits for asynchronous initializers and bootstraps the component.
 * Requires a platform to be created first.
 * @experimental
 */
export declare function coreLoadAndBootstrap(componentType: Type, injector: Injector): Promise<ComponentRef<any>>;
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link createPlatform}().
 * @stable
 */
export declare abstract class PlatformRef {
    /**
     * Register a listener to be called when the platform is disposed.
     */
    abstract registerDisposeListener(dispose: () => void): void;
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    injector: Injector;
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     */
    abstract dispose(): void;
    disposed: boolean;
}
export declare class PlatformRef_ extends PlatformRef {
    private _injector;
    private _disposed;
    constructor(_injector: Injector);
    registerDisposeListener(dispose: () => void): void;
    injector: Injector;
    disposed: boolean;
    addApplication(appRef: ApplicationRef): void;
    dispose(): void;
}
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 * @stable
 */
export declare abstract class ApplicationRef {
    /**
     * Register a listener to be called each time `bootstrap()` is called to bootstrap
     * a new root component.
     */
    abstract registerBootstrapListener(listener: (ref: ComponentRef<any>) => void): void;
    /**
     * Register a listener to be called when the application is disposed.
     */
    abstract registerDisposeListener(dispose: () => void): void;
    /**
     * Returns a promise that resolves when all asynchronous application initializers
     * are done.
     */
    abstract waitForAsyncInitializers(): Promise<any>;
    /**
     * Runs the given callback in the zone and returns the result of the callback.
     * Exceptions will be forwarded to the ExceptionHandler and rethrown.
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
    abstract bootstrap<C>(componentFactory: ComponentFactory<C>): ComponentRef<C>;
    /**
     * Retrieve the application {@link Injector}.
     */
    injector: Injector;
    /**
     * Retrieve the application {@link NgZone}.
     */
    zone: NgZone;
    /**
     * Dispose of this application and all of its components.
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
     */
    componentTypes: Type[];
}
export declare class ApplicationRef_ extends ApplicationRef {
    private _platform;
    private _zone;
    private _injector;
    private _exceptionHandler;
    private _asyncInitDonePromise;
    private _asyncInitDone;
    constructor(_platform: PlatformRef_, _zone: NgZone, _injector: Injector);
    registerBootstrapListener(listener: (ref: ComponentRef<any>) => void): void;
    registerDisposeListener(dispose: () => void): void;
    registerChangeDetector(changeDetector: ChangeDetectorRef): void;
    unregisterChangeDetector(changeDetector: ChangeDetectorRef): void;
    waitForAsyncInitializers(): Promise<any>;
    run(callback: Function): any;
    bootstrap<C>(componentFactory: ComponentFactory<C>): ComponentRef<C>;
    injector: Injector;
    zone: NgZone;
    tick(): void;
    dispose(): void;
    componentTypes: Type[];
}
export declare const PLATFORM_CORE_PROVIDERS: (typeof PlatformRef_ | {
    provide: typeof PlatformRef;
    useExisting: typeof PlatformRef_;
})[];
export declare const APPLICATION_CORE_PROVIDERS: ({
    provide: typeof NgZone;
    useFactory: () => NgZone;
    deps: any;
} | typeof ApplicationRef_ | {
    provide: typeof ApplicationRef;
    useExisting: typeof ApplicationRef_;
})[];
