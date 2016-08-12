/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export function digestMessage(message) {
    return strHash(serializeNodes(message.nodes).join('') + `[${message.meaning}]`);
}
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
export function strHash(str) {
    let result = 0;
    for (var i = 0; i < str.length; ++i) {
        // Normalize to 4 byte range, 0 ... 2^32.
        result = (31 * result + str.charCodeAt(i)) >>> 0;
    }
    return result.toString(16);
}
/**
 * Serialize the i18n ast to something xml-like in order to generate an UID.
 *
 * The visitor is also used in the i18n parser tests
 *
 * @internal
 */
class _SerializerVisitor {
    visitText(text, context) { return text.value; }
    visitContainer(container, context) {
        return `[${container.children.map(child => child.visit(this)).join(', ')}]`;
    }
    visitIcu(icu, context) {
        let strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
        return `{${icu.expression}, ${icu.type}, ${strCases.join(', ')}}`;
    }
    visitTagPlaceholder(ph, context) {
        return ph.isVoid ?
            `<ph tag name="${ph.startName}"/>` :
            `<ph tag name="${ph.startName}">${ph.children.map(child => child.visit(this)).join(', ')}</ph name="${ph.closeName}">`;
    }
    visitPlaceholder(ph, context) {
        return `<ph name="${ph.name}">${ph.value}</ph>`;
    }
    visitIcuPlaceholder(ph, context) {
        return `<ph icu name="${ph.name}">${ph.value.visit(this)}</ph>`;
    }
}
const serializerVisitor = new _SerializerVisitor();
export function serializeNodes(nodes) {
    return nodes.map(a => a.visit(serializerVisitor, null));
}
//# sourceMappingURL=digest.js.map