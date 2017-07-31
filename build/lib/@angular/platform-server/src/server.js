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
import { PlatformLocation } from '@angular/common';
import { platformCoreDynamic } from '@angular/compiler';
import { NgModule, PLATFORM_INITIALIZER, RootRenderer, createPlatformFactory, isDevMode, platformCore } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Parse5DomAdapter } from './parse5_adapter';
import { DebugDomRootRenderer } from './private_import_core';
import { SharedStylesHost } from './private_import_platform-browser';
import { ServerRootRenderer } from './server_renderer';
/**
 * @param {?} feature
 * @return {?}
 */
function notSupported(feature) {
    throw new Error("platform-server does not support '" + feature + "'.");
}
var ServerPlatformLocation = (function (_super) {
    __extends(ServerPlatformLocation, _super);
    function ServerPlatformLocation() {
        _super.apply(this, arguments);
    }
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.getBaseHrefFromDOM = function () { throw notSupported('getBaseHrefFromDOM'); };
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    ServerPlatformLocation.prototype.onPopState = function (fn) { notSupported('onPopState'); };
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    ServerPlatformLocation.prototype.onHashChange = function (fn) { notSupported('onHashChange'); };
    ;
    Object.defineProperty(ServerPlatformLocation.prototype, "pathname", {
        /**
         * @return {?}
         */
        get: function () { throw notSupported('pathname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "search", {
        /**
         * @return {?}
         */
        get: function () { throw notSupported('search'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "hash", {
        /**
         * @return {?}
         */
        get: function () { throw notSupported('hash'); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    ServerPlatformLocation.prototype.replaceState = function (state, title, url) { notSupported('replaceState'); };
    ;
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    ServerPlatformLocation.prototype.pushState = function (state, title, url) { notSupported('pushState'); };
    ;
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.forward = function () { notSupported('forward'); };
    ;
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.back = function () { notSupported('back'); };
    ;
    return ServerPlatformLocation;
}(PlatformLocation));
export var /** @type {?} */ INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true },
    { provide: PlatformLocation, useClass: ServerPlatformLocation },
];
/**
 * @return {?}
 */
function initParse5Adapter() {
    Parse5DomAdapter.makeCurrent();
}
/**
 * @param {?} rootRenderer
 * @return {?}
 */
export function _createConditionalRootRenderer(rootRenderer) {
    if (isDevMode()) {
        return new DebugDomRootRenderer(rootRenderer);
    }
    return rootRenderer;
}
export var /** @type {?} */ SERVER_RENDER_PROVIDERS = [
    ServerRootRenderer,
    { provide: RootRenderer, useFactory: _createConditionalRootRenderer, deps: [ServerRootRenderer] },
    // use plain SharedStylesHost, not the DomSharedStylesHost
    SharedStylesHost
];
/**
 * The ng module for the server.
 *
 * \@experimental
 */
export var ServerModule = (function () {
    function ServerModule() {
    }
    ServerModule.decorators = [
        { type: NgModule, args: [{ exports: [BrowserModule], providers: SERVER_RENDER_PROVIDERS },] },
    ];
    /** @nocollapse */
    ServerModule.ctorParameters = function () { return []; };
    return ServerModule;
}());
function ServerModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerModule.ctorParameters;
}
/**
 * @experimental
 */
export var /** @type {?} */ platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export var /** @type {?} */ platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
//# sourceMappingURL=server.js.map