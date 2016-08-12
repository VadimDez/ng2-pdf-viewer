/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListWrapper } from '../facade/collection';
import { BaseException } from '../facade/exceptions';
import { isPresent } from '../facade/lang';
import * as o from './output_ast';
import { debugOutputAstAsTypeScript } from './ts_emitter';
export function interpretStatements(statements, resultVar) {
    var stmtsWithReturn = statements.concat([new o.ReturnStatement(o.variable(resultVar))]);
    var ctx = new _ExecutionContext(null, null, null, new Map());
    var visitor = new StatementInterpreter();
    var result = visitor.visitAllStatements(stmtsWithReturn, ctx);
    return isPresent(result) ? result.value : null;
}
function _executeFunctionStatements(varNames, varValues, statements, ctx, visitor) {
    var childCtx = ctx.createChildWihtLocalVars();
    for (var i = 0; i < varNames.length; i++) {
        childCtx.vars.set(varNames[i], varValues[i]);
    }
    var result = visitor.visitAllStatements(statements, childCtx);
    return isPresent(result) ? result.value : null;
}
class _ExecutionContext {
    constructor(parent, instance, className, vars) {
        this.parent = parent;
        this.instance = instance;
        this.className = className;
        this.vars = vars;
    }
    createChildWihtLocalVars() {
        return new _ExecutionContext(this, this.instance, this.className, new Map());
    }
}
class ReturnValue {
    constructor(value) {
        this.value = value;
    }
}
function createDynamicClass(_classStmt, _ctx, _visitor) {
    let propertyDescriptors = {};
    _classStmt.getters.forEach((getter) => {
        // Note: use `function` instead of arrow function to capture `this`
        propertyDescriptors[getter.name] = {
            configurable: false,
            get: function () {
                let instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
                return _executeFunctionStatements([], [], getter.body, instanceCtx, _visitor);
            }
        };
    });
    _classStmt.methods.forEach(function (method) {
        const paramNames = method.params.map(param => param.name);
        // Note: use `function` instead of arrow function to capture `this`
        propertyDescriptors[method.name] = {
            writable: false,
            configurable: false,
            value: function (...args) {
                let instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
                return _executeFunctionStatements(paramNames, args, method.body, instanceCtx, _visitor);
            }
        };
    });
    var ctorParamNames = _classStmt.constructorMethod.params.map(param => param.name);
    // Note: use `function` instead of arrow function to capture `this`
    var ctor = function (...args) {
        let instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
        _classStmt.fields.forEach((field) => { this[field.name] = undefined; });
        _executeFunctionStatements(ctorParamNames, args, _classStmt.constructorMethod.body, instanceCtx, _visitor);
    };
    var superClass = _classStmt.parent.visitExpression(_visitor, _ctx);
    ctor.prototype = Object.create(superClass.prototype, propertyDescriptors);
    return ctor;
}
class StatementInterpreter {
    debugAst(ast) { return debugOutputAstAsTypeScript(ast); }
    visitDeclareVarStmt(stmt, ctx) {
        ctx.vars.set(stmt.name, stmt.value.visitExpression(this, ctx));
        return null;
    }
    visitWriteVarExpr(expr, ctx) {
        var value = expr.value.visitExpression(this, ctx);
        var currCtx = ctx;
        while (currCtx != null) {
            if (currCtx.vars.has(expr.name)) {
                currCtx.vars.set(expr.name, value);
                return value;
            }
            currCtx = currCtx.parent;
        }
        throw new BaseException(`Not declared variable ${expr.name}`);
    }
    visitReadVarExpr(ast, ctx) {
        var varName = ast.name;
        if (isPresent(ast.builtin)) {
            switch (ast.builtin) {
                case o.BuiltinVar.Super:
                    return ctx.instance.__proto__;
                case o.BuiltinVar.This:
                    return ctx.instance;
                case o.BuiltinVar.CatchError:
                    varName = CATCH_ERROR_VAR;
                    break;
                case o.BuiltinVar.CatchStack:
                    varName = CATCH_STACK_VAR;
                    break;
                default:
                    throw new BaseException(`Unknown builtin variable ${ast.builtin}`);
            }
        }
        var currCtx = ctx;
        while (currCtx != null) {
            if (currCtx.vars.has(varName)) {
                return currCtx.vars.get(varName);
            }
            currCtx = currCtx.parent;
        }
        throw new BaseException(`Not declared variable ${varName}`);
    }
    visitWriteKeyExpr(expr, ctx) {
        var receiver = expr.receiver.visitExpression(this, ctx);
        var index = expr.index.visitExpression(this, ctx);
        var value = expr.value.visitExpression(this, ctx);
        receiver[index] = value;
        return value;
    }
    visitWritePropExpr(expr, ctx) {
        var receiver = expr.receiver.visitExpression(this, ctx);
        var value = expr.value.visitExpression(this, ctx);
        receiver[expr.name] = value;
        return value;
    }
    visitInvokeMethodExpr(expr, ctx) {
        var receiver = expr.receiver.visitExpression(this, ctx);
        var args = this.visitAllExpressions(expr.args, ctx);
        var result;
        if (isPresent(expr.builtin)) {
            switch (expr.builtin) {
                case o.BuiltinMethod.ConcatArray:
                    result = ListWrapper.concat(receiver, args[0]);
                    break;
                case o.BuiltinMethod.SubscribeObservable:
                    result = receiver.subscribe({ next: args[0] });
                    break;
                case o.BuiltinMethod.bind:
                    result = receiver.bind(args[0]);
                    break;
                default:
                    throw new BaseException(`Unknown builtin method ${expr.builtin}`);
            }
        }
        else {
            result = receiver[expr.name].apply(receiver, args);
        }
        return result;
    }
    visitInvokeFunctionExpr(stmt, ctx) {
        var args = this.visitAllExpressions(stmt.args, ctx);
        var fnExpr = stmt.fn;
        if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
            ctx.instance.constructor.prototype.constructor.apply(ctx.instance, args);
            return null;
        }
        else {
            var fn = stmt.fn.visitExpression(this, ctx);
            return fn.apply(null, args);
        }
    }
    visitReturnStmt(stmt, ctx) {
        return new ReturnValue(stmt.value.visitExpression(this, ctx));
    }
    visitDeclareClassStmt(stmt, ctx) {
        var clazz = createDynamicClass(stmt, ctx, this);
        ctx.vars.set(stmt.name, clazz);
        return null;
    }
    visitExpressionStmt(stmt, ctx) {
        return stmt.expr.visitExpression(this, ctx);
    }
    visitIfStmt(stmt, ctx) {
        var condition = stmt.condition.visitExpression(this, ctx);
        if (condition) {
            return this.visitAllStatements(stmt.trueCase, ctx);
        }
        else if (isPresent(stmt.falseCase)) {
            return this.visitAllStatements(stmt.falseCase, ctx);
        }
        return null;
    }
    visitTryCatchStmt(stmt, ctx) {
        try {
            return this.visitAllStatements(stmt.bodyStmts, ctx);
        }
        catch (e) {
            var childCtx = ctx.createChildWihtLocalVars();
            childCtx.vars.set(CATCH_ERROR_VAR, e);
            childCtx.vars.set(CATCH_STACK_VAR, e.stack);
            return this.visitAllStatements(stmt.catchStmts, childCtx);
        }
    }
    visitThrowStmt(stmt, ctx) {
        throw stmt.error.visitExpression(this, ctx);
    }
    visitCommentStmt(stmt, context) { return null; }
    visitInstantiateExpr(ast, ctx) {
        var args = this.visitAllExpressions(ast.args, ctx);
        var clazz = ast.classExpr.visitExpression(this, ctx);
        return new clazz(...args);
    }
    visitLiteralExpr(ast, ctx) { return ast.value; }
    visitExternalExpr(ast, ctx) { return ast.value.runtime; }
    visitConditionalExpr(ast, ctx) {
        if (ast.condition.visitExpression(this, ctx)) {
            return ast.trueCase.visitExpression(this, ctx);
        }
        else if (isPresent(ast.falseCase)) {
            return ast.falseCase.visitExpression(this, ctx);
        }
        return null;
    }
    visitNotExpr(ast, ctx) {
        return !ast.condition.visitExpression(this, ctx);
    }
    visitCastExpr(ast, ctx) {
        return ast.value.visitExpression(this, ctx);
    }
    visitFunctionExpr(ast, ctx) {
        var paramNames = ast.params.map((param) => param.name);
        return _declareFn(paramNames, ast.statements, ctx, this);
    }
    visitDeclareFunctionStmt(stmt, ctx) {
        var paramNames = stmt.params.map((param) => param.name);
        ctx.vars.set(stmt.name, _declareFn(paramNames, stmt.statements, ctx, this));
        return null;
    }
    visitBinaryOperatorExpr(ast, ctx) {
        var lhs = () => ast.lhs.visitExpression(this, ctx);
        var rhs = () => ast.rhs.visitExpression(this, ctx);
        switch (ast.operator) {
            case o.BinaryOperator.Equals:
                return lhs() == rhs();
            case o.BinaryOperator.Identical:
                return lhs() === rhs();
            case o.BinaryOperator.NotEquals:
                return lhs() != rhs();
            case o.BinaryOperator.NotIdentical:
                return lhs() !== rhs();
            case o.BinaryOperator.And:
                return lhs() && rhs();
            case o.BinaryOperator.Or:
                return lhs() || rhs();
            case o.BinaryOperator.Plus:
                return lhs() + rhs();
            case o.BinaryOperator.Minus:
                return lhs() - rhs();
            case o.BinaryOperator.Divide:
                return lhs() / rhs();
            case o.BinaryOperator.Multiply:
                return lhs() * rhs();
            case o.BinaryOperator.Modulo:
                return lhs() % rhs();
            case o.BinaryOperator.Lower:
                return lhs() < rhs();
            case o.BinaryOperator.LowerEquals:
                return lhs() <= rhs();
            case o.BinaryOperator.Bigger:
                return lhs() > rhs();
            case o.BinaryOperator.BiggerEquals:
                return lhs() >= rhs();
            default:
                throw new BaseException(`Unknown operator ${ast.operator}`);
        }
    }
    visitReadPropExpr(ast, ctx) {
        var result;
        var receiver = ast.receiver.visitExpression(this, ctx);
        result = receiver[ast.name];
        return result;
    }
    visitReadKeyExpr(ast, ctx) {
        var receiver = ast.receiver.visitExpression(this, ctx);
        var prop = ast.index.visitExpression(this, ctx);
        return receiver[prop];
    }
    visitLiteralArrayExpr(ast, ctx) {
        return this.visitAllExpressions(ast.entries, ctx);
    }
    visitLiteralMapExpr(ast, ctx) {
        var result = {};
        ast.entries.forEach((entry) => result[entry[0]] =
            entry[1].visitExpression(this, ctx));
        return result;
    }
    visitAllExpressions(expressions, ctx) {
        return expressions.map((expr) => expr.visitExpression(this, ctx));
    }
    visitAllStatements(statements, ctx) {
        for (var i = 0; i < statements.length; i++) {
            var stmt = statements[i];
            var val = stmt.visitStatement(this, ctx);
            if (val instanceof ReturnValue) {
                return val;
            }
        }
        return null;
    }
}
function _declareFn(varNames, statements, ctx, visitor) {
    return (...args) => _executeFunctionStatements(varNames, args, statements, ctx, visitor);
}
var CATCH_ERROR_VAR = 'error';
var CATCH_STACK_VAR = 'stack';
//# sourceMappingURL=output_interpreter.js.map