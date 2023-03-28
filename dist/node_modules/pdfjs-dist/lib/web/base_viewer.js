/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2022 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagesCountLimit = exports.PDFPageViewBuffer = exports.BaseViewer = void 0;

var _pdf = require("../pdf");

var _ui_utils = require("./ui_utils.js");

var _annotation_layer_builder = require("./annotation_layer_builder.js");

var _l10n_utils = require("./l10n_utils.js");

var _pdf_page_view = require("./pdf_page_view.js");

var _pdf_rendering_queue = require("./pdf_rendering_queue.js");

var _pdf_link_service = require("./pdf_link_service.js");

var _struct_tree_layer_builder = require("./struct_tree_layer_builder.js");

var _text_highlighter = require("./text_highlighter.js");

var _text_layer_builder = require("./text_layer_builder.js");

var _xfa_layer_builder = require("./xfa_layer_builder.js");

const DEFAULT_CACHE_SIZE = 10;
const ENABLE_PERMISSIONS_CLASS = "enablePermissions";
const PagesCountLimit = {
  FORCE_SCROLL_MODE_PAGE: 15000,
  FORCE_LAZY_PAGE_INIT: 7500,
  PAUSE_EAGER_PAGE_INIT: 250
};
exports.PagesCountLimit = PagesCountLimit;

class PDFPageViewBuffer {
  #buf = new Set();
  #size = 0;

  constructor(size) {
    this.#size = size;
  }

  push(view) {
    const buf = this.#buf;

    if (buf.has(view)) {
      buf.delete(view);
    }

    buf.add(view);

    if (buf.size > this.#size) {
      this.#destroyFirstView();
    }
  }

  resize(newSize, idsToKeep = null) {
    this.#size = newSize;
    const buf = this.#buf;

    if (idsToKeep) {
      const ii = buf.size;
      let i = 1;

      for (const view of buf) {
        if (idsToKeep.has(view.id)) {
          buf.delete(view);
          buf.add(view);
        }

        if (++i > ii) {
          break;
        }
      }
    }

    while (buf.size > this.#size) {
      this.#destroyFirstView();
    }
  }

  has(view) {
    return this.#buf.has(view);
  }

  [Symbol.iterator]() {
    return this.#buf.keys();
  }

  #destroyFirstView() {
    const firstView = this.#buf.keys().next().value;
    firstView?.destroy();
    this.#buf.delete(firstView);
  }

}

exports.PDFPageViewBuffer = PDFPageViewBuffer;

class BaseViewer {
  #buffer = null;
  #annotationMode = _pdf.AnnotationMode.ENABLE_FORMS;
  #previousAnnotationMode = null;
  #enablePermissions = false;
  #previousContainerHeight = 0;
  #scrollModePageState = null;
  #onVisibilityChange = null;

  constructor(options) {
    if (this.constructor === BaseViewer) {
      throw new Error("Cannot initialize BaseViewer.");
    }

    const viewerVersion = '2.14.305';

    if (_pdf.version !== viewerVersion) {
      throw new Error(`The API version "${_pdf.version}" does not match the Viewer version "${viewerVersion}".`);
    }

    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;

    if (!(this.container?.tagName.toUpperCase() === "DIV" && this.viewer?.tagName.toUpperCase() === "DIV")) {
      throw new Error("Invalid `container` and/or `viewer` option.");
    }

    if (this.container.offsetParent && getComputedStyle(this.container).position !== "absolute") {
      throw new Error("The `container` must be absolutely positioned.");
    }

    this.eventBus = options.eventBus;
    this.linkService = options.linkService || new _pdf_link_service.SimpleLinkService();
    this.downloadManager = options.downloadManager || null;
    this.findController = options.findController || null;
    this._scriptingManager = options.scriptingManager || null;
    this.removePageBorders = options.removePageBorders || false;
    this.textLayerMode = options.textLayerMode ?? _ui_utils.TextLayerMode.ENABLE;
    this.#annotationMode = options.annotationMode ?? _pdf.AnnotationMode.ENABLE_FORMS;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels;
    this.l10n = options.l10n || _l10n_utils.NullL10n;
    this.#enablePermissions = options.enablePermissions || false;
    this.pageColors = options.pageColors || null;

    if (options.pageColors && (!CSS.supports("color", options.pageColors.background) || !CSS.supports("color", options.pageColors.foreground))) {
      if (options.pageColors.background || options.pageColors.foreground) {
        console.warn("Ignoring `pageColors`-option, since the browser doesn't support the values used.");
      }

      this.pageColors = null;
    }

    this.defaultRenderingQueue = !options.renderingQueue;

    if (this.defaultRenderingQueue) {
      this.renderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
    } else {
      this.renderingQueue = options.renderingQueue;
    }

    this._doc = document.documentElement;
    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdate.bind(this));
    this.presentationModeState = _ui_utils.PresentationModeState.UNKNOWN;
    this._onBeforeDraw = this._onAfterDraw = null;

    this._resetView();

    if (this.removePageBorders) {
      this.viewer.classList.add("removePageBorders");
    }

    this.updateContainerHeightCss();
    Promise.resolve().then(() => {
      this.eventBus.dispatch("baseviewerinit", {
        source: this
      });
    });
  }

  get pagesCount() {
    return this._pages.length;
  }

  getPageView(index) {
    return this._pages[index];
  }

  get pageViewsReady() {
    if (!this._pagesCapability.settled) {
      return false;
    }

    return this._pages.every(function (pageView) {
      return pageView?.pdfPage;
    });
  }

  get renderForms() {
    return this.#annotationMode === _pdf.AnnotationMode.ENABLE_FORMS;
  }

  get enableScripting() {
    return !!this._scriptingManager;
  }

  get currentPageNumber() {
    return this._currentPageNumber;
  }

  set currentPageNumber(val) {
    if (!Number.isInteger(val)) {
      throw new Error("Invalid page number.");
    }

    if (!this.pdfDocument) {
      return;
    }

    if (!this._setCurrentPageNumber(val, true)) {
      console.error(`currentPageNumber: "${val}" is not a valid page.`);
    }
  }

  _setCurrentPageNumber(val, resetCurrentPageView = false) {
    if (this._currentPageNumber === val) {
      if (resetCurrentPageView) {
        this.#resetCurrentPageView();
      }

      return true;
    }

    if (!(0 < val && val <= this.pagesCount)) {
      return false;
    }

    const previous = this._currentPageNumber;
    this._currentPageNumber = val;
    this.eventBus.dispatch("pagechanging", {
      source: this,
      pageNumber: val,
      pageLabel: this._pageLabels?.[val - 1] ?? null,
      previous
    });

    if (resetCurrentPageView) {
      this.#resetCurrentPageView();
    }

    return true;
  }

  get currentPageLabel() {
    return this._pageLabels?.[this._currentPageNumber - 1] ?? null;
  }

  set currentPageLabel(val) {
    if (!this.pdfDocument) {
      return;
    }

    let page = val | 0;

    if (this._pageLabels) {
      const i = this._pageLabels.indexOf(val);

      if (i >= 0) {
        page = i + 1;
      }
    }

    if (!this._setCurrentPageNumber(page, true)) {
      console.error(`currentPageLabel: "${val}" is not a valid page.`);
    }
  }

  get currentScale() {
    return this._currentScale !== _ui_utils.UNKNOWN_SCALE ? this._currentScale : _ui_utils.DEFAULT_SCALE;
  }

  set currentScale(val) {
    if (isNaN(val)) {
      throw new Error("Invalid numeric scale.");
    }

    if (!this.pdfDocument) {
      return;
    }

    this._setScale(val, false);
  }

  get currentScaleValue() {
    return this._currentScaleValue;
  }

  set currentScaleValue(val) {
    if (!this.pdfDocument) {
      return;
    }

    this._setScale(val, false);
  }

  get pagesRotation() {
    return this._pagesRotation;
  }

  set pagesRotation(rotation) {
    if (!(0, _ui_utils.isValidRotation)(rotation)) {
      throw new Error("Invalid pages rotation angle.");
    }

    if (!this.pdfDocument) {
      return;
    }

    rotation %= 360;

    if (rotation < 0) {
      rotation += 360;
    }

    if (this._pagesRotation === rotation) {
      return;
    }

    this._pagesRotation = rotation;
    const pageNumber = this._currentPageNumber;
    const updateArgs = {
      rotation
    };

    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }

    if (this._currentScaleValue) {
      this._setScale(this._currentScaleValue, true);
    }

    this.eventBus.dispatch("rotationchanging", {
      source: this,
      pagesRotation: rotation,
      pageNumber
    });

    if (this.defaultRenderingQueue) {
      this.update();
    }
  }

  get firstPagePromise() {
    return this.pdfDocument ? this._firstPageCapability.promise : null;
  }

  get onePageRendered() {
    return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
  }

  get pagesPromise() {
    return this.pdfDocument ? this._pagesCapability.promise : null;
  }

  #initializePermissions(permissions) {
    if (!permissions) {
      return;
    }

    if (!permissions.includes(_pdf.PermissionFlag.COPY)) {
      this.viewer.classList.add(ENABLE_PERMISSIONS_CLASS);
    }

    if (!permissions.includes(_pdf.PermissionFlag.MODIFY_ANNOTATIONS) && !permissions.includes(_pdf.PermissionFlag.FILL_INTERACTIVE_FORMS)) {
      if (this.#annotationMode === _pdf.AnnotationMode.ENABLE_FORMS) {
        this.#previousAnnotationMode = this.#annotationMode;
        this.#annotationMode = _pdf.AnnotationMode.ENABLE;
      }
    }
  }

  #onePageRenderedOrForceFetch() {
    if (document.visibilityState === "hidden" || !this.container.offsetParent || this._getVisiblePages().views.length === 0) {
      return Promise.resolve();
    }

    const visibilityChangePromise = new Promise(resolve => {
      this.#onVisibilityChange = () => {
        if (document.visibilityState !== "hidden") {
          return;
        }

        resolve();
        document.removeEventListener("visibilitychange", this.#onVisibilityChange);
        this.#onVisibilityChange = null;
      };

      document.addEventListener("visibilitychange", this.#onVisibilityChange);
    });
    return Promise.race([this._onePageRenderedCapability.promise, visibilityChangePromise]);
  }

  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      this.eventBus.dispatch("pagesdestroy", {
        source: this
      });

      this._cancelRendering();

      this._resetView();

      if (this.findController) {
        this.findController.setDocument(null);
      }

      if (this._scriptingManager) {
        this._scriptingManager.setDocument(null);
      }
    }

    this.pdfDocument = pdfDocument;

    if (!pdfDocument) {
      return;
    }

    const isPureXfa = pdfDocument.isPureXfa;
    const pagesCount = pdfDocument.numPages;
    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();
    const permissionsPromise = this.#enablePermissions ? pdfDocument.getPermissions() : Promise.resolve();

    if (pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
      console.warn("Forcing PAGE-scrolling for performance reasons, given the length of the document.");
      const mode = this._scrollMode = _ui_utils.ScrollMode.PAGE;
      this.eventBus.dispatch("scrollmodechanged", {
        source: this,
        mode
      });
    }

    this._pagesCapability.promise.then(() => {
      this.eventBus.dispatch("pagesloaded", {
        source: this,
        pagesCount
      });
    }, () => {});

    this._onBeforeDraw = evt => {
      const pageView = this._pages[evt.pageNumber - 1];

      if (!pageView) {
        return;
      }

      this.#buffer.push(pageView);
    };

    this.eventBus._on("pagerender", this._onBeforeDraw);

    this._onAfterDraw = evt => {
      if (evt.cssTransform || this._onePageRenderedCapability.settled) {
        return;
      }

      this._onePageRenderedCapability.resolve({
        timestamp: evt.timestamp
      });

      this.eventBus._off("pagerendered", this._onAfterDraw);

      this._onAfterDraw = null;

      if (this.#onVisibilityChange) {
        document.removeEventListener("visibilitychange", this.#onVisibilityChange);
        this.#onVisibilityChange = null;
      }
    };

    this.eventBus._on("pagerendered", this._onAfterDraw);

    Promise.all([firstPagePromise, permissionsPromise]).then(([firstPdfPage, permissions]) => {
      if (pdfDocument !== this.pdfDocument) {
        return;
      }

      this._firstPageCapability.resolve(firstPdfPage);

      this._optionalContentConfigPromise = optionalContentConfigPromise;
      this.#initializePermissions(permissions);
      const viewerElement = this._scrollMode === _ui_utils.ScrollMode.PAGE ? null : this.viewer;
      const scale = this.currentScale;
      const viewport = firstPdfPage.getViewport({
        scale: scale * _pdf.PixelsPerInch.PDF_TO_CSS_UNITS
      });
      const textLayerFactory = this.textLayerMode !== _ui_utils.TextLayerMode.DISABLE && !isPureXfa ? this : null;
      const annotationLayerFactory = this.#annotationMode !== _pdf.AnnotationMode.DISABLE ? this : null;
      const xfaLayerFactory = isPureXfa ? this : null;

      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
        const pageView = new _pdf_page_view.PDFPageView({
          container: viewerElement,
          eventBus: this.eventBus,
          id: pageNum,
          scale,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          renderingQueue: this.renderingQueue,
          textLayerFactory,
          textLayerMode: this.textLayerMode,
          annotationLayerFactory,
          annotationMode: this.#annotationMode,
          xfaLayerFactory,
          textHighlighterFactory: this,
          structTreeLayerFactory: this,
          imageResourcesPath: this.imageResourcesPath,
          renderer: this.renderer,
          useOnlyCssZoom: this.useOnlyCssZoom,
          maxCanvasPixels: this.maxCanvasPixels,
          pageColors: this.pageColors,
          l10n: this.l10n
        });

        this._pages.push(pageView);
      }

      const firstPageView = this._pages[0];

      if (firstPageView) {
        firstPageView.setPdfPage(firstPdfPage);
        this.linkService.cachePageRef(1, firstPdfPage.ref);
      }

      if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
        this.#ensurePageViewVisible();
      } else if (this._spreadMode !== _ui_utils.SpreadMode.NONE) {
        this._updateSpreadMode();
      }

      this.#onePageRenderedOrForceFetch().then(async () => {
        if (this.findController) {
          this.findController.setDocument(pdfDocument);
        }

        if (this._scriptingManager) {
          this._scriptingManager.setDocument(pdfDocument);
        }

        if (pdfDocument.loadingParams.disableAutoFetch || pagesCount > PagesCountLimit.FORCE_LAZY_PAGE_INIT) {
          this._pagesCapability.resolve();

          return;
        }

        let getPagesLeft = pagesCount - 1;

        if (getPagesLeft <= 0) {
          this._pagesCapability.resolve();

          return;
        }

        for (let pageNum = 2; pageNum <= pagesCount; ++pageNum) {
          const promise = pdfDocument.getPage(pageNum).then(pdfPage => {
            const pageView = this._pages[pageNum - 1];

            if (!pageView.pdfPage) {
              pageView.setPdfPage(pdfPage);
            }

            this.linkService.cachePageRef(pageNum, pdfPage.ref);

            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          }, reason => {
            console.error(`Unable to get page ${pageNum} to initialize viewer`, reason);

            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          });

          if (pageNum % PagesCountLimit.PAUSE_EAGER_PAGE_INIT === 0) {
            await promise;
          }
        }
      });
      this.eventBus.dispatch("pagesinit", {
        source: this
      });
      pdfDocument.getMetadata().then(({
        info
      }) => {
        if (pdfDocument !== this.pdfDocument) {
          return;
        }

        if (info.Language) {
          this.viewer.lang = info.Language;
        }
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }).catch(reason => {
      console.error("Unable to initialize viewer", reason);

      this._pagesCapability.reject(reason);
    });
  }

  setPageLabels(labels) {
    if (!this.pdfDocument) {
      return;
    }

    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error(`setPageLabels: Invalid page labels.`);
    } else {
      this._pageLabels = labels;
    }

    for (let i = 0, ii = this._pages.length; i < ii; i++) {
      this._pages[i].setPageLabel(this._pageLabels?.[i] ?? null);
    }
  }

  _resetView() {
    this._pages = [];
    this._currentPageNumber = 1;
    this._currentScale = _ui_utils.UNKNOWN_SCALE;
    this._currentScaleValue = null;
    this._pageLabels = null;
    this.#buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
    this._location = null;
    this._pagesRotation = 0;
    this._optionalContentConfigPromise = null;
    this._firstPageCapability = (0, _pdf.createPromiseCapability)();
    this._onePageRenderedCapability = (0, _pdf.createPromiseCapability)();
    this._pagesCapability = (0, _pdf.createPromiseCapability)();
    this._scrollMode = _ui_utils.ScrollMode.VERTICAL;
    this._previousScrollMode = _ui_utils.ScrollMode.UNKNOWN;
    this._spreadMode = _ui_utils.SpreadMode.NONE;
    this.#scrollModePageState = {
      previousPageNumber: 1,
      scrollDown: true,
      pages: []
    };

    if (this._onBeforeDraw) {
      this.eventBus._off("pagerender", this._onBeforeDraw);

      this._onBeforeDraw = null;
    }

    if (this._onAfterDraw) {
      this.eventBus._off("pagerendered", this._onAfterDraw);

      this._onAfterDraw = null;
    }

    if (this.#onVisibilityChange) {
      document.removeEventListener("visibilitychange", this.#onVisibilityChange);
      this.#onVisibilityChange = null;
    }

    this.viewer.textContent = "";

    this._updateScrollMode();

    this.viewer.removeAttribute("lang");
    this.viewer.classList.remove(ENABLE_PERMISSIONS_CLASS);

    if (this.#previousAnnotationMode !== null) {
      this.#annotationMode = this.#previousAnnotationMode;
      this.#previousAnnotationMode = null;
    }
  }

  #ensurePageViewVisible() {
    if (this._scrollMode !== _ui_utils.ScrollMode.PAGE) {
      throw new Error("#ensurePageViewVisible: Invalid scrollMode value.");
    }

    const pageNumber = this._currentPageNumber,
          state = this.#scrollModePageState,
          viewer = this.viewer;
    viewer.textContent = "";
    state.pages.length = 0;

    if (this._spreadMode === _ui_utils.SpreadMode.NONE && !this.isInPresentationMode) {
      const pageView = this._pages[pageNumber - 1];
      viewer.appendChild(pageView.div);
      state.pages.push(pageView);
    } else {
      const pageIndexSet = new Set(),
            parity = this._spreadMode - 1;

      if (parity === -1) {
        pageIndexSet.add(pageNumber - 1);
      } else if (pageNumber % 2 !== parity) {
        pageIndexSet.add(pageNumber - 1);
        pageIndexSet.add(pageNumber);
      } else {
        pageIndexSet.add(pageNumber - 2);
        pageIndexSet.add(pageNumber - 1);
      }

      const spread = document.createElement("div");
      spread.className = "spread";

      if (this.isInPresentationMode) {
        const dummyPage = document.createElement("div");
        dummyPage.className = "dummyPage";
        spread.appendChild(dummyPage);
      }

      for (const i of pageIndexSet) {
        const pageView = this._pages[i];

        if (!pageView) {
          continue;
        }

        spread.appendChild(pageView.div);
        state.pages.push(pageView);
      }

      viewer.appendChild(spread);
    }

    state.scrollDown = pageNumber >= state.previousPageNumber;
    state.previousPageNumber = pageNumber;
  }

  _scrollUpdate() {
    if (this.pagesCount === 0) {
      return;
    }

    this.update();
  }

  #scrollIntoView(pageView, pageSpot = null) {
    const {
      div,
      id
    } = pageView;

    if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
      this._setCurrentPageNumber(id);

      this.#ensurePageViewVisible();
      this.update();
    }

    if (!pageSpot && !this.isInPresentationMode) {
      const left = div.offsetLeft + div.clientLeft,
            right = left + div.clientWidth;
      const {
        scrollLeft,
        clientWidth
      } = this.container;

      if (this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL || left < scrollLeft || right > scrollLeft + clientWidth) {
        pageSpot = {
          left: 0,
          top: 0
        };
      }
    }

    (0, _ui_utils.scrollIntoView)(div, pageSpot);
  }

  #isSameScale(newScale) {
    return newScale === this._currentScale || Math.abs(newScale - this._currentScale) < 1e-15;
  }

  _setScaleUpdatePages(newScale, newValue, noScroll = false, preset = false) {
    this._currentScaleValue = newValue.toString();

    if (this.#isSameScale(newScale)) {
      if (preset) {
        this.eventBus.dispatch("scalechanging", {
          source: this,
          scale: newScale,
          presetValue: newValue
        });
      }

      return;
    }

    this._doc.style.setProperty("--zoom-factor", newScale);

    const updateArgs = {
      scale: newScale
    };

    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }

    this._currentScale = newScale;

    if (!noScroll) {
      let page = this._currentPageNumber,
          dest;

      if (this._location && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
        page = this._location.pageNumber;
        dest = [null, {
          name: "XYZ"
        }, this._location.left, this._location.top, null];
      }

      this.scrollPageIntoView({
        pageNumber: page,
        destArray: dest,
        allowNegativeOffset: true
      });
    }

    this.eventBus.dispatch("scalechanging", {
      source: this,
      scale: newScale,
      presetValue: preset ? newValue : undefined
    });

    if (this.defaultRenderingQueue) {
      this.update();
    }

    this.updateContainerHeightCss();
  }

  get _pageWidthScaleFactor() {
    if (this._spreadMode !== _ui_utils.SpreadMode.NONE && this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL) {
      return 2;
    }

    return 1;
  }

  _setScale(value, noScroll = false) {
    let scale = parseFloat(value);

    if (scale > 0) {
      this._setScaleUpdatePages(scale, value, noScroll, false);
    } else {
      const currentPage = this._pages[this._currentPageNumber - 1];

      if (!currentPage) {
        return;
      }

      let hPadding = _ui_utils.SCROLLBAR_PADDING,
          vPadding = _ui_utils.VERTICAL_PADDING;

      if (this.isInPresentationMode) {
        hPadding = vPadding = 4;
      } else if (this.removePageBorders) {
        hPadding = vPadding = 0;
      } else if (this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL) {
        [hPadding, vPadding] = [vPadding, hPadding];
      }

      const pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale / this._pageWidthScaleFactor;
      const pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;

      switch (value) {
        case "page-actual":
          scale = 1;
          break;

        case "page-width":
          scale = pageWidthScale;
          break;

        case "page-height":
          scale = pageHeightScale;
          break;

        case "page-fit":
          scale = Math.min(pageWidthScale, pageHeightScale);
          break;

        case "auto":
          const horizontalScale = (0, _ui_utils.isPortraitOrientation)(currentPage) ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale);
          scale = Math.min(_ui_utils.MAX_AUTO_SCALE, horizontalScale);
          break;

        default:
          console.error(`_setScale: "${value}" is an unknown zoom value.`);
          return;
      }

      this._setScaleUpdatePages(scale, value, noScroll, true);
    }
  }

  #resetCurrentPageView() {
    const pageView = this._pages[this._currentPageNumber - 1];

    if (this.isInPresentationMode) {
      this._setScale(this._currentScaleValue, true);
    }

    this.#scrollIntoView(pageView);
  }

  pageLabelToPageNumber(label) {
    if (!this._pageLabels) {
      return null;
    }

    const i = this._pageLabels.indexOf(label);

    if (i < 0) {
      return null;
    }

    return i + 1;
  }

  scrollPageIntoView({
    pageNumber,
    destArray = null,
    allowNegativeOffset = false,
    ignoreDestinationZoom = false
  }) {
    if (!this.pdfDocument) {
      return;
    }

    const pageView = Number.isInteger(pageNumber) && this._pages[pageNumber - 1];

    if (!pageView) {
      console.error(`scrollPageIntoView: "${pageNumber}" is not a valid pageNumber parameter.`);
      return;
    }

    if (this.isInPresentationMode || !destArray) {
      this._setCurrentPageNumber(pageNumber, true);

      return;
    }

    let x = 0,
        y = 0;
    let width = 0,
        height = 0,
        widthScale,
        heightScale;
    const changeOrientation = pageView.rotation % 180 !== 0;
    const pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
    const pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
    let scale = 0;

    switch (destArray[1].name) {
      case "XYZ":
        x = destArray[2];
        y = destArray[3];
        scale = destArray[4];
        x = x !== null ? x : 0;
        y = y !== null ? y : pageHeight;
        break;

      case "Fit":
      case "FitB":
        scale = "page-fit";
        break;

      case "FitH":
      case "FitBH":
        y = destArray[2];
        scale = "page-width";

        if (y === null && this._location) {
          x = this._location.left;
          y = this._location.top;
        } else if (typeof y !== "number" || y < 0) {
          y = pageHeight;
        }

        break;

      case "FitV":
      case "FitBV":
        x = destArray[2];
        width = pageWidth;
        height = pageHeight;
        scale = "page-height";
        break;

      case "FitR":
        x = destArray[2];
        y = destArray[3];
        width = destArray[4] - x;
        height = destArray[5] - y;
        const hPadding = this.removePageBorders ? 0 : _ui_utils.SCROLLBAR_PADDING;
        const vPadding = this.removePageBorders ? 0 : _ui_utils.VERTICAL_PADDING;
        widthScale = (this.container.clientWidth - hPadding) / width / _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
        heightScale = (this.container.clientHeight - vPadding) / height / _pdf.PixelsPerInch.PDF_TO_CSS_UNITS;
        scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
        break;

      default:
        console.error(`scrollPageIntoView: "${destArray[1].name}" is not a valid destination type.`);
        return;
    }

    if (!ignoreDestinationZoom) {
      if (scale && scale !== this._currentScale) {
        this.currentScaleValue = scale;
      } else if (this._currentScale === _ui_utils.UNKNOWN_SCALE) {
        this.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
      }
    }

    if (scale === "page-fit" && !destArray[4]) {
      this.#scrollIntoView(pageView);
      return;
    }

    const boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
    let left = Math.min(boundingRect[0][0], boundingRect[1][0]);
    let top = Math.min(boundingRect[0][1], boundingRect[1][1]);

    if (!allowNegativeOffset) {
      left = Math.max(left, 0);
      top = Math.max(top, 0);
    }

    this.#scrollIntoView(pageView, {
      left,
      top
    });
  }

  _updateLocation(firstPage) {
    const currentScale = this._currentScale;
    const currentScaleValue = this._currentScaleValue;
    const normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
    const pageNumber = firstPage.id;
    const currentPageView = this._pages[pageNumber - 1];
    const container = this.container;
    const topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
    const intLeft = Math.round(topLeft[0]);
    const intTop = Math.round(topLeft[1]);
    let pdfOpenParams = `#page=${pageNumber}`;

    if (!this.isInPresentationMode) {
      pdfOpenParams += `&zoom=${normalizedScaleValue},${intLeft},${intTop}`;
    }

    this._location = {
      pageNumber,
      scale: normalizedScaleValue,
      top: intTop,
      left: intLeft,
      rotation: this._pagesRotation,
      pdfOpenParams
    };
  }

  update() {
    const visible = this._getVisiblePages();

    const visiblePages = visible.views,
          numVisiblePages = visiblePages.length;

    if (numVisiblePages === 0) {
      return;
    }

    const newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1);
    this.#buffer.resize(newCacheSize, visible.ids);
    this.renderingQueue.renderHighestPriority(visible);
    const isSimpleLayout = this._spreadMode === _ui_utils.SpreadMode.NONE && (this._scrollMode === _ui_utils.ScrollMode.PAGE || this._scrollMode === _ui_utils.ScrollMode.VERTICAL);
    const currentId = this._currentPageNumber;
    let stillFullyVisible = false;

    for (const page of visiblePages) {
      if (page.percent < 100) {
        break;
      }

      if (page.id === currentId && isSimpleLayout) {
        stillFullyVisible = true;
        break;
      }
    }

    this._setCurrentPageNumber(stillFullyVisible ? currentId : visiblePages[0].id);

    this._updateLocation(visible.first);

    this.eventBus.dispatch("updateviewarea", {
      source: this,
      location: this._location
    });
  }

  containsElement(element) {
    return this.container.contains(element);
  }

  focus() {
    this.container.focus();
  }

  get _isContainerRtl() {
    return getComputedStyle(this.container).direction === "rtl";
  }

  get isInPresentationMode() {
    return this.presentationModeState === _ui_utils.PresentationModeState.FULLSCREEN;
  }

  get isChangingPresentationMode() {
    return this.presentationModeState === _ui_utils.PresentationModeState.CHANGING;
  }

  get isHorizontalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
  }

  get isVerticalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollHeight > this.container.clientHeight;
  }

  _getVisiblePages() {
    const views = this._scrollMode === _ui_utils.ScrollMode.PAGE ? this.#scrollModePageState.pages : this._pages,
          horizontal = this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL,
          rtl = horizontal && this._isContainerRtl;
    return (0, _ui_utils.getVisibleElements)({
      scrollEl: this.container,
      views,
      sortByVisibility: true,
      horizontal,
      rtl
    });
  }

  isPageVisible(pageNumber) {
    if (!this.pdfDocument) {
      return false;
    }

    if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
      console.error(`isPageVisible: "${pageNumber}" is not a valid page.`);
      return false;
    }

    return this._getVisiblePages().ids.has(pageNumber);
  }

  isPageCached(pageNumber) {
    if (!this.pdfDocument) {
      return false;
    }

    if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
      console.error(`isPageCached: "${pageNumber}" is not a valid page.`);
      return false;
    }

    const pageView = this._pages[pageNumber - 1];
    return this.#buffer.has(pageView);
  }

  cleanup() {
    for (const pageView of this._pages) {
      if (pageView.renderingState !== _ui_utils.RenderingStates.FINISHED) {
        pageView.reset();
      }
    }
  }

  _cancelRendering() {
    for (const pageView of this._pages) {
      pageView.cancelRendering();
    }
  }

  async #ensurePdfPageLoaded(pageView) {
    if (pageView.pdfPage) {
      return pageView.pdfPage;
    }

    try {
      const pdfPage = await this.pdfDocument.getPage(pageView.id);

      if (!pageView.pdfPage) {
        pageView.setPdfPage(pdfPage);
      }

      if (!this.linkService._cachedPageNumber?.(pdfPage.ref)) {
        this.linkService.cachePageRef(pageView.id, pdfPage.ref);
      }

      return pdfPage;
    } catch (reason) {
      console.error("Unable to get page for page view", reason);
      return null;
    }
  }

  #getScrollAhead(visible) {
    if (visible.first?.id === 1) {
      return true;
    } else if (visible.last?.id === this.pagesCount) {
      return false;
    }

    switch (this._scrollMode) {
      case _ui_utils.ScrollMode.PAGE:
        return this.#scrollModePageState.scrollDown;

      case _ui_utils.ScrollMode.HORIZONTAL:
        return this.scroll.right;
    }

    return this.scroll.down;
  }

  #toggleLoadingIconSpinner(visibleIds) {
    for (const id of visibleIds) {
      const pageView = this._pages[id - 1];
      pageView?.toggleLoadingIconSpinner(true);
    }

    for (const pageView of this.#buffer) {
      if (visibleIds.has(pageView.id)) {
        continue;
      }

      pageView.toggleLoadingIconSpinner(false);
    }
  }

  forceRendering(currentlyVisiblePages) {
    const visiblePages = currentlyVisiblePages || this._getVisiblePages();

    const scrollAhead = this.#getScrollAhead(visiblePages);
    const preRenderExtra = this._spreadMode !== _ui_utils.SpreadMode.NONE && this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL;
    const pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead, preRenderExtra);
    this.#toggleLoadingIconSpinner(visiblePages.ids);

    if (pageView) {
      this.#ensurePdfPageLoaded(pageView).then(() => {
        this.renderingQueue.renderView(pageView);
      });
      return true;
    }

    return false;
  }

  createTextLayerBuilder(textLayerDiv, pageIndex, viewport, enhanceTextSelection = false, eventBus, highlighter) {
    return new _text_layer_builder.TextLayerBuilder({
      textLayerDiv,
      eventBus,
      pageIndex,
      viewport,
      enhanceTextSelection: this.isInPresentationMode ? false : enhanceTextSelection,
      highlighter
    });
  }

  createTextHighlighter(pageIndex, eventBus) {
    return new _text_highlighter.TextHighlighter({
      eventBus,
      pageIndex,
      findController: this.isInPresentationMode ? null : this.findController
    });
  }

  createAnnotationLayerBuilder(pageDiv, pdfPage, annotationStorage = null, imageResourcesPath = "", renderForms = true, l10n = _l10n_utils.NullL10n, enableScripting = null, hasJSActionsPromise = null, mouseState = null, fieldObjectsPromise = null, annotationCanvasMap = null) {
    return new _annotation_layer_builder.AnnotationLayerBuilder({
      pageDiv,
      pdfPage,
      annotationStorage: annotationStorage || this.pdfDocument?.annotationStorage,
      imageResourcesPath,
      renderForms,
      linkService: this.linkService,
      downloadManager: this.downloadManager,
      l10n,
      enableScripting: enableScripting ?? this.enableScripting,
      hasJSActionsPromise: hasJSActionsPromise || this.pdfDocument?.hasJSActions(),
      fieldObjectsPromise: fieldObjectsPromise || this.pdfDocument?.getFieldObjects(),
      mouseState: mouseState || this._scriptingManager?.mouseState,
      annotationCanvasMap
    });
  }

  createXfaLayerBuilder(pageDiv, pdfPage, annotationStorage = null) {
    return new _xfa_layer_builder.XfaLayerBuilder({
      pageDiv,
      pdfPage,
      annotationStorage: annotationStorage || this.pdfDocument?.annotationStorage,
      linkService: this.linkService
    });
  }

  createStructTreeLayerBuilder(pdfPage) {
    return new _struct_tree_layer_builder.StructTreeLayerBuilder({
      pdfPage
    });
  }

  get hasEqualPageSizes() {
    const firstPageView = this._pages[0];

    for (let i = 1, ii = this._pages.length; i < ii; ++i) {
      const pageView = this._pages[i];

      if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height) {
        return false;
      }
    }

    return true;
  }

  getPagesOverview() {
    return this._pages.map(pageView => {
      const viewport = pageView.pdfPage.getViewport({
        scale: 1
      });

      if (!this.enablePrintAutoRotate || (0, _ui_utils.isPortraitOrientation)(viewport)) {
        return {
          width: viewport.width,
          height: viewport.height,
          rotation: viewport.rotation
        };
      }

      return {
        width: viewport.height,
        height: viewport.width,
        rotation: (viewport.rotation - 90) % 360
      };
    });
  }

  get optionalContentConfigPromise() {
    if (!this.pdfDocument) {
      return Promise.resolve(null);
    }

    if (!this._optionalContentConfigPromise) {
      return this.pdfDocument.getOptionalContentConfig();
    }

    return this._optionalContentConfigPromise;
  }

  set optionalContentConfigPromise(promise) {
    if (!(promise instanceof Promise)) {
      throw new Error(`Invalid optionalContentConfigPromise: ${promise}`);
    }

    if (!this.pdfDocument) {
      return;
    }

    if (!this._optionalContentConfigPromise) {
      return;
    }

    this._optionalContentConfigPromise = promise;
    const updateArgs = {
      optionalContentConfigPromise: promise
    };

    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }

    this.update();
    this.eventBus.dispatch("optionalcontentconfigchanged", {
      source: this,
      promise
    });
  }

  get scrollMode() {
    return this._scrollMode;
  }

  set scrollMode(mode) {
    if (this._scrollMode === mode) {
      return;
    }

    if (!(0, _ui_utils.isValidScrollMode)(mode)) {
      throw new Error(`Invalid scroll mode: ${mode}`);
    }

    if (this.pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
      return;
    }

    this._previousScrollMode = this._scrollMode;
    this._scrollMode = mode;
    this.eventBus.dispatch("scrollmodechanged", {
      source: this,
      mode
    });

    this._updateScrollMode(this._currentPageNumber);
  }

  _updateScrollMode(pageNumber = null) {
    const scrollMode = this._scrollMode,
          viewer = this.viewer;
    viewer.classList.toggle("scrollHorizontal", scrollMode === _ui_utils.ScrollMode.HORIZONTAL);
    viewer.classList.toggle("scrollWrapped", scrollMode === _ui_utils.ScrollMode.WRAPPED);

    if (!this.pdfDocument || !pageNumber) {
      return;
    }

    if (scrollMode === _ui_utils.ScrollMode.PAGE) {
      this.#ensurePageViewVisible();
    } else if (this._previousScrollMode === _ui_utils.ScrollMode.PAGE) {
      this._updateSpreadMode();
    }

    if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
      this._setScale(this._currentScaleValue, true);
    }

    this._setCurrentPageNumber(pageNumber, true);

    this.update();
  }

  get spreadMode() {
    return this._spreadMode;
  }

  set spreadMode(mode) {
    if (this._spreadMode === mode) {
      return;
    }

    if (!(0, _ui_utils.isValidSpreadMode)(mode)) {
      throw new Error(`Invalid spread mode: ${mode}`);
    }

    this._spreadMode = mode;
    this.eventBus.dispatch("spreadmodechanged", {
      source: this,
      mode
    });

    this._updateSpreadMode(this._currentPageNumber);
  }

  _updateSpreadMode(pageNumber = null) {
    if (!this.pdfDocument) {
      return;
    }

    const viewer = this.viewer,
          pages = this._pages;

    if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
      this.#ensurePageViewVisible();
    } else {
      viewer.textContent = "";

      if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
        for (const pageView of this._pages) {
          viewer.appendChild(pageView.div);
        }
      } else {
        const parity = this._spreadMode - 1;
        let spread = null;

        for (let i = 0, ii = pages.length; i < ii; ++i) {
          if (spread === null) {
            spread = document.createElement("div");
            spread.className = "spread";
            viewer.appendChild(spread);
          } else if (i % 2 === parity) {
            spread = spread.cloneNode(false);
            viewer.appendChild(spread);
          }

          spread.appendChild(pages[i].div);
        }
      }
    }

    if (!pageNumber) {
      return;
    }

    if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
      this._setScale(this._currentScaleValue, true);
    }

    this._setCurrentPageNumber(pageNumber, true);

    this.update();
  }

  _getPageAdvance(currentPageNumber, previous = false) {
    switch (this._scrollMode) {
      case _ui_utils.ScrollMode.WRAPPED:
        {
          const {
            views
          } = this._getVisiblePages(),
                pageLayout = new Map();

          for (const {
            id,
            y,
            percent,
            widthPercent
          } of views) {
            if (percent === 0 || widthPercent < 100) {
              continue;
            }

            let yArray = pageLayout.get(y);

            if (!yArray) {
              pageLayout.set(y, yArray ||= []);
            }

            yArray.push(id);
          }

          for (const yArray of pageLayout.values()) {
            const currentIndex = yArray.indexOf(currentPageNumber);

            if (currentIndex === -1) {
              continue;
            }

            const numPages = yArray.length;

            if (numPages === 1) {
              break;
            }

            if (previous) {
              for (let i = currentIndex - 1, ii = 0; i >= ii; i--) {
                const currentId = yArray[i],
                      expectedId = yArray[i + 1] - 1;

                if (currentId < expectedId) {
                  return currentPageNumber - expectedId;
                }
              }
            } else {
              for (let i = currentIndex + 1, ii = numPages; i < ii; i++) {
                const currentId = yArray[i],
                      expectedId = yArray[i - 1] + 1;

                if (currentId > expectedId) {
                  return expectedId - currentPageNumber;
                }
              }
            }

            if (previous) {
              const firstId = yArray[0];

              if (firstId < currentPageNumber) {
                return currentPageNumber - firstId + 1;
              }
            } else {
              const lastId = yArray[numPages - 1];

              if (lastId > currentPageNumber) {
                return lastId - currentPageNumber + 1;
              }
            }

            break;
          }

          break;
        }

      case _ui_utils.ScrollMode.HORIZONTAL:
        {
          break;
        }

      case _ui_utils.ScrollMode.PAGE:
      case _ui_utils.ScrollMode.VERTICAL:
        {
          if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
            break;
          }

          const parity = this._spreadMode - 1;

          if (previous && currentPageNumber % 2 !== parity) {
            break;
          } else if (!previous && currentPageNumber % 2 === parity) {
            break;
          }

          const {
            views
          } = this._getVisiblePages(),
                expectedId = previous ? currentPageNumber - 1 : currentPageNumber + 1;

          for (const {
            id,
            percent,
            widthPercent
          } of views) {
            if (id !== expectedId) {
              continue;
            }

            if (percent > 0 && widthPercent === 100) {
              return 2;
            }

            break;
          }

          break;
        }
    }

    return 1;
  }

  nextPage() {
    const currentPageNumber = this._currentPageNumber,
          pagesCount = this.pagesCount;

    if (currentPageNumber >= pagesCount) {
      return false;
    }

    const advance = this._getPageAdvance(currentPageNumber, false) || 1;
    this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
    return true;
  }

  previousPage() {
    const currentPageNumber = this._currentPageNumber;

    if (currentPageNumber <= 1) {
      return false;
    }

    const advance = this._getPageAdvance(currentPageNumber, true) || 1;
    this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
    return true;
  }

  increaseScale(steps = 1) {
    let newScale = this._currentScale;

    do {
      newScale = (newScale * _ui_utils.DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(_ui_utils.MAX_SCALE, newScale);
    } while (--steps > 0 && newScale < _ui_utils.MAX_SCALE);

    this.currentScaleValue = newScale;
  }

  decreaseScale(steps = 1) {
    let newScale = this._currentScale;

    do {
      newScale = (newScale / _ui_utils.DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(_ui_utils.MIN_SCALE, newScale);
    } while (--steps > 0 && newScale > _ui_utils.MIN_SCALE);

    this.currentScaleValue = newScale;
  }

  updateContainerHeightCss() {
    const height = this.container.clientHeight;

    if (height !== this.#previousContainerHeight) {
      this.#previousContainerHeight = height;

      this._doc.style.setProperty("--viewer-container-height", `${height}px`);
    }
  }

}

exports.BaseViewer = BaseViewer;