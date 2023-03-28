export type PageViewport = import("../src/display/display_utils").PageViewport;
export type OptionalContentConfig = import("../src/display/optional_content_config").OptionalContentConfig;
export type EventBus = import("./event_utils").EventBus;
export type IL10n = import("./interfaces").IL10n;
export type IPDFAnnotationLayerFactory = import("./interfaces").IPDFAnnotationLayerFactory;
export type IPDFStructTreeLayerFactory = import("./interfaces").IPDFStructTreeLayerFactory;
export type IPDFTextLayerFactory = import("./interfaces").IPDFTextLayerFactory;
export type IPDFXfaLayerFactory = import("./interfaces").IL10n;
export type IRenderableView = import("./interfaces").IRenderableView;
export type PDFRenderingQueue = import("./pdf_rendering_queue").PDFRenderingQueue;
export type PDFPageViewOptions = {
    /**
     * - The viewer element.
     */
    container?: HTMLDivElement | undefined;
    /**
     * - The application event bus.
     */
    eventBus: EventBus;
    /**
     * - The page unique ID (normally its number).
     */
    id: number;
    /**
     * - The page scale display.
     */
    scale: number;
    /**
     * - The page viewport.
     */
    defaultViewport: PageViewport;
    /**
     * -
     * A promise that is resolved with an {@link OptionalContentConfig } instance.
     * The default value is `null`.
     */
    optionalContentConfigPromise?: Promise<import("../src/display/optional_content_config").OptionalContentConfig> | undefined;
    /**
     * - The rendering queue object.
     */
    renderingQueue: PDFRenderingQueue;
    textLayerFactory: IPDFTextLayerFactory;
    /**
     * - Controls if the text layer used for
     * selection and searching is created, and if the improved text selection
     * behaviour is enabled. The constants from {TextLayerMode} should be used.
     * The default value is `TextLayerMode.ENABLE`.
     */
    textLayerMode?: number | undefined;
    /**
     * - Controls if the annotation layer is
     * created, and if interactive form elements or `AnnotationStorage`-data are
     * being rendered. The constants from {@link AnnotationMode } should be used;
     * see also {@link RenderParameters } and {@link GetOperatorListParameters }.
     * The default value is `AnnotationMode.ENABLE_FORMS`.
     */
    annotationMode?: number | undefined;
    annotationLayerFactory: IPDFAnnotationLayerFactory;
    xfaLayerFactory: IPDFXfaLayerFactory;
    structTreeLayerFactory: IPDFStructTreeLayerFactory;
    textHighlighterFactory?: Object | undefined;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    /**
     * - 'canvas' or 'svg'. The default is 'canvas'.
     */
    renderer: string;
    /**
     * - Enables CSS only zooming. The default
     * value is `false`.
     */
    useOnlyCssZoom?: boolean | undefined;
    /**
     * - The maximum supported canvas size in
     * total pixels, i.e. width * height. Use -1 for no limit. The default value
     * is 4096 * 4096 (16 mega-pixels).
     */
    maxCanvasPixels?: number | undefined;
    /**
     * - Overwrites background and foreground colors
     * with user defined ones in order to improve readability in high contrast
     * mode.
     */
    pageColors?: Object | undefined;
    /**
     * - Localization service.
     */
    l10n: IL10n;
};
/**
 * @implements {IRenderableView}
 */
export class PDFPageView implements IRenderableView {
    /**
     * @param {PDFPageViewOptions} options
     */
    constructor(options: PDFPageViewOptions);
    id: number;
    renderingId: string;
    pdfPage: any;
    pageLabel: string | null;
    rotation: number;
    scale: number;
    viewport: import("../src/display/display_utils").PageViewport;
    pdfPageRotate: number;
    _optionalContentConfigPromise: Promise<import("../src/display/optional_content_config").OptionalContentConfig> | null;
    hasRestrictedScaling: boolean;
    textLayerMode: number;
    imageResourcesPath: string;
    useOnlyCssZoom: boolean;
    maxCanvasPixels: any;
    pageColors: Object | null;
    eventBus: import("./event_utils").EventBus;
    renderingQueue: import("./pdf_rendering_queue").PDFRenderingQueue;
    textLayerFactory: import("./interfaces").IPDFTextLayerFactory;
    annotationLayerFactory: import("./interfaces").IPDFAnnotationLayerFactory;
    xfaLayerFactory: import("./interfaces").IL10n;
    textHighlighter: any;
    structTreeLayerFactory: import("./interfaces").IPDFStructTreeLayerFactory;
    renderer: string;
    l10n: import("./interfaces").IL10n;
    paintTask: {
        promise: any;
        onRenderContinue(cont: any): void;
        cancel(): void;
    } | null;
    paintedViewportMap: WeakMap<object, any>;
    renderingState: number;
    resume: (() => void) | null;
    _renderError: any;
    _isStandalone: boolean;
    _annotationCanvasMap: any;
    annotationLayer: any;
    textLayer: import("./text_layer_builder.js").TextLayerBuilder | null;
    zoomLayer: ParentNode | null;
    xfaLayer: any;
    structTreeLayer: any;
    div: HTMLDivElement;
    setPdfPage(pdfPage: any): void;
    destroy(): void;
    /**
     * @private
     */
    private _renderAnnotationLayer;
    /**
     * @private
     */
    private _renderXfaLayer;
    _buildXfaTextContentItems(textDivs: any): Promise<void>;
    /**
     * @private
     */
    private _resetZoomLayer;
    reset({ keepZoomLayer, keepAnnotationLayer, keepXfaLayer, }?: {
        keepZoomLayer?: boolean | undefined;
        keepAnnotationLayer?: boolean | undefined;
        keepXfaLayer?: boolean | undefined;
    }): void;
    loadingIconDiv: HTMLDivElement | undefined;
    update({ scale, rotation, optionalContentConfigPromise }: {
        scale?: number | undefined;
        rotation?: null | undefined;
        optionalContentConfigPromise?: null | undefined;
    }): void;
    /**
     * PLEASE NOTE: Most likely you want to use the `this.reset()` method,
     *              rather than calling this one directly.
     */
    cancelRendering({ keepAnnotationLayer, keepXfaLayer }?: {
        keepAnnotationLayer?: boolean | undefined;
        keepXfaLayer?: boolean | undefined;
    }): void;
    _onTextLayerRendered: any;
    cssTransform({ target, redrawAnnotationLayer, redrawXfaLayer, }: {
        target: any;
        redrawAnnotationLayer?: boolean | undefined;
        redrawXfaLayer?: boolean | undefined;
    }): void;
    get width(): number;
    get height(): number;
    getPagePoint(x: any, y: any): Object;
    /**
     * @ignore
     */
    toggleLoadingIconSpinner(viewVisible?: boolean): void;
    draw(): any;
    paintOnCanvas(canvasWrapper: any): {
        promise: any;
        onRenderContinue(cont: any): void;
        cancel(): void;
    };
    canvas: HTMLCanvasElement | undefined;
    outputScale: OutputScale | undefined;
    paintOnSvg(wrapper: any): {
        promise: any;
        onRenderContinue(cont: any): void;
        cancel(): void;
    };
    svg: any;
    /**
     * @param {string|null} label
     */
    setPageLabel(label: string | null): void;
    #private;
}
import { OutputScale } from "./ui_utils.js";
