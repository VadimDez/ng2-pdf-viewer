"use strict";
var $___46__46__47_util_47_SourcePosition_46_js__,
    $___46__46__47_util_47_SourceRange_46_js__,
    $__Scanner_46_js__;
var SourcePosition = ($___46__46__47_util_47_SourcePosition_46_js__ = require("../util/SourcePosition.js"), $___46__46__47_util_47_SourcePosition_46_js__ && $___46__46__47_util_47_SourcePosition_46_js__.__esModule && $___46__46__47_util_47_SourcePosition_46_js__ || {default: $___46__46__47_util_47_SourcePosition_46_js__}).SourcePosition;
var SourceRange = ($___46__46__47_util_47_SourceRange_46_js__ = require("../util/SourceRange.js"), $___46__46__47_util_47_SourceRange_46_js__ && $___46__46__47_util_47_SourceRange_46_js__.__esModule && $___46__46__47_util_47_SourceRange_46_js__ || {default: $___46__46__47_util_47_SourceRange_46_js__}).SourceRange;
var isLineTerminator = ($__Scanner_46_js__ = require("./Scanner.js"), $__Scanner_46_js__ && $__Scanner_46_js__.__esModule && $__Scanner_46_js__ || {default: $__Scanner_46_js__}).isLineTerminator;
var MAX_INT_REPRESENTATION = 9007199254740992;
function computeLineStartOffsets(source) {
  var lineStartOffsets = [0];
  var k = 1;
  for (var index = 0; index < source.length; index++) {
    var code = source.charCodeAt(index);
    if (isLineTerminator(code)) {
      if (code === 13 && source.charCodeAt(index + 1) === 10) {
        index++;
      }
      lineStartOffsets[k++] = index + 1;
    }
  }
  lineStartOffsets[k++] = MAX_INT_REPRESENTATION;
  return lineStartOffsets;
}
var LineNumberTable = function() {
  function LineNumberTable(sourceFile) {
    this.sourceFile_ = sourceFile;
    this.lineStartOffsets_ = null;
    this.lastLine_ = 0;
    this.lastOffset_ = -1;
  }
  return ($traceurRuntime.createClass)(LineNumberTable, {
    ensureLineStartOffsets_: function() {
      if (!this.lineStartOffsets_) {
        this.lineStartOffsets_ = computeLineStartOffsets(this.sourceFile_.contents);
      }
    },
    getSourcePosition: function(offset) {
      return new SourcePosition(this.sourceFile_, offset);
    },
    getLine: function(offset) {
      if (offset === this.lastOffset_)
        return this.lastLine_;
      this.ensureLineStartOffsets_();
      if (offset < 0)
        return 0;
      var line;
      if (offset < this.lastOffset_) {
        for (var i = this.lastLine_; i >= 0; i--) {
          if (this.lineStartOffsets_[i] <= offset) {
            line = i;
            break;
          }
        }
      } else {
        for (var i$__6 = this.lastLine_; true; i$__6++) {
          if (this.lineStartOffsets_[i$__6] > offset) {
            line = i$__6 - 1;
            break;
          }
        }
      }
      this.lastLine_ = line;
      this.lastOffset_ = offset;
      return line;
    },
    offsetOfLine: function(line) {
      this.ensureLineStartOffsets_();
      return this.lineStartOffsets_[line];
    },
    getColumn: function(offset) {
      var line = this.getLine(offset);
      return offset - this.lineStartOffsets_[line];
    },
    getSourceRange: function(startOffset, endOffset) {
      return new SourceRange(this.getSourcePosition(startOffset), this.getSourcePosition(endOffset));
    }
  }, {});
}();
Object.defineProperties(module.exports, {
  LineNumberTable: {get: function() {
      return LineNumberTable;
    }},
  __esModule: {value: true}
});
