# es6-template-strings
## Compile and resolve template strings notation as specified in ES6

### Usage

```javascript

var template = require('es6-template-strings');

// Hello WORLD!
console.log(template('Hello ${place.toUpperCase()}!', { place: "World" }));

// You can reuse same templates:
var compile = require('es6-template-strings/compile')
  , resolveToString = require('es6-template-strings/resolve-to-string')

  , compiled = compile('Welcome to ${siteName}, you are visitor number ${visitorNumber}!');

// Welcome to MySite, you are visitor number 137!
console.log(resolveToString(compiled, { siteName: "MySite", visitorNumber: 137 }));

// Welcome to OtherSite, you are visitor number 777!
console.log(resolveToString(compiled, { siteName: "OtherSite", visitorNumber: 777 }));

// You may prepare custom tag functions
var resolve = require('es6-template-strings/resolve');

var customTag = function (literals/*, …substitutions*/) {
	// Process input and return result string
};

// Output template processed by customTag:
customTag.apply(null, resolve(compiled, {/* context */}));
```

### Installation
#### NPM

In your project path:

	$ npm install es6-template-strings

##### Browser

You can easily bundle _es6-template-strings_ for browser with [modules-webmake](https://github.com/medikoo/modules-webmake)

## Tests [![Build Status](https://travis-ci.org/medikoo/es6-template-strings.png)](https://travis-ci.org/medikoo/es6-template-strings)

	$ npm test
