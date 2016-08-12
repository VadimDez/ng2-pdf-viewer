/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input, KeyValueDiffers, Renderer } from '@angular/core';
import { isBlank, isPresent } from '../facade/lang';
export class NgStyle {
    constructor(_differs, _ngEl, _renderer) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    set ngStyle(v) {
        this._ngStyle = v;
        if (isBlank(this._differ) && isPresent(v)) {
            this._differ = this._differs.find(this._ngStyle).create(null);
        }
    }
    ngDoCheck() {
        if (isPresent(this._differ)) {
            var changes = this._differ.diff(this._ngStyle);
            if (isPresent(changes)) {
                this._applyChanges(changes);
            }
        }
    }
    _applyChanges(changes) {
        changes.forEachRemovedItem((record) => { this._setStyle(record.key, null); });
        changes.forEachAddedItem((record) => { this._setStyle(record.key, record.currentValue); });
        changes.forEachChangedItem((record) => { this._setStyle(record.key, record.currentValue); });
    }
    _setStyle(name, val) {
        const nameParts = name.split('.');
        const nameToSet = nameParts[0];
        const valToSet = isPresent(val) && nameParts.length === 2 ? `${val}${nameParts[1]}` : val;
        this._renderer.setElementStyle(this._ngEl.nativeElement, nameToSet, valToSet);
    }
}
/** @nocollapse */
NgStyle.decorators = [
    { type: Directive, args: [{ selector: '[ngStyle]' },] },
];
/** @nocollapse */
NgStyle.ctorParameters = [
    { type: KeyValueDiffers, },
    { type: ElementRef, },
    { type: Renderer, },
];
/** @nocollapse */
NgStyle.propDecorators = {
    'ngStyle': [{ type: Input },],
};
//# sourceMappingURL=ng_style.js.map