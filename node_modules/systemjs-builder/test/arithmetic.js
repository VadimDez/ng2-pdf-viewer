var Builder = require('../index');
var builder = new Builder();

builder.loadConfigSync('./test/fixtures/test-tree.config.js');

builder.config({ transpiler: 'babel' });

suite('Bundle Expressions', function() {
  test('Addition', function(done) {
    builder.trace('amd.js + amd-2.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), 
          ['amd-2.js', 'amd.js', 'global.js', 'jquery.js', 'some.js!plugin.js', 'text.txt!text-plugin.js']);
    })
    .then(done, done);
  });

  test('Single module subtraction', function(done) {
    builder.trace('amd.js + amd-2.js - [amd-1.js]')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), 
          ['amd-2.js', 'amd.js', 'global.js', 'jquery.js', 'some.js!plugin.js', 'text.txt!text-plugin.js']);
    })
    .then(done, done);
  });

  test('Commonality operator', function(done) {
    builder.trace('amd-5b.js & second.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs.js', 'second.js', 'third.js']);
    })
    .then(done, done);
  });

  test('Wildcard bundling', function(done) {
    builder.trace('*.js - [amd-*] - [sfx-format-*]')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), [
          'Buffer.js', 'amd.js', 'babel', 'babel.js', 'cjs space.js', 'cjs-1.js', 'cjs-2.js', 'cjs-3.js', 'cjs-4.js', 'cjs-5.js', 'cjs-globals.js', 'cjs-in-12.js', 'cjs-in-13.js',
          'cjs-resolve.js', 'cjs.js', 'component.jsx!jsx.js', 'example.js', 'file.json', 'first.js',
          'global-inner.js', 'global-outer.js', 'global.js', 'jquery-cdn', 'jquery.js', 'json-plugin.js', 'jsx.js', 'plugin.js', 'register.js', 'runtime.js', 
          'second.js', 'some.js!plugin.js', 'text-plugin.js', 'text.txt!text-plugin.js', 'third.js', 'umd.js']);
    })
    .then(done, done);
  });

  test('Wildcard plugin', function(done) {
    builder.trace('*.jsx!jsx.js - [component.jsx!jsx.js]')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), []);
    })
    .then(done, done);
  });

  test('cjs bundles added', function(done){
    builder.trace('cjs-1.js + cjs-2.js + cjs-3.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), [
          'cjs-1.js', 'cjs-2.js', 'cjs-3.js', 'cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with parens and extra spaces', function(done){
    builder.trace('  (   cjs-1.js    &     cjs-2.js          )       + ( cjs-1.js & cjs-3.js)')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with single-value parameters', function(done){
    builder.trace('(cjs-1.js) + (cjs-2.js) + (cjs-3.js)')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), [
        'cjs-1.js', 'cjs-2.js', 'cjs-3.js', 'cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with parens', function(done){
    builder.trace('(cjs-1.js & cjs-2.js) + (cjs-1.js & cjs-3.js)')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with parens 2', function(done){
    builder.trace('(cjs-1.js & cjs-2.js)')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with parens 3', function(done){
    builder.trace('(cjs-1.js & cjs-2.js) + cjs-in-13.js - cjs-in-13.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with parens 4', function(done){
    builder.trace('(cjs-1.js & cjs-2.js) + cjs-in-13.js - cjs-in-13.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with parens 5', function(done){
    builder.trace('cjs-in-13.js + (cjs-1.js & cjs-2.js) - cjs-in-13.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with multiple parens', function(done){
    builder.trace('cjs-in-13.js + (cjs-1.js & cjs-2.js) - (cjs-in-13.js)')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with multiple parens 2', function(done){
    builder.trace('(cjs-1.js & cjs-2.js) + (cjs-1.js & cjs-3.js) - cjs-in-12.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles with nested parens', function(done){
    builder.trace('(cjs-1.js + cjs-2.js - ([cjs-1.js] + [cjs-2.js])) - (cjs-in-12.js)')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles with nested parens 2', function(done){
    builder.trace('(cjs-1.js + cjs-2.js - ([cjs-1.js] + [cjs-2.js])) - (cjs-in-12.js) + (cjs-4.js + cjs-5.js)')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-4.js', 'cjs-5.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles with nested parens 3', function(done){
    builder.trace('((cjs-1.js + cjs-2.js - ([cjs-1.js] + [cjs-2.js])) - (cjs-in-12.js) + (cjs-4.js + cjs-5.js)) - ([cjs-4.js] + [cjs-5.js])')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles with nested parens 4', function(done){
    builder.trace('((cjs-1.js + cjs-2.js - ([cjs-1.js] + [cjs-2.js] + ([cjs-4.js] + [cjs-5.js]))) - (cjs-4.js + cjs-5.js))')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });


  test('ibid with single module subtracted', function(done){
    builder.trace('(cjs-1.js + cjs-2.js - ([cjs-1.js] + [cjs-2.js])) - ([cjs-in-12.js])')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles added with nested parens', function(done){
    builder.trace('(cjs-1.js + cjs-2.js - (cjs-1.js & cjs-2.js))')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-1.js', 'cjs-2.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('cjs bundles with parens and single modules', function(done){
    builder.trace('(cjs-1.js + cjs-2.js) - ([cjs-1.js] + [cjs-2.js])')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), ['cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('file with space', function(done){
    builder.trace('cjs-1.js + cjs space.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), [
        'cjs space.js', 'cjs-1.js', 'cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('file with space 2', function(done){
    builder.trace('cjs-1.js + cjs space.js   ')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), [
        'cjs space.js', 'cjs-1.js', 'cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('file with space 3', function(done){
    builder.trace('cjs-1.js + cjs space.js   + cjs-2.js')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), [
        'cjs space.js', 'cjs-1.js', 'cjs-2.js', 'cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

  test('file with space 4', function(done){
    builder.trace('cjs-1.js + cjs space.js   + cjs-2.js   ')
    .then(function(tree) {
      assert.deepEqual(Object.keys(tree).sort(), [
        'cjs space.js', 'cjs-1.js', 'cjs-2.js', 'cjs-in-12.js', 'cjs-in-13.js']);
    })
    .then(done, done);
  });

});

suite('Bundle Expression Validation', function() {
  test('missing identifier 1', function(){
    return validateInvalidExpression('cjs-1.js + +');
  });

  test('missing identifier 2', function(){
    return validateInvalidExpression('cjs-1.js + -');
  });

  test('missing identifier 3', function(){
    return validateInvalidExpression('cjs-1.js + &');
  });

  test('unclosed parens 1', function(){
    return validateInvalidExpression('(cjs-1.js + cjs-2.js');
  });

  test('unclosed parens 2', function(){
    return validateInvalidExpression('(cjs-1.js + (cjs-2.js + cjs-3.js');
  });

  test('unclosed parens 3', function(){
    return validateInvalidExpression('(cjs-1.js + (cjs-2.js + cjs-3.js)');
  });

  test('unclosed parens 4', function(){
    return validateInvalidExpression('(cjs-2.js + cjs-3.js) + (cjs-1.js + (cjs-2.js + cjs-3.js)');
  });

  function validateInvalidExpression(expression){
    return Promise
           .resolve()
           .then(function(){ return builder.trace(expression) })
           .then(
             function(){ return Promise.reject('Invalid expression <' + expression + '> was parsed without error'); }, //it worked but shouldn't have
             function(err){
               //uncomment this line to view the Syntax Errors' wordings in the test console
               //console.log(err);
               if (typeof err !== 'string' || !/^Syntax Error/i.test(err)){
                 return Promise.reject('Syntax error was expected, but not generated')
               } else {
                 return Promise.resolve(1);
               }
             }
           )
  }

});


