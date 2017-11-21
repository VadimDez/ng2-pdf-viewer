/**
 * @license Angular v5.0.2
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/core/testing'), require('@angular/platform-browser-dynamic'), require('@angular/platform-browser/testing'), require('@angular/platform-browser'), require('@angular/compiler'), require('@angular/compiler/testing')) :
	typeof define === 'function' && define.amd ? define('@angular/platform-browser-dynamic/testing', ['exports', '@angular/core', '@angular/core/testing', '@angular/platform-browser-dynamic', '@angular/platform-browser/testing', '@angular/platform-browser', '@angular/compiler', '@angular/compiler/testing'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.platformBrowserDynamic = global.ng.platformBrowserDynamic || {}, global.ng.platformBrowserDynamic.testing = {}),global.ng.core,global.ng.core.testing,global.ng.platformBrowserDynamic,global.ng.platformBrowser.testing,global.ng.platformBrowser,global.ng.compiler,global.ng.compiler.testing));
}(this, (function (exports,_angular_core,_angular_core_testing,_angular_platformBrowserDynamic,_angular_platformBrowser_testing,_angular_platformBrowser,_angular_compiler,_angular_compiler_testing) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @license Angular v5.0.2
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A DOM based implementation of the TestComponentRenderer.
 */
var DOMTestComponentRenderer = (function (_super) {
    __extends(DOMTestComponentRenderer, _super);
    function DOMTestComponentRenderer(_doc /** TODO #9100 */) {
        var _this = _super.call(this) || this;
        _this._doc = _doc;
        return _this;
    }
    /**
     * @param {?} rootElId
     * @return {?}
     */
    DOMTestComponentRenderer.prototype.insertRootElement = /**
     * @param {?} rootElId
     * @return {?}
     */
    function (rootElId) {
        var /** @type {?} */ rootEl = /** @type {?} */ (_angular_platformBrowser.ɵgetDOM().firstChild(_angular_platformBrowser.ɵgetDOM().content(_angular_platformBrowser.ɵgetDOM().createTemplate("<div id=\"" + rootElId + "\"></div>"))));
        // TODO(juliemr): can/should this be optional?
        var /** @type {?} */ oldRoots = _angular_platformBrowser.ɵgetDOM().querySelectorAll(this._doc, '[id^=root]');
        for (var /** @type {?} */ i = 0; i < oldRoots.length; i++) {
            _angular_platformBrowser.ɵgetDOM().remove(oldRoots[i]);
        }
        _angular_platformBrowser.ɵgetDOM().appendChild(this._doc.body, rootEl);
    };
    DOMTestComponentRenderer.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    DOMTestComponentRenderer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_platformBrowser.DOCUMENT,] },] },
    ]; };
    return DOMTestComponentRenderer;
}(_angular_core_testing.TestComponentRenderer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _nextReferenceId = 0;
var MetadataOverrider = (function () {
    function MetadataOverrider() {
        this._references = new Map();
    }
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     */
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     * @template C, T
     * @param {?} metadataClass
     * @param {?} oldMetadata
     * @param {?} override
     * @return {?}
     */
    MetadataOverrider.prototype.overrideMetadata = /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     * @template C, T
     * @param {?} metadataClass
     * @param {?} oldMetadata
     * @param {?} override
     * @return {?}
     */
    function (metadataClass, oldMetadata, override) {
        var /** @type {?} */ props = {};
        if (oldMetadata) {
            _valueProps(oldMetadata).forEach(function (prop) { return props[prop] = (/** @type {?} */ (oldMetadata))[prop]; });
        }
        if (override.set) {
            if (override.remove || override.add) {
                throw new Error("Cannot set and add/remove " + _angular_core.ɵstringify(metadataClass) + " at the same time!");
            }
            setMetadata(props, override.set);
        }
        if (override.remove) {
            removeMetadata(props, override.remove, this._references);
        }
        if (override.add) {
            addMetadata(props, override.add);
        }
        return new metadataClass(/** @type {?} */ (props));
    };
    return MetadataOverrider;
}());
/**
 * @param {?} metadata
 * @param {?} remove
 * @param {?} references
 * @return {?}
 */
function removeMetadata(metadata, remove, references) {
    var /** @type {?} */ removeObjects = new Set();
    var _loop_1 = function (prop) {
        var /** @type {?} */ removeValue = remove[prop];
        if (removeValue instanceof Array) {
            removeValue.forEach(function (value) { removeObjects.add(_propHashKey(prop, value, references)); });
        }
        else {
            removeObjects.add(_propHashKey(prop, removeValue, references));
        }
    };
    for (var /** @type {?} */ prop in remove) {
        _loop_1(prop);
    }
    var _loop_2 = function (prop) {
        var /** @type {?} */ propValue = metadata[prop];
        if (propValue instanceof Array) {
            metadata[prop] = propValue.filter(function (value) { return !removeObjects.has(_propHashKey(prop, value, references)); });
        }
        else {
            if (removeObjects.has(_propHashKey(prop, propValue, references))) {
                metadata[prop] = undefined;
            }
        }
    };
    for (var /** @type {?} */ prop in metadata) {
        _loop_2(prop);
    }
}
/**
 * @param {?} metadata
 * @param {?} add
 * @return {?}
 */
function addMetadata(metadata, add) {
    for (var /** @type {?} */ prop in add) {
        var /** @type {?} */ addValue = add[prop];
        var /** @type {?} */ propValue = metadata[prop];
        if (propValue != null && propValue instanceof Array) {
            metadata[prop] = propValue.concat(addValue);
        }
        else {
            metadata[prop] = addValue;
        }
    }
}
/**
 * @param {?} metadata
 * @param {?} set
 * @return {?}
 */
function setMetadata(metadata, set) {
    for (var /** @type {?} */ prop in set) {
        metadata[prop] = set[prop];
    }
}
/**
 * @param {?} propName
 * @param {?} propValue
 * @param {?} references
 * @return {?}
 */
function _propHashKey(propName, propValue, references) {
    var /** @type {?} */ replacer = function (key, value) {
        if (typeof value === 'function') {
            value = _serializeReference(value, references);
        }
        return value;
    };
    return propName + ":" + JSON.stringify(propValue, replacer);
}
/**
 * @param {?} ref
 * @param {?} references
 * @return {?}
 */
function _serializeReference(ref, references) {
    var /** @type {?} */ id = references.get(ref);
    if (!id) {
        id = "" + _angular_core.ɵstringify(ref) + _nextReferenceId++;
        references.set(ref, id);
    }
    return id;
}
/**
 * @param {?} obj
 * @return {?}
 */
function _valueProps(obj) {
    var /** @type {?} */ props = [];
    // regular public props
    Object.keys(obj).forEach(function (prop) {
        if (!prop.startsWith('_')) {
            props.push(prop);
        }
    });
    // getters
    var /** @type {?} */ proto = obj;
    while (proto = Object.getPrototypeOf(proto)) {
        Object.keys(proto).forEach(function (protoProp) {
            var /** @type {?} */ desc = Object.getOwnPropertyDescriptor(proto, protoProp);
            if (!protoProp.startsWith('_') && desc && 'get' in desc) {
                props.push(protoProp);
            }
        });
    }
    return props;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var COMPILER_PROVIDERS = [
    { provide: _angular_compiler_testing.MockPipeResolver, deps: [_angular_compiler.CompileReflector] },
    { provide: _angular_compiler.PipeResolver, useExisting: _angular_compiler_testing.MockPipeResolver },
    { provide: _angular_compiler_testing.MockDirectiveResolver, deps: [_angular_compiler.CompileReflector] },
    { provide: _angular_compiler.DirectiveResolver, useExisting: _angular_compiler_testing.MockDirectiveResolver },
    { provide: _angular_compiler_testing.MockNgModuleResolver, deps: [_angular_compiler.CompileReflector] },
    { provide: _angular_compiler.NgModuleResolver, useExisting: _angular_compiler_testing.MockNgModuleResolver },
];
var TestingCompilerFactoryImpl = (function () {
    function TestingCompilerFactoryImpl(_injector, _compilerFactory) {
        this._injector = _injector;
        this._compilerFactory = _compilerFactory;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    TestingCompilerFactoryImpl.prototype.createTestingCompiler = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ compiler = /** @type {?} */ (this._compilerFactory.createCompiler(options));
        return new TestingCompilerImpl(compiler, compiler.injector.get(_angular_compiler_testing.MockDirectiveResolver), compiler.injector.get(_angular_compiler_testing.MockPipeResolver), compiler.injector.get(_angular_compiler_testing.MockNgModuleResolver));
    };
    return TestingCompilerFactoryImpl;
}());
var TestingCompilerImpl = (function () {
    function TestingCompilerImpl(_compiler, _directiveResolver, _pipeResolver, _moduleResolver) {
        this._compiler = _compiler;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._moduleResolver = _moduleResolver;
        this._overrider = new MetadataOverrider();
    }
    Object.defineProperty(TestingCompilerImpl.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return this._compiler.injector; },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.compileModuleSync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._compiler.compileModuleSync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.compileModuleAsync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._compiler.compileModuleAsync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.compileModuleAndAllComponentsSync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._compiler.compileModuleAndAllComponentsSync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.compileModuleAndAllComponentsAsync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType);
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestingCompilerImpl.prototype.getComponentFactory = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        return this._compiler.getComponentFactory(component);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    TestingCompilerImpl.prototype.checkOverrideAllowed = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (this._compiler.hasAotSummary(type)) {
            throw new Error(_angular_core.ɵstringify(type) + " was AOT compiled, so its metadata cannot be changed.");
        }
    };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestingCompilerImpl.prototype.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        this.checkOverrideAllowed(ngModule);
        var /** @type {?} */ oldMetadata = this._moduleResolver.resolve(ngModule, false);
        this._moduleResolver.setNgModule(ngModule, this._overrider.overrideMetadata(_angular_core.NgModule, oldMetadata, override));
        this.clearCacheFor(ngModule);
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestingCompilerImpl.prototype.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        this.checkOverrideAllowed(directive);
        var /** @type {?} */ oldMetadata = this._directiveResolver.resolve(directive, false);
        this._directiveResolver.setDirective(directive, this._overrider.overrideMetadata(_angular_core.Directive, /** @type {?} */ ((oldMetadata)), override));
        this.clearCacheFor(directive);
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestingCompilerImpl.prototype.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        this.checkOverrideAllowed(component);
        var /** @type {?} */ oldMetadata = this._directiveResolver.resolve(component, false);
        this._directiveResolver.setDirective(component, this._overrider.overrideMetadata(_angular_core.Component, /** @type {?} */ ((oldMetadata)), override));
        this.clearCacheFor(component);
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestingCompilerImpl.prototype.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        this.checkOverrideAllowed(pipe);
        var /** @type {?} */ oldMetadata = this._pipeResolver.resolve(pipe, false);
        this._pipeResolver.setPipe(pipe, this._overrider.overrideMetadata(_angular_core.Pipe, oldMetadata, override));
        this.clearCacheFor(pipe);
    };
    /**
     * @param {?} summaries
     * @return {?}
     */
    TestingCompilerImpl.prototype.loadAotSummaries = /**
     * @param {?} summaries
     * @return {?}
     */
    function (summaries) { this._compiler.loadAotSummaries(summaries); };
    /**
     * @return {?}
     */
    TestingCompilerImpl.prototype.clearCache = /**
     * @return {?}
     */
    function () { this._compiler.clearCache(); };
    /**
     * @param {?} type
     * @return {?}
     */
    TestingCompilerImpl.prototype.clearCacheFor = /**
     * @param {?} type
     * @return {?}
     */
    function (type) { this._compiler.clearCacheFor(type); };
    /**
     * @param {?} error
     * @return {?}
     */
    TestingCompilerImpl.prototype.getComponentFromError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) { return (/** @type {?} */ (error))[_angular_compiler.ERROR_COMPONENT_TYPE] || null; };
    return TestingCompilerImpl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Platform for dynamic tests
 *
 * \@experimental
 */
var platformCoreDynamicTesting = _angular_core.createPlatformFactory(_angular_platformBrowserDynamic.ɵplatformCoreDynamic, 'coreDynamicTesting', [
    { provide: _angular_core.COMPILER_OPTIONS, useValue: { providers: COMPILER_PROVIDERS }, multi: true }, {
        provide: _angular_core_testing.ɵTestingCompilerFactory,
        useClass: TestingCompilerFactoryImpl,
        deps: [_angular_core.Injector, _angular_core.CompilerFactory]
    }
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@stable
 */
var platformBrowserDynamicTesting = _angular_core.createPlatformFactory(platformCoreDynamicTesting, 'browserDynamicTesting', _angular_platformBrowserDynamic.ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * \@stable
 */
var BrowserDynamicTestingModule = (function () {
    function BrowserDynamicTestingModule() {
    }
    BrowserDynamicTestingModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    exports: [_angular_platformBrowser_testing.BrowserTestingModule],
                    providers: [
                        { provide: _angular_core_testing.TestComponentRenderer, useClass: DOMTestComponentRenderer },
                    ]
                },] },
    ];
    /** @nocollapse */
    BrowserDynamicTestingModule.ctorParameters = function () { return []; };
    return BrowserDynamicTestingModule;
}());

exports.platformBrowserDynamicTesting = platformBrowserDynamicTesting;
exports.BrowserDynamicTestingModule = BrowserDynamicTestingModule;
exports.ɵDOMTestComponentRenderer = DOMTestComponentRenderer;
exports.ɵplatformCoreDynamicTesting = platformCoreDynamicTesting;
exports.ɵa = COMPILER_PROVIDERS;
exports.ɵb = TestingCompilerFactoryImpl;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-browser-dynamic-testing.umd.js.map
