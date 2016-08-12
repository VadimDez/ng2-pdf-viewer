/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var collection_1 = require('./facade/collection');
var exceptions_1 = require('./facade/exceptions');
var lang_1 = require('./facade/lang');
var util_1 = require('./util');
function _isDirectiveMetadata(type) {
    return type instanceof core_1.DirectiveMetadata;
}
var DirectiveResolver = (function () {
    function DirectiveResolver(_reflector) {
        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
        this._reflector = _reflector;
    }
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    DirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var typeMetadata = this._reflector.annotations(core_1.resolveForwardRef(type));
        if (lang_1.isPresent(typeMetadata)) {
            var metadata = typeMetadata.find(_isDirectiveMetadata);
            if (lang_1.isPresent(metadata)) {
                var propertyMetadata = this._reflector.propMetadata(type);
                return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
            }
        }
        if (throwIfNotFound) {
            throw new exceptions_1.BaseException("No Directive annotation found on " + lang_1.stringify(type));
        }
        return null;
    };
    DirectiveResolver.prototype._mergeWithPropertyMetadata = function (dm, propertyMetadata, directiveType) {
        var inputs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        collection_1.StringMapWrapper.forEach(propertyMetadata, function (metadata, propName) {
            metadata.forEach(function (a) {
                if (a instanceof core_1.InputMetadata) {
                    if (lang_1.isPresent(a.bindingPropertyName)) {
                        inputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                else if (a instanceof core_1.OutputMetadata) {
                    if (lang_1.isPresent(a.bindingPropertyName)) {
                        outputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                else if (a instanceof core_1.HostBindingMetadata) {
                    if (lang_1.isPresent(a.hostPropertyName)) {
                        host[("[" + a.hostPropertyName + "]")] = propName;
                    }
                    else {
                        host[("[" + propName + "]")] = propName;
                    }
                }
                else if (a instanceof core_1.HostListenerMetadata) {
                    var args = lang_1.isPresent(a.args) ? a.args.join(', ') : '';
                    host[("(" + a.eventName + ")")] = propName + "(" + args + ")";
                }
                else if (a instanceof core_1.QueryMetadata) {
                    queries[propName] = a;
                }
            });
        });
        return this._merge(dm, inputs, outputs, host, queries, directiveType);
    };
    DirectiveResolver.prototype._extractPublicName = function (def) { return util_1.splitAtColon(def, [null, def])[1].trim(); };
    DirectiveResolver.prototype._merge = function (dm, inputs, outputs, host, queries, directiveType) {
        var _this = this;
        var mergedInputs;
        if (lang_1.isPresent(dm.inputs)) {
            var inputNames_1 = dm.inputs.map(function (def) { return _this._extractPublicName(def); });
            inputs.forEach(function (inputDef) {
                var publicName = _this._extractPublicName(inputDef);
                if (inputNames_1.indexOf(publicName) > -1) {
                    throw new exceptions_1.BaseException("Input '" + publicName + "' defined multiple times in '" + lang_1.stringify(directiveType) + "'");
                }
            });
            mergedInputs = dm.inputs.concat(inputs);
        }
        else {
            mergedInputs = inputs;
        }
        var mergedOutputs;
        if (lang_1.isPresent(dm.outputs)) {
            var outputNames_1 = dm.outputs.map(function (def) { return _this._extractPublicName(def); });
            outputs.forEach(function (outputDef) {
                var publicName = _this._extractPublicName(outputDef);
                if (outputNames_1.indexOf(publicName) > -1) {
                    throw new exceptions_1.BaseException("Output event '" + publicName + "' defined multiple times in '" + lang_1.stringify(directiveType) + "'");
                }
            });
            mergedOutputs = dm.outputs.concat(outputs);
        }
        else {
            mergedOutputs = outputs;
        }
        var mergedHost = lang_1.isPresent(dm.host) ? collection_1.StringMapWrapper.merge(dm.host, host) : host;
        var mergedQueries = lang_1.isPresent(dm.queries) ? collection_1.StringMapWrapper.merge(dm.queries, queries) : queries;
        if (dm instanceof core_1.ComponentMetadata) {
            return new core_1.ComponentMetadata({
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
            return new core_1.DirectiveMetadata({
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
    /** @nocollapse */
    DirectiveResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DirectiveResolver.ctorParameters = [
        { type: core_private_1.ReflectorReader, },
    ];
    return DirectiveResolver;
}());
exports.DirectiveResolver = DirectiveResolver;
//# sourceMappingURL=directive_resolver.js.map