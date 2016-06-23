'use strict';

var value = require('es5-ext/object/valid-value');

module.exports = function (str) {
	var quote, i, char;
	str = String(value(str));
	quote = str[0];
	if ((quote !== '\'') && (quote !== '"')) return false;
	i = 0;
	char = str[++i];
	while (char) {
		if (char === quote) break;
		if (char === '\\') ++i;
		char = str[++i];
	}
	return Boolean(char && !str[i + 1]);
};
