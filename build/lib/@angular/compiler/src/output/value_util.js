/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compile_metadata_1 = require('../compile_metadata');
var collection_1 = require('../facade/collection');
var exceptions_1 = require('../facade/exceptions');
var util_1 = require('../util');
var o = require('./output_ast');
function convertValueToOutputAst(value, type) {
    if (type === void 0) { type = null; }
    return util_1.visitValue(value, new _ValueOutputAstTransformer(), type);
}
exports.convertValueToOutputAst = convertValueToOutputAst;
var _ValueOutputAstTransformer = (function () {
    function _ValueOutputAstTransformer() {
    }
    _ValueOutputAstTransformer.prototype.visitArray = function (arr, type) {
        var _this = this;
        return o.literalArr(arr.map(function (value) { return util_1.visitValue(value, _this, null); }), type);
    };
    _ValueOutputAstTransformer.prototype.visitStringMap = function (map, type) {
        var _this = this;
        var entries = [];
        collection_1.StringMapWrapper.forEach(map, function (value, key) {
            entries.push([key, util_1.visitValue(value, _this, null)]);
        });
        return o.literalMap(entries, type);
    };
    _ValueOutputAstTransformer.prototype.visitPrimitive = function (value, type) { return o.literal(value, type); };
    _ValueOutputAstTransformer.prototype.visitOther = function (value, type) {
        if (value instanceof compile_metadata_1.CompileIdentifierMetadata) {
            return o.importExpr(value);
        }
        else if (value instanceof o.Expression) {
            return value;
        }
        else {
            throw new exceptions_1.BaseException("Illegal state: Don't now how to compile value " + value);
        }
    };
    return _ValueOutputAstTransformer;
}());
//# sourceMappingURL=value_util.js.map