/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPromise } from '../src/facade/lang';
import { Inject, Injectable, OpaqueToken, Optional } from './di';
/**
 * A function that will be executed when an application is initialized.
 * @experimental
 */
export const APP_INITIALIZER = new OpaqueToken('Application Initializer');
export class ApplicationInitStatus {
    constructor(appInits) {
        this._done = false;
        const asyncInitPromises = [];
        if (appInits) {
            for (let i = 0; i < appInits.length; i++) {
                const initResult = appInits[i]();
                if (isPromise(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        this._donePromise = Promise.all(asyncInitPromises).then(() => { this._done = true; });
        if (asyncInitPromises.length === 0) {
            this._done = true;
        }
    }
    get done() { return this._done; }
    get donePromise() { return this._donePromise; }
}
/** @nocollapse */
ApplicationInitStatus.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ApplicationInitStatus.ctorParameters = [
    { type: Array, decorators: [{ type: Inject, args: [APP_INITIALIZER,] }, { type: Optional },] },
];
//# sourceMappingURL=application_init.js.map