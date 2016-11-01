"use strict";
var Subject_1 = require('../Subject');
var multicast_1 = require('./multicast');
/* tslint:disable:max-line-length */
function publish(selector) {
    return selector ? multicast_1.multicast.call(this, function () { return new Subject_1.Subject(); }, selector) :
        multicast_1.multicast.call(this, new Subject_1.Subject());
}
exports.publish = publish;
//# sourceMappingURL=publish.js.map