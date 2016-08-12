/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DebugNode } from '@angular/core';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
export declare function inspectNativeElement(element: any): DebugNode;
export declare function _createConditionalRootRenderer(rootRenderer: any): any;
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
export declare const ELEMENT_PROBE_PROVIDERS: any[];
export declare const ELEMENT_PROBE_PROVIDERS_PROD_MODE: any[];
