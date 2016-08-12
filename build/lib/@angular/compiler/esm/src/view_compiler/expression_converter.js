/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as cdAst from '../expression_parser/ast';
import { BaseException } from '../facade/exceptions';
import { isArray, isBlank, isPresent } from '../facade/lang';
import { Identifiers } from '../identifiers';
import * as o from '../output/output_ast';
export class ExpressionWithWrappedValueInfo {
    constructor(expression, needsValueUnwrapper) {
        this.expression = expression;
        this.needsValueUnwrapper = needsValueUnwrapper;
    }
}
export function convertCdExpressionToIr(nameResolver, implicitReceiver, expression, valueUnwrapper) {
    const visitor = new _AstToIrVisitor(nameResolver, implicitReceiver, valueUnwrapper);
    const irAst = expression.visit(visitor, _Mode.Expression);
    return new ExpressionWithWrappedValueInfo(irAst, visitor.needsValueUnwrapper);
}
export function convertCdStatementToIr(nameResolver, implicitReceiver, stmt) {
    const visitor = new _AstToIrVisitor(nameResolver, implicitReceiver, null);
    let statements = [];
    flattenStatements(stmt.visit(visitor, _Mode.Statement), statements);
    return statements;
}
var _Mode;
(function (_Mode) {
    _Mode[_Mode["Statement"] = 0] = "Statement";
    _Mode[_Mode["Expression"] = 1] = "Expression";
})(_Mode || (_Mode = {}));
function ensureStatementMode(mode, ast) {
    if (mode !== _Mode.Statement) {
        throw new BaseException(`Expected a statement, but saw ${ast}`);
    }
}
function ensureExpressionMode(mode, ast) {
    if (mode !== _Mode.Expression) {
        throw new BaseException(`Expected an expression, but saw ${ast}`);
    }
}
function convertToStatementIfNeeded(mode, expr) {
    if (mode === _Mode.Statement) {
        return expr.toStmt();
    }
    else {
        return expr;
    }
}
class _AstToIrVisitor {
    constructor(_nameResolver, _implicitReceiver, _valueUnwrapper) {
        this._nameResolver = _nameResolver;
        this._implicitReceiver = _implicitReceiver;
        this._valueUnwrapper = _valueUnwrapper;
        this._map = new Map();
        this.needsValueUnwrapper = false;
    }
    visitBinary(ast, mode) {
        var op;
        switch (ast.operation) {
            case '+':
                op = o.BinaryOperator.Plus;
                break;
            case '-':
                op = o.BinaryOperator.Minus;
                break;
            case '*':
                op = o.BinaryOperator.Multiply;
                break;
            case '/':
                op = o.BinaryOperator.Divide;
                break;
            case '%':
                op = o.BinaryOperator.Modulo;
                break;
            case '&&':
                op = o.BinaryOperator.And;
                break;
            case '||':
                op = o.BinaryOperator.Or;
                break;
            case '==':
                op = o.BinaryOperator.Equals;
                break;
            case '!=':
                op = o.BinaryOperator.NotEquals;
                break;
            case '===':
                op = o.BinaryOperator.Identical;
                break;
            case '!==':
                op = o.BinaryOperator.NotIdentical;
                break;
            case '<':
                op = o.BinaryOperator.Lower;
                break;
            case '>':
                op = o.BinaryOperator.Bigger;
                break;
            case '<=':
                op = o.BinaryOperator.LowerEquals;
                break;
            case '>=':
                op = o.BinaryOperator.BiggerEquals;
                break;
            default:
                throw new BaseException(`Unsupported operation ${ast.operation}`);
        }
        return convertToStatementIfNeeded(mode, new o.BinaryOperatorExpr(op, this.visit(ast.left, _Mode.Expression), this.visit(ast.right, _Mode.Expression)));
    }
    visitChain(ast, mode) {
        ensureStatementMode(mode, ast);
        return this.visitAll(ast.expressions, mode);
    }
    visitConditional(ast, mode) {
        const value = this.visit(ast.condition, _Mode.Expression);
        return convertToStatementIfNeeded(mode, value.conditional(this.visit(ast.trueExp, _Mode.Expression), this.visit(ast.falseExp, _Mode.Expression)));
    }
    visitPipe(ast, mode) {
        const input = this.visit(ast.exp, _Mode.Expression);
        const args = this.visitAll(ast.args, _Mode.Expression);
        const value = this._nameResolver.callPipe(ast.name, input, args);
        this.needsValueUnwrapper = true;
        return convertToStatementIfNeeded(mode, this._valueUnwrapper.callMethod('unwrap', [value]));
    }
    visitFunctionCall(ast, mode) {
        return convertToStatementIfNeeded(mode, this.visit(ast.target, _Mode.Expression).callFn(this.visitAll(ast.args, _Mode.Expression)));
    }
    visitImplicitReceiver(ast, mode) {
        ensureExpressionMode(mode, ast);
        return this._implicitReceiver;
    }
    visitInterpolation(ast, mode) {
        ensureExpressionMode(mode, ast);
        const args = [o.literal(ast.expressions.length)];
        for (let i = 0; i < ast.strings.length - 1; i++) {
            args.push(o.literal(ast.strings[i]));
            args.push(this.visit(ast.expressions[i], _Mode.Expression));
        }
        args.push(o.literal(ast.strings[ast.strings.length - 1]));
        return o.importExpr(Identifiers.interpolate).callFn(args);
    }
    visitKeyedRead(ast, mode) {
        return convertToStatementIfNeeded(mode, this.visit(ast.obj, _Mode.Expression).key(this.visit(ast.key, _Mode.Expression)));
    }
    visitKeyedWrite(ast, mode) {
        const obj = this.visit(ast.obj, _Mode.Expression);
        const key = this.visit(ast.key, _Mode.Expression);
        const value = this.visit(ast.value, _Mode.Expression);
        return convertToStatementIfNeeded(mode, obj.key(key).set(value));
    }
    visitLiteralArray(ast, mode) {
        return convertToStatementIfNeeded(mode, this._nameResolver.createLiteralArray(this.visitAll(ast.expressions, mode)));
    }
    visitLiteralMap(ast, mode) {
        let parts = [];
        for (let i = 0; i < ast.keys.length; i++) {
            parts.push([ast.keys[i], this.visit(ast.values[i], _Mode.Expression)]);
        }
        return convertToStatementIfNeeded(mode, this._nameResolver.createLiteralMap(parts));
    }
    visitLiteralPrimitive(ast, mode) {
        return convertToStatementIfNeeded(mode, o.literal(ast.value));
    }
    visitMethodCall(ast, mode) {
        const leftMostSafe = this.leftMostSafeNode(ast);
        if (leftMostSafe) {
            return this.convertSafeAccess(ast, leftMostSafe, mode);
        }
        else {
            const args = this.visitAll(ast.args, _Mode.Expression);
            let result = null;
            let receiver = this.visit(ast.receiver, _Mode.Expression);
            if (receiver === this._implicitReceiver) {
                var varExpr = this._nameResolver.getLocal(ast.name);
                if (isPresent(varExpr)) {
                    result = varExpr.callFn(args);
                }
            }
            if (isBlank(result)) {
                result = receiver.callMethod(ast.name, args);
            }
            return convertToStatementIfNeeded(mode, result);
        }
    }
    visitPrefixNot(ast, mode) {
        return convertToStatementIfNeeded(mode, o.not(this.visit(ast.expression, _Mode.Expression)));
    }
    visitPropertyRead(ast, mode) {
        const leftMostSafe = this.leftMostSafeNode(ast);
        if (leftMostSafe) {
            return this.convertSafeAccess(ast, leftMostSafe, mode);
        }
        else {
            let result = null;
            var receiver = this.visit(ast.receiver, _Mode.Expression);
            if (receiver === this._implicitReceiver) {
                result = this._nameResolver.getLocal(ast.name);
            }
            if (isBlank(result)) {
                result = receiver.prop(ast.name);
            }
            return convertToStatementIfNeeded(mode, result);
        }
    }
    visitPropertyWrite(ast, mode) {
        let receiver = this.visit(ast.receiver, _Mode.Expression);
        if (receiver === this._implicitReceiver) {
            var varExpr = this._nameResolver.getLocal(ast.name);
            if (isPresent(varExpr)) {
                throw new BaseException('Cannot assign to a reference or variable!');
            }
        }
        return convertToStatementIfNeeded(mode, receiver.prop(ast.name).set(this.visit(ast.value, _Mode.Expression)));
    }
    visitSafePropertyRead(ast, mode) {
        return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
    }
    visitSafeMethodCall(ast, mode) {
        return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
    }
    visitAll(asts, mode) { return asts.map(ast => this.visit(ast, mode)); }
    visitQuote(ast, mode) {
        throw new BaseException('Quotes are not supported for evaluation!');
    }
    visit(ast, mode) {
        return (this._map.get(ast) || ast).visit(this, mode);
    }
    convertSafeAccess(ast, leftMostSafe, mode) {
        // If the expression contains a safe access node on the left it needs to be converted to
        // an expression that guards the access to the member by checking the receiver for blank. As
        // execution proceeds from left to right, the left most part of the expression must be guarded
        // first but, because member access is left associative, the right side of the expression is at
        // the top of the AST. The desired result requires lifting a copy of the the left part of the
        // expression up to test it for blank before generating the unguarded version.
        // Consider, for example the following expression: a?.b.c?.d.e
        // This results in the ast:
        //         .
        //        / \
        //       ?.   e
        //      /  \
        //     .    d
        //    / \
        //   ?.  c
        //  /  \
        // a    b
        // The following tree should be generated:
        //
        //        /---- ? ----\
        //       /      |      \
        //     a   /--- ? ---\  null
        //        /     |     \
        //       .      .     null
        //      / \    / \
        //     .  c   .   e
        //    / \    / \
        //   a   b  ,   d
        //         / \
        //        .   c
        //       / \
        //      a   b
        //
        // Notice that the first guard condition is the left hand of the left most safe access node
        // which comes in as leftMostSafe to this routine.
        const condition = this.visit(leftMostSafe.receiver, mode).isBlank();
        // Convert the ast to an unguarded access to the receiver's member. The map will substitute
        // leftMostNode with its unguarded version in the call to `this.visit()`.
        if (leftMostSafe instanceof cdAst.SafeMethodCall) {
            this._map.set(leftMostSafe, new cdAst.MethodCall(leftMostSafe.span, leftMostSafe.receiver, leftMostSafe.name, leftMostSafe.args));
        }
        else {
            this._map.set(leftMostSafe, new cdAst.PropertyRead(leftMostSafe.span, leftMostSafe.receiver, leftMostSafe.name));
        }
        // Recursively convert the node now without the guarded member access.
        const access = this.visit(ast, mode);
        // Remove the mapping. This is not strictly required as the converter only traverses each node
        // once but is safer if the conversion is changed to traverse the nodes more than once.
        this._map.delete(leftMostSafe);
        // Produce the conditional
        return condition.conditional(o.literal(null), access);
    }
    // Given a expression of the form a?.b.c?.d.e the the left most safe node is
    // the (a?.b). The . and ?. are left associative thus can be rewritten as:
    // ((((a?.c).b).c)?.d).e. This returns the most deeply nested safe read or
    // safe method call as this needs be transform initially to:
    //   a == null ? null : a.c.b.c?.d.e
    // then to:
    //   a == null ? null : a.b.c == null ? null : a.b.c.d.e
    leftMostSafeNode(ast) {
        let visit = (visitor, ast) => {
            return (this._map.get(ast) || ast).visit(visitor);
        };
        return ast.visit({
            visitBinary(ast) { return null; },
            visitChain(ast) { return null; },
            visitConditional(ast) { return null; },
            visitFunctionCall(ast) { return null; },
            visitImplicitReceiver(ast) { return null; },
            visitInterpolation(ast) { return null; },
            visitKeyedRead(ast) { return visit(this, ast.obj); },
            visitKeyedWrite(ast) { return null; },
            visitLiteralArray(ast) { return null; },
            visitLiteralMap(ast) { return null; },
            visitLiteralPrimitive(ast) { return null; },
            visitMethodCall(ast) { return visit(this, ast.receiver); },
            visitPipe(ast) { return null; },
            visitPrefixNot(ast) { return null; },
            visitPropertyRead(ast) { return visit(this, ast.receiver); },
            visitPropertyWrite(ast) { return null; },
            visitQuote(ast) { return null; },
            visitSafeMethodCall(ast) { return visit(this, ast.receiver) || ast; },
            visitSafePropertyRead(ast) {
                return visit(this, ast.receiver) || ast;
            }
        });
    }
}
function flattenStatements(arg, output) {
    if (isArray(arg)) {
        arg.forEach((entry) => flattenStatements(entry, output));
    }
    else {
        output.push(arg);
    }
}
//# sourceMappingURL=expression_converter.js.map