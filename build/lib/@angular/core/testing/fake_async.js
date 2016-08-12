/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var index_1 = require('../index');
var _FakeAsyncTestZoneSpecType = Zone['FakeAsyncTestZoneSpec'];
var _fakeAsyncZone = null;
var _fakeAsyncTestZoneSpec = null;
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * @experimental
 */
function resetFakeAsyncZone() {
    _fakeAsyncZone = null;
    _fakeAsyncTestZoneSpec = null;
}
exports.resetFakeAsyncZone = resetFakeAsyncZone;
var _inFakeAsyncCall = false;
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * ## Example
 *
 * {@example testing/ts/fake_async.ts region='basic'}
 *
 * @param fn
 * @returns {Function} The function wrapped to be executed in the fakeAsync zone
 *
 * @experimental
 */
function fakeAsync(fn) {
    return function () {
        var args = []; /** TODO #9100 */
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (_inFakeAsyncCall) {
            throw new index_1.BaseException('fakeAsync() calls can not be nested');
        }
        _inFakeAsyncCall = true;
        try {
            if (!_fakeAsyncZone) {
                if (Zone.current.get('FakeAsyncTestZoneSpec') != null) {
                    throw new index_1.BaseException('fakeAsync() calls can not be nested');
                }
                _fakeAsyncTestZoneSpec = new _FakeAsyncTestZoneSpecType();
                _fakeAsyncZone = Zone.current.fork(_fakeAsyncTestZoneSpec);
            }
            var res = _fakeAsyncZone.run(function () {
                var res = fn.apply(void 0, args);
                flushMicrotasks();
                return res;
            });
            if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
                throw new index_1.BaseException((_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length + " ") +
                    "periodic timer(s) still in the queue.");
            }
            if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
                throw new index_1.BaseException(_fakeAsyncTestZoneSpec.pendingTimers.length + " timer(s) still in the queue.");
            }
            return res;
        }
        finally {
            _inFakeAsyncCall = false;
        }
    };
}
exports.fakeAsync = fakeAsync;
function _getFakeAsyncZoneSpec() {
    if (_fakeAsyncTestZoneSpec == null) {
        throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
    return _fakeAsyncTestZoneSpec;
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * ## Example
 *
 * {@example testing/ts/fake_async.ts region='basic'}
 *
 * @experimental
 */
function tick(millis) {
    if (millis === void 0) { millis = 0; }
    _getFakeAsyncZoneSpec().tick(millis);
}
exports.tick = tick;
/**
 * Discard all remaining periodic tasks.
 *
 * @experimental
 */
function discardPeriodicTasks() {
    var zoneSpec = _getFakeAsyncZoneSpec();
    var pendingTimers = zoneSpec.pendingPeriodicTimers;
    zoneSpec.pendingPeriodicTimers.length = 0;
}
exports.discardPeriodicTasks = discardPeriodicTasks;
/**
 * Flush any pending microtasks.
 *
 * @experimental
 */
function flushMicrotasks() {
    _getFakeAsyncZoneSpec().flushMicrotasks();
}
exports.flushMicrotasks = flushMicrotasks;
//# sourceMappingURL=fake_async.js.map