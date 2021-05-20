export type PDFPageProxy = import('pdfjs-dist/types/display/api').PDFPageProxy;
export type PDFSource = import('pdfjs-dist/types/display/api').DocumentInitParameters;
export type PDFDocumentProxy = import('pdfjs-dist/types/display/api').PDFDocumentProxy;
export type PDFDocumentLoadingTask = import('pdfjs-dist/types/display/api').PDFDocumentLoadingTask;

export interface PDFProgressData {
  loaded: number;
  total: number;
}
