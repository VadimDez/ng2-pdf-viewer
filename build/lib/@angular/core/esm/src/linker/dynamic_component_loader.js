/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, ReflectiveInjector } from '../di';
import { isPresent } from '../facade/lang';
import { Compiler } from './compiler';
/**
 * Use ComponentFactoryResolver and ViewContainerRef directly.
 *
 * @deprecated
 */
export class DynamicComponentLoader {
}
export class DynamicComponentLoader_ extends DynamicComponentLoader {
    constructor(_compiler) {
        super();
        this._compiler = _compiler;
    }
    loadAsRoot(type, overrideSelectorOrNode, injector, onDispose, projectableNodes) {
        return this._compiler.compileComponentAsync(type).then(componentFactory => {
            var componentRef = componentFactory.create(injector, projectableNodes, isPresent(overrideSelectorOrNode) ? overrideSelectorOrNode : componentFactory.selector);
            if (isPresent(onDispose)) {
                componentRef.onDestroy(onDispose);
            }
            return componentRef;
        });
    }
    loadNextToLocation(type, location, providers = null, projectableNodes = null) {
        return this._compiler.compileComponentAsync(type).then(componentFactory => {
            var contextInjector = location.parentInjector;
            var childInjector = isPresent(providers) && providers.length > 0 ?
                ReflectiveInjector.fromResolvedProviders(providers, contextInjector) :
                contextInjector;
            return location.createComponent(componentFactory, location.length, childInjector, projectableNodes);
        });
    }
}
/** @nocollapse */
DynamicComponentLoader_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DynamicComponentLoader_.ctorParameters = [
    { type: Compiler, },
];
//# sourceMappingURL=dynamic_component_loader.js.map