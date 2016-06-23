'use strict';

var readFile = require('fs').readFile
  , ast      = require('./_ast-accessed-properties')

  , pg = __dirname + '/__playground';

module.exports = function (t, a, d) {
	readFile(pg + '/accessed-properties.js', 'utf-8', function (err, str) {
		var plainR, astR;
		if (err) {
			d(err);
			return;
		}
		plainR = t('foo')(str);
		astR = ast(str);
		a(plainR.length, astR.length, "Length");
		astR.forEach(function (val, i) { a.deep(plainR[i], val, i); });
		d();
	});
};
