/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var core_private_1 = require('./core_private');
var platform_providers_1 = require('./src/platform_providers');
var xhr_cache_1 = require('./src/xhr/xhr_cache');
var xhr_impl_1 = require('./src/xhr/xhr_impl');
/**
 * @deprecated The compiler providers are already included in the {@link CompilerFactory} that is
 * contained the {@link browserDynamicPlatform}()`.
 */
exports.BROWSER_APP_COMPILER_PROVIDERS = [];
/**
 * @experimental
 */
exports.CACHED_TEMPLATE_PROVIDER = [{ provide: compiler_1.XHR, useClass: xhr_cache_1.CachedXHR }];
/**
 * @experimental API related to bootstrapping are still under review.
 */
exports.platformBrowserDynamic = core_1.createPlatformFactory(compiler_1.platformCoreDynamic, 'browserDynamic', platform_providers_1.INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformBrowserDynamic} instead
 */
exports.browserDynamicPlatform = exports.platformBrowserDynamic;
/**
 * Bootstrapping for Angular applications.
 *
 * You instantiate an Angular application by explicitly specifying a component to use
 * as the root component for your application via the `bootstrap()` method.
 *
 * ## Simple Example
 *
 * Assuming this `index.html`:
 *
 * ```html
 * <html>
 *   <!-- load Angular script tags here. -->
 *   <body>
 *     <my-app>loading...</my-app>
 *   </body>
 * </html>
 * ```
 *
 * An application is bootstrapped inside an existing browser DOM, typically `index.html`.
 * Unlike Angular 1, Angular 2 does not compile/process providers in `index.html`. This is
 * mainly for security reasons, as well as architectural changes in Angular 2. This means
 * that `index.html` can safely be processed using server-side technologies such as
 * providers. Bindings can thus use double-curly `{{ syntax }}` without collision from
 * Angular 2 component double-curly `{{ syntax }}`.
 *
 * We can use this script code:
 *
 * {@example core/ts/bootstrap/bootstrap.ts region='bootstrap'}
 *
 * When the app developer invokes `bootstrap()` with the root component `MyApp` as its
 * argument, Angular performs the following tasks:
 *
 *  1. It uses the component's `selector` property to locate the DOM element which needs
 *     to be upgraded into the angular component.
 *  2. It creates a new child injector (from the platform injector). Optionally, you can
 *     also override the injector configuration for an app by invoking `bootstrap` with the
 *     `componentInjectableBindings` argument.
 *  3. It creates a new `Zone` and connects it to the angular application's change detection
 *     domain instance.
 *  4. It creates an emulated or shadow DOM on the selected component's host element and loads the
 *     template into it.
 *  5. It instantiates the specified component.
 *  6. Finally, Angular performs change detection to apply the initial data providers for the
 *     application.
 *
 *
 * ## Bootstrapping Multiple Applications
 *
 * When working within a browser window, there are many singleton resources: cookies, title,
 * location, and others. Angular services that represent these resources must likewise be
 * shared across all Angular applications that occupy the same browser window. For this
 * reason, Angular creates exactly one global platform object which stores all shared
 * services, and each angular application injector has the platform injector as its parent.
 *
 * Each application has its own private injector as well. When there are multiple
 * applications on a page, Angular treats each application injector's services as private
 * to that application.
 *
 * ## API (version 1)
 *
 * - `appComponentType`: The root component which should act as the application. This is
 *   a reference to a `Type` which is annotated with `@Component(...)`.
 * - `customProviders`: An additional set of providers that can be added to the
 *   app injector to override default injection behavior.
 *
 * ## API (version 2)
 * - `appComponentType`: The root component which should act as the application. This is
 *   a reference to a `Type` which is annotated with `@Component(...)`.
 * - `providers`, `declarations`, `imports`, `entryComponents`: Defines the properties
 *   of the dynamically created module that is used to bootstrap the module.
 * - to configure the compiler, use the `compilerOptions` parameter.
 *
 * Returns a `Promise` of {@link ComponentRef}.
 *
 * @deprecated This api cannot be used with the offline compiler. Use
 * `PlatformRef.boostrapModule()` instead.
 */
// Note: We are using typescript overloads here to have 2 function signatures!
function bootstrap(appComponentType, customProviders) {
    var compilerOptions;
    var declarations = [];
    var entryComponents = [];
    var deprecationMessages = [];
    var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(customProviders);
    declarations = deprecatedConfiguration.moduleDeclarations.concat(declarations);
    compilerOptions = deprecatedConfiguration.compilerOptions;
    deprecationMessages = deprecatedConfiguration.deprecationMessages;
    var DynamicModule = (function () {
        function DynamicModule() {
        }
        /** @nocollapse */
        DynamicModule.decorators = [
            { type: core_1.NgModule, args: [{
                        providers: customProviders,
                        declarations: declarations.concat([appComponentType]),
                        imports: [platform_browser_1.BrowserModule],
                        entryComponents: entryComponents,
                        bootstrap: [appComponentType],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                    },] },
        ];
        return DynamicModule;
    }());
    return exports.platformBrowserDynamic()
        .bootstrapModule(DynamicModule, compilerOptions)
        .then(function (moduleRef) {
        var console = moduleRef.injector.get(core_private_1.Console);
        deprecationMessages.forEach(function (msg) { return console.warn(msg); });
        var appRef = moduleRef.injector.get(core_1.ApplicationRef);
        return appRef.components[0];
    });
}
exports.bootstrap = bootstrap;
/**
 * Bootstraps the worker ui.
 *
 * @experimental
 */
function bootstrapWorkerUi(workerScriptUri, customProviders) {
    if (customProviders === void 0) { customProviders = []; }
    // For now, just creates the worker ui platform...
    return Promise.resolve(platform_browser_1.platformWorkerUi([{
            provide: platform_browser_1.WORKER_SCRIPT,
            useValue: workerScriptUri,
        }].concat(customProviders)));
}
exports.bootstrapWorkerUi = bootstrapWorkerUi;
/**
 * @experimental API related to bootstrapping are still under review.
 */
exports.platformWorkerAppDynamic = core_1.createPlatformFactory(compiler_1.platformCoreDynamic, 'workerAppDynamic', [{
        provide: core_1.COMPILER_OPTIONS,
        useValue: { providers: [{ provide: compiler_1.XHR, useClass: xhr_impl_1.XHRImpl }] },
        multi: true
    }]);
/**
 * @deprecated Use {@link platformWorkerAppDynamic} instead
 */
exports.workerAppDynamicPlatform = exports.platformWorkerAppDynamic;
/**
 * @deprecated Create an {@link NgModule} that includes the {@link WorkerAppModule} and use {@link
 * bootstrapModule}
 * with the {@link workerAppDynamicPlatform}() instead.
 */
function bootstrapWorkerApp(appComponentType, customProviders) {
    console.warn('bootstrapWorkerApp is deprecated. Create an @NgModule that includes the `WorkerAppModule` and use `bootstrapModule` with the `workerAppDynamicPlatform()` instead.');
    var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(customProviders);
    var declarations = [deprecatedConfiguration.moduleDeclarations.concat([appComponentType])];
    var DynamicModule = (function () {
        function DynamicModule() {
        }
        /** @nocollapse */
        DynamicModule.decorators = [
            { type: core_1.NgModule, args: [{
                        providers: customProviders,
                        declarations: declarations,
                        imports: [platform_browser_1.WorkerAppModule],
                        bootstrap: [appComponentType]
                    },] },
        ];
        return DynamicModule;
    }());
    return exports.platformWorkerAppDynamic()
        .bootstrapModule(DynamicModule, deprecatedConfiguration.compilerOptions)
        .then(function (moduleRef) {
        var console = moduleRef.injector.get(core_private_1.Console);
        deprecatedConfiguration.deprecationMessages.forEach(function (msg) { return console.warn(msg); });
        var appRef = moduleRef.injector.get(core_1.ApplicationRef);
        return appRef.components[0];
    });
}
exports.bootstrapWorkerApp = bootstrapWorkerApp;
function normalizeArray(arr) {
    return arr ? arr : [];
}
//# sourceMappingURL=index.js.map