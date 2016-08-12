/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var fake_async_1 = require('./fake_async');
var test_bed_1 = require('./test_bed');
var _global = (typeof window === 'undefined' ? global : window);
// Reset the test providers and the fake async zone before each test.
if (_global.beforeEach) {
    _global.beforeEach(function () {
        test_bed_1.TestBed.resetTestingModule();
        fake_async_1.resetFakeAsyncZone();
    });
}
/**
 * Allows overriding default providers of the test injector,
 * which are defined in test_injector.js
 *
 * @deprecated Use `TestBed.configureTestingModule instead.
 */
function addProviders(providers) {
    if (!providers)
        return;
    test_bed_1.TestBed.configureTestingModule({ providers: providers });
}
exports.addProviders = addProviders;
//# sourceMappingURL=testing.js.map