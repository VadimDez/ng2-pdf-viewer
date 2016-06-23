'use strict';

var from         = require('es5-ext/array/from')
  , value        = require('es5-ext/object/valid-value')
  , primitiveSet = require('es5-ext/object/primitive-set')
  , esniff       = require('./')

  , allowedSeparators = primitiveSet.apply(null, from('.+-*/,&|;'))
  , next = esniff.next;

module.exports = function (code, sep/*, limit*/) {
	var expressions, fromIndex, limit = arguments[2] || Infinity;
	code = String(value(code));
	sep = String(value(sep));
	if (!allowedSeparators[sep]) throw new Error(sep + ' is not supported separator');
	expressions = [];
	fromIndex = 0;
	esniff(code, sep, function (i, previous, nest) {
		if (nest) return next();
		if (expressions.push(code.slice(fromIndex, i)) === limit) return;
		fromIndex = i + 1;
		return next();
	});
	if (expressions.length < limit) expressions.push(code.slice(fromIndex));
	return expressions;
};
