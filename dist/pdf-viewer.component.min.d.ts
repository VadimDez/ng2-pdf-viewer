/**
 * Created by vadimdez on 18/07/16.
 */
import { ElementRef } from '@angular/core';
export declare class PdfViewerComponent {
  originalSize: boolean;
  src: any;
  page: number;
  zoom: number;
  showAll: boolean;
  onLoadComplete: Function;
  private element;
  private _src;
  private _pdf;
  private _page;
  private _zoom;
  private _showAll;
  constructor(element: ElementRef);
  private fn();
  private isValidPageNumber(page);
  private renderPage(page);
  private renderMultiplePages();
  private isValidPageNumber();
}