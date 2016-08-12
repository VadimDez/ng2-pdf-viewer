/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import * as chars from '../chars';
import { StringWrapper, escapeRegExp, isBlank, isPresent } from '../facade/lang';
import { DEFAULT_INTERPOLATION_CONFIG } from '../ml_parser/interpolation_config';
import { ASTWithSource, Binary, BindingPipe, Chain, Conditional, EmptyExpr, FunctionCall, ImplicitReceiver, Interpolation, KeyedRead, KeyedWrite, LiteralArray, LiteralMap, LiteralPrimitive, MethodCall, ParseSpan, ParserError, PrefixNot, PropertyRead, PropertyWrite, Quote, SafeMethodCall, SafePropertyRead, TemplateBinding } from './ast';
import { EOF, Lexer, TokenType, isIdentifier, isQuote } from './lexer';
export class SplitInterpolation {
    constructor(strings, expressions) {
        this.strings = strings;
        this.expressions = expressions;
    }
}
export class TemplateBindingParseResult {
    constructor(templateBindings, warnings, errors) {
        this.templateBindings = templateBindings;
        this.warnings = warnings;
        this.errors = errors;
    }
}
function _createInterpolateRegExp(config) {
    const pattern = escapeRegExp(config.start) + '([\\s\\S]*?)' + escapeRegExp(config.end);
    return new RegExp(pattern, 'g');
}
export class Parser {
    constructor(_lexer) {
        this._lexer = _lexer;
        this.errors = [];
    }
    parseAction(input, location, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
        this._checkNoInterpolation(input, location, interpolationConfig);
        const tokens = this._lexer.tokenize(this._stripComments(input));
        const ast = new _ParseAST(input, location, tokens, true, this.errors).parseChain();
        return new ASTWithSource(ast, input, location, this.errors);
    }
    parseBinding(input, location, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
        var ast = this._parseBindingAst(input, location, interpolationConfig);
        return new ASTWithSource(ast, input, location, this.errors);
    }
    parseSimpleBinding(input, location, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
        var ast = this._parseBindingAst(input, location, interpolationConfig);
        if (!SimpleExpressionChecker.check(ast)) {
            this._reportError('Host binding expression can only contain field access and constants', input, location);
        }
        return new ASTWithSource(ast, input, location, this.errors);
    }
    _reportError(message, input, errLocation, ctxLocation) {
        this.errors.push(new ParserError(message, input, errLocation, ctxLocation));
    }
    _parseBindingAst(input, location, interpolationConfig) {
        // Quotes expressions use 3rd-party expression language. We don't want to use
        // our lexer or parser for that, so we check for that ahead of time.
        var quote = this._parseQuote(input, location);
        if (isPresent(quote)) {
            return quote;
        }
        this._checkNoInterpolation(input, location, interpolationConfig);
        var tokens = this._lexer.tokenize(this._stripComments(input));
        return new _ParseAST(input, location, tokens, false, this.errors).parseChain();
    }
    _parseQuote(input, location) {
        if (isBlank(input))
            return null;
        var prefixSeparatorIndex = input.indexOf(':');
        if (prefixSeparatorIndex == -1)
            return null;
        var prefix = input.substring(0, prefixSeparatorIndex).trim();
        if (!isIdentifier(prefix))
            return null;
        var uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
        return new Quote(new ParseSpan(0, input.length), prefix, uninterpretedExpression, location);
    }
    parseTemplateBindings(input, location) {
        var tokens = this._lexer.tokenize(input);
        return new _ParseAST(input, location, tokens, false, this.errors).parseTemplateBindings();
    }
    parseInterpolation(input, location, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
        let split = this.splitInterpolation(input, location, interpolationConfig);
        if (split == null)
            return null;
        let expressions = [];
        for (let i = 0; i < split.expressions.length; ++i) {
            var tokens = this._lexer.tokenize(this._stripComments(split.expressions[i]));
            var ast = new _ParseAST(input, location, tokens, false, this.errors).parseChain();
            expressions.push(ast);
        }
        return new ASTWithSource(new Interpolation(new ParseSpan(0, isBlank(input) ? 0 : input.length), split.strings, expressions), input, location, this.errors);
    }
    splitInterpolation(input, location, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
        const regexp = _createInterpolateRegExp(interpolationConfig);
        const parts = StringWrapper.split(input, regexp);
        if (parts.length <= 1) {
            return null;
        }
        const strings = [];
        const expressions = [];
        for (let i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (i % 2 === 0) {
                // fixed string
                strings.push(part);
            }
            else if (part.trim().length > 0) {
                expressions.push(part);
            }
            else {
                this._reportError('Blank expressions are not allowed in interpolated strings', input, `at column ${this._findInterpolationErrorColumn(parts, i, interpolationConfig)} in`, location);
            }
        }
        return new SplitInterpolation(strings, expressions);
    }
    wrapLiteralPrimitive(input, location) {
        return new ASTWithSource(new LiteralPrimitive(new ParseSpan(0, isBlank(input) ? 0 : input.length), input), input, location, this.errors);
    }
    _stripComments(input) {
        const i = this._commentStart(input);
        return isPresent(i) ? input.substring(0, i).trim() : input;
    }
    _commentStart(input) {
        var outerQuote = null;
        for (let i = 0; i < input.length - 1; i++) {
            const char = StringWrapper.charCodeAt(input, i);
            const nextChar = StringWrapper.charCodeAt(input, i + 1);
            if (char === chars.$SLASH && nextChar == chars.$SLASH && isBlank(outerQuote))
                return i;
            if (outerQuote === char) {
                outerQuote = null;
            }
            else if (isBlank(outerQuote) && isQuote(char)) {
                outerQuote = char;
            }
        }
        return null;
    }
    _checkNoInterpolation(input, location, interpolationConfig) {
        var regexp = _createInterpolateRegExp(interpolationConfig);
        var parts = StringWrapper.split(input, regexp);
        if (parts.length > 1) {
            this._reportError(`Got interpolation (${interpolationConfig.start}${interpolationConfig.end}) where expression was expected`, input, `at column ${this._findInterpolationErrorColumn(parts, 1, interpolationConfig)} in`, location);
        }
    }
    _findInterpolationErrorColumn(parts, partInErrIdx, interpolationConfig) {
        var errLocation = '';
        for (var j = 0; j < partInErrIdx; j++) {
            errLocation += j % 2 === 0 ?
                parts[j] :
                `${interpolationConfig.start}${parts[j]}${interpolationConfig.end}`;
        }
        return errLocation.length;
    }
}
/** @nocollapse */
Parser.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Parser.ctorParameters = [
    { type: Lexer, },
];
export class _ParseAST {
    constructor(input, location, tokens, parseAction, errors) {
        this.input = input;
        this.location = location;
        this.tokens = tokens;
        this.parseAction = parseAction;
        this.errors = errors;
        this.rparensExpected = 0;
        this.rbracketsExpected = 0;
        this.rbracesExpected = 0;
        this.index = 0;
    }
    peek(offset) {
        var i = this.index + offset;
        return i < this.tokens.length ? this.tokens[i] : EOF;
    }
    get next() { return this.peek(0); }
    get inputIndex() {
        return (this.index < this.tokens.length) ? this.next.index : this.input.length;
    }
    span(start) { return new ParseSpan(start, this.inputIndex); }
    advance() { this.index++; }
    optionalCharacter(code) {
        if (this.next.isCharacter(code)) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    }
    peekKeywordLet() { return this.next.isKeywordLet(); }
    peekDeprecatedKeywordVar() { return this.next.isKeywordDeprecatedVar(); }
    peekDeprecatedOperatorHash() { return this.next.isOperator('#'); }
    expectCharacter(code) {
        if (this.optionalCharacter(code))
            return;
        this.error(`Missing expected ${StringWrapper.fromCharCode(code)}`);
    }
    optionalOperator(op) {
        if (this.next.isOperator(op)) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    }
    expectOperator(operator) {
        if (this.optionalOperator(operator))
            return;
        this.error(`Missing expected operator ${operator}`);
    }
    expectIdentifierOrKeyword() {
        var n = this.next;
        if (!n.isIdentifier() && !n.isKeyword()) {
            this.error(`Unexpected token ${n}, expected identifier or keyword`);
            return '';
        }
        this.advance();
        return n.toString();
    }
    expectIdentifierOrKeywordOrString() {
        var n = this.next;
        if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
            this.error(`Unexpected token ${n}, expected identifier, keyword, or string`);
            return '';
        }
        this.advance();
        return n.toString();
    }
    parseChain() {
        var exprs = [];
        const start = this.inputIndex;
        while (this.index < this.tokens.length) {
            var expr = this.parsePipe();
            exprs.push(expr);
            if (this.optionalCharacter(chars.$SEMICOLON)) {
                if (!this.parseAction) {
                    this.error('Binding expression cannot contain chained expression');
                }
                while (this.optionalCharacter(chars.$SEMICOLON)) {
                } // read all semicolons
            }
            else if (this.index < this.tokens.length) {
                this.error(`Unexpected token '${this.next}'`);
            }
        }
        if (exprs.length == 0)
            return new EmptyExpr(this.span(start));
        if (exprs.length == 1)
            return exprs[0];
        return new Chain(this.span(start), exprs);
    }
    parsePipe() {
        var result = this.parseExpression();
        if (this.optionalOperator('|')) {
            if (this.parseAction) {
                this.error('Cannot have a pipe in an action expression');
            }
            do {
                var name = this.expectIdentifierOrKeyword();
                var args = [];
                while (this.optionalCharacter(chars.$COLON)) {
                    args.push(this.parseExpression());
                }
                result = new BindingPipe(this.span(result.span.start), result, name, args);
            } while (this.optionalOperator('|'));
        }
        return result;
    }
    parseExpression() { return this.parseConditional(); }
    parseConditional() {
        const start = this.inputIndex;
        const result = this.parseLogicalOr();
        if (this.optionalOperator('?')) {
            const yes = this.parsePipe();
            let no;
            if (!this.optionalCharacter(chars.$COLON)) {
                var end = this.inputIndex;
                var expression = this.input.substring(start, end);
                this.error(`Conditional expression ${expression} requires all 3 expressions`);
                no = new EmptyExpr(this.span(start));
            }
            else {
                no = this.parsePipe();
            }
            return new Conditional(this.span(start), result, yes, no);
        }
        else {
            return result;
        }
    }
    parseLogicalOr() {
        // '||'
        let result = this.parseLogicalAnd();
        while (this.optionalOperator('||')) {
            const right = this.parseLogicalAnd();
            result = new Binary(this.span(result.span.start), '||', result, right);
        }
        return result;
    }
    parseLogicalAnd() {
        // '&&'
        let result = this.parseEquality();
        while (this.optionalOperator('&&')) {
            const right = this.parseEquality();
            result = new Binary(this.span(result.span.start), '&&', result, right);
        }
        return result;
    }
    parseEquality() {
        // '==','!=','===','!=='
        let result = this.parseRelational();
        while (this.next.type == TokenType.Operator) {
            let operator = this.next.strValue;
            switch (operator) {
                case '==':
                case '===':
                case '!=':
                case '!==':
                    this.advance();
                    const right = this.parseRelational();
                    result = new Binary(this.span(result.span.start), operator, result, right);
                    continue;
            }
            break;
        }
        return result;
    }
    parseRelational() {
        // '<', '>', '<=', '>='
        let result = this.parseAdditive();
        while (this.next.type == TokenType.Operator) {
            let operator = this.next.strValue;
            switch (operator) {
                case '<':
                case '>':
                case '<=':
                case '>=':
                    this.advance();
                    const right = this.parseAdditive();
                    result = new Binary(this.span(result.span.start), operator, result, right);
                    continue;
            }
            break;
        }
        return result;
    }
    parseAdditive() {
        // '+', '-'
        let result = this.parseMultiplicative();
        while (this.next.type == TokenType.Operator) {
            const operator = this.next.strValue;
            switch (operator) {
                case '+':
                case '-':
                    this.advance();
                    let right = this.parseMultiplicative();
                    result = new Binary(this.span(result.span.start), operator, result, right);
                    continue;
            }
            break;
        }
        return result;
    }
    parseMultiplicative() {
        // '*', '%', '/'
        let result = this.parsePrefix();
        while (this.next.type == TokenType.Operator) {
            const operator = this.next.strValue;
            switch (operator) {
                case '*':
                case '%':
                case '/':
                    this.advance();
                    let right = this.parsePrefix();
                    result = new Binary(this.span(result.span.start), operator, result, right);
                    continue;
            }
            break;
        }
        return result;
    }
    parsePrefix() {
        if (this.next.type == TokenType.Operator) {
            const start = this.inputIndex;
            const operator = this.next.strValue;
            let result;
            switch (operator) {
                case '+':
                    this.advance();
                    return this.parsePrefix();
                case '-':
                    this.advance();
                    result = this.parsePrefix();
                    return new Binary(this.span(start), operator, new LiteralPrimitive(new ParseSpan(start, start), 0), result);
                case '!':
                    this.advance();
                    result = this.parsePrefix();
                    return new PrefixNot(this.span(start), result);
            }
        }
        return this.parseCallChain();
    }
    parseCallChain() {
        let result = this.parsePrimary();
        while (true) {
            if (this.optionalCharacter(chars.$PERIOD)) {
                result = this.parseAccessMemberOrMethodCall(result, false);
            }
            else if (this.optionalOperator('?.')) {
                result = this.parseAccessMemberOrMethodCall(result, true);
            }
            else if (this.optionalCharacter(chars.$LBRACKET)) {
                this.rbracketsExpected++;
                const key = this.parsePipe();
                this.rbracketsExpected--;
                this.expectCharacter(chars.$RBRACKET);
                if (this.optionalOperator('=')) {
                    const value = this.parseConditional();
                    result = new KeyedWrite(this.span(result.span.start), result, key, value);
                }
                else {
                    result = new KeyedRead(this.span(result.span.start), result, key);
                }
            }
            else if (this.optionalCharacter(chars.$LPAREN)) {
                this.rparensExpected++;
                const args = this.parseCallArguments();
                this.rparensExpected--;
                this.expectCharacter(chars.$RPAREN);
                result = new FunctionCall(this.span(result.span.start), result, args);
            }
            else {
                return result;
            }
        }
    }
    parsePrimary() {
        const start = this.inputIndex;
        if (this.optionalCharacter(chars.$LPAREN)) {
            this.rparensExpected++;
            const result = this.parsePipe();
            this.rparensExpected--;
            this.expectCharacter(chars.$RPAREN);
            return result;
        }
        else if (this.next.isKeywordNull()) {
            this.advance();
            return new LiteralPrimitive(this.span(start), null);
        }
        else if (this.next.isKeywordUndefined()) {
            this.advance();
            return new LiteralPrimitive(this.span(start), void 0);
        }
        else if (this.next.isKeywordTrue()) {
            this.advance();
            return new LiteralPrimitive(this.span(start), true);
        }
        else if (this.next.isKeywordFalse()) {
            this.advance();
            return new LiteralPrimitive(this.span(start), false);
        }
        else if (this.next.isKeywordThis()) {
            this.advance();
            return new ImplicitReceiver(this.span(start));
        }
        else if (this.optionalCharacter(chars.$LBRACKET)) {
            this.rbracketsExpected++;
            const elements = this.parseExpressionList(chars.$RBRACKET);
            this.rbracketsExpected--;
            this.expectCharacter(chars.$RBRACKET);
            return new LiteralArray(this.span(start), elements);
        }
        else if (this.next.isCharacter(chars.$LBRACE)) {
            return this.parseLiteralMap();
        }
        else if (this.next.isIdentifier()) {
            return this.parseAccessMemberOrMethodCall(new ImplicitReceiver(this.span(start)), false);
        }
        else if (this.next.isNumber()) {
            const value = this.next.toNumber();
            this.advance();
            return new LiteralPrimitive(this.span(start), value);
        }
        else if (this.next.isString()) {
            const literalValue = this.next.toString();
            this.advance();
            return new LiteralPrimitive(this.span(start), literalValue);
        }
        else if (this.index >= this.tokens.length) {
            this.error(`Unexpected end of expression: ${this.input}`);
            return new EmptyExpr(this.span(start));
        }
        else {
            this.error(`Unexpected token ${this.next}`);
            return new EmptyExpr(this.span(start));
        }
    }
    parseExpressionList(terminator) {
        let result = [];
        if (!this.next.isCharacter(terminator)) {
            do {
                result.push(this.parsePipe());
            } while (this.optionalCharacter(chars.$COMMA));
        }
        return result;
    }
    parseLiteralMap() {
        let keys = [];
        let values = [];
        const start = this.inputIndex;
        this.expectCharacter(chars.$LBRACE);
        if (!this.optionalCharacter(chars.$RBRACE)) {
            this.rbracesExpected++;
            do {
                var key = this.expectIdentifierOrKeywordOrString();
                keys.push(key);
                this.expectCharacter(chars.$COLON);
                values.push(this.parsePipe());
            } while (this.optionalCharacter(chars.$COMMA));
            this.rbracesExpected--;
            this.expectCharacter(chars.$RBRACE);
        }
        return new LiteralMap(this.span(start), keys, values);
    }
    parseAccessMemberOrMethodCall(receiver, isSafe = false) {
        const start = receiver.span.start;
        const id = this.expectIdentifierOrKeyword();
        if (this.optionalCharacter(chars.$LPAREN)) {
            this.rparensExpected++;
            const args = this.parseCallArguments();
            this.expectCharacter(chars.$RPAREN);
            this.rparensExpected--;
            let span = this.span(start);
            return isSafe ? new SafeMethodCall(span, receiver, id, args) :
                new MethodCall(span, receiver, id, args);
        }
        else {
            if (isSafe) {
                if (this.optionalOperator('=')) {
                    this.error('The \'?.\' operator cannot be used in the assignment');
                    return new EmptyExpr(this.span(start));
                }
                else {
                    return new SafePropertyRead(this.span(start), receiver, id);
                }
            }
            else {
                if (this.optionalOperator('=')) {
                    if (!this.parseAction) {
                        this.error('Bindings cannot contain assignments');
                        return new EmptyExpr(this.span(start));
                    }
                    let value = this.parseConditional();
                    return new PropertyWrite(this.span(start), receiver, id, value);
                }
                else {
                    return new PropertyRead(this.span(start), receiver, id);
                }
            }
        }
    }
    parseCallArguments() {
        if (this.next.isCharacter(chars.$RPAREN))
            return [];
        var positionals = [];
        do {
            positionals.push(this.parsePipe());
        } while (this.optionalCharacter(chars.$COMMA));
        return positionals;
    }
    /**
     * An identifier, a keyword, a string with an optional `-` inbetween.
     */
    expectTemplateBindingKey() {
        let result = '';
        let operatorFound = false;
        do {
            result += this.expectIdentifierOrKeywordOrString();
            operatorFound = this.optionalOperator('-');
            if (operatorFound) {
                result += '-';
            }
        } while (operatorFound);
        return result.toString();
    }
    parseTemplateBindings() {
        let bindings = [];
        let prefix = null;
        let warnings = [];
        while (this.index < this.tokens.length) {
            var keyIsVar = this.peekKeywordLet();
            if (!keyIsVar && this.peekDeprecatedKeywordVar()) {
                keyIsVar = true;
                warnings.push(`"var" inside of expressions is deprecated. Use "let" instead!`);
            }
            if (!keyIsVar && this.peekDeprecatedOperatorHash()) {
                keyIsVar = true;
                warnings.push(`"#" inside of expressions is deprecated. Use "let" instead!`);
            }
            if (keyIsVar) {
                this.advance();
            }
            var key = this.expectTemplateBindingKey();
            if (!keyIsVar) {
                if (prefix == null) {
                    prefix = key;
                }
                else {
                    key = prefix + key[0].toUpperCase() + key.substring(1);
                }
            }
            this.optionalCharacter(chars.$COLON);
            var name = null;
            var expression = null;
            if (keyIsVar) {
                if (this.optionalOperator('=')) {
                    name = this.expectTemplateBindingKey();
                }
                else {
                    name = '\$implicit';
                }
            }
            else if (this.next !== EOF && !this.peekKeywordLet() && !this.peekDeprecatedKeywordVar() &&
                !this.peekDeprecatedOperatorHash()) {
                const start = this.inputIndex;
                var ast = this.parsePipe();
                var source = this.input.substring(start, this.inputIndex);
                expression = new ASTWithSource(ast, source, this.location, this.errors);
            }
            bindings.push(new TemplateBinding(key, keyIsVar, name, expression));
            if (!this.optionalCharacter(chars.$SEMICOLON)) {
                this.optionalCharacter(chars.$COMMA);
            }
        }
        return new TemplateBindingParseResult(bindings, warnings, this.errors);
    }
    error(message, index = null) {
        this.errors.push(new ParserError(message, this.input, this.locationText(index), this.location));
        this.skip();
    }
    locationText(index = null) {
        if (isBlank(index))
            index = this.index;
        return (index < this.tokens.length) ? `at column ${this.tokens[index].index + 1} in` :
            `at the end of the expression`;
    }
    // Error recovery should skip tokens until it encounters a recovery point. skip() treats
    // the end of input and a ';' as unconditionally a recovery point. It also treats ')',
    // '}' and ']' as conditional recovery points if one of calling productions is expecting
    // one of these symbols. This allows skip() to recover from errors such as '(a.) + 1' allowing
    // more of the AST to be retained (it doesn't skip any tokens as the ')' is retained because
    // of the '(' begins an '(' <expr> ')' production). The recovery points of grouping symbols
    // must be conditional as they must be skipped if none of the calling productions are not
    // expecting the closing token else we will never make progress in the case of an
    // extrainious group closing symbol (such as a stray ')'). This is not the case for ';' because
    // parseChain() is always the root production and it expects a ';'.
    // If a production expects one of these token it increments the corresponding nesting count,
    // and then decrements it just prior to checking if the token is in the input.
    skip() {
        let n = this.next;
        while (this.index < this.tokens.length && !n.isCharacter(chars.$SEMICOLON) &&
            (this.rparensExpected <= 0 || !n.isCharacter(chars.$RPAREN)) &&
            (this.rbracesExpected <= 0 || !n.isCharacter(chars.$RBRACE)) &&
            (this.rbracketsExpected <= 0 || !n.isCharacter(chars.$RBRACKET))) {
            if (this.next.isError()) {
                this.errors.push(new ParserError(this.next.toString(), this.input, this.locationText(), this.location));
            }
            this.advance();
            n = this.next;
        }
    }
}
class SimpleExpressionChecker {
    constructor() {
        this.simple = true;
    }
    static check(ast) {
        var s = new SimpleExpressionChecker();
        ast.visit(s);
        return s.simple;
    }
    visitImplicitReceiver(ast, context) { }
    visitInterpolation(ast, context) { this.simple = false; }
    visitLiteralPrimitive(ast, context) { }
    visitPropertyRead(ast, context) { }
    visitPropertyWrite(ast, context) { this.simple = false; }
    visitSafePropertyRead(ast, context) { this.simple = false; }
    visitMethodCall(ast, context) { this.simple = false; }
    visitSafeMethodCall(ast, context) { this.simple = false; }
    visitFunctionCall(ast, context) { this.simple = false; }
    visitLiteralArray(ast, context) { this.visitAll(ast.expressions); }
    visitLiteralMap(ast, context) { this.visitAll(ast.values); }
    visitBinary(ast, context) { this.simple = false; }
    visitPrefixNot(ast, context) { this.simple = false; }
    visitConditional(ast, context) { this.simple = false; }
    visitPipe(ast, context) { this.simple = false; }
    visitKeyedRead(ast, context) { this.simple = false; }
    visitKeyedWrite(ast, context) { this.simple = false; }
    visitAll(asts) { return asts.map(node => node.visit(this)); }
    visitChain(ast, context) { this.simple = false; }
    visitQuote(ast, context) { this.simple = false; }
}
//# sourceMappingURL=parser.js.map