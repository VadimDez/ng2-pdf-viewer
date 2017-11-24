"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = require("@angular/compiler");
var fs = require("fs");
var path = require("path");
var ts = require("typescript");
var api = require("./transformers/api");
var ng = require("./transformers/entry_points");
var util_1 = require("./transformers/util");
var TS_EXT = /\.ts$/;
function filterErrorsAndWarnings(diagnostics) {
    return diagnostics.filter(function (d) { return d.category !== ts.DiagnosticCategory.Message; });
}
exports.filterErrorsAndWarnings = filterErrorsAndWarnings;
var defaultFormatHost = {
    getCurrentDirectory: function () { return ts.sys.getCurrentDirectory(); },
    getCanonicalFileName: function (fileName) { return fileName; },
    getNewLine: function () { return ts.sys.newLine; }
};
function formatDiagnostics(diags, tsFormatHost) {
    if (tsFormatHost === void 0) { tsFormatHost = defaultFormatHost; }
    if (diags && diags.length) {
        return diags
            .map(function (d) {
            if (api.isTsDiagnostic(d)) {
                return ts.formatDiagnostics([d], tsFormatHost);
            }
            else {
                var res = ts.DiagnosticCategory[d.category];
                if (d.span) {
                    res +=
                        " at " + d.span.start.file.url + "(" + (d.span.start.line + 1) + "," + (d.span.start.col + 1) + ")";
                }
                if (d.span && d.span.details) {
                    res += ": " + d.span.details + ", " + d.messageText + "\n";
                }
                else {
                    res += ": " + d.messageText + "\n";
                }
                return res;
            }
        })
            .join('');
    }
    else
        return '';
}
exports.formatDiagnostics = formatDiagnostics;
function calcProjectFileAndBasePath(project) {
    var projectIsDir = fs.lstatSync(project).isDirectory();
    var projectFile = projectIsDir ? path.join(project, 'tsconfig.json') : project;
    var projectDir = projectIsDir ? project : path.dirname(project);
    var basePath = path.resolve(process.cwd(), projectDir);
    return { projectFile: projectFile, basePath: basePath };
}
exports.calcProjectFileAndBasePath = calcProjectFileAndBasePath;
function createNgCompilerOptions(basePath, config, tsOptions) {
    return __assign({}, tsOptions, config.angularCompilerOptions, { genDir: basePath, basePath: basePath });
}
exports.createNgCompilerOptions = createNgCompilerOptions;
function readConfiguration(project, existingOptions) {
    try {
        var _a = calcProjectFileAndBasePath(project), projectFile = _a.projectFile, basePath = _a.basePath;
        var _b = ts.readConfigFile(projectFile, ts.sys.readFile), config = _b.config, error = _b.error;
        if (error) {
            return {
                project: project,
                errors: [error],
                rootNames: [],
                options: {},
                emitFlags: api.EmitFlags.Default
            };
        }
        var parseConfigHost = {
            useCaseSensitiveFileNames: true,
            fileExists: fs.existsSync,
            readDirectory: ts.sys.readDirectory,
            readFile: ts.sys.readFile
        };
        var parsed = ts.parseJsonConfigFileContent(config, parseConfigHost, basePath, existingOptions);
        var rootNames = parsed.fileNames.map(function (f) { return path.normalize(f); });
        var options = createNgCompilerOptions(basePath, config, parsed.options);
        var emitFlags = api.EmitFlags.Default;
        if (!(options.skipMetadataEmit || options.flatModuleOutFile)) {
            emitFlags |= api.EmitFlags.Metadata;
        }
        if (options.skipTemplateCodegen) {
            emitFlags = emitFlags & ~api.EmitFlags.Codegen;
        }
        return { project: projectFile, rootNames: rootNames, options: options, errors: parsed.errors, emitFlags: emitFlags };
    }
    catch (e) {
        var errors = [{
                category: ts.DiagnosticCategory.Error,
                messageText: e.stack,
                source: api.SOURCE,
                code: api.UNKNOWN_ERROR_CODE
            }];
        return { project: '', errors: errors, rootNames: [], options: {}, emitFlags: api.EmitFlags.Default };
    }
}
exports.readConfiguration = readConfiguration;
function exitCodeFromResult(diags) {
    if (!diags || filterErrorsAndWarnings(diags).length === 0) {
        // If we have a result and didn't get any errors, we succeeded.
        return 0;
    }
    // Return 2 if any of the errors were unknown.
    return diags.some(function (d) { return d.source === 'angular' && d.code === api.UNKNOWN_ERROR_CODE; }) ? 2 : 1;
}
exports.exitCodeFromResult = exitCodeFromResult;
function performCompilation(_a) {
    var rootNames = _a.rootNames, options = _a.options, host = _a.host, oldProgram = _a.oldProgram, emitCallback = _a.emitCallback, _b = _a.gatherDiagnostics, gatherDiagnostics = _b === void 0 ? defaultGatherDiagnostics : _b, customTransformers = _a.customTransformers, _c = _a.emitFlags, emitFlags = _c === void 0 ? api.EmitFlags.Default : _c;
    var program;
    var emitResult;
    var allDiagnostics = [];
    try {
        if (!host) {
            host = ng.createCompilerHost({ options: options });
        }
        program = ng.createProgram({ rootNames: rootNames, host: host, options: options, oldProgram: oldProgram });
        var beforeDiags = Date.now();
        allDiagnostics.push.apply(allDiagnostics, gatherDiagnostics(program));
        if (options.diagnostics) {
            var afterDiags = Date.now();
            allDiagnostics.push(util_1.createMessageDiagnostic("Time for diagnostics: " + (afterDiags - beforeDiags) + "ms."));
        }
        if (!hasErrors(allDiagnostics)) {
            emitResult = program.emit({ emitCallback: emitCallback, customTransformers: customTransformers, emitFlags: emitFlags });
            allDiagnostics.push.apply(allDiagnostics, emitResult.diagnostics);
            return { diagnostics: allDiagnostics, program: program, emitResult: emitResult };
        }
        return { diagnostics: allDiagnostics, program: program };
    }
    catch (e) {
        var errMsg = void 0;
        var code = void 0;
        if (compiler_1.isSyntaxError(e)) {
            // don't report the stack for syntax errors as they are well known errors.
            errMsg = e.message;
            code = api.DEFAULT_ERROR_CODE;
        }
        else {
            errMsg = e.stack;
            // It is not a syntax error we might have a program with unknown state, discard it.
            program = undefined;
            code = api.UNKNOWN_ERROR_CODE;
        }
        allDiagnostics.push({ category: ts.DiagnosticCategory.Error, messageText: errMsg, code: code, source: api.SOURCE });
        return { diagnostics: allDiagnostics, program: program };
    }
}
exports.performCompilation = performCompilation;
function defaultGatherDiagnostics(program) {
    var allDiagnostics = [];
    function checkDiagnostics(diags) {
        if (diags) {
            allDiagnostics.push.apply(allDiagnostics, diags);
            return !hasErrors(diags);
        }
        return true;
    }
    var checkOtherDiagnostics = true;
    // Check parameter diagnostics
    checkOtherDiagnostics = checkOtherDiagnostics &&
        checkDiagnostics(program.getTsOptionDiagnostics().concat(program.getNgOptionDiagnostics()));
    // Check syntactic diagnostics
    checkOtherDiagnostics =
        checkOtherDiagnostics && checkDiagnostics(program.getTsSyntacticDiagnostics());
    // Check TypeScript semantic and Angular structure diagnostics
    checkOtherDiagnostics =
        checkOtherDiagnostics &&
            checkDiagnostics(program.getTsSemanticDiagnostics().concat(program.getNgStructuralDiagnostics()));
    // Check Angular semantic diagnostics
    checkOtherDiagnostics =
        checkOtherDiagnostics && checkDiagnostics(program.getNgSemanticDiagnostics());
    return allDiagnostics;
}
function hasErrors(diags) {
    return diags.some(function (d) { return d.category === ts.DiagnosticCategory.Error; });
}
//# sourceMappingURL=perform_compile.js.map