/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { StringMapWrapper } from './facade/collection';
import { StringWrapper, isArray, isBlank, isPresent, isPrimitive, isStrictStringMap } from './facade/lang';
import * as o from './output/output_ast';
export const MODULE_SUFFIX = '';
var CAMEL_CASE_REGEXP = /([A-Z])/g;
export function camelCaseToDashCase(input) {
    return StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, (m) => { return '-' + m[1].toLowerCase(); });
}
export function splitAtColon(input, defaultValues) {
    const colonIndex = input.indexOf(':');
    if (colonIndex == -1)
        return defaultValues;
    return [input.slice(0, colonIndex).trim(), input.slice(colonIndex + 1).trim()];
}
export function sanitizeIdentifier(name) {
    return StringWrapper.replaceAll(name, /\W/g, '_');
}
export function visitValue(value, visitor, context) {
    if (isArray(value)) {
        return visitor.visitArray(value, context);
    }
    else if (isStrictStringMap(value)) {
        return visitor.visitStringMap(value, context);
    }
    else if (isBlank(value) || isPrimitive(value)) {
        return visitor.visitPrimitive(value, context);
    }
    else {
        return visitor.visitOther(value, context);
    }
}
export class ValueTransformer {
    visitArray(arr, context) {
        return arr.map(value => visitValue(value, this, context));
    }
    visitStringMap(map, context) {
        var result = {};
        StringMapWrapper.forEach(map, (value /** TODO #9100 */, key /** TODO #9100 */) => {
            result[key] = visitValue(value, this, context);
        });
        return result;
    }
    visitPrimitive(value, context) { return value; }
    visitOther(value, context) { return value; }
}
export function assetUrl(pkg, path = null, type = 'src') {
    if (path == null) {
        return `asset:@angular/lib/${pkg}/index`;
    }
    else {
        return `asset:@angular/lib/${pkg}/src/${path}`;
    }
}
export function createDiTokenExpression(token) {
    if (isPresent(token.value)) {
        return o.literal(token.value);
    }
    else if (token.identifierIsInstance) {
        return o.importExpr(token.identifier)
            .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
    }
    else {
        return o.importExpr(token.identifier);
    }
}
export class SyncAsyncResult {
    constructor(syncResult, asyncResult = null) {
        this.syncResult = syncResult;
        this.asyncResult = asyncResult;
        if (!asyncResult) {
            this.asyncResult = Promise.resolve(syncResult);
        }
    }
}
//# sourceMappingURL=util.js.map