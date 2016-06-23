console.log(__filename);

(function(require) {
  if (typeof require != 'undefined' && eval('typeof require') == 'undefined')
    exports.cjs = true;

  if (false)
    require('some' + 'expression');
})(require);

exports.env = process.env.NODE_ENV;