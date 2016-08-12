# Angular2 PDF Viewer [![npm version](https://badge.fury.io/js/ng2-pdf-viewer.svg)](https://badge.fury.io/js/ng2-pdf-viewer)

> PDF Viewer Component for Angular 2

[Demo page](https://vadimdez.github.io/ng2-pdf-viewer/)

### Install

```
npm install ng2-pdf-viewer --save
```

### Usage

In your ```system.config.js```

Append to ```map```

```js
var map = {
    ...
    'ng2-pdf-viewer': 'node_modules/ng2-pdf-viewer',
    'pdfjs-dist': 'node_modules/pdfjs-dist'
}
```

and then add to ```packages```

```js
var packages = {
    ...
    'ng2-pdf-viewer': { main: 'dist/pdf-viewer.component.min.js' }
}
```

Import component to your component

```js
import { Component } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

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
  <pdf-viewer [src]="pdfSrc" [initialPage]="page" [original-size]="true" style="display: block;"></pdf-viewer>
  `,
  directives: [PdfViewerComponent]
})
export class AppComponent {
  pdfSrc: string = '/pdf-test.pdf';
  page: number = 1;
}
```

### Options

#### [src]

Pass pdf location
 
```
[src]="https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf"
```

#### [page]
Page number

```
[page]="1"
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

### License

[MIT](https://tldrlegal.com/license/mit-license) © [Vadym Yatsyuk](https://github.com/vadimdez)
