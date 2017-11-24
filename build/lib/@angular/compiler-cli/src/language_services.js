"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*

The API from compiler-cli that language-service can see.
It is important that none the exported modules require anything other than
Angular modules and Typescript as this will indirectly add a dependency
to the language service.

*/
var expression_diagnostics_1 = require("./diagnostics/expression_diagnostics");
exports.getExpressionDiagnostics = expression_diagnostics_1.getExpressionDiagnostics;
exports.getExpressionScope = expression_diagnostics_1.getExpressionScope;
exports.getTemplateExpressionDiagnostics = expression_diagnostics_1.getTemplateExpressionDiagnostics;
var expression_type_1 = require("./diagnostics/expression_type");
exports.AstType = expression_type_1.AstType;
exports.DiagnosticKind = expression_type_1.DiagnosticKind;
exports.TypeDiagnostic = expression_type_1.TypeDiagnostic;
var symbols_1 = require("./diagnostics/symbols");
exports.BuiltinType = symbols_1.BuiltinType;
var typescript_symbols_1 = require("./diagnostics/typescript_symbols");
exports.getClassFromStaticSymbol = typescript_symbols_1.getClassFromStaticSymbol;
exports.getClassMembers = typescript_symbols_1.getClassMembers;
exports.getClassMembersFromDeclaration = typescript_symbols_1.getClassMembersFromDeclaration;
exports.getPipesTable = typescript_symbols_1.getPipesTable;
exports.getSymbolQuery = typescript_symbols_1.getSymbolQuery;
var metadata_1 = require("./metadata");
exports.MetadataCollector = metadata_1.MetadataCollector;
var metadata_reader_1 = require("./transformers/metadata_reader");
exports.createMetadataReaderCache = metadata_reader_1.createMetadataReaderCache;
exports.readMetadata = metadata_reader_1.readMetadata;
//# sourceMappingURL=language_services.js.map