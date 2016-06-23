'use strict';

module.exports = function (t, a) {
	var code = '/* raz */ var foo = 4; // fefe\nmasfdf()/* fefe */ fefe()/* bak */';
	a.deep(t(code), ' var foo = 4; \nmasfdf() fefe()');
	a.deep(t(code, { preserveLocation: true }),
		'          var foo = 4;        \nmasfdf()           fefe()         ', "Preserve location");
};
