/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class Message {
    constructor(nodes, placeholders, meaning, description) {
        this.nodes = nodes;
        this.placeholders = placeholders;
        this.meaning = meaning;
        this.description = description;
    }
}
export class Text {
    constructor(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitText(this, context); }
}
export class Container {
    constructor(children, sourceSpan) {
        this.children = children;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitContainer(this, context); }
}
export class Icu {
    constructor(expression, type, cases, sourceSpan) {
        this.expression = expression;
        this.type = type;
        this.cases = cases;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitIcu(this, context); }
}
export class TagPlaceholder {
    constructor(tag, attrs, startName, closeName, children, isVoid, sourceSpan) {
        this.tag = tag;
        this.attrs = attrs;
        this.startName = startName;
        this.closeName = closeName;
        this.children = children;
        this.isVoid = isVoid;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitTagPlaceholder(this, context); }
}
export class Placeholder {
    constructor(value, name = '', sourceSpan) {
        this.value = value;
        this.name = name;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitPlaceholder(this, context); }
}
export class IcuPlaceholder {
    constructor(value, name = '', sourceSpan) {
        this.value = value;
        this.name = name;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitIcuPlaceholder(this, context); }
}
//# sourceMappingURL=i18n_ast.js.map