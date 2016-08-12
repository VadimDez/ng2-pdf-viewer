/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var tags_1 = require('./tags');
var XmlTagDefinition = (function () {
    function XmlTagDefinition() {
        this.closedByParent = false;
        this.contentType = tags_1.TagContentType.PARSABLE_DATA;
        this.isVoid = false;
        this.ignoreFirstLf = false;
        this.canSelfClose = true;
    }
    XmlTagDefinition.prototype.requireExtraParent = function (currentParent) { return false; };
    XmlTagDefinition.prototype.isClosedByChild = function (name) { return false; };
    return XmlTagDefinition;
}());
exports.XmlTagDefinition = XmlTagDefinition;
var _TAG_DEFINITION = new XmlTagDefinition();
function getXmlTagDefinition(tagName) {
    return _TAG_DEFINITION;
}
exports.getXmlTagDefinition = getXmlTagDefinition;
//# sourceMappingURL=xml_tags.js.map