/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompileDiDependencyMetadata, CompileIdentifierMap, CompileProviderMetadata, CompileTokenMetadata, CompileTypeMetadata } from './compile_metadata';
import { ListWrapper } from './facade/collection';
import { BaseException } from './facade/exceptions';
import { isArray, isBlank, isPresent, normalizeBlank } from './facade/lang';
import { Identifiers, identifierToken } from './identifiers';
import { ParseError } from './parse_util';
import { ProviderAst, ProviderAstType } from './template_parser/template_ast';
export class ProviderError extends ParseError {
    constructor(message, span) {
        super(span, message);
    }
}
export class ProviderViewContext {
    constructor(component, sourceSpan) {
        this.component = component;
        this.sourceSpan = sourceSpan;
        this.errors = [];
        this.viewQueries = _getViewQueries(component);
        this.viewProviders = new CompileIdentifierMap();
        _normalizeProviders(component.viewProviders, sourceSpan, this.errors).forEach((provider) => {
            if (isBlank(this.viewProviders.get(provider.token))) {
                this.viewProviders.add(provider.token, true);
            }
        });
    }
}
export class ProviderElementContext {
    constructor(_viewContext, _parent, _isViewRoot, _directiveAsts, attrs, refs, _sourceSpan) {
        this._viewContext = _viewContext;
        this._parent = _parent;
        this._isViewRoot = _isViewRoot;
        this._directiveAsts = _directiveAsts;
        this._sourceSpan = _sourceSpan;
        this._transformedProviders = new CompileIdentifierMap();
        this._seenProviders = new CompileIdentifierMap();
        this._hasViewContainer = false;
        this._attrs = {};
        attrs.forEach((attrAst) => this._attrs[attrAst.name] = attrAst.value);
        var directivesMeta = _directiveAsts.map(directiveAst => directiveAst.directive);
        this._allProviders =
            _resolveProvidersFromDirectives(directivesMeta, _sourceSpan, _viewContext.errors);
        this._contentQueries = _getContentQueries(directivesMeta);
        var queriedTokens = new CompileIdentifierMap();
        this._allProviders.values().forEach((provider) => { this._addQueryReadsTo(provider.token, queriedTokens); });
        refs.forEach((refAst) => {
            this._addQueryReadsTo(new CompileTokenMetadata({ value: refAst.name }), queriedTokens);
        });
        if (isPresent(queriedTokens.get(identifierToken(Identifiers.ViewContainerRef)))) {
            this._hasViewContainer = true;
        }
        // create the providers that we know are eager first
        this._allProviders.values().forEach((provider) => {
            const eager = provider.eager || isPresent(queriedTokens.get(provider.token));
            if (eager) {
                this._getOrCreateLocalProvider(provider.providerType, provider.token, true);
            }
        });
    }
    afterElement() {
        // collect lazy providers
        this._allProviders.values().forEach((provider) => {
            this._getOrCreateLocalProvider(provider.providerType, provider.token, false);
        });
    }
    get transformProviders() { return this._transformedProviders.values(); }
    get transformedDirectiveAsts() {
        var sortedProviderTypes = this._transformedProviders.values().map(provider => provider.token.identifier);
        var sortedDirectives = ListWrapper.clone(this._directiveAsts);
        ListWrapper.sort(sortedDirectives, (dir1, dir2) => sortedProviderTypes.indexOf(dir1.directive.type) -
            sortedProviderTypes.indexOf(dir2.directive.type));
        return sortedDirectives;
    }
    get transformedHasViewContainer() { return this._hasViewContainer; }
    _addQueryReadsTo(token, queryReadTokens) {
        this._getQueriesFor(token).forEach((query) => {
            const queryReadToken = isPresent(query.read) ? query.read : token;
            if (isBlank(queryReadTokens.get(queryReadToken))) {
                queryReadTokens.add(queryReadToken, true);
            }
        });
    }
    _getQueriesFor(token) {
        var result = [];
        var currentEl = this;
        var distance = 0;
        var queries;
        while (currentEl !== null) {
            queries = currentEl._contentQueries.get(token);
            if (isPresent(queries)) {
                ListWrapper.addAll(result, queries.filter((query) => query.descendants || distance <= 1));
            }
            if (currentEl._directiveAsts.length > 0) {
                distance++;
            }
            currentEl = currentEl._parent;
        }
        queries = this._viewContext.viewQueries.get(token);
        if (isPresent(queries)) {
            ListWrapper.addAll(result, queries);
        }
        return result;
    }
    _getOrCreateLocalProvider(requestingProviderType, token, eager) {
        var resolvedProvider = this._allProviders.get(token);
        if (isBlank(resolvedProvider) ||
            ((requestingProviderType === ProviderAstType.Directive ||
                requestingProviderType === ProviderAstType.PublicService) &&
                resolvedProvider.providerType === ProviderAstType.PrivateService) ||
            ((requestingProviderType === ProviderAstType.PrivateService ||
                requestingProviderType === ProviderAstType.PublicService) &&
                resolvedProvider.providerType === ProviderAstType.Builtin)) {
            return null;
        }
        var transformedProviderAst = this._transformedProviders.get(token);
        if (isPresent(transformedProviderAst)) {
            return transformedProviderAst;
        }
        if (isPresent(this._seenProviders.get(token))) {
            this._viewContext.errors.push(new ProviderError(`Cannot instantiate cyclic dependency! ${token.name}`, this._sourceSpan));
            return null;
        }
        this._seenProviders.add(token, true);
        var transformedProviders = resolvedProvider.providers.map((provider) => {
            var transformedUseValue = provider.useValue;
            var transformedUseExisting = provider.useExisting;
            var transformedDeps;
            if (isPresent(provider.useExisting)) {
                var existingDiDep = this._getDependency(resolvedProvider.providerType, new CompileDiDependencyMetadata({ token: provider.useExisting }), eager);
                if (isPresent(existingDiDep.token)) {
                    transformedUseExisting = existingDiDep.token;
                }
                else {
                    transformedUseExisting = null;
                    transformedUseValue = existingDiDep.value;
                }
            }
            else if (isPresent(provider.useFactory)) {
                var deps = isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep, eager));
            }
            else if (isPresent(provider.useClass)) {
                var deps = isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep, eager));
            }
            return _transformProvider(provider, {
                useExisting: transformedUseExisting,
                useValue: transformedUseValue,
                deps: transformedDeps
            });
        });
        transformedProviderAst =
            _transformProviderAst(resolvedProvider, { eager: eager, providers: transformedProviders });
        this._transformedProviders.add(token, transformedProviderAst);
        return transformedProviderAst;
    }
    _getLocalDependency(requestingProviderType, dep, eager = null) {
        if (dep.isAttribute) {
            var attrValue = this._attrs[dep.token.value];
            return new CompileDiDependencyMetadata({ isValue: true, value: normalizeBlank(attrValue) });
        }
        if (isPresent(dep.query) || isPresent(dep.viewQuery)) {
            return dep;
        }
        if (isPresent(dep.token)) {
            // access builtints
            if ((requestingProviderType === ProviderAstType.Directive ||
                requestingProviderType === ProviderAstType.Component)) {
                if (dep.token.equalsTo(identifierToken(Identifiers.Renderer)) ||
                    dep.token.equalsTo(identifierToken(Identifiers.ElementRef)) ||
                    dep.token.equalsTo(identifierToken(Identifiers.ChangeDetectorRef)) ||
                    dep.token.equalsTo(identifierToken(Identifiers.TemplateRef))) {
                    return dep;
                }
                if (dep.token.equalsTo(identifierToken(Identifiers.ViewContainerRef))) {
                    this._hasViewContainer = true;
                }
            }
            // access the injector
            if (dep.token.equalsTo(identifierToken(Identifiers.Injector))) {
                return dep;
            }
            // access providers
            if (isPresent(this._getOrCreateLocalProvider(requestingProviderType, dep.token, eager))) {
                return dep;
            }
        }
        return null;
    }
    _getDependency(requestingProviderType, dep, eager = null) {
        var currElement = this;
        var currEager = eager;
        var result = null;
        if (!dep.isSkipSelf) {
            result = this._getLocalDependency(requestingProviderType, dep, eager);
        }
        if (dep.isSelf) {
            if (isBlank(result) && dep.isOptional) {
                result = new CompileDiDependencyMetadata({ isValue: true, value: null });
            }
        }
        else {
            // check parent elements
            while (isBlank(result) && isPresent(currElement._parent)) {
                var prevElement = currElement;
                currElement = currElement._parent;
                if (prevElement._isViewRoot) {
                    currEager = false;
                }
                result = currElement._getLocalDependency(ProviderAstType.PublicService, dep, currEager);
            }
            // check @Host restriction
            if (isBlank(result)) {
                if (!dep.isHost || this._viewContext.component.type.isHost ||
                    identifierToken(this._viewContext.component.type).equalsTo(dep.token) ||
                    isPresent(this._viewContext.viewProviders.get(dep.token))) {
                    result = dep;
                }
                else {
                    result = dep.isOptional ?
                        result = new CompileDiDependencyMetadata({ isValue: true, value: null }) :
                        null;
                }
            }
        }
        if (isBlank(result)) {
            this._viewContext.errors.push(new ProviderError(`No provider for ${dep.token.name}`, this._sourceSpan));
        }
        return result;
    }
}
export class NgModuleProviderAnalyzer {
    constructor(ngModule, extraProviders, sourceSpan) {
        this._transformedProviders = new CompileIdentifierMap();
        this._seenProviders = new CompileIdentifierMap();
        this._unparsedProviders = [];
        this._errors = [];
        this._allProviders = new CompileIdentifierMap();
        const ngModuleTypes = ngModule.transitiveModule.modules.map((moduleMeta) => moduleMeta.type);
        ngModuleTypes.forEach((ngModuleType) => {
            const ngModuleProvider = new CompileProviderMetadata({ token: new CompileTokenMetadata({ identifier: ngModuleType }), useClass: ngModuleType });
            _resolveProviders([ngModuleProvider], ProviderAstType.PublicService, true, sourceSpan, this._errors, this._allProviders);
        });
        _resolveProviders(_normalizeProviders(ngModule.transitiveModule.providers.concat(extraProviders), sourceSpan, this._errors), ProviderAstType.PublicService, false, sourceSpan, this._errors, this._allProviders);
    }
    parse() {
        this._allProviders.values().forEach((provider) => { this._getOrCreateLocalProvider(provider.token, provider.eager); });
        if (this._errors.length > 0) {
            const errorString = this._errors.join('\n');
            throw new BaseException(`Provider parse errors:\n${errorString}`);
        }
        return this._transformedProviders.values();
    }
    _getOrCreateLocalProvider(token, eager) {
        var resolvedProvider = this._allProviders.get(token);
        if (isBlank(resolvedProvider)) {
            return null;
        }
        var transformedProviderAst = this._transformedProviders.get(token);
        if (isPresent(transformedProviderAst)) {
            return transformedProviderAst;
        }
        if (isPresent(this._seenProviders.get(token))) {
            this._errors.push(new ProviderError(`Cannot instantiate cyclic dependency! ${token.name}`, resolvedProvider.sourceSpan));
            return null;
        }
        this._seenProviders.add(token, true);
        var transformedProviders = resolvedProvider.providers.map((provider) => {
            var transformedUseValue = provider.useValue;
            var transformedUseExisting = provider.useExisting;
            var transformedDeps;
            if (isPresent(provider.useExisting)) {
                var existingDiDep = this._getDependency(new CompileDiDependencyMetadata({ token: provider.useExisting }), eager, resolvedProvider.sourceSpan);
                if (isPresent(existingDiDep.token)) {
                    transformedUseExisting = existingDiDep.token;
                }
                else {
                    transformedUseExisting = null;
                    transformedUseValue = existingDiDep.value;
                }
            }
            else if (isPresent(provider.useFactory)) {
                var deps = isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(dep, eager, resolvedProvider.sourceSpan));
            }
            else if (isPresent(provider.useClass)) {
                var deps = isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(dep, eager, resolvedProvider.sourceSpan));
            }
            return _transformProvider(provider, {
                useExisting: transformedUseExisting,
                useValue: transformedUseValue,
                deps: transformedDeps
            });
        });
        transformedProviderAst =
            _transformProviderAst(resolvedProvider, { eager: eager, providers: transformedProviders });
        this._transformedProviders.add(token, transformedProviderAst);
        return transformedProviderAst;
    }
    _getDependency(dep, eager = null, requestorSourceSpan) {
        var foundLocal = false;
        if (!dep.isSkipSelf && isPresent(dep.token)) {
            // access the injector
            if (dep.token.equalsTo(identifierToken(Identifiers.Injector)) ||
                dep.token.equalsTo(identifierToken(Identifiers.ComponentFactoryResolver))) {
                foundLocal = true;
            }
            else if (isPresent(this._getOrCreateLocalProvider(dep.token, eager))) {
                foundLocal = true;
            }
        }
        var result = dep;
        if (dep.isSelf && !foundLocal) {
            if (dep.isOptional) {
                result = new CompileDiDependencyMetadata({ isValue: true, value: null });
            }
            else {
                this._errors.push(new ProviderError(`No provider for ${dep.token.name}`, requestorSourceSpan));
            }
        }
        return result;
    }
}
function _transformProvider(provider, { useExisting, useValue, deps }) {
    return new CompileProviderMetadata({
        token: provider.token,
        useClass: provider.useClass,
        useExisting: useExisting,
        useFactory: provider.useFactory,
        useValue: useValue,
        deps: deps,
        multi: provider.multi
    });
}
function _transformProviderAst(provider, { eager, providers }) {
    return new ProviderAst(provider.token, provider.multiProvider, provider.eager || eager, providers, provider.providerType, provider.lifecycleHooks, provider.sourceSpan);
}
function _normalizeProviders(providers, sourceSpan, targetErrors, targetProviders = null) {
    if (isBlank(targetProviders)) {
        targetProviders = [];
    }
    if (isPresent(providers)) {
        providers.forEach((provider) => {
            if (isArray(provider)) {
                _normalizeProviders(provider, sourceSpan, targetErrors, targetProviders);
            }
            else {
                let normalizeProvider;
                if (provider instanceof CompileProviderMetadata) {
                    normalizeProvider = provider;
                }
                else if (provider instanceof CompileTypeMetadata) {
                    normalizeProvider = new CompileProviderMetadata({ token: new CompileTokenMetadata({ identifier: provider }), useClass: provider });
                }
                else {
                    targetErrors.push(new ProviderError(`Unknown provider type ${provider}`, sourceSpan));
                }
                if (isPresent(normalizeProvider)) {
                    targetProviders.push(normalizeProvider);
                }
            }
        });
    }
    return targetProviders;
}
function _resolveProvidersFromDirectives(directives, sourceSpan, targetErrors) {
    var providersByToken = new CompileIdentifierMap();
    directives.forEach((directive) => {
        var dirProvider = new CompileProviderMetadata({ token: new CompileTokenMetadata({ identifier: directive.type }), useClass: directive.type });
        _resolveProviders([dirProvider], directive.isComponent ? ProviderAstType.Component : ProviderAstType.Directive, true, sourceSpan, targetErrors, providersByToken);
    });
    // Note: directives need to be able to overwrite providers of a component!
    var directivesWithComponentFirst = directives.filter(dir => dir.isComponent).concat(directives.filter(dir => !dir.isComponent));
    directivesWithComponentFirst.forEach((directive) => {
        _resolveProviders(_normalizeProviders(directive.providers, sourceSpan, targetErrors), ProviderAstType.PublicService, false, sourceSpan, targetErrors, providersByToken);
        _resolveProviders(_normalizeProviders(directive.viewProviders, sourceSpan, targetErrors), ProviderAstType.PrivateService, false, sourceSpan, targetErrors, providersByToken);
    });
    return providersByToken;
}
function _resolveProviders(providers, providerType, eager, sourceSpan, targetErrors, targetProvidersByToken) {
    providers.forEach((provider) => {
        var resolvedProvider = targetProvidersByToken.get(provider.token);
        if (isPresent(resolvedProvider) && resolvedProvider.multiProvider !== provider.multi) {
            targetErrors.push(new ProviderError(`Mixing multi and non multi provider is not possible for token ${resolvedProvider.token.name}`, sourceSpan));
        }
        if (isBlank(resolvedProvider)) {
            const lifecycleHooks = provider.token.identifier && provider.token.identifier instanceof CompileTypeMetadata ?
                provider.token.identifier.lifecycleHooks :
                [];
            resolvedProvider = new ProviderAst(provider.token, provider.multi, eager || lifecycleHooks.length > 0, [provider], providerType, lifecycleHooks, sourceSpan);
            targetProvidersByToken.add(provider.token, resolvedProvider);
        }
        else {
            if (!provider.multi) {
                ListWrapper.clear(resolvedProvider.providers);
            }
            resolvedProvider.providers.push(provider);
        }
    });
}
function _getViewQueries(component) {
    var viewQueries = new CompileIdentifierMap();
    if (isPresent(component.viewQueries)) {
        component.viewQueries.forEach((query) => _addQueryToTokenMap(viewQueries, query));
    }
    component.type.diDeps.forEach((dep) => {
        if (isPresent(dep.viewQuery)) {
            _addQueryToTokenMap(viewQueries, dep.viewQuery);
        }
    });
    return viewQueries;
}
function _getContentQueries(directives) {
    var contentQueries = new CompileIdentifierMap();
    directives.forEach(directive => {
        if (isPresent(directive.queries)) {
            directive.queries.forEach((query) => _addQueryToTokenMap(contentQueries, query));
        }
        directive.type.diDeps.forEach((dep) => {
            if (isPresent(dep.query)) {
                _addQueryToTokenMap(contentQueries, dep.query);
            }
        });
    });
    return contentQueries;
}
function _addQueryToTokenMap(map, query) {
    query.selectors.forEach((token) => {
        var entry = map.get(token);
        if (isBlank(entry)) {
            entry = [];
            map.add(token, entry);
        }
        entry.push(query);
    });
}
//# sourceMappingURL=provider_analyzer.js.map