/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, Directive, Host, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPresent } from '../facade/lang';
import { NgLocalization, getPluralCategory } from '../localization';
import { SwitchView } from './ng_switch';
export class NgPlural {
    constructor(_localization) {
        this._localization = _localization;
        this._caseViews = {};
    }
    set ngPlural(value) {
        this._switchValue = value;
        this._updateView();
    }
    addCase(value, switchView) { this._caseViews[value] = switchView; }
    /** @internal */
    _updateView() {
        this._clearViews();
        var key = getPluralCategory(this._switchValue, Object.keys(this._caseViews), this._localization);
        this._activateView(this._caseViews[key]);
    }
    /** @internal */
    _clearViews() {
        if (isPresent(this._activeView))
            this._activeView.destroy();
    }
    /** @internal */
    _activateView(view) {
        if (!isPresent(view))
            return;
        this._activeView = view;
        this._activeView.create();
    }
}
/** @nocollapse */
NgPlural.decorators = [
    { type: Directive, args: [{ selector: '[ngPlural]' },] },
];
/** @nocollapse */
NgPlural.ctorParameters = [
    { type: NgLocalization, },
];
/** @nocollapse */
NgPlural.propDecorators = {
    'ngPlural': [{ type: Input },],
};
export class NgPluralCase {
    constructor(value, template, viewContainer, ngPlural) {
        this.value = value;
        ngPlural.addCase(value, new SwitchView(viewContainer, template));
    }
}
/** @nocollapse */
NgPluralCase.decorators = [
    { type: Directive, args: [{ selector: '[ngPluralCase]' },] },
];
/** @nocollapse */
NgPluralCase.ctorParameters = [
    { type: undefined, decorators: [{ type: Attribute, args: ['ngPluralCase',] },] },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: NgPlural, decorators: [{ type: Host },] },
];
//# sourceMappingURL=ng_plural.js.map