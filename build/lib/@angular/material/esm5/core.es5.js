/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, Injectable, InjectionToken, Input, LOCALE_ID, NgModule, NgZone, Optional, Output, ViewEncapsulation, isDevMode } from '@angular/core';
import { BidiModule } from '@angular/cdk/bidi';
import { __assign, __extends } from 'tslib';
import * as tslib_1 from 'tslib';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs/Subject';
import { HammerGestureConfig } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Platform, PlatformModule, supportsPassiveEventListeners } from '@angular/cdk/platform';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
var AnimationCurves = /** @class */ (function () {
    function AnimationCurves() {
    }
    AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
    AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
    AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
    AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
    return AnimationCurves;
}());
/**
 * \@docs-private
 */
var AnimationDurations = /** @class */ (function () {
    function AnimationDurations() {
    }
    AnimationDurations.COMPLEX = '375ms';
    AnimationDurations.ENTERING = '225ms';
    AnimationDurations.EXITING = '195ms';
    return AnimationDurations;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Injection token that configures whether the Material sanity checks are enabled.
 */
var MATERIAL_SANITY_CHECKS = new InjectionToken('mat-sanity-checks');
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
var MatCommonModule = /** @class */ (function () {
    function MatCommonModule(_sanityChecksEnabled) {
        this._sanityChecksEnabled = _sanityChecksEnabled;
        /**
         * Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
         */
        this._hasDoneGlobalChecks = false;
        /**
         * Whether we've already checked for HammerJs availability.
         */
        this._hasCheckedHammer = false;
        /**
         * Reference to the global `document` object.
         */
        this._document = typeof document === 'object' && document ? document : null;
        /**
         * Reference to the global 'window' object.
         */
        this._window = typeof window === 'object' && window ? window : null;
        if (this._areChecksEnabled() && !this._hasDoneGlobalChecks) {
            this._checkDoctypeIsDefined();
            this._checkThemeIsPresent();
            this._hasDoneGlobalChecks = true;
        }
    }
    /**
     * Whether any sanity checks are enabled
     * @return {?}
     */
    MatCommonModule.prototype._areChecksEnabled = /**
     * Whether any sanity checks are enabled
     * @return {?}
     */
    function () {
        return this._sanityChecksEnabled && isDevMode() && !this._isTestEnv();
    };
    /**
     * Whether the code is running in tests.
     * @return {?}
     */
    MatCommonModule.prototype._isTestEnv = /**
     * Whether the code is running in tests.
     * @return {?}
     */
    function () {
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    };
    /**
     * @return {?}
     */
    MatCommonModule.prototype._checkDoctypeIsDefined = /**
     * @return {?}
     */
    function () {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    };
    /**
     * @return {?}
     */
    MatCommonModule.prototype._checkThemeIsPresent = /**
     * @return {?}
     */
    function () {
        if (this._document && typeof getComputedStyle === 'function') {
            var /** @type {?} */ testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            var /** @type {?} */ computedStyle = getComputedStyle(testElement);
            // In some situations, the computed style of the test element can be null. For example in
            // Firefox, the computed style is null if an application is running inside of a hidden iframe.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
            if (computedStyle && computedStyle.display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    };
    /** Checks whether HammerJS is available. */
    /**
     * Checks whether HammerJS is available.
     * @return {?}
     */
    MatCommonModule.prototype._checkHammerIsAvailable = /**
     * Checks whether HammerJS is available.
     * @return {?}
     */
    function () {
        if (this._hasCheckedHammer || !this._window) {
            return;
        }
        if (this._areChecksEnabled() && !this._window['Hammer']) {
            console.warn('Could not find HammerJS. Certain Angular Material components may not work correctly.');
        }
        this._hasCheckedHammer = true;
    };
    MatCommonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BidiModule],
                    exports: [BidiModule],
                    providers: [{
                            provide: MATERIAL_SANITY_CHECKS, useValue: true,
                        }],
                },] },
    ];
    /** @nocollapse */
    MatCommonModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_SANITY_CHECKS,] },] },
    ]; };
    return MatCommonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 * @record
 */

/**
 * Mixin to augment a directive with a `disabled` property.
 * @template T
 * @param {?} base
 * @return {?}
 */
function mixinDisabled(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._disabled = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._disabled = coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 * @record
 */

/**
 * \@docs-private
 * @record
 */

/**
 * Mixin to augment a directive with a `color` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultColor
 * @return {?}
 */
function mixinColor(base, defaultColor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            // Set the default color that can be specified from the mixin.
            // Set the default color that can be specified from the mixin.
            _this.color = defaultColor;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "color", {
            get: /**
             * @return {?}
             */
            function () { return this._color; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var /** @type {?} */ colorPalette = value || defaultColor;
                if (colorPalette !== this._color) {
                    if (this._color) {
                        this._elementRef.nativeElement.classList.remove("mat-" + this._color);
                    }
                    if (colorPalette) {
                        this._elementRef.nativeElement.classList.add("mat-" + colorPalette);
                    }
                    this._color = colorPalette;
                }
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 * @record
 */

/**
 * Mixin to augment a directive with a `disableRipple` property.
 * @template T
 * @param {?} base
 * @return {?}
 */
function mixinDisableRipple(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._disableRipple = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disableRipple", {
            /** Whether the ripple effect is disabled or not. */
            get: /**
             * Whether the ripple effect is disabled or not.
             * @return {?}
             */
            function () { return this._disableRipple; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._disableRipple = coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 * @record
 */

/**
 * Mixin to augment a directive with a `tabIndex` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultTabIndex
 * @return {?}
 */
function mixinTabIndex(base, defaultTabIndex) {
    if (defaultTabIndex === void 0) { defaultTabIndex = 0; }
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._tabIndex = defaultTabIndex;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "tabIndex", {
            get: /**
             * @return {?}
             */
            function () { return this.disabled ? -1 : this._tabIndex; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                // If the specified tabIndex value is null or undefined, fall back to the default value.
                this._tabIndex = value != null ? value : defaultTabIndex;
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 * @record
 */

/**
 * \@docs-private
 * @record
 */

/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 * @template T
 * @param {?} base
 * @return {?}
 */
function mixinErrorState(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            /**
             * Whether the component is in an error state.
             */
            _this.errorState = false;
            /**
             * Stream that emits whenever the state of the input changes such that the wrapping
             * `MatFormField needs to run change detection.
             */
            _this.stateChanges = new Subject();
            return _this;
        }
        /**
         * @return {?}
         */
        class_1.prototype.updateErrorState = /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ oldState = this.errorState;
            var /** @type {?} */ parent = this._parentFormGroup || this._parentForm;
            var /** @type {?} */ matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
            var /** @type {?} */ control = this.ngControl ? /** @type {?} */ (this.ngControl.control) : null;
            var /** @type {?} */ newState = matcher.isErrorState(control, parent);
            if (newState !== oldState) {
                this.errorState = newState;
                this.stateChanges.next();
            }
        };
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * InjectionToken for datepicker that can be used to override default locale code.
 */
var MAT_DATE_LOCALE = new InjectionToken('MAT_DATE_LOCALE');
/**
 * Provider for MAT_DATE_LOCALE injection token.
 */
var MAT_DATE_LOCALE_PROVIDER = { provide: MAT_DATE_LOCALE, useExisting: LOCALE_ID };
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 */
var DateAdapter = /** @class */ (function () {
    function DateAdapter() {
        this._localeChanges = new Subject();
    }
    Object.defineProperty(DateAdapter.prototype, "localeChanges", {
        /** A stream that emits when the locale changes. */
        get: /**
         * A stream that emits when the locale changes.
         * @return {?}
         */
        function () { return this._localeChanges; },
        enumerable: true,
        configurable: true
    });
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value The value to be deserialized into a date object.
     * @return {?} The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    DateAdapter.prototype.deserialize = /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value The value to be deserialized into a date object.
     * @return {?} The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    function (value) {
        if (value == null || this.isDateInstance(value) && this.isValid(value)) {
            return value;
        }
        return this.invalid();
    };
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    DateAdapter.prototype.setLocale = /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    function (locale) {
        this.locale = locale;
        this._localeChanges.next();
    };
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    DateAdapter.prototype.compareDate = /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    function (first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    DateAdapter.prototype.sameDate = /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    function (first, second) {
        if (first && second) {
            var /** @type {?} */ firstValid = this.isValid(first);
            var /** @type {?} */ secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second);
            }
            return firstValid == secondValid;
        }
        return first == second;
    };
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    DateAdapter.prototype.clampDate = /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    function (date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MAT_DATE_FORMATS = new InjectionToken('mat-date-formats');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Whether the browser supports the Intl API.
 */
var SUPPORTS_INTL_API = typeof Intl != 'undefined';
/**
 * The default month names to use if Intl API is not available.
 */
var DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
var ɵ0$1 = function (i) { return String(i + 1); };
/**
 * The default date names to use if Intl API is not available.
 */
var DEFAULT_DATE_NAMES = range(31, ɵ0$1);
/**
 * The default day of the week names to use if Intl API is not available.
 */
var DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    var /** @type {?} */ valuesArray = Array(length);
    for (var /** @type {?} */ i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
var NativeDateAdapter = /** @class */ (function (_super) {
    __extends(NativeDateAdapter, _super);
    function NativeDateAdapter(matDateLocale) {
        var _this = _super.call(this) || this;
        _super.prototype.setLocale.call(_this, matDateLocale);
        // IE does its own time zone correction, so we disable this on IE.
        // TODO(mmalerba): replace with !platform.TRIDENT, logic currently duplicated to avoid breaking
        // change from injecting the Platform.
        // IE does its own time zone correction, so we disable this on IE.
        // TODO(mmalerba): replace with !platform.TRIDENT, logic currently duplicated to avoid breaking
        // change from injecting the Platform.
        _this.useUtcForDisplay = !(typeof document === 'object' && !!document &&
            /(msie|trident)/i.test(navigator.userAgent));
        return _this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getFullYear();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDay();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_1 = new Intl.DateTimeFormat(this.locale, { month: style });
            return range(12, function (i) { return _this._stripDirectionalityCharacters(dtf_1.format(new Date(2017, i, 1))); });
        }
        return DEFAULT_MONTH_NAMES[style];
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_2 = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
            return range(31, function (i) {
                return _this._stripDirectionalityCharacters(dtf_2.format(new Date(2017, 0, i + 1)));
            });
        }
        return DEFAULT_DATE_NAMES;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_3 = new Intl.DateTimeFormat(this.locale, { weekday: style });
            return range(7, function (i) {
                return _this._stripDirectionalityCharacters(dtf_3.format(new Date(2017, 0, i + 1)));
            });
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return String(this.getYear(date));
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        var /** @type {?} */ result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() != month) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.today = /**
     * @return {?}
     */
    function () {
        return new Date();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NativeDateAdapter.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value == 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    NativeDateAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('NativeDateAdapter: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            if (this.useUtcForDisplay) {
                date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
                displayFormat = __assign({}, displayFormat, { timeZone: 'utc' });
            }
            var /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        var /** @type {?} */ newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    };
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    NativeDateAdapter.prototype.deserialize = /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                var /** @type {?} */ date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return _super.prototype.deserialize.call(this, value);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NativeDateAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj instanceof Date;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return !isNaN(date.getTime());
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return new Date(NaN);
    };
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype._createDateWithOverflow = /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        var /** @type {?} */ result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    NativeDateAdapter.prototype._2digit = /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    function (n) {
        return ('00' + n).slice(-2);
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    NativeDateAdapter.prototype._stripDirectionalityCharacters = /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    function (str) {
        return str.replace(/[\u200e\u200f]/g, '');
    };
    NativeDateAdapter.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NativeDateAdapter.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] },] },
    ]; };
    return NativeDateAdapter;
}(DateAdapter));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MAT_NATIVE_DATE_FORMATS = {
    parse: {
        dateInput: null,
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var NativeDateModule = /** @class */ (function () {
    function NativeDateModule() {
    }
    NativeDateModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        { provide: DateAdapter, useClass: NativeDateAdapter },
                        MAT_DATE_LOCALE_PROVIDER
                    ],
                },] },
    ];
    /** @nocollapse */
    NativeDateModule.ctorParameters = function () { return []; };
    return NativeDateModule;
}());
var ɵ0$$1 = MAT_NATIVE_DATE_FORMATS;
var MatNativeDateModule = /** @class */ (function () {
    function MatNativeDateModule() {
    }
    MatNativeDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [NativeDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0$$1 }],
                },] },
    ];
    /** @nocollapse */
    MatNativeDateModule.ctorParameters = function () { return []; };
    return MatNativeDateModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Error state matcher that matches when a control is invalid and dirty.
 */
var ShowOnDirtyErrorStateMatcher = /** @class */ (function () {
    function ShowOnDirtyErrorStateMatcher() {
    }
    /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    ShowOnDirtyErrorStateMatcher.prototype.isErrorState = /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    function (control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    };
    ShowOnDirtyErrorStateMatcher.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ShowOnDirtyErrorStateMatcher.ctorParameters = function () { return []; };
    return ShowOnDirtyErrorStateMatcher;
}());
/**
 * Provider that defines how form controls behave with regards to displaying error messages.
 */
var ErrorStateMatcher = /** @class */ (function () {
    function ErrorStateMatcher() {
    }
    /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    ErrorStateMatcher.prototype.isErrorState = /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    function (control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    };
    ErrorStateMatcher.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ErrorStateMatcher.ctorParameters = function () { return []; };
    return ErrorStateMatcher;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Injection token that can be used to provide options to the Hammerjs instance.
 * More info at http://hammerjs.github.io/api/.
 */
var MAT_HAMMER_OPTIONS = new InjectionToken('MAT_HAMMER_OPTIONS');
var GestureConfig = /** @class */ (function (_super) {
    __extends(GestureConfig, _super);
    function GestureConfig(_hammerOptions, commonModule) {
        var _this = _super.call(this) || this;
        _this._hammerOptions = _hammerOptions;
        _this._hammer = typeof window !== 'undefined' ? (/** @type {?} */ (window)).Hammer : null;
        /* List of new event names to add to the gesture support list */
        _this.events = _this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (commonModule) {
            commonModule._checkHammerIsAvailable();
        }
        return _this;
    }
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param element Element to which to assign the new HammerJS gestures.
     * @returns Newly-created HammerJS instance.
     */
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    GestureConfig.prototype.buildHammer = /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    function (element) {
        var /** @type {?} */ mc = new this._hammer(element, this._hammerOptions || undefined);
        // Default Hammer Recognizers.
        var /** @type {?} */ pan = new this._hammer.Pan();
        var /** @type {?} */ swipe = new this._hammer.Swipe();
        var /** @type {?} */ press = new this._hammer.Press();
        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
        // Otherwise the previous `recognizeWith` will be dropped.
        // TODO: Confirm threshold numbers with Material Design UX Team
        var /** @type {?} */ slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        var /** @type {?} */ longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return /** @type {?} */ (mc);
    };
    /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    GestureConfig.prototype._createRecognizer = /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    function (base, options) {
        var inheritances = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            inheritances[_i - 2] = arguments[_i];
        }
        var /** @type {?} */ recognizer = new (/** @type {?} */ (base.constructor))(options);
        inheritances.push(base);
        inheritances.forEach(function (item) { return recognizer.recognizeWith(item); });
        return recognizer;
    };
    GestureConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GestureConfig.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_HAMMER_OPTIONS,] },] },
        { type: MatCommonModule, decorators: [{ type: Optional },] },
    ]; };
    return GestureConfig;
}(HammerGestureConfig));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(MatLine) query, then
 * counted by checking the query list's length.
 */
var MatLine = /** @class */ (function () {
    function MatLine() {
    }
    MatLine.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-line], [matLine]',
                    host: { 'class': 'mat-line' }
                },] },
    ];
    /** @nocollapse */
    MatLine.ctorParameters = function () { return []; };
    return MatLine;
}());
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
var MatLineSetter = /** @class */ (function () {
    function MatLineSetter(_lines, _element) {
        var _this = this;
        this._lines = _lines;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    MatLineSetter.prototype._setLineClass = /**
     * @param {?} count
     * @return {?}
     */
    function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mat-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mat-multi-line", true);
        }
    };
    /**
     * @return {?}
     */
    MatLineSetter.prototype._resetClasses = /**
     * @return {?}
     */
    function () {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    };
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    MatLineSetter.prototype._setClass = /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    function (className, isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add(className);
        }
        else {
            this._element.nativeElement.classList.remove(className);
        }
    };
    return MatLineSetter;
}());
var MatLineModule = /** @class */ (function () {
    function MatLineModule() {
    }
    MatLineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule],
                    exports: [MatLine, MatCommonModule],
                    declarations: [MatLine],
                },] },
    ];
    /** @nocollapse */
    MatLineModule.ctorParameters = function () { return []; };
    return MatLineModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/** @enum {number} */
var RippleState = {
    FADING_IN: 0,
    VISIBLE: 1,
    FADING_OUT: 2,
    HIDDEN: 3,
};
RippleState[RippleState.FADING_IN] = "FADING_IN";
RippleState[RippleState.VISIBLE] = "VISIBLE";
RippleState[RippleState.FADING_OUT] = "FADING_OUT";
RippleState[RippleState.HIDDEN] = "HIDDEN";
/**
 * Reference to a previously launched ripple element.
 */
var RippleRef = /** @class */ (function () {
    function RippleRef(_renderer, element, config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /**
         * Current state of the ripple reference.
         */
        this.state = RippleState.HIDDEN;
    }
    /** Fades out the ripple element. */
    /**
     * Fades out the ripple element.
     * @return {?}
     */
    RippleRef.prototype.fadeOut = /**
     * Fades out the ripple element.
     * @return {?}
     */
    function () {
        this._renderer.fadeOutRipple(this);
    };
    return RippleRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Fade-in duration for the ripples. Can be modified with the speedFactor option.
 */
var RIPPLE_FADE_IN_DURATION = 450;
/**
 * Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor.
 */
var RIPPLE_FADE_OUT_DURATION = 400;
/**
 * Timeout for ignoring mouse events. Mouse events will be temporary ignored after touch
 * events to avoid synthetic mouse events.
 */
var IGNORE_MOUSE_EVENTS_TIMEOUT = 800;
/**
 * Interface that describes the target for launching ripples.
 * It defines the ripple configuration and disabled state for interaction ripples.
 * \@docs-private
 * @record
 */

/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
var RippleRenderer = /** @class */ (function () {
    function RippleRenderer(_target, _ngZone, elementRef, platform) {
        var _this = this;
        this._target = _target;
        this._ngZone = _ngZone;
        /**
         * Whether the pointer is currently down or not.
         */
        this._isPointerDown = false;
        /**
         * Events to be registered on the trigger element.
         */
        this._triggerEvents = new Map();
        /**
         * Set of currently active ripple references.
         */
        this._activeRipples = new Set();
        /**
         * Options that apply to all the event listeners that are bound by the renderer.
         */
        this._eventOptions = supportsPassiveEventListeners() ? (/** @type {?} */ ({ passive: true })) : false;
        /**
         * Ripple config for all ripples created by events.
         */
        this.rippleConfig = {};
        /**
         * Function being called whenever the trigger is being pressed using mouse.
         */
        this.onMousedown = function (event) {
            var /** @type {?} */ isSyntheticEvent = _this._lastTouchStartEvent &&
                Date.now() < _this._lastTouchStartEvent + IGNORE_MOUSE_EVENTS_TIMEOUT;
            if (!_this._target.rippleDisabled && !isSyntheticEvent) {
                _this._isPointerDown = true;
                _this.fadeInRipple(event.clientX, event.clientY, _this._target.rippleConfig);
            }
        };
        /**
         * Function being called whenever the trigger is being pressed using touch.
         */
        this.onTouchStart = function (event) {
            if (!_this._target.rippleDisabled) {
                // Some browsers fire mouse events after a `touchstart` event. Those synthetic mouse
                // events will launch a second ripple if we don't ignore mouse events for a specific
                // time after a touchstart event.
                // Some browsers fire mouse events after a `touchstart` event. Those synthetic mouse
                // events will launch a second ripple if we don't ignore mouse events for a specific
                // time after a touchstart event.
                _this._lastTouchStartEvent = Date.now();
                _this._isPointerDown = true;
                _this.fadeInRipple(event.touches[0].clientX, event.touches[0].clientY, _this._target.rippleConfig);
            }
        };
        /**
         * Function being called whenever the trigger is being released.
         */
        this.onPointerUp = function () {
            if (!_this._isPointerDown) {
                return;
            }
            _this._isPointerDown = false;
            // Fade-out all ripples that are completely visible and not persistent.
            // Fade-out all ripples that are completely visible and not persistent.
            _this._activeRipples.forEach(function (ripple) {
                if (!ripple.config.persistent && ripple.state === RippleState.VISIBLE) {
                    ripple.fadeOut();
                }
            });
        };
        // Only do anything if we're on the browser.
        if (platform.isBrowser) {
            this._containerElement = elementRef.nativeElement;
            // Specify events which need to be registered on the trigger.
            this._triggerEvents.set('mousedown', this.onMousedown);
            this._triggerEvents.set('mouseup', this.onPointerUp);
            this._triggerEvents.set('mouseleave', this.onPointerUp);
            this._triggerEvents.set('touchstart', this.onTouchStart);
            this._triggerEvents.set('touchend', this.onPointerUp);
        }
    }
    /**
     * Fades in a ripple at the given coordinates.
     * @param x Coordinate within the element, along the X axis at which to start the ripple.
     * @param y Coordinate within the element, along the Y axis at which to start the ripple.
     * @param config Extra ripple options.
     */
    /**
     * Fades in a ripple at the given coordinates.
     * @param {?} x Coordinate within the element, along the X axis at which to start the ripple.
     * @param {?} y Coordinate within the element, along the Y axis at which to start the ripple.
     * @param {?=} config Extra ripple options.
     * @return {?}
     */
    RippleRenderer.prototype.fadeInRipple = /**
     * Fades in a ripple at the given coordinates.
     * @param {?} x Coordinate within the element, along the X axis at which to start the ripple.
     * @param {?} y Coordinate within the element, along the Y axis at which to start the ripple.
     * @param {?=} config Extra ripple options.
     * @return {?}
     */
    function (x, y, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var /** @type {?} */ containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            x = containerRect.left + containerRect.width / 2;
            y = containerRect.top + containerRect.height / 2;
        }
        var /** @type {?} */ radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
        var /** @type {?} */ duration = RIPPLE_FADE_IN_DURATION / (config.speedFactor || 1);
        var /** @type {?} */ offsetX = x - containerRect.left;
        var /** @type {?} */ offsetY = y - containerRect.top;
        var /** @type {?} */ ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = offsetX - radius + "px";
        ripple.style.top = offsetY - radius + "px";
        ripple.style.height = radius * 2 + "px";
        ripple.style.width = radius * 2 + "px";
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color || null;
        ripple.style.transitionDuration = duration + "ms";
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        // Exposed reference to the ripple that will be returned.
        var /** @type {?} */ rippleRef = new RippleRef(this, ripple, config);
        rippleRef.state = RippleState.FADING_IN;
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.add(rippleRef);
        // Wait for the ripple element to be completely faded in.
        // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
        this.runTimeoutOutsideZone(function () {
            rippleRef.state = RippleState.VISIBLE;
            if (!config.persistent && !_this._isPointerDown) {
                rippleRef.fadeOut();
            }
        }, duration);
        return rippleRef;
    };
    /** Fades out a ripple reference. */
    /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    RippleRenderer.prototype.fadeOutRipple = /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    function (rippleRef) {
        // For ripples that are not active anymore, don't re-un the fade-out animation.
        if (!this._activeRipples.delete(rippleRef)) {
            return;
        }
        var /** @type {?} */ rippleEl = rippleRef.element;
        rippleEl.style.transitionDuration = RIPPLE_FADE_OUT_DURATION + "ms";
        rippleEl.style.opacity = '0';
        rippleRef.state = RippleState.FADING_OUT;
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(function () {
            rippleRef.state = RippleState.HIDDEN; /** @type {?} */
            ((rippleEl.parentNode)).removeChild(rippleEl);
        }, RIPPLE_FADE_OUT_DURATION);
    };
    /** Fades out all currently active ripples. */
    /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    RippleRenderer.prototype.fadeOutAll = /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    function () {
        this._activeRipples.forEach(function (ripple) { return ripple.fadeOut(); });
    };
    /** Sets up the trigger event listeners */
    /**
     * Sets up the trigger event listeners
     * @param {?} element
     * @return {?}
     */
    RippleRenderer.prototype.setupTriggerEvents = /**
     * Sets up the trigger event listeners
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        if (!element || element === this._triggerElement) {
            return;
        }
        // Remove all previously registeredevent listeners from the trigger element.
        this._removeTriggerEvents();
        this._ngZone.runOutsideAngular(function () {
            _this._triggerEvents.forEach(function (fn, type) {
                return element.addEventListener(type, fn, _this._eventOptions);
            });
        });
        this._triggerElement = element;
    };
    /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    RippleRenderer.prototype.runTimeoutOutsideZone = /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    function (fn, delay) {
        if (delay === void 0) { delay = 0; }
        this._ngZone.runOutsideAngular(function () { return setTimeout(fn, delay); });
    };
    /** Removes previously registered event listeners from the trigger element. */
    /**
     * Removes previously registered event listeners from the trigger element.
     * @return {?}
     */
    RippleRenderer.prototype._removeTriggerEvents = /**
     * Removes previously registered event listeners from the trigger element.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._triggerElement) {
            this._triggerEvents.forEach(function (fn, type) {
                /** @type {?} */ ((_this._triggerElement)).removeEventListener(type, fn, _this._eventOptions);
            });
        }
    };
    return RippleRenderer;
}());
/**
 * Enforces a style recalculation of a DOM element by computing its styles.
 * @param {?} element
 * @return {?}
 */
function enforceStyleRecalculation(element) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 * @param {?} x
 * @param {?} y
 * @param {?} rect
 * @return {?}
 */
function distanceToFurthestCorner(x, y, rect) {
    var /** @type {?} */ distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    var /** @type {?} */ distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Configurable options for `matRipple`.
 * @record
 */

/**
 * Injection token that can be used to specify the global ripple options.
 */
var MAT_RIPPLE_GLOBAL_OPTIONS = new InjectionToken('mat-ripple-global-options');
var MatRipple = /** @class */ (function () {
    function MatRipple(_elementRef, ngZone, platform, globalOptions) {
        this._elementRef = _elementRef;
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._disabled = false;
        /**
         * Whether ripple directive is initialized and the input bindings are set.
         */
        this._isInitialized = false;
        this._globalOptions = globalOptions || {};
        this._rippleRenderer = new RippleRenderer(this, ngZone, _elementRef, platform);
    }
    Object.defineProperty(MatRipple.prototype, "disabled", {
        get: /**
         * Whether click events will not trigger the ripple. Ripples can be still launched manually
         * by using the `launch()` method.
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value;
            this._setupTriggerEventsIfEnabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRipple.prototype, "trigger", {
        get: /**
         * The element that triggers the ripple when click events are received.
         * Defaults to the directive's host element.
         * @return {?}
         */
        function () { return this._trigger || this._elementRef.nativeElement; },
        set: /**
         * @param {?} trigger
         * @return {?}
         */
        function (trigger) {
            this._trigger = trigger;
            this._setupTriggerEventsIfEnabled();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatRipple.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._isInitialized = true;
        this._setupTriggerEventsIfEnabled();
    };
    /**
     * @return {?}
     */
    MatRipple.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._rippleRenderer._removeTriggerEvents();
    };
    /** Launches a manual ripple at the specified position. */
    /**
     * Launches a manual ripple at the specified position.
     * @param {?} x
     * @param {?} y
     * @param {?=} config
     * @return {?}
     */
    MatRipple.prototype.launch = /**
     * Launches a manual ripple at the specified position.
     * @param {?} x
     * @param {?} y
     * @param {?=} config
     * @return {?}
     */
    function (x, y, config) {
        if (config === void 0) { config = this; }
        return this._rippleRenderer.fadeInRipple(x, y, config);
    };
    /** Fades out all currently showing ripple elements. */
    /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    MatRipple.prototype.fadeOutAll = /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    function () {
        this._rippleRenderer.fadeOutAll();
    };
    Object.defineProperty(MatRipple.prototype, "rippleConfig", {
        /** Ripple configuration from the directive's input values. */
        get: /**
         * Ripple configuration from the directive's input values.
         * @return {?}
         */
        function () {
            return {
                centered: this.centered,
                speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
                radius: this.radius,
                color: this.color
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRipple.prototype, "rippleDisabled", {
        /** Whether ripples on pointer-down are  disabled or not. */
        get: /**
         * Whether ripples on pointer-down are  disabled or not.
         * @return {?}
         */
        function () {
            return this.disabled || !!this._globalOptions.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets up the the trigger event listeners if ripples are enabled.
     * @return {?}
     */
    MatRipple.prototype._setupTriggerEventsIfEnabled = /**
     * Sets up the the trigger event listeners if ripples are enabled.
     * @return {?}
     */
    function () {
        if (!this.disabled && this._isInitialized) {
            this._rippleRenderer.setupTriggerEvents(this.trigger);
        }
    };
    MatRipple.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-ripple], [matRipple]',
                    exportAs: 'matRipple',
                    host: {
                        'class': 'mat-ripple',
                        '[class.mat-ripple-unbounded]': 'unbounded'
                    }
                },] },
    ];
    /** @nocollapse */
    MatRipple.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NgZone, },
        { type: Platform, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] },] },
    ]; };
    MatRipple.propDecorators = {
        "color": [{ type: Input, args: ['matRippleColor',] },],
        "unbounded": [{ type: Input, args: ['matRippleUnbounded',] },],
        "centered": [{ type: Input, args: ['matRippleCentered',] },],
        "radius": [{ type: Input, args: ['matRippleRadius',] },],
        "speedFactor": [{ type: Input, args: ['matRippleSpeedFactor',] },],
        "disabled": [{ type: Input, args: ['matRippleDisabled',] },],
        "trigger": [{ type: Input, args: ['matRippleTrigger',] },],
    };
    return MatRipple;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatRippleModule = /** @class */ (function () {
    function MatRippleModule() {
    }
    MatRippleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, PlatformModule],
                    exports: [MatRipple, MatCommonModule],
                    declarations: [MatRipple],
                },] },
    ];
    /** @nocollapse */
    MatRippleModule.ctorParameters = function () { return []; };
    return MatRippleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `mat-primary .mat-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <mat-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * \@docs-private
 */
var MatPseudoCheckbox = /** @class */ (function () {
    function MatPseudoCheckbox() {
        /**
         * Display state of the checkbox.
         */
        this.state = 'unchecked';
        /**
         * Whether the checkbox is disabled.
         */
        this.disabled = false;
    }
    MatPseudoCheckbox.decorators = [
        { type: Component, args: [{encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'mat-pseudo-checkbox',
                    styles: [".mat-pseudo-checkbox{width:20px;height:20px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:9px;left:2px;width:16px;opacity:1}.mat-pseudo-checkbox-checked::after{top:5px;left:3px;width:12px;height:5px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1}"],
                    template: '',
                    host: {
                        'class': 'mat-pseudo-checkbox',
                        '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                        '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
                        '[class.mat-pseudo-checkbox-disabled]': 'disabled',
                    },
                },] },
    ];
    /** @nocollapse */
    MatPseudoCheckbox.ctorParameters = function () { return []; };
    MatPseudoCheckbox.propDecorators = {
        "state": [{ type: Input },],
        "disabled": [{ type: Input },],
    };
    return MatPseudoCheckbox;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatPseudoCheckboxModule = /** @class */ (function () {
    function MatPseudoCheckboxModule() {
    }
    MatPseudoCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    exports: [MatPseudoCheckbox],
                    declarations: [MatPseudoCheckbox]
                },] },
    ];
    /** @nocollapse */
    MatPseudoCheckboxModule.ctorParameters = function () { return []; };
    return MatPseudoCheckboxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
var MatOptgroupBase = /** @class */ (function () {
    function MatOptgroupBase() {
    }
    return MatOptgroupBase;
}());
var _MatOptgroupMixinBase = mixinDisabled(MatOptgroupBase);
// Counter for unique group ids.
var _uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `mat-option`.
 */
var MatOptgroup = /** @class */ (function (_super) {
    __extends(MatOptgroup, _super);
    function MatOptgroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Unique id for the underlying label.
         */
        _this._labelId = "mat-optgroup-label-" + _uniqueOptgroupIdCounter++;
        return _this;
    }
    MatOptgroup.decorators = [
        { type: Component, args: [{selector: 'mat-optgroup',
                    exportAs: 'matOptgroup',
                    template: "<label class=\"mat-optgroup-label\" [id]=\"_labelId\">{{ label }}</label><ng-content select=\"mat-option\"></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled'],
                    host: {
                        'class': 'mat-optgroup',
                        'role': 'group',
                        '[class.mat-optgroup-disabled]': 'disabled',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-labelledby]': '_labelId',
                    }
                },] },
    ];
    /** @nocollapse */
    MatOptgroup.ctorParameters = function () { return []; };
    MatOptgroup.propDecorators = {
        "label": [{ type: Input },],
    };
    return MatOptgroup;
}(_MatOptgroupMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
/**
 * Event object emitted by MatOption when selected or deselected.
 */
var MatOptionSelectionChange = /** @class */ (function () {
    function MatOptionSelectionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return MatOptionSelectionChange;
}());
/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * \@docs-private
 * @record
 */

/**
 * Injection token used to provide the parent component to options.
 */
var MAT_OPTION_PARENT_COMPONENT = new InjectionToken('MAT_OPTION_PARENT_COMPONENT');
/**
 * Single option inside of a `<mat-select>` element.
 */
var MatOption = /** @class */ (function () {
    function MatOption(_element, _changeDetectorRef, _parent, group) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parent = _parent;
        this.group = group;
        this._selected = false;
        this._active = false;
        this._disabled = false;
        this._id = "mat-option-" + _uniqueIdCounter++;
        /**
         * Event emitted when the option is selected or deselected.
         */
        this.onSelectionChange = new EventEmitter();
    }
    Object.defineProperty(MatOption.prototype, "multiple", {
        /** Whether the wrapping component is in multiple selection mode. */
        get: /**
         * Whether the wrapping component is in multiple selection mode.
         * @return {?}
         */
        function () { return this._parent && this._parent.multiple; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "id", {
        /** The unique ID of the option. */
        get: /**
         * The unique ID of the option.
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: /**
         * Whether or not the option is currently selected.
         * @return {?}
         */
        function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "disabled", {
        get: /**
         * Whether the option is disabled.
         * @return {?}
         */
        function () { return (this.group && this.group.disabled) || this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "disableRipple", {
        /** Whether ripples for the option are disabled. */
        get: /**
         * Whether ripples for the option are disabled.
         * @return {?}
         */
        function () { return this._parent && this._parent.disableRipple; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         * @return {?}
         */
        function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         * @return {?}
         */
        function () {
            // TODO(kara): Add input property alternative for node envs.
            return (this._getHostElement().textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    /**
     * Selects the option.
     * @return {?}
     */
    MatOption.prototype.select = /**
     * Selects the option.
     * @return {?}
     */
    function () {
        this._selected = true;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent();
    };
    /** Deselects the option. */
    /**
     * Deselects the option.
     * @return {?}
     */
    MatOption.prototype.deselect = /**
     * Deselects the option.
     * @return {?}
     */
    function () {
        this._selected = false;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent();
    };
    /** Sets focus onto this option. */
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    MatOption.prototype.focus = /**
     * Sets focus onto this option.
     * @return {?}
     */
    function () {
        var /** @type {?} */ element = this._getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    MatOption.prototype.setActiveStyles = /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        if (!this._active) {
            this._active = true;
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    MatOption.prototype.setInactiveStyles = /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        if (this._active) {
            this._active = false;
            this._changeDetectorRef.markForCheck();
        }
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    MatOption.prototype.getLabel = /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    function () {
        return this.viewValue;
    };
    /** Ensures the option is selected when activated from the keyboard. */
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    MatOption.prototype._handleKeydown = /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    MatOption.prototype._selectViaInteraction = /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    MatOption.prototype._getTabIndex = /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    function () {
        return this.disabled ? '-1' : '0';
    };
    /** Gets the host DOM element. */
    /**
     * Gets the host DOM element.
     * @return {?}
     */
    MatOption.prototype._getHostElement = /**
     * Gets the host DOM element.
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    MatOption.prototype._emitSelectionChangeEvent = /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new MatOptionSelectionChange(this, isUserInput));
    };
    /**
     * Counts the amount of option group labels that precede the specified option.
     * @param optionIndex Index of the option at which to start counting.
     * @param options Flat list of all of the options.
     * @param optionGroups Flat list of all of the option groups.
     */
    /**
     * Counts the amount of option group labels that precede the specified option.
     * @param {?} optionIndex Index of the option at which to start counting.
     * @param {?} options Flat list of all of the options.
     * @param {?} optionGroups Flat list of all of the option groups.
     * @return {?}
     */
    MatOption.countGroupLabelsBeforeOption = /**
     * Counts the amount of option group labels that precede the specified option.
     * @param {?} optionIndex Index of the option at which to start counting.
     * @param {?} options Flat list of all of the options.
     * @param {?} optionGroups Flat list of all of the option groups.
     * @return {?}
     */
    function (optionIndex, options, optionGroups) {
        if (optionGroups.length) {
            var /** @type {?} */ optionsArray = options.toArray();
            var /** @type {?} */ groups = optionGroups.toArray();
            var /** @type {?} */ groupCounter = 0;
            for (var /** @type {?} */ i = 0; i < optionIndex + 1; i++) {
                if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                    groupCounter++;
                }
            }
            return groupCounter;
        }
        return 0;
    };
    MatOption.decorators = [
        { type: Component, args: [{selector: 'mat-option',
                    exportAs: 'matOption',
                    host: {
                        'role': 'option',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[class.mat-selected]': 'selected',
                        '[class.mat-option-multiple]': 'multiple',
                        '[class.mat-active]': 'active',
                        '[id]': 'id',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[class.mat-option-disabled]': 'disabled',
                        '(click)': '_selectViaInteraction()',
                        '(keydown)': '_handleKeydown($event)',
                        'class': 'mat-option',
                    },
                    template: "<mat-pseudo-checkbox *ngIf=\"multiple\" class=\"mat-option-pseudo-checkbox\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mat-pseudo-checkbox><span class=\"mat-option-text\"><ng-content></ng-content></span><div class=\"mat-option-ripple\" mat-ripple [matRippleTrigger]=\"_getHostElement()\" [matRippleDisabled]=\"disabled || disableRipple\"></div>",
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatOption.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_OPTION_PARENT_COMPONENT,] },] },
        { type: MatOptgroup, decorators: [{ type: Optional },] },
    ]; };
    MatOption.propDecorators = {
        "value": [{ type: Input },],
        "disabled": [{ type: Input },],
        "onSelectionChange": [{ type: Output },],
    };
    return MatOption;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatOptionModule = /** @class */ (function () {
    function MatOptionModule() {
    }
    MatOptionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatRippleModule, CommonModule, MatPseudoCheckboxModule],
                    exports: [MatOption, MatOptgroup],
                    declarations: [MatOption, MatOptgroup]
                },] },
    ];
    /** @nocollapse */
    MatOptionModule.ctorParameters = function () { return []; };
    return MatOptionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * InjectionToken that can be used to specify the global label options.
 */
var MAT_LABEL_GLOBAL_OPTIONS = new InjectionToken('mat-label-global-options');
/**
 * Configurable options for floating labels.
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Applies a CSS transform to an element, including browser-prefixed properties.
 * @param {?} element
 * @param {?} transformValue
 * @return {?}
 */
function applyCssTransform(element, transformValue) {
    // It's important to trim the result, because the browser will ignore the set operation
    // if the string contains only whitespace.
    var /** @type {?} */ value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * When constructing a Date, the month is zero-based. This can be confusing, since people are
 * used to seeing them one-based. So we create these aliases to make writing the tests easier.
 */
var JAN = 0;
var FEB = 1;
var MAR = 2;
var APR = 3;
var MAY = 4;
var JUN = 5;
var JUL = 6;
var AUG = 7;
var SEP = 8;
var OCT = 9;
var NOV = 10;
var DEC = 11;

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

export { MAT_LABEL_GLOBAL_OPTIONS as MAT_PLACEHOLDER_GLOBAL_OPTIONS, AnimationCurves, AnimationDurations, MatCommonModule, MATERIAL_SANITY_CHECKS, mixinDisabled, mixinColor, mixinDisableRipple, mixinTabIndex, mixinErrorState, NativeDateModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_LOCALE_PROVIDER, DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter, MAT_NATIVE_DATE_FORMATS, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MAT_HAMMER_OPTIONS, GestureConfig, MatLine, MatLineSetter, MatLineModule, MatOptionModule, MatOptionSelectionChange, MAT_OPTION_PARENT_COMPONENT, MatOption, MatOptgroupBase, _MatOptgroupMixinBase, MatOptgroup, MAT_LABEL_GLOBAL_OPTIONS, MatRippleModule, MAT_RIPPLE_GLOBAL_OPTIONS, MatRipple, RippleState, RippleRef, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION, RippleRenderer, MatPseudoCheckboxModule, MatPseudoCheckbox, applyCssTransform, JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC };
//# sourceMappingURL=core.es5.js.map
