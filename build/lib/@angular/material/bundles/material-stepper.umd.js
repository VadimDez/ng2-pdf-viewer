/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/portal'), require('@angular/cdk/stepper'), require('@angular/common'), require('@angular/core'), require('@angular/material/button'), require('@angular/material/core'), require('@angular/material/icon'), require('@angular/cdk/coercion'), require('rxjs/Subject'), require('@angular/animations'), require('@angular/cdk/bidi'), require('rxjs/operators/takeUntil')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/a11y', '@angular/cdk/portal', '@angular/cdk/stepper', '@angular/common', '@angular/core', '@angular/material/button', '@angular/material/core', '@angular/material/icon', '@angular/cdk/coercion', 'rxjs/Subject', '@angular/animations', '@angular/cdk/bidi', 'rxjs/operators/takeUntil'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.stepper = global.ng.material.stepper || {}),global.ng.cdk.a11y,global.ng.cdk.portal,global.ng.cdk.stepper,global.ng.common,global.ng.core,global.ng.material.button,global.ng.material.core,global.ng.material.icon,global.ng.cdk.coercion,global.Rx,global.ng.animations,global.ng.cdk.bidi,global.Rx.operators));
}(this, (function (exports,_angular_cdk_a11y,_angular_cdk_portal,_angular_cdk_stepper,_angular_common,_angular_core,_angular_material_button,_angular_material_core,_angular_material_icon,_angular_cdk_coercion,rxjs_Subject,_angular_animations,_angular_cdk_bidi,rxjs_operators_takeUntil) { 'use strict';

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

var MatStepLabel = /** @class */ (function (_super) {
    __extends(MatStepLabel, _super);
    function MatStepLabel(template) {
        return _super.call(this, template) || this;
    }
    MatStepLabel.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matStepLabel]',
                },] },
    ];
    /** @nocollapse */
    MatStepLabel.ctorParameters = function () { return [
        { type: _angular_core.TemplateRef, },
    ]; };
    return MatStepLabel;
}(_angular_cdk_stepper.CdkStepLabel));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Stepper data that is required for internationalization.
 */
var MatStepperIntl = /** @class */ (function () {
    function MatStepperIntl() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new rxjs_Subject.Subject();
        /**
         * Label that is rendered below optional steps.
         */
        this.optionalLabel = 'Optional';
    }
    MatStepperIntl.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    MatStepperIntl.ctorParameters = function () { return []; };
    return MatStepperIntl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatStepHeader = /** @class */ (function () {
    function MatStepHeader(_intl, _focusMonitor, _element, changeDetectorRef) {
        this._intl = _intl;
        this._focusMonitor = _focusMonitor;
        this._element = _element;
        _focusMonitor.monitor(_element.nativeElement, true);
        this._intlSubscription = _intl.changes.subscribe(function () { return changeDetectorRef.markForCheck(); });
    }
    Object.defineProperty(MatStepHeader.prototype, "index", {
        get: /**
         * Index of the given step.
         * @return {?}
         */
        function () { return this._index; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._index = _angular_cdk_coercion.coerceNumberProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatStepHeader.prototype, "selected", {
        get: /**
         * Whether the given step is selected.
         * @return {?}
         */
        function () { return this._selected; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = _angular_cdk_coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatStepHeader.prototype, "active", {
        get: /**
         * Whether the given step label is active.
         * @return {?}
         */
        function () { return this._active; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._active = _angular_cdk_coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatStepHeader.prototype, "optional", {
        get: /**
         * Whether the given step is optional.
         * @return {?}
         */
        function () { return this._optional; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._optional = _angular_cdk_coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatStepHeader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._intlSubscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this._element.nativeElement);
    };
    /** Returns string label of given step if it is a text label. */
    /**
     * Returns string label of given step if it is a text label.
     * @return {?}
     */
    MatStepHeader.prototype._stringLabel = /**
     * Returns string label of given step if it is a text label.
     * @return {?}
     */
    function () {
        return this.label instanceof MatStepLabel ? null : this.label;
    };
    /** Returns MatStepLabel if the label of given step is a template label. */
    /**
     * Returns MatStepLabel if the label of given step is a template label.
     * @return {?}
     */
    MatStepHeader.prototype._templateLabel = /**
     * Returns MatStepLabel if the label of given step is a template label.
     * @return {?}
     */
    function () {
        return this.label instanceof MatStepLabel ? this.label : null;
    };
    /** Returns the host HTML element. */
    /**
     * Returns the host HTML element.
     * @return {?}
     */
    MatStepHeader.prototype._getHostElement = /**
     * Returns the host HTML element.
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    MatStepHeader.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-step-header',
                    template: "<div class=\"mat-step-header-ripple\" mat-ripple [matRippleTrigger]=\"_getHostElement()\"></div><div [class.mat-step-icon]=\"icon !== 'number' || selected\" [class.mat-step-icon-not-touched]=\"icon == 'number' && !selected\" [ngSwitch]=\"icon\"><span *ngSwitchCase=\"'number'\">{{index + 1}}</span><mat-icon *ngSwitchCase=\"'edit'\">create</mat-icon><mat-icon *ngSwitchCase=\"'done'\">done</mat-icon></div><div class=\"mat-step-label\" [class.mat-step-label-active]=\"active\" [class.mat-step-label-selected]=\"selected\"><ng-container *ngIf=\"_templateLabel()\" [ngTemplateOutlet]=\"_templateLabel()!.template\"></ng-container><div class=\"mat-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div><div class=\"mat-step-optional\" *ngIf=\"optional\">{{_intl.optionalLabel}}</div></div>",
                    styles: [".mat-step-header{overflow:hidden;outline:0;cursor:pointer;position:relative}.mat-step-optional{font-size:12px}.mat-step-icon,.mat-step-icon-not-touched{border-radius:50%;height:24px;width:24px;align-items:center;justify-content:center;display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}"],
                    host: {
                        'class': 'mat-step-header',
                        'role': 'tab',
                    },
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatStepHeader.ctorParameters = function () { return [
        { type: MatStepperIntl, },
        { type: _angular_cdk_a11y.FocusMonitor, },
        { type: _angular_core.ElementRef, },
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    MatStepHeader.propDecorators = {
        "icon": [{ type: _angular_core.Input },],
        "label": [{ type: _angular_core.Input },],
        "index": [{ type: _angular_core.Input },],
        "selected": [{ type: _angular_core.Input },],
        "active": [{ type: _angular_core.Input },],
        "optional": [{ type: _angular_core.Input },],
    };
    return MatStepHeader;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatStep = /** @class */ (function (_super) {
    __extends(MatStep, _super);
    function MatStep(stepper, _errorStateMatcher) {
        var _this = _super.call(this, stepper) || this;
        _this._errorStateMatcher = _errorStateMatcher;
        return _this;
    }
    /** Custom error state matcher that additionally checks for validity of interacted form. */
    /**
     * Custom error state matcher that additionally checks for validity of interacted form.
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    MatStep.prototype.isErrorState = /**
     * Custom error state matcher that additionally checks for validity of interacted form.
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    function (control, form) {
        var /** @type {?} */ originalErrorState = this._errorStateMatcher.isErrorState(control, form);
        // Custom error state checks for the validity of form that is not submitted or touched
        // since user can trigger a form change by calling for another step without directly
        // interacting with the current form.
        var /** @type {?} */ customErrorState = !!(control && control.invalid && this.interacted);
        return originalErrorState || customErrorState;
    };
    MatStep.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-step',
                    template: "<ng-template><ng-content></ng-content></ng-template>",
                    providers: [{ provide: _angular_material_core.ErrorStateMatcher, useExisting: MatStep }],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    exportAs: 'matStep',
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatStep.ctorParameters = function () { return [
        { type: MatStepper, decorators: [{ type: _angular_core.Inject, args: [_angular_core.forwardRef(function () { return MatStepper; }),] },] },
        { type: _angular_material_core.ErrorStateMatcher, decorators: [{ type: _angular_core.SkipSelf },] },
    ]; };
    MatStep.propDecorators = {
        "stepLabel": [{ type: _angular_core.ContentChild, args: [MatStepLabel,] },],
    };
    return MatStep;
}(_angular_cdk_stepper.CdkStep));
var MatStepper = /** @class */ (function (_super) {
    __extends(MatStepper, _super);
    function MatStepper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    MatStepper.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Mark the component for change detection whenever the content children query changes
        this._steps.changes.pipe(rxjs_operators_takeUntil.takeUntil(this._destroyed)).subscribe(function () { return _this._stateChanged(); });
    };
    MatStepper.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[matStepper]'
                },] },
    ];
    /** @nocollapse */
    MatStepper.ctorParameters = function () { return []; };
    MatStepper.propDecorators = {
        "_stepHeader": [{ type: _angular_core.ViewChildren, args: [MatStepHeader, { read: _angular_core.ElementRef },] },],
        "_steps": [{ type: _angular_core.ContentChildren, args: [MatStep,] },],
    };
    return MatStepper;
}(_angular_cdk_stepper.CdkStepper));
var MatHorizontalStepper = /** @class */ (function (_super) {
    __extends(MatHorizontalStepper, _super);
    function MatHorizontalStepper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHorizontalStepper.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-horizontal-stepper',
                    exportAs: 'matHorizontalStepper',
                    template: "<div class=\"mat-horizontal-stepper-header-container\"><ng-container *ngFor=\"let step of _steps; let i = index; let isLast = last\"><mat-step-header class=\"mat-horizontal-stepper-header\" (click)=\"step.select()\" (keydown)=\"_onKeydown($event)\" [tabIndex]=\"_focusIndex === i ? 0 : -1\" [id]=\"_getStepLabelId(i)\" [attr.aria-controls]=\"_getStepContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [index]=\"i\" [icon]=\"_getIndicatorType(i)\" [label]=\"step.stepLabel || step.label\" [selected]=\"selectedIndex === i\" [active]=\"step.completed || selectedIndex === i || !linear\" [optional]=\"step.optional\"></mat-step-header><div *ngIf=\"!isLast\" class=\"mat-stepper-horizontal-line\"></div></ng-container></div><div class=\"mat-horizontal-content-container\"><div *ngFor=\"let step of _steps; let i = index\" class=\"mat-horizontal-stepper-content\" role=\"tabpanel\" [@stepTransition]=\"_getAnimationDirection(i)\" [id]=\"_getStepContentId(i)\" [attr.aria-labelledby]=\"_getStepLabelId(i)\" [attr.aria-expanded]=\"selectedIndex === i\"><ng-container [ngTemplateOutlet]=\"step.content\"></ng-container></div></div>",
                    styles: [".mat-stepper-horizontal,.mat-stepper-vertical{display:block}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px}.mat-horizontal-stepper-header .mat-step-icon,.mat-horizontal-stepper-header .mat-step-icon-not-touched{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon,[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon-not-touched{margin-right:0;margin-left:8px}.mat-vertical-stepper-header{display:flex;align-items:center;padding:24px;max-height:24px}.mat-vertical-stepper-header .mat-step-icon,.mat-vertical-stepper-header .mat-step-icon-not-touched{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon,[dir=rtl] .mat-vertical-stepper-header .mat-step-icon-not-touched{margin-right:0;margin-left:12px}.mat-horizontal-stepper-content{overflow:hidden}.mat-horizontal-stepper-content[aria-expanded=false]{height:0}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:'';position:absolute;top:-16px;bottom:-16px;left:0;border-left-width:1px;border-left-style:solid}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}"],
                    inputs: ['selectedIndex'],
                    host: {
                        'class': 'mat-stepper-horizontal',
                        'aria-orientation': 'horizontal',
                        'role': 'tablist',
                    },
                    animations: [
                        _angular_animations.trigger('stepTransition', [
                            _angular_animations.state('previous', _angular_animations.style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden' })),
                            _angular_animations.state('current', _angular_animations.style({ transform: 'none', visibility: 'visible' })),
                            _angular_animations.state('next', _angular_animations.style({ transform: 'translate3d(100%, 0, 0)', visibility: 'hidden' })),
                            _angular_animations.transition('* => *', _angular_animations.animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
                        ])
                    ],
                    providers: [{ provide: MatStepper, useExisting: MatHorizontalStepper }],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatHorizontalStepper.ctorParameters = function () { return []; };
    return MatHorizontalStepper;
}(MatStepper));
var MatVerticalStepper = /** @class */ (function (_super) {
    __extends(MatVerticalStepper, _super);
    function MatVerticalStepper(dir, changeDetectorRef) {
        var _this = _super.call(this, dir, changeDetectorRef) || this;
        _this._orientation = 'vertical';
        return _this;
    }
    MatVerticalStepper.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-vertical-stepper',
                    exportAs: 'matVerticalStepper',
                    template: "<div class=\"mat-step\" *ngFor=\"let step of _steps; let i = index; let isLast = last\"><mat-step-header class=\"mat-vertical-stepper-header\" (click)=\"step.select()\" (keydown)=\"_onKeydown($event)\" [tabIndex]=\"_focusIndex == i ? 0 : -1\" [id]=\"_getStepLabelId(i)\" [attr.aria-controls]=\"_getStepContentId(i)\" [attr.aria-selected]=\"selectedIndex === i\" [index]=\"i\" [icon]=\"_getIndicatorType(i)\" [label]=\"step.stepLabel || step.label\" [selected]=\"selectedIndex === i\" [active]=\"step.completed || selectedIndex === i || !linear\" [optional]=\"step.optional\"></mat-step-header><div class=\"mat-vertical-content-container\" [class.mat-stepper-vertical-line]=\"!isLast\"><div class=\"mat-vertical-stepper-content\" role=\"tabpanel\" [@stepTransition]=\"_getAnimationDirection(i)\" [id]=\"_getStepContentId(i)\" [attr.aria-labelledby]=\"_getStepLabelId(i)\" [attr.aria-expanded]=\"selectedIndex === i\"><div class=\"mat-vertical-content\"><ng-container [ngTemplateOutlet]=\"step.content\"></ng-container></div></div></div></div>",
                    styles: [".mat-stepper-horizontal,.mat-stepper-vertical{display:block}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px}.mat-horizontal-stepper-header .mat-step-icon,.mat-horizontal-stepper-header .mat-step-icon-not-touched{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon,[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon-not-touched{margin-right:0;margin-left:8px}.mat-vertical-stepper-header{display:flex;align-items:center;padding:24px;max-height:24px}.mat-vertical-stepper-header .mat-step-icon,.mat-vertical-stepper-header .mat-step-icon-not-touched{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon,[dir=rtl] .mat-vertical-stepper-header .mat-step-icon-not-touched{margin-right:0;margin-left:12px}.mat-horizontal-stepper-content{overflow:hidden}.mat-horizontal-stepper-content[aria-expanded=false]{height:0}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:'';position:absolute;top:-16px;bottom:-16px;left:0;border-left-width:1px;border-left-style:solid}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}"],
                    inputs: ['selectedIndex'],
                    host: {
                        'class': 'mat-stepper-vertical',
                        'aria-orientation': 'vertical',
                        'role': 'tablist',
                    },
                    animations: [
                        _angular_animations.trigger('stepTransition', [
                            _angular_animations.state('previous', _angular_animations.style({ height: '0px', visibility: 'hidden' })),
                            _angular_animations.state('next', _angular_animations.style({ height: '0px', visibility: 'hidden' })),
                            _angular_animations.state('current', _angular_animations.style({ height: '*', visibility: 'visible' })),
                            _angular_animations.transition('* <=> current', _angular_animations.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
                        ])
                    ],
                    providers: [{ provide: MatStepper, useExisting: MatVerticalStepper }],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatVerticalStepper.ctorParameters = function () { return [
        { type: _angular_cdk_bidi.Directionality, decorators: [{ type: _angular_core.Optional },] },
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    return MatVerticalStepper;
}(MatStepper));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Button that moves to the next step in a stepper workflow.
 */
var MatStepperNext = /** @class */ (function (_super) {
    __extends(MatStepperNext, _super);
    function MatStepperNext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatStepperNext.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'button[matStepperNext]',
                    host: { '(click)': '_stepper.next()' },
                    providers: [{ provide: _angular_cdk_stepper.CdkStepper, useExisting: MatStepper }]
                },] },
    ];
    /** @nocollapse */
    MatStepperNext.ctorParameters = function () { return []; };
    return MatStepperNext;
}(_angular_cdk_stepper.CdkStepperNext));
/**
 * Button that moves to the previous step in a stepper workflow.
 */
var MatStepperPrevious = /** @class */ (function (_super) {
    __extends(MatStepperPrevious, _super);
    function MatStepperPrevious() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatStepperPrevious.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'button[matStepperPrevious]',
                    host: { '(click)': '_stepper.previous()' },
                    providers: [{ provide: _angular_cdk_stepper.CdkStepper, useExisting: MatStepper }]
                },] },
    ];
    /** @nocollapse */
    MatStepperPrevious.ctorParameters = function () { return []; };
    return MatStepperPrevious;
}(_angular_cdk_stepper.CdkStepperPrevious));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatStepperModule = /** @class */ (function () {
    function MatStepperModule() {
    }
    MatStepperModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_material_core.MatCommonModule,
                        _angular_common.CommonModule,
                        _angular_cdk_portal.PortalModule,
                        _angular_material_button.MatButtonModule,
                        _angular_cdk_stepper.CdkStepperModule,
                        _angular_material_icon.MatIconModule,
                        _angular_cdk_a11y.A11yModule,
                        _angular_material_core.MatRippleModule,
                    ],
                    exports: [
                        _angular_material_core.MatCommonModule,
                        MatHorizontalStepper,
                        MatVerticalStepper,
                        MatStep,
                        MatStepLabel,
                        MatStepper,
                        MatStepperNext,
                        MatStepperPrevious,
                        MatStepHeader
                    ],
                    declarations: [MatHorizontalStepper, MatVerticalStepper, MatStep, MatStepLabel, MatStepper,
                        MatStepperNext, MatStepperPrevious, MatStepHeader],
                    providers: [MatStepperIntl, _angular_material_core.ErrorStateMatcher],
                },] },
    ];
    /** @nocollapse */
    MatStepperModule.ctorParameters = function () { return []; };
    return MatStepperModule;
}());

exports.MatStepperModule = MatStepperModule;
exports.MatStepLabel = MatStepLabel;
exports.MatStep = MatStep;
exports.MatStepper = MatStepper;
exports.MatHorizontalStepper = MatHorizontalStepper;
exports.MatVerticalStepper = MatVerticalStepper;
exports.MatStepperNext = MatStepperNext;
exports.MatStepperPrevious = MatStepperPrevious;
exports.MatStepHeader = MatStepHeader;
exports.MatStepperIntl = MatStepperIntl;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-stepper.umd.js.map
