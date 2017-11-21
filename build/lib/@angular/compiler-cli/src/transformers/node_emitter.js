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
var METHOD_THIS_NAME = 'this';
var CATCH_ERROR_NAME = 'error';
var CATCH_STACK_NAME = 'stack';
var _VALID_IDENTIFIER_RE = /^[$A-Z_][0-9A-Z_$]*$/i;
var TypeScriptNodeEmitter = (function () {
    function TypeScriptNodeEmitter() {
    }
    TypeScriptNodeEmitter.prototype.updateSourceFile = function (sourceFile, stmts, preamble) {
        var converter = new _NodeEmitterVisitor();
        // [].concat flattens the result so that each `visit...` method can also return an array of
        // stmts.
        var statements = [].concat.apply([], stmts.map(function (stmt) { return stmt.visitStatement(converter, null); }).filter(function (stmt) { return stmt != null; }));
        var preambleStmts = [];
        if (preamble) {
            if (preamble.startsWith('/*') && preamble.endsWith('*/')) {
                preamble = preamble.substr(2, preamble.length - 4);
            }
            var commentStmt = ts.createNotEmittedStatement(sourceFile);
            ts.setSyntheticLeadingComments(commentStmt, [{ kind: ts.SyntaxKind.MultiLineCommentTrivia, text: preamble, pos: -1, end: -1 }]);
            ts.setEmitFlags(commentStmt, ts.EmitFlags.CustomPrologue);
            preambleStmts.push(commentStmt);
        }
        var sourceStatments = preambleStmts.concat(converter.getReexports(), converter.getImports(), statements);
        converter.updateSourceMap(sourceStatments);
        var newSourceFile = ts.updateSourceFileNode(sourceFile, sourceStatments);
        return [newSourceFile, converter.getNodeMap()];
    };
    return TypeScriptNodeEmitter;
}());
exports.TypeScriptNodeEmitter = TypeScriptNodeEmitter;
function createLiteral(value) {
    if (value === null) {
        return ts.createNull();
    }
    else if (value === undefined) {
        return ts.createIdentifier('undefined');
    }
    else {
        return ts.createLiteral(value);
    }
}
/**
 * Visits an output ast and produces the corresponding TypeScript synthetic nodes.
 */
var _NodeEmitterVisitor = (function () {
    function _NodeEmitterVisitor() {
        this._nodeMap = new Map();
        this._importsWithPrefixes = new Map();
        this._reexports = new Map();
        this._templateSources = new Map();
    }
    _NodeEmitterVisitor.prototype.getReexports = function () {
        return Array.from(this._reexports.entries())
            .map(function (_a) {
            var exportedFilePath = _a[0], reexports = _a[1];
            return ts.createExportDeclaration(
            /* decorators */ undefined, 
            /* modifiers */ undefined, ts.createNamedExports(reexports.map(function (_a) {
                var name = _a.name, as = _a.as;
                return ts.createExportSpecifier(name, as);
            })), 
            /* moduleSpecifier */ createLiteral(exportedFilePath));
        });
    };
    _NodeEmitterVisitor.prototype.getImports = function () {
        return Array.from(this._importsWithPrefixes.entries())
            .map(function (_a) {
            var namespace = _a[0], prefix = _a[1];
            return ts.createImportDeclaration(
            /* decorators */ undefined, 
            /* modifiers */ undefined, 
            /* importClause */ ts.createImportClause(
            /* name */ undefined, ts.createNamespaceImport(ts.createIdentifier(prefix))), 
            /* moduleSpecifier */ createLiteral(namespace));
        });
    };
    _NodeEmitterVisitor.prototype.getNodeMap = function () { return this._nodeMap; };
    _NodeEmitterVisitor.prototype.updateSourceMap = function (statements) {
        var _this = this;
        var lastRangeStartNode = undefined;
        var lastRangeEndNode = undefined;
        var lastRange = undefined;
        var recordLastSourceRange = function () {
            if (lastRange && lastRangeStartNode && lastRangeEndNode) {
                if (lastRangeStartNode == lastRangeEndNode) {
                    ts.setSourceMapRange(lastRangeEndNode, lastRange);
                }
                else {
                    ts.setSourceMapRange(lastRangeStartNode, lastRange);
                    // Only emit the pos for the first node emitted in the range.
                    ts.setEmitFlags(lastRangeStartNode, ts.EmitFlags.NoTrailingSourceMap);
                    ts.setSourceMapRange(lastRangeEndNode, lastRange);
                    // Only emit emit end for the last node emitted in the range.
                    ts.setEmitFlags(lastRangeEndNode, ts.EmitFlags.NoLeadingSourceMap);
                }
            }
        };
        var visitNode = function (tsNode) {
            var ngNode = _this._nodeMap.get(tsNode);
            if (ngNode) {
                var range = _this.sourceRangeOf(ngNode);
                if (range) {
                    if (!lastRange || range.source != lastRange.source || range.pos != lastRange.pos ||
                        range.end != lastRange.end) {
                        recordLastSourceRange();
                        lastRangeStartNode = tsNode;
                        lastRange = range;
                    }
                    lastRangeEndNode = tsNode;
                }
            }
            ts.forEachChild(tsNode, visitNode);
        };
        statements.forEach(visitNode);
        recordLastSourceRange();
    };
    _NodeEmitterVisitor.prototype.record = function (ngNode, tsNode) {
        if (tsNode && !this._nodeMap.has(tsNode)) {
            this._nodeMap.set(tsNode, ngNode);
        }
        return tsNode;
    };
    _NodeEmitterVisitor.prototype.sourceRangeOf = function (node) {
        if (node.sourceSpan) {
            var span = node.sourceSpan;
            if (span.start.file == span.end.file) {
                var file = span.start.file;
                if (file.url) {
                    var source = this._templateSources.get(file);
                    if (!source) {
                        source = ts.createSourceMapSource(file.url, file.content, function (pos) { return pos; });
                        this._templateSources.set(file, source);
                    }
                    return { pos: span.start.offset, end: span.end.offset, source: source };
                }
            }
        }
        return null;
    };
    _NodeEmitterVisitor.prototype.getModifiers = function (stmt) {
        var modifiers = [];
        if (stmt.hasModifier(compiler_1.StmtModifier.Exported)) {
            modifiers.push(ts.createToken(ts.SyntaxKind.ExportKeyword));
        }
        return modifiers;
    };
    // StatementVisitor
    _NodeEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt) {
        if (stmt.hasModifier(compiler_1.StmtModifier.Exported) && stmt.value instanceof compiler_1.ExternalExpr &&
            !stmt.type) {
            // check for a reexport
            var _a = stmt.value.value, name_1 = _a.name, moduleName = _a.moduleName;
            if (moduleName) {
                var reexports = this._reexports.get(moduleName);
                if (!reexports) {
                    reexports = [];
                    this._reexports.set(moduleName, reexports);
                }
                reexports.push({ name: name_1, as: stmt.name });
                return null;
            }
        }
        var varDeclList = ts.createVariableDeclarationList([ts.createVariableDeclaration(ts.createIdentifier(stmt.name), 
            /* type */ undefined, (stmt.value && stmt.value.visitExpression(this, null)) || undefined)]);
        if (stmt.hasModifier(compiler_1.StmtModifier.Exported)) {
            // Note: We need to add an explicit variable and export declaration so that
            // the variable can be referred in the same file as well.
            var tsVarStmt = this.record(stmt, ts.createVariableStatement(/* modifiers */ [], varDeclList));
            var exportStmt = this.record(stmt, ts.createExportDeclaration(
            /*decorators*/ undefined, /*modifiers*/ undefined, ts.createNamedExports([ts.createExportSpecifier(stmt.name, stmt.name)])));
            return [tsVarStmt, exportStmt];
        }
        return this.record(stmt, ts.createVariableStatement(this.getModifiers(stmt), varDeclList));
    };
    _NodeEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, context) {
        return this.record(stmt, ts.createFunctionDeclaration(
        /* decorators */ undefined, this.getModifiers(stmt), 
        /* asteriskToken */ undefined, stmt.name, /* typeParameters */ undefined, stmt.params.map(function (p) { return ts.createParameter(
        /* decorators */ undefined, /* modifiers */ undefined, 
        /* dotDotDotToken */ undefined, p.name); }), 
        /* type */ undefined, this._visitStatements(stmt.statements)));
    };
    _NodeEmitterVisitor.prototype.visitExpressionStmt = function (stmt) {
        return this.record(stmt, ts.createStatement(stmt.expr.visitExpression(this, null)));
    };
    _NodeEmitterVisitor.prototype.visitReturnStmt = function (stmt) {
        return this.record(stmt, ts.createReturn(stmt.value ? stmt.value.visitExpression(this, null) : undefined));
    };
    _NodeEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt) {
        var _this = this;
        var modifiers = this.getModifiers(stmt);
        var fields = stmt.fields.map(function (field) { return ts.createProperty(
        /* decorators */ undefined, /* modifiers */ undefined, field.name, 
        /* questionToken */ undefined, 
        /* type */ undefined, ts.createNull()); });
        var getters = stmt.getters.map(function (getter) { return ts.createGetAccessor(
        /* decorators */ undefined, /* modifiers */ undefined, getter.name, /* parameters */ [], 
        /* type */ undefined, _this._visitStatements(getter.body)); });
        var constructor = (stmt.constructorMethod && [ts.createConstructor(
            /* decorators */ undefined, 
            /* modifiers */ undefined, 
            /* parameters */ stmt.constructorMethod.params.map(function (p) { return ts.createParameter(
            /* decorators */ undefined, 
            /* modifiers */ undefined, 
            /* dotDotDotToken */ undefined, p.name); }), this._visitStatements(stmt.constructorMethod.body))]) ||
            [];
        // TODO {chuckj}: Determine what should be done for a method with a null name.
        var methods = stmt.methods.filter(function (method) { return method.name; })
            .map(function (method) { return ts.createMethod(
        /* decorators */ undefined, /* modifiers */ undefined, 
        /* astriskToken */ undefined, method.name /* guarded by filter */, 
        /* questionToken */ undefined, /* typeParameters */ undefined, method.params.map(function (p) { return ts.createParameter(
        /* decorators */ undefined, /* modifiers */ undefined, 
        /* dotDotDotToken */ undefined, p.name); }), 
        /* type */ undefined, _this._visitStatements(method.body)); });
        return this.record(stmt, ts.createClassDeclaration(
        /* decorators */ undefined, modifiers, stmt.name, /* typeParameters*/ undefined, stmt.parent && [ts.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [stmt.parent.visitExpression(this, null)])] ||
            [], fields.concat(getters, constructor, methods)));
    };
    _NodeEmitterVisitor.prototype.visitIfStmt = function (stmt) {
        return this.record(stmt, ts.createIf(stmt.condition.visitExpression(this, null), this._visitStatements(stmt.trueCase), stmt.falseCase && stmt.falseCase.length && this._visitStatements(stmt.falseCase) ||
            undefined));
    };
    _NodeEmitterVisitor.prototype.visitTryCatchStmt = function (stmt) {
        return this.record(stmt, ts.createTry(this._visitStatements(stmt.bodyStmts), ts.createCatchClause(CATCH_ERROR_NAME, this._visitStatementsPrefix([ts.createVariableStatement(
            /* modifiers */ undefined, [ts.createVariableDeclaration(CATCH_STACK_NAME, /* type */ undefined, ts.createPropertyAccess(ts.createIdentifier(CATCH_ERROR_NAME), ts.createIdentifier(CATCH_STACK_NAME)))])], stmt.catchStmts)), 
        /* finallyBlock */ undefined));
    };
    _NodeEmitterVisitor.prototype.visitThrowStmt = function (stmt) {
        return this.record(stmt, ts.createThrow(stmt.error.visitExpression(this, null)));
    };
    _NodeEmitterVisitor.prototype.visitCommentStmt = function (stmt) { return null; };
    // ExpressionVisitor
    _NodeEmitterVisitor.prototype.visitReadVarExpr = function (expr) {
        switch (expr.builtin) {
            case compiler_1.BuiltinVar.This:
                return this.record(expr, ts.createIdentifier(METHOD_THIS_NAME));
            case compiler_1.BuiltinVar.CatchError:
                return this.record(expr, ts.createIdentifier(CATCH_ERROR_NAME));
            case compiler_1.BuiltinVar.CatchStack:
                return this.record(expr, ts.createIdentifier(CATCH_STACK_NAME));
            case compiler_1.BuiltinVar.Super:
                return this.record(expr, ts.createSuper());
        }
        if (expr.name) {
            return this.record(expr, ts.createIdentifier(expr.name));
        }
        throw Error("Unexpected ReadVarExpr form");
    };
    _NodeEmitterVisitor.prototype.visitWriteVarExpr = function (expr) {
        return this.record(expr, ts.createAssignment(ts.createIdentifier(expr.name), expr.value.visitExpression(this, null)));
    };
    _NodeEmitterVisitor.prototype.visitWriteKeyExpr = function (expr) {
        return this.record(expr, ts.createAssignment(ts.createElementAccess(expr.receiver.visitExpression(this, null), expr.index.visitExpression(this, null)), expr.value.visitExpression(this, null)));
    };
    _NodeEmitterVisitor.prototype.visitWritePropExpr = function (expr) {
        return this.record(expr, ts.createAssignment(ts.createPropertyAccess(expr.receiver.visitExpression(this, null), expr.name), expr.value.visitExpression(this, null)));
    };
    _NodeEmitterVisitor.prototype.visitInvokeMethodExpr = function (expr) {
        var _this = this;
        var methodName = getMethodName(expr);
        return this.record(expr, ts.createCall(ts.createPropertyAccess(expr.receiver.visitExpression(this, null), methodName), 
        /* typeArguments */ undefined, expr.args.map(function (arg) { return arg.visitExpression(_this, null); })));
    };
    _NodeEmitterVisitor.prototype.visitInvokeFunctionExpr = function (expr) {
        var _this = this;
        return this.record(expr, ts.createCall(expr.fn.visitExpression(this, null), /* typeArguments */ undefined, expr.args.map(function (arg) { return arg.visitExpression(_this, null); })));
    };
    _NodeEmitterVisitor.prototype.visitInstantiateExpr = function (expr) {
        var _this = this;
        return this.record(expr, ts.createNew(expr.classExpr.visitExpression(this, null), /* typeArguments */ undefined, expr.args.map(function (arg) { return arg.visitExpression(_this, null); })));
    };
    _NodeEmitterVisitor.prototype.visitLiteralExpr = function (expr) { return this.record(expr, createLiteral(expr.value)); };
    _NodeEmitterVisitor.prototype.visitExternalExpr = function (expr) {
        return this.record(expr, this._visitIdentifier(expr.value));
    };
    _NodeEmitterVisitor.prototype.visitConditionalExpr = function (expr) {
        // TODO {chuckj}: Review use of ! on falseCase. Should it be non-nullable?
        return this.record(expr, ts.createParen(ts.createConditional(expr.condition.visitExpression(this, null), expr.trueCase.visitExpression(this, null), expr.falseCase.visitExpression(this, null))));
    };
    _NodeEmitterVisitor.prototype.visitNotExpr = function (expr) {
        return this.record(expr, ts.createPrefix(ts.SyntaxKind.ExclamationToken, expr.condition.visitExpression(this, null)));
    };
    _NodeEmitterVisitor.prototype.visitAssertNotNullExpr = function (expr) {
        return expr.condition.visitExpression(this, null);
    };
    _NodeEmitterVisitor.prototype.visitCastExpr = function (expr) {
        return expr.value.visitExpression(this, null);
    };
    _NodeEmitterVisitor.prototype.visitFunctionExpr = function (expr) {
        return this.record(expr, ts.createFunctionExpression(
        /* modifiers */ undefined, /* astriskToken */ undefined, /* name */ undefined, 
        /* typeParameters */ undefined, expr.params.map(function (p) { return ts.createParameter(
        /* decorators */ undefined, /* modifiers */ undefined, 
        /* dotDotDotToken */ undefined, p.name); }), 
        /* type */ undefined, this._visitStatements(expr.statements)));
    };
    _NodeEmitterVisitor.prototype.visitBinaryOperatorExpr = function (expr) {
        var binaryOperator;
        switch (expr.operator) {
            case compiler_1.BinaryOperator.And:
                binaryOperator = ts.SyntaxKind.AmpersandAmpersandToken;
                break;
            case compiler_1.BinaryOperator.Bigger:
                binaryOperator = ts.SyntaxKind.GreaterThanToken;
                break;
            case compiler_1.BinaryOperator.BiggerEquals:
                binaryOperator = ts.SyntaxKind.GreaterThanEqualsToken;
                break;
            case compiler_1.BinaryOperator.Divide:
                binaryOperator = ts.SyntaxKind.SlashToken;
                break;
            case compiler_1.BinaryOperator.Equals:
                binaryOperator = ts.SyntaxKind.EqualsEqualsToken;
                break;
            case compiler_1.BinaryOperator.Identical:
                binaryOperator = ts.SyntaxKind.EqualsEqualsEqualsToken;
                break;
            case compiler_1.BinaryOperator.Lower:
                binaryOperator = ts.SyntaxKind.LessThanToken;
                break;
            case compiler_1.BinaryOperator.LowerEquals:
                binaryOperator = ts.SyntaxKind.LessThanEqualsToken;
                break;
            case compiler_1.BinaryOperator.Minus:
                binaryOperator = ts.SyntaxKind.MinusToken;
                break;
            case compiler_1.BinaryOperator.Modulo:
                binaryOperator = ts.SyntaxKind.PercentToken;
                break;
            case compiler_1.BinaryOperator.Multiply:
                binaryOperator = ts.SyntaxKind.AsteriskToken;
                break;
            case compiler_1.BinaryOperator.NotEquals:
                binaryOperator = ts.SyntaxKind.ExclamationEqualsToken;
                break;
            case compiler_1.BinaryOperator.NotIdentical:
                binaryOperator = ts.SyntaxKind.ExclamationEqualsEqualsToken;
                break;
            case compiler_1.BinaryOperator.Or:
                binaryOperator = ts.SyntaxKind.BarBarToken;
                break;
            case compiler_1.BinaryOperator.Plus:
                binaryOperator = ts.SyntaxKind.PlusToken;
                break;
            default:
                throw new Error("Unknown operator: " + expr.operator);
        }
        return this.record(expr, ts.createParen(ts.createBinary(expr.lhs.visitExpression(this, null), binaryOperator, expr.rhs.visitExpression(this, null))));
    };
    _NodeEmitterVisitor.prototype.visitReadPropExpr = function (expr) {
        return this.record(expr, ts.createPropertyAccess(expr.receiver.visitExpression(this, null), expr.name));
    };
    _NodeEmitterVisitor.prototype.visitReadKeyExpr = function (expr) {
        return this.record(expr, ts.createElementAccess(expr.receiver.visitExpression(this, null), expr.index.visitExpression(this, null)));
    };
    _NodeEmitterVisitor.prototype.visitLiteralArrayExpr = function (expr) {
        var _this = this;
        return this.record(expr, ts.createArrayLiteral(expr.entries.map(function (entry) { return entry.visitExpression(_this, null); })));
    };
    _NodeEmitterVisitor.prototype.visitLiteralMapExpr = function (expr) {
        var _this = this;
        return this.record(expr, ts.createObjectLiteral(expr.entries.map(function (entry) { return ts.createPropertyAssignment(entry.quoted || !_VALID_IDENTIFIER_RE.test(entry.key) ?
            ts.createLiteral(entry.key) :
            entry.key, entry.value.visitExpression(_this, null)); })));
    };
    _NodeEmitterVisitor.prototype.visitCommaExpr = function (expr) {
        var _this = this;
        return this.record(expr, expr.parts.map(function (e) { return e.visitExpression(_this, null); })
            .reduce(function (left, right) {
            return left ? ts.createBinary(left, ts.SyntaxKind.CommaToken, right) : right;
        }, null));
    };
    _NodeEmitterVisitor.prototype._visitStatements = function (statements) {
        return this._visitStatementsPrefix([], statements);
    };
    _NodeEmitterVisitor.prototype._visitStatementsPrefix = function (prefix, statements) {
        var _this = this;
        return ts.createBlock(prefix.concat(statements.map(function (stmt) { return stmt.visitStatement(_this, null); }).filter(function (f) { return f != null; })));
    };
    _NodeEmitterVisitor.prototype._visitIdentifier = function (value) {
        var name = value.name, moduleName = value.moduleName;
        var prefixIdent = null;
        if (moduleName) {
            var prefix = this._importsWithPrefixes.get(moduleName);
            if (prefix == null) {
                prefix = "i" + this._importsWithPrefixes.size;
                this._importsWithPrefixes.set(moduleName, prefix);
            }
            prefixIdent = ts.createIdentifier(prefix);
        }
        // name can only be null during JIT which never executes this code.
        var result = prefixIdent ? ts.createPropertyAccess(prefixIdent, name) : ts.createIdentifier(name);
        return result;
    };
    return _NodeEmitterVisitor;
}());
function getMethodName(methodRef) {
    if (methodRef.name) {
        return methodRef.name;
    }
    else {
        switch (methodRef.builtin) {
            case compiler_1.BuiltinMethod.Bind:
                return 'bind';
            case compiler_1.BuiltinMethod.ConcatArray:
                return 'concat';
            case compiler_1.BuiltinMethod.SubscribeObservable:
                return 'subscribe';
        }
    }
    throw new Error('Unexpected method reference form');
}
//# sourceMappingURL=node_emitter.js.map