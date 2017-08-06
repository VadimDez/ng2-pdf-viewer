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
MDL.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[mdl]'
            },] },
];
MDL.ctorParameters = function () { return []; };
exports.MDL = MDL;

//# sourceMappingURL=mdl.js.map
