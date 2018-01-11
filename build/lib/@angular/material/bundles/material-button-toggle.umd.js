/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/core'), require('@angular/forms'), require('@angular/material/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/a11y', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/core', '@angular/forms', '@angular/material/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.buttonToggle = global.ng.material.buttonToggle || {}),global.ng.cdk.a11y,global.ng.cdk.coercion,global.ng.cdk.collections,global.ng.core,global.ng.forms,global.ng.material.core));
}(this, (function (exports,_angular_cdk_a11y,_angular_cdk_coercion,_angular_cdk_collections,_angular_core,_angular_forms,_angular_material_core) { 'use strict';

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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
var MatButtonToggleGroupBase = /** @class */ (function () {
    function MatButtonToggleGroupBase() {
    }
    return MatButtonToggleGroupBase;
}());
var _MatButtonToggleGroupMixinBase = _angular_material_core.mixinDisabled(MatButtonToggleGroupBase);
/**
 * Provider Expression that allows mat-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 */
var MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MatButtonToggleGroup; }),
    multi: true
};
var _uniqueIdCounter = 0;
/**
 * Change event object emitted by MatButtonToggle.
 */
var MatButtonToggleChange = /** @class */ (function () {
    function MatButtonToggleChange() {
    }
    return MatButtonToggleChange;
}());
/**
 * Exclusive selection button toggle group that behaves like a radio-button group.
 */
var MatButtonToggleGroup = /** @class */ (function (_super) {
    __extends(MatButtonToggleGroup, _super);
    function MatButtonToggleGroup(_changeDetector) {
        var _this = _super.call(this) || this;
        _this._changeDetector = _changeDetector;
        /**
         * The value for the button toggle group. Should match currently selected button toggle.
         */
        _this._value = null;
        /**
         * The HTML name attribute applied to toggles in this group.
         */
        _this._name = "mat-button-toggle-group-" + _uniqueIdCounter++;
        /**
         * Whether the button toggle group should be vertical.
         */
        _this._vertical = false;
        /**
         * The currently selected button toggle, should match the value.
         */
        _this._selected = null;
        /**
         * The method to be called in order to update ngModel.
         * Now `ngModel` binding is not supported in multiple selection mode.
         */
        _this._controlValueAccessorChangeFn = function () { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        _this._onTouched = function () { };
        /**
         * Event that emits whenever the value of the group changes.
         * Used to facilitate two-way data binding.
         * \@docs-private
         */
        _this.valueChange = new _angular_core.EventEmitter();
        /**
         * Event emitted when the group's value changes.
         */
        _this.change = new _angular_core.EventEmitter();
        return _this;
    }
    Object.defineProperty(MatButtonToggleGroup.prototype, "name", {
        get: /**
         * `name` attribute for the underlying `input` element.
         * @return {?}
         */
        function () {
            return this._name;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._name = value;
            this._updateButtonToggleNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "vertical", {
        get: /**
         * Whether the toggle group is vertical.
         * @return {?}
         */
        function () {
            return this._vertical;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._vertical = _angular_cdk_coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "value", {
        get: /**
         * Value of the toggle group.
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            if (this._value != newValue) {
                this._value = newValue;
                this.valueChange.emit(newValue);
                this._updateSelectedButtonToggleFromValue();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "selected", {
        get: /**
         * Whether the toggle group is selected.
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            if (selected && !selected.checked) {
                selected.checked = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatButtonToggleGroup.prototype._updateButtonToggleNames = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._buttonToggles) {
            this._buttonToggles.forEach(function (toggle) {
                toggle.name = _this._name;
            });
        }
    };
    /**
     * @return {?}
     */
    MatButtonToggleGroup.prototype._updateSelectedButtonToggleFromValue = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ isAlreadySelected = this._selected != null && this._selected.value == this._value;
        if (this._buttonToggles != null && !isAlreadySelected) {
            var /** @type {?} */ matchingButtonToggle = this._buttonToggles.filter(function (buttonToggle) { return buttonToggle.value == _this._value; })[0];
            if (matchingButtonToggle) {
                this.selected = matchingButtonToggle;
            }
            else if (this.value == null) {
                this.selected = null;
                this._buttonToggles.forEach(function (buttonToggle) {
                    buttonToggle.checked = false;
                });
            }
        }
    };
    /** Dispatch change event with current selection and group value. */
    /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    MatButtonToggleGroup.prototype._emitChangeEvent = /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = new MatButtonToggleChange();
        event.source = this._selected;
        event.value = this._value;
        this._controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value Value to be set to the model.
     * @return {?}
     */
    MatButtonToggleGroup.prototype.writeValue = /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value Value to be set to the model.
     * @return {?}
     */
    function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn On change callback function.
     */
    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn On change callback function.
     * @return {?}
     */
    MatButtonToggleGroup.prototype.registerOnChange = /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn On change callback function.
     * @return {?}
     */
    function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn On touch callback function.
     */
    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn On touch callback function.
     * @return {?}
     */
    MatButtonToggleGroup.prototype.registerOnTouched = /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn On touch callback function.
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param isDisabled Whether the component should be disabled.
     */
    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param {?} isDisabled Whether the component should be disabled.
     * @return {?}
     */
    MatButtonToggleGroup.prototype.setDisabledState = /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param {?} isDisabled Whether the component should be disabled.
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._markButtonTogglesForCheck();
    };
    /**
     * @return {?}
     */
    MatButtonToggleGroup.prototype._markButtonTogglesForCheck = /**
     * @return {?}
     */
    function () {
        if (this._buttonToggles) {
            this._buttonToggles.forEach(function (toggle) { return toggle._markForCheck(); });
        }
    };
    MatButtonToggleGroup.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'mat-button-toggle-group:not([multiple])',
                    providers: [MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
                    inputs: ['disabled'],
                    host: {
                        'role': 'radiogroup',
                        'class': 'mat-button-toggle-group',
                        '[class.mat-button-toggle-vertical]': 'vertical'
                    },
                    exportAs: 'matButtonToggleGroup',
                },] },
    ];
    /** @nocollapse */
    MatButtonToggleGroup.ctorParameters = function () { return [
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    MatButtonToggleGroup.propDecorators = {
        "_buttonToggles": [{ type: _angular_core.ContentChildren, args: [_angular_core.forwardRef(function () { return MatButtonToggle; }),] },],
        "name": [{ type: _angular_core.Input },],
        "vertical": [{ type: _angular_core.Input },],
        "value": [{ type: _angular_core.Input },],
        "valueChange": [{ type: _angular_core.Output },],
        "selected": [{ type: _angular_core.Input },],
        "change": [{ type: _angular_core.Output },],
    };
    return MatButtonToggleGroup;
}(_MatButtonToggleGroupMixinBase));
/**
 * Multiple selection button-toggle group. `ngModel` is not supported in this mode.
 */
var MatButtonToggleGroupMultiple = /** @class */ (function (_super) {
    __extends(MatButtonToggleGroupMultiple, _super);
    function MatButtonToggleGroupMultiple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether the button toggle group should be vertical.
         */
        _this._vertical = false;
        return _this;
    }
    Object.defineProperty(MatButtonToggleGroupMultiple.prototype, "vertical", {
        get: /**
         * Whether the toggle group is vertical.
         * @return {?}
         */
        function () {
            return this._vertical;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._vertical = _angular_cdk_coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    MatButtonToggleGroupMultiple.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'mat-button-toggle-group[multiple]',
                    exportAs: 'matButtonToggleGroup',
                    inputs: ['disabled'],
                    host: {
                        'class': 'mat-button-toggle-group',
                        '[class.mat-button-toggle-vertical]': 'vertical',
                        'role': 'group'
                    }
                },] },
    ];
    /** @nocollapse */
    MatButtonToggleGroupMultiple.ctorParameters = function () { return []; };
    MatButtonToggleGroupMultiple.propDecorators = {
        "vertical": [{ type: _angular_core.Input },],
    };
    return MatButtonToggleGroupMultiple;
}(_MatButtonToggleGroupMixinBase));
/**
 * Single button inside of a toggle group.
 */
var MatButtonToggle = /** @class */ (function () {
    function MatButtonToggle(toggleGroup, toggleGroupMultiple, _changeDetectorRef, _buttonToggleDispatcher, _elementRef, _focusMonitor) {
        var _this = this;
        this._changeDetectorRef = _changeDetectorRef;
        this._buttonToggleDispatcher = _buttonToggleDispatcher;
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        this.ariaLabelledby = null;
        /**
         * Whether or not this button toggle is checked.
         */
        this._checked = false;
        /**
         * Whether or not this button toggle is disabled.
         */
        this._disabled = false;
        /**
         * Value assigned to this button toggle.
         */
        this._value = null;
        /**
         * Whether or not the button toggle is a single selection.
         */
        this._isSingleSelector = false;
        /**
         * Unregister function for _buttonToggleDispatcher *
         */
        this._removeUniqueSelectionListener = function () { };
        /**
         * Event emitted when the group value changes.
         */
        this.change = new _angular_core.EventEmitter();
        this.buttonToggleGroup = toggleGroup;
        this.buttonToggleGroupMultiple = toggleGroupMultiple;
        if (this.buttonToggleGroup) {
            this._removeUniqueSelectionListener =
                _buttonToggleDispatcher.listen(function (id, name) {
                    if (id != _this.id && name == _this.name) {
                        _this.checked = false;
                        _this._changeDetectorRef.markForCheck();
                    }
                });
            this._type = 'radio';
            this.name = this.buttonToggleGroup.name;
            this._isSingleSelector = true;
        }
        else {
            // Even if there is no group at all, treat the button toggle as a checkbox so it can be
            // toggled on or off.
            this._type = 'checkbox';
            this._isSingleSelector = false;
        }
    }
    Object.defineProperty(MatButtonToggle.prototype, "inputId", {
        /** Unique ID for the underlying `input` element. */
        get: /**
         * Unique ID for the underlying `input` element.
         * @return {?}
         */
        function () {
            return this.id + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggle.prototype, "checked", {
        get: /**
         * Whether the button is checked.
         * @return {?}
         */
        function () { return this._checked; },
        set: /**
         * @param {?} newCheckedState
         * @return {?}
         */
        function (newCheckedState) {
            if (this._isSingleSelector && newCheckedState) {
                // Notify all button toggles with the same name (in the same group) to un-check.
                this._buttonToggleDispatcher.notify(this.id, this.name);
                this._changeDetectorRef.markForCheck();
            }
            this._checked = newCheckedState;
            if (newCheckedState && this._isSingleSelector && this.buttonToggleGroup.value != this.value) {
                this.buttonToggleGroup.selected = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggle.prototype, "value", {
        get: /**
         * MatButtonToggleGroup reads this to assign its own value.
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._value != value) {
                if (this.buttonToggleGroup != null && this.checked) {
                    this.buttonToggleGroup.value = value;
                }
                this._value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggle.prototype, "disabled", {
        get: /**
         * Whether the button is disabled.
         * @return {?}
         */
        function () {
            return this._disabled || (this.buttonToggleGroup != null && this.buttonToggleGroup.disabled) ||
                (this.buttonToggleGroupMultiple != null && this.buttonToggleGroupMultiple.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = _angular_cdk_coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatButtonToggle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.id == null) {
            this.id = "mat-button-toggle-" + _uniqueIdCounter++;
        }
        if (this.buttonToggleGroup && this._value == this.buttonToggleGroup.value) {
            this._checked = true;
        }
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    };
    /** Focuses the button. */
    /**
     * Focuses the button.
     * @return {?}
     */
    MatButtonToggle.prototype.focus = /**
     * Focuses the button.
     * @return {?}
     */
    function () {
        this._inputElement.nativeElement.focus();
    };
    /**
     * Toggle the state of the current button toggle.
     * @return {?}
     */
    MatButtonToggle.prototype._toggle = /**
     * Toggle the state of the current button toggle.
     * @return {?}
     */
    function () {
        this.checked = !this.checked;
    };
    /** Checks the button toggle due to an interaction with the underlying native input. */
    /**
     * Checks the button toggle due to an interaction with the underlying native input.
     * @param {?} event
     * @return {?}
     */
    MatButtonToggle.prototype._onInputChange = /**
     * Checks the button toggle due to an interaction with the underlying native input.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        if (this._isSingleSelector) {
            // Propagate the change one-way via the group, which will in turn mark this
            // button toggle as checked.
            var /** @type {?} */ groupValueChanged = this.buttonToggleGroup.selected != this;
            this.checked = true;
            this.buttonToggleGroup.selected = this;
            this.buttonToggleGroup._onTouched();
            if (groupValueChanged) {
                this.buttonToggleGroup._emitChangeEvent();
            }
        }
        else {
            this._toggle();
        }
        // Emit a change event when the native input does.
        this._emitChangeEvent();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatButtonToggle.prototype._onInputClick = /**
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
    /**
     * Dispatch change event with current value.
     * @return {?}
     */
    MatButtonToggle.prototype._emitChangeEvent = /**
     * Dispatch change event with current value.
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = new MatButtonToggleChange();
        event.source = this;
        event.value = this._value;
        this.change.emit(event);
    };
    // Unregister buttonToggleDispatcherListener on destroy
    /**
     * @return {?}
     */
    MatButtonToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._removeUniqueSelectionListener();
    };
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     */
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    MatButtonToggle.prototype._markForCheck = /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    function () {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update button toggle's status
        this._changeDetectorRef.markForCheck();
    };
    MatButtonToggle.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-button-toggle',
                    template: "<label [attr.for]=\"inputId\" class=\"mat-button-toggle-label\"><input #input class=\"mat-button-toggle-input cdk-visually-hidden\" [type]=\"_type\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled || null\" [name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (change)=\"_onInputChange($event)\" (click)=\"_onInputClick($event)\"><div class=\"mat-button-toggle-label-content\"><ng-content></ng-content></div></label><div class=\"mat-button-toggle-focus-overlay\"></div>",
                    styles: [".mat-button-toggle-group,.mat-button-toggle-standalone{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);position:relative;display:inline-flex;flex-direction:row;border-radius:2px;cursor:pointer;white-space:nowrap;overflow:hidden}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle-disabled .mat-button-toggle-label-content{cursor:default}.mat-button-toggle{white-space:nowrap;position:relative}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay,.mat-button-toggle.cdk-program-focused .mat-button-toggle-focus-overlay{opacity:1}.mat-button-toggle-label-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline-block;line-height:36px;padding:0 16px;cursor:pointer}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{border-radius:inherit;pointer-events:none;opacity:0;top:0;left:0;right:0;bottom:0;position:absolute}"],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    exportAs: 'matButtonToggle',
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.mat-button-toggle-standalone]': '!buttonToggleGroup && !buttonToggleGroupMultiple',
                        '[class.mat-button-toggle-checked]': 'checked',
                        '[class.mat-button-toggle-disabled]': 'disabled',
                        'class': 'mat-button-toggle',
                        '[attr.id]': 'id',
                    }
                },] },
    ];
    /** @nocollapse */
    MatButtonToggle.ctorParameters = function () { return [
        { type: MatButtonToggleGroup, decorators: [{ type: _angular_core.Optional },] },
        { type: MatButtonToggleGroupMultiple, decorators: [{ type: _angular_core.Optional },] },
        { type: _angular_core.ChangeDetectorRef, },
        { type: _angular_cdk_collections.UniqueSelectionDispatcher, },
        { type: _angular_core.ElementRef, },
        { type: _angular_cdk_a11y.FocusMonitor, },
    ]; };
    MatButtonToggle.propDecorators = {
        "ariaLabel": [{ type: _angular_core.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: _angular_core.Input, args: ['aria-labelledby',] },],
        "_inputElement": [{ type: _angular_core.ViewChild, args: ['input',] },],
        "id": [{ type: _angular_core.Input },],
        "name": [{ type: _angular_core.Input },],
        "checked": [{ type: _angular_core.Input },],
        "value": [{ type: _angular_core.Input },],
        "disabled": [{ type: _angular_core.Input },],
        "change": [{ type: _angular_core.Output },],
    };
    return MatButtonToggle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatButtonToggleModule = /** @class */ (function () {
    function MatButtonToggleModule() {
    }
    MatButtonToggleModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_material_core.MatCommonModule, _angular_cdk_a11y.A11yModule],
                    exports: [
                        MatButtonToggleGroup,
                        MatButtonToggleGroupMultiple,
                        MatButtonToggle,
                        _angular_material_core.MatCommonModule,
                    ],
                    declarations: [MatButtonToggleGroup, MatButtonToggleGroupMultiple, MatButtonToggle],
                    providers: [_angular_cdk_collections.UNIQUE_SELECTION_DISPATCHER_PROVIDER]
                },] },
    ];
    /** @nocollapse */
    MatButtonToggleModule.ctorParameters = function () { return []; };
    return MatButtonToggleModule;
}());

exports.MatButtonToggleGroupBase = MatButtonToggleGroupBase;
exports._MatButtonToggleGroupMixinBase = _MatButtonToggleGroupMixinBase;
exports.MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR;
exports.MatButtonToggleChange = MatButtonToggleChange;
exports.MatButtonToggleGroup = MatButtonToggleGroup;
exports.MatButtonToggleGroupMultiple = MatButtonToggleGroupMultiple;
exports.MatButtonToggle = MatButtonToggle;
exports.MatButtonToggleModule = MatButtonToggleModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-button-toggle.umd.js.map
