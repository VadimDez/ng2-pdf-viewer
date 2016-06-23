var Builder = require('../index');
var fs = require('fs');

suite('Test builder.loadConfig', function() {
    
  test('builder.loadConfig works', function(done) {
    
    var configFile = 'test/output/builderConfig.js';
    var builder = new Builder();
    fs.writeFileSync(configFile, 'System.config({map: {m: "./m.js"}});');
    builder.loadConfig(configFile).then(function() {
      
      assert.equal(builder.loader.map['m'], './m.js', 'loader map was loaded from config');
      
    }).then(done, done);
    
  });
  
  test('builder.loadConfig does not affect other builders', function(done) {
  
    var configFile1 = 'test/output/builder1Config.js';
    var configFile2 = 'test/output/builder2Config.js';
    fs.writeFileSync(configFile1, 'System.config({baseURL: "base1", map: {m1: "./m1.js"}, packages: {p1: {main: "index1.js"}}});');
    fs.writeFileSync(configFile2, 'System.config({baseURL: "base2", map: {m2: "./m2.js"}, packages: {p2: {main: "index2.js"}}});');
    
    var builder1 = new Builder();
    var builder2 = new Builder();
    
    var p1 = builder1.loadConfig(configFile1);
    var p2 = builder2.loadConfig(configFile2);
    
    
    Promise.all([p1, p2]).then(function() {

      assert.match(builder1.loader.baseURL, /base1\/$/, 'builder1 baseURL');
      assert.match(builder2.loader.baseURL, /base2\/$/, 'builder2 baseURL');
      
      assert.equal(builder1.loader.map['m1'], './m1.js', 'builder1.loader map was loaded from config');
      assert.equal(builder1.loader.map['m2'], undefined, 'map for builder1.loader only');
      assert.equal(builder2.loader.map['m2'], './m2.js', 'builder2.loader map was loaded from config');
      assert.equal(builder2.loader.map['m1'], undefined, 'map for builder2.loader only');

      builder1.loader.normalize('p1').then(function(p1) {
        assert.match(p1, /base1\/p1\/index1\.js$/, 'builder1 package p1');
        
        assert.equal(builder1.loader.packages['p2'], undefined, 'builder1 package p2');
        assert.equal(builder2.loader.packages['p1'], undefined, 'builder2 package p1');
        builder2.loader.normalize('p2').then(function(p2) {
          assert.match(p2, /base2\/p2\/index2\.js$/, 'builder2 package p2');
        }).then(done, done);
      });
    });
  });

  test('builder.loadConfig does not affect global variables', function(done) {

    global._tmp_1 = '1';

    var configFile = 'test/output/builderConfig.js';
    var builder = new Builder();
    fs.writeFileSync(configFile, '_tmp_1=2; _tmp_2=3; global._tmp_1=4;');
    builder.loadConfig(configFile).then(function() {

      assert.equal(global._tmp_1, '1', 'previously defined global variable is not affected');
      assert.equal(global._tmp_2, undefined, 'new global variables are not defined');

      delete global._tmp_1;

    }).then(done, done);

  });
  
  test('builder.loadConfig makes require available to config code',  function(done) {
    var configFile = 'test/output/builderConfig.js';
    var builder = new Builder();
    fs.writeFileSync(configFile, 'var m = require("module"); System.config({baseURL:"base"});');
    builder.loadConfig(configFile).then(function() {

      assert.match(builder.loader.baseURL, /base\/$/, 'builder baseURL set');

    }).then(done, done);

  });

});
