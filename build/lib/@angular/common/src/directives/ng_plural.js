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
var localization_1 = require('../localization');
var ng_switch_1 = require('./ng_switch');
var NgPlural = (function () {
    function NgPlural(_localization) {
        this._localization = _localization;
        this._caseViews = {};
    }
    Object.defineProperty(NgPlural.prototype, "ngPlural", {
        set: function (value) {
            this._switchValue = value;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    NgPlural.prototype.addCase = function (value, switchView) { this._caseViews[value] = switchView; };
    /** @internal */
    NgPlural.prototype._updateView = function () {
        this._clearViews();
        var key = localization_1.getPluralCategory(this._switchValue, Object.keys(this._caseViews), this._localization);
        this._activateView(this._caseViews[key]);
    };
    /** @internal */
    NgPlural.prototype._clearViews = function () {
        if (lang_1.isPresent(this._activeView))
            this._activeView.destroy();
    };
    /** @internal */
    NgPlural.prototype._activateView = function (view) {
        if (!lang_1.isPresent(view))
            return;
        this._activeView = view;
        this._activeView.create();
    };
    /** @nocollapse */
    NgPlural.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngPlural]' },] },
    ];
    /** @nocollapse */
    NgPlural.ctorParameters = [
        { type: localization_1.NgLocalization, },
    ];
    /** @nocollapse */
    NgPlural.propDecorators = {
        'ngPlural': [{ type: core_1.Input },],
    };
    return NgPlural;
}());
exports.NgPlural = NgPlural;
var NgPluralCase = (function () {
    function NgPluralCase(value, template, viewContainer, ngPlural) {
        this.value = value;
        ngPlural.addCase(value, new ng_switch_1.SwitchView(viewContainer, template));
    }
    /** @nocollapse */
    NgPluralCase.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngPluralCase]' },] },
    ];
    /** @nocollapse */
    NgPluralCase.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['ngPluralCase',] },] },
        { type: core_1.TemplateRef, },
        { type: core_1.ViewContainerRef, },
        { type: NgPlural, decorators: [{ type: core_1.Host },] },
    ];
    return NgPluralCase;
}());
exports.NgPluralCase = NgPluralCase;
//# sourceMappingURL=ng_plural.js.map