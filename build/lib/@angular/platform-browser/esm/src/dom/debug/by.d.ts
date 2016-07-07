import { DebugElement } from '@angular/core';
import { Predicate } from '../../facade/collection';
import { Type } from '../../facade/lang';
/**
 * Predicates for use with {@link DebugElement}'s query functions.
 */
export declare class By {
    /**
     * Match all elements.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_all'}
     */
    static all(): Predicate<DebugElement>;
    /**
     * Match elements by the given CSS selector.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_css'}
     */
    static css(selector: string): Predicate<DebugElement>;
    /**
     * Match elements that have the given directive present.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_directive'}
     */
    static directive(type: Type): Predicate<DebugElement>;
}
