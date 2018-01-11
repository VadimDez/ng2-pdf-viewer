/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/observers'), require('@angular/cdk/platform'), require('@angular/core'), require('@angular/material/core'), require('@angular/platform-browser'), require('@angular/cdk/a11y'), require('@angular/cdk/coercion'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/observers', '@angular/cdk/platform', '@angular/core', '@angular/material/core', '@angular/platform-browser', '@angular/cdk/a11y', '@angular/cdk/coercion', '@angular/forms'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.slideToggle = global.ng.material.slideToggle || {}),global.ng.cdk.observers,global.ng.cdk.platform,global.ng.core,global.ng.material.core,global.ng.platformBrowser,global.ng.cdk.a11y,global.ng.cdk.coercion,global.ng.forms));
}(this, (function (exports,_angular_cdk_observers,_angular_cdk_platform,_angular_core,_angular_material_core,_angular_platformBrowser,_angular_cdk_a11y,_angular_cdk_coercion,_angular_forms) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

// Increasing integer for generating unique ids for slide-toggle components.
var nextUniqueId = 0;
var MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MatSlideToggle; }),
    multi: true
};
/**
 * Change event object emitted by a MatSlideToggle.
 */
var MatSlideToggleChange = /** @class */ (function () {
    function MatSlideToggleChange() {
    }
    return MatSlideToggleChange;
}());
/**
 * \@docs-private
 */
var MatSlideToggleBase = /** @class */ (function () {
    function MatSlideToggleBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatSlideToggleBase;
}());
var _MatSlideToggleMixinBase = _angular_material_core.mixinTabIndex(_angular_material_core.mixinColor(_angular_material_core.mixinDisableRipple(_angular_material_core.mixinDisabled(MatSlideToggleBase)), 'accent'));
/**
 * Represents a slidable "switch" toggle that can be moved between on and off.
 */
var MatSlideToggle = /** @class */ (function (_super) {
    __extends(MatSlideToggle, _super);
    function MatSlideToggle(elementRef, _platform, _focusMonitor, _changeDetectorRef, tabIndex) {
        var _this = _super.call(this, elementRef) || this;
        _this._platform = _platform;
        _this._focusMonitor = _focusMonitor;
        _this._changeDetectorRef = _changeDetectorRef;
        _this.onChange = function (_) { };
        _this.onTouched = function () { };
        _this._uniqueId = "mat-slide-toggle-" + ++nextUniqueId;
        _this._required = false;
        _this._checked = false;
        /**
         * Name value will be applied to the input element if present
         */
        _this.name = null;
        /**
         * A unique id for the slide-toggle input. If none is supplied, it will be auto-generated.
         */
        _this.id = _this._uniqueId;
        /**
         * Whether the label should appear after or before the slide-toggle. Defaults to 'after'
         */
        _this.labelPosition = 'after';
        /**
         * Used to set the aria-label attribute on the underlying input element.
         */
        _this.ariaLabel = null;
        /**
         * Used to set the aria-labelledby attribute on the underlying input element.
         */
        _this.ariaLabelledby = null;
        /**
         * An event will be dispatched each time the slide-toggle changes its value.
         */
        _this.change = new _angular_core.EventEmitter();
        /**
         * Ripple configuration for the mouse ripples and focus indicators.
         */
        _this._rippleConfig = { centered: true, radius: 23, speedFactor: 1.5 };
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(MatSlideToggle.prototype, "required", {
        get: /**
         * Whether the slide-toggle is required.
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._required = _angular_cdk_coercion.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlideToggle.prototype, "checked", {
        get: /**
         * Whether the slide-toggle element is checked or not
         * @return {?}
         */
        function () { return this._checked; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._checked = _angular_cdk_coercion.coerceBooleanProperty(value);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlideToggle.prototype, "inputId", {
        /** Returns the unique id for the visual hidden input. */
        get: /**
         * Returns the unique id for the visual hidden input.
         * @return {?}
         */
        function () { return (this.id || this._uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatSlideToggle.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._slideRenderer = new SlideToggleRenderer(this._elementRef, this._platform);
        this._focusMonitor
            .monitor(this._inputElement.nativeElement, false)
            .subscribe(function (focusOrigin) { return _this._onInputFocusChange(focusOrigin); });
    };
    /**
     * @return {?}
     */
    MatSlideToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
    };
    /** Method being called whenever the underlying input emits a change event. */
    /**
     * Method being called whenever the underlying input emits a change event.
     * @param {?} event
     * @return {?}
     */
    MatSlideToggle.prototype._onChangeEvent = /**
     * Method being called whenever the underlying input emits a change event.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the component's `change` output.
        event.stopPropagation();
        // Releasing the pointer over the `<label>` element while dragging triggers another
        // click event on the `<label>` element. This means that the checked state of the underlying
        // input changed unintentionally and needs to be changed back.
        if (this._slideRenderer.dragging) {
            this._inputElement.nativeElement.checked = this.checked;
            return;
        }
        // Sync the value from the underlying input element with the component instance.
        this.checked = this._inputElement.nativeElement.checked;
        // Emit our custom change event only if the underlying input emitted one. This ensures that
        // there is no change event, when the checked state changes programmatically.
        this._emitChangeEvent();
    };
    /** Method being called whenever the slide-toggle has been clicked. */
    /**
     * Method being called whenever the slide-toggle has been clicked.
     * @param {?} event
     * @return {?}
     */
    MatSlideToggle.prototype._onInputClick = /**
     * Method being called whenever the slide-toggle has been clicked.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `slide-toggle` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    MatSlideToggle.prototype.writeValue = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.checked = !!value;
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    MatSlideToggle.prototype.registerOnChange = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    MatSlideToggle.prototype.registerOnTouched = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** Implemented as a part of ControlValueAccessor. */
    /**
     * Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    MatSlideToggle.prototype.setDisabledState = /**
     * Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    };
    /** Focuses the slide-toggle. */
    /**
     * Focuses the slide-toggle.
     * @return {?}
     */
    MatSlideToggle.prototype.focus = /**
     * Focuses the slide-toggle.
     * @return {?}
     */
    function () {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    };
    /** Toggles the checked state of the slide-toggle. */
    /**
     * Toggles the checked state of the slide-toggle.
     * @return {?}
     */
    MatSlideToggle.prototype.toggle = /**
     * Toggles the checked state of the slide-toggle.
     * @return {?}
     */
    function () {
        this.checked = !this.checked;
    };
    /**
     * Function is called whenever the focus changes for the input element.
     * @param {?} focusOrigin
     * @return {?}
     */
    MatSlideToggle.prototype._onInputFocusChange = /**
     * Function is called whenever the focus changes for the input element.
     * @param {?} focusOrigin
     * @return {?}
     */
    function (focusOrigin) {
        if (!this._focusRipple && focusOrigin === 'keyboard') {
            // For keyboard focus show a persistent ripple as focus indicator.
            this._focusRipple = this._ripple.launch(0, 0, __assign({ persistent: true }, this._rippleConfig));
        }
        else if (!focusOrigin) {
            this.onTouched();
            // Fade out and clear the focus ripple if one is currently present.
            if (this._focusRipple) {
                this._focusRipple.fadeOut();
                this._focusRipple = null;
            }
        }
    };
    /**
     * Emits a change event on the `change` output. Also notifies the FormControl about the change.
     * @return {?}
     */
    MatSlideToggle.prototype._emitChangeEvent = /**
     * Emits a change event on the `change` output. Also notifies the FormControl about the change.
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = new MatSlideToggleChange();
        event.source = this;
        event.checked = this.checked;
        this.onChange(this.checked);
        this.change.emit(event);
    };
    /**
     * @return {?}
     */
    MatSlideToggle.prototype._onDragStart = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._slideRenderer.startThumbDrag(this.checked);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatSlideToggle.prototype._onDrag = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._slideRenderer.dragging) {
            this._slideRenderer.updateThumbPosition(event.deltaX);
        }
    };
    /**
     * @return {?}
     */
    MatSlideToggle.prototype._onDragEnd = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._slideRenderer.dragging) {
            var /** @type {?} */ newCheckedValue = this._slideRenderer.dragPercentage > 50;
            if (newCheckedValue !== this.checked) {
                this.checked = newCheckedValue;
                this._emitChangeEvent();
            }
            // The drag should be stopped outside of the current event handler, because otherwise the
            // click event will be fired before and will revert the drag change.
            setTimeout(function () { return _this._slideRenderer.stopThumbDrag(); });
        }
    };
    /** Method being called whenever the label text changes. */
    /**
     * Method being called whenever the label text changes.
     * @return {?}
     */
    MatSlideToggle.prototype._onLabelTextChange = /**
     * Method being called whenever the label text changes.
     * @return {?}
     */
    function () {
        // This method is getting called whenever the label of the slide-toggle changes.
        // Since the slide-toggle uses the OnPush strategy we need to notify it about the change
        // that has been recognized by the cdkObserveContent directive.
        this._changeDetectorRef.markForCheck();
    };
    MatSlideToggle.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-slide-toggle',
                    exportAs: 'matSlideToggle',
                    host: {
                        'class': 'mat-slide-toggle',
                        '[id]': 'id',
                        '[class.mat-checked]': 'checked',
                        '[class.mat-disabled]': 'disabled',
                        '[class.mat-slide-toggle-label-before]': 'labelPosition == "before"',
                    },
                    template: "<label class=\"mat-slide-toggle-label\" #label><div class=\"mat-slide-toggle-bar\" [class.mat-slide-toggle-bar-no-side-margin]=\"!labelContent.textContent || !labelContent.textContent.trim()\"><input #input class=\"mat-slide-toggle-input cdk-visually-hidden\" type=\"checkbox\" [id]=\"inputId\" [required]=\"required\" [tabIndex]=\"tabIndex\" [checked]=\"checked\" [disabled]=\"disabled\" [attr.name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (change)=\"_onChangeEvent($event)\" (click)=\"_onInputClick($event)\"><div class=\"mat-slide-toggle-thumb-container\" (slidestart)=\"_onDragStart()\" (slide)=\"_onDrag($event)\" (slideend)=\"_onDragEnd()\"><div class=\"mat-slide-toggle-thumb\"></div><div class=\"mat-slide-toggle-ripple\" mat-ripple [matRippleTrigger]=\"label\" [matRippleDisabled]=\"disableRipple || disabled\" [matRippleCentered]=\"_rippleConfig.centered\" [matRippleRadius]=\"_rippleConfig.radius\" [matRippleSpeedFactor]=\"_rippleConfig.speedFactor\"></div></div></div><span class=\"mat-slide-toggle-content\" #labelContent (cdkObserveContent)=\"_onLabelTextChange()\"><ng-content></ng-content></span></label>",
                    styles: [".mat-slide-toggle{display:inline-block;height:24px;line-height:24px;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0}.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(16px,0,0)}.mat-slide-toggle.mat-disabled .mat-slide-toggle-label,.mat-slide-toggle.mat-disabled .mat-slide-toggle-thumb-container{cursor:default}.mat-slide-toggle-label{display:flex;flex:1;flex-direction:row;align-items:center;height:inherit;cursor:pointer}.mat-slide-toggle-label-before .mat-slide-toggle-label{order:1}.mat-slide-toggle-label-before .mat-slide-toggle-bar{order:2}.mat-slide-toggle-bar,[dir=rtl] .mat-slide-toggle-label-before .mat-slide-toggle-bar{margin-right:8px;margin-left:0}.mat-slide-toggle-label-before .mat-slide-toggle-bar,[dir=rtl] .mat-slide-toggle-bar{margin-left:8px;margin-right:0}.mat-slide-toggle-bar-no-side-margin{margin-left:0;margin-right:0}.mat-slide-toggle-thumb-container{position:absolute;z-index:1;width:20px;height:20px;top:-3px;left:0;transform:translate3d(0,0,0);transition:all 80ms linear;transition-property:transform;cursor:-webkit-grab;cursor:grab}.mat-slide-toggle-thumb-container.mat-dragging,.mat-slide-toggle-thumb-container:active{cursor:-webkit-grabbing;cursor:grabbing;transition-duration:0s}.mat-slide-toggle-thumb{height:20px;width:20px;border-radius:50%;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-slide-toggle-thumb{background:#fff;border:solid 1px #000}}.mat-slide-toggle-bar{position:relative;width:36px;height:14px;border-radius:8px}@media screen and (-ms-high-contrast:active){.mat-slide-toggle-bar{background:#fff}}.mat-slide-toggle-input{bottom:0;left:10px}.mat-slide-toggle-bar,.mat-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}.mat-slide-toggle-ripple{position:absolute;top:-13px;left:-13px;height:46px;width:46px;z-index:1;pointer-events:none}"],
                    providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR],
                    inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatSlideToggle.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_cdk_platform.Platform, },
        { type: _angular_cdk_a11y.FocusMonitor, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: _angular_core.Attribute, args: ['tabindex',] },] },
    ]; };
    MatSlideToggle.propDecorators = {
        "name": [{ type: _angular_core.Input },],
        "id": [{ type: _angular_core.Input },],
        "labelPosition": [{ type: _angular_core.Input },],
        "ariaLabel": [{ type: _angular_core.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: _angular_core.Input, args: ['aria-labelledby',] },],
        "required": [{ type: _angular_core.Input },],
        "checked": [{ type: _angular_core.Input },],
        "change": [{ type: _angular_core.Output },],
        "_inputElement": [{ type: _angular_core.ViewChild, args: ['input',] },],
        "_ripple": [{ type: _angular_core.ViewChild, args: [_angular_material_core.MatRipple,] },],
    };
    return MatSlideToggle;
}(_MatSlideToggleMixinBase));
/**
 * Renderer for the Slide Toggle component, which separates DOM modification in its own class
 */
var SlideToggleRenderer = /** @class */ (function () {
    function SlideToggleRenderer(elementRef, platform) {
        /**
         * Whether the thumb is currently being dragged.
         */
        this.dragging = false;
        // We only need to interact with these elements when we're on the browser, so only grab
        // the reference in that case.
        if (platform.isBrowser) {
            this._thumbEl = elementRef.nativeElement.querySelector('.mat-slide-toggle-thumb-container');
            this._thumbBarEl = elementRef.nativeElement.querySelector('.mat-slide-toggle-bar');
        }
    }
    /** Initializes the drag of the slide-toggle. */
    /**
     * Initializes the drag of the slide-toggle.
     * @param {?} checked
     * @return {?}
     */
    SlideToggleRenderer.prototype.startThumbDrag = /**
     * Initializes the drag of the slide-toggle.
     * @param {?} checked
     * @return {?}
     */
    function (checked) {
        if (this.dragging) {
            return;
        }
        this._thumbBarWidth = this._thumbBarEl.clientWidth - this._thumbEl.clientWidth;
        this._thumbEl.classList.add('mat-dragging');
        this._previousChecked = checked;
        this.dragging = true;
    };
    /** Resets the current drag and returns the new checked value. */
    /**
     * Resets the current drag and returns the new checked value.
     * @return {?}
     */
    SlideToggleRenderer.prototype.stopThumbDrag = /**
     * Resets the current drag and returns the new checked value.
     * @return {?}
     */
    function () {
        if (!this.dragging) {
            return false;
        }
        this.dragging = false;
        this._thumbEl.classList.remove('mat-dragging');
        // Reset the transform because the component will take care of the thumb position after drag.
        _angular_material_core.applyCssTransform(this._thumbEl, '');
        return this.dragPercentage > 50;
    };
    /** Updates the thumb containers position from the specified distance. */
    /**
     * Updates the thumb containers position from the specified distance.
     * @param {?} distance
     * @return {?}
     */
    SlideToggleRenderer.prototype.updateThumbPosition = /**
     * Updates the thumb containers position from the specified distance.
     * @param {?} distance
     * @return {?}
     */
    function (distance) {
        this.dragPercentage = this._getDragPercentage(distance);
        // Calculate the moved distance based on the thumb bar width.
        var /** @type {?} */ dragX = (this.dragPercentage / 100) * this._thumbBarWidth;
        _angular_material_core.applyCssTransform(this._thumbEl, "translate3d(" + dragX + "px, 0, 0)");
    };
    /**
     * Retrieves the percentage of thumb from the moved distance. Percentage as fraction of 100.
     * @param {?} distance
     * @return {?}
     */
    SlideToggleRenderer.prototype._getDragPercentage = /**
     * Retrieves the percentage of thumb from the moved distance. Percentage as fraction of 100.
     * @param {?} distance
     * @return {?}
     */
    function (distance) {
        var /** @type {?} */ percentage = (distance / this._thumbBarWidth) * 100;
        // When the toggle was initially checked, then we have to start the drag at the end.
        if (this._previousChecked) {
            percentage += 100;
        }
        return Math.max(0, Math.min(percentage, 100));
    };
    return SlideToggleRenderer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatSlideToggleModule = /** @class */ (function () {
    function MatSlideToggleModule() {
    }
    MatSlideToggleModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_material_core.MatRippleModule, _angular_material_core.MatCommonModule, _angular_cdk_platform.PlatformModule, _angular_cdk_observers.ObserversModule, _angular_cdk_a11y.A11yModule],
                    exports: [MatSlideToggle, _angular_material_core.MatCommonModule],
                    declarations: [MatSlideToggle],
                    providers: [
                        { provide: _angular_platformBrowser.HAMMER_GESTURE_CONFIG, useClass: _angular_material_core.GestureConfig }
                    ],
                },] },
    ];
    /** @nocollapse */
    MatSlideToggleModule.ctorParameters = function () { return []; };
    return MatSlideToggleModule;
}());

exports.MatSlideToggleModule = MatSlideToggleModule;
exports.MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = MAT_SLIDE_TOGGLE_VALUE_ACCESSOR;
exports.MatSlideToggleChange = MatSlideToggleChange;
exports.MatSlideToggleBase = MatSlideToggleBase;
exports._MatSlideToggleMixinBase = _MatSlideToggleMixinBase;
exports.MatSlideToggle = MatSlideToggle;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-slide-toggle.umd.js.map
