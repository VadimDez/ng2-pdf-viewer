/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Console } from '../console';
import { Injectable } from '../di';
import { global, isString } from '../facade/lang';
import { ComponentResolver } from './component_resolver';
const _SEPARATOR = '#';
export class SystemJsComponentResolver {
    constructor(_resolver, _console) {
        this._resolver = _resolver;
        this._console = _console;
    }
    resolveComponent(componentType) {
        if (isString(componentType)) {
            this._console.warn(ComponentResolver.LazyLoadingDeprecationMsg);
            let [module, component] = componentType.split(_SEPARATOR);
            if (component === void (0)) {
                // Use the default export when no component is specified
                component = 'default';
            }
            return global
                .System.import(module)
                .then((module) => this._resolver.resolveComponent(module[component]));
        }
        return this._resolver.resolveComponent(componentType);
    }
    clearCache() { }
}
/** @nocollapse */
SystemJsComponentResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SystemJsComponentResolver.ctorParameters = [
    { type: ComponentResolver, },
    { type: Console, },
];
const FACTORY_MODULE_SUFFIX = '.ngfactory';
const FACTORY_CLASS_SUFFIX = 'NgFactory';
export class SystemJsCmpFactoryResolver {
    constructor(_console) {
        this._console = _console;
    }
    resolveComponent(componentType) {
        if (isString(componentType)) {
            this._console.warn(ComponentResolver.LazyLoadingDeprecationMsg);
            let [module, factory] = componentType.split(_SEPARATOR);
            return global
                .System.import(module + FACTORY_MODULE_SUFFIX)
                .then((module) => module[factory + FACTORY_CLASS_SUFFIX]);
        }
        return Promise.resolve(null);
    }
    clearCache() { }
}
/** @nocollapse */
SystemJsCmpFactoryResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SystemJsCmpFactoryResolver.ctorParameters = [
    { type: Console, },
];
//# sourceMappingURL=systemjs_component_resolver.js.map