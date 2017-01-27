<h1 align="center">Angular2 PDF Viewer</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/ng2-pdf-viewer">
    <img src="https://img.shields.io/npm/dm/ng2-pdf-viewer.svg?style=flat" alt="downloads">
  </a>
  <a href="https://badge.fury.io/js/ng2-pdf-viewer">
    <img src="https://badge.fury.io/js/ng2-pdf-viewer.svg" alt="npm version">
  </a>
  <a href="https://david-dm.org/vadimdez/ng2-pdf-viewer" title="dependencies status">
    <img src="https://david-dm.org/vadimdez/ng2-pdf-viewer/status.svg"/>
  </a>
</p>

> PDF Viewer Component for Angular 2

[Demo page](https://vadimdez.github.io/ng2-pdf-viewer/)

## Install

```
npm install ng2-pdf-viewer --save
```

## Usage

In case you're using ```systemjs``` see configuration [here](https://github.com/VadimDez/ng2-pdf-viewer/blob/master/SYSTEMJS.md).

Add ```PdfViewerComponent``` to your module's ```declarations```

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, PdfViewerComponent],
  bootstrap: [AppComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

And then use it in your component

```js
import { Component } from '@angular/core';

@Component({
  selector: 'example-app',
  template: `
  <div>
      <label>PDF src</label>
      <input type="text" placeholder="PDF src" [(ngModel)]="pdfSrc">
  </div>
  <div>
      <label>Page:</label>
      <input type="number" placeholder="Page" [(ngModel)]="page">
  </div>
  <pdf-viewer [src]="pdfSrc" 
              [page]="page" 
              [original-size]="true" 
              style="display: block;"
  ></pdf-viewer>
  `
})
export class AppComponent {
  pdfSrc: string = '/pdf-test.pdf';
  page: number = 1;
}
```

## Options

* [src](#src)
* [page](#page)
* [render-text](#render-text)
* [rotation](#rotation)
* [zoom](#zoom)
* [original-size](#original-size)
* [show-all](#show-all)
* [after-load-complete](#after-load-complete)

#### [src]

Pass pdf location
 
```
[src]="'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf'"
```

For more control you can pass options object to ```[src]```.

Options object for loading protected PDF would be
 
 ```js
 {
  url: 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf',
  withCredentials: true
 }
 ```
 
 See more attributes [here](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L108-L132).


#### [page]
Page number

```
[page]="1"
```
supports two way data binding as well
```
[(page)]="pageVariable"
```

#### [render-text]
Enable text rendering, allows to select text
```
[render-text]="true"
```

#### [rotation]
Rotate PDF

*Allowed step is 90 degree, ex. 0, 90, 180*
```
[rotation]="90"
```

#### [zoom]
Zoom pdf
```
[zoom]="0.5"
```

#### [original-size]

if set to *true* - size will be as same as original document

if set to *false* - size will be as same as container block

```
[original-size]="true"
```

#### [show-all]

Show single or all pages altogether

```
[show-all]="true"
```

#### (after-load-complete)

Get PDF information with callback

First define callback function "callBackFn" in your controller,
```
callBackFn(pdf: PDFDocumentProxy) {
   // do anything with "pdf"
}
```

And then use it in your template:
``` 
(after-load-complete)="callBackFn($event)"
```
## Develop
```
npm start
```
and open
```
http://localhost:8000/
```

## License

[MIT](https://tldrlegal.com/license/mit-license) © [Vadym Yatsyuk](https://github.com/vadimdez)
