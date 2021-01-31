import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';

import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfViewerModule } from './pdf-viewer.module';

@Component({
  template: `
    <pdf-viewer></pdf-viewer>
  `
})
class TestComponent {}

describe('AppComponent', () => {
  let pdfViewerFixture: ComponentFixture<PdfViewerComponent>;
  let pdfViewer: PdfViewerComponent;
  let testFixture: ComponentFixture<TestComponent>;
  let testApp: TestComponent;

  function setPdf(numPages: number) {
    (pdfViewer as any)._pdf = {
      numPages,
      destroy: () => {}
    };
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PdfViewerModule]
    })
      .compileComponents()
      .then(() => {
        testFixture = TestBed.createComponent(TestComponent);
        testApp = testFixture.debugElement.componentInstance;

        pdfViewerFixture = TestBed.createComponent(PdfViewerComponent);
        pdfViewer = pdfViewerFixture.debugElement.componentInstance;
      });
  }));

  it('should create test component', () => {
    expect(testApp).toBeTruthy();
    expect(pdfViewer).toBeTruthy();
  });

  describe('getValidPageNumber', () => {
    it('should return page if between first and last pages', () => {
      setPdf(10);

      [1, 3, 7, 10].forEach((page: number) => {
        expect((pdfViewer as any).getValidPageNumber(page)).toBe(
          page,
          `page: ${page}`
        );
      });
    });

    it('should return last page', () => {
      const pages = 100;
      setPdf(pages);
      expect((pdfViewer as any).getValidPageNumber(pages + 1)).toBe(pages);
      expect((pdfViewer as any).getValidPageNumber(pages + 2)).toBe(pages);
    });

    it('should return first page when page is less then 1', () => {
      setPdf(10);
      expect((pdfViewer as any).getValidPageNumber(0)).toBe(1);
      expect((pdfViewer as any).getValidPageNumber(-1)).toBe(1);
    });
  });

  describe('getScale', () => {
    it('should get scale 1 with viewportWidth = 0 or viewerContainerWidth = 0', () => {
      pdfViewerFixture.detectChanges();
      const spy = spyOnProperty(
        (pdfViewer as any).pdfViewerContainer.nativeElement,
        'clientWidth',
        'get'
      ).and.returnValue(0);

      expect((pdfViewer as any).getScale(0)).toBe(1);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getDocumentParams', () => {
    const src = 'https://localhost:4200/test.pdf';
    const cMapUrl = 'assets/';

    it('should check default url', () => {
      const PDFJS = require('pdfjs-dist/build/pdf');

      expect((pdfViewer as any)._cMapsUrl).toBe(
        `https://unpkg.com/pdfjs-dist@${(PDFJS as any).version}/cmaps/`
      );
    });

    it('should return src', () => {
      pdfViewer.cMapsUrl = null;
      pdfViewer.src = src;

      expect((pdfViewer as any).getDocumentParams()).toBe(src);
    });

    it('should return object', () => {
      pdfViewer.src = src;
      pdfViewer.cMapsUrl = cMapUrl;

      expect((pdfViewer as any).getDocumentParams()).toEqual({
        url: src,
        cMapUrl,
        cMapPacked: true
      });
    });

    it('should return object when src is an object', () => {
      pdfViewer.src = { url: src };
      pdfViewer.cMapsUrl = cMapUrl;

      expect((pdfViewer as any).getDocumentParams()).toEqual({
        url: src,
        cMapUrl,
        cMapPacked: true
      });
    });

    it('should return object when src is an object with byte array', () => {
      const srcUrl = new Uint8Array(1);
      pdfViewer.src = { url: srcUrl as any };
      pdfViewer.cMapsUrl = cMapUrl;

      expect((pdfViewer as any).getDocumentParams()).toEqual({
        url: srcUrl,
        cMapUrl,
        cMapPacked: true
      });
    });
  });
});
