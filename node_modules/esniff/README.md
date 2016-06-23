# esniff
## Low footprint JavaScript source code parser

Low footprint, fast source code parser, which allows you to find all code fragment occurrences with respect to all syntax rules that cannot be handled with plain regular expression search.

It aims at use cases where we need to quickly find usage of given function, property etc. in syntactically valid code.

### Installation
#### npm

	$ npm install esniff

To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

### Usage

Using main module you can configure sophisticated parser on your own. However, first, __see preprared [API utilities](#API) that may already address use cases you have__.

#### esniff(code, triggerChar, callback)

* `code` Code to parse
* `triggerChar` Character which is expected to trigger custom handling via `callback`
* `callback` To detect and eventually handle case we're after

Example: Find all `require(..)` calls:

```javascript
var esniff = require('esniff');

var result = esniff('var x = require(\'foo/bar\')', 'r', function (index, previous, nest) {
  if (previous === '.') return next(); // Ignore x.require calls
  if (code.indexOf('require', index) !== index) return esniff.next(); // Not really `require` call
  next('require'.length); // Move after `require` and skip any following whitespace
  index = esniff.index; // Update index
  if (code[i] !== '(') return resume(); // Not `require(`
  return collectNest(); // Collect all code between parenthesis
});

console.log(result);  [{ point: 17, column: 17, line: 1, raw: '\'foo/bar\'' }]
```

#### API

#### accessedProperties(objName) _(esniff/accessed-properties)_

Returns function which allows us to find all accessed property names on given object name

```javascript
var findProperties = require('esniff/accessed-properties');
var findContextProperties = findProperties('this');

var result = findContextProperties('var foo = "0"; this.bar = foo; this.someMethod(); otherFunction()');
console.log(result); // [ { name: 'bar', start: 20, end: 23 }, { name: 'someMethod', start: 36, end: 46 } ]
```

#### function(name[, options]) _(esniff/function)_

Returns function which allows us to find all occurrences of given function (or method) being invoked

Through options we can restrict cases which we're after:

* `asProperty` (default: `false`), on true will allow `x.name()` when we search for `name` calls
* `asPlain` (default: `true`), on true it allows plain calls e.g. `name()` when we search for `name`. Should be set to `false` if we're strictly about method calls.

Setting both `asProperty` and `asPlain` to false, will always produce empty result

```javascript
var findRequires = require('esniff/function')('require');

findRequires('var x = require(\'foo/bar\')');
// [{ point: 17, column: 17, line: 1, raw: '\'foo/bar\'' }]
```

#### resolveArguments(code[, limit]) _(esniff/resolve-arguments)_

Resolves expressions separated with commas, with additional `limit` you can specify after which number of arguments resolver should stop

```javascript
var resolveArgs = require('esniff/resolve-arguments');

var result = resolveArgs('"raz", "dwa", [\'raz\', \'dwa\'], "trzy"', 3));

console.log(result); // ['"raz"', ' "dwa"', ' [\'raz\', \'dwa\']']
```

### Limitations

* _esniff_ assumes code that you pass is syntactically correct, it won't inform you about any syntax errors and may produce unexpected and nonsense results when such code is used.
* There's single case of syntactically correct code, which will make _esniff_ produce incorrect results, it's division made directly on object literal (e.g. `x = { foo: 'bar' } / 14`, esniff in that case will assume that `/` starts regular expression). Still there's not known use case where such code may make any sense, and many popular JS source code parsers share very same vulnerability.
* _esniff_ may work with new syntax introduced by ECMAScript 6 but it has not been fully revised in that matter yet. Pull requests are welcome.

## Tests [![Build Status](https://travis-ci.org/medikoo/esniff.svg)](https://travis-ci.org/medikoo/esniff)

	$ npm test
