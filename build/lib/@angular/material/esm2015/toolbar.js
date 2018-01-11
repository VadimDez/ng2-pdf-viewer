/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, NgModule, ViewEncapsulation, isDevMode } from '@angular/core';
import { MatCommonModule, mixinColor } from '@angular/material/core';
import { Platform, PlatformModule } from '@angular/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
class MatToolbarBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatToolbarMixinBase = mixinColor(MatToolbarBase);
class MatToolbarRow {
}
MatToolbarRow.decorators = [
    { type: Directive, args: [{
                selector: 'mat-toolbar-row',
                exportAs: 'matToolbarRow',
                host: { 'class': 'mat-toolbar-row' },
            },] },
];
/** @nocollapse */
MatToolbarRow.ctorParameters = () => [];
class MatToolbar extends _MatToolbarMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _platform
     */
    constructor(elementRef, _platform) {
        super(elementRef);
        this._platform = _platform;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!isDevMode() || !this._platform.isBrowser) {
            return;
        }
        this._checkToolbarMixedModes();
        this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
    /**
     * Throws an exception when developers are attempting to combine the different toolbar row modes.
     * @return {?}
     */
    _checkToolbarMixedModes() {
        if (!this._toolbarRows.length) {
            return;
        }
        // Check if there are any other DOM nodes that can display content but aren't inside of
        // a <mat-toolbar-row> element.
        const /** @type {?} */ isCombinedUsage = [].slice.call(this._elementRef.nativeElement.childNodes)
            .filter(node => !(node.classList && node.classList.contains('mat-toolbar-row')))
            .filter(node => node.nodeType !== Node.COMMENT_NODE)
            .some(node => node.textContent.trim());
        if (isCombinedUsage) {
            throwToolbarMixedModesError();
        }
    }
}
MatToolbar.decorators = [
    { type: Component, args: [{selector: 'mat-toolbar',
                exportAs: 'matToolbar',
                template: "<ng-content></ng-content><ng-content select=\"mat-toolbar-row\"></ng-content>",
                styles: [".mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}.mat-toolbar-multiple-rows{min-height:64px}.mat-toolbar-row,.mat-toolbar-single-row{height:64px}@media (max-width:600px){.mat-toolbar-multiple-rows{min-height:56px}.mat-toolbar-row,.mat-toolbar-single-row{height:56px}}"],
                inputs: ['color'],
                host: {
                    'class': 'mat-toolbar',
                    '[class.mat-toolbar-multiple-rows]': 'this._toolbarRows.length',
                    '[class.mat-toolbar-single-row]': '!this._toolbarRows.length'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
MatToolbar.ctorParameters = () => [
    { type: ElementRef, },
    { type: Platform, },
];
MatToolbar.propDecorators = {
    "_toolbarRows": [{ type: ContentChildren, args: [MatToolbarRow,] },],
};
/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * \@docs-private
 * @return {?}
 */
function throwToolbarMixedModesError() {
    throw Error('MatToolbar: Attempting to combine different toolbar modes. ' +
        'Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content ' +
        'inside of a `<mat-toolbar>` for a single row.');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class MatToolbarModule {
}
MatToolbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatCommonModule, PlatformModule],
                exports: [MatToolbar, MatToolbarRow, MatCommonModule],
                declarations: [MatToolbar, MatToolbarRow],
            },] },
];
/** @nocollapse */
MatToolbarModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { MatToolbarModule, MatToolbarBase, _MatToolbarMixinBase, MatToolbarRow, MatToolbar, throwToolbarMixedModesError };
//# sourceMappingURL=toolbar.js.map
