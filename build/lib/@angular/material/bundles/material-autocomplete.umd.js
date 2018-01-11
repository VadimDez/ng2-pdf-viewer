/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/core'), require('@angular/cdk/a11y'), require('@angular/common'), require('@angular/cdk/overlay'), require('@angular/cdk/bidi'), require('@angular/cdk/keycodes'), require('@angular/cdk/portal'), require('rxjs/operators/filter'), require('rxjs/operators/take'), require('rxjs/operators/switchMap'), require('rxjs/operators/tap'), require('rxjs/operators/delay'), require('@angular/forms'), require('@angular/material/form-field'), require('rxjs/Subject'), require('rxjs/observable/fromEvent'), require('rxjs/observable/merge'), require('rxjs/observable/of')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/material/core', '@angular/cdk/a11y', '@angular/common', '@angular/cdk/overlay', '@angular/cdk/bidi', '@angular/cdk/keycodes', '@angular/cdk/portal', 'rxjs/operators/filter', 'rxjs/operators/take', 'rxjs/operators/switchMap', 'rxjs/operators/tap', 'rxjs/operators/delay', '@angular/forms', '@angular/material/form-field', 'rxjs/Subject', 'rxjs/observable/fromEvent', 'rxjs/observable/merge', 'rxjs/observable/of'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.autocomplete = global.ng.material.autocomplete || {}),global.ng.core,global.ng.material.core,global.ng.cdk.a11y,global.ng.common,global.ng.cdk.overlay,global.ng.cdk.bidi,global.ng.cdk.keycodes,global.ng.cdk.portal,global.Rx.operators,global.Rx.operators,global.Rx.operators,global.Rx.operators,global.Rx.operators,global.ng.forms,global.ng.material.formField,global.Rx,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable));
}(this, (function (exports,_angular_core,_angular_material_core,_angular_cdk_a11y,_angular_common,_angular_cdk_overlay,_angular_cdk_bidi,_angular_cdk_keycodes,_angular_cdk_portal,rxjs_operators_filter,rxjs_operators_take,rxjs_operators_switchMap,rxjs_operators_tap,rxjs_operators_delay,_angular_forms,_angular_material_formField,rxjs_Subject,rxjs_observable_fromEvent,rxjs_observable_merge,rxjs_observable_of) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueAutocompleteIdCounter = 0;
/**
 * Event object that is emitted when an autocomplete option is selected
 */
var MatAutocompleteSelectedEvent = /** @class */ (function () {
    function MatAutocompleteSelectedEvent(source, option) {
        this.source = source;
        this.option = option;
    }
    return MatAutocompleteSelectedEvent;
}());
var MatAutocomplete = /** @class */ (function () {
    function MatAutocomplete(_changeDetectorRef, _elementRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        /**
         * Whether the autocomplete panel should be visible, depending on option length.
         */
        this.showPanel = false;
        this._isOpen = false;
        /**
         * Function that maps an option's control value to its display value in the trigger.
         */
        this.displayWith = null;
        /**
         * Event that is emitted whenever an option from the list is selected.
         */
        this.optionSelected = new _angular_core.EventEmitter();
        this._classList = {};
        /**
         * Unique ID to be used by autocomplete trigger's "aria-owns" property.
         */
        this.id = "mat-autocomplete-" + _uniqueAutocompleteIdCounter++;
    }
    Object.defineProperty(MatAutocomplete.prototype, "isOpen", {
        /** Whether the autocomplete panel is open. */
        get: /**
         * Whether the autocomplete panel is open.
         * @return {?}
         */
        function () {
            return this._isOpen && this.showPanel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAutocomplete.prototype, "classList", {
        set: /**
         * Takes classes set on the host mat-autocomplete element and applies them to the panel
         * inside the overlay container to allow for easy styling.
         * @param {?} classList
         * @return {?}
         */
        function (classList) {
            var _this = this;
            if (classList && classList.length) {
                classList.split(' ').forEach(function (className) { return _this._classList[className.trim()] = true; });
                this._elementRef.nativeElement.className = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatAutocomplete.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._keyManager = new _angular_cdk_a11y.ActiveDescendantKeyManager(this.options).withWrap();
        // Set the initial visibiity state.
        this._setVisibility();
    };
    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display options
     * above or below the fold, as they are not actually being focused when active.
     */
    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display options
     * above or below the fold, as they are not actually being focused when active.
     * @param {?} scrollTop
     * @return {?}
     */
    MatAutocomplete.prototype._setScrollTop = /**
     * Sets the panel scrollTop. This allows us to manually scroll to display options
     * above or below the fold, as they are not actually being focused when active.
     * @param {?} scrollTop
     * @return {?}
     */
    function (scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    };
    /** Returns the panel's scrollTop. */
    /**
     * Returns the panel's scrollTop.
     * @return {?}
     */
    MatAutocomplete.prototype._getScrollTop = /**
     * Returns the panel's scrollTop.
     * @return {?}
     */
    function () {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    };
    /** Panel should hide itself when the option list is empty. */
    /**
     * Panel should hide itself when the option list is empty.
     * @return {?}
     */
    MatAutocomplete.prototype._setVisibility = /**
     * Panel should hide itself when the option list is empty.
     * @return {?}
     */
    function () {
        this.showPanel = !!this.options.length;
        this._classList['mat-autocomplete-visible'] = this.showPanel;
        this._classList['mat-autocomplete-hidden'] = !this.showPanel;
        this._changeDetectorRef.markForCheck();
    };
    /** Emits the `select` event. */
    /**
     * Emits the `select` event.
     * @param {?} option
     * @return {?}
     */
    MatAutocomplete.prototype._emitSelectEvent = /**
     * Emits the `select` event.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var /** @type {?} */ event = new MatAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    };
    MatAutocomplete.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-autocomplete',
                    template: "<ng-template><div class=\"mat-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"_classList\" #panel><ng-content></ng-content></div></ng-template>",
                    styles: [".mat-autocomplete-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative}.mat-autocomplete-panel:not([class*=mat-elevation-z]){box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden}"],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    exportAs: 'matAutocomplete',
                    host: {
                        'class': 'mat-autocomplete'
                    }
                },] },
    ];
    /** @nocollapse */
    MatAutocomplete.ctorParameters = function () { return [
        { type: _angular_core.ChangeDetectorRef, },
        { type: _angular_core.ElementRef, },
    ]; };
    MatAutocomplete.propDecorators = {
        "template": [{ type: _angular_core.ViewChild, args: [_angular_core.TemplateRef,] },],
        "panel": [{ type: _angular_core.ViewChild, args: ['panel',] },],
        "options": [{ type: _angular_core.ContentChildren, args: [_angular_material_core.MatOption, { descendants: true },] },],
        "optionGroups": [{ type: _angular_core.ContentChildren, args: [_angular_material_core.MatOptgroup,] },],
        "displayWith": [{ type: _angular_core.Input },],
        "optionSelected": [{ type: _angular_core.Output },],
        "classList": [{ type: _angular_core.Input, args: ['class',] },],
    };
    return MatAutocomplete;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The height of each autocomplete option.
 */
var AUTOCOMPLETE_OPTION_HEIGHT = 48;
/**
 * The total height of the autocomplete panel.
 */
var AUTOCOMPLETE_PANEL_HEIGHT = 256;
/**
 * Injection token that determines the scroll handling while the autocomplete panel is open.
 */
var MAT_AUTOCOMPLETE_SCROLL_STRATEGY = new _angular_core.InjectionToken('mat-autocomplete-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
/**
 * \@docs-private
 */
var MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER = {
    provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [_angular_cdk_overlay.Overlay],
    useFactory: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 */
var MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MatAutocompleteTrigger; }),
    multi: true
};
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 * @return {?}
 */
function getMatAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `mat-autocomplete`. ' +
        'Make sure that the id passed to the `matAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}
var MatAutocompleteTrigger = /** @class */ (function () {
    function MatAutocompleteTrigger(_element, _overlay, _viewContainerRef, _zone, _changeDetectorRef, _scrollStrategy, _dir, _formField, _document) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._zone = _zone;
        this._changeDetectorRef = _changeDetectorRef;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this._formField = _formField;
        this._document = _document;
        this._panelOpen = false;
        /**
         * Whether or not the label state is being overridden.
         */
        this._manuallyFloatingLabel = false;
        /**
         * Stream of escape keyboard events.
         */
        this._escapeEventStream = new rxjs_Subject.Subject();
        /**
         * View -> model callback called when value changes
         */
        this._onChange = function () { };
        /**
         * View -> model callback called when autocomplete has been touched
         */
        this._onTouched = function () { };
    }
    /**
     * @return {?}
     */
    MatAutocompleteTrigger.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyPanel();
        this._escapeEventStream.complete();
    };
    Object.defineProperty(MatAutocompleteTrigger.prototype, "panelOpen", {
        /* Whether or not the autocomplete panel is open. */
        get: /**
         * @return {?}
         */
        function () {
            return this._panelOpen && this.autocomplete.showPanel;
        },
        enumerable: true,
        configurable: true
    });
    /** Opens the autocomplete suggestion panel. */
    /**
     * Opens the autocomplete suggestion panel.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype.openPanel = /**
     * Opens the autocomplete suggestion panel.
     * @return {?}
     */
    function () {
        this._attachOverlay();
        this._floatLabel();
    };
    /** Closes the autocomplete suggestion panel. */
    /**
     * Closes the autocomplete suggestion panel.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype.closePanel = /**
     * Closes the autocomplete suggestion panel.
     * @return {?}
     */
    function () {
        this._resetLabel();
        if (this._panelOpen) {
            this.autocomplete._isOpen = this._panelOpen = false;
            if (this._overlayRef && this._overlayRef.hasAttached()) {
                this._overlayRef.detach();
                this._closingActionsSubscription.unsubscribe();
            }
            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the label is reset when the
            // user clicks outside.
            this._changeDetectorRef.detectChanges();
        }
    };
    Object.defineProperty(MatAutocompleteTrigger.prototype, "panelClosingActions", {
        /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected, on blur, and when TAB is pressed.
         */
        get: /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected, on blur, and when TAB is pressed.
         * @return {?}
         */
        function () {
            var _this = this;
            return rxjs_observable_merge.merge(this.optionSelections, this.autocomplete._keyManager.tabOut.pipe(rxjs_operators_filter.filter(function () { return _this._panelOpen; })), this._escapeEventStream, this._outsideClickStream, this._overlayRef ?
                this._overlayRef.detachments().pipe(rxjs_operators_filter.filter(function () { return _this._panelOpen; })) :
                rxjs_observable_of.of());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAutocompleteTrigger.prototype, "optionSelections", {
        /** Stream of autocomplete option selections. */
        get: /**
         * Stream of autocomplete option selections.
         * @return {?}
         */
        function () {
            return rxjs_observable_merge.merge.apply(void 0, this.autocomplete.options.map(function (option) { return option.onSelectionChange; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAutocompleteTrigger.prototype, "activeOption", {
        /** The currently active option, coerced to MatOption type. */
        get: /**
         * The currently active option, coerced to MatOption type.
         * @return {?}
         */
        function () {
            if (this.autocomplete && this.autocomplete._keyManager) {
                return this.autocomplete._keyManager.activeItem;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAutocompleteTrigger.prototype, "_outsideClickStream", {
        get: /**
         * Stream of clicks outside of the autocomplete panel.
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this._document) {
                return rxjs_observable_of.of(null);
            }
            return rxjs_observable_merge.merge(rxjs_observable_fromEvent.fromEvent(this._document, 'click'), rxjs_observable_fromEvent.fromEvent(this._document, 'touchend'))
                .pipe(rxjs_operators_filter.filter(function (event) {
                var /** @type {?} */ clickTarget = /** @type {?} */ (event.target);
                var /** @type {?} */ formField = _this._formField ?
                    _this._formField._elementRef.nativeElement : null;
                return _this._panelOpen &&
                    clickTarget !== _this._element.nativeElement &&
                    (!formField || !formField.contains(clickTarget)) &&
                    (!!_this._overlayRef && !_this._overlayRef.overlayElement.contains(clickTarget));
            }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the autocomplete's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    /**
     * Sets the autocomplete's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype.writeValue = /**
     * Sets the autocomplete's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    function (value) {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._setTriggerValue(value); });
    };
    /**
     * Saves a callback function to be invoked when the autocomplete's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    /**
     * Saves a callback function to be invoked when the autocomplete's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype.registerOnChange = /**
     * Saves a callback function to be invoked when the autocomplete's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the autocomplete is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    /**
     * Saves a callback function to be invoked when the autocomplete is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype.registerOnTouched = /**
     * Saves a callback function to be invoked when the autocomplete is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * Disables the input. Implemented as a part of `ControlValueAccessor`.
     * @param isDisabled Whether the component should be disabled.
     */
    /**
     * Disables the input. Implemented as a part of `ControlValueAccessor`.
     * @param {?} isDisabled Whether the component should be disabled.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype.setDisabledState = /**
     * Disables the input. Implemented as a part of `ControlValueAccessor`.
     * @param {?} isDisabled Whether the component should be disabled.
     * @return {?}
     */
    function (isDisabled) {
        this._element.nativeElement.disabled = isDisabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ keyCode = event.keyCode;
        if (keyCode === _angular_cdk_keycodes.ESCAPE && this.panelOpen) {
            this._resetActiveItem();
            this._escapeEventStream.next();
            event.stopPropagation();
        }
        else if (this.activeOption && keyCode === _angular_cdk_keycodes.ENTER && this.panelOpen) {
            this.activeOption._selectViaInteraction();
            this._resetActiveItem();
            event.preventDefault();
        }
        else {
            var /** @type {?} */ prevActiveItem = this.autocomplete._keyManager.activeItem;
            var /** @type {?} */ isArrowKey = keyCode === _angular_cdk_keycodes.UP_ARROW || keyCode === _angular_cdk_keycodes.DOWN_ARROW;
            if (this.panelOpen || keyCode === _angular_cdk_keycodes.TAB) {
                this.autocomplete._keyManager.onKeydown(event);
            }
            else if (isArrowKey) {
                this.openPanel();
            }
            if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
                this._scrollToOption();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._handleInput = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // We need to ensure that the input is focused, because IE will fire the `input`
        // event on focus/blur/load if the input has a placeholder. See:
        // https://connect.microsoft.com/IE/feedback/details/885747/
        if (document.activeElement === event.target) {
            this._onChange((/** @type {?} */ (event.target)).value);
            this.openPanel();
        }
    };
    /**
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        if (!this._element.nativeElement.readOnly) {
            this._attachOverlay();
            this._floatLabel(true);
        }
    };
    /**
     * In "auto" mode, the label will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the label until the panel can be closed.
     * @param {?=} shouldAnimate Whether the label should be animated when it is floated.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._floatLabel = /**
     * In "auto" mode, the label will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the label until the panel can be closed.
     * @param {?=} shouldAnimate Whether the label should be animated when it is floated.
     * @return {?}
     */
    function (shouldAnimate) {
        if (shouldAnimate === void 0) { shouldAnimate = false; }
        if (this._formField && this._formField.floatLabel === 'auto') {
            if (shouldAnimate) {
                this._formField._animateAndLockLabel();
            }
            else {
                this._formField.floatLabel = 'always';
            }
            this._manuallyFloatingLabel = true;
        }
    };
    /**
     * If the label has been manually elevated, return it to its normal state.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._resetLabel = /**
     * If the label has been manually elevated, return it to its normal state.
     * @return {?}
     */
    function () {
        if (this._manuallyFloatingLabel) {
            this._formField.floatLabel = 'auto';
            this._manuallyFloatingLabel = false;
        }
    };
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._scrollToOption = /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     * @return {?}
     */
    function () {
        var /** @type {?} */ activeOptionIndex = this.autocomplete._keyManager.activeItemIndex || 0;
        var /** @type {?} */ labelCount = _angular_material_core.MatOption.countGroupLabelsBeforeOption(activeOptionIndex, this.autocomplete.options, this.autocomplete.optionGroups);
        var /** @type {?} */ optionOffset = (activeOptionIndex + labelCount) * AUTOCOMPLETE_OPTION_HEIGHT;
        var /** @type {?} */ panelTop = this.autocomplete._getScrollTop();
        if (optionOffset < panelTop) {
            // Scroll up to reveal selected option scrolled above the panel top
            this.autocomplete._setScrollTop(optionOffset);
        }
        else if (optionOffset + AUTOCOMPLETE_OPTION_HEIGHT > panelTop + AUTOCOMPLETE_PANEL_HEIGHT) {
            // Scroll down to reveal selected option scrolled below the panel bottom
            var /** @type {?} */ newScrollTop = optionOffset - AUTOCOMPLETE_PANEL_HEIGHT + AUTOCOMPLETE_OPTION_HEIGHT;
            this.autocomplete._setScrollTop(Math.max(0, newScrollTop));
        }
    };
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._subscribeToClosingActions = /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ firstStable = this._zone.onStable.asObservable().pipe(rxjs_operators_take.take(1));
        var /** @type {?} */ optionChanges = this.autocomplete.options.changes.pipe(rxjs_operators_tap.tap(function () { return _this._positionStrategy.recalculateLastPosition(); }), 
        // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        rxjs_operators_delay.delay(0));
        // When the zone is stable initially, and when the option list changes...
        return rxjs_observable_merge.merge(firstStable, optionChanges)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        rxjs_operators_switchMap.switchMap(function () {
            _this._resetActiveItem();
            _this.autocomplete._setVisibility();
            return _this.panelClosingActions;
        }), 
        // when the first closing event occurs...
        rxjs_operators_take.take(1))
            .subscribe(function (event) { return _this._setValueAndClose(event); });
    };
    /**
     * Destroys the autocomplete suggestion panel.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._destroyPanel = /**
     * Destroys the autocomplete suggestion panel.
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._setTriggerValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ toDisplay = this.autocomplete && this.autocomplete.displayWith ?
            this.autocomplete.displayWith(value) :
            value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        var /** @type {?} */ inputValue = toDisplay != null ? toDisplay : '';
        // If it's used within a `MatFormField`, we should set it through the property so it can go
        // through change detection.
        if (this._formField) {
            this._formField._control.value = inputValue;
        }
        else {
            this._element.nativeElement.value = inputValue;
        }
    };
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     * @param {?} event
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._setValueAndClose = /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && event.source) {
            this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source.value);
            this._onChange(event.source.value);
            this._element.nativeElement.focus();
            this.autocomplete._emitSelectEvent(event.source);
        }
        this.closePanel();
    };
    /**
     * Clear any previous selected option and emit a selection change event for this option
     * @param {?} skip
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._clearPreviousSelectedOption = /**
     * Clear any previous selected option and emit a selection change event for this option
     * @param {?} skip
     * @return {?}
     */
    function (skip) {
        this.autocomplete.options.forEach(function (option) {
            if (option != skip && option.selected) {
                option.deselect();
            }
        });
    };
    /**
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._attachOverlay = /**
     * @return {?}
     */
    function () {
        if (!this.autocomplete) {
            throw getMatAutocompleteMissingPanelError();
        }
        if (!this._overlayRef) {
            this._portal = new _angular_cdk_portal.TemplatePortal(this.autocomplete.template, this._viewContainerRef);
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
        }
        else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.updateSize({ width: this._getHostWidth() });
        }
        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
        }
        this.autocomplete._setVisibility();
        this.autocomplete._isOpen = this._panelOpen = true;
    };
    /**
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._getOverlayConfig = /**
     * @return {?}
     */
    function () {
        return new _angular_cdk_overlay.OverlayConfig({
            positionStrategy: this._getOverlayPosition(),
            scrollStrategy: this._scrollStrategy(),
            width: this._getHostWidth(),
            direction: this._dir ? this._dir.value : 'ltr'
        });
    };
    /**
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._getOverlayPosition = /**
     * @return {?}
     */
    function () {
        this._positionStrategy = this._overlay.position().connectedTo(this._getConnectedElement(), { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
        return this._positionStrategy;
    };
    /**
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._getConnectedElement = /**
     * @return {?}
     */
    function () {
        return this._formField ? this._formField._connectionContainerRef : this._element;
    };
    /**
     * Returns the width of the input element, so the panel width can match it.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._getHostWidth = /**
     * Returns the width of the input element, so the panel width can match it.
     * @return {?}
     */
    function () {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    };
    /**
     * Reset active item to -1 so arrow events will activate the correct options.
     * @return {?}
     */
    MatAutocompleteTrigger.prototype._resetActiveItem = /**
     * Reset active item to -1 so arrow events will activate the correct options.
     * @return {?}
     */
    function () {
        this.autocomplete._keyManager.setActiveItem(-1);
    };
    MatAutocompleteTrigger.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: "input[matAutocomplete], textarea[matAutocomplete]",
                    host: {
                        'role': 'combobox',
                        'autocomplete': 'off',
                        'aria-autocomplete': 'list',
                        '[attr.aria-activedescendant]': 'activeOption?.id',
                        '[attr.aria-expanded]': 'panelOpen.toString()',
                        '[attr.aria-owns]': 'autocomplete?.id',
                        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
                        // a little earlier. This avoids issues where IE delays the focusing of the input.
                        '(focusin)': '_handleFocus()',
                        '(blur)': '_onTouched()',
                        '(input)': '_handleInput($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                    providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MatAutocompleteTrigger.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_cdk_overlay.Overlay, },
        { type: _angular_core.ViewContainerRef, },
        { type: _angular_core.NgZone, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY,] },] },
        { type: _angular_cdk_bidi.Directionality, decorators: [{ type: _angular_core.Optional },] },
        { type: _angular_material_formField.MatFormField, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [_angular_common.DOCUMENT,] },] },
    ]; };
    MatAutocompleteTrigger.propDecorators = {
        "autocomplete": [{ type: _angular_core.Input, args: ['matAutocomplete',] },],
    };
    return MatAutocompleteTrigger;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatAutocompleteModule = /** @class */ (function () {
    function MatAutocompleteModule() {
    }
    MatAutocompleteModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_material_core.MatOptionModule, _angular_cdk_overlay.OverlayModule, _angular_material_core.MatCommonModule, _angular_common.CommonModule],
                    exports: [MatAutocomplete, _angular_material_core.MatOptionModule, MatAutocompleteTrigger, _angular_material_core.MatCommonModule],
                    declarations: [MatAutocomplete, MatAutocompleteTrigger],
                    providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER],
                },] },
    ];
    /** @nocollapse */
    MatAutocompleteModule.ctorParameters = function () { return []; };
    return MatAutocompleteModule;
}());

exports.MatAutocompleteSelectedEvent = MatAutocompleteSelectedEvent;
exports.MatAutocomplete = MatAutocomplete;
exports.MatAutocompleteModule = MatAutocompleteModule;
exports.AUTOCOMPLETE_OPTION_HEIGHT = AUTOCOMPLETE_OPTION_HEIGHT;
exports.AUTOCOMPLETE_PANEL_HEIGHT = AUTOCOMPLETE_PANEL_HEIGHT;
exports.MAT_AUTOCOMPLETE_SCROLL_STRATEGY = MAT_AUTOCOMPLETE_SCROLL_STRATEGY;
exports.MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY = MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY;
exports.MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER = MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER;
exports.MAT_AUTOCOMPLETE_VALUE_ACCESSOR = MAT_AUTOCOMPLETE_VALUE_ACCESSOR;
exports.getMatAutocompleteMissingPanelError = getMatAutocompleteMissingPanelError;
exports.MatAutocompleteTrigger = MatAutocompleteTrigger;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-autocomplete.umd.js.map
