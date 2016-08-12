/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TagContentType } from './tags';
export class XmlTagDefinition {
    constructor() {
        this.closedByParent = false;
        this.contentType = TagContentType.PARSABLE_DATA;
        this.isVoid = false;
        this.ignoreFirstLf = false;
        this.canSelfClose = true;
    }
    requireExtraParent(currentParent) { return false; }
    isClosedByChild(name) { return false; }
}
const _TAG_DEFINITION = new XmlTagDefinition();
export function getXmlTagDefinition(tagName) {
    return _TAG_DEFINITION;
}
//# sourceMappingURL=xml_tags.js.map