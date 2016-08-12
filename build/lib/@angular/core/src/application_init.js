/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../src/facade/lang');
var di_1 = require('./di');
/**
 * A function that will be executed when an application is initialized.
 * @experimental
 */
exports.APP_INITIALIZER = new di_1.OpaqueToken('Application Initializer');
var ApplicationInitStatus = (function () {
    function ApplicationInitStatus(appInits) {
        var _this = this;
        this._done = false;
        var asyncInitPromises = [];
        if (appInits) {
            for (var i = 0; i < appInits.length; i++) {
                var initResult = appInits[i]();
                if (lang_1.isPromise(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        this._donePromise = Promise.all(asyncInitPromises).then(function () { _this._done = true; });
        if (asyncInitPromises.length === 0) {
            this._done = true;
        }
    }
    Object.defineProperty(ApplicationInitStatus.prototype, "done", {
        get: function () { return this._done; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationInitStatus.prototype, "donePromise", {
        get: function () { return this._donePromise; },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    ApplicationInitStatus.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    ApplicationInitStatus.ctorParameters = [
        { type: Array, decorators: [{ type: di_1.Inject, args: [exports.APP_INITIALIZER,] }, { type: di_1.Optional },] },
    ];
    return ApplicationInitStatus;
}());
exports.ApplicationInitStatus = ApplicationInitStatus;
//# sourceMappingURL=application_init.js.map