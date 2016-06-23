"use strict";
var SourceRange = function() {
  function SourceRange(start, end) {
    this.start = start;
    this.end = end;
  }
  return ($traceurRuntime.createClass)(SourceRange, {toString: function() {
      var str = this.start.source.contents;
      return str.slice(this.start.offset, this.end.offset);
    }}, {});
}();
Object.defineProperties(module.exports, {
  SourceRange: {get: function() {
      return SourceRange;
    }},
  __esModule: {value: true}
});
