/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentMetadata, DirectiveMetadata, HostBindingMetadata, HostListenerMetadata, Injectable, InputMetadata, OutputMetadata, QueryMetadata, resolveForwardRef } from '@angular/core';
import { StringMapWrapper } from './facade/collection';
import { isPresent, stringify } from './facade/lang';
import { ReflectorReader, reflector } from './private_import_core';
import { splitAtColon } from './util';
function _isDirectiveMetadata(type) {
    return type instanceof DirectiveMetadata;
}
/*
 * Resolve a `Type` for {@link DirectiveMetadata}.
 *
 * This interface can be overridden by the application developer to create custom behavior.
 *
 * See {@link Compiler}
 */
export var DirectiveResolver = (function () {
    function DirectiveResolver(_reflector) {
        if (_reflector === void 0) { _reflector = reflector; }
        this._reflector = _reflector;
    }
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    DirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var typeMetadata = this._reflector.annotations(resolveForwardRef(type));
        if (isPresent(typeMetadata)) {
            var metadata = typeMetadata.find(_isDirectiveMetadata);
            if (isPresent(metadata)) {
                var propertyMetadata = this._reflector.propMetadata(type);
                return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
            }
        }
        if (throwIfNotFound) {
            throw new Error("No Directive annotation found on " + stringify(type));
        }
        return null;
    };
    DirectiveResolver.prototype._mergeWithPropertyMetadata = function (dm, propertyMetadata, directiveType) {
        var inputs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        StringMapWrapper.forEach(propertyMetadata, function (metadata, propName) {
            metadata.forEach(function (a) {
                if (a instanceof InputMetadata) {
                    if (isPresent(a.bindingPropertyName)) {
                        inputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                else if (a instanceof OutputMetadata) {
                    if (isPresent(a.bindingPropertyName)) {
                        outputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                else if (a instanceof HostBindingMetadata) {
                    if (isPresent(a.hostPropertyName)) {
                        host[("[" + a.hostPropertyName + "]")] = propName;
                    }
                    else {
                        host[("[" + propName + "]")] = propName;
                    }
                }
                else if (a instanceof HostListenerMetadata) {
                    var args = isPresent(a.args) ? a.args.join(', ') : '';
                    host[("(" + a.eventName + ")")] = propName + "(" + args + ")";
                }
                else if (a instanceof QueryMetadata) {
                    queries[propName] = a;
                }
            });
        });
        return this._merge(dm, inputs, outputs, host, queries, directiveType);
    };
    DirectiveResolver.prototype._extractPublicName = function (def) { return splitAtColon(def, [null, def])[1].trim(); };
    DirectiveResolver.prototype._merge = function (dm, inputs, outputs, host, queries, directiveType) {
        var _this = this;
        var mergedInputs;
        if (isPresent(dm.inputs)) {
            var inputNames_1 = dm.inputs.map(function (def) { return _this._extractPublicName(def); });
            inputs.forEach(function (inputDef) {
                var publicName = _this._extractPublicName(inputDef);
                if (inputNames_1.indexOf(publicName) > -1) {
                    throw new Error("Input '" + publicName + "' defined multiple times in '" + stringify(directiveType) + "'");
                }
            });
            mergedInputs = dm.inputs.concat(inputs);
        }
        else {
            mergedInputs = inputs;
        }
        var mergedOutputs;
        if (isPresent(dm.outputs)) {
            var outputNames_1 = dm.outputs.map(function (def) { return _this._extractPublicName(def); });
            outputs.forEach(function (outputDef) {
                var publicName = _this._extractPublicName(outputDef);
                if (outputNames_1.indexOf(publicName) > -1) {
                    throw new Error("Output event '" + publicName + "' defined multiple times in '" + stringify(directiveType) + "'");
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
    };
    DirectiveResolver.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DirectiveResolver.ctorParameters = [
        { type: ReflectorReader, },
    ];
    return DirectiveResolver;
}());
//# sourceMappingURL=directive_resolver.js.map