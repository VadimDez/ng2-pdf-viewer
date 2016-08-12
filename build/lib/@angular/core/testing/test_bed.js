/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var index_1 = require('../index');
var collection_1 = require('../src/facade/collection');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var async_test_completer_1 = require('./async_test_completer');
var component_fixture_1 = require('./component_fixture');
var test_compiler_1 = require('./test_compiler');
var UNDEFINED = new Object();
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
var TestComponentRenderer = (function () {
    function TestComponentRenderer() {
    }
    TestComponentRenderer.prototype.insertRootElement = function (rootElementId) { };
    return TestComponentRenderer;
}());
exports.TestComponentRenderer = TestComponentRenderer;
var _nextRootElementId = 0;
/**
 * @experimental
 */
exports.ComponentFixtureAutoDetect = new index_1.OpaqueToken('ComponentFixtureAutoDetect');
/**
 * @experimental
 */
exports.ComponentFixtureNoNgZone = new index_1.OpaqueToken('ComponentFixtureNoNgZone');
/**
 * @experimental
 */
var TestBed = (function () {
    function TestBed() {
        this._instantiated = false;
        this._compiler = null;
        this._moduleRef = null;
        this._moduleWithComponentFactories = null;
        this._compilerOptions = [];
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this.platform = null;
        this.ngModule = null;
    }
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * 'angular2/platform/testing/<platform_name>'.
     *
     * @experimental
     */
    TestBed.initTestEnvironment = function (ngModule, platform) {
        var testBed = getTestBed();
        getTestBed().initTestEnvironment(ngModule, platform);
        return testBed;
    };
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    TestBed.resetTestEnvironment = function () { getTestBed().resetTestEnvironment(); };
    TestBed.resetTestingModule = function () {
        getTestBed().resetTestingModule();
        return TestBed;
    };
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    TestBed.configureCompiler = function (config) {
        getTestBed().configureCompiler(config);
        return TestBed;
    };
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    TestBed.configureTestingModule = function (moduleDef) {
        getTestBed().configureTestingModule(moduleDef);
        return TestBed;
    };
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    TestBed.compileComponents = function () { return getTestBed().compileComponents(); };
    TestBed.overrideModule = function (ngModule, override) {
        getTestBed().overrideModule(ngModule, override);
        return TestBed;
    };
    TestBed.overrideComponent = function (component, override) {
        getTestBed().overrideComponent(component, override);
        return TestBed;
    };
    TestBed.overrideDirective = function (directive, override) {
        getTestBed().overrideDirective(directive, override);
        return TestBed;
    };
    TestBed.overridePipe = function (pipe, override) {
        getTestBed().overridePipe(pipe, override);
        return TestBed;
    };
    TestBed.createComponent = function (component) {
        return getTestBed().createComponent(component);
    };
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * 'angular2/platform/testing/<platform_name>'.
     *
     * @experimental
     */
    TestBed.prototype.initTestEnvironment = function (ngModule, platform) {
        if (this.platform || this.ngModule) {
            throw new exceptions_1.BaseException('Cannot set base providers because it has already been called');
        }
        this.platform = platform;
        this.ngModule = ngModule;
    };
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    TestBed.prototype.resetTestEnvironment = function () {
        this.resetTestingModule();
        this.platform = null;
        this.ngModule = null;
    };
    /**
     * @deprecated use `resetTestingModule` instead
     */
    TestBed.prototype.reset = function () { this.resetTestingModule(); };
    TestBed.prototype.resetTestingModule = function () {
        this._compiler = null;
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._moduleRef = null;
        this._moduleWithComponentFactories = null;
        this._compilerOptions = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._instantiated = false;
    };
    TestBed.prototype.configureCompiler = function (config) {
        this._assertNotInstantiated('TestBed.configureCompiler', 'configure the compiler');
        this._compilerOptions.push(config);
    };
    TestBed.prototype.configureTestingModule = function (moduleDef) {
        this._assertNotInstantiated('TestBed.configureTestingModule', 'configure the test module');
        if (moduleDef.providers) {
            this._providers = collection_1.ListWrapper.concat(this._providers, moduleDef.providers);
        }
        if (moduleDef.declarations) {
            this._declarations = collection_1.ListWrapper.concat(this._declarations, moduleDef.declarations);
        }
        if (moduleDef.imports) {
            this._imports = collection_1.ListWrapper.concat(this._imports, moduleDef.imports);
        }
        if (moduleDef.schemas) {
            this._schemas = collection_1.ListWrapper.concat(this._schemas, moduleDef.schemas);
        }
    };
    TestBed.prototype.compileComponents = function () {
        var _this = this;
        if (this._moduleWithComponentFactories || this._instantiated) {
            return Promise.resolve(null);
        }
        var moduleType = this._createCompilerAndModule();
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType)
            .then(function (moduleAndComponentFactories) {
            _this._moduleWithComponentFactories = moduleAndComponentFactories;
        });
    };
    TestBed.prototype._initIfNeeded = function () {
        if (this._instantiated) {
            return;
        }
        if (!this._moduleWithComponentFactories) {
            try {
                var moduleType = this._createCompilerAndModule();
                this._moduleWithComponentFactories =
                    this._compiler.compileModuleAndAllComponentsSync(moduleType);
            }
            catch (e) {
                if (e instanceof index_1.ComponentStillLoadingError) {
                    throw new Error(("This test module uses the component " + lang_1.stringify(e.compType) + " which is using a \"templateUrl\", but they were never compiled. ") +
                        "Please call \"TestBed.compileComponents\" before your test.");
                }
                else {
                    throw e;
                }
            }
        }
        this._moduleRef =
            this._moduleWithComponentFactories.ngModuleFactory.create(this.platform.injector);
        this._instantiated = true;
    };
    TestBed.prototype._createCompilerAndModule = function () {
        var _this = this;
        var providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
        var declarations = this._declarations;
        var imports = [this.ngModule, this._imports];
        var schemas = this._schemas;
        var DynamicTestModule = (function () {
            function DynamicTestModule() {
            }
            /** @nocollapse */
            DynamicTestModule.decorators = [
                { type: index_1.NgModule, args: [{ providers: providers, declarations: declarations, imports: imports, schemas: schemas },] },
            ];
            return DynamicTestModule;
        }());
        var compilerFactory = this.platform.injector.get(test_compiler_1.TestingCompilerFactory);
        this._compiler =
            compilerFactory.createTestingCompiler(this._compilerOptions.concat([{ useDebug: true }]));
        this._moduleOverrides.forEach(function (entry) { return _this._compiler.overrideModule(entry[0], entry[1]); });
        this._componentOverrides.forEach(function (entry) { return _this._compiler.overrideComponent(entry[0], entry[1]); });
        this._directiveOverrides.forEach(function (entry) { return _this._compiler.overrideDirective(entry[0], entry[1]); });
        this._pipeOverrides.forEach(function (entry) { return _this._compiler.overridePipe(entry[0], entry[1]); });
        return DynamicTestModule;
    };
    TestBed.prototype._assertNotInstantiated = function (methodName, methodDescription) {
        if (this._instantiated) {
            throw new exceptions_1.BaseException(("Cannot " + methodDescription + " when the test module has already been instantiated. ") +
                ("Make sure you are not using `inject` before `" + methodName + "`."));
        }
    };
    TestBed.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = index_1.Injector.THROW_IF_NOT_FOUND; }
        this._initIfNeeded();
        if (token === TestBed) {
            return this;
        }
        // Tests can inject things from the ng module and from the compiler,
        // but the ng module can't inject things from the compiler and vice versa.
        var result = this._moduleRef.injector.get(token, UNDEFINED);
        return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue) : result;
    };
    TestBed.prototype.execute = function (tokens, fn) {
        var _this = this;
        this._initIfNeeded();
        var params = tokens.map(function (t) { return _this.get(t); });
        return lang_1.FunctionWrapper.apply(fn, params);
    };
    TestBed.prototype.overrideModule = function (ngModule, override) {
        this._assertNotInstantiated('overrideModule', 'override module metadata');
        this._moduleOverrides.push([ngModule, override]);
    };
    TestBed.prototype.overrideComponent = function (component, override) {
        this._assertNotInstantiated('overrideComponent', 'override component metadata');
        this._componentOverrides.push([component, override]);
    };
    TestBed.prototype.overrideDirective = function (directive, override) {
        this._assertNotInstantiated('overrideDirective', 'override directive metadata');
        this._directiveOverrides.push([directive, override]);
    };
    TestBed.prototype.overridePipe = function (pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    };
    TestBed.prototype.createComponent = function (component) {
        var _this = this;
        this._initIfNeeded();
        var componentFactory = this._moduleWithComponentFactories.componentFactories.find(function (compFactory) { return compFactory.componentType === component; });
        if (!componentFactory) {
            throw new exceptions_1.BaseException("Cannot create the component " + lang_1.stringify(component) + " as it was not imported into the testing module!");
        }
        var noNgZone = this.get(exports.ComponentFixtureNoNgZone, false);
        var autoDetect = this.get(exports.ComponentFixtureAutoDetect, false);
        var ngZone = noNgZone ? null : this.get(index_1.NgZone, null);
        var testComponentRenderer = this.get(TestComponentRenderer);
        var rootElId = "root" + _nextRootElementId++;
        testComponentRenderer.insertRootElement(rootElId);
        var initComponent = function () {
            var componentRef = componentFactory.create(_this, [], "#" + rootElId);
            return new component_fixture_1.ComponentFixture(componentRef, ngZone, autoDetect);
        };
        return ngZone == null ? initComponent() : ngZone.run(initComponent);
    };
    return TestBed;
}());
exports.TestBed = TestBed;
var _testBed = null;
/**
 * @experimental
 */
function getTestBed() {
    if (_testBed == null) {
        _testBed = new TestBed();
    }
    return _testBed;
}
exports.getTestBed = getTestBed;
/**
 * @deprecated use getTestBed instead.
 */
function getTestInjector() {
    return getTestBed();
}
exports.getTestInjector = getTestInjector;
/**
 * Set the providers that the test injector should use. These should be providers
 * common to every test in the suite.
 *
 * This may only be called once, to set up the common providers for the current test
 * suite on the current platform. If you absolutely need to change the providers,
 * first use `resetBaseTestProviders`.
 *
 * Test modules and platforms for individual platforms are available from
 * 'angular2/platform/testing/<platform_name>'.
 *
 * @deprecated Use TestBed.initTestEnvironment instead
 */
function setBaseTestProviders(platformProviders, applicationProviders) {
    if (platformProviders.length === 1 && typeof platformProviders[0] === 'function') {
        platformProviders[0](applicationProviders);
    }
    else {
        throw new Error("setBaseTestProviders is deprecated and only supports platformProviders that are predefined by Angular. Use 'TestBed.initTestEnvironment' instead.");
    }
}
exports.setBaseTestProviders = setBaseTestProviders;
/**
 * Reset the providers for the test injector.
 *
 * @deprecated Use TestBed.resetTestEnvironment instead.
 */
function resetBaseTestProviders() {
    TestBed.resetTestEnvironment();
}
exports.resetBaseTestProviders = resetBaseTestProviders;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @stable
 */
function inject(tokens, fn) {
    var testBed = getTestBed();
    if (tokens.indexOf(async_test_completer_1.AsyncTestCompleter) >= 0) {
        return function () {
            // Return an async test method that returns a Promise if AsyncTestCompleter is one of
            // the
            // injected tokens.
            return testBed.compileComponents().then(function () {
                var completer = testBed.get(async_test_completer_1.AsyncTestCompleter);
                testBed.execute(tokens, fn);
                return completer.promise;
            });
        };
    }
    else {
        return function () { return testBed.execute(tokens, fn); };
    }
}
exports.inject = inject;
/**
 * @experimental
 */
var InjectSetupWrapper = (function () {
    function InjectSetupWrapper(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    InjectSetupWrapper.prototype._addModule = function () {
        var moduleDef = this._moduleDef();
        if (moduleDef) {
            getTestBed().configureTestingModule(moduleDef);
        }
    };
    InjectSetupWrapper.prototype.inject = function (tokens, fn) {
        var _this = this;
        return function () {
            _this._addModule();
            return inject(tokens, fn)();
        };
    };
    return InjectSetupWrapper;
}());
exports.InjectSetupWrapper = InjectSetupWrapper;
/**
 * @deprecated Use `TestBed.configureTestingModule instead.
 */
function withProviders(providers) {
    return new InjectSetupWrapper(function () { return { providers: providers() }; });
}
exports.withProviders = withProviders;
function withModule(moduleDef, fn) {
    if (fn === void 0) { fn = null; }
    if (fn) {
        return function () {
            var testBed = getTestBed();
            if (moduleDef) {
                testBed.configureTestingModule(moduleDef);
            }
            return fn();
        };
    }
    return new InjectSetupWrapper(function () { return moduleDef; });
}
exports.withModule = withModule;
//# sourceMappingURL=test_bed.js.map