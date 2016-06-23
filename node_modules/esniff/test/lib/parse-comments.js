'use strict';

module.exports = function (t, a) {
	var code = '/* raz */ var foo = 4; // fefe\nmasfdf()/* fefe */ fefe()/* bak */', result = t(code);
	a.deep(result.map(function (range) { return code.slice(range[0], range[1]); }), [
		'/* raz */', '// fefe', '/* fefe */', '/* bak */'
	]);
};
