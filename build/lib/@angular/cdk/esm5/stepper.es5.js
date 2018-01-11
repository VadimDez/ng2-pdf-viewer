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

var CdkStepLabel = /** @class */ (function () {
    function CdkStepLabel(template) {
        this.template = template;
    }
    CdkStepLabel.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkStepLabel]',
                },] },
    ];
    /** @nocollapse */
    CdkStepLabel.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return CdkStepLabel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Used to generate unique ID for each stepper component.
 */
var nextId = 0;
/**
 * Change event emitted on selection changes.
 */
var StepperSelectionEvent = /** @class */ (function () {
    function StepperSelectionEvent() {
    }
    return StepperSelectionEvent;
}());
var CdkStep = /** @class */ (function () {
    function CdkStep(_stepper) {
        this._stepper = _stepper;
        /**
         * Whether user has seen the expanded step content or not.
         */
        this.interacted = false;
        this._editable = true;
        this._optional = false;
        this._customCompleted = null;
    }
    Object.defineProperty(CdkStep.prototype, "editable", {
        get: /**
         * Whether the user can return to this step once it has been marked as complted.
         * @return {?}
         */
        function () { return this._editable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._editable = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "optional", {
        get: /**
         * Whether the completion of step is optional.
         * @return {?}
         */
        function () { return this._optional; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._optional = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "completed", {
        get: /**
         * Whether step is marked as completed.
         * @return {?}
         */
        function () {
            return this._customCompleted == null ? this._defaultCompleted : this._customCompleted;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._customCompleted = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "_defaultCompleted", {
        get: /**
         * @return {?}
         */
        function () {
            return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
        },
        enumerable: true,
        configurable: true
    });
    /** Selects this step component. */
    /**
     * Selects this step component.
     * @return {?}
     */
    CdkStep.prototype.select = /**
     * Selects this step component.
     * @return {?}
     */
    function () {
        this._stepper.selected = this;
    };
    /**
     * @return {?}
     */
    CdkStep.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        // Since basically all inputs of the MatStep get proxied through the view down to the
        // underlying MatStepHeader, we have to make sure that change detection runs correctly.
        this._stepper._stateChanged();
    };
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
    CdkStep.ctorParameters = function () { return [
        { type: CdkStepper, decorators: [{ type: Inject, args: [forwardRef(function () { return CdkStepper; }),] },] },
    ]; };
    CdkStep.propDecorators = {
        "stepLabel": [{ type: ContentChild, args: [CdkStepLabel,] },],
        "content": [{ type: ViewChild, args: [TemplateRef,] },],
        "stepControl": [{ type: Input },],
        "label": [{ type: Input },],
        "editable": [{ type: Input },],
        "optional": [{ type: Input },],
        "completed": [{ type: Input },],
    };
    return CdkStep;
}());
var CdkStepper = /** @class */ (function () {
    function CdkStepper(_dir, _changeDetectorRef) {
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
    Object.defineProperty(CdkStepper.prototype, "linear", {
        get: /**
         * Whether the validity of previous steps should be checked or not.
         * @return {?}
         */
        function () { return this._linear; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._linear = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStepper.prototype, "selectedIndex", {
        get: /**
         * The index of the selected step.
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStepper.prototype, "selected", {
        get: /**
         * The step that is selected.
         * @return {?}
         */
        function () { return this._steps.toArray()[this.selectedIndex]; },
        set: /**
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this.selectedIndex = this._steps.toArray().indexOf(step);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkStepper.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Selects and focuses the next step in list. */
    /**
     * Selects and focuses the next step in list.
     * @return {?}
     */
    CdkStepper.prototype.next = /**
     * Selects and focuses the next step in list.
     * @return {?}
     */
    function () {
        this.selectedIndex = Math.min(this._selectedIndex + 1, this._steps.length - 1);
    };
    /** Selects and focuses the previous step in list. */
    /**
     * Selects and focuses the previous step in list.
     * @return {?}
     */
    CdkStepper.prototype.previous = /**
     * Selects and focuses the previous step in list.
     * @return {?}
     */
    function () {
        this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
    };
    /** Returns a unique id for each step label element. */
    /**
     * Returns a unique id for each step label element.
     * @param {?} i
     * @return {?}
     */
    CdkStepper.prototype._getStepLabelId = /**
     * Returns a unique id for each step label element.
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "cdk-step-label-" + this._groupId + "-" + i;
    };
    /** Returns unique id for each step content element. */
    /**
     * Returns unique id for each step content element.
     * @param {?} i
     * @return {?}
     */
    CdkStepper.prototype._getStepContentId = /**
     * Returns unique id for each step content element.
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "cdk-step-content-" + this._groupId + "-" + i;
    };
    /** Marks the component to be change detected. */
    /**
     * Marks the component to be change detected.
     * @return {?}
     */
    CdkStepper.prototype._stateChanged = /**
     * Marks the component to be change detected.
     * @return {?}
     */
    function () {
        this._changeDetectorRef.markForCheck();
    };
    /** Returns position state of the step with the given index. */
    /**
     * Returns position state of the step with the given index.
     * @param {?} index
     * @return {?}
     */
    CdkStepper.prototype._getAnimationDirection = /**
     * Returns position state of the step with the given index.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ position = index - this._selectedIndex;
        if (position < 0) {
            return this._layoutDirection() === 'rtl' ? 'next' : 'previous';
        }
        else if (position > 0) {
            return this._layoutDirection() === 'rtl' ? 'previous' : 'next';
        }
        return 'current';
    };
    /** Returns the type of icon to be displayed. */
    /**
     * Returns the type of icon to be displayed.
     * @param {?} index
     * @return {?}
     */
    CdkStepper.prototype._getIndicatorType = /**
     * Returns the type of icon to be displayed.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ step = this._steps.toArray()[index];
        if (!step.completed || this._selectedIndex == index) {
            return 'number';
        }
        else {
            return step.editable ? 'edit' : 'done';
        }
    };
    /**
     * @param {?} newIndex
     * @return {?}
     */
    CdkStepper.prototype._emitStepperSelectionEvent = /**
     * @param {?} newIndex
     * @return {?}
     */
    function (newIndex) {
        var /** @type {?} */ stepsArray = this._steps.toArray();
        this.selectionChange.emit({
            selectedIndex: newIndex,
            previouslySelectedIndex: this._selectedIndex,
            selectedStep: stepsArray[newIndex],
            previouslySelectedStep: stepsArray[this._selectedIndex],
        });
        this._selectedIndex = newIndex;
        this._stateChanged();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CdkStepper.prototype._onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ keyCode = event.keyCode;
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
    };
    /**
     * @return {?}
     */
    CdkStepper.prototype._focusNextStep = /**
     * @return {?}
     */
    function () {
        this._focusStep((this._focusIndex + 1) % this._steps.length);
    };
    /**
     * @return {?}
     */
    CdkStepper.prototype._focusPreviousStep = /**
     * @return {?}
     */
    function () {
        this._focusStep((this._focusIndex + this._steps.length - 1) % this._steps.length);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    CdkStepper.prototype._focusStep = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._focusIndex = index;
        this._stepHeader.toArray()[this._focusIndex].nativeElement.focus();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    CdkStepper.prototype._anyControlsInvalidOrPending = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ steps = this._steps.toArray();
        steps[this._selectedIndex].interacted = true;
        if (this._linear && index >= 0) {
            return steps.slice(0, index).some(function (step) {
                var /** @type {?} */ control = step.stepControl;
                return control ? (control.invalid || control.pending) : !step.completed;
            });
        }
        return false;
    };
    /**
     * @return {?}
     */
    CdkStepper.prototype._layoutDirection = /**
     * @return {?}
     */
    function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    CdkStepper.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkStepper]',
                    exportAs: 'cdkStepper',
                },] },
    ];
    /** @nocollapse */
    CdkStepper.ctorParameters = function () { return [
        { type: Directionality, decorators: [{ type: Optional },] },
        { type: ChangeDetectorRef, },
    ]; };
    CdkStepper.propDecorators = {
        "_steps": [{ type: ContentChildren, args: [CdkStep,] },],
        "linear": [{ type: Input },],
        "selectedIndex": [{ type: Input },],
        "selected": [{ type: Input },],
        "selectionChange": [{ type: Output },],
    };
    return CdkStepper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Button that moves to the next step in a stepper workflow.
 */
var CdkStepperNext = /** @class */ (function () {
    function CdkStepperNext(_stepper) {
        this._stepper = _stepper;
    }
    CdkStepperNext.decorators = [
        { type: Directive, args: [{
                    selector: 'button[cdkStepperNext]',
                    host: { '(click)': '_stepper.next()' }
                },] },
    ];
    /** @nocollapse */
    CdkStepperNext.ctorParameters = function () { return [
        { type: CdkStepper, },
    ]; };
    return CdkStepperNext;
}());
/**
 * Button that moves to the previous step in a stepper workflow.
 */
var CdkStepperPrevious = /** @class */ (function () {
    function CdkStepperPrevious(_stepper) {
        this._stepper = _stepper;
    }
    CdkStepperPrevious.decorators = [
        { type: Directive, args: [{
                    selector: 'button[cdkStepperPrevious]',
                    host: { '(click)': '_stepper.previous()' }
                },] },
    ];
    /** @nocollapse */
    CdkStepperPrevious.ctorParameters = function () { return [
        { type: CdkStepper, },
    ]; };
    return CdkStepperPrevious;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var CdkStepperModule = /** @class */ (function () {
    function CdkStepperModule() {
    }
    CdkStepperModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BidiModule, CommonModule],
                    exports: [CdkStep, CdkStepper, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
                    declarations: [CdkStep, CdkStepper, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
                },] },
    ];
    /** @nocollapse */
    CdkStepperModule.ctorParameters = function () { return []; };
    return CdkStepperModule;
}());

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
//# sourceMappingURL=stepper.es5.js.map
