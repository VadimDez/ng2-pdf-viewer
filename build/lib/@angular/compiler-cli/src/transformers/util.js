"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ts = require("typescript");
var api_1 = require("./api");
exports.GENERATED_FILES = /(.*?)\.(ngfactory|shim\.ngstyle|ngstyle|ngsummary)\.(js|d\.ts|ts)$/;
exports.DTS = /\.d\.ts$/;
// Note: This is an internal property in TypeScript. Use it only for assertions and tests.
function tsStructureIsReused(program) {
    return program.structureIsReused;
}
exports.tsStructureIsReused = tsStructureIsReused;
function createMessageDiagnostic(messageText) {
    return {
        file: undefined,
        start: undefined,
        length: undefined,
        category: ts.DiagnosticCategory.Message, messageText: messageText,
        code: api_1.DEFAULT_ERROR_CODE,
        source: api_1.SOURCE,
    };
}
exports.createMessageDiagnostic = createMessageDiagnostic;
function isInRootDir(fileName, options) {
    return !options.rootDir || pathStartsWithPrefix(options.rootDir, fileName);
}
exports.isInRootDir = isInRootDir;
function relativeToRootDirs(filePath, rootDirs) {
    if (!filePath)
        return filePath;
    for (var _i = 0, _a = rootDirs || []; _i < _a.length; _i++) {
        var dir = _a[_i];
        var rel = pathStartsWithPrefix(dir, filePath);
        if (rel) {
            return rel;
        }
    }
    return filePath;
}
exports.relativeToRootDirs = relativeToRootDirs;
function pathStartsWithPrefix(prefix, fullPath) {
    var rel = path.relative(prefix, fullPath);
    return rel.startsWith('..') ? null : rel;
}
/**
 * Converts a ng.Diagnostic into a ts.Diagnostic.
 * This looses some information, and also uses an incomplete object as `file`.
 *
 * I.e. only use this where the API allows only a ts.Diagnostic.
 */
function ngToTsDiagnostic(ng) {
    var file;
    var start;
    var length;
    if (ng.span) {
        // Note: We can't use a real ts.SourceFile,
        // but we can at least mirror the properties `fileName` and `text`, which
        // are mostly used for error reporting.
        file = { fileName: ng.span.start.file.url, text: ng.span.start.file.content };
        start = ng.span.start.offset;
        length = ng.span.end.offset - start;
    }
    return {
        file: file,
        messageText: ng.messageText,
        category: ng.category,
        code: ng.code, start: start, length: length,
    };
}
exports.ngToTsDiagnostic = ngToTsDiagnostic;
//# sourceMappingURL=util.js.map