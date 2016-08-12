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
var index_1 = require('../index');
var exceptions_1 = require('../src/facade/exceptions');
/**
 * Special interface to the compiler only used by testing
 *
 * @experimental
 */
var TestingCompiler = (function (_super) {
    __extends(TestingCompiler, _super);
    function TestingCompiler() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(TestingCompiler.prototype, "injector", {
        get: function () { throw exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    TestingCompiler.prototype.overrideModule = function (module, overrides) {
        throw exceptions_1.unimplemented();
    };
    TestingCompiler.prototype.overrideDirective = function (directive, overrides) {
        throw exceptions_1.unimplemented();
    };
    TestingCompiler.prototype.overrideComponent = function (component, overrides) {
        throw exceptions_1.unimplemented();
    };
    TestingCompiler.prototype.overridePipe = function (directive, overrides) {
        throw exceptions_1.unimplemented();
    };
    return TestingCompiler;
}(index_1.Compiler));
exports.TestingCompiler = TestingCompiler;
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
var TestingCompilerFactory = (function () {
    function TestingCompilerFactory() {
    }
    return TestingCompilerFactory;
}());
exports.TestingCompilerFactory = TestingCompilerFactory;
//# sourceMappingURL=test_compiler.js.map