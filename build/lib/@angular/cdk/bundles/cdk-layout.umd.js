/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/platform'), require('rxjs/Subject'), require('rxjs/operators/map'), require('rxjs/operators/startWith'), require('rxjs/operators/takeUntil'), require('@angular/cdk/coercion'), require('rxjs/observable/combineLatest'), require('rxjs/observable/fromEventPattern')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/platform', 'rxjs/Subject', 'rxjs/operators/map', 'rxjs/operators/startWith', 'rxjs/operators/takeUntil', '@angular/cdk/coercion', 'rxjs/observable/combineLatest', 'rxjs/observable/fromEventPattern'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.layout = global.ng.cdk.layout || {}),global.ng.core,global.ng.cdk.platform,global.Rx,global.Rx.operators,global.Rx.operators,global.Rx.operators,global.ng.cdk.coercion,global.Rx.Observable,global.Rx.Observable));
}(this, (function (exports,_angular_core,_angular_cdk_platform,rxjs_Subject,rxjs_operators_map,rxjs_operators_startWith,rxjs_operators_takeUntil,_angular_cdk_coercion,rxjs_observable_combineLatest,rxjs_observable_fromEventPattern) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Global registry for all dynamically-created, injected style tags.
 */
var styleElementForWebkitCompatibility = new Map();
/**
 * A utility for calling matchMedia queries.
 */
var MediaMatcher = /** @class */ (function () {
    function MediaMatcher(platform) {
        this.platform = platform;
        this._matchMedia = this.platform.isBrowser && window.matchMedia ?
            // matchMedia is bound to the window scope intentionally as it is an illegal invocation to
            // call it from a different scope.
            window.matchMedia.bind(window) :
            noopMatchMedia;
    }
    /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     */
    /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     * @param {?} query
     * @return {?}
     */
    MediaMatcher.prototype.matchMedia = /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     * @param {?} query
     * @return {?}
     */
    function (query) {
        if (this.platform.WEBKIT) {
            createEmptyStyleRule(query);
        }
        return this._matchMedia(query);
    };
    MediaMatcher.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    MediaMatcher.ctorParameters = function () { return [
        { type: _angular_cdk_platform.Platform, },
    ]; };
    return MediaMatcher;
}());
/**
 * For Webkit engines that only trigger the MediaQueryListListener when there is at least one CSS
 * selector for the respective media query.
 * @param {?} query
 * @return {?}
 */
function createEmptyStyleRule(query) {
    if (!styleElementForWebkitCompatibility.has(query)) {
        try {
            var /** @type {?} */ style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            if (!style.sheet) {
                var /** @type {?} */ cssText = "@media " + query + " {.fx-query-test{ }}";
                style.appendChild(document.createTextNode(cssText));
            }
            document.getElementsByTagName('head')[0].appendChild(style);
            // Store in private global registry
            styleElementForWebkitCompatibility.set(query, style);
        }
        catch (/** @type {?} */ e) {
            console.error(e);
        }
    }
}
/**
 * No-op matchMedia replacement for non-browser platforms.
 * @param {?} query
 * @return {?}
 */
function noopMatchMedia(query) {
    return {
        matches: query === 'all' || query === '',
        media: query,
        addListener: function () { },
        removeListener: function () { }
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The current state of a layout breakpoint.
 * @record
 */

/**
 * Utility for checking the matching state of \@media queries.
 */
var BreakpointObserver = /** @class */ (function () {
    function BreakpointObserver(mediaMatcher, zone) {
        this.mediaMatcher = mediaMatcher;
        this.zone = zone;
        /**
         * A map of all media queries currently being listened for.
         */
        this._queries = new Map();
        /**
         * A subject for all other observables to takeUntil based on.
         */
        this._destroySubject = new rxjs_Subject.Subject();
    }
    /** Completes the active subject, signalling to all other observables to complete. */
    /**
     * Completes the active subject, signalling to all other observables to complete.
     * @return {?}
     */
    BreakpointObserver.prototype.ngOnDestroy = /**
     * Completes the active subject, signalling to all other observables to complete.
     * @return {?}
     */
    function () {
        this._destroySubject.next();
        this._destroySubject.complete();
    };
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    /**
     * Whether one or more media queries match the current viewport size.
     * @param {?} value One or more media queries to check.
     * @return {?} Whether any of the media queries match.
     */
    BreakpointObserver.prototype.isMatched = /**
     * Whether one or more media queries match the current viewport size.
     * @param {?} value One or more media queries to check.
     * @return {?} Whether any of the media queries match.
     */
    function (value) {
        var _this = this;
        var /** @type {?} */ queries = _angular_cdk_coercion.coerceArray(value);
        return queries.some(function (mediaQuery) { return _this._registerQuery(mediaQuery).mql.matches; });
    };
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @returns A stream of matches for the given queries.
     */
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param {?} value
     * @return {?} A stream of matches for the given queries.
     */
    BreakpointObserver.prototype.observe = /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param {?} value
     * @return {?} A stream of matches for the given queries.
     */
    function (value) {
        var _this = this;
        var /** @type {?} */ queries = _angular_cdk_coercion.coerceArray(value);
        var /** @type {?} */ observables = queries.map(function (query) { return _this._registerQuery(query).observable; });
        return rxjs_observable_combineLatest.combineLatest(observables, function (a, b) {
            return {
                matches: !!((a && a.matches) || (b && b.matches)),
            };
        });
    };
    /**
     * Registers a specific query to be listened for.
     * @param {?} query
     * @return {?}
     */
    BreakpointObserver.prototype._registerQuery = /**
     * Registers a specific query to be listened for.
     * @param {?} query
     * @return {?}
     */
    function (query) {
        var _this = this;
        // Only set up a new MediaQueryList if it is not already being listened for.
        if (this._queries.has(query)) {
            return /** @type {?} */ ((this._queries.get(query)));
        }
        var /** @type {?} */ mql = this.mediaMatcher.matchMedia(query);
        // Create callback for match changes and add it is as a listener.
        var /** @type {?} */ queryObservable = rxjs_observable_fromEventPattern.fromEventPattern(
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        function (listener) {
            mql.addListener(function (e) { return _this.zone.run(function () { return listener(e); }); });
        }, function (listener) {
            mql.removeListener(function (e) { return _this.zone.run(function () { return listener(e); }); });
        })
            .pipe(rxjs_operators_takeUntil.takeUntil(this._destroySubject), rxjs_operators_startWith.startWith(mql), rxjs_operators_map.map(function (nextMql) { return ({ matches: nextMql.matches }); }));
        // Add the MediaQueryList to the set of queries.
        var /** @type {?} */ output = { observable: queryObservable, mql: mql };
        this._queries.set(query, output);
        return output;
    };
    BreakpointObserver.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    BreakpointObserver.ctorParameters = function () { return [
        { type: MediaMatcher, },
        { type: _angular_core.NgZone, },
    ]; };
    return BreakpointObserver;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var Breakpoints = {
    Handset: '(max-width: 599px) and (orientation: portrait), ' +
        '(max-width: 959px) and (orientation: landscape)',
    Tablet: '(min-width: 600px) and (max-width: 839px) and (orientation: portrait), ' +
        '(min-width: 960px) and (max-width: 1279px) and (orientation: landscape)',
    Web: '(min-width: 840px) and (orientation: portrait), ' +
        '(min-width: 1280px) and (orientation: landscape)',
    HandsetPortrait: '(max-width: 599px) and (orientation: portrait)',
    TabletPortrait: '(min-width: 600px) and (max-width: 839px) and (orientation: portrait)',
    WebPortrait: '(min-width: 840px) and (orientation: portrait)',
    HandsetLandscape: '(max-width: 959px) and (orientation: landscape)',
    TabletLandscape: '(min-width: 960px) and (max-width: 1279px) and (orientation: landscape)',
    WebLandscape: '(min-width: 1280px) and (orientation: landscape)',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    providers: [BreakpointObserver, MediaMatcher],
                    imports: [_angular_cdk_platform.PlatformModule],
                },] },
    ];
    /** @nocollapse */
    LayoutModule.ctorParameters = function () { return []; };
    return LayoutModule;
}());

exports.LayoutModule = LayoutModule;
exports.BreakpointObserver = BreakpointObserver;
exports.Breakpoints = Breakpoints;
exports.MediaMatcher = MediaMatcher;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-layout.umd.js.map
