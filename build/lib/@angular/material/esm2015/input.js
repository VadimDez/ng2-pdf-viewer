/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform, PlatformModule, getSupportedInputTypes } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Inject, InjectionToken, Input, NgModule, NgZone, Optional, Self } from '@angular/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { auditTime } from 'rxjs/operators/auditTime';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState } from '@angular/material/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Directive to automatically resize a textarea to fit its content.
 */
class MatTextareaAutosize {
    /**
     * @param {?} _elementRef
     * @param {?} _platform
     * @param {?=} _ngZone
     */
    constructor(_elementRef, _platform, _ngZone) {
        this._elementRef = _elementRef;
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._destroyed = new Subject();
    }
    /**
     * Minimum amount of rows in the textarea.
     * @return {?}
     */
    get minRows() { return this._minRows; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minRows(value) {
        this._minRows = value;
        this._setMinHeight();
    }
    /**
     * Maximum amount of rows in the textarea.
     * @return {?}
     */
    get maxRows() { return this._maxRows; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxRows(value) {
        this._maxRows = value;
        this._setMaxHeight();
    }
    /**
     * Sets the minimum height of the textarea as determined by minRows.
     * @return {?}
     */
    _setMinHeight() {
        const /** @type {?} */ minHeight = this.minRows && this._cachedLineHeight ?
            `${this.minRows * this._cachedLineHeight}px` : null;
        if (minHeight) {
            this._setTextareaStyle('minHeight', minHeight);
        }
    }
    /**
     * Sets the maximum height of the textarea as determined by maxRows.
     * @return {?}
     */
    _setMaxHeight() {
        const /** @type {?} */ maxHeight = this.maxRows && this._cachedLineHeight ?
            `${this.maxRows * this._cachedLineHeight}px` : null;
        if (maxHeight) {
            this._setTextareaStyle('maxHeight', maxHeight);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._platform.isBrowser) {
            this.resizeToFitContent();
            if (this._ngZone) {
                this._ngZone.runOutsideAngular(() => {
                    fromEvent(window, 'resize')
                        .pipe(auditTime(16), takeUntil(this._destroyed))
                        .subscribe(() => this.resizeToFitContent(true));
                });
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * Sets a style property on the textarea element.
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    _setTextareaStyle(property, value) {
        const /** @type {?} */ textarea = /** @type {?} */ (this._elementRef.nativeElement);
        textarea.style[property] = value;
    }
    /**
     * Cache the height of a single-row textarea if it has not already been cached.
     *
     * We need to know how large a single "row" of a textarea is in order to apply minRows and
     * maxRows. For the initial version, we will assume that the height of a single line in the
     * textarea does not ever change.
     * @return {?}
     */
    _cacheTextareaLineHeight() {
        if (this._cachedLineHeight) {
            return;
        }
        let /** @type {?} */ textarea = /** @type {?} */ (this._elementRef.nativeElement);
        // Use a clone element because we have to override some styles.
        let /** @type {?} */ textareaClone = /** @type {?} */ (textarea.cloneNode(false));
        textareaClone.rows = 1;
        // Use `position: absolute` so that this doesn't cause a browser layout and use
        // `visibility: hidden` so that nothing is rendered. Clear any other styles that
        // would affect the height.
        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '0';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        // In Firefox it happens that textarea elements are always bigger than the specified amount
        // of rows. This is because Firefox tries to add extra space for the horizontal scrollbar.
        // As a workaround that removes the extra space for the scrollbar, we can just set overflow
        // to hidden. This ensures that there is no invalid calculation of the line height.
        // See Firefox bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=33654
        textareaClone.style.overflow = 'hidden'; /** @type {?} */
        ((textarea.parentNode)).appendChild(textareaClone);
        this._cachedLineHeight = textareaClone.clientHeight; /** @type {?} */
        ((textarea.parentNode)).removeChild(textareaClone);
        // Min and max heights have to be re-calculated if the cached line height changes
        this._setMinHeight();
        this._setMaxHeight();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._platform.isBrowser) {
            this.resizeToFitContent();
        }
    }
    /**
     * Resize the textarea to fit its content.
     * @param {?=} force Whether to force a height recalculation. By default the height will be
     *    recalculated only if the value changed since the last call.
     * @return {?}
     */
    resizeToFitContent(force = false) {
        this._cacheTextareaLineHeight();
        // If we haven't determined the line-height yet, we know we're still hidden and there's no point
        // in checking the height of the textarea.
        if (!this._cachedLineHeight) {
            return;
        }
        const /** @type {?} */ textarea = /** @type {?} */ (this._elementRef.nativeElement);
        const /** @type {?} */ value = textarea.value;
        // Only resize of the value changed since these calculations can be expensive.
        if (value === this._previousValue && !force) {
            return;
        }
        const /** @type {?} */ placeholderText = textarea.placeholder;
        // Reset the textarea height to auto in order to shrink back to its default size.
        // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
        // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
        // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
        // need to be removed temporarily.
        textarea.style.height = 'auto';
        textarea.style.overflow = 'hidden';
        textarea.placeholder = '';
        // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflow = '';
        textarea.placeholder = placeholderText;
        this._previousValue = value;
    }
}
MatTextareaAutosize.decorators = [
    { type: Directive, args: [{
                selector: `textarea[mat-autosize], textarea[matTextareaAutosize]`,
                exportAs: 'matTextareaAutosize',
                host: {
                    'class': 'mat-autosize',
                    // Textarea elements that have the directive applied should have a single row by default.
                    // Browsers normally show two rows by default and therefore this limits the minRows binding.
                    'rows': '1',
                },
            },] },
];
/** @nocollapse */
MatTextareaAutosize.ctorParameters = () => [
    { type: ElementRef, },
    { type: Platform, },
    { type: NgZone, },
];
MatTextareaAutosize.propDecorators = {
    "minRows": [{ type: Input, args: ['matAutosizeMinRows',] },],
    "maxRows": [{ type: Input, args: ['matAutosizeMaxRows',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 * @param {?} type
 * @return {?}
 */
function getMatInputUnsupportedTypeError(type) {
    return Error(`Input type "${type}" isn't supported by matInput.`);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * This token is used to inject the object whose value should be set into `MatInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `MatInput` delegate the getting and setting of the
 * value to them.
 */
const MAT_INPUT_VALUE_ACCESSOR = new InjectionToken('MAT_INPUT_VALUE_ACCESSOR');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

// Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.
const MAT_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
let nextUniqueId = 0;
/**
 * \@docs-private
 */
class MatInputBase {
    /**
     * @param {?} _defaultErrorStateMatcher
     * @param {?} _parentForm
     * @param {?} _parentFormGroup
     * @param {?} ngControl
     */
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const _MatInputMixinBase = mixinErrorState(MatInputBase);
/**
 * Directive that allows a native input to work inside a `MatFormField`.
 */
class MatInput extends _MatInputMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _platform
     * @param {?} ngControl
     * @param {?} _parentForm
     * @param {?} _parentFormGroup
     * @param {?} _defaultErrorStateMatcher
     * @param {?} inputValueAccessor
     */
    constructor(_elementRef, _platform, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this._platform = _platform;
        this.ngControl = ngControl;
        /**
         * Variables used as cache for getters and setters.
         */
        this._type = 'text';
        this._disabled = false;
        this._required = false;
        this._uid = `mat-input-${nextUniqueId++}`;
        this._readonly = false;
        /**
         * Whether the input is focused.
         */
        this.focused = false;
        /**
         * Whether the component is being rendered on the server.
         */
        this._isServer = false;
        /**
         * Stream that emits whenever the state of the input changes such that the wrapping `MatFormField`
         * needs to run change detection.
         */
        this.stateChanges = new Subject();
        /**
         * A name for this control that can be used by `mat-form-field`.
         */
        this.controlType = 'mat-input';
        /**
         * Placeholder attribute of the element.
         */
        this.placeholder = '';
        this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(t => getSupportedInputTypes().has(t));
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this._inputValueAccessor = inputValueAccessor || this._elementRef.nativeElement;
        this._previousNativeValue = this.value;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
        // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
        // exists on iOS, we only bother to install the listener on iOS.
        if (_platform.IOS) {
            _elementRef.nativeElement.addEventListener('keyup', (event) => {
                let /** @type {?} */ el = /** @type {?} */ (event.target);
                if (!el.value && !el.selectionStart && !el.selectionEnd) {
                    // Note: Just setting `0, 0` doesn't fix the issue. Setting `1, 1` fixes it for the first
                    // time that you type text and then hold delete. Toggling to `1, 1` and then back to
                    // `0, 0` seems to completely fix it.
                    el.setSelectionRange(1, 1);
                    el.setSelectionRange(0, 0);
                }
            });
        }
        this._isServer = !this._platform.isBrowser;
    }
    /**
     * Whether the element is disabled.
     * @return {?}
     */
    get disabled() { return this.ngControl ? this.ngControl.disabled : this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    /**
     * Unique id of the element.
     * @return {?}
     */
    get id() { return this._id; }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) { this._id = value || this._uid; }
    /**
     * Whether the element is required.
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Input type of the element.
     * @return {?}
     */
    get type() { return this._type; }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value || 'text';
        this._validateType();
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }
    /**
     * The input element's value.
     * @return {?}
     */
    get value() { return this._inputValueAccessor.value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    /**
     * Whether the element is readonly.
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} value
     * @return {?}
     */
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        else {
            // When the input isn't used together with `@angular/forms`, we need to check manually for
            // changes to the native `value` property in order to update the floating label.
            this._dirtyCheckNativeValue();
        }
    }
    /**
     * @return {?}
     */
    focus() { this._elementRef.nativeElement.focus(); }
    /**
     * Callback for the cases where the focused state of the input changes.
     * @param {?} isFocused
     * @return {?}
     */
    _focusChanged(isFocused) {
        if (isFocused !== this.focused && !this.readonly) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    /**
     * @return {?}
     */
    _onInput() {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    }
    /**
     * Does some manual dirty checking on the native input `value` property.
     * @return {?}
     */
    _dirtyCheckNativeValue() {
        const /** @type {?} */ newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /**
     * Make sure the input is a supported type.
     * @return {?}
     */
    _validateType() {
        if (MAT_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMatInputUnsupportedTypeError(this._type);
        }
    }
    /**
     * Checks whether the input type is one of the types that are never empty.
     * @return {?}
     */
    _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /**
     * Checks whether the input is invalid based on the native validation.
     * @return {?}
     */
    _isBadInput() {
        // The `validity` property won't be present on platform-server.
        let /** @type {?} */ validity = (/** @type {?} */ (this._elementRef.nativeElement)).validity;
        return validity && validity.badInput;
    }
    /**
     * Determines if the component host is a textarea. If not recognizable it returns false.
     * @return {?}
     */
    _isTextarea() {
        let /** @type {?} */ nativeElement = this._elementRef.nativeElement;
        // In Universal, we don't have access to `nodeName`, but the same can be achieved with `name`.
        // Note that this shouldn't be necessary once Angular switches to an API that resembles the
        // DOM closer.
        let /** @type {?} */ nodeName = this._platform.isBrowser ? nativeElement.nodeName : nativeElement.name;
        return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
    }
    /**
     * @return {?}
     */
    get empty() {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput();
    }
    /**
     * @return {?}
     */
    get shouldLabelFloat() { return this.focused || !this.empty; }
    /**
     * @param {?} ids
     * @return {?}
     */
    setDescribedByIds(ids) { this._ariaDescribedby = ids.join(' '); }
    /**
     * @return {?}
     */
    onContainerClick() { this.focus(); }
}
MatInput.decorators = [
    { type: Directive, args: [{
                selector: `input[matInput], textarea[matInput]`,
                exportAs: 'matInput',
                host: {
                    'class': 'mat-input-element mat-form-field-autofill-control',
                    '[class.mat-input-server]': '_isServer',
                    // Native input properties that are overwritten by Angular inputs need to be synced with
                    // the native input element. Otherwise property bindings for those don't work.
                    '[attr.id]': 'id',
                    '[placeholder]': 'placeholder',
                    '[disabled]': 'disabled',
                    '[required]': 'required',
                    '[readonly]': 'readonly',
                    '[attr.aria-describedby]': '_ariaDescribedby || null',
                    '[attr.aria-invalid]': 'errorState',
                    '[attr.aria-required]': 'required.toString()',
                    '(blur)': '_focusChanged(false)',
                    '(focus)': '_focusChanged(true)',
                    '(input)': '_onInput()',
                },
                providers: [{ provide: MatFormFieldControl, useExisting: MatInput }],
            },] },
];
/** @nocollapse */
MatInput.ctorParameters = () => [
    { type: ElementRef, },
    { type: Platform, },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self },] },
    { type: NgForm, decorators: [{ type: Optional },] },
    { type: FormGroupDirective, decorators: [{ type: Optional },] },
    { type: ErrorStateMatcher, },
    { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MAT_INPUT_VALUE_ACCESSOR,] },] },
];
MatInput.propDecorators = {
    "disabled": [{ type: Input },],
    "id": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "required": [{ type: Input },],
    "type": [{ type: Input },],
    "errorStateMatcher": [{ type: Input },],
    "value": [{ type: Input },],
    "readonly": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class MatInputModule {
}
MatInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MatInput,
                    MatTextareaAutosize,
                ],
                imports: [
                    CommonModule,
                    MatFormFieldModule,
                    PlatformModule,
                ],
                exports: [
                    MatFormFieldModule,
                    MatInput,
                    MatTextareaAutosize,
                ],
                providers: [ErrorStateMatcher],
            },] },
];
/** @nocollapse */
MatInputModule.ctorParameters = () => [];

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

export { MatInputModule, MatTextareaAutosize, MatInputBase, _MatInputMixinBase, MatInput, getMatInputUnsupportedTypeError, MAT_INPUT_VALUE_ACCESSOR };
//# sourceMappingURL=input.js.map
