/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, EventEmitter, Injectable, Input, NgModule, NgZone, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * \@docs-private
 */
var MutationObserverFactory = /** @class */ (function () {
    function MutationObserverFactory() {
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    MutationObserverFactory.prototype.create = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    };
    MutationObserverFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MutationObserverFactory.ctorParameters = function () { return []; };
    return MutationObserverFactory;
}());
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var CdkObserveContent = /** @class */ (function () {
    function CdkObserveContent(_mutationObserverFactory, _elementRef, _ngZone) {
        this._mutationObserverFactory = _mutationObserverFactory;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        /**
         * Event emitted for each change in the element's content.
         */
        this.event = new EventEmitter();
        /**
         * Used for debouncing the emitted values to the observeContent event.
         */
        this._debouncer = new Subject();
    }
    /**
     * @return {?}
     */
    CdkObserveContent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.debounce > 0) {
            this._ngZone.runOutsideAngular(function () {
                _this._debouncer.pipe(debounceTime(_this.debounce))
                    .subscribe(function (mutations) { return _this.event.emit(mutations); });
            });
        }
        else {
            this._debouncer.subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        this._observer = this._ngZone.runOutsideAngular(function () {
            return _this._mutationObserverFactory.create(function (mutations) {
                _this._debouncer.next(mutations);
            });
        });
        if (this._observer) {
            this._observer.observe(this._elementRef.nativeElement, {
                'characterData': true,
                'childList': true,
                'subtree': true
            });
        }
    };
    /**
     * @return {?}
     */
    CdkObserveContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._observer) {
            this._observer.disconnect();
        }
        this._debouncer.complete();
    };
    CdkObserveContent.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkObserveContent]',
                    exportAs: 'cdkObserveContent',
                },] },
    ];
    /** @nocollapse */
    CdkObserveContent.ctorParameters = function () { return [
        { type: MutationObserverFactory, },
        { type: ElementRef, },
        { type: NgZone, },
    ]; };
    CdkObserveContent.propDecorators = {
        "event": [{ type: Output, args: ['cdkObserveContent',] },],
        "debounce": [{ type: Input },],
    };
    return CdkObserveContent;
}());
var ObserversModule = /** @class */ (function () {
    function ObserversModule() {
    }
    ObserversModule.decorators = [
        { type: NgModule, args: [{
                    exports: [CdkObserveContent],
                    declarations: [CdkObserveContent],
                    providers: [MutationObserverFactory]
                },] },
    ];
    /** @nocollapse */
    ObserversModule.ctorParameters = function () { return []; };
    return ObserversModule;
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

export { CdkObserveContent as ObserveContent, MutationObserverFactory, CdkObserveContent, ObserversModule };
//# sourceMappingURL=observers.es5.js.map
