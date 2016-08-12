/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A container for translated messages
 */
export class TranslationBundle {
    constructor(_messageMap = {}) {
        this._messageMap = _messageMap;
    }
    static load(content, url, placeholders, serializer) {
        return new TranslationBundle(serializer.load(content, url, placeholders));
    }
    get(id) { return this._messageMap[id]; }
    has(id) { return id in this._messageMap; }
}
//# sourceMappingURL=translation_bundle.js.map