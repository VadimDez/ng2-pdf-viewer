/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEntryMetadata, ComponentFactory, Injector, NgZone, ViewMetadata } from '../index';
import { ConcreteType, Type } from '../src/facade/lang';
import { ComponentFixture } from './component_fixture';
/**
 * Builds a ComponentFixture for use in component level tests.
 *
 * @deprecated Use `TestBed.configureTestModule` / `TestBed.override...` / `TestBed.createComponent`
 * instead.
 */
export declare class TestComponentBuilder {
    protected _injector: Injector;
    constructor(_injector: Injector);
    /**
     * Overrides only the html of a {@link ComponentMetadata}.
     * All the other properties of the component's {@link ViewMetadata} are preserved.
     */
    overrideTemplate(componentType: Type, template: string): TestComponentBuilder;
    /**
     * Overrides a component's {@link ViewMetadata}.
     */
    overrideView(componentType: Type, view: ViewMetadata): TestComponentBuilder;
    /**
     * Overrides the directives from the component {@link ViewMetadata}.
     */
    overrideDirective(componentType: Type, from: Type, to: Type): TestComponentBuilder;
    /**
     * Overrides one or more injectables configured via `providers` metadata property of a directive
     * or
     * component.
     * Very useful when certain providers need to be mocked out.
     *
     * The providers specified via this method are appended to the existing `providers` causing the
     * duplicated providers to
     * be overridden.
     */
    overrideProviders(type: Type, providers: any[]): TestComponentBuilder;
    /**
     * Overrides one or more injectables configured via `providers` metadata property of a directive
     * or
     * component.
     * Very useful when certain providers need to be mocked out.
     *
     * The providers specified via this method are appended to the existing `providers` causing the
     * duplicated providers to
     * be overridden.
     */
    overrideViewProviders(type: Type, providers: any[]): TestComponentBuilder;
    overrideAnimations(componentType: Type, animations: AnimationEntryMetadata[]): TestComponentBuilder;
    protected createFromFactory<C>(ngZone: NgZone, componentFactory: ComponentFactory<C>): ComponentFixture<C>;
    /**
     * Builds and returns a ComponentFixture.
     */
    createAsync<T>(rootComponentType: ConcreteType<T>): Promise<ComponentFixture<T>>;
    createFakeAsync<T>(rootComponentType: ConcreteType<T>): ComponentFixture<T>;
    createSync<T>(rootComponentType: ConcreteType<T>): ComponentFixture<T>;
}
