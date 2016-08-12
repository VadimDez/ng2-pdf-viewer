"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = require('../util/root');
var Subscription_1 = require('../Subscription');
var FutureAction = (function (_super) {
    __extends(FutureAction, _super);
    function FutureAction(scheduler, work) {
        _super.call(this);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    FutureAction.prototype.execute = function () {
        if (this.isUnsubscribed) {
            this.error = new Error('executing a cancelled action');
        }
        else {
            try {
                this.work(this.state);
            }
            catch (e) {
                this.unsubscribe();
                this.error = e;
            }
        }
    };
    FutureAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.isUnsubscribed) {
            return this;
        }
        return this._schedule(state, delay);
    };
    FutureAction.prototype._schedule = function (state, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        this.state = state;
        this.pending = true;
        var id = this.id;
        if (id != null && this.delay === delay) {
            return this;
        }
        this.delay = delay;
        if (id != null) {
            this.id = null;
            root_1.root.clearInterval(id);
        }
        this.id = root_1.root.setInterval(function () {
            _this.pending = false;
            var _a = _this, id = _a.id, scheduler = _a.scheduler;
            scheduler.actions.push(_this);
            scheduler.flush();
            if (_this.pending === false && id != null) {
                _this.id = null;
                root_1.root.clearInterval(id);
            }
        }, delay);
        return this;
    };
    FutureAction.prototype._unsubscribe = function () {
        this.pending = false;
        var _a = this, id = _a.id, scheduler = _a.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        if (id != null) {
            this.id = null;
            root_1.root.clearInterval(id);
        }
        if (index !== -1) {
            actions.splice(index, 1);
        }
        this.work = null;
        this.state = null;
        this.scheduler = null;
    };
    return FutureAction;
}(Subscription_1.Subscription));
exports.FutureAction = FutureAction;
//# sourceMappingURL=FutureAction.js.map