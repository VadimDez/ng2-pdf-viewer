/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListWrapper } from '../src/facade/collection';
import { BaseException, ExceptionHandler, unimplemented } from '../src/facade/exceptions';
import { isBlank, isPresent, isPromise, stringify } from '../src/facade/lang';
import { ApplicationInitStatus } from './application_init';
import { APP_BOOTSTRAP_LISTENER, PLATFORM_INITIALIZER } from './application_tokens';
import { Console } from './console';
import { Injectable, Injector, OpaqueToken, Optional, ReflectiveInjector } from './di';
import { CompilerFactory } from './linker/compiler';
import { ComponentFactory } from './linker/component_factory';
import { ComponentFactoryResolver } from './linker/component_factory_resolver';
import { wtfCreateScope, wtfLeave } from './profile/profile';
import { Testability, TestabilityRegistry } from './testability/testability';
import { NgZone } from './zone/ng_zone';
var _devMode = true;
var _runModeLocked = false;
var _platform;
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
export function enableProdMode() {
    if (_runModeLocked) {
        // Cannot use BaseException as that ends up importing from facade/lang.
        throw new BaseException('Cannot enable prod mode after platform setup.');
    }
    _devMode = false;
}
/**
 * Locks the run mode of Angular. After this has been called,
 * it can't be changed any more. I.e. `isDevMode()` will always
 * return the same value.
 *
 * @deprecated This is a noop now. {@link isDevMode} automatically locks the run mode on first call.
 */
export function lockRunMode() {
    console.warn('lockRunMode() is deprecated and not needed any more.');
}
/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export function isDevMode() {
    _runModeLocked = true;
    return _devMode;
}
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export function createPlatform(injector) {
    if (isPresent(_platform) && !_platform.disposed) {
        throw new BaseException('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    const inits = injector.get(PLATFORM_INITIALIZER, null);
    if (isPresent(inits))
        inits.forEach(init => init());
    return _platform;
}
/**
 * Creates a factory for a platform
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export function createPlatformFactory(parentPlaformFactory, name, providers = []) {
    const marker = new OpaqueToken(`Platform: ${name}`);
    return (extraProviders = []) => {
        if (!getPlatform()) {
            if (parentPlaformFactory) {
                parentPlaformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
            }
            else {
                createPlatform(ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({ provide: marker, useValue: true })));
            }
        }
        return assertPlatform(marker);
    };
}
/**
 * Checks that there currently is a platform
 * which contains the given token as a provider.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export function assertPlatform(requiredToken) {
    var platform = getPlatform();
    if (isBlank(platform)) {
        throw new BaseException('No platform exists!');
    }
    if (isPresent(platform) && isBlank(platform.injector.get(requiredToken, null))) {
        throw new BaseException('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
/**
 * Dispose the existing platform.
 *
 * @deprecated Use `destroyPlatform` instead
 */
export function disposePlatform() {
    destroyPlatform();
}
/**
 * Destroy the existing platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export function destroyPlatform() {
    if (isPresent(_platform) && !_platform.destroyed) {
        _platform.destroy();
    }
}
/**
 * Returns the current platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export function getPlatform() {
    return isPresent(_platform) && !_platform.disposed ? _platform : null;
}
/**
 * Shortcut for ApplicationRef.bootstrap.
 * Requires a platform to be created first.
 *
 * @deprecated Use {@link bootstrapModuleFactory} instead.
 */
export function coreBootstrap(componentFactory, injector) {
    throw new BaseException('coreBootstrap is deprecated. Use bootstrapModuleFactory instead.');
}
/**
 * Resolves the componentFactory for the given component,
 * waits for asynchronous initializers and bootstraps the component.
 * Requires a platform to be created first.
 *
 * @deprecated Use {@link bootstrapModule} instead.
 */
export function coreLoadAndBootstrap(componentType, injector) {
    throw new BaseException('coreLoadAndBootstrap is deprecated. Use bootstrapModule instead.');
}
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
export class PlatformRef {
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
    bootstrapModuleFactory(moduleFactory) {
        throw unimplemented();
    }
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
    bootstrapModule(moduleType, compilerOptions = []) {
        throw unimplemented();
    }
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    get injector() { throw unimplemented(); }
    ;
    /**
     * @deprecated Use `destroyed` instead
     */
    get disposed() { throw unimplemented(); }
    get destroyed() { throw unimplemented(); }
}
function _callAndReportToExceptionHandler(exceptionHandler, callback) {
    try {
        const result = callback();
        if (isPromise(result)) {
            return result.catch((e) => {
                exceptionHandler.call(e);
                // rethrow as the exception handler might not do it
                throw e;
            });
        }
        else {
            return result;
        }
    }
    catch (e) {
        exceptionHandler.call(e);
        // rethrow as the exception handler might not do it
        throw e;
    }
}
export class PlatformRef_ extends PlatformRef {
    constructor(_injector) {
        super();
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    /**
     * @deprecated
     */
    registerDisposeListener(dispose) { this.onDestroy(dispose); }
    onDestroy(callback) { this._destroyListeners.push(callback); }
    get injector() { return this._injector; }
    /**
     * @deprecated
     */
    get disposed() { return this.destroyed; }
    get destroyed() { return this._destroyed; }
    destroy() {
        if (this._destroyed) {
            throw new BaseException('The platform has already been destroyed!');
        }
        ListWrapper.clone(this._modules).forEach((app) => app.destroy());
        this._destroyListeners.forEach((dispose) => dispose());
        this._destroyed = true;
    }
    /**
     * @deprecated
     */
    dispose() { this.destroy(); }
    bootstrapModuleFactory(moduleFactory) {
        return this._bootstrapModuleFactoryWithZone(moduleFactory, null);
    }
    _bootstrapModuleFactoryWithZone(moduleFactory, ngZone) {
        // Note: We need to create the NgZone _before_ we instantiate the module,
        // as instantiating the module creates some providers eagerly.
        // So we create a mini parent injector that just contains the new NgZone and
        // pass that as parent to the NgModuleFactory.
        if (!ngZone)
            ngZone = new NgZone({ enableLongStackTrace: isDevMode() });
        // Attention: Don't use ApplicationRef.run here,
        // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
        return ngZone.run(() => {
            const ngZoneInjector = ReflectiveInjector.resolveAndCreate([{ provide: NgZone, useValue: ngZone }], this.injector);
            const moduleRef = moduleFactory.create(ngZoneInjector);
            const exceptionHandler = moduleRef.injector.get(ExceptionHandler, null);
            if (!exceptionHandler) {
                throw new Error('No ExceptionHandler. Is platform module (BrowserModule) included?');
            }
            moduleRef.onDestroy(() => ListWrapper.remove(this._modules, moduleRef));
            ngZone.onError.subscribe({
                next: (error) => { exceptionHandler.call(error.error, error.stackTrace); }
            });
            return _callAndReportToExceptionHandler(exceptionHandler, () => {
                const initStatus = moduleRef.injector.get(ApplicationInitStatus);
                return initStatus.donePromise.then(() => {
                    this._moduleDoBootstrap(moduleRef);
                    return moduleRef;
                });
            });
        });
    }
    bootstrapModule(moduleType, compilerOptions = []) {
        return this._bootstrapModuleWithZone(moduleType, compilerOptions, null);
    }
    _bootstrapModuleWithZone(moduleType, compilerOptions = [], ngZone) {
        const compilerFactory = this.injector.get(CompilerFactory);
        const compiler = compilerFactory.createCompiler(compilerOptions instanceof Array ? compilerOptions : [compilerOptions]);
        return compiler.compileModuleAsync(moduleType)
            .then((moduleFactory) => this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone));
    }
    _moduleDoBootstrap(moduleRef) {
        const appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef.bootstrapFactories.length > 0) {
            moduleRef.bootstrapFactories.forEach((compFactory) => appRef.bootstrap(compFactory));
        }
        else if (moduleRef.instance.ngDoBootstrap) {
            moduleRef.instance.ngDoBootstrap(appRef);
        }
        else {
            throw new BaseException(`The module ${stringify(moduleRef.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                `Please define one of these.`);
        }
    }
}
/** @nocollapse */
PlatformRef_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PlatformRef_.ctorParameters = [
    { type: Injector, },
];
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
export class ApplicationRef {
    /**
     * Retrieve the application {@link Injector}.
     *
     * @deprecated inject an {@link Injector} directly where needed or use {@link
     * NgModuleRef}.injector.
     */
    get injector() { return unimplemented(); }
    ;
    /**
     * Retrieve the application {@link NgZone}.
     *
     * @deprecated inject {@link NgZone} instead of calling this getter.
     */
    get zone() { return unimplemented(); }
    ;
    /**
     * Get a list of component types registered to this application.
     * This list is populated even before the component is created.
     */
    get componentTypes() { return unimplemented(); }
    ;
    /**
     * Get a list of components registered to this application.
     */
    get components() { return unimplemented(); }
    ;
}
export class ApplicationRef_ extends ApplicationRef {
    constructor(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus, _testabilityRegistry, _testability) {
        super();
        this._zone = _zone;
        this._console = _console;
        this._injector = _injector;
        this._exceptionHandler = _exceptionHandler;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._initStatus = _initStatus;
        this._testabilityRegistry = _testabilityRegistry;
        this._testability = _testability;
        this._bootstrapListeners = [];
        /**
         * @deprecated
         */
        this._disposeListeners = [];
        this._rootComponents = [];
        this._rootComponentTypes = [];
        this._changeDetectorRefs = [];
        this._runningTick = false;
        this._enforceNoNewChanges = false;
        this._enforceNoNewChanges = isDevMode();
        this._zone.onMicrotaskEmpty.subscribe({ next: () => { this._zone.run(() => { this.tick(); }); } });
    }
    /**
     * @deprecated
     */
    registerBootstrapListener(listener) {
        this._bootstrapListeners.push(listener);
    }
    /**
     * @deprecated
     */
    registerDisposeListener(dispose) { this._disposeListeners.push(dispose); }
    registerChangeDetector(changeDetector) {
        this._changeDetectorRefs.push(changeDetector);
    }
    unregisterChangeDetector(changeDetector) {
        ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    }
    /**
     * @deprecated
     */
    waitForAsyncInitializers() { return this._initStatus.donePromise; }
    /**
     * @deprecated
     */
    run(callback) {
        return this._zone.run(() => _callAndReportToExceptionHandler(this._exceptionHandler, callback));
    }
    bootstrap(componentOrFactory) {
        if (!this._initStatus.done) {
            throw new BaseException('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
        }
        let componentFactory;
        if (componentOrFactory instanceof ComponentFactory) {
            componentFactory = componentOrFactory;
        }
        else {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this._rootComponentTypes.push(componentFactory.componentType);
        var compRef = componentFactory.create(this._injector, [], componentFactory.selector);
        compRef.onDestroy(() => { this._unloadComponent(compRef); });
        var testability = compRef.injector.get(Testability, null);
        if (isPresent(testability)) {
            compRef.injector.get(TestabilityRegistry)
                .registerApplication(compRef.location.nativeElement, testability);
        }
        this._loadComponent(compRef);
        if (isDevMode()) {
            this._console.log(`Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.`);
        }
        return compRef;
    }
    /** @internal */
    _loadComponent(componentRef) {
        this._changeDetectorRefs.push(componentRef.changeDetectorRef);
        this.tick();
        this._rootComponents.push(componentRef);
        // Get the listeners lazily to prevent DI cycles.
        const listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, [])
            .concat(this._bootstrapListeners);
        listeners.forEach((listener) => listener(componentRef));
    }
    /** @internal */
    _unloadComponent(componentRef) {
        if (!ListWrapper.contains(this._rootComponents, componentRef)) {
            return;
        }
        this.unregisterChangeDetector(componentRef.changeDetectorRef);
        ListWrapper.remove(this._rootComponents, componentRef);
    }
    /**
     * @deprecated
     */
    get injector() { return this._injector; }
    /**
     * @deprecated
     */
    get zone() { return this._zone; }
    tick() {
        if (this._runningTick) {
            throw new BaseException('ApplicationRef.tick is called recursively');
        }
        var s = ApplicationRef_._tickScope();
        try {
            this._runningTick = true;
            this._changeDetectorRefs.forEach((detector) => detector.detectChanges());
            if (this._enforceNoNewChanges) {
                this._changeDetectorRefs.forEach((detector) => detector.checkNoChanges());
            }
        }
        finally {
            this._runningTick = false;
            wtfLeave(s);
        }
    }
    ngOnDestroy() {
        // TODO(alxhub): Dispose of the NgZone.
        ListWrapper.clone(this._rootComponents).forEach((ref) => ref.destroy());
        this._disposeListeners.forEach((dispose) => dispose());
    }
    /**
     * @deprecated
     */
    dispose() { this.ngOnDestroy(); }
    get componentTypes() { return this._rootComponentTypes; }
    get components() { return this._rootComponents; }
}
/** @internal */
ApplicationRef_._tickScope = wtfCreateScope('ApplicationRef#tick()');
/** @nocollapse */
ApplicationRef_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ApplicationRef_.ctorParameters = [
    { type: NgZone, },
    { type: Console, },
    { type: Injector, },
    { type: ExceptionHandler, },
    { type: ComponentFactoryResolver, },
    { type: ApplicationInitStatus, },
    { type: TestabilityRegistry, decorators: [{ type: Optional },] },
    { type: Testability, decorators: [{ type: Optional },] },
];
//# sourceMappingURL=application_ref.js.map