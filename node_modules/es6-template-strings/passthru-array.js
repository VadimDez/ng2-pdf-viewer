'use strict';

module.exports = function (literals/*, …substitutions*/) {
	var result = [], i, l = literals.length;
	if (!l) return result;
	result.push(literals[0]);
	for (i = 1; i < l; ++i) result.push(arguments[i], literals[i]);
	return result;
};
