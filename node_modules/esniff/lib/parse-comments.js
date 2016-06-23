'use strict';

var from         = require('es5-ext/array/from')
  , primitiveSet = require('es5-ext/object/primitive-set')
  , eolSet       = require('./ws-eol')
  , wsSet        = require('./ws')

  , hasOwnProperty = Object.prototype.hasOwnProperty
  , preRegExpSet = primitiveSet.apply(null, from(';{=([,<>+-*/%&|^!~?:}'))

  , $ws, $common, $string, $comment, $multiComment, $regExp

  , userCode, comments, previousChar, i, char, quote;

$common = function () {
	if ((char === '\'') || (char === '"')) {
		quote = char;
		char = userCode[++i];
		return $string;
	}
	if (char === '/') {
		if (hasOwnProperty.call(preRegExpSet, previousChar)) {
			char = userCode[++i];
			return $regExp;
		}
	}
	char = userCode[++i];
	return $ws;
};

$comment = function () {
	while (true) {
		if (!char) return;
		if (hasOwnProperty.call(eolSet, char)) return;
		char = userCode[++i];
	}
};

$multiComment = function () {
	while (true) {
		if (!char) return;
		if (char === '*') {
			char = userCode[++i];
			if (!char) return;
			if (char === '/') return;
		}
		char = userCode[++i];
	}
};

$ws = function () {
	var next, commentRange;
	while (true) {
		if (!char) return;
		if (char === '/') {
			next = userCode[i + 1];
			if (next === '/') {
				commentRange = [i];
				char = userCode[i += 2];
				comments.push(commentRange);
				$comment();
				commentRange[1] = i;
			} else if (next === '*') {
				commentRange = [i];
				char = userCode[i += 2];
				comments.push(commentRange);
				$multiComment();
				commentRange[1] = i + 1;
			} else {
				break;
			}
		} else if (!hasOwnProperty.call(wsSet, char)) {
			break;
		}
		char = userCode[++i];
	}
	return $common;
};

$string = function () {
	while (true) {
		if (!char) return;
		if (char === quote) {
			char = userCode[++i];
			previousChar = quote;
			return $ws;
		}
		if (char === '\\') ++i;
		char = userCode[++i];
	}
};

$regExp = function () {
	while (true) {
		if (!char) return;
		if (char === '/') {
			previousChar = '/';
			char = userCode[++i];
			return $ws;
		}
		if (char === '\\') ++i;
		char = userCode[++i];
	}
};

module.exports = exports = function (code) {
	var state;

	userCode = code;
	comments = [];
	i = 0;
	char = userCode[i];
	state = $ws;
	while (state) state = state();
	return comments;
};
