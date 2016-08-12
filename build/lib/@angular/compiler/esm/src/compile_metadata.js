/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy } from '@angular/core';
import { reflector } from '../core_private';
import { ListWrapper, StringMapWrapper } from './facade/collection';
import { BaseException, unimplemented } from './facade/exceptions';
import { isBlank, isPresent, isStringMap, normalizeBlank, normalizeBool } from './facade/lang';
import { CssSelector } from './selector';
import { getUrlScheme } from './url_resolver';
import { sanitizeIdentifier, splitAtColon } from './util';
// group 0: "[prop] or (event) or @trigger"
// group 1: "prop" from "[prop]"
// group 2: "event" from "(event)"
// group 3: "@trigger" from "@trigger"
const HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
const UNDEFINED = new Object();
export class CompileMetadataWithIdentifier {
    get identifier() { return unimplemented(); }
    get runtimeCacheKey() { return unimplemented(); }
    get assetCacheKey() { return unimplemented(); }
    equalsTo(id2) { return unimplemented(); }
}
export class CompileAnimationEntryMetadata {
    constructor(name = null, definitions = null) {
        this.name = name;
        this.definitions = definitions;
    }
}
export class CompileAnimationStateMetadata {
}
export class CompileAnimationStateDeclarationMetadata extends CompileAnimationStateMetadata {
    constructor(stateNameExpr, styles) {
        super();
        this.stateNameExpr = stateNameExpr;
        this.styles = styles;
    }
}
export class CompileAnimationStateTransitionMetadata extends CompileAnimationStateMetadata {
    constructor(stateChangeExpr, steps) {
        super();
        this.stateChangeExpr = stateChangeExpr;
        this.steps = steps;
    }
}
export class CompileAnimationMetadata {
}
export class CompileAnimationKeyframesSequenceMetadata extends CompileAnimationMetadata {
    constructor(steps = []) {
        super();
        this.steps = steps;
    }
}
export class CompileAnimationStyleMetadata extends CompileAnimationMetadata {
    constructor(offset, styles = null) {
        super();
        this.offset = offset;
        this.styles = styles;
    }
}
export class CompileAnimationAnimateMetadata extends CompileAnimationMetadata {
    constructor(timings = 0, styles = null) {
        super();
        this.timings = timings;
        this.styles = styles;
    }
}
export class CompileAnimationWithStepsMetadata extends CompileAnimationMetadata {
    constructor(steps = null) {
        super();
        this.steps = steps;
    }
}
export class CompileAnimationSequenceMetadata extends CompileAnimationWithStepsMetadata {
    constructor(steps = null) {
        super(steps);
    }
}
export class CompileAnimationGroupMetadata extends CompileAnimationWithStepsMetadata {
    constructor(steps = null) {
        super(steps);
    }
}
export class CompileIdentifierMetadata {
    constructor({ runtime, name, moduleUrl, prefix, value } = {}) {
        this._assetCacheKey = UNDEFINED;
        this.runtime = runtime;
        this.name = name;
        this.prefix = prefix;
        this.moduleUrl = moduleUrl;
        this.value = value;
    }
    get identifier() { return this; }
    get runtimeCacheKey() { return this.identifier.runtime; }
    get assetCacheKey() {
        if (this._assetCacheKey === UNDEFINED) {
            if (isPresent(this.moduleUrl) && isPresent(getUrlScheme(this.moduleUrl))) {
                var uri = reflector.importUri({ 'filePath': this.moduleUrl, 'name': this.name });
                this._assetCacheKey = `${this.name}|${uri}`;
            }
            else {
                this._assetCacheKey = null;
            }
        }
        return this._assetCacheKey;
    }
    equalsTo(id2) {
        var rk = this.runtimeCacheKey;
        var ak = this.assetCacheKey;
        return (isPresent(rk) && rk == id2.runtimeCacheKey) ||
            (isPresent(ak) && ak == id2.assetCacheKey);
    }
}
export class CompileDiDependencyMetadata {
    constructor({ isAttribute, isSelf, isHost, isSkipSelf, isOptional, isValue, query, viewQuery, token, value } = {}) {
        this.isAttribute = normalizeBool(isAttribute);
        this.isSelf = normalizeBool(isSelf);
        this.isHost = normalizeBool(isHost);
        this.isSkipSelf = normalizeBool(isSkipSelf);
        this.isOptional = normalizeBool(isOptional);
        this.isValue = normalizeBool(isValue);
        this.query = query;
        this.viewQuery = viewQuery;
        this.token = token;
        this.value = value;
    }
}
export class CompileProviderMetadata {
    constructor({ token, useClass, useValue, useExisting, useFactory, deps, multi }) {
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.deps = normalizeBlank(deps);
        this.multi = normalizeBool(multi);
    }
}
export class CompileFactoryMetadata extends CompileIdentifierMetadata {
    constructor({ runtime, name, moduleUrl, prefix, diDeps, value }) {
        super({ runtime: runtime, name: name, prefix: prefix, moduleUrl: moduleUrl, value: value });
        this.diDeps = _normalizeArray(diDeps);
    }
}
export class CompileTokenMetadata {
    constructor({ value, identifier, identifierIsInstance }) {
        this.value = value;
        this.identifier = identifier;
        this.identifierIsInstance = normalizeBool(identifierIsInstance);
    }
    get runtimeCacheKey() {
        if (isPresent(this.identifier)) {
            return this.identifier.runtimeCacheKey;
        }
        else {
            return this.value;
        }
    }
    get assetCacheKey() {
        if (isPresent(this.identifier)) {
            return this.identifier.assetCacheKey;
        }
        else {
            return this.value;
        }
    }
    equalsTo(token2) {
        var rk = this.runtimeCacheKey;
        var ak = this.assetCacheKey;
        return (isPresent(rk) && rk == token2.runtimeCacheKey) ||
            (isPresent(ak) && ak == token2.assetCacheKey);
    }
    get name() {
        return isPresent(this.value) ? sanitizeIdentifier(this.value) : this.identifier.name;
    }
}
/**
 * Note: We only need this in places where we need to support identifiers that
 * don't have a `runtime` value given by the `StaticReflector`. E.g. see the `identifiers`
 * file where we have some identifiers hard coded by name/module path.
 *
 * TODO(tbosch): Eventually, all of these places should go through the static reflector
 * as well, providing them with a valid `StaticSymbol` that is again a singleton.
 */
export class CompileIdentifierMap {
    constructor() {
        this._valueMap = new Map();
        this._values = [];
        this._tokens = [];
    }
    add(token, value) {
        var existing = this.get(token);
        if (isPresent(existing)) {
            throw new BaseException(`Cannot overwrite in a CompileIdentifierMap! Token: ${token.identifier.name}`);
        }
        this._tokens.push(token);
        this._values.push(value);
        var rk = token.runtimeCacheKey;
        if (isPresent(rk)) {
            this._valueMap.set(rk, value);
        }
        var ak = token.assetCacheKey;
        if (isPresent(ak)) {
            this._valueMap.set(ak, value);
        }
    }
    get(token) {
        var rk = token.runtimeCacheKey;
        var ak = token.assetCacheKey;
        var result;
        if (isPresent(rk)) {
            result = this._valueMap.get(rk);
        }
        if (isBlank(result) && isPresent(ak)) {
            result = this._valueMap.get(ak);
        }
        return result;
    }
    keys() { return this._tokens; }
    values() { return this._values; }
    get size() { return this._values.length; }
}
/**
 * Metadata regarding compilation of a type.
 */
export class CompileTypeMetadata extends CompileIdentifierMetadata {
    constructor({ runtime, name, moduleUrl, prefix, isHost, value, diDeps, lifecycleHooks } = {}) {
        super({ runtime: runtime, name: name, moduleUrl: moduleUrl, prefix: prefix, value: value });
        this.isHost = normalizeBool(isHost);
        this.diDeps = _normalizeArray(diDeps);
        this.lifecycleHooks = _normalizeArray(lifecycleHooks);
    }
}
export class CompileQueryMetadata {
    constructor({ selectors, descendants, first, propertyName, read } = {}) {
        this.selectors = selectors;
        this.descendants = normalizeBool(descendants);
        this.first = normalizeBool(first);
        this.propertyName = propertyName;
        this.read = read;
    }
}
/**
 * Metadata about a stylesheet
 */
export class CompileStylesheetMetadata {
    constructor({ moduleUrl, styles, styleUrls } = {}) {
        this.moduleUrl = moduleUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
    }
}
/**
 * Metadata regarding compilation of a template.
 */
export class CompileTemplateMetadata {
    constructor({ encapsulation, template, templateUrl, styles, styleUrls, externalStylesheets, animations, ngContentSelectors, interpolation } = {}) {
        this.encapsulation = encapsulation;
        this.template = template;
        this.templateUrl = templateUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
        this.externalStylesheets = _normalizeArray(externalStylesheets);
        this.animations = isPresent(animations) ? ListWrapper.flatten(animations) : [];
        this.ngContentSelectors = isPresent(ngContentSelectors) ? ngContentSelectors : [];
        if (isPresent(interpolation) && interpolation.length != 2) {
            throw new BaseException(`'interpolation' should have a start and an end symbol.`);
        }
        this.interpolation = interpolation;
    }
}
/**
 * Metadata regarding compilation of a directive.
 */
export class CompileDirectiveMetadata {
    constructor({ type, isComponent, selector, exportAs, changeDetection, inputs, outputs, hostListeners, hostProperties, hostAttributes, providers, viewProviders, queries, viewQueries, entryComponents, viewDirectives, viewPipes, template } = {}) {
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
    static create({ type, isComponent, selector, exportAs, changeDetection, inputs, outputs, host, providers, viewProviders, queries, viewQueries, entryComponents, viewDirectives, viewPipes, template } = {}) {
        var hostListeners = {};
        var hostProperties = {};
        var hostAttributes = {};
        if (isPresent(host)) {
            StringMapWrapper.forEach(host, (value, key) => {
                const matches = key.match(HOST_REG_EXP);
                if (matches === null) {
                    hostAttributes[key] = value;
                }
                else if (isPresent(matches[1])) {
                    hostProperties[matches[1]] = value;
                }
                else if (isPresent(matches[2])) {
                    hostListeners[matches[2]] = value;
                }
                else if (isPresent(matches[3])) {
                    hostProperties['@' + matches[3]] = value;
                }
            });
        }
        var inputsMap = {};
        if (isPresent(inputs)) {
            inputs.forEach((bindConfig) => {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
                inputsMap[parts[0]] = parts[1];
            });
        }
        var outputsMap = {};
        if (isPresent(outputs)) {
            outputs.forEach((bindConfig) => {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
                outputsMap[parts[0]] = parts[1];
            });
        }
        return new CompileDirectiveMetadata({
            type,
            isComponent: normalizeBool(isComponent), selector, exportAs, changeDetection,
            inputs: inputsMap,
            outputs: outputsMap,
            hostListeners,
            hostProperties,
            hostAttributes,
            providers,
            viewProviders,
            queries,
            viewQueries,
            entryComponents,
            viewDirectives,
            viewPipes,
            template,
        });
    }
    get identifier() { return this.type; }
    get runtimeCacheKey() { return this.type.runtimeCacheKey; }
    get assetCacheKey() { return this.type.assetCacheKey; }
    equalsTo(other) {
        return this.type.equalsTo(other.identifier);
    }
}
/**
 * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
 */
export function createHostComponentMeta(compMeta) {
    var template = CssSelector.parse(compMeta.selector)[0].getMatchingElementTemplate();
    return CompileDirectiveMetadata.create({
        type: new CompileTypeMetadata({
            runtime: Object,
            name: `${compMeta.type.name}_Host`,
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
        changeDetection: ChangeDetectionStrategy.Default,
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
export class CompilePipeMetadata {
    constructor({ type, name, pure } = {}) {
        this.type = type;
        this.name = name;
        this.pure = normalizeBool(pure);
    }
    get identifier() { return this.type; }
    get runtimeCacheKey() { return this.type.runtimeCacheKey; }
    get assetCacheKey() { return this.type.assetCacheKey; }
    equalsTo(other) {
        return this.type.equalsTo(other.identifier);
    }
}
/**
 * Metadata regarding compilation of a directive.
 */
export class CompileNgModuleMetadata {
    constructor({ type, providers, declaredDirectives, exportedDirectives, declaredPipes, exportedPipes, entryComponents, bootstrapComponents, importedModules, exportedModules, schemas, transitiveModule } = {}) {
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
    get identifier() { return this.type; }
    get runtimeCacheKey() { return this.type.runtimeCacheKey; }
    get assetCacheKey() { return this.type.assetCacheKey; }
    equalsTo(other) {
        return this.type.equalsTo(other.identifier);
    }
}
export class TransitiveCompileNgModuleMetadata {
    constructor(modules, providers, entryComponents, directives, pipes) {
        this.modules = modules;
        this.providers = providers;
        this.entryComponents = entryComponents;
        this.directives = directives;
        this.pipes = pipes;
        this.directivesSet = new Set();
        this.pipesSet = new Set();
        directives.forEach(dir => this.directivesSet.add(dir.type.runtime));
        pipes.forEach(pipe => this.pipesSet.add(pipe.type.runtime));
    }
}
export function removeIdentifierDuplicates(items) {
    const map = new CompileIdentifierMap();
    items.forEach((item) => {
        if (!map.get(item)) {
            map.add(item, item);
        }
    });
    return map.keys();
}
function _normalizeArray(obj) {
    return isPresent(obj) ? obj : [];
}
export function isStaticSymbol(value) {
    return isStringMap(value) && isPresent(value['name']) && isPresent(value['filePath']);
}
//# sourceMappingURL=compile_metadata.js.map