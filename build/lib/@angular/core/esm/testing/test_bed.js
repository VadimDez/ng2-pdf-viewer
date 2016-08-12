/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentStillLoadingError, Injector, NgModule, NgZone, OpaqueToken } from '../index';
import { ListWrapper } from '../src/facade/collection';
import { BaseException } from '../src/facade/exceptions';
import { FunctionWrapper, stringify } from '../src/facade/lang';
import { AsyncTestCompleter } from './async_test_completer';
import { ComponentFixture } from './component_fixture';
import { TestingCompilerFactory } from './test_compiler';
const UNDEFINED = new Object();
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
export class TestComponentRenderer {
    insertRootElement(rootElementId) { }
}
var _nextRootElementId = 0;
/**
 * @experimental
 */
export var ComponentFixtureAutoDetect = new OpaqueToken('ComponentFixtureAutoDetect');
/**
 * @experimental
 */
export var ComponentFixtureNoNgZone = new OpaqueToken('ComponentFixtureNoNgZone');
/**
 * @experimental
 */
export class TestBed {
    constructor() {
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
    static initTestEnvironment(ngModule, platform) {
        const testBed = getTestBed();
        getTestBed().initTestEnvironment(ngModule, platform);
        return testBed;
    }
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    static resetTestEnvironment() { getTestBed().resetTestEnvironment(); }
    static resetTestingModule() {
        getTestBed().resetTestingModule();
        return TestBed;
    }
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    static configureCompiler(config) {
        getTestBed().configureCompiler(config);
        return TestBed;
    }
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef) {
        getTestBed().configureTestingModule(moduleDef);
        return TestBed;
    }
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents() { return getTestBed().compileComponents(); }
    static overrideModule(ngModule, override) {
        getTestBed().overrideModule(ngModule, override);
        return TestBed;
    }
    static overrideComponent(component, override) {
        getTestBed().overrideComponent(component, override);
        return TestBed;
    }
    static overrideDirective(directive, override) {
        getTestBed().overrideDirective(directive, override);
        return TestBed;
    }
    static overridePipe(pipe, override) {
        getTestBed().overridePipe(pipe, override);
        return TestBed;
    }
    static createComponent(component) {
        return getTestBed().createComponent(component);
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
    initTestEnvironment(ngModule, platform) {
        if (this.platform || this.ngModule) {
            throw new BaseException('Cannot set base providers because it has already been called');
        }
        this.platform = platform;
        this.ngModule = ngModule;
    }
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    resetTestEnvironment() {
        this.resetTestingModule();
        this.platform = null;
        this.ngModule = null;
    }
    /**
     * @deprecated use `resetTestingModule` instead
     */
    reset() { this.resetTestingModule(); }
    resetTestingModule() {
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
    }
    configureCompiler(config) {
        this._assertNotInstantiated('TestBed.configureCompiler', 'configure the compiler');
        this._compilerOptions.push(config);
    }
    configureTestingModule(moduleDef) {
        this._assertNotInstantiated('TestBed.configureTestingModule', 'configure the test module');
        if (moduleDef.providers) {
            this._providers = ListWrapper.concat(this._providers, moduleDef.providers);
        }
        if (moduleDef.declarations) {
            this._declarations = ListWrapper.concat(this._declarations, moduleDef.declarations);
        }
        if (moduleDef.imports) {
            this._imports = ListWrapper.concat(this._imports, moduleDef.imports);
        }
        if (moduleDef.schemas) {
            this._schemas = ListWrapper.concat(this._schemas, moduleDef.schemas);
        }
    }
    compileComponents() {
        if (this._moduleWithComponentFactories || this._instantiated) {
            return Promise.resolve(null);
        }
        const moduleType = this._createCompilerAndModule();
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType)
            .then((moduleAndComponentFactories) => {
            this._moduleWithComponentFactories = moduleAndComponentFactories;
        });
    }
    _initIfNeeded() {
        if (this._instantiated) {
            return;
        }
        if (!this._moduleWithComponentFactories) {
            try {
                let moduleType = this._createCompilerAndModule();
                this._moduleWithComponentFactories =
                    this._compiler.compileModuleAndAllComponentsSync(moduleType);
            }
            catch (e) {
                if (e instanceof ComponentStillLoadingError) {
                    throw new Error(`This test module uses the component ${stringify(e.compType)} which is using a "templateUrl", but they were never compiled. ` +
                        `Please call "TestBed.compileComponents" before your test.`);
                }
                else {
                    throw e;
                }
            }
        }
        this._moduleRef =
            this._moduleWithComponentFactories.ngModuleFactory.create(this.platform.injector);
        this._instantiated = true;
    }
    _createCompilerAndModule() {
        const providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
        const declarations = this._declarations;
        const imports = [this.ngModule, this._imports];
        const schemas = this._schemas;
        class DynamicTestModule {
        }
        /** @nocollapse */
        DynamicTestModule.decorators = [
            { type: NgModule, args: [{ providers: providers, declarations: declarations, imports: imports, schemas: schemas },] },
        ];
        const compilerFactory = this.platform.injector.get(TestingCompilerFactory);
        this._compiler =
            compilerFactory.createTestingCompiler(this._compilerOptions.concat([{ useDebug: true }]));
        this._moduleOverrides.forEach((entry) => this._compiler.overrideModule(entry[0], entry[1]));
        this._componentOverrides.forEach((entry) => this._compiler.overrideComponent(entry[0], entry[1]));
        this._directiveOverrides.forEach((entry) => this._compiler.overrideDirective(entry[0], entry[1]));
        this._pipeOverrides.forEach((entry) => this._compiler.overridePipe(entry[0], entry[1]));
        return DynamicTestModule;
    }
    _assertNotInstantiated(methodName, methodDescription) {
        if (this._instantiated) {
            throw new BaseException(`Cannot ${methodDescription} when the test module has already been instantiated. ` +
                `Make sure you are not using \`inject\` before \`${methodName}\`.`);
        }
    }
    get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
        this._initIfNeeded();
        if (token === TestBed) {
            return this;
        }
        // Tests can inject things from the ng module and from the compiler,
        // but the ng module can't inject things from the compiler and vice versa.
        let result = this._moduleRef.injector.get(token, UNDEFINED);
        return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue) : result;
    }
    execute(tokens, fn) {
        this._initIfNeeded();
        var params = tokens.map(t => this.get(t));
        return FunctionWrapper.apply(fn, params);
    }
    overrideModule(ngModule, override) {
        this._assertNotInstantiated('overrideModule', 'override module metadata');
        this._moduleOverrides.push([ngModule, override]);
    }
    overrideComponent(component, override) {
        this._assertNotInstantiated('overrideComponent', 'override component metadata');
        this._componentOverrides.push([component, override]);
    }
    overrideDirective(directive, override) {
        this._assertNotInstantiated('overrideDirective', 'override directive metadata');
        this._directiveOverrides.push([directive, override]);
    }
    overridePipe(pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    }
    createComponent(component) {
        this._initIfNeeded();
        const componentFactory = this._moduleWithComponentFactories.componentFactories.find((compFactory) => compFactory.componentType === component);
        if (!componentFactory) {
            throw new BaseException(`Cannot create the component ${stringify(component)} as it was not imported into the testing module!`);
        }
        const noNgZone = this.get(ComponentFixtureNoNgZone, false);
        const autoDetect = this.get(ComponentFixtureAutoDetect, false);
        const ngZone = noNgZone ? null : this.get(NgZone, null);
        const testComponentRenderer = this.get(TestComponentRenderer);
        const rootElId = `root${_nextRootElementId++}`;
        testComponentRenderer.insertRootElement(rootElId);
        const initComponent = () => {
            var componentRef = componentFactory.create(this, [], `#${rootElId}`);
            return new ComponentFixture(componentRef, ngZone, autoDetect);
        };
        return ngZone == null ? initComponent() : ngZone.run(initComponent);
    }
}
var _testBed = null;
/**
 * @experimental
 */
export function getTestBed() {
    if (_testBed == null) {
        _testBed = new TestBed();
    }
    return _testBed;
}
/**
 * @deprecated use getTestBed instead.
 */
export function getTestInjector() {
    return getTestBed();
}
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
export function setBaseTestProviders(platformProviders, applicationProviders) {
    if (platformProviders.length === 1 && typeof platformProviders[0] === 'function') {
        platformProviders[0](applicationProviders);
    }
    else {
        throw new Error(`setBaseTestProviders is deprecated and only supports platformProviders that are predefined by Angular. Use 'TestBed.initTestEnvironment' instead.`);
    }
}
/**
 * Reset the providers for the test injector.
 *
 * @deprecated Use TestBed.resetTestEnvironment instead.
 */
export function resetBaseTestProviders() {
    TestBed.resetTestEnvironment();
}
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
export function inject(tokens, fn) {
    let testBed = getTestBed();
    if (tokens.indexOf(AsyncTestCompleter) >= 0) {
        return () => 
        // Return an async test method that returns a Promise if AsyncTestCompleter is one of
        // the
        // injected tokens.
        testBed.compileComponents().then(() => {
            let completer = testBed.get(AsyncTestCompleter);
            testBed.execute(tokens, fn);
            return completer.promise;
        });
    }
    else {
        return () => testBed.execute(tokens, fn);
    }
}
/**
 * @experimental
 */
export class InjectSetupWrapper {
    constructor(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    _addModule() {
        const moduleDef = this._moduleDef();
        if (moduleDef) {
            getTestBed().configureTestingModule(moduleDef);
        }
    }
    inject(tokens, fn) {
        return () => {
            this._addModule();
            return inject(tokens, fn)();
        };
    }
}
/**
 * @deprecated Use `TestBed.configureTestingModule instead.
 */
export function withProviders(providers) {
    return new InjectSetupWrapper(() => { return { providers: providers() }; });
}
export function withModule(moduleDef, fn = null) {
    if (fn) {
        return () => {
            const testBed = getTestBed();
            if (moduleDef) {
                testBed.configureTestingModule(moduleDef);
            }
            return fn();
        };
    }
    return new InjectSetupWrapper(() => moduleDef);
}
//# sourceMappingURL=test_bed.js.map