/**
 * Created by vadimdez on 21/06/16.
 */
import { Component, ViewChild } from '@angular/core';
import { PDFProgressData, PDFDocumentProxy, PDFSource } from './pdf-viewer/pdf-viewer.module';

import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

@Component({
  moduleId: module.id,
  selector: 'pdf-viewer-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  pdfSrc: string | PDFSource | ArrayBuffer = './assets/pdf-test.pdf';

  // or pass options as object
  // pdfSrc: any = {
  //   url: './assets/pdf-test.pdf',
  //   withCredentials: true,
  //// httpHeaders: { // cross domain
  ////   'Access-Control-Allow-Credentials': true
  //// }
  // };

  error: any;
  page: number = 1;
  rotation: number = 0;
  zoom: number = 1.0;
  originalSize: boolean = false;
  pdf: any;
  renderText: boolean = true;
  progressData: PDFProgressData;
  isLoaded: boolean = false;
  stickToPage = false;
  showAll: boolean = true;
  autoresize: boolean = true;
  fitToPage: boolean = false;
  outline: any[];
  isOutlineShown: boolean = false;

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  constructor() {
    // Load pdf
    // let xhr = new XMLHttpRequest();
    // xhr.open('GET', 'http://localhost:8000/pdf-test.pdf', true);
    // xhr.responseType = 'blob';
    //
    // xhr.onload = (e: any) => {
    //   console.log(xhr);
    //   if (xhr.status === 200) {
    //     let blob = new Blob([xhr.response], {type: 'application/pdf'});
    //     this.pdfSrc = URL.createObjectURL(blob);
    //   }
    // };
    //
    // xhr.send();
  }

  /**
   * Set custom path to pdf worker
   */
  setCustomWorkerPath() {
    (<any>window).pdfWorkerSrc = '/lib/pdfjs-dist/build/pdf.worker.js';
  }

  incrementPage(amount: number) {
    this.page += amount;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  rotate(angle: number) {
    this.rotation += angle;
  }

  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    let $pdf: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }

  /**
   * Get pdf information after it's loaded
   * @param pdf
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isLoaded = true;

    this.loadOutline();
  }

  /**
   * Get outline
   */
  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  /**
   * Handle error callback
   *
   * @param error
   */
  onError(error: any) {
    this.error = error; // set error

    if (error.name === 'PasswordException') {
      const password = prompt('This document is password protected. Enter the password:');

      if (password) {
        this.error = null;
        this.setPassword(password);
      }
    }
  }

  setPassword(password: string) {
    let newSrc;

    if (this.pdfSrc instanceof ArrayBuffer) {
      newSrc = { data: this.pdfSrc };
    } else if (typeof this.pdfSrc === 'string') {
      newSrc = { url: this.pdfSrc };
    } else {
      newSrc = { ...this.pdfSrc };
    }

    newSrc.password = password;

    this.pdfSrc = newSrc;
  }

  /**
   * Pdf loading progress callback
   * @param {PDFProgressData} progressData
   */
  onProgress(progressData: PDFProgressData) {
    console.log(progressData);
    this.progressData = progressData;
    this.isLoaded = false;
    this.error = null; // clear error
  }

  getInt(value: number): number {
    return Math.round(value);
  }

  /**
   * Navigate to destination
   * @param destination
   */
  navigateTo(destination: any) {
    this.pdfComponent.pdfLinkService.navigateTo(destination);
  }

  /**
   * Scroll view
   */
  scrollToPage() {
    this.pdfComponent.pdfViewer.scrollPageIntoView({
      pageNumber: 3
    });
  }

  /**
   * Page rendered callback, which is called when a page is rendered (called multiple times)
   *
   * @param {CustomEvent} e
   */
  pageRendered(e: CustomEvent) {
    console.log('(page-rendered)', e);
  }
}
