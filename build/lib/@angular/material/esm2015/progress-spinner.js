/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, NgModule, Optional, ViewEncapsulation } from '@angular/core';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { MatCommonModule, mixinColor } from '@angular/material/core';
import { DOCUMENT } from '@angular/common';
import { coerceNumberProperty } from '@angular/cdk/coercion';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Base reference size of the spinner.
 * \@docs-private
 */
const BASE_SIZE = 100;
/**
 * Base reference stroke width of the spinner.
 * \@docs-private
 */
const BASE_STROKE_WIDTH = 10;
/**
 * \@docs-private
 */
class MatProgressSpinnerBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatProgressSpinnerMixinBase = mixinColor(MatProgressSpinnerBase, 'primary');
const INDETERMINATE_ANIMATION_TEMPLATE = `
 @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {
    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
    12.51%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }

    25.1%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
    37.51%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }

    50.01%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
    62.51%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }

    75.01%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
    87.51%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
  }
`;
/**
 * <mat-progress-spinner> component.
 */
class MatProgressSpinner extends _MatProgressSpinnerMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} platform
     * @param {?} _document
     */
    constructor(_elementRef, platform, _document) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._document = _document;
        this._value = 0;
        this._fallbackAnimation = false;
        /**
         * The width and height of the host element. Will grow with stroke width. *
         */
        this._elementSize = BASE_SIZE;
        this._diameter = BASE_SIZE;
        /**
         * Mode of the progress circle
         */
        this.mode = 'determinate';
        this._fallbackAnimation = platform.EDGE || platform.TRIDENT;
        // On IE and Edge, we can't animate the `stroke-dashoffset`
        // reliably so we fall back to a non-spec animation.
        const /** @type {?} */ animationClass = `mat-progress-spinner-indeterminate${this._fallbackAnimation ? '-fallback' : ''}-animation`;
        _elementRef.nativeElement.classList.add(animationClass);
    }
    /**
     * The diameter of the progress spinner (will set width and height of svg).
     * @return {?}
     */
    get diameter() {
        return this._diameter;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set diameter(size) {
        this._diameter = coerceNumberProperty(size);
        if (!this._fallbackAnimation && !MatProgressSpinner.diameters.has(this._diameter)) {
            this._attachStyleNode();
        }
    }
    /**
     * Stroke width of the progress spinner.
     * @return {?}
     */
    get strokeWidth() {
        return this._strokeWidth || this.diameter / 10;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set strokeWidth(value) {
        this._strokeWidth = coerceNumberProperty(value);
    }
    /**
     * Value of the progress circle.
     * @return {?}
     */
    get value() {
        return this.mode === 'determinate' ? this._value : 0;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        this._value = Math.max(0, Math.min(100, coerceNumberProperty(newValue)));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["strokeWidth"] || changes["diameter"]) {
            this._elementSize = this._diameter + Math.max(this.strokeWidth - BASE_STROKE_WIDTH, 0);
        }
    }
    /**
     * The radius of the spinner, adjusted for stroke width.
     * @return {?}
     */
    get _circleRadius() {
        return (this.diameter - BASE_STROKE_WIDTH) / 2;
    }
    /**
     * The view box of the spinner's svg element.
     * @return {?}
     */
    get _viewBox() {
        const /** @type {?} */ viewBox = this._circleRadius * 2 + this.strokeWidth;
        return `0 0 ${viewBox} ${viewBox}`;
    }
    /**
     * The stroke circumference of the svg circle.
     * @return {?}
     */
    get _strokeCircumference() {
        return 2 * Math.PI * this._circleRadius;
    }
    /**
     * The dash offset of the svg circle.
     * @return {?}
     */
    get _strokeDashOffset() {
        if (this.mode === 'determinate') {
            return this._strokeCircumference * (100 - this._value) / 100;
        }
        // In fallback mode set the circle to 80% and rotate it with CSS.
        if (this._fallbackAnimation && this.mode === 'indeterminate') {
            return this._strokeCircumference * 0.2;
        }
        return null;
    }
    /**
     * Stroke width of the circle in percent.
     * @return {?}
     */
    get _circleStrokeWidth() {
        return this.strokeWidth / this._elementSize * 100;
    }
    /**
     * Dynamically generates a style tag containing the correct animation for this diameter.
     * @return {?}
     */
    _attachStyleNode() {
        let /** @type {?} */ styleTag = MatProgressSpinner.styleTag;
        if (!styleTag) {
            styleTag = this._document.createElement('style');
            this._document.head.appendChild(styleTag);
            MatProgressSpinner.styleTag = styleTag;
        }
        if (styleTag && styleTag.sheet) {
            (/** @type {?} */ (styleTag.sheet)).insertRule(this._getAnimationText(), 0);
        }
        MatProgressSpinner.diameters.add(this.diameter);
    }
    /**
     * Generates animation styles adjusted for the spinner's diameter.
     * @return {?}
     */
    _getAnimationText() {
        return INDETERMINATE_ANIMATION_TEMPLATE
            .replace(/START_VALUE/g, `${0.95 * this._strokeCircumference}`)
            .replace(/END_VALUE/g, `${0.2 * this._strokeCircumference}`)
            .replace(/DIAMETER/g, `${this.diameter}`);
    }
}
/**
 * Tracks diameters of existing instances to de-dupe generated styles (default d = 100)
 */
MatProgressSpinner.diameters = new Set([BASE_SIZE]);
/**
 * Used for storing all of the generated keyframe animations.
 * \@dynamic
 */
MatProgressSpinner.styleTag = null;
MatProgressSpinner.decorators = [
    { type: Component, args: [{selector: 'mat-progress-spinner',
                exportAs: 'matProgressSpinner',
                host: {
                    'role': 'progressbar',
                    'class': 'mat-progress-spinner',
                    '[style.width.px]': '_elementSize',
                    '[style.height.px]': '_elementSize',
                    '[attr.aria-valuemin]': 'mode === "determinate" ? 0 : null',
                    '[attr.aria-valuemax]': 'mode === "determinate" ? 100 : null',
                    '[attr.aria-valuenow]': 'value',
                    '[attr.mode]': 'mode',
                },
                inputs: ['color'],
                template: "<svg [style.width.px]=\"_elementSize\" [style.height.px]=\"_elementSize\" [attr.viewBox]=\"_viewBox\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\"><circle cx=\"50%\" cy=\"50%\" [attr.r]=\"_circleRadius\" [style.animation-name]=\"'mat-progress-spinner-stroke-rotate-' + diameter\" [style.stroke-dashoffset.px]=\"_strokeDashOffset\" [style.stroke-dasharray.px]=\"_strokeCircumference\" [style.stroke-width.%]=\"_circleStrokeWidth\"></circle></svg>",
                styles: [".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2s linear infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.51%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.1%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.51%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.01%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.51%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.01%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.51%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
MatProgressSpinner.ctorParameters = () => [
    { type: ElementRef, },
    { type: Platform, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
];
MatProgressSpinner.propDecorators = {
    "diameter": [{ type: Input },],
    "strokeWidth": [{ type: Input },],
    "mode": [{ type: Input },],
    "value": [{ type: Input },],
};
/**
 * <mat-spinner> component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate <mat-progress-spinner> instance.
 */
class MatSpinner extends MatProgressSpinner {
    /**
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} document
     */
    constructor(elementRef, platform, document) {
        super(elementRef, platform, document);
        this.mode = 'indeterminate';
    }
}
MatSpinner.decorators = [
    { type: Component, args: [{selector: 'mat-spinner',
                host: {
                    'role': 'progressbar',
                    'mode': 'indeterminate',
                    'class': 'mat-spinner mat-progress-spinner',
                    '[style.width.px]': '_elementSize',
                    '[style.height.px]': '_elementSize',
                },
                inputs: ['color'],
                template: "<svg [style.width.px]=\"_elementSize\" [style.height.px]=\"_elementSize\" [attr.viewBox]=\"_viewBox\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\"><circle cx=\"50%\" cy=\"50%\" [attr.r]=\"_circleRadius\" [style.animation-name]=\"'mat-progress-spinner-stroke-rotate-' + diameter\" [style.stroke-dashoffset.px]=\"_strokeDashOffset\" [style.stroke-dasharray.px]=\"_strokeCircumference\" [style.stroke-width.%]=\"_circleStrokeWidth\"></circle></svg>",
                styles: [".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2s linear infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.51%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.1%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.51%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.01%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.51%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.01%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.51%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
MatSpinner.ctorParameters = () => [
    { type: ElementRef, },
    { type: Platform, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class MatProgressSpinnerModule {
}
MatProgressSpinnerModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatCommonModule, PlatformModule],
                exports: [
                    MatProgressSpinner,
                    MatSpinner,
                    MatCommonModule
                ],
                declarations: [
                    MatProgressSpinner,
                    MatSpinner
                ],
            },] },
];
/** @nocollapse */
MatProgressSpinnerModule.ctorParameters = () => [];

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

export { MatProgressSpinnerModule, MatProgressSpinnerBase, _MatProgressSpinnerMixinBase, MatProgressSpinner, MatSpinner };
//# sourceMappingURL=progress-spinner.js.map
