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
var compiler_host_1 = require("./transformers/compiler_host");
var entry_points_1 = require("./transformers/entry_points");
/**
 * @internal
 * @deprecatd Use ngtools_api2 instead!
 */
var NgTools_InternalApi_NG_2 = (function () {
    function NgTools_InternalApi_NG_2() {
    }
    /**
     * @internal
     */
    NgTools_InternalApi_NG_2.codeGen = function (options) {
        throw throwNotSupportedError();
    };
    /**
     * @internal
     */
    NgTools_InternalApi_NG_2.listLazyRoutes = function (options) {
        // TODO(tbosch): Also throwNotSupportedError once Angular CLI 1.5.1 ships,
        // as we only needed this to support Angular CLI 1.5.0 rc.*
        var ngProgram = entry_points_1.createProgram({
            rootNames: options.program.getRootFileNames(),
            options: __assign({}, options.angularCompilerOptions, { collectAllErrors: true }),
            host: options.host
        });
        var lazyRoutes = ngProgram.listLazyRoutes(options.entryModule);
        // reset the referencedFiles that the ng.Program added to the SourceFiles
        // as the host might be caching the source files!
        for (var _i = 0, _a = options.program.getSourceFiles(); _i < _a.length; _i++) {
            var sourceFile = _a[_i];
            var originalReferences = compiler_host_1.getOriginalReferences(sourceFile);
            if (originalReferences) {
                sourceFile.referencedFiles = originalReferences;
            }
        }
        var result = {};
        lazyRoutes.forEach(function (lazyRoute) {
            var route = lazyRoute.route;
            var referencedFilePath = lazyRoute.referencedModule.filePath;
            if (result[route] && result[route] != referencedFilePath) {
                throw new Error("Duplicated path in loadChildren detected: \"" + route + "\" is used in 2 loadChildren, " +
                    ("but they point to different modules \"(" + result[route] + " and ") +
                    ("\"" + referencedFilePath + "\"). Webpack cannot distinguish on context and would fail to ") +
                    'load the proper one.');
            }
            result[route] = referencedFilePath;
        });
        return result;
    };
    /**
     * @internal
     */
    NgTools_InternalApi_NG_2.extractI18n = function (options) {
        throw throwNotSupportedError();
    };
    return NgTools_InternalApi_NG_2;
}());
exports.NgTools_InternalApi_NG_2 = NgTools_InternalApi_NG_2;
function throwNotSupportedError() {
    throw new Error("Please update @angular/cli. Angular 5+ requires at least Angular CLI 1.5+");
}
//# sourceMappingURL=ngtools_api.js.map