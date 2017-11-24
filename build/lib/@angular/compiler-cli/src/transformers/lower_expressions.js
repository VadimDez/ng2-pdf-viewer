"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = require("@angular/compiler");
var ts = require("typescript");
var index_1 = require("../metadata/index");
function toMap(items, select) {
    return new Map(items.map(function (i) { return [select(i), i]; }));
}
// We will never lower expressions in a nested lexical scope so avoid entering them.
// This also avoids a bug in TypeScript 2.3 where the lexical scopes get out of sync
// when using visitEachChild.
function isLexicalScope(node) {
    switch (node.kind) {
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.ArrayType:
            return true;
    }
    return false;
}
function transformSourceFile(sourceFile, requests, context) {
    var inserts = [];
    // Calculate the range of interesting locations. The transform will only visit nodes in this
    // range to improve the performance on large files.
    var locations = Array.from(requests.keys());
    var min = Math.min.apply(Math, locations);
    var max = Math.max.apply(Math, locations);
    // Visit nodes matching the request and synthetic nodes added by tsickle
    function shouldVisit(pos, end) {
        return (pos <= max && end >= min) || pos == -1;
    }
    function visitSourceFile(sourceFile) {
        function topLevelStatement(node) {
            var declarations = [];
            function visitNode(node) {
                // Get the original node before tsickle
                var _a = ts.getOriginalNode(node), pos = _a.pos, end = _a.end, kind = _a.kind, originalParent = _a.parent;
                var nodeRequest = requests.get(pos);
                if (nodeRequest && nodeRequest.kind == kind && nodeRequest.end == end) {
                    // This node is requested to be rewritten as a reference to the exported name.
                    if (originalParent && originalParent.kind === ts.SyntaxKind.VariableDeclaration) {
                        // As the value represents the whole initializer of a variable declaration,
                        // just refer to that variable. This e.g. helps to preserve closure comments
                        // at the right place.
                        var varParent = originalParent;
                        if (varParent.name.kind === ts.SyntaxKind.Identifier) {
                            var varName = varParent.name.text;
                            var exportName_1 = nodeRequest.name;
                            declarations.push({
                                name: exportName_1,
                                node: ts.createIdentifier(varName),
                                order: 1 /* AfterStmt */
                            });
                            return node;
                        }
                    }
                    // Record that the node needs to be moved to an exported variable with the given name
                    var exportName = nodeRequest.name;
                    declarations.push({ name: exportName, node: node, order: 0 /* BeforeStmt */ });
                    return ts.createIdentifier(exportName);
                }
                var result = node;
                if (shouldVisit(pos, end) && !isLexicalScope(node)) {
                    result = ts.visitEachChild(node, visitNode, context);
                }
                return result;
            }
            // Get the original node before tsickle
            var _a = ts.getOriginalNode(node), pos = _a.pos, end = _a.end;
            var resultStmt;
            if (shouldVisit(pos, end)) {
                resultStmt = ts.visitEachChild(node, visitNode, context);
            }
            else {
                resultStmt = node;
            }
            if (declarations.length) {
                inserts.push({ relativeTo: resultStmt, declarations: declarations });
            }
            return resultStmt;
        }
        var newStatements = sourceFile.statements.map(topLevelStatement);
        if (inserts.length) {
            // Insert the declarations relative to the rewritten statement that references them.
            var insertMap_1 = toMap(inserts, function (i) { return i.relativeTo; });
            var tmpStatements_1 = [];
            newStatements.forEach(function (statement) {
                var insert = insertMap_1.get(statement);
                if (insert) {
                    var before = insert.declarations.filter(function (d) { return d.order === 0 /* BeforeStmt */; });
                    if (before.length) {
                        tmpStatements_1.push(createVariableStatementForDeclarations(before));
                    }
                    tmpStatements_1.push(statement);
                    var after = insert.declarations.filter(function (d) { return d.order === 1 /* AfterStmt */; });
                    if (after.length) {
                        tmpStatements_1.push(createVariableStatementForDeclarations(after));
                    }
                }
                else {
                    tmpStatements_1.push(statement);
                }
            });
            // Insert an exports clause to export the declarations
            tmpStatements_1.push(ts.createExportDeclaration(
            /* decorators */ undefined, 
            /* modifiers */ undefined, ts.createNamedExports(inserts
                .reduce(function (accumulator, insert) { return accumulator.concat(insert.declarations); }, [])
                .map(function (declaration) { return ts.createExportSpecifier(
            /* propertyName */ undefined, declaration.name); }))));
            newStatements = tmpStatements_1;
        }
        // Note: We cannot use ts.updateSourcefile here as
        // it does not work well with decorators.
        // See https://github.com/Microsoft/TypeScript/issues/17384
        var newSf = ts.getMutableClone(sourceFile);
        if (!(sourceFile.flags & ts.NodeFlags.Synthesized)) {
            newSf.flags &= ~ts.NodeFlags.Synthesized;
        }
        newSf.statements = ts.setTextRange(ts.createNodeArray(newStatements), sourceFile.statements);
        return newSf;
    }
    return visitSourceFile(sourceFile);
}
function createVariableStatementForDeclarations(declarations) {
    var varDecls = declarations.map(function (i) { return ts.createVariableDeclaration(i.name, /* type */ undefined, i.node); });
    return ts.createVariableStatement(
    /* modifiers */ undefined, ts.createVariableDeclarationList(varDecls, ts.NodeFlags.Const));
}
function getExpressionLoweringTransformFactory(requestsMap, program) {
    // Return the factory
    return function (context) { return function (sourceFile) {
        // We need to use the original SourceFile for reading metadata, and not the transformed one.
        var requests = requestsMap.getRequests(program.getSourceFile(sourceFile.fileName));
        if (requests && requests.size) {
            return transformSourceFile(sourceFile, requests, context);
        }
        return sourceFile;
    }; };
}
exports.getExpressionLoweringTransformFactory = getExpressionLoweringTransformFactory;
function shouldLower(node) {
    if (node) {
        switch (node.kind) {
            case ts.SyntaxKind.SourceFile:
            case ts.SyntaxKind.Decorator:
                // Lower expressions that are local to the module scope or
                // in a decorator.
                return true;
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                // Don't lower expressions in a declaration.
                return false;
            case ts.SyntaxKind.VariableDeclaration:
                // Avoid lowering expressions already in an exported variable declaration
                return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) == 0;
        }
        return shouldLower(node.parent);
    }
    return true;
}
function isPrimitive(value) {
    return Object(value) !== value;
}
function isRewritten(value) {
    return index_1.isMetadataGlobalReferenceExpression(value) && compiler_1.isLoweredSymbol(value.name);
}
function isLiteralFieldNamed(node, names) {
    if (node.parent && node.parent.kind == ts.SyntaxKind.PropertyAssignment) {
        var property = node.parent;
        if (property.parent && property.parent.kind == ts.SyntaxKind.ObjectLiteralExpression &&
            property.name && property.name.kind == ts.SyntaxKind.Identifier) {
            var propertyName = property.name;
            return names.has(propertyName.text);
        }
    }
    return false;
}
var LOWERABLE_FIELD_NAMES = new Set(['useValue', 'useFactory', 'data']);
var LowerMetadataCache = (function () {
    function LowerMetadataCache(options, strict) {
        this.strict = strict;
        this.metadataCache = new Map();
        this.collector = new index_1.MetadataCollector(options);
    }
    LowerMetadataCache.prototype.getMetadata = function (sourceFile) {
        return this.ensureMetadataAndRequests(sourceFile).metadata;
    };
    LowerMetadataCache.prototype.getRequests = function (sourceFile) {
        return this.ensureMetadataAndRequests(sourceFile).requests;
    };
    LowerMetadataCache.prototype.ensureMetadataAndRequests = function (sourceFile) {
        var result = this.metadataCache.get(sourceFile.fileName);
        if (!result) {
            result = this.getMetadataAndRequests(sourceFile);
            this.metadataCache.set(sourceFile.fileName, result);
        }
        return result;
    };
    LowerMetadataCache.prototype.getMetadataAndRequests = function (sourceFile) {
        var identNumber = 0;
        var freshIdent = function () { return compiler_1.createLoweredSymbol(identNumber++); };
        var requests = new Map();
        var isExportedSymbol = (function () {
            var exportTable;
            return function (node) {
                if (node.kind == ts.SyntaxKind.Identifier) {
                    var ident = node;
                    if (!exportTable) {
                        exportTable = createExportTableFor(sourceFile);
                    }
                    return exportTable.has(ident.text);
                }
                return false;
            };
        })();
        var isExportedPropertyAccess = function (node) {
            if (node.kind === ts.SyntaxKind.PropertyAccessExpression) {
                var pae = node;
                if (isExportedSymbol(pae.expression)) {
                    return true;
                }
            }
            return false;
        };
        var replaceNode = function (node) {
            var name = freshIdent();
            requests.set(node.pos, { name: name, kind: node.kind, location: node.pos, end: node.end });
            return { __symbolic: 'reference', name: name };
        };
        var substituteExpression = function (value, node) {
            if (!isPrimitive(value) && !isRewritten(value)) {
                if ((node.kind === ts.SyntaxKind.ArrowFunction ||
                    node.kind === ts.SyntaxKind.FunctionExpression) &&
                    shouldLower(node)) {
                    return replaceNode(node);
                }
                if (isLiteralFieldNamed(node, LOWERABLE_FIELD_NAMES) && shouldLower(node) &&
                    !isExportedSymbol(node) && !isExportedPropertyAccess(node)) {
                    return replaceNode(node);
                }
            }
            return value;
        };
        // Do not validate or lower metadata in a declaration file. Declaration files are requested
        // when we need to update the version of the metadata to add informatoin that might be missing
        // in the out-of-date version that can be recovered from the .d.ts file.
        var declarationFile = sourceFile.isDeclarationFile;
        var metadata = this.collector.getMetadata(sourceFile, this.strict && !declarationFile, declarationFile ? undefined : substituteExpression);
        return { metadata: metadata, requests: requests };
    };
    return LowerMetadataCache;
}());
exports.LowerMetadataCache = LowerMetadataCache;
function createExportTableFor(sourceFile) {
    var exportTable = new Set();
    // Lazily collect all the exports from the source file
    ts.forEachChild(sourceFile, function scan(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
                if ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) != 0) {
                    var classDeclaration = node;
                    var name_1 = classDeclaration.name;
                    if (name_1)
                        exportTable.add(name_1.text);
                }
                break;
            case ts.SyntaxKind.VariableStatement:
                var variableStatement = node;
                for (var _i = 0, _a = variableStatement.declarationList.declarations; _i < _a.length; _i++) {
                    var declaration = _a[_i];
                    scan(declaration);
                }
                break;
            case ts.SyntaxKind.VariableDeclaration:
                var variableDeclaration = node;
                if ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) != 0 &&
                    variableDeclaration.name.kind == ts.SyntaxKind.Identifier) {
                    var name_2 = variableDeclaration.name;
                    exportTable.add(name_2.text);
                }
                break;
            case ts.SyntaxKind.ExportDeclaration:
                var exportDeclaration = node;
                var moduleSpecifier = exportDeclaration.moduleSpecifier, exportClause = exportDeclaration.exportClause;
                if (!moduleSpecifier && exportClause) {
                    exportClause.elements.forEach(function (spec) { exportTable.add(spec.name.text); });
                }
        }
    });
    return exportTable;
}
//# sourceMappingURL=lower_expressions.js.map