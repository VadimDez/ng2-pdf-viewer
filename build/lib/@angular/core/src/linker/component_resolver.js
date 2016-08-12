/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * Low-level service for loading {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * @deprecated Use {@link ComponentFactoryResolver} together with {@link
 * NgModule}.entryComponents}/{@link Component}.entryComponents or
 * {@link ANALYZE_FOR_ENTRY_COMPONENTS} provider for dynamic component creation.
 * Use {@link NgModuleFactoryLoader} for lazy loading.
 */
var ComponentResolver = (function () {
    function ComponentResolver() {
    }
    ComponentResolver.DynamicCompilationDeprecationMsg = 'ComponentResolver is deprecated for dynamic compilation. Use ComponentFactoryResolver together with @NgModule/@Component.entryComponents or ANALYZE_FOR_ENTRY_COMPONENTS provider instead. For runtime compile only, you can also use Compiler.compileComponentSync/Async.';
    ComponentResolver.LazyLoadingDeprecationMsg = 'ComponentResolver is deprecated for lazy loading. Use NgModuleFactoryLoader instead.';
    return ComponentResolver;
}());
exports.ComponentResolver = ComponentResolver;
//# sourceMappingURL=component_resolver.js.map