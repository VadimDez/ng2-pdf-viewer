/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListWrapper } from '../facade/collection';
import { isBlank } from '../facade/lang';
export class ParserError {
    constructor(message, input, errLocation, ctxLocation) {
        this.input = input;
        this.errLocation = errLocation;
        this.ctxLocation = ctxLocation;
        this.message = `Parser Error: ${message} ${errLocation} [${input}] in ${ctxLocation}`;
    }
}
export class ParseSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
export class AST {
    constructor(span) {
        this.span = span;
    }
    visit(visitor, context = null) { return null; }
    toString() { return 'AST'; }
}
/**
 * Represents a quoted expression of the form:
 *
 * quote = prefix `:` uninterpretedExpression
 * prefix = identifier
 * uninterpretedExpression = arbitrary string
 *
 * A quoted expression is meant to be pre-processed by an AST transformer that
 * converts it into another AST that no longer contains quoted expressions.
 * It is meant to allow third-party developers to extend Angular template
 * expression language. The `uninterpretedExpression` part of the quote is
 * therefore not interpreted by the Angular's own expression parser.
 */
export class Quote extends AST {
    constructor(span, prefix, uninterpretedExpression, location) {
        super(span);
        this.prefix = prefix;
        this.uninterpretedExpression = uninterpretedExpression;
        this.location = location;
    }
    visit(visitor, context = null) { return visitor.visitQuote(this, context); }
    toString() { return 'Quote'; }
}
export class EmptyExpr extends AST {
    visit(visitor, context = null) {
        // do nothing
    }
}
export class ImplicitReceiver extends AST {
    visit(visitor, context = null) {
        return visitor.visitImplicitReceiver(this, context);
    }
}
/**
 * Multiple expressions separated by a semicolon.
 */
export class Chain extends AST {
    constructor(span, expressions) {
        super(span);
        this.expressions = expressions;
    }
    visit(visitor, context = null) { return visitor.visitChain(this, context); }
}
export class Conditional extends AST {
    constructor(span, condition, trueExp, falseExp) {
        super(span);
        this.condition = condition;
        this.trueExp = trueExp;
        this.falseExp = falseExp;
    }
    visit(visitor, context = null) {
        return visitor.visitConditional(this, context);
    }
}
export class PropertyRead extends AST {
    constructor(span, receiver, name) {
        super(span);
        this.receiver = receiver;
        this.name = name;
    }
    visit(visitor, context = null) {
        return visitor.visitPropertyRead(this, context);
    }
}
export class PropertyWrite extends AST {
    constructor(span, receiver, name, value) {
        super(span);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitPropertyWrite(this, context);
    }
}
export class SafePropertyRead extends AST {
    constructor(span, receiver, name) {
        super(span);
        this.receiver = receiver;
        this.name = name;
    }
    visit(visitor, context = null) {
        return visitor.visitSafePropertyRead(this, context);
    }
}
export class KeyedRead extends AST {
    constructor(span, obj, key) {
        super(span);
        this.obj = obj;
        this.key = key;
    }
    visit(visitor, context = null) {
        return visitor.visitKeyedRead(this, context);
    }
}
export class KeyedWrite extends AST {
    constructor(span, obj, key, value) {
        super(span);
        this.obj = obj;
        this.key = key;
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitKeyedWrite(this, context);
    }
}
export class BindingPipe extends AST {
    constructor(span, exp, name, args) {
        super(span);
        this.exp = exp;
        this.name = name;
        this.args = args;
    }
    visit(visitor, context = null) { return visitor.visitPipe(this, context); }
}
export class LiteralPrimitive extends AST {
    constructor(span, value) {
        super(span);
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralPrimitive(this, context);
    }
}
export class LiteralArray extends AST {
    constructor(span, expressions) {
        super(span);
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralArray(this, context);
    }
}
export class LiteralMap extends AST {
    constructor(span, keys, values) {
        super(span);
        this.keys = keys;
        this.values = values;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralMap(this, context);
    }
}
export class Interpolation extends AST {
    constructor(span, strings, expressions) {
        super(span);
        this.strings = strings;
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitInterpolation(this, context);
    }
}
export class Binary extends AST {
    constructor(span, operation, left, right) {
        super(span);
        this.operation = operation;
        this.left = left;
        this.right = right;
    }
    visit(visitor, context = null) {
        return visitor.visitBinary(this, context);
    }
}
export class PrefixNot extends AST {
    constructor(span, expression) {
        super(span);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitPrefixNot(this, context);
    }
}
export class MethodCall extends AST {
    constructor(span, receiver, name, args) {
        super(span);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitMethodCall(this, context);
    }
}
export class SafeMethodCall extends AST {
    constructor(span, receiver, name, args) {
        super(span);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitSafeMethodCall(this, context);
    }
}
export class FunctionCall extends AST {
    constructor(span, target, args) {
        super(span);
        this.target = target;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitFunctionCall(this, context);
    }
}
export class ASTWithSource extends AST {
    constructor(ast, source, location, errors) {
        super(new ParseSpan(0, isBlank(source) ? 0 : source.length));
        this.ast = ast;
        this.source = source;
        this.location = location;
        this.errors = errors;
    }
    visit(visitor, context = null) { return this.ast.visit(visitor, context); }
    toString() { return `${this.source} in ${this.location}`; }
}
export class TemplateBinding {
    constructor(key, keyIsVar, name, expression) {
        this.key = key;
        this.keyIsVar = keyIsVar;
        this.name = name;
        this.expression = expression;
    }
}
export class RecursiveAstVisitor {
    visitBinary(ast, context) {
        ast.left.visit(this);
        ast.right.visit(this);
        return null;
    }
    visitChain(ast, context) { return this.visitAll(ast.expressions, context); }
    visitConditional(ast, context) {
        ast.condition.visit(this);
        ast.trueExp.visit(this);
        ast.falseExp.visit(this);
        return null;
    }
    visitPipe(ast, context) {
        ast.exp.visit(this);
        this.visitAll(ast.args, context);
        return null;
    }
    visitFunctionCall(ast, context) {
        ast.target.visit(this);
        this.visitAll(ast.args, context);
        return null;
    }
    visitImplicitReceiver(ast, context) { return null; }
    visitInterpolation(ast, context) {
        return this.visitAll(ast.expressions, context);
    }
    visitKeyedRead(ast, context) {
        ast.obj.visit(this);
        ast.key.visit(this);
        return null;
    }
    visitKeyedWrite(ast, context) {
        ast.obj.visit(this);
        ast.key.visit(this);
        ast.value.visit(this);
        return null;
    }
    visitLiteralArray(ast, context) {
        return this.visitAll(ast.expressions, context);
    }
    visitLiteralMap(ast, context) { return this.visitAll(ast.values, context); }
    visitLiteralPrimitive(ast, context) { return null; }
    visitMethodCall(ast, context) {
        ast.receiver.visit(this);
        return this.visitAll(ast.args, context);
    }
    visitPrefixNot(ast, context) {
        ast.expression.visit(this);
        return null;
    }
    visitPropertyRead(ast, context) {
        ast.receiver.visit(this);
        return null;
    }
    visitPropertyWrite(ast, context) {
        ast.receiver.visit(this);
        ast.value.visit(this);
        return null;
    }
    visitSafePropertyRead(ast, context) {
        ast.receiver.visit(this);
        return null;
    }
    visitSafeMethodCall(ast, context) {
        ast.receiver.visit(this);
        return this.visitAll(ast.args, context);
    }
    visitAll(asts, context) {
        asts.forEach(ast => ast.visit(this, context));
        return null;
    }
    visitQuote(ast, context) { return null; }
}
export class AstTransformer {
    visitImplicitReceiver(ast, context) { return ast; }
    visitInterpolation(ast, context) {
        return new Interpolation(ast.span, ast.strings, this.visitAll(ast.expressions));
    }
    visitLiteralPrimitive(ast, context) {
        return new LiteralPrimitive(ast.span, ast.value);
    }
    visitPropertyRead(ast, context) {
        return new PropertyRead(ast.span, ast.receiver.visit(this), ast.name);
    }
    visitPropertyWrite(ast, context) {
        return new PropertyWrite(ast.span, ast.receiver.visit(this), ast.name, ast.value);
    }
    visitSafePropertyRead(ast, context) {
        return new SafePropertyRead(ast.span, ast.receiver.visit(this), ast.name);
    }
    visitMethodCall(ast, context) {
        return new MethodCall(ast.span, ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
    }
    visitSafeMethodCall(ast, context) {
        return new SafeMethodCall(ast.span, ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
    }
    visitFunctionCall(ast, context) {
        return new FunctionCall(ast.span, ast.target.visit(this), this.visitAll(ast.args));
    }
    visitLiteralArray(ast, context) {
        return new LiteralArray(ast.span, this.visitAll(ast.expressions));
    }
    visitLiteralMap(ast, context) {
        return new LiteralMap(ast.span, ast.keys, this.visitAll(ast.values));
    }
    visitBinary(ast, context) {
        return new Binary(ast.span, ast.operation, ast.left.visit(this), ast.right.visit(this));
    }
    visitPrefixNot(ast, context) {
        return new PrefixNot(ast.span, ast.expression.visit(this));
    }
    visitConditional(ast, context) {
        return new Conditional(ast.span, ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
    }
    visitPipe(ast, context) {
        return new BindingPipe(ast.span, ast.exp.visit(this), ast.name, this.visitAll(ast.args));
    }
    visitKeyedRead(ast, context) {
        return new KeyedRead(ast.span, ast.obj.visit(this), ast.key.visit(this));
    }
    visitKeyedWrite(ast, context) {
        return new KeyedWrite(ast.span, ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
    }
    visitAll(asts) {
        var res = ListWrapper.createFixedSize(asts.length);
        for (var i = 0; i < asts.length; ++i) {
            res[i] = asts[i].visit(this);
        }
        return res;
    }
    visitChain(ast, context) {
        return new Chain(ast.span, this.visitAll(ast.expressions));
    }
    visitQuote(ast, context) {
        return new Quote(ast.span, ast.prefix, ast.uninterpretedExpression, ast.location);
    }
}
//# sourceMappingURL=ast.js.map