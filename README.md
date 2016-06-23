# Angular2 PDF Viewer

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
    'ng2-pdf-viewer': 'node_modules/ng2-pdf-viewer'
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

### License

[MIT](https://tldrlegal.com/license/mit-license) © [Vadym Yatsyuk](https://github.com/vadimdez)
