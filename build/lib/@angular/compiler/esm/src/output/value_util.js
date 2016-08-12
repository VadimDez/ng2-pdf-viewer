/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompileIdentifierMetadata } from '../compile_metadata';
import { StringMapWrapper } from '../facade/collection';
import { BaseException } from '../facade/exceptions';
import { visitValue } from '../util';
import * as o from './output_ast';
export function convertValueToOutputAst(value, type = null) {
    return visitValue(value, new _ValueOutputAstTransformer(), type);
}
class _ValueOutputAstTransformer {
    visitArray(arr, type) {
        return o.literalArr(arr.map(value => visitValue(value, this, null)), type);
    }
    visitStringMap(map, type) {
        var entries = [];
        StringMapWrapper.forEach(map, (value, key) => {
            entries.push([key, visitValue(value, this, null)]);
        });
        return o.literalMap(entries, type);
    }
    visitPrimitive(value, type) { return o.literal(value, type); }
    visitOther(value, type) {
        if (value instanceof CompileIdentifierMetadata) {
            return o.importExpr(value);
        }
        else if (value instanceof o.Expression) {
            return value;
        }
        else {
            throw new BaseException(`Illegal state: Don't now how to compile value ${value}`);
        }
    }
}
//# sourceMappingURL=value_util.js.map