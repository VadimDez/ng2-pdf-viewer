import { GetTestability, Testability, TestabilityRegistry } from '@angular/core';
export declare class BrowserGetTestability implements GetTestability {
    static init(): void;
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability;
}
