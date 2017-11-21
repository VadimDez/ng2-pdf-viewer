"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MDL = (function () {
    function MDL() {
    }
    MDL.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeAllRegistered();
    };
    return MDL;
}());
exports.MDL = MDL;
//# sourceMappingURL=mdl.js.map