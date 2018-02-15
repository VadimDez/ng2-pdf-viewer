import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfViewerModule } from './pdf-viewer.module';

@Component({
  template: `<pdf-viewer></pdf-viewer>`
})
class TestComponent {}

describe('AppComponent', () => {
  let pdfViewerFixture: ComponentFixture<PdfViewerComponent>;
  let pdfViewer: PdfViewerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        PdfViewerModule
      ]
    }).compileComponents();
  }));

  it('should create test component', async(() => {
    const fixture = TestBed.createComponent(TestComponent);
    pdfViewerFixture = TestBed.createComponent(PdfViewerComponent);
    const app = fixture.debugElement.componentInstance;
    pdfViewer = pdfViewerFixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(pdfViewer).toBeTruthy();
  }));

  describe('getValidPageNumber', () => {
    function setPdf(numPages: number) {
      (pdfViewer as any)._pdf = {
        numPages
      };
    }

    it('should return page if between first and last pages', () => {
      setPdf(10);

      [1, 3, 7, 10].forEach((page: number) => {
        expect((pdfViewer as any).getValidPageNumber(page)).toBe(page, `page: ${ page }`);
      });
    });

    it('should return last page', function () {
      const pages = 100;
      setPdf(pages);
      expect((pdfViewer as any).getValidPageNumber(pages + 1)).toBe(pages);
      expect((pdfViewer as any).getValidPageNumber(pages + 2)).toBe(pages);
    });

    it('should return first page when page is less then 1', function () {
      setPdf(10);
      expect((pdfViewer as any).getValidPageNumber(0)).toBe(1);
      expect((pdfViewer as any).getValidPageNumber(-1)).toBe(1);
    });
  });

  describe('getScale', () => {
    it('should get scale 1 with offsetWidth = 0', function () {
      let spy = spyOnProperty((pdfViewer as any).element.nativeElement, 'offsetWidth', 'get').and.returnValue(0);

      expect((pdfViewer as any).getScale(0)).toBe(1);
      expect(spy).toHaveBeenCalled();
    });
  });
});