/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('../src/facade/collection');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var application_init_1 = require('./application_init');
var application_tokens_1 = require('./application_tokens');
var console_1 = require('./console');
var di_1 = require('./di');
var compiler_1 = require('./linker/compiler');
var component_factory_1 = require('./linker/component_factory');
var component_factory_resolver_1 = require('./linker/component_factory_resolver');
var profile_1 = require('./profile/profile');
var testability_1 = require('./testability/testability');
var ng_zone_1 = require('./zone/ng_zone');
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
function enableProdMode() {
    if (_runModeLocked) {
        // Cannot use BaseException as that ends up importing from facade/lang.
        throw new exceptions_1.BaseException('Cannot enable prod mode after platform setup.');
    }
    _devMode = false;
}
exports.enableProdMode = enableProdMode;
/**
 * Locks the run mode of Angular. After this has been called,
 * it can't be changed any more. I.e. `isDevMode()` will always
 * return the same value.
 *
 * @deprecated This is a noop now. {@link isDevMode} automatically locks the run mode on first call.
 */
function lockRunMode() {
    console.warn('lockRunMode() is deprecated and not needed any more.');
}
exports.lockRunMode = lockRunMode;
/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function isDevMode() {
    _runModeLocked = true;
    return _devMode;
}
exports.isDevMode = isDevMode;
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function createPlatform(injector) {
    if (lang_1.isPresent(_platform) && !_platform.disposed) {
        throw new exceptions_1.BaseException('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    var inits = injector.get(application_tokens_1.PLATFORM_INITIALIZER, null);
    if (lang_1.isPresent(inits))
        inits.forEach(function (init) { return init(); });
    return _platform;
}
exports.createPlatform = createPlatform;
/**
 * Creates a factory for a platform
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function createPlatformFactory(parentPlaformFactory, name, providers) {
    if (providers === void 0) { providers = []; }
    var marker = new di_1.OpaqueToken("Platform: " + name);
    return function (extraProviders) {
        if (extraProviders === void 0) { extraProviders = []; }
        if (!getPlatform()) {
            if (parentPlaformFactory) {
                parentPlaformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
            }
            else {
                createPlatform(di_1.ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({ provide: marker, useValue: true })));
            }
        }
        return assertPlatform(marker);
    };
}
exports.createPlatformFactory = createPlatformFactory;
/**
 * Checks that there currently is a platform
 * which contains the given token as a provider.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function assertPlatform(requiredToken) {
    var platform = getPlatform();
    if (lang_1.isBlank(platform)) {
        throw new exceptions_1.BaseException('No platform exists!');
    }
    if (lang_1.isPresent(platform) && lang_1.isBlank(platform.injector.get(requiredToken, null))) {
        throw new exceptions_1.BaseException('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
exports.assertPlatform = assertPlatform;
/**
 * Dispose the existing platform.
 *
 * @deprecated Use `destroyPlatform` instead
 */
function disposePlatform() {
    destroyPlatform();
}
exports.disposePlatform = disposePlatform;
/**
 * Destroy the existing platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function destroyPlatform() {
    if (lang_1.isPresent(_platform) && !_platform.destroyed) {
        _platform.destroy();
    }
}
exports.destroyPlatform = destroyPlatform;
/**
 * Returns the current platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function getPlatform() {
    return lang_1.isPresent(_platform) && !_platform.disposed ? _platform : null;
}
exports.getPlatform = getPlatform;
/**
 * Shortcut for ApplicationRef.bootstrap.
 * Requires a platform to be created first.
 *
 * @deprecated Use {@link bootstrapModuleFactory} instead.
 */
function coreBootstrap(componentFactory, injector) {
    throw new exceptions_1.BaseException('coreBootstrap is deprecated. Use bootstrapModuleFactory instead.');
}
exports.coreBootstrap = coreBootstrap;
/**
 * Resolves the componentFactory for the given component,
 * waits for asynchronous initializers and bootstraps the component.
 * Requires a platform to be created first.
 *
 * @deprecated Use {@link bootstrapModule} instead.
 */
function coreLoadAndBootstrap(componentType, injector) {
    throw new exceptions_1.BaseException('coreLoadAndBootstrap is deprecated. Use bootstrapModule instead.');
}
exports.coreLoadAndBootstrap = coreLoadAndBootstrap;
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
var PlatformRef = (function () {
    function PlatformRef() {
    }
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
    PlatformRef.prototype.bootstrapModuleFactory = function (moduleFactory) {
        throw exceptions_1.unimplemented();
    };
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
    PlatformRef.prototype.bootstrapModule = function (moduleType, compilerOptions) {
        if (compilerOptions === void 0) { compilerOptions = []; }
        throw exceptions_1.unimplemented();
    };
    Object.defineProperty(PlatformRef.prototype, "injector", {
        /**
         * Retrieve the platform {@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton providers.
         */
        get: function () { throw exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PlatformRef.prototype, "disposed", {
        /**
         * @deprecated Use `destroyed` instead
         */
        get: function () { throw exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformRef.prototype, "destroyed", {
        get: function () { throw exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return PlatformRef;
}());
exports.PlatformRef = PlatformRef;
function _callAndReportToExceptionHandler(exceptionHandler, callback) {
    try {
        var result = callback();
        if (lang_1.isPromise(result)) {
            return result.catch(function (e) {
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
var PlatformRef_ = (function (_super) {
    __extends(PlatformRef_, _super);
    function PlatformRef_(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    /**
     * @deprecated
     */
    PlatformRef_.prototype.registerDisposeListener = function (dispose) { this.onDestroy(dispose); };
    PlatformRef_.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    Object.defineProperty(PlatformRef_.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformRef_.prototype, "disposed", {
        /**
         * @deprecated
         */
        get: function () { return this.destroyed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformRef_.prototype, "destroyed", {
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    PlatformRef_.prototype.destroy = function () {
        if (this._destroyed) {
            throw new exceptions_1.BaseException('The platform has already been destroyed!');
        }
        collection_1.ListWrapper.clone(this._modules).forEach(function (app) { return app.destroy(); });
        this._destroyListeners.forEach(function (dispose) { return dispose(); });
        this._destroyed = true;
    };
    /**
     * @deprecated
     */
    PlatformRef_.prototype.dispose = function () { this.destroy(); };
    PlatformRef_.prototype.bootstrapModuleFactory = function (moduleFactory) {
        return this._bootstrapModuleFactoryWithZone(moduleFactory, null);
    };
    PlatformRef_.prototype._bootstrapModuleFactoryWithZone = function (moduleFactory, ngZone) {
        var _this = this;
        // Note: We need to create the NgZone _before_ we instantiate the module,
        // as instantiating the module creates some providers eagerly.
        // So we create a mini parent injector that just contains the new NgZone and
        // pass that as parent to the NgModuleFactory.
        if (!ngZone)
            ngZone = new ng_zone_1.NgZone({ enableLongStackTrace: isDevMode() });
        // Attention: Don't use ApplicationRef.run here,
        // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
        return ngZone.run(function () {
            var ngZoneInjector = di_1.ReflectiveInjector.resolveAndCreate([{ provide: ng_zone_1.NgZone, useValue: ngZone }], _this.injector);
            var moduleRef = moduleFactory.create(ngZoneInjector);
            var exceptionHandler = moduleRef.injector.get(exceptions_1.ExceptionHandler, null);
            if (!exceptionHandler) {
                throw new Error('No ExceptionHandler. Is platform module (BrowserModule) included?');
            }
            moduleRef.onDestroy(function () { return collection_1.ListWrapper.remove(_this._modules, moduleRef); });
            ngZone.onError.subscribe({
                next: function (error) { exceptionHandler.call(error.error, error.stackTrace); }
            });
            return _callAndReportToExceptionHandler(exceptionHandler, function () {
                var initStatus = moduleRef.injector.get(application_init_1.ApplicationInitStatus);
                return initStatus.donePromise.then(function () {
                    _this._moduleDoBootstrap(moduleRef);
                    return moduleRef;
                });
            });
        });
    };
    PlatformRef_.prototype.bootstrapModule = function (moduleType, compilerOptions) {
        if (compilerOptions === void 0) { compilerOptions = []; }
        return this._bootstrapModuleWithZone(moduleType, compilerOptions, null);
    };
    PlatformRef_.prototype._bootstrapModuleWithZone = function (moduleType, compilerOptions, ngZone) {
        var _this = this;
        if (compilerOptions === void 0) { compilerOptions = []; }
        var compilerFactory = this.injector.get(compiler_1.CompilerFactory);
        var compiler = compilerFactory.createCompiler(compilerOptions instanceof Array ? compilerOptions : [compilerOptions]);
        return compiler.compileModuleAsync(moduleType)
            .then(function (moduleFactory) { return _this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone); });
    };
    PlatformRef_.prototype._moduleDoBootstrap = function (moduleRef) {
        var appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef.bootstrapFactories.length > 0) {
            moduleRef.bootstrapFactories.forEach(function (compFactory) { return appRef.bootstrap(compFactory); });
        }
        else if (moduleRef.instance.ngDoBootstrap) {
            moduleRef.instance.ngDoBootstrap(appRef);
        }
        else {
            throw new exceptions_1.BaseException(("The module " + lang_1.stringify(moduleRef.instance.constructor) + " was bootstrapped, but it does not declare \"@NgModule.bootstrap\" components nor a \"ngDoBootstrap\" method. ") +
                "Please define one of these.");
        }
    };
    /** @nocollapse */
    PlatformRef_.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    PlatformRef_.ctorParameters = [
        { type: di_1.Injector, },
    ];
    return PlatformRef_;
}(PlatformRef));
exports.PlatformRef_ = PlatformRef_;
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
var ApplicationRef = (function () {
    function ApplicationRef() {
    }
    Object.defineProperty(ApplicationRef.prototype, "injector", {
        /**
         * Retrieve the application {@link Injector}.
         *
         * @deprecated inject an {@link Injector} directly where needed or use {@link
         * NgModuleRef}.injector.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "zone", {
        /**
         * Retrieve the application {@link NgZone}.
         *
         * @deprecated inject {@link NgZone} instead of calling this getter.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
        /**
         * Get a list of component types registered to this application.
         * This list is populated even before the component is created.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "components", {
        /**
         * Get a list of components registered to this application.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    return ApplicationRef;
}());
exports.ApplicationRef = ApplicationRef;
var ApplicationRef_ = (function (_super) {
    __extends(ApplicationRef_, _super);
    function ApplicationRef_(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus, _testabilityRegistry, _testability) {
        var _this = this;
        _super.call(this);
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
        this._zone.onMicrotaskEmpty.subscribe({ next: function () { _this._zone.run(function () { _this.tick(); }); } });
    }
    /**
     * @deprecated
     */
    ApplicationRef_.prototype.registerBootstrapListener = function (listener) {
        this._bootstrapListeners.push(listener);
    };
    /**
     * @deprecated
     */
    ApplicationRef_.prototype.registerDisposeListener = function (dispose) { this._disposeListeners.push(dispose); };
    ApplicationRef_.prototype.registerChangeDetector = function (changeDetector) {
        this._changeDetectorRefs.push(changeDetector);
    };
    ApplicationRef_.prototype.unregisterChangeDetector = function (changeDetector) {
        collection_1.ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    };
    /**
     * @deprecated
     */
    ApplicationRef_.prototype.waitForAsyncInitializers = function () { return this._initStatus.donePromise; };
    /**
     * @deprecated
     */
    ApplicationRef_.prototype.run = function (callback) {
        var _this = this;
        return this._zone.run(function () { return _callAndReportToExceptionHandler(_this._exceptionHandler, callback); });
    };
    ApplicationRef_.prototype.bootstrap = function (componentOrFactory) {
        var _this = this;
        if (!this._initStatus.done) {
            throw new exceptions_1.BaseException('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
        }
        var componentFactory;
        if (componentOrFactory instanceof component_factory_1.ComponentFactory) {
            componentFactory = componentOrFactory;
        }
        else {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this._rootComponentTypes.push(componentFactory.componentType);
        var compRef = componentFactory.create(this._injector, [], componentFactory.selector);
        compRef.onDestroy(function () { _this._unloadComponent(compRef); });
        var testability = compRef.injector.get(testability_1.Testability, null);
        if (lang_1.isPresent(testability)) {
            compRef.injector.get(testability_1.TestabilityRegistry)
                .registerApplication(compRef.location.nativeElement, testability);
        }
        this._loadComponent(compRef);
        if (isDevMode()) {
            this._console.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
        }
        return compRef;
    };
    /** @internal */
    ApplicationRef_.prototype._loadComponent = function (componentRef) {
        this._changeDetectorRefs.push(componentRef.changeDetectorRef);
        this.tick();
        this._rootComponents.push(componentRef);
        // Get the listeners lazily to prevent DI cycles.
        var listeners = this._injector.get(application_tokens_1.APP_BOOTSTRAP_LISTENER, [])
            .concat(this._bootstrapListeners);
        listeners.forEach(function (listener) { return listener(componentRef); });
    };
    /** @internal */
    ApplicationRef_.prototype._unloadComponent = function (componentRef) {
        if (!collection_1.ListWrapper.contains(this._rootComponents, componentRef)) {
            return;
        }
        this.unregisterChangeDetector(componentRef.changeDetectorRef);
        collection_1.ListWrapper.remove(this._rootComponents, componentRef);
    };
    Object.defineProperty(ApplicationRef_.prototype, "injector", {
        /**
         * @deprecated
         */
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "zone", {
        /**
         * @deprecated
         */
        get: function () { return this._zone; },
        enumerable: true,
        configurable: true
    });
    ApplicationRef_.prototype.tick = function () {
        if (this._runningTick) {
            throw new exceptions_1.BaseException('ApplicationRef.tick is called recursively');
        }
        var s = ApplicationRef_._tickScope();
        try {
            this._runningTick = true;
            this._changeDetectorRefs.forEach(function (detector) { return detector.detectChanges(); });
            if (this._enforceNoNewChanges) {
                this._changeDetectorRefs.forEach(function (detector) { return detector.checkNoChanges(); });
            }
        }
        finally {
            this._runningTick = false;
            profile_1.wtfLeave(s);
        }
    };
    ApplicationRef_.prototype.ngOnDestroy = function () {
        // TODO(alxhub): Dispose of the NgZone.
        collection_1.ListWrapper.clone(this._rootComponents).forEach(function (ref) { return ref.destroy(); });
        this._disposeListeners.forEach(function (dispose) { return dispose(); });
    };
    /**
     * @deprecated
     */
    ApplicationRef_.prototype.dispose = function () { this.ngOnDestroy(); };
    Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
        get: function () { return this._rootComponentTypes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "components", {
        get: function () { return this._rootComponents; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    ApplicationRef_._tickScope = profile_1.wtfCreateScope('ApplicationRef#tick()');
    /** @nocollapse */
    ApplicationRef_.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    ApplicationRef_.ctorParameters = [
        { type: ng_zone_1.NgZone, },
        { type: console_1.Console, },
        { type: di_1.Injector, },
        { type: exceptions_1.ExceptionHandler, },
        { type: component_factory_resolver_1.ComponentFactoryResolver, },
        { type: application_init_1.ApplicationInitStatus, },
        { type: testability_1.TestabilityRegistry, decorators: [{ type: di_1.Optional },] },
        { type: testability_1.Testability, decorators: [{ type: di_1.Optional },] },
    ];
    return ApplicationRef_;
}(ApplicationRef));
exports.ApplicationRef_ = ApplicationRef_;
//# sourceMappingURL=application_ref.js.map