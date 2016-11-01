"use strict";
var mergeAll_1 = require('./mergeAll');
/* tslint:disable:max-line-length */
function concatAll() {
    return this.lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatAll = concatAll;
//# sourceMappingURL=concatAll.js.map