'use strict';

module.exports = function (t, a) {
	a(t.a, undefined, "Mismatch");
	a(t['\n'], true);
};
