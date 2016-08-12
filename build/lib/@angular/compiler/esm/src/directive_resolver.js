/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentMetadata, DirectiveMetadata, HostBindingMetadata, HostListenerMetadata, Injectable, InputMetadata, OutputMetadata, QueryMetadata, resolveForwardRef } from '@angular/core';
import { ReflectorReader, reflector } from '../core_private';
import { StringMapWrapper } from './facade/collection';
import { BaseException } from './facade/exceptions';
import { isPresent, stringify } from './facade/lang';
import { splitAtColon } from './util';
function _isDirectiveMetadata(type) {
    return type instanceof DirectiveMetadata;
}
export class DirectiveResolver {
    constructor(_reflector = reflector) {
        this._reflector = _reflector;
    }
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    resolve(type, throwIfNotFound = true) {
        var typeMetadata = this._reflector.annotations(resolveForwardRef(type));
        if (isPresent(typeMetadata)) {
            var metadata = typeMetadata.find(_isDirectiveMetadata);
            if (isPresent(metadata)) {
                var propertyMetadata = this._reflector.propMetadata(type);
                return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
            }
        }
        if (throwIfNotFound) {
            throw new BaseException(`No Directive annotation found on ${stringify(type)}`);
        }
        return null;
    }
    _mergeWithPropertyMetadata(dm, propertyMetadata, directiveType) {
        var inputs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        StringMapWrapper.forEach(propertyMetadata, (metadata, propName) => {
            metadata.forEach(a => {
                if (a instanceof InputMetadata) {
                    if (isPresent(a.bindingPropertyName)) {
                        inputs.push(`${propName}: ${a.bindingPropertyName}`);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                else if (a instanceof OutputMetadata) {
                    if (isPresent(a.bindingPropertyName)) {
                        outputs.push(`${propName}: ${a.bindingPropertyName}`);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                else if (a instanceof HostBindingMetadata) {
                    if (isPresent(a.hostPropertyName)) {
                        host[`[${a.hostPropertyName}]`] = propName;
                    }
                    else {
                        host[`[${propName}]`] = propName;
                    }
                }
                else if (a instanceof HostListenerMetadata) {
                    var args = isPresent(a.args) ? a.args.join(', ') : '';
                    host[`(${a.eventName})`] = `${propName}(${args})`;
                }
                else if (a instanceof QueryMetadata) {
                    queries[propName] = a;
                }
            });
        });
        return this._merge(dm, inputs, outputs, host, queries, directiveType);
    }
    _extractPublicName(def) { return splitAtColon(def, [null, def])[1].trim(); }
    _merge(dm, inputs, outputs, host, queries, directiveType) {
        let mergedInputs;
        if (isPresent(dm.inputs)) {
            const inputNames = dm.inputs.map((def) => this._extractPublicName(def));
            inputs.forEach((inputDef) => {
                const publicName = this._extractPublicName(inputDef);
                if (inputNames.indexOf(publicName) > -1) {
                    throw new BaseException(`Input '${publicName}' defined multiple times in '${stringify(directiveType)}'`);
                }
            });
            mergedInputs = dm.inputs.concat(inputs);
        }
        else {
            mergedInputs = inputs;
        }
        let mergedOutputs;
        if (isPresent(dm.outputs)) {
            const outputNames = dm.outputs.map((def) => this._extractPublicName(def));
            outputs.forEach((outputDef) => {
                const publicName = this._extractPublicName(outputDef);
                if (outputNames.indexOf(publicName) > -1) {
                    throw new BaseException(`Output event '${publicName}' defined multiple times in '${stringify(directiveType)}'`);
                }
            });
            mergedOutputs = dm.outputs.concat(outputs);
        }
        else {
            mergedOutputs = outputs;
        }
        var mergedHost = isPresent(dm.host) ? StringMapWrapper.merge(dm.host, host) : host;
        var mergedQueries = isPresent(dm.queries) ? StringMapWrapper.merge(dm.queries, queries) : queries;
        if (dm instanceof ComponentMetadata) {
            return new ComponentMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: mergedQueries,
                changeDetection: dm.changeDetection,
                providers: dm.providers,
                viewProviders: dm.viewProviders,
                entryComponents: dm.entryComponents,
                directives: dm.directives,
                pipes: dm.pipes,
                template: dm.template,
                templateUrl: dm.templateUrl,
                styles: dm.styles,
                styleUrls: dm.styleUrls,
                encapsulation: dm.encapsulation,
                animations: dm.animations,
                interpolation: dm.interpolation
            });
        }
        else {
            return new DirectiveMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                queries: mergedQueries,
                providers: dm.providers
            });
        }
    }
}
/** @nocollapse */
DirectiveResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DirectiveResolver.ctorParameters = [
    { type: ReflectorReader, },
];
//# sourceMappingURL=directive_resolver.js.map