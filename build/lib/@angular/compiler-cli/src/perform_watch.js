"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar = require("chokidar");
var path = require("path");
var ts = require("typescript");
var perform_compile_1 = require("./perform_compile");
var api = require("./transformers/api");
var entry_points_1 = require("./transformers/entry_points");
var util_1 = require("./transformers/util");
function totalCompilationTimeDiagnostic(timeInMillis) {
    var duration;
    if (timeInMillis > 1000) {
        duration = (timeInMillis / 1000).toPrecision(2) + "s";
    }
    else {
        duration = timeInMillis + "ms";
    }
    return {
        category: ts.DiagnosticCategory.Message,
        messageText: "Total time: " + duration,
        code: api.DEFAULT_ERROR_CODE,
        source: api.SOURCE,
    };
}
var FileChangeEvent;
(function (FileChangeEvent) {
    FileChangeEvent[FileChangeEvent["Change"] = 0] = "Change";
    FileChangeEvent[FileChangeEvent["CreateDelete"] = 1] = "CreateDelete";
    FileChangeEvent[FileChangeEvent["CreateDeleteDir"] = 2] = "CreateDeleteDir";
})(FileChangeEvent = exports.FileChangeEvent || (exports.FileChangeEvent = {}));
function createPerformWatchHost(configFileName, reportDiagnostics, existingOptions, createEmitCallback) {
    return {
        reportDiagnostics: reportDiagnostics,
        createCompilerHost: function (options) { return entry_points_1.createCompilerHost({ options: options }); },
        readConfiguration: function () { return perform_compile_1.readConfiguration(configFileName, existingOptions); },
        createEmitCallback: function (options) { return createEmitCallback ? createEmitCallback(options) : undefined; },
        onFileChange: function (options, listener, ready) {
            if (!options.basePath) {
                reportDiagnostics([{
                        category: ts.DiagnosticCategory.Error,
                        messageText: 'Invalid configuration option. baseDir not specified',
                        source: api.SOURCE,
                        code: api.DEFAULT_ERROR_CODE
                    }]);
                return { close: function () { } };
            }
            var watcher = chokidar.watch(options.basePath, {
                // ignore .dotfiles, .js and .map files.
                // can't ignore other files as we e.g. want to recompile if an `.html` file changes as well.
                ignored: /((^[\/\\])\..)|(\.js$)|(\.map$)|(\.metadata\.json)/,
                ignoreInitial: true,
                persistent: true,
            });
            watcher.on('all', function (event, path) {
                switch (event) {
                    case 'change':
                        listener(FileChangeEvent.Change, path);
                        break;
                    case 'unlink':
                    case 'add':
                        listener(FileChangeEvent.CreateDelete, path);
                        break;
                    case 'unlinkDir':
                    case 'addDir':
                        listener(FileChangeEvent.CreateDeleteDir, path);
                        break;
                }
            });
            watcher.on('ready', ready);
            return { close: function () { return watcher.close(); }, ready: ready };
        },
        setTimeout: (ts.sys.clearTimeout && ts.sys.setTimeout) || setTimeout,
        clearTimeout: (ts.sys.setTimeout && ts.sys.clearTimeout) || clearTimeout,
    };
}
exports.createPerformWatchHost = createPerformWatchHost;
/**
 * The logic in this function is adapted from `tsc.ts` from TypeScript.
 */
function performWatchCompilation(host) {
    var cachedProgram; // Program cached from last compilation
    var cachedCompilerHost; // CompilerHost cached from last compilation
    var cachedOptions; // CompilerOptions cached from last compilation
    var timerHandleForRecompilation; // Handle for 0.25s wait timer to trigger recompilation
    var ingoreFilesForWatch = new Set();
    var fileCache = new Map();
    var firstCompileResult = doCompilation();
    // Watch basePath, ignoring .dotfiles
    var resolveReadyPromise;
    var readyPromise = new Promise(function (resolve) { return resolveReadyPromise = resolve; });
    // Note: ! is ok as options are filled after the first compilation
    // Note: ! is ok as resolvedReadyPromise is filled by the previous call
    var fileWatcher = host.onFileChange(cachedOptions.options, watchedFileChanged, resolveReadyPromise);
    return { close: close, ready: function (cb) { return readyPromise.then(cb); }, firstCompileResult: firstCompileResult };
    function cacheEntry(fileName) {
        fileName = path.normalize(fileName);
        var entry = fileCache.get(fileName);
        if (!entry) {
            entry = {};
            fileCache.set(fileName, entry);
        }
        return entry;
    }
    function close() {
        fileWatcher.close();
        if (timerHandleForRecompilation) {
            host.clearTimeout(timerHandleForRecompilation);
            timerHandleForRecompilation = undefined;
        }
    }
    // Invoked to perform initial compilation or re-compilation in watch mode
    function doCompilation() {
        if (!cachedOptions) {
            cachedOptions = host.readConfiguration();
        }
        if (cachedOptions.errors && cachedOptions.errors.length) {
            host.reportDiagnostics(cachedOptions.errors);
            return cachedOptions.errors;
        }
        var startTime = Date.now();
        if (!cachedCompilerHost) {
            cachedCompilerHost = host.createCompilerHost(cachedOptions.options);
            var originalWriteFileCallback_1 = cachedCompilerHost.writeFile;
            cachedCompilerHost.writeFile = function (fileName, data, writeByteOrderMark, onError, sourceFiles) {
                ingoreFilesForWatch.add(path.normalize(fileName));
                return originalWriteFileCallback_1(fileName, data, writeByteOrderMark, onError, sourceFiles);
            };
            var originalFileExists_1 = cachedCompilerHost.fileExists;
            cachedCompilerHost.fileExists = function (fileName) {
                var ce = cacheEntry(fileName);
                if (ce.exists == null) {
                    ce.exists = originalFileExists_1.call(this, fileName);
                }
                return ce.exists;
            };
            var originalGetSourceFile_1 = cachedCompilerHost.getSourceFile;
            cachedCompilerHost.getSourceFile = function (fileName, languageVersion) {
                var ce = cacheEntry(fileName);
                if (!ce.sf) {
                    ce.sf = originalGetSourceFile_1.call(this, fileName, languageVersion);
                }
                return ce.sf;
            };
            var originalReadFile_1 = cachedCompilerHost.readFile;
            cachedCompilerHost.readFile = function (fileName) {
                var ce = cacheEntry(fileName);
                if (ce.content == null) {
                    ce.content = originalReadFile_1.call(this, fileName);
                }
                return ce.content;
            };
        }
        ingoreFilesForWatch.clear();
        var oldProgram = cachedProgram;
        // We clear out the `cachedProgram` here as a
        // program can only be used as `oldProgram` 1x
        cachedProgram = undefined;
        var compileResult = perform_compile_1.performCompilation({
            rootNames: cachedOptions.rootNames,
            options: cachedOptions.options,
            host: cachedCompilerHost,
            oldProgram: cachedProgram,
            emitCallback: host.createEmitCallback(cachedOptions.options)
        });
        if (compileResult.diagnostics.length) {
            host.reportDiagnostics(compileResult.diagnostics);
        }
        var endTime = Date.now();
        if (cachedOptions.options.diagnostics) {
            var totalTime = (endTime - startTime) / 1000;
            host.reportDiagnostics([totalCompilationTimeDiagnostic(endTime - startTime)]);
        }
        var exitCode = perform_compile_1.exitCodeFromResult(compileResult.diagnostics);
        if (exitCode == 0) {
            cachedProgram = compileResult.program;
            host.reportDiagnostics([util_1.createMessageDiagnostic('Compilation complete. Watching for file changes.')]);
        }
        else {
            host.reportDiagnostics([util_1.createMessageDiagnostic('Compilation failed. Watching for file changes.')]);
        }
        return compileResult.diagnostics;
    }
    function resetOptions() {
        cachedProgram = undefined;
        cachedCompilerHost = undefined;
        cachedOptions = undefined;
    }
    function watchedFileChanged(event, fileName) {
        if (cachedOptions && event === FileChangeEvent.Change &&
            // TODO(chuckj): validate that this is sufficient to skip files that were written.
            // This assumes that the file path we write is the same file path we will receive in the
            // change notification.
            path.normalize(fileName) === path.normalize(cachedOptions.project)) {
            // If the configuration file changes, forget everything and start the recompilation timer
            resetOptions();
        }
        else if (event === FileChangeEvent.CreateDelete || event === FileChangeEvent.CreateDeleteDir) {
            // If a file was added or removed, reread the configuration
            // to determine the new list of root files.
            cachedOptions = undefined;
        }
        if (event === FileChangeEvent.CreateDeleteDir) {
            fileCache.clear();
        }
        else {
            fileCache.delete(path.normalize(fileName));
        }
        if (!ingoreFilesForWatch.has(path.normalize(fileName))) {
            // Ignore the file if the file is one that was written by the compiler.
            startTimerForRecompilation();
        }
    }
    // Upon detecting a file change, wait for 250ms and then perform a recompilation. This gives batch
    // operations (such as saving all modified files in an editor) a chance to complete before we kick
    // off a new compilation.
    function startTimerForRecompilation() {
        if (timerHandleForRecompilation) {
            host.clearTimeout(timerHandleForRecompilation);
        }
        timerHandleForRecompilation = host.setTimeout(recompile, 250);
    }
    function recompile() {
        timerHandleForRecompilation = undefined;
        host.reportDiagnostics([util_1.createMessageDiagnostic('File change detected. Starting incremental compilation.')]);
        doCompilation();
    }
}
exports.performWatchCompilation = performWatchCompilation;
//# sourceMappingURL=perform_watch.js.map