import { Provider, ReflectiveInjector, Type } from '../index';
export { async } from './async';
export declare class TestInjector {
    private _instantiated;
    private _injector;
    private _providers;
    reset(): void;
    platformProviders: Array<Type | Provider | any[] | any>;
    applicationProviders: Array<Type | Provider | any[] | any>;
    addProviders(providers: Array<Type | Provider | any[] | any>): void;
    createInjector(): ReflectiveInjector;
    get(token: any): any;
    execute(tokens: any[], fn: Function): any;
}
export declare function getTestInjector(): TestInjector;
/**
 * Set the providers that the test injector should use. These should be providers
 * common to every test in the suite.
 *
 * This may only be called once, to set up the common providers for the current test
 * suite on teh current platform. If you absolutely need to change the providers,
 * first use `resetBaseTestProviders`.
 *
 * Test Providers for individual platforms are available from
 * 'angular2/platform/testing/<platform_name>'.
 */
export declare function setBaseTestProviders(platformProviders: Array<Type | Provider | any[]>, applicationProviders: Array<Type | Provider | any[]>): void;
/**
 * Reset the providers for the test injector.
 */
export declare function resetBaseTestProviders(): void;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 */
export declare function inject(tokens: any[], fn: Function): Function;
export declare class InjectSetupWrapper {
    private _providers;
    constructor(_providers: () => any);
    private _addProviders();
    inject(tokens: any[], fn: Function): Function;
    /** @deprecated {use async(withProviders().inject())} */
    injectAsync(tokens: any[], fn: Function): Function;
}
export declare function withProviders(providers: () => any): InjectSetupWrapper;
/**
 * @deprecated {use async(inject())}
 *
 * Allows injecting dependencies in `beforeEach()` and `it()`. The test must return
 * a promise which will resolve when all asynchronous activity is complete.
 *
 * Example:
 *
 * ```
 * it('...', injectAsync([AClass], (object) => {
 *   return object.doSomething().then(() => {
 *     expect(...);
 *   });
 * })
 * ```
 *
 */
export declare function injectAsync(tokens: any[], fn: Function): Function;
