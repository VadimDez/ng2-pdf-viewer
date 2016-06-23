'use strict';

var readFile = require('fs').readFile
  , ast      = require('./_ast-index')

  , pg = __dirname + '/__playground';

module.exports = function (t, a, d) {
	readFile(pg + '/index.js', 'utf-8', function (err, str) {
		var plainR = [], astR;
		if (err) {
			d(err);
			return;
		}
		t(str, 'f', function (i, previous) {
			if (previous === '.') return t.next();
			if (str.indexOf('foo', i) !== i) return t.next();
			t.next(3);
			i = t.index;
			if (str[i] !== '.') return t.resume();
			t.next();
			i = t.index;
			if (str.indexOf('bar', i) !== i) return t.resume();
			t.next(3);
			i = t.index;
			if (str[i] !== '(') return t.resume();
			plainR.push({ point: i + 2, line: t.line, column: i + 2 - t.columnIndex });
			return t.resume();
		});
		astR = ast(str);
		a(plainR.length, astR.length, "Length");
		astR.forEach(function (val, i) { a.deep(plainR[i], val, i); });
		d();
	});
};
