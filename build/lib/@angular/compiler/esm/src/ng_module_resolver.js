/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, NgModuleMetadata } from '@angular/core';
import { ReflectorReader, reflector } from '../core_private';
import { BaseException } from '../src/facade/exceptions';
import { isPresent, stringify } from './facade/lang';
function _isNgModuleMetadata(obj) {
    return obj instanceof NgModuleMetadata;
}
export class NgModuleResolver {
    constructor(_reflector = reflector) {
        this._reflector = _reflector;
    }
    resolve(type, throwIfNotFound = true) {
        const ngModuleMeta = this._reflector.annotations(type).find(_isNgModuleMetadata);
        if (isPresent(ngModuleMeta)) {
            return ngModuleMeta;
        }
        else {
            if (throwIfNotFound) {
                throw new BaseException(`No NgModule metadata found for '${stringify(type)}'.`);
            }
            return null;
        }
    }
}
/** @nocollapse */
NgModuleResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgModuleResolver.ctorParameters = [
    { type: ReflectorReader, },
];
//# sourceMappingURL=ng_module_resolver.js.map