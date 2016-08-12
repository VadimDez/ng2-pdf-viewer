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
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var collection_1 = require('./facade/collection');
var exceptions_1 = require('./facade/exceptions');
var lang_1 = require('./facade/lang');
var selector_1 = require('./selector');
var url_resolver_1 = require('./url_resolver');
var util_1 = require('./util');
// group 0: "[prop] or (event) or @trigger"
// group 1: "prop" from "[prop]"
// group 2: "event" from "(event)"
// group 3: "@trigger" from "@trigger"
var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
var UNDEFINED = new Object();
var CompileMetadataWithIdentifier = (function () {
    function CompileMetadataWithIdentifier() {
    }
    Object.defineProperty(CompileMetadataWithIdentifier.prototype, "identifier", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileMetadataWithIdentifier.prototype, "runtimeCacheKey", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileMetadataWithIdentifier.prototype, "assetCacheKey", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    CompileMetadataWithIdentifier.prototype.equalsTo = function (id2) { return exceptions_1.unimplemented(); };
    return CompileMetadataWithIdentifier;
}());
exports.CompileMetadataWithIdentifier = CompileMetadataWithIdentifier;
var CompileAnimationEntryMetadata = (function () {
    function CompileAnimationEntryMetadata(name, definitions) {
        if (name === void 0) { name = null; }
        if (definitions === void 0) { definitions = null; }
        this.name = name;
        this.definitions = definitions;
    }
    return CompileAnimationEntryMetadata;
}());
exports.CompileAnimationEntryMetadata = CompileAnimationEntryMetadata;
var CompileAnimationStateMetadata = (function () {
    function CompileAnimationStateMetadata() {
    }
    return CompileAnimationStateMetadata;
}());
exports.CompileAnimationStateMetadata = CompileAnimationStateMetadata;
var CompileAnimationStateDeclarationMetadata = (function (_super) {
    __extends(CompileAnimationStateDeclarationMetadata, _super);
    function CompileAnimationStateDeclarationMetadata(stateNameExpr, styles) {
        _super.call(this);
        this.stateNameExpr = stateNameExpr;
        this.styles = styles;
    }
    return CompileAnimationStateDeclarationMetadata;
}(CompileAnimationStateMetadata));
exports.CompileAnimationStateDeclarationMetadata = CompileAnimationStateDeclarationMetadata;
var CompileAnimationStateTransitionMetadata = (function (_super) {
    __extends(CompileAnimationStateTransitionMetadata, _super);
    function CompileAnimationStateTransitionMetadata(stateChangeExpr, steps) {
        _super.call(this);
        this.stateChangeExpr = stateChangeExpr;
        this.steps = steps;
    }
    return CompileAnimationStateTransitionMetadata;
}(CompileAnimationStateMetadata));
exports.CompileAnimationStateTransitionMetadata = CompileAnimationStateTransitionMetadata;
var CompileAnimationMetadata = (function () {
    function CompileAnimationMetadata() {
    }
    return CompileAnimationMetadata;
}());
exports.CompileAnimationMetadata = CompileAnimationMetadata;
var CompileAnimationKeyframesSequenceMetadata = (function (_super) {
    __extends(CompileAnimationKeyframesSequenceMetadata, _super);
    function CompileAnimationKeyframesSequenceMetadata(steps) {
        if (steps === void 0) { steps = []; }
        _super.call(this);
        this.steps = steps;
    }
    return CompileAnimationKeyframesSequenceMetadata;
}(CompileAnimationMetadata));
exports.CompileAnimationKeyframesSequenceMetadata = CompileAnimationKeyframesSequenceMetadata;
var CompileAnimationStyleMetadata = (function (_super) {
    __extends(CompileAnimationStyleMetadata, _super);
    function CompileAnimationStyleMetadata(offset, styles) {
        if (styles === void 0) { styles = null; }
        _super.call(this);
        this.offset = offset;
        this.styles = styles;
    }
    return CompileAnimationStyleMetadata;
}(CompileAnimationMetadata));
exports.CompileAnimationStyleMetadata = CompileAnimationStyleMetadata;
var CompileAnimationAnimateMetadata = (function (_super) {
    __extends(CompileAnimationAnimateMetadata, _super);
    function CompileAnimationAnimateMetadata(timings, styles) {
        if (timings === void 0) { timings = 0; }
        if (styles === void 0) { styles = null; }
        _super.call(this);
        this.timings = timings;
        this.styles = styles;
    }
    return CompileAnimationAnimateMetadata;
}(CompileAnimationMetadata));
exports.CompileAnimationAnimateMetadata = CompileAnimationAnimateMetadata;
var CompileAnimationWithStepsMetadata = (function (_super) {
    __extends(CompileAnimationWithStepsMetadata, _super);
    function CompileAnimationWithStepsMetadata(steps) {
        if (steps === void 0) { steps = null; }
        _super.call(this);
        this.steps = steps;
    }
    return CompileAnimationWithStepsMetadata;
}(CompileAnimationMetadata));
exports.CompileAnimationWithStepsMetadata = CompileAnimationWithStepsMetadata;
var CompileAnimationSequenceMetadata = (function (_super) {
    __extends(CompileAnimationSequenceMetadata, _super);
    function CompileAnimationSequenceMetadata(steps) {
        if (steps === void 0) { steps = null; }
        _super.call(this, steps);
    }
    return CompileAnimationSequenceMetadata;
}(CompileAnimationWithStepsMetadata));
exports.CompileAnimationSequenceMetadata = CompileAnimationSequenceMetadata;
var CompileAnimationGroupMetadata = (function (_super) {
    __extends(CompileAnimationGroupMetadata, _super);
    function CompileAnimationGroupMetadata(steps) {
        if (steps === void 0) { steps = null; }
        _super.call(this, steps);
    }
    return CompileAnimationGroupMetadata;
}(CompileAnimationWithStepsMetadata));
exports.CompileAnimationGroupMetadata = CompileAnimationGroupMetadata;
var CompileIdentifierMetadata = (function () {
    function CompileIdentifierMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, value = _b.value;
        this._assetCacheKey = UNDEFINED;
        this.runtime = runtime;
        this.name = name;
        this.prefix = prefix;
        this.moduleUrl = moduleUrl;
        this.value = value;
    }
    Object.defineProperty(CompileIdentifierMetadata.prototype, "identifier", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileIdentifierMetadata.prototype, "runtimeCacheKey", {
        get: function () { return this.identifier.runtime; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileIdentifierMetadata.prototype, "assetCacheKey", {
        get: function () {
            if (this._assetCacheKey === UNDEFINED) {
                if (lang_1.isPresent(this.moduleUrl) && lang_1.isPresent(url_resolver_1.getUrlScheme(this.moduleUrl))) {
                    var uri = core_private_1.reflector.importUri({ 'filePath': this.moduleUrl, 'name': this.name });
                    this._assetCacheKey = this.name + "|" + uri;
                }
                else {
                    this._assetCacheKey = null;
                }
            }
            return this._assetCacheKey;
        },
        enumerable: true,
        configurable: true
    });
    CompileIdentifierMetadata.prototype.equalsTo = function (id2) {
        var rk = this.runtimeCacheKey;
        var ak = this.assetCacheKey;
        return (lang_1.isPresent(rk) && rk == id2.runtimeCacheKey) ||
            (lang_1.isPresent(ak) && ak == id2.assetCacheKey);
    };
    return CompileIdentifierMetadata;
}());
exports.CompileIdentifierMetadata = CompileIdentifierMetadata;
var CompileDiDependencyMetadata = (function () {
    function CompileDiDependencyMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, isAttribute = _b.isAttribute, isSelf = _b.isSelf, isHost = _b.isHost, isSkipSelf = _b.isSkipSelf, isOptional = _b.isOptional, isValue = _b.isValue, query = _b.query, viewQuery = _b.viewQuery, token = _b.token, value = _b.value;
        this.isAttribute = lang_1.normalizeBool(isAttribute);
        this.isSelf = lang_1.normalizeBool(isSelf);
        this.isHost = lang_1.normalizeBool(isHost);
        this.isSkipSelf = lang_1.normalizeBool(isSkipSelf);
        this.isOptional = lang_1.normalizeBool(isOptional);
        this.isValue = lang_1.normalizeBool(isValue);
        this.query = query;
        this.viewQuery = viewQuery;
        this.token = token;
        this.value = value;
    }
    return CompileDiDependencyMetadata;
}());
exports.CompileDiDependencyMetadata = CompileDiDependencyMetadata;
var CompileProviderMetadata = (function () {
    function CompileProviderMetadata(_a) {
        var token = _a.token, useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.deps = lang_1.normalizeBlank(deps);
        this.multi = lang_1.normalizeBool(multi);
    }
    return CompileProviderMetadata;
}());
exports.CompileProviderMetadata = CompileProviderMetadata;
var CompileFactoryMetadata = (function (_super) {
    __extends(CompileFactoryMetadata, _super);
    function CompileFactoryMetadata(_a) {
        var runtime = _a.runtime, name = _a.name, moduleUrl = _a.moduleUrl, prefix = _a.prefix, diDeps = _a.diDeps, value = _a.value;
        _super.call(this, { runtime: runtime, name: name, prefix: prefix, moduleUrl: moduleUrl, value: value });
        this.diDeps = _normalizeArray(diDeps);
    }
    return CompileFactoryMetadata;
}(CompileIdentifierMetadata));
exports.CompileFactoryMetadata = CompileFactoryMetadata;
var CompileTokenMetadata = (function () {
    function CompileTokenMetadata(_a) {
        var value = _a.value, identifier = _a.identifier, identifierIsInstance = _a.identifierIsInstance;
        this.value = value;
        this.identifier = identifier;
        this.identifierIsInstance = lang_1.normalizeBool(identifierIsInstance);
    }
    Object.defineProperty(CompileTokenMetadata.prototype, "runtimeCacheKey", {
        get: function () {
            if (lang_1.isPresent(this.identifier)) {
                return this.identifier.runtimeCacheKey;
            }
            else {
                return this.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileTokenMetadata.prototype, "assetCacheKey", {
        get: function () {
            if (lang_1.isPresent(this.identifier)) {
                return this.identifier.assetCacheKey;
            }
            else {
                return this.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    CompileTokenMetadata.prototype.equalsTo = function (token2) {
        var rk = this.runtimeCacheKey;
        var ak = this.assetCacheKey;
        return (lang_1.isPresent(rk) && rk == token2.runtimeCacheKey) ||
            (lang_1.isPresent(ak) && ak == token2.assetCacheKey);
    };
    Object.defineProperty(CompileTokenMetadata.prototype, "name", {
        get: function () {
            return lang_1.isPresent(this.value) ? util_1.sanitizeIdentifier(this.value) : this.identifier.name;
        },
        enumerable: true,
        configurable: true
    });
    return CompileTokenMetadata;
}());
exports.CompileTokenMetadata = CompileTokenMetadata;
/**
 * Note: We only need this in places where we need to support identifiers that
 * don't have a `runtime` value given by the `StaticReflector`. E.g. see the `identifiers`
 * file where we have some identifiers hard coded by name/module path.
 *
 * TODO(tbosch): Eventually, all of these places should go through the static reflector
 * as well, providing them with a valid `StaticSymbol` that is again a singleton.
 */
var CompileIdentifierMap = (function () {
    function CompileIdentifierMap() {
        this._valueMap = new Map();
        this._values = [];
        this._tokens = [];
    }
    CompileIdentifierMap.prototype.add = function (token, value) {
        var existing = this.get(token);
        if (lang_1.isPresent(existing)) {
            throw new exceptions_1.BaseException("Cannot overwrite in a CompileIdentifierMap! Token: " + token.identifier.name);
        }
        this._tokens.push(token);
        this._values.push(value);
        var rk = token.runtimeCacheKey;
        if (lang_1.isPresent(rk)) {
            this._valueMap.set(rk, value);
        }
        var ak = token.assetCacheKey;
        if (lang_1.isPresent(ak)) {
            this._valueMap.set(ak, value);
        }
    };
    CompileIdentifierMap.prototype.get = function (token) {
        var rk = token.runtimeCacheKey;
        var ak = token.assetCacheKey;
        var result;
        if (lang_1.isPresent(rk)) {
            result = this._valueMap.get(rk);
        }
        if (lang_1.isBlank(result) && lang_1.isPresent(ak)) {
            result = this._valueMap.get(ak);
        }
        return result;
    };
    CompileIdentifierMap.prototype.keys = function () { return this._tokens; };
    CompileIdentifierMap.prototype.values = function () { return this._values; };
    Object.defineProperty(CompileIdentifierMap.prototype, "size", {
        get: function () { return this._values.length; },
        enumerable: true,
        configurable: true
    });
    return CompileIdentifierMap;
}());
exports.CompileIdentifierMap = CompileIdentifierMap;
/**
 * Metadata regarding compilation of a type.
 */
var CompileTypeMetadata = (function (_super) {
    __extends(CompileTypeMetadata, _super);
    function CompileTypeMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, isHost = _b.isHost, value = _b.value, diDeps = _b.diDeps, lifecycleHooks = _b.lifecycleHooks;
        _super.call(this, { runtime: runtime, name: name, moduleUrl: moduleUrl, prefix: prefix, value: value });
        this.isHost = lang_1.normalizeBool(isHost);
        this.diDeps = _normalizeArray(diDeps);
        this.lifecycleHooks = _normalizeArray(lifecycleHooks);
    }
    return CompileTypeMetadata;
}(CompileIdentifierMetadata));
exports.CompileTypeMetadata = CompileTypeMetadata;
var CompileQueryMetadata = (function () {
    function CompileQueryMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, selectors = _b.selectors, descendants = _b.descendants, first = _b.first, propertyName = _b.propertyName, read = _b.read;
        this.selectors = selectors;
        this.descendants = lang_1.normalizeBool(descendants);
        this.first = lang_1.normalizeBool(first);
        this.propertyName = propertyName;
        this.read = read;
    }
    return CompileQueryMetadata;
}());
exports.CompileQueryMetadata = CompileQueryMetadata;
/**
 * Metadata about a stylesheet
 */
var CompileStylesheetMetadata = (function () {
    function CompileStylesheetMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, moduleUrl = _b.moduleUrl, styles = _b.styles, styleUrls = _b.styleUrls;
        this.moduleUrl = moduleUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
    }
    return CompileStylesheetMetadata;
}());
exports.CompileStylesheetMetadata = CompileStylesheetMetadata;
/**
 * Metadata regarding compilation of a template.
 */
var CompileTemplateMetadata = (function () {
    function CompileTemplateMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, encapsulation = _b.encapsulation, template = _b.template, templateUrl = _b.templateUrl, styles = _b.styles, styleUrls = _b.styleUrls, externalStylesheets = _b.externalStylesheets, animations = _b.animations, ngContentSelectors = _b.ngContentSelectors, interpolation = _b.interpolation;
        this.encapsulation = encapsulation;
        this.template = template;
        this.templateUrl = templateUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
        this.externalStylesheets = _normalizeArray(externalStylesheets);
        this.animations = lang_1.isPresent(animations) ? collection_1.ListWrapper.flatten(animations) : [];
        this.ngContentSelectors = lang_1.isPresent(ngContentSelectors) ? ngContentSelectors : [];
        if (lang_1.isPresent(interpolation) && interpolation.length != 2) {
            throw new exceptions_1.BaseException("'interpolation' should have a start and an end symbol.");
        }
        this.interpolation = interpolation;
    }
    return CompileTemplateMetadata;
}());
exports.CompileTemplateMetadata = CompileTemplateMetadata;
/**
 * Metadata regarding compilation of a directive.
 */
var CompileDirectiveMetadata = (function () {
    function CompileDirectiveMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, hostListeners = _b.hostListeners, hostProperties = _b.hostProperties, hostAttributes = _b.hostAttributes, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, entryComponents = _b.entryComponents, viewDirectives = _b.viewDirectives, viewPipes = _b.viewPipes, template = _b.template;
        this.type = type;
        this.isComponent = isComponent;
        this.selector = selector;
        this.exportAs = exportAs;
        this.changeDetection = changeDetection;
        this.inputs = inputs;
        this.outputs = outputs;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.providers = _normalizeArray(providers);
        this.viewProviders = _normalizeArray(viewProviders);
        this.queries = _normalizeArray(queries);
        this.viewQueries = _normalizeArray(viewQueries);
        this.entryComponents = _normalizeArray(entryComponents);
        this.viewDirectives = _normalizeArray(viewDirectives);
        this.viewPipes = _normalizeArray(viewPipes);
        this.template = template;
    }
    CompileDirectiveMetadata.create = function (_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, host = _b.host, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, entryComponents = _b.entryComponents, viewDirectives = _b.viewDirectives, viewPipes = _b.viewPipes, template = _b.template;
        var hostListeners = {};
        var hostProperties = {};
        var hostAttributes = {};
        if (lang_1.isPresent(host)) {
            collection_1.StringMapWrapper.forEach(host, function (value, key) {
                var matches = key.match(HOST_REG_EXP);
                if (matches === null) {
                    hostAttributes[key] = value;
                }
                else if (lang_1.isPresent(matches[1])) {
                    hostProperties[matches[1]] = value;
                }
                else if (lang_1.isPresent(matches[2])) {
                    hostListeners[matches[2]] = value;
                }
                else if (lang_1.isPresent(matches[3])) {
                    hostProperties['@' + matches[3]] = value;
                }
            });
        }
        var inputsMap = {};
        if (lang_1.isPresent(inputs)) {
            inputs.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                inputsMap[parts[0]] = parts[1];
            });
        }
        var outputsMap = {};
        if (lang_1.isPresent(outputs)) {
            outputs.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                outputsMap[parts[0]] = parts[1];
            });
        }
        return new CompileDirectiveMetadata({
            type: type,
            isComponent: lang_1.normalizeBool(isComponent), selector: selector, exportAs: exportAs, changeDetection: changeDetection,
            inputs: inputsMap,
            outputs: outputsMap,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            hostAttributes: hostAttributes,
            providers: providers,
            viewProviders: viewProviders,
            queries: queries,
            viewQueries: viewQueries,
            entryComponents: entryComponents,
            viewDirectives: viewDirectives,
            viewPipes: viewPipes,
            template: template,
        });
    };
    Object.defineProperty(CompileDirectiveMetadata.prototype, "identifier", {
        get: function () { return this.type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileDirectiveMetadata.prototype, "runtimeCacheKey", {
        get: function () { return this.type.runtimeCacheKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileDirectiveMetadata.prototype, "assetCacheKey", {
        get: function () { return this.type.assetCacheKey; },
        enumerable: true,
        configurable: true
    });
    CompileDirectiveMetadata.prototype.equalsTo = function (other) {
        return this.type.equalsTo(other.identifier);
    };
    return CompileDirectiveMetadata;
}());
exports.CompileDirectiveMetadata = CompileDirectiveMetadata;
/**
 * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
 */
function createHostComponentMeta(compMeta) {
    var template = selector_1.CssSelector.parse(compMeta.selector)[0].getMatchingElementTemplate();
    return CompileDirectiveMetadata.create({
        type: new CompileTypeMetadata({
            runtime: Object,
            name: compMeta.type.name + "_Host",
            moduleUrl: compMeta.type.moduleUrl,
            isHost: true
        }),
        template: new CompileTemplateMetadata({
            template: template,
            templateUrl: '',
            styles: [],
            styleUrls: [],
            ngContentSelectors: [],
            animations: []
        }),
        changeDetection: core_1.ChangeDetectionStrategy.Default,
        inputs: [],
        outputs: [],
        host: {},
        isComponent: true,
        selector: '*',
        providers: [],
        viewProviders: [],
        queries: [],
        viewQueries: []
    });
}
exports.createHostComponentMeta = createHostComponentMeta;
var CompilePipeMetadata = (function () {
    function CompilePipeMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, name = _b.name, pure = _b.pure;
        this.type = type;
        this.name = name;
        this.pure = lang_1.normalizeBool(pure);
    }
    Object.defineProperty(CompilePipeMetadata.prototype, "identifier", {
        get: function () { return this.type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompilePipeMetadata.prototype, "runtimeCacheKey", {
        get: function () { return this.type.runtimeCacheKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompilePipeMetadata.prototype, "assetCacheKey", {
        get: function () { return this.type.assetCacheKey; },
        enumerable: true,
        configurable: true
    });
    CompilePipeMetadata.prototype.equalsTo = function (other) {
        return this.type.equalsTo(other.identifier);
    };
    return CompilePipeMetadata;
}());
exports.CompilePipeMetadata = CompilePipeMetadata;
/**
 * Metadata regarding compilation of a directive.
 */
var CompileNgModuleMetadata = (function () {
    function CompileNgModuleMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, providers = _b.providers, declaredDirectives = _b.declaredDirectives, exportedDirectives = _b.exportedDirectives, declaredPipes = _b.declaredPipes, exportedPipes = _b.exportedPipes, entryComponents = _b.entryComponents, bootstrapComponents = _b.bootstrapComponents, importedModules = _b.importedModules, exportedModules = _b.exportedModules, schemas = _b.schemas, transitiveModule = _b.transitiveModule;
        this.type = type;
        this.declaredDirectives = _normalizeArray(declaredDirectives);
        this.exportedDirectives = _normalizeArray(exportedDirectives);
        this.declaredPipes = _normalizeArray(declaredPipes);
        this.exportedPipes = _normalizeArray(exportedPipes);
        this.providers = _normalizeArray(providers);
        this.entryComponents = _normalizeArray(entryComponents);
        this.bootstrapComponents = _normalizeArray(bootstrapComponents);
        this.importedModules = _normalizeArray(importedModules);
        this.exportedModules = _normalizeArray(exportedModules);
        this.schemas = _normalizeArray(schemas);
        this.transitiveModule = transitiveModule;
    }
    Object.defineProperty(CompileNgModuleMetadata.prototype, "identifier", {
        get: function () { return this.type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileNgModuleMetadata.prototype, "runtimeCacheKey", {
        get: function () { return this.type.runtimeCacheKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileNgModuleMetadata.prototype, "assetCacheKey", {
        get: function () { return this.type.assetCacheKey; },
        enumerable: true,
        configurable: true
    });
    CompileNgModuleMetadata.prototype.equalsTo = function (other) {
        return this.type.equalsTo(other.identifier);
    };
    return CompileNgModuleMetadata;
}());
exports.CompileNgModuleMetadata = CompileNgModuleMetadata;
var TransitiveCompileNgModuleMetadata = (function () {
    function TransitiveCompileNgModuleMetadata(modules, providers, entryComponents, directives, pipes) {
        var _this = this;
        this.modules = modules;
        this.providers = providers;
        this.entryComponents = entryComponents;
        this.directives = directives;
        this.pipes = pipes;
        this.directivesSet = new Set();
        this.pipesSet = new Set();
        directives.forEach(function (dir) { return _this.directivesSet.add(dir.type.runtime); });
        pipes.forEach(function (pipe) { return _this.pipesSet.add(pipe.type.runtime); });
    }
    return TransitiveCompileNgModuleMetadata;
}());
exports.TransitiveCompileNgModuleMetadata = TransitiveCompileNgModuleMetadata;
function removeIdentifierDuplicates(items) {
    var map = new CompileIdentifierMap();
    items.forEach(function (item) {
        if (!map.get(item)) {
            map.add(item, item);
        }
    });
    return map.keys();
}
exports.removeIdentifierDuplicates = removeIdentifierDuplicates;
function _normalizeArray(obj) {
    return lang_1.isPresent(obj) ? obj : [];
}
function isStaticSymbol(value) {
    return lang_1.isStringMap(value) && lang_1.isPresent(value['name']) && lang_1.isPresent(value['filePath']);
}
exports.isStaticSymbol = isStaticSymbol;
//# sourceMappingURL=compile_metadata.js.map