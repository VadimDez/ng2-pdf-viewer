define(['./first.js', './second.js', 'require', 'module'], function(first, second, require, module) {

  module.exports = {
    first: first,
    second: require('./second.js'),
    utfChar: '\u221e'
  };

  if (DEBUG) {
    console.log('debug mode');
  }

});