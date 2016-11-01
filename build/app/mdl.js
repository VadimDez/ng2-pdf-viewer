"use strict";
var core_1 = require('@angular/core');
var MDL = (function () {
    function MDL() {
    }
    MDL.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeAllRegistered();
    };
    MDL.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[mdl]'
                },] },
    ];
    MDL.ctorParameters = [];
    return MDL;
}());
exports.MDL = MDL;
//# sourceMappingURL=mdl.js.map