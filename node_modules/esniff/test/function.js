'use strict';

var readFile = require('fs').readFile
  , ast      = require('./_ast-function')

  , pg = __dirname + '/__playground';

module.exports = function (t) {
	return {
		Normal: function (a, d) {
			readFile(pg + '/function.js', 'utf-8', function (err, str) {
				var plainR, astR;
				if (err) {
					d(err);
					return;
				}
				plainR = t('require')(str);
				astR = ast(str, 'require');
				a(plainR.length, astR.length, "Length");
				astR.forEach(function (val, i) { a.deep(plainR[i], val, i); });
				d();
			});
		},
		"One character name": function (a, d) {
			readFile(pg + '/function-one-char.js', 'utf-8', function (err, str) {
				var plainR, astR;
				if (err) {
					d(err);
					return;
				}
				plainR = t('_')(str);
				astR = ast(str, '_');
				a(plainR.length, astR.length, "Length");
				astR.forEach(function (val, i) { a.deep(plainR[i], val, i); });
				d();
			});
		},
		Method: function (a, d) {
			readFile(pg + '/method.js', 'utf-8', function (err, str) {
				var plainR, astR;
				if (err) {
					d(err);
					return;
				}
				plainR = t('i18n.bind')(str);
				astR = ast(str, 'i18n', 'bind');
				a(plainR.length, astR.length, "Length");
				astR.forEach(function (val, i) { a.deep(plainR[i], val, i); });
				d();
			});
		},
		"Method as property": function (a, d) {
			readFile(pg + '/method.js', 'utf-8', function (err, str) {
				var plainR, astR;
				if (err) {
					d(err);
					return;
				}
				plainR = t('i18n.bind', { asProperty: true })(str);
				astR = ast(str, 'i18n', 'bind', { asProperty: true });
				a(plainR.length, astR.length, "Length");
				astR.forEach(function (val, i) { a.deep(plainR[i], val, i); });
				d();
			});
		}
	};
};
