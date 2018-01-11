/**
 * Checks whether the user's browser supports passive event listeners.
 * See: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */
export declare function supportsPassiveEventListeners(): boolean;
/** @returns The input types supported by this browser. */
export declare function getSupportedInputTypes(): Set<string>;
