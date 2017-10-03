/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges, OnInit
} from '@angular/core';
import * as pdfjs from 'pdfjs-dist/build/pdf';
window['pdfjs-dist/build/pdf'] = pdfjs;
import 'pdfjs-dist/web/compatibility';
import 'pdfjs-dist/web/pdf_viewer';

PDFJS.verbosity = (<any>PDFJS).VERBOSITY_LEVELS.errors;

@Component({
  selector: 'pdf-viewer',
  template: `<div class="ng2-pdf-viewer-container" (window:resize)="onPageResize()"><div class="pdfViewer"></div></div>`,
  styles: [
`
.ng2-pdf-viewer-container {
    overflow-x: auto;
}
:host /deep/ .textLayer {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0.2;
  line-height: 1.0;
}

:host /deep/ .textLayer > div {
  color: transparent;
  position: absolute;
  white-space: pre;
  cursor: text;
  -webkit-transform-origin: 0% 0%;
  -moz-transform-origin: 0% 0%;
  -o-transform-origin: 0% 0%;
  -ms-transform-origin: 0% 0%;
  transform-origin: 0% 0%;
}

:host /deep/ .textLayer .highlight {
  margin: -1px;
  padding: 1px;

  background-color: #002bff;
  border-radius: 4px;
}

:host /deep/ .textLayer .highlight.begin {
  border-radius: 4px 0px 0px 4px;
}

:host /deep/ .textLayer .highlight.end {
  border-radius: 0px 4px 4px 0px;
}

:host /deep/ .textLayer .highlight.middle {
  border-radius: 0px;
}

:host /deep/ .textLayer .highlight.selected {
  background-color: rgb(0, 100, 0);
}

:host /deep/ .textLayer ::selection { background: #002bff; }
:host /deep/ .textLayer ::-moz-selection { background: #002bff; }

:host /deep/ .textLayer .endOfContent {
  display: block;
  position: absolute;
  left: 0px;
  top: 100%;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  cursor: default;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
}

:host /deep/ .textLayer .endOfContent.active {
  top: 0px;
}


:host /deep/ .annotationLayer section {
  position: absolute;
}

:host /deep/ .annotationLayer .linkAnnotation > a {
  position: absolute;
  font-size: 1em;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

:host /deep/ .annotationLayer .linkAnnotation > a /* -ms-a */  {
  background: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") 0 0 repeat;
}

:host /deep/ .annotationLayer .linkAnnotation > a:hover {
  opacity: 0.2;
  background: #002bff;
  box-shadow: 0px 2px 10px #002bff;
}

:host /deep/ .annotationLayer .textAnnotation img {
  position: absolute;
  cursor: pointer;
}

:host /deep/ .annotationLayer .textWidgetAnnotation input,
:host /deep/ .annotationLayer .textWidgetAnnotation textarea,
:host /deep/ .annotationLayer .choiceWidgetAnnotation select,
:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input,
:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input {
  background-color: #002bff;
  border: 1px solid transparent;
  box-sizing: border-box;
  font-size: 9px;
  height: 100%;
  padding: 0 3px;
  vertical-align: top;
  width: 100%;
}

:host /deep/ .annotationLayer .textWidgetAnnotation textarea {
  font: message-box;
  font-size: 9px;
  resize: none;
}

:host /deep/ .annotationLayer .textWidgetAnnotation input[disabled],
:host /deep/ .annotationLayer .textWidgetAnnotation textarea[disabled],
:host /deep/ .annotationLayer .choiceWidgetAnnotation select[disabled],
:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input[disabled],
:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input[disabled] {
  background: none;
  border: 1px solid transparent;
  cursor: not-allowed;
}

:host /deep/ .annotationLayer .textWidgetAnnotation input:hover,
:host /deep/ .annotationLayer .textWidgetAnnotation textarea:hover,
:host /deep/ .annotationLayer .choiceWidgetAnnotation select:hover,
:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input:hover,
:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input:hover {
  border: 1px solid #000;
}

:host /deep/ .annotationLayer .textWidgetAnnotation input:focus,
:host /deep/ .annotationLayer .textWidgetAnnotation textarea:focus,
:host /deep/ .annotationLayer .choiceWidgetAnnotation select:focus {
  background: none;
  border: 1px solid transparent;
}

:host /deep/ .annotationLayer .textWidgetAnnotation input.comb {
  font-family: monospace;
  padding-left: 2px;
  padding-right: 0;
}

:host /deep/ .annotationLayer .textWidgetAnnotation input.comb:focus {
  width: 115%;
}

:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input,
:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
}

:host /deep/ .annotationLayer .popupWrapper {
  position: absolute;
  width: 20em;
}

:host /deep/ .annotationLayer .popup {
  position: absolute;
  z-index: 200;
  max-width: 20em;
  background-color: #FFFF99;
  box-shadow: 0px 2px 5px #333;
  border-radius: 2px;
  padding: 0.6em;
  margin-left: 5px;
  cursor: pointer;
  word-wrap: break-word;
}

:host /deep/ .annotationLayer .popup h1 {
  font-size: 1em;
  border-bottom: 1px solid #000000;
  padding-bottom: 0.2em;
}

:host /deep/ .annotationLayer .popup p {
  padding-top: 0.2em;
}

:host /deep/ .annotationLayer .highlightAnnotation,
:host /deep/ .annotationLayer .underlineAnnotation,
:host /deep/ .annotationLayer .squigglyAnnotation,
:host /deep/ .annotationLayer .strikeoutAnnotation,
:host /deep/ .annotationLayer .fileAttachmentAnnotation {
  cursor: pointer;
}

:host /deep/ .pdfViewer .canvasWrapper {
  overflow: hidden;
}

:host /deep/ .pdfViewer .page {
  direction: ltr;
  width: 816px;
  height: 1056px;
  margin: 1px auto -8px auto;
  position: relative;
  overflow: visible;
  border: 9px solid transparent;
  background-clip: content-box;
  border-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAA6UlEQVR4Xl2Pi2rEMAwE16fm1f7/r14v7w4rI0IzLAF7hLxNevBSEMEF5+OilNCsRd8ZMyn+a4NmsOT8WJw1lFbSYgGFzF2bLFoLjTClWjKKGRWpDYAGXUnZ4uhbBUzF3Oe/GG/ue2fn4GgsyXhNgysV2JnrhKEMg4fEZcALmiKbNhBBRFpSyDOj1G4QOVly6O1FV54ZZq8OVygrciDt6JazRgi1ljTPH0gbrPmHPXAbCiDd4GawIjip1TPh9tt2sz24qaCjr/jAb/GBFTbq9KZ7Ke/Cqt8nayUikZKsWZK7Fe6bg5dOUt8fZHWG2BHc+6EAAAAASUVORK5CYII=') 9 9 repeat;
  background-color: white;
}

:host /deep/ .pdfViewer.removePageBorders .page {
  margin: 0px auto 10px auto;
  border: none;
}

:host /deep/ .pdfViewer.singlePageView {
  display: inline-block;
}

:host /deep/ .pdfViewer.singlePageView .page {
  margin: 0;
  border: none;
}

:host /deep/ .pdfViewer .page canvas {
  margin: 0;
  display: block;
}

:host /deep/ .pdfViewer .page .loadingIcon {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/gif;base64,R0lGODlhGAAYAPQAAP///wAAAM7Ozvr6+uDg4LCwsOjo6I6OjsjIyJycnNjY2KioqMDAwPLy8nZ2doaGhri4uGhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJBwAAACwAAAAAGAAYAAAFriAgjiQAQWVaDgr5POSgkoTDjFE0NoQ8iw8HQZQTDQjDn4jhSABhAAOhoTqSDg7qSUQwxEaEwwFhXHhHgzOA1xshxAnfTzotGRaHglJqkJcaVEqCgyoCBQkJBQKDDXQGDYaIioyOgYSXA36XIgYMBWRzXZoKBQUMmil0lgalLSIClgBpO0g+s26nUWddXyoEDIsACq5SsTMMDIECwUdJPw0Mzsu0qHYkw72bBmozIQAh+QQJBwAAACwAAAAAGAAYAAAFsCAgjiTAMGVaDgR5HKQwqKNxIKPjjFCk0KNXC6ATKSI7oAhxWIhezwhENTCQEoeGCdWIPEgzESGxEIgGBWstEW4QCGGAIJEoxGmGt5ZkgCRQQHkGd2CESoeIIwoMBQUMP4cNeQQGDYuNj4iSb5WJnmeGng0CDGaBlIQEJziHk3sABidDAHBgagButSKvAAoyuHuUYHgCkAZqebw0AgLBQyyzNKO3byNuoSS8x8OfwIchACH5BAkHAAAALAAAAAAYABgAAAW4ICCOJIAgZVoOBJkkpDKoo5EI43GMjNPSokXCINKJCI4HcCRIQEQvqIOhGhBHhUTDhGo4diOZyFAoKEQDxra2mAEgjghOpCgz3LTBIxJ5kgwMBShACREHZ1V4Kg1rS44pBAgMDAg/Sw0GBAQGDZGTlY+YmpyPpSQDiqYiDQoCliqZBqkGAgKIS5kEjQ21VwCyp76dBHiNvz+MR74AqSOdVwbQuo+abppo10ssjdkAnc0rf8vgl8YqIQAh+QQJBwAAACwAAAAAGAAYAAAFrCAgjiQgCGVaDgZZFCQxqKNRKGOSjMjR0qLXTyciHA7AkaLACMIAiwOC1iAxCrMToHHYjWQiA4NBEA0Q1RpWxHg4cMXxNDk4OBxNUkPAQAEXDgllKgMzQA1pSYopBgonCj9JEA8REQ8QjY+RQJOVl4ugoYssBJuMpYYjDQSliwasiQOwNakALKqsqbWvIohFm7V6rQAGP6+JQLlFg7KDQLKJrLjBKbvAor3IKiEAIfkECQcAAAAsAAAAABgAGAAABbUgII4koChlmhokw5DEoI4NQ4xFMQoJO4uuhignMiQWvxGBIQC+AJBEUyUcIRiyE6CR0CllW4HABxBURTUw4nC4FcWo5CDBRpQaCoF7VjgsyCUDYDMNZ0mHdwYEBAaGMwwHDg4HDA2KjI4qkJKUiJ6faJkiA4qAKQkRB3E0i6YpAw8RERAjA4tnBoMApCMQDhFTuySKoSKMJAq6rD4GzASiJYtgi6PUcs9Kew0xh7rNJMqIhYchACH5BAkHAAAALAAAAAAYABgAAAW0ICCOJEAQZZo2JIKQxqCOjWCMDDMqxT2LAgELkBMZCoXfyCBQiFwiRsGpku0EshNgUNAtrYPT0GQVNRBWwSKBMp98P24iISgNDAS4ipGA6JUpA2WAhDR4eWM/CAkHBwkIDYcGiTOLjY+FmZkNlCN3eUoLDmwlDW+AAwcODl5bYl8wCVYMDw5UWzBtnAANEQ8kBIM0oAAGPgcREIQnVloAChEOqARjzgAQEbczg8YkWJq8nSUhACH5BAkHAAAALAAAAAAYABgAAAWtICCOJGAYZZoOpKKQqDoORDMKwkgwtiwSBBYAJ2owGL5RgxBziQQMgkwoMkhNqAEDARPSaiMDFdDIiRSFQowMXE8Z6RdpYHWnEAWGPVkajPmARVZMPUkCBQkJBQINgwaFPoeJi4GVlQ2Qc3VJBQcLV0ptfAMJBwdcIl+FYjALQgimoGNWIhAQZA4HXSpLMQ8PIgkOSHxAQhERPw7ASTSFyCMMDqBTJL8tf3y2fCEAIfkECQcAAAAsAAAAABgAGAAABa8gII4k0DRlmg6kYZCoOg5EDBDEaAi2jLO3nEkgkMEIL4BLpBAkVy3hCTAQKGAznM0AFNFGBAbj2cA9jQixcGZAGgECBu/9HnTp+FGjjezJFAwFBQwKe2Z+KoCChHmNjVMqA21nKQwJEJRlbnUFCQlFXlpeCWcGBUACCwlrdw8RKGImBwktdyMQEQciB7oACwcIeA4RVwAODiIGvHQKERAjxyMIB5QlVSTLYLZ0sW8hACH5BAkHAAAALAAAAAAYABgAAAW0ICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi+AS2SoyXrK4umWPM5wNiV0UDUIBNkdoepTfMkA7thIECiyRtUAGq8fm2O4jIBgMBA1eAZ6Knx+gHaJR4QwdCMKBxEJRggFDGgQEREPjjAMBQUKIwIRDhBDC2QNDDEKoEkDoiMHDigICGkJBS2dDA6TAAnAEAkCdQ8ORQcHTAkLcQQODLPMIgIJaCWxJMIkPIoAt3EhACH5BAkHAAAALAAAAAAYABgAAAWtICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi+AS2SoyXrK4umWHM5wNiV0UN3xdLiqr+mENcWpM9TIbrsBkEck8oC0DQqBQGGIz+t3eXtob0ZTPgNrIwQJDgtGAgwCWSIMDg4HiiUIDAxFAAoODwxDBWINCEGdSTQkCQcoegADBaQ6MggHjwAFBZUFCm0HB0kJCUy9bAYHCCPGIwqmRq0jySMGmj6yRiEAIfkECQcAAAAsAAAAABgAGAAABbIgII4k0DRlmg6kYZCsOg4EKhLE2BCxDOAxnIiW84l2L4BLZKipBopW8XRLDkeCiAMyMvQAA+uON4JEIo+vqukkKQ6RhLHplVGN+LyKcXA4Dgx5DWwGDXx+gIKENnqNdzIDaiMECwcFRgQCCowiCAcHCZIlCgICVgSfCEMMnA0CXaU2YSQFoQAKUQMMqjoyAglcAAyBAAIMRUYLCUkFlybDeAYJryLNk6xGNCTQXY0juHghACH5BAkHAAAALAAAAAAYABgAAAWzICCOJNA0ZVoOAmkY5KCSSgSNBDE2hDyLjohClBMNij8RJHIQvZwEVOpIekRQJyJs5AMoHA+GMbE1lnm9EcPhOHRnhpwUl3AsknHDm5RN+v8qCAkHBwkIfw1xBAYNgoSGiIqMgJQifZUjBhAJYj95ewIJCQV7KYpzBAkLLQADCHOtOpY5PgNlAAykAEUsQ1wzCgWdCIdeArczBQVbDJ0NAqyeBb64nQAGArBTt8R8mLuyPyEAOwAAAAAAAAAAAA==') center no-repeat;
}
`
  ]
})

export class PdfViewerComponent implements OnChanges, OnInit {
  private static CSS_UNITS: number = 96.0 / 72.0;

  private _renderText: boolean = true;
  private _stickToPage: boolean = false;
  private _originalSize: boolean = true;
  private _pdf: PDFDocumentProxy;
  private _page: number = 1;
  private _zoom: number = 1;
  private _rotation: number = 0;
  private _showAll: boolean = true;

  private _externalLinkTarget: string = 'blank';
  private _pdfViewer: any;
  private _pdfLinkService: any;
  private lastLoaded: string | Uint8Array | PDFSource;
  private resizeTimeout: NodeJS.Timer;

  @Output('after-load-complete') afterLoadComplete = new EventEmitter<PDFDocumentProxy>();
  @Output('error') onError = new EventEmitter<any>();
  @Output('on-progress') onProgress = new EventEmitter<PDFProgressData>();

  constructor(private element: ElementRef) {
    PDFJS.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ (PDFJS as any).version }/pdf.worker.min.js`;
  }

  ngOnInit() {
    this.setupViewer();
  }

  public onPageResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.updateSize();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('src' in changes) {
      this.loadPDF();
    } else if (this._pdf) {
      if ('renderText' in changes) {
        this.setupViewer();
      }
      this.update();
    }
  }

  @Input()
  src: string | Uint8Array | PDFSource;

  @Input('page')
  set page(_page) {
    _page = parseInt(_page, 10);

    if (this._pdf && !this.isValidPageNumber(_page)) {
      _page = 1;
    }

    this._page = _page;
    this.pageChange.emit(_page);
  }

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true);

  @Input('render-text')
  set renderText(renderText: boolean) {
    this._renderText = renderText;
  }

  @Input('original-size')
  set originalSize(originalSize: boolean) {
    this._originalSize = originalSize;
  }

  @Input('show-all')
  set showAll(value: boolean) {
    this._showAll = value;
  }

  @Input('stick-to-page')
  set stickToPage(value: boolean) {
    this._stickToPage = value;
  }

  @Input('zoom')
  set zoom(value: number) {
    if (value <= 0) {
      return;
    }

    this._zoom = value;
  }

  get zoom() {
    return this._zoom;
  }

  @Input('rotation')
  set rotation(value: number) {
    if (!(typeof value === 'number' && value % 90 === 0)) {
      console.warn('Invalid pages rotation angle.');
      return;
    }

    this._rotation = value;
  }

  @Input('external-link-target')
  set externalLinkTarget(value: string) {
    this._externalLinkTarget = value;
  }

  public setupViewer() {
    (<any>PDFJS).disableTextLayer = !this._renderText;

    this.setExternalLinkTarget(this._externalLinkTarget);

    this._pdfLinkService = new (<any>PDFJS).PDFLinkService();

    const pdfOptions: PDFViewerParams | any = {
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: true,
      linkService: this._pdfLinkService
    };

    this._pdfViewer = new PDFJS.PDFViewer(pdfOptions);
    this._pdfLinkService.setViewer(this._pdfViewer);
  }

  public updateSize() {
    if (!this._showAll) {
      this.renderPage(this._page);
      return;
    }

    if (!this._originalSize) {
      const offsetWidth = this.element.nativeElement.offsetWidth;
      this._pdf.getPage(this._pdfViewer.currentPageNumber).then((page: PDFPageProxy) => {
        const scale = this._zoom * (offsetWidth / page.getViewport(1).width) / PdfViewerComponent.CSS_UNITS;
        this._pdfViewer._setScale(scale, !this._stickToPage);
      });
    } else {
      this._pdfViewer._setScale(this._zoom, true);
    }
  }

  private isValidPageNumber(page: number): boolean {
    return this._pdf.numPages >= page && page >= 1;
  }

  private setExternalLinkTarget(type: string) {
    switch (type) {
      case 'blank':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.BLANK;
        break;
      case 'none':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.NONE;
        break;
      case 'self':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.SELF;
        break;
      case 'parent':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.PARENT;
        break;
      case 'top':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.TOP;
        break;
    }
  }

  private loadPDF() {
    if (!this.src) {
      return;
    }

    if (this.lastLoaded === this.src) {
      this.update();
      return;
    }

    let loadingTask: any = PDFJS.getDocument(this.src);

    loadingTask.onProgress = (progressData: PDFProgressData) => {
      this.onProgress.emit(progressData);
    };

    const src = this.src;
    (<PDFPromise<PDFDocumentProxy>>loadingTask.promise)
      .then((pdf: PDFDocumentProxy) => {
        this._pdf = pdf;
        this.lastLoaded = src;

        this.afterLoadComplete.emit(pdf);

        this.update();
      }, (error: any) => {
        this.onError.emit(error);
      });
  }

  private update() {
    if (this._showAll) {
      this.setupViewer();

      if (this._pdfViewer) {
        this._pdfViewer.setDocument(this._pdf);
      }
    }

    if (this._pdfLinkService) {
      this._pdfLinkService.setDocument(this._pdf, null);
    }

    this.page = this._page;

    this.render();
  }

  private render() {
    if (!this._showAll) {
      this.renderPage(this._page);
    } else {
      this.renderMultiplePages();
    }
  }

  private renderMultiplePages() {
    if (!this.isValidPageNumber(this._page)) {
      this._page = 1;
    }

    if (this._rotation !== 0 || this._pdfViewer.pagesRotation !== this._rotation) {
      setTimeout(() => {
        this._pdfViewer.pagesRotation = this._rotation;
      });
    }

    if (this._stickToPage) {
      setTimeout(() => {
        this._pdfViewer.currentPageNumber = this._page;
      });
    }

    this.updateSize();
  }

  private renderPage(pageNumber: number) {
    this._pdf.getPage(pageNumber).then( (page: PDFPageProxy) => {
      let viewport = page.getViewport(this._zoom, this._rotation);
      let container = this.element.nativeElement.querySelector('.pdfViewer');

      if (!this._originalSize) {
        viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width, this._rotation);
      }

      const offsetWidth = this.element.nativeElement.offsetWidth;
      const scale = this._zoom * (offsetWidth / page.getViewport(1).width) / PdfViewerComponent.CSS_UNITS;

      this.removeAllChildNodes(container);

      (<any>PDFJS).disableTextLayer = !this._renderText;

      this.setExternalLinkTarget(this._externalLinkTarget);

      this._pdfLinkService = new (<any>PDFJS).PDFLinkService();

      let pdfOptions: PDFViewerParams | any = {
        container: container,
        removePageBorders: true,
        linkService: this._pdfLinkService,
        defaultViewport: viewport,
        scale,
        id: this._page,
        textLayerFactory: new (<any>PDFJS).DefaultTextLayerFactory(),
        annotationLayerFactory: new (<any>PDFJS).DefaultAnnotationLayerFactory()
      };

      let pdfPageView = new (<any>PDFJS).PDFPageView(pdfOptions);
      this._pdfLinkService.setViewer(pdfPageView);

      if (this._rotation !== 0 || pdfPageView.rotation !== this._rotation) {
        pdfPageView.rotation = this._rotation;
      }

      pdfPageView.setPdfPage(page);
      return pdfPageView.draw();
    });
  }

  private removeAllChildNodes(element: HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
