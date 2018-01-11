/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, EventEmitter, Inject, Input, NgModule, Optional, Output, TemplateRef, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import '@angular/forms';
import { BidiModule, Directionality } from '@angular/cdk/bidi';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class CdkStepLabel {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
CdkStepLabel.decorators = [
    { type: Directive, args: [{
                selector: '[cdkStepLabel]',
            },] },
];
/** @nocollapse */
CdkStepLabel.ctorParameters = () => [
    { type: TemplateRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Used to generate unique ID for each stepper component.
 */
let nextId = 0;
/**
 * Change event emitted on selection changes.
 */
class StepperSelectionEvent {
}
class CdkStep {
    /**
     * @param {?} _stepper
     */
    constructor(_stepper) {
        this._stepper = _stepper;
        /**
         * Whether user has seen the expanded step content or not.
         */
        this.interacted = false;
        this._editable = true;
        this._optional = false;
        this._customCompleted = null;
    }
    /**
     * Whether the user can return to this step once it has been marked as complted.
     * @return {?}
     */
    get editable() { return this._editable; }
    /**
     * @param {?} value
     * @return {?}
     */
    set editable(value) {
        this._editable = coerceBooleanProperty(value);
    }
    /**
     * Whether the completion of step is optional.
     * @return {?}
     */
    get optional() { return this._optional; }
    /**
     * @param {?} value
     * @return {?}
     */
    set optional(value) {
        this._optional = coerceBooleanProperty(value);
    }
    /**
     * Whether step is marked as completed.
     * @return {?}
     */
    get completed() {
        return this._customCompleted == null ? this._defaultCompleted : this._customCompleted;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set completed(value) {
        this._customCompleted = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get _defaultCompleted() {
        return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
    }
    /**
     * Selects this step component.
     * @return {?}
     */
    select() {
        this._stepper.selected = this;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        // Since basically all inputs of the MatStep get proxied through the view down to the
        // underlying MatStepHeader, we have to make sure that change detection runs correctly.
        this._stepper._stateChanged();
    }
}
CdkStep.decorators = [
    { type: Component, args: [{selector: 'cdk-step',
                exportAs: 'cdkStep',
                template: "<ng-template><ng-content></ng-content></ng-template>",
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
CdkStep.ctorParameters = () => [
    { type: CdkStepper, decorators: [{ type: Inject, args: [forwardRef(() => CdkStepper),] },] },
];
CdkStep.propDecorators = {
    "stepLabel": [{ type: ContentChild, args: [CdkStepLabel,] },],
    "content": [{ type: ViewChild, args: [TemplateRef,] },],
    "stepControl": [{ type: Input },],
    "label": [{ type: Input },],
    "editable": [{ type: Input },],
    "optional": [{ type: Input },],
    "completed": [{ type: Input },],
};
class CdkStepper {
    /**
     * @param {?} _dir
     * @param {?} _changeDetectorRef
     */
    constructor(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Emits when the component is destroyed.
         */
        this._destroyed = new Subject();
        this._linear = false;
        this._selectedIndex = 0;
        /**
         * Event emitted when the selected step has changed.
         */
        this.selectionChange = new EventEmitter();
        /**
         * The index of the step that the focus can be set.
         */
        this._focusIndex = 0;
        this._orientation = 'horizontal';
        this._groupId = nextId++;
    }
    /**
     * Whether the validity of previous steps should be checked or not.
     * @return {?}
     */
    get linear() { return this._linear; }
    /**
     * @param {?} value
     * @return {?}
     */
    set linear(value) { this._linear = coerceBooleanProperty(value); }
    /**
     * The index of the selected step.
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * @param {?} index
     * @return {?}
     */
    set selectedIndex(index) {
        if (this._steps) {
            if (this._anyControlsInvalidOrPending(index) || index < this._selectedIndex &&
                !this._steps.toArray()[index].editable) {
                // remove focus from clicked step header if the step is not able to be selected
                this._stepHeader.toArray()[index].nativeElement.blur();
            }
            else if (this._selectedIndex != index) {
                this._emitStepperSelectionEvent(index);
                this._focusIndex = this._selectedIndex;
            }
        }
        else {
            this._selectedIndex = this._focusIndex = index;
        }
    }
    /**
     * The step that is selected.
     * @return {?}
     */
    get selected() { return this._steps.toArray()[this.selectedIndex]; }
    /**
     * @param {?} step
     * @return {?}
     */
    set selected(step) {
        this.selectedIndex = this._steps.toArray().indexOf(step);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * Selects and focuses the next step in list.
     * @return {?}
     */
    next() {
        this.selectedIndex = Math.min(this._selectedIndex + 1, this._steps.length - 1);
    }
    /**
     * Selects and focuses the previous step in list.
     * @return {?}
     */
    previous() {
        this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
    }
    /**
     * Returns a unique id for each step label element.
     * @param {?} i
     * @return {?}
     */
    _getStepLabelId(i) {
        return `cdk-step-label-${this._groupId}-${i}`;
    }
    /**
     * Returns unique id for each step content element.
     * @param {?} i
     * @return {?}
     */
    _getStepContentId(i) {
        return `cdk-step-content-${this._groupId}-${i}`;
    }
    /**
     * Marks the component to be change detected.
     * @return {?}
     */
    _stateChanged() {
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Returns position state of the step with the given index.
     * @param {?} index
     * @return {?}
     */
    _getAnimationDirection(index) {
        const /** @type {?} */ position = index - this._selectedIndex;
        if (position < 0) {
            return this._layoutDirection() === 'rtl' ? 'next' : 'previous';
        }
        else if (position > 0) {
            return this._layoutDirection() === 'rtl' ? 'previous' : 'next';
        }
        return 'current';
    }
    /**
     * Returns the type of icon to be displayed.
     * @param {?} index
     * @return {?}
     */
    _getIndicatorType(index) {
        const /** @type {?} */ step = this._steps.toArray()[index];
        if (!step.completed || this._selectedIndex == index) {
            return 'number';
        }
        else {
            return step.editable ? 'edit' : 'done';
        }
    }
    /**
     * @param {?} newIndex
     * @return {?}
     */
    _emitStepperSelectionEvent(newIndex) {
        const /** @type {?} */ stepsArray = this._steps.toArray();
        this.selectionChange.emit({
            selectedIndex: newIndex,
            previouslySelectedIndex: this._selectedIndex,
            selectedStep: stepsArray[newIndex],
            previouslySelectedStep: stepsArray[this._selectedIndex],
        });
        this._selectedIndex = newIndex;
        this._stateChanged();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onKeydown(event) {
        const /** @type {?} */ keyCode = event.keyCode;
        // Note that the left/right arrows work both in vertical and horizontal mode.
        if (keyCode === RIGHT_ARROW) {
            this._layoutDirection() === 'rtl' ? this._focusPreviousStep() : this._focusNextStep();
            event.preventDefault();
        }
        if (keyCode === LEFT_ARROW) {
            this._layoutDirection() === 'rtl' ? this._focusNextStep() : this._focusPreviousStep();
            event.preventDefault();
        }
        // Note that the up/down arrows only work in vertical mode.
        // See: https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
        if (this._orientation === 'vertical' && (keyCode === UP_ARROW || keyCode === DOWN_ARROW)) {
            keyCode === UP_ARROW ? this._focusPreviousStep() : this._focusNextStep();
            event.preventDefault();
        }
        if (keyCode === SPACE || keyCode === ENTER) {
            this.selectedIndex = this._focusIndex;
            event.preventDefault();
        }
    }
    /**
     * @return {?}
     */
    _focusNextStep() {
        this._focusStep((this._focusIndex + 1) % this._steps.length);
    }
    /**
     * @return {?}
     */
    _focusPreviousStep() {
        this._focusStep((this._focusIndex + this._steps.length - 1) % this._steps.length);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _focusStep(index) {
        this._focusIndex = index;
        this._stepHeader.toArray()[this._focusIndex].nativeElement.focus();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _anyControlsInvalidOrPending(index) {
        const /** @type {?} */ steps = this._steps.toArray();
        steps[this._selectedIndex].interacted = true;
        if (this._linear && index >= 0) {
            return steps.slice(0, index).some(step => {
                const /** @type {?} */ control = step.stepControl;
                return control ? (control.invalid || control.pending) : !step.completed;
            });
        }
        return false;
    }
    /**
     * @return {?}
     */
    _layoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
}
CdkStepper.decorators = [
    { type: Directive, args: [{
                selector: '[cdkStepper]',
                exportAs: 'cdkStepper',
            },] },
];
/** @nocollapse */
CdkStepper.ctorParameters = () => [
    { type: Directionality, decorators: [{ type: Optional },] },
    { type: ChangeDetectorRef, },
];
CdkStepper.propDecorators = {
    "_steps": [{ type: ContentChildren, args: [CdkStep,] },],
    "linear": [{ type: Input },],
    "selectedIndex": [{ type: Input },],
    "selected": [{ type: Input },],
    "selectionChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Button that moves to the next step in a stepper workflow.
 */
class CdkStepperNext {
    /**
     * @param {?} _stepper
     */
    constructor(_stepper) {
        this._stepper = _stepper;
    }
}
CdkStepperNext.decorators = [
    { type: Directive, args: [{
                selector: 'button[cdkStepperNext]',
                host: { '(click)': '_stepper.next()' }
            },] },
];
/** @nocollapse */
CdkStepperNext.ctorParameters = () => [
    { type: CdkStepper, },
];
/**
 * Button that moves to the previous step in a stepper workflow.
 */
class CdkStepperPrevious {
    /**
     * @param {?} _stepper
     */
    constructor(_stepper) {
        this._stepper = _stepper;
    }
}
CdkStepperPrevious.decorators = [
    { type: Directive, args: [{
                selector: 'button[cdkStepperPrevious]',
                host: { '(click)': '_stepper.previous()' }
            },] },
];
/** @nocollapse */
CdkStepperPrevious.ctorParameters = () => [
    { type: CdkStepper, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class CdkStepperModule {
}
CdkStepperModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule, CommonModule],
                exports: [CdkStep, CdkStepper, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
                declarations: [CdkStep, CdkStepper, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
            },] },
];
/** @nocollapse */
CdkStepperModule.ctorParameters = () => [];

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

export { StepperSelectionEvent, CdkStep, CdkStepper, CdkStepLabel, CdkStepperNext, CdkStepperPrevious, CdkStepperModule };
//# sourceMappingURL=stepper.js.map
