/**
 * Created by vadimdez on 21/06/16.
 */
import { Component } from '@angular/core';
import { PdfViewerComponent } from './../pdf-viewer/pdf-viewer.component';
import { MDL } from './mdl';

@Component({
  selector: 'pdf-viewer-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css'],
  directives: [MDL, PdfViewerComponent]
})


export class AppComponent {
  pdfSrc: string = './pdf-test.pdf';
  page: number = 1;
  originalSize: boolean = false;
  showAll: boolean = true;

  incrementPage(amount) {
    this.page += amount;
  }
}