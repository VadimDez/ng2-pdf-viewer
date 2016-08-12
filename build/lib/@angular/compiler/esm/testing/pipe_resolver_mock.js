/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler, Injectable, Injector } from '@angular/core';
import { PipeResolver } from '../index';
import { Map } from '../src/facade/collection';
export class MockPipeResolver extends PipeResolver {
    constructor(_injector) {
        super();
        this._injector = _injector;
        this._pipes = new Map();
    }
    get _compiler() { return this._injector.get(Compiler); }
    _clearCacheFor(pipe) { this._compiler.clearCacheFor(pipe); }
    /**
     * Overrides the {@link PipeMetadata} for a pipe.
     */
    setPipe(type, metadata) {
        this._pipes.set(type, metadata);
        this._clearCacheFor(type);
    }
    /**
     * Returns the {@link PipeMetadata} for a pipe:
     * - Set the {@link PipeMetadata} to the overridden view when it exists or fallback to the
     * default
     * `PipeResolver`, see `setPipe`.
     */
    resolve(type, throwIfNotFound = true) {
        var metadata = this._pipes.get(type);
        if (!metadata) {
            metadata = super.resolve(type, throwIfNotFound);
        }
        return metadata;
    }
}
/** @nocollapse */
MockPipeResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MockPipeResolver.ctorParameters = [
    { type: Injector, },
];
//# sourceMappingURL=pipe_resolver_mock.js.map