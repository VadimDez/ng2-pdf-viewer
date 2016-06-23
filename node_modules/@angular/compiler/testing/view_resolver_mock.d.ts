import { AnimationEntryMetadata, Type, ViewMetadata } from '@angular/core';
import { ViewResolver } from '../index';
export declare class MockViewResolver extends ViewResolver {
    constructor();
    /**
     * Overrides the {@link ViewMetadata} for a component.
     */
    setView(component: Type, view: ViewMetadata): void;
    /**
     * Overrides the inline template for a component - other configuration remains unchanged.
     */
    setInlineTemplate(component: Type, template: string): void;
    setAnimations(component: Type, animations: AnimationEntryMetadata[]): void;
    /**
     * Overrides a directive from the component {@link ViewMetadata}.
     */
    overrideViewDirective(component: Type, from: Type, to: Type): void;
    /**
     * Returns the {@link ViewMetadata} for a component:
     * - Set the {@link ViewMetadata} to the overridden view when it exists or fallback to the default
     * `ViewResolver`,
     *   see `setView`.
     * - Override the directives, see `overrideViewDirective`.
     * - Override the @View definition, see `setInlineTemplate`.
     */
    resolve(component: Type): ViewMetadata;
}
