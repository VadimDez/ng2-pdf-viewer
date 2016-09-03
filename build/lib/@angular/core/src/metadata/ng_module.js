/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { InjectableMetadata } from '../di';
/**
 * Defines a schema that will allow:
 * - any non-angular elements with a `-` in their name,
 * - any properties on elements with a `-` in their name which is the common rule for custom
 * elements.
 *
 * @stable
 */
export var CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Defines a schema that will allow any property on any element.
 *
 * @experimental
 */
export var NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
/**
 * Declares an Angular Module.
 * @stable
 */
export var NgModuleMetadata = (function (_super) {
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
}(InjectableMetadata));
//# sourceMappingURL=ng_module.js.map