"use strict";
var Observable_1 = require('./Observable');
require('./scheduler/MiscJSDoc');
require('./observable/dom/MiscJSDoc');
var ObservableDoc = (function () {
    function ObservableDoc() {
    }
    ObservableDoc.create = function (subscribe) {
        return new Observable_1.Observable(subscribe);
    };
    ;
    return ObservableDoc;
}());
exports.ObservableDoc = ObservableDoc;
var ObserverDoc = (function () {
    function ObserverDoc() {
        this.isUnsubscribed = false;
    }
    ObserverDoc.prototype.next = function (value) {
        return void 0;
    };
    ObserverDoc.prototype.error = function (err) {
        return void 0;
    };
    ObserverDoc.prototype.complete = function () {
        return void 0;
    };
    return ObserverDoc;
}());
exports.ObserverDoc = ObserverDoc;
var SchedulerDoc = (function () {
    function SchedulerDoc() {
        this.active = false;
        this.actions = [];
        this.scheduledId = 0;
    }
    SchedulerDoc.prototype.now = function () {
        return 0;
    };
    SchedulerDoc.prototype.schedule = function (work, delay, state) {
        return void 0;
    };
    SchedulerDoc.prototype.flush = function () {
        return void 0;
    };
    return SchedulerDoc;
}());
exports.SchedulerDoc = SchedulerDoc;
//# sourceMappingURL=MiscJSDoc.js.map