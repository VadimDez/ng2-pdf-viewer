import { StringWrapper, isBlank, isPresent } from '../facade/lang';
import { HtmlCommentAst, HtmlElementAst, HtmlTextAst, htmlVisitAll } from '../html_ast';
import { ParseError } from '../parse_util';
import { Message } from './message';
export const I18N_ATTR = 'i18n';
export const I18N_ATTR_PREFIX = 'i18n-';
var CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*"([\s\S]*?)"[\s\S]*\)/g;
/**
 * An i18n error.
 */
export class I18nError extends ParseError {
    constructor(span, msg) {
        super(span, msg);
    }
}
export function partition(nodes, errors, implicitTags) {
    let parts = [];
    for (let i = 0; i < nodes.length; ++i) {
        let n = nodes[i];
        let temp = [];
        if (_isOpeningComment(n)) {
            let i18n = n.value.replace(/^i18n:?/, '').trim();
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
        else if (n instanceof HtmlElementAst) {
            let i18n = _findI18nAttr(n);
            let hasI18n = isPresent(i18n) || implicitTags.indexOf(n.name) > -1;
            parts.push(new Part(n, null, n.children, isPresent(i18n) ? i18n.value : null, hasI18n));
        }
        else if (n instanceof HtmlTextAst) {
            parts.push(new Part(null, n, null, null, false));
        }
    }
    return parts;
}
export class Part {
    constructor(rootElement, rootTextNode, children, i18n, hasI18n) {
        this.rootElement = rootElement;
        this.rootTextNode = rootTextNode;
        this.children = children;
        this.i18n = i18n;
        this.hasI18n = hasI18n;
    }
    get sourceSpan() {
        if (isPresent(this.rootElement)) {
            return this.rootElement.sourceSpan;
        }
        if (isPresent(this.rootTextNode)) {
            return this.rootTextNode.sourceSpan;
        }
        return this.children[0].sourceSpan;
    }
    createMessage(parser) {
        return new Message(stringifyNodes(this.children, parser), meaning(this.i18n), description(this.i18n));
    }
}
function _isOpeningComment(n) {
    return n instanceof HtmlCommentAst && isPresent(n.value) && n.value.startsWith('i18n');
}
function _isClosingComment(n) {
    return n instanceof HtmlCommentAst && isPresent(n.value) && n.value == '/i18n';
}
function _findI18nAttr(p) {
    let attrs = p.attrs;
    for (let i = 0; i < attrs.length; i++) {
        if (attrs[i].name === I18N_ATTR) {
            return attrs[i];
        }
    }
    return null;
}
export function meaning(i18n) {
    if (isBlank(i18n) || i18n == '')
        return null;
    return i18n.split('|')[0];
}
export function description(i18n) {
    if (isBlank(i18n) || i18n == '')
        return null;
    let parts = i18n.split('|', 2);
    return parts.length > 1 ? parts[1] : null;
}
/**
 * Extract a translation string given an `i18n-` prefixed attribute.
 *
 * @internal
 */
export function messageFromI18nAttribute(parser, p, i18nAttr) {
    let expectedName = i18nAttr.name.substring(5);
    let attr = p.attrs.find(a => a.name == expectedName);
    if (attr) {
        return messageFromAttribute(parser, attr, meaning(i18nAttr.value), description(i18nAttr.value));
    }
    throw new I18nError(p.sourceSpan, `Missing attribute '${expectedName}'.`);
}
export function messageFromAttribute(parser, attr, meaning = null, description = null) {
    let value = removeInterpolation(attr.value, attr.sourceSpan, parser);
    return new Message(value, meaning, description);
}
export function removeInterpolation(value, source, parser) {
    try {
        let parsed = parser.splitInterpolation(value, source.toString());
        let usedNames = new Map();
        if (isPresent(parsed)) {
            let res = '';
            for (let i = 0; i < parsed.strings.length; ++i) {
                res += parsed.strings[i];
                if (i != parsed.strings.length - 1) {
                    let customPhName = getPhNameFromBinding(parsed.expressions[i], i);
                    customPhName = dedupePhName(usedNames, customPhName);
                    res += `<ph name="${customPhName}"/>`;
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
export function getPhNameFromBinding(input, index) {
    let customPhMatch = StringWrapper.split(input, CUSTOM_PH_EXP);
    return customPhMatch.length > 1 ? customPhMatch[1] : `${index}`;
}
export function dedupePhName(usedNames, name) {
    let duplicateNameCount = usedNames.get(name);
    if (isPresent(duplicateNameCount)) {
        usedNames.set(name, duplicateNameCount + 1);
        return `${name}_${duplicateNameCount}`;
    }
    else {
        usedNames.set(name, 1);
        return name;
    }
}
export function stringifyNodes(nodes, parser) {
    let visitor = new _StringifyVisitor(parser);
    return htmlVisitAll(visitor, nodes).join('');
}
class _StringifyVisitor {
    constructor(_parser) {
        this._parser = _parser;
        this._index = 0;
    }
    visitElement(ast, context) {
        let name = this._index++;
        let children = this._join(htmlVisitAll(this, ast.children), '');
        return `<ph name="e${name}">${children}</ph>`;
    }
    visitAttr(ast, context) { return null; }
    visitText(ast, context) {
        let index = this._index++;
        let noInterpolation = removeInterpolation(ast.value, ast.sourceSpan, this._parser);
        if (noInterpolation != ast.value) {
            return `<ph name="t${index}">${noInterpolation}</ph>`;
        }
        return ast.value;
    }
    visitComment(ast, context) { return ''; }
    visitExpansion(ast, context) { return null; }
    visitExpansionCase(ast, context) { return null; }
    _join(strs, str) {
        return strs.filter(s => s.length > 0).join(str);
    }
}
//# sourceMappingURL=shared.js.map