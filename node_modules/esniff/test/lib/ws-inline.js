'use strict';

module.exports = function (t, a) {
	a(t['\n'], undefined, "Mismatch");
	a(t[' '], true);
};
