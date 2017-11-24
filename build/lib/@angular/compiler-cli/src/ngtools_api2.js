"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var perform_compile_1 = require("./perform_compile");
var compiler_host_1 = require("./transformers/compiler_host");
var program_1 = require("./transformers/program");
var EmitFlags;
(function (EmitFlags) {
    EmitFlags[EmitFlags["DTS"] = 1] = "DTS";
    EmitFlags[EmitFlags["JS"] = 2] = "JS";
    EmitFlags[EmitFlags["Metadata"] = 4] = "Metadata";
    EmitFlags[EmitFlags["I18nBundle"] = 8] = "I18nBundle";
    EmitFlags[EmitFlags["Codegen"] = 16] = "Codegen";
    EmitFlags[EmitFlags["Default"] = 19] = "Default";
    EmitFlags[EmitFlags["All"] = 31] = "All";
})(EmitFlags = exports.EmitFlags || (exports.EmitFlags = {}));
// Wrapper for createProgram.
function createProgram(_a) {
    var rootNames = _a.rootNames, options = _a.options, host = _a.host, oldProgram = _a.oldProgram;
    return program_1.createProgram({ rootNames: rootNames, options: options, host: host, oldProgram: oldProgram });
}
exports.createProgram = createProgram;
// Wrapper for createCompilerHost.
function createCompilerHost(_a) {
    var options = _a.options, _b = _a.tsHost, tsHost = _b === void 0 ? ts.createCompilerHost(options, true) : _b;
    return compiler_host_1.createCompilerHost({ options: options, tsHost: tsHost });
}
exports.createCompilerHost = createCompilerHost;
function formatDiagnostics(diags) {
    return perform_compile_1.formatDiagnostics(diags);
}
exports.formatDiagnostics = formatDiagnostics;
//# sourceMappingURL=ngtools_api2.js.map