/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('rxjs/operators/debounceTime')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', 'rxjs/operators/debounceTime'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.observers = global.ng.cdk.observers || {}),global.ng.core,global.Rx,global.Rx.operators));
}(this, (function (exports,_angular_core,rxjs_Subject,rxjs_operators_debounceTime) { 'use strict';

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
        { type: _angular_core.Injectable },
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
        this.event = new _angular_core.EventEmitter();
        /**
         * Used for debouncing the emitted values to the observeContent event.
         */
        this._debouncer = new rxjs_Subject.Subject();
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
                _this._debouncer.pipe(rxjs_operators_debounceTime.debounceTime(_this.debounce))
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
        { type: _angular_core.Directive, args: [{
                    selector: '[cdkObserveContent]',
                    exportAs: 'cdkObserveContent',
                },] },
    ];
    /** @nocollapse */
    CdkObserveContent.ctorParameters = function () { return [
        { type: MutationObserverFactory, },
        { type: _angular_core.ElementRef, },
        { type: _angular_core.NgZone, },
    ]; };
    CdkObserveContent.propDecorators = {
        "event": [{ type: _angular_core.Output, args: ['cdkObserveContent',] },],
        "debounce": [{ type: _angular_core.Input },],
    };
    return CdkObserveContent;
}());
var ObserversModule = /** @class */ (function () {
    function ObserversModule() {
    }
    ObserversModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    exports: [CdkObserveContent],
                    declarations: [CdkObserveContent],
                    providers: [MutationObserverFactory]
                },] },
    ];
    /** @nocollapse */
    ObserversModule.ctorParameters = function () { return []; };
    return ObserversModule;
}());

exports.ObserveContent = CdkObserveContent;
exports.MutationObserverFactory = MutationObserverFactory;
exports.CdkObserveContent = CdkObserveContent;
exports.ObserversModule = ObserversModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-observers.umd.js.map
