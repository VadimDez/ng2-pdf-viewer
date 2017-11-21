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
var api = require("./transformers/api");
var main_1 = require("./main");
function mainXi18n(args, consoleError) {
    if (consoleError === void 0) { consoleError = console.error; }
    var config = readXi18nCommandLineAndConfiguration(args);
    return main_1.main(args, consoleError, config);
}
exports.mainXi18n = mainXi18n;
function readXi18nCommandLineAndConfiguration(args) {
    var options = {};
    var parsedArgs = require('minimist')(args);
    if (parsedArgs.outFile)
        options.i18nOutFile = parsedArgs.outFile;
    if (parsedArgs.i18nFormat)
        options.i18nOutFormat = parsedArgs.i18nFormat;
    if (parsedArgs.locale)
        options.i18nOutLocale = parsedArgs.locale;
    var config = main_1.readCommandLineAndConfiguration(args, options, [
        'outFile',
        'i18nFormat',
        'locale',
    ]);
    // only emit the i18nBundle but nothing else.
    return __assign({}, config, { emitFlags: api.EmitFlags.I18nBundle });
}
// Entry point
if (require.main === module) {
    var args = process.argv.slice(2);
    process.exitCode = mainXi18n(args);
}
//# sourceMappingURL=extract_i18n.js.map