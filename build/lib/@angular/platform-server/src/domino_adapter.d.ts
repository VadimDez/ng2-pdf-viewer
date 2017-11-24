import { ɵBrowserDomAdapter as BrowserDomAdapter } from '@angular/platform-browser';
/**
 * Parses a document string to a Document object.
 */
export declare function parseDocument(html: string, url?: string): any;
/**
 * Serializes a document to string.
 */
export declare function serializeDocument(doc: Document): string;
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
export declare class DominoAdapter extends BrowserDomAdapter {
    static makeCurrent(): void;
    private static defaultDoc;
    logError(error: string): void;
    log(error: string): void;
    logGroup(error: string): void;
    logGroupEnd(): void;
    supportsDOMEvents(): boolean;
    supportsNativeShadowDOM(): boolean;
    contains(nodeA: any, nodeB: any): boolean;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    createShadowRoot(el: any, doc?: Document): DocumentFragment;
    getShadowRoot(el: any): DocumentFragment;
    isTextNode(node: any): boolean;
    isCommentNode(node: any): boolean;
    isElementNode(node: any): boolean;
    hasShadowRoot(node: any): boolean;
    isShadowRoot(node: any): boolean;
    getProperty(el: Element, name: string): any;
    setProperty(el: Element, name: string, value: any): void;
    getGlobalEventTarget(doc: Document, target: string): EventTarget | null;
    getBaseHref(doc: Document): string;
    setStyle(element: any, styleName: string, styleValue?: string | null): void;
    removeStyle(element: any, styleName: string): void;
    getStyle(element: any, styleName: string): string;
    hasStyle(element: any, styleName: string, styleValue?: string): boolean;
    dispatchEvent(el: Node, evt: any): void;
    getHistory(): History;
    getLocation(): Location;
    getUserAgent(): string;
    supportsWebAnimation(): boolean;
    performanceNow(): number;
    getAnimationPrefix(): string;
    getTransitionEnd(): string;
    supportsAnimation(): boolean;
    getDistributedNodes(el: any): Node[];
    supportsCookies(): boolean;
    getCookie(name: string): string;
    setCookie(name: string, value: string): void;
}
