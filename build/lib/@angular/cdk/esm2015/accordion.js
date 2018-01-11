/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, EventEmitter, Input, NgModule, Optional, Output } from '@angular/core';
import { UNIQUE_SELECTION_DISPATCHER_PROVIDER, UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Used to generate unique ID for each accordion.
 */
let nextId$1 = 0;
/**
 * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
 */
class CdkAccordion {
    constructor() {
        /**
         * A readonly id value to use for unique selection coordination.
         */
        this.id = `cdk-accordion-${nextId$1++}`;
        this._multi = false;
    }
    /**
     * Whether the accordion should allow multiple expanded accordion items simulateously.
     * @return {?}
     */
    get multi() { return this._multi; }
    /**
     * @param {?} multi
     * @return {?}
     */
    set multi(multi) { this._multi = coerceBooleanProperty(multi); }
}
CdkAccordion.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-accordion, [cdkAccordion]',
                exportAs: 'cdkAccordion',
            },] },
];
/** @nocollapse */
CdkAccordion.ctorParameters = () => [];
CdkAccordion.propDecorators = {
    "multi": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Used to generate unique ID for each accordion item.
 */
let nextId = 0;
/**
 * An basic directive expected to be extended and decorated as a component.  Sets up all
 * events and attributes needed to be managed by a CdkAccordion parent.
 */
class CdkAccordionItem {
    /**
     * @param {?} accordion
     * @param {?} _changeDetectorRef
     * @param {?} _expansionDispatcher
     */
    constructor(accordion, _changeDetectorRef, _expansionDispatcher) {
        this.accordion = accordion;
        this._changeDetectorRef = _changeDetectorRef;
        this._expansionDispatcher = _expansionDispatcher;
        /**
         * Event emitted every time the AccordionItem is closed.
         */
        this.closed = new EventEmitter();
        /**
         * Event emitted every time the AccordionItem is opened.
         */
        this.opened = new EventEmitter();
        /**
         * Event emitted when the AccordionItem is destroyed.
         */
        this.destroyed = new EventEmitter();
        /**
         * The unique AccordionItem id.
         */
        this.id = `cdk-accordion-child-${nextId++}`;
        this._expanded = false;
        /**
         * Unregister function for _expansionDispatcher.
         */
        this._removeUniqueSelectionListener = () => { };
        this._removeUniqueSelectionListener =
            _expansionDispatcher.listen((id, accordionId) => {
                if (this.accordion && !this.accordion.multi &&
                    this.accordion.id === accordionId && this.id !== id) {
                    this.expanded = false;
                }
            });
    }
    /**
     * Whether the AccordionItem is expanded.
     * @return {?}
     */
    get expanded() { return this._expanded; }
    /**
     * @param {?} expanded
     * @return {?}
     */
    set expanded(expanded) {
        expanded = coerceBooleanProperty(expanded);
        // Only emit events and update the internal value if the value changes.
        if (this._expanded !== expanded) {
            this._expanded = expanded;
            if (expanded) {
                this.opened.emit();
                /**
                 * In the unique selection dispatcher, the id parameter is the id of the CdkAccordionItem,
                 * the name value is the id of the accordion.
                 */
                const /** @type {?} */ accordionId = this.accordion ? this.accordion.id : this.id;
                this._expansionDispatcher.notify(this.id, accordionId);
            }
            else {
                this.closed.emit();
            }
            // Ensures that the animation will run when the value is set outside of an `@Input`.
            // This includes cases like the open, close and toggle methods.
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Emits an event for the accordion item being destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.emit();
        this._removeUniqueSelectionListener();
    }
    /**
     * Toggles the expanded state of the accordion item.
     * @return {?}
     */
    toggle() {
        this.expanded = !this.expanded;
    }
    /**
     * Sets the expanded state of the accordion item to false.
     * @return {?}
     */
    close() {
        this.expanded = false;
    }
    /**
     * Sets the expanded state of the accordion item to true.
     * @return {?}
     */
    open() {
        this.expanded = true;
    }
}
CdkAccordionItem.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-accordion-item',
                exportAs: 'cdkAccordionItem',
            },] },
];
/** @nocollapse */
CdkAccordionItem.ctorParameters = () => [
    { type: CdkAccordion, decorators: [{ type: Optional },] },
    { type: ChangeDetectorRef, },
    { type: UniqueSelectionDispatcher, },
];
CdkAccordionItem.propDecorators = {
    "closed": [{ type: Output },],
    "opened": [{ type: Output },],
    "destroyed": [{ type: Output },],
    "expanded": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class CdkAccordionModule {
}
CdkAccordionModule.decorators = [
    { type: NgModule, args: [{
                exports: [CdkAccordion, CdkAccordionItem],
                declarations: [CdkAccordion, CdkAccordionItem],
                providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER],
            },] },
];
/** @nocollapse */
CdkAccordionModule.ctorParameters = () => [];

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

export { CdkAccordionItem, CdkAccordion, CdkAccordionModule };
//# sourceMappingURL=accordion.js.map
