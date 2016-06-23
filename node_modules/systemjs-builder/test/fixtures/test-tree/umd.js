(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['require', 'exports', 'cjs.js'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.wAnalytics = factory();
  }
}(this, function(require, exports) {
  require('cjs.js');
  exports.umd = 'detection';
}));