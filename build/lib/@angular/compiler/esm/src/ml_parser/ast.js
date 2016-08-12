/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class Text {
    constructor(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitText(this, context); }
}
export class Expansion {
    constructor(switchValue, type, cases, sourceSpan, switchValueSourceSpan) {
        this.switchValue = switchValue;
        this.type = type;
        this.cases = cases;
        this.sourceSpan = sourceSpan;
        this.switchValueSourceSpan = switchValueSourceSpan;
    }
    visit(visitor, context) { return visitor.visitExpansion(this, context); }
}
export class ExpansionCase {
    constructor(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
        this.value = value;
        this.expression = expression;
        this.sourceSpan = sourceSpan;
        this.valueSourceSpan = valueSourceSpan;
        this.expSourceSpan = expSourceSpan;
    }
    visit(visitor, context) { return visitor.visitExpansionCase(this, context); }
}
export class Attribute {
    constructor(name, value, sourceSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitAttribute(this, context); }
}
export class Element {
    constructor(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan) {
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.sourceSpan = sourceSpan;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
    }
    visit(visitor, context) { return visitor.visitElement(this, context); }
}
export class Comment {
    constructor(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitComment(this, context); }
}
export function visitAll(visitor, nodes, context = null) {
    let result = [];
    nodes.forEach(ast => {
        const astResult = ast.visit(visitor, context);
        if (astResult) {
            result.push(astResult);
        }
    });
    return result;
}
//# sourceMappingURL=ast.js.map