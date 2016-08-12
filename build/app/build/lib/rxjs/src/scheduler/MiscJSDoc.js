"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = require('../Subscription');
var ActionDoc = (function (_super) {
    __extends(ActionDoc, _super);
    function ActionDoc() {
        _super.apply(this, arguments);
        this.state = void 0;
        this.delay = 0;
        this.scheduler = null;
    }
    ActionDoc.prototype.work = function (state) {
        return void 0;
    };
    ActionDoc.prototype.schedule = function (state, delay) {
        return void 0;
    };
    ActionDoc.prototype.execute = function () {
        return void 0;
    };
    return ActionDoc;
}(Subscription_1.Subscription));
exports.ActionDoc = ActionDoc;
//# sourceMappingURL=MiscJSDoc.js.map