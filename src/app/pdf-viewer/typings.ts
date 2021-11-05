export type PDFPageProxy = import('pdfjs-dist/types/src/display/api').PDFPageProxy;
export type PDFSource = import('pdfjs-dist/types/src/display/api').DocumentInitParameters;
export type PDFDocumentProxy = import('pdfjs-dist/types/src/display/api').PDFDocumentProxy;
export type PDFDocumentLoadingTask = import('pdfjs-dist/types/src/display/api').PDFDocumentLoadingTask;
export type PDFViewerOptions = import('pdfjs-dist/types/web/base_viewer').PDFViewerOptions;

export interface PDFProgressData {
  loaded: number;
  total: number;
}
