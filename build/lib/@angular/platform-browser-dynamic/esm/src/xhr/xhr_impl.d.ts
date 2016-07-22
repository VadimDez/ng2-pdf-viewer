/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { XHR } from '@angular/compiler';
export declare class XHRImpl extends XHR {
    get(url: string): Promise<string>;
}
