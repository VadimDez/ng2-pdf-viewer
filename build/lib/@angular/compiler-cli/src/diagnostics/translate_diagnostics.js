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
var api_1 = require("../transformers/api");
var util_1 = require("../transformers/util");
function translateDiagnostics(host, untranslatedDiagnostics) {
    var ts = [];
    var ng = [];
    untranslatedDiagnostics.forEach(function (diagnostic) {
        if (diagnostic.file && diagnostic.start && util_1.GENERATED_FILES.test(diagnostic.file.fileName)) {
            // We need to filter out diagnostics about unused functions as
            // they are in fact referenced by nobody and only serve to surface
            // type check errors.
            if (diagnostic.code === 6133) {
                return;
            }
            var span = sourceSpanOf(host, diagnostic.file, diagnostic.start);
            if (span) {
                var fileName = span.start.file.url;
                ng.push({
                    messageText: diagnosticMessageToString(diagnostic.messageText),
                    category: diagnostic.category, span: span,
                    source: api_1.SOURCE,
                    code: api_1.DEFAULT_ERROR_CODE
                });
            }
        }
        else {
            ts.push(diagnostic);
        }
    });
    return { ts: ts, ng: ng };
}
exports.translateDiagnostics = translateDiagnostics;
function sourceSpanOf(host, source, start) {
    var _a = ts.getLineAndCharacterOfPosition(source, start), line = _a.line, character = _a.character;
    return host.parseSourceSpanOf(source.fileName, line, character);
}
function diagnosticMessageToString(message) {
    return ts.flattenDiagnosticMessageText(message, '\n');
}
//# sourceMappingURL=translate_diagnostics.js.map