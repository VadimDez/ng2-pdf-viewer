/**
 * Created by vadimdez on 21/06/16.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'pdf-viewer-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})

export class AppComponent {
  pdfSrc: string = './pdf-test.pdf';

  // or pass options as object
  // pdfSrc: any = {
  //   url: './pdf-test.pdf',
  //   withCredentials: true,
  //// httpHeaders: { // cross domain
  ////   'Access-Control-Allow-Credentials': true
  //// }
  // };

  page: number = 1;
  originalSize: boolean = false;
  showAll: boolean = true;
  pdf: any;

  constructor() {
    this.onLoadComplete = this.onLoadComplete.bind(this);
  }

  incrementPage(amount) {
    this.page += amount;
  }

  /**
   * Get pdf information after it's loaded
   * @param pdf
   */
  onLoadComplete(pdf: any) {
    this.pdf = pdf;
  }
}