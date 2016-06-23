'use strict';

var resolve  = require('./resolve')
  , passthru = require('./passthru-array');

module.exports = function (data, context/*, options*/) {
	return passthru.apply(null, resolve(data, context, arguments[2]));
};
