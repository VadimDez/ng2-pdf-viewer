"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('../facade/lang');
var html_ast_1 = require('../html_ast');
var parse_util_1 = require('../parse_util');
var message_1 = require('./message');
exports.I18N_ATTR = 'i18n';
exports.I18N_ATTR_PREFIX = 'i18n-';
var CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*"([\s\S]*?)"[\s\S]*\)/g;
/**
 * An i18n error.
 */
var I18nError = (function (_super) {
    __extends(I18nError, _super);
    function I18nError(span, msg) {
        _super.call(this, span, msg);
    }
    return I18nError;
}(parse_util_1.ParseError));
exports.I18nError = I18nError;
function partition(nodes, errors, implicitTags) {
    var parts = [];
    for (var i = 0; i < nodes.length; ++i) {
        var n = nodes[i];
        var temp = [];
        if (_isOpeningComment(n)) {
            var i18n = n.value.replace(/^i18n:?/, '').trim();
            i++;
            while (!_isClosingComment(nodes[i])) {
                temp.push(nodes[i++]);
                if (i === nodes.length) {
                    errors.push(new I18nError(n.sourceSpan, 'Missing closing \'i18n\' comment.'));
                    break;
                }
            }
            parts.push(new Part(null, null, temp, i18n, true));
        }
        else if (n instanceof html_ast_1.HtmlElementAst) {
            var i18n = _findI18nAttr(n);
            var hasI18n = lang_1.isPresent(i18n) || implicitTags.indexOf(n.name) > -1;
            parts.push(new Part(n, null, n.children, lang_1.isPresent(i18n) ? i18n.value : null, hasI18n));
        }
        else if (n instanceof html_ast_1.HtmlTextAst) {
            parts.push(new Part(null, n, null, null, false));
        }
    }
    return parts;
}
exports.partition = partition;
var Part = (function () {
    function Part(rootElement, rootTextNode, children, i18n, hasI18n) {
        this.rootElement = rootElement;
        this.rootTextNode = rootTextNode;
        this.children = children;
        this.i18n = i18n;
        this.hasI18n = hasI18n;
    }
    Object.defineProperty(Part.prototype, "sourceSpan", {
        get: function () {
            if (lang_1.isPresent(this.rootElement)) {
                return this.rootElement.sourceSpan;
            }
            if (lang_1.isPresent(this.rootTextNode)) {
                return this.rootTextNode.sourceSpan;
            }
            return this.children[0].sourceSpan;
        },
        enumerable: true,
        configurable: true
    });
    Part.prototype.createMessage = function (parser) {
        return new message_1.Message(stringifyNodes(this.children, parser), meaning(this.i18n), description(this.i18n));
    };
    return Part;
}());
exports.Part = Part;
function _isOpeningComment(n) {
    return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value.startsWith('i18n');
}
function _isClosingComment(n) {
    return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value == '/i18n';
}
function _findI18nAttr(p) {
    var attrs = p.attrs;
    for (var i = 0; i < attrs.length; i++) {
        if (attrs[i].name === exports.I18N_ATTR) {
            return attrs[i];
        }
    }
    return null;
}
function meaning(i18n) {
    if (lang_1.isBlank(i18n) || i18n == '')
        return null;
    return i18n.split('|')[0];
}
exports.meaning = meaning;
function description(i18n) {
    if (lang_1.isBlank(i18n) || i18n == '')
        return null;
    var parts = i18n.split('|', 2);
    return parts.length > 1 ? parts[1] : null;
}
exports.description = description;
/**
 * Extract a translation string given an `i18n-` prefixed attribute.
 *
 * @internal
 */
function messageFromI18nAttribute(parser, p, i18nAttr) {
    var expectedName = i18nAttr.name.substring(5);
    var attr = p.attrs.find(function (a) { return a.name == expectedName; });
    if (attr) {
        return messageFromAttribute(parser, attr, meaning(i18nAttr.value), description(i18nAttr.value));
    }
    throw new I18nError(p.sourceSpan, "Missing attribute '" + expectedName + "'.");
}
exports.messageFromI18nAttribute = messageFromI18nAttribute;
function messageFromAttribute(parser, attr, meaning, description) {
    if (meaning === void 0) { meaning = null; }
    if (description === void 0) { description = null; }
    var value = removeInterpolation(attr.value, attr.sourceSpan, parser);
    return new message_1.Message(value, meaning, description);
}
exports.messageFromAttribute = messageFromAttribute;
function removeInterpolation(value, source, parser) {
    try {
        var parsed = parser.splitInterpolation(value, source.toString());
        var usedNames = new Map();
        if (lang_1.isPresent(parsed)) {
            var res = '';
            for (var i = 0; i < parsed.strings.length; ++i) {
                res += parsed.strings[i];
                if (i != parsed.strings.length - 1) {
                    var customPhName = getPhNameFromBinding(parsed.expressions[i], i);
                    customPhName = dedupePhName(usedNames, customPhName);
                    res += "<ph name=\"" + customPhName + "\"/>";
                }
            }
            return res;
        }
        else {
            return value;
        }
    }
    catch (e) {
        return value;
    }
}
exports.removeInterpolation = removeInterpolation;
function getPhNameFromBinding(input, index) {
    var customPhMatch = lang_1.StringWrapper.split(input, CUSTOM_PH_EXP);
    return customPhMatch.length > 1 ? customPhMatch[1] : "" + index;
}
exports.getPhNameFromBinding = getPhNameFromBinding;
function dedupePhName(usedNames, name) {
    var duplicateNameCount = usedNames.get(name);
    if (lang_1.isPresent(duplicateNameCount)) {
        usedNames.set(name, duplicateNameCount + 1);
        return name + "_" + duplicateNameCount;
    }
    else {
        usedNames.set(name, 1);
        return name;
    }
}
exports.dedupePhName = dedupePhName;
function stringifyNodes(nodes, parser) {
    var visitor = new _StringifyVisitor(parser);
    return html_ast_1.htmlVisitAll(visitor, nodes).join('');
}
exports.stringifyNodes = stringifyNodes;
var _StringifyVisitor = (function () {
    function _StringifyVisitor(_parser) {
        this._parser = _parser;
        this._index = 0;
    }
    _StringifyVisitor.prototype.visitElement = function (ast, context) {
        var name = this._index++;
        var children = this._join(html_ast_1.htmlVisitAll(this, ast.children), '');
        return "<ph name=\"e" + name + "\">" + children + "</ph>";
    };
    _StringifyVisitor.prototype.visitAttr = function (ast, context) { return null; };
    _StringifyVisitor.prototype.visitText = function (ast, context) {
        var index = this._index++;
        var noInterpolation = removeInterpolation(ast.value, ast.sourceSpan, this._parser);
        if (noInterpolation != ast.value) {
            return "<ph name=\"t" + index + "\">" + noInterpolation + "</ph>";
        }
        return ast.value;
    };
    _StringifyVisitor.prototype.visitComment = function (ast, context) { return ''; };
    _StringifyVisitor.prototype.visitExpansion = function (ast, context) { return null; };
    _StringifyVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
    _StringifyVisitor.prototype._join = function (strs, str) {
        return strs.filter(function (s) { return s.length > 0; }).join(str);
    };
    return _StringifyVisitor;
}());
//# sourceMappingURL=shared.js.map