/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function digestMessage(message) {
    return strHash(serializeNodes(message.nodes).join('') + ("[" + message.meaning + "]"));
}
exports.digestMessage = digestMessage;
/**
 * String hash function similar to java.lang.String.hashCode().
 * The hash code for a string is computed as
 * s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
 * where s[i] is the ith character of the string and n is the length of
 * the string. We mod the result to make it between 0 (inclusive) and 2^32 (exclusive).
 *
 * Based on goog.string.hashCode from the Google Closure library
 * https://github.com/google/closure-library/
 *
 * @internal
 */
// TODO(vicb): better algo (less collisions) ?
function strHash(str) {
    var result = 0;
    for (var i = 0; i < str.length; ++i) {
        // Normalize to 4 byte range, 0 ... 2^32.
        result = (31 * result + str.charCodeAt(i)) >>> 0;
    }
    return result.toString(16);
}
exports.strHash = strHash;
/**
 * Serialize the i18n ast to something xml-like in order to generate an UID.
 *
 * The visitor is also used in the i18n parser tests
 *
 * @internal
 */
var _SerializerVisitor = (function () {
    function _SerializerVisitor() {
    }
    _SerializerVisitor.prototype.visitText = function (text, context) { return text.value; };
    _SerializerVisitor.prototype.visitContainer = function (container, context) {
        var _this = this;
        return "[" + container.children.map(function (child) { return child.visit(_this); }).join(', ') + "]";
    };
    _SerializerVisitor.prototype.visitIcu = function (icu, context) {
        var _this = this;
        var strCases = Object.keys(icu.cases).map(function (k) { return (k + " {" + icu.cases[k].visit(_this) + "}"); });
        return "{" + icu.expression + ", " + icu.type + ", " + strCases.join(', ') + "}";
    };
    _SerializerVisitor.prototype.visitTagPlaceholder = function (ph, context) {
        var _this = this;
        return ph.isVoid ?
            "<ph tag name=\"" + ph.startName + "\"/>" :
            "<ph tag name=\"" + ph.startName + "\">" + ph.children.map(function (child) { return child.visit(_this); }).join(', ') + "</ph name=\"" + ph.closeName + "\">";
    };
    _SerializerVisitor.prototype.visitPlaceholder = function (ph, context) {
        return "<ph name=\"" + ph.name + "\">" + ph.value + "</ph>";
    };
    _SerializerVisitor.prototype.visitIcuPlaceholder = function (ph, context) {
        return "<ph icu name=\"" + ph.name + "\">" + ph.value.visit(this) + "</ph>";
    };
    return _SerializerVisitor;
}());
var serializerVisitor = new _SerializerVisitor();
function serializeNodes(nodes) {
    return nodes.map(function (a) { return a.visit(serializerVisitor, null); });
}
exports.serializeNodes = serializeNodes;
//# sourceMappingURL=digest.js.map