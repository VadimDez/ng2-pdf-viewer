'use strict';

var last    = require('es5-ext/array/#/last')
  , esprima = require('esprima')

  , isArray = Array.isArray, keys = Object.keys
  , walker, eolRe
  , fnName, objName
  , asProperty;

eolRe = /(?:\r\n|[\n\r\u2028\u2029])/;

walker = function (ast) {
	var dep, lines, object;
	if (!ast || (typeof ast !== 'object')) return;
	if (isArray(ast)) {
		ast.forEach(walker, this);
		return;
	}
	keys(ast).forEach(function (key) {
		if (key !== 'range') walker.call(this, ast[key]);
	}, this);
	if (ast.type !== 'CallExpression') return;
	if (objName) {
		if (ast.callee.type !== 'MemberExpression') return false;
		object = ast.callee.object;
		if (object.type === 'MemberExpression') {
			if (!asProperty) return;
			if (object.property.name !== objName) return;
		} else if (object.name !== objName) {
			return;
		}
		if (ast.callee.property.name !== fnName) return;
		if (this.code[ast.range[0]] === '(') return;
		dep = { point: this.code.indexOf('(', ast.range[0]) + 2 };
		dep.raw = this.code.slice(dep.point - 1, ast.range[1] - 1);
		lines = this.code.slice(ast.range[0], dep.point).split(eolRe);
		dep.line = ast.loc.start.line + lines.length - 1;
		dep.column = (lines.length > 1)
			? last.call(lines).length : ast.loc.start.column + lines[0].length;
		this.deps.push(dep);
	} else {
		if ((ast.type === 'CallExpression') && (ast.callee.type === 'Identifier') &&
				(ast.callee.name === fnName) && (this.code[ast.range[0]] !== '(')) {
			dep = { point: this.code.indexOf('(', ast.range[0]) + 2 };
			dep.raw = this.code.slice(dep.point - 1, ast.range[1] - 1);
			lines = this.code.slice(ast.range[0], dep.point).split(eolRe);
			dep.line = ast.loc.start.line + lines.length - 1;
			dep.column = (lines.length > 1)
				? last.call(lines).length : ast.loc.start.column + lines[0].length;
			this.deps.push(dep);
		}
	}
};

module.exports = function (code, name, method, options) {
	var ctx = { code: code, deps: [] };
	options = Object(options);
	if (method) {
		fnName = method;
		objName = name;
	} else {
		fnName = name;
	}
	asProperty = options.asProperty;
	walker.call(ctx, esprima.parse(code, { range: true, loc: true }));
	return ctx.deps;
};
