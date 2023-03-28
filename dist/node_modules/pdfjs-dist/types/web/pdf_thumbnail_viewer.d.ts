export type PDFDocumentProxy = import("../src/display/api").PDFDocumentProxy;
export type EventBus = import("./event_utils").EventBus;
export type IL10n = import("./interfaces").IL10n;
export type IPDFLinkService = import("./interfaces").IPDFLinkService;
export type PDFRenderingQueue = import("./pdf_rendering_queue").PDFRenderingQueue;
export type PDFThumbnailViewerOptions = {
    /**
     * - The container for the thumbnail
     * elements.
     */
    container: HTMLDivElement;
    /**
     * - The application event bus.
     */
    eventBus: EventBus;
    /**
     * - The navigation/linking service.
     */
    linkService: IPDFLinkService;
    /**
     * - The rendering queue object.
     */
    renderingQueue: PDFRenderingQueue;
    /**
     * - Localization service.
     */
    l10n: IL10n;
};
/**
 * @typedef {Object} PDFThumbnailViewerOptions
 * @property {HTMLDivElement} container - The container for the thumbnail
 *   elements.
 * @property {EventBus} eventBus - The application event bus.
 * @property {IPDFLinkService} linkService - The navigation/linking service.
 * @property {PDFRenderingQueue} renderingQueue - The rendering queue object.
 * @property {IL10n} l10n - Localization service.
 */
/**
 * Viewer control to display thumbnails for pages in a PDF document.
 */
export class PDFThumbnailViewer {
    /**
     * @param {PDFThumbnailViewerOptions} options
     */
    constructor({ container, eventBus, linkService, renderingQueue, l10n }: PDFThumbnailViewerOptions);
    container: HTMLDivElement;
    linkService: import("./interfaces").IPDFLinkService;
    renderingQueue: import("./pdf_rendering_queue").PDFRenderingQueue;
    l10n: import("./interfaces").IL10n;
    scroll: {
        right: boolean;
        down: boolean;
        lastX: any;
        lastY: any;
        _eventHandler: (evt: any) => void;
    };
    _setImageDisabled: boolean;
    /**
     * @private
     */
    private _scrollUpdated;
    getThumbnail(index: any): any;
    /**
     * @private
     */
    private _getVisibleThumbs;
    scrollThumbnailIntoView(pageNumber: any): void;
    _currentPageNumber: any;
    set pagesRotation(arg: any);
    get pagesRotation(): any;
    _pagesRotation: any;
    cleanup(): void;
    /**
     * @private
     */
    private _resetView;
    _thumbnails: any[] | undefined;
    _pageLabels: any[] | null | undefined;
    _optionalContentConfigPromise: Promise<import("../src/display/optional_content_config.js").OptionalContentConfig> | null | undefined;
    /**
     * @param {PDFDocumentProxy} pdfDocument
     */
    setDocument(pdfDocument: PDFDocumentProxy): void;
    pdfDocument: import("../src/display/api").PDFDocumentProxy | undefined;
    /**
     * @private
     */
    private _cancelRendering;
    /**
     * @param {Array|null} labels
     */
    setPageLabels(labels: any[] | null): void;
    forceRendering(): boolean;
    #private;
}
