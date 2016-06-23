var source = require('vinyl-source-stream')
var buffer = require('./')
var test = require('tape')
var fs = require('fs')

test('converted', function(t) {
  t.plan(2)
  fs.createReadStream(__filename)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .once('data', function(file) {
      t.ok(!file.isStream(), 'is not a stream')
      t.ok( file.isBuffer(), 'is a buffer')
    })
})

test('not converted', function(t) {
  t.plan(2)
  fs.createReadStream(__filename)
    .pipe(source('bundle.js'))
    .once('data', function(file) {
      t.ok( file.isStream(), 'is a stream')
      t.ok(!file.isBuffer(), 'is not a buffer')
    })
})

