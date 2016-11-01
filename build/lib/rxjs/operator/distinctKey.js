"use strict";
var distinct_1 = require('./distinct');
/* tslint:disable:max-line-length */
function distinctKey(key, compare, flushes) {
    return distinct_1.distinct.call(this, function (x, y) {
        if (compare) {
            return compare(x[key], y[key]);
        }
        return x[key] === y[key];
    }, flushes);
}
exports.distinctKey = distinctKey;
//# sourceMappingURL=distinctKey.js.map