/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../facade/lang');
var NgStyle = (function () {
    function NgStyle(_differs, _ngEl, _renderer) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    Object.defineProperty(NgStyle.prototype, "ngStyle", {
        set: function (v) {
            this._ngStyle = v;
            if (lang_1.isBlank(this._differ) && lang_1.isPresent(v)) {
                this._differ = this._differs.find(this._ngStyle).create(null);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgStyle.prototype.ngDoCheck = function () {
        if (lang_1.isPresent(this._differ)) {
            var changes = this._differ.diff(this._ngStyle);
            if (lang_1.isPresent(changes)) {
                this._applyChanges(changes);
            }
        }
    };
    NgStyle.prototype._applyChanges = function (changes) {
        var _this = this;
        changes.forEachRemovedItem(function (record) { _this._setStyle(record.key, null); });
        changes.forEachAddedItem(function (record) { _this._setStyle(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { _this._setStyle(record.key, record.currentValue); });
    };
    NgStyle.prototype._setStyle = function (name, val) {
        var nameParts = name.split('.');
        var nameToSet = nameParts[0];
        var valToSet = lang_1.isPresent(val) && nameParts.length === 2 ? "" + val + nameParts[1] : val;
        this._renderer.setElementStyle(this._ngEl.nativeElement, nameToSet, valToSet);
    };
    /** @nocollapse */
    NgStyle.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngStyle]' },] },
    ];
    /** @nocollapse */
    NgStyle.ctorParameters = [
        { type: core_1.KeyValueDiffers, },
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ];
    /** @nocollapse */
    NgStyle.propDecorators = {
        'ngStyle': [{ type: core_1.Input },],
    };
    return NgStyle;
}());
exports.NgStyle = NgStyle;
//# sourceMappingURL=ng_style.js.map