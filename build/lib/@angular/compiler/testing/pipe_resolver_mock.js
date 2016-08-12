/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var index_1 = require('../index');
var collection_1 = require('../src/facade/collection');
var MockPipeResolver = (function (_super) {
    __extends(MockPipeResolver, _super);
    function MockPipeResolver(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._pipes = new collection_1.Map();
    }
    Object.defineProperty(MockPipeResolver.prototype, "_compiler", {
        get: function () { return this._injector.get(core_1.Compiler); },
        enumerable: true,
        configurable: true
    });
    MockPipeResolver.prototype._clearCacheFor = function (pipe) { this._compiler.clearCacheFor(pipe); };
    /**
     * Overrides the {@link PipeMetadata} for a pipe.
     */
    MockPipeResolver.prototype.setPipe = function (type, metadata) {
        this._pipes.set(type, metadata);
        this._clearCacheFor(type);
    };
    /**
     * Returns the {@link PipeMetadata} for a pipe:
     * - Set the {@link PipeMetadata} to the overridden view when it exists or fallback to the
     * default
     * `PipeResolver`, see `setPipe`.
     */
    MockPipeResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var metadata = this._pipes.get(type);
        if (!metadata) {
            metadata = _super.prototype.resolve.call(this, type, throwIfNotFound);
        }
        return metadata;
    };
    /** @nocollapse */
    MockPipeResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MockPipeResolver.ctorParameters = [
        { type: core_1.Injector, },
    ];
    return MockPipeResolver;
}(index_1.PipeResolver));
exports.MockPipeResolver = MockPipeResolver;
//# sourceMappingURL=pipe_resolver_mock.js.map