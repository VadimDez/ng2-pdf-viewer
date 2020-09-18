import { TemplatePortal } from '@angular/cdk/portal'
/**
 * Created by vadimdez on 21/06/16.
 */
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import {
  PDFDocumentProxy,
  PDFPageProxy,
  PDFProgressData,
  PDFPromise,
  PDFSource,
  PDFViewerParams,
} from 'pdfjs-dist'
import { createEventBus } from '../utils/event-bus-utils'
import { getPosition } from '../utils/get-position'

let PDFJS: any
let PDFJSViewer: any

function isSSR() {
  return typeof window === 'undefined'
}

if (!isSSR()) {
  PDFJS = require('pdfjs-dist/build/pdf')
  PDFJSViewer = require('pdfjs-dist/web/pdf_viewer')

  PDFJS.verbosity = PDFJS.VerbosityLevel.ERRORS
}

export enum RenderTextMode {
  DISABLED,
  ENABLED,
  ENHANCED,
}

export interface Annotation {
  id: string
  index: number
  positionX: number
  positionY: number
}

export interface Coordinates {
  positionX: number
  positionY: number
}

export interface TextSelection {
  positionX: number
  positionY: number
  text: string
}

@Component({
  selector: 'pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent
  implements OnChanges, OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  @ViewChild('pdfViewerContainer') pdfViewerContainer: any
  private isVisible: boolean = false

  @ViewChild('annotationCardTemplate', { static: false })
  annotationCardTemplate: TemplateRef<any>

  static CSS_UNITS: number = 96.0 / 72.0
  static BORDER_WIDTH: number = 9

  private pdfMultiPageViewer: any
  private pdfMultiPageLinkService: any
  private pdfMultiPageFindController: any

  private pdfSinglePageViewer: any
  private pdfSinglePageLinkService: any
  private pdfSinglePageFindController: any

  private _cMapsUrl =
    typeof PDFJS !== 'undefined'
      ? `https://unpkg.com/pdfjs-dist@${(PDFJS as any).version}/cmaps/`
      : null
  private _renderText = true
  private _renderTextMode: RenderTextMode = RenderTextMode.ENABLED
  private _stickToPage = true
  private _originalSize = true
  private _pdf: PDFDocumentProxy | null
  private _page = 1
  private _zoom = 1
  private _zoomScale: 'page-height' | 'page-fit' | 'page-width' = 'page-width'
  private _rotation = 0
  private _showAll = true
  private _canAutoResize = true
  private _fitToPage = false
  private _externalLinkTarget = 'blank'
  private _showBorders = false
  private lastLoaded: string | Uint8Array | PDFSource
  private _latestScrolledPage: number

  private resizeTimeout: NodeJS.Timer
  private pageScrollTimeout: NodeJS.Timer
  private isInitialized = false
  private loadingTask: any

  public annotationCardCoordinates: Coordinates | null
  public portal: TemplatePortal

  @Output() afterLoadComplete = new EventEmitter<PDFDocumentProxy>()
  @Output() pageRendered = new EventEmitter<CustomEvent>()
  @Output() textLayerRendered = new EventEmitter<CustomEvent>()
  @Output() errored = new EventEmitter<any>()
  @Output() progressChange = new EventEmitter<PDFProgressData>()
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true)
  @Output() annotationCardOpened: EventEmitter<
    TextSelection
  > = new EventEmitter<TextSelection>()
  @Output() annotationCardClosed: EventEmitter<void> = new EventEmitter<void>()

  /** PDF source */
  @Input()
  src: string | Uint8Array | PDFSource

  /** List of annotations  */
  @Input()
  annotations: Annotation[]

  /** Currently active annotation  */
  @Input()
  activeAnnotation: Annotation

  @Input('c-maps-url')
  set cMapsUrl(cMapsUrl: string) {
    this._cMapsUrl = cMapsUrl
  }

  @Input('render-text')
  set renderText(renderText: boolean) {
    this._renderText = renderText
  }

  @Input('render-text-mode')
  set renderTextMode(renderTextMode: RenderTextMode) {
    this._renderTextMode = renderTextMode
  }

  @Input('original-size')
  set originalSize(originalSize: boolean) {
    this._originalSize = originalSize
  }

  @Input('show-all')
  set showAll(value: boolean) {
    this._showAll = value
  }

  @Input('stick-to-page')
  set stickToPage(value: boolean) {
    this._stickToPage = value
  }

  @Input('zoom')
  set zoom(value: number) {
    if (value <= 0) {
      return
    }

    this._zoom = value
  }

  get zoom() {
    return this._zoom
  }

  @Input('zoom-scale')
  set zoomScale(value: 'page-height' | 'page-fit' | 'page-width') {
    this._zoomScale = value
  }

  get zoomScale() {
    return this._zoomScale
  }

  @Input('rotation')
  set rotation(value: number) {
    if (!(typeof value === 'number' && value % 90 === 0)) {
      console.warn('Invalid pages rotation angle.')
      return
    }

    this._rotation = value
  }

  @Input('external-link-target')
  set externalLinkTarget(value: string) {
    this._externalLinkTarget = value
  }

  @Input('autoresize')
  set autoresize(value: boolean) {
    this._canAutoResize = Boolean(value)
  }

  @Input('fit-to-page')
  set fitToPage(value: boolean) {
    this._fitToPage = Boolean(value)
  }

  @Input('show-borders')
  set showBorders(value: boolean) {
    this._showBorders = Boolean(value)
  }

  get page() {
    return this._page
  }

  set page(_page: any) {
    _page = parseInt(_page, 10) || 1
    const orginalPage = _page

    if (this._pdf) {
      _page = this.getValidPageNumber(_page)
    }

    this._page = _page
    if (orginalPage !== _page) {
      this.pageChange.emit(_page)
    }
  }

  get numPages() {
    return this._pdf?.numPages
  }

  static getLinkTarget(type: string) {
    switch (type) {
      case 'blank':
        return (<any>PDFJS).LinkTarget.BLANK
      case 'none':
        return (<any>PDFJS).LinkTarget.NONE
      case 'self':
        return (<any>PDFJS).LinkTarget.SELF
      case 'parent':
        return (<any>PDFJS).LinkTarget.PARENT
      case 'top':
        return (<any>PDFJS).LinkTarget.TOP
    }

    return null
  }

  static setExternalLinkTarget(type: string) {
    const linkTarget = PdfViewerComponent.getLinkTarget(type)

    if (linkTarget !== null) {
      ;(<any>PDFJS).externalLinkTarget = linkTarget
    }
  }

  constructor(
    private element: ElementRef,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    if (isSSR()) {
      return
    }

    let pdfWorkerSrc: string

    if (
      window.hasOwnProperty('pdfWorkerSrc') &&
      typeof (window as any).pdfWorkerSrc === 'string' &&
      (window as any).pdfWorkerSrc
    ) {
      pdfWorkerSrc = (window as any).pdfWorkerSrc
    } else {
      pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
        (PDFJS as any).version
      }/pdf.worker.min.js`
    }

    ;(PDFJS as any).GlobalWorkerOptions.workerSrc = pdfWorkerSrc
  }

  ngAfterViewChecked(): void {
    if (this.isInitialized) {
      return
    }

    const offset = this.pdfViewerContainer.nativeElement.offsetParent

    if (this.isVisible === true && offset == null) {
      this.isVisible = false
      return
    }

    if (this.isVisible === false && offset != null) {
      this.isVisible = true

      setTimeout(() => {
        this.ngOnInit()
        this.ngOnChanges({ src: this.src } as any)
      })
    }
  }

  ngOnInit() {
    if (!isSSR() && this.isVisible) {
      this.isInitialized = true
      this.setupMultiPageViewer()
      this.setupSinglePageViewer()
    }
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => this.handleTextSelection())
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isSSR() || !this.isVisible) {
      return
    }

    if ('src' in changes) {
      this.loadPDF()
    } else if (this._pdf) {
      if ('renderText' in changes) {
        this.getCurrentViewer().textLayerMode = this._renderText
          ? this._renderTextMode
          : RenderTextMode.DISABLED
        this.resetPdfDocument()
      } else if ('showAll' in changes) {
        this.resetPdfDocument()
      } else if (
        'activeAnnotation' in changes &&
        changes.activeAnnotation.currentValue === undefined
      ) {
        window?.getSelection()?.removeAllRanges()
      }

      this.update()
    }
  }

  ngOnDestroy() {
    this.clear()
  }

  @HostListener('window:resize', [])
  public onPageResize() {
    if (!this._canAutoResize || !this._pdf) {
      return
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
    }

    this.resizeTimeout = setTimeout(() => {
      this.updateSize()
    }, 100)
  }

  get pdfLinkService(): any {
    return this._showAll
      ? this.pdfMultiPageLinkService
      : this.pdfSinglePageLinkService
  }

  get pdfViewer(): any {
    return this.getCurrentViewer()
  }

  get pdfFindController(): any {
    return this._showAll
      ? this.pdfMultiPageFindController
      : this.pdfSinglePageFindController
  }

  public pageChanged(page: number): void {
    this.page = page

    const currentPage: HTMLElement = document.querySelector(
      '[data-page-number="' + this._page + '"]'
    ) as HTMLElement
    currentPage.scrollIntoView()
    this.pdfViewer.scrollPageIntoView({ pageNumber: this._page })
  }
  public zoomChanged(zoom: number): void {
    this.zoom = zoom
    this.updateSize()
  }

  public openAnnotationForm(textSelection: TextSelection): void {
    this.annotationCardOpened.emit(textSelection)
  }

  public updateSize() {
    const currentViewer = this.getCurrentViewer()
    ;(this._pdf as PDFDocumentProxy)
      .getPage(currentViewer.currentPageNumber)
      .then((page: PDFPageProxy) => {
        const rotation = this._rotation || page.rotate
        const viewportWidth =
          (page as any).getViewport({
            scale: this._zoom,
            rotation,
          }).width * PdfViewerComponent.CSS_UNITS
        let scale = this._zoom
        let stickToPage = true

        // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
        if (
          !this._originalSize ||
          (this._fitToPage &&
            viewportWidth > this.pdfViewerContainer.nativeElement.clientWidth)
        ) {
          const viewPort = (page as any).getViewport({ scale: 1, rotation })
          scale = this.getScale(viewPort.width, viewPort.height)
          stickToPage = !this._stickToPage
        }

        currentViewer._setScale(scale, stickToPage)
      })
  }

  public clear() {
    if (this.loadingTask && !this.loadingTask.destroyed) {
      this.loadingTask.destroy()
    }

    if (this._pdf) {
      this._pdf.destroy()
      this._pdf = null
      this.pdfMultiPageViewer.setDocument(null)
      this.pdfSinglePageViewer.setDocument(null)

      this.pdfMultiPageLinkService.setDocument(null, null)
      this.pdfSinglePageLinkService.setDocument(null, null)

      this.pdfMultiPageFindController.setDocument(null)
      this.pdfSinglePageFindController.setDocument(null)
    }
  }

  private setupMultiPageViewer() {
    ;(PDFJS as any).disableTextLayer = !this._renderText

    PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget)

    const eventBus = createEventBus(PDFJSViewer)

    eventBus.on('pagerendered', (e: any) => {
      this.pageRendered.emit(e)
    })

    eventBus.on('pagechanging', (e: any) => {
      if (this.pageScrollTimeout) {
        clearTimeout(this.pageScrollTimeout)
      }

      this.page = e.pageNumber
      this.cd.markForCheck()

      this.pageScrollTimeout = setTimeout(() => {
        this._latestScrolledPage = e.pageNumber
        this.pageChange.emit(e.pageNumber)
      }, 100)
    })

    eventBus.on('textlayerrendered', (e: any) => {
      this.textLayerRendered.emit(e)
    })

    this.pdfMultiPageLinkService = new PDFJSViewer.PDFLinkService({ eventBus })
    this.pdfMultiPageFindController = new PDFJSViewer.PDFFindController({
      linkService: this.pdfMultiPageLinkService,
      eventBus,
    })

    const pdfOptions: PDFViewerParams | any = {
      eventBus: eventBus,
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: !this._showBorders,
      linkService: this.pdfMultiPageLinkService,
      textLayerMode: this._renderText
        ? this._renderTextMode
        : RenderTextMode.DISABLED,
      findController: this.pdfMultiPageFindController,
    }

    this.pdfMultiPageViewer = new PDFJSViewer.PDFViewer(pdfOptions)
    this.pdfMultiPageLinkService.setViewer(this.pdfMultiPageViewer)
    this.pdfMultiPageFindController.setDocument(this._pdf)
  }

  private setupSinglePageViewer() {
    ;(PDFJS as any).disableTextLayer = !this._renderText

    PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget)

    const eventBus = createEventBus(PDFJSViewer)

    eventBus.on('pagechanging', (e: any) => {
      if (e.pageNumber !== this._page) {
        this.page = e.pageNumber
        this.cd.markForCheck()
      }
    })

    eventBus.on('pagerendered', (e: any) => {
      this.pageRendered.emit(e)
    })

    eventBus.on('textlayerrendered', (e: any) => {
      this.textLayerRendered.emit(e)
    })

    this.pdfSinglePageLinkService = new PDFJSViewer.PDFLinkService({
      eventBus,
    })
    this.pdfSinglePageFindController = new PDFJSViewer.PDFFindController({
      linkService: this.pdfSinglePageLinkService,
      eventBus,
    })

    const pdfOptions: PDFViewerParams | any = {
      eventBus: eventBus,
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: !this._showBorders,
      linkService: this.pdfSinglePageLinkService,
      textLayerMode: this._renderText
        ? this._renderTextMode
        : RenderTextMode.DISABLED,
      findController: this.pdfSinglePageFindController,
    }

    this.pdfSinglePageViewer = new PDFJSViewer.PDFSinglePageViewer(pdfOptions)
    this.pdfSinglePageLinkService.setViewer(this.pdfSinglePageViewer)
    this.pdfSinglePageFindController.setDocument(this._pdf)

    this.pdfSinglePageViewer._currentPageNumber = this._page
  }

  private getValidPageNumber(page: number): number {
    if (page < 1) {
      return 1
    }

    if (page > (this._pdf as PDFDocumentProxy).numPages) {
      return (this._pdf as PDFDocumentProxy).numPages
    }

    return page
  }

  private getDocumentParams() {
    const srcType = typeof this.src

    if (!this._cMapsUrl) {
      return this.src
    }

    const params: any = {
      cMapUrl: this._cMapsUrl,
      cMapPacked: true,
    }

    if (srcType === 'string') {
      params.url = this.src
    } else if (srcType === 'object') {
      if ((this.src as any).byteLength !== undefined) {
        params.data = this.src
      } else {
        Object.assign(params, this.src)
      }
    }

    return params
  }

  private loadPDF() {
    if (!this.src) {
      return
    }

    if (this.lastLoaded === this.src) {
      this.update()
      return
    }

    this.clear()

    this.loadingTask = (PDFJS as any).getDocument(this.getDocumentParams())

    this.loadingTask.onProgress = (progressData: PDFProgressData) => {
      this.progressChange.emit(progressData)
    }

    const src = this.src
    ;(<PDFPromise<PDFDocumentProxy>>this.loadingTask.promise).then(
      (pdf: PDFDocumentProxy) => {
        this._pdf = pdf
        this.lastLoaded = src

        this.afterLoadComplete.emit(pdf)

        if (!this.pdfMultiPageViewer) {
          this.setupSinglePageViewer()
        }

        this.resetPdfDocument()

        this.update()
      },
      (error: any) => {
        this.errored.emit(error)
      }
    )
  }

  private update() {
    this.page = this._page

    this.render()
    this.cd.markForCheck()
  }

  private render() {
    this._page = this.getValidPageNumber(this._page)
    const currentViewer = this.getCurrentViewer()

    if (
      this._rotation !== 0 ||
      currentViewer.pagesRotation !== this._rotation
    ) {
      setTimeout(() => {
        currentViewer.pagesRotation = this._rotation
      })
    }

    if (this._stickToPage) {
      setTimeout(() => {
        currentViewer.currentPageNumber = this._page
      })
    }

    this.updateSize()
  }

  private getScale(viewportWidth: number, viewportHeight: number) {
    const borderSize = this._showBorders
      ? 2 * PdfViewerComponent.BORDER_WIDTH
      : 0
    const pdfContainerWidth =
      this.pdfViewerContainer.nativeElement.clientWidth - borderSize
    const pdfContainerHeight =
      this.pdfViewerContainer.nativeElement.clientHeight - borderSize

    if (
      pdfContainerHeight === 0 ||
      viewportHeight === 0 ||
      pdfContainerWidth === 0 ||
      viewportWidth === 0
    ) {
      return 1
    }

    let ratio = 1
    switch (this._zoomScale) {
      case 'page-fit':
        ratio = Math.min(
          pdfContainerHeight / viewportHeight,
          pdfContainerWidth / viewportWidth
        )
        break
      case 'page-height':
        ratio = pdfContainerHeight / viewportHeight
        break
      case 'page-width':
      default:
        ratio = pdfContainerWidth / viewportWidth
        break
    }

    return (this._zoom * ratio) / PdfViewerComponent.CSS_UNITS
  }

  private getCurrentViewer(): any {
    return this._showAll ? this.pdfMultiPageViewer : this.pdfSinglePageViewer
  }

  private resetPdfDocument() {
    this.pdfFindController.setDocument(this._pdf)

    if (this._showAll) {
      this.pdfSinglePageViewer.setDocument(null)
      this.pdfSinglePageLinkService.setDocument(null)

      this.pdfMultiPageViewer.setDocument(this._pdf)
      this.pdfMultiPageLinkService.setDocument(this._pdf, null)
    } else {
      this.pdfMultiPageViewer.setDocument(null)
      this.pdfMultiPageLinkService.setDocument(null)

      this.pdfSinglePageViewer.setDocument(this._pdf)
      this.pdfSinglePageLinkService.setDocument(this._pdf, null)
    }
  }

  private handleTextSelection(): void {
    document.querySelector('.pdfViewer')?.addEventListener('mouseup', () => {
      this.annotationCardClosed.emit()
      const selection: Selection = window?.getSelection() as Selection
      const textSelection = selection.toString()

      if (textSelection.length > 0) {
        const anchor: HTMLElement = this.createAnchor(selection)
        const anchorPosition = getPosition(anchor)

        console.log(anchorPosition)

        let adjustedPosition
        const offsetRight =
          (document.querySelector('.pdf-viewer-container') as HTMLElement)
            .offsetWidth - anchorPosition.positionX

        if (offsetRight < 360) {
          const adjustedCardWidth = 340

          adjustedPosition = {
            positionY: (anchorPosition.positionY - 6) / this.zoom,
            positionX:
              (anchorPosition.positionX - adjustedCardWidth + offsetRight) /
              this.zoom,
          }
        } else {
          adjustedPosition = {
            positionY: (anchorPosition.positionY - 6) / this.zoom,
            positionX: (anchorPosition.positionX - 110) / this.zoom,
          }
        }

        this.annotationCardCoordinates = adjustedPosition

        this.openAnnotationForm({
          positionY: (anchorPosition.positionY - 6) / this.zoom,
          positionX: (anchorPosition.positionX - 110) / this.zoom,
          text: textSelection,
        })

        anchor.remove()
        this.cd.markForCheck()
      }
    })
  }

  private createAnchor(selection: Selection): HTMLElement {
    const range = selection.getRangeAt(0)
    const el = document.createElement('span')
    el.id = 'annotation-anchor'

    range.collapse()
    range.insertNode(el)

    return document.getElementById('annotation-anchor') as HTMLElement
  }
}
