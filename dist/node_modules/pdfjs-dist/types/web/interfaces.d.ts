export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type PageViewport = import("../src/display/display_utils").PageViewport;
export type AnnotationLayerBuilder = import("./annotation_layer_builder").AnnotationLayerBuilder;
export type EventBus = import("./event_utils").EventBus;
export type StructTreeLayerBuilder = any;
export type TextHighlighter = import("./text_highlighter").TextHighlighter;
export type TextLayerBuilder = import("./text_layer_builder").TextLayerBuilder;
export type RenderingStates = any;
export type XfaLayerBuilder = import("./xfa_layer_builder").XfaLayerBuilder;
/**
 * @interface
 */
export class IDownloadManager {
    /**
     * @param {string} url
     * @param {string} filename
     */
    downloadUrl(url: string, filename: string): void;
    /**
     * @param {Uint8Array} data
     * @param {string} filename
     * @param {string} [contentType]
     */
    downloadData(data: Uint8Array, filename: string, contentType?: string | undefined): void;
    /**
     * @param {HTMLElement} element
     * @param {Uint8Array} data
     * @param {string} filename
     * @returns {boolean} Indicating if the data was opened.
     */
    openOrDownloadData(element: HTMLElement, data: Uint8Array, filename: string): boolean;
    /**
     * @param {Blob} blob
     * @param {string} url
     * @param {string} filename
     * @param {string} [sourceEventType]
     */
    download(blob: Blob, url: string, filename: string, sourceEventType?: string | undefined): void;
}
/**
 * @interface
 */
export class IL10n {
    /**
     * @returns {Promise<string>} - Resolves to the current locale.
     */
    getLanguage(): Promise<string>;
    /**
     * @returns {Promise<string>} - Resolves to 'rtl' or 'ltr'.
     */
    getDirection(): Promise<string>;
    /**
     * Translates text identified by the key and adds/formats data using the args
     * property bag. If the key was not found, translation falls back to the
     * fallback text.
     * @param {string} key
     * @param {Object | null} [args]
     * @param {string} [fallback]
     * @returns {Promise<string>}
     */
    get(key: string, args?: Object | null | undefined, fallback?: string | undefined): Promise<string>;
    /**
     * Translates HTML element.
     * @param {HTMLElement} element
     * @returns {Promise<void>}
     */
    translate(element: HTMLElement): Promise<void>;
}
/**
 * @interface
 */
export class IPDFAnnotationLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPageProxy} pdfPage
     * @param {AnnotationStorage} [annotationStorage] - Storage for annotation
     *   data in forms.
     * @param {string} [imageResourcesPath] - Path for image resources, mainly
     *   for annotation icons. Include trailing slash.
     * @param {boolean} renderForms
     * @param {IL10n} l10n
     * @param {boolean} [enableScripting]
     * @param {Promise<boolean>} [hasJSActionsPromise]
     * @param {Object} [mouseState]
     * @param {Promise<Object<string, Array<Object>> | null>}
     *   [fieldObjectsPromise]
     * @param {Map<string, HTMLCanvasElement>} [annotationCanvasMap] - Map some
     *   annotation ids with canvases used to render them.
     * @returns {AnnotationLayerBuilder}
     */
    createAnnotationLayerBuilder(pageDiv: HTMLDivElement, pdfPage: PDFPageProxy, annotationStorage?: any, imageResourcesPath?: string | undefined, renderForms?: boolean, l10n?: IL10n, enableScripting?: boolean | undefined, hasJSActionsPromise?: Promise<boolean> | undefined, mouseState?: Object | undefined, fieldObjectsPromise?: Promise<{
        [x: string]: Object[];
    } | null> | undefined, annotationCanvasMap?: Map<string, HTMLCanvasElement> | undefined): AnnotationLayerBuilder;
}
/** @typedef {import("../src/display/api").PDFPageProxy} PDFPageProxy */
/** @typedef {import("../src/display/display_utils").PageViewport} PageViewport */
/** @typedef {import("./annotation_layer_builder").AnnotationLayerBuilder} AnnotationLayerBuilder */
/** @typedef {import("./event_utils").EventBus} EventBus */
/** @typedef {import("./struct_tree_builder").StructTreeLayerBuilder} StructTreeLayerBuilder */
/** @typedef {import("./text_highlighter").TextHighlighter} TextHighlighter */
/** @typedef {import("./text_layer_builder").TextLayerBuilder} TextLayerBuilder */
/** @typedef {import("./ui_utils").RenderingStates} RenderingStates */
/** @typedef {import("./xfa_layer_builder").XfaLayerBuilder} XfaLayerBuilder */
/**
 * @interface
 */
export class IPDFLinkService {
    /**
     * @type {number}
     */
    get pagesCount(): number;
    /**
     * @param {number} value
     */
    set page(arg: number);
    /**
     * @type {number}
     */
    get page(): number;
    /**
     * @param {number} value
     */
    set rotation(arg: number);
    /**
     * @type {number}
     */
    get rotation(): number;
    /**
     * @param {boolean} value
     */
    set externalLinkEnabled(arg: boolean);
    /**
     * @type {boolean}
     */
    get externalLinkEnabled(): boolean;
    /**
     * @param {string|Array} dest - The named, or explicit, PDF destination.
     */
    goToDestination(dest: string | any[]): Promise<void>;
    /**
     * @param {number|string} val - The page number, or page label.
     */
    goToPage(val: number | string): void;
    /**
     * @param {HTMLAnchorElement} link
     * @param {string} url
     * @param {boolean} [newWindow]
     */
    addLinkAttributes(link: HTMLAnchorElement, url: string, newWindow?: boolean | undefined): void;
    /**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
    getDestinationHash(dest: any): string;
    /**
     * @param hash - The PDF parameters/hash.
     * @returns {string} The hyperlink to the PDF object.
     */
    getAnchorUrl(hash: any): string;
    /**
     * @param {string} hash
     */
    setHash(hash: string): void;
    /**
     * @param {string} action
     */
    executeNamedAction(action: string): void;
    /**
     * @param {number} pageNum - page number.
     * @param {Object} pageRef - reference to the page.
     */
    cachePageRef(pageNum: number, pageRef: Object): void;
    /**
     * @param {number} pageNumber
     */
    isPageVisible(pageNumber: number): void;
    /**
     * @param {number} pageNumber
     */
    isPageCached(pageNumber: number): void;
}
/**
 * @interface
 */
export class IPDFStructTreeLayerFactory {
    /**
     * @param {PDFPageProxy} pdfPage
     * @returns {StructTreeLayerBuilder}
     */
    createStructTreeLayerBuilder(pdfPage: PDFPageProxy): any;
}
/**
 * @interface
 */
export class IPDFTextLayerFactory {
    /**
     * @param {HTMLDivElement} textLayerDiv
     * @param {number} pageIndex
     * @param {PageViewport} viewport
     * @param {boolean} enhanceTextSelection
     * @param {EventBus} eventBus
     * @param {TextHighlighter} highlighter
     * @returns {TextLayerBuilder}
     */
    createTextLayerBuilder(textLayerDiv: HTMLDivElement, pageIndex: number, viewport: PageViewport, enhanceTextSelection: boolean | undefined, eventBus: EventBus, highlighter: TextHighlighter): TextLayerBuilder;
}
/**
 * @interface
 */
export class IPDFXfaLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPageProxy} pdfPage
     * @param {AnnotationStorage} [annotationStorage]
     * @param {Object} [xfaHtml]
     * @returns {XfaLayerBuilder}
     */
    createXfaLayerBuilder(pageDiv: HTMLDivElement, pdfPage: PDFPageProxy, annotationStorage?: any, xfaHtml?: Object | undefined): XfaLayerBuilder;
}
/**
 * @interface
 */
export class IRenderableView {
    /** @type {function | null} */
    resume: Function | null;
    /**
     * @type {string} - Unique ID for rendering queue.
     */
    get renderingId(): string;
    /**
     * @type {RenderingStates}
     */
    get renderingState(): any;
    /**
     * @returns {Promise} Resolved on draw completion.
     */
    draw(): Promise<any>;
}
