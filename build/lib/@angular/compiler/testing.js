/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./testing/schema_registry_mock'));
__export(require('./testing/test_component_builder'));
__export(require('./testing/directive_resolver_mock'));
__export(require('./testing/ng_module_resolver_mock'));
__export(require('./testing/pipe_resolver_mock'));
var core_1 = require('@angular/core');
var core_private_testing_1 = require('./core_private_testing');
var index_1 = require('./index');
var directive_resolver_mock_2 = require('./testing/directive_resolver_mock');
var ng_module_resolver_mock_2 = require('./testing/ng_module_resolver_mock');
var pipe_resolver_mock_2 = require('./testing/pipe_resolver_mock');
var metadata_overrider_1 = require('./testing/metadata_overrider');
var TestingCompilerFactoryImpl = (function () {
    function TestingCompilerFactoryImpl(_compilerFactory) {
        this._compilerFactory = _compilerFactory;
    }
    TestingCompilerFactoryImpl.prototype.createTestingCompiler = function (options) {
        var compiler = this._compilerFactory.createCompiler(options);
        return new TestingCompilerImpl(compiler, compiler.injector.get(directive_resolver_mock_2.MockDirectiveResolver), compiler.injector.get(pipe_resolver_mock_2.MockPipeResolver), compiler.injector.get(ng_module_resolver_mock_2.MockNgModuleResolver));
    };
    /** @nocollapse */
    TestingCompilerFactoryImpl.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TestingCompilerFactoryImpl.ctorParameters = [
        { type: core_1.CompilerFactory, },
    ];
    return TestingCompilerFactoryImpl;
}());
exports.TestingCompilerFactoryImpl = TestingCompilerFactoryImpl;
var TestingCompilerImpl = (function () {
    function TestingCompilerImpl(_compiler, _directiveResolver, _pipeResolver, _moduleResolver) {
        this._compiler = _compiler;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._moduleResolver = _moduleResolver;
        this._overrider = new metadata_overrider_1.MetadataOverrider();
    }
    Object.defineProperty(TestingCompilerImpl.prototype, "injector", {
        get: function () { return this._compiler.injector; },
        enumerable: true,
        configurable: true
    });
    TestingCompilerImpl.prototype.compileComponentAsync = function (component, ngModule) {
        if (ngModule === void 0) { ngModule = null; }
        return this._compiler.compileComponentAsync(component, ngModule);
    };
    TestingCompilerImpl.prototype.compileComponentSync = function (component, ngModule) {
        if (ngModule === void 0) { ngModule = null; }
        return this._compiler.compileComponentSync(component, ngModule);
    };
    TestingCompilerImpl.prototype.compileModuleSync = function (moduleType) {
        return this._compiler.compileModuleSync(moduleType);
    };
    TestingCompilerImpl.prototype.compileModuleAsync = function (moduleType) {
        return this._compiler.compileModuleAsync(moduleType);
    };
    TestingCompilerImpl.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
        return this._compiler.compileModuleAndAllComponentsSync(moduleType);
    };
    TestingCompilerImpl.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType);
    };
    TestingCompilerImpl.prototype.overrideModule = function (ngModule, override) {
        var oldMetadata = this._moduleResolver.resolve(ngModule, false);
        this._moduleResolver.setNgModule(ngModule, this._overrider.overrideMetadata(core_1.NgModuleMetadata, oldMetadata, override));
    };
    TestingCompilerImpl.prototype.overrideDirective = function (directive, override) {
        var oldMetadata = this._directiveResolver.resolve(directive, false);
        this._directiveResolver.setDirective(directive, this._overrider.overrideMetadata(core_1.DirectiveMetadata, oldMetadata, override));
    };
    TestingCompilerImpl.prototype.overrideComponent = function (component, override) {
        var oldMetadata = this._directiveResolver.resolve(component, false);
        this._directiveResolver.setDirective(component, this._overrider.overrideMetadata(core_1.ComponentMetadata, oldMetadata, override));
    };
    TestingCompilerImpl.prototype.overridePipe = function (pipe, override) {
        var oldMetadata = this._pipeResolver.resolve(pipe, false);
        this._pipeResolver.setPipe(pipe, this._overrider.overrideMetadata(core_1.PipeMetadata, oldMetadata, override));
    };
    TestingCompilerImpl.prototype.clearCache = function () { this._compiler.clearCache(); };
    TestingCompilerImpl.prototype.clearCacheFor = function (type) { this._compiler.clearCacheFor(type); };
    return TestingCompilerImpl;
}());
exports.TestingCompilerImpl = TestingCompilerImpl;
/**
 * Platform for dynamic tests
 *
 * @experimental
 */
exports.platformCoreDynamicTesting = core_1.createPlatformFactory(index_1.platformCoreDynamic, 'coreDynamicTesting', [
    {
        provide: core_1.COMPILER_OPTIONS,
        useValue: {
            providers: [
                pipe_resolver_mock_2.MockPipeResolver, { provide: index_1.PipeResolver, useExisting: pipe_resolver_mock_2.MockPipeResolver },
                directive_resolver_mock_2.MockDirectiveResolver, { provide: index_1.DirectiveResolver, useExisting: directive_resolver_mock_2.MockDirectiveResolver },
                ng_module_resolver_mock_2.MockNgModuleResolver, { provide: index_1.NgModuleResolver, useExisting: ng_module_resolver_mock_2.MockNgModuleResolver }
            ]
        },
        multi: true
    },
    { provide: core_private_testing_1.TestingCompilerFactory, useClass: TestingCompilerFactoryImpl }
]);
//# sourceMappingURL=testing.js.map