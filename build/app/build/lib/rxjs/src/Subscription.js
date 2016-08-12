"use strict";
var isArray_1 = require('./util/isArray');
var isObject_1 = require('./util/isObject');
var isFunction_1 = require('./util/isFunction');
var tryCatch_1 = require('./util/tryCatch');
var errorObject_1 = require('./util/errorObject');
var UnsubscriptionError_1 = require('./util/UnsubscriptionError');
var Subscription = (function () {
    function Subscription(unsubscribe) {
        this.isUnsubscribed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.isUnsubscribed) {
            return;
        }
        this.isUnsubscribed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject_1.errorObject.e);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === this) || (teardown === Subscription.EMPTY)) {
            return;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.isUnsubscribed) {
                    sub.unsubscribe();
                }
                else {
                    (this._subscriptions || (this._subscriptions = [])).push(sub);
                }
                break;
            default:
                throw new Error('Unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        return sub;
    };
    Subscription.prototype.remove = function (subscription) {
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.isUnsubscribed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
//# sourceMappingURL=Subscription.js.map