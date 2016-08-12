/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var Message = (function () {
    function Message(nodes, placeholders, meaning, description) {
        this.nodes = nodes;
        this.placeholders = placeholders;
        this.meaning = meaning;
        this.description = description;
    }
    return Message;
}());
exports.Message = Message;
var Text = (function () {
    function Text(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    Text.prototype.visit = function (visitor, context) { return visitor.visitText(this, context); };
    return Text;
}());
exports.Text = Text;
var Container = (function () {
    function Container(children, sourceSpan) {
        this.children = children;
        this.sourceSpan = sourceSpan;
    }
    Container.prototype.visit = function (visitor, context) { return visitor.visitContainer(this, context); };
    return Container;
}());
exports.Container = Container;
var Icu = (function () {
    function Icu(expression, type, cases, sourceSpan) {
        this.expression = expression;
        this.type = type;
        this.cases = cases;
        this.sourceSpan = sourceSpan;
    }
    Icu.prototype.visit = function (visitor, context) { return visitor.visitIcu(this, context); };
    return Icu;
}());
exports.Icu = Icu;
var TagPlaceholder = (function () {
    function TagPlaceholder(tag, attrs, startName, closeName, children, isVoid, sourceSpan) {
        this.tag = tag;
        this.attrs = attrs;
        this.startName = startName;
        this.closeName = closeName;
        this.children = children;
        this.isVoid = isVoid;
        this.sourceSpan = sourceSpan;
    }
    TagPlaceholder.prototype.visit = function (visitor, context) { return visitor.visitTagPlaceholder(this, context); };
    return TagPlaceholder;
}());
exports.TagPlaceholder = TagPlaceholder;
var Placeholder = (function () {
    function Placeholder(value, name, sourceSpan) {
        if (name === void 0) { name = ''; }
        this.value = value;
        this.name = name;
        this.sourceSpan = sourceSpan;
    }
    Placeholder.prototype.visit = function (visitor, context) { return visitor.visitPlaceholder(this, context); };
    return Placeholder;
}());
exports.Placeholder = Placeholder;
var IcuPlaceholder = (function () {
    function IcuPlaceholder(value, name, sourceSpan) {
        if (name === void 0) { name = ''; }
        this.value = value;
        this.name = name;
        this.sourceSpan = sourceSpan;
    }
    IcuPlaceholder.prototype.visit = function (visitor, context) { return visitor.visitIcuPlaceholder(this, context); };
    return IcuPlaceholder;
}());
exports.IcuPlaceholder = IcuPlaceholder;
//# sourceMappingURL=i18n_ast.js.map