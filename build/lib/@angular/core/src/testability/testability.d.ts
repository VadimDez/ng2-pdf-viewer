import { NgZone } from '../zone/ng_zone';
/**
 * Testability API.
 * `declare` keyword causes tsickle to generate externs, so these methods are
 * not renamed by Closure Compiler.
 * @experimental
 */
export interface PublicTestability {
    isStable(): boolean;
    whenStable(callback: Function): void;
    findProviders(using: any, provider: string, exactMatch: boolean): any[];
}
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 * @experimental
 */
export declare class Testability implements PublicTestability {
    private _ngZone;
    constructor(_ngZone: NgZone);
    /**
     * Increases the number of pending request
     */
    increasePendingRequestCount(): number;
    /**
     * Decreases the number of pending request
     */
    decreasePendingRequestCount(): number;
    /**
     * Whether an associated application is stable
     */
    isStable(): boolean;
    /**
     * Run callback when the application is stable
     * @param callback function to be called after the application is stable
     */
    whenStable(callback: Function): void;
    /**
     * Get the number of pending requests
     */
    getPendingRequestCount(): number;
    /**
     * Find providers by name
     * @param using The root element to search from
     * @param provider The name of binding variable
     * @param exactMatch Whether using exactMatch
     */
    findProviders(using: any, provider: string, exactMatch: boolean): any[];
}
/**
 * A global registry of {@link Testability} instances for specific elements.
 * @experimental
 */
export declare class TestabilityRegistry {
    constructor();
    /**
     * Registers an application with a testability hook so that it can be tracked
     * @param token token of application, root element
     * @param testability Testability hook
     */
    registerApplication(token: any, testability: Testability): void;
    /**
     * Unregisters an application.
     * @param token token of application, root element
     */
    unregisterApplication(token: any): void;
    /**
     * Unregisters all applications
     */
    unregisterAllApplications(): void;
    /**
     * Get a testability hook associated with the application
     * @param elem root element
     */
    getTestability(elem: any): Testability | null;
    /**
     * Get all registered testabilities
     */
    getAllTestabilities(): Testability[];
    /**
     * Get all registered applications(root elements)
     */
    getAllRootElements(): any[];
    /**
     * Find testability of a node in the Tree
     * @param elem node
     * @param findInAncestors whether finding testability in ancestors if testability was not found in
     * current node
     */
    findTestabilityInTree(elem: Node, findInAncestors?: boolean): Testability | null;
}
/**
 * Adapter interface for retrieving the `Testability` service associated for a
 * particular context.
 *
 * @experimental Testability apis are primarily intended to be used by e2e test tool vendors like
 * the Protractor team.
 */
export interface GetTestability {
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability | null;
}
/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 * @experimental
 */
export declare function setTestabilityGetter(getter: GetTestability): void;
