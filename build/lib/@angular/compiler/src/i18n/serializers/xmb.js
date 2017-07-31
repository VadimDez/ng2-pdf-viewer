/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { decimalDigest } from '../digest';
import { Serializer } from './serializer';
import * as xml from './xml_helper';
var /** @type {?} */ _MESSAGES_TAG = 'messagebundle';
var /** @type {?} */ _MESSAGE_TAG = 'msg';
var /** @type {?} */ _PLACEHOLDER_TAG = 'ph';
var /** @type {?} */ _EXEMPLE_TAG = 'ex';
var /** @type {?} */ _DOCTYPE = "<!ELEMENT messagebundle (msg)*>\n<!ATTLIST messagebundle class CDATA #IMPLIED>\n\n<!ELEMENT msg (#PCDATA|ph|source)*>\n<!ATTLIST msg id CDATA #IMPLIED>\n<!ATTLIST msg seq CDATA #IMPLIED>\n<!ATTLIST msg name CDATA #IMPLIED>\n<!ATTLIST msg desc CDATA #IMPLIED>\n<!ATTLIST msg meaning CDATA #IMPLIED>\n<!ATTLIST msg obsolete (obsolete) #IMPLIED>\n<!ATTLIST msg xml:space (default|preserve) \"default\">\n<!ATTLIST msg is_hidden CDATA #IMPLIED>\n\n<!ELEMENT source (#PCDATA)>\n\n<!ELEMENT ph (#PCDATA|ex)*>\n<!ATTLIST ph name CDATA #REQUIRED>\n\n<!ELEMENT ex (#PCDATA)>";
export var Xmb = (function (_super) {
    __extends(Xmb, _super);
    function Xmb() {
        _super.apply(this, arguments);
    }
    /**
     * @param {?} messages
     * @return {?}
     */
    Xmb.prototype.write = function (messages) {
        var _this = this;
        var /** @type {?} */ exampleVisitor = new ExampleVisitor();
        var /** @type {?} */ visitor = new _Visitor();
        var /** @type {?} */ visited = {};
        var /** @type {?} */ rootNode = new xml.Tag(_MESSAGES_TAG);
        messages.forEach(function (message) {
            var /** @type {?} */ id = _this.digest(message);
            // deduplicate messages
            if (visited[id])
                return;
            visited[id] = true;
            var /** @type {?} */ mapper = _this.createNameMapper(message);
            var /** @type {?} */ attrs = { id: id };
            if (message.description) {
                attrs['desc'] = message.description;
            }
            if (message.meaning) {
                attrs['meaning'] = message.meaning;
            }
            rootNode.children.push(new xml.CR(2), new xml.Tag(_MESSAGE_TAG, attrs, visitor.serialize(message.nodes, { mapper: mapper })));
        });
        rootNode.children.push(new xml.CR());
        return xml.serialize([
            new xml.Declaration({ version: '1.0', encoding: 'UTF-8' }),
            new xml.CR(),
            new xml.Doctype(_MESSAGES_TAG, _DOCTYPE),
            new xml.CR(),
            exampleVisitor.addDefaultExamples(rootNode),
            new xml.CR(),
        ]);
    };
    /**
     * @param {?} content
     * @param {?} url
     * @return {?}
     */
    Xmb.prototype.load = function (content, url) {
        throw new Error('Unsupported');
    };
    /**
     * @param {?} message
     * @return {?}
     */
    Xmb.prototype.digest = function (message) { return digest(message); };
    /**
     * @param {?} message
     * @return {?}
     */
    Xmb.prototype.createNameMapper = function (message) {
        return new XmbPlaceholderMapper(message);
    };
    return Xmb;
}(Serializer));
var _Visitor = (function () {
    function _Visitor() {
    }
    /**
     * @param {?} text
     * @param {?} ctx
     * @return {?}
     */
    _Visitor.prototype.visitText = function (text, ctx) {
        return [new xml.Text(text.value)];
    };
    /**
     * @param {?} container
     * @param {?} ctx
     * @return {?}
     */
    _Visitor.prototype.visitContainer = function (container, ctx) {
        var _this = this;
        var /** @type {?} */ nodes = [];
        container.children.forEach(function (node) { return nodes.push.apply(nodes, node.visit(_this, ctx)); });
        return nodes;
    };
    /**
     * @param {?} icu
     * @param {?} ctx
     * @return {?}
     */
    _Visitor.prototype.visitIcu = function (icu, ctx) {
        var _this = this;
        var /** @type {?} */ nodes = [new xml.Text("{" + icu.expressionPlaceholder + ", " + icu.type + ", ")];
        Object.keys(icu.cases).forEach(function (c) {
            nodes.push.apply(nodes, [new xml.Text(c + " {")].concat(icu.cases[c].visit(_this, ctx), [new xml.Text("} ")]));
        });
        nodes.push(new xml.Text("}"));
        return nodes;
    };
    /**
     * @param {?} ph
     * @param {?} ctx
     * @return {?}
     */
    _Visitor.prototype.visitTagPlaceholder = function (ph, ctx) {
        var /** @type {?} */ startEx = new xml.Tag(_EXEMPLE_TAG, {}, [new xml.Text("<" + ph.tag + ">")]);
        var /** @type {?} */ name = ctx.mapper.toPublicName(ph.startName);
        var /** @type {?} */ startTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: name }, [startEx]);
        if (ph.isVoid) {
            // void tags have no children nor closing tags
            return [startTagPh];
        }
        var /** @type {?} */ closeEx = new xml.Tag(_EXEMPLE_TAG, {}, [new xml.Text("</" + ph.tag + ">")]);
        name = ctx.mapper.toPublicName(ph.closeName);
        var /** @type {?} */ closeTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: name }, [closeEx]);
        return [startTagPh].concat(this.serialize(ph.children, ctx), [closeTagPh]);
    };
    /**
     * @param {?} ph
     * @param {?} ctx
     * @return {?}
     */
    _Visitor.prototype.visitPlaceholder = function (ph, ctx) {
        var /** @type {?} */ name = ctx.mapper.toPublicName(ph.name);
        return [new xml.Tag(_PLACEHOLDER_TAG, { name: name })];
    };
    /**
     * @param {?} ph
     * @param {?} ctx
     * @return {?}
     */
    _Visitor.prototype.visitIcuPlaceholder = function (ph, ctx) {
        var /** @type {?} */ name = ctx.mapper.toPublicName(ph.name);
        return [new xml.Tag(_PLACEHOLDER_TAG, { name: name })];
    };
    /**
     * @param {?} nodes
     * @param {?} ctx
     * @return {?}
     */
    _Visitor.prototype.serialize = function (nodes, ctx) {
        var _this = this;
        return (_a = []).concat.apply(_a, nodes.map(function (node) { return node.visit(_this, ctx); }));
        var _a;
    };
    return _Visitor;
}());
/**
 * @param {?} message
 * @return {?}
 */
export function digest(message) {
    return decimalDigest(message);
}
var ExampleVisitor = (function () {
    function ExampleVisitor() {
    }
    /**
     * @param {?} node
     * @return {?}
     */
    ExampleVisitor.prototype.addDefaultExamples = function (node) {
        node.visit(this);
        return node;
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    ExampleVisitor.prototype.visitTag = function (tag) {
        var _this = this;
        if (tag.name === _PLACEHOLDER_TAG) {
            if (!tag.children || tag.children.length == 0) {
                var /** @type {?} */ exText = new xml.Text(tag.attrs['name'] || '...');
                tag.children = [new xml.Tag(_EXEMPLE_TAG, {}, [exText])];
            }
        }
        else if (tag.children) {
            tag.children.forEach(function (node) { return node.visit(_this); });
        }
    };
    /**
     * @param {?} text
     * @return {?}
     */
    ExampleVisitor.prototype.visitText = function (text) { };
    /**
     * @param {?} decl
     * @return {?}
     */
    ExampleVisitor.prototype.visitDeclaration = function (decl) { };
    /**
     * @param {?} doctype
     * @return {?}
     */
    ExampleVisitor.prototype.visitDoctype = function (doctype) { };
    return ExampleVisitor;
}());
/**
 * XMB/XTB placeholders can only contain A-Z, 0-9 and _
 *
 * Because such restrictions do not exist on placeholder names generated locally, the
 * `PlaceholderMapper` is used to convert internal names to XMB names when the XMB file is
 * serialized and back from XTB to internal names when an XTB is loaded.
 */
export var XmbPlaceholderMapper = (function () {
    /**
     * @param {?} message
     */
    function XmbPlaceholderMapper(message) {
        var _this = this;
        this.internalToXmb = {};
        this.xmbToNextId = {};
        this.xmbToInternal = {};
        message.nodes.forEach(function (node) { return node.visit(_this); });
    }
    /**
     * @param {?} internalName
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.toPublicName = function (internalName) {
        return this.internalToXmb.hasOwnProperty(internalName) ? this.internalToXmb[internalName] :
            null;
    };
    /**
     * @param {?} publicName
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.toInternalName = function (publicName) {
        return this.xmbToInternal.hasOwnProperty(publicName) ? this.xmbToInternal[publicName] : null;
    };
    /**
     * @param {?} text
     * @param {?=} ctx
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.visitText = function (text, ctx) { return null; };
    /**
     * @param {?} container
     * @param {?=} ctx
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.visitContainer = function (container, ctx) {
        var _this = this;
        container.children.forEach(function (child) { return child.visit(_this); });
    };
    /**
     * @param {?} icu
     * @param {?=} ctx
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.visitIcu = function (icu, ctx) {
        var _this = this;
        Object.keys(icu.cases).forEach(function (k) { icu.cases[k].visit(_this); });
    };
    /**
     * @param {?} ph
     * @param {?=} ctx
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.visitTagPlaceholder = function (ph, ctx) {
        var _this = this;
        this.addPlaceholder(ph.startName);
        ph.children.forEach(function (child) { return child.visit(_this); });
        this.addPlaceholder(ph.closeName);
    };
    /**
     * @param {?} ph
     * @param {?=} ctx
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.visitPlaceholder = function (ph, ctx) { this.addPlaceholder(ph.name); };
    /**
     * @param {?} ph
     * @param {?=} ctx
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.visitIcuPlaceholder = function (ph, ctx) { this.addPlaceholder(ph.name); };
    /**
     * @param {?} internalName
     * @return {?}
     */
    XmbPlaceholderMapper.prototype.addPlaceholder = function (internalName) {
        if (!internalName || this.internalToXmb.hasOwnProperty(internalName)) {
            return;
        }
        var /** @type {?} */ xmbName = internalName.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
        if (this.xmbToInternal.hasOwnProperty(xmbName)) {
            // Create a new XMB when it has already been used
            var /** @type {?} */ nextId = this.xmbToNextId[xmbName];
            this.xmbToNextId[xmbName] = nextId + 1;
            xmbName = xmbName + "_" + nextId;
        }
        else {
            this.xmbToNextId[xmbName] = 1;
        }
        this.internalToXmb[internalName] = xmbName;
        this.xmbToInternal[xmbName] = internalName;
    };
    return XmbPlaceholderMapper;
}());
function XmbPlaceholderMapper_tsickle_Closure_declarations() {
    /** @type {?} */
    XmbPlaceholderMapper.prototype.internalToXmb;
    /** @type {?} */
    XmbPlaceholderMapper.prototype.xmbToNextId;
    /** @type {?} */
    XmbPlaceholderMapper.prototype.xmbToInternal;
}
//# sourceMappingURL=xmb.js.map