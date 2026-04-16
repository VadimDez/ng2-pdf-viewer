/**
 * Created by vadimdez on 21/06/16.
 */
import { Component, HostListener, OnInit, signal, viewChild } from '@angular/core';
import {
  PDFDocumentProxy,
  PDFProgressData,
  PDFSource,
  ZoomScale
} from './pdf-viewer/typings';

import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'pdf-viewer-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    FormsModule,
    JsonPipe,
    PdfViewerComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class AppComponent implements OnInit {
  pdfSrc = signal<string | Uint8Array | PDFSource>('./assets/pdf-test.pdf');

  error = signal<any>(null);
  page = signal(1);
  rotation = signal(0);
  zoom = signal(1.0);
  zoomScale = signal<ZoomScale>('page-width');
  originalSize = signal(false);
  pdf: any;
  renderText = signal(true);
  progressData = signal<PDFProgressData | undefined>(undefined);
  isLoaded = signal(false);
  stickToPage = signal(false);
  showAll = signal(true);
  autoresize = signal(true);
  fitToPage = signal(false);
  outline = signal<any[]>([]);
  isOutlineShown = signal(false);
  pdfQuery = signal('');
  mobile = signal(false);

  private readonly pdfComponent = viewChild.required(PdfViewerComponent);

  ngOnInit() {
    if (window.screen.width <= 768) {
      this.mobile.set(true);
    }
  }

  // Load pdf
  loadPdf() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/pdf-test.pdf', true);
    xhr.responseType = 'blob';

    xhr.onload = (e: any) => {
      console.log(xhr);
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: 'application/pdf' });
        this.pdfSrc.set(URL.createObjectURL(blob));
      }
    };

    xhr.send();
  }

  /**
   * Set custom path to pdf worker
   */
  setCustomWorkerPath() {
    (window as any).pdfWorkerSrc = '/lib/pdfjs-dist/build/pdf.worker.js';
  }

  incrementPage(amount: number) {
    this.page.update(p => p + amount);
  }

  incrementZoom(amount: number) {
    this.zoom.update(z => z + amount);
  }

  rotate(angle: number) {
    this.rotation.update(r => r + angle);
  }

  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    const $pdf: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc.set(e.target.result);
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }

  /**
   * Get pdf information after it's loaded
   * @param pdf pdf document proxy
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;

    this.loadOutline();
  }

  /**
   * Get outline
   */
  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline.set(outline);
    });
  }

  /**
   * Handle error callback
   *
   * @param error error message
   */
  onError(error: any) {
    this.error.set(error);

    if (error.name === 'PasswordException') {
      const password = prompt(
        'This document is password protected. Enter the password:'
      );

      if (password) {
        this.error.set(null);
        this.setPassword(password);
      }
    }
  }

  setPassword(password: string) {
    const current = this.pdfSrc();
    let newSrc: PDFSource;

    if (current instanceof ArrayBuffer) {
      newSrc = { data: current as any };
    } else if (typeof current === 'string') {
      newSrc = { url: current };
    } else {
      newSrc = { ...current };
    }

    newSrc.password = password;

    this.pdfSrc.set(newSrc);
  }

  /**
   * Pdf loading progress callback
   * @param progressData pdf progress data
   */
  onProgress(progressData: PDFProgressData) {
    console.log(progressData);
    this.progressData.set(progressData);

    this.isLoaded.set(progressData.loaded >= progressData.total);
    this.error.set(null);
  }

  getInt(value: number): number {
    return Math.round(value);
  }

  /**
   * Navigate to destination
   * @param destination pdf navigate to
   */
  navigateTo(destination: any) {
    this.pdfComponent().pdfLinkService.goToDestination(destination);
  }

  /**
   * Scroll view
   */
  scrollToPage() {
    this.pdfComponent().pdfViewer.scrollPageIntoView({
      pageNumber: 3
    });
  }

  /**
   * Page rendered callback, which is called when a page is rendered (called multiple times)
   *
   * @param e custom event
   */
  pageRendered(e: CustomEvent) {
    console.log('(page-rendered)', e);
  }

  /**
   * Page initialized callback.
   *
   * @param {CustomEvent} e
   */
  pageInitialized(e: CustomEvent) {
    console.log('(page-initialized)', e);
  }

  /**
   * Page change callback, which is called when a page is changed (called multiple times)
   *
   * @param e number
   */
  pageChange(e: number) {
    console.log('(page-change)', e);
  }

  searchQueryChanged(newQuery: string) {
    const type = newQuery !== this.pdfQuery() ? '' : 'again';
    this.pdfQuery.set(newQuery);

    this.pdfComponent().eventBus.dispatch('find', {
      type,
      query: this.pdfQuery(),
      highlightAll: true,
      caseSensitive: false,
      phraseSearch: true,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.mobile.set((event.target as Window).innerWidth <= 768);
  }
}
