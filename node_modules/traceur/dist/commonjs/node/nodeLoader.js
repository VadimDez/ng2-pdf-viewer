"use strict";
var fs = require('fs');
function stripShebang(data) {
  if (/^#!/.test(data))
    data = '//' + data;
  return data;
}
var nodeLoader = {load: function(url, callback, errback) {
    fs.readFile(url, 'utf8', function(err, data) {
      if (err) {
        err.message = err.message.replace('ENOENT, open', 'File not found');
        errback(err);
      } else {
        callback(stripShebang(data));
      }
    });
    return function() {
      callback = function() {};
    };
  }};
module.exports = nodeLoader;
