export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type PageViewport = import("../src/display/display_utils").PageViewport;
export type EventBus = import("./event_utils").EventBus;
export type IDownloadManager = import("./interfaces").IDownloadManager;
export type IL10n = import("./interfaces").IL10n;
export type IPDFAnnotationLayerFactory = import("./interfaces").IPDFAnnotationLayerFactory;
export type IPDFLinkService = import("./interfaces").IPDFLinkService;
export type IPDFStructTreeLayerFactory = import("./interfaces").IPDFStructTreeLayerFactory;
export type IPDFTextLayerFactory = import("./interfaces").IPDFTextLayerFactory;
export type IPDFXfaLayerFactory = import("./interfaces").IPDFXfaLayerFactory;
export type TextHighlighter = import("./text_highlighter").TextHighlighter;
/**
 * @implements IPDFAnnotationLayerFactory
 */
export class DefaultAnnotationLayerFactory implements IPDFAnnotationLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPageProxy} pdfPage
     * @param {AnnotationStorage} [annotationStorage]
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
/**
 * @implements IPDFStructTreeLayerFactory
 */
export class DefaultStructTreeLayerFactory implements IPDFStructTreeLayerFactory {
    /**
     * @param {PDFPageProxy} pdfPage
     * @returns {StructTreeLayerBuilder}
     */
    createStructTreeLayerBuilder(pdfPage: PDFPageProxy): StructTreeLayerBuilder;
}
/**
 * @implements IPDFTextLayerFactory
 */
export class DefaultTextLayerFactory implements IPDFTextLayerFactory {
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
 * @implements IPDFXfaLayerFactory
 */
export class DefaultXfaLayerFactory implements IPDFXfaLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPageProxy} pdfPage
     * @param {AnnotationStorage} [annotationStorage]
     * @param {Object} [xfaHtml]
     */
    createXfaLayerBuilder(pageDiv: HTMLDivElement, pdfPage: PDFPageProxy, annotationStorage?: any, xfaHtml?: Object | undefined): XfaLayerBuilder;
}
import { AnnotationLayerBuilder } from "./annotation_layer_builder.js";
import { StructTreeLayerBuilder } from "./struct_tree_layer_builder.js";
import { TextLayerBuilder } from "./text_layer_builder.js";
import { XfaLayerBuilder } from "./xfa_layer_builder.js";
