SystemJS Build Tool [![Build Status][travis-image]][travis-url] [![Support](https://supporterhq.com/api/b/33df4abbec4d39260f49015d2457eafe/SystemJS)](https://supporterhq.com/support/33df4abbec4d39260f49015d2457eafe/SystemJS)
===

_[SystemJS Builder 0.15 release notes](https://github.com/systemjs/builder/releases/tag/0.15.0)_

_As of SystemJS Builder 0.14, `builder.build` and `builder.buildTree` are both `builder.bundle`, while `builder.buildSFX` is now `builder.buildStatic`.
The previous APIs will continue to work, but display deprecation warnings._

_Note SystemJS Builder 0.11-0.14 correspond to the SystemJS 0.17+ releases which include the breaking change making module names URLs.
Read the [SystemJS 0.17 release notes](https://github.com/systemjs/systemjs/releases/tag/0.17.0) for more information on this change._

Provides a single-file build for SystemJS of mixed-dependency module trees.

Builds ES6 into ES5, CommonJS, AMD and globals into a single file in a way that supports the CSP SystemJS loader
as well as circular references.

Example
---

app.js
```javascript
import $ from "./jquery.js";
export var hello = 'es6';
```

jquery.js
```javascript
define(function() {
  return 'this is jquery';
});
```

Will build the module `app` into a bundle containing both `app` and `jquery` defined through `System.register` calls.

Circular references and bindings in ES6, CommonJS and AMD all behave exactly as they should, including maintaining execution order.

Usage
---

### Install

```javascript
npm install systemjs-builder
```

### Basic Use

Ensure that the transpiler is installed separately (`npm install babel-core` here).

```javascript
var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('path/to/baseURL', 'path/to/system/config-file.js');

builder
.bundle('local/module.js', 'outfile.js')
.then(function() {
  console.log('Build complete');
})
.catch(function(err) {
  console.log('Build error');
  console.log(err);
});
```

### Setting Configuration

Configuration can be injected via `builder.config`:

```javascript
builder.config({
  map: {
    'a': 'b.js'
  }
});
builder.build('a');
```

To load custom configuration files use `builder.loadConfig`:

```javascript
// `builder.loadConfig` will load config from a file containing `System.config({...})`
builder.loadConfig('./cfg.js')
.then(function() {
  // ready to build
});
```

Multiple config calls can be run, which will combine into the loader configuration.

#### Resetting Configuration

To reset the loader state and configuration use `builder.reset()`.

When config was passed into the `new Builder(baseURL, configFile)` constructor, the config will be reset to this exact `configFile` state.

### Self-Executing (SFX) Bundles

To make a bundle that is independent of the SystemJS loader entirely, we can make SFX bundles:

```javascript
builder.buildStatic('myModule.js', 'outfile.js', options);
```

This bundle file can then be included with a `<script>` tag, and no other dependencies would need to be included in the page.

By default, Traceur or Babel runtime are automatically included in the SFX bundle if needed. To exclude the Babel or Traceur runtime set the `runtime` build option to false:

```javascript
builder.buildStatic('myModule.js', 'outfile.js', { runtime: false });
```

#### SFX Format

SFX bundles can also be output as a custom module format - `amd`, `cjs` or `es6` for consumption in different environments.

This is handled via the `format` (previously `sfxFormat`) option:

```javascript
builder.buildStatic('myModule.js', 'outfile.js', { format: 'cjs' });
```

The first module used as input (`myModule.js` here) will then have its exports output as the CommonJS exports of the whole SFX bundle itself
when run in a CommonJS environment.

#### Adapter Modules

To have globals like `jQuery` not included, and included in a separate script tag, set up an adapter module something like:

jquery.js
```javascript
module.exports = window.jQuery;
```

### Minification & Source Maps

As well as an `options.config` parameter, it is also possible to specify minification and source maps options:

```javascript
builder.bundle('myModule.js', 'outfile.js', { minify: true, sourceMaps: true, config: cfg });
```

Compile time with source maps can also be improved with the `lowResSourceMaps` option, where the mapping granularity is per-line instead of per-character:

```javascript
builder.bundle('myModule.js', 'outfile.js', { sourceMaps: true, lowResSourceMaps: true });
```

#### Minification Options

* `mangle`, defaults to true.
* `globalDefs`, object allowing for global definition assignments for dead code removal.

```javascript
builder.bundle('myModule.js', 'outfile.js', { minify: true, mangle: false, globalDefs: { DEBUG: false } });
```

#### SourceMap Options

* `sourceMaps`, Either boolean value (enable/disable) or string value `'inline'` which will inline the SourceMap data as Base64 data URI right in the generated output file (never use in production). *(Default is `false`)*
* `sourceMapContents`, Boolean value that determines if original sources shall be directly included in the SourceMap. Using inline source contents generates truely self contained SourceMaps which will not need to load the external original source files during debugging. *(Default is `false`; when using `sourceMaps='inline'` it defaults `true`)*


### In-Memory Builds

Leave out the `outFile` option to run an in-memory build:

```javascript
builder.bundle('myModule.js', { minify: true }).then(function(output) {
  output.source;    // generated bundle source
  output.sourceMap; // generated bundle source map
  output.modules;   // array of module names defined in the bundle
});
```

The `output` object above is provided for all builds, including when `outFile` is set.

`output.modules` can be used to directly populate SystemJS bundles configuration.

### Ignore Resources

If loading resources that shouldn't even be traced as part of the build (say an external import), these
can be configured with:

```javascript
builder.config({
  meta: {
    'resource/to/ignore.js': {
      build: false
    }
  }
});
```

### Overriding Fetch

The framework fetch function can be overridden in order to provide the source for a file manually. This is useful if you want to pre-process the source of a file before using the builder.

```javascript
var mySource = 'import * from foo; var foo = "bar";'; // get source as a string
builder.bundle('foo.js', {
  fetch: function (load, fetch) {
    if (load.name.indexOf('foo.js') !== -1) {
      return mySource;
    } else {
      // fall back to the normal fetch method
      return fetch(load);
    }
  }
});
```

The `load` variable describes the file that is trying to be loaded. This is called once for every file that is trying to be fetched, including dependencies.

The `fetch` function should return a string.

### Bundle Arithmetic

Both `builder.build` and `builder.buildStatic` support bundle arithmetic expressions. This allows for the easy construction of custom bundles.

There is also a `builder.trace` for building direct trace tree objects, which can be directly passed into `builder.bundle` or `builder.buildStatic`.

#### Example - Arithmetic Expressions

In this example we build all our application code in `app/` excluding the tree `app/corelibs`:

```javascript
var Builder = require('systemjs-builder');

var builder = new Builder({
  baseURL: '...',
  map: {
  } // etc. config
});

builder.bundle('app/* - app/corelibs.js', 'output-file.js', { minify: true, sourceMaps: true });
```

#### Example - Common Bundles

To build the dependencies in common between two modules, use the `&` operator:

```javascript
builder.bundle('app/page1.js & app/page2.js', 'common.js');
```

We can then exclude this common bundle in future builds:

```javascript
builder.bundle('app/componentA.js - common.js', { minify: true, sourceMaps: true });
```

#### Example - Third-Party Dependency Bundles

Build a bundle of all dependencies of the `app/` package excluding anything from `app/` itself.

For this we can use the `[module]` syntax which represents a single module instead of all its dependencies as well:

```javascript
builder.bundle('app/**/* - [app/**/*]', 'dependencies.js', { minify: true, sourceMaps: true });
```

The above means _take the tree of app and all its dependencies, and subtract just the modules in app_, thus leaving us with just the tree of dependencies of the app package.

#### Example - Multiple Common Bundles

Parentheses are supported, so the following would bundle everything in common with `page1` and `page2`, and also everything in common between `page3` and `page4`:

```javascript
builder.bundle('(app/page1.js & app/page2.js) + (app/page3.js & app/page4.js)', 'common.js');
```

#### Example - Direct Trace API

Instead of using the arithmetic syntax, we can construct the trace ourselves.

In this example we build `app/first` and `app/second` into two separate bundles, while creating a separate shared bundle:

```javascript
var Builder = require('systemjs-builder');

var builder = new Builder({
  // ...
});

Promise.all([builder.trace('app/first.js'), builder.trace('app/second.js')])
.then(function(trees) {
  var commonTree = builder.intersectTrees(trees[0], trees[1]);
  return Promise.all([
    builder.bundle(commonTree, 'shared-bundle.js'),
    builder.bundle(builder.subtractTrees(trees[0], commonTree), 'first-bundle.js'),
    builder.bundle(builder.subtractTrees(trees[1], commonTree), 'second-bundle.js')
  ]);
});
```

License
---

MIT

[travis-url]: https://travis-ci.org/systemjs/builder
[travis-image]: https://travis-ci.org/systemjs/builder.svg?branch=master
