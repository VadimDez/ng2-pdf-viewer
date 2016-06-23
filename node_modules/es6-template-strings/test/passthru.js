'use strict';

var compile = require('../compile')
  , resolve = require('../resolve');

module.exports = function (t, a) {
	var compiled, obj, context;
	compiled = compile('${x.raz} \\${$\\{ f${prik()}oo ${maroko}\n\\$mis\\1k' +
		'\\2o${markas()}${x.moled}ech${}eloo${x.su}elo${marko');

	context = {
		maroko: 'morek',
		prik: function () { return obj.prik2; },
		markas: function () { return obj.foo; }
	};

	obj = { raz: 'raz1', prik2: 23, foo: 'morda', moled: 'eho', su: 'vivi' };
	context.x = obj;
	a(t.apply(null, resolve(compiled, context)),
		'raz1 ${$\\{ f23oo morek\n$mis\\1k\\2omordaehoecheloovivielo${marko');
};
