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
var directive_resolver_1 = require('../src/directive_resolver');
var collection_1 = require('../src/facade/collection');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var MockDirectiveResolver = (function (_super) {
    __extends(MockDirectiveResolver, _super);
    function MockDirectiveResolver(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._directives = new collection_1.Map();
        this._providerOverrides = new collection_1.Map();
        this._viewProviderOverrides = new collection_1.Map();
        this._views = new collection_1.Map();
        this._inlineTemplates = new collection_1.Map();
        this._animations = new collection_1.Map();
        this._directiveOverrides = new collection_1.Map();
    }
    Object.defineProperty(MockDirectiveResolver.prototype, "_compiler", {
        get: function () { return this._injector.get(core_1.Compiler); },
        enumerable: true,
        configurable: true
    });
    MockDirectiveResolver.prototype._clearCacheFor = function (component) { this._compiler.clearCacheFor(component); };
    MockDirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var metadata = this._directives.get(type);
        if (!metadata) {
            metadata = _super.prototype.resolve.call(this, type, throwIfNotFound);
        }
        if (!metadata) {
            return null;
        }
        var providerOverrides = this._providerOverrides.get(type);
        var viewProviderOverrides = this._viewProviderOverrides.get(type);
        var providers = metadata.providers;
        if (lang_1.isPresent(providerOverrides)) {
            var originalViewProviders = lang_1.isPresent(metadata.providers) ? metadata.providers : [];
            providers = originalViewProviders.concat(providerOverrides);
        }
        if (metadata instanceof core_1.ComponentMetadata) {
            var viewProviders = metadata.viewProviders;
            if (lang_1.isPresent(viewProviderOverrides)) {
                var originalViewProviders = lang_1.isPresent(metadata.viewProviders) ? metadata.viewProviders : [];
                viewProviders = originalViewProviders.concat(viewProviderOverrides);
            }
            var view = this._views.get(type);
            if (!view) {
                view = metadata;
            }
            var directives_1 = [];
            if (lang_1.isPresent(view.directives)) {
                flattenArray(view.directives, directives_1);
            }
            var animations = view.animations;
            var templateUrl = view.templateUrl;
            var directiveOverrides = this._directiveOverrides.get(type);
            var inlineAnimations = this._animations.get(type);
            if (lang_1.isPresent(inlineAnimations)) {
                animations = inlineAnimations;
            }
            var inlineTemplate = this._inlineTemplates.get(type);
            if (lang_1.isPresent(inlineTemplate)) {
                templateUrl = null;
            }
            else {
                inlineTemplate = view.template;
            }
            if (lang_1.isPresent(directiveOverrides) && lang_1.isPresent(view.directives)) {
                directiveOverrides.forEach(function (to, from) {
                    var srcIndex = directives_1.indexOf(from);
                    if (srcIndex == -1) {
                        throw new exceptions_1.BaseException("Overriden directive " + lang_1.stringify(from) + " not found in the template of " + lang_1.stringify(type));
                    }
                    directives_1[srcIndex] = to;
                });
            }
            return new core_1.ComponentMetadata({
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
                directives: directives_1.length > 0 ? directives_1 : null,
                animations: animations,
                styles: view.styles,
                styleUrls: view.styleUrls,
                pipes: view.pipes,
                encapsulation: view.encapsulation,
                interpolation: view.interpolation
            });
        }
        return new core_1.DirectiveMetadata({
            selector: metadata.selector,
            inputs: metadata.inputs,
            outputs: metadata.outputs,
            host: metadata.host,
            providers: providers,
            exportAs: metadata.exportAs,
            queries: metadata.queries
        });
    };
    /**
     * Overrides the {@link DirectiveMetadata} for a directive.
     */
    MockDirectiveResolver.prototype.setDirective = function (type, metadata) {
        this._directives.set(type, metadata);
        this._clearCacheFor(type);
    };
    MockDirectiveResolver.prototype.setProvidersOverride = function (type, providers) {
        this._providerOverrides.set(type, providers);
        this._clearCacheFor(type);
    };
    MockDirectiveResolver.prototype.setViewProvidersOverride = function (type, viewProviders) {
        this._viewProviderOverrides.set(type, viewProviders);
        this._clearCacheFor(type);
    };
    /**
     * Overrides the {@link ViewMetadata} for a component.
     */
    MockDirectiveResolver.prototype.setView = function (component, view) {
        this._views.set(component, view);
        this._clearCacheFor(component);
    };
    /**
     * Overrides the inline template for a component - other configuration remains unchanged.
     */
    MockDirectiveResolver.prototype.setInlineTemplate = function (component, template) {
        this._inlineTemplates.set(component, template);
        this._clearCacheFor(component);
    };
    MockDirectiveResolver.prototype.setAnimations = function (component, animations) {
        this._animations.set(component, animations);
        this._clearCacheFor(component);
    };
    /**
     * Overrides a directive from the component {@link ViewMetadata}.
     */
    MockDirectiveResolver.prototype.overrideViewDirective = function (component, from, to) {
        var overrides = this._directiveOverrides.get(component);
        if (!overrides) {
            overrides = new collection_1.Map();
            this._directiveOverrides.set(component, overrides);
        }
        overrides.set(from, to);
        this._clearCacheFor(component);
    };
    /** @nocollapse */
    MockDirectiveResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MockDirectiveResolver.ctorParameters = [
        { type: core_1.Injector, },
    ];
    return MockDirectiveResolver;
}(directive_resolver_1.DirectiveResolver));
exports.MockDirectiveResolver = MockDirectiveResolver;
function flattenArray(tree, out) {
    if (!lang_1.isPresent(tree))
        return;
    for (var i = 0; i < tree.length; i++) {
        var item = core_1.resolveForwardRef(tree[i]);
        if (lang_1.isArray(item)) {
            flattenArray(item, out);
        }
        else {
            out.push(item);
        }
    }
}
//# sourceMappingURL=directive_resolver_mock.js.map