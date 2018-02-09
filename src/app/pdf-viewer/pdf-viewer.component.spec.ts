import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfViewerModule } from './pdf-viewer.module';

@Component({
  template: `<pdf-viewer></pdf-viewer>`
})
class TestComponent {}

describe('AppComponent', () => {
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
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});