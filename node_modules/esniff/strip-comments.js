'use strict';

var value        = require('es5-ext/object/valid-value')
  , repeat       = require('es5-ext/string/#/repeat')
  , parse        = require('./lib/parse-comments');

module.exports = exports = function (code/*, options*/) {
	var options = Object(arguments[1]), result, comments, i;

	code = String(value(code));
	comments = parse(code);

	if (!comments.length) return code;
	i = 0;
	result = '';
	comments.forEach(function (range) {
		result += code.slice(i, range[0]);
		if (options.preserveLocation) result += repeat.call(' ', range[1] - range[0]);
		i = range[1];
	});
	result += code.slice(i);
	return result;
};
