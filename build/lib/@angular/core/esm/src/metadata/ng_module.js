/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectableMetadata } from '../di/metadata';
/**
 * Defines a schema that will allow any property on elements with a `-` in their name,
 * which is the common rule for custom elements.
 *
 * @experimental
 */
export const CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Declares an Angular Module.
 * @experimental
 */
export class NgModuleMetadata extends InjectableMetadata {
    constructor(options = {}) {
        // We cannot use destructuring of the constructor argument because `exports` is a
        // protected symbol in CommonJS and closure tries to aggressively optimize it away.
        super();
        this._providers = options.providers;
        this.declarations = options.declarations;
        this.imports = options.imports;
        this.exports = options.exports;
        this.entryComponents = options.entryComponents;
        this.bootstrap = options.bootstrap;
        this.schemas = options.schemas;
    }
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
    get providers() { return this._providers; }
}
//# sourceMappingURL=ng_module.js.map