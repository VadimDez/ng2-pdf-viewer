'use strict';

var last    = require('es5-ext/array/#/last')
  , esprima = require('esprima')

  , isArray = Array.isArray, keys = Object.keys
  , walker, eolRe;

eolRe = /(?:\r\n|[\n\r\u2028\u2029])/;

walker = function (ast) {
	var dep, lines;
	if (!ast || (typeof ast !== 'object')) return;
	if (isArray(ast)) {
		ast.forEach(walker, this);
		return;
	}
	keys(ast).forEach(function (key) {
		if (key !== 'range') walker.call(this, ast[key]);
	}, this);
	if (!ast.type) return;
	if ((ast.type === 'CallExpression') &&
			(ast.callee.type === 'MemberExpression') &&
			(ast.callee.object.name === 'foo') &&
			(ast.callee.property.name === 'bar')) {
		dep = { point: this.code.indexOf('(', ast.range[0]) + 2 };
		lines = this.code.slice(ast.range[0], dep.point).split(eolRe);
		dep.line = ast.loc.start.line + lines.length - 1;
		dep.column = (lines.length > 1) ? last.call(lines).length :
				ast.loc.start.column + lines[0].length;
		this.deps.push(dep);
	}
};

module.exports = function (code) {
	var ctx = { code: code, deps: [] };
	walker.call(ctx, esprima.parse(code, { range: true, loc: true }));
	return ctx.deps;
};
