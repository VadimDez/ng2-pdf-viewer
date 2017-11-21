/**
 * @license Angular v5.0.2
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/compiler'), require('@angular/core'), require('@angular/common'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define('@angular/platform-browser-dynamic', ['exports', '@angular/compiler', '@angular/core', '@angular/common', '@angular/platform-browser'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.platformBrowserDynamic = {}),global.ng.compiler,global.ng.core,global.ng.common,global.ng.platformBrowser));
}(this, (function (exports,_angular_compiler,_angular_core,_angular_common,_angular_platformBrowser) { 'use strict';

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
var MODULE_SUFFIX = '';
var builtinExternalReferences = createBuiltinExternalReferencesMap();
var JitReflector = (function () {
    function JitReflector() {
        this.builtinExternalReferences = new Map();
        this.reflectionCapabilities = new _angular_core.ɵReflectionCapabilities();
    }
    /**
     * @param {?} type
     * @param {?} cmpMetadata
     * @return {?}
     */
    JitReflector.prototype.componentModuleUrl = /**
     * @param {?} type
     * @param {?} cmpMetadata
     * @return {?}
     */
    function (type, cmpMetadata) {
        var /** @type {?} */ moduleId = cmpMetadata.moduleId;
        if (typeof moduleId === 'string') {
            var /** @type {?} */ scheme = _angular_compiler.getUrlScheme(moduleId);
            return scheme ? moduleId : "package:" + moduleId + MODULE_SUFFIX;
        }
        else if (moduleId !== null && moduleId !== void 0) {
            throw _angular_compiler.syntaxError("moduleId should be a string in \"" + _angular_core.ɵstringify(type) + "\". See https://goo.gl/wIDDiL for more information.\n" +
                "If you're using Webpack you should inline the template and the styles, see https://goo.gl/X2J8zc.");
        }
        return "./" + _angular_core.ɵstringify(type);
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    JitReflector.prototype.parameters = /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    function (typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    JitReflector.prototype.annotations = /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    function (typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    JitReflector.prototype.propMetadata = /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    function (typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    };
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    JitReflector.prototype.hasLifecycleHook = /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    function (type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    };
    /**
     * @param {?} ref
     * @return {?}
     */
    JitReflector.prototype.resolveExternalReference = /**
     * @param {?} ref
     * @return {?}
     */
    function (ref) {
        return builtinExternalReferences.get(ref) || ref.runtime;
    };
    return JitReflector;
}());
/**
 * @return {?}
 */
function createBuiltinExternalReferencesMap() {
    var /** @type {?} */ map = new Map();
    map.set(_angular_compiler.Identifiers.ANALYZE_FOR_ENTRY_COMPONENTS, _angular_core.ANALYZE_FOR_ENTRY_COMPONENTS);
    map.set(_angular_compiler.Identifiers.ElementRef, _angular_core.ElementRef);
    map.set(_angular_compiler.Identifiers.NgModuleRef, _angular_core.NgModuleRef);
    map.set(_angular_compiler.Identifiers.ViewContainerRef, _angular_core.ViewContainerRef);
    map.set(_angular_compiler.Identifiers.ChangeDetectorRef, _angular_core.ChangeDetectorRef);
    map.set(_angular_compiler.Identifiers.QueryList, _angular_core.QueryList);
    map.set(_angular_compiler.Identifiers.TemplateRef, _angular_core.TemplateRef);
    map.set(_angular_compiler.Identifiers.CodegenComponentFactoryResolver, _angular_core.ɵCodegenComponentFactoryResolver);
    map.set(_angular_compiler.Identifiers.ComponentFactoryResolver, _angular_core.ComponentFactoryResolver);
    map.set(_angular_compiler.Identifiers.ComponentFactory, _angular_core.ComponentFactory);
    map.set(_angular_compiler.Identifiers.ComponentRef, _angular_core.ComponentRef);
    map.set(_angular_compiler.Identifiers.NgModuleFactory, _angular_core.NgModuleFactory);
    map.set(_angular_compiler.Identifiers.createModuleFactory, _angular_core.ɵcmf);
    map.set(_angular_compiler.Identifiers.moduleDef, _angular_core.ɵmod);
    map.set(_angular_compiler.Identifiers.moduleProviderDef, _angular_core.ɵmpd);
    map.set(_angular_compiler.Identifiers.RegisterModuleFactoryFn, _angular_core.ɵregisterModuleFactory);
    map.set(_angular_compiler.Identifiers.Injector, _angular_core.Injector);
    map.set(_angular_compiler.Identifiers.ViewEncapsulation, _angular_core.ViewEncapsulation);
    map.set(_angular_compiler.Identifiers.ChangeDetectionStrategy, _angular_core.ChangeDetectionStrategy);
    map.set(_angular_compiler.Identifiers.SecurityContext, _angular_core.SecurityContext);
    map.set(_angular_compiler.Identifiers.LOCALE_ID, _angular_core.LOCALE_ID);
    map.set(_angular_compiler.Identifiers.TRANSLATIONS_FORMAT, _angular_core.TRANSLATIONS_FORMAT);
    map.set(_angular_compiler.Identifiers.inlineInterpolate, _angular_core.ɵinlineInterpolate);
    map.set(_angular_compiler.Identifiers.interpolate, _angular_core.ɵinterpolate);
    map.set(_angular_compiler.Identifiers.EMPTY_ARRAY, _angular_core.ɵEMPTY_ARRAY);
    map.set(_angular_compiler.Identifiers.EMPTY_MAP, _angular_core.ɵEMPTY_MAP);
    map.set(_angular_compiler.Identifiers.Renderer, _angular_core.Renderer);
    map.set(_angular_compiler.Identifiers.viewDef, _angular_core.ɵvid);
    map.set(_angular_compiler.Identifiers.elementDef, _angular_core.ɵeld);
    map.set(_angular_compiler.Identifiers.anchorDef, _angular_core.ɵand);
    map.set(_angular_compiler.Identifiers.textDef, _angular_core.ɵted);
    map.set(_angular_compiler.Identifiers.directiveDef, _angular_core.ɵdid);
    map.set(_angular_compiler.Identifiers.providerDef, _angular_core.ɵprd);
    map.set(_angular_compiler.Identifiers.queryDef, _angular_core.ɵqud);
    map.set(_angular_compiler.Identifiers.pureArrayDef, _angular_core.ɵpad);
    map.set(_angular_compiler.Identifiers.pureObjectDef, _angular_core.ɵpod);
    map.set(_angular_compiler.Identifiers.purePipeDef, _angular_core.ɵppd);
    map.set(_angular_compiler.Identifiers.pipeDef, _angular_core.ɵpid);
    map.set(_angular_compiler.Identifiers.nodeValue, _angular_core.ɵnov);
    map.set(_angular_compiler.Identifiers.ngContentDef, _angular_core.ɵncd);
    map.set(_angular_compiler.Identifiers.unwrapValue, _angular_core.ɵunv);
    map.set(_angular_compiler.Identifiers.createRendererType2, _angular_core.ɵcrt);
    map.set(_angular_compiler.Identifiers.createComponentFactory, _angular_core.ɵccf);
    return map;
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
var ERROR_COLLECTOR_TOKEN = new _angular_core.InjectionToken('ErrorCollector');
/**
 * A default provider for {\@link PACKAGE_ROOT_URL} that maps to '/'.
 */
var DEFAULT_PACKAGE_URL_PROVIDER = {
    provide: _angular_core.PACKAGE_ROOT_URL,
    useValue: '/'
};
var _NO_RESOURCE_LOADER = {
    get: /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        throw new Error("No ResourceLoader implementation has been provided. Can't read the url \"" + url + "\"");
    }
};
var baseHtmlParser = new _angular_core.InjectionToken('HtmlParser');
var CompilerImpl = (function () {
    function CompilerImpl(injector, _metadataResolver, templateParser, styleCompiler, viewCompiler, ngModuleCompiler, summaryResolver, compileReflector, compilerConfig, console) {
        this._metadataResolver = _metadataResolver;
        this._delegate = new _angular_compiler.JitCompiler(_metadataResolver, templateParser, styleCompiler, viewCompiler, ngModuleCompiler, summaryResolver, compileReflector, compilerConfig, console, this.getExtraNgModuleProviders.bind(this));
        this.injector = injector;
    }
    /**
     * @return {?}
     */
    CompilerImpl.prototype.getExtraNgModuleProviders = /**
     * @return {?}
     */
    function () {
        return [this._metadataResolver.getProviderMetadata(new _angular_compiler.ProviderMeta(_angular_core.Compiler, { useValue: this }))];
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    CompilerImpl.prototype.compileModuleSync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return /** @type {?} */ (this._delegate.compileModuleSync(moduleType));
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    CompilerImpl.prototype.compileModuleAsync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return /** @type {?} */ (this._delegate.compileModuleAsync(moduleType));
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    CompilerImpl.prototype.compileModuleAndAllComponentsSync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        var /** @type {?} */ result = this._delegate.compileModuleAndAllComponentsSync(moduleType);
        return {
            ngModuleFactory: /** @type {?} */ (result.ngModuleFactory),
            componentFactories: /** @type {?} */ (result.componentFactories),
        };
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    CompilerImpl.prototype.compileModuleAndAllComponentsAsync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._delegate.compileModuleAndAllComponentsAsync(moduleType)
            .then(function (result) {
            return ({
                ngModuleFactory: /** @type {?} */ (result.ngModuleFactory),
                componentFactories: /** @type {?} */ (result.componentFactories),
            });
        });
    };
    /**
     * @param {?} summaries
     * @return {?}
     */
    CompilerImpl.prototype.loadAotSummaries = /**
     * @param {?} summaries
     * @return {?}
     */
    function (summaries) { this._delegate.loadAotSummaries(summaries); };
    /**
     * @param {?} ref
     * @return {?}
     */
    CompilerImpl.prototype.hasAotSummary = /**
     * @param {?} ref
     * @return {?}
     */
    function (ref) { return this._delegate.hasAotSummary(ref); };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    CompilerImpl.prototype.getComponentFactory = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        return /** @type {?} */ (this._delegate.getComponentFactory(component));
    };
    /**
     * @return {?}
     */
    CompilerImpl.prototype.clearCache = /**
     * @return {?}
     */
    function () { this._delegate.clearCache(); };
    /**
     * @param {?} type
     * @return {?}
     */
    CompilerImpl.prototype.clearCacheFor = /**
     * @param {?} type
     * @return {?}
     */
    function (type) { this._delegate.clearCacheFor(type); };
    return CompilerImpl;
}());
/**
 * A set of providers that provide `JitCompiler` and its dependencies to use for
 * template compilation.
 */
var COMPILER_PROVIDERS = /** @type {?} */ ([
    { provide: _angular_compiler.CompileReflector, useValue: new JitReflector() },
    { provide: _angular_compiler.ResourceLoader, useValue: _NO_RESOURCE_LOADER },
    { provide: _angular_compiler.JitSummaryResolver, deps: [] },
    { provide: _angular_compiler.SummaryResolver, useExisting: _angular_compiler.JitSummaryResolver },
    { provide: _angular_core.ɵConsole, deps: [] },
    { provide: _angular_compiler.Lexer, deps: [] },
    { provide: _angular_compiler.Parser, deps: [_angular_compiler.Lexer] },
    {
        provide: baseHtmlParser,
        useClass: _angular_compiler.HtmlParser,
        deps: [],
    },
    {
        provide: _angular_compiler.I18NHtmlParser,
        useFactory: function (parser, translations, format, config, console) {
            translations = translations || '';
            var /** @type {?} */ missingTranslation = translations ? /** @type {?} */ ((config.missingTranslation)) : _angular_core.MissingTranslationStrategy.Ignore;
            return new _angular_compiler.I18NHtmlParser(parser, translations, format, missingTranslation, console);
        },
        deps: [
            baseHtmlParser,
            [new _angular_core.Optional(), new _angular_core.Inject(_angular_core.TRANSLATIONS)],
            [new _angular_core.Optional(), new _angular_core.Inject(_angular_core.TRANSLATIONS_FORMAT)],
            [_angular_compiler.CompilerConfig],
            [_angular_core.ɵConsole],
        ]
    },
    {
        provide: _angular_compiler.HtmlParser,
        useExisting: _angular_compiler.I18NHtmlParser,
    },
    {
        provide: _angular_compiler.TemplateParser, deps: [_angular_compiler.CompilerConfig, _angular_compiler.CompileReflector,
            _angular_compiler.Parser, _angular_compiler.ElementSchemaRegistry,
            _angular_compiler.I18NHtmlParser, _angular_core.ɵConsole]
    },
    { provide: _angular_compiler.DirectiveNormalizer, deps: [_angular_compiler.ResourceLoader, _angular_compiler.UrlResolver, _angular_compiler.HtmlParser, _angular_compiler.CompilerConfig] },
    { provide: _angular_compiler.CompileMetadataResolver, deps: [_angular_compiler.CompilerConfig, _angular_compiler.HtmlParser, _angular_compiler.NgModuleResolver,
            _angular_compiler.DirectiveResolver, _angular_compiler.PipeResolver,
            _angular_compiler.SummaryResolver,
            _angular_compiler.ElementSchemaRegistry,
            _angular_compiler.DirectiveNormalizer, _angular_core.ɵConsole,
            [_angular_core.Optional, _angular_compiler.StaticSymbolCache],
            _angular_compiler.CompileReflector,
            [_angular_core.Optional, ERROR_COLLECTOR_TOKEN]] },
    DEFAULT_PACKAGE_URL_PROVIDER,
    { provide: _angular_compiler.StyleCompiler, deps: [_angular_compiler.UrlResolver] },
    { provide: _angular_compiler.ViewCompiler, deps: [_angular_compiler.CompileReflector] },
    { provide: _angular_compiler.NgModuleCompiler, deps: [_angular_compiler.CompileReflector] },
    { provide: _angular_compiler.CompilerConfig, useValue: new _angular_compiler.CompilerConfig() },
    { provide: _angular_core.Compiler, useClass: CompilerImpl, deps: [_angular_core.Injector, _angular_compiler.CompileMetadataResolver,
            _angular_compiler.TemplateParser, _angular_compiler.StyleCompiler,
            _angular_compiler.ViewCompiler, _angular_compiler.NgModuleCompiler,
            _angular_compiler.SummaryResolver, _angular_compiler.CompileReflector, _angular_compiler.CompilerConfig,
            _angular_core.ɵConsole] },
    { provide: _angular_compiler.DomElementSchemaRegistry, deps: [] },
    { provide: _angular_compiler.ElementSchemaRegistry, useExisting: _angular_compiler.DomElementSchemaRegistry },
    { provide: _angular_compiler.UrlResolver, deps: [_angular_core.PACKAGE_ROOT_URL] },
    { provide: _angular_compiler.DirectiveResolver, deps: [_angular_compiler.CompileReflector] },
    { provide: _angular_compiler.PipeResolver, deps: [_angular_compiler.CompileReflector] },
    { provide: _angular_compiler.NgModuleResolver, deps: [_angular_compiler.CompileReflector] },
]);
var JitCompilerFactory = (function () {
    function JitCompilerFactory(defaultOptions) {
        var /** @type {?} */ compilerOptions = {
            useJit: true,
            defaultEncapsulation: _angular_core.ViewEncapsulation.Emulated,
            missingTranslation: _angular_core.MissingTranslationStrategy.Warning,
            enableLegacyTemplate: false,
        };
        this._defaultOptions = [compilerOptions].concat(defaultOptions);
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    JitCompilerFactory.prototype.createCompiler = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = []; }
        var /** @type {?} */ opts = _mergeOptions(this._defaultOptions.concat(options));
        var /** @type {?} */ injector = _angular_core.Injector.create([
            COMPILER_PROVIDERS, {
                provide: _angular_compiler.CompilerConfig,
                useFactory: function () {
                    return new _angular_compiler.CompilerConfig({
                        // let explicit values from the compiler options overwrite options
                        // from the app providers
                        useJit: opts.useJit,
                        jitDevMode: _angular_core.isDevMode(),
                        // let explicit values from the compiler options overwrite options
                        // from the app providers
                        defaultEncapsulation: opts.defaultEncapsulation,
                        missingTranslation: opts.missingTranslation,
                        enableLegacyTemplate: opts.enableLegacyTemplate,
                        preserveWhitespaces: opts.preserveWhitespaces,
                    });
                },
                deps: []
            },
            /** @type {?} */ ((opts.providers))
        ]);
        return injector.get(_angular_core.Compiler);
    };
    return JitCompilerFactory;
}());
/**
 * @param {?} optionsArr
 * @return {?}
 */
function _mergeOptions(optionsArr) {
    return {
        useJit: _lastDefined(optionsArr.map(function (options) { return options.useJit; })),
        defaultEncapsulation: _lastDefined(optionsArr.map(function (options) { return options.defaultEncapsulation; })),
        providers: _mergeArrays(optionsArr.map(function (options) { return /** @type {?} */ ((options.providers)); })),
        missingTranslation: _lastDefined(optionsArr.map(function (options) { return options.missingTranslation; })),
        enableLegacyTemplate: _lastDefined(optionsArr.map(function (options) { return options.enableLegacyTemplate; })),
        preserveWhitespaces: _lastDefined(optionsArr.map(function (options) { return options.preserveWhitespaces; })),
    };
}
/**
 * @template T
 * @param {?} args
 * @return {?}
 */
function _lastDefined(args) {
    for (var /** @type {?} */ i = args.length - 1; i >= 0; i--) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
    return undefined;
}
/**
 * @param {?} parts
 * @return {?}
 */
function _mergeArrays(parts) {
    var /** @type {?} */ result = [];
    parts.forEach(function (part) { return part && result.push.apply(result, part); });
    return result;
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
/**
 * A platform that included corePlatform and the compiler.
 *
 * \@experimental
 */
var platformCoreDynamic = _angular_core.createPlatformFactory(_angular_core.platformCore, 'coreDynamic', [
    { provide: _angular_core.COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: _angular_core.CompilerFactory, useClass: JitCompilerFactory, deps: [_angular_core.COMPILER_OPTIONS] },
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
var ResourceLoaderImpl = (function (_super) {
    __extends(ResourceLoaderImpl, _super);
    function ResourceLoaderImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    ResourceLoaderImpl.prototype.get = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var /** @type {?} */ resolve;
        var /** @type {?} */ reject;
        var /** @type {?} */ promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        var /** @type {?} */ xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'text';
        xhr.onload = function () {
            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
            // response/responseType properties were introduced in ResourceLoader Level2 spec (supported
            // by IE10)
            var /** @type {?} */ response = xhr.response || xhr.responseText;
            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
            var /** @type {?} */ status = xhr.status === 1223 ? 204 : xhr.status;
            // fix status code when it is 0 (0 status is undocumented).
            // Occurs when accessing file resources or on Android 4.1 stock browser
            // while retrieving files from application cache.
            if (status === 0) {
                status = response ? 200 : 0;
            }
            if (200 <= status && status <= 300) {
                resolve(response);
            }
            else {
                reject("Failed to load " + url);
            }
        };
        xhr.onerror = function () { reject("Failed to load " + url); };
        xhr.send();
        return promise;
    };
    ResourceLoaderImpl.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ResourceLoaderImpl.ctorParameters = function () { return []; };
    return ResourceLoaderImpl;
}(_angular_compiler.ResourceLoader));

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
var INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
    _angular_platformBrowser.ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS,
    {
        provide: _angular_core.COMPILER_OPTIONS,
        useValue: { providers: [{ provide: _angular_compiler.ResourceLoader, useClass: ResourceLoaderImpl, deps: [] }] },
        multi: true
    },
    { provide: _angular_core.PLATFORM_ID, useValue: _angular_common.ɵPLATFORM_BROWSER_ID },
];

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
 * An implementation of ResourceLoader that uses a template cache to avoid doing an actual
 * ResourceLoader.
 *
 * The template cache needs to be built and loaded into window.$templateCache
 * via a separate mechanism.
 */
var CachedResourceLoader = (function (_super) {
    __extends(CachedResourceLoader, _super);
    function CachedResourceLoader() {
        var _this = _super.call(this) || this;
        _this._cache = (/** @type {?} */ (_angular_core.ɵglobal)).$templateCache;
        if (_this._cache == null) {
            throw new Error('CachedResourceLoader: Template cache was not found in $templateCache.');
        }
        return _this;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    CachedResourceLoader.prototype.get = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (this._cache.hasOwnProperty(url)) {
            return Promise.resolve(this._cache[url]);
        }
        else {
            return /** @type {?} */ (Promise.reject('CachedResourceLoader: Did not find cached template for ' + url));
        }
    };
    return CachedResourceLoader;
}(_angular_compiler.ResourceLoader));

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
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
/**
 * \@stable
 */
var VERSION = new _angular_core.Version('5.0.2');

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
 * \@experimental
 */
var RESOURCE_CACHE_PROVIDER = [{ provide: _angular_compiler.ResourceLoader, useClass: CachedResourceLoader, deps: [] }];
/**
 * \@stable
 */
var platformBrowserDynamic = _angular_core.createPlatformFactory(platformCoreDynamic, 'browserDynamic', INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);

exports.VERSION = VERSION;
exports.RESOURCE_CACHE_PROVIDER = RESOURCE_CACHE_PROVIDER;
exports.platformBrowserDynamic = platformBrowserDynamic;
exports.ɵCompilerImpl = CompilerImpl;
exports.ɵplatformCoreDynamic = platformCoreDynamic;
exports.ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS;
exports.ɵResourceLoaderImpl = ResourceLoaderImpl;
exports.ɵa = JitCompilerFactory;
exports.ɵb = CachedResourceLoader;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-browser-dynamic.umd.js.map
