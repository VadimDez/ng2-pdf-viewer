export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type StructTreeLayerBuilderOptions = {
    pdfPage: PDFPageProxy;
};
/**
 * @typedef {Object} StructTreeLayerBuilderOptions
 * @property {PDFPageProxy} pdfPage
 */
export class StructTreeLayerBuilder {
    /**
     * @param {StructTreeLayerBuilderOptions} options
     */
    constructor({ pdfPage }: StructTreeLayerBuilderOptions);
    pdfPage: import("../src/display/api").PDFPageProxy;
    render(structTree: any): HTMLSpanElement | null;
    _setAttributes(structElement: any, htmlElement: any): void;
    _walk(node: any): HTMLSpanElement | null;
}
