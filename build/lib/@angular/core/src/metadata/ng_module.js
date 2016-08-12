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
var metadata_1 = require('../di/metadata');
/**
 * Defines a schema that will allow any property on elements with a `-` in their name,
 * which is the common rule for custom elements.
 *
 * @experimental
 */
exports.CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Declares an Angular Module.
 * @experimental
 */
var NgModuleMetadata = (function (_super) {
    __extends(NgModuleMetadata, _super);
    function NgModuleMetadata(options) {
        if (options === void 0) { options = {}; }
        // We cannot use destructuring of the constructor argument because `exports` is a
        // protected symbol in CommonJS and closure tries to aggressively optimize it away.
        _super.call(this);
        this._providers = options.providers;
        this.declarations = options.declarations;
        this.imports = options.imports;
        this.exports = options.exports;
        this.entryComponents = options.entryComponents;
        this.bootstrap = options.bootstrap;
        this.schemas = options.schemas;
    }
    Object.defineProperty(NgModuleMetadata.prototype, "providers", {
        /**
         * Defines the set of injectable objects that are available in the injector
         * of this module.
         *
         * ## Simple Example
         *
         * Here is an example of a class that can be injected:
         *
         * ```
         * class Greeter {
         *    greet(name:string) {
         *      return 'Hello ' + name + '!';
         *    }
         * }
         *
         * @NgModule({
         *   providers: [
         *     Greeter
         *   ]
         * })
         * class HelloWorld {
         *   greeter:Greeter;
         *
         *   constructor(greeter:Greeter) {
         *     this.greeter = greeter;
         *   }
         * }
         * ```
         */
        get: function () { return this._providers; },
        enumerable: true,
        configurable: true
    });
    return NgModuleMetadata;
}(metadata_1.InjectableMetadata));
exports.NgModuleMetadata = NgModuleMetadata;
//# sourceMappingURL=ng_module.js.map