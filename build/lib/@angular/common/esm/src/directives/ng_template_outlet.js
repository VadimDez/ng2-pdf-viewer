/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input, ViewContainerRef } from '@angular/core';
export class NgTemplateOutlet {
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    set ngOutletContext(context) { this._context = context; }
    set ngTemplateOutlet(templateRef) { this._templateRef = templateRef; }
    ngOnChanges() {
        if (this._viewRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._viewRef));
        }
        if (this._templateRef) {
            this._viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);
        }
    }
}
/** @nocollapse */
NgTemplateOutlet.decorators = [
    { type: Directive, args: [{ selector: '[ngTemplateOutlet]' },] },
];
/** @nocollapse */
NgTemplateOutlet.ctorParameters = [
    { type: ViewContainerRef, },
];
/** @nocollapse */
NgTemplateOutlet.propDecorators = {
    'ngOutletContext': [{ type: Input },],
    'ngTemplateOutlet': [{ type: Input },],
};
//# sourceMappingURL=ng_template_outlet.js.map