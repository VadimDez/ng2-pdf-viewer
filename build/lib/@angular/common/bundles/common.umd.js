/**
 * @license Angular v2.0.0-rc.6
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.common = global.ng.common || {}),global.ng.core));
}(this, function (exports,_angular_core) { 'use strict';

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
    var global$1 = globalScope;
    function getTypeNameForDebugging(type) {
        if (type['name']) {
            return type['name'];
        }
        return typeof type;
    }
    var Date = global$1.Date;
    // TODO: remove calls to assert in production environment
    // Note: Can't just export this and import in in other files
    // as `assert` is a reserved keyword in Dart
    global$1.assert = function assert(condition) {
        // TODO: to be fixed properly via #2830, noop for now
    };
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    function isNumber(obj) {
        return typeof obj === 'number';
    }
    function isString(obj) {
        return typeof obj === 'string';
    }
    function isFunction(obj) {
        return typeof obj === 'function';
    }
    function isStringMap(obj) {
        return typeof obj === 'object' && obj !== null;
    }
    function isPromise(obj) {
        // allow any Promise/A+ compliant thenable.
        // It's up to the caller to ensure that obj.then conforms to the spec
        return isPresent(obj) && isFunction(obj.then);
    }
    function isArray(obj) {
        return Array.isArray(obj);
    }
    function isDate(obj) {
        return obj instanceof Date && !isNaN(obj.valueOf());
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
    var StringWrapper = (function () {
        function StringWrapper() {
        }
        StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
        StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
        StringWrapper.split = function (s, regExp) { return s.split(regExp); };
        StringWrapper.equals = function (s, s2) { return s === s2; };
        StringWrapper.stripLeft = function (s, charVal) {
            if (s && s.length) {
                var pos = 0;
                for (var i = 0; i < s.length; i++) {
                    if (s[i] != charVal)
                        break;
                    pos++;
                }
                s = s.substring(pos);
            }
            return s;
        };
        StringWrapper.stripRight = function (s, charVal) {
            if (s && s.length) {
                var pos = s.length;
                for (var i = s.length - 1; i >= 0; i--) {
                    if (s[i] != charVal)
                        break;
                    pos--;
                }
                s = s.substring(0, pos);
            }
            return s;
        };
        StringWrapper.replace = function (s, from, replace) {
            return s.replace(from, replace);
        };
        StringWrapper.replaceAll = function (s, from, replace) {
            return s.replace(from, replace);
        };
        StringWrapper.slice = function (s, from, to) {
            if (from === void 0) { from = 0; }
            if (to === void 0) { to = null; }
            return s.slice(from, to === null ? undefined : to);
        };
        StringWrapper.replaceAllMapped = function (s, from, cb) {
            return s.replace(from, function () {
                var matches = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    matches[_i - 0] = arguments[_i];
                }
                // Remove offset & string from the result array
                matches.splice(-2, 2);
                // The callback receives match, p1, ..., pn
                return cb(matches);
            });
        };
        StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
        StringWrapper.compare = function (a, b) {
            if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return 0;
            }
        };
        return StringWrapper;
    }());
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
        // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
        NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
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
    function normalizeBlank(obj) {
        return isBlank(obj) ? null : obj;
    }
    function isJsObject(o) {
        return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    // Can't be all uppercase as our transpiler would think it is a special directive...
    var Json = (function () {
        function Json() {
        }
        Json.parse = function (s) { return global$1.JSON.parse(s); };
        Json.stringify = function (data) {
            // Dart doesn't take 3 arguments
            return global$1.JSON.stringify(data, null, 2);
        };
        return Json;
    }());
    var DateWrapper = (function () {
        function DateWrapper() {
        }
        DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
            if (month === void 0) { month = 1; }
            if (day === void 0) { day = 1; }
            if (hour === void 0) { hour = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            if (milliseconds === void 0) { milliseconds = 0; }
            return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
        };
        DateWrapper.fromISOString = function (str) { return new Date(str); };
        DateWrapper.fromMillis = function (ms) { return new Date(ms); };
        DateWrapper.toMillis = function (date) { return date.getTime(); };
        DateWrapper.now = function () { return new Date(); };
        DateWrapper.toJson = function (date) { return date.toJSON(); };
        return DateWrapper;
    }());
    var _symbolIterator = null;
    function getSymbolIterator() {
        if (isBlank(_symbolIterator)) {
            if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
                _symbolIterator = Symbol.iterator;
            }
            else {
                // es6-shim specific logic
                var keys = Object.getOwnPropertyNames(Map.prototype);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (key !== 'entries' && key !== 'size' &&
                        Map.prototype[key] === Map.prototype['entries']) {
                        _symbolIterator = key;
                    }
                }
            }
        }
        return _symbolIterator;
    }

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
    /**
     * @stable
     */
    var BaseError = (function (_super) {
        __extends$1(BaseError, _super);
        function BaseError(message) {
            // Errors don't use current this, instead they create a new instance.
            // We have to do forward all of our api to the nativeInstance.
            var nativeError = _super.call(this, message);
            this._nativeError = nativeError;
        }
        Object.defineProperty(BaseError.prototype, "message", {
            get: function () { return this._nativeError.message; },
            set: function (message) { this._nativeError.message = message; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseError.prototype, "name", {
            get: function () { return this._nativeError.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseError.prototype, "stack", {
            get: function () { return this._nativeError.stack; },
            set: function (value) { this._nativeError.stack = value; },
            enumerable: true,
            configurable: true
        });
        BaseError.prototype.toString = function () { return this._nativeError.toString(); };
        return BaseError;
    }(Error));
    /**
     * @stable
     */
    var WrappedError = (function (_super) {
        __extends$1(WrappedError, _super);
        function WrappedError(message, error) {
            _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
            this.originalError = error;
        }
        Object.defineProperty(WrappedError.prototype, "stack", {
            get: function () {
                return (this.originalError instanceof Error ? this.originalError : this._nativeError)
                    .stack;
            },
            enumerable: true,
            configurable: true
        });
        return WrappedError;
    }(BaseError));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var InvalidPipeArgumentError = (function (_super) {
        __extends(InvalidPipeArgumentError, _super);
        function InvalidPipeArgumentError(type, value) {
            _super.call(this, "Invalid argument '" + value + "' for pipe '" + stringify(type) + "'");
        }
        return InvalidPipeArgumentError;
    }(BaseError));

    var ObservableStrategy = (function () {
        function ObservableStrategy() {
        }
        ObservableStrategy.prototype.createSubscription = function (async, updateLatestValue) {
            return async.subscribe({ next: updateLatestValue, error: function (e) { throw e; } });
        };
        ObservableStrategy.prototype.dispose = function (subscription) { subscription.unsubscribe(); };
        ObservableStrategy.prototype.onDestroy = function (subscription) { subscription.unsubscribe(); };
        return ObservableStrategy;
    }());
    var PromiseStrategy = (function () {
        function PromiseStrategy() {
        }
        PromiseStrategy.prototype.createSubscription = function (async, updateLatestValue) {
            return async.then(updateLatestValue, function (e) { throw e; });
        };
        PromiseStrategy.prototype.dispose = function (subscription) { };
        PromiseStrategy.prototype.onDestroy = function (subscription) { };
        return PromiseStrategy;
    }());
    var _promiseStrategy = new PromiseStrategy();
    var _observableStrategy = new ObservableStrategy();
    // avoid unused import when Promise union types are erased
    /**
     * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
     * emitted.
     * When a new value is emitted, the `async` pipe marks the component to be checked for changes.
     * When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
     * potential memory leaks.
     *
     * ## Usage
     *
     *     object | async
     *
     * where `object` is of type `Observable` or of type `Promise`.
     *
     * ## Examples
     *
     * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
     * promise.
     *
     * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipePromise'}
     *
     * It's also possible to use `async` with Observables. The example below binds the `time` Observable
     * to the view. Every 500ms, the `time` Observable updates the view with the current time.
     *
     * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipeObservable'}
     *
     * @stable
     */
    var AsyncPipe = (function () {
        function AsyncPipe(_ref) {
            /** @internal */
            this._latestValue = null;
            /** @internal */
            this._latestReturnedValue = null;
            /** @internal */
            this._subscription = null;
            /** @internal */
            this._obj = null;
            this._strategy = null;
            this._ref = _ref;
        }
        AsyncPipe.prototype.ngOnDestroy = function () {
            if (isPresent(this._subscription)) {
                this._dispose();
            }
        };
        AsyncPipe.prototype.transform = function (obj) {
            if (isBlank(this._obj)) {
                if (isPresent(obj)) {
                    this._subscribe(obj);
                }
                this._latestReturnedValue = this._latestValue;
                return this._latestValue;
            }
            if (obj !== this._obj) {
                this._dispose();
                return this.transform(obj);
            }
            if (this._latestValue === this._latestReturnedValue) {
                return this._latestReturnedValue;
            }
            else {
                this._latestReturnedValue = this._latestValue;
                return _angular_core.WrappedValue.wrap(this._latestValue);
            }
        };
        /** @internal */
        AsyncPipe.prototype._subscribe = function (obj) {
            var _this = this;
            this._obj = obj;
            this._strategy = this._selectStrategy(obj);
            this._subscription = this._strategy.createSubscription(obj, function (value) { return _this._updateLatestValue(obj, value); });
        };
        /** @internal */
        AsyncPipe.prototype._selectStrategy = function (obj) {
            if (isPromise(obj)) {
                return _promiseStrategy;
            }
            else if (obj.subscribe) {
                return _observableStrategy;
            }
            else {
                throw new InvalidPipeArgumentError(AsyncPipe, obj);
            }
        };
        /** @internal */
        AsyncPipe.prototype._dispose = function () {
            this._strategy.dispose(this._subscription);
            this._latestValue = null;
            this._latestReturnedValue = null;
            this._subscription = null;
            this._obj = null;
        };
        /** @internal */
        AsyncPipe.prototype._updateLatestValue = function (async, value) {
            if (async === this._obj) {
                this._latestValue = value;
                this._ref.markForCheck();
            }
        };
        AsyncPipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'async', pure: false },] },
        ];
        /** @nocollapse */
        AsyncPipe.ctorParameters = [
            { type: _angular_core.ChangeDetectorRef, },
        ];
        return AsyncPipe;
    }());

    var Map$1 = global$1.Map;
    var Set$1 = global$1.Set;
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
    /**
     * Wraps Javascript Objects
     */
    var StringMapWrapper = (function () {
        function StringMapWrapper() {
        }
        StringMapWrapper.create = function () {
            // Note: We are not using Object.create(null) here due to
            // performance!
            // http://jsperf.com/ng2-object-create-null
            return {};
        };
        StringMapWrapper.contains = function (map, key) {
            return map.hasOwnProperty(key);
        };
        StringMapWrapper.get = function (map, key) {
            return map.hasOwnProperty(key) ? map[key] : undefined;
        };
        StringMapWrapper.set = function (map, key, value) { map[key] = value; };
        StringMapWrapper.keys = function (map) { return Object.keys(map); };
        StringMapWrapper.values = function (map) {
            return Object.keys(map).map(function (k) { return map[k]; });
        };
        StringMapWrapper.isEmpty = function (map) {
            for (var prop in map) {
                return false;
            }
            return true;
        };
        StringMapWrapper.delete = function (map, key) { delete map[key]; };
        StringMapWrapper.forEach = function (map, callback) {
            for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
                var k = _a[_i];
                callback(map[k], k);
            }
        };
        StringMapWrapper.merge = function (m1, m2) {
            var m = {};
            for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
                var k = _a[_i];
                m[k] = m1[k];
            }
            for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
                var k = _c[_b];
                m[k] = m2[k];
            }
            return m;
        };
        StringMapWrapper.equals = function (m1, m2) {
            var k1 = Object.keys(m1);
            var k2 = Object.keys(m2);
            if (k1.length != k2.length) {
                return false;
            }
            var key;
            for (var i = 0; i < k1.length; i++) {
                key = k1[i];
                if (m1[key] !== m2[key]) {
                    return false;
                }
            }
            return true;
        };
        return StringMapWrapper;
    }());
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
    function isListLikeIterable(obj) {
        if (!isJsObject(obj))
            return false;
        return isArray(obj) ||
            (!(obj instanceof Map$1) &&
                getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
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

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var NumberFormatStyle;
    (function (NumberFormatStyle) {
        NumberFormatStyle[NumberFormatStyle["Decimal"] = 0] = "Decimal";
        NumberFormatStyle[NumberFormatStyle["Percent"] = 1] = "Percent";
        NumberFormatStyle[NumberFormatStyle["Currency"] = 2] = "Currency";
    })(NumberFormatStyle || (NumberFormatStyle = {}));
    var NumberFormatter = (function () {
        function NumberFormatter() {
        }
        NumberFormatter.format = function (num, locale, style, _a) {
            var _b = _a === void 0 ? {} : _a, minimumIntegerDigits = _b.minimumIntegerDigits, minimumFractionDigits = _b.minimumFractionDigits, maximumFractionDigits = _b.maximumFractionDigits, currency = _b.currency, _c = _b.currencyAsSymbol, currencyAsSymbol = _c === void 0 ? false : _c;
            var options = {
                minimumIntegerDigits: minimumIntegerDigits,
                minimumFractionDigits: minimumFractionDigits,
                maximumFractionDigits: maximumFractionDigits,
                style: NumberFormatStyle[style].toLowerCase()
            };
            if (style == NumberFormatStyle.Currency) {
                options.currency = currency;
                options.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
            }
            return new Intl.NumberFormat(locale, options).format(num);
        };
        return NumberFormatter;
    }());
    var DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsazZEwGjJ']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|J+|j+|m+|s+|a|z|Z|G+|w+))(.*)/;
    var PATTERN_ALIASES = {
        yMMMdjms: datePartGetterFactory(combine([
            digitCondition('year', 1),
            nameCondition('month', 3),
            digitCondition('day', 1),
            digitCondition('hour', 1),
            digitCondition('minute', 1),
            digitCondition('second', 1),
        ])),
        yMdjm: datePartGetterFactory(combine([
            digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1),
            digitCondition('hour', 1), digitCondition('minute', 1)
        ])),
        yMMMMEEEEd: datePartGetterFactory(combine([
            digitCondition('year', 1), nameCondition('month', 4), nameCondition('weekday', 4),
            digitCondition('day', 1)
        ])),
        yMMMMd: datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 4), digitCondition('day', 1)])),
        yMMMd: datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 3), digitCondition('day', 1)])),
        yMd: datePartGetterFactory(combine([digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1)])),
        jms: datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('second', 1), digitCondition('minute', 1)])),
        jm: datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('minute', 1)]))
    };
    var DATE_FORMATS = {
        yyyy: datePartGetterFactory(digitCondition('year', 4)),
        yy: datePartGetterFactory(digitCondition('year', 2)),
        y: datePartGetterFactory(digitCondition('year', 1)),
        MMMM: datePartGetterFactory(nameCondition('month', 4)),
        MMM: datePartGetterFactory(nameCondition('month', 3)),
        MM: datePartGetterFactory(digitCondition('month', 2)),
        M: datePartGetterFactory(digitCondition('month', 1)),
        LLLL: datePartGetterFactory(nameCondition('month', 4)),
        dd: datePartGetterFactory(digitCondition('day', 2)),
        d: datePartGetterFactory(digitCondition('day', 1)),
        HH: digitModifier(hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), false)))),
        H: hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), false))),
        hh: digitModifier(hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), true)))),
        h: hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
        jj: datePartGetterFactory(digitCondition('hour', 2)),
        j: datePartGetterFactory(digitCondition('hour', 1)),
        mm: digitModifier(datePartGetterFactory(digitCondition('minute', 2))),
        m: datePartGetterFactory(digitCondition('minute', 1)),
        ss: digitModifier(datePartGetterFactory(digitCondition('second', 2))),
        s: datePartGetterFactory(digitCondition('second', 1)),
        // while ISO 8601 requires fractions to be prefixed with `.` or `,`
        // we can be just safely rely on using `sss` since we currently don't support single or two digit
        // fractions
        sss: datePartGetterFactory(digitCondition('second', 3)),
        EEEE: datePartGetterFactory(nameCondition('weekday', 4)),
        EEE: datePartGetterFactory(nameCondition('weekday', 3)),
        EE: datePartGetterFactory(nameCondition('weekday', 2)),
        E: datePartGetterFactory(nameCondition('weekday', 1)),
        a: hourClockExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
        Z: timeZoneGetter('short'),
        z: timeZoneGetter('long'),
        ww: datePartGetterFactory({}),
        // first Thursday of the year. not support ?
        w: datePartGetterFactory({}),
        // of the year not support ?
        G: datePartGetterFactory(nameCondition('era', 1)),
        GG: datePartGetterFactory(nameCondition('era', 2)),
        GGG: datePartGetterFactory(nameCondition('era', 3)),
        GGGG: datePartGetterFactory(nameCondition('era', 4))
    };
    function digitModifier(inner) {
        return function (date, locale) {
            var result = inner(date, locale);
            return result.length == 1 ? '0' + result : result;
        };
    }
    function hourClockExtracter(inner) {
        return function (date, locale) {
            var result = inner(date, locale);
            return result.split(' ')[1];
        };
    }
    function hourExtracter(inner) {
        return function (date, locale) {
            var result = inner(date, locale);
            return result.split(' ')[0];
        };
    }
    function intlDateFormat(date, locale, options) {
        return new Intl.DateTimeFormat(locale, options).format(date).replace(/[\u200e\u200f]/g, '');
    }
    function timeZoneGetter(timezone) {
        // To workaround `Intl` API restriction for single timezone let format with 24 hours
        var options = { hour: '2-digit', hour12: false, timeZoneName: timezone };
        return function (date, locale) {
            var result = intlDateFormat(date, locale, options);
            // Then extract first 3 letters that related to hours
            return result ? result.substring(3) : '';
        };
    }
    function hour12Modify(options, value) {
        options.hour12 = value;
        return options;
    }
    function digitCondition(prop, len) {
        var result = {};
        result[prop] = len == 2 ? '2-digit' : 'numeric';
        return result;
    }
    function nameCondition(prop, len) {
        var result = {};
        result[prop] = len < 4 ? 'short' : 'long';
        return result;
    }
    function combine(options) {
        var result = {};
        options.forEach(function (option) { Object.assign(result, option); });
        return result;
    }
    function datePartGetterFactory(ret) {
        return function (date, locale) { return intlDateFormat(date, locale, ret); };
    }
    var datePartsFormatterCache = new Map();
    function dateFormatter(format, date, locale) {
        var text = '';
        var match;
        var fn;
        var parts = [];
        if (PATTERN_ALIASES[format]) {
            return PATTERN_ALIASES[format](date, locale);
        }
        if (datePartsFormatterCache.has(format)) {
            parts = datePartsFormatterCache.get(format);
        }
        else {
            var matches = DATE_FORMATS_SPLIT.exec(format);
            while (format) {
                match = DATE_FORMATS_SPLIT.exec(format);
                if (match) {
                    parts = concat(parts, match, 1);
                    format = parts.pop();
                }
                else {
                    parts.push(format);
                    format = null;
                }
            }
            datePartsFormatterCache.set(format, parts);
        }
        parts.forEach(function (part) {
            fn = DATE_FORMATS[part];
            text += fn ? fn(date, locale) :
                part === '\'\'' ? '\'' : part.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
        });
        return text;
    }
    var slice = [].slice;
    function concat(array1 /** TODO #9100 */, array2 /** TODO #9100 */, index /** TODO #9100 */) {
        return array1.concat(slice.call(array2, index));
    }
    var DateFormatter = (function () {
        function DateFormatter() {
        }
        DateFormatter.format = function (date, locale, pattern) {
            return dateFormatter(pattern, date, locale);
        };
        return DateFormatter;
    }());

    /**
     * Formats a date value to a string based on the requested format.
     *
     * WARNINGS:
     * - this pipe is marked as pure hence it will not be re-evaluated when the input is mutated.
     *   Instead users should treat the date as an immutable object and change the reference when the
     *   pipe needs to re-run (this is to avoid reformatting the date on every change detection run
     *   which would be an expensive operation).
     * - this pipe uses the Internationalization API. Therefore it is only reliable in Chrome and Opera
     *   browsers.
     *
     * ## Usage
     *
     *     expression | date[:format]
     *
     * where `expression` is a date object or a number (milliseconds since UTC epoch) or an ISO string
     * (https://www.w3.org/TR/NOTE-datetime) and `format` indicates which date/time components to
     * include:
     *
     *  | Component | Symbol | Short Form   | Long Form         | Numeric   | 2-digit   |
     *  |-----------|:------:|--------------|-------------------|-----------|-----------|
     *  | era       |   G    | G (AD)       | GGGG (Anno Domini)| -         | -         |
     *  | year      |   y    | -            | -                 | y (2015)  | yy (15)   |
     *  | month     |   M    | MMM (Sep)    | MMMM (September)  | M (9)     | MM (09)   |
     *  | day       |   d    | -            | -                 | d (3)     | dd (03)   |
     *  | weekday   |   E    | EEE (Sun)    | EEEE (Sunday)     | -         | -         |
     *  | hour      |   j    | -            | -                 | j (13)    | jj (13)   |
     *  | hour12    |   h    | -            | -                 | h (1 PM)  | hh (01 PM)|
     *  | hour24    |   H    | -            | -                 | H (13)    | HH (13)   |
     *  | minute    |   m    | -            | -                 | m (5)     | mm (05)   |
     *  | second    |   s    | -            | -                 | s (9)     | ss (09)   |
     *  | timezone  |   z    | -            | z (Pacific Standard Time)| -  | -         |
     *  | timezone  |   Z    | Z (GMT-8:00) | -                 | -         | -         |
     *  | timezone  |   a    | a (PM)       | -                 | -         | -         |
     *
     * In javascript, only the components specified will be respected (not the ordering,
     * punctuations, ...) and details of the formatting will be dependent on the locale.
     *
     * `format` can also be one of the following predefined formats:
     *
     *  - `'medium'`: equivalent to `'yMMMdjms'` (e.g. Sep 3, 2010, 12:05:08 PM for en-US)
     *  - `'short'`: equivalent to `'yMdjm'` (e.g. 9/3/2010, 12:05 PM for en-US)
     *  - `'fullDate'`: equivalent to `'yMMMMEEEEd'` (e.g. Friday, September 3, 2010 for en-US)
     *  - `'longDate'`: equivalent to `'yMMMMd'` (e.g. September 3, 2010)
     *  - `'mediumDate'`: equivalent to `'yMMMd'` (e.g. Sep 3, 2010 for en-US)
     *  - `'shortDate'`: equivalent to `'yMd'` (e.g. 9/3/2010 for en-US)
     *  - `'mediumTime'`: equivalent to `'jms'` (e.g. 12:05:08 PM for en-US)
     *  - `'shortTime'`: equivalent to `'jm'` (e.g. 12:05 PM for en-US)
     *
     * Timezone of the formatted text will be the local system timezone of the end-users machine.
     *
     * ### Examples
     *
     * Assuming `dateObj` is (year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11)
     * in the _local_ time and locale is 'en-US':
     *
     * ```
     *     {{ dateObj | date }}               // output is 'Jun 15, 2015'
     *     {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
     *     {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
     *     {{ dateObj | date:'mmss' }}        // output is '43:11'
     * ```
     *
     * {@example core/pipes/ts/date_pipe/date_pipe_example.ts region='DatePipe'}
     *
     * @stable
     */
    var DatePipe = (function () {
        function DatePipe(_locale) {
            this._locale = _locale;
        }
        DatePipe.prototype.transform = function (value, pattern) {
            if (pattern === void 0) { pattern = 'mediumDate'; }
            if (isBlank(value))
                return null;
            if (!this.supports(value)) {
                throw new InvalidPipeArgumentError(DatePipe, value);
            }
            if (NumberWrapper.isNumeric(value)) {
                value = DateWrapper.fromMillis(parseFloat(value));
            }
            else if (isString(value)) {
                value = DateWrapper.fromISOString(value);
            }
            if (StringMapWrapper.contains(DatePipe._ALIASES, pattern)) {
                pattern = StringMapWrapper.get(DatePipe._ALIASES, pattern);
            }
            return DateFormatter.format(value, this._locale, pattern);
        };
        DatePipe.prototype.supports = function (obj) {
            if (isDate(obj) || NumberWrapper.isNumeric(obj)) {
                return true;
            }
            if (isString(obj) && isDate(DateWrapper.fromISOString(obj))) {
                return true;
            }
            return false;
        };
        /** @internal */
        DatePipe._ALIASES = {
            'medium': 'yMMMdjms',
            'short': 'yMdjm',
            'fullDate': 'yMMMMEEEEd',
            'longDate': 'yMMMMd',
            'mediumDate': 'yMMMd',
            'shortDate': 'yMd',
            'mediumTime': 'jms',
            'shortTime': 'jm'
        };
        DatePipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'date', pure: true },] },
        ];
        /** @nocollapse */
        DatePipe.ctorParameters = [
            { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_core.LOCALE_ID,] },] },
        ];
        return DatePipe;
    }());

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
    /**
     * @experimental
     */
    var NgLocalization = (function () {
        function NgLocalization() {
        }
        return NgLocalization;
    }());
    /**
     * Returns the plural category for a given value.
     * - "=value" when the case exists,
     * - the plural category otherwise
     *
     * @internal
     */
    function getPluralCategory(value, cases, ngLocalization) {
        var nbCase = "=" + value;
        return cases.indexOf(nbCase) > -1 ? nbCase : ngLocalization.getPluralCategory(value);
    }
    /**
     * Returns the plural case based on the locale
     *
     * @experimental
     */
    var NgLocaleLocalization = (function (_super) {
        __extends$2(NgLocaleLocalization, _super);
        function NgLocaleLocalization(_locale) {
            _super.call(this);
            this._locale = _locale;
        }
        NgLocaleLocalization.prototype.getPluralCategory = function (value) {
            var plural = getPluralCase(this._locale, value);
            switch (plural) {
                case Plural.Zero:
                    return 'zero';
                case Plural.One:
                    return 'one';
                case Plural.Two:
                    return 'two';
                case Plural.Few:
                    return 'few';
                case Plural.Many:
                    return 'many';
                default:
                    return 'other';
            }
        };
        NgLocaleLocalization.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        NgLocaleLocalization.ctorParameters = [
            { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_core.LOCALE_ID,] },] },
        ];
        return NgLocaleLocalization;
    }(NgLocalization));
    // This is generated code DO NOT MODIFY
    // see angular2/script/cldr/gen_plural_rules.js
    /** @experimental */
    var Plural;
    (function (Plural) {
        Plural[Plural["Zero"] = 0] = "Zero";
        Plural[Plural["One"] = 1] = "One";
        Plural[Plural["Two"] = 2] = "Two";
        Plural[Plural["Few"] = 3] = "Few";
        Plural[Plural["Many"] = 4] = "Many";
        Plural[Plural["Other"] = 5] = "Other";
    })(Plural || (Plural = {}));
    /**
     * Returns the plural case based on the locale
     *
     * @experimental
     */
    function getPluralCase(locale, nLike) {
        // TODO(vicb): lazy compute
        if (typeof nLike === 'string') {
            nLike = parseInt(nLike, 10);
        }
        var n = nLike;
        var nDecimal = n.toString().replace(/^[^.]*\.?/, '');
        var i = Math.floor(Math.abs(n));
        var v = nDecimal.length;
        var f = parseInt(nDecimal, 10);
        var t = parseInt(n.toString().replace(/^[^.]*\.?|0+$/g, ''), 10) || 0;
        var lang = locale.split('_')[0].toLowerCase();
        switch (lang) {
            case 'af':
            case 'asa':
            case 'az':
            case 'bem':
            case 'bez':
            case 'bg':
            case 'brx':
            case 'ce':
            case 'cgg':
            case 'chr':
            case 'ckb':
            case 'ee':
            case 'el':
            case 'eo':
            case 'es':
            case 'eu':
            case 'fo':
            case 'fur':
            case 'gsw':
            case 'ha':
            case 'haw':
            case 'hu':
            case 'jgo':
            case 'jmc':
            case 'ka':
            case 'kk':
            case 'kkj':
            case 'kl':
            case 'ks':
            case 'ksb':
            case 'ky':
            case 'lb':
            case 'lg':
            case 'mas':
            case 'mgo':
            case 'ml':
            case 'mn':
            case 'nb':
            case 'nd':
            case 'ne':
            case 'nn':
            case 'nnh':
            case 'nyn':
            case 'om':
            case 'or':
            case 'os':
            case 'ps':
            case 'rm':
            case 'rof':
            case 'rwk':
            case 'saq':
            case 'seh':
            case 'sn':
            case 'so':
            case 'sq':
            case 'ta':
            case 'te':
            case 'teo':
            case 'tk':
            case 'tr':
            case 'ug':
            case 'uz':
            case 'vo':
            case 'vun':
            case 'wae':
            case 'xog':
                if (n === 1)
                    return Plural.One;
                return Plural.Other;
            case 'agq':
            case 'bas':
            case 'cu':
            case 'dav':
            case 'dje':
            case 'dua':
            case 'dyo':
            case 'ebu':
            case 'ewo':
            case 'guz':
            case 'kam':
            case 'khq':
            case 'ki':
            case 'kln':
            case 'kok':
            case 'ksf':
            case 'lrc':
            case 'lu':
            case 'luo':
            case 'luy':
            case 'mer':
            case 'mfe':
            case 'mgh':
            case 'mua':
            case 'mzn':
            case 'nmg':
            case 'nus':
            case 'qu':
            case 'rn':
            case 'rw':
            case 'sbp':
            case 'twq':
            case 'vai':
            case 'yav':
            case 'yue':
            case 'zgh':
            case 'ak':
            case 'ln':
            case 'mg':
            case 'pa':
            case 'ti':
                if (n === Math.floor(n) && n >= 0 && n <= 1)
                    return Plural.One;
                return Plural.Other;
            case 'am':
            case 'as':
            case 'bn':
            case 'fa':
            case 'gu':
            case 'hi':
            case 'kn':
            case 'mr':
            case 'zu':
                if (i === 0 || n === 1)
                    return Plural.One;
                return Plural.Other;
            case 'ar':
                if (n === 0)
                    return Plural.Zero;
                if (n === 1)
                    return Plural.One;
                if (n === 2)
                    return Plural.Two;
                if (n % 100 === Math.floor(n % 100) && n % 100 >= 3 && n % 100 <= 10)
                    return Plural.Few;
                if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 99)
                    return Plural.Many;
                return Plural.Other;
            case 'ast':
            case 'ca':
            case 'de':
            case 'en':
            case 'et':
            case 'fi':
            case 'fy':
            case 'gl':
            case 'it':
            case 'nl':
            case 'sv':
            case 'sw':
            case 'ur':
            case 'yi':
                if (i === 1 && v === 0)
                    return Plural.One;
                return Plural.Other;
            case 'be':
                if (n % 10 === 1 && !(n % 100 === 11))
                    return Plural.One;
                if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 4 &&
                    !(n % 100 >= 12 && n % 100 <= 14))
                    return Plural.Few;
                if (n % 10 === 0 || n % 10 === Math.floor(n % 10) && n % 10 >= 5 && n % 10 <= 9 ||
                    n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 14)
                    return Plural.Many;
                return Plural.Other;
            case 'br':
                if (n % 10 === 1 && !(n % 100 === 11 || n % 100 === 71 || n % 100 === 91))
                    return Plural.One;
                if (n % 10 === 2 && !(n % 100 === 12 || n % 100 === 72 || n % 100 === 92))
                    return Plural.Two;
                if (n % 10 === Math.floor(n % 10) && (n % 10 >= 3 && n % 10 <= 4 || n % 10 === 9) &&
                    !(n % 100 >= 10 && n % 100 <= 19 || n % 100 >= 70 && n % 100 <= 79 ||
                        n % 100 >= 90 && n % 100 <= 99))
                    return Plural.Few;
                if (!(n === 0) && n % 1e6 === 0)
                    return Plural.Many;
                return Plural.Other;
            case 'bs':
            case 'hr':
            case 'sr':
                if (v === 0 && i % 10 === 1 && !(i % 100 === 11) || f % 10 === 1 && !(f % 100 === 11))
                    return Plural.One;
                if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                    !(i % 100 >= 12 && i % 100 <= 14) ||
                    f % 10 === Math.floor(f % 10) && f % 10 >= 2 && f % 10 <= 4 &&
                        !(f % 100 >= 12 && f % 100 <= 14))
                    return Plural.Few;
                return Plural.Other;
            case 'cs':
            case 'sk':
                if (i === 1 && v === 0)
                    return Plural.One;
                if (i === Math.floor(i) && i >= 2 && i <= 4 && v === 0)
                    return Plural.Few;
                if (!(v === 0))
                    return Plural.Many;
                return Plural.Other;
            case 'cy':
                if (n === 0)
                    return Plural.Zero;
                if (n === 1)
                    return Plural.One;
                if (n === 2)
                    return Plural.Two;
                if (n === 3)
                    return Plural.Few;
                if (n === 6)
                    return Plural.Many;
                return Plural.Other;
            case 'da':
                if (n === 1 || !(t === 0) && (i === 0 || i === 1))
                    return Plural.One;
                return Plural.Other;
            case 'dsb':
            case 'hsb':
                if (v === 0 && i % 100 === 1 || f % 100 === 1)
                    return Plural.One;
                if (v === 0 && i % 100 === 2 || f % 100 === 2)
                    return Plural.Two;
                if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 ||
                    f % 100 === Math.floor(f % 100) && f % 100 >= 3 && f % 100 <= 4)
                    return Plural.Few;
                return Plural.Other;
            case 'ff':
            case 'fr':
            case 'hy':
            case 'kab':
                if (i === 0 || i === 1)
                    return Plural.One;
                return Plural.Other;
            case 'fil':
                if (v === 0 && (i === 1 || i === 2 || i === 3) ||
                    v === 0 && !(i % 10 === 4 || i % 10 === 6 || i % 10 === 9) ||
                    !(v === 0) && !(f % 10 === 4 || f % 10 === 6 || f % 10 === 9))
                    return Plural.One;
                return Plural.Other;
            case 'ga':
                if (n === 1)
                    return Plural.One;
                if (n === 2)
                    return Plural.Two;
                if (n === Math.floor(n) && n >= 3 && n <= 6)
                    return Plural.Few;
                if (n === Math.floor(n) && n >= 7 && n <= 10)
                    return Plural.Many;
                return Plural.Other;
            case 'gd':
                if (n === 1 || n === 11)
                    return Plural.One;
                if (n === 2 || n === 12)
                    return Plural.Two;
                if (n === Math.floor(n) && (n >= 3 && n <= 10 || n >= 13 && n <= 19))
                    return Plural.Few;
                return Plural.Other;
            case 'gv':
                if (v === 0 && i % 10 === 1)
                    return Plural.One;
                if (v === 0 && i % 10 === 2)
                    return Plural.Two;
                if (v === 0 &&
                    (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80))
                    return Plural.Few;
                if (!(v === 0))
                    return Plural.Many;
                return Plural.Other;
            case 'he':
                if (i === 1 && v === 0)
                    return Plural.One;
                if (i === 2 && v === 0)
                    return Plural.Two;
                if (v === 0 && !(n >= 0 && n <= 10) && n % 10 === 0)
                    return Plural.Many;
                return Plural.Other;
            case 'is':
                if (t === 0 && i % 10 === 1 && !(i % 100 === 11) || !(t === 0))
                    return Plural.One;
                return Plural.Other;
            case 'ksh':
                if (n === 0)
                    return Plural.Zero;
                if (n === 1)
                    return Plural.One;
                return Plural.Other;
            case 'kw':
            case 'naq':
            case 'se':
            case 'smn':
                if (n === 1)
                    return Plural.One;
                if (n === 2)
                    return Plural.Two;
                return Plural.Other;
            case 'lag':
                if (n === 0)
                    return Plural.Zero;
                if ((i === 0 || i === 1) && !(n === 0))
                    return Plural.One;
                return Plural.Other;
            case 'lt':
                if (n % 10 === 1 && !(n % 100 >= 11 && n % 100 <= 19))
                    return Plural.One;
                if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 9 &&
                    !(n % 100 >= 11 && n % 100 <= 19))
                    return Plural.Few;
                if (!(f === 0))
                    return Plural.Many;
                return Plural.Other;
            case 'lv':
            case 'prg':
                if (n % 10 === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19 ||
                    v === 2 && f % 100 === Math.floor(f % 100) && f % 100 >= 11 && f % 100 <= 19)
                    return Plural.Zero;
                if (n % 10 === 1 && !(n % 100 === 11) || v === 2 && f % 10 === 1 && !(f % 100 === 11) ||
                    !(v === 2) && f % 10 === 1)
                    return Plural.One;
                return Plural.Other;
            case 'mk':
                if (v === 0 && i % 10 === 1 || f % 10 === 1)
                    return Plural.One;
                return Plural.Other;
            case 'mt':
                if (n === 1)
                    return Plural.One;
                if (n === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 2 && n % 100 <= 10)
                    return Plural.Few;
                if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19)
                    return Plural.Many;
                return Plural.Other;
            case 'pl':
                if (i === 1 && v === 0)
                    return Plural.One;
                if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                    !(i % 100 >= 12 && i % 100 <= 14))
                    return Plural.Few;
                if (v === 0 && !(i === 1) && i % 10 === Math.floor(i % 10) && i % 10 >= 0 && i % 10 <= 1 ||
                    v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
                    v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 12 && i % 100 <= 14)
                    return Plural.Many;
                return Plural.Other;
            case 'pt':
                if (n === Math.floor(n) && n >= 0 && n <= 2 && !(n === 2))
                    return Plural.One;
                return Plural.Other;
            case 'ro':
                if (i === 1 && v === 0)
                    return Plural.One;
                if (!(v === 0) || n === 0 ||
                    !(n === 1) && n % 100 === Math.floor(n % 100) && n % 100 >= 1 && n % 100 <= 19)
                    return Plural.Few;
                return Plural.Other;
            case 'ru':
            case 'uk':
                if (v === 0 && i % 10 === 1 && !(i % 100 === 11))
                    return Plural.One;
                if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                    !(i % 100 >= 12 && i % 100 <= 14))
                    return Plural.Few;
                if (v === 0 && i % 10 === 0 ||
                    v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
                    v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14)
                    return Plural.Many;
                return Plural.Other;
            case 'shi':
                if (i === 0 || n === 1)
                    return Plural.One;
                if (n === Math.floor(n) && n >= 2 && n <= 10)
                    return Plural.Few;
                return Plural.Other;
            case 'si':
                if (n === 0 || n === 1 || i === 0 && f === 1)
                    return Plural.One;
                return Plural.Other;
            case 'sl':
                if (v === 0 && i % 100 === 1)
                    return Plural.One;
                if (v === 0 && i % 100 === 2)
                    return Plural.Two;
                if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 || !(v === 0))
                    return Plural.Few;
                return Plural.Other;
            case 'tzm':
                if (n === Math.floor(n) && n >= 0 && n <= 1 || n === Math.floor(n) && n >= 11 && n <= 99)
                    return Plural.One;
                return Plural.Other;
            default:
                return Plural.Other;
        }
    }

    var _INTERPOLATION_REGEXP = /#/g;
    /**
     *  Maps a value to a string that pluralizes the value properly.
     *
     *  ## Usage
     *
     *  expression | i18nPlural:mapping
     *
     *  where `expression` is a number and `mapping` is an object that mimics the ICU format,
     *  see http://userguide.icu-project.org/formatparse/messages
     *
     *  ## Example
     *
     *  ```
     *  @Component({
     *    selector: 'app',
     *    template: `
     *      <div>
     *        {{ messages.length | i18nPlural: messageMapping }}
     *      </div>
     *    `,
     *    // best practice is to define the locale at the application level
     *    providers: [{provide: LOCALE_ID, useValue: 'en_US'}]
     *  })
     *
     *  class MyApp {
     *    messages: any[];
     *    messageMapping: {[k:string]: string} = {
     *      '=0': 'No messages.',
     *      '=1': 'One message.',
     *      'other': '# messages.'
     *    }
     *    ...
     *  }
     *  ```
     *
     * @experimental
     */
    var I18nPluralPipe = (function () {
        function I18nPluralPipe(_localization) {
            this._localization = _localization;
        }
        I18nPluralPipe.prototype.transform = function (value, pluralMap) {
            if (isBlank(value))
                return '';
            if (!isStringMap(pluralMap)) {
                throw new InvalidPipeArgumentError(I18nPluralPipe, pluralMap);
            }
            var key = getPluralCategory(value, Object.keys(pluralMap), this._localization);
            return StringWrapper.replaceAll(pluralMap[key], _INTERPOLATION_REGEXP, value.toString());
        };
        I18nPluralPipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'i18nPlural', pure: true },] },
        ];
        /** @nocollapse */
        I18nPluralPipe.ctorParameters = [
            { type: NgLocalization, },
        ];
        return I18nPluralPipe;
    }());

    /**
     *
     *  Generic selector that displays the string that matches the current value.
     *
     *  ## Usage
     *
     *  expression | i18nSelect:mapping
     *
     *  where `mapping` is an object that indicates the text that should be displayed
     *  for different values of the provided `expression`.
     *
     *  ## Example
     *
     *  ```
     *  <div>
     *    {{ gender | i18nSelect: inviteMap }}
     *  </div>
     *
     *  class MyApp {
     *    gender: string = 'male';
     *    inviteMap: any = {
     *      'male': 'Invite him.',
     *      'female': 'Invite her.',
     *      'other': 'Invite them.'
     *    }
     *    ...
     *  }
     *  ```
     *
     *  @experimental
     */
    var I18nSelectPipe = (function () {
        function I18nSelectPipe() {
        }
        I18nSelectPipe.prototype.transform = function (value, mapping) {
            if (isBlank(value))
                return '';
            if (!isStringMap(mapping)) {
                throw new InvalidPipeArgumentError(I18nSelectPipe, mapping);
            }
            return mapping.hasOwnProperty(value) ? mapping[value] : '';
        };
        I18nSelectPipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'i18nSelect', pure: true },] },
        ];
        /** @nocollapse */
        I18nSelectPipe.ctorParameters = [];
        return I18nSelectPipe;
    }());

    /**
     * Transforms any input value using `JSON.stringify`. Useful for debugging.
     *
     * ### Example
     * {@example core/pipes/ts/json_pipe/json_pipe_example.ts region='JsonPipe'}
     *
     * @stable
     */
    var JsonPipe = (function () {
        function JsonPipe() {
        }
        JsonPipe.prototype.transform = function (value) { return Json.stringify(value); };
        JsonPipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'json', pure: false },] },
        ];
        /** @nocollapse */
        JsonPipe.ctorParameters = [];
        return JsonPipe;
    }());

    /**
     * Transforms text to lowercase.
     *
     * ### Example
     *
     * {@example core/pipes/ts/lowerupper_pipe/lowerupper_pipe_example.ts region='LowerUpperPipe'}
     *
     * @stable
     */
    var LowerCasePipe = (function () {
        function LowerCasePipe() {
        }
        LowerCasePipe.prototype.transform = function (value) {
            if (isBlank(value))
                return value;
            if (!isString(value)) {
                throw new InvalidPipeArgumentError(LowerCasePipe, value);
            }
            return value.toLowerCase();
        };
        LowerCasePipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'lowercase' },] },
        ];
        /** @nocollapse */
        LowerCasePipe.ctorParameters = [];
        return LowerCasePipe;
    }());

    var _NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(\-(\d+))?)?$/;
    function formatNumber(pipe, locale, value, style, digits, currency, currencyAsSymbol) {
        if (currency === void 0) { currency = null; }
        if (currencyAsSymbol === void 0) { currencyAsSymbol = false; }
        if (isBlank(value))
            return null;
        // Convert strings to numbers
        value = isString(value) && NumberWrapper.isNumeric(value) ? +value : value;
        if (!isNumber(value)) {
            throw new InvalidPipeArgumentError(pipe, value);
        }
        var minInt;
        var minFraction;
        var maxFraction;
        if (style !== NumberFormatStyle.Currency) {
            // rely on Intl default for currency
            minInt = 1;
            minFraction = 0;
            maxFraction = 3;
        }
        if (isPresent(digits)) {
            var parts = digits.match(_NUMBER_FORMAT_REGEXP);
            if (parts === null) {
                throw new Error(digits + " is not a valid digit info for number pipes");
            }
            if (isPresent(parts[1])) {
                minInt = NumberWrapper.parseIntAutoRadix(parts[1]);
            }
            if (isPresent(parts[3])) {
                minFraction = NumberWrapper.parseIntAutoRadix(parts[3]);
            }
            if (isPresent(parts[5])) {
                maxFraction = NumberWrapper.parseIntAutoRadix(parts[5]);
            }
        }
        return NumberFormatter.format(value, locale, style, {
            minimumIntegerDigits: minInt,
            minimumFractionDigits: minFraction,
            maximumFractionDigits: maxFraction,
            currency: currency,
            currencyAsSymbol: currencyAsSymbol
        });
    }
    /**
     * WARNING: this pipe uses the Internationalization API.
     * Therefore it is only reliable in Chrome and Opera browsers. For other browsers please use an
     * polyfill, for example: [https://github.com/andyearnshaw/Intl.js/].
     *
     * Formats a number as local text. i.e. group sizing and separator and other locale-specific
     * configurations are based on the active locale.
     *
     * ### Usage
     *
     *     expression | number[:digitInfo]
     *
     * where `expression` is a number and `digitInfo` has the following format:
     *
     *     {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
     *
     * - minIntegerDigits is the minimum number of integer digits to use. Defaults to 1.
     * - minFractionDigits is the minimum number of digits after fraction. Defaults to 0.
     * - maxFractionDigits is the maximum number of digits after fraction. Defaults to 3.
     *
     * For more information on the acceptable range for each of these numbers and other
     * details see your native internationalization library.
     *
     * ### Example
     *
     * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='NumberPipe'}
     *
     * @stable
     */
    var DecimalPipe = (function () {
        function DecimalPipe(_locale) {
            this._locale = _locale;
        }
        DecimalPipe.prototype.transform = function (value, digits) {
            if (digits === void 0) { digits = null; }
            return formatNumber(DecimalPipe, this._locale, value, NumberFormatStyle.Decimal, digits);
        };
        DecimalPipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'number' },] },
        ];
        /** @nocollapse */
        DecimalPipe.ctorParameters = [
            { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_core.LOCALE_ID,] },] },
        ];
        return DecimalPipe;
    }());
    /**
     * WARNING: this pipe uses the Internationalization API.
     * Therefore it is only reliable in Chrome and Opera browsers. For other browsers please use an
     * polyfill, for example: [https://github.com/andyearnshaw/Intl.js/].
     *
     * Formats a number as local percent.
     *
     * ### Usage
     *
     *     expression | percent[:digitInfo]
     *
     * For more information about `digitInfo` see {@link DecimalPipe}
     *
     * ### Example
     *
     * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='PercentPipe'}
     *
     * @stable
     */
    var PercentPipe = (function () {
        function PercentPipe(_locale) {
            this._locale = _locale;
        }
        PercentPipe.prototype.transform = function (value, digits) {
            if (digits === void 0) { digits = null; }
            return formatNumber(PercentPipe, this._locale, value, NumberFormatStyle.Percent, digits);
        };
        PercentPipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'percent' },] },
        ];
        /** @nocollapse */
        PercentPipe.ctorParameters = [
            { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_core.LOCALE_ID,] },] },
        ];
        return PercentPipe;
    }());
    /**
     * WARNING: this pipe uses the Internationalization API.
     * Therefore it is only reliable in Chrome and Opera browsers. For other browsers please use an
     * polyfill, for example: [https://github.com/andyearnshaw/Intl.js/].
     *
     *
     * Formats a number as local currency.
     *
     * ### Usage
     *
     *     expression | currency[:currencyCode[:symbolDisplay[:digitInfo]]]
     *
     * where `currencyCode` is the ISO 4217 currency code, such as "USD" for the US dollar and
     * "EUR" for the euro. `symbolDisplay` is a boolean indicating whether to use the currency
     * symbol (e.g. $) or the currency code (e.g. USD) in the output. The default for this value
     * is `false`.
     * For more information about `digitInfo` see {@link DecimalPipe}
     *
     * ### Example
     *
     * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='CurrencyPipe'}
     *
     * @stable
     */
    var CurrencyPipe = (function () {
        function CurrencyPipe(_locale) {
            this._locale = _locale;
        }
        CurrencyPipe.prototype.transform = function (value, currencyCode, symbolDisplay, digits) {
            if (currencyCode === void 0) { currencyCode = 'USD'; }
            if (symbolDisplay === void 0) { symbolDisplay = false; }
            if (digits === void 0) { digits = null; }
            return formatNumber(CurrencyPipe, this._locale, value, NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
        };
        CurrencyPipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'currency' },] },
        ];
        /** @nocollapse */
        CurrencyPipe.ctorParameters = [
            { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_core.LOCALE_ID,] },] },
        ];
        return CurrencyPipe;
    }());

    /**
     * Creates a new List or String containing only a subset (slice) of the
     * elements.
     *
     * The starting index of the subset to return is specified by the `start` parameter.
     *
     * The ending index of the subset to return is specified by the optional `end` parameter.
     *
     * ### Usage
     *
     *     expression | slice:start[:end]
     *
     * All behavior is based on the expected behavior of the JavaScript API
     * Array.prototype.slice() and String.prototype.slice()
     *
     * Where the input expression is a [List] or [String], and `start` is:
     *
     * - **a positive integer**: return the item at _start_ index and all items after
     * in the list or string expression.
     * - **a negative integer**: return the item at _start_ index from the end and all items after
     * in the list or string expression.
     * - **`|start|` greater than the size of the expression**: return an empty list or string.
     * - **`|start|` negative greater than the size of the expression**: return entire list or
     * string expression.
     *
     * and where `end` is:
     *
     * - **omitted**: return all items until the end of the input
     * - **a positive integer**: return all items before _end_ index of the list or string
     * expression.
     * - **a negative integer**: return all items before _end_ index from the end of the list
     * or string expression.
     *
     * When operating on a [List], the returned list is always a copy even when all
     * the elements are being returned.
     *
     * When operating on a blank value, returns it.
     *
     * ## List Example
     *
     * This `ngFor` example:
     *
     * {@example core/pipes/ts/slice_pipe/slice_pipe_example.ts region='SlicePipe_list'}
     *
     * produces the following:
     *
     *     <li>b</li>
     *     <li>c</li>
     *
     * ## String Examples
     *
     * {@example core/pipes/ts/slice_pipe/slice_pipe_example.ts region='SlicePipe_string'}
     *
     * @stable
     */
    var SlicePipe = (function () {
        function SlicePipe() {
        }
        SlicePipe.prototype.transform = function (value, start, end) {
            if (end === void 0) { end = null; }
            if (isBlank(value))
                return value;
            if (!this.supports(value)) {
                throw new InvalidPipeArgumentError(SlicePipe, value);
            }
            if (isString(value)) {
                return StringWrapper.slice(value, start, end);
            }
            return ListWrapper.slice(value, start, end);
        };
        SlicePipe.prototype.supports = function (obj) { return isString(obj) || isArray(obj); };
        SlicePipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'slice', pure: false },] },
        ];
        /** @nocollapse */
        SlicePipe.ctorParameters = [];
        return SlicePipe;
    }());

    /**
     * Implements uppercase transforms to text.
     *
     * ### Example
     *
     * {@example core/pipes/ts/lowerupper_pipe/lowerupper_pipe_example.ts region='LowerUpperPipe'}
     *
     * @stable
     */
    var UpperCasePipe = (function () {
        function UpperCasePipe() {
        }
        UpperCasePipe.prototype.transform = function (value) {
            if (isBlank(value))
                return value;
            if (!isString(value)) {
                throw new InvalidPipeArgumentError(UpperCasePipe, value);
            }
            return value.toUpperCase();
        };
        UpperCasePipe.decorators = [
            { type: _angular_core.Pipe, args: [{ name: 'uppercase' },] },
        ];
        /** @nocollapse */
        UpperCasePipe.ctorParameters = [];
        return UpperCasePipe;
    }());

    /**
     * The `NgClass` directive conditionally adds and removes CSS classes on an HTML element based on
     * an expression's evaluation result.
     *
     * The result of an expression evaluation is interpreted differently depending on type of
     * the expression evaluation result:
     * - `string` - all the CSS classes listed in a string (space delimited) are added
     * - `Array` - all the CSS classes (Array elements) are added
     * - `Object` - each key corresponds to a CSS class name while values are interpreted as expressions
     * evaluating to `Boolean`. If a given expression evaluates to `true` a corresponding CSS class
     * is added - otherwise it is removed.
     *
     * While the `NgClass` directive can interpret expressions evaluating to `string`, `Array`
     * or `Object`, the `Object`-based version is the most often used and has an advantage of keeping
     * all the CSS class names in a template.
     *
     * ### Example ([live demo](http://plnkr.co/edit/a4YdtmWywhJ33uqfpPPn?p=preview)):
     *
     * ```
     * import {Component} from '@angular/core';
     * import {NgClass} from '@angular/common';
     *
     * @Component({
     *   selector: 'toggle-button',
     *   inputs: ['isDisabled'],
     *   template: `
     *      <div class="button" [ngClass]="{active: isOn, disabled: isDisabled}"
     *          (click)="toggle(!isOn)">
     *          Click me!
     *      </div>`,
     *   styles: [`
     *     .button {
     *       width: 120px;
     *       border: medium solid black;
     *     }
     *
     *     .active {
     *       background-color: red;
     *    }
     *
     *     .disabled {
     *       color: gray;
     *       border: medium solid gray;
     *     }
     *   `],
     *   directives: [NgClass]
     * })
     * class ToggleButton {
     *   isOn = false;
     *   isDisabled = false;
     *
     *   toggle(newState) {
     *     if (!this.isDisabled) {
     *       this.isOn = newState;
     *     }
     *   }
     * }
     * ```
     *
     * @stable
     */
    var NgClass = (function () {
        function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
            this._iterableDiffers = _iterableDiffers;
            this._keyValueDiffers = _keyValueDiffers;
            this._ngEl = _ngEl;
            this._renderer = _renderer;
            this._initialClasses = [];
        }
        Object.defineProperty(NgClass.prototype, "initialClasses", {
            set: function (v) {
                this._applyInitialClasses(true);
                this._initialClasses = isPresent(v) && isString(v) ? v.split(' ') : [];
                this._applyInitialClasses(false);
                this._applyClasses(this._rawClass, false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgClass.prototype, "ngClass", {
            set: function (v) {
                this._cleanupClasses(this._rawClass);
                if (isString(v)) {
                    v = v.split(' ');
                }
                this._rawClass = v;
                this._iterableDiffer = null;
                this._keyValueDiffer = null;
                if (isPresent(v)) {
                    if (isListLikeIterable(v)) {
                        this._iterableDiffer = this._iterableDiffers.find(v).create(null);
                    }
                    else {
                        this._keyValueDiffer = this._keyValueDiffers.find(v).create(null);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        NgClass.prototype.ngDoCheck = function () {
            if (isPresent(this._iterableDiffer)) {
                var changes = this._iterableDiffer.diff(this._rawClass);
                if (isPresent(changes)) {
                    this._applyIterableChanges(changes);
                }
            }
            if (isPresent(this._keyValueDiffer)) {
                var changes = this._keyValueDiffer.diff(this._rawClass);
                if (isPresent(changes)) {
                    this._applyKeyValueChanges(changes);
                }
            }
        };
        NgClass.prototype._cleanupClasses = function (rawClassVal) {
            this._applyClasses(rawClassVal, true);
            this._applyInitialClasses(false);
        };
        NgClass.prototype._applyKeyValueChanges = function (changes) {
            var _this = this;
            changes.forEachAddedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
            changes.forEachChangedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
            changes.forEachRemovedItem(function (record) {
                if (record.previousValue) {
                    _this._toggleClass(record.key, false);
                }
            });
        };
        NgClass.prototype._applyIterableChanges = function (changes) {
            var _this = this;
            changes.forEachAddedItem(function (record) { _this._toggleClass(record.item, true); });
            changes.forEachRemovedItem(function (record) { _this._toggleClass(record.item, false); });
        };
        NgClass.prototype._applyInitialClasses = function (isCleanup) {
            var _this = this;
            this._initialClasses.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
        };
        NgClass.prototype._applyClasses = function (rawClassVal, isCleanup) {
            var _this = this;
            if (isPresent(rawClassVal)) {
                if (isArray(rawClassVal)) {
                    rawClassVal.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
                }
                else if (rawClassVal instanceof Set) {
                    rawClassVal.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
                }
                else {
                    StringMapWrapper.forEach(rawClassVal, function (expVal, className) {
                        if (isPresent(expVal))
                            _this._toggleClass(className, !isCleanup);
                    });
                }
            }
        };
        NgClass.prototype._toggleClass = function (className, enabled) {
            className = className.trim();
            if (className.length > 0) {
                if (className.indexOf(' ') > -1) {
                    var classes = className.split(/\s+/g);
                    for (var i = 0, len = classes.length; i < len; i++) {
                        this._renderer.setElementClass(this._ngEl.nativeElement, classes[i], enabled);
                    }
                }
                else {
                    this._renderer.setElementClass(this._ngEl.nativeElement, className, enabled);
                }
            }
        };
        NgClass.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngClass]' },] },
        ];
        /** @nocollapse */
        NgClass.ctorParameters = [
            { type: _angular_core.IterableDiffers, },
            { type: _angular_core.KeyValueDiffers, },
            { type: _angular_core.ElementRef, },
            { type: _angular_core.Renderer, },
        ];
        NgClass.propDecorators = {
            'initialClasses': [{ type: _angular_core.Input, args: ['class',] },],
            'ngClass': [{ type: _angular_core.Input },],
        };
        return NgClass;
    }());

    var NgForRow = (function () {
        function NgForRow($implicit, index, count) {
            this.$implicit = $implicit;
            this.index = index;
            this.count = count;
        }
        Object.defineProperty(NgForRow.prototype, "first", {
            get: function () { return this.index === 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgForRow.prototype, "last", {
            get: function () { return this.index === this.count - 1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgForRow.prototype, "even", {
            get: function () { return this.index % 2 === 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgForRow.prototype, "odd", {
            get: function () { return !this.even; },
            enumerable: true,
            configurable: true
        });
        return NgForRow;
    }());
    /**
     * The `NgFor` directive instantiates a template once per item from an iterable. The context for
     * each instantiated template inherits from the outer context with the given loop variable set
     * to the current item from the iterable.
     *
     * ### Local Variables
     *
     * `NgFor` provides several exported values that can be aliased to local variables:
     *
     * * `index` will be set to the current loop iteration for each template context.
     * * `first` will be set to a boolean value indicating whether the item is the first one in the
     *   iteration.
     * * `last` will be set to a boolean value indicating whether the item is the last one in the
     *   iteration.
     * * `even` will be set to a boolean value indicating whether this item has an even index.
     * * `odd` will be set to a boolean value indicating whether this item has an odd index.
     *
     * ### Change Propagation
     *
     * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
     *
     * * When an item is added, a new instance of the template is added to the DOM.
     * * When an item is removed, its template instance is removed from the DOM.
     * * When items are reordered, their respective templates are reordered in the DOM.
     * * Otherwise, the DOM element for that item will remain the same.
     *
     * Angular uses object identity to track insertions and deletions within the iterator and reproduce
     * those changes in the DOM. This has important implications for animations and any stateful
     * controls
     * (such as `<input>` elements which accept user input) that are present. Inserted rows can be
     * animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state such
     * as user input.
     *
     * It is possible for the identities of elements in the iterator to change while the data does not.
     * This can happen, for example, if the iterator produced from an RPC to the server, and that
     * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
     * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
     * elements were deleted and all new elements inserted). This is an expensive operation and should
     * be avoided if possible.
     *
     * To customize the default tracking algorithm, `NgFor` supports `trackBy` option.
     * `trackBy` takes a function which has two arguments: `index` and `item`.
     * If `trackBy` is given, Angular tracks changes by the return value of the function.
     *
     * ### Syntax
     *
     * - `<li *ngFor="let item of items; let i = index; trackBy: trackByFn">...</li>`
     * - `<li template="ngFor let item of items; let i = index; trackBy: trackByFn">...</li>`
     *
     * With `<template>` element:
     *
     * ```
     * <template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
     *   <li>...</li>
     * </template>
     * ```
     *
     * ### Example
     *
     * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
     * example.
     *
     * @stable
     */
    var NgFor = (function () {
        function NgFor(_viewContainer, _templateRef, _iterableDiffers, _cdr) {
            this._viewContainer = _viewContainer;
            this._templateRef = _templateRef;
            this._iterableDiffers = _iterableDiffers;
            this._cdr = _cdr;
        }
        Object.defineProperty(NgFor.prototype, "ngForTemplate", {
            set: function (value) {
                if (isPresent(value)) {
                    this._templateRef = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        NgFor.prototype.ngOnChanges = function (changes) {
            if ('ngForOf' in changes) {
                // React on ngForOf changes only once all inputs have been initialized
                var value = changes['ngForOf'].currentValue;
                if (isBlank(this._differ) && isPresent(value)) {
                    try {
                        this._differ = this._iterableDiffers.find(value).create(this._cdr, this.ngForTrackBy);
                    }
                    catch (e) {
                        throw new Error("Cannot find a differ supporting object '" + value + "' of type '" + getTypeNameForDebugging(value) + "'. NgFor only supports binding to Iterables such as Arrays.");
                    }
                }
            }
        };
        NgFor.prototype.ngDoCheck = function () {
            if (isPresent(this._differ)) {
                var changes = this._differ.diff(this.ngForOf);
                if (isPresent(changes))
                    this._applyChanges(changes);
            }
        };
        NgFor.prototype._applyChanges = function (changes) {
            var _this = this;
            var insertTuples = [];
            changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
                if (item.previousIndex == null) {
                    var view = _this._viewContainer.createEmbeddedView(_this._templateRef, new NgForRow(null, null, null), currentIndex);
                    var tuple = new RecordViewTuple(item, view);
                    insertTuples.push(tuple);
                }
                else if (currentIndex == null) {
                    _this._viewContainer.remove(adjustedPreviousIndex);
                }
                else {
                    var view = _this._viewContainer.get(adjustedPreviousIndex);
                    _this._viewContainer.move(view, currentIndex);
                    var tuple = new RecordViewTuple(item, view);
                    insertTuples.push(tuple);
                }
            });
            for (var i = 0; i < insertTuples.length; i++) {
                this._perViewChange(insertTuples[i].view, insertTuples[i].record);
            }
            for (var i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
                var viewRef = this._viewContainer.get(i);
                viewRef.context.index = i;
                viewRef.context.count = ilen;
            }
            changes.forEachIdentityChange(function (record) {
                var viewRef = _this._viewContainer.get(record.currentIndex);
                viewRef.context.$implicit = record.item;
            });
        };
        NgFor.prototype._perViewChange = function (view, record) {
            view.context.$implicit = record.item;
        };
        NgFor.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngFor][ngForOf]' },] },
        ];
        /** @nocollapse */
        NgFor.ctorParameters = [
            { type: _angular_core.ViewContainerRef, },
            { type: _angular_core.TemplateRef, },
            { type: _angular_core.IterableDiffers, },
            { type: _angular_core.ChangeDetectorRef, },
        ];
        NgFor.propDecorators = {
            'ngForOf': [{ type: _angular_core.Input },],
            'ngForTrackBy': [{ type: _angular_core.Input },],
            'ngForTemplate': [{ type: _angular_core.Input },],
        };
        return NgFor;
    }());
    var RecordViewTuple = (function () {
        function RecordViewTuple(record, view) {
            this.record = record;
            this.view = view;
        }
        return RecordViewTuple;
    }());

    /**
     * Removes or recreates a portion of the DOM tree based on an {expression}.
     *
     * If the expression assigned to `ngIf` evaluates to a false value then the element
     * is removed from the DOM, otherwise a clone of the element is reinserted into the DOM.
     *
     * ### Example ([live demo](http://plnkr.co/edit/fe0kgemFBtmQOY31b4tw?p=preview)):
     *
     * ```
     * <div *ngIf="errorCount > 0" class="error">
     *   <!-- Error message displayed when the errorCount property on the current context is greater
     * than 0. -->
     *   {{errorCount}} errors detected
     * </div>
     * ```
     *
     * ### Syntax
     *
     * - `<div *ngIf="condition">...</div>`
     * - `<div template="ngIf condition">...</div>`
     * - `<template [ngIf]="condition"><div>...</div></template>`
     *
     * @stable
     */
    var NgIf = (function () {
        function NgIf(_viewContainer, _templateRef) {
            this._viewContainer = _viewContainer;
            this._templateRef = _templateRef;
            this._prevCondition = null;
        }
        Object.defineProperty(NgIf.prototype, "ngIf", {
            set: function (newCondition) {
                if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
                    this._prevCondition = true;
                    this._viewContainer.createEmbeddedView(this._templateRef);
                }
                else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
                    this._prevCondition = false;
                    this._viewContainer.clear();
                }
            },
            enumerable: true,
            configurable: true
        });
        NgIf.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngIf]' },] },
        ];
        /** @nocollapse */
        NgIf.ctorParameters = [
            { type: _angular_core.ViewContainerRef, },
            { type: _angular_core.TemplateRef, },
        ];
        NgIf.propDecorators = {
            'ngIf': [{ type: _angular_core.Input },],
        };
        return NgIf;
    }());

    var _CASE_DEFAULT = new Object();
    var SwitchView = (function () {
        function SwitchView(_viewContainerRef, _templateRef) {
            this._viewContainerRef = _viewContainerRef;
            this._templateRef = _templateRef;
        }
        SwitchView.prototype.create = function () { this._viewContainerRef.createEmbeddedView(this._templateRef); };
        SwitchView.prototype.destroy = function () { this._viewContainerRef.clear(); };
        return SwitchView;
    }());
    /**
     * Adds or removes DOM sub-trees when their match expressions match the switch expression.
     *
     * Elements within `NgSwitch` but without `NgSwitchCase` or `NgSwitchDefault` directives will be
     * preserved at the location as specified in the template.
     *
     * `NgSwitch` simply inserts nested elements based on which match expression matches the value
     * obtained from the evaluated switch expression. In other words, you define a container element
     * (where you place the directive with a switch expression on the
     * `[ngSwitch]="..."` attribute), define any inner elements inside of the directive and
     * place a `[ngSwitchCase]` attribute per element.
     *
     * The `ngSwitchCase` property is used to inform `NgSwitch` which element to display when the
     * expression is evaluated. If a matching expression is not found via a `ngSwitchCase` property
     * then an element with the `ngSwitchDefault` attribute is displayed.
     *
     * ### Example ([live demo](http://plnkr.co/edit/DQMTII95CbuqWrl3lYAs?p=preview))
     *
     * ```typescript
     * @Component({
     *   selector: 'app',
     *   template: `
     *     <p>Value = {{value}}</p>
     *     <button (click)="inc()">Increment</button>
     *
     *     <div [ngSwitch]="value">
     *       <p *ngSwitchCase="'init'">increment to start</p>
     *       <p *ngSwitchCase="0">0, increment again</p>
     *       <p *ngSwitchCase="1">1, increment again</p>
     *       <p *ngSwitchCase="2">2, stop incrementing</p>
     *       <p *ngSwitchDefault>&gt; 2, STOP!</p>
     *     </div>
     *
     *     <!-- alternate syntax -->
     *
     *     <p [ngSwitch]="value">
     *       <template ngSwitchCase="init">increment to start</template>
     *       <template [ngSwitchCase]="0">0, increment again</template>
     *       <template [ngSwitchCase]="1">1, increment again</template>
     *       <template [ngSwitchCase]="2">2, stop incrementing</template>
     *       <template ngSwitchDefault>&gt; 2, STOP!</template>
     *     </p>
     *   `,
     *   directives: [NgSwitch, NgSwitchCase, NgSwitchDefault]
     * })
     * export class App {
     *   value = 'init';
     *
     *   inc() {
     *     this.value = this.value === 'init' ? 0 : this.value + 1;
     *   }
     * }
     * ```
     *
     * @stable
     */
    var NgSwitch = (function () {
        function NgSwitch() {
            this._useDefault = false;
            this._valueViews = new Map();
            this._activeViews = [];
        }
        Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
            set: function (value) {
                // Empty the currently active ViewContainers
                this._emptyAllActiveViews();
                // Add the ViewContainers matching the value (with a fallback to default)
                this._useDefault = false;
                var views = this._valueViews.get(value);
                if (isBlank(views)) {
                    this._useDefault = true;
                    views = normalizeBlank(this._valueViews.get(_CASE_DEFAULT));
                }
                this._activateViews(views);
                this._switchValue = value;
            },
            enumerable: true,
            configurable: true
        });
        /** @internal */
        NgSwitch.prototype._onCaseValueChanged = function (oldCase, newCase, view) {
            this._deregisterView(oldCase, view);
            this._registerView(newCase, view);
            if (oldCase === this._switchValue) {
                view.destroy();
                ListWrapper.remove(this._activeViews, view);
            }
            else if (newCase === this._switchValue) {
                if (this._useDefault) {
                    this._useDefault = false;
                    this._emptyAllActiveViews();
                }
                view.create();
                this._activeViews.push(view);
            }
            // Switch to default when there is no more active ViewContainers
            if (this._activeViews.length === 0 && !this._useDefault) {
                this._useDefault = true;
                this._activateViews(this._valueViews.get(_CASE_DEFAULT));
            }
        };
        /** @internal */
        NgSwitch.prototype._emptyAllActiveViews = function () {
            var activeContainers = this._activeViews;
            for (var i = 0; i < activeContainers.length; i++) {
                activeContainers[i].destroy();
            }
            this._activeViews = [];
        };
        /** @internal */
        NgSwitch.prototype._activateViews = function (views) {
            // TODO(vicb): assert(this._activeViews.length === 0);
            if (isPresent(views)) {
                for (var i = 0; i < views.length; i++) {
                    views[i].create();
                }
                this._activeViews = views;
            }
        };
        /** @internal */
        NgSwitch.prototype._registerView = function (value, view) {
            var views = this._valueViews.get(value);
            if (isBlank(views)) {
                views = [];
                this._valueViews.set(value, views);
            }
            views.push(view);
        };
        /** @internal */
        NgSwitch.prototype._deregisterView = function (value, view) {
            // `_CASE_DEFAULT` is used a marker for non-registered cases
            if (value === _CASE_DEFAULT)
                return;
            var views = this._valueViews.get(value);
            if (views.length == 1) {
                this._valueViews.delete(value);
            }
            else {
                ListWrapper.remove(views, view);
            }
        };
        NgSwitch.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngSwitch]' },] },
        ];
        /** @nocollapse */
        NgSwitch.ctorParameters = [];
        NgSwitch.propDecorators = {
            'ngSwitch': [{ type: _angular_core.Input },],
        };
        return NgSwitch;
    }());
    /**
     * Insert the sub-tree when the `ngSwitchCase` expression evaluates to the same value as the
     * enclosing switch expression.
     *
     * If multiple match expression match the switch expression value, all of them are displayed.
     *
     * See {@link NgSwitch} for more details and example.
     *
     * @stable
     */
    var NgSwitchCase = (function () {
        function NgSwitchCase(viewContainer, templateRef, ngSwitch) {
            // `_CASE_DEFAULT` is used as a marker for a not yet initialized value
            /** @internal */
            this._value = _CASE_DEFAULT;
            this._switch = ngSwitch;
            this._view = new SwitchView(viewContainer, templateRef);
        }
        Object.defineProperty(NgSwitchCase.prototype, "ngSwitchCase", {
            set: function (value) {
                this._switch._onCaseValueChanged(this._value, value, this._view);
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        NgSwitchCase.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngSwitchCase]' },] },
        ];
        /** @nocollapse */
        NgSwitchCase.ctorParameters = [
            { type: _angular_core.ViewContainerRef, },
            { type: _angular_core.TemplateRef, },
            { type: NgSwitch, decorators: [{ type: _angular_core.Host },] },
        ];
        NgSwitchCase.propDecorators = {
            'ngSwitchCase': [{ type: _angular_core.Input },],
        };
        return NgSwitchCase;
    }());
    /**
     * Default case statements are displayed when no match expression matches the switch expression
     * value.
     *
     * See {@link NgSwitch} for more details and example.
     *
     * @stable
     */
    var NgSwitchDefault = (function () {
        function NgSwitchDefault(viewContainer, templateRef, sswitch) {
            sswitch._registerView(_CASE_DEFAULT, new SwitchView(viewContainer, templateRef));
        }
        NgSwitchDefault.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngSwitchDefault]' },] },
        ];
        /** @nocollapse */
        NgSwitchDefault.ctorParameters = [
            { type: _angular_core.ViewContainerRef, },
            { type: _angular_core.TemplateRef, },
            { type: NgSwitch, decorators: [{ type: _angular_core.Host },] },
        ];
        return NgSwitchDefault;
    }());

    /**
     * `ngPlural` is an i18n directive that displays DOM sub-trees that match the switch expression
     * value, or failing that, DOM sub-trees that match the switch expression's pluralization category.
     *
     * To use this directive you must provide a container element that sets the `[ngPlural]` attribute
     * to a
     * switch expression.
     *    - Inner elements defined with an `[ngPluralCase]` attribute will display based on their
     * expression.
     *    - If `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
     * matches the switch expression exactly.
     *    - Otherwise, the view will be treated as a "category match", and will only display if exact
     * value matches aren't found and the value maps to its category for the defined locale.
     *
     * ```typescript
     * @Component({
     *    selector: 'app',
     *    // best practice is to define the locale at the application level
     *    providers: [{provide: LOCALE_ID, useValue: 'en_US'}]
     * })
     * @View({
     *   template: `
     *     <p>Value = {{value}}</p>
     *     <button (click)="inc()">Increment</button>
     *
     *     <div [ngPlural]="value">
     *       <template ngPluralCase="=0">there is nothing</template>
     *       <template ngPluralCase="=1">there is one</template>
     *       <template ngPluralCase="few">there are a few</template>
     *       <template ngPluralCase="other">there is some number</template>
     *     </div>
     *   `,
     *   directives: [NgPlural, NgPluralCase]
     * })
     * export class App {
     *   value = 'init';
     *
     *   inc() {
     *     this.value = this.value === 'init' ? 0 : this.value + 1;
     *   }
     * }
     *
     * ```
     * @experimental
     */
    var NgPlural = (function () {
        function NgPlural(_localization) {
            this._localization = _localization;
            this._caseViews = {};
        }
        Object.defineProperty(NgPlural.prototype, "ngPlural", {
            set: function (value) {
                this._switchValue = value;
                this._updateView();
            },
            enumerable: true,
            configurable: true
        });
        NgPlural.prototype.addCase = function (value, switchView) { this._caseViews[value] = switchView; };
        /** @internal */
        NgPlural.prototype._updateView = function () {
            this._clearViews();
            var key = getPluralCategory(this._switchValue, Object.keys(this._caseViews), this._localization);
            this._activateView(this._caseViews[key]);
        };
        /** @internal */
        NgPlural.prototype._clearViews = function () {
            if (isPresent(this._activeView))
                this._activeView.destroy();
        };
        /** @internal */
        NgPlural.prototype._activateView = function (view) {
            if (!isPresent(view))
                return;
            this._activeView = view;
            this._activeView.create();
        };
        NgPlural.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngPlural]' },] },
        ];
        /** @nocollapse */
        NgPlural.ctorParameters = [
            { type: NgLocalization, },
        ];
        NgPlural.propDecorators = {
            'ngPlural': [{ type: _angular_core.Input },],
        };
        return NgPlural;
    }());
    /**
     * @experimental
     */
    var NgPluralCase = (function () {
        function NgPluralCase(value, template, viewContainer, ngPlural) {
            this.value = value;
            ngPlural.addCase(value, new SwitchView(viewContainer, template));
        }
        NgPluralCase.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngPluralCase]' },] },
        ];
        /** @nocollapse */
        NgPluralCase.ctorParameters = [
            { type: undefined, decorators: [{ type: _angular_core.Attribute, args: ['ngPluralCase',] },] },
            { type: _angular_core.TemplateRef, },
            { type: _angular_core.ViewContainerRef, },
            { type: NgPlural, decorators: [{ type: _angular_core.Host },] },
        ];
        return NgPluralCase;
    }());

    /**
     * The `NgStyle` directive changes styles based on a result of expression evaluation.
     *
     * An expression assigned to the `ngStyle` property must evaluate to an object and the
     * corresponding element styles are updated based on changes to this object. Style names to update
     * are taken from the object's keys, and values - from the corresponding object's values.
     *
     * ### Syntax
     *
     * - `<div [ngStyle]="{'font-style': styleExp}"></div>`
     * - `<div [ngStyle]="{'max-width.px': widthExp}"></div>`
     * - `<div [ngStyle]="styleExp"></div>` - here the `styleExp` must evaluate to an object
     *
     * ### Example ([live demo](http://plnkr.co/edit/YamGS6GkUh9GqWNQhCyM?p=preview)):
     *
     * ```
     * import {Component} from '@angular/core';
     * import {NgStyle} from '@angular/common';
     *
     * @Component({
     *  selector: 'ngStyle-example',
     *  template: `
     *    <h1 [ngStyle]="{'font-style': style, 'font-size': size, 'font-weight': weight}">
     *      Change style of this text!
     *    </h1>
     *
     *    <hr>
     *
     *    <label>Italic: <input type="checkbox" (change)="changeStyle($event)"></label>
     *    <label>Bold: <input type="checkbox" (change)="changeWeight($event)"></label>
     *    <label>Size: <input type="text" [value]="size" (change)="size = $event.target.value"></label>
     *  `,
     *  directives: [NgStyle]
     * })
     * export class NgStyleExample {
     *    style = 'normal';
     *    weight = 'normal';
     *    size = '20px';
     *
     *    changeStyle($event: any) {
     *      this.style = $event.target.checked ? 'italic' : 'normal';
     *    }
     *
     *    changeWeight($event: any) {
     *      this.weight = $event.target.checked ? 'bold' : 'normal';
     *    }
     * }
     * ```
     *
     * In this example the `font-style`, `font-size` and `font-weight` styles will be updated
     * based on the `style` property's value changes.
     *
     * @stable
     */
    var NgStyle = (function () {
        function NgStyle(_differs, _ngEl, _renderer) {
            this._differs = _differs;
            this._ngEl = _ngEl;
            this._renderer = _renderer;
        }
        Object.defineProperty(NgStyle.prototype, "ngStyle", {
            set: function (v) {
                this._ngStyle = v;
                if (isBlank(this._differ) && isPresent(v)) {
                    this._differ = this._differs.find(this._ngStyle).create(null);
                }
            },
            enumerable: true,
            configurable: true
        });
        NgStyle.prototype.ngDoCheck = function () {
            if (isPresent(this._differ)) {
                var changes = this._differ.diff(this._ngStyle);
                if (isPresent(changes)) {
                    this._applyChanges(changes);
                }
            }
        };
        NgStyle.prototype._applyChanges = function (changes) {
            var _this = this;
            changes.forEachRemovedItem(function (record) { _this._setStyle(record.key, null); });
            changes.forEachAddedItem(function (record) { _this._setStyle(record.key, record.currentValue); });
            changes.forEachChangedItem(function (record) { _this._setStyle(record.key, record.currentValue); });
        };
        NgStyle.prototype._setStyle = function (name, val) {
            var nameParts = name.split('.');
            var nameToSet = nameParts[0];
            var valToSet = isPresent(val) && nameParts.length === 2 ? "" + val + nameParts[1] : val;
            this._renderer.setElementStyle(this._ngEl.nativeElement, nameToSet, valToSet);
        };
        NgStyle.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngStyle]' },] },
        ];
        /** @nocollapse */
        NgStyle.ctorParameters = [
            { type: _angular_core.KeyValueDiffers, },
            { type: _angular_core.ElementRef, },
            { type: _angular_core.Renderer, },
        ];
        NgStyle.propDecorators = {
            'ngStyle': [{ type: _angular_core.Input },],
        };
        return NgStyle;
    }());

    /**
     * Creates and inserts an embedded view based on a prepared `TemplateRef`.
     * You can attach a context object to the `EmbeddedViewRef` by setting `[ngOutletContext]`.
     * `[ngOutletContext]` should be an object, the object's keys will be the local template variables
     * available within the `TemplateRef`.
     *
     * Note: using the key `$implicit` in the context object will set it's value as default.
     *
     * ### Syntax
     *
     * ```
     * <template [ngTemplateOutlet]="templateRefExpression"
     *           [ngOutletContext]="objectExpression">
     * </template>
     * ```
     *
     * @experimental
     */
    var NgTemplateOutlet = (function () {
        function NgTemplateOutlet(_viewContainerRef) {
            this._viewContainerRef = _viewContainerRef;
        }
        Object.defineProperty(NgTemplateOutlet.prototype, "ngOutletContext", {
            set: function (context) { this._context = context; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgTemplateOutlet.prototype, "ngTemplateOutlet", {
            set: function (templateRef) { this._templateRef = templateRef; },
            enumerable: true,
            configurable: true
        });
        NgTemplateOutlet.prototype.ngOnChanges = function () {
            if (this._viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._viewRef));
            }
            if (this._templateRef) {
                this._viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);
            }
        };
        NgTemplateOutlet.decorators = [
            { type: _angular_core.Directive, args: [{ selector: '[ngTemplateOutlet]' },] },
        ];
        /** @nocollapse */
        NgTemplateOutlet.ctorParameters = [
            { type: _angular_core.ViewContainerRef, },
        ];
        NgTemplateOutlet.propDecorators = {
            'ngOutletContext': [{ type: _angular_core.Input },],
            'ngTemplateOutlet': [{ type: _angular_core.Input },],
        };
        return NgTemplateOutlet;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * This class should not be used directly by an application developer. Instead, use
     * {@link Location}.
     *
     * `PlatformLocation` encapsulates all calls to DOM apis, which allows the Router to be platform
     * agnostic.
     * This means that we can have different implementation of `PlatformLocation` for the different
     * platforms
     * that angular supports. For example, the default `PlatformLocation` is {@link
     * BrowserPlatformLocation},
     * however when you run your app in a WebWorker you use {@link WebWorkerPlatformLocation}.
     *
     * The `PlatformLocation` class is used directly by all implementations of {@link LocationStrategy}
     * when
     * they need to interact with the DOM apis like pushState, popState, etc...
     *
     * {@link LocationStrategy} in turn is used by the {@link Location} service which is used directly
     * by
     * the {@link Router} in order to navigate between routes. Since all interactions between {@link
     * Router} /
     * {@link Location} / {@link LocationStrategy} and DOM apis flow through the `PlatformLocation`
     * class
     * they are all platform independent.
     *
     * @stable
     */
    var PlatformLocation = (function () {
        function PlatformLocation() {
        }
        Object.defineProperty(PlatformLocation.prototype, "pathname", {
            get: function () { return null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlatformLocation.prototype, "search", {
            get: function () { return null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlatformLocation.prototype, "hash", {
            get: function () { return null; },
            enumerable: true,
            configurable: true
        });
        return PlatformLocation;
    }());

    /**
     * `LocationStrategy` is responsible for representing and reading route state
     * from the browser's URL. Angular provides two strategies:
     * {@link HashLocationStrategy} and {@link PathLocationStrategy} (default).
     *
     * This is used under the hood of the {@link Location} service.
     *
     * Applications should use the {@link Router} or {@link Location} services to
     * interact with application route state.
     *
     * For instance, {@link HashLocationStrategy} produces URLs like
     * `http://example.com#/foo`, and {@link PathLocationStrategy} produces
     * `http://example.com/foo` as an equivalent URL.
     *
     * See these two classes for more.
     *
     * @stable
     */
    var LocationStrategy = (function () {
        function LocationStrategy() {
        }
        return LocationStrategy;
    }());
    /**
     * The `APP_BASE_HREF` token represents the base href to be used with the
     * {@link PathLocationStrategy}.
     *
     * If you're using {@link PathLocationStrategy}, you must provide a provider to a string
     * representing the URL prefix that should be preserved when generating and recognizing
     * URLs.
     *
     * ### Example
     *
     * import {Component, NgModule} from '@angular/core';
     * import {APP_BASE_HREF} from '@angular/common';
     *
     * @NgModule({
     *   providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
     * })
     * class AppModule {}
     * ```
     *
     * @stable
     */
    var APP_BASE_HREF = new _angular_core.OpaqueToken('appBaseHref');

    /**
     * `Location` is a service that applications can use to interact with a browser's URL.
     * Depending on which {@link LocationStrategy} is used, `Location` will either persist
     * to the URL's path or the URL's hash segment.
     *
     * Note: it's better to use {@link Router#navigate} service to trigger route changes. Use
     * `Location` only if you need to interact with or create normalized URLs outside of
     * routing.
     *
     * `Location` is responsible for normalizing the URL against the application's base href.
     * A normalized URL is absolute from the URL host, includes the application's base href, and has no
     * trailing slash:
     * - `/my/app/user/123` is normalized
     * - `my/app/user/123` **is not** normalized
     * - `/my/app/user/123/` **is not** normalized
     *
     * ### Example
     *
     * ```
     * import {Component} from '@angular/core';
     * import {Location} from '@angular/common';
     *
     * @Component({selector: 'app-component'})
     * class AppCmp {
     *   constructor(location: Location) {
     *     location.go('/foo');
     *   }
     * }
     * ```
     *
     * @stable
     */
    var Location = (function () {
        function Location(platformStrategy) {
            var _this = this;
            /** @internal */
            this._subject = new _angular_core.EventEmitter();
            this._platformStrategy = platformStrategy;
            var browserBaseHref = this._platformStrategy.getBaseHref();
            this._baseHref = Location.stripTrailingSlash(_stripIndexHtml(browserBaseHref));
            this._platformStrategy.onPopState(function (ev) { _this._subject.emit({ 'url': _this.path(true), 'pop': true, 'type': ev.type }); });
        }
        /**
         * Returns the normalized URL path.
         */
        // TODO: vsavkin. Remove the boolean flag and always include hash once the deprecated router is
        // removed.
        Location.prototype.path = function (includeHash) {
            if (includeHash === void 0) { includeHash = false; }
            return this.normalize(this._platformStrategy.path(includeHash));
        };
        /**
         * Normalizes the given path and compares to the current normalized path.
         */
        Location.prototype.isCurrentPathEqualTo = function (path, query) {
            if (query === void 0) { query = ''; }
            return this.path() == this.normalize(path + Location.normalizeQueryParams(query));
        };
        /**
         * Given a string representing a URL, returns the normalized URL path without leading or
         * trailing slashes
         */
        Location.prototype.normalize = function (url) {
            return Location.stripTrailingSlash(_stripBaseHref(this._baseHref, _stripIndexHtml(url)));
        };
        /**
         * Given a string representing a URL, returns the platform-specific external URL path.
         * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
         * before normalizing. This method will also add a hash if `HashLocationStrategy` is
         * used, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
         */
        Location.prototype.prepareExternalUrl = function (url) {
            if (url.length > 0 && !url.startsWith('/')) {
                url = '/' + url;
            }
            return this._platformStrategy.prepareExternalUrl(url);
        };
        // TODO: rename this method to pushState
        /**
         * Changes the browsers URL to the normalized version of the given URL, and pushes a
         * new item onto the platform's history.
         */
        Location.prototype.go = function (path, query) {
            if (query === void 0) { query = ''; }
            this._platformStrategy.pushState(null, '', path, query);
        };
        /**
         * Changes the browsers URL to the normalized version of the given URL, and replaces
         * the top item on the platform's history stack.
         */
        Location.prototype.replaceState = function (path, query) {
            if (query === void 0) { query = ''; }
            this._platformStrategy.replaceState(null, '', path, query);
        };
        /**
         * Navigates forward in the platform's history.
         */
        Location.prototype.forward = function () { this._platformStrategy.forward(); };
        /**
         * Navigates back in the platform's history.
         */
        Location.prototype.back = function () { this._platformStrategy.back(); };
        /**
         * Subscribe to the platform's `popState` events.
         */
        Location.prototype.subscribe = function (onNext, onThrow, onReturn) {
            if (onThrow === void 0) { onThrow = null; }
            if (onReturn === void 0) { onReturn = null; }
            return this._subject.subscribe({ next: onNext, error: onThrow, complete: onReturn });
        };
        /**
         * Given a string of url parameters, prepend with '?' if needed, otherwise return parameters as
         * is.
         */
        Location.normalizeQueryParams = function (params) {
            return (params.length > 0 && params.substring(0, 1) != '?') ? ('?' + params) : params;
        };
        /**
         * Given 2 parts of a url, join them with a slash if needed.
         */
        Location.joinWithSlash = function (start, end) {
            if (start.length == 0) {
                return end;
            }
            if (end.length == 0) {
                return start;
            }
            var slashes = 0;
            if (start.endsWith('/')) {
                slashes++;
            }
            if (end.startsWith('/')) {
                slashes++;
            }
            if (slashes == 2) {
                return start + end.substring(1);
            }
            if (slashes == 1) {
                return start + end;
            }
            return start + '/' + end;
        };
        /**
         * If url has a trailing slash, remove it, otherwise return url as is.
         */
        Location.stripTrailingSlash = function (url) {
            if (/\/$/g.test(url)) {
                url = url.substring(0, url.length - 1);
            }
            return url;
        };
        Location.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        Location.ctorParameters = [
            { type: LocationStrategy, },
        ];
        return Location;
    }());
    function _stripBaseHref(baseHref, url) {
        if (baseHref.length > 0 && url.startsWith(baseHref)) {
            return url.substring(baseHref.length);
        }
        return url;
    }
    function _stripIndexHtml(url) {
        if (/\/index.html$/g.test(url)) {
            // '/index.html'.length == 11
            return url.substring(0, url.length - 11);
        }
        return url;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$3 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * `HashLocationStrategy` is a {@link LocationStrategy} used to configure the
     * {@link Location} service to represent its state in the
     * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
     * of the browser's URL.
     *
     * For instance, if you call `location.go('/foo')`, the browser's URL will become
     * `example.com#/foo`.
     *
     * ### Example
     *
     * ```
     * import {Component, NgModule} from '@angular/core';
     * import {
     *   LocationStrategy,
     *   HashLocationStrategy
     * } from '@angular/common';
     *
     * @NgModule({
     *   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
     * })
     * class AppModule {}
     * ```
     *
     * @stable
     */
    var HashLocationStrategy = (function (_super) {
        __extends$3(HashLocationStrategy, _super);
        function HashLocationStrategy(_platformLocation, _baseHref) {
            _super.call(this);
            this._platformLocation = _platformLocation;
            this._baseHref = '';
            if (isPresent(_baseHref)) {
                this._baseHref = _baseHref;
            }
        }
        HashLocationStrategy.prototype.onPopState = function (fn) {
            this._platformLocation.onPopState(fn);
            this._platformLocation.onHashChange(fn);
        };
        HashLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
        HashLocationStrategy.prototype.path = function (includeHash) {
            if (includeHash === void 0) { includeHash = false; }
            // the hash value is always prefixed with a `#`
            // and if it is empty then it will stay empty
            var path = this._platformLocation.hash;
            if (!isPresent(path))
                path = '#';
            return path.length > 0 ? path.substring(1) : path;
        };
        HashLocationStrategy.prototype.prepareExternalUrl = function (internal) {
            var url = Location.joinWithSlash(this._baseHref, internal);
            return url.length > 0 ? ('#' + url) : url;
        };
        HashLocationStrategy.prototype.pushState = function (state, title, path, queryParams) {
            var url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
            if (url.length == 0) {
                url = this._platformLocation.pathname;
            }
            this._platformLocation.pushState(state, title, url);
        };
        HashLocationStrategy.prototype.replaceState = function (state, title, path, queryParams) {
            var url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
            if (url.length == 0) {
                url = this._platformLocation.pathname;
            }
            this._platformLocation.replaceState(state, title, url);
        };
        HashLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
        HashLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
        HashLocationStrategy.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        HashLocationStrategy.ctorParameters = [
            { type: PlatformLocation, },
            { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [APP_BASE_HREF,] },] },
        ];
        return HashLocationStrategy;
    }(LocationStrategy));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$4 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * `PathLocationStrategy` is a {@link LocationStrategy} used to configure the
     * {@link Location} service to represent its state in the
     * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
     * browser's URL.
     *
     * `PathLocationStrategy` is the default binding for {@link LocationStrategy}
     * provided in {@link ROUTER_PROVIDERS}.
     *
     * If you're using `PathLocationStrategy`, you must provide a {@link APP_BASE_HREF}
     * or add a base element to the document. This URL prefix that will be preserved
     * when generating and recognizing URLs.
     *
     * For instance, if you provide an `APP_BASE_HREF` of `'/my/app'` and call
     * `location.go('/foo')`, the browser's URL will become
     * `example.com/my/app/foo`.
     *
     * Similarly, if you add `<base href='/my/app'/>` to the document and call
     * `location.go('/foo')`, the browser's URL will become
     * `example.com/my/app/foo`.
     *
     * @stable
     */
    var PathLocationStrategy = (function (_super) {
        __extends$4(PathLocationStrategy, _super);
        function PathLocationStrategy(_platformLocation, href) {
            _super.call(this);
            this._platformLocation = _platformLocation;
            if (isBlank(href)) {
                href = this._platformLocation.getBaseHrefFromDOM();
            }
            if (isBlank(href)) {
                throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
            }
            this._baseHref = href;
        }
        PathLocationStrategy.prototype.onPopState = function (fn) {
            this._platformLocation.onPopState(fn);
            this._platformLocation.onHashChange(fn);
        };
        PathLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
        PathLocationStrategy.prototype.prepareExternalUrl = function (internal) {
            return Location.joinWithSlash(this._baseHref, internal);
        };
        PathLocationStrategy.prototype.path = function (includeHash) {
            if (includeHash === void 0) { includeHash = false; }
            var pathname = this._platformLocation.pathname +
                Location.normalizeQueryParams(this._platformLocation.search);
            var hash = this._platformLocation.hash;
            return hash && includeHash ? "" + pathname + hash : pathname;
        };
        PathLocationStrategy.prototype.pushState = function (state, title, url, queryParams) {
            var externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
            this._platformLocation.pushState(state, title, externalUrl);
        };
        PathLocationStrategy.prototype.replaceState = function (state, title, url, queryParams) {
            var externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
            this._platformLocation.replaceState(state, title, externalUrl);
        };
        PathLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
        PathLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
        PathLocationStrategy.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        PathLocationStrategy.ctorParameters = [
            { type: PlatformLocation, },
            { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [APP_BASE_HREF,] },] },
        ];
        return PathLocationStrategy;
    }(LocationStrategy));

    /**
     * A collection of Angular core directives that are likely to be used in each and every Angular
     * application.
     *
     * This collection can be used to quickly enumerate all the built-in directives in the `directives`
     * property of the `@Component` annotation.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yakGwpCdUkg0qfzX5m8g?p=preview))
     *
     * Instead of writing:
     *
     * ```typescript
     * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
     * import {OtherDirective} from './myDirectives';
     *
     * @Component({
     *   selector: 'my-component',
     *   templateUrl: 'myComponent.html',
     *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, OtherDirective]
     * })
     * export class MyComponent {
     *   ...
     * }
     * ```
     * one could import all the core directives at once:
     *
     * ```typescript
     * import {CORE_DIRECTIVES} from '@angular/common';
     * import {OtherDirective} from './myDirectives';
     *
     * @Component({
     *   selector: 'my-component',
     *   templateUrl: 'myComponent.html',
     *   directives: [CORE_DIRECTIVES, OtherDirective]
     * })
     * export class MyComponent {
     *   ...
     * }
     * ```
     *
     * @stable
     */
    var CORE_DIRECTIVES = [
        NgClass,
        NgFor,
        NgIf,
        NgTemplateOutlet,
        NgStyle,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        NgPlural,
        NgPluralCase,
    ];

    /**
     * A collection of Angular core directives that are likely to be used in each and every Angular
     * application. This includes core directives (e.g., NgIf and NgFor), and forms directives (e.g.,
     * NgModel).
     *
     * This collection can be used to quickly enumerate all the built-in directives in the `directives`
     * property of the `@Component` decorator.
     *
     * ### Example
     *
     * Instead of writing:
     *
     * ```typescript
     * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, NgModel, NgForm} from
     * '@angular/common';
     * import {OtherDirective} from './myDirectives';
     *
     * @Component({
     *   selector: 'my-component',
     *   templateUrl: 'myComponent.html',
     *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, NgModel, NgForm,
     * OtherDirective]
     * })
     * export class MyComponent {
     *   ...
     * }
     * ```
     * one could import all the common directives at once:
     *
     * ```typescript
     * import {COMMON_DIRECTIVES} from '@angular/common';
     * import {OtherDirective} from './myDirectives';
     *
     * @Component({
     *   selector: 'my-component',
     *   templateUrl: 'myComponent.html',
     *   directives: [COMMON_DIRECTIVES, OtherDirective]
     * })
     * export class MyComponent {
     *   ...
     * }
     * ```
     *
     * @experimental Contains forms which are experimental.
     */
    var COMMON_DIRECTIVES = CORE_DIRECTIVES;

    /**
     * A collection of Angular core pipes that are likely to be used in each and every
     * application.
     *
     * This collection can be used to quickly enumerate all the built-in pipes in the `pipes`
     * property of the `@Component` decorator.
     *
     * @experimental Contains i18n pipes which are experimental
     */
    var COMMON_PIPES = [
        AsyncPipe,
        UpperCasePipe,
        LowerCasePipe,
        JsonPipe,
        SlicePipe,
        DecimalPipe,
        PercentPipe,
        CurrencyPipe,
        DatePipe,
        I18nPluralPipe,
        I18nSelectPipe,
    ];

    // Note: This does not contain the location providers,
    // as they need some platform specific implementations to work.
    /**
     * The module that includes all the basic Angular directives like {@link NgIf}, ${link NgFor}, ...
     *
     * @stable
     */
    var CommonModule = (function () {
        function CommonModule() {
        }
        CommonModule.decorators = [
            { type: _angular_core.NgModule, args: [{
                        declarations: [COMMON_DIRECTIVES, COMMON_PIPES],
                        exports: [COMMON_DIRECTIVES, COMMON_PIPES],
                        providers: [
                            { provide: NgLocalization, useClass: NgLocaleLocalization },
                        ],
                    },] },
        ];
        /** @nocollapse */
        CommonModule.ctorParameters = [];
        return CommonModule;
    }());

    exports.NgLocalization = NgLocalization;
    exports.CommonModule = CommonModule;
    exports.AsyncPipe = AsyncPipe;
    exports.DatePipe = DatePipe;
    exports.I18nPluralPipe = I18nPluralPipe;
    exports.I18nSelectPipe = I18nSelectPipe;
    exports.JsonPipe = JsonPipe;
    exports.LowerCasePipe = LowerCasePipe;
    exports.CurrencyPipe = CurrencyPipe;
    exports.DecimalPipe = DecimalPipe;
    exports.PercentPipe = PercentPipe;
    exports.SlicePipe = SlicePipe;
    exports.UpperCasePipe = UpperCasePipe;
    exports.NgClass = NgClass;
    exports.NgFor = NgFor;
    exports.NgIf = NgIf;
    exports.NgPlural = NgPlural;
    exports.NgPluralCase = NgPluralCase;
    exports.NgStyle = NgStyle;
    exports.NgSwitch = NgSwitch;
    exports.NgSwitchCase = NgSwitchCase;
    exports.NgSwitchDefault = NgSwitchDefault;
    exports.NgTemplateOutlet = NgTemplateOutlet;
    exports.PlatformLocation = PlatformLocation;
    exports.LocationStrategy = LocationStrategy;
    exports.APP_BASE_HREF = APP_BASE_HREF;
    exports.HashLocationStrategy = HashLocationStrategy;
    exports.PathLocationStrategy = PathLocationStrategy;
    exports.Location = Location;

}));
