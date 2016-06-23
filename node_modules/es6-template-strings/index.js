'use strict';

var compile = require('./compile')
  , resolve = require('./resolve-to-string');

module.exports = function (template, context/*, options*/) {
	return resolve(compile(template), context, arguments[2]);
};
