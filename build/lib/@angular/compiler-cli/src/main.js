#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var ts = require("typescript");
var tsickle = require("tsickle");
var api = require("./transformers/api");
var util_1 = require("./transformers/util");
var perform_compile_1 = require("./perform_compile");
var perform_watch_1 = require("./perform_watch");
function main(args, consoleError, config) {
    if (consoleError === void 0) { consoleError = console.error; }
    var _a = config || readNgcCommandLineAndConfiguration(args), project = _a.project, rootNames = _a.rootNames, options = _a.options, configErrors = _a.errors, watch = _a.watch, emitFlags = _a.emitFlags;
    if (configErrors.length) {
        return reportErrorsAndExit(configErrors, /*options*/ undefined, consoleError);
    }
    if (watch) {
        var result = watchMode(project, options, consoleError);
        return reportErrorsAndExit(result.firstCompileResult, options, consoleError);
    }
    var compileDiags = perform_compile_1.performCompilation({ rootNames: rootNames, options: options, emitFlags: emitFlags, emitCallback: createEmitCallback(options) }).diagnostics;
    return reportErrorsAndExit(compileDiags, options, consoleError);
}
exports.main = main;
function createEmitCallback(options) {
    var transformDecorators = options.annotationsAs !== 'decorators';
    var transformTypesToClosure = options.annotateForClosureCompiler;
    if (!transformDecorators && !transformTypesToClosure) {
        return undefined;
    }
    if (transformDecorators) {
        // This is needed as a workaround for https://github.com/angular/tsickle/issues/635
        // Otherwise tsickle might emit references to non imported values
        // as TypeScript elided the import.
        options.emitDecoratorMetadata = true;
    }
    var tsickleHost = {
        shouldSkipTsickleProcessing: function (fileName) {
            return /\.d\.ts$/.test(fileName) || util_1.GENERATED_FILES.test(fileName);
        },
        pathToModuleName: function (context, importPath) { return ''; },
        shouldIgnoreWarningsForPath: function (filePath) { return false; },
        fileNameToModuleId: function (fileName) { return fileName; },
        googmodule: false,
        untyped: true,
        convertIndexImportShorthand: false, transformDecorators: transformDecorators, transformTypesToClosure: transformTypesToClosure,
    };
    return function (_a) {
        var program = _a.program, targetSourceFile = _a.targetSourceFile, writeFile = _a.writeFile, cancellationToken = _a.cancellationToken, emitOnlyDtsFiles = _a.emitOnlyDtsFiles, _b = _a.customTransformers, customTransformers = _b === void 0 ? {} : _b, host = _a.host, options = _a.options;
        return tsickle.emitWithTsickle(program, tsickleHost, host, options, targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, {
            beforeTs: customTransformers.before,
            afterTs: customTransformers.after,
        });
    };
}
function readNgcCommandLineAndConfiguration(args) {
    var options = {};
    var parsedArgs = require('minimist')(args);
    if (parsedArgs.i18nFile)
        options.i18nInFile = parsedArgs.i18nFile;
    if (parsedArgs.i18nFormat)
        options.i18nInFormat = parsedArgs.i18nFormat;
    if (parsedArgs.locale)
        options.i18nInLocale = parsedArgs.locale;
    var mt = parsedArgs.missingTranslation;
    if (mt === 'error' || mt === 'warning' || mt === 'ignore') {
        options.i18nInMissingTranslations = mt;
    }
    var config = readCommandLineAndConfiguration(args, options, ['i18nFile', 'i18nFormat', 'locale', 'missingTranslation', 'watch']);
    var watch = parsedArgs.w || parsedArgs.watch;
    return __assign({}, config, { watch: watch });
}
function readCommandLineAndConfiguration(args, existingOptions, ngCmdLineOptions) {
    if (existingOptions === void 0) { existingOptions = {}; }
    if (ngCmdLineOptions === void 0) { ngCmdLineOptions = []; }
    var cmdConfig = ts.parseCommandLine(args);
    var project = cmdConfig.options.project || '.';
    var cmdErrors = cmdConfig.errors.filter(function (e) {
        if (typeof e.messageText === 'string') {
            var msg_1 = e.messageText;
            return !ngCmdLineOptions.some(function (o) { return msg_1.indexOf(o) >= 0; });
        }
        return true;
    });
    if (cmdErrors.length) {
        return {
            project: project,
            rootNames: [],
            options: cmdConfig.options,
            errors: cmdErrors,
            emitFlags: api.EmitFlags.Default
        };
    }
    var allDiagnostics = [];
    var config = perform_compile_1.readConfiguration(project, cmdConfig.options);
    var options = __assign({}, config.options, existingOptions);
    if (options.locale) {
        options.i18nInLocale = options.locale;
    }
    return {
        project: project,
        rootNames: config.rootNames, options: options,
        errors: config.errors,
        emitFlags: config.emitFlags
    };
}
exports.readCommandLineAndConfiguration = readCommandLineAndConfiguration;
function reportErrorsAndExit(allDiagnostics, options, consoleError) {
    if (consoleError === void 0) { consoleError = console.error; }
    var errorsAndWarnings = perform_compile_1.filterErrorsAndWarnings(allDiagnostics);
    if (errorsAndWarnings.length) {
        var currentDir_1 = options ? options.basePath : undefined;
        var formatHost = {
            getCurrentDirectory: function () { return currentDir_1 || ts.sys.getCurrentDirectory(); },
            getCanonicalFileName: function (fileName) { return fileName; },
            getNewLine: function () { return ts.sys.newLine; }
        };
        consoleError(perform_compile_1.formatDiagnostics(errorsAndWarnings, formatHost));
    }
    return perform_compile_1.exitCodeFromResult(allDiagnostics);
}
function watchMode(project, options, consoleError) {
    return perform_watch_1.performWatchCompilation(perform_watch_1.createPerformWatchHost(project, function (diagnostics) {
        consoleError(perform_compile_1.formatDiagnostics(diagnostics));
    }, options, function (options) { return createEmitCallback(options); }));
}
exports.watchMode = watchMode;
// CLI entry point
if (require.main === module) {
    var args = process.argv.slice(2);
    process.exitCode = main(args);
}
//# sourceMappingURL=main.js.map