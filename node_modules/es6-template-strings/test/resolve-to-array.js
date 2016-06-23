'use strict';

var compile = require('../compile');

module.exports = function (t, a) {
	var compiled, obj, context, x = {};
	compiled = compile('${x.raz} \\${$\\{ f${prik()}oo ${maroko}\n\\$mis\\1k' +
		'\\2o${markas()}${x.moled}ech${}eloo${x.su}elo${marko');

	context = {
		maroko: 'morek',
		prik: function () { return obj.prik2; },
		markas: function () { return obj.foo; }
	};

	obj = { raz: 'raz1', prik2: 23, foo: 'morda', moled: 'eho', su: x };
	context.x = obj;
	a.deep(t(compiled, context), ['', 'raz1', ' ${$\\{ f', 23, 'oo ', 'morek',
		'\n$mis\\1k\\2o', 'morda', '', 'eho', 'ech', undefined, 'eloo', x, 'elo${marko']);
};
