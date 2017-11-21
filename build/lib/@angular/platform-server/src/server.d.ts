/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵAnimationEngine } from '@angular/animations/browser';
import { NgZone, PlatformRef, Provider, RendererFactory2, StaticProvider } from '@angular/core';
import { ɵAnimationRendererFactory } from '@angular/platform-browser/animations';
export declare const INTERNAL_SERVER_PLATFORM_PROVIDERS: StaticProvider[];
export declare function instantiateServerRendererFactory(renderer: RendererFactory2, engine: ɵAnimationEngine, zone: NgZone): ɵAnimationRendererFactory;
export declare const SERVER_RENDER_PROVIDERS: Provider[];
/**
 * The ng module for the server.
 *
 * @experimental
 */
export declare class ServerModule {
}
/**
 * @experimental
 */
export declare const platformServer: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export declare const platformDynamicServer: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;
