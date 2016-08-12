/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler, ComponentMetadata, DirectiveMetadata, Injectable, Injector, resolveForwardRef } from '@angular/core';
import { DirectiveResolver } from '../src/directive_resolver';
import { Map } from '../src/facade/collection';
import { BaseException } from '../src/facade/exceptions';
import { isArray, isPresent, stringify } from '../src/facade/lang';
export class MockDirectiveResolver extends DirectiveResolver {
    constructor(_injector) {
        super();
        this._injector = _injector;
        this._directives = new Map();
        this._providerOverrides = new Map();
        this._viewProviderOverrides = new Map();
        this._views = new Map();
        this._inlineTemplates = new Map();
        this._animations = new Map();
        this._directiveOverrides = new Map();
    }
    get _compiler() { return this._injector.get(Compiler); }
    _clearCacheFor(component) { this._compiler.clearCacheFor(component); }
    resolve(type, throwIfNotFound = true) {
        let metadata = this._directives.get(type);
        if (!metadata) {
            metadata = super.resolve(type, throwIfNotFound);
        }
        if (!metadata) {
            return null;
        }
        const providerOverrides = this._providerOverrides.get(type);
        const viewProviderOverrides = this._viewProviderOverrides.get(type);
        let providers = metadata.providers;
        if (isPresent(providerOverrides)) {
            const originalViewProviders = isPresent(metadata.providers) ? metadata.providers : [];
            providers = originalViewProviders.concat(providerOverrides);
        }
        if (metadata instanceof ComponentMetadata) {
            let viewProviders = metadata.viewProviders;
            if (isPresent(viewProviderOverrides)) {
                const originalViewProviders = isPresent(metadata.viewProviders) ? metadata.viewProviders : [];
                viewProviders = originalViewProviders.concat(viewProviderOverrides);
            }
            let view = this._views.get(type);
            if (!view) {
                view = metadata;
            }
            const directives = [];
            if (isPresent(view.directives)) {
                flattenArray(view.directives, directives);
            }
            let animations = view.animations;
            let templateUrl = view.templateUrl;
            const directiveOverrides = this._directiveOverrides.get(type);
            const inlineAnimations = this._animations.get(type);
            if (isPresent(inlineAnimations)) {
                animations = inlineAnimations;
            }
            let inlineTemplate = this._inlineTemplates.get(type);
            if (isPresent(inlineTemplate)) {
                templateUrl = null;
            }
            else {
                inlineTemplate = view.template;
            }
            if (isPresent(directiveOverrides) && isPresent(view.directives)) {
                directiveOverrides.forEach((to, from) => {
                    var srcIndex = directives.indexOf(from);
                    if (srcIndex == -1) {
                        throw new BaseException(`Overriden directive ${stringify(from)} not found in the template of ${stringify(type)}`);
                    }
                    directives[srcIndex] = to;
                });
            }
            return new ComponentMetadata({
                selector: metadata.selector,
                inputs: metadata.inputs,
                outputs: metadata.outputs,
                host: metadata.host,
                exportAs: metadata.exportAs,
                moduleId: metadata.moduleId,
                queries: metadata.queries,
                changeDetection: metadata.changeDetection,
                providers: providers,
                viewProviders: viewProviders,
                entryComponents: metadata.entryComponents,
                template: inlineTemplate,
                templateUrl: templateUrl,
                directives: directives.length > 0 ? directives : null,
                animations: animations,
                styles: view.styles,
                styleUrls: view.styleUrls,
                pipes: view.pipes,
                encapsulation: view.encapsulation,
                interpolation: view.interpolation
            });
        }
        return new DirectiveMetadata({
            selector: metadata.selector,
            inputs: metadata.inputs,
            outputs: metadata.outputs,
            host: metadata.host,
            providers: providers,
            exportAs: metadata.exportAs,
            queries: metadata.queries
        });
    }
    /**
     * Overrides the {@link DirectiveMetadata} for a directive.
     */
    setDirective(type, metadata) {
        this._directives.set(type, metadata);
        this._clearCacheFor(type);
    }
    setProvidersOverride(type, providers) {
        this._providerOverrides.set(type, providers);
        this._clearCacheFor(type);
    }
    setViewProvidersOverride(type, viewProviders) {
        this._viewProviderOverrides.set(type, viewProviders);
        this._clearCacheFor(type);
    }
    /**
     * Overrides the {@link ViewMetadata} for a component.
     */
    setView(component, view) {
        this._views.set(component, view);
        this._clearCacheFor(component);
    }
    /**
     * Overrides the inline template for a component - other configuration remains unchanged.
     */
    setInlineTemplate(component, template) {
        this._inlineTemplates.set(component, template);
        this._clearCacheFor(component);
    }
    setAnimations(component, animations) {
        this._animations.set(component, animations);
        this._clearCacheFor(component);
    }
    /**
     * Overrides a directive from the component {@link ViewMetadata}.
     */
    overrideViewDirective(component, from, to) {
        var overrides = this._directiveOverrides.get(component);
        if (!overrides) {
            overrides = new Map();
            this._directiveOverrides.set(component, overrides);
        }
        overrides.set(from, to);
        this._clearCacheFor(component);
    }
}
/** @nocollapse */
MockDirectiveResolver.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MockDirectiveResolver.ctorParameters = [
    { type: Injector, },
];
function flattenArray(tree, out) {
    if (!isPresent(tree))
        return;
    for (var i = 0; i < tree.length; i++) {
        var item = resolveForwardRef(tree[i]);
        if (isArray(item)) {
            flattenArray(item, out);
        }
        else {
            out.push(item);
        }
    }
}
//# sourceMappingURL=directive_resolver_mock.js.map