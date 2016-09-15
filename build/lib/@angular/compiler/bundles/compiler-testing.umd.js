/**
 * @license Angular v2.0.0
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/compiler'), require('@angular/core/testing')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/compiler', '@angular/core/testing'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.compiler = global.ng.compiler || {}, global.ng.compiler.testing = global.ng.compiler.testing || {}),global.ng.core,global.ng.compiler,global.ng.core.testing));
}(this, function (exports,_angular_core,_angular_compiler,_angular_core_testing) { 'use strict';

    var MockSchemaRegistry = (function () {
        function MockSchemaRegistry(existingProperties, attrPropMapping, existingElements) {
            this.existingProperties = existingProperties;
            this.attrPropMapping = attrPropMapping;
            this.existingElements = existingElements;
        }
        MockSchemaRegistry.prototype.hasProperty = function (tagName, property, schemas) {
            var value = this.existingProperties[property];
            return value === void 0 ? true : value;
        };
        MockSchemaRegistry.prototype.hasElement = function (tagName, schemaMetas) {
            var value = this.existingElements[tagName.toLowerCase()];
            return value === void 0 ? true : value;
        };
        MockSchemaRegistry.prototype.securityContext = function (tagName, property) {
            return _angular_core.SecurityContext.NONE;
        };
        MockSchemaRegistry.prototype.getMappedPropName = function (attrName) { return this.attrPropMapping[attrName] || attrName; };
        MockSchemaRegistry.prototype.getDefaultComponentElementName = function () { return 'ng-component'; };
        return MockSchemaRegistry;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var globalScope;
    if (typeof window === 'undefined') {
        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
            globalScope = self;
        }
        else {
            globalScope = global;
        }
    }
    else {
        globalScope = window;
    }
    // Need to declare a new variable for global here since TypeScript
    // exports the original value of the symbol.
    var _global = globalScope;
    // TODO: remove calls to assert in production environment
    // Note: Can't just export this and import in in other files
    // as `assert` is a reserved keyword in Dart
    _global.assert = function assert(condition) {
        // TODO: to be fixed properly via #2830, noop for now
    };
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    function isArray(obj) {
        return Array.isArray(obj);
    }
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token === undefined || token === null) {
            return '' + token;
        }
        if (token.overriddenName) {
            return token.overriddenName;
        }
        if (token.name) {
            return token.name;
        }
        var res = token.toString();
        var newLineIndex = res.indexOf('\n');
        return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
    }
    var NumberWrapper = (function () {
        function NumberWrapper() {
        }
        NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
        NumberWrapper.equal = function (a, b) { return a === b; };
        NumberWrapper.parseIntAutoRadix = function (text) {
            var result = parseInt(text);
            if (isNaN(result)) {
                throw new Error('Invalid integer literal when parsing ' + text);
            }
            return result;
        };
        NumberWrapper.parseInt = function (text, radix) {
            if (radix == 10) {
                if (/^(\-|\+)?[0-9]+$/.test(text)) {
                    return parseInt(text, radix);
                }
            }
            else if (radix == 16) {
                if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                    return parseInt(text, radix);
                }
            }
            else {
                var result = parseInt(text, radix);
                if (!isNaN(result)) {
                    return result;
                }
            }
            throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
        };
        Object.defineProperty(NumberWrapper, "NaN", {
            get: function () { return NaN; },
            enumerable: true,
            configurable: true
        });
        NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
        NumberWrapper.isNaN = function (value) { return isNaN(value); };
        NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
        return NumberWrapper;
    }());

    var Map$1 = _global.Map;
    var Set$1 = _global.Set;
    // Safari and Internet Explorer do not support the iterable parameter to the
    // Map constructor.  We work around that by manually adding the items.
    var createMapFromPairs = (function () {
        try {
            if (new Map$1([[1, 2]]).size === 1) {
                return function createMapFromPairs(pairs) { return new Map$1(pairs); };
            }
        }
        catch (e) {
        }
        return function createMapAndPopulateFromPairs(pairs) {
            var map = new Map$1();
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                map.set(pair[0], pair[1]);
            }
            return map;
        };
    })();
    var createMapFromMap = (function () {
        try {
            if (new Map$1(new Map$1())) {
                return function createMapFromMap(m) { return new Map$1(m); };
            }
        }
        catch (e) {
        }
        return function createMapAndPopulateFromMap(m) {
            var map = new Map$1();
            m.forEach(function (v, k) { map.set(k, v); });
            return map;
        };
    })();
    var _clearValues = (function () {
        if ((new Map$1()).keys().next) {
            return function _clearValues(m) {
                var keyIterator = m.keys();
                var k;
                while (!((k = keyIterator.next()).done)) {
                    m.set(k.value, null);
                }
            };
        }
        else {
            return function _clearValuesWithForeEach(m) {
                m.forEach(function (v, k) { m.set(k, null); });
            };
        }
    })();
    // Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
    // TODO(mlaval): remove the work around once we have a working polyfill of Array.from
    var _arrayFromMap = (function () {
        try {
            if ((new Map$1()).values().next) {
                return function createArrayFromMap(m, getValues) {
                    return getValues ? Array.from(m.values()) : Array.from(m.keys());
                };
            }
        }
        catch (e) {
        }
        return function createArrayFromMapWithForeach(m, getValues) {
            var res = ListWrapper.createFixedSize(m.size), i = 0;
            m.forEach(function (v, k) {
                res[i] = getValues ? v : k;
                i++;
            });
            return res;
        };
    })();
    var ListWrapper = (function () {
        function ListWrapper() {
        }
        // JS has no way to express a statically fixed size list, but dart does so we
        // keep both methods.
        ListWrapper.createFixedSize = function (size) { return new Array(size); };
        ListWrapper.createGrowableSize = function (size) { return new Array(size); };
        ListWrapper.clone = function (array) { return array.slice(0); };
        ListWrapper.forEachWithIndex = function (array, fn) {
            for (var i = 0; i < array.length; i++) {
                fn(array[i], i);
            }
        };
        ListWrapper.first = function (array) {
            if (!array)
                return null;
            return array[0];
        };
        ListWrapper.last = function (array) {
            if (!array || array.length == 0)
                return null;
            return array[array.length - 1];
        };
        ListWrapper.indexOf = function (array, value, startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            return array.indexOf(value, startIndex);
        };
        ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
        ListWrapper.reversed = function (array) {
            var a = ListWrapper.clone(array);
            return a.reverse();
        };
        ListWrapper.concat = function (a, b) { return a.concat(b); };
        ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
        ListWrapper.removeAt = function (list, index) {
            var res = list[index];
            list.splice(index, 1);
            return res;
        };
        ListWrapper.removeAll = function (list, items) {
            for (var i = 0; i < items.length; ++i) {
                var index = list.indexOf(items[i]);
                list.splice(index, 1);
            }
        };
        ListWrapper.remove = function (list, el) {
            var index = list.indexOf(el);
            if (index > -1) {
                list.splice(index, 1);
                return true;
            }
            return false;
        };
        ListWrapper.clear = function (list) { list.length = 0; };
        ListWrapper.isEmpty = function (list) { return list.length == 0; };
        ListWrapper.fill = function (list, value, start, end) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = null; }
            list.fill(value, start, end === null ? list.length : end);
        };
        ListWrapper.equals = function (a, b) {
            if (a.length != b.length)
                return false;
            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i])
                    return false;
            }
            return true;
        };
        ListWrapper.slice = function (l, from, to) {
            if (from === void 0) { from = 0; }
            if (to === void 0) { to = null; }
            return l.slice(from, to === null ? undefined : to);
        };
        ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
        ListWrapper.sort = function (l, compareFn) {
            if (isPresent(compareFn)) {
                l.sort(compareFn);
            }
            else {
                l.sort();
            }
        };
        ListWrapper.toString = function (l) { return l.toString(); };
        ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
        ListWrapper.maximum = function (list, predicate) {
            if (list.length == 0) {
                return null;
            }
            var solution = null;
            var maxValue = -Infinity;
            for (var index = 0; index < list.length; index++) {
                var candidate = list[index];
                if (isBlank(candidate)) {
                    continue;
                }
                var candidateValue = predicate(candidate);
                if (candidateValue > maxValue) {
                    solution = candidate;
                    maxValue = candidateValue;
                }
            }
            return solution;
        };
        ListWrapper.flatten = function (list) {
            var target = [];
            _flattenArray(list, target);
            return target;
        };
        ListWrapper.addAll = function (list, source) {
            for (var i = 0; i < source.length; i++) {
                list.push(source[i]);
            }
        };
        return ListWrapper;
    }());
    function _flattenArray(source, target) {
        if (isPresent(source)) {
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                if (isArray(item)) {
                    _flattenArray(item, target);
                }
                else {
                    target.push(item);
                }
            }
        }
        return target;
    }
    // Safari and Internet Explorer do not support the iterable parameter to the
    // Set constructor.  We work around that by manually adding the items.
    var createSetFromList = (function () {
        var test = new Set$1([1, 2, 3]);
        if (test.size === 3) {
            return function createSetFromList(lst) { return new Set$1(lst); };
        }
        else {
            return function createSetAndPopulateFromList(lst) {
                var res = new Set$1(lst);
                if (res.size !== lst.length) {
                    for (var i = 0; i < lst.length; i++) {
                        res.add(lst[i]);
                    }
                }
                return res;
            };
        }
    })();

    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * An implementation of {@link DirectiveResolver} that allows overriding
     * various properties of directives.
     */
    var MockDirectiveResolver = (function (_super) {
        __extends(MockDirectiveResolver, _super);
        function MockDirectiveResolver(_injector) {
            _super.call(this);
            this._injector = _injector;
            this._directives = new Map$1();
            this._providerOverrides = new Map$1();
            this._viewProviderOverrides = new Map$1();
            this._views = new Map$1();
            this._inlineTemplates = new Map$1();
            this._animations = new Map$1();
        }
        Object.defineProperty(MockDirectiveResolver.prototype, "_compiler", {
            get: function () { return this._injector.get(_angular_core.Compiler); },
            enumerable: true,
            configurable: true
        });
        MockDirectiveResolver.prototype._clearCacheFor = function (component) { this._compiler.clearCacheFor(component); };
        MockDirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
            if (throwIfNotFound === void 0) { throwIfNotFound = true; }
            var metadata = this._directives.get(type);
            if (!metadata) {
                metadata = _super.prototype.resolve.call(this, type, throwIfNotFound);
            }
            if (!metadata) {
                return null;
            }
            var providerOverrides = this._providerOverrides.get(type);
            var viewProviderOverrides = this._viewProviderOverrides.get(type);
            var providers = metadata.providers;
            if (isPresent(providerOverrides)) {
                var originalViewProviders = isPresent(metadata.providers) ? metadata.providers : [];
                providers = originalViewProviders.concat(providerOverrides);
            }
            if (metadata instanceof _angular_core.Component) {
                var viewProviders = metadata.viewProviders;
                if (isPresent(viewProviderOverrides)) {
                    var originalViewProviders = isPresent(metadata.viewProviders) ? metadata.viewProviders : [];
                    viewProviders = originalViewProviders.concat(viewProviderOverrides);
                }
                var view = this._views.get(type);
                if (!view) {
                    view = metadata;
                }
                var animations = view.animations;
                var templateUrl = view.templateUrl;
                var inlineAnimations = this._animations.get(type);
                if (isPresent(inlineAnimations)) {
                    animations = inlineAnimations;
                }
                var inlineTemplate = this._inlineTemplates.get(type);
                if (isPresent(inlineTemplate)) {
                    templateUrl = null;
                }
                else {
                    inlineTemplate = view.template;
                }
                return new _angular_core.Component({
                    selector: metadata.selector,
                    inputs: metadata.inputs,
                    outputs: metadata.outputs,
                    host: metadata.host,
                    exportAs: metadata.exportAs,
                    moduleId: metadata.moduleId,
                    queries: metadata.queries,
                    changeDetection: metadata.changeDetection,
                    providers: providers,
                    viewProviders: viewProviders,
                    entryComponents: metadata.entryComponents,
                    template: inlineTemplate,
                    templateUrl: templateUrl,
                    animations: animations,
                    styles: view.styles,
                    styleUrls: view.styleUrls,
                    encapsulation: view.encapsulation,
                    interpolation: view.interpolation
                });
            }
            return new _angular_core.Directive({
                selector: metadata.selector,
                inputs: metadata.inputs,
                outputs: metadata.outputs,
                host: metadata.host,
                providers: providers,
                exportAs: metadata.exportAs,
                queries: metadata.queries
            });
        };
        /**
         * Overrides the {@link Directive} for a directive.
         */
        MockDirectiveResolver.prototype.setDirective = function (type, metadata) {
            this._directives.set(type, metadata);
            this._clearCacheFor(type);
        };
        MockDirectiveResolver.prototype.setProvidersOverride = function (type, providers) {
            this._providerOverrides.set(type, providers);
            this._clearCacheFor(type);
        };
        MockDirectiveResolver.prototype.setViewProvidersOverride = function (type, viewProviders) {
            this._viewProviderOverrides.set(type, viewProviders);
            this._clearCacheFor(type);
        };
        /**
         * Overrides the {@link ViewMetadata} for a component.
         */
        MockDirectiveResolver.prototype.setView = function (component, view) {
            this._views.set(component, view);
            this._clearCacheFor(component);
        };
        /**
         * Overrides the inline template for a component - other configuration remains unchanged.
         */
        MockDirectiveResolver.prototype.setInlineTemplate = function (component, template) {
            this._inlineTemplates.set(component, template);
            this._clearCacheFor(component);
        };
        MockDirectiveResolver.prototype.setAnimations = function (component, animations) {
            this._animations.set(component, animations);
            this._clearCacheFor(component);
        };
        MockDirectiveResolver.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        MockDirectiveResolver.ctorParameters = [
            { type: _angular_core.Injector, },
        ];
        return MockDirectiveResolver;
    }(_angular_compiler.DirectiveResolver));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$1 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var MockNgModuleResolver = (function (_super) {
        __extends$1(MockNgModuleResolver, _super);
        function MockNgModuleResolver(_injector) {
            _super.call(this);
            this._injector = _injector;
            this._ngModules = new Map$1();
        }
        Object.defineProperty(MockNgModuleResolver.prototype, "_compiler", {
            get: function () { return this._injector.get(_angular_core.Compiler); },
            enumerable: true,
            configurable: true
        });
        MockNgModuleResolver.prototype._clearCacheFor = function (component) { this._compiler.clearCacheFor(component); };
        /**
         * Overrides the {@link NgModule} for a module.
         */
        MockNgModuleResolver.prototype.setNgModule = function (type, metadata) {
            this._ngModules.set(type, metadata);
            this._clearCacheFor(type);
        };
        /**
         * Returns the {@link NgModule} for a module:
         * - Set the {@link NgModule} to the overridden view when it exists or fallback to the
         * default
         * `NgModuleResolver`, see `setNgModule`.
         */
        MockNgModuleResolver.prototype.resolve = function (type, throwIfNotFound) {
            if (throwIfNotFound === void 0) { throwIfNotFound = true; }
            var metadata = this._ngModules.get(type);
            if (!metadata) {
                metadata = _super.prototype.resolve.call(this, type, throwIfNotFound);
            }
            return metadata;
        };
        MockNgModuleResolver.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        MockNgModuleResolver.ctorParameters = [
            { type: _angular_core.Injector, },
        ];
        return MockNgModuleResolver;
    }(_angular_compiler.NgModuleResolver));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$2 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var MockPipeResolver = (function (_super) {
        __extends$2(MockPipeResolver, _super);
        function MockPipeResolver(_injector) {
            _super.call(this);
            this._injector = _injector;
            this._pipes = new Map$1();
        }
        Object.defineProperty(MockPipeResolver.prototype, "_compiler", {
            get: function () { return this._injector.get(_angular_core.Compiler); },
            enumerable: true,
            configurable: true
        });
        MockPipeResolver.prototype._clearCacheFor = function (pipe) { this._compiler.clearCacheFor(pipe); };
        /**
         * Overrides the {@link Pipe} for a pipe.
         */
        MockPipeResolver.prototype.setPipe = function (type, metadata) {
            this._pipes.set(type, metadata);
            this._clearCacheFor(type);
        };
        /**
         * Returns the {@link Pipe} for a pipe:
         * - Set the {@link Pipe} to the overridden view when it exists or fallback to the
         * default
         * `PipeResolver`, see `setPipe`.
         */
        MockPipeResolver.prototype.resolve = function (type, throwIfNotFound) {
            if (throwIfNotFound === void 0) { throwIfNotFound = true; }
            var metadata = this._pipes.get(type);
            if (!metadata) {
                metadata = _super.prototype.resolve.call(this, type, throwIfNotFound);
            }
            return metadata;
        };
        MockPipeResolver.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        MockPipeResolver.ctorParameters = [
            { type: _angular_core.Injector, },
        ];
        return MockPipeResolver;
    }(_angular_compiler.PipeResolver));

    var TestingCompilerFactory = _angular_core_testing.__core_private_testing__.TestingCompilerFactory;

    var _nextReferenceId = 0;
    var MetadataOverrider = (function () {
        function MetadataOverrider() {
            this._references = new Map();
        }
        /**
         * Creates a new instance for the given metadata class
         * based on an old instance and overrides.
         */
        MetadataOverrider.prototype.overrideMetadata = function (metadataClass, oldMetadata, override) {
            var props = {};
            if (oldMetadata) {
                _valueProps(oldMetadata).forEach(function (prop) { return props[prop] = oldMetadata[prop]; });
            }
            if (override.set) {
                if (override.remove || override.add) {
                    throw new Error("Cannot set and add/remove " + stringify(metadataClass) + " at the same time!");
                }
                setMetadata(props, override.set);
            }
            if (override.remove) {
                removeMetadata(props, override.remove, this._references);
            }
            if (override.add) {
                addMetadata(props, override.add);
            }
            return new metadataClass(props);
        };
        return MetadataOverrider;
    }());
    function removeMetadata(metadata, remove, references) {
        var removeObjects = new Set();
        var _loop_1 = function(prop) {
            var removeValue = remove[prop];
            if (removeValue instanceof Array) {
                removeValue.forEach(function (value) { removeObjects.add(_propHashKey(prop, value, references)); });
            }
            else {
                removeObjects.add(_propHashKey(prop, removeValue, references));
            }
        };
        for (var prop in remove) {
            _loop_1(prop);
        }
        var _loop_2 = function(prop) {
            var propValue = metadata[prop];
            if (propValue instanceof Array) {
                metadata[prop] = propValue.filter(function (value) { return !removeObjects.has(_propHashKey(prop, value, references)); });
            }
            else {
                if (removeObjects.has(_propHashKey(prop, propValue, references))) {
                    metadata[prop] = undefined;
                }
            }
        };
        for (var prop in metadata) {
            _loop_2(prop);
        }
    }
    function addMetadata(metadata, add) {
        for (var prop in add) {
            var addValue = add[prop];
            var propValue = metadata[prop];
            if (propValue != null && propValue instanceof Array) {
                metadata[prop] = propValue.concat(addValue);
            }
            else {
                metadata[prop] = addValue;
            }
        }
    }
    function setMetadata(metadata, set) {
        for (var prop in set) {
            metadata[prop] = set[prop];
        }
    }
    function _propHashKey(propName, propValue, references) {
        var replacer = function (key, value) {
            if (typeof value === 'function') {
                value = _serializeReference(value, references);
            }
            return value;
        };
        return propName + ":" + JSON.stringify(propValue, replacer);
    }
    function _serializeReference(ref, references) {
        var id = references.get(ref);
        if (!id) {
            id = "" + stringify(ref) + _nextReferenceId++;
            references.set(ref, id);
        }
        return id;
    }
    function _valueProps(obj) {
        var props = [];
        // regular public props
        Object.keys(obj).forEach(function (prop) {
            if (!prop.startsWith('_')) {
                props.push(prop);
            }
        });
        // getters
        var proto = obj;
        while (proto = Object.getPrototypeOf(proto)) {
            Object.keys(proto).forEach(function (protoProp) {
                var desc = Object.getOwnPropertyDescriptor(proto, protoProp);
                if (!protoProp.startsWith('_') && desc && 'get' in desc) {
                    props.push(protoProp);
                }
            });
        }
        return props;
    }

    var TestingCompilerFactoryImpl = (function () {
        function TestingCompilerFactoryImpl(_compilerFactory) {
            this._compilerFactory = _compilerFactory;
        }
        TestingCompilerFactoryImpl.prototype.createTestingCompiler = function (options) {
            var compiler = this._compilerFactory.createCompiler(options);
            return new TestingCompilerImpl(compiler, compiler.injector.get(MockDirectiveResolver), compiler.injector.get(MockPipeResolver), compiler.injector.get(MockNgModuleResolver));
        };
        TestingCompilerFactoryImpl.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        TestingCompilerFactoryImpl.ctorParameters = [
            { type: _angular_core.CompilerFactory, },
        ];
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
            get: function () { return this._compiler.injector; },
            enumerable: true,
            configurable: true
        });
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
            this._moduleResolver.setNgModule(ngModule, this._overrider.overrideMetadata(_angular_core.NgModule, oldMetadata, override));
        };
        TestingCompilerImpl.prototype.overrideDirective = function (directive, override) {
            var oldMetadata = this._directiveResolver.resolve(directive, false);
            this._directiveResolver.setDirective(directive, this._overrider.overrideMetadata(_angular_core.Directive, oldMetadata, override));
        };
        TestingCompilerImpl.prototype.overrideComponent = function (component, override) {
            var oldMetadata = this._directiveResolver.resolve(component, false);
            this._directiveResolver.setDirective(component, this._overrider.overrideMetadata(_angular_core.Component, oldMetadata, override));
        };
        TestingCompilerImpl.prototype.overridePipe = function (pipe, override) {
            var oldMetadata = this._pipeResolver.resolve(pipe, false);
            this._pipeResolver.setPipe(pipe, this._overrider.overrideMetadata(_angular_core.Pipe, oldMetadata, override));
        };
        TestingCompilerImpl.prototype.clearCache = function () { this._compiler.clearCache(); };
        TestingCompilerImpl.prototype.clearCacheFor = function (type) { this._compiler.clearCacheFor(type); };
        return TestingCompilerImpl;
    }());
    /**
     * Platform for dynamic tests
     *
     * @experimental
     */
    var platformCoreDynamicTesting = _angular_core.createPlatformFactory(_angular_compiler.platformCoreDynamic, 'coreDynamicTesting', [
        {
            provide: _angular_core.COMPILER_OPTIONS,
            useValue: {
                providers: [
                    MockPipeResolver, { provide: _angular_compiler.PipeResolver, useExisting: MockPipeResolver },
                    MockDirectiveResolver, { provide: _angular_compiler.DirectiveResolver, useExisting: MockDirectiveResolver },
                    MockNgModuleResolver, { provide: _angular_compiler.NgModuleResolver, useExisting: MockNgModuleResolver }
                ]
            },
            multi: true
        },
        { provide: TestingCompilerFactory, useClass: TestingCompilerFactoryImpl }
    ]);

    exports.TestingCompilerFactoryImpl = TestingCompilerFactoryImpl;
    exports.TestingCompilerImpl = TestingCompilerImpl;
    exports.platformCoreDynamicTesting = platformCoreDynamicTesting;
    exports.MockSchemaRegistry = MockSchemaRegistry;
    exports.MockDirectiveResolver = MockDirectiveResolver;
    exports.MockNgModuleResolver = MockNgModuleResolver;
    exports.MockPipeResolver = MockPipeResolver;

}));
