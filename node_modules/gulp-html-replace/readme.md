# gulp-html-replace [![NPM version][npm-image]][npm-url] [![Travis][travis-image]][travis-url] [![AppVeyor][appveyor-image]][appveyor-url] [![Coverage Status][coveralls-image]][coveralls-url]

> Replace build blocks in HTML. Like useref but done right.
 

### Table of Contents

- [Usage](#usage)
- [API](#api)
- [Example](#example)
- [Upgrade](#upgrade)


## Usage
Install:
```shell
npm install --save-dev gulp-html-replace
```

Put some blocks in your HTML file:
```html
<!-- build:<name> -->
Everything here will be replaced
<!-- endbuild -->
```
`name` is the name of the block. Could consist of letters, digits, underscore ( **_** ) and hyphen ( **-** ) symbols.

## API
### htmlreplace(tasks, options)

#### tasks
Type: `Object` `{task-name: replacement}`

* **task-name** - The name of the block in your HTML.
* **replacement** - `String|Array|stream.Readable|Object` The replacement. See examples below.

###### Simple example:
```javascript
// Options is a single string
htmlreplace({js: 'js/main.js'})

// Options is an array of strings
htmlreplace({js: ['js/monster.js', 'js/hero.js']})
```
>If your options strings ends with `.js` or `.css` they will be replaced by correct script/style tags, so you don't need to specify a template like in the example below.

###### Advanced example:
```javascript
// Options is an object
htmlreplace({
  js: {
    src: 'img/avatar.png',
    tpl: '<img src="%s" align="left" />'
  }
})

// Multiple tag replacement
htmlreplace({
  js: {
    src: [['data-main.js', 'require-src.js']],
    tpl: '<script data-main="%s" src="%s"></script>'
  }
})
```
* **src** - `String|Array|stream.Readable` Same thing as in simple example.
* **tpl** - `String` Template string. Uses [util.format()](http://nodejs.org/api/util.html#util_util_format_format) internally.

> In the first example `%s` will be replaced with `img/avatar.png` producing `<img src="img/avatar.png" align="left">` as the result.

> In the second example `data-main="%s"` and `src="%s"` will be replaced with `data-main.js` and `require-src.js` accordingly, producing `<script data-main="data-main.js" src="require-src.js"></script>` as the result

###### Extended replacements:
```javascript
// Replacement based on the file being processed
htmlreplace({
  js: {
    src: null,
    tpl: '<script src="%f".js></script>'
  }
})
// Extended replacement combined with standard replacement
htmlreplace({
  js: {
    src: 'dir',
    tpl: '<script src="%s/%f".js"></script>'
  }
})

```
* **src** - `null|String|Array|stream.Readable` Same as examples above but null if there are no standard replacements in the template.
* **tpl** - `String` Template string. Extended replacements do not use `util.format()` and are performed before standard replacements.

> In the first example `src` is null because there are no standard replacements. `%f` is replaced with the name (without extension) of the file currently being processed. If the file being processed is `xyzzy.html` the result is `<script src="xyzzy.js"></script>`.

> In the second example `src` has been set to the string `'dir'`. Extended replacements are processed first, replacing `%f` with `xyzzy`, then `%s` will be replaced with `dir` resulting in `<script src="dir/xyzzy.js"></script>`.

Valid extended replacements are:

* **%f** - this will be replaced with the filename, without an extension.
* **%e** - this will be replaced with the extension including the `.` character.

###### Stream replacements:
Everywhere a string replacement can be given, a stream of vinyl is also accepted. The content of each file will be treated as UTF-8 text and used for replacement. If the stream produces more than a file the behavior is the same as when an array is given.
```javascript
// Replacement is a stream
htmlreplace({
  cssInline: {
    src: gulp.src('style/main.scss').pipe(sass()),
    tpl: '<style>%s</style>'
  }
})

```

#### options
Type: `object`

All `false` by default.

- {Boolean} **keepUnassigned** - Whether to keep blocks with unused names or remove them.
- {Boolean} **keepBlockTags** - Whether to keep `<!-- build -->` and `<!-- endbuild -->` comments or remove them.
- {Boolean} **resolvePaths** - Try to resolve *relative* paths. For example if your `cwd` is ``/``, your html file is `/page/index.html` and you set replacement as `lib/file.js` the result path in that html will be `../lib/file.js`

###### Options example:
```javascript
htmlreplace({
  js: {
    src: null,
    tpl: '<script src="%f".js></script>'
  }
}, {
  keepUnassigned: false,
  keepBlockTags: false,
  resolvePaths: false
})
```

## Example
index.html:

```html
<!DOCTYPE html>
<html>
    <head>

    <!-- build:css -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <!-- endbuild -->

    </head>
    <body>

    <!-- build:js -->
    <script src="js/player.js"></script>
    <script src="js/monster.js"></script>
    <script src="js/world.js"></script>
    <!-- endbuild -->
```

gulpfile.js:

```javascript
var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');

gulp.task('default', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'styles.min.css',
        'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('build/'));
});
```

Result:

```html
<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="styles.min.css">

    </head>
    <body>

    <script src="js/bundle.min.js"></script>
```

## Upgrade

### From 0.x to 1.x
>This version introduces streaming support, less confusing API, new option *keepUnused* and full code overhaul.
* If you used single task like this: `htmlreplace('js', 'script.js')` just change it to `htmlreplace({js: 'script.js'})`
* If you used single task with template: `htmlreplace('js', 'script.js', '<script="%s">')` change it to `htmlreplace({js: {src: 'script.js', tpl: '<script="%s">'})`
* `files` renamed to `src`, see previous example. Rename if needed.

### From 1.1.x to 1.2.x
>This version switches to the new way of specifying options which is more future-proof. Before it was `htmlreplace(tasks, keepUnassigned = false)`, now it's `htmlreplace(tasks, {keepUnassigned: false})`.
No action required, old syntax will still work, but it is advisable to switch to the new syntax.

[npm-url]: https://npmjs.org/package/gulp-html-replace
[npm-image]: http://img.shields.io/npm/v/gulp-html-replace.svg
[travis-url]: https://travis-ci.org/VFK/gulp-html-replace
[travis-image]: https://travis-ci.org/VFK/gulp-html-replace.svg
[appveyor-url]: https://ci.appveyor.com/project/VFK/gulp-html-replace
[appveyor-image]: https://ci.appveyor.com/api/projects/status/66kwbnis5a1gwp6d?svg=true
[coveralls-url]: https://coveralls.io/github/VFK/gulp-html-replace?branch=master
[coveralls-image]: https://coveralls.io/repos/VFK/gulp-html-replace/badge.svg?branch=master&service=github
