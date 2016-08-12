/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { LocationStrategy } from '../index';
import { EventEmitter } from '../src/facade/async';
export class MockLocationStrategy extends LocationStrategy {
    constructor() {
        super();
        this.internalBaseHref = '/';
        this.internalPath = '/';
        this.internalTitle = '';
        this.urlChanges = [];
        /** @internal */
        this._subject = new EventEmitter();
    }
    simulatePopState(url) {
        this.internalPath = url;
        this._subject.emit(new _MockPopStateEvent(this.path()));
    }
    path(includeHash = false) { return this.internalPath; }
    prepareExternalUrl(internal) {
        if (internal.startsWith('/') && this.internalBaseHref.endsWith('/')) {
            return this.internalBaseHref + internal.substring(1);
        }
        return this.internalBaseHref + internal;
    }
    pushState(ctx, title, path, query) {
        this.internalTitle = title;
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push(externalUrl);
    }
    replaceState(ctx, title, path, query) {
        this.internalTitle = title;
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push('replace: ' + externalUrl);
    }
    onPopState(fn) { this._subject.subscribe({ next: fn }); }
    getBaseHref() { return this.internalBaseHref; }
    back() {
        if (this.urlChanges.length > 0) {
            this.urlChanges.pop();
            var nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
            this.simulatePopState(nextUrl);
        }
    }
    forward() { throw 'not implemented'; }
}
/** @nocollapse */
MockLocationStrategy.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MockLocationStrategy.ctorParameters = [];
class _MockPopStateEvent {
    constructor(newUrl) {
        this.newUrl = newUrl;
        this.pop = true;
        this.type = 'popstate';
    }
}
//# sourceMappingURL=mock_location_strategy.js.map