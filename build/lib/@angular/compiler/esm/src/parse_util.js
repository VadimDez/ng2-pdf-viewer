import { isPresent } from './facade/lang';
export class ParseLocation {
    constructor(file, offset, line, col) {
        this.file = file;
        this.offset = offset;
        this.line = line;
        this.col = col;
    }
    toString() {
        return isPresent(this.offset) ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
    }
}
export class ParseSourceFile {
    constructor(content, url) {
        this.content = content;
        this.url = url;
    }
}
export class ParseSourceSpan {
    constructor(start, end, details = null) {
        this.start = start;
        this.end = end;
        this.details = details;
    }
    toString() {
        return this.start.file.content.substring(this.start.offset, this.end.offset);
    }
}
export var ParseErrorLevel;
(function (ParseErrorLevel) {
    ParseErrorLevel[ParseErrorLevel["WARNING"] = 0] = "WARNING";
    ParseErrorLevel[ParseErrorLevel["FATAL"] = 1] = "FATAL";
})(ParseErrorLevel || (ParseErrorLevel = {}));
export class ParseError {
    constructor(span, msg, level = ParseErrorLevel.FATAL) {
        this.span = span;
        this.msg = msg;
        this.level = level;
    }
    toString() {
        var source = this.span.start.file.content;
        var ctxStart = this.span.start.offset;
        var contextStr = '';
        var details = '';
        if (isPresent(ctxStart)) {
            if (ctxStart > source.length - 1) {
                ctxStart = source.length - 1;
            }
            var ctxEnd = ctxStart;
            var ctxLen = 0;
            var ctxLines = 0;
            while (ctxLen < 100 && ctxStart > 0) {
                ctxStart--;
                ctxLen++;
                if (source[ctxStart] == '\n') {
                    if (++ctxLines == 3) {
                        break;
                    }
                }
            }
            ctxLen = 0;
            ctxLines = 0;
            while (ctxLen < 100 && ctxEnd < source.length - 1) {
                ctxEnd++;
                ctxLen++;
                if (source[ctxEnd] == '\n') {
                    if (++ctxLines == 3) {
                        break;
                    }
                }
            }
            let context = source.substring(ctxStart, this.span.start.offset) + '[ERROR ->]' +
                source.substring(this.span.start.offset, ctxEnd + 1);
            contextStr = ` ("${context}")`;
        }
        if (this.span.details) {
            details = `, ${this.span.details}`;
        }
        return `${this.msg}${contextStr}: ${this.span.start}${details}`;
    }
}
//# sourceMappingURL=parse_util.js.map